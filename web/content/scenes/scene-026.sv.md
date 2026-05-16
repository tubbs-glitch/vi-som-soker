---
scene_id: 026
title: "Trälåren"
language: sv
act: 2
type: G
triggers: [scene-024]
exits: [scene-024]
sanity_delta: -15
flags_set: [vet_om_bertil, bär_attonde_halsband, har_lapp_till_gunnar]
flags_read: [vet_om_trälårs_kod]
---

Lådan står i hörnet. Trä, ådringen mörk under dammet. Tre mässingsbeslag på framsidan, var och en med fyra sifferhjul. Locket är inte stort. Lådan är inte stor. Det är en sådan låda man ställer fötter på, eller ett barn.

Du sätter dig på huk. Du torkar bort dammet med handen. På locket är initialerna *vss* — skrivna med liten bokstav, med blyerts, två gånger så att de syns. *vi som söker.*

Du vrider hjulen.

## Val

- **[Slå koden 1979-06-23]** *(kräver `vet_om_trälårs_kod=true`)*
  Tre rader: 19, 06, 23. De sista hjulen klickar in i läge utan motstånd. Ett mässingsbleck sänker sig. Du lyfter locket. → fortsätt

- **[Försök öppna utan kod]**
  Du drar i locket. Du försöker dyrka med kniven om du har en. Träet ger inte. Beslagen ger inte. Lådan tål mer än du. → tillbaka

- **[Lämna lådan]**
  Du reser dig. Du går ut. → tillbaka

---

*(Om du öppnade:)*

I lådan ligger papper. Och under papperen, lindat i en gammal näsduk: ett halsband av brunt läder med en mässingsbricka.

Du tar upp brickan. *Tora 1972–1979. Hund.* Du läser den två gånger.

Det är det åttonde halsbandet. Det finns sju krokar i hallen och sju halsband i lådan i gästrummet. Det här är ett halsband ingen pratat om.

Du läser papperen.

Det första är ett brev. Maskinskrivet på en gammal Halda, daterat 12 april 1979. *Kära Helene. Det är två år sedan du gick. Jag har inte skrivit på två år och du har inte skrivit på två år. Jag vet att jag inte fick brev. Jag vet att jag inte borde vänta brev. Men jag ville bara säga att Tora dog igår och att jag har grävt henne under rönnen vid bron. Hon låg bredvid mig på fredagskvällen. Hon låg bredvid mig på lördagsmorgonen. Det var allt jag bad om. Din Bertil.*

Det andra är en skiss. En gravsten på myren, 600 meter ut, vid en björkdunge. Texten på stenen: *Bertil Lindblom, 1935 - midsommar 1979.* Inget datum. Inga blommor. Bara den ena raden.

Det tredje är ett kuvert. Det är inte öppnat. Adresserat med samma maskin: *Till min son Gunnar — först när jag är borta. /O.*

Du sitter på huk. Du har en morbror till. Du har haft det hela ditt liv utan att veta det. Du har en morbror som ingen pratat om sedan 1979 och som ligger någonstans i en myr 600 meter ut.

Du lägger papperen tillbaka. Eller du gör det inte.

## Val

- **[Ta halsbandet, brevet och lappen till Gunnar]**
  Du lägger halsbandet i innerfickan. Du viker brevet och stoppar in det. Du tar lappen försiktigt — som om papperet skulle gå sönder av att hållas. → tillbaka *(sätter `vet_om_bertil=true`, `bär_attonde_halsband=true`, `har_lapp_till_gunnar=true`, `sanity -15`)*

- **[Ta bara halsbandet och brevet]**
  Lappen ligger kvar. Den är inte din. Den är till Gunnar och den har legat och väntat på honom i en låst låda i femtiofyra år. Du klarar inte att ta den med dig. → tillbaka *(sätter `vet_om_bertil=true`, `bär_attonde_halsband=true`, `sanity -15`)*

- **[Läs allt, ta inget]**
  Du läser. Du lägger tillbaka allt exakt där det låg. Du stänger locket. Du skakar tillbaka sifferhjulen så de inte står på koden. Du har sett. Det räcker. → tillbaka *(sätter `vet_om_bertil=true`, `sanity -12`)*
