# Legal Checklist — Mosters Hemligheter

> **Disclaimer:** Detta dokument är en första juridisk riskanalys utförd av en AI-agent — inte en advokat. Inför lansering bör en svensk IT/IP-jurist konsultera dokumentet, särskilt kring varumärkesfrågor (Chaosium, app-namn), GDPR-implementation och Apples granskningsprocess. Flaggade "BLOCKERARE" är åtgärder som måste göras innan release. "GRANSKA" är frågor som kräver juristbedömning.

---

## TL;DR — Top-5 risker & åtgärder

| # | Risk | Allvarlighet | Åtgärd |
|---|------|-------------|--------|
| 1 | **Mental hälsa-tematik (sanity, Alice "förlorar sig själv") triggar regler i DE/KR/CN** | HÖG | Inkludera resurslänk (1177 / lokala motsvarigheter) i appen; undvik direkta självskade-/självmordsskildringar; överväg att inte släppa i CN/KR initialt |
| 2 | **Privacy policy + transparens (även offline) krävs av Apple från första byte data** | HÖG (blockerare) | Skriv `privacy-policy.md` (sv + en), publicera på webb, länka i app + App Store Connect; konfigurera App Privacy Nutrition Labels |
| 3 | **Åldersmärkning hamnar troligen 12+ (kan glida till 17+ om strid/sanity-scener blir explicita)** | MEDEL | Tona ned explicita beskrivningar av våld/självskada i Akt III; fyll i IARC-formuläret konservativt; testa båda nivåerna mot App Store-policy före submission |
| 4 | **Varumärkeskonflikt om vi använder "Call of Cthulhu" i marknadsföring** | MEDEL | Använd ALDRIG "Call of Cthulhu" som titel, undertitel eller i ASO-keywords. Beskriv genren som "kosmisk skräck" / "Lovecraft-inspirerad folk-horror" |
| 5 | **App-namn "Mosters Hemligheter" / "Aunt's Secrets" — låg men ej obefintlig kollisionsrisk** | LÅG–MEDEL | Sök i PRV, EUIPO, USPTO + App Store innan slutgiltigt val. Säkra domän + sociala handles parallellt |

---

## 1. IP-frågor — Lovecraft Mythos

### 1.1 Lovecraft som författare och hans verk

**Status:** H.P. Lovecraft dog 20 mars 1937. Hans verk är **public domain** i:

- **Sverige & EU**: 70 år efter författarens död → fri sedan 1 januari 2008
- **USA**: Komplicerat. Verk publicerade före 1929 är säkert i public domain. För senare verk är upphovsrätten oklar/disputerad — flera av Lovecrafts noveller anses ändå vara PD pga felaktig copyright-förnyelse av Arkham House på 50-talet. Praktiskt: hans Mythos-novelltexter behandlas brett som PD i USA också.
- **De flesta andra jurisdiktioner**: PD (70 år p.m.a. är standard i Berne-konventionen)

**Slutsats:** Vi får fritt citera, parafrasera, och bygga vidare på Lovecrafts texter.

### 1.2 Specifika namn och varelser

| Term | Status | Kan vi använda? |
|------|--------|-----------------|
| "Cthulhu" (varelsen, ordet) | Public domain (skapad av Lovecraft) | **JA** — i texter, scener, dialog |
| "Yog-Sothoth", "Nyarlathotep", "Azathoth", "Shub-Niggurath" | PD (Lovecraft) | JA |
| "Arkham", "Miskatonic University", "Innsmouth", "Dunwich" | PD (Lovecraft) | JA |
| "Necronomicon" | PD (Lovecraft) | JA — men obs! Se nedan |
| "Hastur", "Carcosa", "King in Yellow" | PD (skapade av Chambers/Bierce, äldre än Lovecraft) | JA |
| "Cthulhu Mythos" som *fras* | Skapat av August Derleth (Arkham House), oklart varumärkesläge | GRANSKA — använd hellre "Lovecraft Mythos" eller "kosmisk skräck" |
| **"Call of Cthulhu"** | **Registrerat varumärke av Chaosium Inc.** (för spel) i flera klasser/jurisdiktioner | **NEJ — undvik i app-titel, undertitel, marknadsföring, ASO-keywords** |
| **"Call of Cthulhu" som novelltitel av Lovecraft (publicerad 1928)** | Texten är PD; titeln som *spelmärke* är skyddad | Får citeras som "novellen 'The Call of Cthulhu' av H.P. Lovecraft"; använd ej som spelets titel |
| "Chaosium" | Varumärke | NEJ |
| "Sanity check", "SAN loss" | Generiska speltermer; "sanity" är ett vanligt engelskt ord, men Chaosium har en specifik SAN-mekanik i sitt RPG | **GRANSKA** — vi får använda ordet "sanity" och en sanity-mekanik, men undvik att kopiera Chaosiums exakta regler/formuleringar. Vår term "sanity" i UI är OK; "SAN-procent" eller liknande Chaosium-specifik notation undviks. |

### 1.3 Praktiska riktlinjer för text och marknadsföring

**Får sägas i marknadsföring (säkert):**
- "Lovecraft-inspirerad"
- "Kosmisk skräck"
- "Inspirerad av H.P. Lovecrafts mytologi"
- "Folk-horror möter kosmisk skräck"
- "I traditionen av Lovecraft, Ari Aster och Bergman"

**Bör INTE sägas i marknadsföring (varumärkesrisk):**
- "Call of Cthulhu" (även i jämförelser — använd "klassiska Lovecraft-RPG" om jämförelse behövs)
- "Cthulhu Mythos-rollspel"
- "Officiellt Mythos-spel" / "Chaosium-godkänt"
- Något som antyder licensiering vi inte har

**I själva speltexten:**
- Vi *kan* nämna Cthulhu, Yog-Sothoth etc. som världsbygge — men spelet behöver inte det. Vår story är distinkt (frekvensportaler, svenska sällskapet, Det grå). Rekommendation: **håll mytologin egen**, använd Lovecraft-referenser sparsamt och som inspiration snarare än namn-droppande. Detta minimerar IP-risk och stärker varumärket.

### 1.4 Public domain-material (hymner, äldre texter)

**Lutherska psalmer från 1800-talet:** PD globalt. Texten i story-bible refererar en begravningspsalm — vi får använda originaltext och översättningar äldre än 70 år.

**Bibelcitat:** PD i Sverige (1917 års översättning är PD; Bibel 2000 är © Svenska Bibelsällskapet — undvik direkta citat ur Bibel 2000).

**Lovecraft-citat:** PD, fri användning. Citera gärna med attribution för stilistisk effekt.

**Inspelningar:** PD för texten ≠ PD för inspelningen. Den fiktiva 1962-skivan i storyn är fiktion — ingen risk. Men om vi använder *riktiga* inspelningar/audio: vi behöver verifiera att inspelningen är PD eller licensierad (i Sverige skyddas ljudinspelningar i 70 år efter publicering).

---

## 2. App-namn — trademarksök

### 2.1 "Mosters Hemligheter" (sv)

- **PRV (Sverige):** Sök kategorier 9 (mjukvara), 41 (underhållning) och 28 (spel) innan ansökan
- **EUIPO:** Sök parallellt
- Generiska ord ("mosters", "hemligheter") gör frasen svår att skydda men också svår för andra att blockera
- **Risk:** låg — frasen är beskrivande och inte distinkt nog för någon att äga, men exakt-match kollision är möjlig
- **Åtgärd:** Sök innan release. Om kollision finns, justera till t.ex. "Mosters Hemligheter — Hällmyren" eller liknande

### 2.2 "Aunt's Secrets" (en)

- **USPTO + EUIPO + UK IPO:** Sök innan global lansering
- Mer generiskt — kan finnas oroväckande många träffar i klass 9/41
- **Risk:** medel — engelska generiska titlar är crowded space
- **Alternativ att överväga:**
  - "Hällmyren"
  - "The Hällmyren Tapes"
  - "Aunt Alice's Hymn"
  - "Frequency at Hällmyren"
  - "We Who Seek" (sällskapets motto)
- **Rekommendation:** Säkra Hällmyren som varumärke — distinkt, svenskt, oanvänt. Använd "Aunt's Secrets" som undertitel om vi vill ha det förklarande engelska tilltalet: *"Hällmyren — Aunt's Secrets"*

### 2.3 Generellt om App Store-titlar

- Apple tillåter max 30 tecken i app-titel + max 30 i undertitel
- Apple's App Store guidelines 4.5.2: ingen "spam" eller missvisning genom annans varumärke
- **BLOCKERARE:** "Cthulhu" eller "Call of Cthulhu" i titeln triggar med stor sannolikhet juridisk klagan från Chaosium

---

## 3. Åldersmärkning

### 3.1 Apple App Store Age Rating (via IARC-formulär)

Apple använder en egen IARC-baserad ålderssystem: 4+, 9+, 12+, 17+.

**Frågor i IARC-formuläret som triggar vår nivå:**

| Kategori | Vår status | Bidrag |
|----------|-----------|--------|
| Cartoon/Fantasy Violence | "Infrequent/Mild" | 9+ |
| Realistic Violence | "Infrequent/Mild" — narrativ strid, inte grafisk | 12+ |
| Horror/Fear Themes | **"Frequent/Intense"** — hela genren | **17+ risk om grafiskt** |
| Sexual Content | None | — |
| Profanity / Crude Humor | Infrequent (måttlig svordom?) | 9+ om förekommer |
| Alcohol/Tobacco/Drugs | Mild — vin nämns, ev. cigarettrök | 12+ |
| Mature/Suggestive Themes | "Infrequent" — mental hälsa, dödssorg | 12+ |
| Gambling | None | — |
| User Generated Content | None | — |
| Unrestricted Web Access | None (om vi inte länkar ut) | — |

### 3.2 Trolig utfall

**12+ är troligt utfall** om vi:
- Håller skräcken atmosfärisk snarare än grafisk
- Undviker explicita scener av blod/lemlästning
- Beskriver "Alice förlorar sig" som existentiell sorg snarare än kliniskt psykotiskt sammanbrott
- Inte visar självskade-handlingar visuellt eller med metodbeskrivning

**17+ är risk** om:
- Sanity-scener inkluderar grafiska hallucinationer eller självskade-skildring
- Demonen / Det grå skildras visuellt grotesk
- Vi använder explicit gore i narrativa stridsscener
- "Skräck"-frekvens bedöms av Apple som "Frequent and Intense"

### 3.3 Rekommendation

- **Sikta på 12+**. Det är kommersiellt mer fördelaktigt och passar story-tonen (atmosfärisk skräck, inte splatter).
- **Använd "Frequent/Intense Horror/Fear Themes" om vi är ärliga** — det kan ge 17+. Konsultera Apple-utvecklarsupport eller jurist före submission för att kalibrera.
- **PEGI (om vi släpper i EU på annan plattform):** Troligen PEGI 16 pga "fear" descriptor. Apple följer eget system, men IARC mappas mot PEGI för andra butiker.

---

## 4. GDPR-checklist

### 4.1 Krav på privacy policy

**Krav även för offline-app om:**
- Vi använder analytics (Firebase, Mixpanel, etc.)
- Vi använder crash reporting (Crashlytics, Sentry)
- Vi använder Apple's IDFA eller anonymiserade enhets-ID
- Vi har in-app purchases (Apple hanterar betaldata, men vi länkar)

**BLOCKERARE:** Apple kräver privacy policy URL i App Store Connect för ALLA appar sedan 2018, oavsett om de samlar data. Vi behöver en sida.

### 4.2 Privacy policy — innehållskrav (sv + en)

Måste innehålla:
1. **Personuppgiftsansvarig**: företagsnamn, org.nr, kontakt-e-post
2. **Vad samlas in**: spelarprogress, enhetstyp, OS-version, kraschdata, ev. analytics-events
3. **Rättslig grund**: berättigat intresse (kvalitetssäkring) eller samtycke (analytics)
4. **Mottagare**: ev. tredjepartstjänster (Firebase, Sentry)
5. **Överföring utanför EU**: Firebase = USA. SCC eller Apple's egna avtal måste finnas
6. **Lagringstid**
7. **Användarens rättigheter**: åtkomst, rättelse, radering, dataportabilitet, klagomål till IMY
8. **Cookies/spårning**: gäller inte i app men för marknadsföringssajten
9. **Kontaktuppgift för data subject requests**

### 4.3 Samtycken (consent)

- **Analytics:** GDPR + ePrivacy kräver **opt-in** för icke-nödvändig spårning. Visa en consent-dialog vid första start.
- **Crash reporting:** kan motiveras som berättigat intresse om data är anonymiserad → ingen consent-dialog krävs, men måste nämnas i policy.
- **Apples App Tracking Transparency (ATT):** krävs om vi spårar över appar/webbsidor. Vi gör troligen inte detta → skippa ATT-prompt.

### 4.4 Dataminimering — vad ska vi spara?

| Data | Var | GDPR-status |
|------|-----|-------------|
| Spelarprogress (state-flags, scen, items) | **Lokalt på enhet** | Inte personuppgift om ej kopplad till identitet |
| Användar-ID för cloud save (om vi inför) | Apple iCloud (om vi använder CloudKit) | Apple är personuppgiftsbiträde; deras DPA gäller |
| Analytics-events (anonymiserade) | Firebase/Mixpanel | Personuppgifter pga IP/enhets-ID — kräver consent |
| Krasch-stack-traces | Sentry/Crashlytics | Personuppgifter (kan innehålla enhets-info) — berättigat intresse |
| E-post för newsletter | Egen lista (Mailchimp, etc.) | Tydlig opt-in, separat policy |

**Rekommendation:** Starta så minimalt som möjligt. Endast lokal spara + opt-in crash reporting för MVP. Lägg till analytics endast om vi verkligen behöver datapunkterna och kan motivera.

### 4.5 Apple App Privacy Labels

Måste fyllas i i App Store Connect ("Privacy Nutrition Labels"). Kategorier:
- **Data Used to Track You**: troligen "None"
- **Data Linked to You**: troligen "None" (om vi inte har konto)
- **Data Not Linked to You**: ev. "Diagnostics" om vi har crash reporting

---

## 5. App Store Review Guidelines — relevanta sektioner

### 5.1 1.1 Objectionable Content

- **1.1.1:** "Defamatory, discriminatory, or mean-spirited content" — N/A, story är ej diskriminerande
- **1.1.2:** "Realistic portrayals of people or animals being killed, maimed, tortured, or abused" — **GRANSKA**. Vår sanity-mekanik, narrativ strid, och Det grå's natur kan trigga om scener blir för explicita. Vi har djurdöd i lore (Signe-hundarna) — beskrivs som sorgsen historia, ej grafisk handling.
- **1.1.6:** "False information and features" — N/A

**Rekommendation:**
- Håll allt våld i prosa, beskrivet med restriktion
- Undvik visuella avbildningar av blod eller död
- "Det grå" beskrivs psykologiskt och sensoriskt, inte visuellt monstruöst

### 5.2 1.1.4 — Mental Health

Apple har implicit standard kring innehåll om psykisk ohälsa. Sanity-mekanik **i sig är OK** (många godkända appar har det — Darkest Dungeon, Eldritch Horror digital, etc.). Däremot:

- **Måste undvikas:** Glorifiering av självmord eller självskada, metodbeskrivningar
- **Bör inkluderas:** En hänvisning till hjälpresurser i appens "About"-sektion eller settings (i Sverige: 1177, MIND, Bris för barn — vår målgrupp är 12+/17+ så MIND eller 1177 är rätt)

### 5.3 5.1 Privacy

- **5.1.1:** Privacy policy — täckt ovan
- **5.1.2 (i):** Data minimering, anonymisering — täckt ovan
- **5.1.4:** Kids-kategori: vi är ej i Kids — skippa

### 5.4 4.0 Design

- **4.0:** "Apple customers place a high value on simple, refined, creative, well thought through interfaces"
- **Text-tunga spel ÄR OK** — många exempel: 80 Days, Reigns, Sorcery!, Choice of Games-titlar. Apple godkänner detta utan problem.
- **4.2 Minimum Functionality:** appen måste göra mer än bara visa text. Vår spelmekanik (val, state-flags, sanity, items) räcker väl över tröskeln.

### 5.5 2.3 — Accurate Metadata

App Store-beskrivningen får ej vara missvisande. Vi får inte:
- Påstå "officiellt Cthulhu-spel"
- Använda andras varumärken i screenshots
- Lova features som inte finns

### 5.6 3.0 — Business / In-App Purchases

Om vi har:
- **Premium-köp (engångs):** OK, hanteras via StoreKit
- **Free-to-play med IAP:** mer komplext, ej rekommenderat för denna typ av berättelse-spel
- **Ångerrätt:** Apple hanterar refunds via Apple — vi behöver inte egen process, men måste informera (se sektion 6).

---

## 6. Svensk konsumenträtt

### 6.1 Distansavtalslagen / Lag om digitalt innehåll (2022:818)

Sedan 2022 finns specifik svensk lagstiftning om digitalt innehåll, implementerande EU-direktiv 2019/770.

**Krav:**
- **Tydlig produktinformation** innan köp: vad ingår, plattform, språk, åldersmärkning
- **Information om tillgänglighet och uppdateringar**: om vi lovar uppdateringar, hur länge
- **Lägsta funktionalitet** måste leverera vad som är utlovat — annars konsumenten har rätt till ersättning

### 6.2 Ångerrätt

- **Distansavtalslagen 2 kap. 11 §:** Konsumenten har **14 dagars ångerrätt**.
- **Undantag (2 kap. 11 § p. 11):** "leverans av digitalt innehåll som inte levereras på fysiskt medium, om konsumenten **uttryckligen samtyckt** till att leverans påbörjas under ångerfristen och **bekräftat att han eller hon förlorar ångerrätten genom detta**".
- **Praktiskt:** Apple App Store hanterar detta via sin "Buy Now" — användaren samtycker via Apple's villkor.
- **Måste informeras:** App Store-beskrivningen på svenska bör innehålla en formulering om att ångerrätten upphör när nedladdning påbörjas, samt hänvisa till Apple's refund-process.

### 6.3 Svensk App Store-beskrivning bör innehålla

- **Företagsnamn och kontaktuppgift** (krav)
- **Pris inkl. moms** (Apple sköter)
- **Åldersmärkning** (Apple visar)
- **Språk och kompatibilitet** (Apple visar)
- **Innehållsvarning** (rekommendation): "Spelet innehåller skräck-tematik och referenser till psykisk ohälsa."
- **Hänvisning till hjälpresurser** (rekommendation): "Behöver du prata med någon? Ring 1177 eller besök mind.se."
- **Privacy policy URL** (krav)

### 6.4 Reklamationsrätt — 3 år

Konsumenten har 3 års reklamationsrätt på digitala produkter. Praktiskt: om appen slutar fungera pga uppdatering, måste vi fixa eller refundera. Apple hanterar refunds men ansvaret är vårt.

---

## 7. Mental hälsa-tematik — marknadsspecifika regler

### 7.1 Tyskland

- **USK (Unterhaltungssoftware Selbstkontrolle):** Tysk åldersmärkning. Apple använder IARC som motsvarar.
- **Specifika regler:** Tyskland har historiskt strikt syn på våld/skräck. Vi bedömer USK 12 eller USK 16 troligt.
- **Inget förbud** mot sanity-mekanik eller mental hälsa-teman — men det måste hanteras med viss värdighet. Spel som *Hellblade: Senua's Sacrifice* är godkänt och hyllat i DE.

### 7.2 Sydkorea

- **GRAC (Game Rating and Administration Committee):** kräver formell rating för spel sålda i Korea.
- **Apple App Store:** Apple hanterar GRAC-rating via deras IARC-flöde — vi behöver inte ansöka separat.
- **Potentiellt problem:** Koreas regler kring självmord/självskada är strikta. Vår sanity-mekanik och Alice's tillstånd kan behöva justering eller varningstext.
- **Rekommendation:** **Pausa Korea-launch** tills vi har klart vad sanity-scenerna konkret visar. Be juridisk rådgivare granska scen-content innan vi sätter "available in South Korea".

### 7.3 Kina

- **Strikta regler:** Kina kräver licens (ISBN-nummer från NPPA) för alla spel inkl. mobilspel. Få utländska spel får detta.
- **Innehållsförbud:** övernaturligt innehåll, "spöken", religion, mental ohälsa är politiskt känsligt
- **Rekommendation:** **Släpp INTE i Kinas App Store**. Det skulle kräva omfattande omarbetning av storyn och troligen ändå nekas.

### 7.4 Andra marknader att överväga

- **Australien:** Australian Classification Board kan ge MA15+ för intensiv skräck. Apple hanterar via IARC.
- **UK:** PEGI 16 troligen. Inga särskilda problem.
- **Mellanöstern (UAE, Saudi):** övernaturligt innehåll kan vara problematiskt. Granska före launch.

### 7.5 Konkreta rekommendationer kring sanity-mekanik

1. **Använd termen "stabilitet" eller "fattning"** istället för "sanity" i svensk text? Eventuellt. Engelsk text behåller "sanity" som genre-standard. **Diskutera med game-designer**.
2. **Alice's tillstånd** beskrivs som sorg och fastsittande, inte som klinisk diagnos. Vi diagnostiserar inte karaktärer.
3. **Inkludera resursnummer i appen** (Settings → About → "Behöver du någon att prata med?"). Detta är både etiskt rätt och en mjuk-skydd mot regulatoriska klagomål.
4. **Innehållsvarning vid första start**: "Detta spel innehåller skräck-tematik samt referenser till sorg och psykisk hälsa. Spelet är inte avsett som beskrivning av verkliga psykiska tillstånd."

---

## 8. Influencer/creator-marketing — svenska regler

### 8.1 Marknadsföringslagen (2008:486)

- **Reklam måste vara identifierbar som reklam.** Tydlighet är lagkrav.
- **Konsumentverkets vägledning för influencer-marketing (2019, uppdaterad löpande):**
  - "Reklam" / "Annons" / "Sponsrat" / "Betalt samarbete" ska anges **tydligt i början av posten**
  - Vaga formuleringar som "tack till X" eller "samarbete" räcker inte
  - Detta gäller även produktrecensioner i utbyte mot gratis produkt eller åtkomst

### 8.2 Praktisk checklist för influencer-samarbete

- Skriftligt avtal mellan oss och influencer
- Avtalet ska kräva att influencer märker innehållet enligt KO:s vägledning
- Vi ansvarar enligt MFL för att influencer faktiskt märker — det är inte bara deras ansvar
- Spara dokumentation av samarbete i 5 år
- Vid betalda recensioner ska influencer ange "Reklam" eller "Betalt samarbete med [vårt företag]" i början av video/inlägg

### 8.3 Specifika YouTubers / streamers som spelar igenom storyn

- Att skicka gratis nyckel + be om recension = betalt samarbete enligt KO
- Att skicka gratis nyckel utan villkor (ren PR) = gråzon, säkrast att be om märkning
- Att skicka nyckel + betala dem = otvetydigt reklam, märkning krävs

### 8.4 Apple's regler

Apple förbjuder "review manipulation" — vi får inte betala för positiva App Store-recensioner. Influencer kan recensera på YouTube/TikTok, men inte i App Store mot betalning.

---

## 9. Övrigt — varningsflaggor och nästa steg

### 9.1 BLOCKERARE (måste lösas före submission)

- [ ] Privacy policy publicerad (sv + en)
- [ ] App-namn slutgiltigt + trademark-sökt
- [ ] Apple Developer Account konfigurerad
- [ ] IARC-formuläret ifyllt
- [ ] Innehållsvarning + hjälpresurs i appen
- [ ] Apple Privacy Labels ifyllda

### 9.2 GRANSKA (kräver juristbedömning eller stämning av av project-lead)

- [ ] Slutgiltig formulering av sanity-mekanikens texter (etisk granskning + DE/KR-anpassning)
- [ ] Lansering i Korea — pausa eller inte
- [ ] Kontrollera om vi vill registrera "Hällmyren" som varumärke
- [ ] Avtal med ev. influencers
- [ ] Om vi använder riktiga inspelningar/musik — licensiering

### 9.3 Rekommenderad timeline

| Fas | Vecka | Aktivitet |
|-----|-------|-----------|
| Pre-prod | -8 | Trademark-sök på app-namn |
| Pre-prod | -8 | Skriv privacy policy v1 |
| Beta | -4 | Sanity-text-granskning, innehållsvarning implementerad |
| Beta | -2 | Submit till TestFlight, IARC-formulär |
| Launch | 0 | App Store-submission, marknadsföringskampanj med tydlig reklammärkning |

### 9.4 Slutord

Spelet är **legalt klart genomförbart**. Inga absoluta blockerare i konceptet. De största riskerna är **operativa** (privacy policy, märkningar, varumärkesundvikande av Chaosium) snarare än **innehållsliga**.

**Inför launch konsultera:**
1. Svensk IT-jurist för privacy policy + konsumentvillkor (1–2 tim räcker långt)
2. Varumärkesjurist för namn-validering och ev. ansökan
3. Eventuellt en svensk-baserad rådgivare med spelvana för Apple-relationen och åldersmärkning
