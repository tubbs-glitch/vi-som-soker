// Scen-id → bild i /public/images.
// Vid behov av nya bilder, generera via .claude/skills/gemini-imagegen
// och placera under web/public/images, sedan lägg in i denna mappning.

export const SCENE_IMAGES: Record<
  string,
  { src: string; alt_sv: string; alt_en: string }
> = {
  "scene-001": {
    src: "/images/scene-001-table.png",
    alt_sv: "Ett köksbord en sen junikväll. Glas, almanacka, faktura.",
    alt_en: "A kitchen table on a late June evening. Glass, diary, invoice.",
  },
  "scene-005": {
    src: "/images/scene-005-mack.png",
    alt_sv: "En mack i Sveg. En äldre man vid en Volvo.",
    alt_en: "A petrol station in Sveg. An elderly man beside a Volvo.",
  },
  "scene-006": {
    src: "/images/scene-006-road.png",
    alt_sv: "En grusväg in i skogen. En lichenklädd vägvisare.",
    alt_en: "A gravel road into the forest. A lichen-covered sign.",
  },
  "scene-007": {
    src: "/images/hero-hallmyren.png",
    alt_sv:
      "Mosters faluröda sätesgård i Hällmyren. Midnattssolens bleka klarhet.",
    alt_en: "Your aunt's red farmhouse at Hällmyren. The pale midnight sun.",
  },
  // Akt II
  "scene-011": {
    src: "/images/scene-011-hallen.png",
    alt_sv:
      "Hallen. Sju krokar för koppel — en är tom. En blå emaljmugg.",
    alt_en:
      "The hall. Seven hooks for leashes — one is empty. A blue enamel mug.",
  },
  "scene-012": {
    src: "/images/scene-009-livingroom.png",
    alt_sv:
      "Vardagsrummet. Kakelugn, sju hundfoton i rad, en skivspelare som inte snurrar.",
    alt_en:
      "The living room. A tiled stove, seven dog portraits in a row, a turntable that does not turn.",
  },
  "scene-013": {
    src: "/images/scene-012-kitchen.png",
    alt_sv: "Köket. En stol indragen halvvägs. En kopp med film på ytan.",
    alt_en: "The kitchen. A chair half-pulled out. A cup with film on its surface.",
  },
  "scene-014": {
    src: "/images/scene-010-arbetsrum.png",
    alt_sv:
      "Leopolds arbetsrum. Anteckningar, oscilloskop, en vinyl på skivspelaren.",
    alt_en:
      "Leopold's workroom. Notebooks, an oscilloscope, a vinyl on the turntable.",
  },
  "scene-017": {
    src: "/images/scene-017-sovrum.png",
    alt_sv:
      "Alices sovrum. Bädden orörd. En uppslagen dagbok på kudden.",
    alt_en:
      "Alice's bedroom. The bed untouched. An open diary on the pillow.",
  },
  "scene-018": {
    src: "/images/scene-011-sju-signe.png",
    alt_sv: "Sju inramade hundporträtt i lodrätt rad. Alla heter Signe.",
    alt_en: "Seven framed dog portraits in a vertical row. All named Signe.",
  },
  "scene-021": {
    src: "/images/scene-014-vinden.png",
    alt_sv: "Vinden. Repor i golvbrädorna som inte verkar gjorda av hund.",
    alt_en: "The attic. Scratches in the floorboards that do not seem dog-made.",
  },
  "scene-022": {
    src: "/images/scene-022-kallaren.png",
    alt_sv:
      "Källaren. En cirkel av grovt salt på stengolvet. En skivspelare.",
    alt_en:
      "The cellar. A circle of coarse salt on the stone floor. A turntable.",
  },
  "scene-024": {
    src: "/images/scene-024-mejeriet.png",
    alt_sv: "Mejeribyggnaden. Sex stolar runt ett bord. Damm i ljuset.",
    alt_en: "The old dairy. Six chairs around a table. Dust in the light.",
  },
  // Tomt-scenerna (storm + skjul + träd)
  "scene-100": {
    src: "/images/scene-100-tomten.png",
    alt_sv: "Tomten. Tre rönnar. Sju små gravstenar vid foten.",
    alt_en: "The yard. Three rowans. Seven small grave markers at the base.",
  },
  "scene-101": {
    src: "/images/scene-101-fallet-trad.png",
    alt_sv: "En gran fallen över elledningen. Kabeln hänger ner.",
    alt_en: "A pine fallen across the power line. The cable hangs down.",
  },
  "scene-102": {
    src: "/images/scene-102-skjulet.png",
    alt_sv: "Skjulets dörr står på glänt. Något skrapar inifrån.",
    alt_en: "The shed door stands ajar. Something scratches inside.",
  },
  "scene-103": {
    src: "/images/scene-103-ugglan.png",
    alt_sv: "En stor uggla på balken. Vingarna halvt resta.",
    alt_en: "A great owl on the beam. Its wings half-raised.",
  },
  "scene-104": {
    src: "/images/scene-104-verktygen.png",
    alt_sv: "Verktygen hänger på väggen. Yxa, såg, handskar.",
    alt_en: "The tools on the wall. Axe, saw, leather gloves.",
  },
  "scene-105": {
    src: "/images/scene-105-saga.png",
    alt_sv: "Sågen tar tag i barkens fukt. Sågdammet faller.",
    alt_en: "The saw bites into damp bark. Sawdust falls.",
  },
  "scene-028": {
    src: "/images/scene-028-strommen-pa.png",
    alt_sv: "En glödlampa tänds. Skivspelaren börjar snurra.",
    alt_en: "A bulb flickers on. The turntable begins to spin.",
  },
  // Akt II — slut & Akt III
  "scene-031": {
    src: "/images/scene-031-ritual.png",
    alt_sv: "Cirkeln av tjärsten på stengolvet. Skivspelaren mitt i.",
    alt_en: "A circle of tar-salt on the stone floor. The turntable at its centre.",
  },
  "scene-034": {
    src: "/images/scene-034-grayland.png",
    alt_sv: "Grått utan horisont. En figur går bort i mitten av ingenting.",
    alt_en: "Gray without horizon. A figure walks away in the middle of nothing.",
  },
  "scene-035": {
    src: "/images/scene-035-alice.png",
    alt_sv: "Alice sitter på en sten i det grå. Händerna i knät, handflatorna upp.",
    alt_en: "Alice sits on a stone in the gray. Hands in her lap, palms up.",
  },
  "scene-036": {
    src: "/images/scene-036-leopold.png",
    alt_sv: "Leopold står i tre kvarts profil. Han håller något osynligt.",
    alt_en: "Leopold stands in three-quarter profile. He holds something invisible.",
  },
  "scene-037": {
    src: "/images/scene-037-det-gra.png",
    alt_sv: "En figur som knappt är en figur. Grått i grått.",
    alt_en: "A figure that is barely a figure. Gray in gray.",
  },
  "scene-039": {
    src: "/images/scene-039-alla-hem.png",
    alt_sv: "Tre figurer går genom morgondiset mot det röda huset.",
    alt_en: "Three figures walking through morning mist toward the red house.",
  },
  "scene-043": {
    src: "/images/scene-043-tystnaden.png",
    alt_sv: "Ett tomt kök i gryningen. Stolen utdragen från bordet.",
    alt_en: "An empty kitchen at dawn. The chair pulled back from the table.",
  },
};

export function getSceneImage(sceneId: string) {
  return SCENE_IMAGES[sceneId];
}

export const COVER_IMAGE = {
  src: "/images/intro-sky.png",
  alt_sv:
    "En blek himmel sedd genom ett fönster. Klockan är efter midnatt och solen rör sig inte.",
  alt_en:
    "A pale sky seen through a window. It is past midnight and the sun does not move.",
};
