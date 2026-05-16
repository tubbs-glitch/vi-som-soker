---
scene_id: 038
title: "The Portal Closes"
language: en
act: 3
type: BN
triggers: [scene-037]
exits: [scene-039, scene-040, scene-041, scene-042]
sanity_delta: -5
flags_set: [ending]
flags_read: [besegrat_det_grå, alice_med, leopold_med, valt_offra_sig, stoppat_permanent]
---

The echo.

The echo from the other side thins. It is a ringing point in nothing — you have known this without seeing it — and the ringing point is almost not. You hear the hymn over there, the fourth verse, the forty-seventh bar. You hear the needle skipping.

You have seconds.

You take Alice by the hand. You take Leopold by the elbow. Or you take only one. Or you take neither. Or you stand alone and the other two move toward the light without you.

You have seconds.

You do not have seconds.

You take the step.

---

*(The consequence resolves from `besegrat_det_grå`, `alice_med`, `leopold_med`, `valt_offra_sig`, `stoppat_permanent`. Forced exit to the appropriate ending.)*

## Choices

- **[Ending 1 — all home]** *(triggers on `besegrat_det_grå=true ∧ alice_med=true ∧ leopold_med=true ∧ valt_offra_sig=false ∧ stoppat_permanent=false`)* → scene-039 *(sets `ending=slut_1`)*

- **[Ending 1B — all home, portal closed for good]** *(triggers on `stoppat_permanent=true ∧ alice_med=true ∧ leopold_med=true ∧ valt_offra_sig=false`)* → scene-040 *(sets `ending=slut_1b`)*

- **[Ending 2 — one stayed]** *(triggers on exactly one of `alice_med`/`leopold_med` true, `valt_offra_sig=false`)* → scene-041 *(sets `ending=slut_2`)*

- **[Ending 3 — the warden]** *(triggers on `valt_offra_sig=true`)* → scene-042 *(sets `ending=slut_3`)*

- **[Ending 4 — the silence]** *(triggers on `alice_med=false ∧ leopold_med=false ∧ valt_offra_sig=false`)* → scene-043 *(sets `ending=slut_4`)*
