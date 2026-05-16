---
scene_id: 035
title: "Finding Leopold"
language: en
act: 3
type: G
triggers: [scene-033, scene-034]
exits: [scene-036]
sanity_delta: -8
flags_set: [leopold_med, talat_om_bertil_med_leopold]
flags_read: [vet_om_bertil]
---

He is sitting.

That is the first thing you see. He is sitting on nothing. His knees a little drawn up, his hands laid across his knees palms down — as though he were warming them at a fire you cannot see. He is younger than you remember. He is also older. He has only seven years out of seventy, and the seven are not what you imagined seven years do to a face.

He looks up.

He does not say your name.

He says nothing for a moment. Then he says: *Is it you.* It is not a question. It is something he is giving himself permission to say.

Beside him — you do not see it at first — sits a man. He is turned away. He is dressed in what would have been a tweed jacket in 1979. He does not look at Leopold. He does not look at you. He breathes. Leopold does not seem to see him.

Leopold says:

*I think I have forgotten too many of the words. I cannot hear them in myself any more. I know I had them once.*

He puts out a hand. He has not stood up. He is asking you to come to him, not the other way.

## Choices

- **[Hold him]**
  You go to him. You crouch. You put your arms around him. He is not cold and not warm. He lays his head against your shoulder. He says nothing. He says nothing for a long time. → scene-036 *(sets `leopold_med=true`, `leopold+2`, `sanity -5`)*

- **[Reach down and pull him up]**
  You take his hand. He stands slowly. He stands the way he was sitting — as though the body were not sure which way is up and is taking the lead from your grip. → scene-036 *(sets `leopold_med=true`, `sanity -3`)*

- **[Speak first. Ask him about Bertil]** *(requires `vet_om_bertil=true`)*
  You crouch in front of him. You say: *I know about Bertil.* The man beside him — the one you have only now seen — turns his head a little. Not toward you. Only a little. Leopold takes a breath. He says: *I carried him for three days before we decided not to tell anyone. I carried him for forty-six years after.* He looks up at you. *Thank you.* → scene-036 *(sets `leopold_med=true`, `talat_om_bertil_med_leopold=true`, `leopold+3`, `bertil_eko+1`, `sanity -8`)*

- **[Say nothing. Just stand.]**
  You stand. He looks up at you. He looks down. After a while he rises by himself. He does not come all the way up. You take his elbow. → scene-036 *(sets `leopold_med=true`, `sanity -4`)*
