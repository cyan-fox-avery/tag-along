/* game-data.js — core game data module (split from script.js in v0.20.0).
   Loaded BEFORE script.js; REGIONS, DEPTHS, BAITS, METHODS, LEGACY_LURES
   and SARAH_EGG_THREAD are global. Split when script.js hit the push size
   limit; pure data, no dependencies. */

/* ---------- Data ---------- */

const REGIONS = {
  "caribbean":    { name: "Caribbean Sea",        note: "A green sea turtle glides past the reef." },
  /* v0.9.0: sand tiger moved here from Baja California. WHY (for reviewers):
     FishBase gives Carcharias taurus as "Circumtropical: Except perhaps
     the eastern Pacific," so the old Baja placement was an outright error.
     The Outer Banks' WWII-era wrecks host the most famous sand tiger
     aggregation in the world — Paxton et al. 2019 (Ecology) documented
     female site fidelity to individual NC wrecks, backed by the Spot A
     Shark USA citizen-science photo-ID program. Bonus: the wrecks
     synergize with the game's scuttled-ship easter eggs — here, wrecks
     are documented habitat, not scenery. South Africa and E. Australia
     were considered but South Africa is a locked region and the sand
     tiger is an original-six start-region species. */
  "north-carolina": { name: "Outer Banks, North Carolina", note: "Below, the dark shapes of old wrecks rise from the sand — the Graveyard of the Atlantic." },
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
  "south-africa": { name: "South Africa",         note: "Cape fur seals bark on the rocks above.", locked: true },
  /* v0.21.0: three new regions for the 18-shark wave. All locked — new waters
     earned, not given. Placements are draft (pending Mira review): */
  "east-australia": { name: "Eastern Australia",  note: "Humpbacks breach beyond the headland.", locked: true },
  "california":   { name: "California Coast",     note: "Sea lions porpoise through the kelp beds.", locked: true },
  "arctic":       { name: "Arctic Waters",        note: "Icebergs drift past, impossibly blue at the waterline.", locked: true }
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
  "plankton":      "Plankton bloom — no bait, follow the bloom",
  /* v0.8.0: three new hook baits. Sardines fold into schooling fish —
     a separate row would add planner complexity without a real
     biological distinction. */
  "tuna":          "Tuna / large oily fish",
  "ray":           "Ray",
  "urchins":       "Urchins & shellfish"
};

/* v0.9.0: "Method" replaces the v0.8.0 scent-lure row. The planner asks HOW
   you'll try to meet the shark, and each top-level approach opens its own
   sub-menu of real field practices. A species only boosts on methods that
   are real for that animal — a whale shark never sees chum.
   Boost-only semantics kept from v0.8.0: the right method raises a
   species' encounter weight ~3x; a wrong method is neutral, never a gate.
   WHY this shape (for reviewers): ChatGPT's v0.8.0 review argued that
   forcing every shark through identical planner rows teaches something
   more general than the evidence supports — e.g. "krill scent" for whale
   sharks implied scenting the water works on filter feeders, when real
   practice is locating a feeding aggregation. So the planner is now
   asymmetric on purpose: hunters get attractants, filter feeders get
   aggregation-finding. The asymmetry teaches the animal.
   EXTENSION POINT for future versions: new top-level methods (deep
   deployment, seal decoy, BRUV, ...) slot in here with their own `opts`;
   add the method key to each species' `methods` map it genuinely fits. */
const METHODS = {
  "attract": {
    name: "Attract — scent in the water",
    subLabel: "Attractant",
    opts: {
      "none": "No attractant",
      "chum": "Fish-oil chum",
      "seal": "Seal scent"
    }
  },
  "aggregation": {
    name: "Find the aggregation",
    subLabel: "Approach",
    /* WHY these three (for reviewers): real whale/basking-shark field
       practice per 2026 research — see research notes below. Boat surveys
       at seasonal sites, aerial spotter surveys, and local sightings
       networks are the three genuinely distinct ways researchers locate
       feeding aggregations. All three boost equally: they are all real,
       so the choice is about fieldcraft flavor, recorded in the logbook. */
    opts: {
      "boat": "Boat survey of the bloom",
      "plane": "Spotter-plane survey",
      "network": "Local sightings network"
    }
  }
};

/* Legacy labels for pre-v0.9.0 logbook entries, so old trips still read
   sensibly after the scent-row removal. */
const LEGACY_LURES = { "none": "No lure", "chum": "Fish-oil chum", "seal": "Seal scent", "krill": "Krill scent" };





/* If you name a shark "Sarah", she finds out. Sweet, not progression. */
const SARAH_EGG_THREAD = [
  { who: "them", text: "Wait. You named a shark Sarah? Like me?" },
  { who: "me",   text: "Well... yeah. You're the reason I know half of this stuff." },
  { who: "them", text: "A shark with my name, out there somewhere carrying a tag. I don't think I'll ever get over that." },
  { who: "me",   text: "She's got your name now. I think she knows." }
];

/* v0.23.0: real-shark easter eggs. Mary Lee was a real great white — tagged
   Sept 17, 2012 off Cape Cod by OCEARCH, 4.9m mature female, ~50 years old,
   named for Chris Fischer's mother. "Matriarch of the Sea" with 130k Twitter
   followers. Tag went silent June 2017; presumed alive. */
const MARY_LEE_THREAD = [
  { who: "them", text: "WAIT. You named your great white Mary Lee?? Like THE Mary Lee?" },
  { who: "me",   text: "You know about her?" },
  { who: "them", text: "KNOW about her?? She was the most famous shark on the internet! OCEARCH tagged her off Cape Cod in 2012 — 16 feet, 3,500 pounds, like 50 years old. They called her the Matriarch of the Sea and she had 130 THOUSAND Twitter followers. A SHARK. WITH FANS." },
  { who: "me",   text: "That's incredible." },
  { who: "them", text: "Her tag went quiet in 2017 — battery died, probably. Her tag went quiet, so nobody knows for sure — but I like to think she's still out there. Every time I think about her I'm like... she's the queen and she doesn't even know it. Your Mary Lee has a LOT to live up to. 🩵" }
];

/* v0.23.0: Nicole was a real great white — tagged Nov 7, 2003 in Gansbaai,
   South Africa, 3.8m female named for Nicole Kidman. Swam 11,000 km to
   Western Australia in 99 days, then back — 20,000+ km round trip.
   Published in Science (Bonfil et al. 2005). */
const NICOLE_THREAD = [
  { who: "them", text: "Nicole!! Oh my god, like the real Nicole?" },
  { who: "me",   text: "There's a real Nicole?" },
  { who: "them", text: "YES. Tagged in South Africa in 2003 — they named her after Nicole Kidman, which is iconic honestly. Then she just... LEFT. Swam 11,000 kilometres to Western Australia. In 99 DAYS. The tag popped off in February and everyone thought that was the end of the story." },
  { who: "me",   text: "But it wasn't?" },
  { who: "them", text: "SHE CAME BACK. August 2004, back in Gansbaai. Over 20,000 km round trip. They published it in Science — it proved white sharks cross entire ocean basins. Before Nicole, nobody knew they did that. Your Nicole's got explorer genes. 🗺️🦈" }
];

/* v0.23.0: the Bruce chain. NO immediate message when triggered — Sarah
   pieces it together slowly over multiple sessions. Each stage is pushed
   separately via advanceBruceChain(). The full chain:
   1. Vague familiarity ("why does that name sound familiar...")
   2. Nagging memory (something about movies?)
   3. The realization (JAWS! The mechanical shark was named Bruce!)
   4. Delight + the Spielberg story (named after his lawyer)
   5. Full circle — hidden achievement unlocks here */
const BRUCE_CHAIN = [
  [
    { who: "them", text: "Hey. Random question. Why did you name that shark Bruce?" },
    { who: "me",   text: "Just felt right? Why?" },
    { who: "them", text: "No reason. It's just... tickling something in my brain. Like I've heard it before in a shark context. Anyway. Hi Bruce. 🦈" }
  ],
  [
    { who: "them", text: "OK it's been bugging me for DAYS. Bruce. Bruce the shark. Where do I know that from??" },
    { who: "me",   text: "Maybe you just like the name?" },
    { who: "them", text: "No no, it's something specific. Something about... movies? Ugh. It's on the tip of my tongue." }
  ],
  [
    { who: "them", text: "I FIGURED IT OUT." },
    { who: "me",   text: "Figured what out?" },
    { who: "them", text: "BRUCE. The mechanical shark from Jaws was named Bruce!! I remembered at 2am and sat straight up in bed. My mom thought something was wrong." },
    { who: "me",   text: "You're kidding." },
    { who: "them", text: "I am NOT kidding. The 1975 Jaws shark — the big animatronic one that kept breaking down — the crew named it Bruce." }
  ],
  [
    { who: "them", text: "Fun fact I just learned: they named it after Steven Spielberg's lawyer. Bruce Ramer. The most feared movie shark in history is named after a LAWYER. I can't stop laughing." },
    { who: "me",   text: "That's amazing." },
    { who: "them", text: "Right?? 'You're gonna need a bigger boat' — about a shark named after a guy who does contracts. Cinema is beautiful." }
  ],
  [
    { who: "them", text: "You know what, I love that you named a real, actual, beautiful shark Bruce. Like reclaiming the name. The movie Bruce was a malfunctioning robot that scared everyone. Your Bruce is out there being a perfect shark." },
    { who: "me",   text: "Reclaiming Bruce. I like that." },
    { who: "them", text: "Bruce forever. 🩵🦈" }
  ]
];


/* v0.9.1: live icon strips under each planner row. One small visual echo
   of the current pick per select, in the game's emoji style. The ray gets
   a simple styled oval ("dot:ray") — no honest emoji exists for it. Pure
   decoration; the selects remain the source of truth. */
const PICK_ICONS = {
  regionSelect: {
    "caribbean": "🏝️", "north-carolina": "⚓", "philippines": "🐠",
    "maldives": "🏖️", "japan": "🗾", "open-atlantic": "🌊",
    "cornwall": "🐦", "papua-new-guinea": "🪸",
    "galapagos": "🐢", "south-africa": "🦭",
    "east-australia": "🪸", "california": "🌊", "arctic": "🧊"
  },
  depthSelect: { "surface": "☀️", "reef": "🪸", "twilight": "🌅", "deep": "🌑" },
  baitSelect: {
    "crustaceans": "🦀", "squid": "🦑", "schooling-fish": "🐠",
    "plankton": "🦐", "tuna": "🐟", "ray": "dot:ray", "urchins": "🐚"
  },
  methodSelect: { "attract": "🪣", "aggregation": "🔍", "": "" },
  methodOptSelect: {
    "none": "–", "chum": "🪣", "seal": "🦭",
    "boat": "🚤", "plane": "✈️", "network": "📻"
  }
};
