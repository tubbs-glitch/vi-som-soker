# Scene Map — Mosters Hemligheter

> Konkret lista över alla scener. **44 totalt** (utökat från 42, slut-grenen omfördelad). Markering: **BN** = hård bottleneck, **sb** = sub-bottleneck, **G** = gren, **H** = hub-rum (kan återbesökas), **E** = slut.
> **Revision 2:** Plats Hällmyren (Härjedalen), midsommarvecka. Sex nya scener för sällskaps-tråden. Resa-akten utökad. Akt III utökad med Ingegerd-möte.
> **Revision 3 (Akt III):** Slut 1B fick egen scen (scene-040). Slut 2/3/4 förskjutna ett steg. Ny gemensam epilog scene-044.

---

## Akt I — Telefonsamtalet och resan norrut (scene-001 till scene-010)

| ID | Titel | Typ | Beskrivning | Utgångar / Val |
|----|-------|-----|-------------|----------------|
| **scene-001** | Samtalet | BN | Gunnar ringer en sen junikväll i Stockholm. Du sitter i din lägenhet. Han berättar att Alice inte synts till på tre dagar. | → scene-002 (tvingad) |
| **scene-002** | Innan du går | G | Du står i din lägenhet kl 02:14. Du har inte sovit. Vad packar du? | Multi-select inventory, max 5: ficklampa / jaktkniv / kassettbandspelare / mobilladdare / första-hjälpen / varma kläder / extra batterier. → scene-003 |
| **scene-003** | Telefonsamtal med mamma | G | Du ringer din mamma (Alices syster) innan du kör. | Val: ärlig oro / lugnande / inte alls. Sätter `mamma_vet`. → scene-004 |
| **scene-004** | Vägen norrut, etapp 1 | G | Sex-sju timmars bilfärd. Stockholm → Uppland → Hälsingland → Mora. Radio går från P1 till lokala stationer som tappas en efter en. | Atmosfär. Ratt-val: kör för fort / lagligt. ±2 sanity. → scene-005 |
| **scene-005** | Macken i Sveg | G | Tankning i sen eftermiddag. Solen står hög. En äldre man vid pumpen ser registreringsskylten. | Val: prata med honom / undvik. Om prata: får lapp med Per-Magnus telefonnummer. Sätter `vet_om_per_magnus`, `vet_om_sallskapet_rykte`. → scene-006 |
| **scene-006** | De sista 30 km | G | Grusvägen tar vid bortom Lillhärdal. Mobiltäckningen försvinner. Du passerar en igenvuxen by — husgrunder, en kyrka med stängda fönsterluckor, en lekplats där maskrosorna går till frö. | Ratt-val: kör sakta och iaktta (sanity +1, set_kort_om_omgivningen=true) / kör på (sanity +0). → scene-007 |
| **scene-007** | Ankomst Hällmyren | G | Vägen slutar vid huset. Bakom huset: myren. Bakom myren: kalfjället. Det är 21:00 men ljust som tidig kväll. Knottet är genast obarmhärtigt. | Inget val. Bara atmosfär. → scene-008 |
| **scene-008** | Gunnar på trappan | G | Gunnar väntar — pensionerad skogvaktare, sliten skinnjacka. Han har sett bilen från sin stuga. | Val: ställa frågor (max 3 av 6, en av dem nu om hans fars roll i något "gammalt sällskap") eller skynda dig in. Sätter `gunnar_tillit` (0-10) och eventuellt `vet_om_olov`. → scene-009 eller scene-010 |
| **scene-009** | Samtal med Per-Magnus | G (valfri) | Du kan be Gunnar låna telefonen (fast linje) och ringa vårdhemmet i Östersund. Per-Magnus är förvirrad men säger: "Salt fungerar inte. Tjärsten. Bara tjärsten." | Kräver: `vet_om_per_magnus=true`. Sätter `vet_om_tjarsten_korrekt`. 90-sekunders scen. → scene-010 |
| **scene-010** | Första klivet in | **BN** | Du står på trappan. Nyckeln i handen, dragen under hällen. Dörren är inte låst. Klockan är 22:30. Solen kommer inte gå ner ikväll. | Inget val. Klivet in. Sätter `sanity` start (88-100). → scene-011 |

---

## Akt II — Huset, mejeriet och ritualen (scene-011 till scene-031)

| ID | Titel | Typ | Beskrivning | Utgångar / Val |
|----|-------|-----|-------------|----------------|
| **scene-011** | Hallen | H | Sju koppel på en rad. Sju krokar. En är tom. Tystnad. En blå emaljmugg står på hyllan vid ytterdörren — initialerna "A.L." | Hub. Utgångar: → kök / vardagsrum / trappa upp / källartrappa / farstun mot ladugårdsbacken. Sätter `set_koppel`. |
| **scene-012** | Vardagsrummet | H | Skivspelare med en LP på. Strömmen är av — den snurrar inte. Sofflådan står öppen. | Hub. Utgångar: → hall / kök / Leopolds arbetsrum / soffläsning (pärm). |
| **scene-013** | Köket | G | Brevet ligger osprucket. Kylskåpet har gått sönder och börjat lukta. Almanackan har streck — sju i rad runt midsommar. | Items: tjärsten (i ett glasburk märkt "torv-79", övre skåp), ficklampa (om ej packad). Sätter `har_tjarsten`. → tillbaka |
| **scene-014** | Leopolds arbetsrum | G | Damm. Ett skrivbord. Lab-anteckningar i bunt. **Ett gruppfoto från 1981** — sju vuxna utanför mejeriet, en hund. Två ansikten överstrukna med blyerts. **En mässingsnyckel märkt "M".** | Läs-val: skumma / läsa noga / inte alls. Sätter `förstår_frekvens` (0/1/2). Items: mejerinyckel, lab-anteckningar. → tillbaka |
| **scene-015** | Trappa upp | G | Knarrande steg. Du hör något ovanför. Ljuset från det norrvända fönstret i övre hallen är blått trots klockan. | Sätter `hört_ljud_uppe`. → övre hall |
| **scene-016** | Övre hallen | H | Fyra dörrar. En leder till vinden. | Hub övervåning. → Alices sovrum / gästrum / badrum / vindstrappa. |
| **scene-017** | Alices sovrum | G | Bädden orörd. En dagbok ligger uppslagen. Hon hann inte stänga den. På sista sidan, i marginalen: en sifferkombination "1979-06-23" — ett datum, men också en kombination. | Läs-val: hela dagboken / sista sidan / inte alls. Sätter `förstår_alice` och `vet_om_trälårs_kod`. -10 sanity vid full läsning. → övre hall |
| **scene-018** | Gästrummet | G | En lackad träbox på en hylla. I den ligger sju halsband — sex med datum, ett med bara ett frågetecken. | Val: ta ett halsband / läs alla namn / stäng och gå. Sätter `vet_om_signe`, eventuellt `bär_halsband`. → övre hall |
| **scene-019** | Badrummet | G | En hårborste med långt grått hår. En droppande kran. Knottet hittar in via fönsterspringan. | Inget större val. Sanity -1. → övre hall |
| **scene-020** | Telefonsamtal med Gunnar | G (valfri) | Du kan ringa Gunnar med frågor från husets telefon. Kräver `gunnar_tillit` ≥ 4. | Frågor: om Signe / om Leopold / om stormen / **om sällskapet (om `vet_om_olov=true`)**. → tillbaka |
| **scene-021** | Vinden | sb | (Tvingad vid något tillfälle.) Något står i halvmörker — fast halvmörker existerar knappt nu, det är blått ljus genom vindsfönstret. Det är inte en hund. | Val: ficklampa-på / backa / närma / mata (om har mat) / döda (om skarpt + låg sanity). Sätter `vinds_tinget_status`. -15 till -25 sanity. → övre hall |
| **scene-022** | Källartrappan | G | Mörkt — den enda riktiga mörkrum i huset just nu. Du behöver ljus. | Gate: kräver `har_ljus`. → källaren |
| **scene-023** | Källare-förvar | G | Lådor, fukt, ett gammalt myrtrösktreck i ett hörn. Kassettbandspelare-batterier. En halv burk tjärsten (om ej hittad i kök). | Items: batterier, eventuellt tjärsten. → källare-ritual |
| **scene-024** | Mejeribyggnaden — första intrycket | sb (NY) | Du kommer ut bakom huset. Den falurött plåtklädda mejeribyggnaden står 80 m bort, mot myrens kant. Mejerinyckeln vrider om utan motstånd. Inne: sex stolar runt ett bord, ett blädderblock med handskrivna mötesnoteringar, en kaffekopp med intorkad ring. **Solens blå ljus genom de smutsiga fönstren.** | Kräver: `har_mejerinyckel=true` (alternativt brytsbart med skarpt eller verktyg, lite sanity-kostnad). Sätter `oppnat_mejeri=true`, `vet_om_sallskapet=true`. -12 sanity. → vidare i mejeriet |
| **scene-025** | Mejeribyggnaden — Astrids pärm | G (NY) | Inne i mejeriet undersöker du. På en hylla: en pärm i grönt klotband, märkt "fältnoteringar / A. Lindh". Handstilen är vacker och förskräcker — för det hon skriver om är torrt och vetenskapligt, men det hon dokumenterar är otänkbart. | Läs-val: skumma (-2 sanity) / noggrann läsning (-8 sanity, ger `vet_om_astrid` och `vet_om_ingegerd`) / lämna. Items: Astrids pärm. → vidare |
| **scene-026** | Mejeribyggnaden — trälåren | G (NY) | En låst trälår står i hörnet. Tre mässingstänger, fyra siffror på var och en. | Kräver: `vet_om_trälårs_kod=true` (från scen-017). I lådan: Bertils brev, gravstensskiss, **åttonde halsbandet** (för en hund spelaren aldrig hört talas om), **en oöppnad lapp** adresserad "Till min son Gunnar". -15 sanity vid full läsning. Sätter `vet_om_bertil`, eventuellt `bär_attonde_halsband`, `har_lapp_till_gunnar`. → ut |
| **scene-027** | Vedboden och säkringen | sb | Vedbod med uggla i taket. Verktyg du behöver. När säkringen är på: ljuset i huset blinkar till. Klockan är nu 01:00 och himlen är blå men ljus. | Kräver: ingen specifik item. Sätter `ström_på`. → trädgården / hall |
| **scene-028** | Hymnen börjar | G | Du står var du står. Plötsligt börjar skivspelaren snurra. Sången är gammal. Höjdpunkterna får ditt bröst att kännas fel. | Inget val. Sanity -5. → tvingad till vardagsrum eller källare beroende på var spelaren är. |
| **scene-029** | Vägen-valet (inre) | sb (NY) | Du står där du står — vid mejeribordet, vid Alices skrivbord, eller mitt i hallen — och det blir tyst i huvudet. Du har två tankar: hämta hem henne, eller stoppa det de började. | Existentiellt val: intention "rädda" / "stoppa" / "obeslutsam". Sätter `vagval_intention`. Triggas när `vet_om_bertil=true` ∧ `vet_om_sallskapet=true` ∧ `ritual_korrekt=null`. → vidare |
| **scene-030** | Myrgraven | G (NY, valfri) | Du går ut. Det är 23:30. Solen rör vid fjället utan att försvinna. Knottet i moln. Du går 600 m ut på myren, längs en stig av lagda plankor som rasat på sina ställen. Vid en björkdunge: en gravsten utan kropp. Bertils. | Valfri sidescen. Kräver: skiss från scen-026 (`vet_om_bertil=true`). Sätter `besokt_myrgraven`. -8 sanity. → tillbaka |
| **scene-031** | Förbereda cirkeln + Klivet | **BN** | Du står i källaren. Du har (eller har inte) tjärsten. Pärmen anger riktning. Du strör. Du väntar på takt 47. Cirkeln glöder. Eller verkar göra det. Du tar klivet. | Val: medurs / motsols / inget. Val: takt 46 / 47 / 48. Sätter `ritual_korrekt` och `salt_riktning`. Sanity-check < 40: hallucination innan (fragment av sällskapets ansikten). → scene-032 |

---

## Tomt-scener (storm + skjul + träd) — scene-100 till scene-105

> NY zon. Hör till "ute". Triggas när spelaren går ut från hallen (scene-011) efter att ha upptäckt att strömmen är av. Förklarar mekaniskt **varför strömmen är av** (stormen blåste ner ett träd över elledningen) och introducerar spelets första **narrativa strid** (ugglan i vedboden). Mynnar ut i scene-028 (Hymnen börjar) — ersätter den tidigare lösare kopplingen via scene-027.
>
> Flödet är inte strikt linjärt — spelaren kan välja ordning mellan trädet och vedboden. Bara scene-105 är hård bottleneck.

| ID | Titel | Typ | Beskrivning | Utgångar / Val |
|----|-------|-----|-------------|----------------|
| **scene-100** | Ut på tomten | SBN | Hub utanför huset. Falurött timrat hus i ryggen, trädgård, vedbod, mejeri bortom. Spelaren ser inte trädet härifrån. | → trädgården (scene-101) / vedboden (scene-102) / tillbaka in (scene-011) |
| **scene-101** | Trädet | G | Trädgården och rönnarna. Nere vid byhörnet en stor gran som fallit över elledningen. Här förstår spelaren **varför strömmen är av**. | → tillbaka (scene-100) / vedboden (scene-102). Sätter `vet_om_trädet=true`, `sanity -3`. |
| **scene-102** | Vedbodens dörr | G | Falurött timmer, dragen, träknall i järnögla. Något skrapar mot insidan av taket. Spelaren förbereder sig på att öppna. | → öppna (scene-103) / tillbaka (scene-100). Lyssna-valet ger `vet_om_ugglan=true` i förväg. |
| **scene-103** | Ugglan i taket | G (**STRID-INTRODUKTION**) | Spelets första narrativa strid (Disco Elysium-stil, inga tärningar). En kattuggla/berguv flyger upp och kommer mot spelaren. Fyra vägar: ducka / stå still (kräver MOD ≥ 7) / slå (kräver `skarpt`) / backa ut. | → scene-104 (alla utom backa) / scene-102 (backa). Sätter `besparat_ugglan`, `ugglan_dod`, `ugglan_minns`, `wounds_add=skuren_hand`, eller `misslyckat_skjul`. |
| **scene-104** | Verktygen | G | Yxa, bågsåg, ficklampa, gamla handskar, säkringsskåp på baksidan. Spelaren kan slå på säkringen redan nu — men det hjälper inte (kabeln är av). | → ut till trädet (scene-105) / tillbaka (scene-100). Sätter `har_yxa`, `har_sag`, `har_ficklampa`, `ström_på_försök`. |
| **scene-105** | Såga ner trädet | **BN** | Spelaren sågar ner stammen där den ligger över kabeln. Fysiskt arbete. Slår sedan på säkringen — strömmen tickar igång, skivspelaren startar inne i huset. | → scene-028 (Hymnen börjar). Sätter `tradet_sagat=true`, `kabeln_reparerbar=true`, `ström_på=true`. |

**Flöde:** scene-011 → scene-100 → (101 ↔ 102/103/104 i valfri ordning) → 105 → scene-028.

**Designanmärkning:** Scene-027 (Vedboden och säkringen) blir nu redundant eftersom samma funktion (verktyg + säkring) ligger i scene-104, och samma övergång till scene-028 ligger i scene-105. **Förslag till project-lead:** ompröva scene-027 — antingen ta bort den helt, eller behåll som alternativ kortväg om vi vill att Tomt-zonen blir valfri. Just nu är dubbletten en öppen fråga.

---

## Akt III — Den grå (scene-032 till scene-038)

| ID | Titel | Typ | Beskrivning | Utgångar / Val |
|----|-------|-----|-------------|----------------|
| **scene-032** | Den första andetagen | G | Du är i ingenting. Ingen riktning. Inte mörkt — grått. Du har ditt inventory. Mycket korta meningar — grammatiken håller verkligheten ihop. | Inget val. → scene-033 |
| **scene-033** | Rösterna | G | Du hör röster. Vissa är din egen. En låter som mamma. En låter som Signe. En låter som en kvinna du aldrig hört förut. | Val: ropa Alice / Leopold / Signe (gate) / "Vem är du?" → Ingegerd / tystnad. Sätter `grå_riktning`. → scene-034 eller scene-035 |
| **scene-034** | Ingegerd-ekot | G (NY) | En kvinnogestalt med ryggen mot. Hon vänder sig inte. "Det vill att vi stannar. Det är inte ondska. Det är behov." | Lyssna helt (-10 sanity, sätter `talat_med_ingegerd=true`) / vänd ryggen (`sanity -2`). → scene-035 |
| **scene-035** | Hitta Leopold | G | Han sitter. Han ser upp. Han säger inte ditt namn. Bredvid honom: en mansgestalt som han inte verkar se. | Omfamna / dra upp / tala / **fråga om Bertil** (kräver `vet_om_bertil`). Sätter `leopold_med` och eventuellt `talat_om_bertil_med_leopold`. → scene-036 |
| **scene-036** | Hitta Alice | G | Hon står med ryggen mot Det grå. Hon ler. Hon känner igen dig. | Stort dialogträd: kärlek / mamma / Leopold / **Bertil** / **myrgraven** / **sällskapet** / **Ingegerd** / **Signe** / **brutit_in_i_mejeri** (negativ). Sätter `alice_med` och `alice_övertygad_med`. → scene-037 |
| **scene-037** | Det grå talar | G | "Du kom hit. Du visste vägen. Det är ett erbjudande i sig." | Sex vägar: strid (kräver `skarpt`) / hymn (kräver `frekvens` ×2) / förhandling-accepterar (`valt_offra_sig=true`) / hög-sanity-vägen (kräver `sanity ≥ 70`, sätter `förstod_det_grå`) / hög-sanity + stoppa-permanent (sätter `stoppat_permanent`) / förhandling-vägrar. → scene-038 |
| **scene-038** | Portalen stängs | **BN** | Ekot från vår sida tunnas ut. Du har sekunder. Vem är på vilken sida nu? | Beräknas från state. Inget val här — konsekvens av tidigare. → ett av scene-039 till scene-043 |

---

## Slut (scene-039 till scene-044)

> **Revidering Akt III:** slut-scen-ID:n omfördelade så att varje slut har sin egen scen och en gemensam epilog (scene-044) följer alla slut.

| ID | Titel | Typ | Beskrivning | Förutsättning |
|----|-------|-----|-------------|---------------|
| **scene-039** | Slut 1 — Alla kommer hem | E | Alice, Leopold och du kommer tillbaka. Vinds-tinget följer (om matat eller låtit vara). Epilog: tre månader senare, sen sommar. Alice planterar tulpaner inför hösten. Hon ler inte. | `besegrat_det_grå=true` ∧ `alice_med=true` ∧ `leopold_med=true` ∧ `valt_offra_sig=false` ∧ `stoppat_permanent=false` |
| **scene-040** | Slut 1B — Permanent stängning | E | Som slut 1, men cirkeln i källaren är slipad bort, skivan är inlåst, och Bertils gravsten på myren har fått en datumlinje. Bittersötaste varianten. | `stoppat_permanent=true` ∧ `alice_med=true` ∧ `leopold_med=true` ∧ `valt_offra_sig=false` |
| **scene-041** | Slut 2 — Du kom igenom sist | E | Du och en av dem. Den andra blev kvar. Du står i Alices kök. Det luktar gammalt tepåse och kåda. Om `har_lapp_till_gunnar`: du går till Gunnar och ger honom den. Två varianter beroende på vem som blev kvar. | Exakt en av `alice_med` / `leopold_med` ∧ `valt_offra_sig=false` |
| **scene-042** | Slut 3 — Du offrade dig som ny väktare | E | Alice och Leopold går igenom. Du står kvar. Det grå vänder sig mot dig. Det säger ditt namn. Det är inte ditt namn längre. **Om `talat_med_ingegerd=true`:** en kvinna med ryggen mot lägger en hand över din axel. Du är mindre ensam. | `valt_offra_sig=true` |
| **scene-043** | Slut 4 — Tystnaden | E | Portalen stängs med er kvar. Sex månader senare står din mamma i Alices kök. Hon förstår inte. Om `vet_om_bertil=true` hittar hon Bertils brev i mejeriet. Texten själv ger upp — kortast möjliga meningar. | `alice_med=false` ∧ `leopold_med=false` ∧ `valt_offra_sig=false` |
| **scene-044** | Epilog | E | Meta-text efter alla slut: "Du har spelat *Vi som söker*. Det var [slut-namn]. Du kan börja om för att se det andra." | Alla slut leder hit. |

---

## Bottleneck-summering

| Scen | Typ | Vad konvergerar |
|------|-----|-----------------|
| scene-001 | BN | Inciting — alla spelare börjar här |
| scene-010 | BN | Alla går in i huset |
| scene-021 | sub-BN | Alla möter (eller väljer aktivt att inte möta) vinds-tinget |
| scene-024 | sub-BN | Alla öppnar (eller forcerar) mejeribyggnaden — sällskaps-tråden avslöjas |
| scene-027 | sub-BN | Alla återställer strömmen för att Akt III ska starta |
| scene-029 | sub-BN | Alla fattar intentionsbeslut (rädda / stoppa / obeslutsam) |
| scene-031 | BN | Alla utför ritualen + kliver in i portalen |
| scene-038 | BN | Portalen stängs — slut bestäms av state, exit till scene-039/040/041/042/043, alla → scene-044 |

---

## Återbesöksregel

Hub-scener (H-märkta) kan besökas flera gånger. När spelaren har plockat ett item eller utlöst en clue ändras dess beskrivning något (frontend håller "visited"-flagga). Övriga scener spelas en gång.

**Specialregel för mejeriet:** scene-024 är hub-aktig efter öppningen — spelaren kan återvända för att läsa Astrids pärm djupare (scen-025) och öppna trälåren (scen-026) i valfri ordning.

---

## Pilotscen-rekommendation för copywriter-sv-en

**scene-001 (Samtalet)** är fortfarande pilotscenen. Den etablerar:
- Andra person, presens
- Svensk modern vardag (lägenhet i Stockholm, sen junikväll, mobil)
- Gunnars röst i telefon (ger copywriter chans att etablera dialog-tonen, norrländsk färgning)
- Spelarens första känsla av vridning från det normala
- Sätter ton för hela spelet i 200-400 ord

**Andra-prio-pilotscen: scene-006 (De sista 30 km)** — etablerar landskapets ton och avfolkningstemat. Och scene-024 (mejeribyggnaden) — etablerar sällskapstemat.

---

## Scennummer-ändringar mellan v1 och v2

| v1 ID | v2 ID | Notering |
|-------|-------|----------|
| scene-001 | scene-001 | Oförändrad |
| scene-002 (innan du går) | scene-002 | Oförändrad |
| scene-003 (mamma) | scene-003 | Oförändrad |
| scene-004 (Vägen) | scene-004 | Inrikesresan utökad |
| scene-005 (mack Uddevalla) | scene-005 | Macken nu i Sveg |
| scene-006 (ankomst) | scene-007 | Förskjuten en plats — ny scene-006 är de sista 30 km |
| scene-007 (Gunnar) | scene-008 | Förskjuten |
| scene-008 (klivet in) | scene-010 | Förskjuten två platser pga ny scene-009 (Per-Magnus) |
| scene-009-020 | scene-011-020 | +2 förskjutning |
| scene-021 (vinden) | scene-021 | Återställd genom omplacering |
| scene-022 (skjul) | scene-027 | Vedboden har flyttats i ordning |
| scene-023 (hymnen) | scene-028 | Förskjuten |
| scene-024 (ritual förbered) | scene-031 | Slagits samman med klivet (BN-2) |
| scene-025 (klivet) | — | (sammanslagen) |
| scene-026-033 | scene-032-038 | Förskjutna pga nya Akt II-scener och nytt Ingegerd-möte |
| scene-034-038 | scene-039-043 | Förskjutna |
| — | scene-006 | NY: De sista 30 km |
| — | scene-009 | NY: Per-Magnus-samtal (valfri) |
| — | scene-024 | NY: Mejeribyggnaden — första intrycket |
| — | scene-025 | NY: Astrids pärm |
| — | scene-026 | NY: Trälåren |
| — | scene-029 | NY: Vägen-valet |
| — | scene-030 | NY: Myrgraven (valfri) |
| — | scene-034 | NY: Ingegerd-ekot |

**Totalt: 38 → 42 scener. Sex nya, två sammanslagna, övriga ID-förskjutna.**
