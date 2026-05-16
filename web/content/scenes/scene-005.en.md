---
scene_id: 005
title: "The Petrol Station at Sveg"
language: en
act: 1
type: G
triggers: [scene-004]
exits: [scene-006]
sanity_delta: 0
flags_set: [vet_om_per_magnus, vet_om_sallskapet_rykte]
flags_read: []
---

The petrol station is on the edge of Sveg, where Route 504 turns off towards Lillhärdal. Two pumps, a roof of corrugated tin, an air hose that doesn't work any more. Inside the kiosk a teenager sits looking at a phone.

You fill the tank slowly. Three thousand kronor's worth of hose running carefully. You stand with your hand on the trigger and look at the road north. It vanishes between two low hills and after that there is nothing more to see.

At the second pump there is an older man filling an old Volvo 245. He is dressed for being out all day — cap, a blue work jacket that has been blue for twenty years. He has not looked at you.

He looks now. A long look, as if he is taking a feature apart and finding where he has seen it before.

'You're Alice's,' he says at last. Not a question. 'She used to bring photographs. A long time ago, but you remember those things.'

You say yes.

He nods at the sign behind you. 'You headed up to Hällmyren?'

You say you are.

He stands quiet for several seconds. The trigger on his pump clicks — his tank is full — but he does not put the nozzle back.

## Choices

- **[Talk with him. He has something to say.]**
  'Had a relative in that whole business in the seventies,' he says at last. He does not say what business. He reaches inside his jacket, takes out a till receipt and a pen, writes a phone number on the back. 'Per-Magnus Berg. He's at the Brovaktarn care home in Östersund. He doesn't always answer. Sometimes he does.' He passes you the slip without meeting your eye. 'Don't tell Gunnar I gave it to you.' → scene-006 *(sets `vet_om_per_magnus=true`, `vet_om_sallskapet_rykte=true`)*

- **[Short answers. You haven't time for a chatty stranger.]**
  You say you're visiting family. He nods. He looks away. Before he drives off he leaves a slip of paper under your wiper. You read it when he is gone — a phone number, *Per-Magnus Berg, Brovaktarn care home, Östersund*. Under the name, in thinner ink: *relative in that whole business, '70s*. He has not written why. → scene-006 *(sets `vet_om_per_magnus=true`, `vet_om_sallskapet_rykte=true`)*

- **[Say nothing. Pay and leave.]**
  You go in and pay by card. The teenager says nothing. When you come out the old man has gone. There is no slip under your wiper. → scene-006
