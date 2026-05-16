"use client";

import { useMemo, useState } from "react";
import {
  FLOOR_LABELS_EN,
  FLOOR_LABELS_SV,
  FLOOR_ORDER,
  HOUSE_MAP,
  getCurrentRoom,
  getRoomsOnFloor,
  isRoomVisible,
  type Floor,
  type RoomDef,
} from "@/lib/house-map";
import type { GameState, Room } from "@/lib/story-engine";
import { useGameStore } from "@/lib/store";
import FurnitureSymbols from "./FurnitureSymbols";

interface Props {
  open: boolean;
  onClose: () => void;
}

const FLOOR_DESCRIPTIONS_SV: Record<Floor, string> = {
  outside: "Tomten och byggnaderna runt huset.",
  ground: "Bottenvåningen — hall, kök, vardagsrum, arbetsrum.",
  upper: "Övre våningen — sovrum, gästrum, badrum.",
  attic: "Vinden — där fotstegen leder.",
  basement: "Källaren — där portalen står.",
};
const FLOOR_DESCRIPTIONS_EN: Record<Floor, string> = {
  outside: "The plot and outbuildings.",
  ground: "Ground floor — hall, kitchen, living room, study.",
  upper: "Upper floor — bedrooms, guest room, bath.",
  attic: "The attic — where the footprints lead.",
  basement: "The cellar — where the portal stands.",
};

export default function HouseMap({ open, onClose }: Props) {
  const state = useGameStore((s) => s.state);
  const goToRoom = useGameStore((s) => s.goToRoom);
  const lang = state.meta.language;
  const isEn = lang === "en";

  // Decide initial floor: where the player currently is, or the highest revealed floor.
  const currentSceneId = state.location.current_scene;
  const currentRoom = getCurrentRoom(currentSceneId);
  const currentRoomDef = currentRoom ? HOUSE_MAP.find((r) => r.id === currentRoom) : undefined;
  const initialFloor: Floor = currentRoomDef?.floor ?? "ground";

  const [floor, setFloor] = useState<Floor>(initialFloor);

  // Recompute floor every time map opens so current room is shown.
  // Use a key based on currentSceneId so when player moves, the map re-syncs
  // on next open.
  useMemo(() => {
    if (open) setFloor(initialFloor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, currentSceneId]);

  const FLOOR_LABELS = isEn ? FLOOR_LABELS_EN : FLOOR_LABELS_SV;
  const FLOOR_DESC = isEn ? FLOOR_DESCRIPTIONS_EN : FLOOR_DESCRIPTIONS_SV;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md flex flex-col animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? "House map" : "Husets karta"}
    >
      <div className="grain-overlay" aria-hidden="true" />

      <header className="flex items-center justify-between px-6 py-5 border-b border-muted-soft/50">
        <div>
          <p className="annotation mb-1">
            {isEn ? "Field map" : "Fältkarta"}
          </p>
          <h2 className="font-serif italic text-ink text-xl">Hällmyren</h2>
        </div>
        <button
          onClick={onClose}
          className="annotation hover:text-ink underline-offset-4 hover:underline"
        >
          {isEn ? "close ✕" : "stäng ✕"}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Floor tabs */}
          <div className="flex gap-1 mb-2 border-b border-muted-soft/40">
            {FLOOR_ORDER.map((f) => {
              const visibleRooms = getRoomsOnFloor(f).filter(
                (r) =>
                  isRoomVisible(
                    r.id,
                    state.location.visited_rooms,
                    state.location.visited_scenes,
                    state.story_flags,
                  ) !== "unknown",
              );
              const hasContent = visibleRooms.length > 0;
              return (
                <button
                  key={f}
                  onClick={() => setFloor(f)}
                  disabled={!hasContent}
                  className={
                    "px-3 py-2 annotation transition-colors " +
                    (floor === f
                      ? "text-accent border-b border-accent -mb-px"
                      : hasContent
                        ? "text-muted hover:text-ink"
                        : "text-muted/30 cursor-not-allowed")
                  }
                  title={hasContent ? "" : isEn ? "not yet explored" : "ännu inte utforskat"}
                >
                  {FLOOR_LABELS[f]}
                </button>
              );
            })}
          </div>
          <p className="annotation mb-6 normal-case tracking-normal italic font-serif text-xs opacity-70">
            {FLOOR_DESC[floor]}
          </p>

          <FloorPlan
            floor={floor}
            state={state}
            onSelect={(roomDef) => {
              goToRoom(roomDef.entry_scene_id);
              onClose();
            }}
            isEn={isEn}
          />

          {/* Legend */}
          <div className="mt-8 space-y-3">
            <p className="annotation text-xs normal-case tracking-normal italic font-serif opacity-70">
              {isEn
                ? "You can only walk to a room next to where you are. Doors are drawn dashed in red."
                : "Du kan bara gå till ett rum som ligger intill det du är i. Dörrar är markerade med röda streck."}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 annotation text-xs">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border border-accent bg-accent/20 inline-block" />
                {isEn ? "current" : "här"}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border border-accent/70 bg-bg-2 inline-block" />
                {isEn ? "next door (click)" : "intill (klick)"}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border border-ink-dim/30 bg-bg-2 inline-block" />
                {isEn ? "visited (walk)" : "besökt (gå)"}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border border-muted-soft/60 border-dashed inline-block" />
                {isEn ? "glimpsed" : "anad"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Geometriska hjälpare för att rita ihopkopplade rum med dörrar och fönster.
interface Edge {
  /** Orientation av väggen. */
  orientation: "vertical" | "horizontal";
  /** Koordinat längs den fasta axeln (x för vertikal, y för horisontell). */
  pos: number;
  /** Start/slut längs den andra axeln. */
  from: number;
  to: number;
  /** Vilka rum delar denna vägg. Undefined = ytterväggssegment. */
  rooms: [Room, Room] | null;
}

function computeWalls(rooms: RoomDef[]): Edge[] {
  const edges: Edge[] = [];
  // Hitta delade kanter mellan rumspar
  for (let i = 0; i < rooms.length; i += 1) {
    for (let j = i + 1; j < rooms.length; j += 1) {
      const a = rooms[i];
      const b = rooms[j];
      const aRight = a.x + a.width;
      const aBottom = a.y + a.height;
      const bRight = b.x + b.width;
      const bBottom = b.y + b.height;
      // Vertical shared wall (A's right == B's left or vice versa)
      if (aRight === b.x || bRight === a.x) {
        const x = aRight === b.x ? aRight : bRight;
        const y1 = Math.max(a.y, b.y);
        const y2 = Math.min(aBottom, bBottom);
        if (y2 > y1) {
          edges.push({
            orientation: "vertical",
            pos: x,
            from: y1,
            to: y2,
            rooms: [a.id, b.id],
          });
        }
      }
      // Horizontal shared wall
      if (aBottom === b.y || bBottom === a.y) {
        const y = aBottom === b.y ? aBottom : bBottom;
        const x1 = Math.max(a.x, b.x);
        const x2 = Math.min(aRight, bRight);
        if (x2 > x1) {
          edges.push({
            orientation: "horizontal",
            pos: y,
            from: x1,
            to: x2,
            rooms: [a.id, b.id],
          });
        }
      }
    }
  }
  return edges;
}

function FloorPlan({
  floor,
  state,
  onSelect,
  isEn,
}: {
  floor: Floor;
  state: GameState;
  onSelect: (room: RoomDef) => void;
  isEn: boolean;
}) {
  const rooms = getRoomsOnFloor(floor);
  const visitedRooms = state.location.visited_rooms;
  const visitedScenes = state.location.visited_scenes;
  const flags = state.story_flags;

  // Aktuellt rum + dess angränsande rum (klickbara). Ingenting annat är klickbart
  // — spelaren måste fysiskt gå rum-för-rum.
  const currentRoom = getCurrentRoom(state.location.current_scene);
  const currentRoomDef = currentRoom
    ? HOUSE_MAP.find((r) => r.id === currentRoom)
    : null;
  const adjacent = new Set<Room>(currentRoomDef?.adjacent ?? []);

  // Bygg vägg-geometri — bara för insides-våningar (rum delar väggar)
  const isIndoors = floor === "ground" || floor === "upper";
  const walls = isIndoors ? computeWalls(rooms) : [];

  // Bygg ytterhull från rummens bounding box för insides
  const hullX = isIndoors ? Math.min(...rooms.map((r) => r.x)) : 0;
  const hullY = isIndoors ? Math.min(...rooms.map((r) => r.y)) : 0;
  const hullRight = isIndoors
    ? Math.max(...rooms.map((r) => r.x + r.width))
    : 100;
  const hullBottom = isIndoors
    ? Math.max(...rooms.map((r) => r.y + r.height))
    : 100;

  // Fönster — slumpa lite längs ytterväggar (deterministiskt baserat på floor)
  const windows = isIndoors
    ? floor === "ground"
      ? [
          { side: "top", pos: 22 },
          { side: "top", pos: 70 },
          { side: "left", pos: 25 },
          { side: "right", pos: 25 },
          { side: "right", pos: 75 },
        ]
      : [
          { side: "top", pos: 25 },
          { side: "top", pos: 65 },
          { side: "left", pos: 20 },
          { side: "right", pos: 70 },
        ]
    : [];

  return (
    <div
      className="relative w-full border border-muted-soft"
      style={{
        aspectRatio: "1 / 1",
        backgroundColor: "#1a1614",
        backgroundImage:
          "radial-gradient(circle at 30% 20%, rgba(154,58,44,0.04), transparent 60%), radial-gradient(circle at 70% 80%, rgba(168,181,190,0.03), transparent 50%)",
      }}
    >
      {/* Architectural drawing — riktig planritning med delade väggar */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="map-grid"
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 5 0 L 0 0 0 5"
              fill="none"
              stroke="rgba(122,115,104,0.04)"
              strokeWidth="0.15"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#map-grid)" />

        {isIndoors && (
          <>
            {/* Ytterhull — dubbla väggar (arkitektritnings-standard) */}
            <rect
              x={hullX - 0.6}
              y={hullY - 0.6}
              width={hullRight - hullX + 1.2}
              height={hullBottom - hullY + 1.2}
              fill="rgba(15,13,11,0.5)"
              stroke="var(--color-ink-dim)"
              strokeWidth="0.9"
            />
            <rect
              x={hullX + 0.4}
              y={hullY + 0.4}
              width={hullRight - hullX - 0.8}
              height={hullBottom - hullY - 0.8}
              fill="none"
              stroke="var(--color-muted)"
              strokeWidth="0.5"
            />

            {/* Interior walls — varje delad kant ritas som vägg med dörr-gap
                om rummen är adjacent, annars full vägg. */}
            {walls.map((w, idx) => {
              const [rA, rB] = w.rooms!;
              const aDef = HOUSE_MAP.find((r) => r.id === rA);
              const bDef = HOUSE_MAP.find((r) => r.id === rB);
              const isDoor =
                aDef?.adjacent.includes(rB) && bDef?.adjacent.includes(rA);
              const mid = (w.from + w.to) / 2;
              const doorHalf = 3.5; // dörrbredd i grid-enheter
              const doorStart = mid - doorHalf;
              const doorEnd = mid + doorHalf;

              if (w.orientation === "vertical") {
                if (!isDoor) {
                  return (
                    <line
                      key={idx}
                      x1={w.pos}
                      y1={w.from}
                      x2={w.pos}
                      y2={w.to}
                      stroke="var(--color-ink-dim)"
                      strokeWidth="0.7"
                    />
                  );
                }
                return (
                  <g key={idx}>
                    <line
                      x1={w.pos}
                      y1={w.from}
                      x2={w.pos}
                      y2={doorStart}
                      stroke="var(--color-ink-dim)"
                      strokeWidth="0.7"
                    />
                    <line
                      x1={w.pos}
                      y1={doorEnd}
                      x2={w.pos}
                      y2={w.to}
                      stroke="var(--color-ink-dim)"
                      strokeWidth="0.7"
                    />
                    {/* Dörrbåge — en kvartscirkel som visar öppningsriktning */}
                    <path
                      d={`M ${w.pos} ${doorStart} A ${doorHalf * 2} ${doorHalf * 2} 0 0 1 ${w.pos + doorHalf * 2} ${mid}`}
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="0.35"
                      opacity="0.6"
                    />
                    {/* Dörr-slag (linje) */}
                    <line
                      x1={w.pos}
                      y1={doorStart}
                      x2={w.pos + doorHalf * 1.8}
                      y2={doorStart + doorHalf * 0.4}
                      stroke="var(--color-accent)"
                      strokeWidth="0.5"
                      opacity="0.7"
                    />
                  </g>
                );
              }
              // Horizontal wall
              if (!isDoor) {
                return (
                  <line
                    key={idx}
                    x1={w.from}
                    y1={w.pos}
                    x2={w.to}
                    y2={w.pos}
                    stroke="var(--color-ink-dim)"
                    strokeWidth="0.7"
                  />
                );
              }
              return (
                <g key={idx}>
                  <line
                    x1={w.from}
                    y1={w.pos}
                    x2={doorStart}
                    y2={w.pos}
                    stroke="var(--color-ink-dim)"
                    strokeWidth="0.7"
                  />
                  <line
                    x1={doorEnd}
                    y1={w.pos}
                    x2={w.to}
                    y2={w.pos}
                    stroke="var(--color-ink-dim)"
                    strokeWidth="0.7"
                  />
                  <path
                    d={`M ${doorStart} ${w.pos} A ${doorHalf * 2} ${doorHalf * 2} 0 0 0 ${mid} ${w.pos + doorHalf * 2}`}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="0.35"
                    opacity="0.6"
                  />
                  <line
                    x1={doorStart}
                    y1={w.pos}
                    x2={doorStart + doorHalf * 0.4}
                    y2={w.pos + doorHalf * 1.8}
                    stroke="var(--color-accent)"
                    strokeWidth="0.5"
                    opacity="0.7"
                  />
                </g>
              );
            })}

            {/* Fönster — små symboler på ytterväggar */}
            {windows.map((w, idx) => {
              const len = 4;
              if (w.side === "top") {
                return (
                  <g key={idx}>
                    <line
                      x1={w.pos - len / 2}
                      y1={hullY}
                      x2={w.pos + len / 2}
                      y2={hullY}
                      stroke="var(--color-sun)"
                      strokeWidth="1.2"
                      opacity="0.7"
                    />
                    <line
                      x1={w.pos}
                      y1={hullY - 0.4}
                      x2={w.pos}
                      y2={hullY + 0.4}
                      stroke="var(--color-sun)"
                      strokeWidth="0.5"
                      opacity="0.7"
                    />
                  </g>
                );
              }
              if (w.side === "left") {
                return (
                  <g key={idx}>
                    <line
                      x1={hullX}
                      y1={w.pos - len / 2}
                      x2={hullX}
                      y2={w.pos + len / 2}
                      stroke="var(--color-sun)"
                      strokeWidth="1.2"
                      opacity="0.7"
                    />
                  </g>
                );
              }
              if (w.side === "right") {
                return (
                  <g key={idx}>
                    <line
                      x1={hullRight}
                      y1={w.pos - len / 2}
                      x2={hullRight}
                      y2={w.pos + len / 2}
                      stroke="var(--color-sun)"
                      strokeWidth="1.2"
                      opacity="0.7"
                    />
                  </g>
                );
              }
              return null;
            })}
          </>
        )}
      </svg>

      {/* Door indicators — visa lättvikts-streck mellan aktuella rum och deras
          grannar för att indikera dörrar */}
      {currentRoomDef && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {Array.from(adjacent).map((adjId) => {
            const adjDef = rooms.find((r) => r.id === adjId);
            if (!adjDef) return null;
            // Dra ett streck mellan rummens mittpunkter
            const x1 = currentRoomDef.x + currentRoomDef.width / 2;
            const y1 = currentRoomDef.y + currentRoomDef.height / 2;
            const x2 = adjDef.x + adjDef.width / 2;
            const y2 = adjDef.y + adjDef.height / 2;
            return (
              <line
                key={adjId}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--color-accent)"
                strokeWidth="0.4"
                strokeDasharray="1.2 0.8"
                opacity="0.45"
              />
            );
          })}
        </svg>
      )}

      {/* Rooms */}
      {rooms.map((roomDef) => {
        const reveal = isRoomVisible(
          roomDef.id,
          visitedRooms,
          visitedScenes,
          flags,
        );
        if (reveal === "unknown") return null;
        // Klickbart endast om: rummet är angränsande till aktuellt rum, eller om
        // aktuellt rum är okänt (Akt I — innan huset) och rummet är besökt.
        const isAdjacent = adjacent.has(roomDef.id);
        const noCurrentRoom = !currentRoomDef;
        const isCurrent = reveal === "current";
        const isClickable =
          !isCurrent && (isAdjacent || (noCurrentRoom && reveal === "visited"));
        const label = isEn ? roomDef.label_en : roomDef.label_sv;
        const hint = isEn ? roomDef.hint_en : roomDef.hint_sv;
        const showFurniture =
          (reveal === "visited" || reveal === "current") &&
          roomDef.furniture &&
          roomDef.furniture.length > 0;
        // Symbolen renderas på en yta så stor som rummet — symbol-storlek
        // skalas efter rummets minsta dimension så det blir proportionerligt.
        const symbolPx = Math.max(
          12,
          Math.min(28, Math.floor(roomDef.width * 0.45)),
        );

        return (
          <button
            key={roomDef.id}
            disabled={!isClickable}
            onClick={() => onSelect(roomDef)}
            className={
              "absolute group text-center transition-all " +
              (isClickable
                ? "cursor-pointer hover:z-10"
                : "cursor-not-allowed")
            }
            style={{
              left: `${roomDef.x}%`,
              top: `${roomDef.y}%`,
              width: `${roomDef.width}%`,
              height: `${roomDef.height}%`,
            }}
            aria-label={label}
            title={
              reveal === "glimpsed"
                ? hint ?? (isEn ? "not yet entered" : "inte besökt än")
                : label
            }
          >
            {/* Rumsfärgning — väggarna ritas separat i SVG-lagret ovan.
                Insides: bara highlight inuti rummet. Outdoor: full ruta som tidigare. */}
            {isIndoors ? (
              <span
                className={
                  "absolute inset-0 transition-colors " +
                  (reveal === "current"
                    ? "bg-accent/10"
                    : reveal === "visited"
                      ? isAdjacent
                        ? "bg-accent/5 group-hover:bg-accent/15"
                        : "bg-transparent"
                      : isAdjacent
                        ? "bg-transparent"
                        : "bg-transparent")
                }
              />
            ) : (
              <span
                className={
                  "absolute inset-0 transition-colors " +
                  (reveal === "current"
                    ? "bg-accent/12 border border-accent"
                    : reveal === "visited"
                      ? isAdjacent
                        ? "bg-[#0f0d0b] border border-accent/70 group-hover:bg-accent/10"
                        : "bg-[#0f0d0b]/60 border border-ink-dim/30"
                      : isAdjacent
                        ? "bg-transparent border border-dashed border-accent/50"
                        : "bg-transparent border border-dashed border-muted-soft/60")
                }
              />
            )}

            {/* Möbler — handritade SVG-symboler */}
            {showFurniture && (
              <span className="absolute inset-0 pointer-events-none text-ink-dim">
                {roomDef.furniture!.map((f, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{
                      left: `${f.x}%`,
                      top: `${f.y}%`,
                    }}
                  >
                    <FurnitureSymbols
                      symbol={f.symbol}
                      size={symbolPx}
                      stroke={
                        reveal === "current"
                          ? "var(--color-accent)"
                          : "var(--color-ink-dim)"
                      }
                      opacity={reveal === "current" ? 0.85 : 0.6}
                    />
                  </span>
                ))}
              </span>
            )}

            {/* Etikett — placeras antingen i hörn (om möbler finns) eller centrerat */}
            <span
              className={
                "absolute z-10 px-1 leading-none pointer-events-none " +
                (showFurniture
                  ? "top-0.5 left-1 text-left"
                  : "inset-0 flex flex-col items-center justify-center")
              }
            >
              {reveal === "current" && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
                />
              )}
              <span
                className={
                  "font-serif " +
                  (roomDef.height < 15
                    ? "text-[0.55rem]"
                    : roomDef.height < 22
                      ? "text-[0.65rem]"
                      : showFurniture
                        ? "text-[0.65rem] sm:text-[0.75rem]"
                        : "text-xs sm:text-sm") +
                  " " +
                  (reveal === "current"
                    ? "text-accent"
                    : reveal === "visited"
                      ? "text-ink"
                      : "text-muted italic")
                }
                style={{
                  backgroundColor: showFurniture
                    ? "rgba(15,13,11,0.85)"
                    : "transparent",
                  padding: showFurniture ? "1px 4px" : 0,
                }}
              >
                {reveal === "glimpsed" ? "?" : label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
