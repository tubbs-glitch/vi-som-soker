---
scene_id: 031
title: "Cirkeln och klivet"
language: sv
act: 2
type: BN
triggers: [scene-029]
exits: [scene-032]
sanity_delta: -10
flags_set: [ritual_korrekt, salt_riktning, klivit_in_i_portalen, hymnen_börjat]
flags_read: [har_tjarsten, ström_på, vet_om_tjarsten_korrekt, förstår_frekvens, sanity]
---

Du går ner till källaren. Skivspelaren ovanför har börjat — du hörde den börja medan du gick i hallen — och hymnens första strof följer dig genom golvet, lite dämpad, lite fördröjd, mer puls än sång.

Det murade rummet i källaren är inte stort. Tre meter på tre. Väggar av kalksten med tjärfog. Taket i bjälkar. På golvet, kritad och fyllningsmålad en gång och sedan slipad av fötter under femtio år, är en cirkel.

Cirkeln är fortfarande där. Två meter i diameter. Den är inte målad i en kontinuerlig linje — den är gjord av små krumelurer, geometriska tecken som du inte vill lära dig läsa, och de bildar en linje bara om man tar två steg tillbaka. Du står tre steg tillbaka. Den är hel.

Du har burken i handen. Tjärsten. Du öppnar locket.

I burken är inte sand. Det är mörka kristaller, hopvuxna, som om torvens fukt en gång fångats och låst sig fast. Du strör. Du tänker på Astrids handstil — *medurs, från norr, takt 47.* Du tänker på Per-Magnus skrovliga röst i telefon — *bara tjärsten.* Du tänker. Sedan strör du.

Hymnens andra strof börjar däruppe. Du har inte mycket tid.

## Val

- **[Strö medurs, takt 47]** *(kräver `har_tjarsten=true`)*
  Du börjar i norr. Du går rundan medurs. Du räknar takterna under andra strofen, kommer in i tredje, ditt fotsteg landar på taktslaget 47. Cirkeln glöder, eller verkar göra det — det är ett ljus du inte är säker på att du ser med ögonen. → fortsätt *(sätter `ritual_korrekt=full`, `salt_riktning=medurs`, `sanity +3`)*

- **[Strö motsols, takt 47]** *(kräver `har_tjarsten=true`)*
  Du går motsols — den äldre anteckningen, Leopolds första. Du kommer in på takt 47. Cirkeln öppnar sig på fel sida. Den fungerar ändå. → fortsätt *(sätter `ritual_korrekt=partial`, `salt_riktning=motsols`, `sanity -5`)*

- **[Strö medurs, takt 46]** *(kräver `har_tjarsten=true`)*
  Du klev en takt för tidigt. Du känner det innan du sett det. → fortsätt *(sätter `ritual_korrekt=partial`, `salt_riktning=medurs`, `sanity -8`)*

- **[Stå i cirkeln utan tjärsten]**
  Du har ingen burk. Du står där ändå. Cirkeln tänds inte. Den öppnar sig på ett tunnare sätt — som en spricka, inte en dörr. → fortsätt *(sätter `ritual_korrekt=nej`, `salt_riktning=ingen`, `sanity -12`)*

---

*(Om `sanity < 40`:)*

Innan du kliver. Du står med fötterna på två tecken som inte är samma tecken. Du ser ansikten i kalkstensväggen. De är inte tecknade — de är formade av fogen, som om någon vid murningen 1873 visste vad muren skulle se en gång. Du räknar dem. Sex. En av dem ser ut som ett gruppfoto från 1981. Det går över.

---

Du tar klivet.

## Val

**[In]** → scene-032 *(sätter `klivit_in_i_portalen=true`, `hymnen_börjat=true`, `sanity -10`)*
