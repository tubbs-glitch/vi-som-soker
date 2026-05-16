---
scene_id: 025
title: "Astrid's Binder"
language: en
act: 2
type: G
triggers: [scene-024]
exits: [scene-024]
sanity_delta: -8
flags_set: [har_läst_astrids_parm, vet_om_astrid, vet_om_ingegerd]
flags_read: []
---

You lift the binder from the shelf. It is heavier than it looks. The cloth on the spine has bleached where the sun reached it. On the front, a paper rectangle, glued crooked. *Field notes / A. Lindh.*

You sit at the table. The chair complains.

The hand inside is beautiful. Narrow, slanted, slightly old-fashioned — beautiful in the way that shows the writer was not thinking of her hand at all. She was thinking of the words. The binder is in tabs. *Phonology.* *Geometry.* *Testimony.* *Trial I.* *Trial II.* *Trial III.*

You begin with Phonology. She transcribes a woman's voice. *The tone is not centred on a single pitch. It sits between A and B, closer to A, but unstably — it wanders with the breath. The old woman at the croft near Lillhärdal cannot hold it clean, yet she falls into it when she sings the hymn 'Bereden väg för Herran'. Only the fourth verse, it seems, makes the tone hold.*

You turn to Testimony.

*B.L. did not return. O.S. reports a sound 'from underneath' just before B.L. left the field of sight. We have no body to give to the parish. We have asked O.S. to keep silent.*

You turn to Trial III.

*23 June 1981. Present: A.L., L.L., I.H., O.S., A.L. (Lindblom — Alice), P.M.B. Absent: myself (I stay in the dairy keeping notes; somebody has to write). I.H. steps in at beat 47. The record turns. We hear her breathing in the booth. We hear her say 'It wants us to stay.' We hear her say 'It is not malice.' We hear her say 'It is need.' We hear nothing further.*

The binder ends on that page. The remaining tabs are empty.

## Choices

- **[Skim it and set it back]**
  You close the binder. You set it exactly where it stood. The dust around its place is still visible. → back *(`sanity -2`)*

- **[Read carefully — every tab]**
  You read for forty minutes. You read of the tone, of the geometry, of the three trials. You read her last sentence, dated August 1983, two weeks before she herself did not return from the bog: *This is no longer research. It is a room we cannot lock.* You take the binder with you. → back *(sets `har_läst_astrids_parm=true`, `vet_om_astrid=true`, `vet_om_ingegerd=true`, `astrid_eko+1`, `sanity -8`)*

- **[Stop reading now]**
  You take your hand off the paper. You stand. The binder lies open. → back *(sets `vet_om_astrid=true`, `vet_om_ingegerd=true`, `sanity -4`)*
