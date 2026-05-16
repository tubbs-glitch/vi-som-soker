---
scene_id: 104
title: "The Tools"
language: en
act: 2
type: G
triggers: [scene-103]
exits: [scene-105, scene-100]
sanity_delta: 0
flags_set: [har_yxa, har_sag, har_ficklampa, ström_på_försök]
flags_read: [ugglan_dod, tradet_sagat]
---

Inside the shed the air is different. Dusty, smelling of tar, with the last trace of bird in it.

You stand with the door open behind you so the blue night light reaches in. You see better than you thought you would.

On the wall opposite they hang. An *axe* with a worn helve and a head whose edge has been used. A *bow-saw* with a stainless frame and an orange grip. A *torch* of the Mag-Lite kind, blue enamel scratched along the barrel. Old *leather gloves*, a spade. On the floor a stack of cordwood, dark with age.

At the back of the shed: a *fuse box* — a grey plate over a wooden surround. You don't open it yet, but you remember what is inside: a main breaker at the top, a long lever that takes the whole house when it trips, and six smaller fuses below. The main lever is at OFF. It did not fall by itself. It tripped because the cable outside is lying against the iron bracket of the pole — a short to earth. You can push the lever up as many times as you like. It will fall straight back as long as the cable touches the iron. The tree has to come off first.

You stand at the tool wall. You have time now. Two metres away, if the owl is dead, the owl lies on her back with her wings half open. If she flew out, the shed is only a shed. You know which you have.

What you carry with you is what you will have at the trunk.

## Choices

- **[Take the axe]**
  You lift it down. The helve sits as it should — dry, smooth, a touch of resin in the grip. Heavier than you remembered an axe being. → back *(sets `har_yxa=true`)*

- **[Take the saw]**
  The bow-saw is light. You flex the blade and hear the short singing tone metal gives off when it hangs in a frame. → back *(sets `har_sag=true`)*

- **[Take the torch]**
  You take it down. You click — the beam is yellow and weak, but it lights. You click it off. → back *(sets `har_ficklampa=true`)*

- **[Throw the fuse lever anyway]**
  You go to the back of the shed. You open the plate. You take the main lever. You push it up — it gives with a click, you hear a spark somewhere in a relay — and then it falls back down to OFF on its own. You try again. The same. The short is still there. As long as the spruce presses the cable against the iron on the pole, the breaker will not hold. You knew already. → back *(sets `ström_på_försök=true`)*

---

**[Out to the tree]** → scene-105
