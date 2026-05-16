---
scene_id: 101
title: "Trädet"
language: sv
act: 2
type: G
triggers: [scene-100]
exits: [scene-100, scene-102]
sanity_delta: -3
flags_set: [vet_om_trädet]
flags_read: []
---

Trädgården är ingen trädgård. Det är gräs som någon slutat klippa för fyra somrar sedan, en rabatt där pioner försökt och inte fortsatt, en bänk i grånat trä som lutar mot ena änden. Du går mot rönnarna utan att tänka på det. Det är rönnarna du har hört om hela ditt liv.

De står tätt — tre stammar ur samma rotklump. Vid foten har någon lagt sten i en halv ring. Du räknar inte. Du vill räkna men du gör det inte.

Du går förbi dem och nedför slänten mot byhörnet, dit gruset slutar och tjälmarken tar vid. Granens topp ser du innan du ser hela trädet — den ligger snett ut över hörnet på tomten, en lång mörk linje genom det blå ljuset, och först då förstår du vad du tittar på.

Granen är stor. Den har vuxit ensam i kanten av skogsbrynet och fått tjocka grenar hela vägen ner. Den har fallit utåt, bort från skogen, mot ledningsstolpen vid vägen. Den ligger med kronan ungefär där stolpen står — eller stod — och den breda stammen tvärs över. Stolpen är inte fallen. Den lutar.

Linjen som spände över är inte av. Den är nere. Trädet har pressat ned kabeln mot stolpens metallöra — den svängde över i kontakt med stommen och stannade där. Du ser den ligga mot järnet, en hud mot en annan. Det är därifrån kortslutningen kommer. Det är därför säkringen i skjulet löste ut. Det är därför det är mörkt inne. Det är därför skivspelaren stod stilla. Det är därför.

Ingen surrning från elskåpet. Inget ljud av spänning. Bara gran och kall jord och knottet kring tinningen.

Du står tre meter från stammen och ser hur långt den är. Tio meter, kanske mer. Vid roten har den lyft upp en hel mark av mossa med sig, som en kropp under en filt som rörts åt sidan. Hålet under är svart och blött och luktar tjälmark.

Du sätter dig på huk vid kabeln där den möter stolpen. Du rör den inte. Stammen håller den nere. Lyfter du bort tillräckligt av stammen, glider kabeln tillbaka i sitt läge. Då kan säkringen slås på.

Du tänker på sågen. Du har inte sett en såg. Det måste finnas en såg.

## Val

- **[Närmare — gå runt trädet]**
  Du går utefter stammen mot kronan. Granen är ett rum av grenar nu, inte ett träd. Du måste igenom det. Sågen och yxan är vad du behöver. Du vänder. → scene-100 *(sätter `vet_om_trädet=true`, `sanity -3`)*

- **[Tillbaka mot huset]**
  Du går tillbaka samma väg. Knottet följer. → scene-100 *(sätter `vet_om_trädet=true`)*

- **[Mot vedboden — du vet vad du behöver]**
  Du vänder på klacken och går rakt över gräset mot boden. → scene-102 *(sätter `vet_om_trädet=true`)*
