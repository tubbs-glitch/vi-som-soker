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

Du börjar i Fonologi. Hon transkriberar en kvinnoröst. *Tonen är inte centrerad på en ton. Den ligger mellan a och b, närmare a, men inte stadigt — den vandrar med andetag. Gumman på gården vid Lillhärdal kan inte hålla den ren, men hon faller in i den när hon sjunger psalmen "Bereden väg för Herran". Det tycks som om bara den fjärde strofen får tonen att hålla.*

Du bläddrar fram till Vittnesmål.

*B.L. återvände inte. O.S. uppger att han hörde ett ljud "från under" precis innan B.L. försvann från synfältet. Vi har inte kropp att redovisa till socknen. Vi har bett O.S. tiga.*

Du bläddrar till Försök III.

*Den 23 juni 1981. Närvarande: A.L., L.L., I.H., O.S., A.L. (Lindblom — Alice), P.M.B. Frånvarande: jag själv (jag stannar i mejeriet och för anteckningar; någon ska ändå skriva). I.H. går in vid takt 47. Skivan står. Vi hör henne andas i hytten. Vi hör henne säga "Det vill att vi stannar." Vi hör henne säga "Det är inte ondska." Vi hör henne säga "Det är behov." Vi hör inget mer.*

På den sidan slutar pärmen. Resten av flikarna är tomma.

## Val

- **[Skumma och lägg tillbaka]**
  Du stänger pärmen. Du sätter den exakt där den stod. Dammet runt den är fortfarande synligt mot platsen. → tillbaka *(`sanity -1`)*

- **[Läs noggrant — alla flikar]**
  Du läser i fyrtio minuter. Du läser om tonen, om geometrin, om de tre försöken. Du läser hennes egen sista mening, daterad augusti 1983, två veckor innan hon själv inte återvände från myren: *Det är inte forskning längre. Det är ett rum vi inte kan låsa.* Du tar pärmen med dig. → tillbaka *(sätter `har_läst_astrids_parm=true`, `vet_om_astrid=true`, `vet_om_ingegerd=true`, `astrid_eko+1`, `sanity -6`)*

- **[Sluta läsa nu]**
  Du tar bort handen från pappret. Du står upp. Pärmen ligger öppen. → tillbaka *(sätter `vet_om_astrid=true`, `vet_om_ingegerd=true`, `sanity -2`)*
