---
scene_id: 012
title: "The Living Room"
language: en
act: 2
type: H
triggers: [scene-011, scene-028]
exits: [scene-011, scene-013, scene-014, scene-015]
sanity_delta: 0
flags_set: [alice_pärm_läst, hymnen_låten_på]
flags_read: [ström_på, hymnen_låten_på]
---

The living room is a set of shapes. You can see the silhouette of a sofa, two armchairs, a low table. The clock on the wall you can't see — only hear. The pendulum moves. It is too slow.

The north window lets in a blue dusk that does not reach all the way in. Beyond the glass, the bog. Beyond the bog, spruce wood that takes no part of the light.

You sense something at the table. A square — a folder, perhaps. The knitting needles laid across it, you see only how the shape breaks. You don't approach yet.

At the window stands a shadow taller than the others. The record player. The smoked glass lid catches the blue, faintly. You can't see the needle from here. You only know it is there.

Behind you, the rug in the hall creaks for a second, then doesn't.

There is nobody there.

## In the torch's beam

You bring the cone into the room. It falls first on a chair leg, then up onto the tabletop. The knitting lies as you sensed — a child's jumper, blue, half finished, the needles in a cross.

You move the beam on. The folder. Brown imitation leather, half-laid-out. Alice's hand on the first page, but you don't read. You move the beam.

It finds the record player. The smoked glass lid. The black record on the turntable. You lower the beam to the needle — the needle rests on the outer rim of the record. Not up in its cradle. Not down in the groove. Only there.

You bring the cone back toward yourself. The tiled stove on the short wall, white with blue figures, cold. Two rowan twigs in a glass jar on the shelf.

The clock you don't see. It only ticks, somewhere above the cone.

Behind you, the rug in the hall creaks for a second, then doesn't. You don't put the beam there.

## When the power is on

The living room is longer than you remember. A green plush sofa, two armchairs that do not match, a low table with a half-finished piece of knitting and the needles set down beside it as though someone meant to get up. A tiled stove on the short wall, white with blue figures, cold. Two rowan twigs in a glass jar on the mantel. The pendulum clock on the wall has not been polished. It ticks.

The record player stands at the window. It is the kind of thing built in the eighties — wood, a smoked glass lid, a black record on the turntable. The light is off. The needle rests on the outer rim of the record, not up in its cradle, not down in the groove, only there, as though somebody stopped it for a moment and then thought better of starting. You can read the label on the LP: red, German lettering, a cross. You don't read further. Not yet.

The record player is turning. The orange indicator is lit. The needle is not down. You can hear the platter itself working — a low even tone through the wooden case.

The drawer of the sofa stands open. On the low table, a folder in brown imitation leather, half-laid-out. Across the first page Alice has written *Notes — Hällmyren*, and beneath it *vol. 4*. Her hand is even. You have seen it on Christmas cards your whole life.

You stand by the table without sitting.

Behind you, the rug in the hall creaks for a second, then doesn't. You look round. There is nobody there. Of course there is nobody there.

Through the north window you can see the bog. The sun is not high but it is up — locked in a light that is neither day nor evening. The spruce beyond the bog takes no part of the light and gives none, it only stands.

You take a step closer to the table.

## Back in the room

You are back in the living room. The folder on the table, the record player at the window, the clock on the wall that runs slow. Through the north window the bog stands still.

## Choices

- **[Read the folder — only the first page]**
  Alice has set out a list. *Tar-stone — peat-79 — the jar in the kitchen.* *LP starts at 22:47.* *Circle clockwise. Beat 47.* You don't read the other lines. You have understood what this is even so. → back *(sets `alice_pärm_läst=true`, `förstår_frekvens+1`, `sanity -2`)*

- **[Lower the needle to the outer groove]** *(if `ström_på=true` and `hymnen_låten_på=false`)*
  You go to the record player. The platter turns at its even pace. You take the needle by the arm and lower it slowly, the way one lowers a needle onto a record, no more than that. There is a click against the vinyl, then another, and then the hymn begins. It is not music the way you remember music. It is something else. You stand a few seconds. That is enough. The rest of the night will be played to this sound. → back *(sets `hymnen_låten_på=true`, `sanity -3`)*

- **[Lift the needle off the record]** *(if `hymnen_låten_på=true`)*
  You lift the needle and set it to the side. The arm clicks. The hymn stops mid-breath, a breath it was never drawing. At first you think it is sensible not to let it run unattended. Then you think she started it just now for a reason. You lower the needle back into the same groove, as close to the place as you can remember. → back

- **[The knitting]**
  It is a child's jumper, blue, half finished. The stitches are even. It is a child you do not know. → back *(`sanity -1`)*

- **[The hall]**
  You walk out backwards, because you have not yet turned your back on the record player. → scene-011

- **[The kitchen]**
  You go through the doorway into the kitchen. → scene-013

- **[Leopold's study]**
  The door stands ajar. → scene-014

- **[Up the stairs]**
  → scene-015
