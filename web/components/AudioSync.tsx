"use client";

import { useEffect, useState } from "react";
import { audioController } from "@/lib/audio/audio-controller";
import { getSceneSfx } from "@/lib/audio/scene-sfx";
import { useGameStore } from "@/lib/store";

/**
 * Tunn React-wrapper: lyssnar på current scene och uppdaterar audio.
 * Renderar en liten ljud-toggle uppe i headern.
 */
export default function AudioSync() {
  const language = useGameStore((s) => s.state.meta.language);
  const sceneId = useGameStore((s) => s.state.location.current_scene);
  const phase = useGameStore((s) => s.phase);
  const isEn = language === "en";

  const [, force] = useState(0);
  useEffect(() => {
    audioController.hydratePref();
    const unsub = audioController.subscribe(() => force((x) => x + 1));
    return () => {
      unsub();
    };
  }, []);

  // Hymn-flagga
  const hymnOn = useGameStore((s) =>
    Boolean(
      (s.state.story_flags as unknown as Record<string, unknown>)
        .hymnen_låten_på,
    ),
  );

  // Sync drone-zon med current scene + spela scene-entry SFX.
  useEffect(() => {
    if (phase !== "playing") return;
    if (!audioController.isUnlocked()) return;
    audioController.setScene(sceneId);
    const sfx = getSceneSfx(sceneId);
    if (sfx.length > 0) {
      const t = setTimeout(() => {
        for (const id of sfx) {
          audioController.playSfx(id);
        }
      }, 400);
      return () => clearTimeout(t);
    }
  }, [phase, sceneId]);

  // Sync hymn-loopen — startar/stoppar baserat på flagga
  useEffect(() => {
    if (phase !== "playing") return;
    if (!audioController.isUnlocked()) return;
    audioController.setHymnPlaying(hymnOn);
  }, [phase, hymnOn]);

  const unlocked = audioController.isUnlocked();
  const muted = audioController.isMuted();

  function toggle() {
    if (!unlocked) {
      audioController.unlock();
      // Trigger initial scene-load + hymn-sync nu när vi är unlocked.
      // I char-creation finns ingen aktiv scen — sätt en intro-zon manuellt.
      if (phase === "playing") {
        audioController.setScene(sceneId);
        audioController.setHymnPlaying(hymnOn);
      } else {
        audioController.setScene("scene-001"); // intro-zon
      }
    } else {
      audioController.setMuted(!muted);
    }
  }

  return (
    <button
      onClick={toggle}
      className="annotation hover:text-ink transition-colors flex items-center gap-1.5"
      aria-label={
        muted
          ? isEn
            ? "Enable audio"
            : "Slå på ljud"
          : isEn
            ? "Mute"
            : "Tysta"
      }
      title={
        !unlocked
          ? isEn
            ? "tap to enable audio"
            : "klicka för att starta ljud"
          : muted
            ? isEn
              ? "audio off"
              : "ljud av"
            : isEn
              ? "audio on"
              : "ljud på"
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
        {!unlocked || muted ? (
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        ) : (
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
          </>
        )}
      </svg>
      {!unlocked
        ? isEn
          ? "audio"
          : "ljud"
        : muted
          ? isEn
            ? "muted"
            : "tystat"
          : isEn
            ? "audio"
            : "ljud"}
    </button>
  );
}
