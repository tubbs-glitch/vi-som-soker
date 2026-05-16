# Projektstatus

## Översikt

**Produkt**: Story-spel i Lone Wolf-stil, modern Call of Cthulhu-setting i Sverige
**Premiss**: Person får meddelande om att moster försvunnit efter en storm
**Mekanik**: Förgrenad story + utrustning + narrativ strid (Disco Elysium-stil)
**Leverans**: Webb-PoC (Next.js) → iOS-app (SwiftUI)
**Språk**: Svenska + engelska (parallellt, inte översatt)
**Ambition**: Polerad indie-launch

## Team

13 specialiserade agenter + 3 generic helpers, i `.claude/agents/`:

| Fas | Agent |
|-----|-------|
| Alla | project-lead |
| 1. Research | competitor-analyst, market-researcher, legal-analyst |
| 2. Story & Game Design | narrative-designer, game-designer, copywriter-sv-en |
| 3. Visuell & Audio | art-director, brand-strategist, image-creator, suno-songwriter, elevenlabs-voice |
| 4. Bygge | frontend-dev, ios-dev |
| 5. Lansering | marketer, social-media-strategist |

## Aktiv fas

**Fas 1–4 alla med fötter i marken.** PoC byggd, scener finns, visuell riktning föreslagen, namnkandidater finns.

## Leveranser hittills

**Setup**: CLAUDE.md, `.claude/agents/*` (16 agenter)

**Fas 1 — Research**:
- `docs/competitor-analysis.md` — 8–12 konkurrenter, gap: ingen polerad nordisk folk-horror story-app
- `docs/market-research.md` — primär persona "Maya 28–40 indie-narrative-gamer", global > svensk
- `docs/legal-checklist.md` — 12+ åldersmärkning, Hällmyren som namn, mental hälsa-resurser

**Fas 2 — Story & Game Design**:
- `docs/story-input.md` — synopsis
- `docs/story-bible.md` — Hällmyren (Härjedalen), midsommarvecka, sällskapet "Vi som söker"
- `docs/plot-outline.md` — tre akter, branch-and-bottleneck
- `docs/scene-map.md` — 42 scener
- `docs/choice-architecture.md` — val + konsekvenser
- `docs/state-flags.md` — sanity, inventory (tagg-baserat), story flags
- `docs/voice-guide.md` — berättarröst sv + en
- `docs/scenes/scene-001.{sv,en}.md` — pilotscen
- `docs/game-systems.md` — översikt
- `docs/character-creation.md` — 4 stats (STY/DEX/FÖR/MOD), arketyper
- `docs/combat-spec.md` — narrativ strid (DE-stil)
- `docs/equipment-system.md` — tagg-baserat, 7 items / max 5 i packning
- `docs/data-model.md` — TypeScript-interface för frontend

## Beslut fattade

- **App-namn**: **"Vi som söker" / "We Who Seek"** — sällskapets motto. Brand-strategist + legal måste validera trademark.
- **Visuell riktning**: **A (Folk Horror Foto, Tunbjörk-stil) med D-element (foto under glas) på cover/nyckelbilder**
- **Karaktärsynlighet**: aldrig ansikte i marknadsföring, ryggvy/hand OK
- **Packnings-scen**: scene-002 (separat från char creation)

## Blockerare / öppna beslut

- **Trademark-sök** för "Vi som söker" / "We Who Seek" — brand-strategist + legal behöver köra (snabb-sök indikerar troligen ledigt men osäkert)
- **Web-research re-run**: WebSearch nekades — kör om innan launch
- **Mental hälsa-resurser**: måste finnas i app (1177/MIND-länk)
- **API-nycklar** för bildgenerering (Gemini/OpenRouter) behövs innan image-creator kan köra
- **Gate-syntax för val** i scene-markdown — behöver definieras + engine-stöd
