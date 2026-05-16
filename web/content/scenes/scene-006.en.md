---
scene_id: 006
title: "The Last Thirty Kilometres"
language: en
act: 1
type: G
triggers: [scene-005]
exits: [scene-007]
sanity_delta: 0
flags_set: [set_kort_om_omgivningen, sanity_delta]
flags_read: []
---

The tarmac ends three kilometres past Lillhärdal. You see it before you feel it — the colour of the road shifts from black to grey-green, and the tyres begin to make a different sound. Gravel. Gravel for twenty years. Gravel in every weather.

You drop your speed to sixty. The phone in the cupholder shows one bar, then none, then a flicker of one, then nothing at all. You glance at it every minute until you stop glancing.

The birch is gone. Spruce takes both sides — close-set, even, unarguing. Between the trunks the bog opens out. The ground frost gave up a month ago and now the peat steams in thin bands that follow you.

You drive through a village that is no longer a village. Three foundations of houses. A fourth with a roof and no windows. A playground where the dandelions have gone to seed and the only motion is the seeds when the car passes. A chapel with the shutters nailed across. The sign says Storvallen 0.2 km — but there is no Storvallen any more. The sign is only there.

You pass two vehicles in thirty kilometres. A tractor without a driver stands in a field. A pickup with a fishing rod on the roof is parked where a side track ends in water.

The sun is low now but it does not set. It rests against the silhouette of the high country to the north-west. It is past eight in the evening and the sky is white.

## Choices

- **[Drive slowly. You need to see this.]**
  You ease down. You look. The foundations have stones that someone once laid evenly. The chapel's timber is grey where it used to be red. An old crate leans against a fence rail and you think someone put it there once meaning to come back for it. You drive at forty. You see everything. Sanity +1. *(sets `set_kort_om_omgivningen=true`)* → scene-007

- **[Press on. You want to be there.]**
  You look straight ahead. You note without stopping. You drive seventy on gravel and the car shakes in the corners. You are going too fast and you mean it. Sanity 0. → scene-007
