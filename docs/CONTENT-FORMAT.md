# Scen-format — vad parser:n förstår

Alla scener ligger i `docs/scenes/{scene-id}.{sv|en}.md` och syncas automatiskt till `web/content/scenes/` vid `npm run dev` / `npm run build` (via `prebuild`/`predev`-hook).

## Scen-varianter (inomhus, ström/ljus)

Inomhusscener i akt 2 kan ha **fyra prosa-varianter** beroende på spelarens tillstånd. Varianterna skrivs som markdown-headers (nivå 2) inuti scen-filen, FÖRE `## Val`-headern.

Ordningen i filen är fast:

```markdown
[Default / mörker — befintlig prosa, kortare och mer otäck]

## I ficklampans sken     ← (EN: ## In the torch's beam)
[Smal ljuskägla som visar 2-3 saker. Allt utanför käglan är mörker.]

## När strömmen är på     ← (EN: ## When the power is on)
[Full, atmosfärisk prosa. Kanon-versionen av rummet.]

## Tillbaka i rummet      ← (EN: ## Back in the room)
[1-3 meningar, kort återblick för second-visit.]

## Val                    ← (EN: ## Choices)
[Val är OFÖRÄNDRADE oavsett variant.]
```

### Vilken variant väljs?

Parsern (när uppdaterad) väljer prosa enligt följande prioritet:

1. **`location.visited_scenes` innehåller scen-id** → använd `## Tillbaka i rummet`
2. **`story_flags.ström_på === true`** → använd `## När strömmen är på`
3. **`story_flags.flashlight_on === true`** (spelaren har tagit fram ficklampan) → använd `## I ficklampans sken`
4. **Annars** → använd default-prosan (mörker)

`flashlight_on` kräver att spelaren har `ficklampa` i inventory. UI:t ska ha en "Tänd ficklampa"-knapp som togglar flaggan.

### Voice per variant

| Variant | Längd (ord) | Voice |
|---|---|---|
| Mörker (default) | 100-200 | Korta meningar, hörsel/känsel/lukt, silhuetter, lite vad-är-det-där |
| Ficklampa | 150-250 | "Käglan faller över X. Du flyttar den. Den hittar Y." Allt utanför käglan är mörker. |
| Strömmen på | befintlig | Full atmosfärisk prosa, inga ändringar mot tidigare kanon |
| Tillbaka i rummet | 30-80 | Snabb rumslig påminnelse. Inga nya observationer. |

### Lagring av default-prosan

Default-prosan (mörker-versionen) ligger **före** alla `##`-headers, direkt efter frontmatter. Den fungerar som fallback om ingen variant matchar.

Den befintliga fullständiga prosan i scen-filer flyttades **från** default-position **till** `## När strömmen är på`-sektionen i 2026-05-pass. Default-position fick istället en ny, kortare mörker-version.

### Scener som har varianter

Aktuellt: **scenerna 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23** (alla inomhus i akt 2). Övriga scener har bara default-prosa.

---

## Frontmatter

```yaml
---
scene_id: 001                  # eller "scene-001" — båda godkänns
title: "Samtalet"
language: sv                   # sv | en
act: 1                         # 1 | 2 | 3
type: BN                       # BN (bottleneck), SBN (sub-bottleneck), G (gren), A (atmosfär)
triggers: [start]              # eller andra scen-ids
exits: [scene-002]             # där spelaren *kan* hamna
sanity_delta: 0                # default per scen (sällan använt)
flags_set: [inventory, förberedd]
flags_read: []
---
```

## Val-format

### 1. Enkelt val

```
- **[Val-text]** → scene-002
```

### 2. Val med outcome-prosa och inline-konsekvenser

```
- **[Val-text]**
  Konsekvens-prosa som beskriver vad som händer. Kan vara flera meningar. → scene-002 *(sätter `flag=true`, `relation+1`)*
```

### 3. Self-loop (för Q&A-scener)

```
- **[Fråga]**
  Svaret. → tillbaka *(`relation+1`)*
```

Om ALLA val är `→ tillbaka` och frontmatter har `exits`, lägger parsern automatiskt till en "Gå vidare"-knapp.

### 4. Forced continue (atmosfärscen eller multi-select-avslutning)

```
**[Gå vidare]** → scene-003
```

Notera: inget `- ` framför. Visas alltid.

### 5. Multi-select (inventory-rader — kosmetiskt i v0.1)

```
Välj upp till 5:

- **[Ficklampa]**
- **[Jaktkniv]**
- **[Kassettbandspelare]**

**[Stäng väskan]** → scene-003
```

I v0.1 visas item-raderna inte som klickbara val (de saknar `→`). Endast `**[Stäng väskan]**` är aktivt. Faktisk inventory-selektion implementeras i v0.2.

## Konsekvens-syntax inuti `*(...)*`

Kommaseparerade, varje konsekvens i backticks (`` ` ``). "sätter" som prefix är optional.

| Syntax | Effekt |
|---|---|
| `` `flag=true` `` | sätter `flag` → true |
| `` `flag=false` `` | sätter `flag` → false |
| `` `flag+1` `` | inkrementerar numerisk flag (`förstår_frekvens`, `förstår_alice`) |
| `` `flag-1` `` | dekrementerar numerisk flag |
| `` `relation+1` `` | inkrementerar relation (`alice`, `gunnar`, `mamma`, `det_grå`, …) |
| `` `relation-1` `` | dekrementerar relation |
| `` `gunnar_tillit+1` `` | alias → relation `gunnar` |
| `` `sanity +1` `` / `` `sanity -2` `` | sanity-delta |

Exempel:
```
→ scene-006 *(sätter `vet_om_per_magnus=true`, `gunnar_tillit+1`, `sanity -1`)*
```

## Sanity i prosa

Om copywriter skriver "Sanity +1." eller "Sanity -2." i outcome-prosan, parsas det automatiskt som consequence — bekväm syntax när det känns naturligt i texten.

## Vad parser:n IGNORERAR

- Text som varken är ett val-rubrik eller inom en aktiv body
- Italic-block utan `→`-pil (rent kommentarsinnehåll)
- `*(Atmosfärscen — inget val.)*` typ-kommentarer
- Item-rader (`- **[Ficklampa]**`) utan `→`-mål

## Filnamn

`scene-NNN.sv.md` och `scene-NNN.en.md` — pad:da med nollor till 3 siffror.
