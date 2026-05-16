---
scene_id: 033
title: "The Voices"
language: en
act: 3
type: G
triggers: [scene-032]
exits: [scene-034, scene-035]
sanity_delta: -5
flags_set: [grå_riktning]
flags_read: [bär_halsband, läst_namn]
---

It is not that you hear the voices. It is that the voices are.

One is your own. It is saying your name. You have never heard yourself say your name into a room with no one.

One is your mother. It says nothing. It takes a breath in. It takes another.

One is high and thin and comes from far off and sounds like a dog that was called Signe. You heard the sixth Signe's voice in the attic. This one is not the sixth. This one is another.

One is a man. You think at first it is Leopold. It is reciting a verse. It is not Leopold.

One is a woman you have never heard. It is not thin. It is firm. It says: *We have been waiting.*

You stand where you stand.

You do not see the voices. You see only grey. But you know they are at different bearings. The mother's voice is in the direction you think you came in. The unknown woman's voice is in the opposite direction. Signe is somewhere nearer than the others.

You can call. You can stand.

## Choices

- **['Alice!']**
  You call. It is your one name for the one thing you came here for. The voice you let out does not vanish. It hangs. You hear it hang. → scene-035 *(sets `grå_riktning=alice_först`)*

- **['Leopold!']**
  You call. It is her husband's name. The grey does not make room for it, but the grey takes it. → scene-035 *(sets `grå_riktning=leopold_först`)*

- **['Signe!']** *(requires `bär_halsband != none` or `läst_namn=true`)*
  You call. You say the number too, low: *Signe six.* The high voice goes quiet. Then it begins again. → scene-035 *(sets `grå_riktning=signe_först`, `vinds_tinget+1`)*

- **['Who are you?']**
  You say it in the direction where the woman stands. You say it without raising your voice. She waits a second. Then she says: *Come.* → scene-034 *(sets `grå_riktning=ingegerd_först`)*

- **[Silence]**
  You say nothing. You stand. You stand. You stand. The grey counts you among its own. → scene-035 *(sets `grå_riktning=tyst`, `det_grå+1`, `sanity -1`)*
