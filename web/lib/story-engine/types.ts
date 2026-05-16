// Story Engine — typdefinitioner
// Implementerar datamodellen från /docs/data-model.md.
// Dessa typer är källan till sanning; iOS-versionen måste matcha 1:1.
// INGEN React-import får finnas i denna fil.

// ---------------------------------------------------------------------------
// 1. Top-level GameState
// ---------------------------------------------------------------------------

export interface GameState {
  version: 1;
  character: Character;
  sanity: Sanity;
  wounds: WoundFlag[];
  inventory: Inventory;
  relations: Relations;
  story_flags: StoryFlags;
  location: Location;
  meta: Meta;
}

// ---------------------------------------------------------------------------
// 2. Character
// ---------------------------------------------------------------------------

export type Gender = "man" | "kvinna" | "ickebinär" | "otydlig";

export type Hair = "mörkt" | "ljust" | "rödaktigt" | "grånat_tidigt";
export type Build = "smal" | "vanlig" | "tung" | "senig";
export type Feature =
  | "ärr_ögonbryn"
  | "stelnad_ringfinger"
  | "tatuering_underarm"
  | "örhängering"
  | "inget";

export type Background =
  | "studerande"
  | "fysisk"
  | "empatisk"
  | "ifrågasättande"
  | "default";

export interface CharacterStats {
  sty: number; // Styrka 0-10
  dex: number; // Smidighet 0-10
  för: number; // Förstånd 0-10
  mod: number; // Mod 0-10
}

export interface Character {
  name: string;
  gender: Gender;
  appearance: {
    hair: Hair;
    build: Build;
    feature: Feature;
  };
  background: Background;
  stats: CharacterStats;
}

// Convenience-alias kvar för bakåtkomp under tidig utveckling.
export type CharacterState = Character;

// ---------------------------------------------------------------------------
// 3. Sanity
// ---------------------------------------------------------------------------

export interface Sanity {
  value: number; // 0-100 clamp:ad
}

export type SanityLabel =
  | "fokuserad"
  | "skakad"
  | "vacklande"
  | "söndertrasad"
  | "avgrund";

// ---------------------------------------------------------------------------
// 4. Wounds
// ---------------------------------------------------------------------------

export type WoundFlag =
  | "skuren_hand"
  | "kontusion_skalle"
  | "vriden_ankel"
  | "andnod"
  | "kallnad_märg";

// ---------------------------------------------------------------------------
// 5. Inventory
// ---------------------------------------------------------------------------

export type ItemId =
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

export type Tag =
  | "skarpt"
  | "vapen"
  | "arv"
  | "ljus"
  | "signal"
  | "frekvens"
  | "verktyg"
  | "vård"
  | "kommunikation"
  | "komfort"
  | "mat"
  | "ljud"
  | "ritual"
  | "signe"
  | "kunskap"
  | "intim"
  | "helig"
  | "sallskap"
  | "tung";

export interface Item {
  id: ItemId;
  name: string;
  description: string;
  tags: Tag[];
  consumable: boolean;
  uses_remaining?: number;
}

export interface Inventory {
  items: Item[];
  max_at_start: 5;
}

// Convenience-alias.
export type ChoiceOption = Choice;

// ---------------------------------------------------------------------------
// 6. Relations
// ---------------------------------------------------------------------------

export interface Relations {
  alice: number; // -10..+10
  leopold: number; // -10..+10
  gunnar: number; // 0..10
  mamma: number; // -3..+3
  det_grå: number; // -5..+5
  vinds_tinget: number; // 0..3
  ingegerd_eko: number; // 0..3
  bertil_eko: number; // 0..2
  astrid_eko: number; // 0..1
}

// ---------------------------------------------------------------------------
// 7. Story Flags
// ---------------------------------------------------------------------------

export interface StoryFlags {
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
  har_ljus: boolean;
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
  vinds_tinget_status:
    | null
    | "sett"
    | "matat"
    | "sårat"
    | "dödat"
    | "undviket";
  ström_på: boolean;
  hymnen_börjat: boolean;
  ritual_korrekt: null | "full" | "partial" | "nej";
  salt_riktning: null | "medurs" | "motsols" | "ingen";
  klivit_in_i_portalen: boolean;
  vagval_intention: null | "rädda" | "stoppa" | "obeslutsam";

  // Akt III
  grå_riktning:
    | null
    | "alice_först"
    | "leopold_först"
    | "signe_först"
    | "ingegerd_först"
    | "tyst";
  talat_med_ingegerd: boolean;
  talat_om_bertil_med_leopold: boolean;
  leopold_med: boolean;
  alice_med: boolean;
  alice_övertygad_med:
    | null
    | "kärlek"
    | "skuld"
    | "mamma"
    | "leopold"
    | "hundarna"
    | "bertil"
    | "myrgraven"
    | "sallskapet"
    | "ingegerds_budskap";
  valt_offra_sig: boolean;
  besegrat_det_grå: boolean;
  förstod_det_grå: boolean;
  stoppat_permanent: boolean;
}

// ---------------------------------------------------------------------------
// 8. Location
// ---------------------------------------------------------------------------

export type Room =
  | "trappan"
  | "hall"
  | "vardagsrum"
  | "kök"
  | "leopolds_arbetsrum"
  | "övre_hallen"
  | "alices_sovrum"
  | "gästrum"
  | "badrum"
  | "vinden"
  | "källare_förvar"
  | "källare_ritual"
  | "vedboden"
  | "trädgård"
  | "bilen"
  | "mejeribyggnaden"
  | "myrstig";

export interface Location {
  current_scene: string;
  current_room: Room | null;
  visited_scenes: string[];
  visited_rooms: Room[];
}

// ---------------------------------------------------------------------------
// 9. Meta
// ---------------------------------------------------------------------------

export type Ending =
  | null
  | "slut_1"
  | "slut_1b"
  | "slut_2_alice"
  | "slut_2_leopold"
  | "slut_3"
  | "slut_4";

export type Language = "sv" | "en";

export interface ChoiceLogEntry {
  scene_id: string;
  choice_id: string;
  timestamp: number;
  state_delta_summary?: string;
}

export interface Meta {
  current_act: 1 | 2 | 3;
  playtime_seconds: number;
  ending: Ending;
  choices_log: ChoiceLogEntry[];
  language: Language;
}

// ---------------------------------------------------------------------------
// 10. Scene + Choice
// ---------------------------------------------------------------------------

export type SceneType = "BN" | "sb" | "G" | "H" | "E";

export interface ChoiceRequirements {
  tags?: Tag[];
  tag_count?: Partial<Record<Tag, number>>;
  items?: ItemId[];
  stats?: Partial<Record<keyof CharacterStats, number>>;
  sanity_min?: number;
  sanity_max?: number;
  flags?: Partial<StoryFlags>;
  relations?: Partial<Record<keyof Relations, number>>;
  no_wounds?: WoundFlag[];
  background?: Background[];
}

export interface ChoiceConsequence {
  sanity_delta?: number;
  wounds_add?: WoundFlag[];
  wounds_remove?: WoundFlag[];
  inventory_add?: ItemId[];
  inventory_remove?: ItemId[];
  flags_set?: Partial<StoryFlags>;
  relations_delta?: Partial<Relations>;
  stat_delta?: Partial<CharacterStats>;
}

export interface Choice {
  id: string;
  text: string;
  /** Outcome-prosa som visas mellan klick och next_scene. Optional. */
  body?: string;
  requires?: ChoiceRequirements;
  is_red_check?: boolean;
  consequences?: ChoiceConsequence;
  next_scene: string;
}

export interface Scene {
  id: string;
  title: string;
  language: Language;
  act: 1 | 2 | 3;
  type: SceneType;
  triggers: string[];
  exits: string[];
  prose: string; // markdown-prosa (default — mörker / Akt I-stil)
  /** Alternativ prosa när spelaren använder ficklampa (har_ljus+flashlight_on). */
  prose_flashlight?: string;
  /** Alternativ prosa när strömmen är på (ström_på=true). */
  prose_power_on?: string;
  /** Kort återbesöks-prosa när scenen redan besökts. */
  prose_revisit?: string;
  choices: Choice[];
  on_enter?: ChoiceConsequence;
  on_exit?: ChoiceConsequence;
}

// Convenience-alias: SceneFile är samma struktur som Scene (parsad från md).
export type SceneFile = Scene;

// ---------------------------------------------------------------------------
// 11. canChoose result
// ---------------------------------------------------------------------------

export interface CanChooseResult {
  allowed: boolean;
  reason?: string;
}
