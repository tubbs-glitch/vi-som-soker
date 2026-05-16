# Audio Design — Vi som söker / Mosters Hemligheter

> Översikt av ljudvärlden. Den här filen är roten — för konkreta prompts och specs, se `suno-prompts.md`, `sfx-list.md` och `web/lib/audio-map.ts`.
> **Princip:** ljudet är inte musik som spelas över prosan. Det är den prosan andas i.

---

## 1. Bärande designprinciper

1. **Drone före melodi.** Inga teman. Inga ledmotiv. En enda not som inte slutar är mer skrämmande än fyra som löser ut sig.
2. **Akustiska instrument, dåligt mikade.** Stråkar nära bron, piano med trasan över strängarna, dragspel långt borta. Ingen produktionsglans.
3. **Fältljud bär lika mycket som musiken.** Knottet kring tinningen. Myrens ånga. En klocka som tickar i fel rum. Det här är 60% av ljudvärlden.
4. **Inga jump scares.** En kall not som funnits där i tolv sekunder är skräck. Ett plötsligt knäck är en effekt — och vi använder dem mätbart, alltid på *spelarens* handling, aldrig på berättarens.
5. **Loopbart 60-120 sek.** Samma track måste klara en scen som spelas långsamt och en scen som klickas igenom på 8 sek.
6. **Midnattsljus, inte mörker.** Det här ljudet är *för-mycket-närvarande*, inte gömt. Höga frekvenser tas inte bort. Diskantens skarphet är spelets vapen.
7. **Tystnad är ett instrument.** Vi mixar in dödtid. En 90-sekunders track har gärna 8 sekunder utan nästan något. Det får spelaren att luta sig framåt.

## 2. Musikaliska referenser (för Suno-prompts och granskning)

- **Hildur Guðnadóttir** — *Saint* (2019), *Tár* (2022 OST), *Chernobyl* (2019). Cello-drones, brusig botten, mänsklig andning under stråk.
- **Jóhann Jóhannsson** — *Last and First Men* (2020), *Arrival* (2016 OST). Långa orgelblock, vokala drones som inte är sång.
- **Ben Frost** — *A U R O R A* (2014), *The Centre Cannot Hold* (2017). Brusig kontrabas, distorderade lågfrekvenser, taktlöshet som rytm.
- **Tim Hecker** — *Konoyo* (2018), *Anoyo* (2019). Asiatiska blåsinstrument tonsatta som drones; "skadat tempel".
- **The Body** — *I Have Fought Against It, But I Can't Any Longer* (2018). Förvrängd folk-musikkärna, kvinnoröst som rämnar.
- **Sarah Davachi** — *Pale Bloom* (2017). Orgel och piano nära varandra, mikrotonala beats.
- **Eluvium** — *Copia* (2007). Pianoslingor som upprepas tills de blir möbel.
- **Stars of the Lid** — *And Their Refinement of the Decline* (2007). Stråkblock i mycket långsam rörelse.

## 3. Zonkarta — vilken track för vilken zon

Spelet har sex audio-zoner. En track loopar tills spelaren byter zon. Övergångar är 4-sekunders crossfades, ej hårda klipp.

| Zon-ID | Zon | Scener | Bärande track | Bärande ambient |
|--------|-----|--------|---------------|-----------------|
| `zone_intro` | Stockholm / titel / förvarning | 001–003 | `music/intro.mp3` | `ambient/city_night.mp3` |
| `zone_road` | Vägen norrut | 004–006 | `music/road_north.mp3` | `ambient/car_interior.mp3` |
| `zone_outside` | Hällmyren utomhus | 007, 008, 009, 027, 030, 100–105 | `music/myre.mp3` | `ambient/myr_wind.mp3` |
| `zone_house_ground` | Botten + källar-förvar | 010–014, 020, 022–023 | `music/house_interior.mp3` | `ambient/house_creaks.mp3` |
| `zone_house_upper` | Övre + badrum | 015–019 | `music/upstairs.mp3` | `ambient/house_creaks_upper.mp3` |
| `zone_attic` | Vinden | 021 | `music/attic.mp3` | `ambient/attic_air.mp3` |
| `zone_dairy` | Mejeribyggnaden | 024–026 | `music/dairy.mp3` | `ambient/paper_room.mp3` |
| `zone_basement_ritual` | Ritualkällaren + portalöppning | 028, 029, 031 | `music/basement.mp3` | `ambient/basement_drone.mp3` |
| `zone_gray` | Den grå dimensionen | 032–038 | `music/gray.mp3` | `ambient/no_air.mp3` |
| `zone_ending` | Slut + eftertext | 039–043 | varierar (se nedan) | tystnad mestadels |

Slutmusiken varierar:
- Slut 1 (alla hem) — återanvänder `music/intro.mp3` men mixat torrare och utan diskantbrus.
- Slut 2 (en blev kvar) — `music/intro.mp3` mixad tystare, en stråkton lägre.
- Slut 3 (väktaren) — `music/gray.mp3` fortsätter, men en mänsklig andning läggs över.
- Slut 4 (tystnaden) — bara `ambient/house_creaks.mp3`. Ingen musik.

## 4. SFX-kategorier

Se `sfx-list.md` för full lista. Sex kategorier:

1. **Telefoner och kommunikation** — gammal ringsignal, fastlinje-ton, statisk från tunnelbanan.
2. **Hus-trä** — dörrknarr, takvirke-knäpp, golvgnissel, trappa-steg-5.
3. **Yttre natur** — vind över myr, knottlek, korp, uggla, hund i fjärran.
4. **Mekaniskt** — säkringsskåp, klocka som tickar fel, kylskåp som dör, bil-dörr, motorsurr.
5. **Ritual** — vinyl-nedsänkning, hymn-not, statisk i rummet, drone-puls.
6. **Tomten** (scen-100–105 — utomhusarbete på tomten) — såg mot trä, träd som faller, fotsteg på grus och sten, stormbrus.

## 5. Mixregler för frontend

- **Musikvolym**: -18 dBFS standard. Sänk till -28 dBFS när en SFX spelar.
- **Ambient**: -24 dBFS, loopbart, alltid på över musiken.
- **SFX**: -12 dBFS för viktiga, -18 dBFS för dekorativa.
- **Sanity-modulator** (om implementerad): vid sanity < 40 läggs ett lågfrekvent brus på +2 dB över ambient.
- **Mute-knapp**: en, inte tre. Spelaren ska inte behöva mikromixa.

## 6. Leveransformat

- **Musik**: MP3 192 kbps, 44.1 kHz, stereo. Filnamn enligt zonkartan ovan.
- **Ambient**: MP3 128 kbps, stereo, **loopbar** (kontrollera nolldurchgång i båda ändar — Suno klarar inte detta automatiskt, användaren måste loop-trimma i Audacity).
- **SFX**: MP3 128 kbps mono om ingen panorering behövs, annars stereo. Korta filer (under 3 sek) får vara WAV om filstorleken tillåter.
- Placera alla filer under `web/public/audio/` enligt mappningen i `web/lib/audio-map.ts`.

## 7. Produktionsordning (rekommendation)

1. Generera de tre viktigaste tracksen först: `intro`, `house_interior`, `gray`. De testar att den övergripande ton-fängelset håller.
2. Generera alla SFX i en batch i ElevenLabs Sound Effects. De är 18-25 stycken och tar ungefär en timme.
3. Generera resterande musik.
4. Loop-trimma allt i Audacity. Spelet förlåter inte hårda loop-kanter.
5. Mixa volymer i `web/lib/audio-map.ts` per scen efter playtest.

## 8. Vad vi INTE gör

- Inga vokala melodier (förutom hymn-fragmenten i `music/basement.mp3`, och de är medvetet otydliga).
- Inga jump-scare stingers. Inga "spooky violins" från stockmusik-bibliotek.
- Inga trummor (förutom myr-puls i `music/gray.mp3`, som inte är taktfast).
- Inget reverb-bad. Vi vill ha torra rum, inte katedraler.
- Inga elgitarrer. Inga synthesizers som låter som synthesizers (alla synter ska imitera akustiska instrument).
- Ingen "horror trailer"-estetik. Det här är Hildur, inte Hans Zimmer.
