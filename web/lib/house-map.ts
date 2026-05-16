// House Map — Hällmyren
// ---------------------------------------------------------------------------
// Klickbar planritning för "Vi som söker". Frontend importerar HOUSE_MAP
// och renderar varje floor på en grid 0-100. Helpers nedan är pure och
// testbara.
//
// Specifikation: /docs/house-map.md
// Typer: /web/lib/story-engine/types.ts
// ---------------------------------------------------------------------------

import type { Room, StoryFlags } from "./story-engine/types";

export type Floor = "outside" | "ground" | "upper" | "attic" | "basement";

export type RevealState = "unknown" | "glimpsed" | "visited" | "current";

/** Symbol-typer som kan ritas inuti rummen som handritade möbel-skisser. */
export type FurnitureSymbol =
  | "bed"
  | "turntable"
  | "kakelugn"
  | "desk"
  | "table"
  | "sofa"
  | "stove"
  | "tub"
  | "leashes"
  | "stairs_up"
  | "stairs_down"
  | "circle"
  | "owl"
  | "tree"
  | "graves"
  | "well"
  | "car"
  | "shed_doors"
  | "ladder"
  | "trunk"
  | "boxes"
  | "wardrobe"
  | "easel";

export interface Furniture {
  /** Position inuti rummet, 0-100 relativt rummets bounding box */
  x: number;
  y: number;
  symbol: FurnitureSymbol;
}

export interface RoomDef {
  id: Room;
  label_sv: string;
  label_en: string;
  floor: Floor;
  /** Bounding box på floor-grid 0-100. x=horisontellt, y=vertikalt (nedåt). */
  x: number;
  y: number;
  width: number;
  height: number;
  /** Scen-id:n som hör hit. Används för current-room-mappning. */
  scene_ids: string[];
  /** Scen som triggas vid klick på rummet (vanligen scene_ids[0]). */
  entry_scene_id: string;
  /** Angränsande rum — används för glimpsed-state. */
  adjacent: Room[];
  /**
   * Krav för att rummet ska vara synligt på kartan över huvud taget.
   * Om saknad: rummet är synligt enligt standardregler (visited eller
   * glimpsed via adjacent). Om satt: båda standardreglerna OCH detta
   * villkor måste vara uppfyllt.
   */
  reveal_when?: {
    visited_room?: Room;
    flag_set?: keyof StoryFlags;
  };
  /** Kort tooltip på glimpsed-rum. Max ~8 ord. */
  hint_sv?: string;
  hint_en?: string;
  /** Handritade möbel-symboler för att illustrera rummet på kartan. */
  furniture?: Furniture[];
}

// ---------------------------------------------------------------------------
// HOUSE_MAP — själva datan
// ---------------------------------------------------------------------------

export const HOUSE_MAP: RoomDef[] = [
  // -------------------------------------------------------------------------
  // OUTSIDE
  // -------------------------------------------------------------------------
  {
    id: "trappan",
    label_sv: "Trappan",
    label_en: "The Steps",
    floor: "outside",
    x: 35,
    y: 78,
    width: 30,
    height: 10,
    scene_ids: ["scene-008", "scene-010"],
    entry_scene_id: "scene-010",
    adjacent: ["hall", "trädgård", "vedboden", "bilen", "mejeribyggnaden"],
    hint_sv: "Hällen där nyckeln ligger.",
    hint_en: "The stone the key sits under.",
    furniture: [{ x: 50, y: 50, symbol: "stairs_up" }],
  },
  {
    id: "trädgård",
    label_sv: "Trädgården",
    label_en: "The Garden",
    floor: "outside",
    x: 60,
    y: 10,
    width: 35,
    height: 55,
    scene_ids: [],
    entry_scene_id: "scene-010",
    adjacent: ["trappan", "vedboden", "mejeribyggnaden", "myrstig"],
    hint_sv: "Tre rönnar. Sju gravar.",
    hint_en: "Three rowans. Seven graves.",
    furniture: [
      { x: 30, y: 30, symbol: "tree" },
      { x: 50, y: 35, symbol: "tree" },
      { x: 70, y: 30, symbol: "tree" },
      { x: 40, y: 65, symbol: "graves" },
      { x: 75, y: 75, symbol: "well" },
    ],
  },
  {
    id: "vedboden",
    label_sv: "Vedboden",
    label_en: "The Woodshed",
    floor: "outside",
    x: 5,
    y: 85,
    width: 22,
    height: 13,
    scene_ids: ["scene-027"],
    entry_scene_id: "scene-027",
    adjacent: ["trappan", "trädgård"],
    hint_sv: "Säkringsskåpet och en uggla.",
    hint_en: "The fuse box and an owl.",
    furniture: [
      { x: 30, y: 50, symbol: "owl" },
      { x: 70, y: 50, symbol: "shed_doors" },
    ],
  },
  {
    id: "bilen",
    label_sv: "Bilen",
    label_en: "The Car",
    floor: "outside",
    x: 73,
    y: 85,
    width: 22,
    height: 13,
    scene_ids: [],
    entry_scene_id: "scene-010",
    adjacent: ["trappan"],
    hint_sv: "Bilen står där du parkerade.",
    hint_en: "The car where you parked it.",
    furniture: [{ x: 50, y: 50, symbol: "car" }],
  },
  {
    id: "mejeribyggnaden",
    label_sv: "Mejeribyggnaden",
    label_en: "The Old Dairy",
    floor: "outside",
    x: 5,
    y: 20,
    width: 28,
    height: 30,
    scene_ids: ["scene-024", "scene-025", "scene-026"],
    entry_scene_id: "scene-024",
    adjacent: ["trappan", "trädgård", "myrstig"],
    reveal_when: { flag_set: "vet_om_sallskapet_rykte" },
    hint_sv: "Falurött plåt. Svart dörr.",
    hint_en: "Falu-red sheet metal. Black door.",
    furniture: [
      { x: 50, y: 40, symbol: "easel" },
      { x: 35, y: 65, symbol: "table" },
    ],
  },
  {
    id: "myrstig",
    label_sv: "Myrstigen",
    label_en: "The Bog Path",
    floor: "outside",
    x: 18,
    y: 3,
    width: 10,
    height: 18,
    scene_ids: ["scene-030"],
    entry_scene_id: "scene-030",
    adjacent: ["trädgård", "mejeribyggnaden"],
    reveal_when: { flag_set: "vet_om_bertil" },
    hint_sv: "Plankor som rasat.",
    hint_en: "Collapsed plank-path.",
  },

  // -------------------------------------------------------------------------
  // GROUND — rum delar väggar (tessellated layout 5-95)
  // -------------------------------------------------------------------------
  // Layout:
  //   +-- KÖK ----+----- VARDAGSRUM -------+
  //   |           |                        |
  //   +-----+---- + -----+-----------------+
  //   |     |     |      |                 |
  //   |  HALL    (door)  |    LEOPOLDS     |
  //   |           |      |                 |
  //   +-----------+------+-----------------+
  {
    id: "kök",
    label_sv: "Köket",
    label_en: "The Kitchen",
    floor: "ground",
    x: 5,
    y: 5,
    width: 40,
    height: 40,
    scene_ids: ["scene-013"],
    entry_scene_id: "scene-013",
    adjacent: ["hall", "vardagsrum"],
    hint_sv: "Kylskåpet har gått sönder.",
    hint_en: "The fridge has broken.",
    furniture: [
      { x: 25, y: 35, symbol: "stove" },
      { x: 70, y: 60, symbol: "table" },
    ],
  },
  {
    id: "vardagsrum",
    label_sv: "Vardagsrummet",
    label_en: "The Living Room",
    floor: "ground",
    x: 45,
    y: 5,
    width: 50,
    height: 40,
    scene_ids: ["scene-012"],
    entry_scene_id: "scene-012",
    adjacent: ["hall", "kök", "leopolds_arbetsrum"],
    hint_sv: "Skivspelaren snurrar inte.",
    hint_en: "The record player isn't spinning.",
    furniture: [
      { x: 30, y: 70, symbol: "sofa" },
      { x: 30, y: 45, symbol: "table" },
      { x: 75, y: 70, symbol: "turntable" },
      { x: 75, y: 25, symbol: "kakelugn" },
    ],
  },
  {
    id: "hall",
    label_sv: "Hallen",
    label_en: "The Hall",
    floor: "ground",
    x: 5,
    y: 45,
    width: 65,
    height: 50,
    scene_ids: ["scene-011"],
    entry_scene_id: "scene-011",
    adjacent: [
      "trappan",
      "vardagsrum",
      "kök",
      "leopolds_arbetsrum",
      "övre_hallen",
      "källare_förvar",
    ],
    hint_sv: "Sju koppel. En krok är tom.",
    hint_en: "Seven leashes. One hook is empty.",
    furniture: [
      { x: 20, y: 25, symbol: "leashes" },
      { x: 50, y: 60, symbol: "stairs_up" },
      { x: 30, y: 85, symbol: "stairs_down" },
    ],
  },
  {
    id: "leopolds_arbetsrum",
    label_sv: "Leopolds arbetsrum",
    label_en: "Leopold's Study",
    floor: "ground",
    x: 70,
    y: 45,
    width: 25,
    height: 50,
    scene_ids: ["scene-014"],
    entry_scene_id: "scene-014",
    adjacent: ["hall", "vardagsrum"],
    hint_sv: "Ett fotografi. Sju ansikten.",
    hint_en: "A photograph. Seven faces.",
    furniture: [
      { x: 50, y: 35, symbol: "desk" },
      { x: 50, y: 75, symbol: "easel" },
    ],
  },

  // -------------------------------------------------------------------------
  // UPPER — samma layout-princip
  // -------------------------------------------------------------------------
  {
    id: "alices_sovrum",
    label_sv: "Alices sovrum",
    label_en: "Alice's Bedroom",
    floor: "upper",
    x: 5,
    y: 5,
    width: 40,
    height: 40,
    scene_ids: ["scene-017"],
    entry_scene_id: "scene-017",
    adjacent: ["övre_hallen", "gästrum"],
    hint_sv: "Bädden är orörd.",
    hint_en: "The bed is untouched.",
    furniture: [
      { x: 30, y: 50, symbol: "bed" },
      { x: 75, y: 25, symbol: "wardrobe" },
    ],
  },
  {
    id: "gästrum",
    label_sv: "Gästrummet",
    label_en: "The Guest Room",
    floor: "upper",
    x: 45,
    y: 5,
    width: 50,
    height: 40,
    scene_ids: ["scene-018"],
    entry_scene_id: "scene-018",
    adjacent: ["övre_hallen", "alices_sovrum", "badrum"],
    hint_sv: "En lackad träbox på hyllan.",
    hint_en: "A lacquered wooden box on a shelf.",
    furniture: [
      { x: 30, y: 55, symbol: "bed" },
      { x: 75, y: 30, symbol: "trunk" },
    ],
  },
  {
    id: "övre_hallen",
    label_sv: "Övre hallen",
    label_en: "The Upper Hall",
    floor: "upper",
    x: 5,
    y: 45,
    width: 65,
    height: 50,
    scene_ids: ["scene-015", "scene-016"],
    entry_scene_id: "scene-016",
    adjacent: ["hall", "alices_sovrum", "gästrum", "badrum", "vinden"],
    hint_sv: "Fyra dörrar. En lucka.",
    hint_en: "Four doors. One hatch.",
    furniture: [
      { x: 50, y: 30, symbol: "ladder" },
      { x: 70, y: 80, symbol: "stairs_down" },
    ],
  },
  {
    id: "badrum",
    label_sv: "Badrummet",
    label_en: "The Bathroom",
    floor: "upper",
    x: 70,
    y: 45,
    width: 25,
    height: 50,
    scene_ids: ["scene-019"],
    entry_scene_id: "scene-019",
    adjacent: ["övre_hallen", "gästrum"],
    hint_sv: "En kran droppar.",
    hint_en: "A tap drips.",
    furniture: [{ x: 50, y: 50, symbol: "tub" }],
  },

  // -------------------------------------------------------------------------
  // ATTIC
  // -------------------------------------------------------------------------
  {
    id: "vinden",
    label_sv: "Vinden",
    label_en: "The Attic",
    floor: "attic",
    x: 18,
    y: 22,
    width: 65,
    height: 30,
    scene_ids: ["scene-021"],
    entry_scene_id: "scene-021",
    adjacent: ["övre_hallen"],
    hint_sv: "Något står i halvmörker.",
    hint_en: "Something stands in half-light.",
    furniture: [
      { x: 30, y: 60, symbol: "trunk" },
      { x: 75, y: 40, symbol: "owl" },
    ],
  },

  // -------------------------------------------------------------------------
  // BASEMENT
  // -------------------------------------------------------------------------
  {
    id: "källare_förvar",
    label_sv: "Källaren — förvar",
    label_en: "Cellar — Storage",
    floor: "basement",
    x: 18,
    y: 10,
    width: 65,
    height: 22,
    // scene-022 (källartrappan) hanteras som transit men placeras här
    scene_ids: ["scene-022", "scene-023"],
    entry_scene_id: "scene-023",
    adjacent: ["hall", "källare_ritual"],
    hint_sv: "Lådor, fukt, en myrtrösk.",
    hint_en: "Crates, damp, an old peat-flail.",
    furniture: [
      { x: 25, y: 50, symbol: "boxes" },
      { x: 70, y: 50, symbol: "boxes" },
    ],
  },
  {
    id: "källare_ritual",
    label_sv: "Källaren — ritualrummet",
    label_en: "Cellar — Ritual Room",
    floor: "basement",
    x: 18,
    y: 42,
    width: 65,
    height: 32,
    scene_ids: ["scene-031"],
    entry_scene_id: "scene-031",
    adjacent: ["källare_förvar"],
    hint_sv: "Mur, cirkel, tjärsten.",
    hint_en: "Brick, circle, tar-salt.",
    furniture: [
      { x: 50, y: 50, symbol: "circle" },
      { x: 25, y: 30, symbol: "turntable" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers — pure, testbara
// ---------------------------------------------------------------------------

/**
 * Returnerar vilket rum spelaren befinner sig i baserat på aktuell scen.
 * Returnerar null om scenen inte mappas till något rum (ex. Akt I-resor).
 */
export function getCurrentRoom(sceneId: string): Room | null {
  for (const def of HOUSE_MAP) {
    if (def.scene_ids.includes(sceneId)) {
      return def.id;
    }
  }
  return null;
}

/**
 * Returnerar alla rum på en specifik våning, i deklarationsordning.
 */
export function getRoomsOnFloor(floor: Floor): RoomDef[] {
  return HOUSE_MAP.filter((r) => r.floor === floor);
}

/**
 * Hämtar en RoomDef via id. Returnerar undefined om id är okänt.
 */
export function getRoomDef(room: Room): RoomDef | undefined {
  return HOUSE_MAP.find((r) => r.id === room);
}

/**
 * Avgör reveal-state för ett rum givet spelarens nuvarande state.
 *
 * Algoritm:
 *   1. Om reveal_when är satt och INTE uppfylld → "unknown".
 *   2. Annars: hämta current room via getCurrentRoom(visitedScenes.at(-1)).
 *   3. Om current-rummet === detta rum → "current".
 *   4. Om rummet finns i visitedRooms → "visited".
 *   5. Om något visited-rum har detta rum i sin `adjacent`-lista → "glimpsed".
 *   6. Annars → "unknown".
 *
 * @param room          rummet att kolla
 * @param visitedRooms  spelarens lista av besökta rum (location.visited_rooms)
 * @param visitedScenes spelarens scen-historik — sista elementet är current
 * @param flags         spelarens story_flags
 */
export function isRoomVisible(
  room: Room,
  visitedRooms: Room[],
  visitedScenes: string[],
  flags: StoryFlags,
): RevealState {
  const def = getRoomDef(room);
  if (!def) return "unknown";

  // 1. Reveal-villkor — om satt och ej uppfyllt: rummet existerar inte än.
  if (def.reveal_when) {
    const condRoomOk = def.reveal_when.visited_room
      ? visitedRooms.includes(def.reveal_when.visited_room)
      : true;
    const condFlagOk = def.reveal_when.flag_set
      ? Boolean(flags[def.reveal_when.flag_set])
      : true;
    if (!condRoomOk || !condFlagOk) return "unknown";
  }

  // 2. Current?
  const currentSceneId =
    visitedScenes.length > 0 ? visitedScenes[visitedScenes.length - 1] : null;
  const currentRoom = currentSceneId ? getCurrentRoom(currentSceneId) : null;
  if (currentRoom === room) return "current";

  // 3. Visited?
  if (visitedRooms.includes(room)) return "visited";

  // 4. Glimpsed via adjacency? — något besökt rum måste ha `room` i sin
  //    adjacent-lista.
  for (const visited of visitedRooms) {
    const visitedDef = getRoomDef(visited);
    if (visitedDef?.adjacent.includes(room)) {
      return "glimpsed";
    }
  }

  return "unknown";
}

/**
 * Bekvämlighet: hämta alla våningar i visningsordning.
 */
export const FLOOR_ORDER: Floor[] = [
  "outside",
  "ground",
  "upper",
  "attic",
  "basement",
];

/**
 * Labels på svenska för floor-bläddraren.
 */
export const FLOOR_LABELS_SV: Record<Floor, string> = {
  outside: "Ute",
  ground: "Botten",
  upper: "Övre",
  attic: "Vinden",
  basement: "Källare",
};

/**
 * Labels på engelska för floor-bläddraren.
 */
export const FLOOR_LABELS_EN: Record<Floor, string> = {
  outside: "Outside",
  ground: "Ground",
  upper: "Upper",
  attic: "Attic",
  basement: "Cellar",
};
