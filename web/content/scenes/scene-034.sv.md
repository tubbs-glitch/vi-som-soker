---
scene_id: 034
title: "Ingegerd-ekot"
language: sv
act: 3
type: G
triggers: [scene-033]
exits: [scene-035]
sanity_delta: -10
flags_set: [talat_med_ingegerd]
flags_read: [grå_riktning, vet_om_ingegerd]
---

Hon står med ryggen mot dig. Du tror först att hon står. Sedan ser du att det inte är att hon står. Det är att hon är vänd.

Hon har en grå kofta. Den är inte grå för att hon är grå. Det grå är inte i henne. Hon har den.

Hon vänder sig inte.

Du tar ett steg fram. Hon säger:

*Kom inte närmare. Du behöver inte komma närmare för att höra.*

Du står där du står. Du tar fortfarande in att rösten är fast. Den darrar inte. Den är inte gråtfärdig. Den är som en bibliotekarie som har bestämt en sak.

*Det vill att vi stannar*, säger hon. *Det är inte ondska. Det är behov.*

Du svarar inte.

*Jag vet vad du tänker. Du tänker att om vi förstår, då har vi tappat något. Du har inte tappat. Du har lärt dig.*

Hon andas in. Hon andas ut. Andetagen kommer inte ur en kropp som behöver dem.

*Det är ensamt*, säger hon. *Det är allt det är. Du kan tro mig om det här en sak. Det är allt det är.*

*Min syster ringde polisen. Min mamma skrev brev. Jag har inte hört dem på fyrtiofyra år men jag vet att de skrev. Jag är inte här för att jag valde att stanna. Jag är här för att jag inte hittade tillbaka och det är ingen som har hittat tillbaka. Du frågade mig vem jag är. Jag heter Ingegerd Hagström. Jag skrev protokollen.*

Hon väntar.

*Alice är där borta*, säger hon. *Hon kommer kunna gå med dig. Det kommer be om någon. Det ber alltid om någon. Det är inte ondska.*

## Val

- **[Lyssna helt på henne]**
  Du står kvar tills hon slutar. Hon slutar inte. Hon säger samma sak flera gånger med små skillnader och du börjar förstå att skillnaderna är vad hon vill säga. Du står där tills du har sagt något själv. Du säger: *Jag har varit vid din sten.* Hon vänder inte huvudet. Men hon säger: *Tack.* → scene-035 *(sätter `talat_med_ingegerd=true`, `ingegerd_eko+2`, `sanity -10`)*

- **[Vänd ryggen]**
  Du vänder dig bort. Du går inte — det finns inget att gå emot — men du står på andra hållet. Hon talar inte mer. Hon väntar. → scene-035 *(`sanity -2`)*
