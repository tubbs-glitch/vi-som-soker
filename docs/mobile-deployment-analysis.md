# Mobil-deployment — PoC → telefon

Analys av hur du tar nuvarande Next.js-webb-PoC till en mobiltelefon (iOS primärt enligt projekt-bibel, Android ofta gratis på köpet). Fyra realistiska vägar, rankade efter ROI för en PoC.

## TL;DR

**Rekommendation: börja med PWA + Capacitor.**

PWA tar 1-2 timmar och låter dig dela en länk som folk installerar på hemskärmen. Capacitor tar ytterligare 4-8 timmar och ger dig en riktig `.ipa`-fil som körs på iPhone (TestFlight) och `.apk` för Android. Hela story-engine och UI:t är oförändrat — bara förpackning.

Spara **native SwiftUI-rewrite** till efter att story-stommen är validerad. Det är 4-6 veckor jobb och betalar sig först när PoC:n är produktklar.

---

## Alternativ jämförda

### 1. PWA (Progressive Web App) — 1-2 timmar

**Vad det är**: lägg till `manifest.json` + service worker. Användaren öppnar appen i Safari/Chrome, väljer "Lägg till på hemskärmen". Ikon hamnar bland appikoner, öppnas i fullskärm utan adressfält.

**För**:
- **Snabbast möjliga väg** — i princip bara konfigurationsfiler
- Ingen app store, ingen Apple Developer Account ($99/år) nödvändig
- Distribution = dela en länk
- Auto-uppdateras (hostad sajt = senaste versionen)
- Offline-stöd via service worker (cachning av scen-filer + bilder)

**Mot**:
- **Ingen TestFlight, ingen App Store-närvaro** — användare måste hitta länken
- **Sämre haptik och native känsla** (men för en story-app spelar det mindre roll)
- Audio kräver fortfarande user-gesture för att starta (gäller överallt iOS)
- Push-notiser begränsade på iOS

**När välja**: du vill testa story-PoC:n på telefon snabbt och hostat på t.ex. Vercel.

**Konkreta steg**:
```bash
# I web/
npm i next-pwa
# Skapa web/public/manifest.json + ikoner (192x192, 512x512)
# Konfigurera next.config.mjs med next-pwa
```

---

### 2. Capacitor — 4-8 timmar för första bygge

**Vad det är**: Ionic-teamets verktyg. Wrapar din Next.js-app i en native WKWebView (iOS) eller WebView (Android). Bygger en riktig `.ipa` / `.apk`. Identiskt UI som webben, men appen installeras som vanlig native app.

**För**:
- **App Store + Google Play distribution** möjlig
- **TestFlight** för intern testning
- Tillgång till native-API:er via Capacitor-plugins (haptik, push, kamera, fil-system, audio)
- Story-engine och UI oförändrat — du återanvänder hela webben
- Stabilt: byggt av Ionic-teamet, tusentals appar i produktion

**Mot**:
- **Kräver Mac + Xcode** (du har det, bra)
- **Apple Developer Account** ($99/år) för riktig iOS-distribution
- Audio-context-restriktioner samma som webb (kräver tap för att starta)
- Större app-size än native (50-80MB)
- Webb-prestanda — fungerar bra för story-spel, sämre för 60fps-spel

**När välja**: när du vill kunna pusha en TestFlight-build till testare och dela en riktig App Store-länk.

**Konkreta steg**:
```bash
# I web/
npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init "Vi som söker" "se.visomsoker.app" --web-dir=out
# Next.js static export i next.config.mjs: output: "export"
npm run build
npx cap add ios
npx cap add android
npx cap sync
npx cap open ios   # öppnar Xcode
```

**Static export caveats**: vi använder API routes idag (`/api/scenes/...`). Vi behöver antingen:
- Konvertera till statisk content-loading (bygg scen-JSON vid build)
- Eller köra en separat backend och peka Capacitor-appen mot den

Bättre att gå statisk för PoC. Det är en eftermiddag att fixa.

---

### 3. Expo / React Native — 2-4 veckor

**Vad det är**: skriv om UI:t i React Native (samma React-API men native komponenter). Story-engine kan portas som-den-är (rent TS). Audio kräver omskrivning.

**För**:
- **Riktigt native** känsla, animationer, prestanda
- **Expo Go** för enkel utveckling på telefon
- Cross-platform iOS + Android
- Push-notiser, haptik, alla native-API:er

**Mot**:
- **Halverad bibliotek-tillgänglighet** jämfört med webb (men du behöver inte mycket)
- **Audio måste skrivas om** — Web Audio API → `expo-av` (väsentligen annorlunda API)
- **HouseMap SVG** måste portas till `react-native-svg`
- Tailwind-stylar behöver portas till NativeWind eller stylesheet
- 2-4 veckor med en utvecklare, längre om man vill ha den polerade webbkänslan

**När välja**: när PoC:n är validerad och du vill ha bästa möjliga native känsla, men inte vill bygga separat iOS-app.

---

### 4. Native SwiftUI — 4-6 veckor (originalplanen per CLAUDE.md)

**Vad det är**: skriv om UI:t i Swift/SwiftUI. Story-engine portas till Swift Package (frontend-dev har redan exponerat ett rent TypeScript-API som ska speglas).

**För**:
- **Bästa möjliga iOS-känsla** — riktig native haptik, animationer, system-fonts
- App Store-vänligast
- Mindre app-size, snabbare startup
- Lättast att integrera CloudKit för sync

**Mot**:
- **Inte cross-platform** (Android separat, eller släpp Android)
- **Ingen återanvändning** av React-UI:t — allt ritas om
- **Audio måste skrivas om** med AVFoundation
- **HouseMap** måste ritas om i SwiftUI Canvas / Shape
- 4-6 veckor minimum för polished build
- Inga snabba iterations — varje text-ändring kräver rebuild

**När välja**: post-PoC, när story och mekanik är låsta och du vill polera mot App Store-launch.

---

## Rekommenderad sekvens

### Fas A — denna vecka: PWA
Mål: dela en länk med vänner, få första feedback från telefonen.
- Skapa manifest.json + ikoner (16 timmar, jag kan göra med agent)
- Konfigurera next-pwa
- Deploy till Vercel (gratis tier räcker)
- Dela URL

### Fas B — när story är 80% klar: Capacitor
Mål: TestFlight-distribution, möjlighet att skicka builds till playtestare.
- Konvertera scen-loading till statisk export
- `npx cap add ios` + Xcode-konfig
- Apple Developer Account
- TestFlight-bygge
- Lägg till audio som plays-on-tap (rätt även på webb)

### Fas C — när story är 100% klar och validerad: native SwiftUI
Mål: App Store-release med högsta produktion.
- Spawn ny `ios-dev` agent
- Port story-engine till Swift
- Port HouseMap, RitualScene, alla skärmar
- Rich haptik, audio via AVFoundation
- App Store submission

---

## Vad jag rekommenderar du gör härnäst

1. **Vänta in test-rapporten** från game-tester-agenten (kommer snart)
2. **Bestäm vad du vill testa på telefon**:
   - Bara spelflödet? → PWA räcker
   - Vill du dela med playtestare i App Store-format? → Capacitor
   - Är PoC:n redo för polish? → Börja SwiftUI-rewriten
3. Säg till så drar jag igång rätt agent / bygger rätt steg.

---

## Audio på mobil — speciellt att veta

iOS Safari är **strikt** med autoplay. Vår nuvarande lösning (kräver tap på 🔊-knappen för att låsa upp) funkar både på webben och i Capacitor. PWA = identisk. RN/SwiftUI = annan API men samma restriktion.

Volym på iOS är låst till systemvolymen. Vi kan inte göra hymnen "lite tystare" — användaren kontrollerar.

Vibration / haptik tillgänglig först i Capacitor + RN + native. Webb-haptik existerar men funkar oftast inte på iOS Safari.

---

## Frågor till dig

- Vill du börja med PWA omedelbart, eller hoppa direkt till Capacitor?
- Har du en Apple Developer Account ($99/år) eller behöver vi börja med tjej-developer-cert?
- Ska Android vara med i PoC eller är iOS-only OK för start?
