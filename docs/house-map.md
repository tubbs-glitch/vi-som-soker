# House Map — Hällmyren

> Designdokument för den klickbara planritningen i webb-PoC:n.
> Frontend renderar en SVG/HTML-grid baserad på `web/lib/house-map.ts`.
> Tonen är **gammal försäkringsritning** — schematisk, dövfärgad, falurött + grafitgrått.

---

## 1. Designprinciper

- **Fem våningar/blad**: `outside`, `ground`, `upper`, `attic`, `basement`. Spelaren bläddrar mellan dem (svep eller tab).
- **Grid 0-100** per blad. X går höger, Y går nedåt. Layout är optimerad för **mobile portrait** — höga, smala blad.
- **Reveal-states**:
  - `unknown` — rummet ritas inte alls. Bara tomma fält / "här slutar kartan".
  - `glimpsed` — rummet ritas i streckad outline utan namn. Tooltip = `hint_sv` (kort ledtråd, max 8 ord).
  - `visited` — fullt synligt med namn och eventuell ikon.
  - `current` — markeras med rödbrun fyllning + en liten punkt.
- **Klickbarhet**: bara `visited` + `current` rum är klickbara → navigerar till `entry_scene_id`. `glimpsed` är inte klickbart (men hovrbart för hint).

---

## 2. Våningarna — ASCII-planritningar

### 2.1 `outside` (grid 0-100, husets fasad och tomten)

```
 0                50                100
 0  +-----------------------------------+
    |                                   |
    |    [myrstig]                      |   ← y 5-20, lång ner mot myren
    |        |                          |
20  |        v                          |
    |   +---------+                     |
    |   | mejeri- |       [trädgård]    |   ← mejeri vänster, trädgård höger
    |   | bygg-   |                     |
40  |   |  naden  |                     |
    |   +---------+                     |
    |                                   |
    |        +-----------------+        |   ← själva HUSET ligger centralt
60  |        |     [HUS]       |        |     (klickas inte här — gå in via
    |        |   (icon, ej     |        |      trappan)
    |        |   klickbar)     |        |
    |        +-----------------+        |
80  |              ^                    |
    |         [trappan]                 |   ← entré, scene-008 / scene-010
    |                                   |
    |  [vedboden]              [bilen]  |   ← y 88-98, två blad nere
100 +-----------------------------------+
```

**Layout-anteckning:** Mejeribyggnaden ligger uttryckligen "80 m från huset" i prosan (scene-014, scene-024). På kartan markerar vi den till vänster med en svag streckad linje mellan huset och mejeriet. Trädgården är en löst inramad zon till höger med inga "rumväggar" — bara en grön-grå yta.

### 2.2 `ground` (bottenvåningen)

```
 0                50                100
 0  +-----------------------------------+
    |                                   |
    |   +---------+   +-------------+   |
    |   |  kök    |   | vardagsrum  |   |
20  |   |         |   |             |   |
    |   |         |   |             |   |
    |   +----+----+   +------+------+   |
    |        |               |          |
40  |        +-----+   +-----+          |
    |              |   |                |
    |          +---v---v---+            |
    |          |   hall    |            |   ← central hub
60  |          |  (HUB)    |            |
    |          |           |            |
    |          +-+-------+-+            |
    |            |       |              |
80  |     +------v-+   +-v------+       |
    |     |leopolds|   | (källar-|      |
    |     |arbets- |   |  trappa)|      |
    |     | rum    |   |         |      |
    |     +--------+   +---------+      |
100 +-----------------------------------+
```

**Layout-anteckning:** Hallen är centrum-hub (matchar prosan: "rakt fram trappan upp, vänster vardagsrum, höger kök, höger Leopolds arbetsrum, källartrappa bredvid"). Källartrappan visas som en smal **dörrmarkering** i hallens nedre högra hörn — den är inte ett eget rum på bottenvåningen, den leder till `basement`.

### 2.3 `upper` (övervåningen)

```
 0                50                100
 0  +-----------------------------------+
    |                                   |
    |   +---------+   +-------------+   |
    |   | alices  |   |  gästrum    |   |
20  |   | sovrum  |   |             |   |
    |   |         |   |             |   |
    |   +----+----+   +------+------+   |
    |        |               |          |
40  |        +-----+   +-----+          |
    |              |   |                |
    |          +---v---v---+            |
    |          | övre      |            |   ← hub övre
60  |          | hallen    |            |
    |          |  (HUB)    |            |
    |          +-+-------+-+            |
    |            |       |              |
80  |     +------v-+   +-v------+       |
    |     |badrum  |   |(vinds-  |      |
    |     |        |   | trappa) |      |
    |     |        |   |         |      |
    |     +--------+   +---------+      |
100 +-----------------------------------+
```

**Layout-anteckning:** Vindstrappan visas analogt med källartrappan — smal dörrmarkering nedre höger som leder till `attic`-bladet. Spelaren ser den direkt som glimpsed.

### 2.4 `attic` (vinden)

```
 0                50                100
 0  +-----------------------------------+
    |                                   |
    |                                   |
20  |     +-----------------------+     |
    |     |                       |     |
    |     |       vinden          |     |   ← brett, lågt, ett rum
    |     |   (låg ås, brett)     |     |
40  |     |                       |     |
    |     |                       |     |
    |     |                       |     |
    |     +-----------------------+     |
60  |                                   |
    |          (taklisten)              |
    |                                   |
    |                                   |
80  |                                   |
    |                                   |
    |                                   |
100 +-----------------------------------+
```

### 2.5 `basement` (källaren)

```
 0                50                100
 0  +-----------------------------------+
    |                                   |
    |     +-----------------------+     |
    |     |   källare-förvar      |     |
20  |     |   (jordkällare-       |     |
    |     |    delen)             |     |
    |     +-----------+-----------+     |
    |                 |                 |
40  |                 v                 |   ← liten passage
    |     +-----------------------+     |
    |     |   källare-ritual      |     |
    |     |   (murade delen)      |     |
60  |     |                       |     |
    |     |    (cirkeln finns     |     |
    |     |     här)              |     |
    |     +-----------------------+     |
80  |                                   |
    |                                   |
    |                                   |
100 +-----------------------------------+
```

---

## 3. Rumslista — koordinater + scenmappning

| id                  | floor    | x  | y  | w  | h  | scene_ids                              | entry_scene_id |
|---------------------|----------|----|----|----|----|----------------------------------------|----------------|
| trappan             | outside  | 35 | 78 | 30 | 10 | scene-008, scene-010                   | scene-010      |
| trädgård            | outside  | 60 | 10 | 35 | 55 | (atmosfär)                             | scene-010      |
| vedboden            | outside  |  5 | 85 | 22 | 13 | scene-027                              | scene-027      |
| bilen               | outside  | 73 | 85 | 22 | 13 | (rest)                                 | scene-010      |
| mejeribyggnaden     | outside  |  5 | 20 | 28 | 30 | scene-024, scene-025, scene-026        | scene-024      |
| myrstig             | outside  | 18 |  3 | 10 | 18 | scene-030                              | scene-030      |
| hall                | ground   | 32 | 45 | 36 | 25 | scene-011                              | scene-011      |
| vardagsrum          | ground   | 52 |  8 | 38 | 28 | scene-012                              | scene-012      |
| kök                 | ground   | 10 |  8 | 35 | 28 | scene-013                              | scene-013      |
| leopolds_arbetsrum  | ground   | 18 | 76 | 30 | 20 | scene-014                              | scene-014      |
| övre_hallen         | upper    | 32 | 45 | 36 | 25 | scene-015, scene-016                   | scene-016      |
| alices_sovrum       | upper    | 10 |  8 | 35 | 28 | scene-017                              | scene-017      |
| gästrum             | upper    | 52 |  8 | 38 | 28 | scene-018                              | scene-018      |
| badrum              | upper    | 18 | 76 | 30 | 20 | scene-019                              | scene-019      |
| vinden              | attic    | 18 | 22 | 65 | 30 | scene-021                              | scene-021      |
| källare_förvar      | basement | 18 | 10 | 65 | 22 | scene-022, scene-023                   | scene-023      |
| källare_ritual      | basement | 18 | 42 | 65 | 32 | scene-031                              | scene-031      |

**Trans-scener (scene-015 trappa upp, scene-022 källartrappa) hanteras som "rörelse mellan blad"** — UI:t spelar en kort övergång, men spelaren placeras i `övre_hallen` respektive `källare_förvar`.

---

## 4. Angränsningstabell

| Rum                 | Angränsande (adjacent)                                                |
|---------------------|------------------------------------------------------------------------|
| trappan             | hall, trädgård, vedboden, bilen, mejeribyggnaden                       |
| trädgård            | trappan, vedboden, mejeribyggnaden, myrstig                            |
| vedboden            | trappan, trädgård                                                      |
| bilen               | trappan                                                                |
| mejeribyggnaden     | trappan, trädgård, myrstig                                             |
| myrstig             | trädgård, mejeribyggnaden                                              |
| hall                | trappan, vardagsrum, kök, leopolds_arbetsrum, övre_hallen, källare_förvar |
| vardagsrum          | hall, kök, leopolds_arbetsrum                                          |
| kök                 | hall, vardagsrum                                                       |
| leopolds_arbetsrum  | hall, vardagsrum                                                       |
| övre_hallen         | hall, alices_sovrum, gästrum, badrum, vinden                           |
| alices_sovrum       | övre_hallen, gästrum                                                   |
| gästrum             | övre_hallen, alices_sovrum, badrum                                     |
| badrum              | övre_hallen, gästrum                                                   |
| vinden              | övre_hallen                                                            |
| källare_förvar      | hall, källare_ritual                                                   |
| källare_ritual      | källare_förvar                                                         |

---

## 5. Reveal-logik

### 5.1 Startläge (efter scene-010, spelaren har precis klivit in)
- **visited**: `trappan` (man kom dit i scene-008/010), `hall` (man kliver in nu)
- **glimpsed**: alla angränsande till `trappan` (trädgård, vedboden, bilen, mejeribyggnaden — fast mejeriet är hidden, se nedan) och alla angränsande till `hall` (vardagsrum, kök, leopolds_arbetsrum, övre_hallen, källare_förvar). Vindstrappan glimpsas via övre_hallen senare.
- **unknown**: resten

### 5.2 Generella regler
- När ett rum blir `visited` → alla dess `adjacent` blir minst `glimpsed`.
- Övergång `glimpsed` → `visited` sker när spelaren entrer en av rummets `scene_ids`.

### 5.3 Specialregler

| Rum                 | Reveal-regel                                                                              |
|---------------------|--------------------------------------------------------------------------------------------|
| mejeribyggnaden     | **Hidden** tills `vet_om_sallskapet=true` ELLER `sett_gruppfoto=true` (scene-014). Då glimpsed. Visited när scene-024 körs. |
| myrstig             | Hidden tills `vet_om_bertil=true` ELLER `vet_om_sallskapet=true`. Då glimpsed.            |
| källare_ritual      | Glimpsed direkt när källare_förvar är visited (man ser passagen).                          |
| vinden              | Glimpsed när övre_hallen är visited (vindstrappan syns i scene-016).                       |
| trädgård / vedboden / bilen | Glimpsed direkt vid spelstart — spelaren har sett dem från trappan i scene-007/008. |

**Implementation:** `RoomDef.reveal_when` håller villkor som override:ar standard-regeln. För mejeriet sätter vi `reveal_when: { flag_set: "sett_gruppfoto" }` — om flaggan inte är true visas rummet inte alls (inte ens glimpsed).

---

## 6. Klickbarhetsspec

- **Hub-rum** (hall, vardagsrum, övre_hallen): klick → hub-scenens id.
- **Bladrum** (kök, badrum etc.): klick → bladscenens id.
- **Mejeribyggnaden**: klick → scene-024 första gången, sedan scene-025 / scene-026 navigeras inifrån scenen (UI ger sub-val).
- **Trans-rum** (källartrappan, vindstrappan): inte egna rum på kartan — bara dörrmarkeringar i hub-rummen.

---

## 7. Ledtrådar (hint_sv) — max 8 ord per rum

Visas på hover/long-press när rummet är `glimpsed`. Ska skapa nyfikenhet utan att avslöja.

| Rum                 | hint_sv                              |
|---------------------|---------------------------------------|
| trappan             | "Hällen där nyckeln ligger."          |
| trädgård            | "Tre rönnar. Sju gravar."             |
| vedboden            | "Säkringsskåpet och en uggla."        |
| bilen               | "Bilen står där du parkerade."        |
| mejeribyggnaden     | "Falurött plåt. Svart dörr."          |
| myrstig             | "Plankor som rasat."                  |
| hall                | "Sju koppel. En krok är tom."         |
| vardagsrum          | "Skivspelaren snurrar inte."          |
| kök                 | "Kylskåpet har gått sönder."          |
| leopolds_arbetsrum  | "Ett fotografi. Sju ansikten."        |
| övre_hallen         | "Fyra dörrar. En lucka."              |
| alices_sovrum       | "Bädden är orörd."                    |
| gästrum             | "En lackad träbox står på hyllan."    |
| badrum              | "En kran droppar."                    |
| vinden              | "Något står i halvmörker."            |
| källare_förvar      | "Lådor, fukt, en myrtrösk."           |
| källare_ritual      | "Mur, cirkel, tjärsten."              |

---

## 8. Visuella val (för frontend-dev)

- **Palett**: Falurött #8a2a2a (huset), grafitgrått #3b3b3b (linjer), pergament #efe6d6 (bakgrund), djupblått #4a5468 (nattljus-indikator). Rödbrun #6b2e26 för "current".
- **Linjevikt**: 1px för glimpsed (streckad), 2px för visited, 3px för current med inre skugga.
- **Typografi**: rumetiketten i en seriff (Crimson eller liknande), kapitäler, 0.9rem. Endast på visited/current.
- **Floor-bläddrare**: vertikala flikar i sidled — "Ute / Botten / Övre / Vinden / Källare" — disabled tills minst ett rum på den våningen är glimpsed.

---

## 9. Öppna frågor / designval att verifiera

1. **Bilen** är listad som rum av kompatibilitetsskäl (Room-typen har den), men det finns ingen scen i `bilen` i scene-map. Är den bara en visuell ikon? **Förslag**: rita den men gör den icke-klickbar (entry_scene_id pekar tillbaka till scene-010 som rest).
2. **Trans-scener (015, 022)** mappas till deras "destinations-rum" eftersom de saknar egen plats — ok?
3. **Mejeri-reveal** triggas av `sett_gruppfoto` (flag i scene-014) — alternativet är `vet_om_sallskapet`, men den sätts först när spelaren faktiskt öppnar mejeriet, vilket vore moment-22.
