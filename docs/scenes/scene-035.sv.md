---
scene_id: 035
title: "Att hitta Leopold"
language: sv
act: 3
type: G
triggers: [scene-033, scene-034]
exits: [scene-036]
sanity_delta: -8
flags_set: [leopold_med, talat_om_bertil_med_leopold]
flags_read: [vet_om_bertil]
---

Han sitter.

Det är det första du ser. Han sitter på ingenting. Knäna är lite uppdragna, händerna lagda över knäna med insidorna nedåt — som om han värmer dem mot en eld du inte ser. Han är yngre än du minns. Han är också äldre. Han har bara sju år av sjuttio och de sju är inte vad du tänkt dig att sju år gör med ett ansikte.

Han ser upp.

Han säger inte ditt namn.

Han säger ingenting på en stund. Sedan säger han: *Är det du.* Det är inte en fråga. Det är en sak han ger sig själv tillåtelse att säga.

Bredvid honom — du ser det inte direkt — sitter en man. Han är vänd bort. Han är klädd i något som hade varit en tweedkavaj 1979. Han ser inte på Leopold. Han ser inte på dig. Han andas. Leopold ser inte ut att se honom.

Leopold säger:

*Jag tror jag har glömt orden för mycket. Jag hör dem inte i mig själv längre. Jag vet att jag hade orden en gång.*

Han håller fram en hand. Han har inte stigit upp. Han ber dig komma till honom, inte tvärtom.

## Val

- **[Omfamna]**
  Du går fram. Du sätter dig på huk. Du tar runt honom. Han är inte kall och inte varm. Han lägger huvudet mot din axel. Han säger ingenting. Han säger ingenting länge. → scene-036 *(sätter `leopold_med=true`, `leopold+2`, `sanity -3`)*

- **[Sträck ut handen och hjälp honom upp]**
  Du tar hans hand. Han reser sig långsamt. Han står på samma sätt som han satt — som om kroppen inte var säker på vilket håll som är upp och bestämmer sig efter ditt grepp. → scene-036 *(sätter `leopold_med=true`, `sanity -1`)*

- **[Tala först. Fråga honom om Bertil]** *(kräver `vet_om_bertil=true`)*
  Du sätter dig på huk framför honom. Du säger: *Jag vet om Bertil.* Mannen bredvid honom — den du sett först nu — vänder huvudet en aning. Inte mot dig. Bara en aning. Leopold andas in. Han säger: *Jag bar honom i tre dagar innan vi bestämde oss att inte berätta för någon. Jag bar honom i fyrtiosex år efter det.* Han ser upp på dig. *Tack.* → scene-036 *(sätter `leopold_med=true`, `talat_om_bertil_med_leopold=true`, `leopold+3`, `bertil_eko+1`, `sanity -5`)*

- **[Säg ingenting. Bara stå.]**
  Du står. Han ser upp på dig. Han ser ner. Efter en stund reser han sig själv. Han kommer inte hela vägen upp. Du tar hans armbåge. → scene-036 *(sätter `leopold_med=true`, `sanity -2`)*
