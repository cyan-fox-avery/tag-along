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
