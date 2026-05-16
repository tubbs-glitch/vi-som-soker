# Needle Puzzle — Implementation Log

> Pass: 2026-05-15. Copywriter-sv-en. Lägger in nåls-momentet mellan scene-105 (såg) och scene-029 (vägen-valet).

## Bakgrundsspec

Användaren har bett om följande story-detalj:

> "När trädet är nedsågat kan man påbörja ritualen. Skivspelaren går igång, men nålen är inte längre på skivan så någon hymn hörs inte. För att öppna portalen behöver man följa instruktionerna noggrannt."

Tidigare flöde: scene-105 → scene-028 (saknades) → scene-029.

## Vad som ändrats

### Nya filer
- `docs/scenes/scene-028.sv.md` — "Skivspelaren snurrar utan ljud"
- `docs/scenes/scene-028.en.md` — "The Turntable Without Sound"

Scenens kärna: spelaren går från boden tillbaka till huset. Strömmen är på. Tallriken snurrar men nålen står kvar vid skivans yttre rand. Hymnen hörs inte. Spelaren förstår att Alices anteckning *LP-startas vid 22:47* betydde att någon skulle sänka nålen — inte att skivspelaren skulle göra det själv.

Två val:
- **[Till vardagsrummet — nålen]** → scene-012 (placera nålen)
- **[Stå kvar i hallen]** → scene-029 (skippa hymnen, sämre ritual senare)

### Editerade filer

**`docs/scenes/scene-105.{sv,en}.md`**

Justerat den avslutande raden om vad spelaren hör från huset. Tidigare: "En platta. En nål som sänker sig." Nu: "En platta. Bara plattan." (sv) / "A platter. Only the platter." (en). Detta för att nålen inte ska redan vara nere innan scene-028.

Valet **[Gå in — sången har börjat]** → **[Gå in]**, eftersom någon sång inte längre har börjat.

**`docs/scenes/scene-012.{sv,en}.md`**

- Triggers: lade till `scene-028`.
- Flags_set: lade till `hymnen_låten_på`.
- Flags_read: lade till `ström_på`, `hymnen_låten_på`.
- Nytt val: **[Sätt nålen på skivans yttre spår]** / **[Lower the needle to the outer groove]** — endast om `ström_på=true` och `hymnen_låten_på=false`. Sätter `hymnen_låten_på=true`, `sanity -3`.
- Existerande val **[Lyft på skivans nål]** / **[Lift the needle off the record]** — förtydligat att det bara visas om `hymnen_låten_på=true`. Outcome-prosan är omskriven så hymnen faktiskt tystnar (tidigare bara "hyllan klickar").

**`docs/scenes/scene-029.{sv,en}.md`**

Ingen ändring. Triggers var redan `[scene-026, scene-028]`, exits redan `[scene-031]`. Bekräftat OK.

**`docs/state-flags.md`**

- Ny flagga: `hymnen_låten_på: false` — spelaren har faktiskt sänkt nålen på skivan.
- `hymnen_börjat` förtydligad: "tallriken snurrar — INTE samma som att hymnen faktiskt hörs."
- `ritual_korrekt`: notering att scene-031 senare måste justeras så att `full`-utfallet kräver `hymnen_låten_på=true`. Utan hymnen kan ritualen som mest bli `partial`.

## Vad som INTE gjorts (men måste göras separat)

**`docs/scenes/scene-031.{sv,en}.md` — ritualen**

Scenen läser `har_tjarsten`, `förstår_frekvens`, `sanity` men inte `hymnen_låten_på`. Måste uppdateras:

1. Lägg till `hymnen_låten_på` i `flags_read`.
2. Valet **[Strö medurs, takt 47]** kräver i dag bara `har_tjarsten=true`. Det måste även kräva `hymnen_låten_på=true` för att ge `ritual_korrekt=full`. Om `hymnen_låten_på=false` ska samma val sätta `ritual_korrekt=partial` med kraftigare sanity-bortfall.
3. Prosan i scene-031 öppnar i dag med: "Skivspelaren ovanför har börjat — du hörde den börja medan du gick i hallen — och hymnens första strof följer dig genom golvet." Detta antar att hymnen spelar. Behöver alternativ-stycke för fallet `hymnen_låten_på=false` där spelaren bara hör tallriken arbeta — tomt spår, ingen sång att räkna takter i. Då blir takt 47 omöjligt att räkna exakt, vilket berättigar `partial`-utfallet.
4. Beat-räkningen i `[Strö medurs, takt 47]` förutsätter musikalisk takt. Utan hymn finns ingen takt. Detta är hela poängen med pusslet och måste reflekteras i prosa och konsekvens.

Förslag: överlämna scene-031-revisionen till narrative-designer + copywriter i nästa pass.

**`docs/scene-map.md`**

Bör uppdateras om den listar scen-028:s frontmatter — `triggers`, `exits`, `flags_set` är nu definierade.

## Öppna frågor

1. Ska spelaren kunna återvända till scene-012 EFTER scene-029 för att sänka nålen för sent? I dagens flöde går scene-029 direkt till scene-031. Det finns ingen återväg. Detta är förmodligen avsikten — valet att skippa hymnen är ett riktigt val med konsekvenser.
2. Ska `hymnen_låten_på=false` påverka något UTÖVER scene-031? T.ex. dialog i scene-032+ ("Hörde du musiken?" — "Nej.") eller slut-villkor? Förslag: lägg till en eko-effekt i scene-037 där Det grå noterar tystnaden.
3. Sanity-bortfallet i [Sätt nålen]: jag satte `-3`. Kan justeras av game-designer.
