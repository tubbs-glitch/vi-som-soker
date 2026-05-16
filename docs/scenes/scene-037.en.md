---
scene_id: 037
title: "The Grey Speaks"
language: en
act: 3
type: G
triggers: [scene-036]
exits: [scene-038]
sanity_delta: -10
flags_set: [valt_offra_sig, besegrat_det_grå, förstod_det_grå, stoppat_permanent]
flags_read: [skarpt, frekvens, sanity, vagval_intention, talat_med_ingegerd, hymnen_låten_på_kassett]
---

You turn.

It is not a thing to be seen. It is a thing not to see into. The grey is still grey. But where the grey is thickest it is not thicker — it is *deeper*, as though one can see further in at that one place and not at all anywhere else.

It speaks.

It speaks in your voice.

*You came here*, it says. *You knew the way. That is an offer in itself.*

You do not answer.

*I am not what you were taught I am*, it says. *I am not malice. I am not hunger. I am not will. I am a room that has no one in it, and it is a room that does not like to be empty.*

*You have brought two. I do not ask for both. I ask for one. You. Anyone. It is a gentle offer.*

Alice stands behind you. Leopold stands beside you. You have your hands.

## Choices

- **[Fight — draw the knife]** *(requires `skarpt=true`)*
  You take the knife. The inherited one. You go toward the deeper grey. You put the blade into something that is not skin and is not air. It is like cutting into a cold wind. It cuts back. It does not hurt — it takes. You step in. You cut again. The grey thins where you stand. It is still saying, in your voice, *you came here*. It says it slower and slower. Then it stops saying it. → scene-038 *(sets `besegrat_det_grå=true`, `sanity -15`)*

- **[Hymn — switch on the cassette player]** *(requires `frekvens` ×2)*
  You take the player from your pocket. You set the batteries — the ones from the cellar. You press play. It is the fourth verse of the hymn — the one verse that holds the tone, as Astrid wrote in her binder. The frequency that opens the membrane. The frequency that, played the other way, closes it. You hold the player up. The grey stops around you. It does not thin. It *stills*. As though sleep had been given it. → scene-038 *(sets `besegrat_det_grå=true`, `sanity -6`)*

- **[Negotiate — accept]**
  You say: *I'll stay.* You say it without looking at Alice. She hears it. She says nothing. The grey says, in your voice: *Thank you.* It is the first thing it has said that does not sound like an offer. → scene-038 *(sets `valt_offra_sig=true`, `sanity -5`)*

- **[High sanity — speak to it of its loneliness]** *(requires `sanity ≥ 70`)*
  You say: *You are alone. That is all this is.* You do not say it as accusation. You say it as description. The grey stills. It says nothing. You stand until you say one more thing. You say: *I cannot stay. But you are not wrong for being here.* → continue *(sets `förstod_det_grå=true`, `besegrat_det_grå=true`, `sanity -3`)*

- **[High sanity + stop — offer Ingegerd]** *(requires `sanity ≥ 70`, `vagval_intention=stoppa`, `talat_med_ingegerd=true`)*
  You say: *Ingegerd stays. She wants to stay.* You do not say it with anger. You say it because it is true and you have heard her say it in her own way. *She stays and we go. We bring no one else. You keep those you have. And I close it.* The grey says nothing for a long time. Then, still in your voice but lower: *Agreed.* A woman in a grey cardigan, her back turned, takes one step deeper. She does not raise her hand. → continue *(sets `förstod_det_grå=true`, `besegrat_det_grå=true`, `stoppat_permanent=true`, `ingegerd_eko+1`, `sanity +2`)*

- **[Negotiate — refuse without a plan]**
  You say: *No.* You say nothing else. You have nothing else. The grey steps closer. It says, in your voice: *All right.* It steps closer. You do not have time. → scene-038 *(`sanity -20`)*
