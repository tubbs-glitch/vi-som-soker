// Audio-mappning: scen-id → musik, ambient, och sfx_on_enter.
// Genererade ljudfiler (från Suno + ElevenLabs) placeras under web/public/audio/.
// Frontend importerar denna och spelar enligt schema.
//
// Se docs/audio-design.md för zon-karta och designprinciper.
// Se docs/suno-prompts.md för musik-prompts (8 + 1 bonus = 9 tracks).
// Se docs/sfx-list.md för SFX-specs (27 stycken).
//
// Placeholderfilnamn — när användaren har genererat ljudfiler, droppa dem
// i web/public/audio/{music,ambient,sfx}/ med exakt detta namn.

export interface SceneAudio {
  /** Bärande musikspår, loopas. Filsökväg relativ till /audio/. */
  music?: string;
  /** Loopande bakgrund (vind, knottlek, golvgnissel). Spelas under musiken. */
  ambient?: string;
  /** Engångs-effekter som triggas när scenen entras. */
  sfx_on_enter?: string[];
}

export const SCENE_AUDIO: Record<string, SceneAudio> = {
  // ---------- Akt I — Stockholm och resan norrut ----------
  "scene-001": {
    music: "music/intro.mp3",
    ambient: "ambient/city_night.mp3",
    sfx_on_enter: ["sfx/phone_ring_old.mp3", "sfx/subway_under.mp3"],
  },
  "scene-002": {
    music: "music/intro.mp3",
    ambient: "ambient/city_night.mp3",
  },
  "scene-003": {
    music: "music/intro.mp3",
    ambient: "ambient/city_night.mp3",
    sfx_on_enter: ["sfx/phone_ring_old.mp3"],
  },
  "scene-004": {
    music: "music/road_north.mp3",
    ambient: "ambient/car_interior.mp3",
  },
  "scene-005": {
    music: "music/road_north.mp3",
    ambient: "ambient/car_interior.mp3",
    sfx_on_enter: ["sfx/car_door_close.mp3"],
  },
  "scene-006": {
    music: "music/road_north.mp3",
    ambient: "ambient/car_interior.mp3",
    sfx_on_enter: ["sfx/storm_distant_loop.mp3"],
  },
  "scene-007": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    sfx_on_enter: [
      "sfx/car_door_close.mp3",
      "sfx/mosquito_summer_buzz.mp3",
      "sfx/raven_distant.mp3",
    ],
  },
  "scene-008": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    sfx_on_enter: ["sfx/steps_gravel.mp3", "sfx/dog_bark_distant.mp3"],
  },
  "scene-009": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    sfx_on_enter: ["sfx/phone_ring_old.mp3"],
  },
  "scene-010": {
    music: "music/house_interior.mp3",
    ambient: "ambient/house_creaks.mp3",
    sfx_on_enter: ["sfx/door_creak_wood.mp3"],
  },

  // ---------- Akt II — Huset, mejeriet, ritualen ----------
  "scene-011": {
    music: "music/house_interior.mp3",
    ambient: "ambient/house_creaks.mp3",
    sfx_on_enter: ["sfx/floor_creak_step.mp3"],
  },
  "scene-012": {
    music: "music/house_interior.mp3",
    ambient: "ambient/house_creaks.mp3",
    sfx_on_enter: ["sfx/rafter_pop.mp3"],
  },
  "scene-013": {
    music: "music/house_interior.mp3",
    ambient: "ambient/house_creaks.mp3",
    sfx_on_enter: ["sfx/clock_tick_wrong.mp3"],
  },
  "scene-014": {
    music: "music/house_interior.mp3",
    ambient: "ambient/house_creaks.mp3",
    sfx_on_enter: ["sfx/paper_rustle.mp3"],
  },
  "scene-015": {
    music: "music/upstairs.mp3",
    ambient: "ambient/house_creaks_upper.mp3",
    sfx_on_enter: ["sfx/steps_wood.mp3"],
  },
  "scene-016": {
    music: "music/upstairs.mp3",
    ambient: "ambient/house_creaks_upper.mp3",
    sfx_on_enter: ["sfx/door_creak_wood.mp3"],
  },
  "scene-017": {
    music: "music/upstairs.mp3",
    ambient: "ambient/house_creaks_upper.mp3",
    sfx_on_enter: ["sfx/paper_rustle.mp3"],
  },
  "scene-018": {
    music: "music/upstairs.mp3",
    ambient: "ambient/house_creaks_upper.mp3",
  },
  "scene-019": {
    music: "music/upstairs.mp3",
    ambient: "ambient/house_creaks_upper.mp3",
    sfx_on_enter: ["sfx/clock_tick_wrong.mp3"],
  },
  "scene-020": {
    music: "music/house_interior.mp3",
    ambient: "ambient/house_creaks.mp3",
    sfx_on_enter: ["sfx/phone_ring_old.mp3"],
  },
  "scene-021": {
    music: "music/attic.mp3",
    ambient: "ambient/attic_air.mp3",
    sfx_on_enter: ["sfx/rafter_pop.mp3"],
  },
  "scene-022": {
    music: "music/house_interior.mp3",
    ambient: "ambient/basement_drone.mp3",
    sfx_on_enter: ["sfx/steps_stone.mp3", "sfx/door_creak_wood.mp3"],
  },
  "scene-023": {
    music: "music/house_interior.mp3",
    ambient: "ambient/basement_drone.mp3",
  },
  "scene-024": {
    music: "music/dairy.mp3",
    ambient: "ambient/paper_room.mp3",
    sfx_on_enter: ["sfx/door_creak_wood.mp3", "sfx/myre_wind_loop.mp3"],
  },
  "scene-025": {
    music: "music/dairy.mp3",
    ambient: "ambient/paper_room.mp3",
    sfx_on_enter: ["sfx/paper_rustle.mp3"],
  },
  "scene-026": {
    music: "music/dairy.mp3",
    ambient: "ambient/paper_room.mp3",
    sfx_on_enter: ["sfx/paper_rustle.mp3"],
  },
  "scene-027": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    sfx_on_enter: [
      "sfx/steps_gravel.mp3",
      "sfx/mosquito_summer_buzz.mp3",
      "sfx/fuse_box_throw.mp3",
    ],
  },
  "scene-028": {
    music: "music/basement.mp3",
    ambient: "ambient/vinyl_static_loop.mp3",
    sfx_on_enter: ["sfx/record_starts_alone.mp3", "sfx/vinyl_needle_drop.mp3"],
  },
  "scene-029": {
    music: "music/basement.mp3",
    ambient: "ambient/basement_drone.mp3",
  },
  "scene-030": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    sfx_on_enter: [
      "sfx/steps_gravel.mp3",
      "sfx/mosquito_summer_buzz.mp3",
      "sfx/raven_distant.mp3",
    ],
  },
  "scene-031": {
    music: "music/basement.mp3",
    ambient: "ambient/vinyl_static_loop.mp3",
    sfx_on_enter: ["sfx/hymn_sustained_note.mp3", "sfx/steps_stone.mp3"],
  },

  // ---------- Akt III — Den grå ----------
  "scene-032": {
    music: "music/gray.mp3",
    ambient: "ambient/no_air.mp3",
    sfx_on_enter: ["sfx/gray_static.mp3"],
  },
  "scene-033": {
    music: "music/gray.mp3",
    ambient: "ambient/no_air.mp3",
    sfx_on_enter: ["sfx/gray_static.mp3"],
  },
  "scene-034": {
    music: "music/gray.mp3",
    ambient: "ambient/no_air.mp3",
  },
  "scene-035": {
    music: "music/gray.mp3",
    ambient: "ambient/no_air.mp3",
  },
  "scene-036": {
    music: "music/gray.mp3",
    ambient: "ambient/no_air.mp3",
  },
  "scene-037": {
    music: "music/gray.mp3",
    ambient: "ambient/no_air.mp3",
    sfx_on_enter: ["sfx/hymn_sustained_note.mp3"],
  },
  "scene-038": {
    music: "music/gray.mp3",
    ambient: "ambient/no_air.mp3",
  },

  // ---------- Slut ----------
  "scene-039": {
    music: "music/intro.mp3", // återvänder torrare
    ambient: "ambient/house_creaks.mp3",
  },
  "scene-040": {
    music: "music/intro.mp3",
    ambient: "ambient/house_creaks.mp3",
  },
  "scene-041": {
    music: "music/gray.mp3",
    ambient: "ambient/no_air.mp3",
  },
  "scene-042": {
    // Slut 4 — tystnaden. Ingen musik.
    ambient: "ambient/house_creaks.mp3",
  },
  "scene-043": {
    // Eftertext.
    music: "music/intro.mp3",
  },

  // ---------- Tomt-scener (100-105) — utomhus, sällskaps-tomten ----------
  "scene-100": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    sfx_on_enter: ["sfx/steps_gravel.mp3", "sfx/mosquito_summer_buzz.mp3"],
  },
  "scene-101": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    sfx_on_enter: ["sfx/tree_falling_thud.mp3", "sfx/raven_distant.mp3"],
  },
  "scene-102": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    sfx_on_enter: ["sfx/steps_gravel.mp3", "sfx/mosquito_summer_buzz.mp3"],
  },
  "scene-103": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    // Ugglan flyger upp i skjulet — scenens centrala event.
    sfx_on_enter: ["sfx/owl_wing_close.mp3", "sfx/door_creak_wood.mp3"],
  },
  "scene-104": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    sfx_on_enter: ["sfx/steps_gravel.mp3"],
  },
  "scene-105": {
    music: "music/myre.mp3",
    ambient: "ambient/myr_wind.mp3",
    sfx_on_enter: ["sfx/saw_on_wood.mp3", "sfx/mosquito_summer_buzz.mp3"],
  },
};

/**
 * Hämta audio-mappning för en scen.
 * Returnerar undefined om scenen inte är mappad — anropare ska tolka detta som "ingen ljudändring".
 */
export function getSceneAudio(sceneId: string): SceneAudio | undefined {
  return SCENE_AUDIO[sceneId];
}

/**
 * Hämta zon-id (t.ex. "zone_house_ground") baserat på scen.
 * Användbart för frontend som vill veta när crossfade behövs.
 */
export function getSceneZone(sceneId: string): string {
  const audio = SCENE_AUDIO[sceneId];
  if (!audio?.music) return "zone_silent";

  // Mappa music-filsökväg → zon-id för crossfade-logik
  const musicToZone: Record<string, string> = {
    "music/intro.mp3": "zone_intro",
    "music/road_north.mp3": "zone_road",
    "music/myre.mp3": "zone_outside",
    "music/house_interior.mp3": "zone_house_ground",
    "music/upstairs.mp3": "zone_house_upper",
    "music/attic.mp3": "zone_attic",
    "music/dairy.mp3": "zone_dairy",
    "music/basement.mp3": "zone_basement_ritual",
    "music/gray.mp3": "zone_gray",
  };

  return musicToZone[audio.music] ?? "zone_silent";
}

/**
 * Är det här en scen där all musik ska tystas (Slut 4 — tystnaden)?
 */
export function isSilentScene(sceneId: string): boolean {
  const audio = SCENE_AUDIO[sceneId];
  return !!audio && !audio.music;
}
