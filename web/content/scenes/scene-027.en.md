---
scene_id: "027"
title: "The Woodshed"
language: en
act: 2
type: G
triggers: [scene-100, scene-101]
exits: [scene-100, scene-102, scene-104]
sanity_delta: 0
flags_set: []
flags_read: []
---

You stand outside the woodshed. Falu-red sheet metal, a black door. It is the same building you have already been in — where the owl sat, where the fuse box hangs.

The gnats do not bother with you now. They do not bother with anything.

## Choices

- **[Back to the yard]** → scene-100

- **[Step inside]**
  You take the latch. → scene-102

- **[Straight to the tools]** *(if `vet_om_ugglan=true`)*
  You already know the owl is gone. You walk straight in. → scene-104
