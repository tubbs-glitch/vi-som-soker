---
scene_id: 036
title: "Finding Alice"
language: en
act: 3
type: G
triggers: [scene-035]
exits: [scene-037]
sanity_delta: -10
flags_set: [alice_med, alice_övertygad_med]
flags_read: [förstår_alice, vet_om_bertil, besokt_myrgraven, vet_om_sallskapet, talat_med_ingegerd, talat_om_bertil_med_leopold, brutit_in_i_mejeri, vinds_tinget_status]
---

She stands with her back to it.

You see her before you see it. She is small. She was never large — you remember she came up to your chest — but she is small in another way here. She is wearing a cardigan you remember from an old photograph. She has shoes on. It is the only thing in the grey that has shoes.

She turns her head. She smiles.

*You came*, she says. *I knew you would come. I was waiting.*

Behind her is it. You are not to look at it yet. You are to look at her.

*She knows you*, says a voice in your head that is not yours. *But she is not certain.*

You have Leopold beside you. He is looking at Alice. He is not looking at the thing behind her. Alice is looking at Leopold. She says nothing for a moment. Then she says:

*You are tired, my love. Sit down.*

He does not sit.

She turns to you.

*I am staying*, she says. *You take him home. I am staying until I understand.*

## Choices

- **['There is nothing to understand. You are coming home.']**
  You say it plainly. She looks at you as though looking at a child. → continue *(sets `alice+0`)*

- **['Mamma knows I'm here. She is waiting.']** *(requires `mamma_vet=true`)*
  She catches on the words. *Inger.* She says your mother's name as though she has not said it in years. → continue *(sets `alice+1`, `alice_övertygad_med=mamma`)*

- **['Leopold went after you. He went for seven years. He cannot go back without you.']**
  She looks at Leopold. She looks at you. *He did not go for seven years. He went for an afternoon, and I did not pick up the phone.* → continue *(sets `alice+2`, `alice_övertygad_med=leopold`, `leopold+1`)*

- **['I have been in the dairy. I have read Astrid.']** *(requires `vet_om_sallskapet=true`)*
  She holds. *You should not have. She was not yours. She was mine.* → continue *(sets `alice-1`, `alice_övertygad_med=sallskap`)*

- **['I have been to Bertil's stone.']** *(requires `besokt_myrgraven=true` or `talat_om_bertil_med_leopold=true`)*
  She breathes in. She breathes in again. *Then you know*, she says. *Then you also know that I cannot come home and be who I was, because I was never who I was.* She says it without crying. → continue *(sets `alice+2`, `alice_övertygad_med=bertil`, `bertil_eko+1`)*

- **['Ingegerd asked me to come.']** *(requires `talat_med_ingegerd=true`)*
  Alice turns her head fully. She stares past you. She says: *She still speaks.* Then she says: *Then I must.* → continue *(sets `alice+3`, `alice_övertygad_med=ingegerd`, `ingegerd_eko+1`)*

- **['Signe is waiting.']** *(requires `vinds_tinget_status=matat`)*
  She breathes in through the nose, a long intake. She says: *Be kind to her.* She takes one step from it. → continue *(sets `alice+2`, `alice_övertygad_med=signe`, `vinds_tinget+1`)*

- **['You broke in to the dairy.']** *(triggered by `brutit_in_i_mejeri=true`)*
  She says it. You say nothing. She smiles. *Then you have already decided. That's good.* → continue *(sets `alice-2`)*

---

She looks at you for a long time.

Then she says: *Good. I'll come.*

She says it without being sure it is true. She says it because she knows it is what you need to hear.

## Choices

**[Turn toward the Grey]** → scene-037 *(sets `alice_med=true`, `sanity -10`)*
