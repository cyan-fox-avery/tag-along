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
  { who: "them", text: "Her tag went quiet in 2017 — battery died, probably. Nobody knows for sure where she is now, but I like to think she's still out there. Every time I think about her I'm like... she's the queen and she doesn't even know it. Your Mary Lee has a LOT to live up to. 🩵" }
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

/* v0.23.0: BRUCE easter egg chain — LOCKED DESIGN (2026-10-06).
   Trigger: player names any tagged shark "Bruce" (maybeNameEgg in script.js).
   Nothing happens immediately — no popup, no toast. Stages unfold slowly via
   advanceBruceChain (2+ expeditions or 12+ hours apart), so Sarah "notices"
   on her own time. {species} is replaced at push time with the Bruce shark's
   species (lowercase). The hidden achievement unlocks after the final stage.
   Voice: Sarah texting — casual, lowercase, warm; precise where facts matter.
   Facts: the Jaws mechanical shark was nicknamed Bruce after Spielberg's
   lawyer; it malfunctioned constantly in salt water; Spielberg showed it
   less than planned; Finding Nemo's Bruce is a deliberate Jaws reference. */
const BRUCE_CHAIN = [
  /* Stage 1 — the opening + the nickname reveal. */
  [
    { who: "them", text: "bruce huh" },
    { who: "them", text: "okay. do you know how deep this rabbit hole goes" },
    { who: "me", text: "It's from Jaws. I figured you'd notice eventually." },
    { who: "them", text: "you named a REAL {species} after a robot. the jaws shark was mechanical — built for the movie — and the crew nicknamed it bruce. after spielberg's lawyer. the bruce you named is out there actually swimming and his namesake was a machine." },
  ],
  /* Stage 2 — the notorious technical problems. */
  [
    { who: "them", text: "and when i say machine i mean a machine that barely worked. salt water kept breaking it — hydraulics, buoyancy, everything. the ocean won every round." },
    { who: "me", text: "A shark that can't handle the ocean. That's brutal." },
    { who: "them", text: "right?? they built this enormous complicated thing and spent half the shoot just trying to keep it functioning." },
  ],
  /* Stage 3 — the failures forced restraint, and restraint made it scarier. */
  [
    { who: "them", text: "so spielberg had a problem: no working shark. his fix was to barely show it. most of the movie you never SEE the thing — it's the pov shot, the barrels on the surface, the fin, the music." },
    { who: "me", text: "duh-duh. duh-duh." },
    { who: "them", text: "exactly. and it made the movie SCARIER. not seeing it was worse than seeing it. the broken robot accidentally proved that holding back beats showing everything." },
  ],
  /* Stage 4 — Nemo's Bruce + Jaws' cultural effect on real sharks. */
  [
    { who: "them", text: "years later finding nemo names their great white bruce. on purpose — it's a jaws reference. 'fish are friends, not food.' the nicest shark in movies is named after the scariest one." },
    { who: "me", text: "Okay that's actually perfect." },
    { who: "them", text: "the un-funny part: jaws genuinely terrified people. it put the mindless-monster idea in everyone's head, and real sharks have been paying for it ever since." },
  ],
  /* Stage 5 — the contrast: the player's actual Bruce. The punchline. */
  [
    { who: "them", text: "and then there's the bruce you named. a real {species}. you found it, tagged it, let it go. you know what it actually does all day." },
    { who: "me", text: "It's got a research ID and everything." },
    { who: "them", text: "exactly. they needed a monster so they built one out of metal. you went and met the real animal instead. bruce the robot, bruce the joke — and bruce, just a shark, doing shark things. anyway. 10/10 name." },
  ],
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

/* v1.4.9: White Whale achievement — Sarah's reaction to a megamouth tag.
   The megamouth is famously elusive (unknown to science until 1976, fewer
   than 300 ever seen). Sarah would absolutely lose her mind. */
const WHITE_WHALE_THREAD = [
  { who: "them", text: "STOP. STOP EVERYTHING. Did you just tag a MEGAMOUTH?!?" },
  { who: "me", text: "I did! Is that a big deal?" },
  { who: "them", text: "A BIG deal?? They didn't even KNOW this shark existed until 1976! A Navy anchor snagged one off Hawaii and scientists were like '...what IS that.' Fewer than 300 have EVER been seen. THREE HUNDRED. Total. Ever." },
  { who: "me", text: "That puts it in perspective." },
  { who: "them", text: "It lives in the twilight zone and just... opens this ENORMOUS mouth and filters krill. Like a whale shark's mysterious goth cousin. And now there's one out there with YOUR tag on it. I'm framing this conversation. 🩵" }
];
