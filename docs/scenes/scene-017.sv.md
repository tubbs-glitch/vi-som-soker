---
scene_id: 017
title: "Alices sovrum"
language: sv
act: 2
type: G
triggers: [scene-016]
exits: [scene-016]
sanity_delta: -10
flags_set: [förstår_alice, vet_om_trälårs_kod, har_läst_dagboken]
flags_read: []
---

Du öppnar dörren. Rummet är vänt mot norr och fönstret är på glänt — det blå kommer in, men bara så långt.

Du ser en form vid väggen. Sängen, blårutig, otydlig. Du ser inte mönstret men du vet att det är blårutigt. Du har sett det innan.

På nattduksbordet en silhuett — ett glasögonfodral, kanske. Något runt — ett vattenglas. En bok upp och ner.

Vid den motsatta väggen anar du en pulpet. En linje där den möter mörkret. Du går inte fram än.

Något lyser inte. Du tror först att lampan på pulpeten lyser. Sedan ser du att det inte är det. Det är bara det blå som ligger över glaset.

Genom fönstret kommer myrens lukt — kall, mineralisk, lite syrlig.

## I ficklampans sken

Du för in käglan i rummet. Den hittar först golvet. Brunt trä, en bortnött matta. Käglan glider över ett par tofflor som står parallellt vid fönstret. De står sneda mot väggen. Som om hon bara klivit ur dem.

Du höjer käglan. Den faller över sängen. Blårutigt täcke, slarvigt uppdraget över kudden, som av en hand som inte tänkte på vad den gjorde.

Du flyttar käglan över sängen. På väggen ovanför hänger ett broderi i träram. *Var dag är en gåva.* Det hänger snett.

Du vänder käglan mot pulpeten. En dagbok ligger uppslagen. Pennan bredvid, locket av, bläcket på spetsen torrt. Hon hann inte stänga den. Du ser sidans datum i hörnet — onsdagen för en vecka sedan.

Du sänker käglan över nattduksbordet. Glasögonfodral. Bok upp och ner. Vattenglas med botten vit av kalk.

Käglan räcker inte runt hela rummet. Garderobsdörren är stängd. Det är allt du vet om garderoben.

## När strömmen är på

Sovrummet är litet och vänt mot norr. En enkelsäng med ett blårutigt täcke som inte har bäddats om — bara dragits upp över kudden, slarvigt, som av en hand som inte tänkte på vad den gjorde. På nattduksbordet ett glasögonfodral, en bok upp och ner, ett vattenglas där botten är vit av kalk.

På golvet vid fönstret står tofflor.

På den lilla skrivpulpeten vid väggen ligger en dagbok. Den är uppslagen. Pennan ligger bredvid, locket av, bläcket på spetsen torrt. Hon hann inte stänga den.

Sidan du ser har datum i hörnet — onsdagen för en vecka sedan. Hennes handstil är glesare på senare sidor än på tidigare, det ser du utan att läsa. Det hänger en träram med ett broderi över sängen. *Var dag är en gåva,* står det. Det är broderat av en yngre Alice. Det hänger snett.

Fönstret är på glänt. Genom det kommer myrens lukt — kall, mineralisk, lite syrlig.

Sänglampan står tänd på nattduksbordet. Den måste ha varit på när strömmen gick — hon släckte den aldrig. Skenet faller över det blårutiga täcket och pennans torra spets.

Du står vid pulpeten.

Du kan läsa hela dagboken. Du kan läsa bara den uppslagna sidan. Du kan låta bli.

## Tillbaka i rummet

Du är tillbaka i Alices sovrum. Sängen blårutig, dagboken på pulpeten, tofflorna vid fönstret. Broderiet hänger fortfarande snett över sängen.

## Val

- **[Skumma den sista sidan]**
  *Strömmen är borta sedan torsdag. Skivspelaren har inte spelat på en vecka. Jag ska gå till vedboden imorgon. Jag ska vänta tills L svarar.* I marginalen, med fast hand: *1979-06-23.* Du tänker att det är ett datum. Sedan ser du att det är skrivet utan mellanslag — *19790623* — som en kombination. → tillbaka *(sätter `förstår_alice+1`, `vet_om_trälårs_kod=true`, `sanity -3`)*

- **[Läsa hela dagboken — sex år bakåt]**
  Du sätter dig på sängkanten. Du läser i fyrtio minuter. Du läser om sju hundar, en åt gången, en grav om året. Du läser om att vänta på en man som aldrig kommer hem. Du läser om en frekvens, om en takt, om en kropp som hon inte tror finns kvar men ändå inte kan släppa. Du läser om en bror som hon inte heller har släppt. Hon nämner honom bara en gång. *Han var inte din far,* skriver hon. *Han var min. Och jag visste.* Du har en mamma som heter Inger. Du har aldrig hört talas om någon bror till henne. Du har inte heller frågat. → tillbaka *(sätter `förstår_alice+2`, `vet_om_trälårs_kod=true`, `har_läst_dagboken=true`, `sanity -10`, `alice+1`)*

- **[Stäng dagboken utan att läsa]**
  Du sätter försiktigt locket på pennan. Du stänger boken på fingret en sekund, sedan helt. Det är en gest hon hade gjort själv. → tillbaka

- **[Tofflorna vid fönstret]**
  Du tittar ner på dem. De står parallellt, sneda mot väggen. Som om hon bara klivit ur dem. Du rör inte vid dem. → tillbaka *(`sanity -1`)*

- **[Gå ut igen]**
  → tillbaka
