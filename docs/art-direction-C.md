# Art Direction C — "Mörk Akvarell" (fördjupning)

> Detta dokument fördjupar riktning C från `art-direction-options.md`. Förberedelse — om användaren väljer C blir detta basen för `art-style-guide.md`.

---

## Kärnkänsla i en mening

**En illustratör har läst Alices anteckningar och har målat en illustration för varje minne. Bilderna är sparsamma, isolerade, väntande. De har den frusna stillheten i en bokillustration som man ser igen från barndomen — och inser att den alltid varit oroande.**

C är *bok*-riktningen. C är *litterär* skräck-riktning. C är riktningen om vi vill att appen ska kännas som *en illustrerad novell på telefonen*, inte ett spel.

---

## Visuell DNA — fyra obligatoriska element i 90% av bilderna

1. **Stor mängd vit/papper-vit yta.** Minst 40% av bilden är obearbetat papper. Andningsrum.

2. **Ett enkelt motiv.** En sak, ett djur, en gestalt, en plats — aldrig komposition med många objekt.

3. **Akvarellens våta logik.** Färgen rinner aningen, kanter dröjer. Inte rena geometriska former. Naturen själv är gjord av lavering.

4. **Tunn blyertskontur under färglagret.** Linjen finns där som en svag förbindelse — definierar formen utan att skrika.

---

## Vad C INTE är

För att klargöra: C är inte
- Mumin (för mjukt)
- Hayao Miyazaki (för rörligt och rikt)
- Beatrix Potter (för charmigt)
- Quentin Blake (för impulsivt)
- Children's book illustration (för glatt)
- Watercolor fantasy (för fyllt)
- John Bauer rakt av (för pastische-aktigt om vi inte är försiktiga)

C *är*:
- Tove Jansson när hon är ensam och sorgsen (Sent i november-perioden)
- Edward Gorey i hans tystaste stunder (utan det överdrivet makabra)
- Petra Mrzyk när hon är spöklik
- En blandning av botanisk illustration och brittisk vinjett-illustration
- Sparsamhet som princip

---

## Tre "stildialekter" inom C

### C1 — "Botanisk dokumentation"
Som en plansch ur en flora — föremålet i centrum, med tunn skuggning och kanske en datering nedanför. Detta är hur vi visar *föremål*: tjärsten i en burk, ett halsband, en bok, ett halmstrå från myren.

### C2 — "Landskap-vinjett"
Som en svensk illustrerad reseskildring från 30-talet. Tunn akvarell-lavering, bara antydan av distans, mycket himmel. Detta är hur vi visar *platser*: huset, myren, fjället.

### C3 — "Gestalt-skiss"
En gestalt — människa, hund, *något* — isolerat. Komposition som ett porträtt i en gammal almanacka. Aldrig ansiktsdetaljer. Aldrig hela bilden av det som är fel.

---

## Kompositions-principer (utförlig)

### Mönster 1: Hängande motiv
Motivet är högst upp i bilden, sjunker ner på sidan. Resten är tomt papper. Som ett objekt som hänger i en monter med text inunder.

**Exempel:** Ett halsband som hänger fritt mot vitt. Tomt papper under.

### Mönster 2: Liggande motiv
Motivet ligger i nedre tredjedelen, horisontellt. Mycket luft ovanför.

**Exempel:** Sätesgården målad lågt, hela himlen tom-vit ovanför.

### Mönster 3: Isolerad gestalt
En gestalt mitt på pappret men i lite-mindre-skala. Vit yta runt om.

**Exempel:** En hund som står och tittar bort. Ingen bakgrund.

### Mönster 4: Diagram-känsla
Motivet är ritat som om för en uppslagsbok — kanske med tunna pilstreck eller bokstavsmärkningar. Botanik-känsla.

**Exempel:** Tjärsten i tre stadier av kristallisation, märkta A, B, C.

### Mönster 5: Spegelyta / vatten
Motivet ovan en vågrät linje som speglar — myr-vatten som reflekterar. Reflexen är aningen fel.

**Exempel:** Granskog speglad i myrvatten. Reflexen visar fler träd än vad som syns ovan.

### Mönster 6: Tom plats
Endast en yta — en vägg, en dörr, en spegel. Detaljen ligger i hur färgen flyter på pappret. Atmosfär utan motiv.

**Exempel:** En sluten dörr. Bara dörren. Inget annat.

---

## Färgdisciplin (utförlig)

### Grundregel
**Mest grått, lite blått, ibland brunt, sällan rött.**

| Färg | Hex | Roll | Användning |
|---|---|---|---|
| Smutsig papper-vit | `#EDE5D4` | Bakgrund | Allt vitt — papperets grundton |
| Granit-blyerts | `#3A3733` | Primär | Tunga skuggor, linjearbete |
| Myr-vatten-blå | `#4A5560` | Sekundär | Vatten, kalla skuggor, distans |
| Tjär-svart-mjukt | `#1F1C18` | Mörker | Bara i absolut tyngsta partier |
| Rönnblod-rött | `#6B2A22` | Accent | EN bär, en jacka, en stämpel — inte mer per bild |
| Mossgul | `#8A8055` | Accent | Sparsamt — kalla, dämpade gultoner |
| Genomlyst himmel | `#F0EBD8` | Ljus | Akvarellens varma vit |
| Inombords-skugga | `#2A2620` | Skugga | Aldrig svartare |

### Princip: Akvarell-disciplin
- Inga rena färger ur tuben — alltid blandning, alltid med grått
- Inga heltäckande lager — alltid genomskinligt
- "Vit" är pappret, aldrig en målad vit yta
- Glansiga partier (vatten, glas) får finnas men nyttjas sparsamt

### Princip: Sanity-koppling
Vid lägre sanity i berättelsen kan akvarellen bli våtare, mer ostadig. Konturerna börjar lösa upp. Detta är **diegetiskt** — illustrationerna blir mindre disciplinerade när berättelsen blir det. Tekniskt gör vi detta genom att variera prompt-parametrar:
- 80–100 sanity: "tight watercolor, controlled lines"
- 60–80: "loosened watercolor, more flow"
- 40–60: "wet watercolor with edge bleeds"
- 20–40: "loose watercolor, indistinct edges, colors running"
- < 20: "abstract watercolor, motif barely readable"

---

## Atmosfär & ljus (utförlig)

I akvarell finns ingen "ljuskälla" — färgen *är* ljuset. Men vi kan ge intryck av:

### "Disig dag"
Hela bilden lika ljus. Inga skuggor. Detta är standardläget för C.

### "Genomskinlig kyla"
Blå-grå undertoner everywhere. Pappret syns igenom. Kallt utan att vara klart.

### "Lampsken inifrån"
En liten varm gulton i ett fönster — mossgul `#8A8055`. Resten är blå-grå.

### "Skymning-ljus" (sällsynt)
Mer mossgul-blandning, men aldrig orange/röd. Bara antydan av dagsslut.

### "Inifrån i mörker"
Mycket mer granit-blyerts, mer tjär-svart. Pappret syns bara i små partier. Här blir bilden tyngst.

---

## Typografi (utförlig)

C är *bok*-riktningen. Typografin måste vara *litterär*.

### Display + Body: EB Garamond-familjen
- **Font:** **EB Garamond** (Google Fonts, gratis) — alla vikter och italics
- **Princip:** EN familj, många vikter. Bok-disciplin. Romersk huvudtext, italics för citat och dagboksutdrag.
- **Storlekar:**
  - Display (titlar): 32–48px
  - Subhead: 20–24px
  - Body: 17–19px (telefon)
  - Caption: 13–15px

### Sekundär: handskriven accent (sparsam)
- **Font:** **Petit Formal Script** eller **Mrs. Saint Delafield**
- **Användning:** Bara för dagboks-utdrag och Alices direkta citat. Aldrig löpande text.
- **Begränsning:** Inte mer än 3 ord i taget — annars blir det oläsligt på telefon.

### Tertiär: text på illustration (väldigt sparsam)
- Om en illustration har text *i* sig (botanisk-stil märkning "A", "B", "C") använd EB Garamond Italic på 11–13px

---

## UI-implikationer (utförlig)

### Bok-känsla
- Hela appen är "en illustrerad novell"
- Vit/papper-bakgrund dominerar — `#EDE5D4`
- Marginaler är generösa, läsbar typografi prioriteras
- Bilder och text turas om — sida med bild, sida med text, sida med bild

### Mörkt läge
- Bakgrund: `#1F1C18`
- Text: `#EDE5D4`
- Illustrationer: inverteras inte — de är dyrbara objekt, så de presenteras i en *vit ram* mot mörk bakgrund. Som ett vykort på ett mörkt skrivbord.
- Detta är vackrare än B's mörka läge.

### Animationer
- Bilder "tonar in" som färg som dras in i papper — slow reveal, 800ms
- Sidvändning: enkel cross-fade, 400ms
- Inga curl-effekter, inga 3D-bok-animationer

### App-ikon
- **C:s största styrka.** En akvarell-illustration tål app-ikon-formatet bäst.
- Förslag: ett halsband mot vit yta, eller en silhuett av sätesgården, eller bara ett papper med en blå droppe färg.
- Ikonen är *signaturen* för appen — den ska kunna stå utan titel och ändå vara identifierbar.

### Skiljelinjer och UI-chrome
- Hårlinje i granit-blyerts `#3A3733` — aldrig svart
- Knappar är text, inte boxes. Tryckytan stor men osynlig.
- Underline för länkar — inget annat
- Total minimalism — UI:t försvinner och låter prosan + bilden ta plats

---

## Tio exempel-prompts för specifika motiv

### Prompt 1: Cover-bild / nyckelillustration
> Watercolor illustration on dirty paper-white background #EDE5D4, an old Swedish timber farmhouse painted in the lower third of the composition, much empty paper above, the house is rendered in muted graphite #3A3733 and faded red roof in restrained rönnblod-red #6B2A22, fine pencil contour line under the watercolor, no people, no foreground detail, just the house alone, a low pale wash of myr-water-blue #4A5560 suggesting a far horizon, the upper two-thirds of the composition is empty cream-white paper, in the manner of Tove Jansson in her sorrowful period meets Edward Gorey's restraint, no fantasy elements, no cute features, fine watercolor discipline.

### Prompt 2: Sätesgårdens dörr
> Watercolor illustration, a closed wooden front door of an old Swedish farmhouse, painted in subtle graphite-grey #3A3733 with a faint warm undertone of wood, the door fills the middle vertical third of the page, painted on dirty paper-white #EDE5D4 background with no architectural surroundings, a single tarnished brass handle catches a hint of mossy-yellow #8A8055 light, fine pencil contour, blött-i-blött shadows on the lower half where light fails, the rest of the paper untouched, a quiet door waiting, no other elements.

### Prompt 3: Tjärsten i en burk (C1 botanisk dokumentation)
> Botanical-illustration-style watercolor of a clear glass jar containing dark crystalline tar residue, the jar painted with fine pencil contour and translucent watercolor showing the dark contents inside, the jar sits at lower-third on dirty paper-white #EDE5D4 background, a small handwritten label below in fine italic reads "tjärsten — myrtorv 1979", no other elements, soft even light, the contents almost black #1F1C18 inside the translucent glass, in the style of an early 20th-century field encyclopedia.

### Prompt 4: De sju Signe (gestalt-skiss)
> Watercolor illustration, seven Irish wolfhounds painted in a single horizontal row across the lower third of the page, each rendered minimally — silhouette and pencil contour with restrained graphite wash, the seven are slightly different sizes (different ages), all facing the same direction (left), the upper two-thirds of the page is empty cream paper, no background, no setting, just the seven dogs in a row, in the style of Tove Jansson sorrowful illustration, subtle and patient, no expression detail.

### Prompt 5: Myren vid skymning (C2 landskap-vinjett)
> Watercolor landscape, painted only across the lower fifth of a tall cream-white #EDE5D4 page, a peat bog at twilight, with subtle myr-water-blue #4A5560 wet-in-wet washes, a far line of spruce forest as the darkest band, sky above is pure empty paper, the upper four-fifths of the composition is empty, a sense of horizon stretching out, no foreground objects, no people, in the manner of an early 20th-century Swedish landscape illustration meets minimalist Japanese sumi-e composition.

### Prompt 6: Skivspelaren
> Watercolor still life, a 1970s record player rendered in fine pencil contour with restrained graphite wash, sitting on the lower half of a cream-white #EDE5D4 paper, the vinyl visible with one accent of rönnblod-red on the label, fine watercolor renders the wooden cabinet in muted browns, no surrounding room, the player floats alone on the page with much empty paper around it, in the style of botanical-illustration discipline applied to mid-century domestic objects.

### Prompt 7: Vinds-tinget (antydan — gestalt-skiss men ofullständig)
> Watercolor illustration, a vague canine silhouette painted in the upper-left quarter of an otherwise empty cream-white page, the silhouette is rendered loosely with watercolor only — no pencil contour, the edges bleed slightly into the paper, the proportions are subtly wrong (head too small, legs too long, posture not quite right), the figure is dark graphite-blue #4A5560 against the cream paper, no other elements, no setting, no ground line, just the figure floating in empty paper space, ambiguous, the watercolor edges loose and uncertain.

### Prompt 8: Ett halsband (C1 botanisk)
> Watercolor and pencil illustration, a single leather dog collar with a small brass nameplate, lying horizontally across the centre of an otherwise empty cream-white #EDE5D4 page, rendered in fine pencil contour and restrained brown wash for the leather, a touch of mossy-yellow #8A8055 for the tarnished brass nameplate, the nameplate has very small italic text reading "Signe VI" (barely legible), the collar casts no shadow, sits alone on the page, in the manner of a museum catalog illustration.

### Prompt 9: Mejeribyggnaden
> Watercolor landscape illustration, a small Swedish dairy building rendered minimally in the lower third of a cream-white #EDE5D4 page, the building is painted in graphite-grey #3A3733 and faint mossy washes, a small dark window at the front, no door visible (or door painted in shadow), surrounded by suggestion of overgrown grass in restrained myr-green wash, the upper two-thirds is empty paper-white sky, no atmosphere, no drama, just the building alone in its space, in the style of a quiet field-sketch from a 1950s Swedish countryside journal.

### Prompt 10: Inombords — vinden (sanity-låg-version)
> Watercolor illustration, an attic interior rendered loosely with wet-on-wet bleeding edges, the walls and ceiling are dark graphite #3A3733 and tjär-soft-black #1F1C18, only a small section of cream-paper #EDE5D4 remains as a window high in the wall, the watercolor is deliberately loose — colors run, edges blur, no fine pencil contour, the room shape is barely readable, the impression of a space rather than a depiction of one, in the style of late-sanity sequence — loose, wet, indistinct, unsettled.

---

## Anti-prompt-bibliotek

- cute, charming, whimsical, adorable
- children's book illustration, picture book style
- fantasy creatures, dragons, trolls, elves, fairies
- Mumin pastiche, John Bauer pastiche
- bright vibrant colors, saturated watercolor
- digital flat illustration, vector illustration, cartoon
- ink heavy black outlines, comic book style
- detailed crowded compositions, busy backgrounds
- characters with detailed facial features (we want suggested faces only)
- emoji-like simplified shapes
- magical sparkles, light effects, glows
- gothic horror imagery (skulls, bats, gravestones explicit)
- blood, gore, violence depicted
- text within illustration (except botanical labels)
- modern technology rendered in watercolor (always looks awkward)
- explicit monster designs, creature features
- HDR watercolor (oversaturated, contrast-boosted)

---

## Image-to-image-strategi

Tre master-referenser:
1. **`assets/images/reference/00-cover-master.png`** — sätesgården låg på sidan, mycket vit (cover-stilen)
2. **`assets/images/reference/01-object-master.png`** — ett halsband eller en burk (objekt-stilen, C1)
3. **`assets/images/reference/02-landscape-master.png`** — en landskaps-vinjett (C2-stilen)

Alla framtida illustrationer genereras image-to-image med en av de tre, beroende på motivkategori. Detta säkerställer akvarell-konsistens (våtnivå, palett, pappers-textur) över hundratals bilder.

---

## Snabbcheck för image-creator

- [ ] Är minst 40% av bilden tomt papper?
- [ ] Är paletten inom hex-värdena?
- [ ] Är det BARA ett enkelt motiv (inte komposition)?
- [ ] Finns tunn pencil-contour under färglagret?
- [ ] Är akvarellen *våt* — inte tight digital?
- [ ] Saknas söta, fantasy-, eller barnboks-element?
- [ ] Är skuggning gjord med blött-i-blött, inte solida block?
- [ ] Är thumbnail-versionen läsbar i 60×60 px?
- [ ] Image-to-image-referens till rätt master?

---

## Vad detta INTE löser

- **Folk-horror-omedelbarhet.** C är *vacker*. Den är inte direkt skrämmande. Skräcken ligger i prosan, inte i bilden. Detta är ett medvetet val — men kan vara fel val.
- **Marknadsföring i feed.** Akvarell-bilder konkurrerar dåligt mot foto-bilder i Instagram-feed. C kan tappa till en aggressiv konkurrent som har foto-cover.
- **Modern teknologi i illustrationer.** En mobiltelefon i akvarell ser fel ut. Vi måste välja motiv som tål akvarell — gamla föremål, natur, byggnader.
- **Action.** C är statisk per natur. Vinds-tinget i rörelse fungerar inte här — vi behöver visa effekter, inte handling.

---

## Spänning med projektets ton

C:s största risk: **för vacker.** Voice-guide är torr, saklig, prosaisk. Akvarell-illustration drar mot poetiskt, melankoliskt, *vackert*. Detta kan skapa en disjunktion — prosa säger "telefonen vibrerar två gånger", bilden säger "en illustration av sorg".

**Lösning om vald:** Vi balanserar genom att aldrig låta akvarellen bli sentimental. Disciplinen är *botanisk*, *katalog-aktig*, *forensisk*. Bilden dokumenterar — den känner inte.

---

*Detta dokument är förberedelse för art-style-guide.md. Det aktiveras när användaren valt riktning C.*
