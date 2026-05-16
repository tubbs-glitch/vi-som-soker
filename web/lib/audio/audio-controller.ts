// Audio-controller — fasad mellan UI och synth-engine.
//
// Designval: vi använder PROCEDURELL audio (Web Audio API) snarare än
// förinspelade filer. Det betyder att ljuden genereras i webbläsaren av
// oscillatorer + brus + filter. Folk horror-genren mår bra av drone-baserat.
//
// När/om Suno-/ElevenLabs-genererade ljudfiler dyker upp kan vi byta
// implementation utan att röra UI:t — bara byt setZone()/playSfx() till
// fil-baserad ladda.

import {
  SfxId,
  ZoneId,
  sceneToZone,
  synthEngine,
} from "./synth-engine";

type Listener = () => void;

class AudioController {
  private listeners = new Set<Listener>();
  private unlocked = false;

  isUnlocked() {
    return this.unlocked;
  }
  isMuted() {
    return synthEngine.isMuted();
  }

  subscribe(cb: Listener) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }
  private emit() {
    for (const cb of this.listeners) cb();
  }

  unlock() {
    if (this.unlocked) return;
    synthEngine.unlock();
    this.unlocked = true;
    this.persistMutePref();
    this.emit();
  }

  setMuted(muted: boolean) {
    synthEngine.setMuted(muted);
    this.persistMutePref();
    this.emit();
  }

  private persistMutePref() {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        "vi-som-soker:audio-muted",
        synthEngine.isMuted() ? "1" : "0",
      );
    } catch {}
  }

  hydratePref() {
    if (typeof window === "undefined") return;
    try {
      const v = window.localStorage.getItem("vi-som-soker:audio-muted");
      // Spelar bara om användaren redan unlocked + ej muted tidigare
      if (v === "0") {
        // Kräver ändå user-gesture för att starta — vänta på den.
      }
    } catch {}
  }

  /** Sätt scen-id — internt mappas till zon. */
  setScene(sceneId: string) {
    const zone: ZoneId = sceneToZone(sceneId);
    synthEngine.setZone(zone);
  }

  /** Slå på/av hymn-loopen. Spelar ovanpå current zone drone. */
  setHymnPlaying(on: boolean) {
    synthEngine.setHymnPlaying(on);
  }

  playSfx(id: SfxId) {
    synthEngine.playSfx(id);
  }
}

export const audioController = new AudioController();
