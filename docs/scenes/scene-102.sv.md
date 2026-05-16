---
scene_id: 102
title: "Vedbodens dörr"
language: sv
act: 2
type: G
triggers: [scene-100, scene-101]
exits: [scene-103, scene-100]
sanity_delta: 0
flags_set: [vet_om_ugglan]
flags_read: []
---

Vedboden står lite snett. Den har varit lutad så länge att gräset under östra hörnet har gett vika och blivit en jordklut. Plåt målad i falurött över timret, en låg port, en träknall i stället för lås — en handsmidd trästicka som dragits genom en järnögla och håller dörren tillsluten. Människor utan tjuvar har inga lås.

Du står framför dörren. Den når dig till bröstet. En knottflock virrar mellan dig och plåten. Du drar undan knallen ur öglan. Den glider ut tyst — träet är glatt av många händers handslag.

Då hör du det.

Något skrapar mot insidan av taket. En enda gång. Sedan tystnad.

Du står med stickan i handen. Du står med fingrarna mot dörrens kant. Du hör det igen — inte skrapning den här gången, ett tungt mjukt drag av något över bjälke. Som en handduk dragen över virke. Som en vinge.

Du lyssnar. Det är ingen råtta. Det är ingenting som rör sig som en råtta.

Det blå nattljuset från norr har inte kommit in i boden ännu — du har inte öppnat dörren — och du står med dörrens kalla plåt mot pannan utan att veta när du började göra det.

## Val

- **[Öppna dörren långsamt och kika in]**
  Du sätter fingret mot kanten. Du drar dörren mot dig en handsbredd. Mörkret innanför är inte mörker — det är skuggan inne i en bod vid midsommar, blå och kornig. Du andas en gång och drar den hela vägen. → scene-103

- **[Slå upp dörren — kliv in beslutsamt]**
  Du tar tag i kanten med hela handen och drar. Dörren ger med ett enda långt knak. Du kliver in samma rörelse. → scene-103

- **[Stå kvar och lyssna en stund]**
  Du står still. Du andas inte djupare än vanligt — du försöker att inte. Ljudet kommer igen. En vinge. Det är en vinge. Något stort i taket har just bytt fot. Du står där tillräckligt länge för att förstå att det inte är en råtta och inte är en katt. → scene-103 *(sätter `vet_om_ugglan=true`)*

- **[Sätt tillbaka knallen och gå]**
  Du drar tillbaka stickan, lägger den i öglan, vänder dig om. Du tar tre steg ut på gräset. Du vet att du måste tillbaka. Det vet du redan. → scene-100
