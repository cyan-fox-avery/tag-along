/* Tag, You're It — prototype v0.5.0
   Research -> plan (region/depth/bait) -> dive -> tag -> collection book. */

"use strict";

/* Build number — shown in the top corner of the page. Bump every release. */
const VERSION = "v0.5.0";

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
  </svg>`
};

/* ---------- Data ---------- */

const REGIONS = {
  "caribbean":    { name: "Caribbean Sea",        note: "A green sea turtle glides past the reef." },
  "baja":         { name: "Baja California",      note: "A school of sardines shimmers below." },
  "philippines":  { name: "Philippines",          note: "A manta ray loops lazily overhead." },
  "maldives":     { name: "Maldives",             note: "Dolphins click and whistle in the distance." },
  "japan":        { name: "Sagami Bay, Japan",    note: "A lanternfish flickers in the dark." },
  "mediterranean":{ name: "Mediterranean Sea",    note: "A pod of dolphins crosses the bow." },
  "open-atlantic":{ name: "Open Atlantic",        note: "Shearwaters wheel above the swells." },
  /* Win-state reward: these unlock once all six sharks are tagged. */
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
   Read like a scientist, not a checklist. */
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
    nameIdeas: ["Toothy", "Grin", "Smiley", "Baja"]
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
  goblin:  "goblin sharks live SO deep. twilight zone to the real deep dark, like 270 to 960 metres!! there's a deep bay in japan where scientists find them. squid bait!!"
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

/* Flavour: the dive log describes the place, not just the mechanics. */
const DEPTH_FLAVOUR = {
  surface: [
    "Sunlight shatters across the surface in moving panes. The water is warm and impossibly clear.",
    "The surface chop rocks the boat gently. Below, everything glows blue-green.",
    "You can see the boat's shadow drifting above you, a dark shape on the bright ceiling of the sea."
  ],
  reef: [
    "Coral heads rise like a drowned city. Small bright fish dart between the branches.",
    "The reef hums — not with sound, but with movement. Everything here is busy.",
    "A cleaning station bustles below: tiny fish picking parasites off a patient grouper."
  ],
  twilight: [
    "The light thins to a deep indigo. Your eyes adjust slowly to the dim.",
    "Particles drift past like snow falling upward. It is very quiet down here.",
    "The slope falls away into darkness to one side. You feel the depth more than see it."
  ],
  deep: [
    "There is no light left to speak of — only the glow of the submersible and the dark pressing in.",
    "The seafloor, when the lights catch it, is soft grey mud, undisturbed for longer than you've been alive.",
    "Every movement down here feels deliberate. Nothing wastes energy in the deep."
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

/* Rare, quiet easter eggs in the flavour. Real phenomena, mentioned in passing. */
const EASTER_EGGS = [
  { depths: ["surface", "twilight"],
    text: "For a moment the water sparkles — bioluminescent algae, disturbed by the current, flashing like wet stars." },
  { depths: ["twilight", "deep"],
    text: "A vast dark shape looms to one side — the silhouette of a scuttled ship, long since given back to the sea." },
  { depths: ["surface"],
    text: "The water is so clear it looks color-corrected, like the establishing shot of a nature documentary." },
  { depths: ["twilight"],
    text: "This is the kind of dark water old monster movies warned you about. You check over your shoulder anyway." }
];

/* ---------- Shark tracking: simulated satellite-tag data ---------- */

const TRACK_POOLS = {
  nurse:     { spots: ["Coral Gardens", "Mangrove Channel", "Seagrass Flats", "The Ledge", "Turtle Cove"], hop: [4, 38] },
  thresher:  { spots: ["Continental Slope", "Seamount X", "Upwelling Zone", "Open Atlantic Drift", "Deep Scattering Layer"], hop: [120, 480] },
  whale:     { spots: ["Tubbataha Reefs", "Sulu Sea", "Coral Triangle", "Bird's Head Seascape", "Western Pacific"], hop: [300, 1400] },
  goblin:    { spots: ["Tokyo Canyon", "Izu Ridge", "Suruga Slope", "Deep Terrace", "Canyon Mouth"], hop: [40, 220] },
  tiger:     { spots: ["Rasdhoo Atoll", "Chagos Archipelago", "Open Indian Ocean", "Seychelles Bank", "Saya de Malha"], hop: [150, 700] },
  sandtiger: { spots: ["Kelp Edge", "Rocky Point", "Sandy Flats", "Canyon Mouth", "Wreck Reef"], hop: [20, 120] }
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

const state = {
  tagged: store.load(),   // id -> {name, researchId, length, sex, location, date, sarahEgg, track}
  failures: 0,
  chatIdx: _savedMsgs.chatIdx || 0,
  messages: _savedMsgs.messages || [],
  unread: _savedMsgs.unread || 0,
  pendingTag: null,       // species object awaiting naming
  won: (() => { try { return localStorage.getItem("tyi-won") === "1"; } catch { return false; } })()
};
function saveMsgs() {
  msgStore.save({ messages: state.messages, unread: state.unread, chatIdx: state.chatIdx });
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
migrateIds();
migrateTracks();

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
    if (btn.dataset.tab === "messages" && state.unread > 0) {
      state.unread = 0;
      saveMsgs();
      updateMsgBadge();
    }
  });
});
function goTab(name) {
  document.querySelector(`.tab[data-tab="${name}"]`).click();
}

/* ---------- Research ---------- */

function renderResearch() {
  const list = $("researchList");
  list.innerHTML = "";
  SHARKS.forEach(s => {
    const done = !!state.tagged[s.id];
    const card = document.createElement("div");
    card.className = "species-card";
    card.innerHTML = `
      <div class="shark-art">${ART[s.id]}</div>
      <h3>${s.name} ${done ? "✅" : ""}</h3>
      <p class="latin">${s.latin}</p>
      <span class="status-pill">IUCN: ${s.status}</span>
      <p class="research-text">${s.research}</p>
      ${done
        ? `<p class="hook">Tagged ${idLine(state.tagged[s.id])}${state.tagged[s.id].name ? ` as <strong>${esc(state.tagged[s.id].name)}</strong>` : ""} 🎉</p>`
        : `<button class="secondary-button" data-plan="${s.id}" type="button">Plan an expedition for this shark</button>`}
    `;
    list.appendChild(card);
  });
  list.querySelectorAll("[data-plan]").forEach(b =>
    b.addEventListener("click", () => {
      $("targetSelect").value = b.dataset.plan;
      goTab("expedition");
    })
  );
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
      o.textContent = `🔒 ${v.name} — tag all ${SHARKS.length} sharks to unlock`;
      o.disabled = true;
    } else {
      o.textContent = v.name;
    }
    el.appendChild(o);
  });
  if (current && REGIONS[current] && !REGIONS[current].locked) el.value = current;
}

function renderPlanner() {
  const t = $("targetSelect");
  const current = t.value;
  t.innerHTML = "";
  untagged().forEach(s => {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = s.name;
    t.appendChild(o);
  });
  if (untagged().some(s => s.id === current)) t.value = current;
  if (!untagged().length) {
    $("planner").innerHTML = `<p class="research-text" style="text-align:center">All six sharks tagged! Check your collection book. 🎉</p>`;
  }
}

$("launchBtn").addEventListener("click", () => {
  if (!untagged().length) return;
  runExpedition({
    target: $("targetSelect").value,
    region: $("regionSelect").value,
    depth: $("depthSelect").value,
    bait: $("baitSelect").value
  });
});

/* ---------- Expedition ---------- */

function logLine(html, cls) {
  const p = document.createElement("p");
  if (cls) p.className = cls;
  p.innerHTML = html;
  $("diveLog").appendChild(p);
  p.scrollIntoView({ block: "nearest", behavior: "smooth" });
}
const wait = (ms) => new Promise(r => setTimeout(r, ms));

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
   alive first. One sighting always lands; a rare easter egg may join it. */
async function showSighting(depth) {
  // Rare, quiet easter eggs: real phenomena, mentioned in passing.
  if (Math.random() < 0.22) {
    const eggs = EASTER_EGGS.filter(e => e.depths.includes(depth));
    if (eggs.length) {
      logLine(`✨ ${pick(eggs).text}`, "flavour");
      await wait(1500);
    }
  }
  const options = SIGHTINGS[depth] || [];
  if (options.length) {
    const s = pick(options);
    logLine(`👁️ ${s.text}`, "flavour");
    spawnCreature(s.creature);
  }
}

async function runExpedition(plan) {
  const target = sharkById(plan.target);
  $("launchBtn").disabled = true;
  $("diveView").classList.remove("hidden");
  $("diveActions").classList.add("hidden");
  $("diveActions").innerHTML = "";
  $("diveLog").innerHTML = "";
  $("diveShark").classList.add("hidden");

  const scene = $("diveScene");
  scene.className = "dive-scene " + DEPTHS[plan.depth].scene;

  const baitText = plan.bait === "plankton"
    ? "No bait — scanning the water for a plankton bloom…"
    : `Bait deployed: ${BAITS[plan.bait]}.`;

  logLine(`🛥️ <strong>Expedition begun</strong> — the research vessel leaves the harbor.`);
  await wait(1700);
  logLine(`🪝 ${baitText}`);
  await wait(1700);
  logLine(`🐟 First fish appear in the blue…`);
  await wait(1800);
  logLine(`👀 ${REGIONS[plan.region].note}`);
  await wait(1900);
  logLine(`🌊 ${pick(DEPTH_FLAVOUR[plan.depth])}`, "flavour");
  await wait(1900);
  // The scene must feel alive before the shark: at least one sighting,
  // always, plus a rare quiet easter egg.
  await showSighting(plan.depth);
  await wait(2000);
  logLine(`⏳ The hours slip by…`);
  await wait(1900);
  logLine(`🌊 The light shifts. The water goes still. Something moves below…`);
  await wait(2100);

  // Who shows up? Any species whose region + bait match and whose depth
  // range includes the chosen depth. There's no single "right" depth.
  // (Tiger sharks aren't picky eaters: their bait entry is a list.)
  const appeared = SHARKS.filter(s => {
    const baitOk = Array.isArray(s.combo.bait)
      ? s.combo.bait.includes(plan.bait)
      : s.combo.bait === plan.bait;
    return s.combo.region === plan.region &&
      s.depths.includes(plan.depth) &&
      baitOk;
  });
  const taggable = appeared.filter(s => !state.tagged[s.id]);
  const alreadyTagged = appeared.filter(s => state.tagged[s.id]);

  const actions = $("diveActions");
  actions.classList.remove("hidden");

  if (taggable.length) {
    const s = taggable[0];
    $("diveShark").innerHTML = ART[s.id];
    $("diveShark").classList.remove("hidden");
    logLine(`🦈 <span class="found">SHARKS! A ${s.name}!</span>`, "found");
    state.failures = 0;
    const tagBtn = document.createElement("button");
    tagBtn.className = "primary-button";
    tagBtn.type = "button";
    tagBtn.textContent = `🏷️ Tag the ${s.name}`;
    tagBtn.addEventListener("click", () => openTagging(s));
    actions.appendChild(tagBtn);
  } else if (alreadyTagged.length) {
    const s = alreadyTagged[0];
    const rec = state.tagged[s.id];
    $("diveShark").innerHTML = ART[s.id];
    $("diveShark").classList.remove("hidden");
    logLine(`🦈 <span class="found">Look who it is — ${rec.name ? `“${esc(rec.name)}”` : esc(rec.researchId)}, already in your book!</span>`, "found");
    state.failures = 0;
  } else {
    logLine(`<span class="miss">The water stays empty. Time to head back.</span>`, "miss");
    state.failures += 1;
  }

  const backBtn = document.createElement("button");
  backBtn.className = "secondary-button";
  backBtn.type = "button";
  backBtn.textContent = "Return to ship";
  backBtn.addEventListener("click", () => {
    $("diveView").classList.add("hidden");
    $("launchBtn").disabled = false;
    renderPlanner();
    renderCollection();
    renderResearch();
    afterExpedition(plan.target);
  });
  actions.appendChild(backBtn);
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
  [...state.messages].reverse().forEach(thread => {
    const card = document.createElement("div");
    card.className = "species-card";
    card.innerHTML = `<div class="phone-head">📱 Texts with Sarah</div><div class="phone-thread"></div>`;
    const th = card.querySelector(".phone-thread");
    thread.forEach(m => {
      const b = document.createElement("div");
      b.className = "bubble " + m.who;
      b.textContent = m.text;
      th.appendChild(b);
    });
    list.appendChild(card);
  });
}

function afterExpedition(targetId) {
  let thread;
  if (state.failures >= 3) {
    // gentle nudge, genuine-conversation style
    thread = [
      { who: "them", text: "how's the shark hunting going??" },
      { who: "me", text: "Honestly? Struck out a few times. This one's tricky." },
      { who: "them", text: COUSIN_NUDGES[targetId] || "you'll get the next one!! i believe in you" },
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
  state.messages.push(thread);
  state.unread += 1;
  saveMsgs();
  updateMsgBadge();
  renderMessages();
}

/* ---------- Tagging ---------- */

const rand = (a, b) => Math.round((a + Math.random() * (b - a)) * 10) / 10;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function openTagging(species) {
  state.pendingTag = species;
  const length = rand(species.sizeRange[0], species.sizeRange[1]);
  const sex = Math.random() < 0.5 ? "female" : "male";
  const researchId = mintResearchId(species);
  state.pendingTag._gen = { length, sex, researchId };
  $("tagSharkArt").innerHTML = ART[species.id];
  $("tagInfo").innerHTML = `
    <strong>${species.name}</strong> <em>(${species.latin})</em><br>
    🔬 Research ID: <strong>${researchId}</strong> (assigned automatically)<br>
    📏 ${length} m &nbsp;·&nbsp; ${sex === "female" ? "♀ female" : "♂ male"}<br>
    📍 Tagged at: ${REGIONS[$("regionSelect").value].name}<br>
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
  const rec = {
    name: name || "",
    researchId: s._gen.researchId,
    length: s._gen.length,
    sex: s._gen.sex,
    location: REGIONS[$("regionSelect").value].name,
    date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
    track: genTrack(s, {
      location: REGIONS[$("regionSelect").value].name,
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    })
  };
  state.tagged[s.id] = rec;
  store.save(state.tagged);
  $("tagOverlay").classList.add("hidden");
  $("diveView").classList.add("hidden");
  const lb = $("launchBtn");
  if (lb) lb.disabled = false;
  state.pendingTag = null;
  // Sarah celebrates wins, not just failures: excitement + a bonus fact.
  state.messages.push([
    { who: "them", text: `YOU TAGGED ONE?!?! tell me EVERYTHING` },
    { who: "me", text: `A ${s.name} — ${rec.length} metres, ${rec.sex}. Research ID ${rec.researchId}. Released healthy. 🦈` },
    { who: "them", text: s.cheer }
  ]);
  state.unread += 1;
  saveMsgs();
  updateMsgBadge();
  renderMessages();
  maybeSarahEgg(s.id, rec);
  renderAll();
  // Win state: all six tagged.
  if (Object.keys(state.tagged).length >= SHARKS.length && !state.won) {
    doWin();
  } else {
    goTab("collection");
  }
}

/* ---------- Win state ---------- */

const WIN_THREAD = [
  { who: "them", text: "you did it. you tagged ALL of them." },
  { who: "me", text: "Six for six. Couldn't have done it without my research assistant." },
  { who: "them", text: "i'm going to tell EVERYONE at school that my cousin is a REAL shark scientist. this is the best day of my whole life" },
  { who: "me", text: "Best day of mine too, kiddo. 🦈" }
];

function doWin() {
  state.won = true;
  try { localStorage.setItem("tyi-won", "1"); } catch {}
  // Usable reward: two new regions open up.
  REGIONS.galapagos.locked = false;
  REGIONS["south-africa"].locked = false;
  fillRegions();
  renderPlanner();
  // Sarah's heartfelt text.
  state.messages.push(WIN_THREAD);
  state.unread += 1;
  saveMsgs();
  updateMsgBadge();
  renderMessages();
  renderCollection();
  renderResearch();
  $("winOverlay").classList.remove("hidden");
}

$("winContinue").addEventListener("click", () => {
  $("winOverlay").classList.add("hidden");
  goTab("collection");
});

/* Easter egg: name a shark "Sarah" and the cousin finds out. */
function maybeSarahEgg(speciesId, rec) {
  if (!rec || rec.sarahEgg) return;
  if ((rec.name || "").trim().toLowerCase() === "sarah") {
    rec.sarahEgg = true;
    store.save(state.tagged);
    state.messages.push(SARAH_EGG_THREAD);
    state.unread += 1;
    saveMsgs();
    updateMsgBadge();
    renderMessages();
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
  const ids = Object.keys(state.tagged);
  $("collectionCount").textContent = `${ids.length}/${SHARKS.length}`;
  $("completeBanner").classList.toggle("hidden", ids.length < SHARKS.length);

  if (!ids.length && !state.won) {
    list.innerHTML = `<div class="empty-note">No sharks tagged yet.<br>Do your research, then get out there. 🦈</div>`;
    return;
  }
  // Ceremonial win reward: the Master Shark Tagger certificate lives here.
  if (state.won) {
    const cert = document.createElement("button");
    cert.type = "button";
    cert.className = "grid-cell cert-cell";
    cert.setAttribute("aria-label", "Open your Master Shark Tagger certificate");
    cert.innerHTML = `
      <div class="cert-trophy">🏆</div>
      <h3>Master Shark Tagger</h3>
      <p class="latin">Official certificate</p>`;
    cert.addEventListener("click", openCertificate);
    list.appendChild(cert);
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

/* ---------- Boot ---------- */

function renderAll() {
  renderResearch();
  renderPlanner();
  renderCollection();
  renderMessages();
  updateMsgBadge();
}

fillRegions();
fillSelect($("depthSelect"), DEPTHS);
fillSelect($("baitSelect"), BAITS);
$("buildTag").textContent = VERSION;
renderAll();
