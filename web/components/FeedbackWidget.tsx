"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/lib/store";

/**
 * Feedback-widget. En liten "rapportera"-knapp i scen-footer. Klick öppnar
 * en modal där testaren skriver vad som är fel; submit sparar lokalt i
 * localStorage OCH skickar via mailto: till projektägaren (om e-postadress
 * är konfigurerad via NEXT_PUBLIC_FEEDBACK_EMAIL).
 *
 * Auto-fyller: scen-id, språk, viktigaste flaggor, sanity, inventory.
 */

const FEEDBACK_EMAIL = process.env.NEXT_PUBLIC_FEEDBACK_EMAIL || "";
const STORAGE_KEY = "vi-som-soker:feedback";

interface FeedbackEntry {
  ts: number;
  scene_id: string;
  language: string;
  sanity: number;
  inventory: string[];
  flags_summary: Record<string, unknown>;
  note: string;
  tester_name?: string;
}

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const state = useGameStore((s) => s.state);

  // Ladda tidigare tester-namn så de slipper skriva varje gång
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem("vi-som-soker:tester-name");
      if (saved) setName(saved);
    } catch {}
  }, []);

  const isEn = state.meta.language === "en";

  function buildEntry(): FeedbackEntry {
    return {
      ts: Date.now(),
      scene_id: state.location.current_scene,
      language: state.meta.language,
      sanity: state.sanity.value,
      inventory: state.inventory.items.map((i) => i.id),
      // Bara viktiga flaggor som är true/non-default — håll det kort
      flags_summary: Object.fromEntries(
        Object.entries(
          state.story_flags as unknown as Record<string, unknown>,
        ).filter(([, v]) => v !== false && v !== null && v !== 0 && v !== ""),
      ),
      note,
      tester_name: name || undefined,
    };
  }

  function saveLocally(entry: FeedbackEntry) {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const list: FeedbackEntry[] = raw ? JSON.parse(raw) : [];
      list.push(entry);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      if (name) window.localStorage.setItem("vi-som-soker:tester-name", name);
    } catch (e) {
      console.warn("feedback save failed", e);
    }
  }

  function openMail(entry: FeedbackEntry) {
    if (!FEEDBACK_EMAIL) return;
    const subject = `Vi som söker — feedback från ${entry.tester_name || "testare"} på ${entry.scene_id}`;
    const body = [
      `Tester: ${entry.tester_name || "(anonym)"}`,
      `Tid: ${new Date(entry.ts).toISOString()}`,
      `Scen: ${entry.scene_id}`,
      `Språk: ${entry.language}`,
      `Sanity: ${entry.sanity}`,
      `Inventory: ${entry.inventory.join(", ") || "(tom)"}`,
      `Flags: ${JSON.stringify(entry.flags_summary)}`,
      ``,
      `--- Synpunkt ---`,
      entry.note,
    ].join("\n");
    const mailto = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  function copyToClipboard(entry: FeedbackEntry) {
    if (typeof window === "undefined" || !navigator.clipboard) return;
    const text = [
      `Tester: ${entry.tester_name || "(anonym)"}`,
      `Scen: ${entry.scene_id}`,
      `Sanity: ${entry.sanity}`,
      `Inventory: ${entry.inventory.join(", ") || "(tom)"}`,
      `Note: ${entry.note}`,
    ].join("\n");
    navigator.clipboard.writeText(text).catch(() => {});
  }

  function handleSubmit() {
    if (!note.trim()) return;
    const entry = buildEntry();
    saveLocally(entry);
    if (FEEDBACK_EMAIL) {
      openMail(entry);
    } else {
      copyToClipboard(entry);
    }
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setNote("");
    }, 2000);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="annotation hover:text-accent transition-colors underline-offset-4 hover:underline"
        title={isEn ? "Report something" : "Rapportera något"}
      >
        {isEn ? "report" : "rapportera"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-w-md w-full bg-bg-2 border border-muted-soft p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-baseline">
              <h2 className="font-serif italic text-ink text-xl">
                {isEn ? "Report a problem" : "Rapportera"}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="annotation hover:text-ink"
              >
                {isEn ? "close ✕" : "stäng ✕"}
              </button>
            </div>

            <div className="annotation text-xs space-y-1 border-l-2 border-muted-soft pl-3">
              <div>
                {isEn ? "scene" : "scen"}:{" "}
                <span className="text-ink">{state.location.current_scene}</span>
              </div>
              <div>
                {isEn ? "sanity" : "sinne"}:{" "}
                <span className="text-ink">{state.sanity.value}</span>
              </div>
              <div>
                {isEn ? "items" : "väska"}:{" "}
                <span className="text-ink">
                  {state.inventory.items.length}
                </span>
              </div>
            </div>

            <label className="block">
              <span className="annotation block mb-2">
                {isEn ? "Your name (optional)" : "Ditt namn (valfritt)"}
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isEn ? "tester" : "testare"}
                className="w-full bg-bg border border-muted-soft px-3 py-2 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent"
              />
            </label>

            <label className="block">
              <span className="annotation block mb-2">
                {isEn ? "What's wrong / what's confusing?" : "Vad är fel eller förvirrande?"}
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={6}
                placeholder={
                  isEn
                    ? "describe the problem, what you expected, what happened…"
                    : "beskriv problemet, vad du förväntade dig, vad som hände…"
                }
                className="w-full bg-bg border border-muted-soft px-3 py-2 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent font-serif"
              />
            </label>

            {sent ? (
              <p className="annotation text-accent">
                {FEEDBACK_EMAIL
                  ? isEn
                    ? "✓ Mail opening…"
                    : "✓ Öppnar mejl…"
                  : isEn
                    ? "✓ Copied to clipboard. Send it to the project owner."
                    : "✓ Kopierat till urklipp. Skicka till projektägaren."}
              </p>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!note.trim()}
                className="choice-button w-full"
                data-emphasis={note.trim().length > 0}
              >
                {isEn ? "Send →" : "Skicka →"}
              </button>
            )}

            <p className="annotation text-[0.6rem] opacity-60 leading-relaxed">
              {FEEDBACK_EMAIL
                ? isEn
                  ? `Goes to: ${FEEDBACK_EMAIL}. Scene-info auto-included.`
                  : `Skickas till: ${FEEDBACK_EMAIL}. Scen-info läggs till automatiskt.`
                : isEn
                  ? "Will be copied to your clipboard with scene info attached. Paste it to the project owner."
                  : "Kopieras till urklipp med scen-info bifogat. Klistra in till projektägaren."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
