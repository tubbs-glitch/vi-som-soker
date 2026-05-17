"use client";

import { useEffect, useMemo, useState } from "react";
import {
  canChoose,
  loadSceneClient,
  type Choice,
  type Scene,
} from "@/lib/story-engine";
import { useGameStore } from "@/lib/store";
import { getSceneImage } from "@/lib/scene-images";
import { getCurrentRoom } from "@/lib/house-map";
import StatusPanel from "./StatusPanel";
import ChoiceFeedback from "./ChoiceFeedback";
import PackingScene from "./PackingScene";
import RitualScene from "./RitualScene";
import HouseMap from "./HouseMap";
import AudioSync from "./AudioSync";
import FeedbackWidget from "./FeedbackWidget";

interface Props {
  initialScene: Scene;
  initialAvailable: boolean;
}

function renderProse(prose: string) {
  const paragraphs = prose
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphs.map((p, i) => <p key={i}>{p}</p>);
}

/**
 * Plocka rätt prosa-variant baserat på spelarens state och om scenen besökts.
 * Prioritet:
 *   1. Tillbaka-i-rummet om scenen redan besökts OCH revisit finns
 *   2. Power-on om ström_på=true OCH power_on-variant finns
 *   3. Ficklampa om har_ljus + flashlight_on OCH flashlight-variant finns
 *   4. Default (vanligen mörker eller bara enda varianten)
 */
function selectProse(
  scene: Scene,
  state: ReturnType<typeof useGameStore.getState>["state"],
): { text: string; mode: "default" | "flashlight" | "power" | "revisit" } {
  const visitedBefore =
    state.location.visited_scenes.filter((s) => s === scene.id).length >= 1;
  const flagSet = state.story_flags as unknown as Record<string, unknown>;
  const powerOn = Boolean(flagSet.ström_på);
  const flashlightOn = Boolean(flagSet.flashlight_on);
  const hasLight = state.inventory.items.some((it) => it.tags.includes("ljus"));

  if (visitedBefore && scene.prose_revisit) {
    return { text: scene.prose_revisit, mode: "revisit" };
  }
  if (powerOn && scene.prose_power_on) {
    return { text: scene.prose_power_on, mode: "power" };
  }
  if (hasLight && flashlightOn && scene.prose_flashlight) {
    return { text: scene.prose_flashlight, mode: "flashlight" };
  }
  return { text: scene.prose, mode: "default" };
}

function FlashlightToggle() {
  const language = useGameStore((s) => s.state.meta.language);
  const inventory = useGameStore((s) => s.state.inventory.items);
  const flags = useGameStore(
    (s) => s.state.story_flags as unknown as Record<string, unknown>,
  );
  const toggleFlashlight = useGameStore((s) => s.toggleFlashlight);
  const hasLight = inventory.some((it) => it.tags.includes("ljus"));
  const powerOn = Boolean(flags.ström_på);
  const flashlightOn = Boolean(flags.flashlight_on);
  const isEn = language === "en";

  // Visa bara om ström INTE är på (annars onödigt)
  if (powerOn) return null;
  if (!hasLight) return null;

  return (
    <button
      onClick={toggleFlashlight}
      className="annotation hover:text-ink transition-colors flex items-center gap-1.5"
      aria-label={
        flashlightOn
          ? isEn
            ? "Turn off torch"
            : "Släck ficklampa"
          : isEn
            ? "Turn on torch"
            : "Tänd ficklampa"
      }
      title={
        flashlightOn
          ? isEn
            ? "torch on"
            : "ficklampa på"
          : isEn
            ? "torch off"
            : "ficklampa av"
      }
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={flashlightOn ? "var(--color-accent)" : "currentColor"}
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M9 2h6v4l3 3v3l-12 12-3-3 12-12h-3l-3-3z" />
        {flashlightOn && (
          <>
            <line x1="19" y1="2" x2="22" y2="2" />
            <line x1="19" y1="5" x2="22" y2="3" />
          </>
        )}
      </svg>
      {flashlightOn
        ? isEn
          ? "torch"
          : "ficklampa"
        : isEn
          ? "torch"
          : "ficklampa"}
    </button>
  );
}

function LanguageToggle() {
  const language = useGameStore((s) => s.state.meta.language);
  const setLanguage = useGameStore((s) => s.setLanguage);
  return (
    <div className="annotation flex items-center gap-2">
      <button
        className={
          language === "sv" ? "text-accent" : "hover:text-ink transition-colors"
        }
        onClick={() => setLanguage("sv")}
      >
        SV
      </button>
      <span className="opacity-50">/</span>
      <button
        className={
          language === "en" ? "text-accent" : "hover:text-ink transition-colors"
        }
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}

function SceneEyebrow({ scene }: { scene: Scene }) {
  return (
    <div className="scene-eyebrow flex justify-between items-baseline">
      <span>
        {scene.language === "en" ? `Act ${scene.act}` : `Akt ${scene.act}`}{" "}
        <span className="opacity-50">·</span> {scene.id.replace("scene-", "Sc. ")}
      </span>
      <span className="opacity-60 normal-case italic tracking-normal font-serif">
        {scene.type === "BN" || scene.type === "sb" ? (scene.language === "en" ? "passage" : "passage") : ""}
      </span>
    </div>
  );
}

function HeroImage({ scene }: { scene: Scene }) {
  const img = getSceneImage(scene.id);
  if (!img) return null;
  return (
    <figure className="hero-image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={scene.language === "en" ? img.alt_en : img.alt_sv}
        loading="eager"
      />
      <span className="image-grain" aria-hidden="true" />
    </figure>
  );
}

export default function SceneView({ initialScene, initialAvailable }: Props) {
  const state = useGameStore((s) => s.state);
  const hydrated = useGameStore((s) => s.hydrated);
  const applyChoice = useGameStore((s) => s.applyChoice);
  const reset = useGameStore((s) => s.reset);

  const [scene, setScene] = useState<Scene | null>(initialScene);
  const [sceneMissing, setSceneMissing] = useState<boolean>(!initialAvailable);
  const [pending, setPending] = useState<Choice | null>(null);
  const [mapOpen, setMapOpen] = useState(false);

  const targetSceneId = hydrated ? state.location.current_scene : initialScene.id;
  const targetLanguage = hydrated ? state.meta.language : initialScene.language;

  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;
    setSceneMissing(false);
    setPending(null);
    // Skrolla alltid till toppen vid scen-byte så spelaren börjar läsa från
    // början, inte mitt i.
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    loadSceneClient(targetSceneId, targetLanguage)
      .then((s) => {
        if (cancelled) return;
        if (!s) {
          setScene(null);
          setSceneMissing(true);
        } else {
          setScene(s);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setSceneMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [hydrated, targetSceneId, targetLanguage]);

  const playableChoices = useMemo(() => {
    if (!scene)
      return [] as Array<{ choice: Choice; allowed: boolean; reason?: string }>;

    // Q&A-mechanic: hide self-loop choices that have already been clicked
    // in this scene, and (when max_choices is set) hide all remaining
    // self-loop choices once the limit is reached so the player is forced
    // onward via the "Go on" exit.
    const selfLoopUsedCount = state.meta.choices_log.filter(
      (e) => e.scene_id === scene.id && e.choice_id !== `${scene.id}-c-continue`,
    ).length;

    const usedChoiceIds = new Set(
      state.meta.choices_log
        .filter((e) => e.scene_id === scene.id)
        .map((e) => e.choice_id),
    );

    const visibleAfterFilter = scene.choices.filter((c) => {
      const isSelfLoop = c.next_scene === scene.id;
      // Never filter the auto-generated continue choice.
      if (c.id === `${scene.id}-c-continue`) return true;
      if (isSelfLoop) {
        if (usedChoiceIds.has(c.id)) return false;
        if (scene.max_choices && selfLoopUsedCount >= scene.max_choices) {
          return false;
        }
      }
      return true;
    });

    return visibleAfterFilter.map((c) => {
      const r = canChoose(c, state);
      return { choice: c, allowed: r.allowed, reason: r.reason };
    });
  }, [scene, state]);

  const isPackingScene = scene?.id === "scene-002";
  const isRitualScene = scene?.id === "scene-031";
  const isEn = state.meta.language === "en";

  function pickChoice(choice: Choice) {
    if (choice.body) {
      setPending(choice);
      // Scroll to top so the outcome is visible
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      applyChoice(choice);
    }
  }

  function confirmPending() {
    if (!pending) return;
    const c = pending;
    setPending(null);
    applyChoice(c);
  }

  return (
    <>
      <main className="mx-auto max-w-prose px-6 py-10 min-h-screen flex flex-col pb-28">
        <header className="flex items-center justify-between mb-10">
          <span className="wordmark text-base">Vi som söker</span>
          <div className="flex items-center gap-5">
            <FlashlightToggle />
            <AudioSync />
            <button
              onClick={() => setMapOpen(true)}
              disabled={state.location.visited_rooms.length === 0}
              className="annotation hover:text-ink transition-colors flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={isEn ? "Open map" : "Öppna karta"}
              title={
                state.location.visited_rooms.length === 0
                  ? isEn
                    ? "available once you reach the house"
                    : "tillgänglig när du är framme"
                  : ""
              }
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" />
                <path d="M9 4v14M15 6v14" />
              </svg>
              {isEn ? "map" : "karta"}
            </button>
            <LanguageToggle />
          </div>
        </header>

        {sceneMissing ? (
          <section className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-24">
            <p className="annotation">{isEn ? "Missing fragment" : "Fragmentet saknas"}</p>
            <p className="font-serif italic text-ink-dim max-w-xs">
              {isEn
                ? "This part of the story has not yet surfaced."
                : "Den här delen av berättelsen har inte stigit upp än."}
            </p>
            <p className="annotation opacity-60">
              {targetSceneId} · {targetLanguage}
            </p>
            <button
              className="annotation hover:text-ink underline-offset-4 hover:underline mt-4"
              onClick={() => reset()}
            >
              {isEn ? "begin again" : "börja om"}
            </button>
          </section>
        ) : !scene ? (
          <p className="text-muted italic">…</p>
        ) : isPackingScene ? (
          <PackingScene scene={scene} />
        ) : isRitualScene ? (
          <RitualScene scene={scene} />
        ) : pending ? (
          <article className="scene-prose flex-1 stagger-prose">
            <SceneEyebrow scene={scene} />
            <h1 className="scene-title mb-8">{scene.title}</h1>

            <div className="outcome-block">
              <div className="outcome-choice">
                {isEn ? "you chose" : "du valde"}
              </div>
              <div className="outcome-text">{pending.text}</div>
            </div>

            {renderProse(pending.body!)}

            <div className="mt-10">
              <button
                onClick={confirmPending}
                className="choice-button"
                data-emphasis="true"
              >
                {isEn ? "Continue →" : "Vidare →"}
              </button>
            </div>
          </article>
        ) : (
          <>
            <article className="scene-prose flex-1 stagger-prose">
              <SceneEyebrow scene={scene} />
              <h1 className="scene-title mb-8">{scene.title}</h1>
              <HeroImage scene={scene} />
              {(() => {
                const selected = selectProse(scene, state);
                return (
                  <>
                    {selected.mode !== "default" && selected.mode !== "power" && (
                      <p className="annotation mb-3 text-[0.65rem]">
                        {selected.mode === "flashlight"
                          ? isEn
                            ? "in the torchlight"
                            : "i ficklampans sken"
                          : selected.mode === "revisit"
                            ? isEn
                              ? "you are back here"
                              : "du är tillbaka här"
                            : ""}
                      </p>
                    )}
                    {renderProse(selected.text)}
                  </>
                );
              })()}
            </article>

            <section className="space-y-3">
              <div className="ornament" aria-hidden="true">
                <span className="ornament-glyph">·  ·  ·</span>
              </div>
              <div className="annotation mb-2">
                {isEn ? "What you do" : "Vad du gör"}
              </div>
              {playableChoices.length === 0 ? (
                <p className="text-muted italic">
                  {isEn ? "No choices available." : "Inga val tillgängliga."}
                </p>
              ) : (
                playableChoices.map(({ choice, allowed, reason }) => (
                  <button
                    key={choice.id}
                    disabled={!allowed}
                    onClick={() => pickChoice(choice)}
                    className="choice-button"
                  >
                    {choice.text}
                    {!allowed && reason && (
                      <span className="block text-xs text-muted/60 mt-1 italic">
                        ({reason})
                      </span>
                    )}
                  </button>
                ))
              )}
            </section>
          </>
        )}

        <footer className="mt-12 flex justify-between items-center annotation">
          <span>{scene?.id ?? ""}</span>
          <FeedbackWidget />
        </footer>
      </main>

      <ChoiceFeedback />
      <StatusPanel state={state} />
      <HouseMap open={mapOpen} onClose={() => setMapOpen(false)} />
    </>
  );
}
