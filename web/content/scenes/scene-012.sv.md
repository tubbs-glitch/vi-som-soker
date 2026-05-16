---
scene_id: 012
title: "Vardagsrummet"
language: sv
act: 2
type: H
triggers: [scene-011, scene-028]
exits: [scene-011, scene-013, scene-014, scene-015]
sanity_delta: 0
flags_set: [alice_pärm_läst, hymnen_låten_på]
flags_read: [ström_på, hymnen_låten_på]
---

Vardagsrummet är en form. Du ser silhuetten av en soffa, två fåtöljer, ett bord. Klockan på väggen syns inte — den hörs bara. Pendeln rör sig. Den är för långsam.

Det norra fönstret slipper in ett blått skymningsljus som inte räcker ända in. Bortom rutan myren. Bortom myren granskog som inte tar emot något ljus.

Du anar något vid bordet. En kvadrat — en pärm, kanske. Stickorna lagda i kors på ovansidan, du ser bara hur formen bryts. Du går inte fram än.

Vid fönstret står en skugga som är högre än de andra. Skivspelaren. Locket av glas reflekterar svagt det blå. Du kan inte se nålen härifrån. Du vet bara att den finns.

Bakom dig knakar trasmattan i hallen, en sekund, sedan tystnar den.

Det är ingen där.

## I ficklampans sken

Du flyttar in käglan i rummet. Den faller först över ett bordsben, sedan upp över bordsskivan. Stickningen ligger som du anade — en barntröja, blå, halvfärdig, stickorna i kors.

Du flyttar käglan vidare. Pärmen. Brunt konstläder, halvt utvikt. På första sidan står Alices handstil men du läser inte. Du flyttar käglan.

Den hittar skivspelaren. Locket av glas. Den svarta skivan på tallriken. Du sänker käglan ner mot nålen — nålen står precis vid skivans yttre rand. Inte uppe i hyllan. Inte nere i spåret. Bara där.

Du flyttar käglan tillbaka mot dig själv. Kakelugnen vid kortväggen, vit med blå dekor, kall. Två rönnkvistar i en glasburk på hyllan.

Klockan ser du inte. Den tickar bara, någonstans ovanför ljuskäglan.

Bakom dig knakar trasmattan i hallen, en sekund, sedan tystnar den. Du flyttar inte käglan dit.

## När strömmen är på

Vardagsrummet är längre än du minns. En soffa i grön plysch, två fåtöljer som inte matchar, ett bord med en stickning halvgjord och stickorna lagda ifrån sig som om någon precis ska resa sig. En kakelugn vid kortväggen, vit med blå dekor, kall. Två rönnkvistar i en glasburk på spiselhyllan. Klockan på väggen är en gammal pendel, mässingen oputsad. Den tickar.

Vid fönstret står skivspelaren. Den är från åttiotalet — trä, glaslock, en svart skiva på tallriken. Lampan är inte tänd. Nålen står precis vid skivans yttre rand, inte uppe, inte i hyllan, bara där, som om någon stannat den en sekund och ångrat sig. Du ser etiketten på LP:n: röd, tyska tecken, ett kors. Du läser inte mer än så. Du gör det inte än.

Skivspelaren snurrar långsamt. Lampan på den lyser orange. Nålen är inte nere. Du kan höra själva tallriken arbeta — en låg, jämn ton genom trälådan.

Sofflådan står öppen. På soffbordet ligger en pärm, brun konstläder, halvt utvikt. På första sidan har Alice skrivit *Anteckningar — Hällmyren* och under det *vol. 4*. Hennes handstil är ren. Du har sett den i julkort hela ditt liv.

Du står vid bordet utan att sätta dig.

Bakom dig knakar trasmattan i hallen, en sekund, sedan tystnar den. Du tittar bakåt. Det är ingen där. Det är ju ingen där.

Genom det norrvända fönstret ser du myren. Solen står inte högt men den står — låst i ett ljus som inte är dag och inte är kväll. Granskogen bortom myren tar inte emot något ljus, den bär det inte heller, den står bara där.

Du tar ett steg närmare bordet.

## Tillbaka i rummet

Du är tillbaka i vardagsrummet. Pärmen på bordet, skivspelaren vid fönstret, klockan på väggen som går för långsamt. Genom det norrvända fönstret står myren stilla.

## Val

- **[Läs pärmen — bara översta sidan]**
  Alice har skrivit en lista. *Tjärsten — torv-79 — burken i köket.* *LP-startas vid 22:47.* *Cirkeln medsols. Steg 47.* Du läser inte de andra raderna. Du har förstått vad det är ändå. → tillbaka *(sätter `alice_pärm_läst=true`, `förstår_frekvens+1`, `sanity -2`)*

- **[Sätt nålen på skivans yttre spår]** *(om `ström_på=true` och `hymnen_låten_på=false`)*
  Du går fram till skivspelaren. Tallriken snurrar i sitt jämna varv. Du tar nålen i armen och sänker den långsamt, så som man sänker en nål på en skiva, ingenting mer än det. Det knäpper en gång mot vinylen, sedan en gång till, och sedan börjar hymnen. Det är inte musik så som du minns musik. Det är något annat. Du står kvar några sekunder. Det räcker. Resten ska gå på det här ljudet. → tillbaka *(sätter `hymnen_låten_på=true`, `sanity -3`)*

- **[Lyft på skivans nål]** *(om `hymnen_låten_på=true`)*
  Du lyfter på nålen och sätter den åt sidan. Hyllan klickar. Hymnen tystnar i mitten av ett andetag den aldrig dragit. Du tänker först att det är klokt att inte ha den gående utan tillsyn. Sedan tänker du att hon startat den just nu av en anledning. Du sänker nålen tillbaka i samma spår, så nära du minns. → tillbaka

- **[Stickningen]**
  Det är en barntröja, blå, hälften klar. Maskorna är jämna. Det är ett barn du inte vet vem det är. → tillbaka *(`sanity -1`)*

- **[Hallen]**
  Du går baklänges, för du har inte vänt ryggen åt skivspelaren än. → scene-011

- **[Köket]**
  Du går genom dörröppningen mot köket. → scene-013

- **[Leopolds arbetsrum]**
  Dörren står på glänt. → scene-014

- **[Trappan upp]**
  → scene-015
