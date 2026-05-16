---
scene_id: 024
title: "Mejeribyggnaden — första intrycket"
language: sv
act: 2
type: SBN
triggers: [scene-100]
exits: [scene-025, scene-026]
sanity_delta: -12
flags_set: [oppnat_mejeri, vet_om_sallskapet, sallskaps_lager_aktivt]
flags_read: [har_mejerinyckel, skarpt, verktyg]
---

Bakom huset, förbi rönnarna och hundgravarna, börjar marken luta ner mot myren. Stigen är trampad så tunt att den nästan inte är där. Sextio meter ut, åttio, så ser du byggnaden.

Den är mindre än du föreställt dig. Plåt målad i falurött över timmerstommen, ett lågsluttande sadeltak av plåt över. En dörr i mitten med ett gångjärn för en hängbom. Två fönster, smala, det blå nattljuset träffar dem snett och de ger inget tillbaka.

Du går fram.

Låset på dörren är gammalt. En patentlås, mässing, en gång blank.

## Val

- **[Använd mejerinyckeln]** *(kräver `har_mejerinyckel=true`)*
  Du sätter nyckeln i. Den vrider sig utan motstånd, som om låset inte använts på decennier men ändå hållits oljat — vilket kanske är värre. Dörren öppnas inåt. Du går in. → vidare *(sätter `oppnat_mejeri=true`, `vet_om_sallskapet=true`, `sallskaps_lager_aktivt=true`, `sanity -3`)*

- **[Bryt upp med verktyg]** *(kräver `verktyg=true` eller `skarpt=true`)*
  Du sätter kniven eller bändjärnet mot låsets sköld. Det tar tid. Du sliter, vrider, sliter igen. När det ger är det med ett ljud du inte tycker om. Du står med splitter på skon. Du har gjort något i den här byggnaden innan du sett insidan av den. → vidare *(sätter `oppnat_mejeri=true`, `brutit_in_i_mejeri=true`, `vet_om_sallskapet=true`, `sallskaps_lager_aktivt=true`, `sanity -8`)*

- **[Lämna byggnaden i fred]**
  Du vänder. Du går tillbaka samma stig. Du vet att du kommer tillbaka. Du vet inte när. → tillbaka

---

*(Om du gick in:)*

Inne är luften kvar från ett annat decennium. Det luktar damm och kall plåt och något torrt och vegetabiliskt — torv som blivit liggande. Golvet är av oslipade tiljor som låter när du flyttar foten.

I mitten står ett bord. Sex stolar runt det. På bordet ett blädderblock med tre rader handskrift i blyerts — du läser inte än. Bredvid blädderblocket en kaffekopp med intorkad ring på insidan. Blå emalj. Initialerna *A.L.*

På väggen mitt emot dörren hänger ett gruppfoto. Sju vuxna utanför just den här byggnaden. En hund vid en av kvinnornas knä. Två ansikten är blyertsöverstrukna.

Ett av de okorsade är Alice. Yngre. Hon ler.

På högra långväggen står en hylla i grönt jämte ett skåp i lika grön ton. På hyllan en pärm i grönt klotband. I hörnet, på golvet, en låst trälår.

Du står ett tag och lyssnar. Det är inte tyst — myren utanför ångar — men det är ett rum som inte väntar att höra dig.

## Val

- **[Gå till hyllan]** → scene-025

- **[Gå till trälåren]** → scene-026
