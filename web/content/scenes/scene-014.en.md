---
scene_id: 014
title: "Leopold's Study"
language: en
act: 2
type: G
triggers: [scene-011, scene-012]
exits: [scene-011]
sanity_delta: -10
flags_set: [har_mejerinyckel, har_lab_anteckningar, vet_om_sallskapet_rykte, sett_gruppfoto]
flags_read: []
---

You stand in the doorway. The room is darker than the hall — its single window faces north and the blue does not reach round the edge of the desk.

You haven't been in this room since you were nine. Then there was a man at the desk who turned when you knocked. You can't see the chair now. Only that it is there.

The dust shows in the air. Not heavy. It smells of paper and something older.

You put your hand on the edge of the desk without seeing it. The oak is dry under your finger. You move your hand — a stack of paper, an envelope perhaps, something bound in leather. You don't read. You can't read.

On the wall above the desk, a silhouette — a frame, a picture behind glass. You remember it hanging there.

The keys on the rack do not chime. There is no draught. But you know they are hanging there.

## In the torch's beam

The cone finds the desk first. The oak, the dust even on everything. You draw a finger through it and wipe it on your trouser leg without looking down.

You move the beam across the desk. It finds a stack of paper in a cardboard folder. The top sheet handwritten — his hand, you recognise it. *Amplitude / frequency-band / thickness of membrane.* A calculation you cannot follow.

Beside the folder: a book with a blue spine. *Kallöv-Bergman, Acoustics and Matter.* The marker is a cut-out obituary. You don't read the name.

You raise the beam to the wall. It finds the photograph. Seven adults outside a low building in falu-red. The beam slides over the faces one at a time. Alice. Leopold. Five others. Two with pencil crosses through the eyes.

You lower the beam to the key-rack. Most of the keys are labelled — the beam moves from hook to hook. *Garage. Postbox. Cellar door.* One heavy brass key with no ring, marked only *M*. It hangs alone.

You bring the beam to the window. Through the glass, eighty metres out, you sense falu-red sheet metal and a black door. You hadn't noticed the building before. The beam doesn't reach it. But you know it is there.

Behind you the room is still dark. You don't go to the bookcase yet.

## When the power is on

You haven't been in this room since you were nine. Then there was a man at the desk who turned when you knocked. Now there is nobody.

The room is smaller than you remember. An oak desk against the window. A bookcase along one wall. An office chair with a sheepskin. A green desk lamp you switch on without thinking.

The desk lamp comes on when you press it. The filament glows yellow over the edge of the desk, and the dust shows harder in the light than it did in the blue dusk.

Dust lies even on everything. Not heavy — the room was cleaned once, two years ago perhaps, then not again. You draw a finger along the edge of the desk and wipe it on your trouser leg without looking down.

On the desk is a stack of paper in a cardboard folder. You read the top sheet. It is handwritten, his hand, you recognise it from a postcard sent to you as a teenager. It says things like *amplitude / frequency-band / thickness of membrane* and a calculation you cannot follow. Beside it: a book with a blue spine, *Kallöv-Bergman, Acoustics and Matter*, sixties. The marker is a cut-out obituary from a regional paper.

On the wall above the desk hangs a photograph. Seven adults outside a low building in falu-red paint. Summer, sun in one man's face so he squints. A dog at the feet of the eldest woman. You recognise Alice — she is thirty-two there, her hair dark. Beside her, a man who must be Leopold. There are five others. Two of the faces have been crossed out in pencil, thin firm strokes across the eyes.

On a key-rack hang keys. Most are labelled: *garage, postbox, cellar door.* One is a heavy brass key with no ring, marked only *M*. It hangs alone on its hook.

Through the window you can see the dairy. You hadn't noticed the building before. Falu-red sheet metal, a black door, eighty metres out toward the edge of the bog.

## Back in the room

You are back in Leopold's study. The desk with its papers, the photograph with seven faces, the brass key on the rack. Through the window, the dairy stands at the bog's edge.

## Choices

- **[Skim the notes]**
  You leaf three pages in. It is about vibration, a membrane, something opening. You don't read all of it. You read enough. → back *(sets `har_lab_anteckningar=true`, `förstår_frekvens+1`, `sanity -3`)*

- **[Read carefully]**
  You sit down on the sheepskin and read for twenty minutes. It is about thinning a membrane. About how thin it can become before it goes. About what is on the other side. He writes plainly about things that should not be written about at all. You stand up too quickly when you have finished. The room takes a second to be where the room should be. → back *(sets `har_lab_anteckningar=true`, `förstår_frekvens+2`, `sanity -10`)*

- **[Take the brass key marked M]**
  You lift it from the hook. It is heavier than the others. You put it in your inner pocket. You look through the window again at the building. → back *(sets `har_mejerinyckel=true`, `sanity -1`)*

- **[Look at the group photograph]**
  You move closer to the frame. Seven faces. Two crossed out — an older woman in large spectacles, a younger man with a beard. You see if you can lift the frame off the nail. You can. *Hällmyren, Midsummer's Eve 1981.* No names. You put it back on the nail as level as you can. → back *(sets `sett_gruppfoto=true`, `vet_om_sallskapet_rykte=true`, `sanity -2`)*

- **[Leave the room without touching anything]**
  → back
