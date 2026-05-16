---
scene_id: 102
title: "The Woodshed Door"
language: en
act: 2
type: G
triggers: [scene-100, scene-101]
exits: [scene-103, scene-100]
sanity_delta: 0
flags_set: [vet_om_ugglan]
flags_read: []
---

The shed stands a little out of true. It has leaned long enough for the grass under the east corner to have given way and become a patch of bare earth. Falun red over the timber, a low door, a wooden peg in place of a lock — a hand-cut pin drawn through an iron eye that holds the door to the post. People without thieves have no locks.

You stand in front of the door. It comes up to your chest. A small swarm of midges circles between you and the boards. You draw the peg out of the eye. It comes free without sound — the wood is glossy from the grip of many hands.

Then you hear it.

Something scrapes against the inside of the roof. Once. Then nothing.

You stand with the peg in your hand. You stand with your fingers against the edge of the door. You hear it again — not a scrape this time, a heavy soft drag of something over a beam. Like a towel pulled across timber. Like a wing.

You listen. It is no rat. Nothing about it moves the way a rat moves.

The blue night light from the north has not entered the shed yet — you have not opened the door — and you find yourself standing with the cold tin against your forehead without remembering when you began.

## Choices

- **[Open the door slowly and look in]**
  You set a finger to the edge. You pull the door toward you a hand's breadth. The dark within is not dark — it is the shadow inside a shed at midsummer, blue and grainy. You take one breath and pull it all the way. → scene-103

- **[Throw the door open — step in decided]**
  You take the edge in your whole hand and pull. The door gives with one long crack. You step in on the same motion. → scene-103

- **[Stand a moment and listen]**
  You stand still. You do not breathe any deeper than usual — you try not to. The sound comes again. A wing. It is a wing. Something large in the roof has just shifted its weight. You stand long enough to know it is not a rat and not a cat. → scene-103 *(sets `vet_om_ugglan=true`)*

- **[Set the peg back and go]**
  You draw the pin back, drop it into the eye, turn round. You take three paces out onto the grass. You know you have to come back. You know that already. → scene-100
