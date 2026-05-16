"use client";

import type { FurnitureSymbol } from "@/lib/house-map";

interface Props {
  symbol: FurnitureSymbol;
  /** Färg på linjer. */
  stroke?: string;
  /** Storlek (kvadrat) i px. Symbol renderas inom viewBox 0 0 20 20. */
  size?: number;
  /** Opacity 0-1. */
  opacity?: number;
}

/**
 * Handritade möbel-symboler i bläckskiss-stil. Alla i viewBox 0 0 20 20.
 * Inga fyllningar — bara linjer, lätt darrande för fältnotat-känsla.
 */
export default function FurnitureSymbols({
  symbol,
  stroke = "currentColor",
  size = 18,
  opacity = 0.75,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke={stroke}
      strokeWidth="0.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity, transform: "translate(-50%, -50%)" }}
      aria-hidden="true"
    >
      {renderSymbol(symbol)}
    </svg>
  );
}

function renderSymbol(symbol: FurnitureSymbol) {
  switch (symbol) {
    case "bed":
      return (
        <>
          <path d="M2 8 L18 8 L18 15 L2 15 Z" />
          <path d="M2 8 L2 13 L4 13 L4 8" />
          <path d="M4 11 L14 11" />
        </>
      );
    case "turntable":
      return (
        <>
          <rect x="3" y="5" width="14" height="11" rx="0.5" />
          <circle cx="10" cy="10.5" r="3.5" />
          <circle cx="10" cy="10.5" r="0.7" />
          <line x1="13.5" y1="6" x2="16" y2="9" />
        </>
      );
    case "kakelugn":
      return (
        <>
          <rect x="6" y="2" width="8" height="16" rx="0.6" />
          <path d="M6 7 L14 7" />
          <path d="M6 12 L14 12" />
          <rect x="8.5" y="14" width="3" height="2.5" />
        </>
      );
    case "desk":
      return (
        <>
          <line x1="2" y1="9" x2="18" y2="9" />
          <line x1="3" y1="9" x2="3" y2="16" />
          <line x1="17" y1="9" x2="17" y2="16" />
          <line x1="6" y1="9" x2="6" y2="14" />
          <line x1="14" y1="9" x2="14" y2="14" />
        </>
      );
    case "table":
      return (
        <>
          <ellipse cx="10" cy="9" rx="6" ry="2" />
          <line x1="5" y1="10" x2="5.5" y2="17" />
          <line x1="15" y1="10" x2="14.5" y2="17" />
        </>
      );
    case "sofa":
      return (
        <>
          <path d="M2 8 Q2 5 4 5 L16 5 Q18 5 18 8 L18 14 L2 14 Z" />
          <path d="M4 8 L16 8" />
          <line x1="2" y1="14" x2="2" y2="17" />
          <line x1="18" y1="14" x2="18" y2="17" />
        </>
      );
    case "stove":
      return (
        <>
          <rect x="3" y="4" width="14" height="13" rx="0.5" />
          <circle cx="7" cy="8" r="1.2" />
          <circle cx="13" cy="8" r="1.2" />
          <line x1="3" y1="11" x2="17" y2="11" />
        </>
      );
    case "tub":
      return (
        <>
          <path d="M3 7 Q3 14 6 14 L14 14 Q17 14 17 7" />
          <line x1="3" y1="7" x2="17" y2="7" />
          <circle cx="15" cy="9.5" r="0.7" />
        </>
      );
    case "leashes":
      // Sju krokar i vertikal rad
      return (
        <>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <g key={i}>
              <circle cx="6" cy={3 + i * 2} r="0.5" />
              {/* Hänger snöre — utom det sista (tomma) */}
              {i < 6 && <path d={`M6 ${3 + i * 2} Q8 ${5 + i * 2} 8 ${6.5 + i * 2}`} />}
            </g>
          ))}
        </>
      );
    case "stairs_up":
      return (
        <>
          <path d="M3 17 L3 14 L7 14 L7 11 L11 11 L11 8 L15 8 L15 5 L17 5" />
          <path d="M16 5 L17 5 L17 6" strokeWidth="0.6" />
          <path d="M15 6 L17 4" strokeWidth="0.5" />
        </>
      );
    case "stairs_down":
      return (
        <>
          <path d="M3 4 L3 7 L7 7 L7 10 L11 10 L11 13 L15 13 L15 16 L17 16" />
          <path d="M15 17 L17 16 L17 15" strokeWidth="0.5" />
        </>
      );
    case "circle":
      // Salt-cirkel med punkter
      return (
        <>
          <circle cx="10" cy="10" r="6" strokeDasharray="0.8 0.8" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const r = (deg * Math.PI) / 180;
            const x = 10 + Math.cos(r) * 6;
            const y = 10 + Math.sin(r) * 6;
            return <circle key={deg} cx={x} cy={y} r="0.7" />;
          })}
        </>
      );
    case "owl":
      return (
        <>
          <path d="M6 6 Q6 3 10 3 Q14 3 14 6 L14 11 Q14 14 10 14 Q6 14 6 11 Z" />
          <circle cx="8" cy="7" r="0.9" />
          <circle cx="12" cy="7" r="0.9" />
          <path d="M9.5 9 L10 10 L10.5 9" />
          <path d="M5 7 L4 5" strokeWidth="0.6" />
          <path d="M15 7 L16 5" strokeWidth="0.6" />
        </>
      );
    case "tree":
      return (
        <>
          <path d="M10 4 Q6 7 7 11 Q5 12 7 13 Q6 14 8 14 L12 14 Q14 14 13 13 Q15 12 13 11 Q14 7 10 4" />
          <line x1="10" y1="14" x2="10" y2="18" />
        </>
      );
    case "graves":
      // Sju små stenar
      return (
        <>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M${2 + i * 2.5} 12 L${2 + i * 2.5} 9 Q${2.7 + i * 2.5} 8 ${3.4 + i * 2.5} 9 L${3.4 + i * 2.5} 12 Z`}
              strokeWidth="0.6"
            />
          ))}
          <line x1="1" y1="13" x2="19" y2="13" strokeWidth="0.5" />
        </>
      );
    case "well":
      return (
        <>
          <circle cx="10" cy="13" r="4" />
          <ellipse cx="10" cy="13" rx="4" ry="1.2" />
          <line x1="10" y1="13" x2="10" y2="4" strokeWidth="0.5" />
          <path d="M7 4 L13 4" />
        </>
      );
    case "car":
      return (
        <>
          <path d="M2 13 L4 9 L16 9 L18 13 L18 16 L2 16 Z" />
          <circle cx="6" cy="16" r="1.4" />
          <circle cx="14" cy="16" r="1.4" />
          <path d="M5.5 9 L7 11 L13 11 L14.5 9" />
        </>
      );
    case "shed_doors":
      return (
        <>
          <rect x="3" y="3" width="14" height="14" />
          <line x1="10" y1="3" x2="10" y2="17" />
          <circle cx="9.2" cy="10" r="0.4" />
          <circle cx="10.8" cy="10" r="0.4" />
        </>
      );
    case "ladder":
      return (
        <>
          <line x1="7" y1="3" x2="7" y2="17" />
          <line x1="13" y1="3" x2="13" y2="17" />
          {[5, 7.5, 10, 12.5, 15].map((y) => (
            <line key={y} x1="7" y1={y} x2="13" y2={y} strokeWidth="0.5" />
          ))}
        </>
      );
    case "trunk":
      return (
        <>
          <rect x="3" y="7" width="14" height="9" rx="0.4" />
          <path d="M3 9 Q3 7 5 7 L15 7 Q17 7 17 9" />
          <line x1="3" y1="11" x2="17" y2="11" strokeWidth="0.5" />
          <circle cx="10" cy="11.5" r="0.6" />
        </>
      );
    case "boxes":
      return (
        <>
          <rect x="3" y="9" width="6" height="6" />
          <rect x="9" y="6" width="6" height="6" />
          <rect x="11" y="12" width="6" height="5" />
        </>
      );
    case "wardrobe":
      return (
        <>
          <rect x="5" y="3" width="10" height="14" />
          <line x1="10" y1="3" x2="10" y2="17" />
          <circle cx="9.2" cy="10" r="0.4" />
          <circle cx="10.8" cy="10" r="0.4" />
        </>
      );
    case "easel":
      return (
        <>
          <rect x="5" y="4" width="10" height="8" />
          <line x1="6" y1="12" x2="4" y2="18" />
          <line x1="14" y1="12" x2="16" y2="18" />
          <line x1="10" y1="12" x2="10" y2="18" strokeWidth="0.5" />
        </>
      );
  }
}
