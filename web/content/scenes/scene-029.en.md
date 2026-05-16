---
scene_id: 029
title: "The Choice on the Road"
language: en
act: 2
type: SBN
triggers: [scene-026, scene-028]
exits: [scene-031]
sanity_delta: 0
flags_set: [vagval_intention]
flags_read: [vet_om_bertil, vet_om_sallskapet]
---

It is some time past one in the morning. It is bright. It is not morning and it is not night. There is a blue tone in the windows that lies over everything like a thin coverlet — the table in the dairy, or the writing-desk in Alice's bedroom, or the floor in the hall where you are standing with one hand against the wall and one shoe off without remembering taking it off. You stand where you stand.

It goes quiet in your head.

You have known some things for three hours and other things for fifteen minutes. You know Alice is on the other side. You know she is not alone there. You know Leopold went after her seven years ago and did not come back. You know there was a group of people working at this for almost fifteen years before your mother married and you were born. You know one of them was Astrid Lindh, and one was Ingegerd Hagström, and one was Bertil Lindblom, who was Leopold's older brother, and who was your uncle, and of whom no one ever said one word to you.

You know it is not your fault.

You also know no one has said so.

You think you have two thoughts. You have them at the same time and they do not pull together.

The first is: I am going down there and bringing her home. I do not care what it costs.

The second is: somebody ought to close it. It has stood open for fifty-two years. It has taken six people.

The third is not a thought. It is that you do not know.

## Choices

- **[I am bringing her home]**
  You do not say it aloud. You think it and the body holds it. You take one breath in through the nose. You have decided what you are here for. → scene-031 *(sets `vagval_intention=rädda`, `alice+1`)*

- **[I am closing it]**
  You stand with your hand still on the wall. It is not a choice against Alice. It is a choice for what should remain when Alice is gone — and one day Alice will be gone, regardless. You think of Bertil. You think of Astrid. You think of a woman you never saw, taking a step into a circle on the 23rd of June 1981. → scene-031 *(sets `vagval_intention=stoppa`, `det_grå-1`)*

- **[I will decide on the other side]**
  You do not finish the thought. You do not think you have to. You will know when you stand there. You take off the other shoe as well, set it parallel, and stand in your socks on the cold planks. → scene-031 *(sets `vagval_intention=obeslutsam`)*
