---
scene_id: 033
title: "Rösterna"
language: sv
act: 3
type: G
triggers: [scene-032]
exits: [scene-034, scene-035]
sanity_delta: -5
flags_set: [grå_riktning]
flags_read: [bär_halsband, läst_namn]
---

Det är inte att du hör rösterna.

Det är att rösterna är.

En är din egen. Den säger ditt namn. Du har aldrig hört dig själv säga ditt namn ut i ett rum med ingen. Den säger det inte som en fråga och inte som ett svar. Den säger det som en konstatering. Som om någon räknar närvarolista och du är på den.

En är mamma. Den säger inget. Den andas in. Den andas in en gång till. Den har gjort det i telefonen när du var åtta och hade ringt utan anledning och hon hade inte hunnit ifrån middagen och hon visste inte att du grät. Den är det.

En är hög och tunn och kommer från långt borta och låter som en hund som hetat Signe. Du har hört den sjätte Signes röst på vinden.

Den här är inte sjätte.

Den här är en annan.

En är en man som du tror först är Leopold. Den säger en vers. *Bereden väg för Herran.* Den är inte Leopold. Den är äldre. Den är en bror.

En är en kvinna du aldrig har hört. Den är inte tunn. Den är fast. Den säger:

*Vi har väntat.*

Inte med längtan. Inte med vrede.

Bara: *Vi har väntat.*

Det är inte fem röster. Det är att fem röster har förmått sig att bli avgränsade. Det finns fler. De ligger under. De ligger som flugor över ett rågfält ligger — många nog att höras som ett.

Du står där du står.

Du ser inte rösterna. Du ser bara grått.

Men du vet att de står på olika håll. Mammas röst är åt det håll du tror är där du kom in. Den okända kvinnans röst är åt motsatta hållet. Signe är någonstans närmare än de andra. Mannen — den som inte är Leopold — är ovanför, eller under, du kan inte bestämma.

Din egen röst är vid din axel.

Den säger ditt namn igen.

Du kan ropa. Du kan stå.

Du tänker att om du ropar kommer en av rösterna att svara. Du tänker att om du står kommer alla att vänta. Du tänker att vänta är vad de redan har gjort.

## Val

- **["Alice!"]**
  Du ropar. Det är ditt enda namn för det du kom hit för. Rösten du gett ut försvinner inte. Den hänger. Du hör den hänga. Den hänger där en vanlig röst skulle ha hunnit dö ut och den fortsätter hänga. → scene-035 *(sätter `grå_riktning=alice_först`)*

- **["Leopold!"]**
  Du ropar. Det är hennes mans namn. Det grå gör inte plats för det, men det grå tar emot det. Det är som att lägga en sten i lera. Den sjunker. Lerorna sluts om den. → scene-035 *(sätter `grå_riktning=leopold_först`)*

- **["Signe!"]** *(kräver `bär_halsband != none` eller `läst_namn=true`)*
  Du ropar. Du säger nummer också, lågt: *Signe sex.* Den höga rösten tystnar. Sedan börjar den om. Den har inte glömt sitt namn. Den hade bara inte hört det på lång tid. → scene-035 *(sätter `grå_riktning=signe_först`, `vinds_tinget+1`)*

- **["Vem är du?"]**
  Du säger det åt det håll där kvinnan står. Du säger det utan att höja rösten. Hon väntar en sekund. Sedan säger hon: *Kom.* → scene-034 *(sätter `grå_riktning=ingegerd_först`)*

- **[Tystnad]**
  Du säger ingenting. Du står. Du står. Du står. Det grå räknar dig till sina. Du vet inte hur du vet det. Du vet det. → scene-035 *(sätter `grå_riktning=tyst`, `det_grå+1`, `sanity -1`)*
