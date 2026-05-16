# Combat Spec — Mosters Hemligheter

> Narrativ strid i Disco Elysium-stil. Inga separata stridsskärmar, inga dödslägen från tärningar. Strid är en sekvens av val med gates, där varje val har konsekvens — inte sannolikhet.

---

## 1. Grundfilosofi

1. **Strid är prosa.** Det finns ingen "combat mode". En stridsscen är en scen som råkar handla om hot.
2. **Inga HP-bars.** Skada är beskrivande (wounds, sanity-fall, item-förluster) — inte ett kvarvarande siffervärde.
3. **Inga slumprullar.** Alla checks är **deterministiska gates** — antingen uppfylls de eller inte. Spelaren ser sina värden, ser kravet, väljer medvetet.
4. **Misslyckad check är inte död.** Det är en annan väg framåt, ofta värre — men spelet fortsätter alltid.
5. **Items och tags är centrala.** Att ha rätt sak vid rätt tillfälle är hela mekaniken. Att inte ha det öppnar dialog-vägar i stället.

---

## 2. Strukturen för en stridsscen

Varje stridsscen har **fyra delar:**

```
INTRO
  - Prosa: vad spelaren ser, hör, känner. Hotet närmar sig.
  - Inget val ännu — bara stämning.
  v
VAL-SEKVENS (1-3 val i rad)
  - Varje val har 3-6 alternativ.
  - Vissa är dolda om gates inte uppfylls.
  - Vissa är synliga med "[kräver ...]" om vi vill att spelaren ser
    vad de saknar.
  v
RESOLUTION
  - Prosa-beskrivning av utfallet.
  - Tydligt: vad förändrades?
  v
KONSEKVENS-TAGGAR (osynliga, sätts i state)
  - Flaggor uppdateras
  - Sanity-delta tillämpas
  - Wounds läggs till om relevant
  - Items kan förbrukas
  - Relations påverkas
```

---

## 3. Vit check vs Röd check

Vi använder Disco Elysium-modellen rakt av.

### Vit check
- **Spelaren kan komma tillbaka.** Om gate inte uppfylls nu — gör något annat, kom tillbaka senare.
- **Exempel:** Scen-026 (öppna trälåren). Kräver `vet_om_trälårs_kod=true`. Om spelaren inte har läst Alices dagbok, kan de gå till sovrummet, läsa, komma tillbaka.
- I UI: synligt val, grått, med [kräver kod från Alices dagbok].

### Röd check
- **Engångschans.** Misslyckas det eller väljs det inte, är den vägen stängd permanent.
- **Exempel:** Scen-021 (vinden). Spelarens val avgör vinds-tingets framtida tillstånd. Kommer tillbaka senare = annan scen, annat hot.
- I UI: synligt val, normalt rendrat, men en svag textcue ("det här ögonblicket kommer inte tillbaka") — eller bara prosa som signalerar definitivitet.

### Vit check som gate-typ — när den triggas vid fel tillfälle
Om en spelare försöker välja ett vitt check och inte uppfyller gates, scenen pivottar — den visar en annan utgång ("Du sträcker dig mot dörren men något ger upp i dig"). Inte fail, bara annan väg.

---

## 4. Gate-typer

En scen kan kräva flera samtidigt:

| Gate-typ | Exempel | Hur det visas i prosa |
|---|---|---|
| **Item-tagg** | `kräver tag:skarpt` | "[Skär med din kniv]" — bara om en skarp-tagg finns i inventory |
| **Stat-värde** | `kräver Mod ≥ 5` | "[Tala lugnt — kräver mod]" — visas grått under tröskel, normalt över |
| **Sanity-tröskel** | `kräver sanity ≥ 70` | "[Lyssna djupt — kräver klarhet]" — endast synligt vid lugn/fokuserad |
| **Story-flagga** | `kräver vet_om_bertil=true` | "[Fråga om Bertil]" — visas bara om flaggan är true |
| **Relation-värde** | `kräver gunnar_tillit ≥ 4` | Triggar dialog i scene-020 |
| **Wound-flagga** | `kräver !wounds.skuren_hand` | "[Bär bandspelaren stadigt]" — döljs om handen är skadad |
| **Bakgrund (arketyp)** | `kräver bakgrund=studerande` | "[Du noterar takten direkt — du har räknat sådan musik förut]" |

---

## 5. Vapen och föremål i strid

Vapen är **items med specifika taggar**. Det finns inga "vapendamage"-värden. Att ha ett vapen *möjliggör* en stridsväg — utfallet är prosa, inte en träffsannolikhet.

| Föremål | Taggar | Stridsanvändning |
|---|---|---|
| Jaktkniv | `skarpt, vapen, arv` | Möjliggör strid-väg mot Det grå; kan såra vinds-tinget |
| Yxa (om hittad i vedboden) | `skarpt, vapen, tung` | Möjliggör strid; kostar en runda att svinga (en extra prosa-beat innan resolution) |
| Tjärsten | `ritual` | Ej ett vapen men kan kastas i Det grås konfrontation som "stört ritual" — en udda väg |
| Salt (om spelaren tar fel) | (ingen) | Tror sig vara ritual, fungerar inte. Pivot-prosa. |
| Kassettbandspelare + batterier | `frekvens` ×2 | Möjliggör hymn-vägen — passiv väg, inget direkt vapen |
| Ficklampa | `ljus` | Mot vinds-tinget: ser tydligt = mer sanity-förlust men mer info. Mot Det grå: ingen effekt. |
| Tjärsten + skarpt | `ritual + skarpt` | I scene-037: bryta cirkeln avsiktligt — exotisk väg, leder till slut 4 |

**Förbrukningsregel:** Vapen förbrukas inte i strid. Tjärsten förbrukas i ritualen. Batterier förbrukas vid hymn (ger 3 användningar; efter det är bandspelaren tyst).

---

## 6. Konkret exempel 1 — Mötet med vinds-tinget *(scene-021)*

### Intro (prosa, ingen interaktion)

> Du kommer upp för vindstrappan. Det är 23:50 men det är inte mörker — det är ett blått ljus genom det smutsiga takfönstret som inte hör hemma någonstans i din kropp.
>
> Vinden går nästan över hela huset eftersom det är låg ås och bred plan. Lådor staplade utan ordning. En klädsäck. En gammal stol.
>
> Något står tio meter bort, mellan en kavajstativ och en hög av filtar. Det är hundstort. Det rör sig inte. Du ser proportionerna i halvljuset och det är inte vad en hund ska se ut som.

### Val-sekvens (ett val, fem alternativ; ingen kedjereaktion)

```
GATE-BERÄKNING (görs JIT vid scen-laddning):
  has_ljus       = inventory.hasTag("ljus")
  has_skarpt     = inventory.hasTag("skarpt")
  has_mat        = inventory.has("vinds_mat")
  mod_check      = stats.mod >= 5
  sanity_low     = sanity < 40

VALEN SOM RENDERAS:
```

| # | Val | Synlig om | Typ |
|---|---|---|---|
| A | Lyser på det med ficklampan | `has_ljus` | Vit (kan backa) |
| B | Mata det med matrester | `has_mat` | Röd (engångs) |
| C | Tala lugnt — du tror du kan nå det | `mod_check` ELLER `bakgrund=empatisk` | Vit |
| D | Skär det med kniven | `has_skarpt && sanity_low` | Röd |
| E | Backa, stäng dörren | alltid | Vit (men det väntar) |

(Notera: om INGET val är synligt — spelaren har t.ex. ingen ljuskälla, ingen mat, låg Mod, ingen skarp, hög sanity — finns alltid alternativ E. Vi får aldrig en "låst" scen.)

### Resolution-exempel: val B (mata)

> Du sätter dig på huk. Du sträcker fram handen. Du har en köttbit kvar från i går — du tog den med utan att veta varför.
>
> Det rör sig. Tre steg, tysta. Det luktar våt hund och tjära. När det stannar framför dig är det inte en hund — men det är *nästan* en hund, och det stannar för att äta ur din hand.
>
> När du lämnar vinden hör du det följa efter, två meter bakom dig, och sedan stanna.

### Konsekvens-taggar (osynliga)

```yaml
sanity_delta: -10
flags_set:
  vinds_tinget_status: "matat"
relations:
  vinds_tinget: +2
inventory_remove: ["vinds_mat"]
```

### Vad spelaren ser efter scenen

- Sanity-indikatorn skiftar (om tröskel korsas): "skakad" → "vacklande"
- Inget annat UI-feedback. Konsekvenser manifesteras i framtida scener.

---

## 7. Konkret exempel 2 — Konfrontationen med Det grå *(scene-037)*

### Intro

> Det grå talar. Det talar med din röst, först — men inte de ord du skulle välja. Sedan med en kvinnas röst du nu vet är Ingegerd, eller var. Sedan med ingenting alls, bara närvaron av en mening på väg in i dig.
>
> Alice står med ryggen mot dig. Hennes hand vilar mot något som inte finns. Leopold sitter där han satt.
>
> "Du kom hit", säger Det grå. "Du visste vägen. Det är ett erbjudande i sig."

### Val-sekvens

Detta är spelets **huvudsakliga stridsscen** och har sex möjliga vägar. Detta är spelets mest komplexa gate-beräkning.

```
GATE-BERÄKNING:
  has_skarpt        = inventory.hasTag("skarpt")
  has_frekvens_2    = inventory.tags("frekvens").count >= 2
  sanity_70         = sanity >= 70
  intention_stoppa  = vagval_intention === "stoppa"
  talat_ingegerd    = talat_med_ingegerd === true
```

| # | Väg | Krav | Typ |
|---|---|---|---|
| 1 | Strid — du höjer kniven | `has_skarpt` | Röd |
| 2 | Hymn — du tänder bandspelaren | `has_frekvens_2` | Röd |
| 3 | Förhandla — acceptera | alltid | Röd |
| 4 | Förhandla — neka utan plan | alltid (men leder till Slut 4) | Röd |
| 5 | Hög-sanity-vägen — tala om dess ensamhet | `sanity_70` | Röd |
| 6 | Stoppa permanent — erbjud Ingegerd som följeslagare | `sanity_70 && intention_stoppa && talat_ingegerd` | Röd |

### Resolution-exempel: väg 5 (hög-sanity)

> Du står stilla. Du andas in en gång. Du säger:
>
> "Du är ensam."
>
> Det grå tystnar. Det tystnar på ett sätt som inte är tystnad utan något annat — en sorts uppmärksamhet. Du står kvar.
>
> "Du har varit ensam så länge att du inte vet att det är ensamhet. Det är därför du behåller dem."
>
> Alice rör på huvudet. Leopold lyfter handen utan att veta att han gör det.
>
> Det grå säger ingenting på en stund. Sedan, med din egen röst, men mjukare: "Ja."

### Konsekvens-taggar

```yaml
sanity_delta: -5    # även hög-sanity-vägen kostar lite
flags_set:
  förstod_det_grå: true
  alice_med: true
  leopold_med: true
relations:
  det_grå: +3
```

### Mikro-val: efter resolution men före scene-038

> Vad gör du med Det grå nu?
> [A] Lämna det med en gest av medkänsla → Slut 1
> [B] Lämna det med Ingegerd-ekot som följeslagare (kräver väg 6) → Slut 1B
> [C] Vänd dig bort, gå tillbaka mot portalen → Slut 1 (men en kallare epilog)

---

## 8. Wounds och hur de uppstår i strid

| Wound | Sätts av | Effekt |
|---|---|---|
| `skuren_hand` | Brutit upp mejeridörren utan nyckel, eller såra vinds-tinget med kniv | Stänger val som kräver `tag:frekvens` (kan inte hålla bandspelaren) |
| `kontusion_skalle` | Strid mot vinds-tinget om det attackerar (om man hotar det utan att döda) | -5 sanity per scen tills läkt |
| `vriden_ankel` | Forcera myrgraven i mörker utan ljus, eller falla i källaren | Stänger snabba flykt-val i Akt III |
| `andnod` | Stå i Det grå med låg sanity för länge | Stänger hymn-vägen (kan inte sjunga med) |
| `kallnad_märg` | Stå för länge i Det grå (>3 scener på andra sidan) | Specifik slut-flagga: även Slut 1 har en kallare epilogvariant |

**Läkningsregler:**
- `skuren_hand` läker av `vård`-tag (första-hjälpen) i en hub-scen
- `kontusion_skalle` läker av vila (gå tillbaka till vardagsrummet en gång)
- `vriden_ankel` läker INTE — du bär den till slutet
- `andnod` läker av andas ut i lugn scen (vilken hub som helst) men kommer tillbaka i nästa Det grå-scen
- `kallnad_märg` läker bara av att stänga portalen

---

## 9. Designanmärkningar

1. **Få stridsscener totalt.** Spelet är inte action-tungt. Vi har 3 huvudstridsscener: vinden (021), möjligen mejeri-forcering (024), Det grå-mötet (037). Möjligen några sidoscener (myrgraven, vissa wound-triggers).

2. **Varje stridsscen är unik.** Vi designar dem en och en. Inget "stridssystem" som genererar generiska kamper.

3. **Spelaren ska aldrig dö.** Slut 4 (tystnaden) är ett *narrativt* slut — inte ett game over. Spelaren tar sig fortfarande tillbaka, bara utan dem de kom för.

4. **Stridsmusiken** (om vi tillsätter ljud i ett senare skede) ska vara minimal. Vi vill inte ha "boss-tema" som signalerar att nu är det allvar. Allvaret är konstant.

5. **Vi visar gates innan val.** Spelaren ser "[kräver Mod 5]" — vi gömmer det inte. Detta är ett medvetet brott mot konventionen att gömma siffror. Vi accepterar att lite tal syns, för att spelaren ska kunna fatta informerade beslut. Tal är förståelig om de är få och tydliga.

---

## 10. Implementation-anmärkningar för frontend-dev

- **Gate-beräkning ska ske JIT vid scen-laddning** — inte i förväg, eftersom state kan ändras mellan scener.
- **Val-listan i scen-handler ska vara en array av choice-objekt** (se `data-model.md §3`) — varje med `requirements`, `consequences`, `text`.
- **`canChoose(option, state)`-API:t** returnerar `boolean` plus `reason` (sträng) om false — så vi kan visa "[kräver mod]" textuellt om vi vill.
- **`applyChoice(option, state)` returnerar nytt state-objekt** (immutability) — gör save/load trivial.
- **Inga animationer i stridsscener.** Text fades in en mening i taget vid behov (lätt rytm), inget annat.
