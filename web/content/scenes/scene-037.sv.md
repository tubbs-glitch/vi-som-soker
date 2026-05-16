---
scene_id: 037
title: "Det grå talar"
language: sv
act: 3
type: G
triggers: [scene-036]
exits: [scene-038]
sanity_delta: -10
flags_set: [valt_offra_sig, besegrat_det_grå, förstod_det_grå, stoppat_permanent]
flags_read: [skarpt, frekvens, sanity, vagval_intention, talat_med_ingegerd, hymnen_låten_på_kassett]
---

Du vänder dig om.

Det är inte att se. Det är att inte se in i. Det grå är fortfarande grått. Men där det grå är som tjockast är det inte tjockare — det är *djupare*, som om man kan se längre in på ett ställe och inte alls på alla andra.

Det talar.

Det talar med din röst.

*Du kom hit*, säger det. *Du visste vägen. Det är ett erbjudande i sig.*

Du svarar inte.

*Jag är inte vad du fick lära dig att jag är*, säger det. *Jag är inte ondska. Jag är inte hunger. Jag är inte vilja. Jag är ett rum som inte har någon i sig och det är ett rum som inte gillar att vara tomt.*

*Du har två med dig. Jag ber inte om båda. Jag ber om en. Du. Vem som helst. Det är ett vänligt erbjudande.*

Alice står bakom dig. Leopold står bredvid dig. Du har dina händer.

## Val

- **[Strid — dra kniven]** *(kräver `skarpt=true`)*
  Du tar kniven. Den ärvda. Du går mot det djupare grå. Du sätter klingan in i något som inte är hud och inte är luft. Det är som att skära in i en kall vind. Det hugger ifrån. Det gör inte ont — det tar bort. Du tar ett steg till. Du hugger igen. Det grå blir tunnare där du står. Det säger fortfarande, med din röst, *du kom hit*. Det säger det allt långsammare. Sedan slutar det säga det. → scene-038 *(sätter `besegrat_det_grå=true`, `sanity -15`)*

- **[Hymn — slå på kassettbandspelaren]** *(kräver `frekvens` ×2)*
  Du tar fram kassettbandspelaren ur fickan. Du sätter i batterier — de du tog från källaren. Du trycker play. Det är hymnens fjärde strof — den enda strof som håller tonen, som Astrid skrev i sin pärm. Det är den frekvens som öppnar membranet. Den frekvens som också, om man spelar den åt rätt håll, sluter det. Du håller den högt. Det grå stannar runt dig. Det blir inte tunnare. Det blir *stillare*. Som om det fick sömn. → scene-038 *(sätter `besegrat_det_grå=true`, `sanity -6`)*

- **[Förhandla — acceptera]**
  Du säger: *Jag stannar.* Du säger det utan att se på Alice. Hon hör det. Hon säger inget. Det grå säger med din röst: *Tack.* Det är det första det säger som inte låter som ett erbjudande. → scene-038 *(sätter `valt_offra_sig=true`, `sanity -5`)*

- **[Hög-sanity — tala till det om dess ensamhet]** *(kräver `sanity ≥ 70`)*
  Du säger: *Du är ensam. Det är allt det är.* Du säger det inte som anklagelse. Du säger det som beskrivning. Det grå stannar. Det säger ingenting. Du står där tills du säger en sak till. Du säger: *Jag kan inte stanna. Men du är inte fel för att vara här.* → fortsätt *(sätter `förstod_det_grå=true`, `besegrat_det_grå=true`, `sanity -3`)*

- **[Hög-sanity + stoppa — erbjud Ingegerd]** *(kräver `sanity ≥ 70`, `vagval_intention=stoppa`, `talat_med_ingegerd=true`)*
  Du säger: *Ingegerd stannar. Hon vill stanna.* Du säger det inte med vrede. Du säger det därför att det är sant och du har hört henne säga det själv på sitt sätt. *Hon stannar och vi går. Vi tar inte med någon mer. Du behåller dem du har. Och jag stänger.* Det grå säger ingenting på en lång stund. Sedan säger det, fortfarande med din röst men något lägre: *Det är överenskommet.* En kvinnogestalt med ryggen mot tar ett steg in i djupare grå. Hon lyfter inte handen. → fortsätt *(sätter `förstod_det_grå=true`, `besegrat_det_grå=true`, `stoppat_permanent=true`, `ingegerd_eko+1`, `sanity +2`)*

- **[Förhandla — vägra utan plan]**
  Du säger: *Nej.* Du säger inget mer. Du har inget mer. Det grå tar ett steg närmare. Det säger med din röst: *Okej.* Det tar ett steg till. Du hinner inte. → scene-038 *(`sanity -20`)*
