"use client";

import { useState } from "react";
import type {
  Background,
  Build,
  Character,
  CharacterStats,
  Feature,
  Gender,
  Hair,
} from "@/lib/story-engine";
import { useGameStore } from "@/lib/store";
import { COVER_IMAGE, COVER_IMAGE_ILLU } from "@/lib/scene-images";
import AudioSync from "./AudioSync";

type StatKey = keyof CharacterStats;

interface ArchetypeSpec {
  id: Background;
  name_sv: string;
  name_en: string;
  blurb_sv: string;
  blurb_en: string;
  stats: CharacterStats;
}

const ARCHETYPES: ArchetypeSpec[] = [
  {
    id: "studerande",
    name_sv: "Den studerande",
    name_en: "The Scholar",
    blurb_sv:
      "Du läste in en examen som ingen i din familj hade. Du läser fortfarande mer än folk i din ålder.",
    blurb_en:
      "You took a degree no one in your family had taken. You still read more than people your age.",
    stats: { sty: 3, dex: 4, för: 8, mod: 5 },
  },
  {
    id: "fysisk",
    name_sv: "Den fysiska",
    name_en: "The Hands",
    blurb_sv:
      "Du har alltid använt händerna. Du fixar saker. Du tänker med kroppen.",
    blurb_en:
      "You've always used your hands. You fix things. You think with your body.",
    stats: { sty: 7, dex: 6, för: 4, mod: 5 },
  },
  {
    id: "empatisk",
    name_sv: "Den empatiska",
    name_en: "The Listener",
    blurb_sv:
      "Du läser rum. Du minns vad folk inte säger. Du är den som blir uppringd när någon mår dåligt.",
    blurb_en:
      "You read rooms. You remember what people don't say. You're the one who gets called when someone is in trouble.",
    stats: { sty: 4, dex: 5, för: 5, mod: 7 },
  },
  {
    id: "ifrågasättande",
    name_sv: "Den ifrågasättande",
    name_en: "The Skeptic",
    blurb_sv:
      "Du har aldrig accepterat ett svar på första försöket. Du tror inte på saker du inte sett själv.",
    blurb_en:
      "You've never accepted an answer on the first try. You don't believe what you haven't seen yourself.",
    stats: { sty: 4, dex: 5, för: 6, mod: 6 },
  },
  {
    id: "default",
    name_sv: "Lämna det öppet",
    name_en: "Leave it open",
    blurb_sv:
      "Du är någon. Du blev den genom mycket. Inget av det formade dig mer än annat.",
    blurb_en:
      "You are someone. Many things shaped you. None more than the rest.",
    stats: { sty: 5, dex: 5, för: 5, mod: 5 },
  },
];

const STAT_NAMES_SV: Record<StatKey, string> = {
  sty: "Styrka",
  dex: "Smidighet",
  för: "Förstånd",
  mod: "Mod",
};
const STAT_NAMES_EN: Record<StatKey, string> = {
  sty: "Strength",
  dex: "Agility",
  för: "Insight",
  mod: "Resolve",
};

function statLabel(v: number, isEn: boolean): string {
  if (isEn) {
    if (v <= 2) return "markedly weak";
    if (v <= 4) return "a little weak";
    if (v === 5) return "ordinary";
    if (v <= 7) return "strong";
    if (v <= 9) return "markedly strong";
    return "exceptional";
  }
  if (v <= 2) return "påtagligt svag";
  if (v <= 4) return "lite svag";
  if (v === 5) return "vanlig";
  if (v <= 7) return "stark";
  if (v <= 9) return "påtagligt stark";
  return "exceptionell";
}

type Phase = "intro" | 1 | 2 | 3 | 4;

const STEP_LABELS_SV: Record<1 | 2 | 3 | 4, string> = {
  1: "Vem du är",
  2: "Om du tittade",
  3: "Vad har format dig",
  4: "Det här är vem du är",
};
const STEP_LABELS_EN: Record<1 | 2 | 3 | 4, string> = {
  1: "Who you are",
  2: "If you looked",
  3: "What shaped you",
  4: "This is who you are",
};

export default function CharCreation() {
  const language = useGameStore((s) => s.state.meta.language);
  const setLanguage = useGameStore((s) => s.setLanguage);
  const startGame = useGameStore((s) => s.startGame);
  const imageStyle = useGameStore((s) => s.imageStyle);
  const setImageStyle = useGameStore((s) => s.setImageStyle);
  const isEn = language === "en";
  const cover = imageStyle === "illustration" ? COVER_IMAGE_ILLU : COVER_IMAGE;

  const [phase, setPhase] = useState<Phase>("intro");

  const [gender, setGender] = useState<Gender>("otydlig");
  const [name, setName] = useState<string>("");
  const [hair, setHair] = useState<Hair>("mörkt");
  const [build, setBuild] = useState<Build>("vanlig");
  const [feature, setFeature] = useState<Feature>("inget");
  const [background, setBackground] = useState<Background>("default");

  const archetype = ARCHETYPES.find((a) => a.id === background) ?? ARCHETYPES[4];
  const baseStats: CharacterStats = archetype.stats;
  const [stats, setStats] = useState<CharacterStats>(baseStats);
  const [moved, setMoved] = useState<{ from: StatKey; to: StatKey } | null>(
    null,
  );

  function chooseBackground(b: Background) {
    setBackground(b);
    const a = ARCHETYPES.find((x) => x.id === b) ?? ARCHETYPES[4];
    setStats(a.stats);
    setMoved(null);
  }

  function adjustStat(from: StatKey, to: StatKey) {
    if (moved) return;
    if (stats[from] <= 0 || stats[to] >= 10) return;
    setStats({
      ...stats,
      [from]: stats[from] - 1,
      [to]: stats[to] + 1,
    });
    setMoved({ from, to });
  }

  function resetMove() {
    if (!moved) return;
    setStats(baseStats);
    setMoved(null);
  }

  function finish() {
    const character: Character = {
      name,
      gender,
      appearance: { hair, build, feature },
      background,
      stats,
    };
    startGame(character);
  }

  if (phase === "intro") {
    return (
      <main className="min-h-screen flex flex-col bg-bg">
        <header className="flex items-center justify-between px-6 py-5">
          <span className="wordmark text-base">Vi som söker</span>
          <div className="flex items-center gap-5">
            <AudioSync />
            <div className="annotation flex items-center gap-2">
              <button
                onClick={() =>
                  setImageStyle(
                    imageStyle === "photo" ? "illustration" : "photo",
                  )
                }
                className="hover:text-ink transition-colors"
                title={
                  isEn
                    ? imageStyle === "photo"
                      ? "switch to tapestry style"
                      : "switch to photo style"
                    : imageStyle === "photo"
                      ? "byt till bonad-stil"
                      : "byt till foto-stil"
                }
              >
                {imageStyle === "photo"
                  ? isEn
                    ? "photo"
                    : "foto"
                  : isEn
                    ? "tapestry"
                    : "bonad"}
              </button>
            </div>
            <div className="annotation flex items-center gap-2">
              <button
                className={isEn ? "hover:text-ink" : "text-accent"}
                onClick={() => setLanguage("sv")}
              >
                SV
              </button>
              <span className="opacity-50">/</span>
              <button
                className={isEn ? "text-accent" : "hover:text-ink"}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>
          </div>
        </header>

        <section className="flex-1 flex flex-col items-center px-6 pb-10 max-w-md mx-auto w-full">
          {/* Bild som inramat objekt — inte fullbleed-bakgrund. Funkar för
              både foto och bonad eftersom texten ligger på solid bg under. */}
          <figure
            className="relative w-full mb-8 border border-muted-soft overflow-hidden image-fade-in"
            style={{ aspectRatio: "4 / 5", maxHeight: "55vh" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover.src}
              alt={isEn ? cover.alt_en : cover.alt_sv}
              className="w-full h-full object-cover"
            />
            {imageStyle === "photo" && (
              <span className="image-grain" aria-hidden="true" />
            )}
          </figure>

          <p
            className="annotation mb-4 text-center"
            style={{ animation: "fade-in 1200ms 200ms both" }}
          >
            {isEn
              ? "A story-game · Folk horror · Northern Sweden"
              : "Ett story-spel · folk horror · norra sverige"}
          </p>
          <h1
            className="font-serif font-normal text-ink mb-5 text-center"
            style={{
              fontSize: "clamp(2.1rem, 6vw, 3.4rem)",
              lineHeight: "1.06",
              letterSpacing: "-0.015em",
              fontVariationSettings: '"opsz" 60',
              animation: "fade-up 1200ms 400ms both",
            }}
          >
            {isEn ? (
              <>
                Some numbers{" "}
                <span className="italic text-accent">stay with you</span>
              </>
            ) : (
              <>
                Vissa siffror{" "}
                <span className="italic text-accent">sitter kvar</span>
              </>
            )}
          </h1>
          <p
            className="font-serif italic text-ink-dim text-base leading-relaxed mb-8 text-center"
            style={{
              animation: "fade-up 1200ms 700ms both",
            }}
          >
            {isEn
              ? "Your aunt has not been seen since the storm. Three days. The car is on the drive. The post is still in the box."
              : "Din moster har inte synts till sedan stormen. Tre dagar. Bilen står på uppfarten. Posten ligger ute."}
          </p>
          <div
            className="w-full max-w-xs"
            style={{ animation: "fade-up 1200ms 1000ms both" }}
          >
            <button
              onClick={() => setPhase(1)}
              className="choice-button w-full"
              data-emphasis="true"
            >
              <span className="flex items-center justify-between gap-3">
                <span>{isEn ? "Begin" : "Börja"}</span>
                <span className="text-accent">→</span>
              </span>
            </button>
          </div>
        </section>

        <footer
          className="px-6 py-5 annotation flex justify-between items-center opacity-60"
          style={{ animation: "fade-in 1200ms 1300ms both" }}
        >
          <span>PoC v0.2</span>
          <span className="italic font-serif normal-case tracking-normal text-xs">
            {isEn ? "Hällmyren · midsummer week" : "Hällmyren · midsommarvecka"}
          </span>
        </footer>
      </main>
    );
  }

  const stepNum = phase as 1 | 2 | 3 | 4;
  const stepLabel = isEn ? STEP_LABELS_EN[stepNum] : STEP_LABELS_SV[stepNum];

  return (
    <main className="mx-auto max-w-prose px-6 py-8 min-h-screen flex flex-col pb-16">
      <header className="flex items-center justify-between mb-10">
        <span className="wordmark text-base">Vi som söker</span>
        <div className="annotation flex items-center gap-2">
          <button
            className={isEn ? "hover:text-ink" : "text-accent"}
            onClick={() => setLanguage("sv")}
          >
            SV
          </button>
          <span className="opacity-50">/</span>
          <button
            className={isEn ? "text-accent" : "hover:text-ink"}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
        </div>
      </header>

      <div className="annotation mb-3 flex justify-between">
        <span>
          {isEn ? "Field journal" : "Fältjournal"}{" "}
          <span className="opacity-50">·</span> {String(stepNum).padStart(2, "0")} /
          04
        </span>
        <span>{stepLabel}</span>
      </div>

      <article className="scene-prose flex-1 stagger-prose">
        {stepNum === 1 && (
          <>
            <h1 className="scene-title mb-8">
              {isEn ? "Before the call" : "Innan samtalet"}
            </h1>
            <p>
              {isEn
                ? "Before you pick up and hear Gunnar's voice — you are someone. Not a hero, not chosen. Just someone who happens to get the call. Who are you?"
                : "Innan du tar luren och hör Gunnars röst — du är någon. Inte en hjälte, inte en utvald. Bara någon som råkar få samtalet. Vem är du?"}
            </p>
            <div className="mt-10 space-y-8">
              <fieldset>
                <legend className="annotation mb-3">
                  {isEn ? "Gender" : "Kön"}
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ["man", isEn ? "man" : "man"],
                      ["kvinna", isEn ? "woman" : "kvinna"],
                      ["ickebinär", isEn ? "non-binary" : "ickebinär"],
                      ["otydlig", isEn ? "leave unclear" : "lämna otydligt"],
                    ] as Array<[Gender, string]>
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setGender(id)}
                      className="choice-button"
                      data-selected={gender === id}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="annotation mb-3">
                  {isEn ? "Name (optional)" : "Namn (valfritt)"}
                </legend>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    isEn ? "leave blank for 'you'" : "lämna tomt för 'du'"
                  }
                  className="w-full bg-transparent border border-muted-soft px-4 py-3 font-serif italic text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </fieldset>
            </div>
          </>
        )}

        {stepNum === 2 && (
          <>
            <h1 className="scene-title mb-8">
              {isEn ? "If you looked" : "Om du tittade"}
            </h1>
            <p>
              {isEn
                ? "You haven't checked a mirror in hours. But if you did now, what would you see?"
                : "Du har inte tittat dig i spegeln på flera timmar. Men om du gjorde det nu, vad skulle du se?"}
            </p>
            <div className="mt-10 space-y-7">
              <Picker
                legend={isEn ? "Hair" : "Hår"}
                options={
                  [
                    ["mörkt", isEn ? "dark" : "mörkt"],
                    ["ljust", isEn ? "fair" : "ljust"],
                    ["rödaktigt", isEn ? "reddish" : "rödaktigt"],
                    [
                      "grånat_tidigt",
                      isEn ? "early grey" : "grånat tidigt",
                    ],
                  ] as Array<[Hair, string]>
                }
                selected={hair}
                onSelect={setHair}
              />
              <Picker
                legend={isEn ? "Build" : "Statur"}
                options={
                  [
                    ["smal", isEn ? "slim" : "smal"],
                    ["vanlig", isEn ? "ordinary" : "vanlig"],
                    ["tung", isEn ? "heavy" : "tung"],
                    ["senig", isEn ? "wiry" : "senig"],
                  ] as Array<[Build, string]>
                }
                selected={build}
                onSelect={setBuild}
              />
              <Picker
                legend={isEn ? "A distinguishing feature" : "Ett kännetecken"}
                options={
                  [
                    [
                      "ärr_ögonbryn",
                      isEn
                        ? "a pale scar over one brow"
                        : "ett blekt ärr över ena ögonbrynet",
                    ],
                    [
                      "stelnad_ringfinger",
                      isEn
                        ? "a ring finger that won't quite move"
                        : "ett ringfinger som inte rör sig som det ska",
                    ],
                    [
                      "tatuering_underarm",
                      isEn
                        ? "an old, illegible tattoo on the forearm"
                        : "en tatuering på underarmen, gammal, oläslig",
                    ],
                    [
                      "örhängering",
                      isEn
                        ? "an earring you still wear"
                        : "en örhängering du fortfarande bär",
                    ],
                    [
                      "inget",
                      isEn ? "nothing in particular" : "inget speciellt",
                    ],
                  ] as Array<[Feature, string]>
                }
                selected={feature}
                onSelect={setFeature}
              />
            </div>
          </>
        )}

        {stepNum === 3 && (
          <>
            <h1 className="scene-title mb-8">
              {isEn ? "What shaped you" : "Vad har format dig"}
            </h1>
            <p>
              {isEn
                ? "You are thirty-one. You have a flat in Stockholm and a life where you don't think much about Alice. But you became the person you are through something. What shaped you most?"
                : "Du är trettioett år. Du har en lägenhet i Stockholm och ett liv där du inte tänker så mycket på Alice. Men du blev den person du är genom något. Vad har format dig mest?"}
            </p>
            <div className="mt-10 space-y-3">
              {ARCHETYPES.map((a) => (
                <button
                  key={a.id}
                  onClick={() => chooseBackground(a.id)}
                  className="choice-button"
                  data-selected={background === a.id}
                >
                  <div className="font-serif" style={{ fontVariationSettings: '"opsz" 22' }}>
                    {isEn ? a.name_en : a.name_sv}
                  </div>
                  <div className="text-xs text-muted/80 italic mt-1.5 leading-relaxed">
                    {isEn ? a.blurb_en : a.blurb_sv}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {stepNum === 4 && (
          <>
            <h1 className="scene-title mb-8">
              {isEn ? "This is who you are" : "Det här är vem du är"}
            </h1>
            <p>
              {isEn
                ? "If anything feels wrong, you may move one point from a strength to where you'd rather be stronger. Only one."
                : "Om något känns fel kan du flytta en poäng från en sak du är stark i till en sak du tycker du borde vara bättre på. Bara en."}
            </p>
            <ul className="mt-10 divide-y divide-muted-soft border-y border-muted-soft">
              {(Object.entries(stats) as Array<[StatKey, number]>).map(
                ([k, v]) => (
                  <li
                    key={k}
                    className="flex items-center justify-between py-3.5"
                  >
                    <span className="annotation tracking-wider">
                      {isEn ? STAT_NAMES_EN[k] : STAT_NAMES_SV[k]}
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="font-serif italic text-ink">
                        {statLabel(v, isEn)}
                      </span>
                      <span className="flex gap-1">
                        <button
                          onClick={() => {
                            const otherKey = (
                              Object.keys(stats) as StatKey[]
                            ).find((kk) => kk !== k);
                            if (otherKey) adjustStat(k, otherKey);
                          }}
                          disabled={!!moved || v <= 0}
                          className="font-mono text-xs text-muted hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed border border-muted-soft hover:border-accent w-6 h-6 leading-none transition-colors"
                        >
                          −
                        </button>
                        <button
                          onClick={() => {
                            const otherKey = (
                              Object.keys(stats) as StatKey[]
                            ).find((kk) => kk !== k);
                            if (otherKey) adjustStat(otherKey, k);
                          }}
                          disabled={!!moved || v >= 10}
                          className="font-mono text-xs text-muted hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed border border-muted-soft hover:border-accent w-6 h-6 leading-none transition-colors"
                        >
                          +
                        </button>
                      </span>
                    </span>
                  </li>
                ),
              )}
            </ul>
            {moved && (
              <p className="mt-4 annotation flex items-center gap-3">
                <span>
                  {isEn ? "Moved 1 point." : "Flyttade 1 poäng."}
                </span>
                <button
                  onClick={resetMove}
                  className="underline underline-offset-4 hover:text-ink"
                >
                  {isEn ? "undo" : "ångra"}
                </button>
              </p>
            )}
          </>
        )}
      </article>

      <nav className="mt-12 flex justify-between items-center">
        <button
          onClick={() =>
            setPhase((p) =>
              p === "intro" ? p : p === 1 ? "intro" : ((p - 1) as Phase),
            )
          }
          className="annotation hover:text-ink underline-offset-4 hover:underline disabled:opacity-30"
          disabled={false}
        >
          {isEn ? "← back" : "← tillbaka"}
        </button>
        {stepNum < 4 ? (
          <button
            onClick={() => setPhase(((stepNum + 1) as Phase))}
            className="annotation text-accent hover:text-ink underline-offset-4 hover:underline"
          >
            {isEn ? "next →" : "vidare →"}
          </button>
        ) : (
          <button
            onClick={finish}
            className="annotation text-accent hover:text-ink underline-offset-4 hover:underline"
          >
            {isEn ? "answer the phone →" : "ta luren →"}
          </button>
        )}
      </nav>
    </main>
  );
}

function Picker<T extends string>({
  legend,
  options,
  selected,
  onSelect,
}: {
  legend: string;
  options: Array<[T, string]>;
  selected: T;
  onSelect: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="annotation mb-3">{legend}</legend>
      <div className="space-y-1.5">
        {options.map(([id, label]) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="choice-button text-sm"
            data-selected={selected === id}
          >
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
