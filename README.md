# Vi som söker

Ett story-spel i Lone Wolf-stil, modern folk horror i norra Sverige. Web-PoC byggd i Next.js, slutprodukt iOS (Capacitor).

## Quick start

```bash
cd web
npm install
npm run dev
```

Öppna http://localhost:3000

## Dev mode (test-läge)

Lägg `?dev=1` på URL:en en gång, sen tryck **D** för att toggla dev-panel:
- Hoppa direkt till valfri scen
- Toggla items i inventory
- Sätt flaggor (strömmen på, ficklampa fram, läst dagboken, etc.)
- "Pussel-redo"-preset för full ritual

## Mobil-bygge (Capacitor → iOS)

```bash
cd web
npm run cap:sync     # bygger static export och synkar till iOS-projekt
npm run cap:open     # öppnar Xcode
```

Bygg i Xcode → kör på simulator eller TestFlight-bygge.

## Projektstruktur

```
.claude/
  agents/      # AI-team för innehållsproduktion
  skills/      # Bildgenerering m.m.
docs/
  scenes/      # Scen-prosa (markdown med YAML frontmatter)
  *.md         # Story-bibel, scene-map, choice-architecture, etc.
assets/
  images/      # Genererade bilder
scripts/       # Hjälpscript (root-mappens version)
web/
  app/         # Next.js App Router
  components/  # React-komponenter (SceneView, HouseMap, RitualScene...)
  lib/
    story-engine/   # Pure TS — story parser, state-management
    audio/          # Web Audio API synth-engine
  content/scenes/   # Synced från docs/scenes/ vid build
  public/           # Bilder, ikoner, manifest.json
  ios/              # Capacitor iOS-projekt (Xcode)
  scripts/sync-scenes.js  # Synkar docs/scenes/ → content/scenes/
```

## Deploy

Pushar du till GitHub kan Vercel auto-deploya. Sätt **Root Directory: web** i Vercel-projektets settings.

## Spec & dokumentation

Se `docs/`:
- `story-bible.md` — karaktärer, plats, mytologi
- `scene-map.md` — alla scener + struktur
- `choice-architecture.md` — viktiga val + konsekvenser
- `state-flags.md` — alla state-variabler
- `house-map.md` — planritning + dörr-logik
- `CONTENT-FORMAT.md` — scen-markdown-syntax (val, varianter, konsekvenser)
- `audio-design.md` — ljudvision
- `test-report.md` — senaste speltest-rapport
- `mobile-deployment-analysis.md` — PWA / Capacitor / SwiftUI-jämförelse
