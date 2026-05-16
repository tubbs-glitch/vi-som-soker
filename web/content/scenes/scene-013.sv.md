---
scene_id: 013
title: "Köket"
language: sv
act: 2
type: G
triggers: [scene-011, scene-012]
exits: [scene-011]
sanity_delta: -3
flags_set: [har_tjarsten, har_ljus, har_vinds_mat]
flags_read: []
---

Lukten kommer först. Du andas genom munnen i tre sekunder.

Köket är mörkare än hallen. Fönstret över diskbänken släpper in det blå men det blå räcker bara fram till spisens kant. Bortom det är allt form. Du anar vedspisens tunga gjutjärnsform vid kortväggen. En matplats. Något runt på fönsterhyllan — en radio kanske.

Du sätter handen mot diskbänken. Den är kall och fyrkantig. Du står där en sekund.

Kylskåpet står på glänt. Du ser springan som svartare än mörkret omkring den.

Något surrar svagt. Inte el. Knott. Bara två stycken, men de finns. Du dödar dem inte.

På väggen vid spisen anar du en almanacka, raka streck i mörkret, du kan inte räkna dem. På bordet ett kuvert, du ser bara kvadraten.

## I ficklampans sken

Käglan hittar diskbänken först. Sedan kranen. Sedan vidare till spisen — gjutjärn, putsad, ved staplad i en hög bredvid.

Du flyttar käglan uppåt. Den faller över almanackan vid spisen. Du läser. Sista veckan har streck — sju i rad runt midsommar. Veckan före: *vänta, vänta, vänta.* Tre gånger.

Du flyttar käglan högre. Den hittar överhyllan ovanför spisen. En glasburk. Etiketten *torv-79*, blyerts nästan blekt ner till papperet. Innehållet glänser där käglan träffar det — mörkt, kornigt.

Du sänker käglan mot bordet. Ett kuvert. Tjockt papper, inte uppslitet. Pensionsmyndigheten. Dammet börjar lägga sig på det.

Käglan rör sig vidare. Översta köksskåpet, om du öppnar — du öppnar — där ligger en bra ficklampa till. Kommunal sort, gummerad. Du tar den eller låter den ligga.

Du vänder käglan mot kylskåpet. Du öppnar inte. Du ser ändå genom springan: på överhyllan, längst in, en bit kött i smörpapper. Det är inte det värsta som står där.

Bakom käglan: mörker. Knottet rör sig in i ljuset, ut igen.

## När strömmen är på

I köket är lukten värre. Kylskåpet har stannat någon gång under stormveckan och börjat ge ifrån sig sitt eget skick. Du andas genom munnen i tre sekunder, sedan slutar du tänka på det.

Köket är gammalt och välhållet. En vedspis vid kortväggen — gjutjärn, putsad, ved staplad i en hög bredvid. En diskbänk under fönstret. En matplats med två trästolar och en pinnstol som inte hör till. En radio på fönsterhyllan, sladden urdragen.

På väggen vid spisen sitter en almanacka. Sista veckan har streck — sju i rad runt midsommar, hennes vanliga tusch, raka och inte tunna. Veckan efter är tom. Veckan före midsommar har en notering med kortare bokstäver: *vänta, vänta, vänta.* Tre gånger.

På köksbordet ligger ett kuvert. Tjockt papper, brevet är inte uppslitet. Det är adresserat till henne, från Pensionsmyndigheten. Det har legat oöppnat i någon vecka. Dammet börjar lägga sig på det.

På överhyllan ovanför spisen står en glasburk. Etiketten på den är handskriven, *torv-79*, blyerts blekt nästan ner till papperet. Burken innehåller något som inte ser ut som torv — ett mörkt kornigt material, glänsande där det är torrt.

I översta köksskåpet, om du tittar: en bra ficklampa, kommunal sort, gummerad. Batterierna är friska.

Kylskåpet står på glänt. Du öppnar inte hela. Du ser ändå — på överhyllan, längst in, en bit kött i smörpapper. Det är inte det värsta som står där.

Kylskåpet brummar igång när du står där. Kompressorn klickar, vibrerar, hittar sin ton. Den arbetar mot en vecka av tystnad. Lukten blir inte bättre av att kylan kommer tillbaka.

Knottet är inne. Bara två stycken, men de finns. Du dödar dem inte.

## Tillbaka i rummet

Du är tillbaka i köket. Almanackan med sju streck, burken på överhyllan, kuvertet från Pensionsmyndigheten. Kylskåpet står fortfarande på glänt.

## Val

- **[Ta burken — det är tjärstenen]**
  Du ställer dig på en köksstol och tar ner burken. Den är tyngre än den ser ut. Du sätter ner den i din väska utan att skruva loss locket. → tillbaka *(sätter `har_tjarsten=true`, `sanity -1`)*

- **[Ta ficklampan]**
  Du lägger den i jackfickan. Du har inte använt en sådan här på år men du minns hur. → tillbaka *(sätter `har_ljus=true`)*

- **[Köttbiten ur kylen]**
  Du tar köttbiten med smörpappret runt. Du vet inte varför. Du har den i fickan. Du tvättar händerna efter. Vattnet är gulaktigt i någon sekund innan det klarnar. → tillbaka *(sätter `har_vinds_mat=true`, `sanity -2`)*

- **[Brevet på bordet]**
  Du tar inte upp det. Du läser bara namnet, ett tjänsteärende, en summa som inte ska behöva läsas av någon utomstående. Du vänder dig bort. → tillbaka

- **[Almanackan]**
  Du räknar strecken igen. Sju. Det är inte rätt antal för någonting du känner till — en arbetsvecka är fem, en regel har sex dagar, en helg är två. Sju är inget. → tillbaka *(`sanity -1`)*

- **[Stäng kylen ordentligt och gå]**
  → tillbaka
