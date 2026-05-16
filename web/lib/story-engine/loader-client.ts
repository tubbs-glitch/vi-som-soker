// Client-side scen-loader. Använder bara fetch — inga Node-imports.

import type { Language, Scene } from "./types";

export async function loadSceneClient(
  sceneId: string,
  language: Language,
): Promise<Scene | null> {
  const res = await fetch(`/api/scenes/${sceneId}/${language}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`scene fetch failed: ${res.status}`);
  return (await res.json()) as Scene;
}
