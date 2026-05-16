# Scene Variants Log — 2026-05-15

Sammanfattning av prosa-utbyggnaden för inomhusscener i akt 2. Tre nya varianter per scen (mörker / ficklampa / tillbaka), plus att befintlig prosa flyttades till "## När strömmen är på".

## Översikt

| Scen | Titel SV | Titel EN | Mörker | Ficklampa | Ström på | Tillbaka |
|---|---|---|---|---|---|---|
| 011 | Hallen | The Hall | klar | klar | flyttad | klar |
| 012 | Vardagsrummet | The Living Room | klar | klar | flyttad | klar |
| 013 | Köket | The Kitchen | klar | klar | flyttad | klar |
| 014 | Leopolds arbetsrum | Leopold's Study | klar | klar | flyttad | klar |
| 015 | Trappan upp | The Stairs | klar | klar | flyttad | klar |
| 016 | Övre hallen | The Upper Hall | klar | klar | flyttad | klar |
| 017 | Alices sovrum | Alice's Room | klar | klar | flyttad | klar |
| 018 | Gästrummet | The Guest Room | klar | klar | flyttad | klar |
| 019 | Badrummet | The Bathroom | klar | klar | flyttad | klar |
| 022 | Källartrappan | The Cellar Stair | klar | klar | flyttad* | klar |
| 023 | Källare-förvar | The Cellar Store | klar | klar | flyttad** | klar |

\* Källartrappan har aldrig haft elektrisk belysning — "ström på"-varianten klargör nu att det inte finns en lampa, bara en kabel som slutar i tomt. Mörker-varianten är därför funktionellt likadan oavsett `ström_på`-flagga, men för parser-konsistens har scenen alla fyra varianter.

\*\* Källare-förvar har likadan struktur — det finns ingen el här nere och har aldrig funnits. "Ström på"-varianten är nästan identisk med default men inleds med en mening som bekräftar att källaren är bortom elnätet.

## Format

Alla varianter ligger som `##`-headers (nivå 2) i scen-filen, FÖRE `## Val`. Default-prosan (mörker) ligger direkt efter frontmatter, utan egen header. Valordningen är oförändrad.

Parserns prioritet (när uppdaterad):
1. `visited_scenes` innehåller scen-id → `## Tillbaka i rummet`
2. `ström_på === true` → `## När strömmen är på`
3. `flashlight_on === true` → `## I ficklampans sken`
4. Annars → default (mörker)

Format-spec är dokumenterad i `docs/CONTENT-FORMAT.md`.

## Elen — narrativt förtydligande

Scenerna 101, 104 och 105 är uppdaterade så det är klart att trädet inte har kapat kabeln — den ligger pressad mot stolpens metallöra, vilket orsakat en kortslutning som löste ut huvudsäkringen i skjulet. Detta innebär:

- **Scen 101**: kabeln syns ligga mot järnet. Spelaren förstår att det är kortslutning, inte avkapad kabel.
- **Scen 104**: säkringsskåpet beskrivs i detalj. "Slå på säkringen ändå"-valet visar nu att huvudbygeln faller tillbaka av sig själv så länge kortslutningen finns kvar.
- **Scen 105**: efter sågning glider kabeln tillbaka i sitt läge, fri från järnet. Säkringen håller den här gången.

Detta gör hela elen-tråden tekniskt trovärdig utan att kräva elbolaget. Pragmatisk men inte konstig.

## Nya state-flags

- `flashlight_on` (boolean) — om spelaren har "tagit fram" ficklampan. Kräver att `ficklampa` finns i inventory. Tillagd i `docs/state-flags.md`.

## Voice-anmärkningar

Mörker-varianten håller sig till hörsel, lukt, känsel — silhuetter snarare än detaljer. Inga adjektivstaplar. Korta meningar. Engelska versioner använder samma princip men låter kortare meningar bära orytmen istället för längdväxling.

Ficklampe-varianten använder "Käglan faller över X. Du flyttar den. Den hittar Y." som rytmisk grundform. Det blir nästan filmiskt — en pov-strålkastare i en mörk room. Inte gimmickigt; sparsamt.

"Tillbaka i rummet"-varianten är medvetet platt och informativ. Den ska inte göra spelaren rädd vid besök två. Den ska bara säga: du är här igen, hit kan du gå.

## Öppna frågor

1. **Parser-implementation**: variant-väljaren behöver byggas i frontend-koden. Inte gjort här. Filerna är klara, parsern behöver uppdatering.
2. **`flashlight_on` UI**: behöver en toggle-knapp i UI:t när ficklampan finns i inventory. Inte specifikat här — frontend-dev beslutar designen.
3. **Källaren (022, 023)**: borde "Tillbaka i rummet"-varianten respektera att spelaren behöver ficklampa? Just nu visas den oavsett `har_ljus`-status. Förmodligen acceptabelt eftersom revisit är en kort scen, men värd att verifiera.
4. **Akt 3-scener**: utbyggnaden täcker bara akt 2. Akt 3 har egen ljusdramaturgi (portalen, gråfältet) och kräver separat pass om varianter ska införas där.
