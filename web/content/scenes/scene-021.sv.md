---
scene_id: 021
title: "Vinden"
language: sv
act: 2
type: SBN
triggers: [scene-016]
exits: [scene-016]
sanity_delta: -15
flags_set: [vinds_tinget_status]
flags_read: [har_ljus, har_vinds_mat, skarpt]
---

Trappan upp till vinden är brant och smal. Stegen är inte målade. Du går upp utan att tända — det är inget att tända.

Det är ljust däruppe. Det är det som är fel.

Vinden sträcker sig nästan över hela huset. Den är låg under nocken, bredare i mitten, lutar ner mot gavlarna. Två små gavelfönster släpper in det blå nattljuset. Genom dem ser du myren, sett uppifrån, en plan slätt vidöppen mot fjället. Inget av ljuset hjälper dig.

Det luktar gammalt trä och damm och gammal hund.

I mitten av vinden, mellan två takbjälkar, står något.

Det står inte på fyra ben. Det står inte exakt på två. Det är i hundens storlek men proportionerna är fel — bringan är för lång, huvudet sitter för djupt mellan skuldrorna, baktassarna är inte där baktassar är. Det rör sig inte. Det andas — du ser det andas — men inte i takt med hur en hund andas, snarare i takt med någonting annat, någonting tyngre, en pump kanske.

Det vänder huvudet mot dig.

Du har inte rört dig. Det har vänt sig mot dig ändå.

Ljuset är fel åt fel håll. Du ser inte tinget tydligt. Du ser konturer som inte stannar på samma plats två sekunder i rad. Du ser att den har ögon.

Den säger inget. Den gnyr inte. Den väntar.

Du har en hand på lukan. Du har en fot på det översta steget. Du har inte bestämt dig.

## Val

- **[Ficklampa direkt på det]** *(kräver `har_ljus=true`)*
  Du tänder och riktar. Strålen är vit och hård. I ljuset ser du. Det är inte en hund. Du ser pälsen där pälsen ska vara och du ser huden där huden inte ska vara. Du ser att den har ett halsband — ett gammalt, slitet, med en bricka du inte kan läsa härifrån. Den blundar för ljuset. Den vänder bort huvudet sakta. Du står kvar i två sekunder och stänger sedan av lampan. Du stänger lukan när du går. → tillbaka *(sätter `vinds_tinget_status=sett`, `sanity -15`)*

- **[Mata det med köttbiten ur kylen]** *(kräver `har_vinds_mat=true`)*
  Du tar köttbiten ur fickan, smörpappret faller på golvet. Du sätter biten på vindsgolvet en meter framför dig. Du backar ett steg. Det rör sig långsamt fram. Det luktar inte på köttet. Det tittar på dig. Sedan tar det biten. Du backar resten av vägen. Den gör inget. Den följer dig med blicken hela vägen till lukan. När du stänger den hör du den lägga sig ner igen. → tillbaka *(sätter `vinds_tinget_status=matat`, `vinds_tinget+1`, `sanity -12`)*

- **[Skär det med kniven]** *(kräver `skarpt=true`)*
  Du tar fram kniven. Tinget rör sig inte. Du går två steg fram. Du stryker klingan mot dess sida — det går igenom något som inte är päls och inte är luft. Det skriker inte. Det springer iväg på fel antal ben, in i halvmörkret bakom den gamla skorstenen, och du ser det inte mer. Du står kvar med kniven i handen. På klingan är ingenting. → tillbaka *(sätter `vinds_tinget_status=sårat`, `sanity -18`)*

- **[Backa, stäng lukan]**
  Du tar foten av översta steget. Du sänker dig ett steg. Du sänker dig ett steg till. Du tar tag i lukan ovanifrån — armen sträckt — och drar den efter dig. Den slår igen mjukt. Du står kvar i trappan och hör inget röra sig däruppe. Du står kvar för länge. → tillbaka *(sätter `vinds_tinget_status=undviket`, `sanity -10`)*
