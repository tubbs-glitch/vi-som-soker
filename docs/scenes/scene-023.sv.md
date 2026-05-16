---
scene_id: 023
title: "Källare-förvar"
language: sv
act: 2
type: G
triggers: [scene-022]
exits: [scene-022]
sanity_delta: -2
flags_set: [har_tjarsten]
flags_read: []
---

Du står på det sista trappsteget. Du har inte tagit fram något ljus än. Du står och lyssnar.

Det luktar lera och något surt. Tjära långt borta. Något äldre. Du andas in en gång till.

Du anar formen av en spade i hörnet, snett mot väggen. Bortom den något fyrkantigt — en hylla, en kista. Du ser inte var rummet slutar.

Du sätter handen mot väggen. Lerputs, kall, oslipad.

Det är ingen idé att stå här utan ljus. Du tar fram det.

## I ficklampans sken

Det första käglan hittar är en gammal torvspade i hörnet — bladet torrt och sprucket, skaftet lutat mot väggen som om någon ställt det där och glömt det. Bredvid den står tre paraffinburkar i rad. Bakom dem en hylla av oslipat trä.

Du sätter ljusstrålen på hyllan. Det går några sekunder innan du förstår vad du ser.

Lådor. Ihopstuvade, märkta med Alices handstil i blyerts. *Pumpfett.* *Hundkex.* *Linser och bönor.* *Batterier* — den raden får ditt ljus att stanna. Du går fram. Du lyfter locket.

I lådan ligger åtta batterier av den sort som passar en kassettbandspelare från åttiotalet. Du tar två.

Längre in på hyllan står en glasburk. Den är inte märkt. Innehållet är mörkt — som hopvigad sand, eller som något som en gång var vått och har torkat under tryck. Du vrider på locket. Det luktar tjära. Det är inte sand. Det är något hon kallat tjärsten.

Burken är halvfull.

Du vänder käglan. Den hittar väggen bakom hyllan. En kalender från 1981. Den har inte vänts på fyrtiofem år. Junisidan är en svartvit bild av en granskog. I marginalen har någon skrivit datum. Den 23 juni är inringad två gånger.

Bortom käglan: bara lermörker.

## När strömmen är på

Det finns ingen lampa här nere. Det har aldrig funnits en. Källaren är som källaren alltid har varit — bortom elnätet.

Det första du ser i ljusstrålen är en gammal torvspade i hörnet — bladet torrt och sprucket, skaftet lutat mot väggen som om någon ställt det där och glömt det. Bredvid den står tre paraffinburkar i rad. Bakom dem en hylla av oslipat trä.

Du sätter ljusstrålen på hyllan. Det går några sekunder innan du förstår vad du ser.

Lådor. Ihopstuvade, märkta med Alices handstil i blyerts. *Pumpfett.* *Hundkex.* *Linser och bönor.* *Batterier* — den raden får ditt ljus att stanna. Du går fram. Du lyfter locket.

I lådan ligger åtta batterier av den sort som passar en kassettbandspelare från åttiotalet. Du tar två.

Längre in på hyllan står en glasburk. Den är inte märkt. Innehållet är mörkt — som hopvigad sand, eller som något som en gång var vått och har torkat under tryck. Du vrider på locket. Det luktar tjära. Det är inte sand. Det är något hon kallat tjärsten.

Burken är halvfull.

På väggen bakom hyllan hänger en kalender från 1981. Den har inte vänts på fyrtiofem år. Junisidan är en svartvit bild av en granskog. I marginalen har någon skrivit datum. Den 23 juni är inringad två gånger.

## Tillbaka i rummet

Du är tillbaka i källarförrådet. Spaden i hörnet, hyllan med lådor, glasburken med tjärstenen, kalendern från 1981 på väggen.

## Val

- **[Ta batterier och tjärsten]**
  Du lägger de två batterierna i ena fickan, burken i andra. Burken är tyngre än den ser ut. → tillbaka *(sätter `har_tjarsten=true`, `sanity -2`)*

- **[Ta bara batterier]**
  Du lämnar burken där den står. Den hör inte till dig. Du sluter locket innan du går. → tillbaka

- **[Titta på kalendern]**
  Du går närmare. På den 23 juni 1981 har någon skrivit *IH går in* med samma fasta hand som i Alices marginal i sovrummet. På den 24 juni: *Hon kom inte tillbaka.* Du står ett tag. → tillbaka *(`sanity -4`)*

- **[Tillbaka upp]**
  → tillbaka
