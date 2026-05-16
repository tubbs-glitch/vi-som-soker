---
scene_id: 036
title: "Att hitta Alice"
language: sv
act: 3
type: G
triggers: [scene-035]
exits: [scene-037]
sanity_delta: -10
flags_set: [alice_med, alice_övertygad_med]
flags_read: [förstår_alice, vet_om_bertil, besokt_myrgraven, vet_om_sallskapet, talat_med_ingegerd, talat_om_bertil_med_leopold, brutit_in_i_mejeri, vinds_tinget_status]
---

Hon står med ryggen mot det.

Du ser henne innan du ser det. Hon är liten. Hon var aldrig stor — du minns att hon nådde dig till bröstet — men hon är liten på ett annat sätt här. Hon har en kofta du minns från ett gammalt foto. Hon har skor på sig. Det är det enda i den grå dimensionen som har skor.

Hon vänder huvudet. Hon ler.

*Du kom*, säger hon. *Jag visste att du skulle komma. Jag väntade.*

Bakom henne är det. Du ska inte titta på det än. Du ska titta på henne.

*Hon känner igen dig*, säger en röst i ditt huvud som inte är din. *Men hon är inte säker.*

Du har Leopold bredvid dig. Han ser på Alice. Han ser inte på det bakom henne. Alice ser på Leopold. Hon säger ingenting på en stund. Sedan säger hon:

*Du är trött, älskling. Sätt dig.*

Han sätter sig inte.

Hon vänder sig till dig.

*Jag stannar*, säger hon. *Du tar honom hem. Jag stannar tills jag förstår.*

## Val

- **["Det finns inget att förstå. Du kommer hem."]**
  Du säger det rakt. Hon ser på dig som om hon ser på ett barn. → fortsätt *(sätter `alice+0`)*

- **["Mamma vet att jag är här. Hon väntar."]** *(kräver `mamma_vet=true`)*
  Hon stannar i orden. *Inger.* Hon säger din mammas namn som om hon inte sagt det på flera år. → fortsätt *(sätter `alice+1`, `alice_övertygad_med=mamma`)*

- **["Leopold gick efter dig. Han gick i sju år. Han kan inte gå tillbaka utan dig."]**
  Hon ser på Leopold. Hon ser på dig. *Han gick inte i sju år. Han gick i en eftermiddag och jag tog inte upp luren.* → fortsätt *(sätter `alice+2`, `alice_övertygad_med=leopold`, `leopold+1`)*

- **["Jag har varit i mejeriet. Jag har läst Astrid."]** *(kräver `vet_om_sallskapet=true`)*
  Hon stannar. *Du borde inte. Hon var inte din. Hon var min.* → fortsätt *(sätter `alice-1`, `alice_övertygad_med=sallskap`)*

- **["Jag har varit vid Bertils sten."]** *(kräver `besokt_myrgraven=true` eller `talat_om_bertil_med_leopold=true`)*
  Hon andas in. Hon andas in en gång till. *Då vet du*, säger hon. *Då vet du också att jag inte kan komma hem och vara den jag var, eftersom jag aldrig var den jag var.* Hon säger det utan att gråta. → fortsätt *(sätter `alice+2`, `alice_övertygad_med=bertil`, `bertil_eko+1`)*

- **["Ingegerd bad mig komma."]** *(kräver `talat_med_ingegerd=true`)*
  Alice vänder huvudet helt. Hon stirrar förbi dig. Hon säger: *Hon talar fortfarande.* Sedan säger hon: *Då måste jag.* → fortsätt *(sätter `alice+3`, `alice_övertygad_med=ingegerd`, `ingegerd_eko+1`)*

- **["Signe väntar."]** *(kräver `vinds_tinget_status=matat`)*
  Hon andas in genom näsan, en lång inandning. Hon säger: *Var snäll mot henne.* Hon tar ett steg från det. → fortsätt *(sätter `alice+2`, `alice_övertygad_med=signe`, `vinds_tinget+1`)*

- **["Du tog dig in i mejeriet med våld."]** *(triggas av `brutit_in_i_mejeri=true`)*
  Hon säger det. Du säger inget. Hon ler. *Du har redan beslutat dig, då. Det är bra.* → fortsätt *(sätter `alice-2`)*

---

Hon ser på dig länge.

Sedan säger hon: *Bra. Jag följer med.*

Hon säger det utan att vara säker på att det är sant. Hon säger det för att hon vet att det är vad du behöver höra.

## Val

**[Vänd dig mot Det grå]** → scene-037 *(sätter `alice_med=true`, `sanity -3`)*
