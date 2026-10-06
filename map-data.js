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
  },
  lemon: {
    start: "Caribbean mangrove lagoon (tag site)",
    /* v0.11.0 review fix (ChatGPT): the first version named real
       western-Atlantic sites (Bimini → Andros ≈ 200 km) while the
       envelope claims hop: [2, 40] — an individual shark visibly crossing
       hundreds of kilometres its track data says it never swam. Per the
       canon rule, the plotted individual stays Caribbean-local: generic
       mangrove-lagoon labels clustered at the tag site (the nurse-shark
       precedent). The Bimini Biological Field Station science still
       informs BEHAVIOUR and SCALE (natal philopatry, mangrove nurseries)
       via the corridor note and research text — it just doesn't donate
       waypoints. (Making Bimini its own expedition region is the
       future-proof alternative; not this version.) */
    areas: ["Tag-site mangrove lagoon", "Nursery shallows", "Mangrove channel", "Lagoon sand flat", "Nursery patch reefs"],
    hop: [2, 40], dayStep: [7, 30], nPoints: [5, 7], kind: "acoustic",
    corridor: "natal philopatry — females return to their birthplace to pup; juveniles resident in mangrove lagoons; behaviour/scale from the Bimini acoustic + PIT tagging program"
  },
  blacktip: {
    start: "Maldivian reef flat (tag site)",
    /* v0.11.0 review fix (ChatGPT): Baa Atoll → Addu ≈ 650 km against
       hop: [1, 25] — same mismatch. Rebuilt reef-local: generic labels
       clustered within ~25 km of the Maldives tag site. The Moorea
       photo-ID / Indo-Pacific acoustic work still informs behaviour
       (tiny home ranges, stable social associations). */
    areas: ["Maldives tag-site reef flat", "Tag-site reef crest", "Tag-site lagoon", "Tag-site channel", "Reef-flat coral heads"],
    hop: [1, 25], dayStep: [7, 21], nPoints: [5, 6], kind: "acoustic",
    corridor: "extremely resident — among the smallest home ranges of any requiem shark; stable social associations (Moorea photo-ID; Indo-Pacific acoustic telemetry)"
  },
  whitetip: {
    start: "Philippine reef cave (tag site)",
    /* v0.11.0 review fix (ChatGPT): Tubbataha → Apo Reef ≈ 420 km
       against hop: [1, 20] — same mismatch. Rebuilt reef-local: generic
       cave/ledge/crevice labels clustered within ~20 km of the
       Philippines tag site. Indo-Pacific T. obesus acoustic work still
       informs behaviour (cave-sheltering, fierce reef fidelity). */
    areas: ["Tag-site reef cave", "Tag-site cave ledge", "Tag-site reef crevice", "Night-hunt reef", "Shelter ledge"],
    hop: [1, 20], dayStep: [7, 21], nPoints: [5, 6], kind: "acoustic",
    corridor: "strong reef fidelity — same daytime cave shelter for months/years; nocturnal, reef-local (Indo-Pacific acoustic work)"
  },
  blue: {
    start: "Open Atlantic (tag site)",
    areas: ["Tag-site open water", "Gulf Stream meander", "Mid-Atlantic Ridge approaches", "Azores Current", "Canary Current edge"],
    hop: [100, 800], dayStep: [5, 14], nPoints: [5, 7], kind: "satellite",
    corridor: "among the longest migrants of any shark \u2014 New England to South America runs are classic; Irish-tagged sharks recaptured off West Africa (~6,840 km); movements strongly seasonal with water temperature (Atlantic tagging programs, ICCAT)"
  },
  porbeagle: {
    start: "Cornwall, UK (tag site)",
    /* v0.13.0 review fix (ChatGPT): Bay of Biscay -> Mid-Atlantic Ridge is
       ~1,460 km, far beyond the old hop max of 600. Porbeagles genuinely
       make these transits (up to 2,000 km documented), so the hop range
       widens to match the animal instead of shrinking the map to fit the
       old range. 2,000 km over the 21-day max step ~= 95 km/day, inside
       the documented transit bursts of up to 100 km/day. "Norwegian Sea
       approaches" became "Iberian coast" — the documented wintering
       ground, and reachable on the same hop budget. */
    areas: ["Tag-site Cornish waters", "Celtic Sea", "Bay of Biscay", "Mid-Atlantic Ridge", "Iberian coast"],
    hop: [100, 2000], dayStep: [7, 21], nPoints: [5, 7], kind: "satellite",
    corridor: "strong seasonal return migrations \u2014 Bay of Biscay taggings travelled up to 2,000 km (Arctic Circle, Madeira, mid-Atlantic Ridge) and returned the following spring; 5,000\u201313,000 km annual loops with clear site fidelity; transit bursts up to 100 km/day"
  },
  silky: {
    start: "Open Atlantic (tag site)",
    areas: ["Tag-site open water", "Tuna school grounds", "FAD drift line", "Shelf-edge front", "Seamount approaches"],
    hop: [80, 500], dayStep: [5, 14], nPoints: [5, 7], kind: "satellite",
    corridor: "highly migratory \u2014 juveniles tracked thousands of kilometres; follows tuna schools and fish aggregating devices; genetics suggest female site fidelity to pupping areas even as individuals range widely"
  },
  oceanic: {
    start: "Open Atlantic (tag site)",
    /* Deliberately modest: movement data are still thin across much of
       the oceanic whitetip's range, so the envelope stays close and the
       corridor says so. */
    areas: ["Tag-site open water", "Seamount", "Oceanic island approaches", "Equatorial front"],
    hop: [50, 400], dayStep: [7, 21], nPoints: [5, 6], kind: "satellite",
    corridor: "highly migratory but movement data still thin across much of its range; philopatric migrations documented in the northern Atlantic; site fidelity off northeast Brazil"
  },
  sevengill: {
    start: "South African bay (tag site)",
    areas: ["Tag-site kelp forest", "Bay channel", "Estuary mouth", "Offshore reef", "Seal colony approaches"],
    hop: [2, 60], dayStep: [7, 30], nPoints: [5, 6], kind: "acoustic",
    corridor: "seasonal inshore\u2013offshore movement \u2014 into bays and estuaries, then out to deeper water; site-resident clusters documented over years; strong fidelity to seasonal aggregations (IUCN 2020)"
  },
  bronze: {
    start: "South African coast (tag site)",
    /* v0.13.0 review fix (ChatGPT): the old hop max of 300 km could not
       cover the documented 1,000+ km coastal migration, so the range
       widens to [30, 1200] (1,200 km over 21 days ~= 57 km/day, plausible
       for a coastal migrant). Areas run in migration order up the coast;
       the offshore reef gets its own label ("Wild Coast offshore reef")
       so it doesn't collide with the sevengill's False Bay "Offshore reef". */
    areas: ["Tag-site coastal bay", "Nursery bay", "Wild Coast offshore reef", "Sardine run grounds", "Mozambique coast approaches"],
    hop: [30, 1200], dayStep: [7, 21], nPoints: [5, 7], kind: "satellite",
    corridor: "seasonal coastwise migration \u2014 South African tagging shows 1,000+ km along the SA and Mozambique coasts in a single cycle; females move between coastal nursery bays and offshore waters"
  },
  frilled: {
    start: "Sagami Bay deep slope (tag site)",
    /* Archival, like the goblin: frilled sharks have never carried
       satellite tags in any sustained program — the track is reconstructed
       from capture records, and the kind note says so honestly. */
    areas: ["Tag-site deep slope", "Canyon wall", "Seamount flank", "Trench approaches"],
    hop: [5, 80], dayStep: [14, 60], nPoints: [4, 6], kind: "archival",
    corridor: "deep benthic drifter — Sagami Bay captures come from a few hundred metres down the slope; movements inferred from recaptures are local, not migratory"
  },
  zebra: {
    start: "Philippine reef (tag site)",
    areas: ["Tag-site reef", "Coral garden", "Sand flat", "Lagoon patch reef", "Reef channel"],
    hop: [1, 30], dayStep: [7, 21], nPoints: [5, 6], kind: "acoustic",
    corridor: "reef-resident — Indo-Pacific acoustic work shows small home ranges and strong site fidelity on coral reefs"
  }

};

/* How each track kind is framed to the player — honesty first. */
const TRACK_KIND_NOTES = {
  satellite: "Illustrative track — real satellite tags ping just like this. 🛰️",
  archival: "Sparse illustrative track — goblin sharks have never carried satellite tags; reconstructed from capture records.",
  resightings: "Illustrative track — built from reef survey re-sightings, not a satellite tag. This shark barely leaves its reef flat.",
  acoustic: "Illustrative track based on acoustic-tag detections from reef receiver arrays."
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
  basking: "#b8c0ff", epaulette: "#ff8fab",
  lemon: "#e9c46a", blacktip: "#5c6770", whitetip: "#ced4da",
  blue: "#3b6ea5", porbeagle: "#8fa8bf", silky: "#a08b62",
  oceanic: "#c9b458", sevengill: "#8a7f70", bronze: "#c98a3d",
  frilled: "#7a6f9e", zebra: "#d9a441"
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
  "Reef-flat edge": [-6.001, 146.997],
  /* v0.11.0: reef-local envelope labels for the reef trio (review fix).
     Generic lagoon / reef-flat / cave labels clustered tightly at each
     tag site — the nurse-shark precedent. Species science informs
     behaviour and scale, never waypoints. */
  "Tag-site mangrove lagoon": [15.0, -70.0],
  "Nursery shallows": [15.06, -69.96],
  "Mangrove channel": [14.95, -70.07],
  "Lagoon sand flat": [15.03, -70.1],
  "Nursery patch reefs": [14.97, -69.93],
  "Maldives tag-site reef flat": [3.2, 73.2],
  "Tag-site reef crest": [3.23, 73.21],
  "Tag-site lagoon": [3.17, 73.18],
  "Tag-site channel": [3.25, 73.24],
  "Reef-flat coral heads": [3.18, 73.23],
  "Tag-site reef cave": [12.0, 122.0],
  "Tag-site cave ledge": [12.03, 122.02],
  "Tag-site reef crevice": [11.98, 121.99],
  "Night-hunt reef": [12.04, 122.05],
  "Shelter ledge": [11.97, 122.03],

  /* v0.13.0: coordinates for the six-shark wave envelopes. Approximate
     plotting positions (see header note); consecutive legs audited
     against each envelope's hop range. */
  "Tag-site open water": [30.0, -40.0],
  "Gulf Stream meander": [33.0, -45.0],
  "Mid-Atlantic Ridge approaches": [31.5, -42.0],
  "Azores Current": [34.5, -38.0],
  "Canary Current edge": [31.0, -35.0],
  "Tag-site Cornish waters": [50.1, -5.5],
  "Bay of Biscay": [45.5, -5.5],
  "Mid-Atlantic Ridge": [44.0, -24.0],
  "Iberian coast": [40.0, -9.5],
  "Tuna school grounds": [28.0, -43.0],
  "FAD drift line": [26.5, -46.0],
  "Shelf-edge front": [25.0, -49.0],
  "Seamount approaches": [23.5, -46.5],
  "Seamount": [28.5, -42.5],
  "Oceanic island approaches": [27.0, -40.0],
  "Equatorial front": [25.5, -42.0],
  "Tag-site kelp forest": [-34.20, 18.35],
  "Bay channel": [-34.10, 18.50],
  "Estuary mouth": [-34.05, 18.60],
  "Offshore reef": [-34.25, 18.30],
  "Seal colony approaches": [-34.13, 18.58],
  "Tag-site coastal bay": [-34.0, 18.5],
  "Nursery bay": [-33.5, 26.0],
  "Wild Coast offshore reef": [-32.0, 28.5],
  "Sardine run grounds": [-30.5, 30.5],
  "Mozambique coast approaches": [-27.5, 32.5],

  /* v0.14.0: frilled + zebra envelope waypoints. */
  "Tag-site deep slope": [35.0, 139.6],
  "Canyon wall": [34.9, 139.9],
  "Seamount flank": [34.7, 140.2],
  "Trench approaches": [34.5, 140.5],
  "Tag-site reef": [12.1, 122.1],
  "Coral garden": [12.05, 122.15],
  "Sand flat": [11.95, 122.05],
  "Lagoon patch reef": [12.15, 122.0],
  "Reef channel": [12.0, 121.95]

};

const MAP_W = 1000, MAP_H = 500;

/* NASA Blue Marble Next Generation, full-globe equirectangular (2:1),
   hotlinked as the map background. v0.10.0 replaces the stylized
   LAND_PATHS continents (retired). CC BY-SA 3.0 — credit lives in the
   map tab and the README. */
const BLUE_MARBLE_URL = "https://upload.wikimedia.org/wikipedia/commons/c/cd/Land_ocean_ice_2048.jpg";

/* Major ocean currents — schematic but geographically honest. Waypoints are
   [lat, lon]; the renderer smooths them and splits paths at the antimeridian.
   Warm vs cold is real oceanography (and a real driver of where sharks go),
   hence the two hues. v0.10.0: drawn as a toggleable overlay. */
const CURRENTS = [
  { name: "Gulf Stream", warm: true, label: true,
    pts: [[25,-80],[29,-77],[33,-73],[37,-68],[40,-60],[43,-52]] },
  { name: "North Atlantic Drift", warm: true,
    pts: [[43,-52],[47,-42],[51,-30],[54,-18],[57,-8]] },
  { name: "Canary Current", warm: false,
    pts: [[36,-9],[32,-12],[28,-15],[24,-18],[20,-20]] },
  { name: "North Equatorial Current", warm: true,
    pts: [[17,-22],[16,-35],[15,-48],[14,-58]] },
  { name: "South Equatorial Current", warm: true,
    pts: [[-2,-10],[-3,-20],[-5,-30],[-8,-37]] },
  { name: "Brazil Current", warm: true,
    pts: [[-9,-34],[-16,-37],[-24,-42],[-32,-50],[-39,-57]] },
  { name: "Antarctic Circumpolar Current", warm: false, label: true,
    pts: [[-56,-180],[-59,-135],[-56,-90],[-59,-45],[-56,0],[-59,45],[-56,90],[-59,135],[-56,180]] },
  { name: "Agulhas Current", warm: true, label: true,
    pts: [[-25,36],[-30,33],[-35,28],[-39,23],[-41,20],[-40,32],[-38,42]] },
  { name: "Kuroshio Current", warm: true, label: true,
    pts: [[21,122],[25,125],[29,129],[32,133],[35,139],[37,145],[40,155],[41,165]] },
  { name: "North Pacific Current", warm: true,
    pts: [[41,165],[43,180],[44,-165],[45,-150],[46,-138]] },
  { name: "California Current", warm: false,
    pts: [[46,-130],[41,-126],[36,-122],[31,-119],[26,-116],[23,-113]] },
  { name: "Humboldt Current", warm: false, label: true,
    pts: [[-42,-74],[-36,-73],[-30,-72],[-24,-71],[-18,-74],[-12,-78],[-6,-83]] },
  { name: "East Australian Current", warm: true,
    pts: [[-23,154],[-27,154],[-31,152],[-35,151],[-38,150]] },
  { name: "Pacific Equatorial Countercurrent", warm: true,
    pts: [[6,135],[6,155],[6,175],[6,-175],[6,-155],[6,-135],[6,-115],[6,-100]] }
];
