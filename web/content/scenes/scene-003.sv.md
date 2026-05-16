---
scene_id: 003
title: "Mamma"
language: sv
act: 1
type: G
triggers: [scene-002]
exits: [scene-004]
sanity_delta: 0
flags_set: [mamma_vet, relation_mamma]
flags_read: []
---

Du vet att hon är vaken. Hon har alltid varit vaken vid den här tiden. Sedan pappa dog sover hon i fragment — två timmar före midnatt, två timmar efter fyra. Mellanrummet är hennes. Hon dricker te och tittar på dokumentärer hon redan sett.

Du tar fram mobilen och ringer upp henne. Du står kvar i hallen med jackan på.

Hon svarar på andra signalen.

"Är det något?" säger hon. Inte hej. Hon hör på klockslaget vad samtalet betyder.

Du står med ena handen på dörrhandtaget. Du har resväskan vid foten. Nyckeln redan i den andra handen.

Du vet att du har ett val här, och du vet att det val du gör nu ska du bära med dig hela vägen norrut.

## Val

- **[Säg som det är. Gunnar lät rädd. Alice är borta.]**
  Du säger det rakt. Du hör henne andas in och hålla andetaget kvar. Hon säger "Jag tänkte väl det" och sedan ingenting på en stund. Hon säger till slut att hon ringer dig imorgon. Att hon ska be om något. Att hon inte vet vad. → scene-004 *(sätter `mamma_vet=true`, `relation_mamma+1`)*

- **[Lugna henne. Det är säkert inget.]**
  Du säger att Gunnar bara är gammal och orolig. Att Alice är där hon alltid är. Att du åker upp och kollar och är hemma till helgen. Hon säger okej. Hon säger det två gånger. Hon låter inte övertygad men hon låter trött, och du vet att hon släpper det för att slippa fundera. → scene-004 *(sätter `mamma_vet=false`)*

- **[Lägg på utan att säga något viktigt. "Jag bara hör om du är vaken."]**
  Du säger att du inte kunde sova. Hon säger detsamma. Ni säger ingenting på trettio sekunder. Hon säger att du borde dricka kamomill. Du säger att du ska. → scene-004 *(sätter `mamma_vet=false`, `relation_mamma-1`)*
