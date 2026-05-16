import { loadSceneServer } from "@/lib/story-engine/loader";
import GameRoot from "@/components/GameRoot";

// RSC: ladda scene-001.sv som initial scen (server-side). Klienten kan sedan
// byta scen/språk via store + /api/scenes-route.
export default async function Home() {
  const scene = await loadSceneServer("scene-001", "sv");
  if (!scene) {
    return (
      <main className="mx-auto max-w-prose px-6 py-12">
        <p className="text-muted italic">
          scene-001.sv.md saknas i <code>content/scenes/</code>.
        </p>
      </main>
    );
  }
  return <GameRoot initialScene={scene} />;
}
