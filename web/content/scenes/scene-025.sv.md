---
scene_id: 025
title: "Astrids pärm"
language: sv
act: 2
type: G
triggers: [scene-024]
exits: [scene-024]
sanity_delta: -8
flags_set: [har_läst_astrids_parm, vet_om_astrid, vet_om_ingegerd]
flags_read: []
---

Du lyfter ner pärmen från hyllan. Den är tyngre än den ser ut. Klotbandet är blekt på ryggen där sol har träffat det. På framsidan en pappersrektangel, klistrad sned. *Fältnoteringar / A. Lindh.*

Du sätter dig vid bordet. Stolen knirrar.

Handstilen inne är vacker. Smal, lutande, något gammaldags, vacker på det sätt som visar att den som skrivit inte tänkt på att handstilen var fin — hon tänkte på orden. Pärmen är indelad i flikar. *Fonologi.* *Geometri.* *Vittnesmål.* *Försök I.* *Försök II.* *Försök III.*

Du börjar i Fonologi.

Hon transkriberar en kvinnoröst. *Tonen är inte centrerad på en ton. Den ligger mellan a och b, närmare a, men inte stadigt — den vandrar med andetag. Gumman på gården vid Lillhärdal kan inte hålla den ren, men hon faller in i den när hon sjunger psalmen "Bereden väg för Herran". Det tycks som om bara den fjärde strofen får tonen att hålla.* Under transkriptionen en kurva ritad med blyerts. En sinusvåg som inte är jämn. På flera ställen tappar Astrid linjen och börjar om i marginalen. *Hunden under bordet ylade hela tiden hon sjöng. Vi har lagt märke till att hundarna ylar. Vi har inte lagt märke till att vi inte lade märke till det förrän nu.*

Du bläddrar fram till Geometri.

Två cirklar är ritade. En är ren. Den andra är ritad ovanpå den första med en aning större radie. Skillnaden är någonstans mellan en millimeter och ett halvt. *Vid det andra försöket märkte vi att den korrekta cirkeln inte är den vi ritade. Den korrekta cirkeln är den som blev till. Skillnaden är 0,7 procent större. Vi har inte ritat om den.*

Du bläddrar till Vittnesmål.

*B.L. återvände inte. O.S. uppger att han hörde ett ljud "från under" precis innan B.L. försvann från synfältet. Vi har inte kropp att redovisa till socknen. Vi har bett O.S. tiga. Han tiger.*

Och sedan, två sidor senare, samma handstil men något ändrad — bokstäverna lutar lite längre nu, mellanrummen är ojämnare, ett *e* som tidigare var slutet är öppet:

*De sju hundarna i hägnet vid sätesgården skäller inte mer på natten. De tittar. De tittar på samma håll. Vi har skrivit ner riktningen i den lilla kompasshytten. Riktningen är inte fast. Den vrider sig.*

Du bläddrar till Försök III.

*Den 23 juni 1981. Närvarande: A.L., L.L., I.H., O.S., A.L. (Lindblom — Alice), P.M.B. Frånvarande: jag själv (jag stannar i mejeriet och för anteckningar; någon ska ändå skriva). I.H. går in vid takt 47. Skivan står. Vi hör henne andas i hytten. Vi hör henne säga "Det vill att vi stannar." Vi hör henne säga "Det är inte ondska." Vi hör henne säga "Det är behov." Vi hör inget mer.*

På den sidan slutar pärmen. Resten av flikarna är tomma.

Du vänder ändå en sida till. Och en till.

På den absolut sista sidan — som vore den lagd dit efter att flikarna gjordes — står en enda rad. Handstilen är hennes men inte hennes. Bokstäverna är för stora. *e:t* är slutet igen.

*Det är inte forskning längre. Det är ett rum vi inte kan låsa.*

Daterad augusti 1983. Två veckor senare hittades hon inte på myren.

## I ficklampans sken

Du tänder ficklampan över bordet. Käglan faller på pärmens framsida. *Fältnoteringar / A. Lindh.* Du öppnar den och käglan letar sig över raderna. Du läser bara där käglan är. Resten av sidan är blå halvskugga.

Du läser fragment. *Tonen är inte centrerad.* Du flyttar käglan. *Hundarna ylar.* Du flyttar käglan. *Den korrekta cirkeln är den som blev till.* Du flyttar käglan. *Vi har bett O.S. tiga.*

Du sänker pärmen mot bordet och håller käglan stilla över raden.

*Det är inte forskning längre. Det är ett rum vi inte kan låsa.*

Du släcker. Du står stilla en sekund. Du tänder igen för att vara säker på att du verkligen läste det. Du läste det.

## Tillbaka i rummet

Pärmen i grönt klotband. Stolen knirrar fortfarande på samma plats. Den sista raden står där den stod. *Det är inte forskning längre.* Du kan läsa om eller låta bli.

## Val

- **[Skumma och lägg tillbaka]**
  Du stänger pärmen. Du sätter den exakt där den stod. Dammet runt den är fortfarande synligt mot platsen. → tillbaka *(`sanity -1`)*

- **[Läs noggrant — alla flikar]**
  Du läser i fyrtio minuter. Du läser om tonen, om geometrin, om de tre försöken. Du läser om en hund som hetat Tora och som ylade under bordet i Lillhärdal — samma datum som du nu vet att Bertil dog. Du läser hennes egen sista mening en andra gång. Du tar pärmen med dig. → tillbaka *(sätter `har_läst_astrids_parm=true`, `vet_om_astrid=true`, `vet_om_ingegerd=true`, `astrid_eko+1`, `sanity -6`)*

- **[Sluta läsa nu]**
  Du tar bort handen från pappret. Du står upp. Pärmen ligger öppen. Sidan visar två cirklar och en kurva som inte är jämn. → tillbaka *(sätter `vet_om_astrid=true`, `vet_om_ingegerd=true`, `sanity -2`)*
