---
scene_id: 017
title: "Alice's Room"
language: en
act: 2
type: G
triggers: [scene-016]
exits: [scene-016]
sanity_delta: -10
flags_set: [förstår_alice, vet_om_trälårs_kod, har_läst_dagboken]
flags_read: []
---

You open the door. The room faces north and the window stands open — the blue comes in, but only so far.

You see a shape against the wall. The bed, blue-checked, indistinct. You can't make out the pattern, but you know it is blue-checked. You have seen it before.

On the bedside table a silhouette — a spectacle case, perhaps. Something round — a water glass. A book face down.

Against the opposite wall you sense a writing desk. A line where it meets the dark. You don't go to it yet.

Nothing is lit. You think for a moment that the lamp on the desk is on. Then you see that it is not. It is only the blue lying across the glass.

Through the window comes the smell of the bog — cold, mineral, faintly sour.

## In the torch's beam

You bring the cone into the room. It finds the floor first. Brown wood, a worn rug. The beam slides across a pair of slippers standing parallel by the window. They are set against the wall. As though she had only stepped out of them.

You raise the beam. It falls on the bed. Blue-checked quilt, drawn up carelessly over the pillow, by a hand that wasn't thinking about it.

You move the beam over the bed. Above hangs a framed sampler. *Each day is a gift.* It hangs crooked.

You turn the beam to the desk. An open diary. The pen beside it, cap off, the nib dry. She did not close the book. You see the date on the page — the Wednesday of last week.

You lower the beam to the bedside table. Spectacle case. Book face down. Water glass white with limescale at the bottom.

The beam doesn't reach all the way round the room. The wardrobe door is shut. That is all you know of the wardrobe.

## When the power is on

The bedroom is small and faces north. A single bed with a blue-checked quilt that has not been made — only drawn up over the pillow, careless, by a hand that wasn't thinking about it. On the bedside table: a spectacle case, a book face down, a water glass white with limescale at the bottom.

On the floor by the window stand a pair of slippers.

On the small writing desk against the wall lies an open diary. The pen is beside it, cap off, the nib dry. She did not close the book.

The page open shows a date in the corner — the Wednesday of last week. Her hand has thinned over the later pages, you see that without reading. A framed sampler hangs over the bed. *Each day is a gift,* it reads. It was embroidered by a younger Alice. It hangs crooked.

The window is open a hand's breadth. Through it comes the smell of the bog — cold, mineral, faintly sour.

The bedside lamp is on. It must have been on when the power went — she never switched it off. The light falls across the blue-checked quilt and the dry tip of the pen.

You stand at the desk.

You can read the diary in full. You can read only the page open. You can leave it.

## Back in the room

You are back in Alice's room. The bed blue-checked, the diary on the desk, the slippers by the window. The sampler still hangs crooked over the bed.

## Choices

- **[Skim the last page]**
  *The power has been off since Thursday. The record has not played in a week. I shall walk to the woodshed tomorrow. I shall wait until L answers.* In the margin, in a firm hand: *1979-06-23.* You think it is a date. Then you see it has been written without separators — *19790623* — as a combination. → back *(sets `förstår_alice+1`, `vet_om_trälårs_kod=true`, `sanity -3`)*

- **[Read the diary — six years of it]**
  You sit on the edge of the bed. You read for forty minutes. You read about seven dogs, one at a time, one grave a year. You read about waiting for a man who is not coming home. You read about a frequency, about a beat, about a body she does not believe is still there but cannot let go of either. You read about a brother she has not let go of either. She mentions him once. *He was not your father,* she writes. *He was mine. And I knew.* You have a mother named Inger. You have never heard of a brother. You have not asked, either. → back *(sets `förstår_alice+2`, `vet_om_trälårs_kod=true`, `har_läst_dagboken=true`, `sanity -10`, `alice+1`)*

- **[Close the diary without reading]**
  You cap the pen carefully. You close the book on your finger a second, then fully. It is a gesture she would have made herself. → back

- **[The slippers by the window]**
  You look down at them. They stand parallel, set against the wall. As though she had only stepped out of them. You do not touch them. → back *(`sanity -1`)*

- **[Leave the room]**
  → back
