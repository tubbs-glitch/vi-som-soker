"use client";

import { useEffect, useMemo, useState } from "react";
import { useGameStore } from "@/lib/store";
import { HOUSE_MAP } from "@/lib/house-map";
import { makeItem, type ItemId } from "@/lib/story-engine";

const ALL_ITEMS: { id: ItemId; label: string }[] = [
  { id: "ficklampa", label: "Ficklampa" },
  { id: "jaktkniv", label: "Jaktkniv" },
  { id: "kassettbandspelare", label: "Kassettbandspelare" },
  { id: "mobilladdare", label: "Mobilladdare" },
  { id: "första_hjälpen", label: "Första-hjälpen" },
  { id: "varma_kläder", label: "Varma kläder" },
  { id: "extra_batterier", label: "Extra batterier" },
  { id: "tjärsten", label: "Tjärsten" },
  { id: "yxa", label: "Yxa" },
  { id: "lab_anteckningar", label: "Lab-anteckningar" },
  { id: "alice_dagbok", label: "Alices dagbok" },
  { id: "alice_pärm", label: "Alices pärm" },
  { id: "mejerinyckel", label: "Mejerinyckel" },
  { id: "astrids_pärm", label: "Astrids pärm" },
  { id: "halsband_sjunde", label: "7:e halsbandet" },
  { id: "halsband_attonde", label: "8:e halsbandet" },
];

interface SceneInfo {
  id: string;
  title?: string;
  act?: number;
}

const KNOWN_SCENE_IDS: string[] = [
  // Akt I
  "scene-001", "scene-002", "scene-003", "scene-004", "scene-005",
  "scene-006", "scene-007", "scene-008", "scene-010",
  // Akt II
  "scene-011", "scene-012", "scene-013", "scene-014", "scene-015",
  "scene-016", "scene-017", "scene-018", "scene-019", "scene-021",
  "scene-022", "scene-023", "scene-024", "scene-025", "scene-026",
  "scene-027", "scene-028", "scene-029", "scene-030",
  // Tomten
  "scene-100", "scene-101", "scene-102", "scene-103", "scene-104", "scene-105",
  // Akt III
  "scene-031", "scene-032", "scene-033", "scene-034", "scene-035",
  "scene-036", "scene-037", "scene-038",
  // Slut
  "scene-039", "scene-040", "scene-041", "scene-042", "scene-043", "scene-044",
];

const SCENE_TITLES: Record<string, string> = {
  "scene-001": "Samtalet",
  "scene-002": "Innan du går (packning)",
  "scene-003": "Mamma",
  "scene-004": "Vägen norrut",
  "scene-005": "Macken i Sveg",
  "scene-006": "De sista 30 km",
  "scene-007": "Ankomst Hällmyren",
  "scene-008": "Gunnar på trappan",
  "scene-010": "Första klivet in",
  "scene-011": "Hallen",
  "scene-012": "Vardagsrummet",
  "scene-013": "Köket",
  "scene-014": "Leopolds arbetsrum",
  "scene-015": "Trappan upp",
  "scene-016": "Övre hallen",
  "scene-017": "Alices sovrum",
  "scene-018": "Gästrummet",
  "scene-019": "Badrummet",
  "scene-021": "Vinden",
  "scene-022": "Källartrappan",
  "scene-023": "Källare-förvar",
  "scene-024": "Mejeribyggnaden",
  "scene-025": "Astrids pärm",
  "scene-026": "Trälåren",
  "scene-027": "Vedboden (gammal)",
  "scene-028": "Hymnen börjar",
  "scene-029": "Vägen-valet",
  "scene-030": "Myrgraven",
  "scene-100": "Ut på tomten",
  "scene-101": "Trädet",
  "scene-102": "Skjulets dörr",
  "scene-103": "Ugglan",
  "scene-104": "Verktygen",
  "scene-105": "Såga ner trädet",
  "scene-031": "Cirkeln + klivet",
  "scene-032": "Andra dimensionen",
  "scene-033": "Rösterna",
  "scene-034": "Ingegerd-ekot",
  "scene-035": "Leopold",
  "scene-036": "Alice",
  "scene-037": "Det grå talar",
  "scene-038": "Portalen stängs",
  "scene-039": "Slut 1 — Alla hem",
  "scene-040": "Slut 1B — Permanent stängning",
  "scene-041": "Slut 2 — Du kom igenom sist",
  "scene-042": "Slut 3 — Du stannade",
  "scene-043": "Slut 4 — Tystnaden",
  "scene-044": "Epilog",
};

const ACT_MAP: Record<string, number> = {
  "scene-001": 1, "scene-002": 1, "scene-003": 1, "scene-004": 1,
  "scene-005": 1, "scene-006": 1, "scene-007": 1, "scene-008": 1,
  "scene-010": 1,
  "scene-011": 2, "scene-012": 2, "scene-013": 2, "scene-014": 2,
  "scene-015": 2, "scene-016": 2, "scene-017": 2, "scene-018": 2,
  "scene-019": 2, "scene-021": 2, "scene-022": 2, "scene-023": 2,
  "scene-024": 2, "scene-025": 2, "scene-026": 2, "scene-027": 2,
  "scene-028": 2, "scene-029": 2, "scene-030": 2,
  "scene-100": 2, "scene-101": 2, "scene-102": 2, "scene-103": 2,
  "scene-104": 2, "scene-105": 2,
  "scene-031": 3, "scene-032": 3, "scene-033": 3, "scene-034": 3,
  "scene-035": 3, "scene-036": 3, "scene-037": 3, "scene-038": 3,
  "scene-039": 3, "scene-040": 3, "scene-041": 3, "scene-042": 3,
  "scene-043": 3, "scene-044": 3,
};

interface Props {
  enabled: boolean;
}

export default function DevPanel({ enabled }: Props) {
  const [open, setOpen] = useState(false);
  const goToRoom = useGameStore((s) => s.goToRoom);
  const state = useGameStore((s) => s.state);

  // Kortkommando: D-tangent
  useEffect(() => {
    if (!enabled) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "d" || e.key === "D") {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        setOpen((x) => !x);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);

  // Powerops för testning
  function setFlag(name: string, value: unknown) {
    const newFlags = { ...state.story_flags, [name]: value };
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("vi-som-soker:state");
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.story_flags = newFlags;
        window.localStorage.setItem("vi-som-soker:state", JSON.stringify(parsed));
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  }

  function toggleItem(id: ItemId) {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("vi-som-soker:state");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const has = parsed.inventory.items.some(
        (i: { id: ItemId }) => i.id === id,
      );
      if (has) {
        parsed.inventory.items = parsed.inventory.items.filter(
          (i: { id: ItemId }) => i.id !== id,
        );
      } else {
        parsed.inventory.items.push(makeItem(id));
      }
      window.localStorage.setItem("vi-som-soker:state", JSON.stringify(parsed));
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  function applyPuzzleReadyPreset() {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("vi-som-soker:state");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      // Inventory: items du behöver
      const wantIds: ItemId[] = [
        "ficklampa",
        "jaktkniv",
        "tjärsten",
        "yxa",
        "kassettbandspelare",
      ];
      const have = new Set<ItemId>(
        parsed.inventory.items.map((i: { id: ItemId }) => i.id),
      );
      for (const id of wantIds) {
        if (!have.has(id)) parsed.inventory.items.push(makeItem(id));
      }
      // Flags som behövs för ritual-pussel + full slut 1
      parsed.story_flags = {
        ...parsed.story_flags,
        ström_på: true,
        flashlight_on: false,
        har_tjarsten: true,
        har_mejerinyckel: true,
        har_ljus: true,
        hymnen_låten_på: true,
        hymnen_börjat: true,
        tradet_sagat: true,
        kabeln_reparerbar: true,
        har_läst_dagboken: true,
        har_läst_astrids_parm: true,
        har_läst_lab_anteckningar: true,
        vet_om_tjarsten_korrekt: true,
        vet_om_signe: true,
        vet_om_sallskapet: true,
        vet_om_sallskapet_rykte: true,
        vet_om_bertil: true,
        vet_om_per_magnus: true,
        oppnat_mejeri: true,
        förstår_frekvens: 2,
        förstår_alice: 2,
      };
      parsed.sanity = { value: 80 };
      window.localStorage.setItem("vi-som-soker:state", JSON.stringify(parsed));
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  function clearInventory() {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("vi-som-soker:state");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      parsed.inventory.items = [];
      window.localStorage.setItem("vi-som-soker:state", JSON.stringify(parsed));
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  if (!enabled) return null;

  return (
    <>
      <button
        onClick={() => setOpen((x) => !x)}
        className="fixed top-2 left-2 z-50 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-accent bg-bg-2 border border-accent/40 hover:border-accent"
        title="D-tangent: toggle"
      >
        {open ? "dev ✕" : "dev"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-w-3xl mx-auto p-6 pt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="mb-6">
              <h2 className="font-serif text-2xl text-accent mb-1">Dev mode</h2>
              <p className="annotation">
                klicka för att hoppa direkt till scen · esc för att stänga
              </p>
            </header>

            <section className="mb-8">
              <h3 className="annotation mb-3">Presets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={applyPuzzleReadyPreset}
                  className="text-left px-3 py-2 text-xs border border-accent text-accent bg-accent/10 hover:bg-accent/20 transition-colors"
                  title="Sätter alla flaggor och items som krävs för full ritual + slut 1"
                >
                  <span className="font-mono mr-2">▸</span>
                  Pussel-redo (full ritual + Slut 1 möjlig)
                </button>
                <button
                  onClick={clearInventory}
                  className="text-left px-3 py-2 text-xs border border-muted-soft/50 text-muted hover:text-ink"
                >
                  <span className="font-mono mr-2">∅</span>
                  Töm väska
                </button>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="annotation mb-3">Items i väska</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                {ALL_ITEMS.map((item) => {
                  const has = state.inventory.items.some(
                    (i) => i.id === item.id,
                  );
                  return (
                    <FlagButton
                      key={item.id}
                      label={item.label}
                      value={has}
                      onClick={() => toggleItem(item.id)}
                    />
                  );
                })}
              </div>
            </section>

            <section className="mb-8">
              <h3 className="annotation mb-3">Snabba flaggor (state)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <FlagButton
                  label="Strömmen på"
                  value={Boolean(state.story_flags.ström_på)}
                  onClick={() =>
                    setFlag("ström_på", !state.story_flags.ström_på)
                  }
                />
                <FlagButton
                  label="Ficklampa fram"
                  value={Boolean(
                    (state.story_flags as unknown as Record<string, unknown>).flashlight_on,
                  )}
                  onClick={() =>
                    setFlag(
                      "flashlight_on",
                      !(state.story_flags as unknown as Record<string, unknown>).flashlight_on,
                    )
                  }
                />
                <FlagButton
                  label="Hymnen spelar (nålen nere)"
                  value={Boolean(
                    (state.story_flags as unknown as Record<string, unknown>).hymnen_låten_på,
                  )}
                  onClick={() =>
                    setFlag(
                      "hymnen_låten_på",
                      !(state.story_flags as unknown as Record<string, unknown>).hymnen_låten_på,
                    )
                  }
                />
                <FlagButton
                  label="Trädet sågat"
                  value={Boolean(
                    (state.story_flags as unknown as Record<string, unknown>).tradet_sagat,
                  )}
                  onClick={() =>
                    setFlag(
                      "tradet_sagat",
                      !(state.story_flags as unknown as Record<string, unknown>).tradet_sagat,
                    )
                  }
                />
                <FlagButton
                  label="Läst Alices dagbok"
                  value={Boolean(state.story_flags.har_läst_dagboken)}
                  onClick={() =>
                    setFlag(
                      "har_läst_dagboken",
                      !state.story_flags.har_läst_dagboken,
                    )
                  }
                />
                <FlagButton
                  label="Läst Astrids pärm"
                  value={Boolean(state.story_flags.har_läst_astrids_parm)}
                  onClick={() =>
                    setFlag(
                      "har_läst_astrids_parm",
                      !state.story_flags.har_läst_astrids_parm,
                    )
                  }
                />
                <FlagButton
                  label="Vet om sällskapet"
                  value={Boolean(state.story_flags.vet_om_sallskapet_rykte)}
                  onClick={() =>
                    setFlag(
                      "vet_om_sallskapet_rykte",
                      !state.story_flags.vet_om_sallskapet_rykte,
                    )
                  }
                />
                <FlagButton
                  label="Vet om Bertil"
                  value={Boolean(state.story_flags.vet_om_bertil)}
                  onClick={() =>
                    setFlag("vet_om_bertil", !state.story_flags.vet_om_bertil)
                  }
                />
                <FlagButton
                  label="Hymnen börjat (skiva snurrar)"
                  value={Boolean(state.story_flags.hymnen_börjat)}
                  onClick={() =>
                    setFlag("hymnen_börjat", !state.story_flags.hymnen_börjat)
                  }
                />
              </div>
            </section>

            <section className="space-y-6">
              {[1, 2, 3].map((act) => (
                <div key={act}>
                  <h3 className="annotation mb-3">Akt {act}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {KNOWN_SCENE_IDS.filter((id) => ACT_MAP[id] === act).map(
                      (id) => (
                        <SceneButton
                          key={id}
                          id={id}
                          title={SCENE_TITLES[id] ?? id}
                          isCurrent={state.location.current_scene === id}
                          onClick={() => {
                            goToRoom(id);
                            setOpen(false);
                          }}
                        />
                      ),
                    )}
                  </div>
                </div>
              ))}
            </section>

            <section className="mt-8">
              <h3 className="annotation mb-3">Karaktärs-state</h3>
              <pre className="text-xs font-mono text-muted bg-bg-2 p-3 border border-muted-soft overflow-x-auto">
                {JSON.stringify(
                  {
                    sanity: state.sanity.value,
                    inventory: state.inventory.items.map((i) => i.id),
                    wounds: state.wounds,
                    visited_scenes: state.location.visited_scenes,
                    visited_rooms: state.location.visited_rooms,
                  },
                  null,
                  2,
                )}
              </pre>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

function SceneButton({
  id,
  title,
  isCurrent,
  onClick,
}: {
  id: string;
  title: string;
  isCurrent: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "text-left px-3 py-2 text-xs font-mono border transition-colors " +
        (isCurrent
          ? "border-accent text-accent bg-accent/10"
          : "border-muted-soft/50 text-ink-dim hover:border-accent hover:text-ink")
      }
    >
      <span className="text-muted/70">{id}</span>
      <span className="mx-2 text-muted/40">·</span>
      <span className="font-serif">{title}</span>
    </button>
  );
}

function FlagButton({
  label,
  value,
  onClick,
}: {
  label: string;
  value: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "text-left px-3 py-2 text-xs border transition-colors " +
        (value
          ? "border-accent text-accent bg-accent/10"
          : "border-muted-soft/50 text-muted hover:border-ink-dim hover:text-ink")
      }
    >
      <span className="font-mono text-[0.65rem] mr-2">
        {value ? "■" : "□"}
      </span>
      {label}
    </button>
  );
}
