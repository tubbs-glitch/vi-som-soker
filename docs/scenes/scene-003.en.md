---
scene_id: 003
title: "Mum"
language: en
act: 1
type: G
triggers: [scene-002]
exits: [scene-004]
sanity_delta: 0
flags_set: [mamma_vet, relation_mamma]
flags_read: []
---

You know she is awake. She has always been awake at this hour. Since your father died she sleeps in fragments — two hours before midnight, two hours after four. The space between is hers. She drinks tea and watches documentaries she has already seen.

You take out the phone and find her. You stay where you are, jacket still on.

She answers on the second ring.

'Is something wrong?' she says. Not hello. She hears in the hour what the call means.

You stand with one hand on the door handle. The case is at your foot. The keys already in your other hand.

You know you have a choice here, and you know that whatever you say now you will carry with you the whole way north.

## Choices

- **[Tell her plainly. Gunnar sounded frightened. Alice is gone.]**
  You say it straight. You hear her draw a breath and hold it. She says 'I thought as much' and then nothing for a while. In the end she says she'll call you tomorrow. That she'll need to ask you something. That she doesn't know what yet. → scene-004 *(sets `mamma_vet=true`, `relation_mamma+1`)*

- **[Soften it. Tell her it's probably nothing.]**
  You tell her Gunnar is just old and worried. That Alice is where she always is. That you'll drive up, check on her, and be back by the weekend. She says all right. She says it twice. She doesn't sound convinced, only tired, and you know she lets it go because she does not want to sit up with it. → scene-004 *(sets `mamma_vet=false`)*

- **[Hang up without saying anything important. 'Just wanted to see if you were up.']**
  You say you couldn't sleep. She says the same. Neither of you speaks for thirty seconds. She tells you to drink camomile. You say you will. → scene-004 *(sets `mamma_vet=false`, `relation_mamma-1`)*
