# Plot Outline — Mosters Hemligheter

> Tre akter, branch-and-bottleneck-struktur. Varje akt slutar i en bottleneck-scen som alla vägar går igenom — mellan bottleneckarna förgrenar sig vägarna.
> **Revision 2:** Plats Härjedalen/Hällmyren. Längre resa-akt. Sällskapets spår introducerade i Akt I och utforskade i Akt II.

---

## Strukturöversikt

```
START
  v
[AKT I: Inciting + Resa norrut + Ankomst]
  - Liten gren: vad spelaren packar (sätter inventory från start)
  - Sällskaps-frö: macken-möte (Per-Magnus rykte), Gunnars halvsanningar
  - Bottleneck-1: ANKOMST TILL HÄLLMYREN (första klivet in i huset)
  v
[AKT II: Husutforskning + Mejeribyggnaden + Ritual]
  - Stor gren: rumsutforskning kan ske i olika ordning
  - Sub-bottleneck: VINDS-MÖTET
  - Sub-bottleneck: MEJERI-UPPTÄCKTEN (sällskapet avslöjas)
  - Sub-bottleneck: STRÖMMEN TILLBAKA
  - Sub-bottleneck: VÄGEN-VAL (följa Alice / stoppa sällskapet)
  - Bottleneck-2: KLIVA IN I PORTALEN
  v
[AKT III: Andra sidan + Konfrontation + Slut]
  - Liten gren: hur Det grå möts (strid / hymn / förhandling / hög-sanity-väg)
  - Möte med fragment av sällskapets döda
  - Bottleneck-3: PORTALEN STÄNGS
  v
ETT AV FYRA SLUT
```

Totalt cirka **42 scener** (uppgraderat från 38). Av dessa är **5 hård-bottleneck**, **5 sub-bottleneck**, resten är grenar, hub-rum eller dead-end-rooms man backar ut ur.

---

## Akt I — "Telefonsamtalet och resan norrut" (Scener: ~10)

### Tema
Det normala börjar vrida sig. Spelaren tror fortfarande detta är en familjeplikt, inte en mardröm. Resan norrut är en gradvis avskärmning från civilisationen — som ett tryckkammartest av spelarens beredskap.

### Beats

**Beat 1.1 — Samtalet** *(scene-001)*
- Inciting incident. Gunnar ringer. Spelaren tar emot beskedet i sin lägenhet i Stockholm.
- Val: hur snabbt agerar du? (sätter karaktärston, inte mekanik)

**Beat 1.2 — Packningen** *(scene-002)*
- Spelaren går igenom sin lägenhet och väljer vad som ska med
- **Strategiskt val** — sätter startinventory. Inget är "fel" — varje val har konsekvenser
- Val mellan: ficklampa, jaktkniv (ärvd från far), kassettbandspelare, mobilladdare, första hjälpen-kit, varma kläder, extra batterier — max 5 items

**Beat 1.3 — Telefonsamtal med mamma** *(scene-003)*
- Avslöjande val om vad spelaren säger till henne
- Sätter `mamma_vet`-flagga

**Beat 1.4 — Vägen norrut, etapp 1** *(scene-004)*
- Lång bilfärd genom Uppland → Gästrikland → Hälsingland. Sex-sju timmars körning första etappen.
- E45 öppnar sig norr om Mora. Tallhed. Grusvägar svänger av.
- Atmosfärscen: radio går från P1 till lokala stationer som tappas en efter en

**Beat 1.5 — Macken i Sveg** *(scene-005)* — uppdaterad
- Spelaren tankar. Det är sen eftermiddag men solen är hög.
- En äldre man vid pumpen ser registreringsskylten och frågar: "Är du på väg till Hällmyren?"
- Val: prata med honom / undvik. Om prata: han nämner att han hade en "släkting i den där grejen på 70-talet" — Per-Magnus Berg. Han ger spelaren en lapp med ett vårdhemsnummer.
- Sätter `vet_om_per_magnus`, `vet_om_sallskapet_rykte`

**Beat 1.6 — De sista 30 km** *(scene-006)* — NY
- Grusvägen tar vid. Mobiltäckningen försvinner. Spelaren kör genom det som var en by — husgrunder, en kyrka med stängda fönsterluckor, en igenvuxen lekplats.
- Solen står lågt men sjunker aldrig under fjällsilhuetten.
- Atmosfärscen, ratt-val: kör du sakta och iakttar / kör du på (du vill vara framme)? Sätter `sanity` ±2 och `set_kort_om_omgivningen`.

**Beat 1.7 — Ankomst Hällmyren** *(scene-007)*
- Vägen slutar vid huset. Bakom huset: myren. Bakom myren: kalfjället. Det är 21:00 men ljust som tidig kväll.
- Atmosfärsekund. Inget val.

**Beat 1.8 — Gunnar på trappan** *(scene-008)*
- Gunnar väntar. Han har hört bilen från sin stuga.
- Avslöjar var nyckeln ligger (under den platta hällen vid trappen)
- **Avslöjande val**: hur mycket frågar du Gunnar nu? (max 3 frågor av 6, samma logik som tidigare)
- **NYTT — en av frågorna kan vara:** "Visste din far något om vad Alice och Leopold höll på med?" → låser upp sällskaps-tråden tidigare

**Beat 1.9 — Optional: telefonsamtal med Per-Magnus** *(scene-009)* — NY, valfri
- Om spelaren fått lappen från macken kan de försöka ringa vårdhemmet från Gunnars stuga (egen telefon — fast linje, ingen mobiltäckning)
- Per-Magnus är förvirrad men säger en konkret sak: "Salt fungerar inte. Tjärsten. Bara tjärsten."
- Sätter `vet_om_tjarsten_korrekt`. Detta gör Akt II-ritualen lättare att göra rätt.
- **Hela scenen är 90 sekunder lång** — designprincip: en mänsklig röst varnar spelaren tidigt

**BOTTLENECK-1 — Första klivet in** *(scene-010)*
- Alla vägar konvergerar. Spelaren öppnar dörren till Alices hus.
- Sätter `sanity` initial-värde (mellan 88-100 beroende på akt-I-val — något lägre tak än tidigare pga längre resa)
- Etablerar känsla: tystnad, kall hall, sju koppel på en rad

---

## Akt II — "Huset, mejeriet och ritualen" (Scener: ~22)

### Tema
Spelaren förstår gradvis att Alice inte är en virrhuvad gammal moster — hon var inne i något stort, och hon var inte ensam. Rumsligt fritt, narrativt fokuserat.

### Beat-struktur — Akten organiseras som EN HUB med utforskningsbara rum

Akt II är inte linjär. **Vardagsrummet fungerar som hub**. Spelaren kan gå till och från det. Varje rumsbesök ger ledtrådar och eventuellt items.

### Bottleneckar i Akt II

**Sub-bottleneck 2A — Vinds-mötet** *(scene-021)*
- Vid någon tidpunkt hör spelaren ett ljud uppifrån. Spelaren MÅSTE välja:
  - Gå upp på vinden nu (möte med vinds-tinget)
  - Ignorera (det väntar — möter dig senare under sämre omständigheter)

**Sub-bottleneck 2B — Mejerinyckeln + Mejeriupptäckten** *(scene-024)* — NY
- Vid något tillfälle hittar spelaren mejerinyckeln (i Leopolds arbetsrum, scen-013).
- När spelaren öppnar mejeriet börjar den nya tråden. Spelaren förstår att Alice & Leopold inte var två — de var del av en grupp.
- Detta är **inte valfritt** för att Akt III ska kunna landa korrekt. Spelare som inte hittar nyckeln pushas mot den genom Alice-dagbokens senare sida.

**Sub-bottleneck 2C — Vägen-valet** *(scene-029)* — NY, kritisk
- Efter mejeriupptäckten konfronteras spelaren med valet: **följa Alices spår och få henne hem oavsett** vs **avsluta det sällskapet började och stänga portalen för gott**
- Detta är **inte ett oåterkalleligt val** — det är en intentionsmarkör. Spelaren kan ändra sig genom handlingar i Akt III, men intentionen påverkar dialogalternativ med Alice (scene-033).
- Sätter `vagval_intention` ("rädda" / "stoppa" / "obeslutsam")

**Sub-bottleneck 2D — Strömmen tillbaka** *(scene-025)*
- För att ritualen ska kunna ske måste spelaren ha besökt vedboden, plockat verktyg, och fixat säkringsskåpet
- När strömmen är tillbaka: skivspelaren startar automatiskt.

**Sub-bottleneck 2E — Förstå ritualen** *(scene-027)*
- Spelaren måste ha läst Alices instruktionspärm OCH hittat tjärsten
- Om Per-Magnus-samtalet skedde: spelaren har förvarning att det är tjärsten som krävs, inte salt

### Rumsöversikt (uppdaterad)

| Rum | Items | Story-clues | Sanity-effekt |
|-----|-------|------------|---------------|
| Hall | Hundkoppel (×7), kappa | Sju Signe-bilder | -2 |
| Vardagsrum (hub) | Skivspelare (orörlig), LP | Hymnens omslag | 0 |
| Kök | Tjärsten (alt), ficklampa | Almanackan med streck | -3 |
| Leopolds arbetsrum | Lab-anteckningar, **mejerinyckel** | Frekvens-mytologin, **gruppfoto 1981** | -10 |
| Alices sovrum | Dagbok (sent skede) | Hennes sorg, planen, **kombination till trälår** | -10 |
| Gästrum | Halsbandslåda | Sju namn, sex datum | -5 |
| Badrum | (inget) | En kammad hårborste | -1 |
| Vinden | Vinds-tinget | Direkt möte | -15 till -25 |
| Källare-förvar | Kassettbandspelare-batterier | Damm, fukt, **en halv burk tjärsten** | -2 |
| Källare-ritual | Cirkeln, tjärsten-rest | Visuell horror | -10 |
| Vedboden | Verktyg, säkring | Uggla, hundgrav | -3 |
| Bilen (Alices) | Karta över myren, vykort | Var hon planerade åka? | -1 |
| **Mejeribyggnaden** | Astrids pärm, ritualprotokoll, lapp till Gunnar | **Sällskapet avslöjas** | -12 |
| **Trälåren i mejeriet** | Bertils brev, gravstensskiss, "extra" halsband | **Bertil-revelationen** | -15 |
| **Myrgraven** (utomhus) | (inget) | Bertils gravsten utan kropp | -8 |

### Beats i Akt II

**Beat 2.1 — Hallen** *(scene-011)*
- Spelaren står i hallen, sju koppel, val: vart först? Hub-mekaniken etableras.

**Beats 2.2–2.10 — Rumsutforskning** *(scene-012 till scene-020)*
- Spelaren rör sig fritt. Vissa rum låses upp av items från andra rum.
- Optional: Telefonsamtal med Gunnar för clues *(scene-019)*
- I scene-013 (Leopolds arbetsrum) hittar spelaren **gruppfotot från 1981** och **mejerinyckeln** — sällskaps-tråden startar visuellt här
- I scene-015 (Alices sovrum) hittar spelaren **kombinationen till trälåren** i en marginalanteckning

**Beat 2.11 — Vinds-mötet** *(scene-021)*
- Se Sub-bottleneck 2A.

**Beat 2.12 — Vedboden och strömmen** *(scene-025)*
- Se Sub-bottleneck 2D.

**Beat 2.13 — Hymnen börjar spela** *(scene-026)*
- Atmosfär-scen. Inget val. Spelaren hör skivspelaren starta från övervåningen. Sanity -5.

**Beat 2.14 — Mejeribyggnaden** *(scene-023, scene-024)* — NY
- Spelaren kommer ut bakom huset och möter den falurött plåtklädda mejeribyggnaden. Låst. Mejerinyckeln öppnar.
- **Scene-023**: Första intrycket — sex stolar runt ett bord, ett blädderblock med handskrivna mötesnoteringar, dammet ligger som ull, en kaffekopp står kvar med intorkad ring.
- **Scene-024**: Spelaren undersöker. Hittar Astrids pärm. Hittar gruppfotot (om de inte redan sett det i arbetsrummet). Hittar **trälåren**.

**Beat 2.15 — Trälåren och Bertil-revelationen** *(scene-028)* — NY
- Om spelaren har kombinationen från Alices marginalanteckning kan de öppna trälåren.
- I lådan: Bertils brev till en aldrig postad mottagare (hans hustru som lämnade honom 1977). Skiss över hans gravsten. Ett **åttonde halsband** — Bertils egen hund som drunknade samma dag som han.
- Spelaren förstår att de har en morbror till. Sanity -15.
- Sätter `vet_om_bertil`, `bär_attonde_halsband` (om de tar det)

**Beat 2.16 — Myrgraven** *(scene-030)* — NY, valfri
- Skiss i lådan visar var Bertils gravsten finns — 600 m ut på myren, vid en björkdunge.
- Optional sidescen. Att gå dit ger inte items men ger `besokt_myrgraven`-flagga som öppnar specifika dialogalternativ med Alice i scene-033 ("Jag har varit vid hans sten").
- Det är 23:00 men ljust. Knottet är obarmhärtigt. Vandringen är beklämmande.

**Beat 2.17 — Vägen-valet** *(scene-029)* — NY, kritisk sub-bottleneck
- Mellan trälårupptäckten och ritualens förberedelse: spelaren stannar i mejeriet eller i Alices sovrum och måste fatta intentionsbeslut.
- Triggas av spelarens framsteg — sker när `vet_om_bertil=true` ∧ `vet_om_sallskapet=true` ∧ ritualförberedelse-flagga ännu false.
- Inre monolog-scen. Tre intentioner att välja: **rädda Alice**, **stoppa portalen för gott**, **avvakta — bestäm på andra sidan**.

**Beat 2.18 — Förbereda cirkeln** *(scene-027)*
- Se Sub-bottleneck 2E. Spelaren strör tjärsten, väljer riktning, väntar på rätt taktslag.

**BOTTLENECK-2 — Klivet in i portalen** *(scene-031)*
- Alla vägar konvergerar.
- Sanity-tröskel-check: om < 40, spelaren har en hallucination innan portalen öppnas — fragment av sällskapets ansikten

---

## Akt III — "Den grå" (Scener: ~10)

### Tema
Spelaren möter det omöjliga och måste välja vad förståelse betyder. Hemresan är inte garanterad. På andra sidan möter spelaren inte bara Alice och Leopold — också ekon av sällskapets döda.

### Beats

**Beat 3.1 — Ankomst på andra sidan** *(scene-032)*
- Inget val. Bara beskrivning. Spelaren har inga referenspunkter.

**Beat 3.2 — Rösterna** *(scene-033)*
- Spelaren hör röster. Vissa är spelarens egen. En låter som mamma. En låter som Signe. **NYTT:** en låter som en kvinna spelaren inte känner — det är Ingegerd Hagström, eller hennes eko.
- **Avslöjande val** om vad spelaren ropar efter

**Beat 3.3 — Möte med Ingegerd-ekot** *(scene-034)* — NY
- Spelaren ser en kvinnogestalt med ryggen mot. Om spelaren talar förstår de att det är en av sällskapets försvunna.
- Ingegerd-ekot är **inte fientligt**. Det är en informationskälla. Det kan ge spelaren en konkret sanning om vad Det grå vill.
- **Existentiellt val**: lyssna på henne (sanity -10 men kunskap +) / vända ryggen (sparar sanity men spelaren saknar argument senare)

**Beat 3.4 — Hitta Leopold** *(scene-035)*
- Han är inte den första. Han är där först. Skadad psykiskt, knappt verbal.
- **Strategiskt val**: ta med honom direkt eller fortsätt leta Alice

**Beat 3.5 — Hitta Alice** *(scene-036)*
- Hon är vid Det grå. Inte tvingad — sammansmält.
- Hon känner igen spelaren men är inte säker på att hon vill hem.
- **Existentiellt val**: hur övertygar du henne — argument-träd uppdaterat med sällskaps-baserade repliker

**Beat 3.6 — Konfrontation med Det grå** *(scene-037)*
- Fyra huvudvägar:
  - **Strid** (med jaktkniv eller annat skarpt) — riskabelt, kan döda spelaren
  - **Hymn** (med kassettbandspelaren) — kräver att spelaren tog med den i Akt I + batterier
  - **Förhandling — accepterar** — Det grå erbjuder spelaren att stanna i utbyte mot Alice och Leopold (LEDER TILL SLUT 3)
  - **Hög-sanity-vägen** — kräver `sanity ≥ 70`. Spelaren talar med Det grå om dess ensamhet. Det leder till bästa Slut 1 om kombinerat med rätt val. Om `vagval_intention="stoppa"` finns en specifik replik som faktiskt stänger portalen permanent (slut 1-variant: bittersötare).

**BOTTLENECK-3 — Portalen stängs** *(scene-038)*
- Bottleneck. Konsekvens-scen.
- Vem är på vilken sida nu? Determineras av tidigare val + state.

### Slut-grenar *(scene-039 till scene-042)*

**Slut 1 — Alla kommer hem** *(scene-039)*
- Kräver: Alice + Leopold + spelare + (helst vinds-tinget) tillbaka innan strömmen går
- Bittert-söt epilog. Alice är inte den hon var. Leopold ska aldrig prata om det.
- **NYTT — variant 1B:** om `vagval_intention="stoppa"` ∧ hög-sanity-vägen valdes, så stängs portalen *för gott* och Bertils gravsten på myren har fått en datumlinje på sig. Det är epilogens enda nya detalj.

**Slut 2 — Du kom igenom sist** *(scene-040)*
- Spelaren räddade Alice eller Leopold (en) men inte den andra.

**Slut 3 — Du blev väktaren** *(scene-041)*
- Spelaren erbjöd sig själv i utbyte.
- **NYTT:** Om spelaren talat med Ingegerd-ekot tidigare, möter ekot spelaren när de blir "den nya". En tyst hand över axeln. Mindre ensamt.

**Slut 4 — Portalen stängdes med er kvar** *(scene-042)*
- Failure-slut. Mamma står i Alices kök ett år senare och förstår ingenting.
- **NYTT:** Om `vet_om_bertil=true`, hon hittar Bertils brev. Detta är vad hon förstår: att en bror försvann i myren långt innan något annat. Det är vad hon väljer att berätta för polisen.

**Scen-038-epilog (scene-043) — Eftertext / sanity-statusvy**
- Visar hur spelaren spelade. Vilka val. Vilka grenar.
- Inviterar omspel.

---

## Strukturella regler för förgrening

1. **Inga val dödar spelaren omedelbart.** Konsekvenser ackumulerar.
2. **Varje bottleneck normaliserar state.**
3. **Sanity är inte HP.**
4. **Items är permissive.**
5. **Vinds-tinget är en valfri pacing-belöning.**
6. **NYTT — Sällskapets tråd är fördjupande, inte tvingande för slut.** Spelaren kan teoretiskt nå Slut 1 utan att öppna mejeriet (de pushas dock dit av Alices dagbok). Sällskaps-elementet ger *djup*, inte *gates*.

---

## Pacingmål

- Akt I: 20-25 min spelad tid (utökad pga resan + Per-Magnus-möjlighet)
- Akt II: 50-65 min spelad tid (utökad pga mejeritråd)
- Akt III: 25-30 min spelad tid (utökad pga Ingegerd-möte)
- Total: ca 100-125 min för en genomspelning, omspel ca 70 min med kunskap
