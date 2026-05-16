---
scene_id: 014
title: "Leopolds arbetsrum"
language: sv
act: 2
type: G
triggers: [scene-011, scene-012]
exits: [scene-011]
sanity_delta: -10
flags_set: [har_mejerinyckel, har_lab_anteckningar, vet_om_sallskapet_rykte, sett_gruppfoto]
flags_read: []
---

Du står i dörröppningen. Rummet är mörkare än hallen — det enda fönstret är åt norr och det blå når inte runt skrivbordets kant.

Du har inte varit härinne sedan du var nio. Då var det en man som satt vid skrivbordet och vände sig om när du knackade. Du kan inte se stolen nu. Bara att den står där.

Dammet känns i luften. Inte tjockt. Det luktar av papper och något äldre.

Du sätter handen på skrivbordskanten utan att se den. Eken är torr under fingret. Du flyttar handen — en bunt papper, ett kuvert kanske, något inbundet i läder. Du läser inte. Du kan inte läsa.

På väggen ovanför skrivbordet, en silhuett — en ram, en bild bakom glas. Du minns att den hänger där.

På nyckelhyllan klirrar ingenting. Det är ingen vind. Men du vet att de hänger där.

## I ficklampans sken

Käglan hittar skrivbordet först. Eken, dammet jämnt på allt. Du drar fingret genom det och stryker mot byxbenet utan att se ner.

Du flyttar käglan över skrivbordet. Den hittar en bunt papper i en kartongmapp. Översta sidan handskriven — hans handstil, du känner igen den. *Amplitud / frekvensbredd / membranets tjockhet.* En uträkning du inte hänger med i.

Bredvid mappen: en bok med blå rygg. *Kallöv-Bergmans Akustik och materia.* Bokmärket är en utklippt dödsannons. Du läser inte namnet.

Du flyttar käglan uppåt mot väggen. Den hittar fotografiet. Sju vuxna utanför en låg byggnad i falurött. Käglan glider över ansiktena ett i taget. Alice. Leopold. Fem andra. Två med blyertskors över ögonen.

Du sänker käglan till nyckelhyllan. De flesta nycklar är märkta — käglan rör sig från krok till krok. *Garage. Brevlåda. Källardörr.* En kraftig mässingsnyckel utan ring, märkt bara *M*. Den hänger ensam.

Du för käglan mot fönstret. Genom rutan, åttio meter ut, anar du faluröd plåt och en svart dörr. Du har inte registrerat byggnaden förut. Käglan räcker inte fram. Men du vet att den finns.

Bakom dig är rummet fortfarande mörker. Bokhyllan tar du inte än.

## När strömmen är på

Du har inte varit härinne sedan du var nio. Då var det en man som satt vid skrivbordet och vände sig om när du knackade. Nu är det ingen.

Rummet är mindre än du minns det. Ett skrivbord i ek mot fönstret. En bokhylla som täcker ena väggen. En kontorsstol med fårskinn. En grön skrivbordslampa som du tänder utan att tänka efter.

Skrivbordslampan tänds när du trycker. Glödtråden lyser gult över skrivbordskanten och dammet syns hårdare i ljuset än det gjorde i den blå skymningen.

Dammet ligger jämnt på allt. Inte tjockt — det har städats för ett par år sedan, sedan inte. Du drar ett finger genom det på skrivbordskanten och stryker det mot byxbenet utan att se ner.

På skrivbordet ligger en bunt papper i en kartongmapp. Du läser översta sidan. Det är handskrivet, hans handstil, du känner igen den från ett vykort du fick som tonåring. Det står saker som *amplitud / frekvensbredd / membranets tjockhet* och en uträkning du inte hänger med i. Bredvid: en bok med blå rygg, *Kallöv-Bergmans Akustik och materia*, från sextiotalet. Bokmärket är en utklippt dödsannons från Östersunds-Posten.

På väggen ovanför skrivbordet hänger ett fotografi. Sju vuxna utanför en låg byggnad i falurött. Sommar, sol mot en av dem så han kisar. En hund vid den äldsta kvinnans fot. Du känner igen Alice — hon är trettiotvå där, hennes hår är mörkt. Bredvid henne en man som måste vara Leopold. På fotot finns också fem andra vuxna. Två av ansiktena är överstrukna med blyerts, tunna fasta streck över ögonen.

På nyckelhyllan hänger nycklar. De flesta är märkta: *garage, brevlåda, källardörr.* En är en kraftig mässingsnyckel utan ring, märkt bara *M*. Den hänger ensam på sin krok.

Genom fönstret syns mejeribyggnaden. Du har inte registrerat den förut. Faluröd plåt, en svart dörr, åttio meter ut mot myrens kant.

## Tillbaka i rummet

Du är tillbaka i Leopolds arbetsrum. Skrivbordet med pappren, fotografiet med de sju ansiktena, mässingsnyckeln på hyllan. Genom fönstret står mejeribyggnaden vid myrkanten.

## Val

- **[Skumma anteckningarna]**
  Du bläddrar tre sidor in. Det handlar om vibrationer, om ett membran, om något som öppnas. Du läser inte allt. Du läser tillräckligt. → tillbaka *(sätter `har_lab_anteckningar=true`, `förstår_frekvens+1`, `sanity -4`)*

- **[Läs noga]**
  Du sätter dig i fårskinnsstolen och läser i tjugo minuter. Det handlar om att tunna ut ett membran. Det handlar om hur tunt det får bli innan det går sönder. Det handlar om vad som finns på andra sidan. Han skriver med ren hand om saker som inte ska skrivas om alls. Du står upp för fort när du är klar. Det dröjer en sekund innan rummet är där rummet ska vara. → tillbaka *(sätter `har_lab_anteckningar=true`, `förstår_frekvens+2`, `sanity -10`)*

- **[Ta mässingsnyckeln märkt M]**
  Du lyfter av den från kroken. Den är tyngre än de andra. Du sätter den i innerfickan. Du tittar genom fönstret igen mot byggnaden. → tillbaka *(sätter `har_mejerinyckel=true`, `sanity -2`)*

- **[Studera gruppfotot]**
  Du går närmare ramen. Sju ansikten. Två blyertsöverstrukna — ett är en äldre kvinna med stora glasögon, ett en yngre man med skägg. Du läser på baksidan om du kan lyfta av ramen. Du kan. *Hällmyren, midsommarafton 1981.* Inga namn. Du sätter tillbaka det på spiken så rakt du kan. → tillbaka *(sätter `sett_gruppfoto=true`, `vet_om_sallskapet_rykte=true`, `sanity -3`)*

- **[Lämna rummet utan att röra något]**
  → tillbaka
