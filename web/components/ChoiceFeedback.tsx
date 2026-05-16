"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/lib/store";

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

const FLAG_DESCRIPTIONS_SV: Record<string, string> = {
  mamma_vet: "Mamma vet om Alice",
  vet_om_per_magnus: "Du minns Per-Magnus",
  vet_om_sallskapet_rykte: "Du anar något om sällskapet",
  set_kort_om_omgivningen: "Du har sett byns ruiner",
  vet_om_olov: "Du vet om Olov Sandgren",
  gunnar_vet_om_leopold: "Gunnar vet om Leopold",
  gunnar_vet_om_hundarna: "Gunnar vet om hundarna",
  har_lapp_till_gunnar: "Du har lappen till Gunnar",
};
const FLAG_DESCRIPTIONS_EN: Record<string, string> = {
  mamma_vet: "Mother knows about Alice",
  vet_om_per_magnus: "You remember Per-Magnus",
  vet_om_sallskapet_rykte: "You sense something about the circle",
  set_kort_om_omgivningen: "You've seen the village ruins",
  vet_om_olov: "You know about Olov Sandgren",
  gunnar_vet_om_leopold: "Gunnar knows about Leopold",
  gunnar_vet_om_hundarna: "Gunnar knows about the dogs",
  har_lapp_till_gunnar: "You have the note for Gunnar",
};

const ITEM_NAMES_SV: Record<string, string> = {
  ficklampa: "Ficklampa",
  jaktkniv: "Jaktkniv",
  kassettbandspelare: "Kassettbandspelare",
  mobilladdare: "Mobilladdare",
  första_hjälpen: "Första-hjälpen",
  varma_kläder: "Varma kläder",
  extra_batterier: "Extra batterier",
};

const FEEDBACK_MS = 4200;

type Line = {
  label: string;
  value: string;
  tone: "neutral" | "good" | "bad" | "flag";
};

export default function ChoiceFeedback() {
  const lastDelta = useGameStore((s) => s.lastDelta);
  const clearDelta = useGameStore((s) => s.clearDelta);
  const language = useGameStore((s) => s.state.meta.language);
  const isEn = language === "en";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastDelta) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(clearDelta, 350);
    }, FEEDBACK_MS);
    return () => clearTimeout(t);
  }, [lastDelta, clearDelta]);

  if (!lastDelta) return null;

  const lines: Line[] = [];

  if (lastDelta.sanity) {
    const sign = lastDelta.sanity > 0 ? "+" : "";
    lines.push({
      label: isEn ? "sanity" : "sinne",
      value: `${sign}${lastDelta.sanity}`,
      tone: lastDelta.sanity > 0 ? "good" : "bad",
    });
  }

  if (lastDelta.relations) {
    const names = isEn ? RELATION_NAMES_EN : RELATION_NAMES_SV;
    for (const [k, v] of Object.entries(lastDelta.relations)) {
      if (!v) continue;
      const sign = v > 0 ? "+" : "";
      lines.push({
        label: names[k] ?? k,
        value: `${sign}${v}`,
        tone: v > 0 ? "good" : "bad",
      });
    }
  }

  if (lastDelta.inventory_added?.length) {
    for (const id of lastDelta.inventory_added) {
      lines.push({
        label: isEn ? "added" : "lagt till",
        value: ITEM_NAMES_SV[id] ?? id,
        tone: "good",
      });
    }
  }
  if (lastDelta.inventory_removed?.length) {
    for (const id of lastDelta.inventory_removed) {
      lines.push({
        label: isEn ? "lost" : "förlorat",
        value: ITEM_NAMES_SV[id] ?? id,
        tone: "bad",
      });
    }
  }

  if (lastDelta.flags_set) {
    const descs = isEn ? FLAG_DESCRIPTIONS_EN : FLAG_DESCRIPTIONS_SV;
    for (const [k, v] of Object.entries(lastDelta.flags_set)) {
      const desc = descs[k];
      if (!desc) continue;
      if (v === true) lines.push({ label: "", value: desc, tone: "flag" });
      else if (v === false)
        lines.push({ label: "", value: `¬ ${desc}`, tone: "neutral" });
      else if (typeof v === "number")
        lines.push({ label: "", value: `${desc} → ${v}`, tone: "flag" });
    }
  }

  if (lines.length === 0) return null;

  return (
    <div
      className={
        "fixed top-5 right-5 z-30 max-w-[min(20rem,90vw)] border border-accent/40 bg-bg-2/95 backdrop-blur-md transition-all duration-350 " +
        (visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none")
      }
      role="status"
      aria-live="polite"
    >
      <div className="annotation px-3.5 pt-2.5 pb-1 border-b border-accent/20">
        {isEn ? "consequence" : "konsekvens"}
      </div>
      <ul className="px-3.5 py-2.5 space-y-1.5">
        {lines.map((l, i) => (
          <li key={i} className="flex justify-between items-baseline gap-3 text-sm">
            {l.label && (
              <span className="annotation tracking-wider text-[0.6rem]">
                {l.label}
              </span>
            )}
            <span
              className={
                "font-serif italic ml-auto text-right " +
                (l.tone === "bad"
                  ? "text-accent"
                  : l.tone === "good"
                    ? "text-sun"
                    : l.tone === "flag"
                      ? "text-ink"
                      : "text-ink-dim")
              }
            >
              {l.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
