// Server-side scen-loader. Importera ENDAST från Server Components,
// route-handlers, eller andra Node-only moduler.
//
// För klient-fetch: använd `loadSceneClient` från `./loader-client` (eller
// re-export i `./index`).

import fs from "node:fs/promises";
import path from "node:path";

import { parseScene } from "./parser";
import type { Language, Scene } from "./types";

/** Läs scen från `content/scenes/`. Server-only. */
export async function loadSceneServer(
  sceneId: string,
  language: Language,
  baseDir: string = path.join(process.cwd(), "content", "scenes"),
): Promise<Scene | null> {
  const file = path.join(baseDir, `${sceneId}.${language}.md`);
  try {
    const raw = await fs.readFile(file, "utf8");
    return parseScene(raw, sceneId);
  } catch (err) {
    const e = err as NodeJS.ErrnoException;
    if (e.code === "ENOENT") return null;
    throw err;
  }
}

/** Lista alla scen-id:n för ett givet språk. Server-only. */
export async function listScenesServer(
  language: Language,
  baseDir: string = path.join(process.cwd(), "content", "scenes"),
): Promise<string[]> {
  try {
    const files = await fs.readdir(baseDir);
    const suffix = `.${language}.md`;
    return files
      .filter((f) => f.endsWith(suffix))
      .map((f) => f.slice(0, -suffix.length))
      .sort();
  } catch (err) {
    const e = err as NodeJS.ErrnoException;
    if (e.code === "ENOENT") return [];
    throw err;
  }
}
