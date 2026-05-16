"use client";

import { useState } from "react";
import { sanityLabel, type GameState } from "@/lib/story-engine";
import { useGameStore } from "@/lib/store";

const STAT_LABELS_SV: Record<number, string> = {};
const STAT_LABELS_EN: Record<number, string> = {};
for (let v = 0; v <= 10; v += 1) {
  if (v <= 2) {
    STAT_LABELS_SV[v] = "påtagligt svag";
    STAT_LABELS_EN[v] = "markedly weak";
  } else if (v <= 4) {
    STAT_LABELS_SV[v] = "lite svag";
    STAT_LABELS_EN[v] = "a little weak";
  } else if (v === 5) {
    STAT_LABELS_SV[v] = "vanlig";
    STAT_LABELS_EN[v] = "ordinary";
  } else if (v <= 7) {
    STAT_LABELS_SV[v] = "stark";
    STAT_LABELS_EN[v] = "strong";
  } else if (v <= 9) {
    STAT_LABELS_SV[v] = "påtagligt stark";
    STAT_LABELS_EN[v] = "markedly strong";
  } else {
    STAT_LABELS_SV[v] = "exceptionell";
    STAT_LABELS_EN[v] = "exceptional";
  }
}

const STAT_NAMES_SV = {
  sty: "Styrka",
  dex: "Smidighet",
  för: "Förstånd",
  mod: "Mod",
};
const STAT_NAMES_EN = {
  sty: "Strength",
  dex: "Agility",
  för: "Insight",
  mod: "Resolve",
};

const SANITY_LABEL_EN: Record<string, string> = {
  fokuserad: "focused",
  skakad: "unsteady",
  vacklande: "wavering",
  söndertrasad: "frayed",
  avgrund: "abyss",
};

const WOUND_LABELS_SV: Record<string, string> = {
  skuren_hand: "skuren hand",
  kontusion_skalle: "kontusion mot skallen",
  vriden_ankel: "vriden ankel",
  andnod: "andnöd",
  kallnad_märg: "kallnad märg",
};
const WOUND_LABELS_EN: Record<string, string> = {
  skuren_hand: "cut hand",
  kontusion_skalle: "blow to the skull",
  vriden_ankel: "twisted ankle",
  andnod: "shortness of breath",
  kallnad_märg: "marrow gone cold",
};

const RELATION_NAMES_SV: Record<string, string> = {
  alice: "Alice",
  leopold: "Leopold",
  gunnar: "Gunnar",
  mamma: "Mamma",
  det_grå: "Det grå",
  vinds_tinget: "Vinds-tinget",
  ingegerd_eko: "Ingegerd",
  bertil_eko: "Bertil",
  astrid_eko: "Astrid",
};
const RELATION_NAMES_EN: Record<string, string> = {
  alice: "Alice",
  leopold: "Leopold",
  gunnar: "Gunnar",
  mamma: "Mother",
  det_grå: "The Grey",
  vinds_tinget: "Attic thing",
  ingegerd_eko: "Ingegerd",
  bertil_eko: "Bertil",
  astrid_eko: "Astrid",
};

function relationLabel(value: number, lang: "sv" | "en"): string {
  if (lang === "en") {
    if (value <= -3) return "hostile";
    if (value < 0) return "wary";
    if (value === 0) return "—";
    if (value <= 2) return "trusting";
    if (value <= 5) return "close";
    return "intimate";
  }
  if (value <= -3) return "fientlig";
  if (value < 0) return "skeptisk";
  if (value === 0) return "—";
  if (value <= 2) return "tillit";
  if (value <= 5) return "nära";
  return "intimt";
}

interface Props {
  state: GameState;
}

export default function StatusPanel({ state }: Props) {
  const [open, setOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const reset = useGameStore((s) => s.reset);
  const lang = state.meta.language;
  const isEn = lang === "en";
  const STAT_NAMES = isEn ? STAT_NAMES_EN : STAT_NAMES_SV;
  const STAT_LABELS = isEn ? STAT_LABELS_EN : STAT_LABELS_SV;
  const WOUND_LABELS = isEn ? WOUND_LABELS_EN : WOUND_LABELS_SV;
  const RELATION_NAMES = isEn ? RELATION_NAMES_EN : RELATION_NAMES_SV;

  const rawSLabel = sanityLabel(state);
  const sLabel = isEn ? SANITY_LABEL_EN[rawSLabel] ?? rawSLabel : rawSLabel;
  const itemCount = state.inventory.items.length;
  const woundCount = state.wounds.length;

  const activeRelations = Object.entries(state.relations).filter(
    ([, v]) => v !== 0,
  ) as Array<[keyof typeof RELATION_NAMES_SV, number]>;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-20 border-t border-muted-soft bg-bg/90 backdrop-blur-md"
      role="region"
      aria-label={isEn ? "Character status" : "Karaktärsstatus"}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-6 py-3 flex items-center justify-between gap-6 hover:bg-bg-2/50 transition-colors"
      >
        <span className="flex gap-5 items-center">
          <span className="status-pill">
            <span className="opacity-60">{isEn ? "Mind" : "Sinne"}</span>
            <span className={`sanity-${rawSLabel}`}>{sLabel}</span>
          </span>
          <span className="status-pill hidden sm:inline-flex">
            <span className="opacity-60">{isEn ? "Pack" : "Väska"}</span>
            <span className="text-ink">{itemCount}</span>
          </span>
          {woundCount > 0 && (
            <span className="status-pill">
              <span className="opacity-60">{isEn ? "Wounds" : "Skador"}</span>
              <span className="text-accent">{woundCount}</span>
            </span>
          )}
        </span>
        <span className="annotation">
          {open
            ? isEn
              ? "close ▾"
              : "stäng ▾"
            : isEn
              ? "details ▴"
              : "detaljer ▴"}
        </span>
      </button>

      {open && (
        <div className="px-6 pb-7 pt-3 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-14 gap-y-6 border-t border-muted-soft/50 animate-fade-in">
          <section>
            <h2 className="annotation mb-3">
              {isEn ? "Who you are" : "Vem du är"}
            </h2>
            <ul className="space-y-1.5 text-sm">
              {(
                Object.entries(state.character.stats) as Array<
                  [keyof typeof STAT_NAMES, number]
                >
              ).map(([k, v]) => (
                <li key={k} className="flex justify-between items-baseline">
                  <span className="annotation">{STAT_NAMES[k]}</span>
                  <span className="font-serif italic text-ink-dim">
                    {STAT_LABELS[v]}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="annotation mb-3">
              {isEn ? "Body and mind" : "Kropp och sinne"}
            </h2>
            <p className="text-sm mb-2 flex justify-between items-baseline">
              <span className="annotation">{isEn ? "Sanity" : "Sinne"}</span>
              <span className={`font-serif italic sanity-${rawSLabel}`}>
                {sLabel}
              </span>
            </p>
            <div className="text-sm flex justify-between items-baseline">
              <span className="annotation">{isEn ? "Wounds" : "Skador"}</span>
              {state.wounds.length === 0 ? (
                <span className="font-serif italic text-muted/70">
                  {isEn ? "none" : "inga"}
                </span>
              ) : (
                <span className="font-serif italic text-accent text-right">
                  {state.wounds.map((w) => WOUND_LABELS[w] ?? w).join(", ")}
                </span>
              )}
            </div>
          </section>

          <section>
            <h2 className="annotation mb-3">
              {isEn ? "In your pack" : "I väskan"}
            </h2>
            {state.inventory.items.length === 0 ? (
              <p className="font-serif italic text-muted/70 text-sm">
                {isEn ? "empty" : "tom"}
              </p>
            ) : (
              <ul className="space-y-1 text-sm">
                {state.inventory.items.map((it) => (
                  <li key={it.id} className="text-ink-dim font-serif">
                    <span className="text-accent mr-2 opacity-60">·</span>
                    {it.name}
                    {it.uses_remaining !== undefined && (
                      <span className="text-muted/60 text-xs ml-1.5 font-mono">
                        {it.uses_remaining}×
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="annotation mb-3">
              {isEn ? "People" : "Människor"}
            </h2>
            {activeRelations.length === 0 ? (
              <p className="font-serif italic text-muted/70 text-sm">
                {isEn ? "no one yet" : "ingen ännu"}
              </p>
            ) : (
              <ul className="space-y-1.5 text-sm">
                {activeRelations.map(([k, v]) => (
                  <li key={k} className="flex justify-between items-baseline">
                    <span className="annotation">{RELATION_NAMES[k]}</span>
                    <span
                      className={
                        "font-serif italic " +
                        (v < 0
                          ? "text-accent"
                          : v > 3
                            ? "text-sun"
                            : "text-ink-dim")
                      }
                    >
                      {relationLabel(v, lang)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Reset — dolt här inne så det inte klickas av misstag */}
          <div className="sm:col-span-2 mt-2 pt-4 border-t border-muted-soft/40 flex justify-end">
            {confirmReset ? (
              <div className="flex items-center gap-3">
                <span className="annotation text-danger">
                  {isEn
                    ? "Erase all progress?"
                    : "Radera all progression?"}
                </span>
                <button
                  onClick={() => {
                    reset();
                    setConfirmReset(false);
                  }}
                  className="annotation text-danger hover:text-ink underline underline-offset-4"
                >
                  {isEn ? "yes, restart" : "ja, börja om"}
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="annotation hover:text-ink"
                >
                  {isEn ? "cancel" : "avbryt"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmReset(true)}
                className="annotation text-muted/60 hover:text-danger transition-colors"
                title={
                  isEn
                    ? "Restart from character creation"
                    : "Börja om från karaktärsgenereringen"
                }
              >
                {isEn ? "restart game" : "börja om spelet"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
