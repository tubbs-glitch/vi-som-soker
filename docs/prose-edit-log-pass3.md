# Prose Edit Log — Pass 3

> Tredje pass av svensk korrektur av **swedish-prose-editor**. Fokus: kvarvarande anglicismer, felval, genusfel, voicebrott, samt regressioner från senare scenredigeringar.

## Sammanfattning

- **Granskade scener**: 48 (alla `*.sv.md` i `docs/scenes/`)
- **Redigerade scener**: 16
- **Karaktären på fynden**: mestadels lokala ordfel (felord, anglicismer, genus), inga strukturella problem
- **Voicen är stabil** — sval, lågmäld, andra person presens hålls genomgående

---

## Ändringar per scen

### scene-007 — Ankomst Hällmyren
- "Den kommer inte gå ner." → "Den kommer inte att gå ner." (prosaregister)

### scene-011 — Hallen
- "Den har stängts bakom dig själv." → "Den har stängts bakom dig." (överflödigt reflexiv-objekt)

### scene-012 — Vardagsrummet
- "Det norra fönstret **slipper** in" → "**släpper** in" (fel verb — "slipper" betyder undgår)

### scene-015 — Trappan upp
- "Klockan på din arm" → "Klockan på armen" (anglicism — *on your arm*)

### scene-019 — Badrummet
- "Ett badkar med **klotassar**" → "med **lejontassar**" (ord finns inte; "lejontassar" är standardterm för claw-feet)
- (samma fix på två ställen — ficklampans och POWER-ON)

### scene-022 — Källartrappan
- "kallrök **neranför**" → "kallrök **nedanför**" (dialektal stavning, ej standard) — två förekomster

### scene-023 — Källare-förvar
- "som **hopvigad** sand" → "som **hoppressad** sand" (påhittat ord — "hopvigad" är inte ord) — två förekomster

### scene-027 — Vedboden
- "**Falurött plåt**" → "**Faluröd plåt**" (genuskongruens — *plåt* är n-genus)

### scene-028 — Skivspelaren snurrar utan ljud
- "Det kommer du veta sedan." → "Det kommer du att veta sedan." (prosaregister)
- "står tiden ändå framåt" → "rör sig tiden ändå framåt" (ej standardidiom)

### scene-029 — Vägen-valet
- "Du kommer veta när du står där" → "Du kommer att veta..."
- "Jag bryr mig inte vad det kostar" → "Jag bryr mig inte om vad det kostar" (saknad preposition)

### scene-030 — Myrgraven
- "stenen om femtio år kommer ligga" → "kommer att ligga"
- "Du tar inte fall" → "Du faller inte" (ej standarduttryck)

### scene-039 — Slut 1 (Alla kommer hem)
- "Du går ut på **trappen**" → "på **trappan**" (regressionsfix — pass 1 fixade samma i scen-008)
- "**Mata-skålen** vid luckan" → "**Matskålen**" (felaktig särskrivning)

### scene-041 — Slut 2
- "bryter **försegligen** med tumnageln" → "bryter **sigillet** med tumnageln" (felstavning + tidigare rad har "Han bryter inte sigillet direkt" så *sigillet* är konsistent)

### scene-042 — Slut 3
- "Hon vänder huvudet inte mer än hon någonsin har vänt det" → "Hon vänder inte huvudet mer..." (ordföljd-anglicism)

### scene-043 — Slut 4 (Tystnaden)
- "mot **Alice axel**" → "mot **Alices axel**" (saknad genitiv-s)

### scene-044 — Epilog
- "Du kommer minnas" → "Du kommer att minnas" (två förekomster)
- "Den kommer stå" → "Den kommer att stå"
- "Det är inte **snusk**" → "Det är inte **fusk**" (felval — *snusk* = dirt, *fusk* = cheat)

### scene-100 — Ut på tomten
- "sluter mot **trösken**" → "sluter mot **tröskeln**" (ej standardform)
- "dold bakom en **uppskjuten** häck" → "**övervuxen** häck" (fel ord — uppskjuten = postponed)

### scene-102 — Vedbodens dörr
- "En knottflock **virrar**" → "**virvlar**" (fel verb — *virrar* = är förvirrad)
- "en **handsmidd** trästicka" → "en **handtäljd** trästicka" (kollokation — *smida* är för metaller, *tälja* för trä)

### scene-103 — Ugglan i taket
- Semikolon (förbjudet enligt voice-guide) i mening om kattugglan → punkt

---

## Topp-10 typer av fel

1. **Felval av ord** — *snusk* för *fusk*, *uppskjuten* för *övervuxen*, *försegligen* för *sigillet*, *klotassar* för *lejontassar*, *Mata-skålen* för *matskålen*
2. **Påhittade/icke-svenska ord** — *hopvigad*, *trösken*, *neranför*, *virrar* (fel verb)
3. **Saknad "att" efter "kommer"** — "kommer gå", "kommer veta", "kommer minnas", "kommer ligga" — i prosaregister krävs *att*
4. **Genuskongruensfel** — "Falurött plåt" (regression — *plåt* är n-genus, kräver "Faluröd")
5. **Saknad genitiv-s** — "mot Alice axel" → "Alices axel"
6. **Saknad preposition** — "bryr mig inte vad" → "bryr mig inte om vad"
7. **Anglicismer i syntax** — ordföljd i negation ("vänder huvudet inte" → "vänder inte huvudet"); "på din arm" → "på armen"
8. **Voice-guide-brott** — semikolon i prosa (scen-103); överflödigt reflexiv ("bakom dig själv")
9. **Dialektal stavning oavsiktligt blandad in** — *trappen* för *trappan*, *trösken* för *tröskeln*
10. **Idiom-fel/ovanliga konstruktioner** — "Du tar inte fall", "står tiden framåt", "slipper in [ljus]"

---

## Stilförändringar jag INTE gjorde (medvetet)

- **"hopvigad"** — fixat till "hoppressad" (var i botten ett påhittat ord)
- **"i en fel hastighet"** (scen-103) — udda men medveten voicestil
- **"en plan slätt vidöppen"** (scen-021) — "plan" som adjektiv + "slätt" som substantiv. OK.
- **"brun ljum fjäder"** (scen-103) — *ljum* är poetiskt här, betyder *matt/svalt*
- **"Hörde gubben på macken sa att..."** (scen-009 dialog) — talad svenska, Per-Magnus är åldring
- **"Du stod kvar en stund och såg..."** (scen-010) — temporalt flashback som motiverar pretens
- **"Trafiken ökar i Söderhamn-takt"** (scen-004) — poetisk voice
- **"i en sekund / ett ögonblick"** — voice-guide tillåter båda
- **"längesedan"** (scen-011) — voice-konsekvent som ett ord
- **"sätesgården"** (scen-007) — voice-godkänt äldre ord
- **"gärdsgård" vs "gärdesgård"** — båda korrekta i SAOL, lämnat som de stod

---

## Scener jag INTE rörde

- Engelska *.en.md-filer (utanför scope)
- YAML-frontmatter (annan agent hanterar `sanity_delta` etc.)
- Inline-konsekvenser i `*(...)*` (val-outcomes där sanity nämns)
- Val-knappar `**[...]**`

---

## Inga scener flaggas för djupare omskrivning

Voicen är konsekvent över alla 48 scener. Detta pass var det renaste — många små fel där tidigare passes inte fångade allt, men inga strukturella problem.

---

## Topp-5 typer av fel (sammanfattning)

1. **Felval av ord** — *snusk/fusk*, *uppskjuten/övervuxen*, *klotassar/lejontassar*
2. **Påhittade/dialektala ord** — *hopvigad*, *trösken*, *neranför*, *virrar*
3. **Saknad "att" efter "kommer"** (prosaregister) — flera scener
4. **Genuskongruens-regression** — *Falurött plåt* (n-genus kräver *Faluröd*)
5. **Anglicismer i syntax & idiom** — *på din arm*, *Du tar inte fall*, *Det är inte snusk*

## Svensk språkkvalitet just nu: **9/10**

Voicen sitter. Få fel kvar — pass 1 och 2 löste tunga problemen. Pass 3 är finputs.

## Öppna frågor

1. **"klotassar"** i scen-019 — om "klotass" är ett medvetet östsvenskt/Härjedalskt ord för "kulfot på badkar" kanske ändringen till "lejontassar" är fel. Detta är osäkert. Rekommendera project-lead att bekräfta.
2. **"i en fel hastighet"** (scen-103) — om medvetet voicemässigt, OK; annars bör det vara "i fel hastighet" utan obestämd artikel. Lämnat eftersom voice-effekten är tydlig.
3. **"ljum fjäder"** (scen-103) — voice-mässigt ovanligt; om copywriter menade "ljus brun" eller "matt brun" bör det förtydligas.
