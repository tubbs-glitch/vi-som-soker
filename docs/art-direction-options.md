# Art Direction — Tre riktningar att välja mellan

> Detta är beslutsdokumentet. Användaren väljer EN riktning. Den vinnande riktningen blir grunden för `art-style-guide.md` och alla framtida prompt-instruktioner till image-creator.
>
> **Inga bilder har genererats än.** API-nyckel saknas. Detta är ren strategi och spec — moodboards kommer när användaren valt.
>
> **Beslutskriterium:** Vilken riktning tjänar storyn bäst, fungerar i thumbnail på en iPhone, och kan reproduceras konsekvent över 100+ bilder utan att tröttna eller spreta?

---

## Sammanfattning — på 30 sekunder

| Riktning | I en mening | Risk | Styrka |
|---|---|---|---|
| **A — Folk Horror Foto** | Dokumentärfoto från midsommarnatten — något är fel i ramen utan att man kan säga vad. | Kan se generiskt ut om referensen släpps; kräver disciplin. | Mest direkt skrämmande. Hög trovärdighet. Skalar till marknadsföring. |
| **B — Alices Pärm** | Anteckningsbok-collage: tejpade foton, instämplat papper, handskrivna kartor, blyertskryssade ansikten. | Kan kännas pyssligt eller "escape room". | Berättar storyn *genom* bilden — varje moodboard är diegetiskt material. |
| **C — Mörk Akvarell** | Sparsmakad handmålad illustration, isolerade motiv mot smutsigt papper, granit och dis. | Risk att kännas barnboks-mysigt om paletten glider. | Mest ikoniskt på en app-ikon. Tidlös. |
| **D — Hybrid: Foto under glas** *(min egen idé)* | Foto, men sett genom en yta — kondens, ridå av regn, smutsigt fönster. Ett extra lager mellan tittaren och scenen. | Kräver konsekvent rendering av "lagret". | Förenar A:s realism med B:s diegetiska distans. |

**Min rekommendation:** **A med element från D.** Se motivering längst ner.

---

## Riktning A — "Folk Horror Foto"

### Konststil
Dokumentärfoto i film-look. 35mm, ofta motljus, naturligt ljus enbart. Lågmättnad men inte svartvitt. Kornighet i skuggorna. Komposition mer Magnum än bröllopsfoto — människor är ofta små i ramen, eller utanför den.

### Referenser (3–5)
- **Gregory Crewdson** — filmiska, ödesmättade scener i amerikansk småstad. Stillheten innan något.
- **Lars Tunbjörk** — svensk dokumentärfotograf. *Landet utom sig*. Det svenska som främmande.
- **Ari Asters cinematografi i *Midsommar*** (DP: Pawel Pogorzelski) — högt ljus, ingen skugga, det öppna fältet.
- **Todd Hido** — neddrönkta hus, gult fönsterljus, blå skymning. (Notera: vi behöver flytta det till midsommarsljus, inte vinternatt — men greppet är detsamma.)
- **Andrea Galvani** *Death of an Image* — natur som blir geometrisk fel.

### Color palette

| Roll | Namn | Hex | Anmärkning |
|---|---|---|---|
| Primär | Midnattsljus-blå | `#A8B5C3` | Ljus blågrå utan dramatik. Klockan tre. |
| Primär | Tjärbrunt | `#3E2E1F` | Falurött som svartnat. Timmer, jord, kåda. |
| Sekundär | Granit-grå | `#6B6F73` | Häll, sten, vått trä. |
| Sekundär | Myr-grön | `#5A6855` | Surmossegrön, dämpad, något gulnat. |
| Accent (sparsam) | Falurött | `#7C2E1E` | Bara på husfasader och en jacka. Aldrig stort. |
| Accent (sparsam) | Tjärsten-svart | `#1A1816` | Mörkast tonen — bara i sprickor och i myren. |
| Ljus | Disljus | `#D8DCD5` | Himlen vid 02:00. Inte vit — gulvit-grå. |
| Mörker | Inomhus-mörker | `#262420` | Skuggorna inne i huset. Aldrig ren svart. |

**Princip:** Paletten är *halvkalibrerad*. Som om någon vred ner färgmättnaden 30%. Inga rena färger någonstans utom det enstaka falurött.

### Komposition-principer
- **Människor är små eller bortvända.** Spelaren ser aldrig sin egen karaktärs ansikte.
- **Tom mitt.** Centrum av bilden är ofta tom — det viktiga ligger i kanterna eller längst bak.
- **Horisontlinje förskjuten.** Inte gyllene snittet. Ofta lågt — mycket himmel.
- **Symmetri används ENDAST när det är fel.** Symmetriska bilder är ritualbilder, inte vardagsbilder.
- **Porträtt-format primärt** (telefonen). Beskuren för thumbnail: motivet får inte ligga i hörnen.
- **Focal point är ofta något icke-mänskligt:** en dörr, en brevlåda, ett halsband, en hund som inte borde finnas.

### Atmosfär & ljus
- **Midsommarljus klockan tre på natten:** himlen är ljus, men ljuset har ingen riktning. Skuggor blir konturlösa, nästan utsuddade. Detta är scenens signaturljus.
- **När scenen är inomhus:** mycket lite konstljus (strömmen är ute). Naturligt ljus genom fönster — alltid sidoljus, aldrig ovan. Inomhus blir tonen brunare.
- **Dis och ånga från myren** i 1 av 3 bilder. Inte tjock dimma — bara antydan av att luften har volym.
- **Aldrig motljus rakt mot solen.** Solen är nästan alltid bakom eller åt sidan. Den är inte en spotlight.

### Vad ska INTE finnas
- Inga tentakler, inga ögon-i-mörker, inga "monster-närvaroskuggor"
- Inga blomkronor, inga vita klänningar, ingen majstång — vi LÅNAR Midsommar-ton men inte ikonografi
- Inga gotiska element — inga slott, inga gargoyles, inga uppspärrade mörker
- Inga blod-stänk, inga "creepy children", inga porslindockor
- Inga magiska partikel-effekter, inga glödande symboler, inga glödande ögon
- Ingen tydlig fara — om något är farligt ska tittaren behöva titta två gånger
- Ingen kornighet/grain som överproduceras (modern "fake VHS" — vi vill film, inte filter)
- Inga onödiga vinjetteringar
- Aldrig en bild där huvudkaraktären visas tydligt frontalt

### UI-implikationer
- **Foto-galleri-känsla.** Bilderna sitter i diskret ram, vit eller papper-vit border ~12px. Som ett kontaktblad eller bokens halvtonsida.
- **UI-chrome är minimal.** Texten är prosan — bilder är pauser mellan textavsnitt, eller akt-introduktioner.
- **Mörk bakgrund (`#1A1816`), texten ljus papper (`#E8E2D3`).** Bilder bryter mot mörkret som fönster.
- **Inga skuggor under UI-element** — platt, papper-likt. Skuggor finns bara i bilderna själva.
- **Övergångar mellan scener:** långsam crossfade till svart, 600ms. Aldrig "swipe" som filmtransition.

### Typografi
- **Display:** **GT Sectra** eller **Lyon Display** — kontemporär seriff med skarp italik. Inte "skräck-font". Mer som *The New Yorker* om de bytte till midsommar. **Alternativ (open source):** **Cormorant Garamond** (gratis, GitHub).
- **Body:** **Söhne** (Klim Type) eller **Untitled Sans** — neutral sans, hög läsbarhet, modern utan att vara teknisk. **Alternativ (open source):** **Inter** (gratis) eller **Public Sans**.
- **Princip:** Display-seriff bär stämningen, body sans bär texten. Aldrig serif för längre löpande text på telefon — läsbarhet vinner.

### Bild-prompt-formel

```
[motiv], midsommarljus klockan tre på natten, midnattssolens kalla blå klarhet,
ingen tydlig skuggriktning, [inomhus/utomhus med detalj],
fjällkant i fjärran om utomhus, dis från myren om relevant,
fotografi i stilen av Gregory Crewdson möter Lars Tunbjörk,
35mm Kodak Portra 400, mjuk korn, lågmättnad,
komposition: [centrerad tom mitt / horisontlinje i nedre tredjedelen / människa liten i ramen],
färgpalett: midnattsljus-blå #A8B5C3, granit-grå #6B6F73, myr-grön #5A6855,
ingen dramatik, ingen action, stillhet, något är fel
```

Se `art-direction-A.md` för fördjupning + 10 exempel-prompts för specifika scener.

---

## Riktning B — "Alices Pärm" (Anteckningsbok + Collage)

### Konststil
Mixad media. Allt vi ser är *funnet* — som om spelaren öppnade Alices pärm och fotade en sida i taget. Foto i polaroid eller kontaktblads-storlek, tejpat eller häftat fast. Handskriven blyerts i marginalen. Maskinskriven text på gulnat papper. Kartor i blyerts och blå bläck. Tidningsklipp. Receipt-papper. En och annan torkad blomma eller hårslinga.

Detta är **diegetiskt** — bilderna är inte konst om storyn, de är *bevismaterial från storyn*. Alice (eller sällskapet) gjorde dem.

### Referenser (3–5)
- **Mark Z. Danielewskis *House of Leaves*** (boken som artefakt — fotnoter, marginalanteckningar, omöjlig layout)
- **W. G. Sebald** — *Austerlitz*, *The Rings of Saturn*. Foton inkluderade utan bildtext, mitt i prosan. Detta är *exakt* tonen.
- **Sophie Calle** — fotografkonstnär som arbetar med arkiv och kvitton som konst (*The Address Book*).
- **Peter Beard** — dagboksjournaler med foton, blod, blyerts, klistermärken. Kan vara för mycket — vi dämpar.
- **Filmen *Marcel the Shell with Shoes On*** för känslan av tinglig diegetisk artighet (men inte tonen).
- **The Codex Seraphinianus** för referens av "en uppslagsbok från en värld som inte är vår".

### Color palette

| Roll | Namn | Hex | Anmärkning |
|---|---|---|---|
| Primär | Pappersgult | `#E8DDC4` | Anteckningsbokens grundton, gulnat av tid. |
| Primär | Blyertsgrå | `#4A4843` | Skriven anteckning, kartlinjer. |
| Sekundär | Blå bläck | `#2A3E5C` | Sällskapets föredragna bläck. |
| Sekundär | Tejp-beige | `#D4B98C` | Hälftranslucent maskeringstape. |
| Accent | Stämpel-rött | `#8B2A1F` | Bara på 1–2 stämplar per sida. **Sparsam.** |
| Accent | Foto-blå | `#7A8A98` | Polaroid-blåa toner — alla foton i collaget tonas hit. |
| Ljus | Genomlyst papper | `#F0E8D8` | Bakgrund. |
| Mörker | Skuggning under tejp | `#8A7A60` | Halvtransparenta lager-skuggor. |

**Princip:** Allt verkar gammalt. Inget är rent. Pappret är vikt, fingrat, ringat av kaffekopp.

### Komposition-principer
- **Lager-på-lager.** Aldrig en isolerad bild — alltid på ett underlag. Underlaget är pärm-sidan eller bordsskivan.
- **Tejp och nålhål är komposition.** En polaroid sitter snett. En kanten är trasig. Tejpen täcker delvis ett ansikte.
- **Handskrift som riktning.** Blyertsord pekar mot fokuspunkten. Ett pilstreck. Ett kryss över ett ansikte.
- **Inga rena vinklar.** Polaroider sitter med 3–7 graders rotation.
- **Porträtt-format primärt** — pärm-sidan är A5 eller A6, passar telefon.
- **Focal point är ALDRIG centrerat.** Är ofta i övre tredjedelen, med text under.

### Atmosfär & ljus
- **Sidan är fotograferad uppifrån,** mjukt skrivbordsljus från vänster.
- **Foton inuti collaget har midsommarsljuset från riktning A** — men nu är det polaroid-toner, gulnat i kanterna.
- **Ingen "atmosfär" i sig** — atmosfären är tinglig, inte väder. Det skrämmande ligger i *vad* som dokumenteras, inte hur det är ljust.
- **Skuggor finns bara där föremål ligger på varandra** — polaroid kastar mjuk skugga, tejpen lyfts en aning.

### Vad ska INTE finnas
- Inga "scrapbook"-emojier, inga moderna stickers, inga klistermärken med blommor
- Inga digitala filter — vi vill äkta papper, inte Photoshop-papper-overlay
- Inga handritade ögon i marginalen, inga gotiska symboler, inga pentagram
- Inga "creepy childlike drawings" — Alice är 67, bibliotekarie. Hennes handstil är *vacker*, det är *vad hon skriver* som skrämmer.
- Inga blodfläckar på pappret
- Ingen "ancient occult tome" — vi vill 70-talets svenska byråkrati och pärm-estetik, inte medeltida
- Aldrig läsbara hela meningar — bara fragment, så översättning till engelska blir lika trovärdig

### UI-implikationer
- **Pärm-känsla.** Hela appen kan kännas som att bläddra i pärmen. Sidor "vänds" istället för "scrollas".
- **Texten ligger PÅ pappret** — antikvariskt papperstextur som bakgrund (subtil — under 15% opacitet, inte tröttsam).
- **UI-chrome som anteckningsblock-perforering** överst, klisterremsor som dividers.
- **Mörkt läge** är problematiskt — antingen tappar vi pappret eller blir det fult. Lösning: mörkt läge är "läs i sängen" — pappret blir mörkbeige `#3A352D`, texten `#D8C8A0`.
- **Bilder är ALLTID i collage-kontext** — aldrig fullskärms foto. Bilden visas som tejpat objekt på sidan.

### Typografi
- **Display (handskrift):** **Lavanderia** eller **Caveat** (gratis) för Alice's handstil. SPARSAMT — bara rubriker, marginalnotat. Aldrig löpande prosa.
- **Display (stämpel/typewriter):** **Special Elite** (gratis, Google Fonts) eller **JMH Typewriter** för "skrivmaskin"-text.
- **Body:** **Lora** (Google Fonts, gratis) — varm seriff som ändå läses bra på skärm. Eller **Source Serif Pro**.
- **Princip:** TRE typsnitt — en handskriven (Alice), en skrivmaskin (officiella protokoll), en löpande seriff (berättaren). Detta gör skiktningen i prosan visuell.

### Bild-prompt-formel

```
[motiv] som ett tejpat polaroid-foto på en gammal pärmsida,
gulnat 70-tals-papper, handskriven blyertsanteckning i marginalen som säger "[textsnutt]",
maskeringstape i två hörn, lätt rotation 5 grader,
polaroid har polaroid-blå tonton, mjuk gradient i kanterna,
fotografi från ovan, jämnt skrivbordsljus från vänster,
färgpalett: pappersgult #E8DDC4, blyertsgrå #4A4843, blå bläck #2A3E5C,
ingen modern teknologi syns, känsla av arkivmaterial från 1979,
allt verkar fingrat, brukat, gammalt
```

Se `art-direction-B.md` för fördjupning + 10 exempel-prompts.

---

## Riktning C — "Mörk Akvarell"

### Konststil
Handmålad akvarell, sparsmakad. Mycket vit (eller smutsigt-papper-vit). Tunga skuggor med blött-i-blött-teknik. Tunna konturer i blyerts under färglagret. Mestadels ett motiv per bild, isolerat — som en botanisk illustration av något fel.

Mer Edward Gorey än Beatrix Potter. Mer Tove Jansson när hon är sorgsen, mindre när hon är mysig.

### Referenser (3–5)
- **Tove Jansson** — *Sent i november*, hennes mörkare period. **Inte** Mumin-mysig. Vinter-Mumin med stoft.
- **Edward Gorey** — *The Gashlycrumb Tinies*. Tunn linje, mycket vit, mörker via streckning.
- **Bill Sienkiewicz** *Stray Toasters* — för känslan av akvarell som drar ut till nervtrådar.
- **John Bauer** — svenska sagors mörkare sida, *Bland tomtar och troll*. Skogen som domstol.
- **Hayao Miyazakis konceptkonst för *Princess Mononoke*** — naturen som rörelse i papper.
- **Petra Mrzyk & Jean-François Moriceau** — modernt svartvitt linjearbete med oroliga former.

### Color palette

| Roll | Namn | Hex | Anmärkning |
|---|---|---|---|
| Primär | Smutsig papper-vit | `#EDE5D4` | Bakgrund — aldrig ren vit. |
| Primär | Granit-blyerts | `#3A3733` | Linjearbete + tyngsta skuggor. |
| Sekundär | Myr-vatten-blå | `#4A5560` | Tunn lavering. |
| Sekundär | Tjär-svart-mjukt | `#1F1C18` | Bara i tyngsta mörker. |
| Accent | Rönnblod-rött | `#6B2A22` | Bara en touch — ett bär, en jacka, en stämpel. |
| Accent | Mossgul | `#8A8055` | Sparsamt — på gränsen mot ruttet. |
| Ljus | Genomlyst himmel | `#F0EBD8` | Akvarellens "varma vit". |
| Mörker | Inombords-skugga | `#2A2620` | Aldrig svartare än så. |

**Princip:** Mycket vit yta. Färg används som understreckning, inte som heltäcke. Tonomfånget bärs av blått-grått-svart, värme finns bara i pappret.

### Komposition-principer
- **Ett motiv per bild.** Inget collage. Inga grupper. Ett föremål, en gestalt, en plats — isolerad mot papper.
- **Stor luft runt motivet.** 40–60% av ytan är tomt papper. Andas.
- **Bilden är inte centrerad.** Motivet sitter ofta i nedre halvan eller åt sidan — som om sidan väntar på text.
- **Tunna konturer + tunga skuggor.** Linjen är blyertstunn, skuggan är akvarellblöt. Kontrast i teknik, inte i värde.
- **Porträtt-format primärt.** Bildens proportion är som ett vykort eller en bokillustration.
- **Botanisk-illustration-grepp:** föremål visas ibland med "tvärsnitt"-känsla — som om vi tittar i en flora.

### Atmosfär & ljus
- **Inget direkt ljus.** Akvarellens natur — färgen *är* ljuset. Inga skuggor från en specifik ljuskälla.
- **Midsommarljus tolkas som "tunn färg överallt"** — inte som en spotlight. Hela bilden har en jämn dunsig dagsljus-känsla.
- **Vid sanity-nedgång:** akvarellen blir blötare, konturerna börjar lösas upp. Färgerna rinner. *Detta är en grej.*
- **Dis och ånga rendreras som torrt-i-blött** — vita kanter där vattnet drog färgen.

### Vad ska INTE finnas
- Inga söta djur, inga rundade rara karaktärer (vi är inte Mumin)
- Inga fantasy-troll, inga älvor, ingen John Bauer-pastisch
- Inga uppspärrade ögon, inga "creepy smiles"
- Inga moderna föremål renderade illustrativt (en mobiltelefon i akvarell ser löjlig ut) — vi väljer motiv som tål illustration: trä, sten, hund, myr, ett halsband, en glaspärla, ett papper
- Inga textballonger, inga seriespråkliga element
- Inga skarpa svarta konturer som en "comic" — vi vill akvarellens mjukhet
- Aldrig ett tydligt monster — Vinds-tinget i denna stil får aldrig hela kroppen i bild

### UI-implikationer
- **Bok-känsla.** Som att läsa en illustrerad roman. Bilden får sin sida; text får sin.
- **Mycket vit (papper-vit) bakgrund i appen.** Mörkt läge: invertera till `#1F1C18` med papper-vit text `#EDE5D4`.
- **Tunna haarline-skiljelinjer.** UI är i blyertsgrå, aldrig svart.
- **Animation:** bilder kan "tona in" som färg som dras in i papper — slow reveal, 800ms.
- **App-ikonen är denna riktning starkast** — en akvarell-illustration tål app-ikon-formatet bäst.

### Typografi
- **Display:** **Garamond Premier Pro** eller **Adobe Caslon** — klassisk seriff med litterär vikt. Open source-alternativ: **EB Garamond** (Google Fonts).
- **Body:** **EB Garamond** för löpande text — varm bokseriff. Alternativ: **Crimson Pro**.
- **Princip:** EN typsnitts-familj, många vikter. Bokens disciplin. Möjligen en handskriven accent för dagboks-utdrag (sparsamt).

### Bild-prompt-formel

```
[motiv], handmålad akvarell-illustration, sparsmakad, mycket vit yta,
tunn blyertskontur, blött-i-blött skuggor i granit-blyerts #3A3733 och myrvatten-blå #4A5560,
en touch av rönnblod-rött #6B2A22 om relevant,
isolerat motiv mot smutsig papper-vit #EDE5D4 bakgrund,
inget direkt ljus, jämn dunsig dagsljuskänsla,
komposition: motivet i nedre tredjedelen, 50% tomt papper ovan,
stil i traditionen av Tove Jansson sent i november möter Edward Gorey,
inga söta inslag, ingen fantasy, botanisk-illustrativ disciplin,
[detalj: vad är fel med motivet — t.ex. "skuggan rör sig inte med kroppen"]
```

Se `art-direction-C.md` för fördjupning + 10 exempel-prompts.

---

## Riktning D — "Foto under glas" (min egen idé)

### Premiss
Foto-realistiskt som A, men varje bild är fotograferad **genom något**: kondens på fönsterglas, en regnvåt vindruta, en dammig spegel, en plastficka i pärmen. Detta läggs ovanpå A:s estetik som ett extra diegetiskt lager.

Effekten: varje bild blir en *observation*, inte en upplevelse. Spelaren tittar på världen genom något — handduk, fönster, glas — och det skapar omedelbar oro. Det är också ärligt mot prosan: andra person, presens, du ser men deltar inte fullt ut.

### Varför kombinera
A är robust och skrämmande men kan kännas torrt i thumbnail. D adderar ett *artefakt-lager* som gör bilderna omedelbart igenkännbara som *vårt* spel — fingeravtryck och imma på glaset blir signaturen.

### Risk
Effekten kan kännas som ett filter (Instagram-glas) om den inte är fysisk. Kräver att vi alltid genererar bilden *bakom* glaset och *därefter* lägger glaset (kondens, dammkorn, springa) som verklig fysisk pass. Image-creator måste hantera detta i två steg eller med starkt promptat förgrund-lager.

### Om vald
Vi skulle baka in D som *en variant* av A — vissa bilder är "rena" A, andra är "genom glas" — och cover-art / app-ikon använder D-versionen för att etablera signaturen. Inte alla scener får glaslagret; det skulle bli för mycket.

---

## Min rekommendation: **A med D-variant för cover och nyckelbilder**

### Varför A vinner

1. **Storyn handlar om obehaglig vardag, inte om fantasy.** Akvarell (C) gör världen sagolik. Collage (B) gör världen analytisk. Foto (A) gör världen *verklig* — och därför farlig.

2. **Persona A (Maya — Disco Elysium-publiken)** köper *Midsommar*-estetik instinktivt. Foto-realism med fel ljus är genrens visuella signatur. C riskerar att signalera "barnbok-skräck". B riskerar att signalera "escape room" eller "puzzle game".

3. **Thumbnail-testet:** I App Store-listan, vid 60×60 px, fungerar foton bäst. C kan bli ett intetsägande färgblock. B blir gröt. A bär en silhuett, ett ljus, en stämning.

4. **Skala och konsistens:** Foto-prompts är mer reproducerbara med image-to-image-referenser än akvarell (där varje pensel-streck blir individuell variation). Vi behöver 80–150 bilder i exakt samma stil.

5. **Cross-marketing:** Foto fungerar på Instagram, TikTok, recensions-press, podcast-cover. Akvarell måste arbeta hårdare för att se "professionell" ut i icke-bok-kontext.

### Varför D-laget

D ger oss en signatur — när Persona A ser en bild "genom kondens" i en RPS-recension känner de igen oss. Utan signaturen riskerar A att se ut som vilken som helst folk-horror-marknadsföringsbild.

### Vad jag offrar genom att välja A
- B:s diegetiska kraft. Vi förlorar känslan av att *spela genom Alices pärm*. **Kompensation:** vi tar in pärm-sidor som dokument-bilder i berättelsen (en separat asset-typ — låt oss kalla det "fynd"). De görs i B-stil. Så A är världen, B är det funna materialet. Två kategorier, inte två riktningar.
- C:s ikoniska app-ikon. **Kompensation:** app-ikonen blir en symbolisk crop ur en A-bild — kanske ett halsband mot ljus papper. Den behöver inte vara en illustration för att vara ikonisk.

---

## Beslutsfråga till användaren

**Vilken riktning väljer du?**

- **[A]** Folk Horror Foto — min rekommendation
- **[A+D]** Foto med "under glas"-signatur på nyckelbilder
- **[B]** Anteckningsbok + Collage — om diegetisk artefakt-känsla är viktigare än cinematografisk
- **[C]** Mörk akvarell — om litterär bokestetik är viktigare än film-tonalitet
- **[Annat]** — säg ifrån, vi designar om

### Tre öppna frågor som hänger på beslutet

1. **Ska huvudkaraktären (spelaren) visas i marknadsföring eller hållas osynlig?** Mitt instinkt är *osynlig* — andra person-prosan kräver att tittaren *är* karaktären. En ryggvy eller en hand i ramen är OK; ett ansikte bryter pakten. Detta är värt att diskutera.

2. **Får vi visa Alice tydligt?** Hennes hela bråk är att hon är frånvarande genom spelet. Att visa hennes ansikte på cover är en pitch-grej men kan undergräva mysteriet.

3. **Ska Vinds-tinget visas alls i marknadsföring?** Min instinkt: aldrig. Hela poängen är att man bara *anar* den. Att hinta i en bild (en form i fönsterimman, en svans utanför kanten) är OK; att rendera den är att förstöra den.

---

## Förberedelse: när riktningen är vald

När du valt, kommer jag att:

1. Skriva **`art-style-guide.md`** — den auktoritativa specen som image-creator följer. Innehåller:
   - Slutgiltig palette med exakta hex
   - Lista av godkända typsnitt med license-info
   - Promptmall (kopierbar)
   - 15 nyckelmotiv från storyn med scen-specifika prompt-variationer
   - Anti-prompt-lista (förbjudna ord och koncept)
   - Image-to-image-referensbild-strategi
   - Konsistens-checklist

2. Skriva **`ui-aesthetics.md`** — för frontend-dev. Principer, inte mockups.

3. Förbereda **moodboard-prompts för image-creator** — 6 prompts per riktning (om vi behöver verifiera) eller 8–12 för den valda riktningen.

4. Vid första körningen: identifiera **3 godkända referensbilder** (huvudplats, ett föremål, en stämning) som sparas i `assets/images/reference/` och används för image-to-image i alla framtida körningar.

---

*Dokument levererat av: art-director. Nästa steg: användaren väljer riktning. Inga bilder genereras innan API-nyckel finns och riktning är godkänd.*
