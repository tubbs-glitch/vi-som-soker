"use client";

import { useEffect, useRef, useState } from "react";
import type { Scene } from "@/lib/story-engine";
import { useGameStore } from "@/lib/store";
import { audioController } from "@/lib/audio/audio-controller";

/**
 * Interaktiv ritual-puzzle för scen-031.
 *
 * Alice's instruktioner (kända om spelaren läst pärm + dagbok):
 *   1. Strö tjärsten medurs från norr
 *   2. Träffa takt 47 när du kliver in i cirkeln
 *   3. Stå still i tre andetag
 *
 * Två faser:
 *   A. Direction-puzzle: spelaren ser en cirkel och måste välja medurs/motsols + startpunkt (N/S/Ö/V)
 *   B. Timing-puzzle: en pulserande takt visas, spelaren måste klicka när det är takt 47
 *
 * Resultatet sätter `ritual_korrekt` (full/partial/nej) + `salt_riktning` + andra flaggor,
 * sedan applicerar en syntetisk choice som leder till scene-032.
 */

interface Props {
  scene: Scene;
}

type Direction = "N" | "Ö" | "S" | "V";

const BEAT_TOTAL = 60;
const BEAT_TARGET = 47;
const BEAT_MS = 350;
const BEAT_WINDOW = 1; // ±1 takt godkänns som "full"

export default function RitualScene({ scene }: Props) {
  const language = useGameStore((s) => s.state.meta.language);
  const flags = useGameStore(
    (s) => s.state.story_flags as unknown as Record<string, unknown>,
  );
  const inventory = useGameStore((s) => s.state.inventory.items);
  const goToRoom = useGameStore((s) => s.goToRoom);
  const isEn = language === "en";

  const hasTjarsten = inventory.some((i) => i.id === "tjärsten");
  const hymnenSpelar = Boolean(flags.hymnen_låten_på);
  const knowsTimingFromAlice = Boolean(flags.har_läst_dagboken);
  const knowsDirectionFromAstrid = Boolean(flags.har_läst_astrids_parm);

  const [phase, setPhase] = useState<"intro" | "salt" | "timing" | "results">(
    "intro",
  );

  // Salt-puzzle
  const [direction, setDirection] = useState<"medurs" | "motsols" | null>(null);
  const [startPoint, setStartPoint] = useState<Direction | null>(null);

  // Timing-puzzle
  const [beat, setBeat] = useState(0);
  const [running, setRunning] = useState(false);
  const [hitBeat, setHitBeat] = useState<number | null>(null);
  const beatRef = useRef(0);

  useEffect(() => {
    if (phase === "timing" && running) {
      const id = setInterval(() => {
        beatRef.current += 1;
        setBeat(beatRef.current);
        if (beatRef.current >= BEAT_TOTAL) {
          setRunning(false);
          if (hitBeat === null) {
            // Spelaren klev aldrig in
            setHitBeat(-1);
          }
          setTimeout(() => setPhase("results"), 800);
        }
      }, BEAT_MS);
      return () => clearInterval(id);
    }
  }, [phase, running, hitBeat]);

  function hit() {
    if (!running || hitBeat !== null) return;
    setHitBeat(beatRef.current);
    setRunning(false);
    audioController.playSfx("low_thud");
    setTimeout(() => setPhase("results"), 800);
  }

  function startTiming() {
    beatRef.current = 0;
    setBeat(0);
    setHitBeat(null);
    setRunning(true);
    setPhase("timing");
  }

  function applyResult() {
    // Klassificera ritualens kvalitet
    let kvalitet: "full" | "partial" | "nej" = "nej";
    let riktning: "medurs" | "motsols" | "ingen" = "ingen";

    if (!hasTjarsten || !direction || !startPoint) {
      kvalitet = "nej";
      riktning = "ingen";
    } else {
      riktning = direction;
      const beatOk =
        hitBeat !== null &&
        hitBeat > 0 &&
        Math.abs(hitBeat - BEAT_TARGET) <= BEAT_WINDOW;
      const dirOk = direction === "medurs";
      const startOk = startPoint === "N";

      if (dirOk && startOk && beatOk && hymnenSpelar) {
        kvalitet = "full";
      } else if (dirOk && (startOk || beatOk)) {
        kvalitet = "partial";
      } else if (beatOk || dirOk) {
        kvalitet = "partial";
      } else {
        kvalitet = "nej";
      }
    }

    // Bygg synthetisk choice baserad på resultat
    const sanity_delta =
      kvalitet === "full" ? +3 : kvalitet === "partial" ? -5 : -12;
    // Vi använder goToRoom-utility med en specifik scen — målet är scene-032
    // (klivet in i portalen). Vi sätter inga flags här direkt, men engine:n
    // har inte stöd för det via goToRoom — så vi behöver hacka oss in via
    // localStorage direkt.
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem("vi-som-soker:state");
        if (raw) {
          const s = JSON.parse(raw);
          s.story_flags = {
            ...s.story_flags,
            ritual_korrekt: kvalitet,
            salt_riktning: riktning,
            klivit_in_i_portalen: true,
            hymnen_börjat: hymnenSpelar,
          };
          s.sanity = {
            value: Math.max(0, Math.min(100, (s.sanity?.value ?? 90) + sanity_delta)),
          };
          window.localStorage.setItem("vi-som-soker:state", JSON.stringify(s));
        }
      } catch (e) {
        console.error(e);
      }
    }
    goToRoom("scene-032");
  }

  // UI varianter
  const proseDefault = scene.prose;

  return (
    <article className="scene-prose flex-1 stagger-prose">
      <div className="scene-eyebrow flex justify-between items-baseline">
        <span>
          {isEn ? `Act ${scene.act}` : `Akt ${scene.act}`}{" "}
          <span className="opacity-50">·</span> Sc. 031
        </span>
        <span className="opacity-60 normal-case italic tracking-normal font-serif">
          {isEn ? "ritual" : "ritual"}
        </span>
      </div>
      <h1 className="scene-title mb-8">{scene.title}</h1>

      {phase === "intro" && (
        <>
          {proseDefault.split(/\n{2,}/).map((p, i) => (
            <p key={i}>{p.trim()}</p>
          ))}

          <div className="ornament my-6" aria-hidden="true">
            <span className="ornament-glyph">·  ·  ·</span>
          </div>

          {/* Tankehjälp för vad spelaren vet */}
          <div className="my-6 border border-muted-soft/40 p-4 text-sm space-y-2">
            <div className="annotation mb-2">
              {isEn ? "What you remember" : "Vad du minns"}
            </div>
            <ul className="space-y-1.5 font-serif italic text-ink-dim text-[0.9rem]">
              {hasTjarsten ? (
                <li>
                  •{" "}
                  {isEn
                    ? "You have the jar of tar-salt."
                    : "Du har burken med tjärsten."}
                </li>
              ) : (
                <li className="text-danger">
                  •{" "}
                  {isEn
                    ? "You have no tar-salt. The circle will not catch."
                    : "Du har ingen tjärsten. Cirkeln kommer inte fatta."}
                </li>
              )}
              {hymnenSpelar ? (
                <li>
                  •{" "}
                  {isEn
                    ? "The hymn is playing above. You hear it through the floor."
                    : "Hymnen spelar däruppe. Du hör den genom golvet."}
                </li>
              ) : (
                <li className="text-danger">
                  •{" "}
                  {isEn
                    ? "No music plays. The turntable spins but the needle is up."
                    : "Ingen musik. Skivspelaren snurrar men nålen står upp."}
                </li>
              )}
              {knowsDirectionFromAstrid && (
                <li>
                  •{" "}
                  {isEn
                    ? "Astrid's binder: 'clockwise from north.'"
                    : "Astrids pärm: 'medurs, från norr.'"}
                </li>
              )}
              {knowsTimingFromAlice && (
                <li>
                  •{" "}
                  {isEn
                    ? "Alice's diary: 'beat 47, not before, not after.'"
                    : "Alices dagbok: 'takt 47, inte före, inte efter.'"}
                </li>
              )}
              {!knowsDirectionFromAstrid && !knowsTimingFromAlice && (
                <li className="text-muted">
                  •{" "}
                  {isEn
                    ? "You don't remember the exact instructions. You'll have to guess."
                    : "Du minns inte exakt vad de skrev. Du får gissa."}
                </li>
              )}
            </ul>
          </div>

          <button
            onClick={() => setPhase("salt")}
            className="choice-button"
            data-emphasis="true"
            disabled={!hasTjarsten}
          >
            {hasTjarsten
              ? isEn
                ? "Begin — open the jar →"
                : "Börja — öppna burken →"
              : isEn
                ? "You cannot begin without tar-salt"
                : "Du kan inte börja utan tjärsten"}
          </button>
        </>
      )}

      {phase === "salt" && (
        <SaltPuzzle
          direction={direction}
          startPoint={startPoint}
          onSetDirection={setDirection}
          onSetStart={setStartPoint}
          onContinue={startTiming}
          isEn={isEn}
        />
      )}

      {phase === "timing" && (
        <TimingPuzzle
          beat={beat}
          hitBeat={hitBeat}
          onHit={hit}
          running={running}
          isEn={isEn}
        />
      )}

      {phase === "results" && (
        <ResultsBlock
          direction={direction}
          startPoint={startPoint}
          hitBeat={hitBeat}
          hasTjarsten={hasTjarsten}
          hymnenSpelar={hymnenSpelar}
          onContinue={applyResult}
          isEn={isEn}
        />
      )}
    </article>
  );
}

function SaltPuzzle({
  direction,
  startPoint,
  onSetDirection,
  onSetStart,
  onContinue,
  isEn,
}: {
  direction: "medurs" | "motsols" | null;
  startPoint: Direction | null;
  onSetDirection: (d: "medurs" | "motsols") => void;
  onSetStart: (s: Direction) => void;
  onContinue: () => void;
  isEn: boolean;
}) {
  const ready = direction !== null && startPoint !== null;

  return (
    <div className="space-y-6 animate-fade-in">
      <p>
        {isEn
          ? "You kneel by the circle, the jar in your left hand. The crystals are dark and heavy."
          : "Du knäböjer vid cirkeln med burken i vänster hand. Kristallerna är mörka och tunga."}
      </p>

      <div className="annotation">
        {isEn ? "Choose direction" : "Välj riktning"}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onSetDirection("medurs")}
          className="choice-button"
          data-selected={direction === "medurs"}
        >
          ↻ {isEn ? "Clockwise" : "Medurs"}
        </button>
        <button
          onClick={() => onSetDirection("motsols")}
          className="choice-button"
          data-selected={direction === "motsols"}
        >
          ↺ {isEn ? "Counter-clockwise" : "Motsols"}
        </button>
      </div>

      <div className="annotation">
        {isEn ? "Choose starting point" : "Välj startpunkt"}
      </div>
      <div className="mx-auto" style={{ maxWidth: "16rem" }}>
        <CompassPicker selected={startPoint} onSelect={onSetStart} isEn={isEn} />
      </div>

      <button
        onClick={onContinue}
        disabled={!ready}
        className="choice-button"
        data-emphasis={ready}
      >
        {isEn
          ? "I have strewn the salt — step into the circle →"
          : "Jag har strött saltet — kliv in i cirkeln →"}
      </button>
    </div>
  );
}

function CompassPicker({
  selected,
  onSelect,
  isEn,
}: {
  selected: Direction | null;
  onSelect: (d: Direction) => void;
  isEn: boolean;
}) {
  const dirs: { d: Direction; label_sv: string; label_en: string; x: number; y: number }[] = [
    { d: "N", label_sv: "N", label_en: "N", x: 50, y: 10 },
    { d: "Ö", label_sv: "Ö", label_en: "E", x: 90, y: 50 },
    { d: "S", label_sv: "S", label_en: "S", x: 50, y: 90 },
    { d: "V", label_sv: "V", label_en: "W", x: 10, y: 50 },
  ];

  return (
    <div className="relative" style={{ aspectRatio: "1 / 1" }}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="var(--color-muted-soft)"
          strokeWidth="0.8"
          strokeDasharray="2 1.5"
        />
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="var(--color-accent)"
          opacity="0.7"
        />
      </svg>
      {dirs.map((d) => (
        <button
          key={d.d}
          onClick={() => onSelect(d.d)}
          className={
            "absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border font-serif transition-colors " +
            (selected === d.d
              ? "border-accent text-accent bg-accent/10"
              : "border-muted-soft text-muted hover:border-ink-dim hover:text-ink")
          }
          style={{ left: `${d.x}%`, top: `${d.y}%` }}
        >
          {isEn ? d.label_en : d.label_sv}
        </button>
      ))}
    </div>
  );
}

function TimingPuzzle({
  beat,
  hitBeat,
  onHit,
  running,
  isEn,
}: {
  beat: number;
  hitBeat: number | null;
  onHit: () => void;
  running: boolean;
  isEn: boolean;
}) {
  // En enkel takt-räknare som pulsar. Spelaren ska klicka på takt 47.
  const showCountdown = beat > BEAT_TARGET - 6 && beat < BEAT_TARGET + 4;

  return (
    <div className="space-y-6 text-center animate-fade-in">
      <p className="text-left">
        {isEn
          ? "The hymn pulses through the floor. Each beat lands like a foot in cold water. You stand at the edge of the circle. You step in when the right beat comes."
          : "Hymnen pulserar genom golvet. Varje takt landar som en fot i kallt vatten. Du står vid cirkelns kant. Du kliver in när rätt takt kommer."}
      </p>

      <div
        className="mx-auto relative flex flex-col items-center justify-center"
        style={{ maxWidth: "18rem", minHeight: "14rem" }}
      >
        {/* Cirkeln med en puls */}
        <div
          className="absolute inset-0 rounded-full border border-accent/40"
          style={{
            transform: `scale(${1 + (beat % 2) * 0.04})`,
            transition: "transform 200ms ease-out",
            opacity: 0.4,
          }}
        />
        <div
          className="text-6xl font-mono text-accent"
          style={{
            transform: `scale(${1 + (beat % 2) * 0.05})`,
            transition: "transform 200ms ease-out",
          }}
        >
          {showCountdown ? beat : "·"}
        </div>
        <p className="annotation mt-4">
          {hitBeat !== null
            ? isEn
              ? "you stepped in"
              : "du klev in"
            : isEn
              ? "the count rises"
              : "räkningen stiger"}
        </p>
      </div>

      <button
        onClick={onHit}
        disabled={!running || hitBeat !== null}
        className="choice-button max-w-md mx-auto"
        data-emphasis="true"
      >
        {hitBeat === null
          ? isEn
            ? "Step in"
            : "Kliv in"
          : isEn
            ? `you stepped in on ${hitBeat}`
            : `du klev in på ${hitBeat}`}
      </button>
    </div>
  );
}

function ResultsBlock({
  direction,
  startPoint,
  hitBeat,
  hasTjarsten,
  hymnenSpelar,
  onContinue,
  isEn,
}: {
  direction: "medurs" | "motsols" | null;
  startPoint: Direction | null;
  hitBeat: number | null;
  hasTjarsten: boolean;
  hymnenSpelar: boolean;
  onContinue: () => void;
  isEn: boolean;
}) {
  const beatOk =
    hitBeat !== null && hitBeat > 0 && Math.abs(hitBeat - BEAT_TARGET) <= BEAT_WINDOW;
  const dirOk = direction === "medurs";
  const startOk = startPoint === "N";
  const full = dirOk && startOk && beatOk && hymnenSpelar && hasTjarsten;
  const partial = !full && hasTjarsten && (dirOk || beatOk);

  let prose: string;
  if (!hasTjarsten) {
    prose = isEn
      ? "Without tar-salt, the circle is only chalk. You step in. Nothing catches — but something opens, thinner, more like a crack than a door."
      : "Utan tjärsten är cirkeln bara krita. Du kliver in. Inget fattar — men något öppnar sig, tunnare, mer som en spricka än en dörr.";
  } else if (full) {
    prose = isEn
      ? "The salt is laid as Astrid wrote and the beat is the one Alice circled. The hymn climbs through the floor at the same moment your foot lands. The circle takes. Light gathers — not light you see with your eyes, light that knows your name."
      : "Saltet är lagt som Astrid skrev och takten är den som Alice ringat in. Hymnen stiger genom golvet i samma sekund som din fot landar. Cirkeln fattar. Ljus samlas — inte ljus du ser med ögonen, ljus som vet ditt namn.";
  } else if (partial) {
    prose = isEn
      ? "Something is off. You feel it in the small bones of your ankles before you see it. The circle opens — but on the wrong side, or in the wrong way. It is enough."
      : "Något stämmer inte. Du känner det i vristens småben innan du ser det. Cirkeln öppnar sig — men på fel sida, eller på fel sätt. Det räcker.";
  } else {
    prose = isEn
      ? "The circle does not catch. It is a circle drawn on a floor by people who could not understand the writing they were copying. You step in anyway. Something opens. It is not what was supposed to open."
      : "Cirkeln fattar inte. Det är en cirkel ritad på ett golv av människor som inte kunde förstå skriften de kopierade. Du kliver in ändå. Något öppnar sig. Det är inte vad som skulle öppna sig.";
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="outcome-block">
        <div className="outcome-choice">
          {isEn ? "what you did" : "vad du gjorde"}
        </div>
        <div className="outcome-text text-sm space-y-1">
          <div>
            {isEn ? "Direction:" : "Riktning:"}{" "}
            <span className={dirOk ? "text-sun" : "text-accent"}>
              {direction === "medurs"
                ? isEn
                  ? "clockwise"
                  : "medurs"
                : direction === "motsols"
                  ? isEn
                    ? "counter-clockwise"
                    : "motsols"
                  : isEn
                    ? "none"
                    : "ingen"}
            </span>
          </div>
          <div>
            {isEn ? "Start point:" : "Startpunkt:"}{" "}
            <span className={startOk ? "text-sun" : "text-accent"}>
              {startPoint ?? (isEn ? "none" : "ingen")}
            </span>
          </div>
          <div>
            {isEn ? "Beat:" : "Takt:"}{" "}
            <span className={beatOk ? "text-sun" : "text-accent"}>
              {hitBeat === null
                ? isEn
                  ? "never"
                  : "aldrig"
                : hitBeat < 0
                  ? isEn
                    ? "never stepped"
                    : "klev aldrig"
                  : `${hitBeat}`}{" "}
              {beatOk
                ? isEn
                  ? "(close to 47)"
                  : "(nära 47)"
                : isEn
                  ? "(target was 47)"
                  : "(målet var 47)"}
            </span>
          </div>
        </div>
      </div>

      {prose.split(/\n{2,}/).map((p, i) => (
        <p key={i}>{p.trim()}</p>
      ))}

      <button
        onClick={onContinue}
        className="choice-button"
        data-emphasis="true"
      >
        {isEn ? "Step through →" : "Kliv igenom →"}
      </button>
    </div>
  );
}
