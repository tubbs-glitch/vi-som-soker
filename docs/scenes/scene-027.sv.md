---
scene_id: "027"
title: "Vedboden"
language: sv
act: 2
type: G
triggers: [scene-100, scene-101]
exits: [scene-100, scene-102, scene-104]
sanity_delta: 0
flags_set: []
flags_read: []
---

Du står utanför vedboden. Falurött plåt, en svart dörr. Det är samma byggnad du redan har varit i — det är där ugglan satt, det är där säkringsskåpet hänger.

Knottet bryr sig inte om dig nu. Det bryr sig inte om någonting.

## Val

- **[Tillbaka till tomten]** → scene-100

- **[Gå in i skjulet]**
  Du tar i klinkan. → scene-102

- **[Direkt till verktygen]** *(om `vet_om_ugglan=true`)*
  Du vet redan att ugglan inte är där längre. Du går rakt in. → scene-104
