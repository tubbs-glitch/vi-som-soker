# SFX List — Vi som söker / Mosters Hemligheter

> Konkreta ljudeffekter (SFX) som spelet behöver. Specifika nog att ge till **ElevenLabs Sound Effects** (klistra in "Description") eller använda som **Freesound-sökord**.
> Total: **27 SFX-specs.**
> Alla filer placeras i `web/public/audio/sfx/` med exakt detta filnamn.

---

## Filformatregler

- **Mono** om ingen panorering behövs (de flesta).
- **Stereo** för: vind över myr, knottlek, vinyl-statisk, drone-källare, statisk-brus.
- MP3 128 kbps (eller WAV om filen är under 2 sek och kvalitet märks).
- 44.1 kHz, 16-bit.
- **Volymnormalisering**: -12 dBFS peak för viktiga events, -18 dBFS för dekorativa.
- Inga reverb-svans utanför filen — frontend lägger på reverb när det behövs.

---

## SFX-tabell

| # | Filnamn | Trigger / Scen | Beskrivning (för ElevenLabs / Freesound) | Längd | Kategori |
|---|---------|----------------|-------------------------------------------|-------|----------|
| 1 | `phone_ring_old.mp3` | scene-001, scene-009, scene-020 | Old Swedish landline rotary phone ringing, single ring cycle. Plain bell tone, no electronic tones. Mid-frequency, slightly distorted as if heard across an apartment. | 1.5 sek | kommunikation |
| 2 | `subway_under.mp3` | scene-001 (Stockholm-lägenheten) | Distant Stockholm subway rumble felt through a concrete floor. Low-frequency rolling thunder under the ground. Faint metallic squeal of brakes in distance. | 8 sek loop | kommunikation |
| 3 | `door_creak_wood.mp3` | scene-010, scene-011, scene-016 | Old timber door opening slowly. Heavy creak rising in pitch over one second, then settling. Iron hinges. Dry wood. No reverb. | 1 sek | hus-trä |
| 4 | `floor_creak_step.mp3` | scene-015, scene-016, hub-rörelse | Single footstep on old pine floorboard. A weighty creak, slightly muffled. Dry interior acoustic. | 0.6 sek | hus-trä |
| 5 | `rafter_pop.mp3` | scene-012, scene-014, slumpvis i `zone_house_*` | A single wooden roof beam contracting at night. A short popping creak, like a gunshot but soft. Distant, upward direction. | 0.4 sek | hus-trä |
| 6 | `steps_gravel.mp3` | scene-007, scene-008, scene-027, scene-100-105 | Slow footsteps on coarse Nordic gravel driveway. Three steps. Crunch and shift. Mid-tempo, weighted. | 2 sek | natur |
| 7 | `steps_wood.mp3` | scene-015, scene-021 | Three slow steps on bare wooden staircase. Each step creaks differently. Old pine, dry. | 2 sek | hus-trä |
| 8 | `steps_stone.mp3` | scene-022, scene-023, scene-031 | Three footsteps descending stone cellar stairs. Hard scrape and echo of damp masonry. Low reverb tail. | 2 sek | hus-trä |
| 9 | `myre_wind_loop.mp3` | `zone_outside` ambient, scene-007/030/100-105 | Wind sweeping across an open Swedish peat bog. Reeds rustle. No trees. Subtle low howl. Designed to loop seamlessly. Stereo width. | 30 sek loop | natur |
| 10 | `mosquito_summer_buzz.mp3` | scene-007, scene-027, scene-030, scene-100-105 | Dense northern Swedish summer insect buzz. Mosquitos and midges, close and far layered. Continuous, restless. Stereo. | 20 sek loop | natur |
| 11 | `raven_distant.mp3` | scene-006, scene-007, scene-030 | A single raven call far across an empty valley. Hoarse, two-syllable croak. Audible echo of distance, no reverb plate. | 2 sek | natur |
| 12 | `owl_wing_close.mp3` | scene-103 (uggla i skjulet) | A large owl flapping wings powerfully near the listener as it takes off in a wooden shed. Three heavy wing-beats, brief feather rush. Mono, close-mic. | 1.5 sek | natur |
| 13 | `dog_bark_distant.mp3` | scene-007, scene-008 (atmosfär) | A single dog barking far away in a quiet valley, slight echo of distance. Lonely, not aggressive. One bark. | 1.2 sek | natur |
| 14 | `vinyl_needle_drop.mp3` | scene-028 | The sound of a phonograph needle lowering onto a vinyl record. Soft thump, then ten seconds of crackle and pops before any music begins. | 12 sek | ritual |
| 15 | `vinyl_static_loop.mp3` | scene-028, scene-031 (under hymnen) | Continuous warm vinyl record surface noise. Crackle and pops. No music. Designed to loop. Stereo. | 15 sek loop | ritual |
| 16 | `record_starts_alone.mp3` | scene-028 (skivspelaren startar utan att man slår på) | A vintage turntable motor starting up on its own. The mechanical click of arm engaging, then platter spinning up to speed. Slightly off-tempo. | 4 sek | ritual |
| 17 | `hymn_sustained_note.mp3` | scene-031, scene-037 | A single sustained tone from an old Lutheran hymn recording. A male choir holding one note. Slight tape wow. Vinyl crackle layered. The note refuses to end. | 12 sek | ritual |
| 18 | `clock_tick_wrong.mp3` | scene-013, scene-019, `zone_house_*` ambient | A wooden mantel clock ticking slightly too slow, roughly every 1.4 seconds instead of 1.0. Twelve ticks. Dry. | 17 sek loop | mekaniskt |
| 19 | `fuse_box_throw.mp3` | scene-027 | Old metal fuse switch being thrown to ON. A sharp metallic click, then a low electrical hum begins faintly. | 2 sek | mekaniskt |
| 20 | `car_door_close.mp3` | scene-006, scene-007 | A weighty Volvo estate car door closing in an empty rural setting. Solid metal thud, no echo. Slight gravel crunch underneath. | 1 sek | mekaniskt |
| 21 | `paper_rustle.mp3` | scene-014, scene-017, scene-025, scene-026 | Old paper being lifted and turned. Brittle, slightly crisp. A field notebook from the 1970s. Three page-turns. | 2.5 sek | mekaniskt |
| 22 | `lake_water_lap.mp3` | (om relevant — sidescen vid myr) | Calm dark water lapping against a wooden plank near the edge of a peat bog. Quiet, intimate. No splash. | 8 sek loop | natur |
| 23 | `storm_distant_loop.mp3` | scene-001 (nyhetsbild av stormen), scen-006 atmosfär | Distant rolling thunderstorm with continuous low rumble. Far thunder cracks every twenty seconds. Wind in pine forest underneath. | 25 sek loop | natur |
| 24 | `tree_falling_thud.mp3` | scene-101 (trädet som faller — referens) | A large spruce tree cracking and falling in a forest. Initial sharp wood split, then a long downward whoosh, ending in heavy thud against ground. Birds startle in distance. | 5 sek | tomten |
| 25 | `saw_on_wood.mp3` | scene-105 | A two-person crosscut saw working into a dry spruce log. Rhythmic scraping push and pull. Three full strokes. Outdoor acoustic. | 4 sek | tomten |
| 26 | `heartbeat_slow.mp3` | (Akt III — om sanity < 30 i scen-032) | A single slow heartbeat at 45 BPM. Heard from inside the chest, slightly wet. Six beats. Loopable. | 8 sek loop | kropp |
| 27 | `gray_static.mp3` | `zone_gray` ambient, scen-033/037 | Slow-evolving grey noise, no clear frequency center. Like a detuned shortwave radio in deep silence. Stereo, very wide. Loopable. | 30 sek loop | det grå |

---

## Genereringsguide — ElevenLabs Sound Effects

För varje rad ovan: kopiera kolumnen **Beskrivning** och klistra in i ElevenLabs Sound Effects (https://elevenlabs.io/app/sound-effects). Sätt **Duration** till värdet i **Längd**-kolumnen. Lyssna, generera om 1-2 gånger, välj bästa.

Om ElevenLabs inte producerar bra resultat (vanligt för naturljud som vind och myr): använd Freesound.org med sökorden i beskrivningen. Vind, knottlek, korp och uggla är bättre från Freesound — riktig fältinspelning slår alltid syntes.

## Genereringsguide — Freesound (för naturljud)

| SFX | Freesound-sökord |
|-----|------------------|
| `myre_wind_loop` | "wind reed bog", "wind moss field loop" |
| `mosquito_summer_buzz` | "mosquitoes nordic summer", "midges forest" |
| `raven_distant` | "raven call distant", "corvid one call" |
| `owl_wing_close` | "owl wing flap close", "barn owl take off" |
| `dog_bark_distant` | "dog bark far valley single" |
| `lake_water_lap` | "lake water lap wood pier quiet" |
| `storm_distant_loop` | "distant thunder loop pine forest" |
| `tree_falling_thud` | "tree falling forest" |
| `raven_distant`, `owl_wing_close` | rekommenderas: Chris Watson, Bernie Krause, eller Macaulay Library uploads |

## Checklista innan leverans

- [ ] Alla 27 SFX genererade
- [ ] Filer normaliserade till -12 / -18 dBFS enligt typ
- [ ] Loopbara filer testade i Audacity (nolldurchgång)
- [ ] Filnamn matchar exakt `web/lib/audio-map.ts`
- [ ] Placerade i `web/public/audio/sfx/`
- [ ] Spelet testat med ljud i 3 olika scener

## Vad vi INTE använder

- **Inga stockmusik-stingers.** Inga "horror-hits" från Sound Ideas.
- **Inga jump-scare-svans.** SFX är diskreta scen-events, inte skrämmare.
- **Inga digitaltexturer som låter digitala.** Vinyl-knaster ska låta som vinyl, inte som vit brus.
- **Inga reverb-baths.** Frontend lägger reverb om scenen kräver det.
- **Inga sammanhängande "soundscapes".** Vi vill ha distinkta event som spelaren kan urskilja.
