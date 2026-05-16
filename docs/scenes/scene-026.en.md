---
scene_id: 026
title: "The Wooden Chest"
language: en
act: 2
type: G
triggers: [scene-024]
exits: [scene-024]
sanity_delta: -15
flags_set: [vet_om_bertil, bär_attonde_halsband, har_lapp_till_gunnar]
flags_read: [vet_om_trälårs_kod]
---

The chest stands in the corner. Wood, the grain dark under the dust. Three brass fittings on the front, each with four number wheels. The lid is not large. The chest is not large. It is the kind of chest one rests feet on, or a child.

You crouch. You wipe the dust away with your hand. On the lid the initials *vss* — set in lower case, in pencil, traced twice so they show. *vi som söker.*

You set the wheels.

## Choices

- **[Set 1979-06-23]** *(requires `vet_om_trälårs_kod=true`)*
  Three rows: 19, 06, 23. The last wheels click into place without resistance. A brass tongue drops. You lift the lid. → continue

- **[Try to force it]**
  You pull the lid. You try the knife in the seam if you have one. The wood does not give. The fittings do not give. The chest can take more than you can. → back

- **[Leave the chest]**
  You stand up. You walk out. → back

---

*(If you opened it:)*

Inside the chest lies paper. And beneath the paper, wrapped in an old handkerchief: a brown leather collar with a brass tag.

You take up the tag. *Tora 1972–1979. Dog.* You read it twice.

It is the eighth collar. There are seven hooks in the hall and seven collars in the box in the guest room. This is a collar nobody has spoken of.

You read the papers.

The first is a letter. Typed on an old Halda, dated 12th April 1979. *Dear Helene. It is two years since you left. I have not written in two years and you have not written in two years. I know I should not be waiting for a letter. But I wanted to tell you that Tora died yesterday and that I have buried her under the rowan by the bridge. She lay beside me on the Friday evening. She lay beside me on the Saturday morning. It was all I asked for. Yours, Bertil.*

The second is a drawing. A gravestone on the bog, 600 metres out, at a stand of birches. The text on the stone: *Bertil Lindblom, 1935 — Midsummer 1979.* No exact date. No flowers. Only the one line.

The third is an envelope. It is not opened. Addressed on the same machine: *To my son Gunnar — only when I am gone. /O.*

You crouch. You have another uncle. You have had him your whole life without knowing. You have an uncle no one has spoken of since 1979 and who lies somewhere in a bog six hundred metres out.

You put the papers back. Or you do not.

## Choices

- **[Take the collar, the letter, and the note to Gunnar]**
  You put the collar in your inner pocket. You fold the letter and slip it in. You take the envelope carefully — as if the paper would break from being held. → back *(sets `vet_om_bertil=true`, `bär_attonde_halsband=true`, `har_lapp_till_gunnar=true`, `sanity -10`)*

- **[Take only the collar and the letter]**
  The envelope stays. It is not yours. It is for Gunnar, and it has waited for him in a locked chest for fifty-four years. You cannot carry it out. → back *(sets `vet_om_bertil=true`, `bär_attonde_halsband=true`, `sanity -8`)*

- **[Read everything, take nothing]**
  You read. You put it all back exactly where it lay. You close the lid. You spin the wheels off the code. You have seen. That is enough. → back *(sets `vet_om_bertil=true`, `sanity -3`)*
