import { NextResponse } from "next/server";
import { listScenesServer, loadSceneServer } from "@/lib/story-engine/loader";
import type { Language } from "@/lib/story-engine";

// Pre-render alla scen/språk-kombinationer vid build → fungerar med static export.
export const dynamic = "force-static";

export async function generateStaticParams() {
  const sv = await listScenesServer("sv");
  const en = await listScenesServer("en");
  const allIds = Array.from(new Set([...sv, ...en]));
  return allIds.flatMap((id) => [
    { id, lang: "sv" },
    { id, lang: "en" },
  ]);
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string; lang: string } },
) {
  const { id, lang } = params;
  if (lang !== "sv" && lang !== "en") {
    return NextResponse.json({ error: "invalid language" }, { status: 400 });
  }
  const scene = await loadSceneServer(id, lang as Language);
  if (!scene) {
    return NextResponse.json({ error: "scene not found" }, { status: 404 });
  }
  return NextResponse.json(scene);
}
