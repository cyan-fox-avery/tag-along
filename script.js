/* Tag, You're It — prototype v0.7.0
   Research -> plan (region/depth/bait) -> dive -> watch/tag -> collection book. */

"use strict";

/* Build number — shown in the top corner of the page. Bump every release. */
const VERSION = "v0.7.3";

/* ---------- SVG art: simplified, real proportions, few colours ---------- */

const ART = {
  thresher: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Thresher shark">
    <polygon points="150,50 210,6 172,56" fill="#5d7f9e"/>
    <polygon points="152,62 176,92 160,62" fill="#5d7f9e"/>
    <ellipse cx="96" cy="56" rx="60" ry="17" fill="#6f93b8"/>
    <ellipse cx="96" cy="63" rx="52" ry="10" fill="#dfe9f2" opacity="0.85"/>
    <polygon points="38,56 56,47 56,65" fill="#6f93b8"/>
    <polygon points="96,40 108,20 118,40" fill="#5d7f9e"/>
    <polygon points="82,70 70,90 94,71" fill="#5d7f9e"/>
    <circle cx="54" cy="52" r="3.6" fill="#1c2733"/>
    <circle cx="55.2" cy="50.8" r="1.1" fill="#ffffff"/>
    <g stroke="#4a6a86" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="48" x2="70" y2="62"/>
      <line x1="78" y1="47" x2="76" y2="63"/>
      <line x1="84" y1="47" x2="82" y2="63"/>
    </g>
  </svg>`,
  whale: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Whale shark">
    <polygon points="168,48 208,22 206,88" fill="#54687a"/>
    <ellipse cx="100" cy="55" rx="72" ry="25" fill="#5f7484"/>
    <ellipse cx="100" cy="66" rx="62" ry="14" fill="#cfd9e2" opacity="0.7"/>
    <polygon points="104,31 118,12 128,31" fill="#54687a"/>
    <polygon points="84,76 70,100 102,78" fill="#54687a"/>
    <circle cx="44" cy="50" r="3.2" fill="#1c2733"/>
    <path d="M28,62 Q40,70 54,68" stroke="#3c4c5c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <g fill="#ffffff" opacity="0.9">
      <circle cx="80" cy="44" r="2.6"/><circle cx="98" cy="40" r="2.6"/><circle cx="116" cy="43" r="2.6"/>
      <circle cx="134" cy="47" r="2.6"/><circle cx="70" cy="54" r="2.4"/><circle cx="90" cy="54" r="2.4"/>
      <circle cx="110" cy="56" r="2.4"/><circle cx="130" cy="58" r="2.4"/><circle cx="148" cy="56" r="2.2"/>
      <circle cx="82" cy="64" r="2.2"/><circle cx="104" cy="66" r="2.2"/><circle cx="126" cy="66" r="2.2"/>
    </g>
  </svg>`,
  nurse: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Nurse shark">
    <polygon points="160,54 200,36 198,84" fill="#7a6242"/>
    <ellipse cx="100" cy="60" rx="64" ry="19" fill="#8a6f4d"/>
    <ellipse cx="100" cy="68" rx="56" ry="11" fill="#d8c6a6" opacity="0.8"/>
    <polygon points="112,42 122,26 130,42" fill="#7a6242"/>
    <polygon points="142,43 150,30 156,43" fill="#7a6242"/>
    <polygon points="88,76 78,96 100,77" fill="#7a6242"/>
    <circle cx="52" cy="55" r="3.2" fill="#1c2733"/>
    <g stroke="#5e4a30" stroke-width="2" stroke-linecap="round">
      <line x1="40" y1="64" x2="33" y2="71"/>
      <line x1="40" y1="67" x2="33" y2="74"/>
    </g>
    <g stroke="#6e5739" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
    </g>
  </svg>`,
  goblin: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Goblin shark">
    <polygon points="158,50 198,28 196,82" fill="#c08484"/>
    <ellipse cx="106" cy="55" rx="56" ry="15" fill="#d99a9a"/>
    <ellipse cx="106" cy="61" rx="48" ry="9" fill="#f2d9d9" opacity="0.8"/>
    <polygon points="52,55 10,46 10,62" fill="#d99a9a"/>
    <polygon points="106,41 116,28 122,41" fill="#c08484"/>
    <polygon points="92,68 82,86 102,69" fill="#c08484"/>
    <circle cx="48" cy="50" r="3.2" fill="#1c2733"/>
    <path d="M30,60 Q44,66 56,64" stroke="#a86a6a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <g stroke="#a86a6a" stroke-width="1.4" stroke-linecap="round">
      <line x1="76" y1="48" x2="74" y2="60"/>
      <line x1="82" y1="47" x2="80" y2="61"/>
    </g>
  </svg>`,
  tiger: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Tiger shark">
    <polygon points="160,54 200,32 198,86" fill="#5a6a72"/>
    <ellipse cx="100" cy="58" rx="64" ry="20" fill="#6b7d85"/>
    <ellipse cx="100" cy="66" rx="56" ry="11" fill="#d3dce0" opacity="0.8"/>
    <polygon points="108,39 120,22 128,39" fill="#5a6a72"/>
    <polygon points="86,74 76,94 98,75" fill="#5a6a72"/>
    <circle cx="50" cy="53" r="3.2" fill="#1c2733"/>
    <circle cx="51.2" cy="51.8" r="1.1" fill="#ffffff"/>
    <g stroke="#4c5b63" stroke-width="3.4" opacity="0.5" stroke-linecap="round">
      <line x1="92" y1="42" x2="90" y2="72"/>
      <line x1="106" y1="40" x2="104" y2="74"/>
      <line x1="120" y1="42" x2="118" y2="72"/>
      <line x1="134" y1="46" x2="132" y2="68"/>
    </g>
  </svg>`,
  sandtiger: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Sand tiger shark">
    <polygon points="162,52 202,30 200,84" fill="#6e6250"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#7d6f5b"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#ddd2bd" opacity="0.8"/>
    <polygon points="110,41 120,24 128,41" fill="#6e6250"/>
    <polygon points="138,42 146,28 152,42" fill="#6e6250"/>
    <polygon points="88,72 78,92 100,73" fill="#6e6250"/>
    <polygon points="42,58 22,52 22,64" fill="#7d6f5b"/>
    <g stroke="#ece5d3" stroke-width="1.6" stroke-linecap="round">
      <line x1="29" y1="55" x2="25" y2="60"/>
      <line x1="33" y1="57" x2="29" y2="62"/>
    </g>
    <circle cx="52" cy="52" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="50.8" r="1.1" fill="#ffffff"/>
  </svg>`,
  galapagos: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Galapagos shark">
    <polygon points="158,54 200,34 198,84" fill="#5f6b66"/>
    <ellipse cx="100" cy="58" rx="64" ry="19" fill="#6e7b75"/>
    <ellipse cx="100" cy="66" rx="56" ry="11" fill="#d5dcd6" opacity="0.8"/>
    <polygon points="106,40 118,22 128,40" fill="#5f6b66"/>
    <polygon points="86,74 76,94 98,75" fill="#5f6b66"/>
    <polygon points="40,58 22,52 22,64" fill="#6e7b75"/>
    <circle cx="48" cy="53" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="51.8" r="1.1" fill="#ffffff"/>
  </svg>`,
  greatwhite: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Great white shark">
    <polygon points="160,54 204,30 200,88" fill="#5a6470"/>
    <ellipse cx="102" cy="56" rx="66" ry="20" fill="#6b7683"/>
    <ellipse cx="102" cy="65" rx="58" ry="12" fill="#eef1f3" opacity="0.9"/>
    <polygon points="110,37 124,16 132,37" fill="#5a6470"/>
    <polygon points="88,72 76,94 100,73" fill="#5a6470"/>
    <polygon points="40,56 22,50 22,62" fill="#6b7683"/>
    <circle cx="52" cy="51" r="3.4" fill="#14181d"/>
  </svg>`,
  hammerhead: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Great hammerhead shark">
    <polygon points="160,54 200,32 198,86" fill="#5e6a70"/>
    <ellipse cx="112" cy="58" rx="58" ry="18" fill="#6d7a81"/>
    <ellipse cx="112" cy="66" rx="50" ry="10" fill="#d8dee1" opacity="0.8"/>
    <rect x="18" y="48" width="56" height="16" rx="8" fill="#6d7a81"/>
    <circle cx="27" cy="56" r="2.6" fill="#1c2733"/>
    <circle cx="65" cy="56" r="2.6" fill="#1c2733"/>
    <polygon points="118,41 130,24 138,41" fill="#5e6a70"/>
    <polygon points="96,72 86,92 108,73" fill="#5e6a70"/>
  </svg>`,
  mako: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Shortfin mako shark">
    <polygon points="162,54 206,34 202,84" fill="#3f5a7a"/>
    <ellipse cx="104" cy="56" rx="64" ry="16" fill="#4a6a8c"/>
    <ellipse cx="104" cy="63" rx="56" ry="9" fill="#dbe4ee" opacity="0.85"/>
    <polygon points="110,41 122,24 130,41" fill="#3f5a7a"/>
    <polygon points="90,70 80,90 102,71" fill="#3f5a7a"/>
    <polygon points="42,56 24,50 24,62" fill="#4a6a8c"/>
    <circle cx="54" cy="51" r="3.2" fill="#14181d"/>
    <circle cx="55.2" cy="49.8" r="1.1" fill="#ffffff"/>
  </svg>`,
  basking: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Basking shark">
    <polygon points="170,54 206,36 204,84" fill="#5c5a52"/>
    <ellipse cx="104" cy="57" rx="70" ry="22" fill="#6b695f"/>
    <ellipse cx="104" cy="66" rx="60" ry="12" fill="#d9d5c8" opacity="0.7"/>
    <polygon points="112,36 124,18 132,36" fill="#5c5a52"/>
    <circle cx="56" cy="52" r="2.6" fill="#1c2733"/>
    <g stroke="#4a4840" stroke-width="2" stroke-linecap="round">
      <line x1="76" y1="44" x2="74" y2="68"/>
      <line x1="86" y1="43" x2="84" y2="69"/>
      <line x1="96" y1="43" x2="94" y2="69"/>
    </g>
  </svg>`,
  epaulette: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Epaulette shark">
    <polygon points="168,56 200,42 198,76" fill="#7a6a4e"/>
    <ellipse cx="108" cy="60" rx="58" ry="13" fill="#8a795c"/>
    <ellipse cx="108" cy="65" rx="50" ry="8" fill="#ded3b8" opacity="0.8"/>
    <polygon points="118,48 126,36 132,48" fill="#7a6a4e"/>
    <circle cx="62" cy="56" r="2.8" fill="#1c2733"/>
    <g fill="#4e4130" opacity="0.8">
      <circle cx="90" cy="56" r="3"/><circle cx="110" cy="58" r="3"/><circle cx="130" cy="57" r="3"/>
      <circle cx="150" cy="58" r="2.5"/>
    </g>
    <circle cx="140" cy="52" r="4" fill="none" stroke="#4e4130" stroke-width="2"/>
  </svg>`
};

/* ---------- Data ---------- */

const REGIONS = {
  "caribbean":    { name: "Caribbean Sea",        note: "A green sea turtle glides past the reef." },
  "baja":         { name: "Baja California",      note: "A school of sardines shimmers below." },
  "philippines":  { name: "Philippines",          note: "A manta ray loops lazily overhead." },
  "maldives":     { name: "Maldives",             note: "Dolphins click and whistle in the distance." },
  "japan":        { name: "Sagami Bay, Japan",    note: "A lanternfish flickers in the dark." },
  "open-atlantic":{ name: "Open Atlantic",        note: "Shearwaters wheel above the swells." },
  "cornwall":     { name: "Cornwall, UK",         note: "Gannets dive-bomb the water around the boat." },
  "papua-new-guinea": { name: "Papua New Guinea", note: "The reef flat stretches out, impossibly clear and shallow." },
  /* These unlock once the first six sharks are tagged — new waters earned,
     not given. v0.7.0: real species live here now, so they are selectable,
     not teasers. */
  "galapagos":    { name: "Galápagos Islands",    note: "Marine iguanas slip into the water nearby.", locked: true },
  "south-africa": { name: "South Africa",         note: "Cape fur seals bark on the rocks above.", locked: true }
};

const DEPTHS = {
  "surface":  { name: "Surface waters (0–30 m)",     scene: "depth-surface" },
  "reef":     { name: "Reef & shallows (30–100 m)", scene: "depth-shallow" },
  "twilight": { name: "Twilight depths (100–400 m)", scene: "depth-midwater" },
  "deep":     { name: "Deep dark (400–1000 m)",     scene: "depth-deep" }
};

const BAITS = {
  "crustaceans":   "Crabs & lobster",
  "squid":         "Squid",
  "schooling-fish":"Schooling fish (mackerel)",
  "plankton":      "Plankton bloom — no bait, follow the bloom"
};

/* Field notes: short, dense, real. Everything the planner needs is in
   here — region, depth range, food — but nothing is handed to you.
   Read like a scientist, not a checklist.
   NOTE (v0.6.0): each shark's `opener` is a DRAFT success-text opener for
   Sarah, written to match her established voice. Avery is the game's writer
   and will revise or replace these freely — they are placeholders for his
   pass, not final copy. */
const SHARKS = [
  {
    id: "nurse",
    name: "Nurse Shark", latin: "Ginglymostoma cirratum", status: "Vulnerable",
    code: "NS",
    combo: { region: "caribbean", bait: "crustaceans" },
    depths: ["surface", "reef"],
    sizeRange: [2.0, 3.0],
    research: "A bottom-dweller of the warm, shallow tropical Atlantic. In the Caribbean Sea, nurse sharks spend their days piled together under reef ledges — sometimes in heaps of forty. After dark they head out alone, sweeping the sandy shallows with the whisker-like barbels on their snouts, vacuuming up crabs and lobster. They rarely leave water shallower than about 75 metres.",
    hook: "By day they nap in cuddly heaps of up to 40 on the seafloor.",
    bonus: "Nurse sharks can pump water over their gills while sitting perfectly still — most sharks have to keep swimming to breathe. That's the secret behind the cuddle heaps.",
    cheer: "nurse sharks are the CUDDLIEST!!! they nap in piles of FORTY. forty sharks. just vibing. i'm SO jealous",
    opener: "YOU TAGGED A NURSE SHARK?!?! was it in the cuddle heap?!?! TELL ME EVERYTHING",
    sketchCap: "barbels (the 'whiskers')",
    nameIdeas: ["Puddles", "Biscuit", "Sandy", "Nugget"]
  },
  {
    id: "thresher",
    name: "Thresher Shark", latin: "Alopias vulpinus", status: "Vulnerable",
    code: "TS",
    combo: { region: "open-atlantic", bait: "schooling-fish" },
    depths: ["reef", "twilight"],
    sizeRange: [3.0, 4.6],
    research: "Thresher sharks follow warm water through tropical and temperate oceans, often far from shore in the open Atlantic. They spend the daylight hours deep below the sunlit layer and rise toward the surface after dark. Out in the mid-water they herd schools of anchovies, herring and mackerel, then stun them with a whip of the enormous tail that makes up half their body length. Most of their lives happen somewhere between 30 and 550 metres down.",
    hook: "That tail looks perpetually nervous, but it's actually a sword. Threshers hunt by tail-whipping.",
    bonus: "Threshers have been seen hunting in pairs, herding schools of fish into a tight ball before taking turns striking with their tails.",
    cheer: "THRESHERS!!! their tail is HALF THEIR BODY. they hunt by WHIPPING it. that's the coolest thing any animal does and i will not be taking questions",
    opener: "A THRESHER?!?! DID IT WHIP ITS TAIL?!?! tell me EVERYTHING",
    sketchCap: "the tail (half the body!)",
    nameIdeas: ["Whip", "Nervous Nigel", "Swoosh", "Comet"]
  },
  {
    id: "whale",
    name: "Whale Shark", latin: "Rhincodon typus", status: "Endangered",
    code: "WS",
    combo: { region: "philippines", bait: "plankton" },
    depths: ["surface", "reef"],
    sizeRange: [5.5, 12.0],
    research: "The biggest fish in the ocean roams all tropical and warm-temperate seas, and this season a large aggregation has gathered off the Philippines. Whale sharks don't chase anything — they find seasonal blooms of plankton and swim slowly through them with their enormous mouths wide open. Each shark's spot pattern is unique, like a fingerprint. They cruise right at the surface where the water turns green, sometimes dipping a little deeper over reefs.",
    hook: "The biggest fish in the ocean, and it eats some of the smallest food. Gentle polka-dotted bus.",
    bonus: "Whale sharks can dive deeper than 1,900 metres — among the deepest dives ever recorded for any fish — then cruise back up to the surface to feed.",
    cheer: "A WHALE SHARK!!! the biggest fish in the WHOLE OCEAN and you TAGGED one!!! did you see the spots?? every one is different like a fingerprint!!",
    opener: "A WHALE SHARK?!?! THE BIGGEST FISH IN THE OCEAN!!! did you count its spots?!?! TELL ME EVERYTHING",
    sketchCap: "spot pattern (like a fingerprint)",
    nameIdeas: ["Dot", "Bus", "Domino", "Galaxy"]
  },
  {
    id: "goblin",
    name: "Goblin Shark", latin: "Mitsukurina owstoni", status: "Least Concern",
    code: "GS",
    combo: { region: "japan", bait: "squid" },
    depths: ["twilight", "deep"],
    sizeRange: [2.5, 4.0],
    research: "A living fossil from the deep continental slopes — most records come from Sagami Bay in Japan. Goblin sharks live in total darkness between about 270 and 960 metres, drifting over the seafloor and ambushing deep-sea squid and fish. Their jaws shoot forward like a slingshot, and they find prey by sensing the faint electricity of living things.",
    hook: "The only living member of a 125-million-year-old lineage. Pink, pointy-nosed, and deeply weird.",
    bonus: "A goblin shark's pink colour comes from blood vessels showing through its thin, almost translucent skin.",
    cheer: "A GOBLIN SHARK?!?! the pink deep-sea weirdo!!! 125 million years old!!! did it look as weird in real life as in pictures",
    opener: "A GOBLIN SHARK?!?! THE PINK DEEP-SEA WEIRDO!!! was its nose as pointy as the pictures?!?! tell me EVERYTHING",
    sketchCap: "the snout (a living fossil)",
    nameIdeas: ["Nosey", "Fossil", "Blush", "Slingshot"]
  },
  {
    id: "tiger",
    name: "Tiger Shark", latin: "Galeocerdo cuvier", status: "Near Threatened",
    code: "TI",
    /* The garbage can of the sea: bait is forgiving (any meaty bait),
       so the real puzzle is WHERE. */
    combo: { region: "maldives", bait: ["schooling-fish", "squid", "crustaceans"] },
    depths: ["surface", "reef"],
    sizeRange: [3.0, 5.5],
    research: "Tiger sharks patrol tropical and subtropical waters worldwide — everywhere except the Mediterranean. Around the Maldives they cruise the atoll lagoons and reef edges, rarely straying deeper than a few hundred metres. They'll eat almost anything that crosses their path: fish, turtles, seabirds, even the occasional floating oddity. Researchers have found license plates in their stomachs.",
    hook: "Pups wear bold dark stripes that fade with age — a tiger costume they eventually outgrow.",
    bonus: "Tiger sharks cross entire ocean basins. One tagged individual travelled more than 7,500 kilometres.",
    cheer: "TIGER SHARK!!! the garbage can of the sea!!! they eat ANYTHING. license plates!!! i love them so much",
    opener: "A TIGER SHARK?!?! did it try to eat the boat?!?! TELL ME EVERYTHING",
    sketchCap: "stripes (they fade with age)",
    nameIdeas: ["Stripes", "Tigger", "Marbles", "Scout"]
  },
  {
    id: "sandtiger",
    name: "Sand Tiger Shark", latin: "Carcharias taurus", status: "Critically Endangered",
    code: "ST",
    combo: { region: "baja", bait: "squid" },
    depths: ["surface", "reef"],
    sizeRange: [2.0, 3.2],
    research: "Sand tiger sharks haunt subtropical and temperate shores on both sides of the Americas, including the rocky reefs and kelp edges off Baja California. Despite the toothy grin, they're slow, docile ambush hunters — they gulp air at the surface and hold it to hover perfectly still in the water column, then strike at passing fish and squid. They rarely venture deeper than about 190 metres, preferring the sunlit shallows around reefs and wrecks.",
    hook: "Gulps air at the surface to hover motionless like a blimp — the only shark that does this.",
    bonus: "Looks like a nightmare, but there are no confirmed fatalities — one of the most docile big sharks in the ocean.",
    cheer: "sand tiger!!! they look SO scary but they're actually big softies. they gulp air to FLOAT. like a weird balloon shark. tell it i said hi",
    opener: "A SAND TIGER?!?! the smiley balloon shark!!! did it do the floaty thing?!?! tell me EVERYTHING",
    sketchCap: "the grin (all teeth, no bite)",
    nameIdeas: ["Toothy", "Grin", "Smiley", "Baja"]
  },
  {
    id: "galapagos",
    name: "Galápagos Shark", latin: "Carcharhinus galapagensis", status: "Least Concern",
    code: "GA",
    combo: { region: "galapagos", bait: "schooling-fish" },
    depths: ["surface", "reef"],
    sizeRange: [2.4, 3.7],
    research: "A reef shark of remote oceanic islands — and the one place it truly lives up to its name is the Galápagos. There, Galápagos sharks patrol the rocky reefs and island slopes, often in the clear shallows where schools of reef fish gather. They are bold and curious, sometimes circling divers for a closer look. They hunt jacks, groupers and other reef fish, mostly in water shallower than about 80 metres, rarely venturing into the deep.",
    hook: "Bold island shark — known to circle divers just to check them out.",
    bonus: "Galápagos sharks use nursery areas: pups grow up in sheltered island bays before heading out to the reefs.",
    cheer: "GALÁPAGOS SHARK!!! the island shark!!! they're so curious they come right up to divers. did it check YOU out?!",
    opener: "A GALÁPAGOS SHARK?!?! IN THE GALÁPAGOS!!! (where else lol) TELL ME EVERYTHING",
    sketchCap: "the curious eye",
    nameIdeas: ["Darwin", "Isla", "Booby", "Lava"]
  },
  {
    id: "greatwhite",
    name: "Great White Shark", latin: "Carcharodon carcharias", status: "Vulnerable",
    code: "GW",
    combo: { region: "south-africa", bait: "schooling-fish" },
    depths: ["surface", "reef"],
    sizeRange: [3.5, 6.0],
    research: "The ocean's most famous hunter cruises temperate coasts worldwide — and off South Africa, great whites gather where the seals haul out. They patrol the surface waters and reef edges, sometimes breaching clean out of the sea in pursuit of prey. Unusually for a fish, they keep their swimming muscles warm, which keeps them fast in cool water. They eat seals, fish and the occasional drifting carcass, hunting mostly in the sunlit upper layers.",
    hook: "Warm-bodied hunter; can breach fully out of the water.",
    bonus: "A great white's bite is investigative — most encounters are a single test bite, then it lets go and moves on.",
    cheer: "A GREAT WHITE!!! THE great white!!! did it breach?!?! they're warm-blooded which is SO weird for a fish",
    opener: "A GREAT WHITE SHARK?!?! THE APEX!!! was it as big as they say?!?! TELL ME EVERYTHING",
    sketchCap: "the countershaded flank",
    nameIdeas: ["Bruce", "Chomp", "Apex", "Finley"]
  },
  {
    id: "hammerhead",
    name: "Great Hammerhead", latin: "Sphyrna mokarran", status: "Critically Endangered",
    code: "HH",
    combo: { region: "caribbean", bait: "schooling-fish" },
    depths: ["surface", "reef"],
    sizeRange: [2.5, 5.0],
    research: "The largest of the hammerheads roams tropical seas, and the Caribbean's reefs are prime hunting ground. That wide hammer isn't just for show — it's packed with sensors that pick up the faint electricity of stingrays buried in the sand, their favourite food. Great hammerheads cruise the shallows and reef flats, rarely deeper than about 80 metres, sweeping their heads side to side like metal detectors.",
    hook: "The hammer is a sensory array — it 'sees' stingrays hidden in sand.",
    bonus: "Hammerhead pups are born with a soft, folded hammer that straightens out as they grow.",
    cheer: "A HAMMERHEAD!!! their eyes are on the ENDS of the hammer!! 360 vision!!! nature said 'what if binoculars but shark'",
    opener: "A GREAT HAMMERHEAD?!?! THE HAMMERHEAD!!! did you see the hammer up close?!?! TELL ME EVERYTHING",
    sketchCap: "the hammer (a sensory array)",
    nameIdeas: ["Hammer", "T-Bone", "Nail", "Mal"]
  },
  {
    id: "mako",
    name: "Shortfin Mako", latin: "Isurus oxyrinchus", status: "Endangered",
    code: "MK",
    combo: { region: "open-atlantic", bait: "squid" },
    depths: ["surface", "reef"],
    sizeRange: [2.0, 3.8],
    research: "The fastest shark in the sea lives life in the fast lane of the open Atlantic. Makos are built like torpedoes — deep blue above, warm-muscled — and they chase down squid and speedy fish like mackerel and tuna. They hunt in the sunlit surface waters, rarely diving below about 150 metres, where the light is good and the prey is quick. If something out here is moving at 70 kilometres an hour, it's a mako.",
    hook: "Clocks ~70 km/h — the fastest shark alive.",
    bonus: "Makos are warm-bodied like great whites — their swimming muscles run several degrees warmer than the water.",
    cheer: "A MAKO!!! the fastest shark in the OCEAN!!! 70 kmh!!! that's faster than my bike!!!",
    opener: "A MAKO?!?! THE SPEED DEMON!!! was it fast?!?! TELL ME EVERYTHING",
    sketchCap: "the torpedo body",
    nameIdeas: ["Dash", "Turbo", "Zip", "Rocket"]
  },
  {
    id: "basking",
    name: "Basking Shark", latin: "Cetorhinus maximus", status: "Endangered",
    code: "BS",
    combo: { region: "cornwall", bait: "plankton" },
    depths: ["surface", "reef"],
    sizeRange: [6.0, 9.0],
    research: "The second-biggest fish in the ocean feeds like the biggest — by swimming slowly through plankton with its enormous mouth wide open. Basking sharks visit temperate coasts in summer, and the plankton-rich waters off Cornwall are a favourite. Look for the tall dorsal fin cutting the surface, the huge mouth agape. They feed right at the top where the water turns green, sometimes dipping a little deeper over the reefs.",
    hook: "Second-largest fish on Earth; feeds with a mouth up to a metre wide.",
    bonus: "A basking shark filters the equivalent of an Olympic swimming pool of water every hour.",
    cheer: "A BASKING SHARK!!! the second-biggest fish!!! just vibing with its mouth open!!! the gentle giant's gentle giant",
    opener: "A BASKING SHARK?!?! THE OTHER GENTLE GIANT!!! was its mouth HUGE?!?! TELL ME EVERYTHING",
    sketchCap: "the gaping mouth",
    nameIdeas: ["Sunny", "Lounge", "Drifter", "Mellow"]
  },
  {
    id: "epaulette",
    name: "Epaulette Shark", latin: "Hemiscyllium ocellatum", status: "Least Concern",
    code: "EP",
    combo: { region: "papua-new-guinea", bait: "crustaceans" },
    depths: ["surface", "reef"],
    sizeRange: [0.6, 1.0],
    research: "A small reef shark with an extraordinary trick: it can walk. Epaulette sharks live on the shallow reef flats of Papua New Guinea, where the tide sometimes strands them in ankle-deep pools. Instead of panicking, they clamber from pool to pool on their paddle-like fins, hunting crabs and worms. They rarely leave water shallower than a few metres — the intertidal zone is their whole world.",
    hook: "Walks between tide pools on its fins when the reef drains.",
    bonus: "Epaulettes can survive over an hour out of water by slowing their bodies right down — the ultimate low-tide specialist.",
    cheer: "AN EPAULETTE SHARK!!! IT WALKS!!! ON ITS FINS!!! like a little puppy walking on the reef!!! i can't cope",
    opener: "AN EPAULETTE SHARK?!?! THE WALKING SHARK!!! DID IT WALK?!?! TELL ME EVERYTHING",
    sketchCap: "the walking fin",
    nameIdeas: ["Puddles", "Waddles", "Tiptoe", "Reef"]
  }
];

/* Sarah's texts: genuine conversation, never a "hint" UI.
   Weighted toward real shark knowledge — she can't help sharing it. */
const COUSIN_CHATS = [
  { them: "did you know nurse sharks can BREATHE without swimming?? most sharks have to keep moving but nurse sharks can pump water over their gills just sitting there. that's why they can nap in piles!! total sea puppies", me: "That explains the cuddle heaps. Incredible." },
  { them: "thresher shark fact!!! their tail is HALF their whole body. they whip it so fast it stuns the fish. like a whip made of shark", me: "A sword tail. Nature is ridiculous." },
  { them: "whale sharks are the BIGGEST fish ever but they only eat tiny stuff. they just swim around with their mouth open like a big slow vacuum. i would also do that", me: "Honestly same. Big slow vacuum is a lifestyle." },
  { them: "goblin sharks are PINK. and their jaw shoots out like in the movies. they live deeper than any diver can go. scientists mostly find them near japan", me: "Deep, pink, and weird. The best combo." },
  { them: "if you want a nurse shark try the caribbean!! they sleep under reef ledges during the day in the SHALLOW parts. at night they go hunting on the sand", me: "Shallow reefs by day, sandy bottoms by night. Noted." },
  { them: "threshers go deep during the day where it's dark and come up at night to hunt. so like... twilight zone deep. or the reefs if you're lucky", me: "So mid-water by day, up higher at night. Got it." }
];

const COUSIN_NUDGES = {
  nurse:   "nurse sharks are SHALLOW!! like surface-to-reef shallow, 0 to 75 metres. they nap under reef ledges during the day and vacuum crabs off the sand at night. caribbean + shallow + crabs!!",
  thresher:"threshers roam!! they go from the reefs down into the twilight zone, like 30 to 550 metres. they hunt SCHOOLS of little fish. reefs or twilight + fish bait??",
  whale:   "whale sharks don't eat bait!! they eat PLANKTON!! find the bloom at the surface. they're usually right at the top where the water looks green, sometimes a bit deeper over reefs",
  goblin:  "goblin sharks live SO deep. twilight zone to the real deep dark, like 270 to 960 metres!! there's a deep bay in japan where scientists find them. squid bait!!",
  tiger:    "tiger sharks aren't picky AT ALL!!! they'll eat fish, squid, even crabs!! try the maldives!! shallow lagoons!! the real question is WHERE not what!!",
  sandtiger:"sand tigers look scary but they're softies!! baja california!! they hover in the shallows eating squid!! the floaty balloon sharks!!",
  galapagos: "galápagos sharks!! they're reef sharks that LOVE oceanic islands. the galápagos obviously!! shallow reefs, and they eat reef fish!!",
  greatwhite: "great whites!!! south africa!! they follow the seals. shallow water, and they eat FISH. they're warm-blooded-ish which is WILD for a shark",
  hammerhead: "hammerheads!!! the caribbean has great hammerheads!! they hunt STINGRAYS on the reef. shallow water + fish bait!! their heads are basically metal detectors",
  mako: "makos are the FASTEST sharks!!! open atlantic, and they love squid!! they hunt up near the surface. they're basically underwater race cars",
  basking: "basking sharks don't eat bait either!! they're plankton eaters like whale sharks!! cornwall in the summer, right at the surface where the water's green!!",
  epaulette: "epaulette sharks WALK!!! they walk on their fins across the reef in papua new guinea!! super shallow water, and they eat crabs!!"
};

/* Field-guide sketches: rough pencil-style drawings of one distinctive
   feature per shark. Deliberately NOT the real shark art — the true
   appearance is revealed only when a shark is caught and tagged.
   (The real ART above is never shown in Research.) */
const SKETCH = {
  nurse: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: nurse shark barbels">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <line x1="52" y1="56" x2="46" y2="76"/>
      <line x1="62" y1="57" x2="60" y2="77"/>
      <line x1="14" y1="92" x2="206" y2="92" stroke-dasharray="4 7" opacity="0.6"/>
    </g>
  </svg>`,
  thresher: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: thresher shark tail">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="70" cy="62" rx="42" ry="14"/>
      <path d="M110,58 Q150,50 168,18 Q176,8 186,6"/>
      <path d="M110,66 Q140,64 158,50" stroke-dasharray="7 5"/>
      <circle cx="42" cy="58" r="2.5" fill="#9fb8cc" stroke="none"/>
    </g>
  </svg>`,
  whale: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: whale shark spot pattern">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="110" cy="55" rx="80" ry="26"/>
      <path d="M188,55 L210,40 M188,55 L210,70"/>
    </g>
    <g fill="#9fb8cc" opacity="0.7">
      <circle cx="80" cy="45" r="3"/><circle cx="105" cy="42" r="3"/><circle cx="130" cy="46" r="3"/>
      <circle cx="92" cy="58" r="3"/><circle cx="118" cy="60" r="3"/><circle cx="143" cy="57" r="3"/>
      <circle cx="70" cy="62" r="2.5"/><circle cx="155" cy="64" r="2.5"/>
    </g>
  </svg>`,
  goblin: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: goblin shark snout">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M80,50 L18,44 L18,58 Z"/>
      <ellipse cx="130" cy="55" rx="55" ry="15"/>
      <path d="M183,52 Q200,48 208,44" stroke-dasharray="7 5"/>
    </g>
  </svg>`,
  tiger: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: tiger shark stripes">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="55" rx="70" ry="20"/>
      <path d="M173,50 L205,34 M173,60 L205,76"/>
      <line x1="90" y1="37" x2="88" y2="73"/>
      <line x1="110" y1="35" x2="110" y2="75"/>
      <line x1="130" y1="37" x2="132" y2="73"/>
    </g>
  </svg>`,
  sandtiger: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: sand tiger teeth">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M30,55 Q70,38 120,42 Q170,46 200,40"/>
      <path d="M30,55 Q70,68 120,66 Q170,64 200,60" stroke-dasharray="7 5"/>
      <path d="M44,52 l5,8 l5,-8 l5,8 l5,-8 l5,8 l5,-8"/>
    </g>
  </svg>`,
  galapagos: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: Galapagos shark eye">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M70,55 Q110,35 150,55 Q110,75 70,55 Z"/>
      <circle cx="110" cy="55" r="10"/>
      <circle cx="110" cy="55" r="3" fill="#9fb8cc" stroke="none"/>
    </g>
  </svg>`,
  greatwhite: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: great white countershading">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M20,45 Q70,35 120,42 Q170,49 200,42"/>
      <path d="M20,65 Q70,58 120,63 Q170,68 200,62" stroke-dasharray="7 5"/>
      <line x1="14" y1="92" x2="206" y2="92" stroke-dasharray="4 7" opacity="0.6"/>
    </g>
  </svg>`,
  hammerhead: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: hammerhead cephalofoil">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <rect x="40" y="42" width="140" height="26" rx="13"/>
      <path d="M110,68 L110,96" stroke-dasharray="7 5"/>
      <circle cx="55" cy="55" r="3" fill="#9fb8cc" stroke="none"/>
      <circle cx="165" cy="55" r="3" fill="#9fb8cc" stroke="none"/>
    </g>
  </svg>`,
  mako: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: mako torpedo body">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M30,55 Q110,30 190,55 Q110,80 30,55 Z"/>
      <path d="M190,55 L210,42 M190,55 L210,68"/>
    </g>
  </svg>`,
  basking: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: basking shark mouth">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="110" cy="55" rx="75" ry="24"/>
      <path d="M45,55 Q110,85 175,55" stroke-width="3.5"/>
      <path d="M45,55 Q110,30 175,55" stroke-dasharray="7 5"/>
    </g>
  </svg>`,
  epaulette: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Field sketch: epaulette walking fin">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M60,40 Q90,55 100,85"/>
      <path d="M100,85 L85,100 M100,85 L100,102 M100,85 L115,100"/>
      <line x1="14" y1="104" x2="206" y2="104" stroke-dasharray="4 7" opacity="0.6"/>
    </g>
  </svg>`
};

/* If you name a shark "Sarah", she finds out. Sweet, not progression. */
const SARAH_EGG_THREAD = [
  { who: "them", text: "WAIT. you named a shark SARAH?!?! like ME?!?!" },
  { who: "me",   text: "Well... yeah. You're the reason I know half of this stuff." },
  { who: "them", text: "i'm telling EVERYONE at school. sarah the shark!!! do you think she knows?? can sharks know things" },
  { who: "me",   text: "She's got your name now. I think she knows." }
];

/* ---------- Ambient sea life: small silhouettes that drift through the dive ---------- */

const CREATURE_ART = {
  turtle: `
  <svg viewBox="0 0 90 50" role="img" aria-label="Sea turtle">
    <ellipse cx="45" cy="25" rx="24" ry="15" fill="#3d5a52"/>
    <ellipse cx="45" cy="22" rx="17" ry="10" fill="#4f7568"/>
    <polygon points="22,25 4,12 8,28" fill="#3d5a52"/>
    <polygon points="22,27 4,40 8,26" fill="#3d5a52"/>
    <polygon points="68,25 86,14 82,28" fill="#3d5a52"/>
    <polygon points="68,27 86,38 82,26" fill="#3d5a52"/>
    <circle cx="66" cy="22" r="2.4" fill="#22332e"/>
  </svg>`,
  fish: `
  <svg viewBox="0 0 110 50" role="img" aria-label="School of fish">
    <g fill="#41637a">
      <polygon points="18,25 34,17 34,33"/>
      <ellipse cx="26" cy="25" rx="12" ry="5"/>
      <polygon points="58,14 74,6 74,22"/>
      <ellipse cx="66" cy="14" rx="12" ry="5"/>
      <polygon points="84,32 100,24 100,40"/>
      <ellipse cx="92" cy="32" rx="12" ry="5"/>
      <polygon points="44,38 60,30 60,46"/>
      <ellipse cx="52" cy="38" rx="12" ry="5"/>
    </g>
  </svg>`,
  dolphin: `
  <svg viewBox="0 0 100 50" role="img" aria-label="Dolphin">
    <path d="M8,30 Q30,18 55,22 Q75,25 92,14 Q80,28 60,32 Q35,38 8,30 Z" fill="#4a6a84"/>
    <polygon points="48,22 56,6 62,22" fill="#4a6a84"/>
    <polygon points="30,32 22,44 38,34" fill="#4a6a84"/>
    <circle cx="72" cy="24" r="2.2" fill="#22333f"/>
  </svg>`
};

/* Flavour: the dive log describes the place, not just the mechanics.
   v0.6.0: depth sets the atmosphere — shallow flavour is bright and busy,
   deep flavour is dark and strange. */
const DEPTH_FLAVOUR = {
  surface: [
    "Sunlight shatters across the surface in moving panes. The water is warm and impossibly clear.",
    "The surface chop rocks the boat gently. Below, everything glows blue-green.",
    "You can see the boat's shadow drifting above you, a dark shape on the bright ceiling of the sea.",
    "A breeze ruffles the surface into glitter. Gulls cry somewhere far above."
  ],
  reef: [
    "Coral heads rise like a drowned city. Small bright fish dart between the branches.",
    "The reef hums — not with sound, but with movement. Everything here is busy.",
    "A cleaning station bustles below: tiny fish picking parasites off a patient grouper.",
    "An octopus oozes from one crevice to another, changing colour as it goes."
  ],
  twilight: [
    "The light thins to a deep indigo. Your eyes adjust slowly to the dim.",
    "Particles drift past like snow falling upward. It is very quiet down here.",
    "The slope falls away into darkness to one side. You feel the depth more than see it.",
    "Your depth gauge ticks past 200 metres. The last of the blue fades to black-blue."
  ],
  deep: [
    "There is no light left to speak of — only the glow of the submersible and the dark pressing in.",
    "The seafloor, when the lights catch it, is soft grey mud, undisturbed for longer than you've been alive.",
    "Every movement down here feels deliberate. Nothing wastes energy in the deep.",
    "The submersible's lights catch marine snow — a slow, endless snowfall of tiny white specks.",
    "Somewhere out in the black, something flashes blue-green, once. Bioluminescence — the deep's own language."
  ]
};

/* Sightings pair a log line with a creature drifting past. Vary by depth. */
const SIGHTINGS = {
  surface: [
    { text: "A sea turtle glides past, unhurried, flippers moving like slow wings.", creature: "turtle" },
    { text: "A school of small silver fish wheels past in perfect unison.", creature: "fish" },
    { text: "A dolphin arcs through the blue in the distance, there and gone.", creature: "dolphin" }
  ],
  reef: [
    { text: "A sea turtle paddles over the coral, unbothered by your presence.", creature: "turtle" },
    { text: "A shimmering school of fusiliers pours over the reef crest.", creature: "fish" }
  ],
  twilight: [
    { text: "A loose school of lanternfish flickers past, each one carrying its own small light.", creature: "fish" }
  ],
  deep: [
    { text: "Something small and pale drifts through the edge of the lights — gone before you can focus.", creature: "fish" }
  ]
};

/* Rare, quiet easter eggs in the flavour. Real phenomena, mentioned in passing.
   v0.6.0: the secrets live in the deep — the shallows are too bright for secrets. */
const EASTER_EGGS = [
  { depths: ["twilight", "deep"],
    text: "For a moment the water sparkles — bioluminescent algae, disturbed by the current, flashing like wet stars." },
  { depths: ["twilight", "deep"],
    text: "A vast dark shape looms to one side — the silhouette of a scuttled ship, long since given back to the sea." },
  { depths: ["deep"],
    text: "Something below pulses once with cold blue light, then goes dark. You decide not to investigate." },
  { depths: ["surface"],
    text: "The water is so clear it looks color-corrected, like the establishing shot of a nature documentary." },
  { depths: ["twilight"],
    text: "This is the kind of dark water old monster movies warned you about. You check over your shoulder anyway." }
];

/* v0.7.0: the day is the expedition. Quiet beats for when the water
   holds its sharks back a while — waiting is most of the job. */
const WAITING_LINES = [
  "You watch the blue, and wait. This is most of the job, honestly.",
  "Nothing but water and light. You settle in — patience is the whole technique.",
  "The bait drifts. Somewhere out there, something is deciding.",
  "You scan the distance until your eyes ache pleasantly."
];

/* v0.7.0: sightings log — what a watched shark was doing. Pure value,
   no progression attached. */
const SIGHTING_DOINES = [
  "cruising slow along the reef edge",
  "circling lazily in the blue",
  "gliding past without a hurry",
  "hunting, focused and silent",
  "drifting with the current",
  "patrolling, unhurried and thorough",
  "curious — circling back for a second look",
  "feeding, oblivious to the boat"
];

/* v0.7.0: tagging the first six earns new waters. */
const REGION_UNLOCK_THREAD = [
  { who: "them", text: "SIX SHARKS?!?! you're officially a REAL shark scientist now!!" },
  { who: "me", text: "Six for six. The institute just cleared two new survey regions for us." },
  { who: "them", text: "THE GALÁPAGOS?!?! and SOUTH AFRICA?!?! i know EVERYTHING about those waters. ask me anything. ANYTHING" },
  { who: "me", text: "I have a feeling I'm going to. 🦈" }
];

/* ---------- Shark tracking: simulated satellite-tag data ---------- */

const TRACK_POOLS = {
  nurse:     { spots: ["Coral Gardens", "Mangrove Channel", "Seagrass Flats", "The Ledge", "Turtle Cove"], hop: [4, 38] },
  thresher:  { spots: ["Continental Slope", "Seamount X", "Upwelling Zone", "Open Atlantic Drift", "Deep Scattering Layer"], hop: [120, 480] },
  whale:     { spots: ["Tubbataha Reefs", "Sulu Sea", "Coral Triangle", "Bird's Head Seascape", "Western Pacific"], hop: [300, 1400] },
  goblin:    { spots: ["Tokyo Canyon", "Izu Ridge", "Suruga Slope", "Deep Terrace", "Canyon Mouth"], hop: [40, 220] },
  tiger:     { spots: ["Rasdhoo Atoll", "Chagos Archipelago", "Open Indian Ocean", "Seychelles Bank", "Saya de Malha"], hop: [150, 700] },
  sandtiger: { spots: ["Kelp Edge", "Rocky Point", "Sandy Flats", "Canyon Mouth", "Wreck Reef"], hop: [20, 120] },
  galapagos:  { spots: ["Darwin Arch", "Wolf Volcano Reef", "Cabo Douglas", "Punta Vicente Roca", "Isabela Channel"], hop: [30, 200] },
  greatwhite: { spots: ["Seal Island", "Dyer Island", "Mossel Bay", "False Bay", "Gansbaai"], hop: [100, 600] },
  hammerhead: { spots: ["Bimini Flats", "Tiger Beach", "Andros Reef", "Exuma Sound", "Cay Sal Bank"], hop: [50, 300] },
  mako:       { spots: ["Azores Front", "Gulf Stream Edge", "Sargasso Sea", "Shelf Break", "Open Atlantic Drift"], hop: [200, 800] },
  basking:    { spots: ["Isle of Man", "Cornish Coast", "The Hebrides", "Donegal Bay", "Clyde Waters"], hop: [80, 400] },
  epaulette:  { spots: ["Milne Bay Reef", "Kimbe Bay Flats", "Bootless Bay", "Tufi Reefs", "Rabaul Lagoon"], hop: [2, 15] }
};

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* Simulated tag track: starts at the tag site, then plausible waypoints.
   Distances fit the species — nurse sharks stay local, whale sharks roam. */
function genTrack(species, rec) {
  const pool = TRACK_POOLS[species.id] || TRACK_POOLS.nurse;
  const n = 4 + Math.floor(Math.random() * 3); // 4–6 waypoints after tagging
  const points = [{ label: rec.location, day: 0, km: 0 }];
  let day = 0, totalKm = 0;
  shuffle([...pool.spots]).slice(0, n - 1).forEach(sp => {
    day += 3 + Math.floor(Math.random() * 12);
    const km = Math.round(pool.hop[0] + Math.random() * (pool.hop[1] - pool.hop[0]));
    totalKm += km;
    points.push({ label: sp, day, km });
  });
  return { points, totalKm, days: day };
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/* ---------- State ---------- */

const store = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-collection") || "{}"); }
    catch { return {}; }
  },
  save(data) { localStorage.setItem("tyi-collection", JSON.stringify(data)); }
};

const msgStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-messages") || '{"messages":[],"unread":0,"chatIdx":0}'); }
    catch { return { messages: [], unread: 0, chatIdx: 0 }; }
  },
  save(d) { localStorage.setItem("tyi-messages", JSON.stringify(d)); }
};
const _savedMsgs = msgStore.load();

/* v0.7.0: the sightings log — spotted but not tagged. Pure field notes. */
const sightStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-sightings") || "[]"); }
    catch { return []; }
  },
  save(d) { localStorage.setItem("tyi-sightings", JSON.stringify(d)); }
};

/* v0.7.0: the first six sharks (the original roster). Tagging all six
   unlocks the Galápagos and South Africa — new waters earned, not given. */
const ORIGINAL_SIX = ["nurse", "thresher", "whale", "goblin", "tiger", "sandtiger"];

/* v0.6.0: threads are {ts, msgs}. Migrate legacy bare-array threads. */
function normThread(t) {
  if (Array.isArray(t)) return { ts: 0, msgs: t };
  return t;
}

const state = {
  tagged: store.load(),   // id -> {name, researchId, length, sex, location, date, sarahEgg, track}
  failures: 0,
  chatIdx: _savedMsgs.chatIdx || 0,
  messages: (_savedMsgs.messages || []).map(normThread),
  unread: _savedMsgs.unread || 0,
  pendingTag: null,       // species object awaiting naming
  sightings: sightStore.load(), // v0.7.0: watched-but-not-tagged log
  regionsUnlocked: false, // v0.7.0: first six tagged -> Galápagos + South Africa
  pendingWin: false,      // v0.7.0: final shark tagged mid-trip; ceremony at day's end
  currentPlan: null,      // v0.7.0: the trip's region/depth/bait
  encounterDone: null,    // v0.7.0: callback that resumes the trip after watch/tag
  won: (() => { try { return localStorage.getItem("tyi-won") === "1"; } catch { return false; } })()
};
function saveMsgs() {
  msgStore.save({ messages: state.messages, unread: state.unread, chatIdx: state.chatIdx });
}
/* Every new thread gets a timestamp for the Phone tab. */
function pushThread(msgs) {
  state.messages.push({ ts: Date.now(), msgs });
  state.unread += 1;
  saveMsgs();
  updateMsgBadge();
  renderMessages();
}
function fmtTime(ts) {
  return new Date(ts).toLocaleString(undefined,
    { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

/* Research IDs: every tagged shark always gets one, like real field science.
   Format: SPECIESCODE-YEAR-SEQ, e.g. NS-2026-001. Nickname is a separate,
   optional layer on top — a shark can have both, never "Unnamed". */
const idSeqStore = {
  load() {
    try { return parseInt(localStorage.getItem("tyi-idseq") || "0", 10) || 0; }
    catch { return 0; }
  },
  save(n) { localStorage.setItem("tyi-idseq", String(n)); }
};
let idSeq = idSeqStore.load();
function mintResearchId(species) {
  idSeq += 1;
  idSeqStore.save(idSeq);
  const year = new Date().getFullYear();
  return `${species.code}-${year}-${String(idSeq).padStart(3, "0")}`;
}
/* Migrate older saves: any tagged shark without an ID gets one now.
   (Runs after helpers are defined — see below.) */
function migrateIds() {
  Object.entries(state.tagged).forEach(([sid, t]) => {
    if (!t.researchId) {
      t.researchId = mintResearchId(sharkById(sid) || { code: "XX" });
    }
  });
  store.save(state.tagged);
}
/* Older saves predate tracking: give every tagged shark a track. */
function migrateTracks() {
  let changed = false;
  Object.entries(state.tagged).forEach(([sid, t]) => {
    if (!t.track) {
      t.track = genTrack(sharkById(sid) || { id: "nurse" }, t);
      changed = true;
    }
  });
  if (changed) store.save(state.tagged);
}

const $ = (id) => document.getElementById(id);
const esc = (str) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sharkById = (id) => SHARKS.find(s => s.id === id);
const untagged = () => SHARKS.filter(s => !state.tagged[s.id]);
/* Migrations run once at boot — see the boot section below. */

/* ---------- Tabs (each tab remembers its scroll position) ---------- */

const tabScroll = {};
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    const current = document.querySelector(".tab.active");
    if (current) tabScroll[current.dataset.tab] = window.scrollY;
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    $("tab-" + btn.dataset.tab).classList.add("active");
    if (btn.dataset.tab in tabScroll) window.scrollTo(0, tabScroll[btn.dataset.tab]);
    if (btn.dataset.tab === "phone" && state.unread > 0) {
      state.unread = 0;
      saveMsgs();
      updateMsgBadge();
    }
  });
});
function goTab(name) {
  document.querySelector(`.tab[data-tab="${name}"]`).click();
}

/* ---------- Research: a field-guide database ----------
   v0.7.0: the guide is a compact roster list; each row expands into the
   full entry. Hard rule stands: NO pictures of the actual shark here —
   sketches only. The real face is earned at tagging. */
function renderResearch() {
  const list = $("researchList");
  list.innerHTML = "";
  SHARKS.forEach(s => {
    const done = !!state.tagged[s.id];
    const regionLocked = REGIONS[s.combo.region] && REGIONS[s.combo.region].locked;
    const row = document.createElement("div");
    row.className = "guide-row";
    row.innerHTML = `
      <button type="button" class="guide-row-head" aria-expanded="false">
        <span class="guide-row-name">${s.name} ${done ? "✅" : ""}</span>
        <span class="latin">${s.latin}</span>
        <span class="status-pill">IUCN: ${s.status}</span>
        <span class="guide-caret" aria-hidden="true">▾</span>
      </button>
      <div class="guide-row-body hidden">
        <div class="guide-sketch">${SKETCH[s.id]}<p class="sketch-cap">field sketch — ${s.sketchCap}</p></div>
        <p class="research-text">${s.research}</p>
        ${done
          ? `<p class="hook">Tagged ${idLine(state.tagged[s.id])}${state.tagged[s.id].name ? ` as <strong>${esc(state.tagged[s.id].name)}</strong>` : ""} 🎉</p>`
          : regionLocked
            ? `<p class="latin">🔒 Our vessel hasn't surveyed these waters yet — tag the first six sharks to unlock them.</p>`
            : ``}
      </div>
    `;
    const head = row.querySelector(".guide-row-head");
    const body = row.querySelector(".guide-row-body");
    head.addEventListener("click", () => {
      const isHidden = body.classList.toggle("hidden");
      head.setAttribute("aria-expanded", String(!isHidden));
      row.classList.toggle("open", !isHidden);
    });
    list.appendChild(row);
  });
}

/* ---------- Planner ---------- */

function fillSelect(el, obj) {
  el.innerHTML = "";
  Object.entries(obj).forEach(([id, v]) => {
    const o = document.createElement("option");
    o.value = id;
    o.textContent = typeof v === "string" ? v : v.name;
    el.appendChild(o);
  });
}

function fillRegions() {
  const el = $("regionSelect");
  const current = el.value;
  el.innerHTML = "";
  Object.entries(REGIONS).forEach(([id, v]) => {
    const o = document.createElement("option");
    o.value = id;
    if (v.locked) {
      o.textContent = `🔒 ${v.name} — unlocks after six successful tags`;
      o.disabled = true;
    } else {
      o.textContent = v.name;
    }
    el.appendChild(o);
  });
  if (current && REGIONS[current] && !REGIONS[current].locked) el.value = current;
}

/* v0.7.0: regions unlock in two stages now.
   - Tagging the first six (the original roster) unlocks the Galápagos and
     South Africa as real, selectable waters.
   - Tagging all twelve wins the game (Master Shark Tagger). */
function applyRegions() {
  if (!state.regionsUnlocked) return;
  for (const id of ["galapagos", "south-africa"]) REGIONS[id].locked = false;
}

/* v0.7.0 migration: v0.6.0 winners had tyi-won=1 at 6/6, but the win is
   now 12/12. They keep their tags and earn the regions; the win resets
   until all twelve are tagged. */
function migrateWinV07() {
  const taggedCount = Object.keys(state.tagged).length;
  if (state.won && taggedCount < SHARKS.length) {
    state.won = false;
    try { localStorage.removeItem("tyi-won"); } catch {}
  }
  if (ORIGINAL_SIX.every(id => state.tagged[id])) {
    state.regionsUnlocked = true;
    try { localStorage.setItem("tyi-regions", "1"); } catch {}
  } else {
    try { state.regionsUnlocked = localStorage.getItem("tyi-regions") === "1"; } catch {}
  }
  applyRegions();
}

/* ---------- Planner ----------
   v0.7.0: no target species. The planner is conditions only — region,
   depth, bait. Your research is your targeting: the right combination
   brings the right sharks. The sea decides who shows up. */
function renderPlanner() {
  /* Selects are static; fillRegions() preserves the current region.
     Trips stay available after the win — there's always more to see. */
  fillRegions();
}

$("launchBtn").addEventListener("click", () => {
  const region = $("regionSelect").value;
  if (!region || !REGIONS[region] || REGIONS[region].locked) return;
  runExpedition({
    region,
    depth: $("depthSelect").value,
    bait: $("baitSelect").value
  });
});

/* ---------- Expedition ---------- */

function logLine(html, cls) {
  const p = document.createElement("p");
  if (cls) p.className = cls;
  p.innerHTML = html;
  const log = $("diveLog");
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}
/* v0.7.3: expedition pacing — a beat slower than reading speed, so the
   day breathes. Tune PACE to adjust globally. */
const PACE = 1.5;
const wait = (ms) => new Promise(r => setTimeout(r, ms * PACE));

/* Ambient sea life + quiet easter-egg flavour during the dive. */
function spawnCreature(type) {
  const scene = $("diveScene");
  const art = CREATURE_ART[type];
  if (!art) return;
  const el = document.createElement("div");
  el.className = "ambient";
  el.innerHTML = art;
  el.style.top = (8 + Math.random() * 55) + "%";
  el.style.animationDuration = (9 + Math.random() * 8).toFixed(1) + "s";
  el.style.height = Math.round(24 + Math.random() * 26) + "px";
  if (Math.random() < 0.4) el.style.transform = "scaleX(-1)";
  el.addEventListener("animationend", () => el.remove());
  scene.appendChild(el);
  setTimeout(() => el.remove(), 25000); // safety net
}

/* Guaranteed ambient life before the shark reveal: the scene must feel
   alive first. At least one sighting always lands; a rare easter egg may
   join it. v0.6.0: eggs are likelier in the deep, where secrets live. */
async function showSighting(depth) {
  // Rare, quiet easter eggs: real phenomena, mentioned in passing.
  const eggChance = (depth === "twilight" || depth === "deep") ? 0.35 : 0.12;
  if (Math.random() < eggChance) {
    const eggs = EASTER_EGGS.filter(e => e.depths.includes(depth));
    if (eggs.length) {
      logLine(`✨ ${pick(eggs).text}`);
      await wait(1600);
    }
  }
  const options = SIGHTINGS[depth] || [];
  if (options.length) {
    const s = pick(options);
    logLine(`👁️ ${s.text}`);
    spawnCreature(s.creature);
  }
}

/* ---------- Expedition: a full day out ----------
   v0.7.0: no target species. Each shark declares where it can appear
   (region + bait + depth range) — that declaration IS the encounter
   table. A combination resolves to every species whose declaration
   matches. New sharks slot in by adding their own declaration. */
function resolveEncounters(plan) {
  return SHARKS.filter(s => {
    const baitOk = Array.isArray(s.combo.bait)
      ? s.combo.bait.includes(plan.bait)
      : s.combo.bait === plan.bait;
    return s.combo.region === plan.region &&
      s.depths.includes(plan.depth) &&
      baitOk;
  });
}

/* Pick one species for an encounter slot: prefer untagged species the
   player hasn't already seen today, then familiar faces for watching. */
function pickEncounter(appeared, shown) {
  const fresh = appeared.filter(s => !shown.has(s.id));
  if (!fresh.length) return null;
  const newToPlayer = fresh.filter(s => !state.tagged[s.id]);
  return pick(newToPlayer.length ? newToPlayer : fresh);
}

/* One encounter: the shark appears, and the player chooses to WATCH
   (a sighting, logged) or TAG (if untagged — opportunistic tagging is
   always allowed). Either way the day goes on. */
function doEncounter(species, plan) {
  return new Promise(resolve => {
    const rec = state.tagged[species.id];
    const sharkEl = $("diveShark");
    sharkEl.innerHTML = ART[species.id];
    sharkEl.classList.remove("hidden");
    logLine(`🦈 <span class="found">Shark! A ${species.name}!</span>`, "found");
    const actions = $("diveActions");
    actions.classList.remove("hidden");
    actions.innerHTML = "";
    const finish = () => {
      /* The day doesn't end on its own — after each encounter the player
         chooses: keep diving, or head back to the ship. */
      actions.innerHTML = "";
      const stayBtn = document.createElement("button");
      stayBtn.className = "secondary-button";
      stayBtn.type = "button";
      stayBtn.textContent = "🌊 Keep diving";
      stayBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        resolve(false);
      });
      const backBtn = document.createElement("button");
      backBtn.className = "secondary-button";
      backBtn.type = "button";
      backBtn.textContent = "⛵ Head back to the ship";
      backBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        resolve(true);
      });
      actions.appendChild(stayBtn);
      actions.appendChild(backBtn);
      actions.classList.remove("hidden");
    };
    const watchBtn = document.createElement("button");
    watchBtn.className = "secondary-button";
    watchBtn.type = "button";
    watchBtn.textContent = "👁️ Just watch";
    watchBtn.addEventListener("click", () => {
      const entry = recordSighting(species, plan);
      logLine(`👁️ You watch the ${species.name} ${entry.doing}. A good sighting, logged.`);
      finish();
    });
    actions.appendChild(watchBtn);
    if (!rec) {
      const tagBtn = document.createElement("button");
      tagBtn.className = "primary-button";
      tagBtn.type = "button";
      tagBtn.textContent = `🏷️ Tag the ${species.name}`;
      tagBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        openTagging(species, finish);
      });
      actions.appendChild(tagBtn);
    } else {
      const note = document.createElement("p");
      note.className = "latin";
      note.style.cssText = "width:100%;text-align:center;margin:4px 0 0";
      note.textContent = `Already in your book${rec.name ? ` as “${rec.name}”` : ""} — enjoy the visit.`;
      actions.appendChild(note);
    }
  });
}

/* v0.7.0: a trip is a full day out — descent, wildlife, then 2–4
   encounter slots paced through the day, then day's end. The shark is
   a moment in the day, never the end of it. */
async function runExpedition(plan) {
  state.currentPlan = plan;
  state.pendingWin = false;
  state.taggedThisTrip = false;
  tripDecks = { waiting: shuffled(WAITING_LINES), doing: shuffled(SIGHTING_DOINES) };
  $("launchBtn").disabled = true;
  $("diveView").classList.remove("hidden");
  $("diveActions").classList.add("hidden");
  $("diveActions").innerHTML = "";
  $("diveLog").innerHTML = "";
  $("diveShark").classList.add("hidden");

  const scene = $("diveScene");
  scene.className = "dive-scene " + DEPTHS[plan.depth].scene;
  const deep = plan.depth === "twilight" || plan.depth === "deep";

  const baitText = plan.bait === "plankton"
    ? "No bait — scanning the water for a plankton bloom…"
    : `Bait deployed: ${BAITS[plan.bait]}.`;

  logLine(`🛥️ <strong>Expedition begun</strong> — the research vessel leaves the harbor.`);
  await wait(1700);
  logLine(`🪝 ${baitText}`);
  await wait(1700);
  if (deep) {
    logLine(`⬇️ The water darkens as you descend. The surface light thins, then lets go.`);
    await wait(2000);
  }
  logLine(`🌊 ${pick(DEPTH_FLAVOUR[plan.depth])}`);
  await wait(2000);
  // The scene must feel alive before anything else: sightings always land.
  await showSighting(plan.depth);
  await wait(2100);
  logLine(`👀 ${REGIONS[plan.region].note}`);
  await wait(2000);

  const appeared = resolveEncounters(plan);
  const shown = new Set();
  const slots = 2 + Math.floor(Math.random() * 3); // 2–4 encounters
  let sawShark = false;
  let endedEarly = false;
  for (let i = 0; i < slots; i++) {
    $("diveShark").classList.add("hidden");
    if (i > 0) {
      logLine(deep
        ? `⏳ The hours slip by. The deep does not hurry, so neither do you.`
        : `⏳ The morning wears on…`);
      await wait(2000);
    }
    await showSighting(plan.depth);
    await wait(1900);
    const s = pickEncounter(appeared, shown);
    if (s) {
      shown.add(s.id);
      sawShark = true;
      const headBack = await doEncounter(s, plan);
      await wait(1200);
      if (headBack) { endedEarly = true; break; }
    } else {
      logLine(`👀 ${deal(tripDecks.waiting, WAITING_LINES)}`);
      await wait(1800);
    }
  }

  // Day's end — the trip closes naturally, or early if the player chose to head back.
  $("diveShark").classList.add("hidden");
  if (endedEarly) {
    logLine(`⛵ You call it a day and turn for home — a good day on the water.`);
  } else {
    logLine(`🌅 The light changes. Time to head in — the day is done.`);
  }
  await wait(1800);
  if (!sawShark) {
    state.failures += 1;
    logLine(`<span class="miss">No sharks today. The sea keeps its counsel.</span>`, "miss");
  } else {
    state.failures = 0;
  }

  const actions = $("diveActions");
  actions.classList.remove("hidden");
  actions.innerHTML = "";
  const backBtn = document.createElement("button");
  backBtn.className = "secondary-button";
  backBtn.type = "button";
  backBtn.textContent = "Return to ship";
  backBtn.addEventListener("click", () => {
    $("diveView").classList.add("hidden");
    $("launchBtn").disabled = false;
    renderAll();
    if (state.pendingWin) {
      state.pendingWin = false;
      doWin();
    } else {
      afterExpedition(plan);
    }
  });
  actions.appendChild(backBtn);
}

/* ---------- Sightings log: watched, not tagged ----------
   v0.7.0: choosing "just watch" records a sighting — species, what it
   was doing, where and when. Spotted-but-not-tagged. Pure value, no
   progression mechanics attached. */
function recordSighting(species, plan) {
  const entry = {
    speciesId: species.id,
    name: species.name,
    doing: tripDecks ? deal(tripDecks.doing, SIGHTING_DOINES) : pick(SIGHTING_DOINES),
    location: REGIONS[plan.region].name,
    date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
    ts: Date.now()
  };
  state.sightings.unshift(entry);
  sightStore.save(state.sightings);
  renderSightings();
  return entry;
}

function renderSightings() {
  const list = $("sightingsList");
  if (!list) return;
  list.innerHTML = "";
  if (!state.sightings.length) {
    list.innerHTML = `<div class="empty-note">No sightings yet.<br>Watch a shark without tagging it and it'll be logged here. 👁️</div>`;
    return;
  }
  state.sightings.forEach(e => {
    const div = document.createElement("div");
    div.className = "sighting-entry";
    div.innerHTML = `
      <div class="sighting-name">👁️ ${esc(e.name)}</div>
      <div class="sighting-detail">${esc(e.doing)} — ${esc(e.location)}, ${esc(e.date)}</div>`;
    list.appendChild(div);
  });
}

/* ---------- Sarah's texts (optional — badge notifies, you open when you want) ---------- */

function updateMsgBadge() {
  const b = $("msgBadge");
  b.textContent = state.unread;
  b.classList.toggle("hidden", state.unread === 0);
}

function renderMessages() {
  const list = $("messagesList");
  list.innerHTML = "";
  if (!state.messages.length) {
    list.innerHTML = `<div class="empty-note">No messages yet.<br>Sarah will text you between expeditions. 💬</div>`;
    return;
  }
  state.messages.forEach(thread => {
    const wrap = document.createElement("div");
    wrap.className = "thread";
    const stamp = thread.ts
      ? `<div class="thread-stamp">${esc(fmtTime(thread.ts))}</div>`
      : "";
    wrap.innerHTML = `${stamp}<div class="phone-thread"></div>`;
    const th = wrap.querySelector(".phone-thread");
    thread.msgs.forEach(m => {
      const b = document.createElement("div");
      b.className = "bubble " + m.who;
      b.textContent = m.text;
      th.appendChild(b);
    });
    list.appendChild(wrap);
  });
  // Like a real chat: oldest at top, newest at the bottom, pinned to the latest.
  list.scrollTop = list.scrollHeight;
}

/* v0.7.0: no target species anymore, so the nudge picks an untagged
   shark to point at — a useful direction, not a correction. */
function afterExpedition(plan) {
  /* A trip with a successful tag already got its Sarah moment — the
     species-relevant celebration thread. Don't follow it minutes later
     with an unrelated random fact. */
  if (state.taggedThisTrip) return;
  let thread;
  if (state.failures >= 3) {
    // gentle nudge, genuine-conversation style
    const candidates = untagged();
    const s = candidates.length ? pick(candidates) : pick(SHARKS);
    thread = [
      { who: "them", text: "how's the shark hunting going??" },
      { who: "me", text: "Honestly? Struck out a few times. The water's been empty." },
      { who: "them", text: COUSIN_NUDGES[s.id] || "you'll get the next one!! i believe in you" },
      { who: "me", text: "Huh. Okay, that's actually really helpful. Thanks, kiddo." }
    ];
    state.failures = 0;
  } else {
    const chat = COUSIN_CHATS[state.chatIdx % COUSIN_CHATS.length];
    state.chatIdx += 1;
    thread = [
      { who: "them", text: chat.them },
      { who: "me", text: chat.me }
    ];
  }
  pushThread(thread);
}

/* ---------- Tagging ---------- */

const rand = (a, b) => Math.round((a + Math.random() * (b - a)) * 10) / 10;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* v0.7.3: flavour lines are dealt like cards — shuffled per trip, each
   line once, so phrases never repeat within a day. */
function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
let tripDecks = null;
function deal(deck, pool) {
  if (!deck.length) deck.push(...shuffled(pool));
  return deck.pop();
}

/* ---------- Tagging: tag -> health check -> release ----------
   v0.7.0: tagging happens mid-trip and the day goes on. After the tag is
   saved, a health-check beat runs (tag seated, vitals noted), then the
   shark is released and the expedition resumes — doneCb continues the trip. */
function openTagging(species, doneCb) {
  state.pendingTag = species;
  state.encounterDone = doneCb || null;
  const length = rand(species.sizeRange[0], species.sizeRange[1]);
  const sex = Math.random() < 0.5 ? "female" : "male";
  const researchId = mintResearchId(species);
  state.pendingTag._gen = { length, sex, researchId };
  $("tagForm").classList.remove("hidden");
  $("healthView").classList.add("hidden");
  $("tagSharkArt").innerHTML = ART[species.id];
  $("tagInfo").innerHTML = `
    <strong>${species.name}</strong> <em>(${species.latin})</em><br>
    🔬 Research ID: <strong>${researchId}</strong> (assigned automatically)<br>
    📏 ${length} m &nbsp;·&nbsp; ${sex === "female" ? "♀ female" : "♂ male"}<br>
    📍 Tagged at: ${REGIONS[state.currentPlan.region].name}<br>
    📅 ${new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
  `;
  $("sharkName").value = "";
  $("sharkName").placeholder = pick(species.nameIdeas) + "…";
  $("tagOverlay").classList.remove("hidden");
  setTimeout(() => $("sharkName").focus(), 100);
}

function confirmTag(name) {
  const s = state.pendingTag;
  if (!s) return;
  const regionName = REGIONS[state.currentPlan.region].name;
  const dateStr = new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const rec = {
    name: name || "",
    researchId: s._gen.researchId,
    length: s._gen.length,
    sex: s._gen.sex,
    location: regionName,
    date: dateStr,
    track: genTrack(s, { location: regionName, date: dateStr })
  };
  state.tagged[s.id] = rec;
  state.taggedThisTrip = true;
  store.save(state.tagged);
  state.pendingTag = null;
  // Sarah celebrates wins, not just failures: excitement + a bonus fact.
  // v0.6.0: the opener varies per species (draft openers — Avery to revise).
  pushThread([
    { who: "them", text: s.opener },
    { who: "me", text: `A ${s.name} — ${rec.length} metres, ${rec.sex}. Research ID ${rec.researchId}.` },
    { who: "them", text: s.cheer }
  ]);
  maybeSarahEgg(s.id, rec);
  checkMilestones();
  renderAll();
  showHealthCheck(s, rec);
}

function showHealthCheck(s, rec) {
  state.healthSpecies = s;
  $("tagForm").classList.add("hidden");
  $("healthView").classList.remove("hidden");
  $("healthArt").innerHTML = ART[s.id];
  $("healthInfo").innerHTML = `
    <strong>${s.name}</strong> — ${esc(rec.researchId)}<br>
    🩺 Health check: ${rec.sex === "female" ? "♀ female" : "♂ male"}, ${rec.length} m.<br>
    Tag seated well, swimming strongly, good body condition.<br>
    <em>Every shark released healthy. 🦈</em>
  `;
}

$("releaseBtn").addEventListener("click", () => {
  const done = state.encounterDone;
  const s = state.healthSpecies;
  state.encounterDone = null;
  state.healthSpecies = null;
  $("tagOverlay").classList.add("hidden");
  if (s) {
    logLine(`🌊 The ${s.name} kicks once and is gone — back to its life, carrying your tag.`);
  }
  renderAll();
  if (done) done();
});

/* ---------- Milestones & win state ----------
   v0.7.0: two stages.
   - Tagging the first six (the original roster) unlocks the Galápagos and
     South Africa as real, selectable waters.
   - Tagging all twelve wins the game: Master Shark Tagger. */
function checkMilestones() {
  const taggedIds = Object.keys(state.tagged);
  if (!state.regionsUnlocked && ORIGINAL_SIX.every(id => taggedIds.includes(id))) {
    state.regionsUnlocked = true;
    try { localStorage.setItem("tyi-regions", "1"); } catch {}
    for (const id of ["galapagos", "south-africa"]) REGIONS[id].locked = false;
    fillRegions();
    pushThread(REGION_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlock();
  }
  if (taggedIds.length >= SHARKS.length && !state.won) {
    /* The ceremony waits for day's end — the trip always finishes first. */
    state.pendingWin = true;
  }
}

function showRegionUnlock() {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  ov.innerHTML = `<div class="phone">
    <div class="phone-head">🗺️ New waters surveyed</div>
    <div class="cert-body">
      <p><strong>Galápagos Islands</strong> — marine iguanas slip into the water nearby.</p>
      <p><strong>South Africa</strong> — cape fur seals bark on the rocks above.</p>
      <p class="latin">Six successful tags. The institute trusts you with farther waters now — and Sarah texted you about it. 📱</p>
    </div>
    <button id="winNext" class="primary-button" type="button">Back to the water</button>
  </div>`;
  $("winNext").addEventListener("click", () => {
    ov.classList.add("hidden");
  });
}

const WIN_THREAD = [
  { who: "them", text: "you did it. you tagged ALL of them." },
  { who: "me", text: "Twelve for twelve. Couldn't have done it without my research assistant." },
  { who: "them", text: "i'm going to tell EVERYONE at school that my cousin is a REAL shark scientist. this is the best day of my whole life" },
  { who: "me", text: "Best day of mine too, kiddo. 🦈" }
];

/* ---------- Win state: a ceremony in three beats ----------
   (a) certificate, (b) the phone buzzes with Sarah's text,
   (c) the acknowledgement. Each lands separately — a moment, not a checklist. */
function doWin() {
  state.won = true;
  try { localStorage.setItem("tyi-won", "1"); } catch {}
  renderCollection();
  renderResearch();
  renderSightings();
  winStep(1);
}

function winStep(n) {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  const box = (inner) => { ov.innerHTML = `<div class="phone">${inner}</div>`; };

  if (n === 1) {
    /* Beat 1: the certificate. */
    box(`
      <div class="cert-trophy" style="font-size:52px; text-align:center">🏆</div>
      <h2 style="text-align:center; margin:8px 0 2px">Master Shark Tagger</h2>
      <p class="latin" style="text-align:center">All ${SHARKS.length} sharks tagged — officially.</p>
      <div class="cert-body">
        <p>This certifies our conservation scientist as a <strong>Master Shark Tagger</strong>, in recognition of ${SHARKS.length} successful tags and ${SHARKS.length} healthy releases.</p>
      </div>
      <button id="winNext" class="primary-button" type="button">Continue</button>`);
    $("winNext").addEventListener("click", () => winStep(2));

  } else if (n === 2) {
    /* Beat 2: the phone buzzes — Sarah's heartfelt text arrives. */
    pushThread(WIN_THREAD.map(m => ({ ...m })));
    box(`
      <div class="phone-head buzz-phone">📱 Your phone buzzes…</div>
      <div class="phone-thread win-thread"></div>
      <p class="latin" style="text-align:center; margin:0">Saved in 📱 Phone.</p>
      <button id="winNext" class="primary-button" type="button">Continue</button>`);
    const th = ov.querySelector(".win-thread");
    WIN_THREAD.forEach(m => {
      const b = document.createElement("div");
      b.className = "bubble " + m.who;
      b.textContent = m.text;
      th.appendChild(b);
    });
    $("winNext").addEventListener("click", () => winStep(3));

  } else {
    /* Beat 3: the acknowledgement — it lives here now, not on the Research tab. */
    box(`
      <div class="ack-card" style="margin-top:0">
        <p class="eyebrow">ACKNOWLEDGEMENTS</p>
        <p class="ack-name">For <span>Sarah</span></p>
        <p>who finished Rockhound at 1:26 AM and loves sharks. 🦈</p>
      </div>
      <button id="winNext" class="primary-button" type="button">Back to the collection book</button>`);
    $("winNext").addEventListener("click", () => {
      ov.classList.add("hidden");
      goTab("collection");
    });
  }
}

/* Easter egg: name a shark "Sarah" and the cousin finds out. */
function maybeSarahEgg(speciesId, rec) {
  if (!rec || rec.sarahEgg) return;
  if ((rec.name || "").trim().toLowerCase() === "sarah") {
    rec.sarahEgg = true;
    store.save(state.tagged);
    pushThread(SARAH_EGG_THREAD.map(m => ({ ...m })));
  }
}

$("tagConfirm").addEventListener("click", () => confirmTag($("sharkName").value.trim()));

/* ---------- Collection book: compact grid, tap for detail ---------- */

function displayName(t) {
  return t.name ? `“${esc(t.name)}”` : "";
}
function idLine(t) {
  return `<span class="research-id">🔬 ${esc(t.researchId || "")}</span>`;
}

function renderCollection() {
  const list = $("collectionList");
  list.innerHTML = "";
  const shelf = $("trophyShelf");
  shelf.innerHTML = "";
  const ids = Object.keys(state.tagged);
  $("collectionCount").textContent = `${ids.length}/${SHARKS.length}`;

  /* v0.6.0: the trophy sits ABOVE the grid on its own distinguished shelf —
     never as a grid slot that reads like "one more shark to catch". */
  if (state.won) {
    const t = document.createElement("button");
    t.type = "button";
    t.className = "trophy-shelf";
    t.setAttribute("aria-label", "Open your Master Shark Tagger certificate");
    t.innerHTML = `
      <div class="cert-trophy">🏆</div>
      <h3>Master Shark Tagger</h3>
      <p class="latin">Official certificate — tap to view</p>`;
    t.addEventListener("click", openCertificate);
    shelf.appendChild(t);
  }

  if (!ids.length && !state.won) {
    list.innerHTML = `<div class="empty-note">No sharks tagged yet.<br>Do your research, then get out there. 🦈</div>`;
    return;
  }
  SHARKS.filter(s => state.tagged[s.id]).forEach(s => {
    const t = state.tagged[s.id];
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "grid-cell";
    cell.setAttribute("aria-label", `Open details for ${t.name ? esc(t.name) : esc(t.researchId)} ${s.name}`);
    cell.innerHTML = `
      <div class="shark-art">${ART[s.id]}</div>
      ${t.name ? `<div class="grid-name">“${esc(t.name)}”</div>` : ""}
      <div class="grid-id">${esc(t.researchId)}</div>
      <h3>${s.name}</h3>
      <p class="latin">${s.latin}</p>`;
    cell.addEventListener("click", () => openDetail(s.id));
    list.appendChild(cell);
  });
}

function openCertificate() {
  const c = $("detailContent");
  c.innerHTML = `
    <div class="cert-trophy" style="font-size:44px">🏆</div>
    <h3 style="margin:6px 0 0">Master Shark Tagger</h3>
    <p class="latin">Tag, You're It — field program</p>
    <div class="cert-body">
      <p>This certifies our conservation scientist as a <strong>Master Shark Tagger</strong>, in recognition of ${SHARKS.length} successful tags and ${SHARKS.length} healthy releases.</p>
      <p class="cert-sig">Awarded with salt on it. 🦈</p>
    </div>`;
  $("detailOverlay").classList.remove("hidden");
}

function openDetail(id) {
  const s = sharkById(id);
  const t = state.tagged[id];
  const c = $("detailContent");
  c.innerHTML = `
    <div class="shark-art">${ART[s.id]}</div>
    ${t.name ? `<div class="given-name">“${esc(t.name)}”</div>` : ""}
    <div class="detail-name-row">
      ${idLine(t)}
      <button id="renameBtn" class="mini-button" type="button">✏️ ${t.name ? "Rename" : "Add nickname"}</button>
    </div>
    <div id="renameForm" class="hidden">
      <input id="renameInput" type="text" maxlength="24" value="${esc(t.name)}" placeholder="Name your shark…" />
      <div class="rename-actions">
        <button id="renameSave" class="primary-button" type="button">Save</button>
        <button id="renameCancel" class="secondary-button" type="button">Cancel</button>
      </div>
    </div>
    <h3 style="margin:6px 0 0">${s.name}</h3>
    <p class="latin">${s.latin}</p>
    <span class="status-pill">IUCN: ${s.status}</span>
    <p class="book-stats">
      📏 ${t.length} m · ${t.sex === "female" ? "♀ female" : "♂ male"}<br>
      📍 Tagged at ${esc(t.location)}<br>
      📅 ${esc(t.date)}
    </p>
    <button id="trackBtn" class="secondary-button" type="button" style="margin:4px 0 8px">📍 Track this shark</button>
    <p class="hook">💡 ${s.hook}</p>
    <p class="bonus-fact">✨ ${s.bonus}</p>
  `;
  $("detailOverlay").classList.remove("hidden");
  $("trackBtn").addEventListener("click", () => openTrack(id));
  $("renameBtn").addEventListener("click", () => {
    $("renameForm").classList.remove("hidden");
    $("renameBtn").classList.add("hidden");
    const inp = $("renameInput");
    inp.focus();
    inp.select();
  });
  $("renameCancel").addEventListener("click", () => {
    $("renameForm").classList.add("hidden");
    $("renameBtn").classList.remove("hidden");
  });
  $("renameSave").addEventListener("click", () => {
    t.name = $("renameInput").value.trim();
    store.save(state.tagged);
    maybeSarahEgg(id, t);
    renderCollection();
    renderResearch();
    openDetail(id);
  });
}

/* ---------- Shark tracking: where are they now? ---------- */

function openTrack(id) {
  const s = sharkById(id);
  const t = state.tagged[id];
  if (!t.track) { t.track = genTrack(s, t); store.save(state.tagged); }
  const tr = t.track;
  const W = 320, H = 168, pad = 26;
  const n = tr.points.length;
  const pts = tr.points.map((p, i) => {
    const x = pad + (n === 1 ? 0.5 : i / (n - 1)) * (W - pad * 2);
    const jitter = ((hashStr(p.label) % 100) / 100 - 0.5) * (H - pad * 2 - 30);
    const y = Math.round(H / 2 + jitter);
    return { x: Math.round(x), y, p };
  });
  const pathD = pts.map((pt, i) => (i === 0 ? "M" : "L") + pt.x + " " + pt.y).join(" ");
  const dots = pts.map((pt, i) => {
    const first = i === 0, last = i === pts.length - 1;
    return `<circle cx="${pt.x}" cy="${pt.y}" r="${last ? 6 : 4}" fill="${last ? "#ffd166" : "#4fd1c5"}" stroke="#0b2237" stroke-width="2"/>
      ${first || last ? `<text x="${pt.x}" y="${pt.y - 10}" text-anchor="middle" fill="#a9c3d6" font-size="9">${esc(first ? "tagged here" : "last ping")}</text>` : ""}`;
  }).join("");
  const last = tr.points[tr.points.length - 1];
  const stops = tr.points.map((p, i) =>
    `<li>${i === 0 ? "📍" : "▫️"} Day ${p.day} — ${esc(p.label)}${p.km ? ` <span class="dim">(+${p.km.toLocaleString()} km)</span>` : ""}</li>`
  ).join("");
  const title = t.name ? `“${esc(t.name)}”` : esc(t.researchId);
  $("trackContent").innerHTML = `
    <div class="phone-head">📍 Tracking ${title} <span class="research-id">${esc(t.researchId)}</span></div>
    <svg viewBox="0 0 ${W} ${H}" class="track-map" role="img" aria-label="Migration track map">
      <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="#0a1c30"/>
      ${[0.25, 0.5, 0.75].map(f => `<line x1="0" y1="${H * f}" x2="${W}" y2="${H * f}" stroke="#16405f" stroke-width="1" stroke-dasharray="4 6"/>`).join("")}
      <path d="${pathD}" fill="none" stroke="#4fd1c5" stroke-width="2.5" stroke-dasharray="7 5" opacity="0.85"/>
      ${dots}
    </svg>
    <div class="track-stats">
      <div><strong>${tr.totalKm.toLocaleString()} km</strong><span>travelled</span></div>
      <div><strong>${tr.days} days</strong><span>at liberty</span></div>
      <div><strong>${tr.points.length}</strong><span>locations</span></div>
    </div>
    <ul class="track-stops">${stops}</ul>
    <p class="track-note">Last ping: <strong>${esc(last.label)}</strong> · day ${last.day}<br>
    <span class="dim">Illustrative track — real satellite tags ping just like this. 🛰️</span></p>
  `;
  $("trackOverlay").classList.remove("hidden");
}

$("trackClose").addEventListener("click", () => {
  $("trackOverlay").classList.add("hidden");
});
$("trackOverlay").addEventListener("click", (e) => {
  if (e.target === $("trackOverlay")) $("trackOverlay").classList.add("hidden");
});

$("detailClose").addEventListener("click", () => {
  $("detailOverlay").classList.add("hidden");
});
$("detailOverlay").addEventListener("click", (e) => {
  if (e.target === $("detailOverlay")) $("detailOverlay").classList.add("hidden");
});

/* ---------- Hard progress reset ----------
   v0.7.0: a full wipe for replay and testing — not prestige, no bonuses,
   just a clean restart. Two explicit steps so it can't be hit by accident. */
const RESET_KEYS = ["tyi-collection", "tyi-messages", "tyi-won", "tyi-idseq", "tyi-sightings", "tyi-regions"];
$("resetBtn").addEventListener("click", () => {
  $("resetOverlay").classList.remove("hidden");
});
$("resetCancel").addEventListener("click", () => {
  $("resetOverlay").classList.add("hidden");
});
$("resetOverlay").addEventListener("click", (e) => {
  if (e.target === $("resetOverlay")) $("resetOverlay").classList.add("hidden");
});
$("resetConfirm").addEventListener("click", () => {
  RESET_KEYS.forEach(k => { try { localStorage.removeItem(k); } catch {} });
  location.reload();
});

/* ---------- Boot ---------- */

function renderAll() {
  renderResearch();
  renderPlanner();
  renderCollection();
  renderSightings();
  renderMessages();
  updateMsgBadge();
}

migrateIds();
migrateTracks();
migrateWinV07();
fillRegions();
fillSelect($("depthSelect"), DEPTHS);
fillSelect($("baitSelect"), BAITS);
$("buildTag").textContent = VERSION;
$("phoneTime").textContent =
  new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
renderAll();
