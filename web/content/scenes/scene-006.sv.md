---
scene_id: 006
title: "De sista 30 km"
language: sv
act: 1
type: G
triggers: [scene-005]
exits: [scene-007]
sanity_delta: 0
flags_set: [set_kort_om_omgivningen, sanity_delta]
flags_read: []
---

Asfalten slutar tre kilometer efter Lillhärdal. Du ser det innan du känner det — färgen på vägen byter från svart till grågrönt och däcken börjar göra ett annat ljud. Grus. Grus i tjugo år. Grus i alla väder.

Du tar ner farten till sextio. Mobilen i mugghållaren visar fortfarande en stapel, sedan ingen, sedan en kortare bråkdel av en stapel, sedan ingenting alls. Du sneglar på den varje minut tills du slutar.

Lövskogen är borta. Granen tar över på båda sidor — tät, jämn, oresonlig. Mellan stammarna är myrmarken. Tjälen gick ur jorden för en månad sedan och nu ångar det därifrån i tunna band som följer dig.

Du kör genom en by som inte längre är en by. Tre husgrunder. En till med tak men utan fönster. En lekplats där maskrosorna har gått till frö och det enda som rör sig är fröna när bilen passerar. Ett kapell med fönsterluckorna spikade igen. Skylten säger Storvallen 0,2 km — men det finns inget Storvallen kvar. Skylten är bara där.

Du passerar två fordon på trettio kilometer. En traktor utan förare står i en hage. En pickup med fiskespö på taket är parkerad där en avtagsväg slutar i vatten.

Solen står lågt nu, men den sjunker inte. Den vilar mot fjällsilhuetten i nordväst. Klockan är efter åtta på kvällen och himlen är vit.

## Val

- **[Kör sakta. Du behöver se det här.]**
  Du saktar in. Du tittar. Husgrunderna har stenkanter som någon en gång lade jämnt. Kyrkans timmer är grått där det en gång varit rött. En gammal låda står lutad mot en gärdesgård och du tänker att någon ställde den där en gång och menade att hämta den. Du kör i fyrtio. Du ser allt. Sanity +1. *(sätter `set_kort_om_omgivningen=true`)* → scene-007

- **[Kör på. Du vill vara framme.]**
  Du tittar rakt fram. Du noterar utan att stanna. Du kör i sjuttio på grus och bilen skakar i kurvorna. Du kör för fort men du gör det med vilja. Sanity 0. → scene-007
