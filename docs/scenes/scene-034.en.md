---
scene_id: 034
title: "The Ingegerd Echo"
language: en
act: 3
type: G
triggers: [scene-033]
exits: [scene-035]
sanity_delta: -10
flags_set: [talat_med_ingegerd]
flags_read: [grå_riktning, vet_om_ingegerd]
---

She stands with her back to you. You think at first she is standing. Then you see it is not standing. It is being turned.

She has a grey cardigan. It is not grey because she is grey. The grey is not in her. She has it on.

She does not turn.

You take a step forward. She says:

*Don't come closer. You don't have to be closer to hear.*

You stand where you stand. You are still taking in that the voice is firm. It does not waver. It is not on the edge of tears. It is like a librarian who has decided something.

*It wants us to stay*, she says. *It is not malice. It is need.*

You do not answer.

*I know what you are thinking. You are thinking that if we understand, then we have lost something. You have not lost. You have learned.*

She breathes in. She breathes out. The breaths do not come from a body that needs them.

*It is lonely*, she says. *That is all it is. You can believe me one thing here. That is all it is.*

*My sister rang the police. My mother wrote letters. I have not heard them in forty-four years but I know they wrote. I am not here because I chose to stay. I am here because I did not find the way back, and no one has found the way back. You asked me who I am. My name is Ingegerd Hagström. I wrote the minutes.*

She waits.

*Alice is over there*, she says. *She will be able to go with you. It will ask for someone. It always asks for someone. It is not malice.*

## Choices

- **[Listen fully]**
  You stay until she stops. She does not stop. She says the same thing in small variations, and you begin to understand that the variations are what she means to say. You stand there until you have said something yourself. You say: *I have been to your stone.* She does not turn her head. But she says: *Thank you.* → scene-035 *(sets `talat_med_ingegerd=true`, `ingegerd_eko+2`, `sanity -10`)*

- **[Turn away]**
  You turn away. You do not walk — there is nothing to walk against — but you stand the other way. She speaks no more. She waits. → scene-035 *(`sanity -2`)*
