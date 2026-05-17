// Zustand store — tunt UI-skikt ovanpå story-engine.
// All spellogik bor i /lib/story-engine. Den här filen hanterar
// React-state + localStorage-sync + UI-fas (char-creation vs playing).

"use client";

import { create } from "zustand";
import {
  applyChoice as engineApplyChoice,
  createInitialState,
  deserializeState,
  makeItem,
  serializeState,
  setLanguage as engineSetLanguage,
  type Character,
  type Choice,
  type GameState,
  type ItemId,
  type Language,
  type Relations,
  type Room,
  type StoryFlags,
} from "./story-engine";
import { getCurrentRoom, getRoomDef } from "./house-map";

const STORAGE_KEY = "vi-som-soker:state";
const PHASE_KEY = "vi-som-soker:phase";
const STYLE_KEY = "vi-som-soker:image-style";

export type Phase = "char-creation" | "playing";
export type ImageStyle = "photo" | "illustration";

export interface StateDelta {
  sanity?: number;
  relations?: Partial<Record<keyof Relations, number>>;
  flags_set?: Record<string, unknown>;
  inventory_added?: ItemId[];
  inventory_removed?: ItemId[];
}

interface GameStore {
  state: GameState;
  phase: Phase;
  imageStyle: ImageStyle;
  hydrated: boolean;
  lastDelta: StateDelta | null;

  startGame: (character: Character) => void;
  applyPacking: (items: ItemId[], nextScene: string) => void;
  applyChoice: (choice: Choice) => void;
  goToRoom: (sceneId: string) => void;
  toggleFlashlight: () => void;
  setLanguage: (lang: Language) => void;
  setImageStyle: (style: ImageStyle) => void;
  reset: () => void;
  clearDelta: () => void;
  hydrate: () => void;
}

/** Uppdatera location.current_room + visited_rooms baserat på scen-id. */
function syncRoomFromScene(state: GameState): GameState {
  const room = getCurrentRoom(state.location.current_scene);
  if (!room) return state;
  const visited = state.location.visited_rooms.includes(room)
    ? state.location.visited_rooms
    : [...state.location.visited_rooms, room];
  if (state.location.current_room === room && visited === state.location.visited_rooms) {
    return state;
  }
  return {
    ...state,
    location: {
      ...state.location,
      current_room: room,
      visited_rooms: visited,
    },
  };
}

function loadFromStorage(): { state: GameState; phase: Phase } | null {
  if (typeof window === "undefined") return null;
  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);
    if (!rawState) return null;
    const state = deserializeState(rawState);
    const phase =
      (window.localStorage.getItem(PHASE_KEY) as Phase | null) ?? "playing";
    return { state, phase };
  } catch (err) {
    console.warn("Failed to load saved state:", err);
    return null;
  }
}

function persist(state: GameState, phase: Phase) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, serializeState(state));
    window.localStorage.setItem(PHASE_KEY, phase);
  } catch (err) {
    console.warn("Failed to persist state:", err);
  }
}

function computeDelta(before: GameState, after: GameState): StateDelta {
  const delta: StateDelta = {};

  if (after.sanity.value !== before.sanity.value) {
    delta.sanity = after.sanity.value - before.sanity.value;
  }

  const relChanges: Partial<Record<keyof Relations, number>> = {};
  for (const k of Object.keys(after.relations) as Array<keyof Relations>) {
    const d = after.relations[k] - before.relations[k];
    if (d !== 0) relChanges[k] = d;
  }
  if (Object.keys(relChanges).length) delta.relations = relChanges;

  const flagsChanged: Record<string, unknown> = {};
  const beforeFlags = before.story_flags as unknown as Record<string, unknown>;
  const afterFlags = after.story_flags as unknown as Record<string, unknown>;
  for (const k of Object.keys(afterFlags)) {
    if (beforeFlags[k] !== afterFlags[k]) {
      flagsChanged[k] = afterFlags[k];
    }
  }
  if (Object.keys(flagsChanged).length) delta.flags_set = flagsChanged;

  const beforeIds = new Set(before.inventory.items.map((i) => i.id));
  const afterIds = new Set(after.inventory.items.map((i) => i.id));
  const added: ItemId[] = [];
  for (const id of afterIds) if (!beforeIds.has(id)) added.push(id as ItemId);
  const removed: ItemId[] = [];
  for (const id of beforeIds) if (!afterIds.has(id)) removed.push(id as ItemId);
  if (added.length) delta.inventory_added = added;
  if (removed.length) delta.inventory_removed = removed;

  return delta;
}

export const useGameStore = create<GameStore>((set, get) => ({
  state: createInitialState(),
  phase: "char-creation",
  imageStyle: "illustration",
  hydrated: false,
  lastDelta: null,

  hydrate: () => {
    if (get().hydrated) return;
    const saved = loadFromStorage();
    let style: ImageStyle = "illustration";
    if (typeof window !== "undefined") {
      try {
        const s = window.localStorage.getItem(STYLE_KEY) as ImageStyle | null;
        if (s === "photo" || s === "illustration") style = s;
      } catch {}
    }
    if (saved) {
      set({ state: saved.state, phase: saved.phase, imageStyle: style, hydrated: true });
    } else {
      set({ imageStyle: style, hydrated: true });
    }
  },

  setImageStyle: (style) => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STYLE_KEY, style);
      } catch {}
    }
    set({ imageStyle: style });
  },

  startGame: (character) => {
    const next = createInitialState(character, [], get().state.meta.language);
    persist(next, "playing");
    set({ state: next, phase: "playing", lastDelta: null });
  },

  applyPacking: (items, nextScene) => {
    const before = get().state;
    const newItems = items.map(makeItem);
    const inventory = { ...before.inventory, items: newItems };
    const intermediate: GameState = {
      ...before,
      inventory,
      story_flags: {
        ...before.story_flags,
        har_ljus: newItems.some((it) => it.tags.includes("ljus")),
      } as StoryFlags,
      location: {
        ...before.location,
        current_scene: nextScene,
        visited_scenes: before.location.visited_scenes.includes(
          before.location.current_scene,
        )
          ? before.location.visited_scenes
          : [...before.location.visited_scenes, before.location.current_scene],
      },
    };
    const after = syncRoomFromScene(intermediate);
    const delta = computeDelta(before, after);
    persist(after, "playing");
    set({ state: after, lastDelta: delta });
  },

  applyChoice: (choice) => {
    const before = get().state;
    const after = syncRoomFromScene(engineApplyChoice(choice, before));
    const delta = computeDelta(before, after);
    persist(after, get().phase);
    set({ state: after, lastDelta: delta });
  },

  /**
   * Navigera direkt till en scen via map-klick. Bygger en syntetisk choice
   * så att state-flödet är konsekvent (loggas i choices_log).
   */
  goToRoom: (sceneId) => {
    const before = get().state;
    const synthetic: Choice = {
      id: `${before.location.current_scene}-map-to-${sceneId}`,
      text: "(via karta)",
      next_scene: sceneId,
    };
    const after = syncRoomFromScene(engineApplyChoice(synthetic, before));
    const delta = computeDelta(before, after);
    persist(after, get().phase);
    set({ state: after, lastDelta: delta });
  },

  setLanguage: (lang) => {
    const next = engineSetLanguage(get().state, lang);
    persist(next, get().phase);
    set({ state: next });
  },

  toggleFlashlight: () => {
    const before = get().state;
    const flags = before.story_flags as unknown as Record<string, unknown>;
    const current = Boolean(flags.flashlight_on);
    const next: GameState = {
      ...before,
      story_flags: {
        ...before.story_flags,
        flashlight_on: !current,
      } as StoryFlags,
    };
    persist(next, get().phase);
    set({ state: next });
  },

  reset: () => {
    const fresh = createInitialState(undefined, [], get().state.meta.language);
    persist(fresh, "char-creation");
    set({ state: fresh, phase: "char-creation", lastDelta: null });
  },

  clearDelta: () => set({ lastDelta: null }),
}));
