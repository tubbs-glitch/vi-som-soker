// State-management — pure, immutabla transitions.
// Inga sidoeffekter. Tar state in, returnerar state ut.

import { makeItem } from "./items";
import type {
  CanChooseResult,
  Character,
  Choice,
  ChoiceConsequence,
  GameState,
  Item,
  ItemId,
  Language,
  Relations,
  Sanity,
  SanityLabel,
  Scene,
  StoryFlags,
  Tag,
} from "./types";

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export function defaultCharacter(): Character {
  return {
    name: "",
    gender: "otydlig",
    appearance: {
      hair: "mörkt",
      build: "vanlig",
      feature: "inget",
    },
    background: "default",
    stats: {
      sty: 5,
      dex: 5,
      för: 5,
      mod: 5,
    },
  };
}

function defaultRelations(): Relations {
  return {
    alice: 0,
    leopold: 0,
    gunnar: 2,
    mamma: 0,
    det_grå: 0,
    vinds_tinget: 0,
    ingegerd_eko: 0,
    bertil_eko: 0,
    astrid_eko: 0,
  };
}

function defaultFlags(): StoryFlags {
  return {
    // Akt I
    mamma_vet: false,
    vet_om_per_magnus: false,
    vet_om_sallskapet_rykte: false,
    vet_om_tjarsten_korrekt: false,
    set_kort_om_omgivningen: false,
    vet_om_olov: false,
    gunnar_först_möte_klart: false,
    gunnar_vet_om_leopold: false,
    gunnar_vet_om_hundarna: false,
    gunnar_obekväm: false,
    // Akt II - utforskning
    har_tjarsten: false,
    har_ljus: false,
    har_mejerinyckel: false,
    har_lab_anteckningar: false,
    har_läst_lab_anteckningar: false,
    har_läst_dagboken: false,
    har_läst_astrids_parm: false,
    har_vinds_mat: false,
    alice_pärm_läst: false,
    sett_gruppfoto: false,
    hymnen_låten_på: false,
    vet_om_trälårs_kod: false,
    vet_om_signe: false,
    läst_namn: false,
    bär_halsband: null,
    förstår_frekvens: 0,
    förstår_alice: 0,
    hört_ljud_uppe: false,
    // Akt II - sällskaps-tråden
    oppnat_mejeri: false,
    brutit_in_i_mejeri: false,
    vet_om_sallskapet: false,
    vet_om_astrid: false,
    vet_om_ingegerd: false,
    vet_om_olov_sallskap: false,
    vet_om_per_magnus_djup: false,
    vet_om_bertil: false,
    bär_attonde_halsband: false,
    har_lapp_till_gunnar: false,
    besokt_myrgraven: false,
    // Akt II - kärnhändelser
    vinds_tinget_status: null,
    ström_på: false,
    hymnen_börjat: false,
    ritual_korrekt: null,
    salt_riktning: null,
    klivit_in_i_portalen: false,
    vagval_intention: null,
    // Akt III
    grå_riktning: null,
    talat_med_ingegerd: false,
    talat_om_bertil_med_leopold: false,
    leopold_med: false,
    alice_med: false,
    alice_övertygad_med: null,
    valt_offra_sig: false,
    besegrat_det_grå: false,
    förstod_det_grå: false,
    stoppat_permanent: false,
  };
}

function defaultSanity(): Sanity {
  return { value: 90 };
}

/**
 * Skapar ett nytt spel. Char creation är inte byggd i v0.1, så när inga
 * argument ges får spelaren default-karaktär (vanlig svaghet, 5 vanliga stats)
 * och tom inventory. Packning sker i scene-002.
 */
export function createInitialState(
  character: Character = defaultCharacter(),
  packed: ItemId[] = [],
  language: Language = "sv",
): GameState {
  const items = packed.map(makeItem);
  const flags = withDerivedFlags(defaultFlags(), { items });
  return {
    version: 1,
    character,
    sanity: defaultSanity(),
    wounds: [],
    inventory: {
      items,
      max_at_start: 5,
    },
    relations: defaultRelations(),
    story_flags: flags,
    location: {
      current_scene: "scene-001",
      current_room: null,
      visited_scenes: [],
      visited_rooms: [],
    },
    meta: {
      current_act: 1,
      playtime_seconds: 0,
      ending: null,
      choices_log: [],
      language,
    },
  };
}

// ---------------------------------------------------------------------------
// Härledda värden
// ---------------------------------------------------------------------------

export function hasTag(state: GameState, tag: Tag): boolean {
  return state.inventory.items.some((it) => it.tags.includes(tag));
}

export function tagCount(state: GameState, tag: Tag): number {
  let n = 0;
  for (const it of state.inventory.items) if (it.tags.includes(tag)) n += 1;
  return n;
}

export function hasItem(state: GameState, id: ItemId): boolean {
  return state.inventory.items.some((it) => it.id === id);
}

export function isPrepared(state: GameState): boolean {
  return hasTag(state, "komfort") && hasTag(state, "vård");
}

export function sanityLabel(state: GameState): SanityLabel {
  const v = state.sanity.value;
  if (v >= 80) return "fokuserad";
  if (v >= 60) return "skakad";
  if (v >= 40) return "vacklande";
  if (v >= 20) return "söndertrasad";
  return "avgrund";
}

export function sanityIsHigh(state: GameState): boolean {
  return state.sanity.value >= 70;
}

// ---------------------------------------------------------------------------
// canChoose / visibleChoices
// ---------------------------------------------------------------------------

export function canChoose(choice: Choice, state: GameState): CanChooseResult {
  const req = choice.requires;
  if (!req) return { allowed: true };

  if (req.tags) {
    for (const t of req.tags) {
      if (!hasTag(state, t)) {
        return { allowed: false, reason: `saknar ${t}` };
      }
    }
  }

  if (req.tag_count) {
    for (const [t, min] of Object.entries(req.tag_count) as [Tag, number][]) {
      if (tagCount(state, t) < min) {
        return { allowed: false, reason: `behöver fler ${t}` };
      }
    }
  }

  if (req.items) {
    for (const id of req.items) {
      if (!hasItem(state, id)) {
        return { allowed: false, reason: `saknar ${id}` };
      }
    }
  }

  if (req.stats) {
    for (const [k, min] of Object.entries(req.stats) as [
      keyof Character["stats"],
      number,
    ][]) {
      if (state.character.stats[k] < min) {
        return { allowed: false, reason: `${k} för låg` };
      }
    }
  }

  if (req.sanity_min !== undefined && state.sanity.value < req.sanity_min) {
    return { allowed: false, reason: "sanity för låg" };
  }
  if (req.sanity_max !== undefined && state.sanity.value > req.sanity_max) {
    return { allowed: false, reason: "sanity för hög" };
  }

  if (req.flags) {
    for (const [k, want] of Object.entries(req.flags) as [
      keyof StoryFlags,
      unknown,
    ][]) {
      if ((state.story_flags as unknown as Record<string, unknown>)[k] !== want) {
        return { allowed: false, reason: `flagga ${k} fel` };
      }
    }
  }

  if (req.relations) {
    for (const [k, min] of Object.entries(req.relations) as [
      keyof Relations,
      number,
    ][]) {
      if (state.relations[k] < min) {
        return { allowed: false, reason: `relation ${k} för låg` };
      }
    }
  }

  if (req.no_wounds) {
    for (const w of req.no_wounds) {
      if (state.wounds.includes(w)) {
        return { allowed: false, reason: `har ${w}` };
      }
    }
  }

  if (req.background && !req.background.includes(state.character.background)) {
    return { allowed: false, reason: "fel bakgrund" };
  }

  return { allowed: true };
}

export function visibleChoices(scene: Scene, state: GameState): Choice[] {
  return scene.choices.filter((c) => canChoose(c, state).allowed);
}

// ---------------------------------------------------------------------------
// applyChoice — immutabel state-transition
// ---------------------------------------------------------------------------

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

const RELATION_RANGES: Record<keyof Relations, [number, number]> = {
  alice: [-10, 10],
  leopold: [-10, 10],
  gunnar: [0, 10],
  mamma: [-3, 3],
  det_grå: [-5, 5],
  vinds_tinget: [0, 3],
  ingegerd_eko: [0, 3],
  bertil_eko: [0, 2],
  astrid_eko: [0, 1],
};

function applyConsequence(
  state: GameState,
  conseq: ChoiceConsequence | undefined,
): GameState {
  if (!conseq) return state;

  // sanity
  let sanity = state.sanity;
  if (conseq.sanity_delta) {
    sanity = { value: clamp(state.sanity.value + conseq.sanity_delta, 0, 100) };
  }

  // wounds
  let wounds = state.wounds;
  if (conseq.wounds_remove?.length) {
    wounds = wounds.filter((w) => !conseq.wounds_remove!.includes(w));
  }
  if (conseq.wounds_add?.length) {
    const next = [...wounds];
    for (const w of conseq.wounds_add) {
      if (!next.includes(w)) next.push(w);
    }
    // max 3 samtidigt — äldsta åker först (design-flagga, se data-model.md §2.4)
    while (next.length > 3) next.shift();
    wounds = next;
  }

  // inventory
  let items: Item[] = state.inventory.items;
  if (conseq.inventory_remove?.length) {
    items = items.filter((i) => !conseq.inventory_remove!.includes(i.id));
  }
  if (conseq.inventory_add?.length) {
    const next = [...items];
    for (const id of conseq.inventory_add) {
      if (!next.some((it) => it.id === id)) next.push(makeItem(id));
    }
    items = next;
  }
  const inventory =
    items === state.inventory.items
      ? state.inventory
      : { ...state.inventory, items };

  // flags
  const story_flags = conseq.flags_set
    ? { ...state.story_flags, ...conseq.flags_set }
    : state.story_flags;

  // relations
  let relations = state.relations;
  if (conseq.relations_delta) {
    const next = { ...relations };
    for (const [k, d] of Object.entries(conseq.relations_delta) as [
      keyof Relations,
      number,
    ][]) {
      const [lo, hi] = RELATION_RANGES[k];
      next[k] = clamp((next[k] ?? 0) + d, lo, hi);
    }
    relations = next;
  }

  // stat-delta (sällsynt — temporära boostar)
  let character = state.character;
  if (conseq.stat_delta) {
    const stats = { ...character.stats };
    for (const [k, d] of Object.entries(conseq.stat_delta) as [
      keyof Character["stats"],
      number,
    ][]) {
      stats[k] = clamp(stats[k] + d, 0, 10);
    }
    character = { ...character, stats };
  }

  // härledda flaggor — sätt här för bekvämlighet (lite redundant med data-model.md
  // som säger "JIT", men många scen-handlers vill kunna gate-checka direkt mot flaggan).
  const finalFlags = withDerivedFlags(story_flags, { ...inventory });

  return {
    ...state,
    character,
    sanity,
    wounds,
    inventory,
    relations,
    story_flags: finalFlags,
  };
}

function withDerivedFlags(
  flags: StoryFlags,
  inventory: { items: Item[] },
): StoryFlags {
  const hasLjus = inventory.items.some((it) => it.tags.includes("ljus"));
  const hasTjarsten = inventory.items.some((it) => it.id === "tjärsten");
  const hasMejerinyckel = inventory.items.some(
    (it) => it.id === "mejerinyckel",
  );
  return {
    ...flags,
    har_ljus: hasLjus,
    har_tjarsten: hasTjarsten || flags.har_tjarsten,
    har_mejerinyckel: hasMejerinyckel || flags.har_mejerinyckel,
  };
}

/**
 * Applicerar ett val och returnerar nytt state. Pure.
 * Uppdaterar inventory/sanity/flags/relations + flyttar `location.current_scene`
 * och loggar valet i `meta.choices_log`.
 */
export function applyChoice(choice: Choice, state: GameState): GameState {
  const afterConseq = applyConsequence(state, choice.consequences);

  const visited = afterConseq.location.visited_scenes;
  const currentScene = afterConseq.location.current_scene;
  const newVisited = visited.includes(currentScene)
    ? visited
    : [...visited, currentScene];

  const location = {
    ...afterConseq.location,
    current_scene: choice.next_scene,
    visited_scenes: newVisited,
  };

  const choices_log = [
    ...afterConseq.meta.choices_log,
    {
      scene_id: currentScene,
      choice_id: choice.id,
      timestamp: Date.now(),
    },
  ];

  return {
    ...afterConseq,
    location,
    meta: { ...afterConseq.meta, choices_log },
  };
}

// ---------------------------------------------------------------------------
// Serialisering
// ---------------------------------------------------------------------------

export function serializeState(state: GameState): string {
  return JSON.stringify(state);
}

export function deserializeState(json: string): GameState {
  const parsed = JSON.parse(json) as GameState;
  if (parsed.version !== 1) {
    return migrateState(json, parsed.version);
  }
  return parsed;
}

export function migrateState(json: string, fromVersion: number): GameState {
  const state = JSON.parse(json);
  if (fromVersion < 1) {
    state.version = 1;
  }
  return state as GameState;
}

// ---------------------------------------------------------------------------
// Scene-helpers
// ---------------------------------------------------------------------------

export function resolveNextScene(
  currentScene: Scene,
  state: GameState,
): string {
  // I v0.1 stödjer vi inte beräknade bottleneckar — fallback till första exit.
  // Backend-dev / iOS-dev ska implementera ett scen-specifikt resolverlager.
  if (currentScene.exits.length > 0) return currentScene.exits[0];
  return state.location.current_scene;
}

export function setLanguage(state: GameState, lang: Language): GameState {
  return { ...state, meta: { ...state.meta, language: lang } };
}
