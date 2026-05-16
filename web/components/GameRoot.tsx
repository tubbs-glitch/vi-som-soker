"use client";

import { useEffect, useState } from "react";
import type { Scene } from "@/lib/story-engine";
import { useGameStore } from "@/lib/store";
import CharCreation from "./CharCreation";
import SceneView from "./SceneView";
import DevPanel from "./DevPanel";

interface Props {
  initialScene: Scene;
}

export default function GameRoot({ initialScene }: Props) {
  const hydrated = useGameStore((s) => s.hydrated);
  const hydrate = useGameStore((s) => s.hydrate);
  const phase = useGameStore((s) => s.phase);
  const [devEnabled, setDevEnabled] = useState(false);

  useEffect(() => {
    hydrate();
    // Aktivera dev-läge via ?dev=1 i URL eller localStorage
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("dev") === "1";
      const fromStorage =
        window.localStorage.getItem("vi-som-soker:dev") === "1";
      if (fromUrl) {
        window.localStorage.setItem("vi-som-soker:dev", "1");
      }
      setDevEnabled(fromUrl || fromStorage);
    }
  }, [hydrate]);

  // Innan hydration: visa minimal placeholder så vi inte flickrar mellan
  // char creation och spelet vid första renderingen.
  if (!hydrated) {
    return (
      <main className="mx-auto max-w-prose px-6 py-12 min-h-screen flex items-center justify-center">
        <p className="text-muted italic">…</p>
      </main>
    );
  }

  if (phase === "char-creation") {
    return (
      <>
        <CharCreation />
        <DevPanel enabled={devEnabled} />
      </>
    );
  }

  return (
    <>
      <SceneView initialScene={initialScene} initialAvailable={true} />
      <DevPanel enabled={devEnabled} />
    </>
  );
}
