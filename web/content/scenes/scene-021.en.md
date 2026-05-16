---
scene_id: 021
title: "The Attic"
language: en
act: 2
type: SBN
triggers: [scene-016]
exits: [scene-016]
sanity_delta: -15
flags_set: [vinds_tinget_status]
flags_read: [har_ljus, har_vinds_mat, skarpt]
---

The stair to the attic is steep and narrow. The treads are unpainted. You go up without a light — there is nothing here to switch on.

It is bright up there. That is the wrong part.

The attic runs almost the length of the house. Low under the ridge, broader in the middle, sloping down at the gables. Two small gable windows let the blue night light in. Through them you can see the bog from above, an open flat plain stretched out toward the mountain. None of the light helps you.

It smells of old wood and dust and old dog.

In the middle of the attic, between two ceiling beams, something stands.

It does not stand on four legs. It does not stand quite on two. It is dog-sized but the proportions are wrong — the chest too long, the head set too deep between the shoulders, the hindquarters not where hindquarters are. It is not moving. It breathes — you can see it breathe — but not in a dog's rhythm, in some other rhythm, something heavier, a pump perhaps.

It turns its head toward you.

You have not moved. It has turned toward you anyway.

The light is the wrong way. You cannot see the thing clearly. You see outlines that don't stay in the same place from one second to the next. You see that it has eyes.

It does not speak. It does not whine. It waits.

You have one hand on the hatch. You have one foot on the top step. You have not decided.

## Choices

- **[Torch directly on it]** *(requires `har_ljus=true`)*
  You switch on and aim. The beam is white and hard. In the light you can see. It is not a dog. You see the fur where the fur should be, and you see the skin where there should not be skin. You see that it has a collar — old, worn, with a tag you cannot read from here. It closes its eyes against the light. It turns its head away slowly. You stand a second more and then you switch the torch off. You close the hatch as you go. → back *(sets `vinds_tinget_status=sett`, `sanity -15`)*

- **[Feed it with the meat from the fridge]** *(requires `har_vinds_mat=true`)*
  You take the meat out of your pocket; the waxed paper falls to the floor. You set the piece down on the attic floor a metre in front of you. You step back. The thing moves slowly forward. It does not smell at the meat. It looks at you. Then it takes the piece. You back the rest of the way. It does nothing. It follows you with its eyes all the way to the hatch. When you close the hatch you hear it lie down again. → back *(sets `vinds_tinget_status=matat`, `vinds_tinget+1`, `sanity -12`)*

- **[Cut it with the knife]** *(requires `skarpt=true`)*
  You bring out the knife. The thing does not move. You take two steps in. You draw the blade along its side — it goes through something that is not fur and is not air. It does not cry out. It runs off on the wrong number of legs, into the dim behind the old chimney, and you do not see it again. You stand with the knife in your hand. On the blade there is nothing. → back *(sets `vinds_tinget_status=sårat`, `sanity -18`)*

- **[Step back, close the hatch]**
  You take your foot off the top step. You drop one step down. You drop one more. You take hold of the hatch from below — arm stretched — and pull it after you. It closes softly. You stand on the stair and hear nothing move up there. You stand too long. → back *(sets `vinds_tinget_status=undviket`, `sanity -8`)*
