---
scene_id: 031
title: "The Circle and the Step"
language: en
act: 2
type: BN
triggers: [scene-029]
exits: [scene-032]
sanity_delta: -10
flags_set: [ritual_korrekt, salt_riktning, klivit_in_i_portalen, hymnen_börjat]
flags_read: [har_tjarsten, ström_på, vet_om_tjarsten_korrekt, förstår_frekvens, sanity]
---

You go down to the cellar. The record above has begun — you heard it begin while you were in the hall — and the hymn's first verse follows you through the floor, a little muffled, a little late, more pulse than song.

The masonry room in the cellar is not large. Three metres by three. Limestone walls with pine-tar pointing. The ceiling in beams. On the floor, once chalked and once painted in, then ground smooth by feet across fifty years, there is a circle.

The circle is still there. Two metres across. It is not drawn as a single continuous line — it is made of small marks, geometrical signs you would rather not learn to read, that resolve into a line only when you step two paces back. You stand three paces back. It is whole.

You have the jar in your hand. Tjärsten. You take the lid off.

Inside the jar is not sand. They are dark crystals, fused, as though the moisture of the peat had once been caught and locked in place. You strew. You think of Astrid's hand — *clockwise, from the north, beat 47.* You think of the rasp in Per-Magnus's voice on the line — *only tjärsten.* You think. Then you strew.

The second verse begins overhead. You do not have much time.

## Choices

- **[Strew clockwise, beat 47]** *(requires `har_tjarsten=true`)*
  You begin in the north. You take the ring clockwise. You count the beats through the second verse, into the third; your footstep lands on beat 47. The circle glows, or appears to — it is a light you are not sure you are seeing with your eyes. → continue *(sets `ritual_korrekt=full`, `salt_riktning=medurs`, `sanity +5`)*

- **[Strew anticlockwise, beat 47]** *(requires `har_tjarsten=true`)*
  You go anticlockwise — the older note, Leopold's earliest. You come in on beat 47. The circle opens on the wrong side. It works anyway. → continue *(sets `ritual_korrekt=partial`, `salt_riktning=motsols`, `sanity -5`)*

- **[Strew clockwise, beat 46]** *(requires `har_tjarsten=true`)*
  You stepped one beat too early. You feel it before you have seen it. → continue *(sets `ritual_korrekt=partial`, `salt_riktning=medurs`, `sanity -8`)*

- **[Stand in the circle without tjärsten]**
  You have no jar. You stand there anyway. The circle does not light. It opens in a thinner way — like a crack, not a door. → continue *(sets `ritual_korrekt=nej`, `salt_riktning=ingen`, `sanity -12`)*

---

*(If `sanity < 40`:)*

Before you step. You stand with your feet on two marks that are not the same mark. You see faces in the limestone wall. They are not drawn — they are made by the mortar, as though whoever pointed the wall in 1873 already knew what the wall would one day see. You count them. Six. One looks like a group photograph from 1981. It passes.

---

You take the step.

## Choices

**[In]** → scene-032 *(sets `klivit_in_i_portalen=true`, `hymnen_börjat=true`, `sanity -1`)*
