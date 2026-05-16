# State Flags — Mosters Hemligheter

> Komplett lista över alla variabler spelet håller. Frontend-dev kan referera direkt till YAML-blocken nedan som datakontrakt.
> **Revision 2:** Plats Hällmyren. Sällskaps-flaggor tillagda. Tjärsten ersätter havssalt. Scene-ID:n förskjutna (se scene-map.md).

---

## 1. Sanity (0-100, beskrivande)

Sanity är inte HP. Den representerar spelarens grepp om verkligheten och fungerar som dialog-gate.

```yaml
sanity:
  value: 90          # startvärde
  min: 0
  max: 100
  thresholds:
    - threshold: 80
      label: "fokuserad"
      description: "Du tänker klart. Detaljer du normalt missar registreras."
      unlocks: ["dialog_klarhet", "scene_012_extra_detail"]
    - threshold: 60
      label: "skakad"
      description: "Du är skärrad men funktionell. Du noterar oroliga detaljer."
      unlocks: []
    - threshold: 40
      label: "vacklande"
      description: "Verkligheten glider. Du hör saker som inte alltid finns."
      unlocks: ["scene_031_hallucination", "dialog_paranoia"]
    - threshold: 20
      label: "söndertrasad"
      description: "Du ser sanningen som andra inte ser. Den är hemskare än att inte se."
      unlocks: ["scene_035_extra_truth", "dialog_avgrund"]
    - threshold: 70   # högt — special-unlock
      label: "lugn (hög-sanity-väg)"
      description: "Du har behållit lugnet. Det grå kan höra dig."
      unlocks: ["scene_037_förstå_grå"]  # KRÄVS för bästa Slut 1 och Slut 1B
```

### Anmärkningar
- Sanity är beskrivande, INTE numerisk i spelarens UI.
- En spelare som håller hög sanity hela vägen får en helt annan upplevelse i Akt III. Detta är avsiktligt.

---

## 2. Inventory (tagg-baserat)

```yaml
inventory:
  start: []
  max_items: 5      # vid packning i scene-002
  growable: true    # kan växa under spelets gång genom rumsfynd

tags:
  skarpt:        "kan skära, möjliggör strid"
  ljus:          "lyser i mörker, krävs för källaren och vissa vinds-val"
  signal:        "kan locka uppmärksamhet, t.ex. ropa eller spela ljud"
  vapen:         "explicit vapen mot Det grå"
  frekvens:      "alstrar ljudvågor, krävs för hymn-vägen"
  verktyg:       "kan användas på säkringsskåp eller lås (eller bryta upp mejerinyckel-låsning)"
  vård:          "reducerar sanity-bortfall i specifika scener"
  arv:           "personlig historia, ger sanity-buffert i scene-036"
  kommunikation: "tillåter fast-linje-samtal i Akt II (mobiltäckning saknas)"
  komfort:       "har en framtagen tagg i 'förberedd'-logiken"
  ljud:          "annan ljudkälla än frekvens"
  ritual:        "krävs för ritualens utförande"
  signe:         "associerat med Signe-hundarna"
  kunskap:       "ger informationsbonus i dialog"
  intim:         "bär emotionell vikt — påverkar dialog med Alice"
  sallskap:      "associerat med det gamla sällskapet (NY)"

items:
  ficklampa:           ["ljus", "verktyg"]
  jaktkniv:            ["skarpt", "vapen", "arv"]
  kassettbandspelare:  ["frekvens", "ljud"]
  mobilladdare:        ["kommunikation"]
  första_hjälpen:      ["vård"]
  varma_kläder:        ["komfort"]
  extra_batterier:     ["frekvens", "verktyg"]
  tjärsten:            ["ritual"]                       # NY: ersätter havssalt
  vinds_mat:           ["mat"]
  halsband_sjunde:     ["signe", "arv"]
  halsband_sjätte:     ["signe"]
  halsband_attonde:    ["signe", "sallskap", "arv"]     # NY: Bertils hund
  lab_anteckningar:    ["kunskap"]
  alice_dagbok:        ["kunskap", "intim"]
  alice_pärm:          ["kunskap", "ritual"]
  mejerinyckel:        ["verktyg", "sallskap"]          # NY
  astrids_pärm:        ["kunskap", "sallskap"]          # NY
  bertils_brev:        ["kunskap", "sallskap", "intim"] # NY
  lapp_till_gunnar:    ["sallskap", "intim"]            # NY
  ritualprotokoll:     ["kunskap", "sallskap", "ritual"]# NY
```

### Anmärkningar
- Vi gate-checkar på tagg, inte specifikt item.
- `förberedd` är en härledd flagga: `inventory.has("komfort") && inventory.has("vård")`.
- `havssalt`-flaggan från v1 är omdöpt till `tjärsten` — funktionellt identisk, men namnet är kanon i texten.

---

## 3. Story flags (boolska + skalor)

```yaml
story_flags:
  # Akt I
  mamma_vet:                false
  vet_om_per_magnus:        false   # NY: macken-gubben gav lappen
  vet_om_sallskapet_rykte:  false   # NY: macken-gubbens kontext
  vet_om_tjarsten_korrekt:  false   # NY: Per-Magnus-samtalet
  set_kort_om_omgivningen:  false   # NY: körde du sakta de sista 30 km?
  vet_om_olov:              false   # NY: frågade du Gunnar om hans far?
  gunnar_först_möte_klart:  false

  # Akt II — utforskning
  har_tjarsten:             false   # tidigare har_havssalt
  har_ljus:                 false
  flashlight_on:            false   # NY: spelaren har "tagit fram" ficklampan (kräver ficklampa i inventory). Togglar prosa-variant i inomhusscener. Reset:as inte automatiskt mellan scener; spelaren stänger av själv.
  har_mejerinyckel:         false   # NY (från scene-014)
  har_läst_lab_anteckningar: false
  har_läst_dagboken:        false   # se förstår_alice
  har_läst_astrids_parm:    false   # NY (scene-025)
  vet_om_trälårs_kod:       false   # NY (från scene-017)
  vet_om_signe:             false
  läst_namn:                false
  bär_halsband:             null    # null | "sjätte" | "sjunde" | "attonde" | "annat"
  förstår_frekvens:         0       # 0-2, skala
  förstår_alice:            0       # 0-2, skala
  hört_ljud_uppe:           false

  # Akt II — sällskaps-tråden (NY-block)
  oppnat_mejeri:            false
  brutit_in_i_mejeri:       false
  vet_om_sallskapet:        false   # set när mejeriet öppnas eller astrids parm läses
  vet_om_astrid:            false
  vet_om_ingegerd:          false
  vet_om_olov_sallskap:     false   # specifikt om Olovs roll
  vet_om_per_magnus_djup:   false   # från Per-Magnus-samtalet
  vet_om_bertil:            false   # set i scene-026 (trälåren)
  bär_attonde_halsband:     false   # NY: Bertils hund
  har_lapp_till_gunnar:     false   # NY: oöppnad lapp från Olov
  besokt_myrgraven:         false   # NY: scene-030 valfri

  # Akt II — kärnhändelser
  vinds_tinget_status:      null    # null | "sett" | "matat" | "sårat" | "dödat" | "undviket"
  ström_på:                 false
  hymnen_börjat:            false   # tallriken snurrar (set i scene-028) — INTE samma som att hymnen faktiskt hörs
  hymnen_låten_på:          false   # NY: spelaren har faktiskt sänkt nålen på skivan (scene-012, kräver ström_på). Utan denna är ritualen inte komplett — `ritual_korrekt=full` kräver `hymnen_låten_på=true`.
  ritual_korrekt:           null    # null | "full" | "partial" | "nej". Obs: scene-031 måste justeras så att `full`-utfallet KRÄVER `hymnen_låten_på=true`. Utan hymnen kan ritualen som mest bli `partial`.
  salt_riktning:            null    # bakåtkomp-namn; avser tjärstens-riktning. null | "medurs" | "motsols" | "ingen"
  klivit_in_i_portalen:     false
  vagval_intention:         null    # NY: null | "rädda" | "stoppa" | "obeslutsam"

  # Akt III
  grå_riktning:             null    # null | "alice_först" | "leopold_först" | "signe_först" | "ingegerd_först" | "tyst"
  talat_med_ingegerd:       false   # NY: scene-034
  talat_om_bertil_med_leopold: false # NY: scene-035 specialdialog
  leopold_med:              false
  alice_med:                false
  alice_övertygad_med:      null
  valt_offra_sig:           false
  besegrat_det_grå:         false
  förstod_det_grå:          false
  stoppat_permanent:        false   # NY: krav för Slut 1B

  # Härledda
  förberedd:                false   # inventory.has("komfort") && inventory.has("vård")
  gunnar_vet_om_leopold:    false
  gunnar_vet_om_hundarna:   false
  gunnar_obekväm:           false
```

---

## 4. Relations (siffervärden)

```yaml
relations:
  alice:
    value: 0       # -10 till +10
    notes: "Påverkas av läsval (dagbok), val i scene-036, och sällskaps-argument."

  leopold:
    value: 0       # -10 till +10
    notes: "Påverkas av lab-anteckningar, scene-035-val, och Bertil-revelationen."

  gunnar:
    value: 2       # 0-10 (heter `gunnar_tillit` i tidigare dokument)
    notes: "Påverkas av scene-008 och scene-020. Boostas markant av att lämna `lapp_till_gunnar`."

  mamma:
    value: 0       # -3 till +3, small range
    notes: "Påverkas bara av scene-003."

  det_grå:
    value: 0       # -5 till +5
    notes: "Påverkas av val i scene-033 (tyst-val ökar) och scene-037."

  vinds_tinget:
    value: 0       # 0-3
    notes: "Set av scene-021. Påverkar om det följer dig in i portalen — krav för bästa Slut 1."

  ingegerd_eko:                          # NY
    value: 0       # 0-3
    notes: "Set av scene-034. Påverkar Slut 3 (mindre ensam) och Slut 1B (krav för permanent stängning)."

  bertil_eko:                            # NY (svagare närvaro)
    value: 0       # 0-2
    notes: "Ekot av Leopolds bror. Set av scene-035 specialdialog ('fråga om Bertil') och scene-036."

  astrid_eko:                            # NY (svagast — möts inte direkt)
    value: 0       # 0-1
    notes: "Set bara om spelaren läser hela Astrids pärm. Funktionell: ger one-off dialogalternativ i scene-036."
```

---

## 5. Location

```yaml
location:
  current_scene: "scene-001"
  current_room: null
  visited_scenes: []
  visited_rooms: []

rooms:
  - "trappan"              # NY: husets entrétrappa (scene-008 / scene-010)
  - "hall"
  - "vardagsrum"
  - "kök"
  - "leopolds_arbetsrum"
  - "övre_hallen"
  - "alices_sovrum"
  - "gästrum"
  - "badrum"
  - "vinden"
  - "källare_förvar"
  - "källare_ritual"
  - "vedboden"             # tidigare "skjul"
  - "trädgård"
  - "bilen"
  - "mejeribyggnaden"      # NY
  - "myrstig"              # NY (vägen ut till myrgraven)
```

---

## 6. Meta / Game state

```yaml
meta:
  current_act: 1
  playtime_seconds: 0
  ending: null              # null | "slut_1" | "slut_1b" | "slut_2_alice" | "slut_2_leopold" | "slut_3" | "slut_4"
  choices_log: []
  language: "sv"
  sallskaps_lager_aktivt: false   # NY: härledd flagga — true så fort vet_om_sallskapet=true
```

---

## 7. Startvärden (sammanfattning)

```yaml
initial_state:
  sanity: 90
  inventory: []
  story_flags:
    # alla false / null / 0 utom:
    gunnar_först_möte_klart: false
  relations:
    alice: 0
    leopold: 0
    gunnar: 2
    mamma: 0
    det_grå: 0
    vinds_tinget: 0
    ingegerd_eko: 0
    bertil_eko: 0
    astrid_eko: 0
  location:
    current_scene: "scene-001"
    current_room: null
    visited_scenes: []
    visited_rooms: []
  meta:
    current_act: 1
    playtime_seconds: 0
    ending: null
    choices_log: []
    language: "sv"
    sallskaps_lager_aktivt: false
```

---

## 8. Implementationsregler för frontend-dev

1. **State är en enda JSON-objekt.** Sparas till localStorage eller backend efter varje scen.
2. **Bara scen-handlers ändrar state** — inte UI-komponenter direkt.
3. **Härledda flaggor** (`förberedd`, `har_ljus`, `sallskaps_lager_aktivt`) räknas ut just-in-time, inte sparas.
4. **Sanity är clamp(0, 100)** — alla deltan körs genom en clamp-funktion.
5. **Relations är clamp(-10, +10)** med undantag för mamma (±3), Det grå (±5), Ingegerd-ekot (0..3), Bertil-ekot (0..2), Astrid-ekot (0..1), och vinds-tinget (0..3).
6. **Inventory är en Set, inte array** — varje item kan bara finnas en gång.
7. **Vid scen-laddning**: först kontrollera gate-villkor (state), sedan rendera. Om gate fail: scenen ska inte vara nåbar.
8. **State-deltan loggas** för debug-läge.
9. **Mobiltäckning är simulerad bortom scene-006** — `mobilladdare` ger bara nytta i Akt I innan scene-006 och i potentiella Akt I-tillbakablickar; den fungerar inte i huset eller mejeriet.

---

## 8.5 Förslag — nya flaggor och items för Tomt-zonen (scene-100 till scene-105)

> Föreslås av copywriter-sv-en. **Ej ännu implementerade i story-engine** — bara använda i scenfilerna. Project-lead / game-designer beslutar slutgiltig form.

### Nya story flags

```yaml
story_flags:
  # Tomt-zonen (storm + skjul + träd)
  vet_om_trädet:        false   # spelaren har sett granen över ledningen (scene-101)
  vet_om_ugglan:        false   # spelaren vet att något stort sitter i bodtaket (scene-102 lyssna-val, eller scene-103)
  besparat_ugglan:      false   # ugglan flög ut levande (scene-103 ducka eller stå still)
  ugglan_dod:           false   # spelaren slog ihjäl ugglan (scene-103 strid)
  ugglan_minns:         false   # spelaren stod still och mötte blicken (scene-103, kräver MOD ≥ 7) — Akt III-eko
  misslyckat_skjul:     false   # spelaren backade ut; måste tillbaka (scene-103)
  ström_på_försök:      false   # spelaren har försökt slå på säkringen för tidigt (scene-104)
  tradet_sagat:         false   # spelaren har sågat ner trädet (scene-105)
  kabeln_reparerbar:    false   # alias / följd av tradet_sagat
  har_yxa:              false   # plockad i scene-104 (i förlängningen ett item)
  har_sag:              false   # plockad i scene-104 (i förlängningen ett item)
  # OBS: har_ficklampa finns redan via inventory; den här flaggan är redundant och bör mappas mot inventory.has("ficklampa") JIT
```

### Nya items

```yaml
items:
  yxa:                 ["skarpt", "vapen", "tung"]                # finns redan i equipment-system §3.2 (vedboden)
  sag:                 ["verktyg", "skarpt"]                      # NY — bågsåg från vedboden, scene-104
```

### Nya wounds

`skuren_hand` finns redan i combat-spec §8. Tomt-zonen aktiverar den första gången i scene-103 (om spelaren slår med yxan och tar klorna mot handryggen samtidigt). Läks som vanligt med `vård`-tag.

### Anmärkning om relation till befintliga scener

- **scene-027** (Vedboden och säkringen) blir funktionellt dubblerad av scene-104 + scene-105. Project-lead bör besluta om scene-027 ska tas bort, slås samman, eller behållas som alternativ kortväg.
- **scene-028** (Hymnen börjar) triggas nu av scene-105 i stället för scene-027. Flaggan `ström_på` sätts i scene-105.
- **ugglan_minns** är tänkt som ett mikro-eko i Akt III (scene-033 eller scene-037) — en tystnad bland rösterna som "nästan låter som en fågel". Inte krav på något slut, bara en betalning för en tidig modig spelare.

---

## 9. Test-scenarios för QA

Tre "kanoniska" genomspelningar för regression-test (uppdaterade scen-ID):

```yaml
test_path_a:                   # "Snäll spelare, alla hem, sällskaps-tråd komplett"
  inventory: [ficklampa, kassettbandspelare, extra_batterier, första_hjälpen, varma_kläder]
  key_choices:
    scene_003: ärlig_oro
    scene_005: prata_öppet         # macken
    scene_008: alla_frågor_mjukt
    scene_009: ringer_per_magnus   # valfri
    scene_017: läs_noga            # dagbok
    scene_021: matat               # vinden
    scene_024: använd_nyckel       # mejeriet
    scene_026: öppna_trälåren
    scene_029: rädda               # vägen-valet
    scene_037: hymn
  expected_ending: slut_1

test_path_b:                   # "Aggressiv spelare, en blev kvar"
  inventory: [jaktkniv, ficklampa, mobilladdare, första_hjälpen, varma_kläder]
  key_choices:
    scene_003: inte_alls
    scene_005: undvik
    scene_008: hårda_frågor
    scene_021: skär
    scene_024: bryt_dig_in
    scene_029: rädda
    scene_037: strid
  expected_ending: slut_2_leopold

test_path_c:                   # "Offer-spelare, väktaren"
  inventory: [kassettbandspelare, extra_batterier, varma_kläder, första_hjälpen, ficklampa]
  key_choices:
    scene_021: matat
    scene_024: använd_nyckel
    scene_029: obeslutsam
    scene_034: lyssna_på_ingegerd
    scene_037: förhandling_accepterar
  expected_ending: slut_3

test_path_d:                   # NY: "Stoppa-vägen, Slut 1B"
  inventory: [kassettbandspelare, extra_batterier, varma_kläder, första_hjälpen, ficklampa]
  key_choices:
    scene_003: ärlig_oro
    scene_005: prata_öppet
    scene_009: ringer_per_magnus
    scene_017: läs_noga
    scene_018: läs_alla_namn
    scene_021: matat
    scene_024: använd_nyckel
    scene_026: öppna_trälåren
    scene_029: stoppa
    scene_030: besökt_myrgraven
    scene_034: lyssna_på_ingegerd
    scene_037: hög_sanity_stoppa_permanent
  expected_ending: slut_1b
```
