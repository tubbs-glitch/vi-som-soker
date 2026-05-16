# Character Creation — Mosters Hemligheter

> Spec för startflödet. Spelaren ska komma igång på under 2 minuter och känna att de börjar en bok, inte ett Skyrim-menytrångmål.
> **Designmål:** Spelaren ska aldrig öppna en räknesnurra. Allt val är textbaserat och prosaiskt.

---

## 1. Översikt — 5 steg

```
[ Start ]
   v
1. Kön & namn          (~20 s)
   v
2. Utseende            (~20 s)
   v
3. Bakgrund            (~30 s)   <- viktigaste valet
   v
4. Stats (granska)     (~20 s)
   v
5. Packning            (~30 s)   <- introducerar inventory-systemet
   v
[ scene-001 — Samtalet ]
```

**Total tid: ~2 minuter.** Inget steg får ta mer än 30 sekunder att förstå. Inga sliders. Inga procent. Inga "OK / Cancel" — bara nästa steg.

---

## 2. Designprinciper

1. **Char creation är scen 0, inte en meny.** Skärmen är textbaserad i samma layout som scenerna. Varje steg har en kort prosa-inledning.
2. **Inga "bästa" arketyper.** Var och en av de fyra bakgrunderna öppnar unika vägar i storyn. Spelaren ska inte kunna "räkna ut" optimering.
3. **Stats är synliga men inte centrala.** Spelaren ser dem som beskrivande etiketter, inte tal — exakta värden finns i koden, men UI visar "starkt" / "+" / "stark hand", inte "STY 7".
4. **Varje val kommer tillbaka i berättelsen.** Hårfärg nämns när Gunnar ser dig första gången. Kännetecknet nämns i scene-036 om Alice tittar på dig. Bakgrunden formar konkreta dialog-alternativ.
5. **Spelaren kan hoppa över de flesta stegen.** Namn = "Du", kön = "lämna otydligt", utseende = "default". Bara bakgrunden är obligatoriskt — och även där kan spelaren välja "lämna det öppet" → då tilldelas balanserade default-stats utan arketypspecifik dialog.

---

## 3. Steg-för-steg-specifikation

### Steg 1 — Kön & namn

**Prosa-introduktion (60 ord):**

> Innan du tar luren och hör Gunnars röst — du är någon. Inte en hjälte, inte en utvald. Bara någon som råkar få samtalet. Vem är du?

**Val 1.1 — Kön:**
- Man
- Kvinna
- Ickebinär
- *Lämna otydligt* (default — berättarrösten använder bara "du", inga pronomen för spelaren)

*Konsekvens:* Påverkar små detaljer i några scener (Gunnar säger "grabben" / "tjejen" / inget). Påverkar INGA gates eller slut.

**Val 1.2 — Namn:**
- Textinput (valfritt). Default: tomt → berättaren säger "du" och Alice säger "kära" / "kärast".
- Förslag visas: "Vill du heta något? Annars kallar Alice dig 'kära' när vi möts." (Inga drop-downs eller listor.)

---

### Steg 2 — Utseende

**Prosa-introduktion (40 ord):**

> Du har inte tittat dig i spegeln på flera timmar. Men om du gjorde det nu, vad skulle du se?

**Val 2.1 — Hårfärg:** mörkt / ljust / rödaktigt / grånat tidigt (var: ett av fyra ord).

**Val 2.2 — Statur:** smal / vanlig / tung / senig.

**Val 2.3 — Ett kännetecken (valfritt):**
- En blek ärr över ena ögonbrynet
- En ringfinger som inte rör sig som den ska
- En tatuering på underarmen, gammal, oläslig nu
- En örhängering du fortfarande bär
- Inget speciellt

*Konsekvens:* Nämnda i scene-008 (Gunnar ser dig), scene-024 (du ser dig själv i ett dammigt fönster i mejeriet), scene-036 (Alice tittar på dig). Inga gates.

---

### Steg 3 — Bakgrund (viktigast)

Detta är spelarens **enda riktigt mekaniska val**. Det sätter startstats och tre dialogalternativ som bara den arketypen har.

**Prosa-introduktion (50 ord):**

> Du är trettioett år. Du har en lägenhet i Stockholm och ett liv där du inte tänker så mycket på Alice. Men du blev den person du är genom något. Vad har format dig mest?

**Fyra arketyper:**

#### A) Den studerande
> *Du läste in en examen som ingen i din familj hade. Du läser fortfarande mer än folk i din ålder. Du har läst om gränssituationer i journalpapper, inte i Reddit-trådar.*

- Startstats: STY 3, DEX 4, **FÖR 8**, MOD 5
- Unika dialog-alternativ:
  - I scene-014 (Leopolds arbetsrum): du kan dechiffrera lab-anteckningarna utan att förlora sanity
  - I scene-031 (ritualen): du kan identifiera takt 47 utan att ha läst Alices pärm
  - I scene-037 (Det grå): en specifik replik om frekvenser och membran
- Tema: kunskap som skydd — och som börda

#### B) Den fysiska
> *Du har alltid använt händerna. Du fixar saker. Du är inte rädd för att bryta upp en låst dörr eller bära någon ut. Du tänker med kroppen.*

- Startstats: **STY 7**, **DEX 6**, FÖR 4, MOD 5
- Unika dialog-alternativ:
  - I scene-024 (mejeriet): du kan bryta upp dörren utan att skada dig (skippar wound)
  - I scene-027 (vedboden): du kan laga säkringsskåpet snabbare → en extra sanity-bevarande beat
  - I scene-037 (Det grå): du kan välja **strid** med ett av flera vapen om du har det
- Tema: kroppen vet något hjärnan inte kan formulera

#### C) Den empatiska
> *Du läser rum. Du minns vad folk inte säger. Du har varit den som blir uppringd när någon mår dåligt — kanske för att du var den som tog hand om mamma efter pappa.*

- Startstats: STY 4, DEX 5, FÖR 5, **MOD 7**
- Unika dialog-alternativ:
  - I scene-008 (Gunnar): du kan ställa frågan om hans far utan att förlora `gunnar_tillit`
  - I scene-021 (vinden): du kan **tala lugnt** även utan vinds_mat
  - I scene-036 (Alice): du har en hel replikgren som handlar om sorg snarare än argument — den enda vägen att övertyga Alice utan att ha läst dagboken noga
- Tema: omsorg som styrka, inte svaghet

#### D) Den ifrågasättande
> *Du har aldrig accepterat ett svar på första försöket. Du blev fackförbundsmedlem av en slump och stannade för att du gillade att läsa avtal. Du tror inte på saker du inte sett själv.*

- Startstats: STY 4, DEX 5, **FÖR 6**, **MOD 6**
- Unika dialog-alternativ:
  - I scene-005 (macken): du ställer en extra fråga som ger spelaren `vet_om_sallskapet_rykte` även vid "korta svar"
  - I scene-017 (Alices dagbok): du noterar marginalanteckningen utan att förlora sanity
  - I scene-029 (vägen-valet): du har en fjärde intention — **"jag bestämmer när jag förstår"** — som ger flexibilitet i Akt III utan obeslutsam-debuffen
- Tema: skepticism som rustning mot — och hinder för — att tro på det otroliga

#### Default (om spelaren hoppar över)
- Stats: STY 5, DEX 5, FÖR 5, MOD 5
- Inga arketypspecifika dialog-alternativ
- Spelet är fullt spelbart men du missar ungefär 8 unika scen-repliker

---

### Steg 4 — Stats granska & justera

**Prosa-introduktion (30 ord):**

> Det här är vem du är just nu. Justera om något känns fel. Du kan flytta en poäng från en sak du tycker du är stark i, till en sak du tycker du borde vara bättre på.

**UI:** Stats visas som **textbaserade etiketter**, inte tal.

| Värde | Etikett (visas) |
|---|---|
| 1–2 | "påtagligt svag" |
| 3–4 | "lite svag" |
| 5 | "vanlig" |
| 6–7 | "stark" |
| 8–9 | "påtagligt stark" |
| 10 | "exceptionell" |

Spelaren ser dem som:

```
Du är:
  - Förstånd:   påtagligt stark   [-]  [+]
  - Mod:        vanlig            [-]  [+]
  - Smidighet:  lite svag         [-]  [+]
  - Styrka:     lite svag         [-]  [+]
```

**Justeringsregel:** Spelaren har **1 flytt** — kan ta en poäng från en stat och lägga på en annan. Inget annat. (Detta är `+1 / -1`-typ av justering, inte en pool.)

Om spelaren inte vill justera: bekräfta och gå vidare.

**Stats-definitioner (visa som tooltip på etiketten):**

- **Styrka (STY)** — kropp, lyfta, bära, bryta upp. *"Hur mycket din kropp kan göra när situationen kräver."*
- **Smidighet (DEX)** — händer, balans, smyga. *"Hur snabbt du rör dig och hur exakt händerna är."*
- **Förstånd (FÖR)** — läsa, dechiffrera, minnas detaljer. *"Hur väl du läser en text, en plats, en människa."*
- **Mod (MOD)** — stå kvar, tala när det är svårt, hålla huvudet kallt. *"Hur länge du kan stå kvar när du borde gå."*

---

### Steg 5 — Packning

Packningen är **scene-002 i prototyp**, men i char creation-flödet visas den som femte steget innan scene-001 startar. (Det här är ett designval för att introducera tagg-systemet *innan* spelaren har emotionell investering i scenen.)

**Prosa-introduktion (40 ord):**

> Klockan är 02:14. Du har precis lagt på luren. Du står i din lägenhet och ser dig om. Vad du tar med dig nu påverkar hela resan. Du kan ta fem saker.

**Val 5.1 — Packa upp till 5 items:**

Visas som lista av sju items med kort beskrivning. Spelaren bockar för upp till fem. (Se fullständig spec i `equipment-system.md §4`.)

```
[ ] Ficklampa                    "Du har använt den när elen gått."
[ ] Jaktkniv (ärvd från far)     "Du tog över den när han dog. Du har aldrig använt den."
[ ] Kassettbandspelare           "Den fungerar fortfarande. Du har inte använt den på år."
[ ] Mobilladdare                 "Standard. Du tar alltid med den."
[ ] Första-hjälpen-kit           "Olämpligt liten, men finns."
[ ] Varma kläder                 "Du minns att Hällmyren är norr."
[ ] Extra batterier              "AA. Du vet inte varför du har så många."
```

**Påminnelse i UI:** "Du kan inte ändra packning efter du lämnat lägenheten."

(Detta är en **röd check** — engångsval. Vi flaggar det inte explicit men spelaren förstår tonen.)

---

## 4. Övergång till scene-001

Efter steg 5 visas en kort övergångstext (~30 ord):

> Du packar din väska. Du står i hallen ett ögonblick med jackan i handen. Klockan på spisen visar 02:18. Du vänder dig om — det är något du glömt.
>
> Då ringer telefonen.

Och scene-001 startar.

*Designanmärkning:* Detta bryter mot kanon (scene-001 i `scenes/scene-001.sv.md` öppnar med 23:00 och samtalet kommer tidigare). **Förslag till project-lead:** ompröva scene-001 så den börjar *före* packningen, eller flytta packningen till scene-002 som den var tänkt. Vi rekommenderar det senare — då blir char creation steg 1–4 + en separat scen-002 efter samtalet, vilket är det ursprungliga upplägget. Se öppen designfråga §6.

---

## 5. UI / interaktionsmall

Char creation följer exakt samma rendering som en vanlig scen:
- Prosa-text överst
- Val-knappar längst ner
- Inga progress-bars, inga "steg X av Y"-indikator (vi vill inte signalera spel-tutorial)
- Spelaren kan inte gå tillbaka mellan stegen (en gång valt = valt). Detta speglar spelets övergripande filosofi.

**Mörkt tema, serif-font, generösa marginaler.** Sätter ton från första skärmen.

---

## 6. Öppna designfrågor till project-lead

1. **Var ligger packningen?** Två alternativ:
   - (A) I char creation som steg 5 — *enklare flöde, men bryter mot story-bibelns scene-001-prosa*
   - (B) Som scene-002 efter samtalet — *originell plan, men gör char creation till bara 4 steg och separerar mekanik från fiktion*
   - **Rekommendation: B.** Char creation blir 4 steg (kön/namn, utseende, bakgrund, stats-granska). scene-002 är packningen som det står i scene-map.md.

2. **Får spelaren ändra bakgrund efter scene-001?** Förslag: nej. Char creation är permanent — det är spelets premissa.

3. **Visas bakgrundsnamn ("Den studerande") som etikett under spelet?** Förslag: nej. Bakgrund är osynlig efter steg 3 — den manifesteras bara i unika dialogalternativ.
