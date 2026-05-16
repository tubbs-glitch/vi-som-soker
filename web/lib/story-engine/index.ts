// Publikt API (klient-säkert). Inkluderar typer, state-funktioner, parser och
// klient-loader. Server-loadern (Node fs) finns separat i `./server` så att den
// inte dras in i klient-bundles.
//
// Se README.md för dokumentation av API:t.

export * from "./types";
export { makeItem, ALL_ITEM_IDS } from "./items";
export {
  createInitialState,
  defaultCharacter,
  applyChoice,
  canChoose,
  visibleChoices,
  hasTag,
  tagCount,
  hasItem,
  isPrepared,
  sanityLabel,
  sanityIsHigh,
  serializeState,
  deserializeState,
  migrateState,
  resolveNextScene,
  setLanguage,
} from "./state";
export { parseScene } from "./parser";
export { loadSceneClient } from "./loader-client";
