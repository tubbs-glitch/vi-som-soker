// Scen-id → SFX-id:n som triggas vid scen-entry.
//
// Mappar svenska scen-ID till våra procedurellt syntetiserade SFX.
// Detta är vad audio-engine actually kan spela; audio-map.ts behåller
// fil-mappningar för en framtida real-audio-pass.

import type { SfxId } from "./synth-engine";

export const SCENE_SFX: Record<string, SfxId[]> = {
  // Akt I
  "scene-001": ["phone_ring"],
  "scene-002": [],
  "scene-003": ["phone_ring"],
  "scene-004": ["wind_gust"],
  "scene-005": ["wind_gust"],
  "scene-006": ["wind_gust", "raven_distant"],
  "scene-007": ["raven_distant", "wind_gust"],
  "scene-008": ["footstep_gravel", "wind_gust"],
  "scene-010": ["door_creak"],

  // Akt II — huset
  "scene-011": ["footstep_wood", "clock_tick"],
  "scene-012": ["clock_tick", "vinyl_static"],
  "scene-013": ["footstep_wood"],
  "scene-014": ["clock_tick"],
  "scene-015": ["footstep_wood"],
  "scene-016": ["wind_gust"],
  "scene-017": [],
  "scene-018": [],
  "scene-019": [],
  "scene-021": ["wind_gust", "low_thud"],
  "scene-022": ["footstep_wood"],
  "scene-023": ["wind_gust"],
  "scene-024": ["door_creak", "wind_gust"],
  "scene-025": [],
  "scene-026": ["low_thud"],
  "scene-027": ["door_creak"],
  "scene-028": ["bulb_on", "vinyl_static"],

  // Tomt-scenerna
  "scene-100": ["wind_gust", "raven_distant"],
  "scene-101": ["wind_gust"],
  "scene-102": ["door_creak"],
  "scene-103": ["owl_wing", "owl_call"],
  "scene-104": ["footstep_wood"],
  "scene-105": ["saw_wood", "tree_fall", "fuse_click", "bulb_on"],
};

export function getSceneSfx(sceneId: string): SfxId[] {
  return SCENE_SFX[sceneId] ?? [];
}
