---
scene_id: 103
title: "Ugglan i taket"
language: sv
act: 2
type: G
triggers: [scene-102]
exits: [scene-104, scene-102]
sanity_delta: -2
flags_set: [vet_om_ugglan, besparat_ugglan, ugglan_dod, ugglan_minns, misslyckat_skjul, wounds_add]
flags_read: [skarpt, MOD]
---

Du har en sekund. Du har inte ens en sekund.

Något stort vid den övre bjälken lyfter sig — en vingknall hård som en bok som faller från en hylla — och luften i boden är inte luft längre. Den är en kropp. En uggla. Stor. En kattuggla eller en berguv, du hinner inte avgöra; det är en sköld av brun ljum fjäder och en mask av ansikte i mitten, och två ögon som är gula och stilla i ett huvud som rör sig i en fel hastighet.

Hon kommer mot dig. Inte rakt. Hon böjer luften runt en stapel ved och hittar linjen ut genom dörren — som är där du står. Hennes vingar är breda nog att fylla dörrhålet.

Du har en hand på dörrkanten. Du har den andra handen lös. Du har, i fickan eller i bältet eller över axeln, det du tog med dig hemifrån.

Du har en sekund.

## Val

- **[Ducka]**
  Du böjer dig. Inte tänkt — kroppen gör det innan du. Du sjunker mot dörrens nedre kant och lägger axeln mot virket. Ugglan går över dig som väder, du känner vinden av två stora fjädervingar mot håret, en doft av damm och fågel och fågel-fågel, och sedan är hon ute och borta över taket. Du står på huk i dörrhålet med händerna mot trä. Inget skadat. Inget dött. Hon är tillbaka i sin natt. → scene-104 *(sätter `vet_om_ugglan=true`, `besparat_ugglan=true`, `sanity -1`)*

- **[Stå still — möt blicken]** *(om MOD ≥ 7)*
  Du gör ingenting. Du gör det medvetet. Du står med fötterna jämnt och händerna utmed sidorna och du tittar henne i ögat så som man tittar på en hund som är på väg att bita någon för att den är rädd. Ugglan saktar inte. Hon böjer däremot — i sista andetaget av luft mellan dig och henne lägger hon vingarna ner och *vrider* — och hon går förbi dig så nära att du känner stommen av en vinge mot axeln utan att den slår. Hon hittar ut. Hon stannar på taknocken ovanför dig en sekund. Sedan är hon borta. Du vet att hon kommer att minnas. → scene-104 *(sätter `vet_om_ugglan=true`, `besparat_ugglan=true`, `ugglan_minns=true`, `sanity +1`)*

- **[Slå mot henne med det du har]** *(kräver `skarpt=true` — yxa, kniv eller annat)*
  Du höjer det du har. Du sliter armen uppåt och ut — det är inget hugg, det är en panik, men du har stål i handen. Hon möter järnet i luften. Det blir ingen ren träff och ingen ren miss. Klingan sliter mot fjäder och sedan mot kött, och du tar hennes klor mot handryggen samtidigt. Hon kommer ner på golvet en meter från dig, vinklat, och vingarna fortsätter en gång till efter att huvudet stannat. Hon ser på dig medan ljuset i ögonen tunnas ut.

  Du står med handryggen blödande och en uggla död på vedbodsgolvet. Du har inte velat det här. Du har gjort det ändå. → scene-104 *(sätter `vet_om_ugglan=true`, `ugglan_dod=true`, `wounds_add=skuren_hand`, `sanity -3`)*

- **[Backa ut — stäng dörren mellan er]**
  Du backar med ryggen först. Foten hittar tröskeln. Du drar dörren mot dig i samma rörelse — den slår igen en aning för sent, du hör vingen mot insidan av virket — men du är ute, och dörren är emellan. Du står med ryggen mot dörren och andas. Du har inte fått yxan. Du har inte fått sågen. Du måste tillbaka in. → scene-102 *(sätter `vet_om_ugglan=true`, `misslyckat_skjul=true`, `sanity -2`)*
