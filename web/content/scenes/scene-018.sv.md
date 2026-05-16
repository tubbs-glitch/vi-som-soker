---
scene_id: 018
title: "Gästrummet"
language: sv
act: 2
type: G
triggers: [scene-016]
exits: [scene-016]
sanity_delta: -5
flags_set: [vet_om_signe, läst_namn, bär_halsband]
flags_read: []
---

Gästrummet är mörkare än hallen. Fönstret är åt öster, inte norr — det blå når knappt in. Du står i dörröppningen.

Du anar sängen. Vitt överkast, det enda som lyser något i mörkret. En garderob. En kommod.

På kommoden står något. En låda. Du ser bara dess kantiga form mot väggen bakom.

Du vänder dig åt höger. Spegeln. Den är i tre delar — vänster och höger fälls in mot mitten. De är inte infällda. Du ser dig själv tre gånger, otydligt, mer som skuggor av dig själv än som dig själv.

Du går inte längre in än så.

## I ficklampans sken

Du för in käglan. Den hittar sängen — vitt överkast, bäddad enkelsäng, för någon som aldrig kommer.

Du flyttar käglan till garderoben. Dörrarna utan handtag. Du måste sätta fingret i springan för att öppna den. Du gör det inte.

Käglan vandrar mot kommoden. På den står en lackad trälåda. Inte stor — som en skoask. Polerat valnötsträ. Ett mässingsbeslag som inte är låst.

Du går fram. Du sätter käglan på lådan medan du öppnar den med andra handen. I lådan ligger sju halsband. Käglan glider över dem. Läder, de flesta slitna av åren, ett ser nästan oanvänt ut. Var och en har en metallbricka.

Du tar ner lådan. Du sätter dig på sängkanten. Du håller käglan över brickorna en i taget. *Signe 1979–1986. Goda flickan.* *Signe II 1986–1993.* *Signe III.* Sex av brickorna har två datum. Två datum är ett liv. Den sjunde har bara ett datum och ett frågetecken. *Signe VI 2018–?* Hon har inte fyllt i.

Du vänder käglan från lådan. Den faller över spegeln. Tre delar. Tre versioner av dig själv. Du ser något ovanför ditt vänstra öra i mittspegeln som du inte ser i vänsterspegeln. Du flyttar käglan från spegeln.

## När strömmen är på

Gästrummet är möblerat för någon som aldrig kommer. En bäddad enkelsäng med ett vitt överkast. En garderob med dörrar utan handtag, du måste sätta fingret i springan för att öppna den. En kommod med en spegel i tre delar — det är den sortens spegel man hade på femtiotalet, vänster och höger fälldes in mot mitten. De är inte infällda nu. Du ser dig själv tre gånger när du går in.

Taklampan med sin tygskärm lyser. Spegelns tre delar fångar var sin del av rummet och kastar tillbaka var sitt gult ljus mot dig.

På kommoden står en lackad trälåda. Inte stor — som en skoask, men i polerat valnötsträ med ett mässingsbeslag som inte är låst. Den är inte gömd. Den står där den ska stå.

Du öppnar.

I lådan ligger sju halsband. De är av läder, de flesta slitna av åren, ett ser nästan oanvänt ut. Var och en har en metallbricka. Du läser dem inte än. Du räknar bara.

Du tar ner lådan från kommoden. Du ställer den på sängen. Du sätter dig på sängkanten.

Den första brickan: *Signe 1979–1986. Goda flickan.* Den andra: *Signe II 1986–1993.* Den tredje: *Signe III.* Och så vidare. Sex av brickorna har två datum. Två datum är ett liv.

Den sjunde brickan har bara ett datum och ett frågetecken. *Signe VI 2018–?* Hon har inte fyllt i.

Lädret på den sjunde är inte slitet. Det har inte burits mycket.

## Tillbaka i rummet

Du är tillbaka i gästrummet. Sängen, garderoben utan handtag, kommoden med valnötslådan, spegeln i tre delar. Lådan står där du lämnade den.

## Val

- **[Ta upp den sjunde]**
  Du håller den i handen. Lädret är torrt, brickan kall. Det är ett halsband som behöver bäras. Du sätter den i innerfickan. → tillbaka *(sätter `bär_halsband=sjunde`, `vet_om_signe=true`, `sanity -1`)*

- **[Ta upp den sjätte]**
  Du tittar på datumet. *Signe V 2011–2017.* Sex år. Du minns att Alice grät i telefonen den hösten. Du minns att du inte ringde tillbaka. → tillbaka *(sätter `bär_halsband=sjätte`, `vet_om_signe=true`, `sanity -2`)*

- **[Läs alla namn högt]**
  Du läser dem som hon själv hade gjort. Det tar tid att säga dem. Det blir för tyst i rummet mellan namnen. När du är klar finns det inget annat ljud i huset än klockan i vardagsrummet, och den hör du inte härifrån. → tillbaka *(sätter `läst_namn=true`, `vet_om_signe=true`, `sanity -8`)*

- **[Stäng lådan utan att röra]**
  Du lägger locket på. Du sätter tillbaka lådan exakt där den stod. Du noterar att kommoden har en damm-rektangel runt den i exakt rätt storlek. Den har stått där länge. → tillbaka *(`sanity -1`)*

- **[Spegeln i tre delar]**
  Du böjer dig fram. Du ser dig själv från tre håll. Du ser något ovanför ditt vänstra öra i mittspegeln som du inte ser i vänsterspegeln. Det är säkert ljuset. Du fäller ändå in vänstra spegeldelen mot mitten. Du går ut innan du tänkt klart. → tillbaka *(`sanity -2`)*

- **[Lämna rummet]**
  → tillbaka
