---
scene_id: 103
title: "The Owl in the Roof"
language: en
act: 2
type: G
triggers: [scene-102]
exits: [scene-104, scene-102]
sanity_delta: -2
flags_set: [vet_om_ugglan, besparat_ugglan, ugglan_dod, ugglan_minns, misslyckat_skjul, wounds_add]
flags_read: [skarpt, MOD]
---

You have a second. You do not even have a second.

Something large up at the upper beam lifts itself — a wingbeat hard as a book dropped from a shelf — and the air in the shed is no longer air, it is a body. An owl. Large. A tawny or a great grey, you have no time to know; it is a shield of warm brown feather and a mask of face at its centre, and two eyes that are yellow and still in a head that turns at some appalling wrong speed.

She comes for you. Not straight. She bends the air around a stack of cordwood and finds the line out through the door — which is where you stand. Her wings are wide enough to fill the doorway.

You have one hand on the edge of the door. The other hand is free. You have, in your pocket or in your belt or across your shoulder, whatever it was you brought from home.

You have a second.

## Choices

- **[Duck]**
  You bend. Not thought — the body does it before you. You drop toward the lower edge of the door and put your shoulder against the wood. The owl goes over you like weather. You feel the wind of two great feathered wings against your hair, a smell of dust and bird and bird, and then she is out and gone over the roof. You crouch in the doorway with your hands on the timber. Nothing hurt. Nothing dead. She is back in her night. → scene-104 *(sets `vet_om_ugglan=true`, `besparat_ugglan=true`, `sanity -1`)*

- **[Stand still — meet her eye]** *(requires MOD ≥ 7)*
  You do nothing. You do it on purpose. You stand with your feet square and your hands at your sides, and you look her in the eye the way you look at a dog that is about to bite from fear. The owl does not slow. She bends instead — in the last breath of air between you she lowers her wings and turns — and she goes past you so close that you feel the shaft of one wing against your shoulder without its striking. She finds the open. She perches on the roof ridge above you for a second. Then she is gone. You know she will remember. → scene-104 *(sets `vet_om_ugglan=true`, `besparat_ugglan=true`, `ugglan_minns=true`, `sanity +1`)*

- **[Swing at her with whatever you have]** *(requires `skarpt=true` — axe, knife or other)*
  You raise what you have. You drive the arm up and out — it is not a stroke, it is a panic, but there is steel in your hand. She meets the iron in the air. It is no clean hit and no clean miss. The blade tears against feather and then against flesh, and you take her claws across the back of your hand in the same instant. She comes down to the floor a metre from you, angled, and her wings finish one more beat after the head has stopped. She looks at you as the light in her eyes thins out.

  You stand with the back of your hand bleeding and an owl dead on the woodshed floor. You did not want this. You have done it anyway. → scene-104 *(sets `vet_om_ugglan=true`, `ugglan_dod=true`, `wounds_add=skuren_hand`, `sanity -3`)*

- **[Back out — close the door between you]**
  You back out spine first. Your heel finds the threshold. You pull the door to in the same motion — it closes just a little late, you hear the wing strike the inside of the wood — but you are out, and the door is between you. You stand with your back to it and breathe. You have not got the axe. You have not got the saw. You will have to come back in. → scene-102 *(sets `vet_om_ugglan=true`, `misslyckat_skjul=true`, `sanity -2`)*
