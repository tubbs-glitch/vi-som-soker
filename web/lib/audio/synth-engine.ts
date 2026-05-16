// Procedurell audio-synthesis i Web Audio API.
//
// Genererar drone-baserade ambientljud per zon + syntetiserade SFX.
// Ingen extern fil. Allt skapas av oscillatorer, filter, brus och envelopper.
//
// Designprinciper:
// - Långsam evolution (LFO:er rör filter och volym över 30-90 sekunder)
// - Allt får ha åtminstone två röster lätt detunerade — slipper sterilt
// - SFX är korta och narrativa, inte realistiska
// - Audio context skapas vid första unlock() — innan dess är allt tyst

export type ZoneId =
  | "intro"
  | "road"
  | "outside"
  | "house_ground"
  | "house_upper"
  | "attic"
  | "dairy"
  | "basement"
  | "gray";

export type SfxId =
  | "phone_ring"
  | "door_creak"
  | "owl_wing"
  | "owl_call"
  | "footstep_wood"
  | "footstep_gravel"
  | "vinyl_static"
  | "wind_gust"
  | "clock_tick"
  | "saw_wood"
  | "tree_fall"
  | "fuse_click"
  | "raven_distant"
  | "bulb_on"
  | "low_thud";

interface DroneVoice {
  /** Stop-funktion som fade:ar ut och städar */
  stop: (fadeMs?: number) => void;
}

interface ZoneRecipe {
  /** Bärfrekvenser för drone (Hz). Flera lager = rikare. */
  carriers: number[];
  /** Hur mycket detuning (cents) mellan stereo-rösterna. */
  detuneCents: number;
  /** Filter cutoff i Hz — bestämmer ljusheten. */
  filterHz: number;
  /** LFO-djup för cutoff-modulation. */
  filterLfoHz: number;
  /** Mängd brus (0-1). */
  noiseLevel: number;
  /** Master-volym (0-1). */
  level: number;
  /** Vågform — sine = mjukt, sawtooth = strängigt, square = rått. */
  type: OscillatorType;
}

const ZONE_RECIPES: Record<ZoneId, ZoneRecipe> = {
  intro: {
    carriers: [55, 82.5], // A1 + E2
    detuneCents: 8,
    filterHz: 280,
    filterLfoHz: 0.05,
    noiseLevel: 0.07,
    level: 0.18,
    type: "sine",
  },
  road: {
    carriers: [49, 73.5, 98], // G1 + D2 + G2
    detuneCents: 6,
    filterHz: 320,
    filterLfoHz: 0.07,
    noiseLevel: 0.12,
    level: 0.16,
    type: "sawtooth",
  },
  outside: {
    carriers: [65.4, 98.0], // C2 + G2
    detuneCents: 12,
    filterHz: 420,
    filterLfoHz: 0.04,
    noiseLevel: 0.22,
    level: 0.2,
    type: "sine",
  },
  house_ground: {
    carriers: [46, 69, 138], // F#1 + C#2 + C#3
    detuneCents: 10,
    filterHz: 220,
    filterLfoHz: 0.03,
    noiseLevel: 0.05,
    level: 0.17,
    type: "sine",
  },
  house_upper: {
    carriers: [73.5, 110, 165], // D2 + A2 + E3
    detuneCents: 9,
    filterHz: 380,
    filterLfoHz: 0.05,
    noiseLevel: 0.06,
    level: 0.15,
    type: "sine",
  },
  attic: {
    // Hög, luftig, "fel ljus"
    carriers: [165, 247, 330], // E3 + B3 + E4
    detuneCents: 14,
    filterHz: 1100,
    filterLfoHz: 0.06,
    noiseLevel: 0.09,
    level: 0.13,
    type: "sine",
  },
  dairy: {
    // Lite mer dissonant — sällskapets minne
    carriers: [55, 87, 130], // A1 + F2 + C3
    detuneCents: 11,
    filterHz: 340,
    filterLfoHz: 0.04,
    noiseLevel: 0.1,
    level: 0.16,
    type: "sine",
  },
  basement: {
    // Hymnen-fragment, vinyl-knaster, drone
    carriers: [41, 61.5, 82.5], // E1 + B1 + E2
    detuneCents: 7,
    filterHz: 200,
    filterLfoHz: 0.08,
    noiseLevel: 0.18,
    level: 0.19,
    type: "sawtooth",
  },
  gray: {
    // Utan rytm, lågfrekvent puls — den grå dimensionen
    carriers: [38, 39.5, 78, 79], // klusterfrekvenser — schwebung
    detuneCents: 18,
    filterHz: 260,
    filterLfoHz: 0.12,
    noiseLevel: 0.25,
    level: 0.2,
    type: "sine",
  },
};

/** Sceneid → zonid */
export function sceneToZone(sceneId: string): ZoneId {
  const n = parseInt(sceneId.replace("scene-", ""), 10);
  if (isNaN(n)) return "intro";
  // Akt I (1-9): intro/road
  if (n <= 3) return "intro";
  if (n <= 9) return "road";
  // Outside, hus, etc.
  if (n >= 100 && n <= 105) return "outside";
  if (n === 7) return "outside";
  if (n === 10) return "outside";
  if (n === 8) return "outside";
  // Botten
  if ([11, 12, 13, 14].includes(n)) return "house_ground";
  // Övre + vinden
  if ([15, 16, 17, 18, 19, 20].includes(n)) return "house_upper";
  if (n === 21) return "attic";
  // Källaren
  if ([22, 23].includes(n)) return "basement";
  // Mejeriet (24-26)
  if ([24, 25, 26].includes(n)) return "dairy";
  // Yttre senare scen
  if ([27, 28].includes(n)) return "basement";
  // Akt III
  if (n >= 30) return "gray";
  return "house_ground";
}

export class SynthEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentZone: ZoneId | null = null;
  private currentVoice: DroneVoice | null = null;
  private hymnVoice: DroneVoice | null = null;
  private hymnPlaying = false;
  private muted = true;

  ensureContext(): boolean {
    if (this.ctx) return true;
    if (typeof window === "undefined") return false;
    const AC: typeof AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return false;
    try {
      this.ctx = new AC();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;
      this.masterGain.connect(this.ctx.destination);
      return true;
    } catch (err) {
      console.warn("AudioContext failed:", err);
      return false;
    }
  }

  unlock() {
    if (!this.ensureContext()) return;
    this.muted = false;
    if (this.ctx?.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx!.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(
        0.85,
        this.ctx!.currentTime + 0.8,
      );
    }
  }

  setMuted(muted: boolean) {
    if (!this.ctx || !this.masterGain) {
      this.muted = muted;
      return;
    }
    this.muted = muted;
    const target = muted ? 0 : 0.85;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.4);
  }

  isMuted() {
    return this.muted;
  }

  /** Sätt zon — crossfade till ny drone. */
  setZone(zone: ZoneId) {
    if (!this.ensureContext()) return;
    if (this.currentZone === zone && this.currentVoice) return;

    if (this.currentVoice) {
      this.currentVoice.stop(2200);
      this.currentVoice = null;
    }
    this.currentZone = zone;
    this.currentVoice = this.playDrone(zone);
  }

  /** Slå på/av hymnen (när nålen är på skivan). Spelar ovanpå drone. */
  setHymnPlaying(on: boolean) {
    if (!this.ensureContext()) return;
    if (on === this.hymnPlaying) return;
    this.hymnPlaying = on;
    if (on) {
      this.hymnVoice = this.playHymn();
    } else {
      if (this.hymnVoice) {
        this.hymnVoice.stop(2500);
        this.hymnVoice = null;
      }
    }
  }

  isHymnPlaying() {
    return this.hymnPlaying;
  }

  private playDrone(zone: ZoneId): DroneVoice {
    const recipe = ZONE_RECIPES[zone];
    const ctx = this.ctx!;
    const master = this.masterGain!;

    const voiceGain = ctx.createGain();
    voiceGain.gain.value = 0;
    voiceGain.connect(master);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = recipe.filterHz;
    filter.Q.value = 1.2;
    filter.connect(voiceGain);

    // LFO till cutoff
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = recipe.filterLfoHz;
    lfoGain.gain.value = recipe.filterHz * 0.35;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    // Oscillator-lager
    const oscs: OscillatorNode[] = [];
    for (const freq of recipe.carriers) {
      // Två röster med stereo-detuning
      for (let stereo = 0; stereo < 2; stereo += 1) {
        const o = ctx.createOscillator();
        o.type = recipe.type;
        o.frequency.value = freq;
        o.detune.value = (stereo === 0 ? -1 : 1) * recipe.detuneCents;
        const g = ctx.createGain();
        g.gain.value = (recipe.level / recipe.carriers.length / 2) * 0.6;
        o.connect(g).connect(filter);
        o.start();
        oscs.push(o);
      }
    }

    // Brus-lager
    let noiseNode: AudioBufferSourceNode | null = null;
    if (recipe.noiseLevel > 0) {
      const bufferSize = ctx.sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      // Pinkish noise
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i += 1) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + w * 0.099046;
        b1 = 0.96300 * b1 + w * 0.2965164;
        b2 = 0.57000 * b2 + w * 1.0526913;
        data[i] = (b0 + b1 + b2 + w * 0.1848) * 0.13;
      }
      noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = recipe.noiseLevel * 0.6;
      noiseNode.connect(noiseGain).connect(filter);
      noiseNode.start();
    }

    // Fade in
    voiceGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 2.5);

    const stop = (fadeMs = 1800) => {
      const now = ctx.currentTime;
      voiceGain.gain.cancelScheduledValues(now);
      voiceGain.gain.setValueAtTime(voiceGain.gain.value, now);
      voiceGain.gain.linearRampToValueAtTime(0, now + fadeMs / 1000);
      setTimeout(() => {
        for (const o of oscs) {
          try {
            o.stop();
          } catch {}
        }
        try {
          lfo.stop();
        } catch {}
        if (noiseNode) {
          try {
            noiseNode.stop();
          } catch {}
        }
        voiceGain.disconnect();
        filter.disconnect();
      }, fadeMs + 100);
    };

    return { stop };
  }

  /**
   * Hymn — en svensk-psalm-aktig melodi i moll, spelad på ett "knäppt"
   * orgel-aktigt instrument med vinyl-knaster. Loopar 16-takters fras.
   *
   * Melodi (toner i A-moll mixolydisk, frekvenser i Hz):
   *   A4  E4  A4  D5  C5  B4  A4  E4  ...
   *
   * Tempo: ~52 BPM → en helton per kvartstakt = 1153ms per ton.
   */
  private playHymn(): DroneVoice {
    const ctx = this.ctx!;
    const master = this.masterGain!;

    const voiceGain = ctx.createGain();
    voiceGain.gain.value = 0;
    voiceGain.connect(master);

    // Vinyl-statisk i bakgrunden
    const noiseBuffer = (() => {
      const len = ctx.sampleRate * 6;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i += 1) {
        // Främst pop-aktiga klick + jämn hiss
        data[i] =
          (Math.random() * 2 - 1) * 0.4 +
          (Math.random() < 0.0008 ? (Math.random() * 2 - 1) * 1.2 : 0);
      }
      return buf;
    })();
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;
    noiseSrc.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 1800;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.08;
    noiseSrc.connect(noiseFilter).connect(noiseGain).connect(voiceGain);
    noiseSrc.start();

    // Drone — A2 + E3 (kvint) som bordun
    const droneA = ctx.createOscillator();
    droneA.type = "sine";
    droneA.frequency.value = 110; // A2
    const droneE = ctx.createOscillator();
    droneE.type = "sine";
    droneE.frequency.value = 164.81; // E3
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.14;
    droneA.connect(droneGain);
    droneE.connect(droneGain);
    droneGain.connect(voiceGain);
    droneA.start();
    droneE.start();

    // Melodi — orgel-aktigt timbre via 3 sinus-partials
    // Tonföljd (frekvens, varaktighet i sekunder)
    const melody: Array<[number, number]> = [
      [440.0, 1.4], // A4
      [329.63, 1.4], // E4
      [440.0, 1.4], // A4
      [523.25, 1.4], // C5
      [493.88, 2.8], // B4 (lång)
      [440.0, 1.4], // A4
      [392.0, 1.4], // G4
      [349.23, 2.8], // F4 (lång)
      [329.63, 1.4], // E4
      [392.0, 1.4], // G4
      [440.0, 1.4], // A4
      [329.63, 2.8], // E4 (lång)
      [261.63, 1.4], // C4
      [329.63, 1.4], // E4
      [349.23, 1.4], // F4
      [329.63, 2.8], // E4 (lång, frasens slut)
    ];

    const totalLen = melody.reduce((s, n) => s + n[1], 0);

    // Schemalägg hela melodin, en gång — och starta om vid loop
    function playNote(
      freq: number,
      start: number,
      dur: number,
      out: AudioNode,
    ) {
      // Fundamental + 2 harmoniska partials → orgel-pipe-aktigt
      const partials = [
        { mult: 1, gain: 0.55 },
        { mult: 2, gain: 0.18 },
        { mult: 3, gain: 0.09 },
      ];
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0, start);
      // Långsam attack — som ett orgelregister
      noteGain.gain.linearRampToValueAtTime(0.22, start + 0.12);
      noteGain.gain.setValueAtTime(0.22, start + dur - 0.25);
      // Mjukt avslag
      noteGain.gain.linearRampToValueAtTime(0, start + dur);
      noteGain.connect(out);

      for (const p of partials) {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = freq * p.mult;
        const g = ctx.createGain();
        g.gain.value = p.gain;
        o.connect(g).connect(noteGain);
        o.start(start);
        o.stop(start + dur + 0.1);
      }
    }

    // Schemalägg två iterationer initialt (för seamless loop)
    let iterationStart = ctx.currentTime;
    const scheduleIteration = (startTime: number) => {
      let t = startTime;
      for (const [freq, dur] of melody) {
        playNote(freq, t, dur, voiceGain);
        t += dur;
      }
    };

    scheduleIteration(iterationStart);
    iterationStart += totalLen;
    scheduleIteration(iterationStart);

    // Återkommande timer som schemalägger ny iteration när tidigare närmar sig slutet
    const loopInterval = setInterval(() => {
      const now = ctx.currentTime;
      const ahead = iterationStart - now;
      if (ahead < totalLen) {
        iterationStart += totalLen;
        scheduleIteration(iterationStart);
      }
    }, (totalLen * 1000) / 2);

    // Fade in
    voiceGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 3.5);

    const stop = (fadeMs = 2500) => {
      const now = ctx.currentTime;
      voiceGain.gain.cancelScheduledValues(now);
      voiceGain.gain.setValueAtTime(voiceGain.gain.value, now);
      voiceGain.gain.linearRampToValueAtTime(0, now + fadeMs / 1000);
      clearInterval(loopInterval);
      setTimeout(() => {
        try {
          droneA.stop();
          droneE.stop();
          noiseSrc.stop();
        } catch {}
        voiceGain.disconnect();
      }, fadeMs + 100);
    };

    return { stop };
  }

  /** Spela en SFX engångs. */
  playSfx(id: SfxId) {
    if (!this.ensureContext()) return;
    if (this.muted) return;
    const ctx = this.ctx!;
    const master = this.masterGain!;
    const now = ctx.currentTime;

    switch (id) {
      case "phone_ring":
        return this.synthPhoneRing(ctx, master, now);
      case "door_creak":
        return this.synthDoorCreak(ctx, master, now);
      case "owl_wing":
        return this.synthOwlWing(ctx, master, now);
      case "owl_call":
        return this.synthOwlCall(ctx, master, now);
      case "footstep_wood":
      case "footstep_gravel":
        return this.synthFootstep(ctx, master, now, id);
      case "vinyl_static":
        return this.synthVinylStatic(ctx, master, now);
      case "wind_gust":
        return this.synthWindGust(ctx, master, now);
      case "clock_tick":
        return this.synthClockTick(ctx, master, now);
      case "saw_wood":
        return this.synthSawWood(ctx, master, now);
      case "tree_fall":
        return this.synthTreeFall(ctx, master, now);
      case "fuse_click":
        return this.synthFuseClick(ctx, master, now);
      case "raven_distant":
        return this.synthRaven(ctx, master, now);
      case "bulb_on":
        return this.synthBulbOn(ctx, master, now);
      case "low_thud":
        return this.synthLowThud(ctx, master, now);
    }
  }

  // ─────────── SFX-synthesizers ───────────

  private synthPhoneRing(ctx: AudioContext, dst: AudioNode, t0: number) {
    // Klassisk bjällrings-telefon: två ringar à 1.2s, paus 0.4s
    // Mekanisk klockton — metallisk attack med harmoniska + snabbt dödad amplitud,
    // upprepad med pulserande "trill" (20Hz tremolo) som ger "drrring".
    const ringStarts = [t0, t0 + 1.6];
    for (const start of ringStarts) {
      const dur = 1.2;
      // Tre harmoniska delar runt 950Hz (klocka)
      const partials = [
        { freq: 925, gain: 0.22 },
        { freq: 1380, gain: 0.16 },
        { freq: 2050, gain: 0.08 },
      ];
      // Tremolo-LFO för "drrring"-effekt
      const trill = ctx.createOscillator();
      trill.type = "sine";
      trill.frequency.value = 22;
      const trillGain = ctx.createGain();
      trillGain.gain.value = 0.5;
      trill.connect(trillGain);
      trill.start(start);
      trill.stop(start + dur);

      const ringGain = ctx.createGain();
      ringGain.gain.setValueAtTime(0, start);
      ringGain.gain.linearRampToValueAtTime(0.5, start + 0.02);
      ringGain.gain.setValueAtTime(0.5, start + 0.05);
      ringGain.gain.linearRampToValueAtTime(0.42, start + dur - 0.15);
      ringGain.gain.exponentialRampToValueAtTime(0.001, start + dur);
      // Tremolo moduleras direkt på gain
      trillGain.connect(ringGain.gain);
      ringGain.connect(dst);

      for (const p of partials) {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = p.freq;
        const g = ctx.createGain();
        g.gain.value = p.gain;
        o.connect(g).connect(ringGain);
        o.start(start);
        o.stop(start + dur + 0.05);
      }
    }
  }

  private synthDoorCreak(ctx: AudioContext, dst: AudioNode, t0: number) {
    const dur = 1.2;
    const noise = this.makeNoiseBuffer(ctx, dur);
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(180, t0);
    filter.frequency.exponentialRampToValueAtTime(420, t0 + dur);
    filter.Q.value = 8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.55, t0 + 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(filter).connect(g).connect(dst);
    src.start(t0);
    src.stop(t0 + dur);
  }

  private synthOwlWing(ctx: AudioContext, dst: AudioNode, t0: number) {
    // Snabba kraftiga vingslag — högre volym, lite mer brett spektrum
    for (let i = 0; i < 5; i += 1) {
      const t = t0 + i * 0.11;
      const noise = this.makeNoiseBuffer(ctx, 0.14);
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 520;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(1.0, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      src.connect(filter).connect(g).connect(dst);
      src.start(t);
      src.stop(t + 0.14);
    }
  }

  private synthOwlCall(ctx: AudioContext, dst: AudioNode, t0: number) {
    // Tu-whoooo — kraftigare, mer närvarande
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(380, t0);
    osc.frequency.linearRampToValueAtTime(360, t0 + 0.2);
    osc.frequency.linearRampToValueAtTime(280, t0 + 1.0);
    // Lägg till en grundton en oktav under för djup
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(190, t0);
    osc2.frequency.linearRampToValueAtTime(140, t0 + 1.0);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.7, t0 + 0.15);
    g.gain.linearRampToValueAtTime(0.55, t0 + 0.8);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 1.1);
    osc.connect(g);
    osc2.connect(g);
    g.connect(dst);
    osc.start(t0);
    osc2.start(t0);
    osc.stop(t0 + 1.2);
    osc2.stop(t0 + 1.2);
  }

  private synthFootstep(
    ctx: AudioContext,
    dst: AudioNode,
    t0: number,
    kind: "footstep_wood" | "footstep_gravel",
  ) {
    const dur = 0.08;
    const noise = this.makeNoiseBuffer(ctx, dur);
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = kind === "footstep_wood" ? 220 : 800;
    filter.Q.value = 3;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.5, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(filter).connect(g).connect(dst);
    src.start(t0);
    src.stop(t0 + dur);
  }

  private synthVinylStatic(ctx: AudioContext, dst: AudioNode, t0: number) {
    const dur = 2.5;
    const noise = this.makeNoiseBuffer(ctx, dur);
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 2000;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.18, t0 + 0.3);
    g.gain.setValueAtTime(0.18, t0 + dur - 0.5);
    g.gain.linearRampToValueAtTime(0, t0 + dur);
    src.connect(filter).connect(g).connect(dst);
    src.start(t0);
    src.stop(t0 + dur);
  }

  private synthWindGust(ctx: AudioContext, dst: AudioNode, t0: number) {
    const dur = 3.5;
    const noise = this.makeNoiseBuffer(ctx, dur);
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(220, t0);
    filter.frequency.linearRampToValueAtTime(600, t0 + dur / 2);
    filter.frequency.linearRampToValueAtTime(180, t0 + dur);
    filter.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.3, t0 + 0.5);
    g.gain.linearRampToValueAtTime(0.25, t0 + dur - 0.5);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(filter).connect(g).connect(dst);
    src.start(t0);
    src.stop(t0 + dur);
  }

  private synthClockTick(ctx: AudioContext, dst: AudioNode, t0: number) {
    // En klocka som tickar för långsamt
    for (let i = 0; i < 3; i += 1) {
      const t = t0 + i * 1.4;
      const noise = this.makeNoiseBuffer(ctx, 0.03);
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1800;
      filter.Q.value = 10;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.35, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      src.connect(filter).connect(g).connect(dst);
      src.start(t);
      src.stop(t + 0.03);
    }
  }

  private synthSawWood(ctx: AudioContext, dst: AudioNode, t0: number) {
    // Sågning fram och tillbaka
    for (let i = 0; i < 6; i += 1) {
      const t = t0 + i * 0.6;
      const dur = 0.5;
      const noise = this.makeNoiseBuffer(ctx, dur);
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = i % 2 === 0 ? 800 : 600;
      filter.Q.value = 4;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.35, t + 0.1);
      g.gain.linearRampToValueAtTime(0.25, t + 0.4);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      src.connect(filter).connect(g).connect(dst);
      src.start(t);
      src.stop(t + dur);
    }
  }

  private synthTreeFall(ctx: AudioContext, dst: AudioNode, t0: number) {
    // Knäpp + tungt dunk
    const noise1 = this.makeNoiseBuffer(ctx, 0.15);
    const s1 = ctx.createBufferSource();
    s1.buffer = noise1;
    const f1 = ctx.createBiquadFilter();
    f1.type = "highpass";
    f1.frequency.value = 1200;
    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0, t0);
    g1.gain.linearRampToValueAtTime(0.55, t0 + 0.01);
    g1.gain.exponentialRampToValueAtTime(0.001, t0 + 0.15);
    s1.connect(f1).connect(g1).connect(dst);
    s1.start(t0);
    s1.stop(t0 + 0.15);

    // Thud
    const t1 = t0 + 0.25;
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(80, t1);
    osc.frequency.exponentialRampToValueAtTime(38, t1 + 0.4);
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0, t1);
    g2.gain.linearRampToValueAtTime(0.7, t1 + 0.02);
    g2.gain.exponentialRampToValueAtTime(0.001, t1 + 0.6);
    osc.connect(g2).connect(dst);
    osc.start(t1);
    osc.stop(t1 + 0.7);
  }

  private synthFuseClick(ctx: AudioContext, dst: AudioNode, t0: number) {
    // Click + summer
    const noise = this.makeNoiseBuffer(ctx, 0.02);
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.5, t0 + 0.002);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.02);
    src.connect(g).connect(dst);
    src.start(t0);
    src.stop(t0 + 0.02);

    // Hum efter
    const t1 = t0 + 0.05;
    const osc = ctx.createOscillator();
    osc.frequency.value = 50;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0, t1);
    g2.gain.linearRampToValueAtTime(0.2, t1 + 0.1);
    g2.gain.linearRampToValueAtTime(0.1, t1 + 1.0);
    g2.gain.exponentialRampToValueAtTime(0.001, t1 + 1.5);
    osc.connect(g2).connect(dst);
    osc.start(t1);
    osc.stop(t1 + 1.6);
  }

  private synthRaven(ctx: AudioContext, dst: AudioNode, t0: number) {
    // Kraa kraa avlägset
    for (let i = 0; i < 2; i += 1) {
      const t = t0 + i * 0.45;
      const noise = this.makeNoiseBuffer(ctx, 0.25);
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(900, t);
      filter.frequency.exponentialRampToValueAtTime(550, t + 0.25);
      filter.Q.value = 6;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      src.connect(filter).connect(g).connect(dst);
      src.start(t);
      src.stop(t + 0.25);
    }
  }

  private synthBulbOn(ctx: AudioContext, dst: AudioNode, t0: number) {
    // Tändning: kort knäpp + sus
    const osc = ctx.createOscillator();
    osc.frequency.value = 60;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.4, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.06);
    osc.connect(g).connect(dst);
    osc.start(t0);
    osc.stop(t0 + 0.1);

    // Long hum
    const t1 = t0 + 0.1;
    const osc2 = ctx.createOscillator();
    osc2.frequency.value = 100;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0, t1);
    g2.gain.linearRampToValueAtTime(0.12, t1 + 0.3);
    g2.gain.linearRampToValueAtTime(0.08, t1 + 2.0);
    g2.gain.exponentialRampToValueAtTime(0.001, t1 + 2.5);
    osc2.connect(g2).connect(dst);
    osc2.start(t1);
    osc2.stop(t1 + 2.6);
  }

  private synthLowThud(ctx: AudioContext, dst: AudioNode, t0: number) {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(60, t0);
    osc.frequency.exponentialRampToValueAtTime(30, t0 + 0.5);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.7, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.7);
    osc.connect(g).connect(dst);
    osc.start(t0);
    osc.stop(t0 + 0.8);
  }

  // ─────────── Helpers ───────────

  private makeNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    return buf;
  }
}

export const synthEngine = new SynthEngine();
