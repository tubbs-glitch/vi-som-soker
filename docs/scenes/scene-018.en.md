---
scene_id: 018
title: "The Guest Room"
language: en
act: 2
type: G
triggers: [scene-016]
exits: [scene-016]
sanity_delta: -5
flags_set: [vet_om_signe, läst_namn, bär_halsband]
flags_read: []
---

The guest room is darker than the hall. The window faces east, not north — the blue barely reaches in. You stand in the doorway.

You sense the bed. White coverlet, the only thing that catches any light in the dark. A wardrobe. A dresser.

On the dresser something stands. A box. You see only its square shape against the wall behind.

You turn to the right. The mirror. It is in three panels — the side ones meant to fold in to the centre. They are not folded in. You see yourself three times, indistinct, more shadows of yourself than yourself.

You don't go further in than that.

## In the torch's beam

You bring the cone in. It finds the bed — white coverlet, a single bed made up for someone who will never come.

You move the beam to the wardrobe. The doors have no handles. You have to fit a finger to the seam to open it. You don't.

The cone moves to the dresser. On it stands a lacquered wooden box. Not large — the size of a shoebox. Polished walnut. A brass clasp not locked.

You step forward. You hold the cone on the box while you open it with your other hand. In the box lie seven collars. The beam slides across them. Leather, most worn by years, one almost untouched. Each has a metal tag.

You lift the box down. You sit on the edge of the bed. You hold the beam over the tags, one at a time. *Signe 1979–1986. Good girl.* *Signe II 1986–1993.* *Signe III.* Six of the tags have two dates. Two dates is a life. The seventh has only one date and a question mark. *Signe VI 2018–?* She has not filled it in.

You turn the beam from the box. It falls on the mirror. Three panels. Three versions of yourself. You see something just above your left ear in the centre panel that you do not see in the left panel. You take the beam away from the mirror.

## When the power is on

The guest room is furnished for someone who will never come. A single bed made up with a white coverlet. A wardrobe whose doors have no handles — you have to fit a finger to the seam to open it. A dresser with a three-part mirror — the kind people had in the fifties, the two side panels meant to fold in to the centre. They are not folded in now. You see yourself three times as you cross the room.

The ceiling light with its fabric shade is on. The three panels of the mirror each catch a part of the room and each throw a yellow light back at you.

On the dresser stands a lacquered wooden box. Not large — the size of a shoebox, but in polished walnut, with a brass clasp that is not locked. It is not hidden. It stands where it is meant to stand.

You open it.

In the box lie seven collars. Leather, most worn by years, one almost untouched. Each has a metal tag. You don't read them yet. You only count.

You lift the box from the dresser. You set it on the bed. You sit on the edge of the bed.

The first tag: *Signe 1979–1986. Good girl.* The second: *Signe II 1986–1993.* The third: *Signe III.* And so on. Six of the tags have two dates. Two dates is a life.

The seventh has only one date and a question mark. *Signe VI 2018–?* She has not filled it in.

The leather on the seventh is not worn. It has not been carried much.

## Back in the room

You are back in the guest room. The bed, the wardrobe with no handles, the dresser with its walnut box, the three-part mirror. The box stands where you left it.

## Choices

- **[Take the seventh]**
  You hold it in your hand. The leather is dry, the tag cold. It is a collar that wants to be carried. You put it in your inner pocket. → back *(sets `bär_halsband=sjunde`, `vet_om_signe=true`, `sanity -1`)*

- **[Take the sixth]**
  You look at the date. *Signe V 2011–2017.* Six years. You remember Alice crying on the phone that autumn. You remember not calling her back. → back *(sets `bär_halsband=sjätte`, `vet_om_signe=true`, `sanity -2`)*

- **[Read all the names aloud]**
  You read them as she would have. It takes a time to say them. The room becomes too quiet between the names. When you are finished there is no other sound in the house but the clock in the living room, and you cannot hear that from here. → back *(sets `läst_namn=true`, `vet_om_signe=true`, `sanity -8`)*

- **[Close the box without taking anything]**
  You lower the lid. You set the box back exactly where it stood. You see that the dresser has a rectangle of dust around it the exact right size. It has stood there a long time. → back *(`sanity -1`)*

- **[The three-part mirror]**
  You lean forward. You see yourself from three angles. You see something just above your left ear in the centre mirror that you do not see in the left mirror. It is the light, surely. You fold the left panel in towards the centre even so. You walk out before you have finished the thought. → back *(`sanity -2`)*

- **[Leave the room]**
  → back
