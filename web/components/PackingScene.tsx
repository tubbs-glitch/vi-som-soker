"use client";

import { useState } from "react";
import type { ItemId, Scene } from "@/lib/story-engine";
import { useGameStore } from "@/lib/store";

const PACKING_ITEMS: Array<{
  id: ItemId;
  name_sv: string;
  name_en: string;
  desc_sv: string;
  desc_en: string;
}> = [
  {
    id: "ficklampa",
    name_sv: "Ficklampa",
    name_en: "Flashlight",
    desc_sv: "Du har använt den när elen gått.",
    desc_en: "You've used it when the power went out.",
  },
  {
    id: "jaktkniv",
    name_sv: "Jaktkniv (fars)",
    name_en: "Hunting knife (your father's)",
    desc_sv:
      "Du tog över den när han dog. Du har burit den en gång på älgjakt och en gång aldrig.",
    desc_en:
      "You took it when he died. You wore it once on a hunt and once never.",
  },
  {
    id: "kassettbandspelare",
    name_sv: "Kassettbandspelare",
    name_en: "Cassette player",
    desc_sv: "Från åttiosex. Den fungerar fortfarande.",
    desc_en: "From eighty-six. It still works.",
  },
  {
    id: "mobilladdare",
    name_sv: "Mobilladdare",
    name_en: "Phone charger",
    desc_sv: "Standard. Du tar alltid med den.",
    desc_en: "Standard. You always bring it.",
  },
  {
    id: "första_hjälpen",
    name_sv: "Första-hjälpen-kit",
    name_en: "First-aid kit",
    desc_sv: "Plåster, kompresser, en bit silvertejp.",
    desc_en: "Plasters, gauze, a strip of duct tape.",
  },
  {
    id: "varma_kläder",
    name_sv: "Varma kläder",
    name_en: "Warm clothes",
    desc_sv: "En ulltröja och en regnjacka. Hällmyren är norrut.",
    desc_en: "A wool jumper and a rain jacket. Hällmyren is up north.",
  },
  {
    id: "extra_batterier",
    name_sv: "Extra batterier",
    name_en: "Spare batteries",
    desc_sv: "AA, ett tiopack. Du vet inte varför du har så många.",
    desc_en: "AA, a pack of ten. You don't know why you have so many.",
  },
];

const MAX_ITEMS = 5;

interface Props {
  scene: Scene;
}

export default function PackingScene({ scene }: Props) {
  const language = useGameStore((s) => s.state.meta.language);
  const applyPacking = useGameStore((s) => s.applyPacking);
  const isEn = language === "en";
  const [selected, setSelected] = useState<Set<ItemId>>(new Set());

  function toggle(id: ItemId) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= MAX_ITEMS) return prev;
        next.add(id);
      }
      return next;
    });
  }

  function confirm() {
    const next = scene.exits[0] ?? "scene-003";
    applyPacking(Array.from(selected), next);
  }

  const prose = scene.prose
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="scene-prose flex-1 stagger-prose">
      <div className="scene-eyebrow flex justify-between items-baseline">
        <span>
          {isEn ? `Act ${scene.act}` : `Akt ${scene.act}`}{" "}
          <span className="opacity-50">·</span>{" "}
          {scene.id.replace("scene-", "Sc. ")}
        </span>
        <span className="opacity-60 normal-case italic tracking-normal font-serif">
          {isEn ? "the bag" : "väskan"}
        </span>
      </div>
      <h1 className="scene-title mb-8">{scene.title}</h1>
      {prose.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <div className="mt-10 mb-4 flex justify-between items-baseline">
        <span className="annotation">
          {isEn ? `Pack up to ${MAX_ITEMS}` : `Packa upp till ${MAX_ITEMS}`}
        </span>
        <span
          className={
            "font-mono text-xs " +
            (selected.size === MAX_ITEMS ? "text-accent" : "text-muted")
          }
        >
          {selected.size} / {MAX_ITEMS}
        </span>
      </div>

      <ul className="space-y-2">
        {PACKING_ITEMS.map((item) => {
          const isSelected = selected.has(item.id);
          const isDisabled = !isSelected && selected.size >= MAX_ITEMS;
          return (
            <li key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                disabled={isDisabled}
                className="choice-button w-full"
                data-selected={isSelected}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={
                      "mt-0.5 font-mono text-xs " +
                      (isSelected ? "text-accent" : "text-muted/60")
                    }
                  >
                    {isSelected ? "■" : "□"}
                  </span>
                  <div>
                    <div className="font-serif">
                      {isEn ? item.name_en : item.name_sv}
                    </div>
                    <div className="text-xs text-muted italic mt-1 leading-relaxed">
                      {isEn ? item.desc_en : item.desc_sv}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <button
          onClick={confirm}
          className="choice-button"
          data-emphasis="true"
        >
          {isEn
            ? selected.size === 0
              ? "Close the bag empty →"
              : "Close the bag →"
            : selected.size === 0
              ? "Stäng väskan tom →"
              : "Stäng väskan →"}
        </button>
        <p className="mt-2.5 annotation text-[0.65rem] opacity-60">
          {isEn
            ? "You can't change your pack once you've left the flat."
            : "Du kan inte ändra packning efter du lämnat lägenheten."}
        </p>
      </div>
    </article>
  );
}
