# Mosters Hemligheter — Web PoC (v0.1)

Spelbar Next.js-app som renderar `scene-001` (och fler scener vart efter de
levereras). Detta är PoC v0.1 — bara grunden så att copywriters scener kan
portas in löpande.

## Snabbstart

```bash
cd web
npm install
npm run dev
# → öppna http://localhost:3000
```

För att verifiera build:

```bash
npm run build
```

## Arkitektur

```
web/
├─ app/                       # Next.js App Router
│  ├─ layout.tsx
│  ├─ page.tsx                # RSC — laddar scene-001.sv som startscen
│  ├─ globals.css
│  └─ api/scenes/[id]/[lang]/route.ts
├─ components/
│  └─ SceneView.tsx           # Klient-komponent — render + språk-toggle + reset
├─ lib/
│  ├─ store.ts                # Zustand store + localStorage-sync
│  └─ story-engine/           # PURE TS — inga React-imports
│     ├─ types.ts             # Datamodellen (matchar docs/data-model.md §2)
│     ├─ items.ts             # Item-katalog
│     ├─ state.ts             # createInitialState, applyChoice, canChoose, …
│     ├─ parser.ts            # markdown m. YAML frontmatter → Scene
│     ├─ loader.ts            # server-side fs + client-side fetch
│     ├─ index.ts             # publik API-yta
│     └─ README.md            # API-dokumentation för iOS-dev
└─ content/scenes/            # Scen-filer (kopiera från docs/scenes/)
   ├─ scene-001.sv.md
   └─ scene-001.en.md
```

## Hur scener laddas

1. `app/page.tsx` (RSC) anropar `loadSceneServer("scene-001", "sv")` och renderar
   `<SceneView initialScene={…} />`.
2. När spelaren klickar ett val anropar `<SceneView>` `store.applyChoice(choice)`.
   Det uppdaterar state, sparar till `localStorage` och flyttar
   `state.location.current_scene`.
3. `<SceneView>` reagerar på state-ändring och hämtar nästa scen via
   `/api/scenes/[id]/[lang]` (klient-fetch).
4. Om scenen saknas: visa "Scen kommer snart."

## Lägga till en ny scen

Lägg en fil i `content/scenes/`:

- `scene-NNN.sv.md`
- `scene-NNN.en.md`

Format:

```markdown
---
scene_id: NNN
title: "Titel"
language: sv
act: 1
type: G
triggers: []
exits: [scene-NNN+1]
---

<prosa>

## Val

- **[Val-text]** → scene-NNN+1
```

Inga app-ändringar behövs — appen plockar upp filen vid nästa fetch.

## State

- Allt state är ett enda `GameState`-objekt (se `lib/story-engine/types.ts` och
  `docs/data-model.md`).
- Sparas till `localStorage` under nyckeln `mosters-hemligheter:state` efter
  varje val (auto-save).
- "Börja om" i UI:t nollställer staten till `createInitialState()`.

## Språk-toggle

Hörn-knapparna `SV / EN` skiftar `state.meta.language`. Vid byte hämtas
nuvarande scen-id på det nya språket. Om filen saknas: "Scen kommer snart."

## Vad som INTE finns i v0.1

- Char creation UI (default-karaktär används)
- Equipment-UI / inventory-vy
- Combat-UI / sanity-numerisk display (bara label visas)
- Snygg styling (basic Tailwind tills art-director levererar spec)
- Inline-metadata på val-rader för `requires`/`consequences` — i v0.1 är alla
  val ovillkorliga, gating görs i kod när det behövs

## För iOS-dev

Se `lib/story-engine/README.md` för det publika API:t som måste matchas i Swift.
Story-engine är medvetet hållen helt fri från React — den ska kunna
återimplementeras 1:1 i Swift.
