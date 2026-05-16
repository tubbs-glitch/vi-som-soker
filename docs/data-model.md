# Data Model — Mosters Hemligheter

> Komplett datakontrakt mellan scen-handlers och frontend. TypeScript-interfaces är primärspecen. JSON-exemplet är referens för frontend-dev och backend-dev. Webb-PoC och iOS måste dela samma struktur.

---

## 1. Designprinciper för datamodellen

1. **Ett enda state-objekt.** All spelinformation finns i ett `GameState`-objekt. Inget delat mellan scener via globals.
2. **Immutability i state-transitions.** Varje scen-action returnerar ett nytt state. Detta gör save/load, undo (debug), och history trivialt.
3. **Härledda värden räknas just-in-time.** Vi sparar inte `förberedd` (komfort+vård) i state — vi räknar ut den när vi behöver den.
4. **Inga referenser, bara värden.** State är serialiserbart till JSON utan custom serializers.
5. **Versioning.** Ett `version`-fält så vi kan migrera state mellan releaser.

---

## 2. TypeScript-interfaces (primärspec)

### 2.1 Top-level: GameState

```typescript
interface GameState {
  version: 1;                          // schema version, bumpas vid breaking changes
  character: Character;
  sanity: Sanity;
  wounds: WoundFlag[];
  inventory: Inventory;
  relations: Relations;
  story_flags: StoryFlags;
  location: Location;
  meta: Meta;
}
```

### 2.2 Character

```typescript
interface Character {
  // Identitet
  name: string;                        // tom sträng = berättaren använder "du"
  gender: "man" | "kvinna" | "ickebinär" | "otydlig";

  // Utseende
  appearance: {
    hair: "mörkt" | "ljust" | "rödaktigt" | "grånat_tidigt";
    build: "smal" | "vanlig" | "tung" | "senig";
    feature: "ärr_ögonbryn" | "stelnad_ringfinger" | "tatuering_underarm"
           | "örhängering" | "inget";
  };

  // Bakgrund
  background: "studerande" | "fysisk" | "empatisk" | "ifrågasättande" | "default";

  // Stats (0-10)
  stats: {
    sty: number;                       // Styrka
    dex: number;                       // Smidighet
    för: number;                       // Förstånd
    mod: number;                       // Mod
  };
}
```

### 2.3 Sanity

```typescript
interface Sanity {
  value: number;                       // 0-100, clamp:ad
  // Härledda värden räknas just-in-time:
  //   getLabel(value)        → "fokuserad" | "skakad" | "vacklande" | "söndertrasad" | "avgrund"
  //   getDescription(value)  → prosa-fragment
  //   isAboveThreshold(70)   → boolean (hög-sanity-vägen)
}
```

### 2.4 Wounds

```typescript
type WoundFlag =
  | "skuren_hand"
  | "kontusion_skalle"
  | "vriden_ankel"
  | "andnod"
  | "kallnad_märg";

// Wounds är en array; max 3 samtidigt
// (om en wound läggs till vid 3 wounds, ersätter den äldsta — vi har inte definierat detta beteende än, design-flagga)
```

### 2.5 Inventory

```typescript
interface Inventory {
  items: Item[];                       // unik per id
  max_at_start: 5;                     // konstant
  // Efter packning kan items läggas till fritt.
}

interface Item {
  id: ItemId;                          // unik identifier, t.ex. "ficklampa"
  name: string;                        // visningsnamn, "Ficklampa"
  description: string;                 // kort prosa, "Du har använt den när elen gått."
  tags: Tag[];                         // taggar — gates checkar mot dessa
  consumable: boolean;                 // förbrukas vid användning?
  uses_remaining?: number;             // för batterier (3), första-hjälpen (1), etc.
}

type ItemId =
  | "ficklampa"
  | "jaktkniv"
  | "kassettbandspelare"
  | "mobilladdare"
  | "första_hjälpen"
  | "varma_kläder"
  | "extra_batterier"
  | "tjärsten"
  | "vinds_mat"
  | "halsband_sjätte"
  | "halsband_sjunde"
  | "halsband_attonde"
  | "lab_anteckningar"
  | "alice_dagbok"
  | "alice_pärm"
  | "mejerinyckel"
  | "astrids_pärm"
  | "bertils_brev"
  | "lapp_till_gunnar"
  | "ritualprotokoll"
  | "gruppfoto_1981"
  | "gravstensskiss"
  | "yxa"
  | "blå_emaljmugg";

type Tag =
  | "skarpt" | "vapen" | "arv"
  | "ljus" | "signal" | "frekvens"
  | "verktyg" | "vård" | "kommunikation"
  | "komfort" | "mat" | "ljud"
  | "ritual" | "signe" | "kunskap"
  | "intim" | "helig" | "sallskap" | "tung";
```

### 2.6 Relations

```typescript
interface Relations {
  alice: number;            // -10 till +10
  leopold: number;          // -10 till +10
  gunnar: number;           // 0 till 10 (gunnar_tillit)
  mamma: number;            // -3 till +3
  det_grå: number;          // -5 till +5
  vinds_tinget: number;     // 0 till 3
  ingegerd_eko: number;     // 0 till 3
  bertil_eko: number;       // 0 till 2
  astrid_eko: number;       // 0 till 1
}
```

### 2.7 Story Flags

```typescript
interface StoryFlags {
  // Akt I
  mamma_vet: boolean;
  vet_om_per_magnus: boolean;
  vet_om_sallskapet_rykte: boolean;
  vet_om_tjarsten_korrekt: boolean;
  set_kort_om_omgivningen: boolean;
  vet_om_olov: boolean;
  gunnar_först_möte_klart: boolean;

  // Akt II - utforskning
  har_tjarsten: boolean;
  har_ljus: boolean;                   // härledd: inventory.hasTag("ljus")
  har_mejerinyckel: boolean;
  har_läst_lab_anteckningar: boolean;
  har_läst_dagboken: boolean;
  har_läst_astrids_parm: boolean;
  vet_om_trälårs_kod: boolean;
  vet_om_signe: boolean;
  läst_namn: boolean;
  bär_halsband: null | "sjätte" | "sjunde" | "attonde" | "annat";
  förstår_frekvens: 0 | 1 | 2;
  förstår_alice: 0 | 1 | 2;
  hört_ljud_uppe: boolean;

  // Akt II - sällskaps-tråden
  oppnat_mejeri: boolean;
  brutit_in_i_mejeri: boolean;
  vet_om_sallskapet: boolean;
  vet_om_astrid: boolean;
  vet_om_ingegerd: boolean;
  vet_om_olov_sallskap: boolean;
  vet_om_per_magnus_djup: boolean;
  vet_om_bertil: boolean;
  bär_attonde_halsband: boolean;
  har_lapp_till_gunnar: boolean;
  besokt_myrgraven: boolean;

  // Akt II - kärnhändelser
  vinds_tinget_status: null | "sett" | "matat" | "sårat" | "dödat" | "undviket";
  ström_på: boolean;
  hymnen_börjat: boolean;
  ritual_korrekt: null | "full" | "partial" | "nej";
  salt_riktning: null | "medurs" | "motsols" | "ingen";  // bakåtkomp-namn, avser tjärsten
  klivit_in_i_portalen: boolean;
  vagval_intention: null | "rädda" | "stoppa" | "obeslutsam";

  // Akt III
  grå_riktning: null | "alice_först" | "leopold_först" | "signe_först"
              | "ingegerd_först" | "tyst";
  talat_med_ingegerd: boolean;
  talat_om_bertil_med_leopold: boolean;
  leopold_med: boolean;
  alice_med: boolean;
  alice_övertygad_med: null | "kärlek" | "skuld" | "mamma" | "leopold"
                             | "hundarna" | "bertil" | "myrgraven"
                             | "sallskapet" | "ingegerds_budskap";
  valt_offra_sig: boolean;
  besegrat_det_grå: boolean;
  förstod_det_grå: boolean;
  stoppat_permanent: boolean;

  // Härledda (räknas JIT, ej sparade)
  // förberedd: inventory.hasTag("komfort") && inventory.hasTag("vård")
  // gunnar_vet_om_leopold, gunnar_vet_om_hundarna, gunnar_obekväm — set via Gunnar-dialog
  // sallskaps_lager_aktivt: story_flags.vet_om_sallskapet
}
```

### 2.8 Location

```typescript
interface Location {
  current_scene: string;               // t.ex. "scene-013"
  current_room: Room | null;
  visited_scenes: string[];
  visited_rooms: Room[];
}

type Room =
  | "hall" | "vardagsrum" | "kök" | "leopolds_arbetsrum"
  | "övre_hallen" | "alices_sovrum" | "gästrum" | "badrum"
  | "vinden" | "källare_förvar" | "källare_ritual"
  | "vedboden" | "trädgård" | "bilen"
  | "mejeribyggnaden" | "myrstig";
```

### 2.9 Meta

```typescript
interface Meta {
  current_act: 1 | 2 | 3;
  playtime_seconds: number;
  ending: null | "slut_1" | "slut_1b" | "slut_2_alice" | "slut_2_leopold"
              | "slut_3" | "slut_4";
  choices_log: ChoiceLogEntry[];
  language: "sv" | "en";
}

interface ChoiceLogEntry {
  scene_id: string;
  choice_id: string;
  timestamp: number;                   // ms sedan spelets start
  state_delta_summary?: string;        // kort sammanfattning för debug
}
```

---

## 3. Scene & Choice-typer

### 3.1 Scene

```typescript
interface Scene {
  id: string;                          // "scene-021"
  title: string;                       // "Vinden"
  language: "sv" | "en";
  act: 1 | 2 | 3;
  type: "BN" | "sb" | "G" | "H" | "E"; // bottleneck / sub-bottleneck / gren / hub / slut
  triggers: string[];                  // ["start", "from-scene-020"]
  exits: string[];                     // ["scene-022", "scene-016"]

  prose: string;                       // markdown-prosan
  choices: Choice[];

  // Optional scen-hooks
  on_enter?: ChoiceConsequence;        // körs vid scen-laddning
  on_exit?: ChoiceConsequence;         // körs vid scen-byte
}
```

### 3.2 Choice

```typescript
interface Choice {
  id: string;                          // "vinden-mata"
  text: string;                        // "[Mata det med matrester]"
  requires?: ChoiceRequirements;       // gates, om inte uppfyllda är val dolt eller grått
  is_red_check?: boolean;              // röd = engångs; vit = kan backas
  consequences: ChoiceConsequence;
  next_scene: string;
}

interface ChoiceRequirements {
  tags?: Tag[];                        // alla taggar måste finnas i inventory
  tag_count?: Partial<Record<Tag, number>>;  // t.ex. { frekvens: 2 }
  items?: ItemId[];                    // specifika items
  stats?: Partial<Record<keyof Character["stats"], number>>;  // min-värde
  sanity_min?: number;
  sanity_max?: number;
  flags?: Partial<StoryFlags>;         // exakta värden
  relations?: Partial<Record<keyof Relations, number>>;  // min-värde
  no_wounds?: WoundFlag[];             // får INTE ha dessa wounds
  background?: Character["background"][];  // bara om bakgrund matchar
}

interface ChoiceConsequence {
  sanity_delta?: number;
  wounds_add?: WoundFlag[];
  wounds_remove?: WoundFlag[];
  inventory_add?: ItemId[];
  inventory_remove?: ItemId[];
  flags_set?: Partial<StoryFlags>;
  relations_delta?: Partial<Relations>;
  stat_delta?: Partial<Character["stats"]>;  // sällsynt — temporära boostar
}
```

---

## 4. API som scen-rendering behöver

Frontend-dev exponerar dessa funktioner. Alla är pure (tar state, returnerar boolean eller nytt state).

### 4.1 Core API

```typescript
// Avgör om ett val är tillgängligt givet nuvarande state.
function canChoose(choice: Choice, state: GameState): {
  allowed: boolean;
  reason?: string;          // om false, varför? t.ex. "saknar skarpt"
};

// Applicera ett vals konsekvenser och returnera nytt state.
function applyChoice(choice: Choice, state: GameState): GameState;

// Returnera bara de val som är möjliga i nuvarande state.
function visibleChoices(scene: Scene, state: GameState): Choice[];

// Räkna ut härledda värden.
function isPrepared(state: GameState): boolean;      // komfort + vård
function hasTag(state: GameState, tag: Tag): boolean;
function tagCount(state: GameState, tag: Tag): number;
function sanityLabel(state: GameState): string;
function sanityIsHigh(state: GameState): boolean;     // ≥ 70
```

### 4.2 State management

```typescript
// Skapa ett nytt spel från character creation-val.
function createInitialState(
  character: Character,
  packed: ItemId[]
): GameState;

// Serialisera för save.
function serializeState(state: GameState): string;
function deserializeState(json: string): GameState;

// Migrera state om version bumpats.
function migrateState(json: string, fromVersion: number): GameState;
```

### 4.3 Scene-loader

```typescript
// Ladda en scen givet ID och språk.
function loadScene(sceneId: string, language: "sv" | "en"): Promise<Scene>;

// Bestämma nästa scen givet state (för bottleneckar med beräknat utfall).
function resolveNextScene(currentScene: Scene, state: GameState): string;
```

---

## 5. Komplett exempel — fullständigt state-objekt

Detta är ett snapshot från **scene-031 just innan spelaren kliver in i portalen**, för en spelare på `test_path_a` (snäll, alla hem):

```json
{
  "version": 1,
  "character": {
    "name": "",
    "gender": "otydlig",
    "appearance": {
      "hair": "grånat_tidigt",
      "build": "vanlig",
      "feature": "stelnad_ringfinger"
    },
    "background": "empatisk",
    "stats": {
      "sty": 4,
      "dex": 5,
      "för": 5,
      "mod": 7
    }
  },
  "sanity": {
    "value": 56
  },
  "wounds": [],
  "inventory": {
    "items": [
      { "id": "ficklampa", "name": "Ficklampa", "description": "...",
        "tags": ["ljus", "verktyg"], "consumable": false },
      { "id": "kassettbandspelare", "name": "Kassettbandspelare", "description": "...",
        "tags": ["frekvens", "ljud", "tung"], "consumable": false },
      { "id": "extra_batterier", "name": "Extra batterier", "description": "...",
        "tags": ["frekvens", "verktyg"], "consumable": true, "uses_remaining": 3 },
      { "id": "första_hjälpen", "name": "Första-hjälpen-kit", "description": "...",
        "tags": ["vård"], "consumable": true, "uses_remaining": 1 },
      { "id": "varma_kläder", "name": "Varma kläder", "description": "...",
        "tags": ["komfort"], "consumable": false },
      { "id": "tjärsten", "name": "Tjärsten", "description": "...",
        "tags": ["ritual", "helig"], "consumable": true, "uses_remaining": 1 },
      { "id": "alice_pärm", "name": "Alices pärm", "description": "...",
        "tags": ["kunskap", "ritual"], "consumable": false },
      { "id": "mejerinyckel", "name": "Mejerinyckel", "description": "...",
        "tags": ["verktyg", "sallskap"], "consumable": false },
      { "id": "astrids_pärm", "name": "Astrids pärm", "description": "...",
        "tags": ["kunskap", "sallskap"], "consumable": false },
      { "id": "bertils_brev", "name": "Bertils brev", "description": "...",
        "tags": ["kunskap", "sallskap", "intim"], "consumable": false },
      { "id": "lapp_till_gunnar", "name": "Lapp till Gunnar", "description": "...",
        "tags": ["sallskap", "intim"], "consumable": true, "uses_remaining": 1 },
      { "id": "halsband_attonde", "name": "Åttonde halsbandet", "description": "...",
        "tags": ["signe", "sallskap", "arv", "helig"], "consumable": false }
    ],
    "max_at_start": 5
  },
  "relations": {
    "alice": 4,
    "leopold": 2,
    "gunnar": 7,
    "mamma": 1,
    "det_grå": 0,
    "vinds_tinget": 2,
    "ingegerd_eko": 0,
    "bertil_eko": 0,
    "astrid_eko": 1
  },
  "story_flags": {
    "mamma_vet": true,
    "vet_om_per_magnus": true,
    "vet_om_sallskapet_rykte": true,
    "vet_om_tjarsten_korrekt": true,
    "set_kort_om_omgivningen": true,
    "vet_om_olov": true,
    "gunnar_först_möte_klart": true,
    "har_tjarsten": true,
    "har_ljus": true,
    "har_mejerinyckel": true,
    "har_läst_lab_anteckningar": true,
    "har_läst_dagboken": true,
    "har_läst_astrids_parm": true,
    "vet_om_trälårs_kod": true,
    "vet_om_signe": true,
    "läst_namn": true,
    "bär_halsband": "attonde",
    "förstår_frekvens": 2,
    "förstår_alice": 2,
    "hört_ljud_uppe": true,
    "oppnat_mejeri": true,
    "brutit_in_i_mejeri": false,
    "vet_om_sallskapet": true,
    "vet_om_astrid": true,
    "vet_om_ingegerd": true,
    "vet_om_olov_sallskap": true,
    "vet_om_per_magnus_djup": true,
    "vet_om_bertil": true,
    "bär_attonde_halsband": true,
    "har_lapp_till_gunnar": true,
    "besokt_myrgraven": true,
    "vinds_tinget_status": "matat",
    "ström_på": true,
    "hymnen_börjat": true,
    "ritual_korrekt": "full",
    "salt_riktning": "medurs",
    "klivit_in_i_portalen": false,
    "vagval_intention": "rädda",
    "grå_riktning": null,
    "talat_med_ingegerd": false,
    "talat_om_bertil_med_leopold": false,
    "leopold_med": false,
    "alice_med": false,
    "alice_övertygad_med": null,
    "valt_offra_sig": false,
    "besegrat_det_grå": false,
    "förstod_det_grå": false,
    "stoppat_permanent": false
  },
  "location": {
    "current_scene": "scene-031",
    "current_room": "källare_ritual",
    "visited_scenes": [
      "scene-001", "scene-002", "scene-003", "scene-004", "scene-005",
      "scene-006", "scene-007", "scene-008", "scene-009", "scene-010",
      "scene-011", "scene-012", "scene-013", "scene-014", "scene-015",
      "scene-016", "scene-017", "scene-018", "scene-019", "scene-020",
      "scene-021", "scene-022", "scene-023", "scene-024", "scene-025",
      "scene-026", "scene-027", "scene-028", "scene-029", "scene-030"
    ],
    "visited_rooms": [
      "hall", "vardagsrum", "kök", "leopolds_arbetsrum",
      "övre_hallen", "alices_sovrum", "gästrum", "badrum",
      "vinden", "källare_förvar", "vedboden", "bilen",
      "mejeribyggnaden", "myrstig"
    ]
  },
  "meta": {
    "current_act": 2,
    "playtime_seconds": 4860,
    "ending": null,
    "choices_log": [
      { "scene_id": "scene-002", "choice_id": "pack-balanced", "timestamp": 120000 }
    ],
    "language": "sv"
  }
}
```

---

## 6. Exempel — `canChoose` i praktiken

Givet state ovan, en spelare står inför scen-037 med detta val:

```json
{
  "id": "scene-037-hymn",
  "text": "[Spela hymnen — bandspelaren ligger i din väska och batterierna är friska.]",
  "requires": {
    "tags": ["frekvens"],
    "tag_count": { "frekvens": 2 }
  },
  "is_red_check": true,
  "consequences": {
    "sanity_delta": -8,
    "flags_set": {
      "besegrat_det_grå": true,
      "alice_med": true,
      "leopold_med": true
    },
    "inventory_remove": [],
    "relations_delta": { "det_grå": -1 }
  },
  "next_scene": "scene-038"
}
```

`canChoose` evaluering:

```ts
hasTag(state, "frekvens")                          // true (bandspelare + batterier)
tagCount(state, "frekvens")                        // 2 (bandspelare:1 + batterier:1)
2 >= 2                                             // true
=> allowed: true
```

Om spelaren INTE hade packat batterier:

```ts
hasTag(state, "frekvens")                          // true (bandspelare har frekvens)
tagCount(state, "frekvens")                        // 1
1 >= 2                                             // false
=> allowed: false, reason: "behöver en till frekvens-källa"
```

I UI: val visas grått med kort cue "[Bandspelaren är tom utan batterier.]" — eller helt dolt om vi vill att spelaren ska upptäcka avsaknaden själv. Designval per scen.

---

## 7. Storage-strategi

### 7.1 Webb (PoC)

- **localStorage:** `mosters-hemligheter:state` → JSON-serialiserat `GameState`.
- **Auto-save efter varje val** (i `applyChoice`-callback).
- **Inga manuella saves** — vi har ingen save/load-meny i v1.
- **Reset-meny:** "Börja om från början" + bekräftelse-dialog.

### 7.2 iOS (senare)

- **Core Data eller SwiftData** men: spara `GameState` som blob (JSON) i en enda rad. Inget behov av relationell modell.
- **iCloud-sync** mellan enheter — opt-in.

### 7.3 Backend (om vi går dit)

- **`POST /state`** med hela objektet. Idempotent — bara skriv senaste.
- **`GET /state`** returnerar senaste.
- **Inget delning, inga leaderboards.** Detta är ett solo-spel.

---

## 8. Versioning & migration

Vid breaking changes till state-strukturen:

```typescript
function migrateState(json: string, fromVersion: number): GameState {
  let state = JSON.parse(json);

  // Migration från v0 till v1 (om vi någonsin gör en sådan):
  if (fromVersion < 1) {
    // ... fyll i missing fields, döpa om, etc.
    state.version = 1;
  }

  return state as GameState;
}
```

Vi loggar version i state-objektet och kollar det vid laddning. **Aldrig destructive migration utan användarens samtycke** — om vi inte kan migrera, visa varning och låt spelaren välja att starta om.

---

## 9. Testbarhet

Datamodellen är designad för enhetstester. Varje funktion är pure. Vi kan skriva tester som:

```typescript
test("Hymn-vägen kräver två frekvens-källor", () => {
  const state = createInitialState(empatiskCharacter, ["kassettbandspelare"]);
  const choice = scene037Choices.hymn;
  expect(canChoose(choice, state).allowed).toBe(false);

  const stateWithBatt = applyChoice(pickupBatteries, state);
  expect(canChoose(choice, stateWithBatt).allowed).toBe(true);
});
```

QA-test-paths från `state-flags.md §9` (test_path_a-d) ska implementeras som integration-tester som spelar genom hela spelet via scripted choice-arrays.

---

## 10. Sammanfattning för frontend-dev

- **Ett state-objekt, immutabelt.**
- **Scen-handlers är pure** — tar state och choice, returnerar nytt state.
- **Render = function of state.** Inga component-internal state utöver UI-tillstånd (input focus, animation).
- **Save = serialize(state) → localStorage.** Auto efter varje val.
- **Load = deserialize(localStorage) → state.** Vid app-start.
- **Gates evalueras JIT.** Beräkna `visibleChoices(scene, state)` vid render.
- **TypeScript-types ska implementeras från §2 ovan.** Använd som källa till sanning.
