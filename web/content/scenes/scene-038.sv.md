---
scene_id: 038
title: "Portalen stängs"
language: sv
act: 3
type: BN
triggers: [scene-037]
exits: [scene-039, scene-040, scene-041, scene-042, scene-043]
sanity_delta: -5
flags_set: [ending]
flags_read: [besegrat_det_grå, alice_med, leopold_med, valt_offra_sig, stoppat_permanent]
---

Ekot.

Ekot från andra sidan tunnas ut. Det är en klingande punkt i ingenting — du har vetat det utan att ha sett det — och den klingande punkten är snart inte mer. Du hör hymnen där borta, fjärde strof, fyrtiosjunde takten. Du hör nålen som hoppar.

Du har sekunder.

Du tar Alice i handen. Du tar Leopold i armbågen. Eller du tar bara den ena. Eller du tar ingen. Eller du står själv och de andra två rör sig mot ljuset utan dig.

Du har sekunder.

Du har inte sekunder.

Du tar steget.

---

*(Konsekvensen beräknas från `besegrat_det_grå`, `alice_med`, `leopold_med`, `valt_offra_sig`, `stoppat_permanent`. Forced exit till rätt slut.)*

## Val

- **[Slut 1 — alla hem]** *(triggas av `besegrat_det_grå=true ∧ alice_med=true ∧ leopold_med=true ∧ valt_offra_sig=false ∧ stoppat_permanent=false`)* → scene-039 *(sätter `ending=slut_1`)*

- **[Slut 1B — alla hem, portalen stängd för gott]** *(triggas av `stoppat_permanent=true ∧ alice_med=true ∧ leopold_med=true ∧ valt_offra_sig=false`)* → scene-040 *(sätter `ending=slut_1b`)*

- **[Slut 2 — en blev kvar]** *(triggas av exakt en av `alice_med`/`leopold_med` är true, `valt_offra_sig=false`)* → scene-041 *(sätter `ending=slut_2`)*

- **[Slut 3 — väktaren]** *(triggas av `valt_offra_sig=true`)* → scene-042 *(sätter `ending=slut_3`)*

- **[Slut 4 — tystnaden]** *(triggas av `alice_med=false ∧ leopold_med=false ∧ valt_offra_sig=false`)* → scene-043 *(sätter `ending=slut_4`)*
