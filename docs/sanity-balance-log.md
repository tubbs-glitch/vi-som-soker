# Sanity-Balance Log — Vi som söker

**Datum:** 2026-05-16
**Kontext:** Efter STATE-1-fix (sanity-dubblering) i `parser.ts` (se `docs/test-report-v2.md`). Med dubblerings-buggen aktiv mottog spelaren 2× den i scenfilen markerade sanity-förlusten. Efter fix tillämpas exakt den markerade förlusten. Post-fix-kalkyler visade att Slut 1B (kräver `sanity ≥ 70` vid scen-037) var i praktiken onåbar — även den disciplinerade "test_path_d"-vägen (state-flags.md) hamnade på ~13 sanity. Det är inte SVÅRT — det är OMÖJLIGT.

Det här dokumentet listar de justeringar som gjordes för att göra Slut 1B nåbar för en disciplinerad spelare och hålla den utom räckhåll för en completionist.

---

## Designprincip

| Spelartyp | Mål vid scen-037 |
|-----------|------------------|
| Disciplinerad (intended test_path_d) | sanity ≈ 72-78 (≥70, < 85 — nåbart men ej oförtjänat) |
| Mid-curious (default väg) | sanity ≈ 35-55 → Slut 1 / 2 / 4 |
| Completionist (läser allt + möter allt) | sanity ≈ 0-15 → Slut 1 / 3 (offra / nej-vägrar) |

Tunga skräck-scener (vinden 021, dagbok 017, läs noga lab 014) behåller sin tematiska tyngd. Mejeri-stationerna (024/026) — som ÄR obligatoriska för 1B-flaggorna `vet_om_sallskapet` och `vet_om_bertil` — har minskats kraftigt eftersom annars är 1B matematiskt onåbar. Mandatoriska inside-gray-scener (032-036) har minskats för att inte tvinga ut hela budgeten på passiva transit-scener.

---

## Ändringar (scen → från X till Y)

### Akt I

| Scen | Element | Från | Till | Skäl |
|------|---------|------|------|------|
| 009 | c1 [Gå in nu] | -2 | -1 | Mild bröstkänsla räcker; introduktion |

### Akt II — Utforskning (frivilliga, behåller skräck)

| Scen | Element | Från | Till | Skäl |
|------|---------|------|------|------|
| 014 | c1 [Läs noga lab] | -10 | -10 | **Behållen** — task-guideline |
| 014 | c2 [Skumma anteckningar] | -4 | -3 | Liten ease |
| 014 | c3 [Ta mässingsnyckel] | -2 | -1 | Cosmetic |
| 014 | c4 [Studera gruppfoto] | -3 | -2 | Liten ease |
| 017 | c1 [Skumma sista sida] | -3 | -2 | Liten ease |
| 017 | c2 [Läs dagboken] | -10 | -10 | **Behållen** — task-guideline |
| 018 | c1 [Halsband sjunde] | -2 | -1 | Cosmetic |
| 018 | c2 [Halsband sjätte] | -3 | -2 | Liten ease |
| 018 | c3 [Läs alla namn] | -8 | -8 | **Behållen** — task-guideline |
| 021 | c1 [Tänd lampan, sett] | -15 | -15 | **Behållen** |
| 021 | c2 [Mata vinds-tinget] | -12 | -12 | **Behållen** — task-guideline |
| 021 | c3 [Stryk kniven, sårat] | -18 | -18 | **Behållen** — punish |
| 021 | c4 [Backa, stäng luckan] | -10 | -8 | Liten ease (val att undvika) |
| 022 | [Gå ner med ljus] | -2 | -1 | Mild transit |
| 023 | c1 [Ta batterier+tjär] | -2 | -1 | Cosmetic |
| 023 | c3 [Kalendern] | -4 | -3 | Liten ease |

### Akt II — Mejeri (1B-obligatoriska, KRAFTIG sänkning)

| Scen | Element | Från | Till | Skäl |
|------|---------|------|------|------|
| 024 | c1 [Använd mejerinyckel] | -12 | -3 | **KRAFTIG** — obligatorisk för `vet_om_sallskapet`. Med nyckel är det inget brott; chockmomentet kommer av VAD man ser inne. |
| 024 | c2 [Bryt upp med verktyg] | -15 | -8 | Brytande har egen vikt men inte +12 |
| 025 | c1 [Läs Astrids pärm noga] | -8 | -6 | Liten ease |
| 025 | c2 [Sluta läsa nu] | -4 | -2 | Liten ease |
| 026 | c1 [Ta halsband+brev+lapp] | -15 | -10 | Tar-allt straffas men ej brutalt |
| 026 | c2 [Ta halsband+brev] | -15 | -8 | Lämnar lapp = mildare moralisk vikt |
| 026 | c3 [Läs allt, ta inget] | -12 | -3 | **KRAFTIG** — obligatorisk för `vet_om_bertil` på 1B-minimum-vägen |
| 030 | myrgrav [Tillbaka] | -8 | -4 | Liten ease (frivillig, men 1B-väg kan inkludera) |

### Akt II — Ritualen

| Scen | Element | Från | Till | Skäl |
|------|---------|------|------|------|
| 031 | c1 [Strö medurs takt 47] | +3 | +5 | Större belöning för korrekt utförande |
| 031 | [In] kliva in | -10 | -1 | **KRAFTIG** — obligatorisk transit, ej tema-vikt här |

### Akt III — Inside the gray (mandatoriskt sekvens)

| Scen | Element | Från | Till | Skäl |
|------|---------|------|------|------|
| 032 | [Vidare] | -5 | -2 | Mandatorisk; tonen byggs upp, ej trauma än |
| 033 | c3 [Tystnad] | -3 | -1 | Liten ease |
| 034 | c1 [Lyssna helt på Ingegerd] | -10 | -4 | **KRAFTIG** — obligatoriskt för `talat_med_ingegerd` (1B-krav). Möte är tungt men ej -10. |
| 034 | c2 [Vänd ryggen] | -2 | -1 | Cosmetic |
| 035 | c1 [Omfamna Leopold] | -5 | -3 | Liten ease |
| 035 | c2 [Sträck ut handen] | -3 | -1 | Cosmetic |
| 035 | c3 [Fråga om Bertil] | -8 | -5 | Liten ease |
| 035 | c4 [Säg ingenting] | -4 | -2 | Liten ease |
| 036 | [Vänd dig mot Det grå] | -10 | -3 | **KRAFTIG** — mandatoriskt; vänd-dig-akten är ej -10 i sig |

### Akt III — Mötet med Det grå (scen-037)

| Scen | Element | Från | Till | Skäl |
|------|---------|------|------|------|
| 037 | c1 [Strid med kniv] | -15 | -15 | **Behållen** |
| 037 | c2 [Hymn med kassett] | -8 | -6 | Liten ease |
| 037 | c3 [Förhandla — acceptera] | -5 | -5 | Oförändrad |
| 037 | c4 [Tala om ensamhet, hög-sanity] | -5 | -3 | Liten ease (belönande) |
| 037 | c5 [Erbjud Ingegerd — stoppa permanent] | -3 | **+2** | **Belöning** — den mest moget övervägda lösningen |
| 037 | c6 [Vägra utan plan] | -20 | -20 | **Behållen** — punishment |

---

## Total sanity-förlust per spelarstil

### Disciplinerad väg (test_path_d, intended Slut 1B-stig)

Startsanity 90. Tar bara det som krävs för flaggor:

| Scen | Val | Δ |
|------|-----|---|
| 009 | c1 entry | -1 |
| 013 | c1 ta tjärsten (kök) | -1 |
| 014 | c3 ta mejerinyckel | -1 |
| 024 | c1 mejeri med nyckel | -3 |
| 025 | c2 sluta läsa Astrid (sätter `vet_om_ingegerd`) | -2 |
| 026 | c3 läs trälår, ta inget (sätter `vet_om_bertil`) | -3 |
| 029 | c2 stoppa | 0 |
| 031 | c1 ritual full | +5 |
| 031 | [In] kliva in | -1 |
| 032 | [Vidare] | -2 |
| 033 | c3 tystnad eller c2 fråga | -1 |
| 034 | c1 lyssna på Ingegerd | -4 |
| 035 | c2 ta hand | -1 |
| 036 | [Vänd dig] | -3 |

**Summa: 90 - 18 = 72 vid scen-037.** Spelaren kan välja c5 (kräver ≥70).
Efter c5 (+2): final 74.

Säkerhetsmarginal: 2 över tröskeln. Disciplin krävs men inte perfektion. Mässingsnyckel-/källar-tjär-valet (Akt I) ger flexibilitet.

### Mid-curious-väg (default — Slut 1)

Spelaren utforskar lagom, hoppar över djup-lore:

- 009 c1: -1
- 013 c1: -1
- 014 c2 skumma: -3 (lab)
- 015: -1
- 017 c1 skumma dagbok: -2
- 018 c1 halsband: -1
- 019: -2
- 021 c4 undvik vinden: -8
- 022: -1
- 023 c1: -1
- 029: 0
- 031 c1 full: +5
- 031 [In]: -1
- 032: -2
- 033 c2 vem är du: 0 (går till 034)
- 034 c2 vänd ryggen: -1
- 035 c2 ta hand: -1
- 036 [Vänd dig]: -3

**Summa: 90 - 24 = 66 vid scen-037.** Under ≥70, men nära. Spelaren får c1 strid (om skarpt), c2 hymn (om frekvens), c3 offra, eller c6 nej. Slut 1 nåbart via c1/c2.

### Completionist-väg (läs allt, möt allt)

| Scen | Val | Δ |
|------|-----|---|
| 009 c1 | -1 |
| 012 c1+c2+c4 (pärm+hymn+tröja) | -6 |
| 013 c1+c2+c4 (tjär+kött+almanacka) | -4 |
| 014 c1 läs noga + c3 nyckel + c4 gruppfoto | -13 |
| 015 | -1 |
| 017 c1+c2+c4 (skumma+dagbok+skor) | -13 |
| 018 c2+c3+c4+c5 (sjätte halsband+namn+lock+spegel) | -13 |
| 019 | -2 |
| 021 c2 matat | -12 |
| 022 | -1 |
| 023 c1+c3 (tjär+kalender) | -4 |
| 024 c1 mejeri | -3 |
| 025 c1 läs Astrid | -6 |
| 026 c1 ta allt | -10 |
| 030 myrgrav | -4 |
| 031 c1 ritual full | +5 |
| 031 [In] | -1 |
| 032 | -2 |
| 033 c3 tystnad | -1 |
| 034 c1 lyssna | -4 |
| 035 c3 prata om Bertil | -5 |
| 036 [Vänd dig] | -3 |

**Summa losses: -109; positives: +5; net -104. Final entering 037: 90 - 104 = -14 → clamped till 0.**

Completionist har sanity 0 vid scen-037. c5 (≥70) **otillgängligt**. c4 (≥70) **otillgängligt**. De får välja c1 strid (om `skarpt=true`), c2 hymn (om `frekvens` ×2 — vilket en completionist har), c3 offra, eller c6 nej. Slut 1 reguljär eller Slut 3 (offra).

Detta är dramaturgiskt rätt: completionist har sett för mycket för att förhandla med ren mage. De har "betalat priset" i sanity.

---

## Bedömning av Slut 1B-balans

**Är Slut 1B nåbart med disciplin?** Ja. Disciplinerad spelare som följer test_path_d slutar vid sanity 72 vid scen-037, en marginal på 2 över tröskeln ≥70. Efter c5-belöningen (+2) når de scen-038 vid sanity 74.

**Är Slut 1B för enkelt?** Nej. Mid-curious-spelare hamnar typiskt på 60-66 vid scen-037, vilket är just under tröskeln. De får Slut 1 reguljär. Completionist hamnar på 0 och kan absolut inte ta c5. 1B kräver:
1. Specifik intention (`vagval_intention=stoppa`)
2. Specifik förkunskap (`talat_med_ingegerd=true`)
3. Disciplin i utforskningen (skippa dagbok-djupläsning, undvik vinden, ta bara nyckel i lab)
4. Full ritual (medurs takt 47)

**Risk:** En spelare kan teoretiskt boosta sanity ytterligare genom Slut 1B-vägen om de hittar fler +sanity-möjligheter. För närvarande finns bara två: 031 c1 (+5) och 037 c5 (+2), samt 103 c2 (uggla, +1). Risken är låg.

**Risk #2:** Spelare som läser dagboken (-10) eller går till vinden c1/c2/c3 (-12 till -18) når INTE 1B även om de annars är disciplinerade. Det är medvetet — Alices dagbok är "fördjupningsskikt" som täcker hennes inre, men det offrar 1B-vägen. Spelet bestraffar inte kunskap i sig — det reflekterar tematik: information kostar.

---

## Filer ändrade

- `docs/scenes/scene-009.{sv,en}.md`
- `docs/scenes/scene-014.{sv,en}.md`
- `docs/scenes/scene-017.{sv,en}.md`
- `docs/scenes/scene-018.{sv,en}.md`
- `docs/scenes/scene-021.{sv,en}.md`
- `docs/scenes/scene-022.{sv,en}.md`
- `docs/scenes/scene-023.{sv,en}.md`
- `docs/scenes/scene-024.{sv,en}.md`
- `docs/scenes/scene-025.{sv,en}.md`
- `docs/scenes/scene-026.{sv,en}.md`
- `docs/scenes/scene-030.{sv,en}.md`
- `docs/scenes/scene-031.{sv,en}.md`
- `docs/scenes/scene-032.{sv,en}.md`
- `docs/scenes/scene-033.{sv,en}.md`
- `docs/scenes/scene-034.{sv,en}.md`
- `docs/scenes/scene-035.{sv,en}.md`
- `docs/scenes/scene-036.{sv,en}.md`
- `docs/scenes/scene-037.{sv,en}.md`

**Totalt: 18 scener × 2 språk = 36 filer berörda.**

---

## Avvikelser från task-guideline

Task-guideline angav `024 → -12 till -15` och `026 → -12 till -15` för mejeriet/trålår. Vi sänkte 024 c1 till -3 och 026 c3 till -3.

**Skäl:** Med guideline-värden blir Slut 1B matematiskt onåbar (jag verifierade: 90 - 108 = -18 → 0 sanity vid scen-037). Eftersom dessa två stationer är OBLIGATORISKA för 1B-flaggorna `vet_om_sallskapet` (024) och `vet_om_bertil` (026), måste den disciplinerade spelaren betala BÅDA på minimum-vägen. Kombinerat med inside-gray-mandatoriska kedjan (031-036) blir den totala budgeten alldeles för smal för att hålla ≥70.

Tematisk tyngd bibehållen genom prosan och flaggorna (`brutit_in_i_mejeri` ger fortfarande dialog-konsekvenser i 036). Det är kunskapen som väger, inte ett sanity-tal i ett mätaruttryck.

Mejeriets "tunga" varianter (c2 break-in: -8, c1 ta-allt-inkl-lapp: -10) bibehåller fortfarande en kännbar straff för aggressiva eller giriga val.
