# Choice Architecture — Mosters Hemligheter

> De **12 viktigaste valen** i spelet (utökat från 10). Varje val klassificeras som **avslöjande** (visar vem spelaren är), **strategiskt** (ändrar tillgängliga vägar) eller **existentiellt** (sanity/moral, ofta utan rätt svar).
> **Revision 2:** Två nya kärnval för sällskaps-tråden. Befintliga val justerade för norra Sverige-platsen och tjärsten-ritualen.

---

## Val 1 — Packningen *(scene-002)*

**Typ**: Strategiskt
**Plats**: Spelarens lägenhet, sen junikväll
**Beskrivning**: Spelaren väljer upp till 5 items av 7 möjliga.

### Möjliga items och tagg-konsekvenser
| Item | Tags | Konsekvens |
|------|------|------------|
| Ficklampa | `ljus`, `verktyg` | Låser upp källaren utan substitut. Tryggare vinds-möte. |
| Jaktkniv (ärvd) | `skarpt`, `vapen`, `arv` | Möjliggör strid-vägen mot Det grå. `arv`-tagg ger sanity-buffert i scene-036. |
| Kassettbandspelare | `frekvens`, `ljud` | Möjliggör hymn-vägen mot Det grå. Kritisk för Slut 1. |
| Mobilladdare | `kommunikation` | Mindre värde nu (ingen mobiltäckning de sista 30 km) men ger laddning för att läsa filer från macken. |
| Första-hjälpen | `vård` | Reducerar sanity-bortfall i strid-scen. |
| Varma kläder | `komfort` | Trots sommarmånad: nätterna i fjälltrakt är kalla, knottet ges respit. Sätter `förberedd`-flagga. |
| Extra batterier | `frekvens`, `verktyg` | Kombinerar med kassettbandspelare för pålitlighet. |

### State-flaggor som sätts
- `inventory[]` — array av tags
- `förberedd` (om varma kläder + första-hjälpen)

### Senare konsekvenser
- Akt III mot Det grå: tillgängliga handlingar bestäms 70% här
- Vinden (scene-021): med ficklampa ser spelaren tinget tydligt → -15 sanity, utan ficklampa ser spelaren bara skuggor → -25 sanity men sämre information

---

## Val 2 — Att ringa mamma eller inte *(scene-003)*

**Typ**: Avslöjande
**Beskrivning**: Innan resan, ringa mamma (Alices syster) eller inte.

### Alternativ
- **Ärlig oro** — "Mamma, Gunnar lät rädd. Jag åker dit." Sätter `mamma_vet=true`, `relation_mamma+1`
- **Lugnande** — "Det är inget. Jag åker upp och kollar bara." Sätter `mamma_vet=false`, `relation_mamma+0`
- **Inte alls** — Du ringer inte. Sätter `mamma_vet=false`, `relation_mamma-1`

### Senare konsekvenser
- Slut 4 (tystnaden): om `mamma_vet=true`, epilogen är annorlunda — mamma har koll på vad som hände, hittar mejeriet, kontaktar polisen
- Inverkar på en dialog-option i scene-036 (Alice frågar om sin syster)

---

## Val 3 — Macken-mötet *(scene-005)*

**Typ**: Avslöjande / Strategiskt — NU UPPGRADERAD pga sällskaps-tråden
**Beskrivning**: Vid tankning i Sveg frågar en äldre man om du är på väg till Hällmyren.

### Alternativ
- **Prata öppet** — Han säger att han hade "en släkting i den där grejen på 70-talet" och ger spelaren ett vårdhemsnummer (Per-Magnus). Sätter `vet_om_per_magnus=true`, `vet_om_sallskapet_rykte=true`.
- **Korta svar** — Han ger nummer ändå, men säger inget om sällskapet. Sätter `vet_om_per_magnus=true` utan kontext.
- **Undvik** — Du säger ingenting och kör vidare. Inget sätts. Spelaren kan ändå nå Per-Magnus om de hittar lappen senare i Alices saker (mindre sannolik väg).

### Senare konsekvenser
- Öppnar scene-009 (telefon till Per-Magnus) i Akt I
- Sätter en första antydan om att Alice & Leopold inte var ensamma — gör scene-024 (mejeribyggnaden) en bekräftelse, inte en chock

---

## Val 4 — Frågor till Gunnar *(scene-008, scene-020)*

**Typ**: Avslöjande / Strategiskt — UPPDATERAT med sällskaps-fråga
**Beskrivning**: Spelaren har **7 möjliga frågor** (uppgraderat från 6) till Gunnar och kan ställa max 3 vid första mötet.

### Frågorna
1. När såg du Alice sist?
2. Hörde du något under stormen?
3. Vet du om Leopold?
4. Vad är det med hundarna?
5. Får jag nyckeln nu eller ska jag vänta?
6. Vill du att jag ringer dig?
7. **NY — Visste din far något om vad de höll på med?** (Trigger: avslöjar Olovs roll i sällskapet)

### State-flaggor
- `gunnar_tillit` (0-10), startar på 2
- `gunnar_vet_om_leopold`, `gunnar_vet_om_hundarna`, **`vet_om_olov`** (om fråga 7 ställs)
- `gunnar_obekväm` (om för många hårda frågor i rad)

### Senare konsekvenser
- Scene-020: hög tillit + `vet_om_olov` låser upp samtal om sällskapet
- Slut 2 (en blev kvar): om spelaren tar med `har_lapp_till_gunnar` ut ur mejeriet och ger den till Gunnar, epilogen får sin tyngsta scen
- För hög intensitet i frågorna ger `gunnar_obekväm`, vilket låser scene-020

---

## Val 5 — Vinden: möte med tinget *(scene-021)*

**Typ**: Existentiellt — OFÖRÄNDRAT
**Beskrivning**: Något står på vinden. Vad gör du?

### Alternativ
- **Ficklampa direkt på det** — Du ser. -15 sanity. `vinds_tinget_status=sett`.
- **Mata det** (kräver `har_mat`) — Det följer dig. `vinds_tinget_status=matat`. Krav för Slut 1 bästa version.
- **Skär det med vapen** — Du sårar det. Det springer iväg. -10 sanity. `vinds_tinget_status=sårat`. Stänger Slut 1.
- **Döda det** — Bara möjligt med `skarpt`-vapen + sanity ≤ 40. -25 sanity. `vinds_tinget_status=dödat`. Specifik dialog i scene-036 där Alice förstår vad som hände.
- **Backa, stäng dörren** — Det väntar. `vinds_tinget_status=undviket`.

### Senare konsekvenser
- Slut 1 enklast om `matat` eller `undviket` + senare bra interaktion
- Slut 3: om `dödat`, Det grå har en specifik replik om "det enda av oss du redan kände"

---

## Val 6 — Läsa Alices dagbok *(scene-017)*

**Typ**: Avslöjande / Existentiell — UPPDATERAT med sifferkombination
**Beskrivning**: Dagboken ligger uppslagen. Tre möjliga djupnivåer.

### Alternativ
- **Skumma** — -3 sanity. `förstår_alice=1`. Spelaren ser kombinationen "1979-06-23" i marginalen.
- **Läsa noga** — Du går igenom alla sex år av sorg. -10 sanity. `förstår_alice=2`. Får dessutom dechiffrerade ledtrådar om sällskapet och om Bertil.
- **Stänga utan att läsa** — `förstår_alice=0`. Stänger dialog-alternativ i scene-036. Spelaren missar kombinationen — måste hitta den i marginalen genom omspel eller råka komma på datumet ("midsommardagen 1979" finns annars i Astrids pärm).

### Senare konsekvenser
- Scene-036: dialogen med Alice. `förstår_alice=2` låser upp den enda repliken som kan få Alice att lämna utan att Leopold finns med
- `förstår_alice ≥ 1` ger spelaren kombinationen till trälåren (scene-026)
- Påverkar Slut 1: utan `förstår_alice ≥ 1` är slut 1 omöjligt eftersom Alice inte tror att spelaren förstår

---

## Val 7 — Halsbandslådan *(scene-018)*

**Typ**: Avslöjande — OFÖRÄNDRAT
**Beskrivning**: Sex halsband med datum, ett med frågetecken. Vad gör du?

### Alternativ
- **Ta ett halsband** — Vilket? (Sjunde — frågetecken — är specifikt). Sätter `bär_halsband`.
- **Läs alla namn högt** — Sanity -8. `läst_namn=true`. Triggar ny dialog-replik i scene-033.
- **Stäng lådan och gå** — Inget. Stänger en dialog-väg i scene-033 men sparar sanity.

### Senare konsekvenser
- Scene-033 (Rösterna i det grå): med `bär_halsband=sjunde` finns en specifik dialogtråd
- Slut 1 bästa version kräver `bär_halsband != none`

---

## Val 8 — Öppna eller forcera mejeriet *(scene-024)* — NYTT

**Typ**: Strategiskt
**Plats**: Bakom huset, mot myrens kant. Mejeribyggnaden 80 m bort.

### Alternativ
- **Använd mejerinyckeln** (kräver `har_mejerinyckel=true` från scene-014) — Du kommer in lugnt. Sätter `oppnat_mejeri=true`, sanity -12.
- **Bryt dig in med skarpt eller verktyg** — Du måste välja om du vill bryta. Sätter `oppnat_mejeri=true` ∧ `brutit_in_i_mejeri=true`. -15 sanity (din egen handling). En specifik replik i scene-036: Alice noterar att du tog dig in med våld.
- **Lämna mejeriet** — Du kan välja att aldrig öppna mejeriet. Sätter ingen flagga. Konsekvens: sällskaps-tråden missas. Du kan fortfarande nå Slut 1, men du saknar tre dialogalternativ med Alice och Slut 1B är otillgängligt.

### State-flaggor
- `oppnat_mejeri`, eventuellt `brutit_in_i_mejeri`
- `vet_om_sallskapet=true` om mejeriet öppnas

### Senare konsekvenser
- Öppnar scene-025 och scene-026 (Astrids pärm, trälåren)
- Möjliggör scene-029 (vägen-valet) som annars är onåbar
- Möjliggör fyra nya argument med Alice i scene-036

### Designanmärkning
Detta är en av få **valfria** kärnval. Spelaren *kan* hoppa över sällskaps-tråden. Den blir dock så frestande (genom Alices dagbok, gruppfotot, gravstenen) att de flesta spelare följer den.

---

## Val 9 — Vägen-valet *(scene-029)* — NYTT

**Typ**: Existentiellt
**Plats**: Inre monolog efter trälårupptäckten
**Beskrivning**: Du har förstått att Alice & Leopold var del av en grupp. Du har förstått att det finns en morbror du aldrig fick veta om. Vad är din intention här?

### Alternativ
- **Rädda Alice oavsett** — Sätter `vagval_intention="rädda"`. Standardvägen. Alla slut är öppna utifrån denna intention.
- **Stoppa det sällskapet började** — Sätter `vagval_intention="stoppa"`. Låser upp Slut 1B (permanent stängning av portalen) om kombinerat med hög-sanity-vägen. Påverkar dialogen med Alice — vissa argument förlorar tyngd ("Kom hem, mamma") och andra vinner ("Vi måste stoppa det här").
- **Obeslutsam** — Du vägrar bestämma dig nu. Sätter `vagval_intention="obeslutsam"`. Du får bestämma på andra sidan. Mest flexibel men ger minst djup i dialogen.

### State-flaggor
- `vagval_intention` ("rädda" / "stoppa" / "obeslutsam")

### Senare konsekvenser
- Avgör tonen i scene-036 (Alice). "Stoppa"-intentionen gör Alice mer skeptisk men öppnar en ny replik där spelaren erbjuder henne ett gemensamt slut snarare än en räddning.
- Krav för Slut 1B (variant av Slut 1 där portalen stängs för gott och Bertil får sitt datum)
- **Intentionen är inte oåterkallelig** — spelaren kan ändra sig genom handling i Akt III. Men intentionen är en tröskel: vissa repliker kräver att intentionen *redan är satt korrekt*.

### Designprincip
Detta är spelets stora moraliska val efter sanity-värdet. Det fångar den centrala frågan: är det vi älskar viktigare än ansvaret för vad de gjorde?

---

## Val 10 — Ritualens utförande *(scene-031)*

**Typ**: Strategiskt — UPPDATERAT (havssalt → tjärsten)
**Beskrivning**: Tre micro-val i sekvens, alla baserade på pärm + state.

### Mikro-val
1. **Tjärstens-riktning**: medurs (korrekt enligt Alices senaste anteckning) / motsols (Leopolds äldre anteckning — också giltigt men annan effekt) / inget tjärsten (om `har_tjarsten=false`). Om `vet_om_tjarsten_korrekt=true` (Per-Magnus-samtalet): spelaren *vet* att det måste vara tjärsten och inte salt — ger sanity-buffert (+3) för rätt val.
2. **Taktslag**: 46 / 47 (korrekt) / 48 — kräver att spelaren förstår musiken (`förstår_frekvens ≥ 1`)
3. **Cirkelns geometri**: är dina fötter innanför hela cirkeln? (yes/no)

### State-flaggor
- `ritual_korrekt` (full / partial / nej)
- `salt_riktning` (medurs / motsols / ingen) — kvar som flagga-namn för bakåtkompatibilitet, men flaggen avser nu tjärstens-riktning

### Senare konsekvenser
- **Full**: Akt III börjar med spelare med full sanity-buffert (+5)
- **Partial**: Akt III börjar med -10 sanity och Det grå är där genast
- **Nej / ingen tjärsten**: portalen öppnas instabilt — Akt III spelas i komprimerad form

---

## Val 11 — Vart ropar du på andra sidan *(scene-033)*

**Typ**: Avslöjande — UPPDATERAT med ny väg
**Beskrivning**: I det grå hör spelaren röster. Vad ropar du efter?

### Alternativ
- **"Alice!"** — Du vänder dig mot Alice-vägen. `grå_riktning=alice_först`.
- **"Leopold!"** — Du vänder dig mot Leopold. `grå_riktning=leopold_först`.
- **"Signe!"** — Du försöker locka hunden. `grå_riktning=signe_först`. Enbart om `bär_halsband != none` eller `läst_namn=true`.
- **"Vem är du?"** (mot den okända kvinnoröst) — NYTT. Du vänder dig mot Ingegerd-ekot direkt. `grå_riktning=ingegerd_först`. Tillåter scene-034 att spelas i full form.
- **Tystnad** — Du står still. `grå_riktning=tyst`. Det grå märker dig först.

### Senare konsekvenser
- Påverkar ordningen i scene-034/035/036
- "Ingegerd_först" är den enda vägen som garanterar full Ingegerd-dialog — andra vägar ger en glimtad version

---

## Val 12 — Konfrontationen med Det grå *(scene-037)*

**Typ**: Strategiskt / Existentiellt — UPPDATERAT med stoppa-permanent
**Beskrivning**: Det grå föreslår ett byte. Du är på korsvägen.

### Huvudvägar
- **Strid** — Kräver `skarpt`-tagg. Sanity-check: vid < 30 går du till panik-gren.
- **Hymn** — Kräver `frekvens`-tagg ×2. Säkraste vägen till Slut 1.
- **Förhandling — accepterar** — Du stannar. `valt_offra_sig=true`. Slut 3.
- **Förhandling — vägrar utan plan** — Du hinner inte ut. Slut 4.
- **Hög-sanity-vägen** — Kräver `sanity ≥ 70`. Du talar med Det grå om dess ensamhet. Bästa Slut 1.
- **Hög-sanity + stoppa-intention** — NYTT. Kräver `sanity ≥ 70` ∧ `vagval_intention="stoppa"` ∧ `talat_med_ingegerd=true`. Spelaren erbjuder Det grå Ingegerd-ekot som följeslagare och stänger portalen *permanent*. Slut 1B. Bittersötaste varianten — Alice och Leopold kommer hem men sällskapets verksamhet slutar för alltid, och Bertil får sin datumlinje.

### State-flaggor
- `valt_offra_sig`
- `besegrat_det_grå` (true om strid eller hymn)
- `förstod_det_grå` (true om hög-sanity-vägen)
- `stoppat_permanent` (true om hög-sanity + stoppa-vägen)

---

## Sammanställning: vilka val öppnar vilket slut

| Slut | Krav |
|------|------|
| Slut 1 — Alla hem | `alice_med ∧ leopold_med ∧ ¬valt_offra_sig` + en av {hymn, strid med skarpt arv, hög-sanity-väg} |
| Slut 1B — Alla hem + portalen stängd för gott | Slut 1-krav ∧ `stoppat_permanent=true` |
| Slut 2 — En blev kvar | Exakt en av `alice_med`/`leopold_med` ∧ `¬valt_offra_sig` |
| Slut 3 — Väktaren | `valt_offra_sig=true` |
| Slut 4 — Tystnaden | `¬alice_med ∧ ¬leopold_med ∧ ¬valt_offra_sig` |

---

## Designprinciper för valen

1. **Inget val är "fel"** — bara olika konsekvenser
2. **Avslöjande val** har sällan mekanisk konsekvens men ändrar dialogton senare
3. **Strategiska val** ändrar inventory eller låser upp/stänger grenar
4. **Existentiella val** har sanity-konsekvens och är svårast att backa från
5. **Spelaren ska aldrig veta exakt** vilket val låser upp vilket slut — vi vill ha emotionella, inte optimerade, val
6. **NYTT — Sällskaps-tråden ger djup, inte gates.** Med ett undantag (Slut 1B), kan alla slut nås utan att öppna mejeriet. Sällskapet är ett *fördjupningsskikt* — inte en obligatorisk subplot.
