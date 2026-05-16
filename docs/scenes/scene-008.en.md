---
scene_id: 008
title: "Gunnar on the Step"
language: en
act: 1
type: G
triggers: [scene-007]
exits: [scene-010, scene-009]
sanity_delta: 0
flags_set: [gunnar_tillit, vet_om_olov, gunnar_först_möte_klart, gunnar_vet_om_leopold, gunnar_vet_om_hundarna, gunnar_obekväm]
flags_read: [vet_om_per_magnus]
---

He is sitting on the step when you come closer. You did not hear him arrive. His car is not here — he has walked from his cottage.

Gunnar Sandgren has aged since the picture you have of him. Sixty-four, a worn leather jacket too warm for the evening but on him all the same, trousers with soil at the knees. Forty years a forester. Retired for a few of those years now.

He stands as you come within five metres. He puts out his hand.

'You're taller than I remembered,' he says.

You take his hand. It is dry and large and hard. He holds it longer than an ordinary handshake. Then he lets go.

'The key is where it always is,' he says. He nods at the step. 'Under the slab. She does not move it.'

He looks toward the windows. 'It's dark in there. The storm took the power in the whole valley. She hasn't had it back.'

He moves to the side of the steps and leans against one of the posts. The gnats do not bother with him. He made his peace with them long ago.

'You'd best go in,' he says. He does not move.

You stand with the key in your pocket, not yet drawn. You think you have questions, and you think three is what you can manage tonight.

## Choices

*(Ask up to 3 questions.)*

- **[When did you see her last?]**
  'Wednesday before this one,' he says. 'She walked past the gate at half ten. She waved. Then nothing.' → back *(`gunnar_tillit+1`)*

- **[Did you hear anything in the storm?]**
  He takes his time. 'The lightning struck somewhere. The power went. I heard — something — but I thought it was the lightning.' → back *(`gunnar_tillit+1`)*

- **[Anything about Leopold?]**
  He looks away. 'He's been gone seven years. You know that.' He says no more. → back *(`gunnar_vet_om_leopold=true`)*

- **[What about the dogs?]**
  'They were everything to her,' he says. 'Seven of them. She cried at every grave. She didn't cry much otherwise.' → back *(`gunnar_vet_om_hundarna=true`, `gunnar_tillit+1`)*

- **[Should I call you?]**
  He nods. 'The number's on a slip in the kitchen. Hers.' → back *(`gunnar_tillit+2`)*

- **[Did your father know what they were up to?]**
  He looks at you a second too long. 'My father drove for them. In the seventies. With the forestry tractor. He never spoke of it. Not to me.' He stops. 'I haven't thought about it before. I've arranged not to.' → back *(sets `vet_om_olov=true`, `gunnar_tillit-1`)*

- **[Hard questions in a row — if you have already asked two and push for a third heavy one]**
  He does not smile. 'We've no time for this on the step,' he says. 'Go in.' *(sets `gunnar_obekväm=true`)*

---

**[Go in now — past him, to the door]** → *(if `vet_om_per_magnus=true`)* scene-009, otherwise scene-010
