---
scene_id: 008
title: "Gunnar på trappan"
language: sv
act: 1
type: G
triggers: [scene-007]
exits: [scene-010, scene-009]
sanity_delta: 0
flags_set: [gunnar_tillit, vet_om_olov, gunnar_först_möte_klart, gunnar_vet_om_leopold, gunnar_vet_om_hundarna, gunnar_obekväm]
flags_read: [vet_om_per_magnus]
---

Han sitter på trappan när du kommer närmare. Du hörde inte att han kom. Hans bil står inte här — han har gått från sin stuga.

Gunnar Sandgren har åldrats sedan kortet du har av honom. Sextiofyra år, en sliten skinnjacka som är för varm för i kväll men han har den ändå, ett par byxor med jord vid knäna. Skogvaktare i fyrtio år. Pensionerad sedan en tid.

Han reser sig när du är fem meter bort. Han räcker fram handen.

"Du är längre än jag mindes", säger han.

Du tar handen. Den är torr och stor och hård. Han håller längre än ett vanligt handslag. Sedan släpper han.

"Nyckeln är där den alltid är", säger han. Han nickar mot trappstenen. "Under hällen. Hon byter inte plats på den."

Han ser mot fönstren. "Det är mörkt därinne. Stormen tog elen i hela dalen. Hon har inte fått den tillbaka."

Han ställer sig vid sidan av trappan och lutar sig mot en av stolparna. Knottet bryr sig inte om honom. Han har gjort fred med det för länge sedan.

"Det är väl bäst du går in", säger han. Han säger det utan att flytta sig.

Du står med nyckeln i fickan utan att ha tagit upp den än. Du tänker att du har frågor, och du tänker att tre av dem är vad du orkar nu.

## Val

*(Ställ upp till 3 frågor.)*

- **[När såg du henne sist?]**
  "Förra onsdagen", säger han. "Hon gick förbi grinden vid halv elva. Hon vinkade. Sedan inte." → tillbaka *(`gunnar_tillit+1`)*

- **[Hörde du något under stormen?]**
  Han tar tid på sig. "Åskan slog ner någonstans. Strömmen gick. Jag hörde — något — men jag tänkte det var åskan." → tillbaka *(`gunnar_tillit+1`)*

- **[Vet du om Leopold?]**
  Han ser bort. "Han är borta sedan sju år. Det vet du." Han säger inget mer. → tillbaka *(`gunnar_vet_om_leopold=true`)*

- **[Vad är det med hundarna?]**
  "De var hennes allt", säger han. "Sju stycken. Hon grät vid varje grav. Hon grät inte mycket annars." → tillbaka *(`gunnar_vet_om_hundarna=true`, `gunnar_tillit+1`)*

- **[Vill du att jag ringer dig?]**
  Han nickar. "Numret står på en lapp i köket. Hennes." → tillbaka *(`gunnar_tillit+2`)*

- **[Visste din far något om vad de höll på med?]**
  Han ser på dig en sekund för länge. "Min far körde ut åt dem. På sjuttiotalet. Med traktorn. Han pratade aldrig om det. Inte med mig." Han tystnar. "Jag har inte tänkt på det förut. Jag har gjort så att jag inte gör det." → tillbaka *(sätter `vet_om_olov=true`, `gunnar_tillit-1`)*

- **[Hårda frågor i rad — om du redan ställt två och pressar vidare]**
  Han ler inte. "Vi har inte tid med det här på trappan", säger han. "Gå in." *(sätter `gunnar_obekväm=true`)*

---

**[Gå in nu — gå förbi honom mot dörren]** → *(om `vet_om_per_magnus=true`)* scene-009, annars scene-010
