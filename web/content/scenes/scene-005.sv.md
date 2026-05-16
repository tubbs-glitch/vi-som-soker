---
scene_id: 005
title: "Macken i Sveg"
language: sv
act: 1
type: G
triggers: [scene-004]
exits: [scene-006]
sanity_delta: 0
flags_set: [vet_om_per_magnus, vet_om_sallskapet_rykte]
flags_read: []
---

Macken ligger i utkanten av Sveg där väg 504 viker av mot Lillhärdal. Två pumpar, ett tak av korrugerad plåt, en luftpump som inte fungerar längre. Inne i kiosken sitter en tonåring och tittar på mobil.

Du tankar långsamt. Slangen rinner försiktigt. Du står med handen om pistolen och tittar på vägen mot nordväst. Vägen försvinner mellan två kullar, och sedan finns det inget mer att se.

Vid den andra pumpen står en äldre man och tankar en gammal Volvo 245. Han är klädd för att vara ute hela dagen — keps, en blå arbetsjacka som varit blå i tjugo år. Han har inte tittat på dig.

Han tittar nu. Långt. Som om han känner igen ett ansiktsdrag och försöker plocka isär det.

"Du är Alices", säger han till slut. Inte en fråga. "Hon har visat kort. För länge sen, men man minns sånt."

Du säger ja.

Han nickar mot vägskylten bakom dig. "Är du på väg upp mot Hällmyren?"

Du säger att du är.

Han står tyst i flera sekunder. Pistolen i hans pump klickar — tanken är full — men han tar inte ut den.

## Val

- **[Prata med honom. Han har något.]**
  "Hade en släkting i den där grejen på sjuttiotalet", säger han. Han säger inte vilken grej. Han letar i innerfickan, tar fram ett kvitto och en penna, skriver ett telefonnummer på baksidan. "Per-Magnus Berg. Han bor på Brovaktarns vårdboende i Östersund. Han svarar inte alltid men ibland gör han det." Han räcker dig lappen utan att möta din blick. "Säg ingenting till Gunnar om att jag gav den till dig." → scene-006 *(sätter `vet_om_per_magnus=true`, `vet_om_sallskapet_rykte=true`)*

- **[Korta svar. Du har inte tid med en samtalsglad gubbe.]**
  Du säger att du ska besöka släkt. Han nickar. Han tittar bort. Innan han kör har han lagt ett kvitto under din vindrutetorkare. Du läser det när han är borta — ett telefonnummer, ett namn, "Brovaktarns vårdboende, Östersund". Han har inte skrivit varför. → scene-006 *(sätter `vet_om_per_magnus=true`)*

- **[Säg ingenting alls. Betala och kör.]**
  Du går in och betalar med kort. Tonåringen säger inget. När du kommer ut är gubben borta. Det är inget kvitto på din vindruta. → scene-006
