---
scene_id: 023
title: "The Cellar Store"
language: en
act: 2
type: G
triggers: [scene-022]
exits: [scene-022]
sanity_delta: -2
flags_set: [har_tjarsten]
flags_read: []
---

You stand on the last tread. You have not brought out a light yet. You stand and listen.

It smells of clay and something sour. Pine tar far off. Something older. You breathe in once more.

You sense the shape of a spade in the corner, leaning aslant against the wall. Beyond it something square — a shelf, a chest. You can't see where the room ends.

You set your hand to the wall. Clay plaster, cold, unplaned.

There is no point standing here without a light. You bring one out.

## In the torch's beam

The first thing the beam finds is an old peat-spade in the corner — the blade dry and cracked, the shaft set against the wall as though someone put it down and forgot it. Beside it three paraffin tins stand in a row. Behind them an unplaned wooden shelf.

You bring the beam onto the shelf. It takes a moment to understand what you are seeing.

Boxes. Stacked tight, labelled in Alice's pencilled hand. *Pump grease.* *Dog biscuits.* *Lentils and beans.* *Batteries* — that line stops your light. You step closer. You lift the lid.

Inside lie eight batteries of the kind that fit an eighties cassette player. You take two.

Further along the shelf stands a glass jar. It is not labelled. The contents are dark — like compacted sand, or like something once wet and now dried under pressure. You twist the lid. It smells of tar. It is not sand. It is what she has called tjärsten.

The jar is half full.

You turn the beam. It finds the wall behind the shelf. A calendar from 1981. It has not been turned in forty-five years. The June page is a black and white picture of a spruce wood. In the margin someone has written dates. The 23rd of June is circled twice.

Beyond the beam: only clay-dark.

## When the power is on

There is no lamp down here. There never has been one. The cellar is what the cellar has always been — beyond the wires.

The first thing the beam finds is an old peat-spade in the corner — the blade dry and cracked, the shaft set against the wall as though someone put it down and forgot it. Beside it three paraffin tins stand in a row. Behind them an unplaned wooden shelf.

You bring the beam onto the shelf. It takes a moment to understand what you are seeing.

Boxes. Stacked tight, labelled in Alice's pencilled hand. *Pump grease.* *Dog biscuits.* *Lentils and beans.* *Batteries* — that line stops your light. You step closer. You lift the lid.

Inside lie eight batteries of the kind that fit an eighties cassette player. You take two.

Further along the shelf stands a glass jar. It is not labelled. The contents are dark — like compacted sand, or like something once wet and now dried under pressure. You twist the lid. It smells of tar. It is not sand. It is what she has called tjärsten.

The jar is half full.

On the wall behind the shelf hangs a calendar from 1981. It has not been turned in forty-five years. The June page is a black and white picture of a spruce wood. In the margin someone has written dates. The 23rd of June is circled twice.

## Back in the room

You are back in the cellar store. The spade in the corner, the shelf of boxes, the glass jar of tjärsten, the calendar from 1981 on the wall.

## Choices

- **[Take batteries and tjärsten]**
  You put the two batteries in one pocket, the jar in the other. The jar is heavier than it looks. → back *(sets `har_tjarsten=true`, `sanity -1`)*

- **[Take only batteries]**
  You leave the jar where it stands. It is not yours. You close the lid before you go. → back

- **[Look at the calendar]**
  You move closer. On the 23rd of June 1981 someone has written *IH goes in*, in the same firm hand as the margin in Alice's bedroom. On the 24th of June: *She did not come back.* You stand a while. → back *(`sanity -3`)*

- **[Back up to the hall]**
  You climb the twelve steps back up, close the cellar door behind you. → scene-011
