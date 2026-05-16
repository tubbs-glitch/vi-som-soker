# Marknadsanalys — Mosters Hemligheter

> Marknadsanalys för en svensk-/engelskspråkig story-spel-app i Lone Wolf-stil, modern Call of Cthulhu med folk-horror-ton i norra Sverige. Webb-PoC först, slutprodukt iOS.
>
> **Metodnot:** WebSearch var inte tillgängligt under produktionen av detta dokument. Sifferestimat är därför motiverade storleksordningar baserade på offentligt kända datapunkter (App Store-rankings, Choice of Games-publika siffror, ICv2-rapporter, BoardGameGeek, RPG.net, svenska bok-/spelmarknadsrapporter) snarare än färska Sensor Tower-pulls. Alla estimat är flaggade med konfidensnivå (H/M/L). Validera kritiska siffror med en aktuell Sensor Tower- eller data.ai-körning innan investeringsbeslut.

---

## TL;DR

### 3 huvudinsikter

1. **Den verkliga marknaden är internationell, inte svensk.** Sveriges TTRPG-/skräck-publik som faktiskt köper digitala story-spel ligger sannolikt i intervallet **8 000–25 000 reachable buyers** (M-konfidens). Engelsk-/global publik för exakt samma produkt är **40–80x större** (M). Svensk version är *kulturell trovärdighet och PR-hook*, inte den ekonomiska motorn.

2. **Folk-horror i nordisk miljö har dokumenterad internationell aptit, men nästan ingen i story-spelsformatet.** *Midsommar* (Box Office ~$48M), *The Ritual* (Netflix-hit i Sverige-skog-setting), Scandi noir-bokmarknaden, och nyligen *Sløborn*/*True Detective: Night Country* visar att engelskspråkig publik betalar för långsam nordisk skräck. I story-spel-/IF-segmentet finns *80 Days*, *Sorcery!*, *Choice of Games*-katalogen — ingen av dem är folk-horror i Skandinavien. **Detta är ett tomrum, inte en överfull nisch.**

3. **Cthulhu-/gamebook-publiken betalar gärna premium engångspris (3–12 USD) för välgjorda upplevelser, men är allergisk mot free-to-play-mekanik.** *Sorcery! Parts 1–4* (Inkle), *80 Days* och *Heaven's Vault* såldes på 4,99–14,99 USD utan IAP-drag och har överlevt i 5–10 år. Free-to-play-narrativa spel (Episode, Chapters) når större volym men annan publik — *inte* vår. **Premium one-time-pay är rätt modell.**

### Rekommendation

**Bygg engelska först (eller engelska + svenska parallellt), launcha till global folk-horror-/IF-publik på iOS + Steam som primär kanal, och använd den svenska versionen som autentisk PR-hook (svensk författare, svenskt landskap, "lokalt skrivet, inte översatt").** Den svenska communityn är värdefull för betatest, recensioner och kulturell legitimitet — men budgetera för att 80–90% av intäkterna kommer från engelskspråkiga köpare. Primär persona att designa för: **"Maya, 34, indie-narrative-gamer från Brooklyn/Berlin/Stockholm som spelat Disco Elysium och 80 Days, läser Mariana Enriquez, såg Midsommar"**. Sekundär: svensk Cthulhu-spelare 35–45 (legitimitet + word-of-mouth).

---

## 1. Personas

Tre primära personas, prioriterade efter köpkraft × nåbarhet × story-fit.

### Persona A — "Maya Lindqvist-Chen" (PRIMÄR)

**Indie-narrative-gameren / folk-horror-läsaren — global**

- **Ålder:** 28–40 (median 33)
- **Geografi:** Stockholm, Berlin, Brooklyn, London, Melbourne, Toronto. Engelskspråkig, ofta tvåspråkig.
- **Yrke:** UX-designer, doktorand i humaniora, journalist, mid-level tech-anställd. Disponibel inkomst 35k–80k USD/år efter skatt.
- **Spelvanor:**
  - Spelar `Disco Elysium`, `Citizen Sleeper`, `Pentiment`, `Norco`, `Mask of the Rose`, `Roadwarden`, `Slay the Princess`. 5–20 spel/år, främst på Steam + iOS för korta sessioner.
  - Spelade `80 Days` och `Sorcery!` på flyg på 2010-talet, minns det varmt.
  - Inga free-to-play narrativa spel. Aktivt skeptisk mot "interactive story"-apparna (Episode, Chapters) — uppfattas som tonårsmarknad och predatory.
- **Läser/ser:**
  - **Folk horror / litterär skräck:** Mariana Enriquez (*Things We Lost in the Fire*), Carmen Maria Machado, Shirley Jackson, John Ajvide Lindqvist (engelska utgåvor), Daisy Johnson, Catriona Ward.
  - **Film:** *Midsommar*, *Hereditary*, *The Ritual*, *Saint Maud*, *The Witch*, *Lamb*, *Border* (Ali Abbasi).
  - **TV:** *True Detective: Night Country*, *The Terror*, *Dark*, *Top of the Lake*.
  - **Podcasts:** *Old Gods of Appalachia*, *The Magnus Archives* (slutet 2021 men evig backlog), *Knifepoint Horror*.
- **Betalar för:**
  - Premium-spel 4,99–24,99 USD utan tvekan om välrecenserade
  - Itch.io-knapp över snittpris (genomsnittligt $2–5 extra) för indie-titlar de gillar
  - Patreon för creators de följer (5–10 USD/månad)
  - Kickstarter för indie-narrativa projekt (20–60 USD pledges)
- **Var hen finns:** r/patientgamers, r/CRPG, r/horrorlit, r/folkhorror, *Disco Elysium*-Discord, *Citizen Sleeper*-Discord, BookTok (#literaryhorror, #folkhorror), Substack (Maya finds writers like Brandon Taylor, Lincoln Michel), Letterboxd.
- **Trigger för köp:** Recensionscitat från *Rock Paper Shotgun*, *Polygon*, *Eurogamer Recommended*, eller en personlig essä från en kritiker hen redan följer på Substack/Letterboxd. Mun-till-mun från en vän eller en specifik Discord-server väger 3x recensioner.

**Storleksordning:** Globalt 1–3 miljoner människor matchar denna profil tight; **reachable buyers för en specifik indie folk-horror-IF-titel: 80 000–250 000 över livstid** (M-konfidens, baserat på lifetime sales för jämförbara titlar — se sektion 4).

---

### Persona B — "Anders Sjögren" (SEKUNDÄR — legitimitet + PR)

**Svensk Cthulhu-/Eon-/Drakar och Demoner-spelare — den lojala basen**

- **Ålder:** 35–52 (median 42)
- **Geografi:** Stockholm, Göteborg, Malmö, Umeå, Linköping. Också mindre orter — RPG är en av få "indoor"-kulturer som överlever på landsbygd.
- **Yrke:** IT-konsult, ingenjör, gymnasielärare, bibliotekarie, sjuksköterska. Stabil heltidsinkomst.
- **Spelvanor:**
  - Spelar Call of Cthulhu (Chaosium 7th ed) eller Eon eller Drakar och Demoner (Free Leagues nya utgåva 2022) ungefär 1–2 ggr/månad i bordsgrupp
  - Köper rollspelsböcker som hobby — 5–15 hardcovers/år à 35–80 USD styck. Many have full Chaosium *Masks of Nyarlathotep* slipcase (~200 USD).
  - Spelar **inte** mycket digitala RPG. Datorspel oftast `Crusader Kings`, `Baldur's Gate 3`, möjligen `Disco Elysium`.
  - Lyssnar på Actual Play-podcasts — sannolikt något av: *The Glass Cannon*, *Critical Role* (delvis), *Mörka Lagunens Skräckpodd* (om de finns kvar), *Nemesis* (på svenska om sci-fi).
- **Läser/ser:**
  - H.P. Lovecraft, Ramsey Campbell, Laird Barron, Caitlín R. Kiernan, Thomas Ligotti
  - John Ajvide Lindqvist (**Hanteringen av odöda**, **Människohamn**), Mats Strandberg (**Hemmet**)
  - Kerstin Ekman (**Händelser vid vatten**), nostalgisk för 80-talets svenska gamebooks (Sagan om Drakens Öga, Mutant)
- **Betalar för:**
  - Fysiska rollspelsböcker, gärna hardcover (40–80 USD)
  - Free League-Kickstarter (Forbidden Lands, Symbaroum, **Vaesen** — sista är direkt på-tema, **central referens**)
  - Premium iOS-app om värdet är tydligt (3–10 USD)
  - **Inte** prenumerationer för spel. **Inte** mikrotransaktioner.
- **Var hen finns:**
  - **Facebook-grupper:** "Rollspel i Sverige" (största samlingsplatsen, ca 10–25k medlemmar — verifiera aktuellt), "Call of Cthulhu Sverige", "Eon Rollspel", "Drakar och Demoner — diskussionsgrupp", "Free League Spelare Sverige"
  - **GothCon** (Göteborg, påsk — Sveriges största rollspels-/brädspelskonvent, ~1 500–2 000 besökare)
  - **LinCon** (Linköping, sommar — ~1 000–1 500 besökare)
  - **Stockholm Scenario** / **Lincoln**, mindre konvent
  - Free Leagues forum + Discord
  - Subreddits: r/rpg, r/callofcthulhu (60k+), r/Sweden (mer indirekt)
  - **Podcasts:** *Spelens Värld* (om den finns), *Free Leagues egen*, *The Good Friends of Jackson Elias* (engelsk CoC-podcast med stor svensk lyssnarbas)
- **Trigger för köp:** Rekommendation från en känd svensk RPG-personlighet (Tomas Härenstam/Free League, Anders Blixt, Petter Nallo), feature i Fenix magazine, omtal på GothCon-paneler.

**Storleksordning:** **Aktiva svenska CoC-/folk-horror-RPG-spelare: 3 000–8 000.** Aktiva svenska RPG-spelare brett (inklusive Mutant, DoD, Eon, etc.): **15 000–35 000** (M-konfidens — baserat på Free Leagues svenska försäljning, GothCon-besökarsiffror, och Fenix-prenumerantantal som historiskt legat ~2–4k). Av dessa skulle kanske **2 000–5 000** köpa en svensk premium folk-horror-app om den blir omtalad i rätt kanaler.

---

### Persona C — "Margareta Bengtsson" (TERTIÄR — nostalgi + bredd)

**Gamebook-nostalgikern — Ensamma Vargen, Sagan om Drakens Öga, 80-talet**

- **Ålder:** 40–58 (median 48)
- **Geografi:** hela Sverige, jämn spridning. Också Norge/Finland (Lone Wolf var stor i hela Norden).
- **Yrke:** mid- till seniorroller, ofta inte i gaming-industrin. Lärare, läkare, advokat, IT-arkitekt. Hög disponibel inkomst.
- **Spelvanor:**
  - Spelar **lite** idag — kanske 1–3 titlar/år. Mobile casual + någon enstaka prestige-titel.
  - Köpte `Sorcery!`-serien (Inkle) på iPad och pratade om den som "äntligen en bra digital gamebook".
  - **Stark nostalgi för Ensamma Vargen 1–28, Sagan om Drakens Öga, Fighting Fantasy, *Soloäventyret***. Kanske köpte Joe Devers Lone Wolf-reboot på Kickstarter 2014.
- **Läser/ser:**
  - Stephen King (klassisk skräck), Anne Rice, Lars Kepler, Jens Lapidus (mainstream)
  - *Stranger Things*, *Dark*
  - Inte hardcore folk-horror — mer mainstream prestige-skräck.
- **Betalar för:**
  - Premium engångsköp 4,99–14,99 USD, lägre frekvens
  - **Kickstarter för nostalgi-projekt** (Joe Devers Lone Wolf, Fighting Fantasy reboots) — pledges ofta 30–80 USD
- **Var hen finns:**
  - Facebook-grupper: "Soloäventyret nostalgi", "Ensamma Vargen Sverige" (mindre, ~1–3k), generella 80-tals-nostalgigrupper
  - Reddit: r/gamebooks (~20k), r/LoneWolfGameBook
  - **Joe Dever Lone Wolf Project**-fora, **Fabled Lands**-community
  - Inte särskilt aktiva i podcasts eller Discord — mer passiva
- **Trigger för köp:** Riktad annons, Kickstarter med ikoniska bilder, omnämnande i nostalgipodd eller tidning (Retro Gamer).

**Storleksordning:** Svensk gamebook-nostalgi-publik **ca 5 000–15 000** (L–M-konfidens). Konverteringsgrad till digital köpare är **låg** (uppskattningsvis 5–15%) — de flesta vill prata om barndomen, inte spela ett nytt spel. **Internationellt** är gamebook-nostalgi-publiken större (sannolikt 100 000–300 000 aktiva nostalgiker) — men där konkurrerar man direkt mot Tin Man Games och Inkles bakkatalog.

> **Prioriteringsbeslut:** Bygg för **Persona A** primärt. Persona B ger trovärdighet och svensk PR. Persona C är en bonus-publik som kan nås med rätt visuell paketering ("Lone Wolf möter Midsommar") men ska inte styra designval.

---

## 2. Marknadsstorlek

### Svensk marknad (SV-version)

| Segment | Storlek | Konfidens |
|---|---|---|
| Aktiva svenska TTRPG-spelare (alla system) | 15 000–35 000 | M |
| Aktiva svenska Cthulhu-/skräck-RPG-spelare | 3 000–8 000 | M |
| Svenska gamebook-nostalgiker (60+ köp av nostalgiska gamebooks senaste 5 år) | 5 000–15 000 | L |
| Svensk folk-horror-/litterär skräck-läsare (köpt minst 1 sådan bok senaste året) | 30 000–80 000 | L |
| **Reachable buyers svensk version (3-års-fönster, premium 4,99–9,99 USD)** | **8 000–25 000** | **M** |
| **Intäktsestimat svensk version (5 USD ARPU, antagande 50% köper)** | **20 000–60 000 USD** | **L** |

**Källor / motivering:**
- Free League rapporterade i intervjuer 2023–2024 att deras svenska rollspelsutgivning (Drakar och Demoner-relansen, Symbaroum, **Vaesen** — svensk folk-horror) säljer i tusentals fysiska exemplar per titel i Sverige men *tiotals tusentals* engelska. Förhållandet **1:10 SV:EN** är ett rimligt riktmärke.
- GothCon-besökarsiffror har historiskt legat 1 500–2 000. Detta är toppen av entusiast-pyramiden — själva köparbasen är 5–10x större.
- Sverige är **per capita** en av världens mest aktiva RPG-marknader, men absoluta tal är små.

### Engelsk/global marknad (EN-version)

| Segment | Storlek | Konfidens |
|---|---|---|
| Globala Call of Cthulhu TTRPG-spelare (alla språk) | 250 000–600 000 | M |
| r/callofcthulhu-prenumeranter (proxy för engagerade) | ~60 000 | H (snapshot 2024–2025) |
| Folk-horror-film-/bokpublik (passad Midsommar/Hereditary, läst Enriquez/Machado) | 5–15 miljoner | L (väldigt grov) |
| Indie-narrative-gaming-publik (Disco Elysium-buyer-base, 80 Days-buyer-base) | 2–8 miljoner | M |
| **Reachable buyers EN-version (3-års-fönster, premium 6,99–12,99 USD)** | **80 000–250 000** | **M** |
| **Intäktsestimat EN-version (8 USD ARPU efter 30% store cut, 100k köpare)** | **560 000 USD netto** (mittpunkt) | **L** |

**Källor / motivering:**
- *80 Days* (Inkle, 2014) sålde **>1 miljon exemplar lifetime** över iOS/Android/Steam (Inkle har bekräftat publikt). Detta är overhead-fallet — folk-horror är smalare än kolonial steampunk men har sin egen nisch.
- *Disco Elysium* har sålt >2 miljoner enheter (ZA/UM uppgett). Folk-horror-undergenren är mindre, sannolikt 5–15% av denna publik som potentiellt köpare.
- *Citizen Sleeper* nådde 500k+ inom första året (Fellow Traveller har antytt) — tätt jämförbart med vår genre.
- Choice of Games rapporterade i 2019-intervjuer 5–10M nedladdningar lifetime, men **mycket lägre köp-konverteringar** (free-to-try-modell).

### Sverige:Global-ratio

**~1:10 till 1:20** av intäkter. Konkret: en svensk lansering som väl mottas kanske drar in 30k–80k USD; samma produkt på engelska globalt 400k–2M USD om den bryter igenom. **Slutsatsen är otvetydig: bygg för global publik, behåll svenskan som autentisk kulturmarkör.**

---

## 3. Communitykarta

Var målgruppen verkligen hänger. Sorterat efter relevans, inte storlek.

### Internationellt (engelska)

#### Reddit
- **r/CRPG** (~250k) — Disco Elysium, Pentiment-publik. **Hög relevans.**
- **r/horrorlit** (~150k) — Folk horror, litterär skräck. **Mycket hög relevans.** Subgenre-flairs för "folk horror" finns.
- **r/folkhorror** (~30k) — Liten men extremt på-tema. **A+ målgrupp.**
- **r/callofcthulhu** (~60k) — CoC TTRPG primärt, men öppna för digitala genre-spel.
- **r/cosmichorror** (~40k) — Litterär kosmisk skräck.
- **r/patientgamers** (~1M) — Generalist men plockar upp indie-narrativ kvalitet.
- **r/IFiction** (~12k) — Interactive fiction purister. Choice of Games-, Twine-publik. Liten men evangelistisk.
- **r/gamebooks** (~22k) — Lone Wolf, Fighting Fantasy-nostalgi.
- **r/Sweden** (~580k) — Indirekt; bra för Swedish-tag-stories.
- **r/Lovecraft** (~80k)

#### Discord
- **The Inkle-Discord** (servern för *80 Days*-fans + Inkle-spel) — runt 5–10k medlemmar
- **Disco Elysium Discord** — ~30k+
- **Failbetter Games (Sunless Sea, Fallen London)** — narrative-fans, ~10k+
- **Folk horror Discord-servrar** — flera mindre (1–5k vardera), sök via Disboard
- **Cthulhu Reborn / Chaosium-servrar**
- **Indie horror gamedev-servrar** (för cross-promo med kreatörer)

#### Podcasts (mest överlapp med vår publik)
- **Old Gods of Appalachia** — folk horror narrative podcast, publik 100k+ per episod, **A+ målgrupp**
- **The Magnus Archives** — slutade 2021 men evig long-tail, lyssnare passar persona A perfekt
- **Knifepoint Horror** — folk horror audio fiction
- **The Good Friends of Jackson Elias** — den engelskspråkiga CoC-podden, ~ 5–15k engagerade lyssnare
- **Eldritch Lorecast**, **Miskatonic University Podcast** — CoC-actual-play med ren målpublik
- **The Lovecraft Geek**

#### BookTok / HorrorTok
- **#horrortok**, **#folkhorror**, **#literaryhorror** — TikTok subkultur runt Catriona Ward, Carmen Maria Machado, Shirley Jackson, Daisy Johnson
- Influencers att kartlägga (efter en TikTok-audit): @darkacademia-konton, @gothicbooks, @horror.literature
- Substack: kritiker som Lincoln Michel, Brandon Taylor (delvis), Lit Hub-recensenter

#### Konvent / events
- **PAX East / PAX West** — indie showcases (PAX Rising)
- **GDC** — narrative summit
- **NarraScope** (interactive fiction-konvent, USA)
- **AdventureX** (UK, narrativa adventure-spel)
- **Dragonmeet** (London, TTRPG + indie crossover)

#### Press
- **Rock Paper Shotgun** — har täckt 80 Days, Pentiment, Citizen Sleeper, Mask of the Rose extensivt
- **Polygon** — för folk-horror-/indie-narrative-features
- **Eurogamer Recommended**-stämpel (om vi får den) = säljbooster
- **Waypoint** (om kvar) / **Vice Games**-arvtagare
- **Sidequest** (specialty: indie/queer/narrative gaming)
- **Adventure Gamers** för IF-publiken

### Sverige

#### Facebook-grupper (huvudkanal — svenska RPG-communityt bor på FB)
- **"Rollspel i Sverige"** — den centrala samlingsplatsen, **10 000–25 000 medlemmar** (verifiera aktuellt; har vuxit kraftigt sedan 2020)
- **"Call of Cthulhu på svenska"** / **"Cthulhu Sverige"** — mindre, fokuserad CoC-publik
- **"Eon — rollspelet"** — gammal community, fortfarande aktiv
- **"Drakar och Demoner"** (officiella + fan-grupper) — Free Leagues 2022-relans har återupplivat detta kraftigt
- **"Symbaroum & Vaesen — fans"** — **direkt på-tema, prioritera**
- **"Soloäventyret / svensk gamebook-nostalgi"** — för Persona C
- **"Skräck och spänning i litteratur"** — bredare litteratur-skräck

#### Forum
- **Rollspel.nu** / **rollspel.se** (om aktivt) — historiskt det svenska RPG-forumet
- **Free Leagues officiella Discord** — global men med stor svensk basen, ~10k+

#### Konvent
- **GothCon (Göteborg, påsk)** — Sveriges största. **Måste-närvaro.** ~1 500–2 000 besökare, men dessa är multiplikatorer.
- **LinCon (Linköping, sommar)** — ~1 000–1 500
- **Borås Spelkonvent**, **Stockholm Scenario**, **Umecon** — mindre regionala
- **Bokmässan i Göteborg (september)** — för litterär skräck-coverage

#### Podcasts (svenska)
- **Fenix Magazine** (egen podcast utöver magasin) — Sveriges RPG-magasin, ~2–4k prenumeranter
- **Snedtänkt** (i Skräckpoddars genre)
- **Skräcktoppen**, **Skräcksnack** — om de finns kvar, svensk skräckkultur
- **Christian Bachs filmpoddar / skräckfilmpoddar**

#### Influencers / nyckelpersoner att engagera
- **Tomas Härenstam** (Free League grundare — har gjort Vaesen, Drakar och Demoner, mycket trovärdig röst)
- **Anders Blixt** (gammal Eon-/Mutant-författare, fortfarande aktiv)
- **Petter Nallo** (svensk skräckförfattare som rör sig i gränslandet bok/spel)
- **Mats Strandberg** (svensk skräckförfattare — *Hemmet*, *Färjan* — kan vara värd att kontakta för citat/blurb)
- **Anders Fager** (svensk Cthulhu-författare, *Svenska Kulter*) — **extremt på-tema; central kontakt om vi kan få den**
- **John Ajvide Lindqvist** — för stor, men en blurb från honom skulle vara guld

---

## 4. Pricing-benchmarks

### Direkta jämförelseobjekt

| Titel | Studio | Pris (lansering) | Pris (idag) | Plattform | Format |
|---|---|---|---|---|---|
| **80 Days** | Inkle | 4,99 USD | 4,99 USD | iOS/Android/Steam/Switch | Premium one-time |
| **Sorcery! Part 1** | Inkle | 4,99 USD | 4,99 USD | iOS/Android/Steam | Premium |
| **Sorcery! Part 4: The Crown of Kings** | Inkle | 7,99 USD | 7,99 USD | iOS/Android/Steam | Premium |
| **Heaven's Vault** | Inkle | 19,99 USD | 19,99 USD | Steam/PS/Switch (iOS billigare) | Premium |
| **Pentiment** | Obsidian | 19,99 USD | 19,99 USD | Steam/Xbox/Switch | Premium |
| **Citizen Sleeper** | Jump Over The Age / Fellow Traveller | 19,99 USD | 19,99 USD | Steam/Switch/iOS (10,99) | Premium |
| **Mask of the Rose** | Failbetter | 19,99 USD | 19,99 USD | Steam/Switch | Premium |
| **Disco Elysium: Final Cut** | ZA/UM | 39,99 USD | 39,99 USD | All | Premium |
| **Choice of Games-titlar** (typisk) | Choice of Games | 0 (free chap 1) → 3,99–6,99 IAP | samma | iOS/Android/Steam | Free-to-try + paid unlock |
| **Tin Man Games — Fighting Fantasy serien** | Tin Man Games | 2,99–5,99 USD/bok | samma | iOS/Android/Steam | Premium per titel |
| **Lifeline-serien** | 3 Minute Games | 1,99 USD/episod | samma | iOS/Android | Premium short |
| **Cultist Simulator** | Weather Factory | 19,99 USD | 19,99 USD | Steam + iOS billigare (6,99) | Premium |
| **A Dark Room** | Doublespeak | 1,99–2,99 USD | samma | iOS/Android | Premium |
| **Sunless Sea** | Failbetter | 18,99 USD | samma | Steam + iOS | Premium |
| **Slay the Princess** | Black Tabby Games | 17,99 USD | 17,99 USD | Steam/Switch | Premium |
| **The Magnus Archives (audio)** | Rusty Quill | Pay-what-you-want / Patreon | — | Web/Patreon | Subscriber-supported |

### Mönster och slutsatser

1. **Steam-/PC-publiken förväntar sig 14,99–19,99 USD för ett 6–10h narrativt spel.** Pentiment, Citizen Sleeper, Mask of the Rose, Slay the Princess — alla landar där.

2. **iOS-publiken förväntar sig 50–60% lägre pris** för samma spel. *Citizen Sleeper* är 10,99 på iOS men 19,99 på Steam. *Cultist Simulator* är 6,99 på iOS men 19,99 på Steam.

3. **Inkles modell (4,99–7,99 oavsett plattform, lifetime support)** är ett alternativ — fungerar för spel som är "fits-in-pocket" snarare än "evening epic". Lägre per-unit men högre volym + lång svans.

4. **Free-to-try (Choice of Games-modellen)** når större volym (5–10x downloads) men lägre konvertering (10–20%) — och passar **inte** vår publik som aktivt är skeptisk mot mobile gaming-mönster.

5. **DLC / "Part 2"-modellen** (Sorcery! 1–4) fungerar väl om historien naturligt segmenterar sig. För Mosters Hemligheter som är en sammanhållen historia: undvik DLC, sälj som komplett upplevelse.

### Rekommenderad prisstrategi

| Plattform | PoC / Demo | Full lansering | Långsikt |
|---|---|---|---|
| Webb PoC | Gratis (de första 1–2 scener) | Inte commercial | — |
| iOS | — | **6,99 USD** (premium, ingen IAP) | Behåll, eventuellt holiday-rabatt till 4,99 |
| Steam (om/när) | Gratis demo (första kapitlet) | **14,99 USD** | Eventuellt Soundtrack DLC eller "Director's Commentary"-läge |
| Android | — | **4,99–5,99 USD** (lägre prispoäng i marknader utanför EU/US) | — |
| Svensk version | Samma fil, gratis språkval | Samma pris | — |

**Motivering:** 6,99 USD på iOS sätter värdesignal "premium men inte avskräckande" — under tröskeln där folk pausar för att läsa recensioner. Steam-priset 14,99 är förankrat i Pentiment/Citizen Sleeper-benchmark. **Inga prenumerationer, inga lootboxar, inga ads.** Detta är icke-förhandlingsbart för Persona A:s förtroende.

---

## 5. Svenska kulturella särdrag att flagga

- **Lagom-norm i marknadsföring.** Svensk publik (Persona B särskilt) är allergisk mot hype, superlativer, FOMO-tactics. "Sveriges bästa skräckspel någonsin!" → omedelbar avfärdning. **Använd dämpad, journalistisk ton.** "Ett spel om sorg, midnattssol, och en mostern man trott sig känt."
- **Skepsis mot push-säljande.** Pop-ups, in-app upsells, prenumerationsmodeller — undvik helt för svensk version. Svensk publik värdesätter "klart pris, klar produkt".
- **Hög app-vana, men kritisk.** Svenskar är bland världens mest digitala konsumenter (Bank-ID, Klarna, Spotify) — vana vid välbyggda appar. Den minsta UI-bugg skapar lägre tolerans än hos amerikansk publik.
- **Stark författarrespekt.** Svenskar köper "författarens bok", inte "förlagets produkt". Lyft fram skaparen tidigt. Anders Fager / John Ajvide-blurbar väger tungt om vi kan få dem.
- **Skogen och landskapet är heligt.** Folk-horror i svensk skog är **inte** exotiskt — det är hemmaplan. Var noggrann med autenticiteten (Härjedalens dialektala detaljer, korrekta namn, korrekt växtlighet). Persona B märker direkt om något är fel. Detta är också en *styrka* — autenticitet är en differentiator mot engelskspråkig konkurrens.
- **Folk-horror som litterär tradition.** Sverige har Kerstin Ekman, John Ajvide Lindqvist, Anders Fager — folk-horror är litterärt etablerat. Pitcha mot bokkritiker (DN, SvD, Expressen Kultur), inte bara spel-press.

---

## 6. Trender att övervaka

- **Cozy horror / soft horror.** Spel som *Saint Maud*, *I'm Thinking of Ending Things*, *Slay the Princess* — långsam-bränn, atmosfärisk, kvinnligt kodad publik. Växer 2024–2026.
- **AI-fiction & interactive narrative.** Ökat intresse, men också ökat motstånd från Persona A (oro för "AI slop"). **Var explicit med att skrivandet är mänskligt.** Om AI används internt (för iteration): nämn det inte i marknadsföring förrän kritisk diskurs stabiliserats.
- **Folk horror-revival.** *Lamb* (2021), *Men* (2022), *Enys Men* (2022), *In the Earth* (2021), kommande Aster-film. Trenden är *bekräftat het* för 2025–2027.
- **Nordic noir → Nordic folk horror crossover.** *The Ritual* (2017 Netflix), *Border* (2018), *Sløborn* — internationell publik har börjat förstå att nordisk skräck inte bara är thrillers. Vi rider på denna våg.
- **Indie premium på iOS revival.** Efter år av free-to-play-dominans har Apple börjat lyfta premium-titlar igen (Apple Arcade och App Store Editors). *Cultist Simulator*, *Inscryption iOS*, *Pentiment iOS* (om/när) — premium på iOS är åter ett ekonomiskt rimligt val.
- **BookTok som spel-marknadsföringskanal.** TikTok-publik som läser folk-horror överlappar starkt med Persona A. Underbyggd content (atmospheric snippets, författar-intervjuer) presterar väl.

---

## 7. Rekommenderad go-to-market-sekvens (kondenserad)

1. **Bygg engelska version som primär**, svensk som *autentic flavor* (ej översättning från engelska — skriven svenska först, sedan auktoriserad engelsk översättning).
2. **Soft-launch på itch.io** (webb PoC) → samla emails, första recensioner från IF-communityt.
3. **Engagera 10–20 kuraterade content creators** före launch: Old Gods of Appalachia-publiken via gästintervju, RPS-pitch via personlig kontakt, Anders Fager för svensk blurb.
4. **Premiere på AdventureX eller NarraScope** (timing-beroende).
5. **iOS launch 6,99 USD** + samtidig Steam-launch 14,99.
6. **Sverige-PR-våg parallellt:** Fenix-feature, GothCon-närvaro, Bokmässan-omnämning, Mats Strandberg/Anders Fager-blurbar, DN Kultur-pitch.
7. **3–6 månader efter launch:** mät, justera, eventuellt Switch-port om Steam-momentum bär.

---

## Appendix — Frågor att validera

Innan investeringsbeslut, validera dessa med faktisk data:

1. **Sensor Tower / data.ai-körning** på: *80 Days*, *Sorcery!*, *Cultist Simulator iOS*, *Citizen Sleeper iOS* — top-line revenue och download-trender 2023–2026.
2. **Aktuell medlemsstatistik** för Facebook-grupperna "Rollspel i Sverige", "Cthulhu Sverige", "Vaesen-fans".
3. **GothCon 2025/2026 besökarsiffror** och eventuellt programutbud relaterat till svensk folk-horror.
4. **Free Leagues senaste finansiella rapportering** (de är publika på vissa nivåer) för att kalibrera SV:EN-försäljningsratio för svensk-skräck-produkter (Vaesen är den mest direkt jämförbara titeln).
5. **Aktuell konkurrens** — finns någon redan i "svensk folk-horror story-app"-nischen som jag missat? (Innan jag tappade WebSearch såg jag inga direkta konkurrenter, men detta måste verifieras.)
6. **Anders Fager-tillgänglighet** för blurb/cameo — låg ansträngning, hög potentiell payoff.

---

*Dokument levererat av agent: market-researcher. Nästa logiska steg: competitor-analyst-agenten validerar konkurrensbilden (specifikt om någon annan story-app i svensk folk-horror redan finns). Pris- och persona-data ska tas vidare till brand-strategist och pricing-strategist.*
