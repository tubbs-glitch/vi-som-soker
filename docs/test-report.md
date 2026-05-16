# Testrapport — Vi som söker

**Testare:** game-tester (agent)
**Datum:** 2026-05-16
**Metod:** API-trace via `GET /api/scenes/{id}/{lang}` + statisk analys av `web/content/scenes/`, `parser.ts`, `house-map.ts`, `RitualScene.tsx`. UI-test ej möjligt (ingen webbläsare).
**Scope:** Alla 47 sv-scener (001-008, 010-019, 021-026, 028-044, 100-105) + parser/engine.

---

## 1. Sammanfattning — antal buggar per kategori

| Kategori | Antal |
|----------|-------|
| 🔴 BLOCKER | **5** |
| 🟡 STATE | **6** |
| 🟠 LOGIC | **1** |
| 🟢 CONTENT | **2** |
| 🔵 BALANCE | **1** (pervasiv) |

**Spelbart?** Ja, default-vägen går från scen-001 till scen-041 (Slut 2) eller scen-043 (Slut 4). MEN **Slut 1 och Slut 1B är omöjliga att nå utan dev-panel** pga blocker-buggar i scen-037. Och fyra-fem viktiga state-flaggor sätts aldrig korrekt p.g.a. en pervasiv parser-bug.

---

## 2. Top-buggar (sorterade på allvar)

### 🔴 BLOCKER-1 — Parser tolkar gate som consequence i `*(om/kräver ...)*` ⇒ fel/saknade flaggor

**Var:** `web/lib/story-engine/parser.ts` rad ~237 (`findConsequencesInText`). Regex `CONSEQUENCE_BLOCK = /\*\(([^)]+)\)\*/` matchar **första** italic-paren i en val-rad. Om en choice har både gate (`*(kräver/om \`flag=true\`)*`) **och** konsekvens (`*(sätter \`flag=true\`, \`sanity -N\`)*`), parsas gate som konsekvens.

**Konsekvens:** Stora delar av flag-systemet är trasigt. Drabbade scener (verifierat):
- **scen-022** c1 "Gå ner med ljus" — sätter `har_ljus=true` (fel — det är ett krav, inte en effekt).
- **scen-024** c1+c2 (mejeri-entré) — **dropps helt** pga `→ vidare` (se BLOCKER-3). Borde sätta `oppnat_mejeri`, `vet_om_sallskapet`, `brutit_in_i_mejeri`.
- **scen-037** c1 "Strid" — sätter `skarpt=true` (fel) i stället för `besegrat_det_grå=true`.
- **scen-037** c2 "Hymn" — sätter ingenting (gate `frekvens ×2` matchar inga regex) i stället för `besegrat_det_grå=true`.

**Slutreproduktion:** `besegrat_det_grå` sätts **aldrig** ⇒ Slut 1 och Slut 1B är **låsta**.

**Repro:** `GET /api/scenes/scene-037/sv` — kolla `choices[0].consequences.flags_set` → `{"skarpt":true}` i stället för `{"besegrat_det_grå":true}`.

**Fix:** Skilj gate (om/kräver/if/requires) från consequence (sätter/sets) syntaktiskt — ex. olika prefix eller separat scan.

---

### 🔴 BLOCKER-2 — Choices med `→ fortsätt` / `→ continue` dropps helt

**Var:** Parser `ARROW_TARGET = /→\s*(scene-[\w-]+|tillbaka|back)\b/` matchar endast scene-id, `tillbaka` eller `back`. `fortsätt` och `continue` ignoreras → val-objektet skapas inte alls.

**Drabbat:**
- **scen-037 c4** "Hög-sanity-vägen" — borde sätta `förstod_det_grå=true`, `besegrat_det_grå=true`.
- **scen-037 c5** "Hög-sanity + stoppa permanent" — borde sätta `stoppat_permanent=true`. **Detta är ENDA vägen till Slut 1B.**

**Konsekvens:** API:t returnerar bara 4 av 6 val för scen-037. **Slut 1B oåtkomligt** utan dev-preset. Slut 1 oåtkomligt i kombination med BLOCKER-1.

**Repro:** `GET /api/scenes/scene-037/sv` → `choices.length === 4`. Markdown har 6.

**Fix:** Lägg till `fortsätt|continue` i `ARROW_TARGET` och tolka som "exits[0]" (eller behåll som scen-spec).

---

### 🔴 BLOCKER-3 — Choices med `→ vidare` dropps också; scen-024 förlorar entry-val

**Var:** Samma parser-regex. `→ vidare` matchar inte. Scen-024 har två `## Val`-block med entry-val (`Använd mejerinyckeln`, `Bryt upp med verktyg`) → båda dropps.

**Konsekvens:**
- Spelaren kan inte sätta `oppnat_mejeri`, `vet_om_sallskapet`, `brutit_in_i_mejeri`, `sallskaps_lager_aktivt` via gameplay.
- `vet_om_sallskapet` används av Akt III-dialoger (scen-036 Alice, scen-029 gate).
- Bara två val syns i API: "Gå till hyllan" (scen-025), "Gå till trälåren" (scen-026). De fungerar — men entry-akten är osynlig.

**Fix:** Acceptera `→ vidare` (sv) och `→ on` / `→ next` (en) som synonymer för `exits[0]`.

---

### 🔴 BLOCKER-4 — `scene-027` 404:ar vid klick på vedboden via husplan

**Var:** `web/lib/house-map.ts` rad 138: room `vedboden` har `entry_scene_id: "scene-027"`. Filen finns inte — `GET /api/scenes/scene-027/sv` → **404**.

**Konsekvens:** Spelaren klickar på vedboden i husplanen → backend 404. Notera att scen-map.md anmärker själv att scen-027 är redundant med scen-104/105 — den var planerad att tas bort men husplanen pekar fortfarande dit.

**Fix:** Två alternativ:
1. Skapa `scene-027.sv.md` som forward till scen-100 eller scen-104.
2. Ändra `vedboden.entry_scene_id` till `scene-102` (vedbodens dörr) och ta bort scen_ids: ["scene-027"].

---

### 🔴 BLOCKER-5 — Scen-008 "Gå in nu" + scen-009 onåbar

**Var:** scen-008 har choice `**[Gå in nu — gå förbi honom mot dörren]** → *(om \`vet_om_per_magnus=true\`)* scene-009, annars scene-010`. Parser kräver `→ scene-NNN` direkt — den embeddade `*(...)*` mellan `→` och `scene-009` bryter regex. **Hela val-radens parse misslyckas** och valet syns ej.

**Konsekvens:**
- Spelaren har bara Q&A-loop + auto-genererad "Gå vidare" → scen-010.
- Per-Magnus-samtalet (scen-009) är onåbart. (Bevis: `scene-009.sv.md` finns inte alls i `content/scenes/`.) Path `vet_om_tjarsten_korrekt` sätts aldrig.

**Fix:** Skapa scen-009 + ändra scen-008-syntaxen till två separata gateade val.

---

### 🟡 STATE-1 — Sanity-deltas **dubbleras** när consequence-block innehåller `sanity -N`

**Var:** `parseScene` kör både `findConsequencesInText` (parsar sanity-delta från `*(... sanity -N)*`) **och** `findSanityInProse` (regex scannar HELA combined-strängen för "Sanity ±N"). Båda matchar samma "sanity -N"-text → merge adderar dem.

**Verifierat:**
- scen-013 c1 "Ta tjärstenen": markdown `sanity -1` → API `-2`.
- scen-014 c2 "Läs noga": markdown `sanity -10` → API `-20`.
- scen-026 c3 "Ta halsband+brev+lapp": markdown `sanity -15` → API `-30`.
- scen-037 c3 "Förhandla acceptera": markdown `sanity -5` → API `-10`.

Drabbar minst 20+ choices. Spelet är 2× för hårt på sanity-förluster där dubblering sker.

**Fix:** `findSanityInProse` ska bara scanna `extractCleanBody`-resultatet (utan `*(...)*`-block) eller skippas om `conseqExplicit.sanity_delta` redan satts.

---

### 🟡 STATE-2 — `vet_om_sallskapet` sätts aldrig i gameplay

Beroende av BLOCKER-3. Akt III-dialoger som gate på flaggan får inte rätt variant.

---

### 🟡 STATE-3 — scen-035 c3 ("Fråga om Bertil") sätter inte `leopold_med=true`

**Var:** scen-035 markdown — c3 sätter bara `vet_om_bertil` (som redan är true om man kommit hit). De andra tre val (c1/c2/c4) sätter `leopold_med=true`. c3 missar.

**Konsekvens:** Spelare som väljer Bertil-dialogen får **inte med sig Leopold** → forceras till Slut 2 (alice_med ensam) eller Slut 4. Detta är förmodligen oavsiktligt eftersom map säger c3 ska sätta båda `leopold_med` och `talat_om_bertil_med_leopold`.

**Fix:** Lägg till `leopold_med=true, talat_om_bertil_med_leopold=true` i c3.

---

### 🟡 STATE-4 — scen-012 c2 sätter `ström_på=true` (fel) i stället för `hymnen_låten_på=true`

**Var:** Konsekvens av BLOCKER-1. Markdown-gaten `*(om \`ström_på=true\` och \`hymnen_låten_på=false\`)*` parsas som consequence. Backtick-greppet plockar första `=true`-uttryck → `ström_på=true`.

**Konsekvens:** Att sänka nålen sätter inte `hymnen_låten_på`, vilket är krav för `ritual_korrekt=full` i RitualScene-komponenten → Slut 1 (full ritual) onåbart utan dev-preset.

---

### 🟡 STATE-5 — `hymnen_låten_på` på c3 ("Lyft på skivans nål") set korrekt **av tur**

Samma gate-bug, men gate-flaggan råkar vara samma som consequence-flaggan. Men semantiskt är c3 prosa fel — den **lyfter** och **sänker tillbaka** nålen i samma val. Designintention är otydlig.

---

### 🟡 STATE-6 — scen-038 har Slut 4-choice utan motsvarande exit

**Var:** scen-038 frontmatter `exits: [scene-039, scene-040, scene-041, scene-042]` saknar scene-043. JSON har choice c5 → scene-043. Ej blocker (parser tar choice som auktoritet), men inkonsistens.

---

### 🟠 LOGIC-1 — scen-031 har ingen "fel ritual"-väg synlig på API-nivån

Markdown har bara `**[In]**` → scene-032. **Hela ritualpusslet (medurs/motsols, takt 46/47/48, sätter `ritual_korrekt=full/partial/nej`) implementeras i React-komponenten `RitualScene.tsx`** och muterar `localStorage` direkt. Det betyder att `ritual_korrekt`-flaggan **bara** sätts genom UI-spelning (klick på +N i pussel-UI:t). API-tester kan inte verifiera. Komponenten gör direkt localStorage-mutation utan att gå via game-store — bräcklig design.

---

### 🟢 CONTENT-1 — scen-005 c2 sätter inte `vet_om_sallskapet_rykte`

Markdown: bara c1 sätter både `vet_om_per_magnus` OCH `vet_om_sallskapet_rykte`. c2 ("Korta svar") sätter bara `vet_om_per_magnus` trots att gubben ändå lägger en lapp på vindrutan med samma namn. Mindre logikbrott.

---

### 🟢 CONTENT-2 — scen-012-c3 lyfter och sänker nålen i samma val

Prosan är förvirrad: spelaren tänker först att hen lyfter nålen och stänger av, sedan sänker tillbaka. Designern bör avgöra om c3 ska vara "stäng av hymnen" (då ska INTE sätta hymnen_låten_på) eller "starta hymnen" (då duplicerar den c2).

---

### 🔵 BALANCE-1 — Sanity-balans skev pga STATE-1

Med 2× sanity-förluster genom Akt II kommer en spelare som läser dagboken + Astrids pärm + öppnar trälåren bottna på sanity 90 - (20+16+30 verkligen 10+8+15 i markdown × 2) = ca sanity 12. Hög-sanity-vägen (≥70) i scen-037 blir nästan omöjlig.

---

## 3. Test-stigar genomförda

| Test | Path | Resultat | Slut |
|------|------|----------|------|
| Default-väg | 001→002→003→004→005→006→007→008→010→011→100→101→102→103→104→105→028→012→011→013→014→015→016→017→018→019→021→016→011→022→023→022→011→024→025→026→029→031→032→033→035→036→037→038 | OK till scen-038, men scen-037 c1/c2 sätter inte besegrat_det_grå | Slut 4 (tystnaden) eftersom inga ending-flaggor sattes |
| Mästerstig (Slut 1B) | Försökt — scen-037 c5 onåbar via API | **BLOCKED** | **Ej nåbar utan dev-panel** |
| Snabb-väg | 001→002→003→004→005→006→007→008→010→011→013→100→101→102→103→104→105→028→029→031→...→038 | Routing OK men ingen tjärsten ⇒ ritualscenkomponent låser knappen | Beror på dev-väg |
| Felval ritual | Inte testbart via API (puzzle i React) | N/A | — |
| Ingen tjärsten | scen-031 nås men `RitualScene.tsx` disablar "Börja"-knappen om `hasTjarsten=false` | OK-design — spelaren får inte börja | — |
| Ingen ficklampa | scen-022 har gate `har_ljus=true` men gate parsas som consequence (BLOCKER-1), så valet är alltid klickbart | Spelaren kan gå ner i mörker — design bryter | — |
| Stridvägen scen-037 | c1 "Strid" kräver `skarpt=true` (gate parsas som consequence; valet alltid synligt) | Sätter `skarpt=true` (fel), `sanity -15` (dubblat? -15 i markdown är `sanity -15` ensam, gate=skarpt=true. Sanity blir korrekt -15 här pga gate ej innehåller sanity) | Slut beräknas av API:s scen-038 c1 (Slut 1) eftersom Slut 1-choice är hårdkodad i markdown |
| scen-008 Q&A | 6 frågor varav alla self-loop, "Gå vidare" auto-genererad → scen-010. Ingen begränsning till 3 frågor som spec säger | OK-flow men ej design-spec | — |
| Akt II hub-rörelse | HouseMap-komponent enforcerar adjacency via `isAdjacent`-check ✓ | OK | — |
| Conditional prose | Parser hittar variant-headers ("I ficklampans sken", "När strömmen är på", "Tillbaka i rummet") korrekt. JSON innehåller `prose_flashlight`, `prose_power_on`, `prose_revisit` | OK | — |

---

## 4. Slut jag nådde

- **Slut 4 (Tystnaden)** — default-vägen, ingen sanity-grindad-väg, inga ending-flaggor satta.
- **Slut 2 (en blev kvar)** — via scen-038 c3 (men forceras endast om alice_med XOR leopold_med ⇒ flagga-läge måste lyckas via parser). Möjlig i praktiken efter scen-036 ⇒ scen-037 c3 (offra) eller c6 (vägra). I JSON: c3 sätter valt_offra_sig → Slut 3, c4 = "Förhandla — vägra utan plan", sanity -40 → kollapsar.
- **Slut 3 (väktaren)** — via scen-037 c3.

## 5. Slut jag INTE kunde nå

- **Slut 1 (Alla kommer hem)** — `besegrat_det_grå` sätts aldrig pga BLOCKER-1.
- **Slut 1B (Permanent stängning)** — kräver scen-037 c5 som är onåbar pga BLOCKER-2 (`→ fortsätt` dropps).

---

## 6. Rekommendationer (prio-ordnade)

1. **Fixa parser** (`parser.ts`):
   a. Skilj gate (`om/kräver/if/requires`) från consequence (`sätter/sets`) — t.ex. prefix-baserad detection eller separat regex.
   b. Acceptera `→ fortsätt|continue|vidare|on|next` som synonymer för `exits[0]`.
   c. Fixa sanity-dubblering: kör `findSanityInProse` ENDAST på `extractCleanBody`-resultatet.
   d. Acceptera multipla `## Val`-block i samma fil (för scen-024 design).

2. **Skapa scen-009.sv/en.md** eller redesigna scen-008-syntaxen så Per-Magnus-samtalet blir nåbart.

3. **Fixa husplan** — `vedboden.entry_scene_id` ska peka på scen-102 eller skapa stub-scen-027.

4. **scen-035 c3** — lägg till `leopold_med=true, talat_om_bertil_med_leopold=true` i consequence.

5. **Balansera sanity** EFTER att STATE-1 är fixad — playthrough igen för att checka att hög-sanity-vägen (≥70) är realistisk.

6. **Refaktorera RitualScene.tsx** — mutera state via game-store, inte direkt localStorage. Lägg till en API-stub eller test-hook så puzzle-resultatet kan testas.

7. **scen-031 markdown** — addera de fyra ritual-utfallen (medurs/motsols × takt) eller dokumentera att React-komponenten ÄR sanningskällan.

---

## Bilaga A — 404-scener (i ordning de potentiellt nås)

| Scen | Status | Hänvisad från |
|------|--------|---------------|
| scene-009 | 404 | scene-008 frontmatter (exits) + dropped choice |
| scene-020 | 404 | Inga gameplay-referenser — ej blocker |
| scene-027 | 404 | `house-map.ts` (vedboden room) — klickbar = blocker |

## Bilaga B — Parser-pattern som behövs

```ts
// Förslag på robustare arrow-regex:
const ARROW_TARGET = /→\s*(?:\*\([^)]*\)\*\s*)?(scene-[\w-]+|tillbaka|back|fortsätt|continue|vidare|on|next)\b/;

// Förslag på gate vs consequence:
const CONSEQUENCE_BLOCK = /\*\((?:sätter|sets?)\b[^)]+\)\*/;
const GATE_BLOCK = /\*\((?:om|kräver|if|requires)\b[^)]+\)\*/;
```
