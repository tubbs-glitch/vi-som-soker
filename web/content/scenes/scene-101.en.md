---
scene_id: 101
title: "The Tree"
language: en
act: 2
type: G
triggers: [scene-100]
exits: [scene-100, scene-102]
sanity_delta: -3
flags_set: [vet_om_trädet]
flags_read: []
---

The garden is not a garden. It is grass someone stopped cutting four summers ago, a bed where peonies tried and did not continue, a bench in greyed wood that leans at one end. You walk toward the rowans without meaning to. They are the rowans you have heard about all your life.

They stand close — three trunks from the one rootstock. Someone has set stones in a half-circle at the foot. You do not count them. You want to count them and you do not.

You go past them and down the slope toward the corner of the property, where the gravel ends and the bog-ground begins. You see the top of the spruce before you see the tree — it lies aslant out over the corner of the yard, a long dark line through the blue light, and only then do you understand what you are looking at.

The spruce is large. It grew alone at the edge of the wood and was allowed to keep its thick limbs all the way down. It has fallen outward, away from the forest, toward the line pole by the road. Its crown lies more or less where the pole stands — or stood — and the broad trunk runs square across. The pole has not gone over. It leans.

The line that ran across is not severed. It is held down. The tree has pressed the cable onto the iron bracket of the pole — it slid sideways against the metal and stopped there. You see it lying against the iron, one skin against another. That is where the short comes from. That is why the fuse in the shed has tripped. That is why it is dark in the house. That is why the record-player stood still. That is why.

No hum from the meter box. No sound of current. Only spruce and cold ground and midges at your temples.

You stop three metres from the trunk and see how long it is. Ten metres, perhaps more. At the root it has lifted a whole skin of moss with it, like a body under a quilt that someone has moved aside. The pit beneath is black and wet and smells of bog.

You crouch beside the cable where it meets the pole. You do not touch it. The trunk holds it down. Take away enough of the trunk and the cable will slide back into its place. Then the fuse can be thrown.

You think of a saw. You have not seen a saw. There must be a saw.

## Choices

- **[Closer — go round the tree]**
  You walk along the trunk toward the crown. The spruce is a room of branches now, not a tree. You will have to go through it. The saw and the axe are what you want. You turn. → scene-100 *(sets `vet_om_trädet=true`, `sanity -3`)*

- **[Back toward the house]**
  You go back the way you came. The midges follow. → scene-100 *(sets `vet_om_trädet=true`)*

- **[To the woodshed — you know what you need]**
  You turn on your heel and walk straight across the grass toward the shed. → scene-102 *(sets `vet_om_trädet=true`)*
