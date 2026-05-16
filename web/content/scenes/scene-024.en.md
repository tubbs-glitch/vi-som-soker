---
scene_id: 024
title: "The Dairy — First Look"
language: en
act: 2
type: SBN
triggers: [scene-100]
exits: [scene-025, scene-026]
sanity_delta: -12
flags_set: [oppnat_mejeri, vet_om_sallskapet, sallskaps_lager_aktivt]
flags_read: [har_mejerinyckel, skarpt, verktyg]
---

Behind the house, past the rowans and the dogs' graves, the ground begins to tilt down toward the bog. The path is worn so thin it is almost not there. Sixty metres out, eighty, and you see the building.

It is smaller than you imagined. Falu-red sheet metal over a timber base, a low pitched roof in the same metal. A door at the centre with a hinge for a barring beam. Two windows, narrow, the blue night light strikes them at an angle and they give nothing back.

You walk up.

The padlock on the door is old. A brass patent lock, once bright.

## Choices

- **[Use the dairy key]** *(requires `har_mejerinyckel=true`)*
  You set the key in. It turns without resistance, as though the lock had not been used in decades but had still been kept oiled — which is, perhaps, worse. The door opens inward. You go in. → continue *(sets `oppnat_mejeri=true`, `vet_om_sallskapet=true`, `sallskaps_lager_aktivt=true`, `sanity -3`)*

- **[Force it with a tool]** *(requires `verktyg=true` or `skarpt=true`)*
  You set the knife or the pry-iron against the lock plate. It takes time. You wrench, twist, wrench again. When it gives it is with a sound you do not like. You stand with splinters on your shoe. You have done something to this building before you have seen the inside of it. → continue *(sets `oppnat_mejeri=true`, `brutit_in_i_mejeri=true`, `vet_om_sallskapet=true`, `sallskaps_lager_aktivt=true`, `sanity -8`)*

- **[Leave the building alone]**
  You turn. You walk back the way you came. You know you will return. You do not know when. → back

---

*(If you went in:)*

Inside, the air is from another decade. It smells of dust and cold metal and something dry and vegetable — peat that has been left lying. The floor is unplaned plank and gives under your foot.

A table stands in the middle. Six chairs around it. On the table a flip pad with three lines of pencilled handwriting — you do not read yet. Beside the pad a coffee cup with a dried ring on the inside. Blue enamel. The initials *A.L.*

On the wall opposite the door hangs a group photograph. Seven adults outside this very building. A dog at one of the women's knee. Two faces have been struck through in pencil.

One of the unstruck is Alice. Younger. She is smiling.

Along the right-hand wall stands a green shelf beside a cabinet in the same green. On the shelf a binder bound in green cloth. In the corner, on the floor, a locked wooden chest.

You stand a while and listen. It is not quiet — the bog outside is steaming — but it is a room that does not expect to hear you.

## Choices

- **[Go to the shelf]** → scene-025

- **[Go to the wooden chest]** → scene-026
