// Item-katalog. Källa: docs/state-flags.md §2 + docs/data-model.md §2.5.
// Förändringar här måste synkas med iOS-versionen.

import type { Item, ItemId, Tag } from "./types";

const TAGS: Record<ItemId, Tag[]> = {
  ficklampa: ["ljus", "verktyg"],
  jaktkniv: ["skarpt", "vapen", "arv"],
  kassettbandspelare: ["frekvens", "ljud", "tung"],
  mobilladdare: ["kommunikation"],
  första_hjälpen: ["vård"],
  varma_kläder: ["komfort"],
  extra_batterier: ["frekvens", "verktyg"],
  tjärsten: ["ritual", "helig"],
  vinds_mat: ["mat"],
  halsband_sjätte: ["signe"],
  halsband_sjunde: ["signe", "arv"],
  halsband_attonde: ["signe", "sallskap", "arv", "helig"],
  lab_anteckningar: ["kunskap"],
  alice_dagbok: ["kunskap", "intim"],
  alice_pärm: ["kunskap", "ritual"],
  mejerinyckel: ["verktyg", "sallskap"],
  astrids_pärm: ["kunskap", "sallskap"],
  bertils_brev: ["kunskap", "sallskap", "intim"],
  lapp_till_gunnar: ["sallskap", "intim"],
  ritualprotokoll: ["kunskap", "sallskap", "ritual"],
  gruppfoto_1981: ["kunskap"],
  gravstensskiss: ["kunskap"],
  yxa: ["skarpt", "vapen", "tung"],
  blå_emaljmugg: ["arv", "intim"],
};

const NAMES: Record<ItemId, string> = {
  ficklampa: "Ficklampa",
  jaktkniv: "Jaktkniv",
  kassettbandspelare: "Kassettbandspelare",
  mobilladdare: "Mobilladdare",
  första_hjälpen: "Första-hjälpen-kit",
  varma_kläder: "Varma kläder",
  extra_batterier: "Extra batterier",
  tjärsten: "Tjärsten",
  vinds_mat: "Matrester",
  halsband_sjätte: "Sjätte halsbandet",
  halsband_sjunde: "Sjunde halsbandet",
  halsband_attonde: "Åttonde halsbandet",
  lab_anteckningar: "Lab-anteckningar",
  alice_dagbok: "Alices dagbok",
  alice_pärm: "Alices pärm",
  mejerinyckel: "Mejerinyckel",
  astrids_pärm: "Astrids pärm",
  bertils_brev: "Bertils brev",
  lapp_till_gunnar: "Lapp till Gunnar",
  ritualprotokoll: "Ritualprotokoll",
  gruppfoto_1981: "Gruppfoto 1981",
  gravstensskiss: "Gravstensskiss",
  yxa: "Yxa",
  blå_emaljmugg: "Blå emaljmugg",
};

const DESCRIPTIONS: Partial<Record<ItemId, string>> = {
  ficklampa: "Du har använt den när elen gått.",
  jaktkniv: "Du tog över den när han dog. Du har aldrig använt den.",
  kassettbandspelare: "Den fungerar fortfarande. Du har inte använt den på år.",
  mobilladdare: "Standard. Du tar alltid med den.",
  första_hjälpen: "Olämpligt liten, men finns.",
  varma_kläder: "Du minns att Hällmyren är norr.",
  extra_batterier: "AA. Du vet inte varför du har så många.",
};

const CONSUMABLE: Partial<Record<ItemId, boolean>> = {
  extra_batterier: true,
  första_hjälpen: true,
  tjärsten: true,
  vinds_mat: true,
  lapp_till_gunnar: true,
};

const USES: Partial<Record<ItemId, number>> = {
  extra_batterier: 3,
  första_hjälpen: 1,
  tjärsten: 1,
  vinds_mat: 1,
  lapp_till_gunnar: 1,
};

/** Bygg en `Item` från ett `ItemId`. Källa till sanning för item-data. */
export function makeItem(id: ItemId): Item {
  const item: Item = {
    id,
    name: NAMES[id] ?? id,
    description: DESCRIPTIONS[id] ?? "",
    tags: TAGS[id] ?? [],
    consumable: CONSUMABLE[id] ?? false,
  };
  if (USES[id] !== undefined) {
    item.uses_remaining = USES[id];
  }
  return item;
}

export const ALL_ITEM_IDS: ItemId[] = Object.keys(NAMES) as ItemId[];
