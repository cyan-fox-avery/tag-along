/* map-data.js — world-map + tracking data module (split from script.js in v0.9.1).
   Pure data + two pure helpers (genTrack, hashStr). Loaded BEFORE script.js;
   everything here is global and read by the map tab at runtime. */

/* ---------- Shark tracking: movement envelopes ----------
   v0.9.0: rebuilt on REAL geography. Each species gets a biologically
   defensible envelope — a verified tagging/aggregation anchor, realistic
   areas in plausible corridor order, honest hop distances and ping
   intervals. Randomness lives INSIDE the envelope; the envelope itself
   is real. Research: primary literature + tagging programs (OCEARCH,
   Guy Harvey RI, ICCAT, Marine Megafauna Foundation), Oct 2026.
   WHY this matters (for reviewers): the old pools picked waypoints and
   hop distances semi-randomly, which could imply migration routes,
   timings, or distances nobody validated — a story that sounds scientific
   without being it. Per ChatGPT's v0.8.0 review: "randomness is fine
   inside a biologically defensible envelope."
   Honesty rules baked in: goblin sharks have NEVER carried satellite
   tags (tracks marked archival); epaulettes are mark-recapture only
   (tracks marked as reef survey re-sightings); great white flavor avoids
   presenting Seal Island/False Bay as a current hotspot (whites largely
   vanished there ~2017, orcas Port & Starboard) — the areas list keeps
   historically real sites without "right now" claims. */
const TRACK_ENVELOPES = {
  nurse: {
    start: "Caribbean reef lagoon (tag site)", // game region is the generic Caribbean Sea; envelope stays local by design
    /* v0.9.0 consistency pass (for reviewers): the old envelope used the
       superbly documented Dry Tortugas (Florida) program, but the game
       tags nurse sharks in the Caribbean Sea — Florida waypoints for a
       Caribbean shark. Rebuilt Caribbean-local on Caribbean acoustic
       work: Glover's Reef, Belize (mean dispersal 7.7 km — Chapman et
       al.) and the Buck Island, St. Croix array (11 nurse sharks,
       2013–2017, high residency). The BEHAVIOUR (extreme residency,
       <10 km typical, biennial mating aggregations) is informed by both
       Florida and Caribbean studies; the PLACES are deliberately generic
       reef-habitat labels clustered at the tag site, because a nurse
       shark barely leaves its home reef. Map coords cluster tightly
       around the Caribbean Sea tag point — honest, not empty. */
    areas: ["Tag-site reef", "Adjacent sand flats", "Seagrass beds", "Reef-edge drop-off", "Mating aggregation flat", "Nearby patch reefs"],
    hop: [1, 15], dayStep: [7, 30], nPoints: [5, 6], kind: "acoustic",
    corridor: "extremely resident — mean dispersal 7.7 km (Glover's Reef, Belize); strong site fidelity; biennial returns to mating flats"
  },
  thresher: {
    start: "Offshore North Carolina", // Anderson et al.: 61 PSAT tags, 48 individuals tracked WNA; Kneebone/NEAq tagged NC→Grand Banks 2016–2023
    /* v0.9.0 consistency pass (for reviewers): the old envelope was built
       on Southern California acoustic/satellite work, but the game tags
       threshers in the Open Atlantic — a textbook case of the mismatch
       ChatGPT flagged ("an individual shark's displayed track must be
       geographically compatible with where that individual was tagged").
       Rebuilt on western North Atlantic PSAT telemetry instead: seasonal
       "snowbird" migration, Florida↔Grand Banks. */
    areas: ["Offshore North Carolina", "Mid-Atlantic Bight shelf edge", "Georges Bank", "Gulf of Maine", "Grand Banks", "Offshore Florida (wintering)"],
    hop: [80, 600], dayStep: [5, 14], nPoints: [5, 7], kind: "satellite",
    corridor: "seasonal 'snowbird' migration — north to the Grand Banks in summer, south toward Florida in winter; daily vertical migration matters more than horizontal (Anderson et al.; Kneebone/NEAq)"
  },
  whale: {
    start: "Tubbataha Reefs Natural Park, Philippines", // Araujo et al. 2018 (PeerJ): 17 juvenile SPOT5 tags, Sulu & Bohol Seas
    /* v0.9.0 consistency pass (for reviewers): the old envelope was built
       on the Ningaloo (W. Australia) satellite study, but the game tags
       whale sharks in the Philippines. Rebuilt on Araujo et al. 2018 —
       the location-matched telemetry ChatGPT pointed to: all 17 tagged
       sharks stayed in Philippine waters (6–126 days, 86–2,580 km,
       ~15.5 km/day), moving between the Bohol and Sulu Seas, through
       Surigao Strait, and out to the Pacific coast of Mindanao. */
    areas: ["Tubbataha Reefs Natural Park", "Sulu Sea", "Northern Palawan", "Bohol Sea", "Surigao Strait", "Eastern Leyte", "Eastern Mindanao (Pacific)"],
    hop: [50, 500], dayStep: [5, 14], nPoints: [5, 7], kind: "satellite",
    corridor: "juveniles highly mobile but stay in Philippine waters — Bohol↔Sulu connectivity, Surigao Strait crossings (Araujo et al. 2018, PeerJ)"
  },
  goblin: {
    start: "Sagami Bay, Japan", // described 1898 from a Sagami Bay specimen; most records here (Yano et al. 2007)
    areas: ["Sagami Bay", "Tokyo Bay", "Suruga Bay", "Offshore Izu Islands", "Kuroshio Current edge", "Japanese upper continental slope"],
    hop: [20, 150], dayStep: [14, 45], nPoints: [4, 5], kind: "archival",
    corridor: "deep-slope resident — presumed sedentary 270–960 m; NO migratory behaviour documented, NO satellite tracks exist"
  },
  tiger: {
    start: "Fuvahmulah, Maldives", // world's largest documented tiger aggregation; strong site fidelity (Sci Rep mark-recapture)
    areas: ["Fuvahmulah", "Addu Atoll", "Chagos Archipelago", "Seychelles Bank", "Saya de Malha", "Open Indian Ocean (westward leg)"],
    hop: [150, 800], dayStep: [7, 30], nPoints: [6, 7], kind: "satellite",
    corridor: "atoll-associated with long offshore excursions; trans-Indian-Ocean moves documented — 'Sereia' Mozambique→Indonesia >6,400 km (OCEARCH)"
  },
  sandtiger: {
    start: "Delaware Bay, USA", // Teter et al. 2014: 13 sharks satellite+acoustic tagged, late Aug/early Sep
    areas: ["Delaware Bay", "New Jersey coast", "Virginia Capes", "Cape Hatteras", "Cape Lookout", "Offshore North Carolina shelf edge"],
    hop: [50, 400], dayStep: [7, 21], nPoints: [5, 7], kind: "satellite",
    corridor: "seasonal coastal north–south along the shelf edge; autumn run to the Carolinas (Teter et al. 2014; Haulsee et al.)"
  },
  galapagos: {
    start: "Darwin Island, Galápagos", // satellite-tagging work at Darwin Island, GMR acoustic networks
    areas: ["Darwin Island", "Wolf Island", "Isabela Island", "Fernandina Island", "Galápagos platform edge", "Open water between islands"],
    hop: [20, 150], dayStep: [7, 21], nPoints: [4, 6], kind: "satellite",
    corridor: "highly resident — 30–50 km home ranges; >2,000 km moves documented but rare (MDPI Diversity 2026)"
  },
  greatwhite: {
    start: "Gansbaai, South Africa", // OCEARCH tagging ("Alisha", May 2012)
    areas: ["Gansbaai", "Dyer Island", "Seal Island (False Bay)", "Mossel Bay", "Cape Agulhas", "Open Indian Ocean (offshore leg)"],
    hop: [200, 1500], dayStep: [7, 21], nPoints: [6, 7], kind: "satellite",
    corridor: "coastal aggregation → offshore trans-oceanic; 'Nicole' SA→Australia→back >20,000 km / 9 mo (Bonfil et al., Science 2005)"
  },
  hammerhead: {
    start: "Bimini, Bahamas", // Guttridge et al. long-term Bimini tagging program
    /* v0.9.0 consistency pass (for reviewers): the old areas list leaned on
       Florida-tagged studies (Florida Keys, Jupiter, offshore Virginia) —
       ChatGPT's "Caribbean tag feeding a Florida-specific envelope"
       example. Rebuilt Caribbean-centered on Bahamas work: Bimini
       philopatry + seasonal residency (Guttridge et al. 2017) and the
       Andros Island year-round residency study (Frontiers 2025: site
       fidelity within 400 km², some individuals <1 km over 4 years).
       The partial-migration behaviour is kept honest in the corridor
       note (some do run north in summer), but no Florida waypoints are
       imported into a Caribbean shark's pings. */
    areas: ["Bimini", "Andros Island", "Eleuthera", "Exuma Sound", "Tongue of the Ocean", "Cay Sal Bank"],
    hop: [50, 400], dayStep: [7, 21], nPoints: [5, 7], kind: "satellite",
    corridor: "partial migration — many resident in the Bahamas year-round; some summer excursions north, return for winter (Guttridge et al. 2017; Andros 2025)"
  },
  mako: {
    start: "Azores", // ICCAT satellite study, NE Atlantic
    areas: ["Azores", "Canary Islands", "Madeira", "West African coast (Senegal/Cape Verde)", "Mid-Atlantic ridge", "Gulf Stream edge"],
    hop: [300, 1500], dayStep: [7, 30], nPoints: [6, 7], kind: "satellite",
    corridor: "open-ocean nomad — 24,213 km / 551 days documented; >8,900 km along West Africa (Abascal et al., ICCAT 2018)"
  },
  basking: {
    start: "Cornwall, UK", // Sims et al. tagging off Plymouth/SW England
    areas: ["Cornwall (Lizard/Land's End)", "Isle of Man", "Hebrides (Coll/Tiree)", "Irish Sea", "Celtic Sea", "Donegal Bay", "Bay of Biscay / Iberian coast (winter leg)"],
    hop: [200, 1000], dayStep: [7, 21], nPoints: [6, 8], kind: "satellite",
    corridor: "seasonal basin migration — UK summer feeding → Biscay/Iberia winter → return (Doherty et al., Sci Rep 2017)"
  },
  epaulette: {
    start: "Papua New Guinea reef flat (tag site)", // game tags in PNG; no PNG telemetry exists — see note
    /* v0.9.0 consistency pass (for reviewers): the old envelope named
       Heron Island (Great Barrier Reef) waypoints for a shark tagged in
       Papua New Guinea — exactly the mismatch ChatGPT flagged. Per the
       canon rule, the Heron Island mark-recapture work (Heupel &
       Bennett — best epaulette movement evidence anywhere) now informs
       BEHAVIOUR and SCALE only: "extremely resident, metre-scale
       movements." No Australian waypoints are imported; the areas are
       generic PNG reef-flat labels, and the kind stays "resightings"
       (never satellite-tagged). Greatest net displacement on record:
       475 m. */
    areas: ["Tag-site reef flat", "Adjacent coral-head pools", "PNG reef crest", "Lagoon patch", "North beach pools", "Reef-flat edge"],
    hop: [0.1, 2], dayStep: [1, 7], nPoints: [6, 8], kind: "resightings",
    corridor: "extreme residency — greatest net displacement on record 475 m; scale inferred from Heron Island mark-recapture (no PNG telemetry exists)"
  }
};

/* How each track kind is framed to the player — honesty first. */
const TRACK_KIND_NOTES = {
  satellite: "Illustrative track — real satellite tags ping just like this. 🛰️",
  archival: "Sparse illustrative track — goblin sharks have never carried satellite tags; reconstructed from capture records.",
  resightings: "Illustrative track — built from reef survey re-sightings, not a satellite tag. This shark barely leaves its reef flat."
};

/* Simulated tag track: starts at the tag site, then walks the species'
   corridor in plausible order. Distances, ping intervals, and point
   counts all come from the envelope — nurse sharks scribble locally,
   whale sharks cross basins. v0.9.0: the areas list runs in corridor
   order, so legs are walked forward (never shuffled into nonsense);
   the start index varies so tracks differ. */
function genTrack(species, rec) {
  const env = TRACK_ENVELOPES[species.id] || TRACK_ENVELOPES.nurse;
  const n = env.nPoints[0] + Math.floor(Math.random() * (env.nPoints[1] - env.nPoints[0] + 1));
  const points = [{ label: rec.location, day: 0, km: 0 }];
  let day = 0, totalKm = 0;
  const maxStart = Math.max(0, env.areas.length - (n - 1));
  const startIdx = Math.floor(Math.random() * (maxStart + 1));
  const legs = env.areas.slice(startIdx, startIdx + n - 1);
  legs.forEach(area => {
    day += env.dayStep[0] + Math.floor(Math.random() * (env.dayStep[1] - env.dayStep[0] + 1));
    const km = Math.round((env.hop[0] + Math.random() * (env.hop[1] - env.hop[0])) * 10) / 10;
    totalKm = Math.round((totalKm + km) * 10) / 10;
    points.push({ label: area, day, km });
  });
  return { points, totalKm, days: day, kind: env.kind || "satellite" };
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/* ================= The tracking map tab (v0.9.0) =================
   Display-only: it visualizes track data the game already has. The
   science (envelopes, regions, methods) is frozen — nothing here changes
   it. Coordinates below are APPROXIMATE plotting positions for named
   places so tracks can be drawn on a stylized map; they are not
   scientific claims, and the map is labeled illustrative. */

const SPECIES_COLORS = {
  nurse: "#ffd166", thresher: "#ef476f", whale: "#06d6a0", goblin: "#9b5de5",
  tiger: "#f78c6b", sandtiger: "#4cc9f0", galapagos: "#80ed99",
  greatwhite: "#f4f1de", hammerhead: "#f3722c", mako: "#00bbf9",
  basking: "#b8c0ff", epaulette: "#ff8fab"
};

/* Every label a track point can carry: region names (tag sites and
   re-sighting pings) + envelope areas. "Baja California" is a legacy
   v0.8.0 region label — kept so old tracks still plot. Unknown labels
   are skipped, never guessed. */
const MAP_COORDS = {
  "Caribbean Sea": [15.0, -70.0],
  "Outer Banks, North Carolina": [35.2, -75.5],
  "Philippines": [12.0, 122.0],
  "Maldives": [3.2, 73.2],
  "Sagami Bay, Japan": [35.1, 139.4],
  "Open Atlantic": [30.0, -40.0],
  "Cornwall, UK": [50.1, -5.5],
  "Papua New Guinea": [-6.0, 147.0],
  "Galápagos Islands": [-0.5, -90.8],
  "South Africa": [-34.0, 20.0],
  "Baja California": [28.0, -113.0],
  "Dry Tortugas mating ground": [24.6, -82.9],
  "Marquesas Keys": [24.6, -82.1],
  "Key West reefs": [24.5, -81.8],
  "Florida Bay": [25.0, -80.9],
  "Everglades backcountry": [25.3, -81.0],
  "Biscayne Bay": [25.6, -80.2],
  "La Jolla Canyon": [32.85, -117.3],
  "Carlsbad Canyon": [33.15, -117.4],
  "Southern California Bight shelf edge": [33.5, -118.5],
  "Santa Catalina Island": [33.4, -118.4],
  "San Nicolas Basin": [33.2, -119.5],
  "Offshore Baja California waters": [31.0, -117.0],
  "Ningaloo Reef": [-22.7, 113.6],
  "Shark Bay": [-25.5, 113.5],
  "Montebello Islands": [-20.4, 115.5],
  "Java Trench approaches": [-10.5, 110.0],
  "Banda Sea": [-6.0, 130.0],
  "Timor Sea": [-11.0, 128.0],
  "Sagami Bay": [35.1, 139.4],
  "Tokyo Bay": [35.4, 139.8],
  "Suruga Bay": [34.7, 138.6],
  "Offshore Izu Islands": [34.2, 139.4],
  "Kuroshio Current edge": [34.0, 140.0],
  "Japanese upper continental slope": [34.8, 139.0],
  "Fuvahmulah": [-0.3, 73.4],
  "Addu Atoll": [-0.7, 73.2],
  "Chagos Archipelago": [-6.3, 71.8],
  "Seychelles Bank": [-5.0, 55.5],
  "Saya de Malha": [-11.0, 62.0],
  "Open Indian Ocean (westward leg)": [-8.0, 65.0],
  "Delaware Bay": [39.0, -75.1],
  "New Jersey coast": [39.5, -74.0],
  "Virginia Capes": [37.0, -75.8],
  "Cape Hatteras": [35.2, -75.5],
  "Cape Lookout": [34.6, -76.5],
  "Offshore North Carolina shelf edge": [34.0, -75.8],
  "Darwin Island": [1.68, -92.0],
  "Wolf Island": [1.38, -91.82],
  "Isabela Island": [-0.7, -91.0],
  "Fernandina Island": [-0.37, -91.55],
  "Galápagos platform edge": [0.0, -91.5],
  "Open water between islands": [0.5, -91.8],
  "Gansbaai": [-34.6, 19.35],
  "Dyer Island": [-34.68, 19.4],
  "Seal Island (False Bay)": [-34.13, 18.58],
  "Mossel Bay": [-34.15, 22.1],
  "Cape Agulhas": [-34.83, 20.0],
  "Open Indian Ocean (offshore leg)": [-38.0, 25.0],
  "Bimini": [25.7, -79.25],
  "Andros Island": [24.4, -77.9],
  "Eleuthera": [25.0, -76.8],
  "Florida Keys": [24.6, -81.5],
  "Jupiter, Florida": [26.9, -80.05],
  "Offshore Virginia / Gulf Stream": [36.5, -74.5],
  "Azores": [38.7, -27.2],
  "Canary Islands": [28.3, -15.8],
  "Madeira": [32.7, -17.0],
  "West African coast (Senegal/Cape Verde)": [15.0, -20.0],
  "Mid-Atlantic ridge": [30.0, -42.0],
  "Gulf Stream edge": [35.0, -70.0],
  "Cornwall (Lizard/Land's End)": [50.0, -5.7],
  "Isle of Man": [54.2, -4.6],
  "Hebrides (Coll/Tiree)": [56.6, -6.6],
  "Irish Sea": [53.8, -5.3],
  "Celtic Sea": [50.5, -7.5],
  "Donegal Bay": [54.55, -8.3],
  "Bay of Biscay / Iberian coast (winter leg)": [44.5, -4.5],
  "Heron Island reef flat": [-23.44, 151.91],
  "Heron lagoon": [-23.445, 151.915],
  "Shark Bay (Heron Island)": [-23.438, 151.908],
  "Reef crest": [-23.442, 151.918],
  "Coral-head pools": [-23.441, 151.912],
  "Heron Island north beach pools": [-23.437, 151.914],
  "Wistari Reef edge": [-23.45, 151.92],
  /* v0.9.0 consistency pass: new envelope labels. Thresher (WNA),
     whale (Philippines), hammerhead (Bahamas) get real coordinates;
     nurse and epaulette generic reef labels cluster tightly at their
     tag sites — honest local scribbles, not false precision. Older
     labels above are kept so pre-fix tracks still plot. */
  "Offshore North Carolina": [35.5, -74.5],
  "Mid-Atlantic Bight shelf edge": [38.5, -72.0],
  "Georges Bank": [41.5, -67.5],
  "Gulf of Maine": [43.0, -69.0],
  "Grand Banks": [45.5, -50.0],
  "Offshore Florida (wintering)": [28.0, -79.0],
  "Tubbataha Reefs Natural Park": [8.9, 119.9],
  "Sulu Sea": [9.5, 121.0],
  "Northern Palawan": [11.0, 119.0],
  "Bohol Sea": [9.8, 123.5],
  "Surigao Strait": [10.2, 125.4],
  "Eastern Leyte": [10.8, 125.0],
  "Eastern Mindanao (Pacific)": [8.5, 126.5],
  "Exuma Sound": [24.0, -76.0],
  "Tongue of the Ocean": [24.2, -77.5],
  "Cay Sal Bank": [23.8, -80.3],
  "Tag-site reef": [15.0, -70.0],
  "Adjacent sand flats": [15.03, -70.01],
  "Seagrass beds": [14.98, -70.03],
  "Reef-edge drop-off": [15.02, -69.98],
  "Mating aggregation flat": [15.01, -70.04],
  "Nearby patch reefs": [14.99, -69.99],
  "Tag-site reef flat": [-6.0, 147.0],
  "Adjacent coral-head pools": [-5.998, 147.002],
  "PNG reef crest": [-6.002, 147.001],
  "Lagoon patch": [-6.002, 146.998],
  "North beach pools": [-5.999, 147.003],
  "Reef-flat edge": [-6.001, 146.997]
};

/* Stylized continents — recognizable, not cartographic. Equirectangular
   layout on a 1000x500 viewBox; deliberately simple shapes. */
const MAP_W = 1000, MAP_H = 500;
const LAND_PATHS = [
  "M40,70 L130,80 L210,65 L270,95 L335,95 L350,115 L320,130 L295,145 L275,180 L250,170 L220,182 L195,188 L210,200 L225,215 L265,218 L282,226 L268,234 L235,225 L205,205 L165,155 L155,140 L105,110 L60,85 Z",
  "M358,32 L408,38 L412,68 L385,82 L358,70 Z",
  "M282,235 L335,230 L365,252 L405,275 L385,315 L355,350 L320,350 L305,392 L292,405 L282,360 L272,300 L275,262 Z",
  "M470,148 L492,132 L498,118 L526,82 L552,54 L562,70 L546,102 L562,112 L544,140 L518,146 Z",
  "M486,110 L494,90 L499,100 L492,114 Z",
  "M470,152 L526,146 L582,163 L608,190 L640,220 L622,252 L612,280 L584,334 L556,348 L528,328 L498,278 L456,208 Z",
  "M624,296 L638,302 L634,322 L624,316 Z",
  "M582,163 L624,166 L652,180 L700,184 L716,193 L722,228 L748,236 L776,222 L790,194 L818,180 L832,152 L846,138 L898,118 L948,88 L998,68 L1000,100 L940,140 L900,170 L860,195 L820,210 L790,235 L760,252 L728,246 L698,220 L648,200 L608,190 Z",
  "M872,168 L886,150 L892,162 L880,180 Z",
  "M838,210 L848,200 L852,218 L842,228 Z",
  "M760,268 L800,262 L832,270 L810,283 L768,280 Z M845,274 L872,270 L870,286 L844,286 Z",
  "M795,330 L865,318 L905,340 L895,375 L850,395 L800,385 L785,355 Z",
  "M935,395 L948,390 L945,415 L935,418 Z"
];
