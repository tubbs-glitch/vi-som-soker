# Prose Edit Log — Pass 2

> Hybrid svensk prosa- och autenticitetsredigering. Tre problem adresserade: lysknappen-buggen (scen-011 vs scen-100), POWER-ON-varianter, och en djupare språk- och logikgenomgång.

## Sammanfattning

- **Scenfiler redigerade**: 23 (SV + EN-paritet där tillämpligt)
- **POWER-ON-kommentarer tillagda**: 9 scener (scen-011 till scen-019)
- **Lysknappen-buggen**: flyttad från val-text i scen-011 till prosan i scen-011; tagits bort från scen-100 (där den aldrig hörde hemma)
- **Voice-guide-brott**: 1 fall av "plötsligt" (scen-103) — borttaget
- **Påhittade ord**: 2 fall ("myrtrösktreck" → "torvspade"; "gnisterkristaller" → "mörka kristaller")
- **Felstavning**: "kraqulérat" → "krakelerad" (svensk stavning)
- **Grammatik-mismatch**: 2 fall av "Falurött plåt" (utrum/neutrum-blandning) → "Plåt målad i falurött"

---

## Topp-20 ändringar

### 1. scene-011 (Hallen) — lysknappen-buggen
- **Flyttat**: provar strömbrytaren-momentet flyttat in i prosan ("Du provar strömbrytaren bredvid dörren. Inget händer. Gunnar sa att stormen tog elen i hela dalen. Du släpper knappen.")
- **Borttaget från val-text**: scen-011's `[Ut på tomten]`-knapp förenklad
- **POWER-ON-kommentar**: glödlampa i taket

### 2. scene-100 (Ut på tomten) — lysknappen borttagen
- Inget mer "klickar på lysknappen"-tema i den här scenen (rätt: spelaren har redan testat innan de gick ut)
- "kraqulérat" → "krakelerad" och "falurött" → "faluröd" (utrum-mismatch)

### 3. scene-012 (Vardagsrum) POWER-ON
- "tänkt sig om" → "ångrat sig" (mer naturligt)
- POWER-ON: skivspelaren snurrar, indikatorlampan lyser

### 4. scene-013 (Köket) POWER-ON
- POWER-ON: kylskåp brummar igång
- "Du dödar inte dem" → "Du dödar dem inte" (mer naturlig ordföljd)

### 5. scene-014 (Leopolds arbetsrum) POWER-ON
- POWER-ON: skrivbordslampan tänds, dammet syns hårdare

### 6. scene-015 (Trappan upp) POWER-ON
- POWER-ON: taklampa över trappan

### 7. scene-016 (Övre hallen) POWER-ON
- POWER-ON: vägglampa mellan dörrarna

### 8. scene-017 (Alices sovrum) POWER-ON
- POWER-ON: sänglampan står tänd — hon släckte den aldrig (logiskt detalj som förstärker hennes försvinnande)

### 9. scene-018 (Gästrummet) POWER-ON
- POWER-ON: taklampa + spegelreflektioner

### 10. scene-019 (Badrummet) POWER-ON
- POWER-ON: lysrör tänds med klick + två blink

### 11. scene-021 (Vinden) — "det blåa" → "det blå"
- Konsekvens med övriga scener (definite neutrum)

### 12. scene-023 (Källare-förvar) — påhittat ord
- "ett gammalt myrtrösktreck" → "en gammal torvspade"
- (EN: "bog-trough" → "peat-spade")

### 13. scene-024 (Mejeribyggnaden) — grammatik
- "Falurött plåt" → "Plåt målad i falurött"
- (utrum/neutrum-mismatch — "plåt" är en-utrum)

### 14. scene-031 (Cirkeln) — påhittat ord + felstavning
- "gnisterkristaller" → "mörka kristaller, hopvuxna"
- "Per-Magnus rost i telefon" → "Per-Magnus skrovliga röst i telefon" ("rost" var fel ord)
- (EN: "spark-crystals" → "dark crystals"; "rust in Per-Magnus's voice" → "rasp in Per-Magnus's voice")

### 15. scene-100 (Ut på tomten) — som ovan, krakelerad
- Värt notera: redan etablerat att spelaren *vet* att elen är av när scenen börjar (förmedlas nu av scen-011)

### 16. scene-102 (Vedbodens dörr) — grammatik
- "Falurött plåt över timret" → "Plåt målad i falurött över timret"

### 17. scene-103 (Ugglan) — voice-guide-brott
- "plötsligt är luften i boden inte luft längre" → "luften i boden är inte luft längre."
- "avgrundigt fel hastighet" → "en fel hastighet" (för Lovecraft-aktigt adverb borttaget)

### 18. scene-014 (Leopolds arbetsrum) — POWER-ON grammatik
- "i blå skymning" → "i den blå skymningen" (definite article needed)

### 19. EN-paritet på alla POWER-ON
- Engelska kommentarer skrivna från grunden — inte översatta — i samma minimalistiska ton som M.R. James-registret kräver

### 20. EN-paritet på scen-011 lysknappen
- Engelska scen-011 fick samma flytt: switch-by-the-door-momentet in i prosan, ut ur val-texten

---

## Logiska problem som behöver narrative-designer-input

Dessa kan jag INTE fixa själv eftersom de kräver scenomskrivning eller flagga-redesign.

### A. scene-031 antar Per-Magnus-samtal har skett

scen-031 (Cirkeln och klivet) refererar till "Per-Magnus skrovliga röst i telefon" i prosan, men `vet_om_tjarsten_korrekt` (som sätts i scen-009) är inte gatad här — prosan visas oavsett om spelaren ringt eller inte. **Förslag**: villkorlig prosa, eller släng referensen om `vet_om_tjarsten_korrekt=false`. (Funktionellt är det inte fel — spelaren kan ha läst om Per-Magnus i Astrids pärm — men prosan implicerar att de hört rösten själva, vilket är logiskt fel om de inte ringde.)

### B. scene-031 antar Astrids pärm är läst

scen-031 refererar till "Astrids handstil — *medurs, från norr, takt 47*" men det är fullt möjligt att spela utan att ha läst scen-025. Spelaren kan ha läst samma info i Alices pärm (scen-012) men just *handstilen* känner de inte igen utan scen-025. **Förslag**: ändra referensen till "anteckningen — *medurs, från norr, takt 47*" om `har_läst_astrids_parm=false`.

### C. scene-034 (Ingegerd-ekot) trigger-grind

scen-034 har `flags_read: [grå_riktning, vet_om_ingegerd]`. Men i scen-033 leder valet `["Vem är du?"]` direkt till scen-034 oavsett om spelaren känt till Ingegerd förut. Det funkar narrativt eftersom hon presenterar sig själv ("Jag heter Ingegerd Hagström"), men för spelare som *redan visste* om henne (via scen-025) sker en logisk inkongruens: de borde reagera annorlunda. **Förslag**: två varianter av repliken — en för förstamöte, en för "ja, jag har läst om dig".

### D. scene-035 (att hitta Leopold) — "tweedkavaj 1979"

scen-035 beskriver en man bredvid Leopold "klädd i något som hade varit en tweedkavaj 1979". Detta är spelarens uppfattning, men referensen till "1979" implicerar att spelaren *vet* att Bertil dog 1979 — vilket kräver `vet_om_bertil=true`. Just nu sägs prosan oavsett state. **Förslag**: villkorlig formulering — om `vet_om_bertil=false`, ändra till "en man i ett gammalt plagg" utan datumreferens.

### E. scene-024 trigger-mismatch med scene-map

scene-024.sv.md har `triggers: [scene-100]` men scen-100 går inte till scen-024 — den går till 101/102. Något annat (vedboden/utforskningen efter strömmen?) borde leda hit. **Förslag**: scene-map-update eller lägg till en utgång från scen-104/105 eller scen-011 till scen-024.

### F. scene-009 + scene-020 saknas som filer

scene-map.md listar scene-009 (Per-Magnus-samtal) och scene-020 (Telefonsamtal med Gunnar) som valfria scener. Ingendera har en SV/EN-fil. **Förslag**: copywriter behöver skriva dessa. Per-Magnus-samtalet är särskilt viktigt — det är spelarens enda möjlighet att tala med en överlevande, och scen-031 prosan refererar till det.

### G. scene-021 (Vinden) — antar inte gruppfoto sett

scen-021 (vinds-tinget) kan triggas innan spelaren besökt scen-014 (Leopolds arbetsrum). Prosan refererar inte till gruppfotot eller halsband-lådan, vilket är OK. Men sanity-bortfallet (-15 till -25) är mycket tungt för en spelare som ännu inte vet något om hundarna. **Förslag**: differentiera sanity-bortfall baserat på `vet_om_signe`/`sett_gruppfoto`. (Mer en design-fråga än prosa.)

---

## Topp-5 typer av fel

1. **Påhittade/felstavade ord**: "myrtrösktreck", "gnisterkristaller", "kraqulérat", "rost i telefon"
2. **Grammatisk genus-mismatch**: "Falurött plåt" (utrum-substantiv med neutrum-adjektiv) — 2 förekomster
3. **Voice-guide-brott**: "plötsligt" (förbjudet), "avgrundigt" (Lovecraft-aktigt adverb)
4. **POWER-ON-tillstånd**: alla in-house-scener hade bara dark-mode-prosa, inget när elen kommer tillbaka
5. **Lysknappen-buggen**: detalj i fel scen (scen-100 istället för scen-011)

---

## Öppna frågor

1. **POWER-ON-rendering**: kommentaren `<!-- POWER-ON: ... -->` är pragmatisk men ingen frontend-implementation finns ännu. Vill project-lead att vi använder YAML-frontmatter `prose_power_on:` istället? Annars: ska vi använda samma format för andra state-conditional-prose (t.ex. `<!-- IF vet_om_bertil: ... -->`)?

2. **scen-009 / scen-020**: ska copywriter skriva dessa innan vi går vidare, eller är de planerade för senare?

3. **scen-024 trigger-fix**: kräver scene-map-update och eventuell scen-104/105-extension. Vem äger det?

4. **Sanity-differentiering i scen-021**: pure design-fråga — låter vi vinds-tinget vara samma scen för alla, eller renderas det olika baserat på prior knowledge?
