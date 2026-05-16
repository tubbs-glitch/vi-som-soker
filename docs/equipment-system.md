# Equipment System — Mosters Hemligheter

> Tagg-baserat inventory. Items har taggar; val kräver taggar. Inget item är "bra" — det är *rätt sak vid rätt tillfälle*. Spelaren ska aldrig optimera mot ett wiki, bara välja det som känns rätt för deras karaktär.

---

## 1. Designfilosofi

1. **Taggar, inte specifika items.** Ett val frågar "har du något skarpt?" inte "har du jaktkniven?". Detta gör att en yxa hittad senare i vedboden kan ersätta kniven. Spelaren behåller känslan av val.
2. **Inga slots, ingen vikt, ingen kategorisering.** Allt ligger i en lista. 5-items cap vid start för att tvinga val — inte för att simulera ryggsäck.
3. **Förbrukning är minimal.** Bara ritualitems och batterier förbrukas. Allt annat behålls. Vi vill inte ha "spara på ammunition"-frustration.
4. **Att inte ha ett item är aldrig fail.** Det är en annan väg. Vi har alltid en non-item-väg framåt i varje scen.
5. **Items hittas naturligt, inte gömda.** Inget pixel-jakt. Items ligger där fiktion sätter dem — köksskåp, lab-anteckningsblock, mejeribyggnad.

---

## 2. Komplett tagg-lista

Källan är `state-flags.md §2`. Här är den centrala referensen — alla taggar i spelet.

| Tag | Betydelse | Exempel-användning |
|---|---|---|
| `skarpt` | Kan skära, möjliggör strid | Skär bandage, såra vinds-tinget, försvar |
| `vapen` | Explicit vapen mot Det grå | Aktiverar strid-vägen i scene-037 |
| `arv` | Personlig historia, emotionell vikt | Ger sanity-buffert i specifika dialog-scener |
| `ljus` | Lyser i mörker | Gates källaren, ger info på vinden |
| `signal` | Kan locka uppmärksamhet | Ropa, spela ljud, dra något ut ur skuggan |
| `frekvens` | Alstrar ljudvågor | Gates hymn-vägen mot Det grå |
| `verktyg` | Mekaniska arbeten | Säkringsskåp, lås, vissa val i scen-027 |
| `vård` | Läkning | Reducerar wound-effekt, läker `skuren_hand` |
| `kommunikation` | Fast-linje-samtal | Mobilladdare i Akt I innan mobiltäckning försvinner |
| `komfort` | Värme, vila | Komponent i `förberedd`-flaggan |
| `mat` | Ätbart | Mata vinds-tinget |
| `ljud` | Andra ljudkällor | Subordinär till `frekvens` — kan ersätta i vissa val |
| `ritual` | Krävs för ritualens utförande | Tjärsten är centralfallet |
| `signe` | Associerat med hundarna | Dialog-grenar i scene-033, scene-036 |
| `kunskap` | Ger informationsbonus i dialog | Lab-anteckningar, dagbok, Astrids pärm |
| `intim` | Bär emotionell vikt | Påverkar dialog med Alice |
| `helig` | Andlig laddning, motvikt mot Det grå | Tjärsten (folkmagi-betydelse), åttonde halsbandet |
| `sallskap` | Associerat med det gamla sällskapet | Mejerinyckel, lapp till Gunnar, ritualprotokoll |
| `tung` | Klumpigt, kan inte bäras med skadad hand | Yxa, kassettbandspelare (delvis) |

**Tagg-sammansättning:** Ett item kan ha flera taggar. Jaktkniv = `skarpt + vapen + arv`. Tjärsten = `ritual + helig`. Vi designar items så de täcker flera funktioner — det är roligt för spelaren att upptäcka att kniven inte bara är vapen, utan också *arv* (sanity-buffert).

---

## 3. Komplett item-lista

Alla items i spelet, med taggar och var de hittas/finns. Sammanställt från `choice-architecture.md`, `scene-map.md` och `state-flags.md`.

### 3.1 Packnings-items (Akt I, scen-002)

Detta är spelarens **startval** — välj upp till 5 av 7.

| Item | Taggar | Källa | Förbrukning |
|---|---|---|---|
| Ficklampa | `ljus, verktyg` | Packning | Nej (batterier behövs ej i ficklampa — vi simplifierar) |
| Jaktkniv (ärvd) | `skarpt, vapen, arv` | Packning | Nej |
| Kassettbandspelare | `frekvens, ljud, tung` | Packning | Nej, men kräver batterier för hymn-väg |
| Mobilladdare | `kommunikation` | Packning | Nej (men obrukbar efter scene-006) |
| Första-hjälpen-kit | `vård` | Packning | Ja (en användning) |
| Varma kläder | `komfort` | Packning | Nej |
| Extra batterier | `frekvens, verktyg` | Packning | Ja (3 användningar i bandspelare) |

### 3.2 Akt II — Hittade items i huset

| Item | Taggar | Var hittas | Förbrukning |
|---|---|---|---|
| Tjärsten (burk) | `ritual, helig` | Kök, scen-013 (övre skåp, glasburk märkt "torv-79") | Ja (en ritualanvändning) |
| Tjärsten (halv burk) | `ritual, helig` | Källare-förvar, scen-023 (alternativ om tjärsten ej hittad i kök) | Ja |
| Ficklampa (alt) | `ljus, verktyg` | Kök, scen-013 (om ej packad) | Nej |
| Vinds-mat (köttbit från kylen) | `mat` | Kök, scen-013 (kylen luktar men det finns en bit på överhyllan) | Ja |
| Lab-anteckningar (bunt) | `kunskap` | Leopolds arbetsrum, scen-014 | Nej (läses) |
| Mejerinyckel | `verktyg, sallskap` | Leopolds arbetsrum, scen-014 (mässingsnyckel märkt "M") | Nej |
| Gruppfoto 1981 | `kunskap, sallskap` | Leopolds arbetsrum, scen-014 | Nej |
| Alices dagbok | `kunskap, intim` | Alices sovrum, scen-017 (uppslagen på sängen) | Nej |
| Halsband (sjätte) | `signe` | Gästrum, scen-018 | Nej |
| Halsband (sjunde — frågetecken) | `signe, arv` | Gästrum, scen-018 | Nej |
| Kassettbandspelare-batterier | `frekvens` | Källare-förvar, scen-023 (om ej packade) | Ja (3 användningar) |
| Yxa | `skarpt, vapen, tung` | Vedboden, scen-027 | Nej |
| Säkringsverktyg | `verktyg` | Vedboden, scen-027 | Nej |
| Bilkarta (Alices) | `kunskap` | Alices bil | Nej |
| Vykort | `intim` | Alices bil | Nej |
| Alices pärm (ritualinstruktioner) | `kunskap, ritual` | Vardagsrum, scen-012 (sofflådan står öppen) | Nej |

### 3.3 Akt II — Mejeribyggnaden (sällskaps-tråden)

| Item | Taggar | Var hittas | Förbrukning |
|---|---|---|---|
| Astrids pärm (fältanteckningar) | `kunskap, sallskap` | Mejeribyggnaden, scen-025 | Nej |
| Ritualprotokoll (Ingegerds) | `kunskap, sallskap, ritual` | Mejeribyggnaden, scen-024 (på bordet) | Nej |
| Halsband (åttonde — Bertils) | `signe, sallskap, arv, helig` | Trälåren i mejeriet, scen-026 | Nej |
| Bertils brev (oöppnat till sin hustru) | `kunskap, sallskap, intim` | Trälåren, scen-026 | Nej |
| Lapp till Gunnar (från Olov) | `sallskap, intim` | Trälåren, scen-026 | Ja (om spelaren ger den till Gunnar — då försvinner den från inventory) |
| Gravstensskiss | `kunskap, sallskap` | Trälåren, scen-026 | Nej |
| Blå emaljmugg (A.L.) | `sallskap, intim` | Hallen, scen-011 / mejeribyggnaden | Nej (interaktivt object, inte typiskt item) |

### 3.4 Mat och konsumerbart

Vi har avsiktligt mycket få konsumerbara items. Inga healing-potions. Inga energi-bars.

- **Första-hjälpen-kit** — en användning, läker `skuren_hand` eller `kontusion_skalle`
- **Vinds-mat** — en användning (matar vinds-tinget)
- **Tjärsten** — en användning (ritualen)
- **Batterier** — tre användningar (hymn-spelningar)

Inget annat förbrukas. Items vi tar med oss till slutet bär vi med oss in i epilogen — vissa nämns där.

---

## 4. Packnings-spec — start-inventory

Vid scen-002 (eller char creation steg 5, beroende på beslut) väljer spelaren **upp till 5 items av 7 möjliga**.

### Användarflöde

1. UI visar listan av 7 items med korta beskrivningar.
2. Spelaren bockar för upp till 5.
3. Spelaren kan välja färre än 5 (designintention: en spelare som vill begränsa sig kan).
4. Bekräfta.

### Items att välja mellan

```
[ ] Ficklampa                  "Du har använt den när elen gått."
[ ] Jaktkniv (ärvd från far)   "Du tog över den när han dog. Du har aldrig använt den."
[ ] Kassettbandspelare         "Den fungerar fortfarande. Du har inte använt den på år."
[ ] Mobilladdare               "Standard. Du tar alltid med den."
[ ] Första-hjälpen-kit         "Olämpligt liten, men finns."
[ ] Varma kläder               "Du minns att Hällmyren är norr."
[ ] Extra batterier            "AA. Du vet inte varför du har så många."
```

### Konsekvenser per item

Detaljerade konsekvenser per item: se `choice-architecture.md §1`. Sammanfattning:

- **Ficklampa** — låser upp källaren utan substitut. Tryggare vinds-möte. Påverkar Akt II flow markant.
- **Jaktkniv** — möjliggör strid mot Det grå. `arv`-tagg ger emotionell tyngd i scene-036.
- **Kassettbandspelare** — möjliggör hymn-vägen, kritisk för Slut 1. Värdelös utan batterier.
- **Mobilladdare** — minskat värde i v2 (ingen mobiltäckning efter scene-006). Tar plats.
- **Första-hjälpen** — reducerar wound-effekt. Bredd snarare än djup.
- **Varma kläder** — komponent i `förberedd`-flagga (komfort + vård = förberedd). Inga gates blockeras utan, men spelarens sanity-drift är något långsammare i utomhus-scener.
- **Extra batterier** — kombinerar med bandspelare (utan batterier är bandspelaren oanvändbar).

### Designprincip för start-inventory

- **Inget singulärt "rätt" val.** Varje kombination öppnar en path och stänger en annan.
- **Den "optimerade" packningen** (ficklampa + bandspelare + batterier + första-hjälpen + varma kläder) ger flest spelvägar men minst karaktärsuttryck.
- **Den "uttrycksfulla" packningen** (kniv + bandspelare + batterier + första-hjälpen + ficklampa) gör spelaren mer dödlig men låser strid-vägen som default.
- **Den "minimala" packningen** (bara 2–3 items) är ett uttalat val — spelaren stänger frivilligt vägar för att "möta detta med tomma händer". Vi belönar inte detta mekaniskt men det är en stilig spelstil.

---

## 5. Hur taggar gate:ar val

### Gate-syntax (frontend-implementation)

I scen-data:

```json
{
  "id": "vinden-skär",
  "text": "[Skär det med din kniv]",
  "requires": {
    "tags": ["skarpt"],
    "sanity_max": 40
  },
  "consequences": {
    "sanity_delta": -25,
    "flags_set": { "vinds_tinget_status": "dödat" }
  }
}
```

### Tag-gate-evaluering

```ts
function hasTag(inventory: Item[], tag: string): boolean {
  return inventory.some(item => item.tags.includes(tag));
}
```

### Multi-tag-gates

Vissa val kräver flera taggar samtidigt:

```json
{
  "id": "hymn-vägen",
  "requires": {
    "tags": ["frekvens"],
    "tag_count": { "frekvens": 2 }
  }
}
```

Bandspelaren har `frekvens` och batterierna har `frekvens` — tillsammans = `frekvens × 2`. Spelaren förstår genom prosa ("Du behöver både apparaten och strömmen").

### Tag-display i prosa

I prosa skriver vi aldrig "kräver tag:frekvens". Vi skriver:

> *[Spela hymnen — bandspelaren ligger i din väska och batterierna är friska.]*

Texten är diegetic — den beskriver vad spelaren har. Gate-checken är osynlig för spelaren, men effekten är synlig (val visas eller döljs).

---

## 6. Förvärva nya items under spelet

### Pickup-mekanik

Items läggs till inventory genom **val i scen**:

```
Du står vid spisen. På den övre hyllan: en glasburk märkt "torv-79".

[ Ta burken ]                  → inventory += tjärsten
[ Läs etiketten ]              → läser etiketten utan att ta
[ Lämna den ]                  → ingen item, ingen flagga
```

Vi har **ingen "examine"-knapp**. Allt är val.

### Inventory cap efter start

Cap = 5 vid start, men växbart under spelet. Vi tar bort den explicita capen efter packningen. Argument:

- Realism: spelaren har en bil, en väska, ett hus att leta i. 5-cap utanför packningen är artificiell.
- Pacing: spelaren ska kunna ta ALLA story-items utan att stressa.
- Cap behåll i UI-känsla: 5 är fortfarande den "naturliga" känslan, men listan kan ha 10+ items i Akt III.

### Items från olika scener kan stapla taggar

Exempel: spelaren har varma kläder (`komfort`) + första-hjälpen (`vård`) → `förberedd`-flagga aktiveras. Två item-taggar = en härledd flagga. Spelaren ser bara konsekvensen i scen-prosa ("Du är klädd för det här. Knottet hittar inte in lika lätt.").

---

## 7. Specialfall

### Items som behöver kombineras

- **Bandspelare + batterier** = frekvens-väg
- **Tjärsten + alice_pärm** = ritualens rätta riktning (annars måste spelaren gissa)
- **Mejerinyckel + förstånd** = lugn ingång till mejeriet (alt: forcera med skarpt + styrka)

### Items som förstörs som narrativ poäng

- **Lapp till Gunnar** — kan ges till Gunnar i Slut 2-epilogen. Då försvinner den, men ger den tyngsta epilog-scenen i hela spelet.
- **Halsband (sjunde — frågetecken)** — kan kastas i myren av spelaren med `vagval_intention="stoppa"` i en valfri sidoscen (inte specificerad ännu — design-flagga till narrative-designer).

### Items vi *inte* har men spelaren kanske letar efter

- **Vapen utöver kniv/yxa.** Designval: vi vill inte ha "skjutvapen". Detta är inte ett action-spel.
- **Salt.** Designkommentar: spelaren *kan* tänka att salt är ritualkomponenten (kristen tradition). Vi har en känsligt designad scen där spelaren upptäcker att salt INTE fungerar — Per-Magnus-samtalet eller Astrids pärm avslöjar det. Detta är ett medvetet falsklarm.
- **Korsbärsstav, vitlök, krucifix.** Folk-horror lutar oss bort från kristen vampyr-mytologi. Det grå är inte en demon i den meningen.

---

## 8. Implementations-checklista för frontend-dev

1. **`Item`-interface i `data-model.md`** — definiera där.
2. **Inventory = `Set<Item>`** — inte array. Varje item kan bara finnas en gång.
3. **Pickup-action i scen-handler** — typade actions: `INVENTORY_ADD`, `INVENTORY_REMOVE`.
4. **Tag-utility-funktioner**: `hasTag`, `hasAllTags`, `tagCount`.
5. **Item-discovery i prosan ska vara explicit** — vi har en konvention: items beskrivs i en separat textstil (kursiv i v1, möjligen färgad i v2) när de blir tagbara. Spelaren ska se vad som är ett item, även om vi inte annonserar det med ikon.
6. **Inga inventory-screens.** Spelaren ser sin inventory diegetic — när de tar fram något, eller via en kort lista visad i menyn under sanity-tillståndet. Ingen modal.
