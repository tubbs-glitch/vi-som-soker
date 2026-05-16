# Story Engine

Rent TypeScript-bibliotek som driver "Mosters Hemligheter". **Inga React-imports.**
Detta är datakontraktet — iOS-versionen ska implementera samma publika API i Swift
så att webb och iOS kan dela samma scen-filer och samma state-format.

Källa till sanning för datamodellen är `/docs/data-model.md`. Denna mapp är
implementationen av §2 (TypeScript-interfaces) och §4 (Core API).

---

## Innehåll

| Fil          | Innehåll |
|--------------|----------|
| `types.ts`   | Alla TypeScript-interfaces. Implementerar §2 från data-model.md. |
| `items.ts`   | Item-katalog (namn, taggar, förbruknings-flaggor). Källa: state-flags.md §2. |
| `state.ts`   | `createInitialState`, `applyChoice`, `canChoose`, `visibleChoices`, härledda värden, serialisering. |
| `parser.ts`  | `parseScene(md, fallbackId)` — markdown m. YAML frontmatter → `Scene`. |
| `loader.ts`  | `loadSceneServer` (Node, RSC) och `loadSceneClient` (fetch). |
| `index.ts`   | Publikt re-export. |

---

## Publikt API

```ts
import {
  createInitialState,
  applyChoice,
  canChoose,
  visibleChoices,
  hasTag,
  tagCount,
  isPrepared,
  sanityLabel,
  sanityIsHigh,
  serializeState,
  deserializeState,
  parseScene,
  loadSceneServer,
  loadSceneClient,
} from "@/lib/story-engine";
```

### Skapa state

```ts
const state = createInitialState();                    // default-karaktär, tom inventory, sv
const state = createInitialState(char, ["ficklampa"]); // efter char creation + packning
```

### Evaluera val

```ts
const result = canChoose(choice, state);
// → { allowed: true } eller { allowed: false, reason: "saknar skarpt" }

const playable = visibleChoices(scene, state); // bara de val som är tillåtna
```

### Applicera val

```ts
const next = applyChoice(choice, state);
// Pure: state är oförändrat. next har applicerade consequences,
// uppdaterad current_scene, och en post i meta.choices_log.
```

### Härledda värden (JIT)

```ts
hasTag(state, "ljus")          // boolean
tagCount(state, "frekvens")    // number
isPrepared(state)              // komfort ∧ vård
sanityLabel(state)             // "fokuserad" | "skakad" | …
sanityIsHigh(state)            // ≥ 70
```

### Persistens

```ts
localStorage.setItem("mosters-hemligheter:state", serializeState(state));
const loaded = deserializeState(localStorage.getItem("…") ?? "{}");
```

### Scen-laddning

```ts
// Server / RSC:
const scene = await loadSceneServer("scene-001", "sv");

// Client:
const scene = await loadSceneClient("scene-001", "sv");
```

---

## Scen-format

Markdown-fil per scen och språk: `scene-001.sv.md`, `scene-001.en.md`.

```markdown
---
scene_id: 001
title: "Samtalet"
language: sv
act: 1
type: BN
triggers: [start]
exits: [scene-002]
sanity_delta: 0
flags_set: []
flags_read: []
---

<prosa-text i obegränsat antal stycken>

## Val   (eller "## Choices" för en)

- **[Val-texten som spelaren ser]** → scene-002
- **[Annat val]** → scene-005
```

### Val-rader

V0.1 stödjer enkel form:

```
- **[Visad text]** → scene-NNN
```

Lös form utan fetstil accepteras också:

```
- [Visad text] → scene-NNN
```

### Planerad utökning (ej i v0.1)

Inline-metadata på val-rader för att uttrycka `requires` och `consequences` direkt
i markdown. Förslag:

```
- **[Lys på det]** → scene-021a  {requires: tags=ljus}  {sanity-=5}
```

Tills detta är specat hanteras requires/consequences i en sidordnad JSON eller
direkt i koden (`scenes/scene-021.choices.ts` eller liknande).

---

## Designregler

1. **Inget UI-state här.** Bara spellogik och data.
2. **Allt är pure.** `applyChoice(c, s)` returnerar nytt state — muterar inte.
3. **JSON-serialiserbart.** Inga klasser, inga `Date`-objekt direkt (använd `number` timestamps).
4. **Versioning.** `GameState.version: 1`. Vid breaking change: bump + `migrateState`.
5. **iOS-paritet.** Lägg INTE till features som är svåra att portera (decorators,
   complex generics). Hellre verbost än smart.

---

## Skillnad mot iOS-versionen (förväntad)

| Aspekt         | Web (här)                       | iOS (kommande)             |
|----------------|---------------------------------|----------------------------|
| Språk          | TypeScript                       | Swift                      |
| Persistens     | localStorage                     | UserDefaults / SwiftData   |
| Scen-laddning  | fs + fetch                       | Bundle.main.url(forResource:) |
| Reactivity     | Zustand store ovanpå biblioteket | `@Observable` / Combine    |
| Markdown-parse | gray-matter                      | YAMS + egen split          |

API-namn och state-strukturer ska vara identiska. Om något måste avvika
i Swift, dokumentera i ett `iOS-NOTES.md` i parallellprojektet.

---

## Test-strategi (planerad)

QA-test-paths (`test_path_a`-`d`) från state-flags.md §9 ska implementeras som
integration-tester som driver hela spelet via en scripted choice-array.
Inte byggt i v0.1 — endast typer och pure functions finns.
