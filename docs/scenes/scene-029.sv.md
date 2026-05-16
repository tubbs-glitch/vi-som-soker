---
scene_id: 029
title: "Vägen-valet"
language: sv
act: 2
type: SBN
triggers: [scene-026, scene-028]
exits: [scene-031]
sanity_delta: 0
flags_set: [vagval_intention]
flags_read: [vet_om_bertil, vet_om_sallskapet]
---

Det är någon gång efter klockan ett på natten. Det är ljust. Det är inte morgon och det är inte natt. Det är en blå ton i fönstren som lägger sig som ett tunt täcke över allt — bordet i mejeriet, eller skrivpulpeten i Alices sovrum, eller golvet i hallen där du står med en hand mot väggen och en sko avtagen utan att du minns att du tog av den. Du står där du står.

Det blir tyst i huvudet.

Du har vetat vissa saker i tre timmar och andra saker i femton minuter. Du vet att Alice är på andra sidan. Du vet att hon inte är ensam där. Du vet att Leopold gick efter henne för sju år sedan och inte kom tillbaka. Du vet att det fanns en grupp människor som höll på med detta i nästan femton år innan din mamma blev gift och du föddes. Du vet att en av dem var Astrid Lindh, och att en var Ingegerd Hagström, och att en var Bertil Lindblom, som var Leopolds äldre bror, och som var din morbror, och som ingen någonsin sa ett ord om till dig.

Du vet att det inte är ditt fel.

Du vet också att ingen har sagt det.

Du tänker att du har två tankar. Du har dem samtidigt och de drar inte åt samma håll.

Den första är: jag ska gå dit ner och få henne hem. Jag bryr mig inte om vad det kostar.

Den andra är: någon ska stänga det. Det har stått öppet i femtiotvå år. Det har tagit sex personer.

Den tredje är inte en tanke. Den är att du inte vet.

## Val

- **[Jag ska få henne hem]**
  Du säger det inte högt. Du tänker det och kroppen håller det. Du andas in en gång genom näsan. Du har bestämt vad du är här för. → scene-031 *(sätter `vagval_intention=rädda`, `alice+1`)*

- **[Jag ska stänga det]**
  Du står med handen kvar mot väggen. Det är inte ett val mot Alice. Det är ett val för det som ska finnas kvar när Alice är borta — och en dag ska Alice vara borta, oavsett. Du tänker på Bertil. Du tänker på Astrid. Du tänker på en kvinna du aldrig sett som tog ett steg in i en cirkel den 23 juni 1981. → scene-031 *(sätter `vagval_intention=stoppa`, `det_grå-1`)*

- **[Jag bestämmer på andra sidan]**
  Du tänker inte färdigt. Du tror inte att du behöver. Du kommer att veta när du står där. Du tar av andra skon också, sätter ner den parallellt, du står på sockorna på de kalla tiljorna. → scene-031 *(sätter `vagval_intention=obeslutsam`)*
