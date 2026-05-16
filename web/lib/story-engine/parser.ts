// Parser — markdown med YAML frontmatter → Scene.
//
// Format (se docs/CONTENT-FORMAT.md för fullständig spec).
//
// Frontmatter:
//   ---
//   scene_id: 001
//   title: "Samtalet"
//   language: sv
//   act: 1
//   type: BN
//   triggers: [start]
//   exits: [scene-002]
//   sanity_delta: 0           # default per scen, kan överskridas per val
//   flags_set: []
//   flags_read: []
//   ---
//
// Val-format (alla varianter stödda):
//
//   Enkelt:
//     - **[Val-text]** → scene-002
//
//   Med outcome-prosa + inline-konsekvenser:
//     - **[Val-text]**
//       Konsekvens-prosa som visas efter klick. → scene-002 *(sätter `flag=true`, `relation+1`)*
//
//   Self-loop (för Q&A-scener som Gunnar):
//     - **[Fråga]**
//       Svaret. → tillbaka *(`relation+1`)*
//
//   Forced continue (atmosfärscen utan val, eller "Stäng väskan"-pattern):
//     **[Gå vidare]** → scene-003
//
// Konsekvens-syntax inuti *(...)* (kommaseparerad):
//   `flag=true` `flag=false`       — sätter boolean flag
//   `flag+N` `flag-N`              — ändrar numerisk flag (förstår_frekvens etc.)
//   `relation+N` `relation-N`       — ändrar relations-värde
//   `sanity +N` / `sanity -N`       — sanity-delta
//   sätter `x` skrivs som [sätter `x`] — "sätter" är optional, ignoreras
//
// Sanity i prose:
//   "Sanity +1." eller "Sanity -2." i outcome-prosa parsas också som consequence.
//   (Bekvämlighet för copywriter — voice-guide-vänligt.)

import matter from "gray-matter";
import type {
  Choice,
  ChoiceConsequence,
  Language,
  Relations,
  Scene,
  SceneType,
  StoryFlags,
} from "./types";

export interface RawFrontmatter {
  scene_id?: string | number;
  title?: string;
  language?: Language;
  act?: 1 | 2 | 3;
  type?: SceneType;
  triggers?: string[];
  exits?: string[];
  sanity_delta?: number;
  flags_set?: unknown[];
  flags_read?: unknown[];
}

// Choice-rubrik på egen rad. Med eller utan inledande "- ".
const CHOICE_HEADER = /^(\s*-\s+)?\*\*\[(.+?)\]\*\*\s*(.*)$/;
// Pilen kan ligga på rubriken eller i body. Mål:
//   - scene-NNN
//   - "tillbaka" / "back" (self-loop)
//   - "fortsätt" / "vidare" / "continue" / "next" / "on" (exits[0])
const ARROW_TARGET =
  /→\s*(scene-[\w-]+|tillbaka|back|fortsätt|vidare|continue|next|on)\b/;
// Konsekvens-block i italic: *(...)*
const CONSEQUENCE_BLOCK = /\*\(([^)]+)\)\*/g;
// Sanity i löpande text (svenska + engelska).
const SANITY_IN_PROSE = /\bSanity\s*([+-])\s*(\d+)/i;
// Gate-prefix: om dessa nyckelord finns i ett *(...)* block, är det en gate
// (krav), inte en consequence (effekt). Vi ignorerar gates i nuvarande engine.
const GATE_PREFIXES = /^\s*(om|kräver|if|requires)\b/i;

function normalizeSceneId(raw: unknown, fallback: string): string {
  // Filnamnet (fallback) är sanningskälla — YAML-frontmatter kan tolka
  // `scene_id: 014` som oktal (= decimal 12). Använd alltid fallback om den
  // har scene-NNN-formatet.
  if (fallback && /^scene-\d+/.test(fallback)) return fallback;
  if (typeof raw === "string") {
    if (raw.startsWith("scene-")) return raw;
    return `scene-${raw.padStart(3, "0")}`;
  }
  if (typeof raw === "number") return `scene-${String(raw).padStart(3, "0")}`;
  return fallback;
}

interface RawChoice {
  text: string;
  bodyLines: string[];
  trailingOnHeader: string;
}

function collectChoices(block: string): RawChoice[] {
  const lines = block.split("\n");
  const out: RawChoice[] = [];
  let current: RawChoice | null = null;

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) {
      // Tom rad avslutar den nuvarande valets body.
      if (current) {
        out.push(current);
        current = null;
      }
      continue;
    }
    const m = line.match(CHOICE_HEADER);
    // En rubrik startar ett nytt val. Vi vill INTE matcha header-regex på
    // indragna body-rader som råkar innehålla **[...]**. Header får bara
    // matcha rader som börjar med antingen inget indrag, eller "- ".
    const isHeaderLine = m && (line.startsWith("-") || line.startsWith("*"));
    if (isHeaderLine && m) {
      if (current) out.push(current);
      current = {
        text: m[2],
        bodyLines: [],
        trailingOnHeader: m[3].trim(),
      };
    } else if (current) {
      current.bodyLines.push(line.trim());
    } else {
      // Standalone forced-continue: **[Text]** → scene-NNN (utan "- ")
      const standalone = line.trim().match(/^\*\*\[(.+?)\]\*\*\s*(.*)$/);
      if (standalone) {
        out.push({
          text: standalone[1],
          bodyLines: [],
          trailingOnHeader: standalone[2].trim(),
        });
      }
      // Andra rader (löpande "Välj upp till 5:"-text etc.) ignoreras tyst.
    }
  }
  if (current) out.push(current);
  return out;
}

function parseConsequenceBlock(text: string): ChoiceConsequence | undefined {
  // Splittra på komma utanför backticks. Enkel parser: backtick-block + ev. "sätter"-prefix.
  const parts: string[] = [];
  let buf = "";
  let inTick = false;
  for (const ch of text) {
    if (ch === "`") inTick = !inTick;
    if (ch === "," && !inTick) {
      parts.push(buf);
      buf = "";
    } else {
      buf += ch;
    }
  }
  if (buf.trim()) parts.push(buf);

  const conseq: ChoiceConsequence = {};
  // Kända relations- och numeriska flag-namn för disambiguering.
  const relationKeys: ReadonlyArray<keyof Relations> = [
    "alice",
    "leopold",
    "gunnar",
    "mamma",
    "det_grå",
    "vinds_tinget",
    "ingegerd_eko",
    "bertil_eko",
    "astrid_eko",
    // alternativa namn copywriter ibland använder:
  ];
  // Relations som copywriter ofta refererar med "_tillit"-suffix etc.
  const relationAliases: Record<string, keyof Relations> = {
    gunnar_tillit: "gunnar",
    relation_mamma: "mamma",
    relation_alice: "alice",
    relation_leopold: "leopold",
  };

  const flags_set: Partial<StoryFlags> = {};
  const relations_delta: Partial<Record<keyof Relations, number>> = {};
  let sanity_delta = 0;

  for (const rawPart of parts) {
    const part = rawPart.trim().replace(/^sätter\s+/i, "").replace(/^sets?\s+/i, "");
    // Plocka ut innehåll i backticks om det finns, annars hela part:en.
    const tickMatch = part.match(/`([^`]+)`/);
    const expr = (tickMatch ? tickMatch[1] : part).trim();
    if (!expr) continue;

    // sanity +N / sanity -N
    const sm = expr.match(/^sanity\s*([+-])\s*(\d+)$/i);
    if (sm) {
      sanity_delta += (sm[1] === "+" ? 1 : -1) * Number(sm[2]);
      continue;
    }
    // name=true / name=false
    const eq = expr.match(/^([a-zA-ZåäöÅÄÖ_][\wåäöÅÄÖ]*)\s*=\s*(true|false)$/);
    if (eq) {
      (flags_set as Record<string, boolean>)[eq[1]] = eq[2] === "true";
      continue;
    }
    // name+N / name-N
    const delta = expr.match(/^([a-zA-ZåäöÅÄÖ_][\wåäöÅÄÖ]*)\s*([+-])\s*(\d+)$/);
    if (delta) {
      const name = delta[1];
      const sign = delta[2] === "+" ? 1 : -1;
      const n = Number(delta[3]) * sign;
      const aliased = relationAliases[name] ?? name;
      if ((relationKeys as readonly string[]).includes(aliased as string)) {
        relations_delta[aliased as keyof Relations] =
          (relations_delta[aliased as keyof Relations] ?? 0) + n;
      } else {
        // Numerisk flag — sparas som flags_set som integer (engine läser som-is).
        const existing = (flags_set as Record<string, number>)[name];
        (flags_set as Record<string, number>)[name] = (existing ?? 0) + n;
      }
      continue;
    }
    // Annars: tyst ignorera (osedd syntax — kan loggas senare)
  }

  if (Object.keys(flags_set).length) conseq.flags_set = flags_set;
  if (Object.keys(relations_delta).length) conseq.relations_delta = relations_delta;
  if (sanity_delta) conseq.sanity_delta = sanity_delta;

  return Object.keys(conseq).length ? conseq : undefined;
}

function findArrowTarget(text: string): string | null {
  const m = text.match(ARROW_TARGET);
  return m ? m[1] : null;
}

/**
 * Plocka konsekvenser från ALLA `*(...)*`-block i texten, exklusive gate-block
 * (som börjar med "om/kräver/if/requires"). Gates ignoreras av engine i v0.x.
 */
function findConsequencesInText(text: string): ChoiceConsequence | undefined {
  // Global regex — iterera alla matchningar
  const re = new RegExp(CONSEQUENCE_BLOCK.source, "g");
  let merged: ChoiceConsequence | undefined;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const inner = m[1];
    if (GATE_PREFIXES.test(inner)) continue; // gate, inte consequence
    const parsed = parseConsequenceBlock(inner);
    merged = mergeConsequences(merged, parsed);
  }
  return merged;
}

/**
 * Hitta `Sanity ±N` i löpande prosa. Ignorera text inuti `*(...)*`-block
 * (de hanteras av findConsequencesInText — annars dubbel-räknas).
 */
function findSanityInProse(text: string): number {
  const stripped = text.replace(/\*\([^)]+\)\*/g, "");
  const m = stripped.match(SANITY_IN_PROSE);
  if (!m) return 0;
  return (m[1] === "+" ? 1 : -1) * Number(m[2]);
}

/**
 * Plocka ut outcome-prosan från ett kombinerat val:
 *  - Allt före första "→"-pilen
 *  - Strip:a inline-konsekvenser *(...)*
 *  - Strip:a "Sanity ±N." (eftersom delta visas i feedback-toast)
 *  - Trimma whitespace
 */
function extractCleanBody(combined: string): string {
  // Allt före första pilen
  const arrowIdx = combined.indexOf("→");
  let body = arrowIdx >= 0 ? combined.slice(0, arrowIdx) : combined;
  // Ta även bort eventuella efterföljande *(...)*-block (skulle inte finnas
  // före pil, men säkerhet)
  body = body.replace(/\*\([^)]+\)\*/g, "");
  // Ta bort "Sanity +N." / "Sanity -N." i prosan (visas separat som delta)
  body = body.replace(/\bSanity\s*[+-]\s*\d+\.?/gi, "");
  return body.trim().replace(/\s+/g, " ");
}

function mergeConsequences(
  a: ChoiceConsequence | undefined,
  b: ChoiceConsequence | undefined,
): ChoiceConsequence | undefined {
  if (!a) return b;
  if (!b) return a;
  return {
    sanity_delta: (a.sanity_delta ?? 0) + (b.sanity_delta ?? 0) || undefined,
    flags_set:
      a.flags_set || b.flags_set
        ? { ...(a.flags_set ?? {}), ...(b.flags_set ?? {}) }
        : undefined,
    relations_delta:
      a.relations_delta || b.relations_delta
        ? mergeNumeric(a.relations_delta, b.relations_delta)
        : undefined,
    wounds_add: [
      ...(a.wounds_add ?? []),
      ...(b.wounds_add ?? []),
    ].length
      ? [...(a.wounds_add ?? []), ...(b.wounds_add ?? [])]
      : undefined,
    wounds_remove: [
      ...(a.wounds_remove ?? []),
      ...(b.wounds_remove ?? []),
    ].length
      ? [...(a.wounds_remove ?? []), ...(b.wounds_remove ?? [])]
      : undefined,
    inventory_add: [
      ...(a.inventory_add ?? []),
      ...(b.inventory_add ?? []),
    ].length
      ? [...(a.inventory_add ?? []), ...(b.inventory_add ?? [])]
      : undefined,
    inventory_remove: [
      ...(a.inventory_remove ?? []),
      ...(b.inventory_remove ?? []),
    ].length
      ? [...(a.inventory_remove ?? []), ...(b.inventory_remove ?? [])]
      : undefined,
  };
}

function mergeNumeric<K extends string>(
  a: Partial<Record<K, number>> | undefined,
  b: Partial<Record<K, number>> | undefined,
): Partial<Record<K, number>> {
  const out: Partial<Record<K, number>> = { ...(a ?? {}) };
  for (const [k, v] of Object.entries(b ?? {}) as [K, number][]) {
    out[k] = (out[k] ?? 0) + v;
  }
  return out;
}

export function parseScene(source: string, fallbackId: string): Scene {
  const { data, content } = matter(source);
  const fm = data as RawFrontmatter;

  const id = normalizeSceneId(fm.scene_id, fallbackId);
  const language: Language = (fm.language as Language) ?? "sv";
  const act = (fm.act as 1 | 2 | 3) ?? 1;
  const type: SceneType = (fm.type as SceneType) ?? "G";

  // Dela content vid val-headern. Stöd för "## Val" och "## Choices".
  const splitMatch = content.match(/^##\s+(Val|Choices)\s*$/im);
  let proseRaw = content;
  let choicesBlock = "";
  if (splitMatch && splitMatch.index !== undefined) {
    proseRaw = content.slice(0, splitMatch.index).trim();
    choicesBlock = content.slice(splitMatch.index + splitMatch[0].length).trim();
  } else {
    proseRaw = content.trim();
  }

  // Plocka ut prose-varianter från ## headers:
  //   ## I ficklampans sken / ## In the torch's beam / ## In the torchlight → prose_flashlight
  //   ## När strömmen är på / ## When the power is on                       → prose_power_on
  //   ## Tillbaka i rummet  / ## Back in the room                           → prose_revisit
  // Allt innehåll FÖRE första sådan header är default-prose (mörker).
  const VARIANT_HEADER =
    /^##\s+(I ficklampans sken|In the torch's beam|In the torchlight|När strömmen är på|When the power is on|Tillbaka i rummet|Back in the room)\s*$/im;

  let prose = proseRaw;
  const variants: { prose_flashlight?: string; prose_power_on?: string; prose_revisit?: string } = {};

  // Iterativ split — hitta alla variant-headers
  const splitParts: Array<{ key: string; text: string }> = [];
  let workText = proseRaw;
  let firstHeaderIdx = -1;
  let m;
  // Hitta första variant-header
  m = workText.match(VARIANT_HEADER);
  if (m && m.index !== undefined) {
    firstHeaderIdx = m.index;
    prose = workText.slice(0, firstHeaderIdx).trim();
    workText = workText.slice(firstHeaderIdx);

    // Splittra på alla variant-headers
    const headerRegex =
      /^##\s+(I ficklampans sken|In the torch's beam|In the torchlight|När strömmen är på|When the power is on|Tillbaka i rummet|Back in the room)\s*$/gim;
    let lastIdx = 0;
    let lastKey = "";
    let h;
    while ((h = headerRegex.exec(workText)) !== null) {
      if (lastKey) {
        splitParts.push({
          key: lastKey,
          text: workText.slice(lastIdx, h.index).trim(),
        });
      }
      lastKey = h[1];
      lastIdx = h.index + h[0].length;
    }
    if (lastKey) {
      splitParts.push({ key: lastKey, text: workText.slice(lastIdx).trim() });
    }

    for (const p of splitParts) {
      const k = p.key.toLowerCase();
      if (k.includes("ficklamp") || k.includes("torch")) {
        variants.prose_flashlight = p.text;
      } else if (k.includes("strömmen") || k.includes("power")) {
        variants.prose_power_on = p.text;
      } else if (k.includes("tillbaka") || k.includes("back in")) {
        variants.prose_revisit = p.text;
      }
    }
  }

  // Strip POWER-ON HTML-kommentarer från default-prose (de hanteras som variant)
  // <!-- POWER-ON: ... --> — om finns, plocka ut innehållet som prose_power_on
  // (om vi inte redan har en explicit variant)
  const POWER_COMMENT = /<!--\s*POWER-ON:\s*([\s\S]*?)\s*-->/i;
  const pc = prose.match(POWER_COMMENT);
  if (pc && !variants.prose_power_on) {
    // Power-on prose = default-prosan med kommentaren ersatt av dess innehåll
    variants.prose_power_on = prose.replace(POWER_COMMENT, pc[1]).trim();
  }
  // Strip kommentaren från default-prose (mörker-versionen visar den inte)
  prose = prose.replace(POWER_COMMENT, "").trim();

  const rawChoices = choicesBlock ? collectChoices(choicesBlock) : [];
  const choices: Choice[] = [];
  let idx = 0;
  const exits = Array.isArray(fm.exits) ? (fm.exits as string[]) : [];
  let hasNonLoopChoice = false;

  for (const rc of rawChoices) {
    // Sammanfoga rubrikens trailing-text + alla body-rader till en helhet.
    const combined = [rc.trailingOnHeader, ...rc.bodyLines]
      .filter(Boolean)
      .join(" ");
    const target = findArrowTarget(combined);
    if (!target) {
      // Inget pilmål → inte ett spelbart val (t.ex. en cosmetic inventory-rad).
      continue;
    }
    const forwardAliases = ["fortsätt", "vidare", "continue", "next", "on"];
    let next: string;
    if (target === "tillbaka" || target === "back") {
      next = id; // self-loop
    } else if (forwardAliases.includes(target)) {
      // Forward — mappa till exits[0] om finns, annars stanna
      next = exits[0] ?? id;
    } else {
      next = target;
    }
    if (next !== id) hasNonLoopChoice = true;

    const conseqExplicit = findConsequencesInText(combined);
    const conseqFromProse = findSanityInProse(combined);
    const conseqSanity =
      conseqFromProse !== 0 ? { sanity_delta: conseqFromProse } : undefined;
    const consequences = mergeConsequences(conseqExplicit, conseqSanity);

    // Bygg ren outcome-prosa: text före "→"-pilen, exkl. consequence-block.
    const body = extractCleanBody(combined);

    const choiceId = `${id}-c${idx + 1}`;
    choices.push({
      id: choiceId,
      text: rc.text,
      body: body || undefined,
      next_scene: next,
      consequences,
    });
    idx += 1;
  }

  // Q&A-loop hjälpare: om scenen har en exit i frontmatter men inget val
  // går till exit (alla är tillbaka), lägg till ett auto-genererat fortsätt-val.
  if (!hasNonLoopChoice && exits.length > 0 && choices.length > 0) {
    choices.push({
      id: `${id}-c-continue`,
      text: language === "en" ? "Continue" : "Gå vidare",
      next_scene: exits[0],
    });
  }

  return {
    id,
    title: typeof fm.title === "string" ? fm.title : id,
    language,
    act,
    type,
    triggers: Array.isArray(fm.triggers) ? (fm.triggers as string[]) : [],
    exits,
    prose,
    prose_flashlight: variants.prose_flashlight,
    prose_power_on: variants.prose_power_on,
    prose_revisit: variants.prose_revisit,
    choices,
  };
}
