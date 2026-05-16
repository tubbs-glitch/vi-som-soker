# Game Systems — Mosters Hemligheter

> Översikt över alla mekaniska system i spelet och hur de relaterar. Mekanik tjänar fiktion, aldrig tvärtom. Inget system får finnas bara för "spelets skull".
> **Förutsättningar:** Detta dokument förutsätter att du har läst `story-bible.md`, `plot-outline.md` och `state-flags.md`. Vi utökar inte ersätter.

---

## 1. Designprinciper

Alla system i spelet följer fem grundregler. Om en mekanik bryter mot någon av dessa — ta bort den.

1. **Mekaniken är osynlig om den fungerar.** Spelaren ska känna sig som hjälten i en bok, inte en kalkylblad-användare. Siffror finns men visas sparsamt och alltid i prosa-konsekvens, inte i en flytande HUD.
2. **Ingen "game over" från en skill check.** En misslyckad check är inte död — den är en annan väg framåt, ofta intressantare. Vi tar bort fail-states, inte konsekvenser.
3. **Stats är gates, inte träffsannolikhet.** Vi rullar aldrig tärningar. Ett krav är ett krav: `Mod ≥ 5` är antingen sant eller falskt. Spelaren ser det innan valet, så valet är taktiskt, inte slumpartat.
4. **Konsekvenser ackumulerar, kollapsar inte.** Sanity sjunker över tid. Ett ärr stannar. Men ingen enskild scen tar slut för att ett värde nådde noll.
5. **Bottleneckar normaliserar.** Mellan akterna fångas state upp och stabiliseras så att alla spelare har en spelbar grundnivå.

---

## 2. Systemen i översikt

Spelet har **sju sammankopplade system**. Varje system beskrivs i egen fil — denna sida är kartan.

```
                  ┌──────────────────────────┐
                  │      CHARACTER STATE     │
                  │  (data-model.md)         │
                  └──────────────┬───────────┘
                                 │
       ┌─────────────────────────┼─────────────────────────┐
       │                         │                         │
┌──────▼───────┐         ┌───────▼─────────┐       ┌──────▼───────┐
│   STATS      │         │     SANITY      │       │   WOUNDS     │
│   (4 st)     │         │    (0–100)      │       │   (taggar)   │
│  gate-check  │         │  beskrivande    │       │  som flaggor │
└──────┬───────┘         └────────┬────────┘       └──────┬───────┘
       │                          │                       │
       └──────────┬───────────────┴───────────┬───────────┘
                  │                           │
        ┌─────────▼─────────┐       ┌─────────▼─────────┐
        │    INVENTORY      │       │    RELATIONS      │
        │  (tagg-baserat)   │       │ (alice, gunnar…)  │
        │ equipment-system  │       │  state-flags.md   │
        └─────────┬─────────┘       └─────────┬─────────┘
                  │                           │
                  └─────────┬─────────────────┘
                            │
                  ┌─────────▼──────────┐
                  │   CHOICE GATES     │
                  │ (combat-spec.md +  │
                  │ choice-architecture)│
                  └────────────────────┘
```

### 2.1 Stats (4 st)

- **Styrka, Smidighet, Förstånd, Mod** — siffror i intervall 0–10, syns för spelaren som "+" / "starkt" / "svagt", aldrig som rådata.
- Används som **gates** på val: `[Bryt upp dörren — kräver Styrka 5]`.
- Sätts vid char creation (se `character-creation.md`). Förändras sällan, men kan boostas tillfälligt av items/scener.
- **Misslyckad gate = annan väg.** Aldrig "du kan inte göra något".

### 2.2 Sanity (0–100)

- **Mätare av spelarens grepp om verkligheten.** Inte HP. Inte synlig som siffra.
- Visas som beskrivande tillstånd: *fokuserad / skakad / vacklande / söndertrasad / avgrund*.
- Trösklar låser upp / stänger dialog-grenar (se `state-flags.md §1`).
- **Hög sanity är en spelstil.** Att hålla över 70 hela vägen ger Slut 1B-vägen i Akt III.
- Detaljspec finns i `state-flags.md`; här endast hur den interagerar med övriga system.

### 2.3 Wounds (tagg-baserade)

**Beslut: inget separat HP-värde.** I stället hanteras fysisk skada som **persistenta tag-flaggor** på karaktären — varje wound är en flagga, inte ett deltal av ett livfält.

- **Varför inte HP?** För att Disco Elysium-modellen passar fiktionen bättre. Spelaren får inte räkna kvarvarande liv. Skada är beskrivande: "Du blöder från handflatan." Den taggen kan gate-checka val ("Du kan inte hålla i bandspelaren med en blödande hand") och påverka sanity-drift, men leder aldrig direkt till död.
- **Wounds-taxonomi (5 möjliga):** `skuren_hand`, `kontusion_skalle`, `vriden_ankel`, `andnod`, `kallnad_märg` (mental–fysisk hybrid, sätts av att stå för länge i Det grå).
- **Hur de uppstår:** av specifika val eller misslyckade gates, aldrig av stat-rullning.
- **Hur de läker:** vissa heals med **vård**-tagg-item, andra med vila i en hub-scen, en del bär spelaren med sig till slutet (där de färgar epilogen).
- **Wounds är inte fail-states.** Maximum tre samtidigt — flerwounds-spelaren har en specifik sanity-debuff och en alternativ slutscen-flagga.

### 2.4 Inventory (tagg-baserat)

Full spec i `equipment-system.md`. Sammanfattning:
- 5-items packnings-cap vid start; växbart under spelets gång.
- Varje item bär 1–3 taggar (`ljus`, `skarpt`, `frekvens`, `ritual`, etc.).
- Val gate-checkar på tagg, inte på specifikt item.
- "Förbrukning" beslutas per item (kassettbandspelare förbrukar batterier; tjärsten förbrukas i ritualen; jaktkniv behålls).

### 2.5 Relations

Värden för Alice, Leopold, Gunnar, mamma, Det grå, vinds-tinget, Ingegerd-ekot, Bertil-ekot, Astrid-ekot. Se `state-flags.md §4`.
- Gate-checkar på relation-värde låser upp dialog-grenar i Akt III.
- Inga "gifts" eller min-max-systematik — relations ändras av handling, inte av kalibrering.

### 2.6 Choices & Choice gates

Detaljspec finns i `choice-architecture.md` och `combat-spec.md`. Här endast principen:
- Varje val kan ha 0–N **gate-villkor** (item-tagg, stat-värde, sanity-tröskel, flagga).
- Om gate fail = val visas grått eller helt dolt (frontend-dev avgör per scen).
- **Vit check vs röd check (Disco Elysium):**
  - **Vit check**: spelaren kan komma tillbaka när villkoret förändrats (t.ex. hittat ny info, höjt en relation).
  - **Röd check**: engångschans. Misslyckas den eller väljs den inte, är vägen stängd för spelet.
- Vi flaggar checks i scen-handlers, inte i UI — spelaren ser bara texten.

### 2.7 Save / load

Ett state-objekt (se `data-model.md`) skrivs till localStorage efter varje scen-övergång. Vid backend: samma objekt POST:as. **Auto-save bara — ingen save/load-meny.** Det är ett Lone Wolf-spel; vi vill att val bär vikt.

---

## 3. Hur systemen spelar ihop — tre kanoniska exempel

### Exempel A — Vinds-mötet (scene-021)

```
INPUT STATE:
  inventory: [ficklampa, kassettbandspelare, varma_kläder, vinds_mat, batterier]
  stats: { sty: 4, dex: 6, för: 7, mod: 5 }
  sanity: 78 (skakad)
  wounds: []

SCENEN VISAR FÖLJANDE VAL:
  [ Lys på det — kräver tag:ljus ]              → har ljus, valbart
  [ Mata det — kräver item:vinds_mat ]          → har mat, valbart
  [ Försök tala lugnt — kräver Mod 5 ]          → Mod = 5, valbart
  [ Backa och stäng dörren ]                    → alltid valbart
  [ Skär det — kräver tag:skarpt + Mod 4 ]      → SAKNAR skarpt, dold
  [ Kasta lampan på det — RÖD CHECK ]           → har ljus, men FÖRBRUKAR den

KONSEKVENS AV "MATA":
  - relations.vinds_tinget +2
  - vinds_tinget_status = "matat"
  - sanity -10 (du har sett vad det är)
  - inventory: remove "vinds_mat"
  - inga wounds
```

### Exempel B — Forcera mejeriet (scene-024)

```
INPUT STATE:
  inventory: [jaktkniv, ficklampa, ...]
  stats: { sty: 6 }
  har_mejerinyckel: false

SCENEN VISAR:
  [ Använd mejerinyckeln ]                    → DOLD (saknar nyckel)
  [ Bryt dig in med skarpt + Styrka 5 ]       → har skarpt + sty 6, valbart
  [ Lämna mejeriet — vänd om ]                → valbart

KONSEKVENS AV "BRYT DIG IN":
  - oppnat_mejeri = true
  - brutit_in_i_mejeri = true
  - sanity -15 (egen handling)
  - wounds += "skuren_hand"  (för att vi kräver skarpt + force = du skar dig)
  - inventory.jaktkniv → kvar (kniv förbrukas inte)
  - relations.alice -1 (om Alice senare ser detta i scene-036)
```

### Exempel C — Konfrontationen med Det grå (scene-037)

```
INPUT STATE:
  inventory: [kassettbandspelare, batterier, första_hjälpen, ...]
  stats: { för: 7, mod: 6 }
  sanity: 74 (fokuserad/skakad)
  vagval_intention: "stoppa"
  talat_med_ingegerd: true

VALBARA HUVUDVÄGAR (gates beräknade just-in-time):
  [ Strid ]                                  → DOLD (saknar tag:skarpt)
  [ Hymn — kräver tag:frekvens ×2 ]          → har frekvens (bandspelare + batterier), valbart
  [ Förhandla — acceptera ]                  → alltid valbart
  [ Hög-sanity-vägen — kräver sanity ≥ 70 ]  → sanity 74, valbart
  [ Stoppa permanent — kräver sanity ≥ 70    
    + vagval_intention=stoppa
    + talat_med_ingegerd ]                   → alla uppfyllda, VAL VISAS
```

---

## 4. Vad vi medvetet INTE har

Designval som tidigare diskuterats och förkastats:

| Mekanik | Varför inte |
|---|---|
| **HP-bar** | Bryter mot fiktion. Wounds-taggar gör jobbet bättre. |
| **Tärningsslag** | Skapar slumpfrustration. Gate-checkar är förutsägbara → spelaren kan välja. |
| **XP / level up** | Spelet är 100 min långt. Karaktären växer narrativt, inte mekaniskt. |
| **Crafting** | Filler. Vi har inga crafting-puzzles i storyn. |
| **Karta-skärm** | Bryter mot prosa-mediet. Rumsnavigering sker via val. |
| **Inventory-vikt** | Friktion utan fiktion. Tagg-systemet räcker. |
| **Skills som siffror** | Stats räcker. Vi vill inte ha 12 skill-värden. |
| **Game over från sanity 0** | Sanity 0 är en *upplevelse*, inte ett fail-state. Spelet fortsätter. |

---

## 5. Hur frontend-dev läser detta dokument

- Detta dokument definierar **vad** som finns, inte **hur** det implementeras.
- Implementations-detaljer finns i `data-model.md`.
- Varje system har sin egen spec-fil — börja där:
  - `character-creation.md` — startflödet
  - `combat-spec.md` — strid + skill checks
  - `equipment-system.md` — items + taggar
  - `data-model.md` — TypeScript-interfaces, API
  - `state-flags.md` — alla flaggor (narrative-designerns dokument; vi utökar inte)

---

## 6. Öppna designfrågor

1. **Visas wounds i UI?** Förslag: ja, som en kort textrad under sanity-tillståndet, t.ex. "Du har ett skär i handflatan."
2. **Ska stats kunna höjas under spelets gång?** Förslag: nej — char creation sätter dem, scen-engångsboostar är temporära. Vi vill inte ha grind.
3. **Kan en spelare välja att inte se sanity-textindikatorn?** Förslag: nej i v1, men gör texten distinkt nog att spelaren inte måste leta efter den.
