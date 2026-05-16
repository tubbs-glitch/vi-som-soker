---
scene_id: 104
title: "Verktygen"
language: sv
act: 2
type: G
triggers: [scene-103]
exits: [scene-105, scene-100]
sanity_delta: 0
flags_set: [har_yxa, har_sag, har_ficklampa, ström_på_försök]
flags_read: [ugglan_dod, tradet_sagat]
---

Inne i boden är luften en annan. Den är dammig och tjär-doftande och fortfarande lite av fågel.

Du står med dörren öppen bakom dig så att det blå nattljuset hittar in. Du ser bättre än du trodde du skulle.

På väggen mittemot dig hänger de. En *yxa* med slitet skaft och en huvudblå klingbett — den har använts. En *bågsåg* med rostfri båge och ett orange handtag. En *ficklampa* med Mag-Lite-stil, blå emalj med skrap. Gamla *läderhandskar*, en spade. På golvet en hög med ved, mörk av tid.

På baksidan av boden hänger ett *säkringsskåp* — en grå plåtlucka över en träram. Du öppnar den inte än men du minns hur det ser ut inuti: en huvudsäkring överst, en stor bygel som löser ut hela huset när den utlöses, och sex mindre proppar under. Huvudbygeln står på AV. Den har inte fallit av sig själv. Den löste ut för att kabeln ligger mot stolpens metall därute — kortslutning, jord mot fas. Du kan vrida upp bygeln så mycket du vill. Den faller direkt tillbaka så länge kabeln rör järnet. Trädet måste bort först.

Du ställer dig framför verktygsväggen. Du har tid nu. Två meter bort, om ugglan är död, ligger ugglan på rygg med vingarna halvt utbredda. Om hon flög ut är boden bara en bod. Du vet vilken av varianterna du har.

Vad du tar med dig är vad du har när du står vid stammen.

## Val

- **[Ta yxan]**
  Du lyfter den från krokarna. Skaftet ligger som det ska — torrt, glatt, en kåda-känsla i greppet. Tyngre än du mindes att en yxa är. → tillbaka *(sätter `har_yxa=true`)*

- **[Ta sågen]**
  Bågsågen är lättare. Du böjer in bladet och hör den ge ifrån sig den korta sjungande tonen som metall gör när den hänger i ett glipp. → tillbaka *(sätter `har_sag=true`)*

- **[Ta ficklampan]**
  Du tar ner den. Du klickar — strålen är gul och svag, men den lyser. Du klickar av. → tillbaka *(sätter `har_ficklampa=true`)*

- **[Slå på säkringen ändå]**
  Du går till baksidan. Du öppnar luckan. Du tar i huvudbygeln. Du vrider den uppåt — den ger med ett klick, en gnista hörs någonstans i ett relä — och sedan faller den tillbaka till AV av sig själv. Du försöker igen. Samma sak. Kortslutningen sitter kvar. Så länge granen pressar kabeln mot stolpens järn kan säkringen inte hålla. Du visste det redan. → tillbaka *(sätter `ström_på_försök=true`)*

---

**[Ut till trädet]** → scene-105
