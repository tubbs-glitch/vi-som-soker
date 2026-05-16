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

Det är inte att du hör rösterna. Det är att rösterna är.

En är din egen. Den säger ditt namn. Du har aldrig hört dig själv säga ditt namn ut i ett rum med ingen.

En är mamma. Den säger inget. Den andas in. Den andas in en gång till.

En är hög och tunn och kommer från långt borta och låter som en hund som hetat Signe. Du har hört den sjätte Signes röst på vinden. Den här är inte sjätte. Den här är en annan.

En är en man som du tror först är Leopold. Den säger en vers. Den är inte Leopold.

En är en kvinna du aldrig har hört. Den är inte tunn. Den är fast. Den säger: *Vi har väntat.*

Du står där du står.

Du ser inte rösterna. Du ser bara grått. Men du vet att de står på olika håll. Mammas röst är åt det håll du tror är där du kom in. Den okända kvinnans röst är åt motsatta hållet. Signe är någonstans närmare än de andra.

Du kan ropa. Du kan stå.

## Val

- **["Alice!"]**
  Du ropar. Det är ditt enda namn för det du kom hit för. Rösten du gett ut försvinner inte. Den hänger. Du hör den hänga. → scene-035 *(sätter `grå_riktning=alice_först`)*

- **["Leopold!"]**
  Du ropar. Det är hennes mans namn. Det grå gör inte plats för det, men det grå tar emot det. → scene-035 *(sätter `grå_riktning=leopold_först`)*

- **["Signe!"]** *(kräver `bär_halsband != none` eller `läst_namn=true`)*
  Du ropar. Du säger nummer också, lågt: *Signe sex.* Den höga rösten tystnar. Sedan börjar den om. → scene-035 *(sätter `grå_riktning=signe_först`, `vinds_tinget+1`)*

- **["Vem är du?"]**
  Du säger det åt det håll där kvinnan står. Du säger det utan att höja rösten. Hon väntar en sekund. Sedan säger hon: *Kom.* → scene-034 *(sätter `grå_riktning=ingegerd_först`)*

- **[Tystnad]**
  Du säger ingenting. Du står. Du står. Du står. Det grå räknar dig till sina. → scene-035 *(sätter `grå_riktning=tyst`, `det_grå+1`, `sanity -1`)*
