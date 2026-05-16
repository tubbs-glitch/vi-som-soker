---
scene_id: 013
title: "The Kitchen"
language: en
act: 2
type: G
triggers: [scene-011, scene-012]
exits: [scene-011]
sanity_delta: -3
flags_set: [har_tjarsten, har_ljus, har_vinds_mat]
flags_read: []
---

The smell hits first. You breathe through your mouth for three seconds.

The kitchen is darker than the hall. The window above the sink lets in the blue, but the blue only reaches the edge of the stove. Beyond that, shapes. You sense the heavy cast-iron shape of the wood stove against the short wall. A table. Something round on the windowsill — a radio, perhaps.

You put your hand on the counter. It is cold and square. You stand there a second.

The fridge has been left a hand's breadth open. You see the gap as a darker line in the dark around it.

Something hums faintly. Not electricity. Gnats. Only two, but they are there. You don't kill them.

By the stove you sense an almanac, straight strokes in the dark, you can't count them. On the table an envelope, you see only the square of it.

## In the torch's beam

The cone finds the sink first. Then the tap. Then on to the stove — cast iron, blacked, a pile of split birch beside it.

You lift the beam. It falls on the almanac at the stove. You read. The last full week has crosses — seven in a row, around Midsummer. The week before: *wait, wait, wait.* Three times.

You raise the beam higher. It finds the high shelf above the stove. A glass jar. The label *peat-79*, pencil almost faded into the paper. The contents catch the light where the beam meets them — dark, grainy.

You lower the cone to the table. An envelope. Thick paper, the flap sealed. The pensions office. Dust has begun to settle on it.

The beam moves on. The top cupboard, if you open it — you open it — a serviceable torch, the rubber-cased kind, batteries strong. You take it or you leave it.

You turn the cone to the fridge. You don't open it. You can see in even so through the gap: on the top shelf, far back, a piece of meat in waxed paper. It is not the worst of what is there.

Behind the beam: dark. The gnats move into the light and out again.

## When the power is on

In the kitchen the smell is worse. The fridge has stopped at some point during the storm-week and now produces its own condition. You breathe through your mouth for three seconds and then you stop thinking about it.

The kitchen is old and well kept. A wood stove against the short wall — cast iron, blacked, a pile of split birch beside it. A sink under the window. A table with two wooden chairs and a third stool that does not match the others. A radio on the windowsill, unplugged.

By the stove, an almanac on the wall. The last full week has crosses on it — seven in a row, around Midsummer, her usual marker pen, the lines straight and not thin. The week after is blank. The week before Midsummer has a smaller note in different letters: *wait, wait, wait.* Three times.

On the kitchen table is a thick envelope. The flap is sealed. It is addressed to her, from the pensions office. It has lain there for a week or more. Dust has begun to settle on it.

On the high shelf above the stove there is a glass jar. The label is handwritten, *peat-79*, in pencil so faded it has almost gone into the paper. The jar holds something that doesn't look like peat — a dark grainy material, glassy where it is dry.

In the top cupboard, if you look: a serviceable torch, the rubber-cased kind, batteries strong.

The fridge door has been left a hand's breadth open. You don't open it the rest of the way. You can see in even so — on the top shelf, far back, a piece of meat in waxed paper. It is not the worst of what is there.

The fridge starts up while you stand there. The compressor clicks, shudders, finds its tone. It works against a week of silence. The smell does not improve for the cold coming back.

There are gnats in the room. Only two, but they are there. You don't kill them.

## Back in the room

You are back in the kitchen. The almanac with its seven crosses, the jar on the high shelf, the envelope from the pensions office. The fridge still stands a hand's breadth open.

## Choices

- **[Take the jar — that is the tar-stone]**
  You step on a chair and bring the jar down. It is heavier than it looks. You put it into your bag without unscrewing the lid. → back *(sets `har_tjarsten=true`, `sanity -1`)*

- **[Take the torch]**
  You put it in your jacket pocket. You haven't used one like this in years, but you remember the weight. → back *(sets `har_ljus=true`)*

- **[The piece of meat]**
  You take the meat with its waxed paper still around it. You don't know why. It is in your pocket. You wash your hands afterwards. The water runs yellowish for a second before it clears. → back *(sets `har_vinds_mat=true`, `sanity -2`)*

- **[The envelope on the table]**
  You don't pick it up. You read only the name, a state office, an amount that should not be read by anyone outside the household. You turn away. → back

- **[The almanac]**
  You count the crosses again. Seven. It is not the right number for anything you know — a working week is five, a rule has six days, a weekend is two. Seven is nothing. → back *(`sanity -1`)*

- **[Close the fridge properly and leave]**
  → back
