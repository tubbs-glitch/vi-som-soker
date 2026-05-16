---
scene_id: 041
title: "Ending 2 — One Stayed"
language: en
act: 3
type: E
triggers: [scene-038]
exits: [scene-044]
sanity_delta: 0
flags_set: [ending]
flags_read: [alice_med, leopold_med, har_lapp_till_gunnar]
---

You are standing in the cellar.

You are not alone. One of them is beside you.

The other is not. The other is on the other side of a closed door that is no longer a door.

---

*(If `alice_med=true ∧ leopold_med=false`:)*

Alice stands quiet. She has the cardigan on. She is looking at the circle. The circle is whole — that it is still whole is the worst of it. He could have come out. He did not come out. He let go of your hand the second before the echo thinned, and you have no word for why he let go. You have only that he let go.

Alice says nothing for a long time. Then she says: *He was always there first.*

You go up with her. She leans on you on the stair. She has not leaned on anyone in forty years.

---

*(If `leopold_med=true ∧ alice_med=false`:)*

Leopold stands quiet. He is still holding your arm. He does not let go. He says nothing for several minutes. Then he says: *She chose.* He says it without anger. It is not an expression. It is a fact.

You go up with him. He stops in the hall and looks at the seventh collar hanging where it has never hung. He says: *She is not coming after us.* Then he says nothing more.

---

*Two weeks later. Hällmyren.*

You stand in Alice's kitchen. It smells of old tea bags and resin. Through the window you see Gunnar walking on the road. He stops at the letterbox. He turns toward the house.

You have the note in your pocket. The one from the chest. The one from Olov to his son, sealed for fifty years.

You walk out to the road.

You give Gunnar the note.

He holds it. He does not break the seal at once. He holds it for a long time.

Then he sits on the big stone by the letterbox and breaks the wax with his thumbnail. He reads. It takes him a quarter of an hour. When he is finished he folds the paper slowly and puts it in his breast pocket. He does not say anything. You sit beside him. You both look out toward the bare mountain.

## Choices

**[On]** → scene-044 *(sets `ending=slut_2`)*
