---
scene_id: 043
title: "Ending 4 — The Silence"
language: en
act: 3
type: E
triggers: [scene-038]
exits: [scene-044]
sanity_delta: 0
flags_set: [ending]
flags_read: [vet_om_bertil, mamma_vet]
---

You are not standing in the cellar.

You are standing where you stand.

It went quiet.

It went quiet before the echo thinned. It went quiet while you still had a hand on Alice's shoulder. You still have it there. But she is not there.

It is grey.

It is not dark.

---

*Six months later. Hällmyren. The kitchen.*

Your mother is at the draining board. She has a coffee cup. She has not drunk from it. She has forgotten that she is holding it.

She has been here a week.

She has gone through the house. She has counted the collars. She has read the calendar. She has not known what to do with Alice's diary so she has put it back. She has not found you and she has not found Alice and she has not found Leopold.

She will not find you.

---

*(If `vet_om_bertil=true`:)*

She walks out to the dairy. She tries the door. It is unlocked. Inside she finds the wooden chest. It is open. The letter lies where you left it. She reads.

She does not understand all of it. She understands one thing. She had a brother called Bertil. She had never known. Her own sister had never said.

She rings the police from Gunnar's landline. She says: *My brother went missing in the summer of 1979.* The officer takes it down. He asks about evidence. She gives him the letter.

She says nothing about you. She says nothing about her sister. She says nothing about Leopold. She has one thing to be able to understand, and it is that there was a brother.

That is what she chooses.

---

*(If `vet_om_bertil=false`:)*

She rings the police from Gunnar's landline. She says: *My sister and I.*

She says nothing more for a moment.

The officer waits.

She hangs up.

---

It is light that night. It is Midsummer again. It does not get dark.

She does not turn the lamp off.

It does not help.

## Choices

**[On]** → scene-044 *(sets `ending=slut_4`)*
