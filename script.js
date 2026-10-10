/* Tag Along — v0.16.0
   Research -> plan (region/depth/bait/method) -> dive -> watch/tag/resight
   -> collection book + logbook. */

"use strict";

/* Build number — shown in the top corner of the page. Bump every release. */
const VERSION = "v1.5.13-beta";

/* v1.4.2: standard IUCN Red List category abbreviations for the compact
   field-guide pills. Full category names appear in expanded entries. */
const IUCN_ABBR = {
  "Critically Endangered": "CR",
  "Endangered": "EN",
  "Vulnerable": "VU",
  "Near Threatened": "NT",
  "Least Concern": "LC",
  "Data Deficient": "DD"
};

/* v0.22.0: "What's new?" — shown once per version update. */
const WHATS_NEW = {
  "v0.22.0": [
    "📓 <strong>Logbook filters.</strong> Filter your expedition log by outcome, region, or species — compare attempts and spot the pattern.",
    "📌 <strong>Pin-gated soft hints.</strong> Pin a shark you're researching, and your logbook notes will gently nudge you when an expedition plan is close — observational hints only, never answers.",
    "🎣 <strong>Failed trips feel like fieldwork.</strong> Richer expedition narratives: weather, sea state, wildlife sightings, and proper field notes in the logbook.",
    "🌊 <strong>Conservation notes.</strong> Every collection card now carries a conservation-science note — status context, threats, and the protection efforts making a difference."
  ],
  "v0.24.0": [
    "🖼️ <strong>Progressive Wild Archive.</strong> Your Archive now grows with every tag — Sarah introduces it after your first shark, and each new species adds its real photo quietly.",
  ],
  "v0.26.0": [
    "🎨 <strong>The sharks are here!</strong> Every species now has its own beautiful illustration — and encounters start with a mysterious silhouette. Tap it to reveal who's swimming toward you.",
    "🌊 <strong>Living waters.</strong> Sea turtles, dolphins, rays, seals, jellyfish, and schools of fish now drift through your expeditions.",
    "📖 <strong>Collection book glow-up.</strong> Your tagged sharks show their full-colour portraits in the collection — the field-guide sketches stay pencil-style until you've earned the real thing.",
  ],
  "v0.23.0": [
    "🦈 <strong>Real-shark stories.</strong> Name a great white Mary Lee or Nicole, and Sarah will tell you about the real sharks behind the names — their extraordinary journeys.",
    "🤫 <strong>A secret swims in these waters.</strong> There's a new hidden surprise for curious researchers. We won't spoil it here.",
    "💾 <strong>Save export/import.</strong> Back up your research as a JSON file, or bring a save to a new device. Find it in the footer."
  ],
  "v1.2.0-beta": [
    "📓 <strong>Failed trips teach more.</strong> Unsuccessful expeditions now surface 1–2 field observations — water temp, currents, wildlife, the small details that make a day on the water.",
    "🎉 <strong>Louder tag celebrations.</strong> Tagging now clearly announces whether it's your first of that species or your Nth — no more squinting at the small print.",
    "🖼️ <strong>Archive shows the locked ones.</strong> Species you haven't tagged yet appear as locked silhouettes — tag one to reveal its real-world photos.",
    "📱 <strong>iPad & desktop layouts.</strong> The game now uses wider screens properly — multi-column research, side-by-side dive views, a proper collection wall."
  ],
  "v1.3.0-beta": [
    "👁️ <strong>Watch notes.</strong> 'Just watch' sometimes adds a natural-history observation to that shark's record.",
    "📓 <strong>Logbook date filter.</strong> Filter trips by last 7 days, 30 days, or year — plus research IDs on tagged encounters.",
    "🌊 <strong>Richer dive flavour.</strong> 20 new field observations and 6 new wildlife sightings (surface and reef waters).",
    "💾 <strong>Save export/import</strong> is in the footer — back up your sharks as JSON, restore them anywhere."
  ],
  "v1.3.1-beta": [
    "🦈 <strong>Tag along.</strong> After tagging, you can now tap 'Tag along with [name] →' to follow your shark on the map."
  ],
  "v1.3.2-beta": [
    "🌊 <strong>Conservation note readability.</strong> Fixed the conservation note background so the text is actually readable."
  ],
  "v1.4.0-beta": [
    "🧭 <strong>Tag along ends the expedition.</strong> A new third release choice: follow your shark for the rest of the day. The UI tells you explicitly — no more encounters this trip.",
    "🔬 <strong>Secret tag-along facts.</strong> Each follow unlocks a special fact about the species (1–3 per species). Find them all in your collection book.",
    "📌 <strong>Pinned shark slot.</strong> The pinned card now sits above the field guide grid, not inside it.",
    "📱 <strong>iPad polish.</strong> Dive buttons repositioned, field-guide columns stay put when expanding, phone keeps its height."
  ],
  "v1.4.1-beta": [
    "☀️ <strong>Sun-ray caustics.</strong> Underwater light now radiates from a sun point above the water, fanning across the screen at angles.",
    "📱 <strong>Tab bar refinements.</strong> Full-width tab band, equal-width tabs, and stacked count/icon/label on Collection and Achievements.",
    "🔍 <strong>Field guide overlays.</strong> Expanded shark entries now float over the grid instead of pushing it down."
  ],
  "v1.4.2-beta": [
    "☀️ <strong>Sun-point caustics.</strong> Light rays now radiate from the far top-left corner like real sunlight, with softer overlap brightness.",
    "🏷️ <strong>IUCN abbreviations.</strong> Field guide cards show standard IUCN codes (CR, EN, VU, NT, LC) — tap a shark for the full status.",
    "📱 <strong>Cleaner tabs.</strong> Collection and Achievements tabs show just icon + label; their counts moved to the top of each page."
  ],
  "v1.4.3-beta": [
    "☀️ <strong>Caustics edge fix.</strong> Light rays now fade out near the screen edges — no more dark bars sliding in from the sides."
  ],
  "v1.4.4-beta": [
    "🌊 <strong>New porthole view.</strong> The idle observation window now shows the ocean surface from above — slow swells, foam on the crests, sun glitter.",
    "📱 <strong>Taller phone.</strong> Sarah's phone mockup is now realistic phone proportions with a much taller conversation area."
  ],
  "v1.4.5-beta": [
    "☀️ <strong>Caustics fixed properly.</strong> Sun rays are long soft streaks again, fanning from the far top-left corner all the way across the screen — no more edge bars."
  ],
  "v1.4.6-beta": [
    "📐 <strong>Centered empty state.</strong> The Collection page's \"No sharks tagged yet\" message is now centered like the sightings one."
  ],
  "v1.4.7-beta": [
    "🌊 <strong>Boat-window waves.</strong> The idle porthole now shows rolling wave crests drifting past at three depths — and spray periodically hits the glass and runs down."
  ],
  "v1.4.8-beta": [
    "🔧 <strong>Edge bar fix.</strong> Fixed the dark vertical bars that slid in and out at the screen edges — the surface shimmer layer is now wider than the viewport so its drift never exposes an edge."
  ],
  "v1.4.9-beta": [
    "🐋 <strong>New achievement: White Whale.</strong> Tag the elusive megamouth shark — only around 300 have ever been documented — and Sarah will absolutely lose her mind."
  ],
  "v1.4.10-beta": [
    "🔧 <strong>Porthole cleanup.</strong> The old underwater light-ray layer no longer shows through the boat-window surface view, and a stray bit of malformed CSS is gone."
  ],
  "v1.4.11-beta": [
    "🌊 <strong>Porthole waves.</strong> The boat-window view now has illustrated wave layers (far/mid/near) drifting as slow parallax, with occasional spray on the glass. Art by Mira."
  ],
  "v1.4.12-beta": [
    "🌊 <strong>Porthole waves, take two.</strong> Bigger, closer-together swells like looking over the horizon; the wave loop is now truly seamless (no more glitch); and the glass gets one big splash at a time instead of scattered droplets. Art by Mira."
  ],
  "v1.4.13-beta": [
    "🫧 <strong>Bubble columns.</strong> Background bubbles now rise in little burst columns — quick vertical trails that appear one after another, then fade, like real air bubbles.",
    "☀️ <strong>Sun rays span the screen.</strong> The light-ray fan from the top-left sun now visibly sweeps across the whole viewport — same brightness, much longer reach."
  ],
  "v1.4.14-beta": [
    "🫧 <strong>More bubbles, always.</strong> Twice as many bubbles in overlapping burst columns — there's almost always a trail rising somewhere.",
    "☀️ <strong>Softer sun rays, everywhere.</strong> The light rays are now wide, diffused, diagonal shafts (no more hard bars), and they persist as a true background while you scroll.",
    "🌊 <strong>Calmer porthole.</strong> The far wave sits higher under a new CSS sky (sun + clouds — Mira may art-direct it later), all three wave layers overlap into continuous water, everything drifts much more slowly, and splashes pop and fade instead of sliding down the glass."
  ],
  "v1.5.0-beta": [
    "\uD83D\uDCBE <strong>Celebrations survive a reload.</strong> If the page reloads mid-expedition, Sarah's pending species celebration is recovered and delivered once — never lost, never doubled.",
    "\u270F\uFE0F <strong>Big Day copy polish.</strong> Two small dialogue fixes from Mira's review: time-neutral wording and a general shark-longevity fact.",
  ],
  "v1.5.13-beta": [
    "📑 <strong>Smaller tabs, tidier bar.</strong> Tablet tabs are smaller (icon, label, padding) so all 8 fit on one iPad row, no wrapping. On phones the tabs now sit in two neat centered rows of four.",
  ],
  "v1.5.12-beta": [
    "📑 <strong>Eight tabs, one row — for real this time.</strong> Tighter type and a shrinkable label stack so all 8 tabs fit a single iPad row with no wrapping.",
    "📖 <strong>Expanded field-guide cards show everything.</strong> No more internal scrolling — the card grows to fit the full description, and its top corners are rounded to match the bottom.",
  ],
  "v1.5.11-beta": [
    "📸 <strong>Archive tab always visible.</strong> The Archive tab now stays in the tab bar from the start — greyed out and unclickable until Sarah's intro text unlocks it. This keeps all 8 tabs on one row with no layout shift.",
  ],
  "v1.5.10-beta": [
    "🖼️ <strong>Archive is tagged-sharks only.</strong> The \"Still to discover\" locked list is gone — the Archive now shows just the sharks you have actually tagged, with Research-style name + color-coded IUCN badges (no checkmarks).",
  ],
  "v1.5.9-beta": [
    "📑 <strong>All eight tabs, one row.</strong> The tab bar no longer wraps \"Achievements\" to a second line on tablets — the tabs share the row evenly.",
  ],
  "v1.5.8-beta": [
    "📦 <strong>Safe batch.</strong> Seven low-risk fixes: \"Still to discover\" is plain text (no dropdown), release buttons reordered with matching yellow style, \"Follow\" first in encounters, Sarah uses tag IDs for unnamed sharks, double-tap zoom disabled, and tag-along insights live on the Collection card only.",
  ],
  "v1.5.7-beta": [
    "\uD83D\uDCF1 <strong>Centered tabs everywhere.</strong> The tab bar now centers as a group on tablets and desktops too — no more left-shifted tabs.",
  ],
  "v1.5.6-beta": [
    "\uD83D\uDCF1 <strong>Centered tabs on phones.</strong> The tab bar now centers every row on small screens — no more left-hanging last row.",
  ],
  "v1.5.5-beta": [
    "\uD83C\uDF0A <strong>Smoother far waves.</strong> The farthest porthole wave layer now traces a true smooth ellipse instead of a boxy path — same gentle speed, just rounder.",
  ],
  "v1.5.4-beta": [
    "\u274C <strong>Closable guide popups.</strong> The mobile field-guide popup now has a proper close button, plus Escape-key and tap-outside dismissal — no more getting stuck.",
    "\u{1F979} <strong>Reunion wording.</strong> Sarah's reunion reaction no longer claims the shark returned to the same spot.",
  ],
  "v1.5.3-beta": [
    "\u{1F979} <strong>Shark reunions.</strong> One tagged shark per species — but now you might run into yours again! Resident sharks have a 50% reunion chance, coastal 25%, migratory 10%. Spot the familiar tag for a heartfelt reunion, or meet a different wild shark and observe the species.",
    "\u{1F4F1} <strong>Mobile field guide fix.</strong> Expanded cards now center properly on small screens.",
    "\U0001F9F9 <strong>Cleaner resets.</strong> Pending celebrations and reunion history now clear properly on hard reset.",
  ],
  "v1.5.2-beta": [
    "🦈 <strong>Individual sharks.</strong> Encounters with a tagged species are now randomized — 25% chance it's the same individual you know, 75% it's a new shark of the same species with its own name and tag.",
    "🗺️ <strong>Quieter map.</strong> Ocean currents are off by default (toggle to show), and when visible they're dashed and faded so they're never confused with shark tracks.",
    "📋 <strong>Cleaner logbook.</strong> Filter dropdowns are proper styled boxes with the arrow inside.",
    "📖 <strong>Field guide polish.</strong> Expanded cards are fully scrollable on mobile, the ✅ checkmark leads each row, and the IUCN badge sits tight to the pin with no expander arrow — more room for Latin names.",
    "🛡️ <strong>Easter egg safety.</strong> The Mary Lee/Nicole naming easter eggs are hardened against crashes.",
  ],
  "v1.5.1-beta": [
    "📐 <strong>Tighter header.</strong> Less vertical space around the logo, title, and tab bar — more room for the actual game.",
    "📱 <strong>Smoother Phone.</strong> Message threads now render in one clean pass instead of visibly growing in stages.",
    "🖼️ <strong>No more Archive badge.</strong> The Archive tab no longer shows a notification dot.",
    "🌊 <strong>Porthole tuning.</strong> Splashes are rarer, waves move with a clearer near-fast/far-slow parallax, the tile edge can't peek through, and the clouds are properly puffy.",
  ],
  "v1.4.19-beta": [
    "\uD83E\uDD88 <strong>Sarah's Big Day.</strong> Tag multiple new species in one expedition and Sarah celebrates the extraordinary day with one authored conversation — no more three near-identical texts. 8 variants each for 2, 3, and 4 new species, plus lemon-aware reactions when her favourite is in the mix.",
  ],
  "v1.4.18-beta": [
    "\uD83C\uDF0A <strong>Waves stacked tight, moving in ovals.</strong> The three porthole wave layers now sit almost on top of each other with no gaps, and each traces a gentle elliptical orbit like real water \u2014 far slowest, near liveliest.",
    "\uD83D\uDCA6 <strong>Bigger, faster splash.</strong> The on-glass splash is bigger (320px), pops in suddenly, and slides down fast \u2014 the quickest thing in the calm wave scene.",
  ],
  "v1.4.17-beta": [
    "\u2600\uFE0F <strong>Sun rays fixed properly.</strong> The v1.4.16 conic-gradient fan broke the page layout, so rays are back on the safe span-based system — brighter, wider fan (12-72\u00B0), clearly visible sway and breathing, and they never fully vanish.",
    "\ud83d\udd27 <strong>Emergency layout rollback.</strong> The experimental ray rendering that broke the title and tab bar on iPad has been removed."
  ],
  "v1.4.16-beta": [
    "\u2600\uFE0F <strong>Sun rays rebuilt.</strong> The light fan is now a true conic-gradient radiating from the sun point \u2014 it spans the whole screen by construction, with a slow visible sway and breathing pulse. No more frozen bar on the left.",
    "\ud83d\udcd0 <strong>Field-guide overlay containment.</strong> Expanded entries are hard-contained so opening one can never widen its grid column.",
    "🌊 <strong>Porthole fills the view.</strong> The far wave sits lower, the near wave is bigger — swells overlap and fill the whole porthole. Bubble columns fire in overlapping pairs with tighter trails, and splashes are quick and snappy."
  ],
  "v1.4.15-beta": [
    "🌊 <strong>Underwater vista.</strong> The background is now a full surface-to-seafloor scene — sunlit top, deepening blues, sediment and kelp silhouettes at the bottom.",
    "🦈 <strong>Bigger logo.</strong> The shark logo beside the title is 150% bigger on desktop.",
    "🏷️ <strong>IUCN color coding.</strong> Threat levels now read at a glance — green (LC) through yellow, orange, red, to dark purple (CR). The badge sits snug beside the pin.",
    "📌 <strong>Smarter pinned hints.</strong> The pinned card shows the shark's description with key clues in bold — and the expedition line hints at diet in plain words instead of giving away answers.",
    "⏳ <strong>Time passes on expeditions.</strong> The dive log now moves from morning through afternoon to evening across your encounters."
  ],
};

function whatsNewSeen() {
  try { return localStorage.getItem("tyi-last-seen-version"); } catch { return null; }
}
function markWhatsNewSeen() {
  try { localStorage.setItem("tyi-last-seen-version", VERSION); } catch {}
}
/* Pure: should the What's New screen show?
   v0.22.0 Mira review: distinguish brand-new players from v0.21.0 upgraders.
   - No save data at all → first run, don't show.
   - Has save data but no version → v0.21.0 upgrader, show.
   - Version differs → show. Same version → don't. */
function shouldShowWhatsNew(lastSeen, current, hasSaveData) {
  if (!hasSaveData) return false; // brand new player
  if (!lastSeen) return true; // v0.21.0 upgrader (no version key yet)
  return lastSeen !== current;
}
function playerHasSaveData() {
  try {
    // Any of these indicates an existing player
    return !!(localStorage.getItem("tyi-logbook") ||
              localStorage.getItem("tyi-collection") ||
              localStorage.getItem("tyi-stats"));
  } catch { return false; }
}

/* ---------- SVG art: simplified, real proportions, few colours ---------- */

/* ---------- Ambient sea life: small silhouettes that drift through the dive ---------- */

/* v0.26.0: background creatures are now Mira-approved WebP shadow sprites
   (steel-blue silhouettes, transparent) instead of inline SVGs. The three
   original creatures keep their keys; ray/seal/jellyfish are new. */
const CREATURE_ART = {
  turtle: null, // set below via bgCreatureImg
  fish: null,
  dolphin: null,
  ray: null,
  seal: null,
  jellyfish: null
};
/* Filled in at load: art-loader.js must be loaded before script.js. */
function initCreatureArt() {
  CREATURE_ART.turtle = bgCreatureImg("bg-sea-turtle", "Sea turtle");
  CREATURE_ART.fish = bgCreatureImg("bg-fish-school", "School of fish");
  CREATURE_ART.dolphin = bgCreatureImg("bg-dolphin", "Dolphin");
  CREATURE_ART.ray = bgCreatureImg("bg-ray", "Ray");
  CREATURE_ART.seal = bgCreatureImg("bg-seal", "Seal");
  CREATURE_ART.jellyfish = bgCreatureImg("bg-jellyfish", "Jellyfish");
}

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
  "v1.4.15-beta": [
    "🌊 <strong>Underwater vista.</strong> The background is now a full surface-to-seafloor scene — sunlit top, deepening blues, sediment and kelp silhouettes at the bottom.",
    "🦈 <strong>Bigger logo.</strong> The shark logo beside the title is 150% bigger on desktop.",
    "🏷️ <strong>IUCN color coding.</strong> Threat levels now read at a glance — green (LC) through yellow, orange, red, to dark purple (CR). The badge sits snug beside the pin.",
    "📌 <strong>Smarter pinned hints.</strong> The pinned card shows the shark's description with key clues in bold — and the expedition line hints at diet in plain words instead of giving away answers.",
    "⏳ <strong>Time passes on expeditions.</strong> The dive log now moves from morning through afternoon to evening across your encounters."
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

/* Sightings pair a log line with a creature drifting past. Vary by depth.
   v0.13.0: pools fattened (reef had only 2, twilight/deep only 1) and dealt
   like cards per trip — the old pure-random pick is what stacked three
   turtles in one dive. */
const SIGHTINGS = {
  surface: [
    { text: "A sea turtle glides past, unhurried, flippers moving like slow wings.", creature: "turtle" },
    { text: "A school of small silver fish wheels past in perfect unison.", creature: "fish" },
    { text: "A dolphin arcs through the blue in the distance, there and gone.", creature: "dolphin" },
    { text: "A pair of flying fish skitter across the surface, touching down and lifting off again.", creature: "fish" },
    { text: "A seal torpedoes past, sleek and curious, then vanishes into the blue.", creature: "seal" },
    { text: "A manta ray breaches in the distance — a slow black wingspan against the sky, then gone.", creature: "ray" },
    { text: "A loggerhead turtle surfaces to breathe, exhales with a sound like a sigh, and dives.", creature: "turtle" },
    { text: "A pod of spotted dolphins hunts in formation, herding a bait ball into a glittering panic.", creature: "dolphin" }
  ],
  reef: [
    { text: "A sea turtle paddles over the coral, unbothered by your presence.", creature: "turtle" },
    { text: "A shimmering school of fusiliers pours over the reef crest.", creature: "fish" },
    { text: "A hawksbill turtle works a sponge off the coral head, beak crunching steadily.", creature: "turtle" },
    { text: "A small reef shark patrols the drop-off — not your target, just a colleague passing through.", creature: "fish" },
    { text: "A spotted eagle ray glides over the sand flat, wings rippling like slow applause.", creature: "ray" },
    { text: "A green turtle rests on a coral bommie, tucked in like it's naptime. It probably is.", creature: "turtle" },
    { text: "A school of barracuda hangs motionless in the blue, silver commas all facing the same way.", creature: "fish" },
    { text: "A reef octopus flows across the coral, colour-shifting with every metre.", creature: "fish" }
  ],
  twilight: [
    { text: "A loose school of lanternfish flickers past, each one carrying its own small light.", creature: "fish" },
    { text: "A chain of salps drifts past, glassy barrels linked nose to tail.", creature: "fish" },
    { text: "A squid pulses through the edge of the lights, arms trailing, gone in a blink.", creature: "fish" },
    { text: "A moon jelly drifts past, pulsing gently, trailing its fine oral arms.", creature: "jellyfish" }
  ],
  deep: [
    { text: "Something small and pale drifts through the edge of the lights — gone before you can focus.", creature: "fish" },
    { text: "A rattail fish noses through the mud at the edge of the lights, unhurried.", creature: "fish" },
    { text: "A dumbo octopus flaps past like a tiny ghost with ears.", creature: "fish" },
    { text: "A deep-sea jellyfish pulses in the darkness, its bell glowing faintly red.", creature: "jellyfish" }
  ]
};

/* v0.13.0: the sighting deck is filtered against the region note so the
   trip doesn't echo it — the Caribbean note already mentions a green sea
   turtle, Japan's a lanternfish, the Maldives' dolphins. */
const SIGHTING_KEYWORDS = { turtle: "turtle", fish: "fish", dolphin: "dolphin", ray: "ray", seal: "seal", jellyfish: "jelly" };
function buildSightingDeck(depth, region) {
  const pool = SIGHTINGS[depth] || [];
  const note = ((REGIONS[region] && REGIONS[region].note) || "").toLowerCase();
  const filtered = pool.filter(s => !note.includes(SIGHTING_KEYWORDS[s.creature]));
  const use = filtered.length ? filtered : pool;
  return { deck: shuffled(use), pool: use };
}

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

/* v0.22.0: failed trips feel like fieldwork — weather, sea state, and
   wildlife make every expedition a day on the water, not just a miss. */
const SEA_CONDITIONS = [
  "Calm waves this morning — the sea is glass, and the boat barely rocks.",
  "A light chop keeps things interesting; whitecaps glint in the sun.",
  "Overcast and moody — the water looks like hammered pewter.",
  "A fresh breeze out of the east; the swells roll in long and lazy.",
  "Morning fog burns off by nine, leaving the water silver-green.",
  "Choppy and bright — spray on the bow, gulls screaming overhead."
];
/* v0.22.0 Mira review: wildlife sightings are region-appropriate.
   No mantas in the Arctic! */
const FIELD_NOTES = {
  tropical: [
    "Field notes: no sharks, but a pod of dolphins rode the bow wave for twenty minutes. Worth the fuel.",
    "Field notes: a sea turtle surfaced beside the boat and regarded us with ancient indifference.",
    "Field notes: a manta ray passed underneath, huge and unhurried. Not a shark, but nobody's complaining.",
    "Field notes: logged three seabird species and one very confused flying fish. Science is science.",
    "Field notes: water temp 27°C at the surface, visibility easily 30 metres. Perfect conditions — just no sharks.",
    "Field notes: the bait came up untouched, not even nibbled. Whatever's down there wasn't hungry today.",
    "Field notes: a current running east pushed our chum slick into a long ribbon. Good drift, wrong audience.",
    "Field notes: plankton thick in the water column tonight — the whole sea glitters when the boat rocks.",
    "Field notes: found a turtle with a satellite tag from another project. Waved. It did not wave back.",
    "Field notes: remora attached itself to the hull for an hour. We named it Kevin. Kevin has left.",
    "Field notes: a school of jacks swirled under the boat, flashing silver. Beautiful. Not sharks.",
    "Field notes: flying fish skittered across the surface at dusk, chased by something we'll never identify.",
    "Field notes: a hawksbill turtle surfaced three times, each time a little closer. Curiosity is not just a mammal thing.",
    "Field notes: the water is so clear you can see the anchor chain's shadow on the sand 20 metres down.",
    "Field notes: frigatebirds hanging motionless overhead, waiting for flying fish to make a mistake.",
    "Field notes: a spotted eagle ray cruised past the bow, wings beating slow as a heartbeat.",
    "Field notes: coral spawning tonight — the water is full of pink snow. The whole reef is breathing."
  ],
  temperate: [
    "Field notes: no sharks, but a pod of dolphins rode the bow wave for twenty minutes. Worth the fuel.",
    "Field notes: water temp steady, bait fresh, patience intact. The sharks have their own schedule.",
    "Field notes: logged three seabird species and one very confused flying fish. Science is science.",
    "Field notes: a seal watched us from a nearby rock, unimpressed by our sharklessness.",
    "Field notes: water temp 16°C, a thermocline at 20 metres. The bait sat right on it, undisturbed.",
    "Field notes: the current shifted north around noon and took our scent trail with it. Recalibrating.",
    "Field notes: gulls followed the boat all morning, hopeful. We shared nothing. They judged us.",
    "Field notes: plankton bloom turning the water green-gold. Pretty, but it cuts visibility to 10 metres.",
    "Field notes: a sunfish drifted past like a lost dinner plate. Enormous. Serene. Not a shark.",
    "Field notes: bait untouched after six hours. Either the sharks are elsewhere or they're laughing at us.",
    "Field notes: spotted a ray's wingtip breaking the surface at distance — gone before the binoculars came up.",
    "Field notes: the hydrophone picked up whale song, faint and far. The ocean is busy, just not with sharks.",
    "Field notes: a harbour porpoise surfaced twice off the port side, rolled, and vanished. Blink and you miss everything.",
    "Field notes: kelp fronds drifting past, whole floating islands of them. A whole ecosystem on the move.",
    "Field notes: cormorants drying their wings on the buoy, looking like tiny gargoyles.",
    "Field notes: the fog rolled in at noon and turned the whole ocean into a grey room. We listened more than watched.",
    "Field notes: a mola mola drifted past the stern, huge and improbable, like the ocean's rough draft."
  ],
  polar: [
    "Field notes: water temp steady, bait fresh, patience intact. The sharks have their own schedule.",
    "Field notes: an iceberg drifted past, impossibly blue underneath. The sharks are down there somewhere.",
    "Field notes: logged three seabird species. The Arctic terns seemed to pity us.",
    "Field notes: the chum slick drifted true all day. Sometimes the ocean just says not today.",
    "Field notes: water temp 2°C. The bait hangs sluggish in the cold — everything moves slower down here, including us.",
    "Field notes: a seal surfaced through a crack in the ice, stared, vanished. The whole encounter took four seconds.",
    "Field notes: the current under the ice runs steady west. Our instruments are happy even if our nets are empty.",
    "Field notes: plankton sparse but the water is impossibly clear — 40 metres of visibility and nothing in it.",
    "Field notes: a polar bear watched from the ice edge for an hour. We maintained a respectful distance. It did not.",
    "Field notes: the bait line came up with ice crystals on it. The ocean is telling us something about our life choices.",
    "Field notes: narwhal clicks on the hydrophone, close enough to feel. Not a shark, but we'll take it.",
    "Field notes: the sky went full aurora at 11pm. No sharks, but honestly? Worth it.",
    "Field notes: brash ice tinkling against the hull all morning — the Arctic's wind chimes.",
    "Field notes: a bearded seal hauled out on an ice floe and sang. The whole boat went quiet to listen.",
    "Field notes: the water is -1°C and somehow still liquid. The ocean refuses to follow the rules here.",
    "Field notes: kittiwakes wheeling around the cliffs, thousands of them, loud as a stadium.",
    "Field notes: a Greenland shark could be directly below us right now and we'd never know. They are the ocean's best-kept secret."
  ],
  generic: [
    "Field notes: water temp steady, bait fresh, patience intact. The sharks have their own schedule.",
    "Field notes: the chum slick drifted true all day. Sometimes the ocean just says not today.",
    "Field notes: logged three seabird species and one very confused flying fish. Science is science.",
    "Field notes: the bait came up untouched — not a nibble. The sea keeps its own counsel.",
    "Field notes: current running steady, visibility fair. All the conditions are right except the one that matters.",
    "Field notes: plankton drifting thick past the hull. The base of everything, and today it's all we've got.",
    "Field notes: something large moved deep below the boat, too deep for the lights. We logged it as 'interesting'.",
    "Field notes: a seabird landed on the rail and refused to leave for an hour. We have named it Supervisor.",
    "Field notes: the water went glassy calm at sunset. Beautiful. Sharkless, but beautiful.",
    "Field notes: jellyfish pulsing past in the hundreds, lit up by the deck lights. The ocean's lava lamps.",
    "Field notes: the depth sounder showed a bait ball at 40 metres, scattering. Something hunts here — just not today.",
    "Field notes: salt spray, diesel, and kelp. The smell of a working day with nothing to show but the smell.",
    "Field notes: the moon rose over calm waves and turned the whole sea to hammered silver.",
    "Field notes: a lone albatross followed us for hours without a single wingbeat. Show-off.",
    "Field notes: bioluminescence in the wake tonight — every wave breaks into cold fire.",
    "Field notes: the barometer is falling and the gulls know something we don't. They're all heading in.",
    "Field notes: counted eleven species of seabird today. The sharks get the glory, the birds do the paperwork."
  ]
};
/* Map regions to climate zones for wildlife notes. */
function regionClimate(regionId) {
  const tropical = ["caribbean", "maldives", "philippines", "galapagos", "south-africa"];
  const polar = ["arctic"];
  if (tropical.includes(regionId)) return "tropical";
  if (polar.includes(regionId)) return "polar";
  return "temperate";
}
/* v1.2.0-beta Mira review: chum-slick observations only appear when the
   expedition actually used chum — otherwise they'd imply a method the
   player never chose. */
function pickFieldNote(regionId, plan) {
  const zone = regionClimate(regionId);
  let notes = FIELD_NOTES[zone] || FIELD_NOTES.generic;
  const usedChum = plan && plan.method === "attract" && plan.methodOpt === "chum";
  if (!usedChum) notes = notes.filter(n => !/chum slick/i.test(n));
  return pick(notes);
}

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

/* v1.3.0-beta: natural-history observations from "Just watch" encounters.
   Optional flavor only — never a checklist, never an achievement trigger.
   Stored per-species on the tagged record.
   Mira review (v1.3.0): split by habitat so notes stay scientifically
   coherent — a deep-sea shark doesn't rest on a reef, and a reef shark
   doesn't hunt alone in the blue. */

/* Mira review (v1.3.0, round 3): ALL watch notes are now purely
   observational — they describe the environment, other animals, water
   conditions, or static features of the shark. They never assign an action
   to the shark, so they can't contradict the sighting's "doing" line.
   Habitat pools are kept for scientific coherence. */
const WATCH_NOTES_REEF = [
  "a nearby ledge offers perfect shelter",
  "the sandy bottom below is undisturbed",
  "small reef fish dart between the coral heads",
  "the boat's shadow ripples across the reef"
];
const WATCH_NOTES_PELAGIC = [
  "a remora is attached near the dorsal fin",
  "a bait ball shimmers in the distance",
  "the current edge is visible as a line of floating debris",
  "no other sharks in sight — just blue in every direction",
  "sunlight shafts angle down through the surface",
  "a school of small fish flashes silver nearby",
  "the boat's hull sounds loud in the quiet blue"
];
const WATCH_NOTES_DEEP = [
  "the water temperature drops noticeably here",
  "the tail fin is broad and powerful up close",
  "marine snow drifts down like slow rain",
  "bioluminescent flashes blink in the dark below",
  "the dive lights catch particles suspended in the water"
];
/* Pick a habitat-appropriate pool from the species' depth bands.
   Reef species -> reef notes; twilight/deep -> deep notes;
   surface-only (open water) -> pelagic notes. */
function pickWatchNote(species) {
  /* Notes are purely observational (see above), so no doing/depth
     filtering is needed — any note suits any encounter in its habitat. */
  const d = (species && species.depths) || [];
  const pool = d.includes("reef") ? WATCH_NOTES_REEF
    : (d.includes("deep") || d.includes("twilight")) ? WATCH_NOTES_DEEP
    : WATCH_NOTES_PELAGIC;
  return pick(pool);
}

/* v0.7.0: tagging the first six earns new waters. */
const REGION_UNLOCK_THREAD = [
  { who: "them", text: "Six sharks. You're officially a real shark scientist now, you know." },
  { who: "me", text: "Six for six. The institute just cleared two new survey regions for us." },
  { who: "them", text: "The Galápagos and South Africa. I've read everything about those waters. Ask me anything — I mean it." },
  { who: "me", text: "I have a feeling I'm going to. 🦈" }
];

/* v0.21.0 sharknado: unlock threads for the three new regions. */
const EAST_AUS_UNLOCK_THREAD = [
  { who: "them", text: "Fifteen sharks! The institute just cleared Eastern Australia for us." },
  { who: "me", text: "Wobbegongs and Port Jackson sharks. Reef country." },
  { who: "them", text: "I've wanted to see a wobbegong my whole life. They look like someone dropped a shark on a carpet. 😂" }
];
const CALIFORNIA_UNLOCK_THREAD = [
  { who: "them", text: "Twenty-five! California Coast is open now." },
  { who: "me", text: "Leopard sharks in the bays, horn sharks on the reefs." },
  { who: "them", text: "Horn sharks have those little brow ridges. They look permanently unimpressed. I love them." }
];
const ARCTIC_UNLOCK_THREAD = [
  { who: "them", text: "Thirty-five sharks. The institute cleared... the Arctic?" },
  { who: "me", text: "Greenland sharks. The cold dark. The long-lived ones." },
  { who: "them", text: "Be careful out there. And bring back stories. 🩵" }
];

/* World-map + tracking data lives in map-data.js (loaded before this file). */

function mapProj(lat, lon) {
  return [(lon + 180) / 360 * MAP_W, (90 - lat) / 180 * MAP_H];
}

/* Track points -> plottable xy. The first point is the tag site (the
   player's fact); the rest is the illustrative envelope walk. They are
   drawn separately so a tag site far from the documented range doesn't
   imply a migration nobody recorded. */
function mapPoints(t) {
  const pts = (t.track && t.track.points || []).map(p => {
    const c = MAP_COORDS[p.label];
    if (!c) return null;
    const [x, y] = mapProj(c[0], c[1]);
    return { x, y, label: p.label, day: p.day };
  }).filter(Boolean);
  return pts;
}

/* ---------- Tracking map: satellite view (v0.10.0) ----------
   Blue Marble background, viewBox zoom, toggleable currents overlay.
   Track/tag geometry is unchanged — the equirectangular projection
   already matched, so every coordinate keeps working as before. */
let mapZoom = 1, mapCX = MAP_W / 2, mapCY = MAP_H / 2;
/* v0.15.0: no explore mode, no pinch — zoom is buttons/wheel only.
   touch-action follows the zoom level, decided before any touch begins:
   at 1x the page owns one-finger drags (the page scrolls); zoomed in,
   the map owns them (one finger pans). No mid-gesture races, no modes. */
let mapCurrentsOn = false; /* v1.5.2-beta: currents OFF by default */
const MAP_ZOOM_MIN = 1, MAP_ZOOM_MAX = 4;

function mapViewBox() {
  const w = MAP_W / mapZoom, h = MAP_H / mapZoom;
  const x = Math.min(Math.max(mapCX - w / 2, 0), MAP_W - w);
  const y = Math.min(Math.max(mapCY - h / 2, 0), MAP_H - h);
  return { x, y, w, h };
}

/* Split a waypoint list wherever it jumps the antimeridian, so a path
   never streaks across the whole map. */
function splitAntimeridian(pts) {
  const segs = [[pts[0]]];
  for (let i = 1; i < pts.length; i++) {
    if (Math.abs(pts[i][1] - pts[i - 1][1]) > 180) segs.push([]);
    segs[segs.length - 1].push(pts[i]);
  }
  return segs.filter(s => s.length > 1);
}

/* Catmull-Rom -> cubic Bezier smoothing, so currents curve instead of kinking. */
function smoothPath(p) {
  const f = q => q[0].toFixed(1) + "," + q[1].toFixed(1);
  if (p.length < 3) return "M" + p.map(f).join(" L");
  let d = "M" + f(p[0]);
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[Math.max(0, i - 1)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(p.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += " C" + c1x.toFixed(1) + "," + c1y.toFixed(1) + " " + c2x.toFixed(1) + "," + c2y.toFixed(1) + " " + f(p2);
  }
  return d;
}

/* Ocean currents overlay. Warm/cold hues are real oceanography, not decoration.
   Arrowheads only on the final subpath — a current running off the map edge
   gets no arrowhead mid-ocean. Famous-current labels fade in past 1.75x zoom. */
function renderCurrents(z) {
  const list = (typeof CURRENTS === "undefined") ? [] : CURRENTS;
  if (!mapCurrentsOn || !list.length) return "";
  const sw = (2.4 / z).toFixed(2);
  let s = '<defs>'
    + '<marker id="curWarm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#ff9e5e"/></marker>'
    + '<marker id="curCold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#6ecff5"/></marker></defs>';
  list.forEach(c => {
    const cls = c.warm ? "warm" : "cold", mid = c.warm ? "curWarm" : "curCold";
    const segs = splitAntimeridian(c.pts);
    segs.forEach((seg, i) => {
      const d = smoothPath(seg.map(pt => mapProj(pt[0], pt[1])));
      s += '<path d="' + d + '" class="current ' + cls + '" stroke-width="' + sw + '"'
        + ' stroke-dasharray="' + (8/z).toFixed(1) + ' ' + (5/z).toFixed(1) + '"'
        + (i === segs.length - 1 ? ' marker-end="url(#' + mid + ')"' : "") + "/>";
    });
    if (c.label && z >= 1.75) {
      const mid2 = c.pts[Math.floor(c.pts.length / 2)];
      const lp = mapProj(mid2[0], mid2[1]);
      s += '<text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] - 8).toFixed(1) + '" class="current-label" text-anchor="middle">' + esc(c.name) + "</text>";
    }
  });
  return s;
}

function renderMap() {
  const wrap = $("worldMapWrap");
  const pop = $("mapPopup");
  const legend = $("mapLegend");
  const ids = Object.keys(state.tagged);
  /* v0.11.0: a focus glide re-renders every frame — hiding the popup here
     would eat it on the first animation frame, right after the tap showed
     it. Skip the hide while a glide is in flight; the popup still hides on
     any later render, exactly as before. */
  if (!mapGlide) pop.classList.add("hidden");
  const z = mapZoom, vb = mapViewBox();
  /* v0.15.0: zoom-driven gesture ownership — 1x scrolls the page,
     zoomed pans the map. Set before any touch begins. */
  wrap.style.touchAction = mapZoom > 1 ? "none" : "pan-y";
  wrap.classList.toggle("exploring", mapZoom > 1);
  /* Blue Marble background (dark rect behind it in case the hotlink fails;
     the URL guard keeps the map working if map-data.js ever fails to load). */
  const bmUrl = (typeof BLUE_MARBLE_URL !== "undefined") ? BLUE_MARBLE_URL : "";
  let svg = `<svg id="worldMapSvg" viewBox="${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}" role="img" aria-label="World map of tagged sharks">`
    + `<rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" fill="#0d2f4d"/>`
    + `<image href="${bmUrl}" x="0" y="0" width="${MAP_W}" height="${MAP_H}" preserveAspectRatio="none"/>`;
  svg += renderCurrents(z);
  /* Track strokes and marker sizes are divided by zoom so they stay
     readable instead of going gigantic. */
  const tsw = (2 / z).toFixed(2);
  ids.forEach(sid => {
    const t = state.tagged[sid];
    if (!t.track) t.track = genTrack(sharkById(sid) || { id: "nurse" }, t);
    const color = SPECIES_COLORS[sid] || "#ffffff";
    const pts = mapPoints(t);
    if (pts.length < 2) return;
    /* Illustrative track: envelope walk only (points[1..]). The tag site
       gets its own pin below — no line implying a migration between them. */
    const path = pts.slice(1);
    if (path.length >= 2) {
      const d = path.map((p, i) => (i ? "L" : "M") + p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");
      const archival = t.track.kind === "archival";
      svg += `<path class="map-track" d="${d}" stroke="${color}" stroke-width="${tsw}"`
        + (archival ? ` stroke-dasharray="${(5 / z).toFixed(1)} ${(4 / z).toFixed(1)}"` : "") + "/>";
    }
  });
  /* Markers: hollow pin = tag site, filled dot = latest position.
     Sizes are divided by zoom so they stay readable, not gigantic. */
  ids.forEach(sid => {
    const t = state.tagged[sid];
    const s = sharkById(sid);
    const color = SPECIES_COLORS[sid] || "#ffffff";
    const pts = mapPoints(t);
    if (!pts.length) return;
    const label = esc(t.name ? `“${t.name}”` : t.researchId) + " — " + esc(s.name);
    const tag = pts[0];
    svg += `<g class="map-marker" data-sid="${sid}"><title>${label} (tag site)</title>`
      + `<circle cx="${tag.x.toFixed(1)}" cy="${tag.y.toFixed(1)}" r="${(6 / z).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${(2.5 / z).toFixed(2)}"/>`
      + `<circle cx="${tag.x.toFixed(1)}" cy="${tag.y.toFixed(1)}" r="${(1.8 / z).toFixed(1)}" fill="${color}"/></g>`;
    if (pts.length > 1) {
      const last = pts[pts.length - 1];
      svg += `<g class="map-marker latest" data-sid="${sid}"><title>${label} (latest)</title>`
        + `<circle cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="${(8 / z).toFixed(1)}" fill="${color}" stroke="#fff" stroke-width="${(2 / z).toFixed(2)}"/></g>`;
    }
  });
  svg += `</svg>`;
  if (!ids.length) {
    /* Warm empty state over the satellite map — the ocean is there waiting. */
    wrap.innerHTML = svg + `<div class="map-empty"><span class="big">🗺️</span>No tagged sharks yet — tag one and it will appear here, swimming its real waters.</div>`;
    legend.innerHTML = "";
  } else {
    wrap.innerHTML = svg;
    legend.innerHTML = ids.map(sid => {
      const s = sharkById(sid), t = state.tagged[sid];
      return `<span class="map-chip" data-sid="${sid}" role="button" tabindex="0"><span class="dot" style="background:${SPECIES_COLORS[sid] || "#fff"}"></span>${esc(s.name)} · ${esc(t.name || t.researchId)}</span>`;
    }).join("");
  }
  wrap.querySelectorAll(".map-marker").forEach(m => {
    m.addEventListener("click", () => {
      /* v0.10.2: a drag that ends on a marker must not open its popup —
         the gesture code sets this flag past ~10px of movement. */
      if (suppressMarkerClick) { suppressMarkerClick = false; return; }
      showMapPopup(m.dataset.sid);
      mapFocusOn(m.dataset.sid); // v0.11.0: glide the map to the shark
    });
  });
  /* v0.11.0: legend chips focus the map too — same tap, same glide. */
  legend.querySelectorAll(".map-chip").forEach(c => {
    const go = () => { showMapPopup(c.dataset.sid); mapFocusOn(c.dataset.sid); };
    c.addEventListener("click", go);
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
  const tg = $("mapCurrentsToggle");
  if (tg) tg.setAttribute("aria-pressed", mapCurrentsOn ? "true" : "false");
}

function showMapPopup(sid) {
  const s = sharkById(sid), t = state.tagged[sid];
  const pts = mapPoints(t);
  const last = pts.length > 1 ? pts[pts.length - 1] : pts[0];
  const kindNote = t.track.hypothetical
    ? "Hypothetical movement scenario — this route illustrates plausible long-range movement for a migratory species, not a reconstruction of this individual's tracked journey."
    : t.track.kind === "archival"
    ? "Illustrative habitat-based movement scenario. These plotted positions are not actual detections of this individual." + (s.id === "sawshark" ? " (Pop-up satellite archival tags have been deployed on common sawsharks off Tasmania — Burke et al. 2020.)" : "")
    : t.track.kind === "resightings"
      ? "Built from reef survey re-sightings, not a satellite tag — this shark barely leaves its reef flat. Every ping falls within about 2 km."
      : t.track.kind === "acoustic"
        ? "Illustrative track based on acoustic-tag detections from reef receiver arrays — a different way of following sharks than satellite tags."
      : null;
  const pop = $("mapPopup");
  pop.innerHTML = `
    <h4>${t.name ? `“${esc(t.name)}”` : esc(t.researchId)}</h4>
    <p class="latin">${esc(s.name)} · ${esc(t.researchId)}</p>
    <p class="map-meta">📍 Tagged at ${esc(t.location)} · ${esc(t.date)}<br>📡 Latest ping: ${last ? esc(last.label) : "—"}${t.resightings && t.resightings.length ? `<br>🔁 Re-sighted ${t.resightings.length}×` : ""}</p>
    ${kindNote ? `<p class="map-kind-note">${kindNote}</p>` : ""}
    <button class="secondary-button" type="button" id="mapCardBtn">🗂️ Open collection card</button>`;
  pop.classList.remove("hidden");
  $("mapCardBtn").addEventListener("click", () => openDetail(sid));
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

/* v0.18.0: achievement + stats stores. Stats feed achievement checks
   (regions visited, baits used, re-sights, chum tags, expedition count). */
const statsStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-stats") || "{}"); }
    catch { return {}; }
  },
  save(d) { localStorage.setItem("tyi-stats", JSON.stringify(d)); }
};
const achieveStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-achievements") || "{}"); }
    catch { return {}; }
  },
  save(d) { localStorage.setItem("tyi-achievements", JSON.stringify(d)); }
};

/* v0.7.0: the sightings log — spotted but not tagged. Pure field notes. */
/* v1.5.0-beta Mira review (blocking): persist pending Big Day/species
   celebrations so a reload before trip end doesn't lose them. */
const celebrationStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-pending-celebrations") || "[]"); }
    catch { return []; }
  },
  save(d) { try { localStorage.setItem("tyi-pending-celebrations", JSON.stringify(d)); } catch {} },
  clear() { try { localStorage.removeItem("tyi-pending-celebrations"); } catch {} }
};
const sightStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-sightings") || "[]"); }
    catch { return []; }
  },
  save(d) { localStorage.setItem("tyi-sightings", JSON.stringify(d)); }
};

/* v0.8.0: the expedition logbook — a scientist's notebook. Every trip:
   date, the plan (region/depth/bait/method), encounters and outcome. */
const logStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-logbook") || "[]"); }
    catch { return []; }
  },
  save(d) { localStorage.setItem("tyi-logbook", JSON.stringify(d)); }
};

/* v0.7.0: the first six sharks (the original roster). Tagging all six
   unlocks the Galápagos and South Africa — new waters earned, not given. */
const ORIGINAL_SIX = ["nurse", "thresher", "whale", "goblin", "tiger", "sandtiger"];

/* v0.20.0: the pinned shark — "currently researching". One shark at a time,
   persisted across sessions. A focus, not a filter. */
const pinStore = {
  load() {
    try { return localStorage.getItem("tyi-pinned") || null; }
    catch { return null; }
  },
  save(id) {
    try {
      if (id) localStorage.setItem("tyi-pinned", id);
      else localStorage.removeItem("tyi-pinned");
    } catch {}
  }
};
/* v1.4.0-beta: secret tag-along facts. Tracks which facts have been unlocked
   per species: {speciesId: [factIndex, ...]}. Persists through export/import
   via RESET_KEYS. */
const factStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-facts") || "{}"); }
    catch { return {}; }
  },
  save(d) {
    try { localStorage.setItem("tyi-facts", JSON.stringify(d)); } catch {}
  }
};
/* v1.0.3-beta: collapsible pinned explainer. Tracks whether the player has
   ever pinned a shark — after the first pin, the empty pinned card shows a
   single line ("Pinned sharks appear here.") instead of the full explanation. */
const pinHistoryStore = {
  load() {
    try { return localStorage.getItem("tyi-pinned-before") === "1"; }
    catch { return false; }
  },
  save() {
    try { localStorage.setItem("tyi-pinned-before", "1"); } catch {}
  }
};

/* v0.6.0: threads are {ts, msgs}. Migrate legacy bare-array threads. */
function normThread(t) {
  if (Array.isArray(t)) return { ts: 0, msgs: t };
  return t;
}

const state = {
  tagged: store.load(),   // id -> {name, researchId, length, sex, location, date, sarahEgg, track}
  failures: 0,
  chatIdx: _savedMsgs.chatIdx || 0,
  /* v0.12.0: contextual hints — the region of the player's most recent
     expedition, so Sarah's hints stay specific to what they're actually
     searching for instead of spamming the whole roster. */
  lastRegion: _savedMsgs.lastRegion || null,
  chatSeen: _savedMsgs.chatSeen || {},
  messages: (_savedMsgs.messages || []).map(normThread),
  unread: _savedMsgs.unread || 0,
  pendingTag: null,       // species object awaiting naming
  sightings: sightStore.load(), // v0.7.0: watched-but-not-tagged log
  logbook: logStore.load(),   // v0.8.0: expedition logbook
  regionsUnlocked: false, // v0.7.0: first six tagged -> Galápagos + South Africa
  pendingWin: false,      // v0.7.0: final shark tagged mid-trip; ceremony at day's end
  currentPlan: null,      // the trip's region/depth/bait/method (method added v0.8.0 as scent, reworked v0.9.0)
  taggedThisTrip: false,  // v0.7.0: skip the random post-trip chat after a tag
  resightedThisTrip: false, // v0.8.0: same skip after a re-sighting celebration
  followedThisTrip: false,  // v1.4.0-beta: skip random post-trip chat after a tag-along follow
  encounterDone: null,    // v0.7.0: callback that resumes the trip after watch/tag
  /* v0.17.1: Ask Sarah offer persists in the message store — Sarah's saved
     thread promises "pick one below", so the panel must survive a reload. */
  sarahAdviceOffered: !!_savedMsgs.sarahAdviceOffered,
  /* v1.4.19-beta: Big Day no-repeat bags — per-tier shuffled indices. */
  bigDayBags: _savedMsgs.bigDayBags || {},
  /* v0.18.0: stats feed achievement checks; achievements persist unlocked IDs. */
  stats: Object.assign(
    { regionsVisited: [], baitsUsed: [], resights: 0, chumTags: 0, expeditions: 0,
      depthsTagged: [], methodsUsed: [] },
    statsStore.load()
  ),
  achievements: achieveStore.load(), // id -> timestamp
  bruceChainComplete: false, // v0.18.0: the Bruce chain isn't built yet
  won: (() => { try { return localStorage.getItem("tyi-won") === "1"; } catch { return false; } })(),
  archiveUnlocked: (() => { try { return localStorage.getItem("tyi-archive") === "1"; } catch { return false; } })(),
  pinned: pinStore.load(), // v0.20.0: "currently researching" shark id, or null
  hasPinnedBefore: pinHistoryStore.load(), // v1.0.3-beta: player has pinned at least once
  unlockedFacts: factStore.load(), // v1.4.0-beta: {speciesId: [factIdx, ...]}
  /* v1.5.3-beta: reunion reactions — one-time Sarah thread per species. */
  reunionReacted: (() => { try { return JSON.parse(localStorage.getItem("tyi-reunion-reacted") || "{}"); } catch { return {}; } })(),
  /* v0.23.0: Bruce easter egg chain state: { stage, sharkId, lastAdvance } or null */
  bruceEgg: (() => { try { return JSON.parse(localStorage.getItem("tyi-bruce") || "null"); } catch { return null; } })(),
  bruceChainComplete: (() => { try { return localStorage.getItem("tyi-bruce-done") === "1"; } catch { return false; } })(),
  pendingTagAlong: null, // v1.4.0-beta: species id to focus on map after tag-along trip
  deferredTagAlong: null // v1.4.0-beta: tag-along deferred until win ceremony acknowledged
};
/* v0.18.0 review: migrate pre-achievement saves — seed stats from the logbook
   and existing tags so established players get credit for their history. */
(function migrateStats() {
  const s = state.stats;
  let changed = false;
  const log = state.logbook || [];
  if (!(s.expeditions > 0) && log.length > 0) {
    s.expeditions = log.length; changed = true;
  }
  log.forEach(t => {
    if (t.region && !s.regionsVisited.includes(t.region)) { s.regionsVisited.push(t.region); changed = true; }
    if (t.bait && !s.baitsUsed.includes(t.bait)) { s.baitsUsed.push(t.bait); changed = true; }
  });
  let resights = 0;
  Object.values(state.tagged || {}).forEach(t => { resights += (t.resightings || []).length; });
  if (!(s.resights > 0) && resights > 0) { s.resights = resights; changed = true; }
  /* v0.18.0 review 2nd pass: backfill "Something in the Water" — a log entry
     with attract+chum and a tagged encounter of a chum-valid species counts. */
  log.forEach(t => {
    if (t.methodOpt && t.methodOpt !== "none" && !(s.methodsUsed || []).includes(t.methodOpt)) {
      s.methodsUsed.push(t.methodOpt); changed = true;
    }
    const taggedHere = (t.encounters || []).some(e => e.result === "tagged");
    if (taggedHere && t.depth && !(s.depthsTagged || []).includes(t.depth)) {
      s.depthsTagged.push(t.depth); changed = true;
    }
  });
  if (!(s.chumTags > 0)) {
    const chumEarned = log.some(t =>
      t.method === "attract" && t.methodOpt === "chum" &&
      (t.encounters || []).some(e => {
        if (e.result !== "tagged") return false;
        const sp = SHARKS.find(x => x.id === e.speciesId);
        return sp && sp.methods && sp.methods.attract && sp.methods.attract.includes("chum");
      })
    );
    if (chumEarned) { s.chumTags = 1; changed = true; }
  }
  if (changed) saveStats();
})();
function saveMsgs() {
  msgStore.save({ messages: state.messages, unread: state.unread, chatIdx: state.chatIdx,
    lastRegion: state.lastRegion, chatSeen: state.chatSeen,
    sarahAdviceOffered: state.sarahAdviceOffered,
    bigDayBags: state.bigDayBags });
}
/* Every new thread gets a timestamp for the Phone tab.
   v1.4.0: if the Phone panel is already open, the new thread renders
   immediately — count it as read instead of leaving a stale badge. */
function pushThread(msgs) {
  state.messages.push({ ts: Date.now(), msgs });
  const phoneTab = document.querySelector('.tab[data-tab="phone"]');
  if (!(phoneTab && phoneTab.classList.contains('active'))) state.unread += 1;
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
    /* v0.21.0 Mira final: regenerate tracks that predate the tag-anchor fix.
       Old tracks start at generic regional centers and teleport to the envelope.
       v0.21.0 Mira re-review: preserve player re-sighting points. */
    if (!t.track || t.track.v !== 2) {
      /* v0.21.0 Mira: legacy tracks lack the resighting flag. Reconstruct
         from t.resightings records if no flagged points exist. */
      let resightPoints = (t.track && t.track.points || []).filter(p => p.resighting);
      const resightRecords = t.resightings || [];
      if (resightPoints.length === 0 && resightRecords.length > 0 && t.track && t.track.points) {
        // Legacy: reconstruct from resightings records. Old points lack the flag,
        // so we treat points beyond the typical generated count as re-sightings.
        // Each resighting record corresponds to a point appended after generation.
        const genCount = t.track.points.length - resightRecords.length;
        if (genCount >= 0 && resightRecords.length > 0) {
          resightPoints = t.track.points.slice(genCount).map((p) => ({
            label: p.label, day: p.day, km: p.km, resighting: true
          }));
        }
      }
      t.track = genTrack(sharkById(sid) || { id: "nurse" }, t);
      t.track.v = 2;
      const species = sharkById(sid);
      const env = (typeof TRACK_ENVELOPES !== "undefined" && TRACK_ENVELOPES[species.id]) || null;
      resightPoints.forEach((rp) => {
        const anchorLabel = (env && env.tagAnchor) || rp.label;
        const last = t.track.points[t.track.points.length - 1];
        const lastCoord = MAP_COORDS[last.label];
        const newCoord = MAP_COORDS[anchorLabel];
        let km = 0;
        if (lastCoord && newCoord && typeof haversineKm === "function") {
          km = Math.round(haversineKm(lastCoord, newCoord) * 10) / 10;
        }
        t.track.points.push({ label: anchorLabel, day: rp.day, km, resighting: true });
        t.track.totalKm = Math.round((t.track.totalKm + km) * 10) / 10;
        // Ensure day count agrees with final point (legacy points may be newer)
        if (rp.day > t.track.days) t.track.days = rp.day;
      });
      if (resightRecords.length) t.resightings = resightRecords;
      changed = true;
    }
  });
  if (changed) store.save(state.tagged);
}

const $ = (id) => document.getElementById(id);
const esc = (str) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sharkById = (id) => SHARKS.find(s => s.id === id);
/* v1.5.3-beta: reunion odds by species ecology. These are game-balance numbers,
   NOT scientific re-sighting probabilities. Resident/site-faithful sharks are
   most likely to be recognized; wide-ranging migrants rarely are. */
const REUNION_ODDS = { resident: 0.50, coastal: 0.25, migratory: 0.10 };
const ECOLOGY_TIER = {
  /* Resident/site-faithful (17) — reef residents, bottom-dwellers, site-attached */
  nurse: "resident", sandtiger: "resident", galapagos: "resident",
  epaulette: "resident", lemon: "resident", blacktip: "resident",
  whitetip: "resident", zebra: "resident", bonnethead: "resident",
  greyreef: "resident", caribbean: "resident", wobbegong: "resident",
  leopard: "resident", horn: "resident", portjackson: "resident",
  angelshark: "resident", catshark: "resident",
  /* Coastal/seasonal (14) — patrol coasts, seasonal aggregations */
  tiger: "coastal", hammerhead: "coastal", basking: "coastal",
  porbeagle: "coastal", bronze: "coastal", scalloped: "coastal",
  smooth: "coastal", bull: "coastal", sandbar: "coastal",
  salmon: "coastal", dusky: "coastal", silvertip: "coastal",
  spinner: "coastal", spinydogfish: "coastal",
  /* Migratory/wide-ranging (19) — open ocean, deep water, vast ranges */
  thresher: "migratory", whale: "migratory", goblin: "migratory",
  greatwhite: "migratory", mako: "migratory", blue: "migratory",
  silky: "migratory", oceanic: "migratory", sevengill: "migratory",
  frilled: "migratory", megamouth: "migratory", sawshark: "migratory",
  greenland: "migratory", cookiecutter: "migratory", sixgill: "migratory",
  velvetbelly: "migratory", dwarflantern: "migratory", kitefin: "migratory",
  pacificsleeper: "migratory"
};
const untagged = () => SHARKS.filter(s => !state.tagged[s.id]);
/* Migrations run once at boot — see the boot section below. */

/* ---------- Tabs (each tab remembers its scroll position) ---------- */

const tabScroll = {};
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return; /* v1.5.11: locked Archive tab is unclickable */
    const current = document.querySelector(".tab.active");
    if (current) tabScroll[current.dataset.tab] = window.scrollY;
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    $("tab-" + btn.dataset.tab).classList.add("active");
    if (btn.dataset.tab === "map") renderMap(); // v0.9.0: tracking map renders on open
    if (btn.dataset.tab === "expedition") renderExpeditionPin(); // v0.20.0: pinned shark line
    if (btn.dataset.tab in tabScroll) window.scrollTo(0, tabScroll[btn.dataset.tab]);
    /* v0.24.0: clear the Archive new-photo badge on visit. */
    if (btn.dataset.tab === "archive") {
      const badge = btn.querySelector(".tab-badge");
      if (badge) badge.classList.add("hidden");
    }
    if (btn.dataset.tab === "phone") {
      /* v0.12.0: like a real phone — the conversation opens pinned to the
         newest message. renderMessages' own scroll can't do this: it runs
         while the tab is hidden (display:none), where scrollTop has no
         effect, so the pin has to happen after the panel is visible. */
      renderMessages();
      const list = $("messagesList");
      if (list) list.scrollTop = list.scrollHeight;
      if (state.unread > 0) {
        state.unread = 0;
        saveMsgs();
        updateMsgBadge();
      }
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
/* ---------- Field guide database (v0.19.0) ----------
   Search + stacked filters. Filters narrow the notebook; they never solve
   the expedition — matching is on the shark's own data, nothing is revealed.
   Filter state is session-only. */
const guideFilters = {
  q: "",
  region: new Set(),
  depth: new Set(),
  methodOpt: new Set(),
  bait: new Set(),
  tagged: "all" // "all" | "tagged" | "untagged"
};
function baitList(s) {
  return Array.isArray(s.combo.bait) ? s.combo.bait : [s.combo.bait];
}
function methodOpts(s) {
  const m = s.methods || {};
  return [...(m.attract || []), ...(m.aggregation || [])];
}
function guideMatches(s) {
  const f = guideFilters;
  if (f.q) {
    const q = f.q.toLowerCase();
    if (!s.name.toLowerCase().includes(q) && !s.latin.toLowerCase().includes(q)) return false;
  }
  if (f.region.size && !f.region.has(s.combo.region)) return false;
  if (f.depth.size && !(s.depths || []).some(d => f.depth.has(d))) return false;
  if (f.methodOpt.size && !methodOpts(s).some(m => f.methodOpt.has(m))) return false;
  if (f.bait.size && !baitList(s).some(b => f.bait.has(b))) return false;
  if (f.tagged === "tagged" && !state.tagged[s.id]) return false;
  if (f.tagged === "untagged" && state.tagged[s.id]) return false;
  return true;
}
function activeFilterCount() {
  const f = guideFilters;
  return f.region.size + f.depth.size + f.methodOpt.size + f.bait.size +
    (f.tagged !== "all" ? 1 : 0) + (f.q ? 1 : 0);
}
function buildFilterChips() {
  const mk = (elId, items, set) => {
    const row = $(elId);
    if (!row) return;
    row.innerHTML = "";
    items.forEach(([id, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = label;
      b.setAttribute("aria-pressed", String(set.has(id)));
      b.addEventListener("click", () => {
        if (set.has(id)) set.delete(id); else set.add(id);
        renderResearch();
      });
      row.appendChild(b);
    });
  };
  mk("filterRegion", Object.entries(REGIONS).map(([id, r]) =>
    [id, r.locked ? `🔒 ${r.name}` : r.name]), guideFilters.region);
  mk("filterDepth", Object.entries(DEPTHS).map(([id, d]) => [id, d.name]), guideFilters.depth);
  const mOpts = [];
  Object.values(METHODS).forEach(m => Object.entries(m.opts).forEach(([id, label]) => {
    if (id !== "none") mOpts.push([id, label]);
  }));
  mk("filterMethod", mOpts, guideFilters.methodOpt);
  mk("filterBait", Object.entries(BAITS).map(([id, label]) => [id, label]), guideFilters.bait);
  // tagged status: single-select chips
  const tRow = $("filterTagged");
  if (tRow) {
    tRow.innerHTML = "";
    [["all", "All"], ["tagged", "Tagged ✅"], ["untagged", "Untagged"]].forEach(([id, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = label;
      b.setAttribute("aria-pressed", String(guideFilters.tagged === id));
      b.addEventListener("click", () => { guideFilters.tagged = id; renderResearch(); });
      tRow.appendChild(b);
    });
  }
}
function renderActiveChips() {
  const wrap = $("activeChips");
  if (!wrap) return;
  wrap.innerHTML = "";
  const f = guideFilters;
  const addChip = (label, clear) => {
    const c = document.createElement("span");
    c.className = "chip-active";
    c.innerHTML = `<span>${esc(label)}</span>`;
    const x = document.createElement("button");
    x.type = "button";
    x.className = "chip-remove";
    x.setAttribute("aria-label", `Remove filter: ${label}`);
    x.textContent = "×";
    x.addEventListener("click", () => { clear(); renderResearch(); });
    c.appendChild(x);
    wrap.appendChild(c);
  };
  if (f.q) addChip(`“${f.q}”`, () => { f.q = ""; const s = $("guideSearch"); if (s) s.value = ""; });
  f.region.forEach(id => addChip(REGIONS[id] ? REGIONS[id].name : id, () => f.region.delete(id)));
  f.depth.forEach(id => addChip(DEPTHS[id] ? DEPTHS[id].name : id, () => f.depth.delete(id)));
  f.methodOpt.forEach(id => {
    let label = id;
    Object.values(METHODS).forEach(m => { if (m.opts[id]) label = m.opts[id]; });
    addChip(label, () => f.methodOpt.delete(id));
  });
  f.bait.forEach(id => addChip(BAITS[id] || id, () => f.bait.delete(id)));
  if (f.tagged !== "all") addChip(f.tagged === "tagged" ? "Tagged ✅" : "Untagged",
    () => { f.tagged = "all"; });
}
function clearGuideFilters() {
  guideFilters.q = "";
  guideFilters.region.clear();
  guideFilters.depth.clear();
  guideFilters.methodOpt.clear();
  guideFilters.bait.clear();
  guideFilters.tagged = "all";
  const s = $("guideSearch");
  if (s) s.value = "";
  renderResearch();
}
/* v0.20.0: pin one shark as "currently researching". Tapping the pin on a
   pinned shark unpins it. One pin at a time — a focus, not a collection. */
function togglePin(id) {
  state.pinned = (state.pinned === id) ? null : id;
  if (state.pinned) { // v1.0.3-beta: remember the first pin to collapse the explainer later
    state.hasPinnedBefore = true;
    pinHistoryStore.save();
  }
  pinStore.save(state.pinned);
  renderResearch();
  renderExpeditionPin();
  renderPinHint(); // v0.22.0
}
/* v0.20.0: jump to the pinned shark's field-guide entry. Mira review fix -
   clears any filters hiding the shark first, so Jump never silently fails. */

/* v1.4.15-beta: highlight key research clues in bold (same font/size).
   Bolds location, diet, and depth cues — never the expedition answers. */
function highlightClues(s) {
  let text = s.research || "";
  // Take the first two sentences for the preview
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  text = sentences.slice(0, 2).join(" ").trim();
  // Bold the region name
  const regionName = REGIONS[s.combo.region] ? REGIONS[s.combo.region].name : null;
  if (regionName) {
    const re = new RegExp(`(${regionName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    text = text.replace(re, "<strong>$1</strong>");
  }
  // Bold diet keywords
  const dietWords = ["plankton", "krill", "squid", "crabs", "lobster", "fish", "seals", "rays", "urchins", "shellfish"];
  for (const w of dietWords) {
    const re = new RegExp(`\\b(${w})\\b`, "gi");
    text = text.replace(re, "<strong>$1</strong>");
  }
  return text;
}
function renderPinnedCard(list) {
  /* v1.4.0-beta: pinned card lives in its own full-width section above the
     grid, not as the first grid cell. */
  const slot = $("pinnedSlot");
  const target = slot || list;
  if (slot) slot.innerHTML = "";
  const s = SHARKS.find(x => x.id === state.pinned);
  const card = document.createElement("div");
  card.className = "pinned-card" + (s ? "" : " pinned-empty");
  if (!s) {
    card.innerHTML = state.hasPinnedBefore
      ? `<p class="latin">📌 <em>Pinned sharks appear here.</em></p>`
      : `<p class="latin">📌 <em>No shark pinned — tap 📌 on any field-guide entry to keep it here while you research.</em><br><span class="dim">Tip: pinning a shark switches on soft logbook hints — when your expedition plan is close for the shark you're researching, your notes will nudge you.</span></p>`;
  } else {
    const done = !!state.tagged[s.id];
    /* v1.4.15-beta: pinned card shows the research description with key clues
       in subtle bold — same font and size, just bold. Never the actual answers. */
    const researchPreview = highlightClues(s);
    card.innerHTML = `
      <div class="pinned-head"><span>📌 Currently researching</span>
        <button type="button" class="pin-btn unpin" data-unpin aria-label="Unpin ${s.name}">✕</button>
      </div>
      <div class="pinned-body">
        <div class="guide-sketch pinned-sketch">${SKETCH[s.id]}</div>
        <div>
          ${done ? "✅ " : ""}<strong>${s.name}</strong><br>
          <span class="latin">${s.latin}</span><br>
          <span class="latin">${REGIONS[s.combo.region] ? REGIONS[s.combo.region].name : s.combo.region} · ${s.depths.map(d => (DEPTHS[d] || {}).name || d).join(", ")}</span>
        </div>
      </div>
      <p class="pinned-research">${researchPreview}</p>`;
    card.querySelector("[data-unpin]").addEventListener("click", () => togglePin(s.id));
  }
  target.appendChild(card);
}
/* v0.22.0: pin-gated soft hints. When a shark is pinned and the planned
   expedition matches 3 of its 4 needs (region, depth, bait, method), the
   logbook offers one soft observational nudge about the odd one out.
   Wording is observational only — never "correct"/"wrong". This evolves
   the old rule that failed trips give no signal: the logbook now means
   "you're warm". Sarah remains the stronger help after repeated failures. */
const PIN_HINTS = {
  region: "Maybe we'll find them elsewhere?",
  depth: "The water doesn't feel quite right for them at this depth…",
  bait: "They didn't seem to like the food we were offering.",
  method: "They didn't seem to notice us at all — maybe a different approach?"
};

/* Pure: given a plan and a pinned shark id, return {dimension, hint} when
   exactly 3 of 4 dimensions match, else null. Testable. */
/* v0.22.0 Mira review: hints are grounded in COMPLETED expeditions, not the
   live planner. The logbook helps interpret evidence; it doesn't reveal
   answers by trial-and-error clicking.
   Distinguishes: conditions that make encounter POSSIBLE (region/depth/bait)
   from methods that improve ODDS (method/methodOpt boost only). */
function pinHintForTrip(trip, pinnedId) {
  if (!pinnedId || !trip) return null;
  const s = SHARKS.find(x => x.id === pinnedId);
  if (!s || state.tagged[pinnedId]) return null;
  // Did this trip's conditions make the pinned shark's appearance possible?
  const baitOk = Array.isArray(s.combo.bait) ? s.combo.bait.includes(trip.bait) : s.combo.bait === trip.bait;
  const possible = s.combo.region === trip.region &&
    (s.depths || []).includes(trip.depth) && baitOk;
  // Did the player encounter (or tag) the pinned shark this trip?
  const encountered = (trip.encounters || []).some(e => e.speciesId === pinnedId);
  if (possible && !encountered) {
    // Conditions were right, shark just wasn't there — "you're warm"
    return { kind: "warm", hint: "The water felt right for " + s.name.toLowerCase() + " today. Sometimes they're just not there." };
  }
  if (!possible && !encountered) {
    // Which dimension was off? Observational only.
    const off = [];
    if (s.combo.region !== trip.region) off.push("region");
    if (!(s.depths || []).includes(trip.depth)) off.push("depth");
    if (!baitOk) off.push("bait");
    if (off.length === 1) {
      return { kind: "hint", dimension: off[0], hint: PIN_HINTS[off[0]] };
    }
  }
  return null;
}

/* v0.22.0 Mira review: live planner hints removed. Hints now appear in the
   logbook after completed expeditions (pinHintForTrip), preserving the
   research puzzle. This function is kept as a no-op for compatibility. */
function renderPinHint() {
  const el = $("pinHint");
  if (el) { el.classList.add("hidden"); el.innerHTML = ""; }
}

/* v0.20.0: show the pinned shark on the Expedition tab — a research focus
   to plan around. Never auto-fills the planner; the sea decides. */
/* v1.4.15-beta: diet phrases for pinned hints — natural language, not answers.
   "They eat plankton" lets the player infer the bait; "Plankton bloom — no bait"
   would hand it over. */
const DIET_PHRASE = {
  "plankton": "they eat plankton",
  "crustaceans": "they eat crabs and lobster",
  "squid": "they hunt squid",
  "schooling-fish": "they chase schooling fish",
  "tuna": "they hunt large oily fish",
  "ray": "they eat rays",
  "urchins": "they eat urchins and shellfish"
};
function renderExpeditionPin() {
  const el = $("expeditionPin");
  if (!el) return;
  const s = SHARKS.find(x => x.id === state.pinned);
  if (!s) { el.classList.add("hidden"); el.innerHTML = ""; return; }
  el.classList.remove("hidden");
  const regionName = REGIONS[s.combo.region] ? REGIONS[s.combo.region].name : s.combo.region;
  /* v0.20.0: Mira review fix — filter feeders (whale, basking) store bait as a
     string, not an array. baitList() normalizes both. */
  /* v1.4.15-beta: show diet as a natural sentence, not the bait answer. */
  const dietKeys = baitList(s);
  const dietText = dietKeys.map(k => DIET_PHRASE[k] || `they eat ${k}`).join("; ");
  el.innerHTML = `📌 Currently researching: <strong>${s.name}</strong>
    <span class="latin">${regionName} · ${s.depths.map(d => (DEPTHS[d] || {}).name || d).join(", ")} · ${dietText}</span>
    <br><span class="dim" style="font-size:12px">📓 Pin hints on — your logbook notes nudge you when the plan is close.</span>`;
}
/* v1.4.0-beta: rising z-index so a later-opened overlay always floats
   above earlier ones, regardless of DOM order. */
let guideOverlayZ = 30;
/* v1.5.4-beta: shared collapse for guide rows — used by the close button,
   Escape key, and outside-click dismissal. Returns focus to the row header. */
function collapseGuideRow(row) {
  if (!row || !row.classList.contains("open")) return;
  const body = row.querySelector(".guide-row-body");
  const head = row.querySelector(".guide-row-head");
  if (body) body.classList.add("hidden");
  if (head) {
    head.setAttribute("aria-expanded", "false");
    head.focus();
  }
  row.classList.remove("open");
  row.style.zIndex = "";
}
/* v1.5.4-beta: Escape closes the topmost open guide popup. On small screens a
   tap outside the open popup also dismisses it — the fixed modal can cover
   its own row header, leaving no other way to close. */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const openRows = [...document.querySelectorAll(".guide-row.open")];
  if (!openRows.length) return;
  openRows.sort((a, b) => (parseInt(b.style.zIndex || "0", 10) || 0) - (parseInt(a.style.zIndex || "0", 10) || 0));
  collapseGuideRow(openRows[0]);
});
document.addEventListener("click", (e) => {
  if (!window.matchMedia("(max-width: 768px)").matches) return;
  const openRow = document.querySelector(".guide-row.open");
  if (!openRow || openRow.contains(e.target)) return;
  collapseGuideRow(openRow);
});
function renderResearch() {
  const list = $("researchList");
  list.innerHTML = "";
  /* v0.20.0: the pinned shark — "currently researching". A focus card at the
     top of the field guide; pinning is a focus, never a filter. */
  renderPinnedCard(list);
  /* v0.13.0: untagged sharks first — the ones you're still hunting.
     Tagged ones settle to the bottom, out of the way. */
  const ordered = [...SHARKS]
    .filter(guideMatches)
    .sort((a, b) => ((state.tagged[a.id] ? 1 : 0) - (state.tagged[b.id] ? 1 : 0)));
  // v0.19.0: filter UI state
  buildFilterChips();
  renderActiveChips();
  const n = activeFilterCount();
  const fc = $("filterCount");
  if (fc) {
    fc.textContent = String(n);
    fc.classList.toggle("hidden", n === 0);
  }
  const gc = $("guideCount");
  if (gc) gc.textContent = `Showing ${ordered.length} of ${SHARKS.length} sharks`;
  const clr = $("guideClear");
  if (clr) clr.classList.toggle("hidden", n === 0);
  /* v0.20.0: Mira review fix — the pinned card survives empty-results states;
     it is a research focus, not a filter result. */
  if (!ordered.length) {
    const p = document.createElement("p");
    p.className = "latin";
    p.style.cssText = "text-align:center; padding: 24px 12px;";
    p.textContent = "No sharks match those filters. Try clearing something — the ocean is bigger than it looks.";
    list.appendChild(p);
    return;
  }
  ordered.forEach(s => {
    const done = !!state.tagged[s.id];
    const regionLocked = REGIONS[s.combo.region] && REGIONS[s.combo.region].locked;
    const isPinned = state.pinned === s.id;
    const row = document.createElement("div");
    row.className = "guide-row";
    row.setAttribute("data-entry", s.id);
    /* v1.4.15-beta: IUCN pill sits beside the pin (not inside the head button),
       color-coded by threat level, freeing space for more of the Latin name. */
    const iucnAbbr = IUCN_ABBR[s.status] || s.status;
    row.innerHTML = `
      <div class="guide-row-top">
        <button type="button" class="guide-row-head" aria-expanded="false">
          <span class="guide-row-name">${done ? "✅ " : ""}${s.name}</span>
          <span class="latin">${s.latin}</span>
        </button>
        <span class="status-pill iucn-${iucnAbbr}" title="IUCN Red List: ${s.status}">${iucnAbbr}</span>
        <button type="button" class="pin-btn${isPinned ? " pinned-on" : ""}" data-pin="${s.id}"
          aria-label="${isPinned ? "Unpin" : "Pin"} ${s.name} as currently researching"
          aria-pressed="${isPinned}">📌</button>
      </div>
      <div class="guide-row-body hidden">
        <button type="button" class="guide-close" aria-label="Close ${s.name} details">\u2715</button>
        <div class="guide-sketch">${SKETCH[s.id]}<p class="sketch-cap">field sketch — ${s.sketchCap}</p></div>
        <p class="iucn-full">IUCN Red List: <strong>${s.status}</strong></p>
        ${s.research.split("\n\n").map(p => `<p class="research-text">${p}</p>`).join("")}
        ${done
          ? `<p class="hook">Tagged ${idLine(state.tagged[s.id])}${state.tagged[s.id].name ? ` as <strong>${esc(state.tagged[s.id].name)}</strong>` : ""} 🎉</p>`
          : regionLocked
            ? `<p class="latin">🔒 Our vessel hasn't surveyed these waters yet — tag the six original species (nurse, thresher, whale, goblin, tiger, sandtiger) to unlock them.</p>`
            : ``}
      </div>
    `;
    const head = row.querySelector(".guide-row-head");
    const body = row.querySelector(".guide-row-body");
    const closeBtn = body.querySelector(".guide-close");
    if (closeBtn) closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      collapseGuideRow(row);
    });
    head.addEventListener("click", () => {
      const isHidden = body.classList.toggle("hidden");
      head.setAttribute("aria-expanded", String(!isHidden));
      row.classList.toggle("open", !isHidden);
      /* v1.4.0-beta: overlay floats above neighbors; rising z-index keeps
         the most recently opened entry on top. */
      if (!isHidden) row.style.zIndex = String(++guideOverlayZ);
      else row.style.zIndex = "";
    });
    const pinBtn = row.querySelector("[data-pin]");
    if (pinBtn) pinBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePin(s.id);
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
      const unlockText = id === "galapagos" || id === "south-africa"
        ? `🔒 ${v.name} — tag the six original species to unlock`
        : id === "east-australia"
          ? `🔒 ${v.name} — unlocks at 15 tags`
          : id === "california"
            ? `🔒 ${v.name} — unlocks at 25 tags`
            : id === "arctic"
              ? `🔒 ${v.name} — unlocks at 35 tags`
              : `🔒 ${v.name} — locked`;
      o.textContent = unlockText;
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
   - Tagging the full roster wins the game (Master Shark Tagger).
     v0.11.0: the win keeps moving up with the roster — always SHARKS.length. */
function applyRegions() {
  /* v0.21.0 Mira review: 15/25/35 milestones are genuinely count-based,
     independent of the original-six unlock. */
  const n = Object.keys(state.tagged).length;
  if (state.regionsUnlocked) {
    for (const id of ["galapagos", "south-africa"]) REGIONS[id].locked = false;
  }
  if (n >= 15) REGIONS["east-australia"].locked = false;
  if (n >= 25) REGIONS["california"].locked = false;
  if (n >= 35) REGIONS["arctic"].locked = false;
}

/* v0.7.0 migration: v0.6.0 winners had tyi-won=1 at 6/6, but the win is
   now the full roster. They keep their tags and earn the regions; the win
   resets until every shark is tagged.
   v0.11.0: same rule keeps applying as the roster grows — a win at 12/12
   resets when new sharks arrive, until 15/15, 18/18, and so on. */
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
   depth, bait. v0.8.0 adds scent in the water as its own row.
   Your research is your targeting: the right combination
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
    bait: $("baitSelect").value,
    method: $("methodSelect").value,
    methodOpt: $("methodOptSelect").value
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
   day breathes. Tune PACE to adjust globally.
   v0.20.0: quick-pace option — the player can shorten the beats. */
let PACE = 1.5;
const QUICK_PACE = 0.35;
function setPace(quick) {
  PACE = quick ? QUICK_PACE : 1.5;
  try { localStorage.setItem("tyi-pace", quick ? "quick" : "slow"); } catch {}
  const box = $("quickPace");
  if (box) box.checked = !!quick;
}
const wait = (ms) => new Promise(r => setTimeout(r, ms * PACE));

/* v0.13.0: persistent depth scenery — the scene was gradient + rays and
   felt empty between sightings. Simple SVG silhouettes, one per depth. */
const SCENERY = {
  surface: `<svg viewBox="0 0 400 60" preserveAspectRatio="xMidYMax slice">
    <g fill="#2f88b5" opacity="0.45">
      <path d="M40,30 q6,-5 12,0 q-6,5 -12,0 Z M46,30 l-8,-4 l-8,4 l8,4 Z"/>
      <path d="M330,20 q6,-5 12,0 q-6,5 -12,0 Z M336,20 l-8,-4 l-8,4 l8,4 Z"/>
      <path d="M200,40 q5,-4 10,0 q-5,4 -10,0 Z M205,40 l-7,-3 l-7,3 l7,3 Z"/>
    </g></svg>`,
  reef: `<svg viewBox="0 0 400 70" preserveAspectRatio="xMidYMax slice">
    <g fill="#175e75" opacity="0.55">
      <ellipse cx="60" cy="66" rx="46" ry="26"/>
      <ellipse cx="180" cy="68" rx="60" ry="30"/>
      <ellipse cx="330" cy="66" rx="52" ry="28"/>
    </g>
    <g stroke="#175e75" stroke-width="5" stroke-linecap="round" opacity="0.5" fill="none">
      <path d="M60,48 q-4,-18 -14,-26 M60,48 q2,-20 12,-30 M60,48 q10,-12 22,-16"/>
      <path d="M180,44 q-6,-22 -18,-32 M180,44 q0,-24 8,-36 M180,44 q12,-14 26,-18"/>
      <path d="M330,46 q-4,-16 -12,-24 M330,46 q6,-18 16,-26"/>
    </g>
    <g stroke="#0f4a5e" stroke-width="3" opacity="0.45" fill="none">
      <path d="M120,66 q4,-20 18,-28 q14,8 18,28"/>
      <path d="M260,66 q4,-18 16,-26 q12,8 16,26"/>
    </g></svg>`,
  twilight: `<svg viewBox="0 0 400 70" preserveAspectRatio="xMidYMax slice">
    <path d="M0,70 L0,30 L90,44 L200,58 L400,64 L400,70 Z" fill="#0d2c48" opacity="0.65"/>
    <path d="M0,70 L0,52 L140,60 L400,70 Z" fill="#081f36" opacity="0.7"/>
    <g fill="#0d2c48" opacity="0.5">
      <path d="M300,52 l10,-14 l10,14 Z"/>
      <path d="M340,56 l8,-11 l8,11 Z"/>
    </g></svg>`,
  deep: `<svg viewBox="0 0 400 70" preserveAspectRatio="xMidYMax slice">
    <path d="M0,70 L0,52 Q120,44 220,52 Q320,58 400,50 L400,70 Z" fill="#05090e" opacity="0.8"/>
    <ellipse cx="120" cy="56" rx="26" ry="8" fill="#0a1219" opacity="0.8"/>
    <ellipse cx="300" cy="58" rx="34" ry="9" fill="#0a1219" opacity="0.8"/>
  </svg>`
};
/* depth key used by the planner -> scenery key. */
const SCENERY_FOR = { surface: "surface", reef: "reef", twilight: "twilight", deep: "deep" };
function renderScenery(depth) {
  const el = $("diveScenery");
  if (!el) return;
  el.innerHTML = SCENERY[SCENERY_FOR[depth] || "surface"] || "";
  el.querySelectorAll(".snow").forEach(n => n.remove());
  /* Marine snow in the deep: slow-falling specks. */
  if (depth === "deep") {
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.className = "snow";
      s.style.left = (Math.random() * 100) + "%";
      s.style.animationDuration = (7 + Math.random() * 9).toFixed(1) + "s";
      s.style.animationDelay = (-Math.random() * 12).toFixed(1) + "s";
      s.style.width = s.style.height = (1 + Math.random() * 2.5).toFixed(1) + "px";
      el.appendChild(s);
    }
  }
}

/* v0.13.0: background fish drift through between sightings so the water
   never feels empty. Small, dim, clearly behind the action. */
let ambientTimer = null;
function startAmbientLife(depth) {
  stopAmbientLife();
  const creatures = depth === "deep" ? ["fish"] : ["fish", "fish", "turtle", "dolphin"];
  ambientTimer = setInterval(() => {
    if (document.hidden) return;
    if (Math.random() < 0.55) spawnCreature(pick(creatures), true);
  }, 6000);
}
function stopAmbientLife() {
  if (ambientTimer) { clearInterval(ambientTimer); ambientTimer = null; }
}

/* Ambient sea life + quiet easter-egg flavour during the dive. */
function spawnCreature(type, background) {
  const scene = $("diveScene");
  const art = CREATURE_ART[type];
  if (!art) return;
  const el = document.createElement("div");
  el.className = "ambient" + (background ? " bg-fish" : "");
  el.innerHTML = art;
  el.style.top = (8 + Math.random() * 55) + "%";
  el.style.animationDuration = (9 + Math.random() * 8).toFixed(1) + "s";
  el.style.height = background
    ? Math.round(10 + Math.random() * 8) + "px"
    : Math.round(24 + Math.random() * 26) + "px";
  /* v0.26.1: ambient creatures swim both ways — 50/50 per spawn. The art
     faces left by default, so leftward swimmers need no flip; rightward
     swimmers are mirrored to face their direction of travel. (Replaces the
     old 40%-flip, which left most creatures swimming backwards.) */
  if (Math.random() < 0.5) {
    el.style.transform = "scaleX(-1)"; // face right, drift left-to-right
  } else {
    el.classList.add("swim-left"); // face left, drift right-to-left
  }
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
    /* v0.13.0: dealt from the trip deck — each sighting once per trip.
       v0.13.0 review fix: the deck does NOT refill. A long trip simply
       runs out of new sightings instead of repeating them. */
    if (tripDecks && !tripDecks.sightings.deck.length) return;
    const s = tripDecks ? deal(tripDecks.sightings.deck, tripDecks.sightings.pool) : pick(options);
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
   player hasn't already seen today, then familiar faces for watching.
   v0.8.0: the scent lure BOOSTS — a species the lure is right for gets
   triple weight. A wrong lure or no lure changes nothing (never a gate).
   v0.9.0: same boost-only semantics, now keyed on the Method dimension —
   a species boosts only on (method, sub-option) pairs that are real for
   that animal. */
function methodWeight(plan, species) {
  const m = (plan && plan.method) || "attract";
  const opt = (plan && plan.methodOpt) || "none";
  return ((species.methods || {})[m] || []).includes(opt) ? 3 : 1;
}
function pickEncounter(appeared, shown, plan) {
  const fresh = appeared.filter(s => !shown.has(s.id));
  if (!fresh.length) return null;
  const newToPlayer = fresh.filter(s => !state.tagged[s.id]);
  const pool = newToPlayer.length ? newToPlayer : fresh;
  let total = 0;
  const weights = pool.map(s => { const w = methodWeight(plan, s); total += w; return w; });
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

/* One encounter: the shark appears, and the player chooses to WATCH
   (a sighting, logged) or TAG (if untagged — opportunistic tagging is
   always allowed). Either way the day goes on. */
function doEncounter(species, plan) {
  return new Promise(resolve => {
    /* v1.5.3-beta: reunion system — one tagged shark per species. After tagging,
       encountering the species rolls: is it YOUR shark (reunion) or a different
       untagged animal? Odds by ecology tier (game-balance, not science):
       resident 50%, coastal 25%, migratory 10%. */
    const existingRec = state.tagged[species.id];
    let isReunion = false;
    let isDifferentShark = false;
    if (existingRec) {
      const tier = (typeof ECOLOGY_TIER !== "undefined" && ECOLOGY_TIER[species.id]) || "coastal";
      const odds = (typeof REUNION_ODDS !== "undefined" && REUNION_ODDS[tier]) || 0.25;
      isReunion = Math.random() < odds;
      isDifferentShark = !isReunion;
    }
    const rec = isReunion ? existingRec : null;
    const sharkEl = $("diveShark");
    /* v0.26.0: tap-to-reveal encounter. Phase 1 shows the steel-blue
       silhouette (mystery — the species is not named yet). Tapping
       crossfades to the full-colour illustration and reveals the name.
       The illustration is preloaded so the reveal is instant. */
    preloadSharkArt(species.id);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sharkEl.innerHTML =
      `<div class="shark-silhouette" role="button" tabindex="0" ` +
      `aria-label="Something is out there — tap to reveal">` +
      sharkArtImg(species.id, "silhouette", "Mysterious shark silhouette") +
      `<div class="tap-hint">👆 Tap to reveal</div></div>`;
    sharkEl.classList.remove("hidden");
    logLine(`🦈 <span class="found">Something's out there...</span>`, "found");
    const actions = $("diveActions");
    actions.classList.add("hidden");
    actions.innerHTML = "";

    /* Phase 2: the reveal. Swaps silhouette for illustration, reveals
       the species name (with v0.17.1 already-in-book info), then shows
       the Watch/Tag buttons. */
    const reveal = () => {
      const sil = sharkEl.querySelector(".shark-silhouette");
      if (!sil || sil.dataset.revealed) return;
      sil.dataset.revealed = "true";
      /* v0.17.1: the moment a shark appears, say whether it's already in the
         book — no squinting at the small print under the buttons. */
      /* v1.5.3-beta: reunion vs different-shark presentation. */
      let already;
      if (!existingRec) {
        already = ` — new to your book!`;
      } else if (isReunion) {
        const rname = rec.name ? `\u201c${esc(rec.name)}\u201d` : rec.researchId;
        already = ` — wait... that tag looks familiar. It's ${rname}! 🥹`;
      } else {
        const oname = existingRec.name ? `\u201c${esc(existingRec.name)}\u201d` : "yours";
        already = ` — another ${species.name}! This one has no matching tag — not ${oname}.`;
      }
      const showIllustration = () => {
        sharkEl.innerHTML =
          `<div class="shark-reveal">` +
          sharkArtImg(species.id, "illustration", species.name) +
          `</div>`;
        logLine(`🦈 <span class="found">Shark! A ${species.name}${already}</span>`, "found");
        showEncounterActions();
      };
      if (reducedMotion) {
        showIllustration();
      } else {
        sil.classList.add("revealing");
        setTimeout(showIllustration, 350);
      }
    };

    const silEl = sharkEl.querySelector(".shark-silhouette");
    silEl.addEventListener("click", reveal);
    silEl.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal(); }
    });

    const showEncounterActions = () => {
      actions.classList.remove("hidden");
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
      logTripEncounter(species, "watched");
      /* v1.3.0-beta: occasional natural-history note on tagged sharks.
         ~35% chance, stored on the record, shown in the collection detail.
         Pure flavor — not a checklist, no achievements attached. */
      let noteLine = "";
      if (rec && Math.random() < 0.35) {
        const note = pickWatchNote(species);
        rec.notes = rec.notes || [];
        if (!rec.notes.includes(note)) {
          rec.notes.push(note);
          store.save(state.tagged);
          noteLine = ` 📓 <em>Noted: ${esc(note)}.</em>`;
        }
      }
      logLine(`👁️ You watch the ${species.name} ${entry.doing}. A good sighting, logged.${noteLine}`);
      finish();
    });
    actions.appendChild(watchBtn);
    /* v1.5.3-beta: three encounter states —
       !existingRec: first tag (Tag button)
       isReunion: it's YOUR shark (Follow + Log re-sighting)
       isDifferentShark: another wild shark (Species observation only) */
    if (!existingRec) {
      const tagBtn = document.createElement("button");
      tagBtn.className = "primary-button";
      tagBtn.type = "button";
      tagBtn.textContent = `🏷️ Tag the ${species.name}`;
      tagBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        /* v0.17.1: the release buttons resolve the encounter directly —
           no second keep-diving/head-back prompt after the health check. */
        openTagging(species, (result) => {
          actions.classList.add("hidden");
          actions.innerHTML = "";
          /* v1.4.0-beta: result is false (keep diving), true (head back),
             or {tagAlong: speciesId} (tag along — ends expedition). */
          if (result && typeof result === "object" && result.tagAlong) {
            resolve({ tagAlong: result.tagAlong });
          } else {
            resolve(result === true);
          }
        });
      });
      actions.appendChild(tagBtn);
    } else if (isReunion) {
      /* v1.5.3-beta: REUNION — it's YOUR shark! Log re-sighting and Follow
         for this actual individual. One-time Sarah reaction per species. */
      maybeReunionReaction(species, rec);
      /* v1.4.0-beta Mira review (blocker 2): follow option for already-tagged
         species — unlocks remaining secret facts without retagging. Ends the
         expedition (you're spending the rest of the trip following). */
      const followBtn = document.createElement("button");
      followBtn.className = "primary-button";
      followBtn.type = "button";
      const _followRec = state.tagged[species.id];
      const _followName = (_followRec && _followRec.name) || species.name;
      followBtn.innerHTML = `🧭 Follow ${esc(_followName)}<br><small class="dim">ends this expedition — no more shark encounters today</small>`;
      followBtn.setAttribute("aria-label", `Follow ${_followName} for the rest of this trip (ends expedition)`);
      followBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        /* v1.4.0-beta Mira review (blocker): the already-tagged path never
           calls openTagging(), so state.encounterDone is null. Pass
           doEncounter's local resolver directly — one-shot guard against
           double taps. */
        let _followResolved = false;
        doFollowTagged(species.id, (result) => {
          if (!_followResolved) {
            _followResolved = true;
            resolve(result);
          }
        });
      });
      /* v1.5.8-beta: "Follow" goes first, "Just watch" second. */
      actions.insertBefore(followBtn, watchBtn);
      /* v0.8.0: it's one of yours — log the re-sighting. */
      const resightBtn = document.createElement("button");
      resightBtn.className = "secondary-button";
      resightBtn.type = "button";
      resightBtn.textContent = "📝 Log re-sighting";
      resightBtn.addEventListener("click", () => {
        const entry = recordResighting(species, plan);
        logTripEncounter(species, "resighted");
        logLine(`📝 Re-sighting logged — ${species.name} off ${esc(entry.location)}. ${esc(entry.note)}`);
        pushThread(resightThread(species, rec));
        state.resightedThisTrip = true;
        finish();
      });
      actions.appendChild(resightBtn);
    } else {
      /* v1.5.3-beta: DIFFERENT SHARK — another wild ${species.name}, not yours.
         Just watch, or observe the species (may unlock a secret fact).
         NO tag, NO re-sighting, NO follow — never touches the tagged record. */
      const observeBtn = document.createElement("button");
      observeBtn.className = "secondary-button";
      observeBtn.type = "button";
      observeBtn.innerHTML = `🔬 Observe species<br><small class="dim">study this ${esc(species.name)} — may reveal a secret fact</small>`;
      observeBtn.setAttribute("aria-label", `Observe this ${species.name} (species study, not your tagged shark)`);
      observeBtn.addEventListener("click", () => {
        const fact = unlockSecretFact(species.id);
        if (fact) {
          logLine(`🔬 <strong>Species insight:</strong> ${esc(fact)}`);
        } else {
          logLine(`🔬 <em>You watch carefully, but learn nothing new about the ${esc(species.name)} today.</em>`);
        }
        logTripEncounter(species, "observed");
        finish();
      });
      actions.appendChild(observeBtn);
    }
    }; // end showEncounterActions
  });
}

/* v0.7.0: a trip is a full day out — descent, wildlife, then 2–4
   encounter slots paced through the day, then day's end. The shark is
   a moment in the day, never the end of it. */
/* v1.4.2: porthole — the observation window is always present.
   v1.4.7: when no expedition is active it shows the ocean surface from a
   boat window — rolling wave crests at three depths, spray hitting the
   glass. Called on init and when an expedition ends. */
function showPorthole() {
  const scene = $("diveScene");
  scene.className = "dive-scene porthole";
  $("diveScenery").innerHTML = "";
  /* v1.5.5: clear any lingering ambient creature shadows from the expedition —
     spawnCreature() appends them to diveScene (not diveScenery), so they
     survived the trip and haunted the idle porthole waves. */
  scene.querySelectorAll(".ambient").forEach(el => el.remove());
  $("diveShark").classList.add("hidden");
  const log = $("diveLog");
  if (log) log.innerHTML = '<p class="dive-idle">\u{1F30A} The ocean waits. Plan your expedition above, then launch.</p>';
  const actions = $("diveActions");
  if (actions) { actions.classList.add("hidden"); actions.innerHTML = ""; }
  $("diveView").classList.remove("hidden");
}

async function runExpedition(plan) {
  state.currentPlan = plan;
  state.pendingWin = false;
  state.taggedThisTrip = false;
  state.resightedThisTrip = false;
  state.followedThisTrip = false;
  /* v1.4.19-beta: Big Day — queue routine species celebrations during the
     trip; flush one conversation (single or Big Day) at trip end. */
  state.pendingCelebrations = [];
  /* v0.18.0: feed achievement stats — regions visited, baits used. */
  if (plan.region && !state.stats.regionsVisited.includes(plan.region)) {
    state.stats.regionsVisited.push(plan.region);
  }
  if (plan.bait && !state.stats.baitsUsed.includes(plan.bait)) {
    state.stats.baitsUsed.push(plan.bait);
  }
  if (plan.methodOpt && plan.methodOpt !== "none" && !state.stats.methodsUsed.includes(plan.methodOpt)) {
    state.stats.methodsUsed.push(plan.methodOpt);
  }
  saveStats();
  tripDecks = { waiting: shuffled(WAITING_LINES), doing: shuffled(SIGHTING_DOINES), sightings: buildSightingDeck(plan.depth, plan.region) };
  /* v0.8.0: open a fresh logbook page for this trip. */
  tripLog = {
    ts: Date.now(),
    date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
    region: plan.region,
    depth: plan.depth,
    bait: plan.bait,
    /* v0.20.0 Mira review fix: record the actual method ("" when unpicked) —
       the logbook renders "No method chosen"; "attract" was a misrecord. */
    method: plan.method || "",
    methodOpt: plan.methodOpt || "none",
    /* v0.22.0: fieldwork conditions — weather/sea state for the logbook. */
    conditions: pick(SEA_CONDITIONS),
    encounters: []
  };
  $("launchBtn").disabled = true;
  $("diveView").classList.remove("hidden");
  $("diveActions").classList.add("hidden");
  $("diveActions").innerHTML = "";
  $("diveLog").innerHTML = "";
  $("diveShark").classList.add("hidden");

  const scene = $("diveScene");
  scene.className = "dive-scene " + DEPTHS[plan.depth].scene;
  renderScenery(plan.depth);
  startAmbientLife(plan.depth);
  const deep = plan.depth === "twilight" || plan.depth === "deep";

  const baitText = plan.bait === "plankton"
    ? "No bait — scanning the water for a plankton bloom…"
    : `Bait deployed: ${BAITS[plan.bait]}.`;

  logLine(`🛥️ <strong>Expedition begun</strong> — the research vessel leaves the harbor.`);
  await wait(1700);
  logLine(`🌤️ ${tripLog.conditions}`);
  await wait(1700);
  logLine(`🪝 ${baitText}`);
  await wait(1700);
  /* v0.9.0: the method in the water, if any. Neutral wording — no promises. */
  const methodText = (!plan.method || (plan.method === "attract" && (!plan.methodOpt || plan.methodOpt === "none")))
    ? "No attractant in the water — just the bait doing the talking."
    : plan.method === "aggregation"
      ? (plan.methodOpt === "network"
        ? "Tapping the local sightings network — fishermen, divers, and sailors phoning in every fin they see."
        : `Running a ${METHODS.aggregation.opts[plan.methodOpt].toLowerCase()} to find the feeding aggregation.`)
      : `${METHODS.attract.opts[plan.methodOpt]} in the water.`;
  logLine(`🌊 ${methodText}`);
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
      /* v1.4.15-beta: time progresses across the trip — morning, afternoon, evening */
      const timeBeats = [
        `⏳ The morning wears on…`,
        `⏳ The afternoon stretches out…`,
        `⏳ Evening approaches…`
      ];
      logLine(deep
        ? `⏳ The hours slip by. The deep does not hurry, so neither do you.`
        : (timeBeats[i - 1] || timeBeats[timeBeats.length - 1]));
      await wait(2000);
    }
    await showSighting(plan.depth);
    await wait(1900);
    const s = pickEncounter(appeared, shown, plan);
    if (s) {
      shown.add(s.id);
      sawShark = true;
      const encResult = await doEncounter(s, plan);
      await wait(1200);
      /* v1.4.0-beta: tag-along ends the expedition. Stash the species so
         closeDive can focus the map AFTER trip completion. */
      if (encResult && typeof encResult === "object" && encResult.tagAlong) {
        endedEarly = true;
        state.pendingTagAlong = encResult.tagAlong;
        break;
      }
      if (encResult === true) { endedEarly = true; break; }
    } else {
      logLine(`👀 ${deal(tripDecks.waiting, WAITING_LINES)}`);
      await wait(1800);
    }
  }

  // Day's end — the trip closes naturally, or early if the player chose to head back.
  stopAmbientLife();
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
    await wait(1200);
    /* v0.22.0: failed trips feel like fieldwork — warm, never punishing.
       v0.22.0 Mira review: persist the note so it survives in the logbook. */
    /* v1.2.0-beta: 1-2 field observations per failed trip — a day on the
       water always teaches something. Never a right/wrong signal. */
    const fieldNotes = [pickFieldNote(plan.region, plan)];
    if (Math.random() < 0.5) {
      const second = pickFieldNote(plan.region, plan);
      if (second !== fieldNotes[0]) fieldNotes.push(second);
    }
    fieldNotes.forEach(fn => logLine(`📓 <em>${fn}</em>`));
    if (tripLog) tripLog.fieldNote = fieldNotes.join(" ");
  } else {
    state.failures = 0;
  }
  /* v0.18.0: expedition count feeds the "Sea Legs" achievement. */
  state.stats.expeditions = (state.stats.expeditions || 0) + 1;
  saveStats();
  checkAchievements();
  advanceBruceChain(); // v0.23.0: slow-burn easter egg

  /* v0.8.0: close the logbook page for this trip.
     v0.22.0 Mira review: attach pin hint grounded in this completed expedition. */
  if (tripLog) {
    if (state.pinned) {
      const hint = pinHintForTrip(tripLog, state.pinned);
      if (hint) tripLog.pinHint = hint.hint;
    }
    state.logbook.unshift(tripLog);
    logStore.save(state.logbook);
    tripLog = null;
    renderLogbook();
  }

  const actions = $("diveActions");
  actions.classList.remove("hidden");
  actions.innerHTML = "";
  /* v0.13.0: the actual return-to-ship. One button, one job. */
  const closeDive = () => {
    actions.classList.add("hidden");
    actions.innerHTML = "";
    showPorthole();
    $("launchBtn").disabled = false;
    renderAll();
    /* v1.4.0-beta: tag-along — after the trip fully completes (log, achievements,
       cleanup all done exactly once), navigate to the map and focus the shark. */
    const tagAlongSid = state.pendingTagAlong || null;
    state.pendingTagAlong = null;
    const factInfo = state.pendingTagAlongFact;
    state.pendingTagAlongFact = null;
    /* v1.4.19-beta: Big Day — flush queued routine celebrations as one
       Phone thread (single or Big Day) before win/afterExpedition branching. */
    flushPendingCelebrations();
    if (state.pendingWin) {
      state.pendingWin = false;
      /* v1.4.0-beta Mira review (win-path edge case): the 50th tag + tag-along
         must not stack the map/fact overlay on the win ceremony. Defer until
         the finale is acknowledged (handled in winStep beat 4). */
      if (tagAlongSid) {
        state.deferredTagAlong = { speciesId: tagAlongSid, factInfo: factInfo };
      }
      doWin();
    } else {
      afterExpedition(plan);
      if (tagAlongSid) {
        goTab("map");
        setTimeout(() => { try { ensureMapFocusedOn(tagAlongSid); } catch {} }, 200);
        /* v1.4.0-beta Mira review (important): show the unlocked fact in a
           readable overlay with learned X/3 progression — at quick pace the
           dive-log line may never be read before auto-navigation. */
        if (factInfo) {
          setTimeout(() => showTagAlongFact(factInfo), 600);
        }
      }
    }
  };
  /* v0.13.0: the player already said "head back" once — don't ask again.
     Give the closing lines a beat to land, then close on their own. */
  if (endedEarly) {
    await wait(2200);
    closeDive();
    return;
  }
  const backBtn = document.createElement("button");
  backBtn.className = "secondary-button";
  backBtn.type = "button";
  backBtn.textContent = "⛵ Return to ship";
  backBtn.addEventListener("click", closeDive);
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

/* ---------- Re-sightings: your tagged sharks, seen again ----------
   v0.8.0: a tagged shark can reappear on a later dive in the right
   waters. Logging the re-sighting adds a field entry to the shark's
   collection card and extends its tracking story — warm, not a
   progression track. */
const RESIGHT_NOTES = [
  "Looking healthy and unhurried.",
  "A fresh scar on the dorsal fin — a story there.",
  "A little bigger than at tagging, if the eye can be trusted.",
  "Cruising with a companion this time.",
  "Same calm circuit as ever — this one knows these waters.",
  "Bold as brass, came in close to look at the boat.",
  "Feeding well; good body condition.",
  "The tag is still seated perfectly. Good work, past us."
];

function recordResighting(species, plan) {
  const t = state.tagged[species.id];
  const entry = {
    date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
    location: REGIONS[plan.region].name,
    note: pick(RESIGHT_NOTES),
    ts: Date.now()
  };
  t.resightings = t.resightings || [];
  t.resightings.push(entry);
  /* The tracking story grows: a new ping on the map. v0.9.0: the hop
     distance and ping interval come from the species' real envelope,
     not generic ranges — a re-sighted epaulette moves metres, a mako
     moves hundreds of kilometres. */
  if (t.track && t.track.points.length) {
    const env = TRACK_ENVELOPES[species.id] || TRACK_ENVELOPES.nurse;
    const last = t.track.points[t.track.points.length - 1];
    const day = last.day + env.dayStep[0] + Math.floor(Math.random() * (env.dayStep[1] - env.dayStep[0] + 1));
    /* v0.21.0 Mira review: compute real distance from coordinates, not random hop. */
    const anchorLabel = (typeof TRACK_ENVELOPES !== "undefined" && TRACK_ENVELOPES[species.id] && TRACK_ENVELOPES[species.id].tagAnchor) || entry.location;
    const lastCoord = MAP_COORDS[last.label];
    const newCoord = MAP_COORDS[anchorLabel];
    let km;
    if (lastCoord && newCoord && typeof haversineKm === "function") {
      km = Math.round(haversineKm(lastCoord, newCoord) * 10) / 10;
    } else {
      km = Math.round((env.hop[0] + Math.random() * (env.hop[1] - env.hop[0])) * 10) / 10;
    }
    t.track.points.push({ label: anchorLabel, day, km, resighting: true });
    t.track.days = day;
    t.track.totalKm = Math.round((t.track.totalKm + km) * 10) / 10;
  }
  store.save(state.tagged);
  /* v0.18.0: re-sights feed the "Old Friend" achievement. */
  state.stats.resights = (state.stats.resights || 0) + 1;
  saveStats();
  checkAchievements();
  renderCollection();
  return entry;
}

/* A re-sighting gets its own little celebration — species-relevant,
   like every other Sarah moment after a tag. */
function resightThread(species, rec) {
  const label = rec.name ? `\u201c${rec.name}\u201d` : rec.researchId;
  const last = rec.resightings[rec.resightings.length - 1];
  return [
    { who: "them", text: `You saw ${label} again? The ${species.name.toLowerCase()}?` },
    { who: "me", text: `${species.name}, off ${last.location}. ${last.note}` },
    { who: "them", text: "That's the best part of tagging — you get to know it's them. Do you think it recognized you?" }
  ];
}
/* v1.5.3-beta: one-time Sarah reaction to first reunion per species.
   Warm, not spammy — only fires once per species, ever. */
function maybeReunionReaction(species, rec) {
  state.reunionReacted = state.reunionReacted || {};
  if (state.reunionReacted[species.id]) return;
  state.reunionReacted[species.id] = true;
  try { localStorage.setItem("tyi-reunion-reacted", JSON.stringify(state.reunionReacted)); } catch {}
  /* v1.5.8-beta: unnamed sharks are called by research tag ID, not species name. */
  const name = rec.name ? `\u201c${esc(rec.name)}\u201d` : (rec.researchId || species.name);
  const thread = [
    { who: "them", text: `WAIT. You saw ${name} again?!?` },
    { who: "me", text: `The tag matched — it's really them.` },
    { who: "them", text: `That's incredible! They came back! I'm actually emotional rn \u{1F979}` }
  ];
  pushThread(thread);
}

/* ---------- Sarah remembers sharks by name ----------
   v0.8.0: between expeditions she sometimes checks in about one of
   your NAMED sharks. Genuine family conversation — the fact stays
   with the species she asked about. */
const NAMED_CHECKINS = [
  /* v0.12.0 voice pass: the cousin who remembers, calmly. */
  { them: "Hey — how's {name} doing? I was just thinking about your {species}.",
    me: "Still out there pinging away. {hook}" },
  { them: "Do you think {name} remembers you?",
    me: "If sharks hold grudges about boats, I'm in trouble. {hook}" },
  { them: "Any news from {name}? I need a {species} update.",
    me: "No new pings since yesterday. Probably busy being a shark. {hook}" }
];

function maybeCheckinThread() {
  const named = SHARKS.filter(s => state.tagged[s.id] && state.tagged[s.id].name);
  if (!named.length || Math.random() > 0.4) return null;
  const s = pick(named);
  const rec = state.tagged[s.id];
  const t = pick(NAMED_CHECKINS);
  const fill = (str) => str
    .replaceAll("{name}", rec.name)
    .replaceAll("{species}", s.name.toLowerCase())
    .replaceAll("{hook}", s.hook);
  return [
    { who: "them", text: fill(t.them) },
    { who: "me", text: fill(t.me) }
  ];
}

/* ---------- Expedition logbook: the scientist's notebook ----------
   v0.9.0: every trip lands here — plan (region/depth/bait/method),
   encounters and outcome. Compare attempts; the pattern is the answer. */
/* v0.22.0: logbook filters — outcome, region, species. Filters narrow the
   notebook; they never solve the expedition. */
const logbookFilters = { outcome: "all", region: "all", species: "all", dateRange: "all" };

/* Pure: does a logbook trip entry match the given filters? Testable. */
/* v0.22.0 Mira review: filters represent EVENTS within the expedition.
   - "tagged": any tagged encounter (trip may also have others)
   - "resighted": any re-sighted encounter
   - "watched": any watched (just watch) encounter
   - "followed": any tag-along follow encounter
   - "missed": no shark encounters at all
   A trip with multiple outcomes appears in each relevant filter. */
function logbookTripMatches(t, f) {
  if (f.outcome !== "all") {
    const enc = t.encounters || [];
    if (f.outcome === "tagged" && !enc.some(e => e.result === "tagged")) return false;
    if (f.outcome === "resighted" && !enc.some(e => e.result === "resighted")) return false;
    if (f.outcome === "watched" && !enc.some(e => e.result === "watched")) return false;
    if (f.outcome === "followed" && !enc.some(e => e.result === "followed")) return false;
    if (f.outcome === "missed" && enc.length > 0) return false;
  }
  if (f.region !== "all" && t.region !== f.region) return false;
  if (f.species !== "all" && !(t.encounters || []).some(e => e.speciesId === f.species)) return false;
  if (f.dateRange && f.dateRange !== "all") {
    /* v1.3.0-beta Mira review: trips without a timestamp are excluded
       when a date filter is active (they can't prove they're recent). */
    if (!t.ts) return false;
    const age = Date.now() - t.ts;
    const day = 86400000;
    if (f.dateRange === "7d" && age > 7 * day) return false;
    if (f.dateRange === "30d" && age > 30 * day) return false;
    if (f.dateRange === "1y" && age > 365 * day) return false;
  }
  return true;
}

function buildLogbookFilters() {
  const rs = $("logFilterRegion"), ss = $("logFilterSpecies");
  if (rs && rs.options && rs.options.length <= 1) {
    Object.entries(REGIONS).forEach(([id, r]) => {
      const o = document.createElement("option");
      o.value = id; o.textContent = r.name;
      rs.appendChild(o);
    });
  }
  if (ss && ss.options && ss.options.length <= 1) {
    SHARKS.forEach(s => {
      const o = document.createElement("option");
      o.value = s.id; o.textContent = s.name;
      ss.appendChild(o);
    });
  }
  ["logFilterOutcome", "logFilterRegion", "logFilterSpecies", "logFilterDate"].forEach(id => {
    const el = $(id);
    if (el && !el.dataset.bound) {
      el.dataset.bound = "1";
      el.addEventListener("change", () => {
        logbookFilters.outcome = $("logFilterOutcome").value;
        logbookFilters.region = $("logFilterRegion").value;
        logbookFilters.species = $("logFilterSpecies").value;
        logbookFilters.dateRange = $("logFilterDate").value;
        renderLogbook();
      });
    }
  });
  const clr = $("logFilterClear");
  if (clr && !clr.dataset.bound) {
    clr.dataset.bound = "1";
    clr.addEventListener("click", () => {
      logbookFilters.outcome = "all"; logbookFilters.region = "all"; logbookFilters.species = "all"; logbookFilters.dateRange = "all";
      $("logFilterOutcome").value = "all"; $("logFilterRegion").value = "all"; $("logFilterSpecies").value = "all"; $("logFilterDate").value = "all";
      renderLogbook();
    });
  }
}

function renderLogbook() {
  const list = $("logbookList");
  if (!list) return;
  buildLogbookFilters();
  list.innerHTML = "";
  const trips = state.logbook.filter(t => logbookTripMatches(t, logbookFilters));
  const anyFilter = logbookFilters.outcome !== "all" || logbookFilters.region !== "all" || logbookFilters.species !== "all" || logbookFilters.dateRange !== "all";
  const clr = $("logFilterClear");
  if (clr) clr.classList.toggle("hidden", !anyFilter);
  if (!state.logbook.length) {
    list.innerHTML = `<div class="empty-note">No expeditions logged yet.<br>Every trip lands here — plan, encounters, outcome. 📓</div>`;
    return;
  }
  if (!trips.length) {
    list.innerHTML = `<div class="empty-note">No trips match those filters.<br>Try clearing something — the ocean is bigger than it looks.</div>`;
    return;
  }
  trips.forEach(t => {
    const div = document.createElement("div");
    div.className = "logbook-entry";
    const planBits = [
      REGIONS[t.region] ? REGIONS[t.region].name : t.region,
      DEPTHS[t.depth] ? DEPTHS[t.depth].name : t.depth,
      BAITS[t.bait] || t.bait,
      /* v0.9.0: method; pre-v0.9.0 entries stored `lure` — render those
         with the legacy labels so old trips still read sensibly.
         v0.9.1: the planner lets Method stay unpicked (sub-menu hidden) —
         those trips log method:"" and read as "No method chosen". */
      (t.method && METHODS[t.method])
        ? `${METHODS[t.method].name} — ${METHODS[t.method].opts[t.methodOpt] || t.methodOpt}`
        : ("method" in t ? "No method chosen"
          : (t.lure && t.lure !== "none" ? LEGACY_LURES[t.lure] || t.lure : "No lure"))
    ];
    const enc = t.encounters.length
      ? t.encounters.map(e => {
          const icon = e.result === "tagged" ? "🏷️" : e.result === "resighted" ? "🔁" : e.result === "followed" ? "🧭" : "👁️";
          const idBit = e.researchId ? ` <span class="dim">🔬 ${esc(e.researchId)}</span>` : "";
          return `${icon} ${esc(e.name)}${idBit} <span class="dim">(${e.result})</span>`;
        }).join("<br>")
      : `<span class="dim">No sharks today.</span>`;
    div.innerHTML = `
      <div class="logbook-date">🛥️ ${esc(t.date)}</div>
      <div class="logbook-plan">${planBits.map(esc).join(" · ")}</div>
      ${t.conditions ? `<div class="logbook-conditions latin">🌤️ ${esc(t.conditions)}</div>` : ""}
      ${t.fieldNote ? `<div class="logbook-fieldnote latin">🔭 ${esc(t.fieldNote)}</div>` : ""}
      <div class="logbook-enc">${enc}</div>
      ${t.pinHint ? `<div class="logbook-pinhint"><span class="pin-hint-icon">📓</span> <em>${esc(t.pinHint)}</em></div>` : ""}
      <button type="button" class="repeat-btn" data-repeat>🔁 Repeat this plan</button>`;
    const rb = div.querySelector("[data-repeat]");
    if (rb) rb.addEventListener("click", () => repeatPlan(t));
    list.appendChild(div);
  });
}

/* v0.20.0: repeat a logged expedition's plan — restores region, depth, bait
   and method into the planner and jumps to the Expedition tab. Values that
   no longer exist (e.g. a re-locked region) are skipped, never forced. */
function repeatPlan(t) {
  if (!t) return;
  const set = (id, val) => {
    const el = $(id);
    if (!el || val == null || val === "") return false;
    if ([...el.options].some(o => o.value === val && !o.disabled)) {
      el.value = val;
      el.dispatchEvent(new Event("change"));
      return true;
    }
    return false;
  };
  set("regionSelect", t.region);
  set("depthSelect", t.depth);
  set("baitSelect", t.bait);
  /* Method select's change handler fills the sub-options synchronously,
     so the opt can be set right after. v0.20.0 Mira review fix: a saved
     expedition with no method restores NO method — it must not retain
     whatever was previously picked in the planner. */
  if (set("methodSelect", t.method || "")) {
    set("methodOptSelect", t.methodOpt || "none");
  } else {
    const ms = $("methodSelect");
    if (ms && !t.method) { ms.value = ""; ms.dispatchEvent(new Event("change")); }
  }
  goTab("expedition");
}

function updateMsgBadge() {
  const b = $("msgBadge");
  b.textContent = state.unread;
  b.classList.toggle("hidden", state.unread === 0);
  /* v1.4.0: the unread state is announced as text, not red-alone. */
  const tab = document.querySelector('.tab[data-tab="phone"]');
  if (tab) {
    tab.setAttribute("aria-label", state.unread > 0
      ? "Phone, " + state.unread + " unread conversation" + (state.unread === 1 ? "" : "s")
      : "Phone");
  }
}

/* v1.5.1: batched rendering — build the whole thread list as one HTML string
   and set innerHTML once, so the phone doesn't visibly grow in stages. */
function renderMessages() {
  const list = $("messagesList");
  if (!state.messages.length) {
    list.innerHTML = `<div class="empty-note">No messages yet.<br>Sarah will text you between expeditions. 💬</div>`;
    return;
  }
  let html = "";
  state.messages.forEach(thread => {
    const stamp = thread.ts
      ? `<div class="thread-stamp">${esc(fmtTime(thread.ts))}</div>`
      : "";
    html += `<div class="thread">${stamp}<div class="phone-thread">`;
    thread.msgs.forEach(m => {
      html += `<div class="bubble ${esc(m.who)}">${esc(m.text)}</div>`;
    });
    html += `</div></div>`;
  });
  list.innerHTML = html;
  // Like a real chat: oldest at top, newest at the bottom, pinned to the latest.
  list.scrollTop = list.scrollHeight;
}

/* v0.7.0: no target species anymore, so the nudge picks an untagged
   shark to point at — a useful direction, not a correction. */
/* v0.12.0: contextual hints. Sarah pays attention to where you've been
   searching — hints and chats prefer species from the player's most recent
   expedition region, so she talks about the shark you're actually after
   instead of spamming the whole roster. Falls back to the full roster when
   there's no recent region (or nothing untagged there). */
function regionalSpecies(onlyUntagged) {
  const pool = onlyUntagged ? untagged() : SHARKS;
  if (state.lastRegion) {
    const local = pool.filter(s => s.combo.region === state.lastRegion);
    if (local.length) return local;
  }
  return pool.length ? pool : SHARKS;
}
function pickChat() {
  const pool = regionalSpecies(false).filter(s => COUSIN_CHATS[s.id]);
  const s = pick(pool.length ? pool : SHARKS.filter(x => COUSIN_CHATS[x.id]));
  const chats = COUSIN_CHATS[s.id];
  const seen = state.chatSeen[s.id] || 0;
  state.chatSeen[s.id] = seen + 1;
  return chats[seen % chats.length];
}
/* ---------- Sarah's Big Day (v1.4.19-beta) ----------
   When an expedition tags multiple first-time species, ONE authored Big Day
   conversation replaces the routine per-species celebrations. Design: PR #44.
   - 0 new species: nothing (existing no-tag behavior)
   - 1 new species: existing opener + research ID + cheer, at trip end
   - 2/3/4 new species: one Big Day conversation from the tier pool
   - Lemon shark in the mix: lemon-aware variant (no second thread)
   No-repeat via per-tier shuffled bags persisted in state.bigDayBags. */

/* "a nurse shark" / "an oceanic whitetip" — simple vowel check. */
function bigDayArticle(name) {
  return /^[aeiou]/i.test(name.trim()) ? "an" : "a";
}

/* "a nurse shark and a lemon shark" / "a, b, and c" — discovery order. */
function formatSpeciesList(events) {
  const parts = events.map(e => `${bigDayArticle(e.speciesName)} ${e.speciesName.toLowerCase()}`);
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return parts.slice(0, -1).join(", ") + ", and " + parts[parts.length - 1];
}

/* Deal one conversation index from a tier's no-repeat bag. Reshuffles when
   exhausted. Bags persist in state so Sarah doesn't repeat across trips. */
function dealBigDayIndex(tierKey) {
  if (!state.bigDayBags) state.bigDayBags = {};
  let bag = state.bigDayBags[tierKey];
  const poolSize = BIG_DAY[tierKey].length;
  if (!bag || bag.length === 0) {
    bag = Array.from({ length: poolSize }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
  }
  const idx = bag.pop();
  state.bigDayBags[tierKey] = bag;
  saveMsgs(); // persist the bag
  return idx;
}

/* Pure function: build the Big Day thread from queued celebration events.
   Returns array of {who, text} with placeholders resolved. Testable. */
function buildBigDayThread(events) {
  const count = events.length;
  const hasLemon = events.some(e => e.speciesId === "lemon");
  const tierKey = hasLemon ? "lemon" : Math.min(count, 4);
  const pool = BIG_DAY[tierKey];
  // For tests: allow deterministic selection via last arg; live code deals.
  const idx = dealBigDayIndex(tierKey);
  const convo = pool[idx % pool.length];
  const speciesList = formatSpeciesList(events);
  return convo.map(m => ({
    who: m.who,
    text: m.text.replace(/{speciesList}/g, speciesList).replace(/{count}/g, String(count))
  }));
}

/* Flush queued routine celebrations at trip end. Called from closeDive on the
   guaranteed trip-completion path (normal end + early Head back + tag-along).
   Fires exactly one Phone thread: single celebration or Big Day. */
function flushPendingCelebrations() {
  const events = state.pendingCelebrations || [];
  state.pendingCelebrations = [];
  /* v1.5.0-beta: clear persisted copy — flushed means delivered. */
  celebrationStore.clear();
  if (events.length === 0) return;
  if (events.length === 1) {
    // Single new species: existing celebration, delivered at trip end.
    const e = events[0];
    pushThread([
      { who: "them", text: e.opener },
      { who: "me", text: `A ${e.speciesName} — ${e.length} metres, ${e.sex}. Research ID ${e.researchId}.` },
      { who: "them", text: e.cheer }
    ]);
  } else {
    // 2+ new species: one Big Day conversation.
    pushThread(buildBigDayThread(events));
  }
}

function afterExpedition(plan) {
  /* A trip with a successful tag already got its Sarah moment — the
     species-relevant celebration thread. Same for a re-sighting or a
     tag-along follow. Don't follow it minutes later with an unrelated
     random fact. */
  if (plan && plan.region) { state.lastRegion = plan.region; saveMsgs(); }
  if (state.taggedThisTrip || state.resightedThisTrip || state.followedThisTrip) return;
  let thread;
  if (state.failures >= 5) {
    // gentle nudge, genuine-conversation style — about YOUR waters.
    // v0.17.1: Sarah only butts in on her own after five; before that,
    // asking is the player's call (see the Ask Sarah panel).
    const s = pick(regionalSpecies(true));
    thread = [
      { who: "them", text: "How's the shark hunting going?" },
      { who: "me", text: "Honestly? Struck out a few times. The water's been empty." },
      { who: "them", text: COUSIN_NUDGES[s.id] || "You'll get the next one. I believe in you." },
      { who: "me", text: "Huh. Okay, that's actually really helpful. Thanks, kiddo." }
    ];
    state.failures = 0;
  } else if (state.failures === 1 && !state.sarahAdviceOffered) {
    /* v0.17.1: after the first failed trip, Sarah offers her notes — the
       player picks the species, since the game may not know what they're
       actually after. The Ask Sarah panel appears in the Phone tab. */
    thread = [
      { who: "them", text: "Rough day out there?" },
      { who: "me", text: "Yeah. Empty water." },
      { who: "them", text: "I've got notes on every shark we've studied. Pick one below and I'll tell you what I know — where to look, what they like." }
    ];
    state.sarahAdviceOffered = true;
    saveMsgs(); // v0.17.1 review fix: the offer must survive a reload
  } else {
    /* v0.8.0: sometimes she just checks in about one of your named
       sharks — the cousin who remembers. */
    const checkin = maybeCheckinThread();
    if (checkin) {
      thread = checkin;
    } else {
      const chat = pickChat();
      thread = [
        { who: "them", text: chat.them },
        { who: "me", text: chat.me }
      ];
    }
  }
  pushThread(thread);
  renderSarahAsk();
}

/* v0.17.1: Ask Sarah — player-initiated advice. The panel appears in the
   Phone tab after the first failed trip; the player picks the species. */
function renderSarahAsk() {
  const panel = $("sarahAsk");
  if (!panel) return;
  const show = !!state.sarahAdviceOffered && untagged().length > 0;
  panel.classList.toggle("hidden", !show);
  if (!show) return;
  const sel = $("sarahAskSelect");
  sel.innerHTML = "";
  untagged().forEach(s => {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = s.name;
    sel.appendChild(o);
  });
}
function askSarahAdvice(sid) {
  const s = sharkById(sid);
  if (!s) return;
  pushThread([
    { who: "me", text: `I'm striking out — any advice on the ${s.name.toLowerCase()}?` },
    { who: "them", text: COUSIN_NUDGES[sid] || "You'll get the next one. I believe in you." },
    { who: "me", text: "Thanks, kiddo. That's actually really helpful." }
  ]);
  state.sarahAdviceOffered = false;
  saveMsgs(); // v0.17.1 review fix: a used offer stays used across reloads
  renderSarahAsk();
  goTab("phone");
}

/* ---------- Achievements (v0.18.0) ----------
   Visible upfront with breadcrumb hints until unlocked. Checks run after
   the actions that can earn them; unlocks persist and celebrate. */
function saveStats() {
  statsStore.save(state.stats);
}
function checkAchievements() {
  if (typeof ACHIEVEMENTS === "undefined") return;
  ACHIEVEMENTS.forEach(a => {
    if (state.achievements[a.id]) return;
    let earned = false;
    try { earned = !!a.check(state); } catch { earned = false; }
    if (earned) unlockAchievement(a);
  });
}
function unlockAchievement(a) {
  state.achievements[a.id] = Date.now();
  achieveStore.save(state.achievements);
  renderAchievements();
  /* v0.18.0 review: queue celebrations so one action earning several
     achievements shows each card in turn instead of overwriting. */
  achieveQueue.push(a);
  showNextAchievement();
  /* v1.4.9: White Whale gets a Sarah reaction — she'd lose her mind
     over a megamouth. Fires alongside the achievement celebration. */
  if (a.id === "white-whale" && typeof WHITE_WHALE_THREAD !== "undefined") {
    pushThread(WHITE_WHALE_THREAD.map(m => ({ ...m })));
  }
}
const achieveQueue = [];
let achieveShowing = false;
function showNextAchievement() {
  if (achieveShowing || !achieveQueue.length) return;
  const a = achieveQueue.shift();
  achieveShowing = true;
  const ov = $("achieveOverlay");
  if (!ov) { achieveShowing = false; return; }
  ov.classList.remove("hidden");
  ov.innerHTML = `<div class="phone">
    <div class="cert-trophy" style="font-size:52px; text-align:center">${a.icon}</div>
    <h2 style="text-align:center; margin:8px 0 2px">Achievement Unlocked!</h2>
    <p style="text-align:center; font-weight:800; margin:4px 0">${esc(a.name)}</p>
    <p class="latin" style="text-align:center">${esc(a.description)}</p>
    <button id="achieveClose" class="primary-button" type="button">Sweet!</button>
  </div>`;
  $("achieveClose").addEventListener("click", () => {
    ov.classList.add("hidden");
    achieveShowing = false;
    showNextAchievement();
  });
}
function renderAchievements() {
  const list = $("achieveList");
  if (!list || typeof ACHIEVEMENTS === "undefined") return;
  /* v0.23.0: hidden achievements (e.g. Bruce) don't appear until unlocked. */
  const visible = ACHIEVEMENTS.filter(a => !a.hidden || state.achievements[a.id]);
  const unlockedCount = visible.filter(a => state.achievements[a.id]).length;
  const head = $("achieveHead");
  if (head) head.innerHTML = `<h2>Achievements</h2><p>${unlockedCount} of ${visible.length} unlocked</p>`;
  list.innerHTML = "";
  visible.forEach(a => {
    const unlocked = !!state.achievements[a.id];
    const row = document.createElement("div");
    row.className = "guide-row" + (unlocked ? "" : " locked");
    row.innerHTML = `
      <div class="guide-row-head" style="cursor:default">
        <span style="font-size:22px">${unlocked ? a.icon : "🔒"}</span>
        <span class="guide-row-name">${unlocked ? esc(a.name) : "???"}</span>
        <span class="latin">${unlocked ? esc(a.description) : esc(a.breadcrumb)}</span>
      </div>`;
    list.appendChild(row);
  });
  /* v1.4.2: tab badge removed — the count lives in the page header above. */
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

/* v0.8.0: the trip currently being logged for the logbook. */
let tripLog = null;
function logTripEncounter(species, result, researchId) {
  if (!tripLog) return;
  tripLog.encounters.push({ speciesId: species.id, name: species.name, result, researchId: researchId || null });
}
/* v1.2.0-beta: count how many individuals of a species the player has tagged,
   across all logbook trips. state.tagged only keeps the latest per species,
   so the logbook is the source of truth for lifetime counts. */
/* v1.2.0-beta Mira review: ordinal words for the tag announcement —
   "the third Nurse Shark you've tagged", not "3 in your collection". */
function ordinal(n) {
  const words = ["first","second","third","fourth","fifth","sixth","seventh",
    "eighth","ninth","tenth","eleventh","twelfth"];
  if (n >= 1 && n <= words.length) return words[n - 1];
  // Teen exceptions and the 10-20 range always take "th"
  const mod100 = n % 100;
  if (mod100 >= 10 && mod100 <= 20) return n + "th";
  const mod10 = n % 10;
  if (mod10 === 1) return n + "st";
  if (mod10 === 2) return n + "nd";
  if (mod10 === 3) return n + "rd";
  return n + "th";
}
function countSpeciesTags(speciesId) {
  let n = 0;
  (state.logbook || []).forEach(t => {
    (t.encounters || []).forEach(e => {
      if (e.speciesId === speciesId && e.result === "tagged") n++;
    });
  });
  // The current trip's log isn't in state.logbook yet — count it too.
  if (tripLog) {
    (tripLog.encounters || []).forEach(e => {
      if (e.speciesId === speciesId && e.result === "tagged") n++;
    });
  }
  return n;
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
  $("tagSharkArt").innerHTML = sharkArtImg(species.id, "illustration", species.name);
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
    taggedAt: Date.now(), // v0.16.0: explicit chronology for the ending
    track: genTrack(s, { location: regionName, date: dateStr })
  };
  /* v1.4.19-beta: Big Day — determine new-species BEFORE recording the tag. */
  const wasNewSpecies = !state.tagged[s.id];
  /* v1.5.3-beta: one tagged shark per species (canonical). The reunion system
     never creates a second record — _individuals from v1.5.2 betas are left
     dormant, not deleted. */
  state.tagged[s.id] = rec;
  state.taggedThisTrip = true;
  logTripEncounter(s, "tagged", rec.researchId);
  store.save(state.tagged);
  /* v1.2.0-beta: prominent species-count announcement — no more squinting
     at the small print. First of species vs. Nth individual, loud and clear. */
  const lifetimeTags = countSpeciesTags(s.id);
  if (lifetimeTags <= 1) {
    logLine(`🎉 <span class="found"><strong>New species!</strong> This is your first ${s.name}!</span>`, "found");
  } else {
    logLine(`🎉 <span class="found"><strong>${s.name} tagged!</strong> That's the ${ordinal(lifetimeTags)} ${s.name} you've tagged!</span>`, "found");
  }
  state.pendingTag = null;
  /* v0.18.0: chum tags feed the "Something in the Water" achievement —
     v0.18.0 review: only when chum is a real method for THIS species. */
  if (state.currentPlan && state.currentPlan.method === "attract" &&
      state.currentPlan.methodOpt === "chum" &&
      s.methods && s.methods.attract && s.methods.attract.includes("chum")) {
    state.stats.chumTags = (state.stats.chumTags || 0) + 1;
    saveStats();
  }
  /* v0.19.0: depths tagged feed the "Full Fathom" achievement. */
  if (state.currentPlan && state.currentPlan.depth &&
      !state.stats.depthsTagged.includes(state.currentPlan.depth)) {
    state.stats.depthsTagged.push(state.currentPlan.depth);
    saveStats();
  }
  /* v1.4.19-beta: Big Day — queue the routine celebration instead of pushing
     immediately. Flushed as one conversation (single or Big Day) at trip end.
     Special threads (Bruce, Mary Lee, Nicole, Sarah egg, Archive) still push
     separately below and are never batched. */
  if (wasNewSpecies) {
    state.pendingCelebrations.push({
      speciesId: s.id,
      speciesName: s.name,
      nickname: name || "",
      researchId: rec.researchId,
      length: rec.length,
      sex: rec.sex,
      opener: s.opener,
      cheer: s.cheer
    });
    /* v1.5.0-beta: persist so a reload before trip end doesn't lose it. */
    celebrationStore.save(state.pendingCelebrations);
  }
  maybeSarahEgg(s.id, rec);
  maybeNameEgg(s.id, rec); // v0.23.0
  /* v0.24.0: progressive Wild Archive unlock (Mira approved). First tag
     reveals the Archive tab with a Sarah intro; later tags add entries
     quietly. Existing winners keep full access via migrateArchiveUnlock. */
  const wasFirstTag = Object.keys(state.tagged).length === 1;
  if (!state.archiveUnlocked && wasFirstTag) {
    state.archiveUnlocked = true;
    try { localStorage.setItem("tyi-archive", "1"); } catch {}
    pushThread([
      { who: "them", text: "WAIT. I have something for you 📸" },
      { who: "them", text: "Every shark you tag, I'm going to find you a real photo of their species. The actual animal. Check the new 🖼️ Archive tab!" },
      { who: "me", text: "Real photos? Of the actual species?" },
      { who: "them", text: "The real deal! Your field-guide art is for ID work — the Archive is for meeting them. Every tag adds another face to the collection 🩵" }
    ]);
  }
  /* v1.5.1: Archive never shows a notification badge — removed per Avery. */
  checkMilestones();
  checkAchievements(); // v0.18.0
  renderAll();
  showHealthCheck(s, rec);
}

/* v1.3.1-beta Mira review (blocking): the "Tag along" CTA must NOT appear
   before release — tapping it hid the overlay without resolving the encounter,
   leaving runExpedition() awaiting forever. The CTA lives only in doRelease(),
   after the player has chosen how to release. */
function showHealthCheck(s, rec) {
  state.healthSpecies = s;
  $("tagForm").classList.add("hidden");
  $("healthView").classList.remove("hidden");
  /* v1.4.0-beta: third release choice — tag along ends the expedition. */
  try {
    const rec2 = state.tagged[s.id];
    const nm = (rec2 && rec2.name) || s.name;
    $("tagAlongName").textContent = nm;
  } catch {}
  $("healthArt").innerHTML = sharkArtImg(s.id, "illustration", s.name);
  $("healthInfo").innerHTML = `
    <strong>${s.name}</strong> — ${esc(rec.researchId)}<br>
    🩺 Health check: ${rec.sex === "female" ? "♀ female" : "♂ male"}, ${rec.length} m.<br>
    Tag seated well, swimming strongly, good body condition.<br>
    <em>Every shark released healthy. 🦈</em>
  `;
}

/* v0.17.1: the release IS the destination choice — keep diving or head back.
   The release buttons resolve the encounter directly instead of dropping the
   player into a second keep-diving/head-back prompt. */
function doRelease(headBack) {
  const done = state.encounterDone;
  const s = state.healthSpecies;
  state.encounterDone = null;
  state.healthSpecies = null;
  $("tagOverlay").classList.add("hidden");
  if (s) {
    /* v1.3.1-beta: warm release moment with the title woven in.
       Personalized CTA ("Tag along with [name]") focuses the map on YOUR shark.
       (v1.4.0-beta: retired per Mira review — the health-check third release
       choice is now the single tag-along path.) */
    const rec = state.tagged[s.id];
    const displayName = (rec && rec.name) || s.name;
    logLine(`🌊 ${esc(displayName)} is back in the water — tag secure, swimming strong.`);
  }
  renderAll();
  if (done) done(headBack);
}
/* v1.4.0-beta: secret tag-along facts — 1-3 curated, biologically correct facts
   per species. Unlock one per tag-along; when exhausted, the graceful line plays.
   Facts are filled in below (generated content). */
const SECRET_FACTS = {
  nurse: [
    "Nurse sharks can pump water over their gills while sitting perfectly still — most sharks would suffocate doing that, but a nurse shark can nap on the seafloor and breathe easy.",
    "They hunt by suction, inhaling with such force that prey is vacuumed straight out of holes in the reef — and they often pile on top of each other in sleepy daytime heaps.",
    "Every summer, nurse sharks gather in the same shallow mating grounds off Florida, returning year after year like a family reunion."
  ],
  thresher: [
    "A thresher hunts with its tail like a whip — high-speed cameras finally caught them in 2013 herding sardines, then stunning them with an overhead tail-slap.",
    "That scythe of a tail can be as long as the rest of its body, and special warm muscles keep its brain and eyes heated so it can hunt in cold, deep water."
  ],
  whale: [
    "Every whale shark wears a constellation of spots as unique as a fingerprint — researchers photograph them to recognize individuals across decades and oceans.",
    "They're champion divers, recorded plunging nearly two kilometres straight down into the dark, then cruising back up to feed at the surface after dark."
  ],
  goblin: [
    "A goblin shark's jaws launch forward off its face like a slingshot to snatch prey — one of the fastest bites ever measured in a shark.",
    "Its pinkish skin is so soft and translucent you can see blood vessels beneath, and its long snout is packed with sensors that feel the faint electric hum of hidden prey."
  ],
  tiger: [
    "Tiger sharks are famous for eating almost anything — license plates, tires, and even sea turtles, whose shells their serrated teeth and powerful jaws can crack, have all turned up in their stomachs.",
    "The bold stripes that give them their name fade as they age, so the biggest old tigers swim nearly plain grey; some individuals also wander entire ocean basins on years-long journeys."
  ],
  sandtiger: [
    "Sand tigers do something no other shark does: they gulp air at the surface and hold it in their stomachs like a built-in float, letting them hover motionless in the water.",
    "Before birth, the pups fight a darker battle — the largest embryo in each uterus eats its siblings, so only two sharks, one per side, are ever born."
  ],
  galapagos: [
    "Galapagos sharks are famously curious, often circling divers for a long, deliberate look — researchers consider them one of the most inquisitive reef sharks.",
    "Despite the name, they roam tropical reefs far beyond the Galápagos, from Hawaii to Bermuda, patrolling clear-water drop-offs in small groups."
  ],
  greatwhite: [
    "Off South Africa's Seal Island, great whites launch their whole multi-ton bodies clean out of the water to ambush seals — a behavior called breaching, perfected through practice.",
    "They're warm-bodied for a fish, keeping their swimming muscles heated, and some cross entire oceans — tagged whites have commuted from California to Hawaii and back to a patch of open ocean scientists call the White Shark Café."
  ],
  hammerhead: [
    "That hammer isn't just for show — spreading the eyes wide gives hammerheads wider binocular overlap in front than most sharks, and sweeping the head side to side lets them scan the sand for the electric whispers of buried stingrays.",
    "Great hammerheads are mostly loners — solitary hunters that sweep their wide heads over the sand to pin down stingrays, their favorite prey, before swinging down to scoop them up; their first dorsal fin is exceptionally tall and sickle-shaped."
  ],
  mako: [
    "The shortfin mako is the fastest shark alive, built like a torpedo with a heated engine — its warm muscles let it explode after tuna and even leap clear out of the water.",
    "Makos think fast too: that warm blood reaches the brain, keeping it sharp in cold water where other predators slow down."
  ],
  basking: [
    "Basking sharks can shed and regrow their bristly gill rakers — like losing and regrowing a built-in sieve — though scientists are still working out how regularly it happens.",
    "In summer they've been filmed swimming slow nose-to-tail circles in pairs, a stately dance scientists believe is courtship."
  ],
  epaulette: [
    "When the tide drops, epaulette sharks simply walk — paddling across exposed reef on their fins from pool to pool, and surviving hours in water so low in oxygen it would kill most fish.",
    "They're homebodies with tiny territories, often spending their whole lives on one small patch of reef."
  ],
  lemon: [
    "Lemon sharks have remarkable memories for place: pups born in Bimini's mangrove nurseries return years later as adults, navigating back across open ocean to where they were born.",
    "They've been studied at Bimini for over three decades — one of the longest-running shark studies in the world — and in lab tests they've shown they can learn and remember visual cues — solid evidence of visual learning and memory."
  ],
  blacktip: [
    "Blacktip sharks hunt in spectacular spinning leaps, corkscrewing out of the water through schools of fish with their mouths open.",
    "They're sprinters of the shallows, often hunting in packs that herd baitfish against the shoreline."
  ],
  whitetip: [
    "Whitetip reef sharks are night owls — by day they pile together in caves and under ledges, resting in sleepy heaps, and by night they slink out alone to hunt.",
    "Their slim bodies can wriggle into reef crevices no other shark their size could enter, and like nurse sharks they can pump water to breathe while lying still."
  ],
  blue: [
    "Blue sharks are ocean wanderers, crossing entire oceans on migrations that can span the whole Atlantic, guided by senses we still don't fully understand.",
    "They're famously curious around divers, circling in slow and deliberate — and a single mother can give birth to litters of more than a hundred pups."
  ],
  porbeagle: [
    "Porbeagles run hot — among the warmest-bodied of all sharks, they keep their core heated well above the icy North Atlantic water they hunt in.",
    "That internal furnace lets them chase prey in near-freezing seas and power long migrations across whole ocean basins."
  ],
  silky: [
    "Silky sharks are named for their skin: their tiny scales are so smooth the hide feels like silk, unlike the sandpaper of most sharks.",
    "They're bold and inquisitive, often trailing divers for long stretches just to investigate — and they shadow schools of tuna across the open ocean."
  ],
  oceanic: [
    "Oceanic whitetips were once the most abundant large shark on Earth — bold, curious wanderers that would investigate anything floating in the open sea, from wreckage to research vessels.",
    "Their long, rounded, white-tipped fins work like wings, letting them cruise the blue desert for months between meals."
  ],
  sevengill: [
    "Most sharks have five gill slits; the broadnose sevengill has seven — an ancient design it shares with only a handful of species.",
    "Divers in places like La Jolla, California, recognize regulars by their unique spot patterns, and sevengills have been seen teaming up in loose packs to hunt seals."
  ],
  bronze: [
    "Bronze whalers wear their name in their skin — a coppery sheen that flashes as they turn, unique among the grey requiem sharks.",
    "They're long-distance travelers of the Southern Hemisphere, migrating along entire coastlines between feeding and pupping grounds."
  ],
  frilled: [
    "The frilled shark is a living time capsule — eel-bodied, with 25 rows of needle teeth (about 300 in all), it has barely changed in 80 million years.",
    "It lives so deep it's almost never seen; one filmed off Japan in 2007 was among the first ever caught on camera alive near the surface, and scientists think it strikes at prey like a snake."
  ],
  zebra: [
    "Baby zebra sharks are born with bold black-and-white stripes — and grow into spotted, leopard-like adults. They essentially change their pattern, and their common name, as they age.",
    "Gentle bottom-dwellers, they rest on the seafloor by day and use their long tails to corner small prey in reef crevices at night."
  ],
  scalloped: [
    "Scalloped hammerheads gather by day in vast schools around offshore seamounts — Cocos Island and the Galápagos host hundreds swirling together in the blue.",
    "Females make long migrations to give birth in coastal nurseries, and the pups' hammer-heads are soft and rounded at birth."
  ],
  smooth: [
    "The smooth hammerhead is the cold-water specialist of its family, ranging into temperate seas where other hammerheads won't go — including the Mediterranean and the coasts of New Zealand.",
    "Its hammer has a smooth, rounded front edge with no central notch, giving it the cleanest profile of any hammerhead."
  ],
  bonnethead: [
    "In 2018 scientists discovered the bonnethead eats and digests seagrass — the first omnivorous shark ever found, getting real nutrition from plants.",
    "The smallest of the hammerheads, bonnetheads travel in sociable schools, sometimes dozens strong, cruising shallow bays and estuaries."
  ],
  bull: [
    "Bull sharks swim hundreds of kilometres up rivers — they've been found far up the Amazon and Mississippi, and they live year-round in Lake Nicaragua, adjusting their bodies to fresh water like few sharks can.",
    "That adaptability comes from remarkable kidneys that recycle salt, letting one shark hunt in both the open ocean and a muddy river."
  ],
  greyreef: [
    "When bothered, a grey reef shark performs one of the ocean's clearest warning displays — arching its back, dropping its pectoral fins, and swimming in an exaggerated, swaggering S-shape that says 'back off.'",
    "They're otherwise curious and social, often approaching divers for a close look before deciding you're not interesting."
  ],
  caribbean: [
    "Caribbean reef sharks have learned to rest in ocean currents, facing into the flow so water streams over their gills — napping while the sea does the breathing for them.",
    "They're homebodies of the coral reef, patrolling the same stretches of reef edge for years."
  ],
  sandbar: [
    "Sandbar sharks carry one of the tallest dorsal fins of any shark — a proud sail that makes them easy to spot from a boat.",
    "Their pups grow up in famous nurseries like Delaware Bay, where scientists have tracked generations of young sandbars returning to the same shallow waters."
  ],
  salmon: [
    "Salmon sharks are the Arctic's answer to the mako — warm-bodied hunters that keep their swimming muscles heated in near-freezing northern Pacific water.",
    "They follow the salmon runs, and their warm red muscle lets them strike with full power in water cold enough to numb most predators."
  ],
  dusky: [
    "Dusky sharks live life in the slow lane — they can take twenty years to mature and may live past forty, among the slowest life cycles of any shark.",
    "They migrate thousands of kilometres along coastlines, and females gather in warm southern waters to give birth."
  ],
  silvertip: [
    "Silvertip sharks are famously bold around divers, often making close, deliberate passes — curious rather than aggressive, but impossible to ignore.",
    "Their white-tipped fins flash like signals as they patrol Indo-Pacific reef drop-offs, usually alone or in small groups."
  ],
  spinner: [
    "Spinner sharks feed by charging vertically through bait balls while spinning like a drill — then launching out of the water in a twisting leap.",
    "Those acrobatic spins aren't play; the rotation lets them snap at fish in every direction as they rocket upward through the school."
  ],
  wobbegong: [
    "A wobbegong is a living rug — its tasseled, mottled camouflage is so perfect that fish swim right up to the fringe of sensory barbels around its mouth, which twitch like worms to lure them closer.",
    "Then it strikes with one of the fastest bites in the shark world, hinging its huge jaws open to engulf prey nearly its own size."
  ],
  leopard: [
    "Every summer, pregnant female leopard sharks gather in the warm shallows of La Jolla, California, basking to speed up the development of their pups — a maternity ward in the surf.",
    "They're gentle bottom-feeders, crunching crabs and clam siphons, and their spots are unique enough that researchers can tell individuals apart."
  ],
  horn: [
    "Horn sharks crunch through sea urchins and crabs with rows of flat, molar-like teeth — built for crushing, not slicing.",
    "Females lay beautiful spiral egg cases, screwing them into rocky crevices where the corkscrew shape wedges them safe from predators."
  ],
  portjackson: [
    "Port Jackson sharks lay corkscrew-shaped egg cases too, wedging them between rocks — and mothers are sometimes seen picking the case up in their mouths to carry it to a safer crevice.",
    "They make real migrations along Australia's coast, traveling hundreds of kilometres between feeding and breeding grounds."
  ],
  angelshark: [
    "Angel sharks are ambush artists — they vanish beneath the sand with only their eyes showing, then explode upward to engulf passing fish in a fraction of a second.",
    "Despite the angelic name, they're flattened bottom-dwellers more like rays, and Europe's angelsharks are now critically endangered."
  ],
  megamouth: [
    "The megamouth was unknown to science until 1976, when one tangled in a Navy sea anchor off Hawaii — a 15-foot shark nobody had ever seen.",
    "It spends days in the deep and rises toward the surface each night to filter-feed on krill, and researchers suspect the pale band inside its huge mouth may glow to lure prey in the dark."
  ],
  sawshark: [
    "A sawshark's saw is studded with sensors — it sweeps the rostrum through the sand feeling for the electric heartbeat of buried prey, then slashes sideways to disable it.",
    "Those whisker-like barbels halfway along the saw can help sense prey and changes around the seafloor; they appear especially useful for touch."
  ],
  greenland: [
    "Greenland sharks may live 400 years or more — the longest-lived vertebrate known, with one female estimated at nearly four centuries old.",
    "Greenland sharks can carry parasitic copepods on their eyes, but recent research shows their visual system is adapted for the deep sea — and their flesh is toxic unless fermented, which is how Iceland's hákarl is made."
  ],
  cookiecutter: [
    "The cookiecutter glows from below — light-producing organs in its belly match the faint light from above, hiding its silhouette, except for a dark collar that may mimic a small fish to lure big predators close.",
    "Then this foot-long shark cuts a single cookie-shaped plug of flesh from whales and tuna — and has even left its signature round bites in the rubber sonar domes of submarines — before vanishing back into the dark."
  ],
  sixgill: [
    "Bluntnose sixgills are deep-sea heavyweights, cruising cold depths down past a kilometre, surfacing only at night in a few special places like Puget Sound.",
    "They're unhurried scavengers with a slow, powerful build — and those six gill slits mark them as survivors of an ancient lineage."
  ],
  velvetbelly: [
    "The velvet belly lanternshark carries its own dim lighting — rows of light-producing organs along its belly glow to erase its silhouette from predators below.",
    "It lives in the twilight depths of the eastern Atlantic, a small shark in a very big dark."
  ],
  dwarflantern: [
    "The dwarf lanternshark is the smallest shark in the world — fully grown at about 20 centimetres, it could curl up in your hand.",
    "It lives in deep water off Colombia and Venezuela and glows with its own bioluminescence, a tiny lantern in the dark."
  ],
  kitefin: [
    "The kitefin shark is the largest glowing vertebrate known — at over a metre and a half long, this deep-sea hunter produces its own blue-green light.",
    "Its glow was only confirmed in a 2021 study, making it one of the biggest recent surprises in shark science."
  ],
  pacificsleeper: [
    "Pacific sleepers are giants of the deep North Pacific, growing as long as a great white, yet so rarely seen that almost everything about their lives is a mystery.",
    "They're known to gather at whale falls in the abyss, slow-moving feasts in the dark where these huge sharks scavenge for months."
  ],
  spinydogfish: [
    "Spiny dogfish carry mild venom in the spines ahead of each dorsal fin — a rare defense among sharks, and sharp enough to demand respect.",
    "They're marathon mothers too: pregnancies last up to two years, among the longest of any vertebrate on Earth."
  ],
  catshark: [
    "Catsharks lay their eggs in leathery purses with curly tendrils at each corner — 'mermaid's purses' that anchor to seaweed until the pups hatch.",
    "They're nocturnal prowlers with cat-like eyes, and some species can even squeeze their bodies through astonishingly small gaps to hide by day."
  ]
};

/* Returns the next unlearned fact for a species, or null if exhausted.
   Guarantees one unlearned fact if any remain (Mira's guardrail). */
function unlockSecretFact(speciesId) {
  const pool = (typeof SECRET_FACTS !== "undefined" && SECRET_FACTS[speciesId]) || [];
  if (!pool.length) return null;
  const unlocked = state.unlockedFacts[speciesId] || [];
  const remaining = pool.map((_, i) => i).filter(i => !unlocked.includes(i));
  if (!remaining.length) return null;
  const idx = remaining[Math.floor(Math.random() * remaining.length)];
  unlocked.push(idx);
  state.unlockedFacts[speciesId] = unlocked;
  factStore.save(state.unlockedFacts);
  return pool[idx];
}
/* v1.4.0-beta: third release choice — "Release & tag along" ENDS the expedition.
   Lifecycle-safe per Mira's guardrail: resolves the encounter exactly once
   (with tag-along intent), so trip log, achievements, counters, Sarah batching,
   and launch-button cleanup all run exactly once. The map focuses the shark
   AFTER trip completion (in closeDive), not here. */
function doTagAlong() {
  const done = state.encounterDone;
  const s = state.healthSpecies;
  state.encounterDone = null;
  state.healthSpecies = null;
  $("tagOverlay").classList.add("hidden");
  if (s) {
    const rec = state.tagged[s.id];
    const displayName = (rec && rec.name) || s.name;
    logLine(`🌊 ${esc(displayName)} is back in the water — tag secure, swimming strong.`);
    /* v1.5.8-beta: the insight lives on the Collection card only — not in the log. */
    const fact = unlockSecretFact(s.id);
    state.pendingTagAlongFact = fact
      ? { speciesId: s.id, fact, exhausted: false }
      : { speciesId: s.id, fact: null, exhausted: true };
    logLine(`🧭 You're changing course to follow ${esc(displayName)} — no more encounters this trip.`);
  }
  renderAll();
  if (done) done({ tagAlong: s ? s.id : null });
}
$("releaseBtn").addEventListener("click", () => doRelease(false));
$("releaseShipBtn").addEventListener("click", () => doRelease(true));
$("tagAlongBtn").addEventListener("click", doTagAlong);
/* v1.4.0-beta Mira review (blocker 2): follow option for already-tagged species.
   Lets the player follow a shark they've already tagged to unlock remaining
   secret facts (2nd, 3rd) without retagging or replacing the collection record.
   Ends the expedition like doTagAlong — you're spending the rest of the trip
   following this shark. */
function doFollowTagged(speciesId, doneCb) {
  const s = SHARKS.find(x => x.id === speciesId);
  if (!s) return;
  const rec = state.tagged[speciesId];
  const displayName = (rec && rec.name) || s.name;
  logLine(`🧭 Following ${esc(displayName)} — tag secure, swimming strong.`);
  const fact = unlockSecretFact(speciesId);
  if (fact) {
    logLine(`🔬 <strong>Tag-along insight:</strong> ${esc(fact)}`);
    /* Stash for the map overlay (readable reward with progression). */
    state.pendingTagAlongFact = { speciesId, fact, exhausted: false };
  } else {
    logLine(`🔬 <em>I've learned all I can — the rest is in the specialists' hands now.</em>`);
    state.pendingTagAlongFact = { speciesId, fact: null, exhausted: true };
  }
  /* v1.4.0-beta Mira review (related polish): log the follow as a trip
     encounter with the "followed" outcome — the logbook shows a meaningful
     event, Sarah's after-trip logic doesn't misclassify the expedition, and
     the collection record is untouched (no fake re-tag). */
  logTripEncounter(s, "followed", rec ? rec.researchId : null);
  state.followedThisTrip = true;
  logLine(`🧭 You're changing course to follow ${esc(displayName)} — no more encounters this trip.`);
  renderAll();
  /* Resolve the encounter with tag-along intent, ending the expedition.
     Prefer the passed callback (already-tagged path from doEncounter);
     fall back to state.encounterDone for safety. */
  const done = doneCb || state.encounterDone;
  state.encounterDone = null;
  if (done) done({ tagAlong: speciesId });
}
/* v1.4.0-beta Mira review (important): readable tag-along reward on the Map.
   Shows the unlocked fact (or the graceful exhaustion line) in an overlay card
   with "learned X/3" progression, so the player can actually read it even at
   quick pace. Dismissed with an explicit button — no auto-close. */
function showTagAlongFact(info) {
  const s = SHARKS.find(x => x.id === info.speciesId);
  if (!s) return;
  const rec = state.tagged[info.speciesId];
  const displayName = (rec && rec.name) || s.name;
  const pool = (typeof SECRET_FACTS !== "undefined" && SECRET_FACTS[info.speciesId]) || [];
  const unlocked = state.unlockedFacts[info.speciesId] || [];
  const total = pool.length;
  const learned = unlocked.length;
  let bodyHtml;
  if (info.fact && !info.exhausted) {
    bodyHtml = `
      <div class="tagalong-fact-card">
        <div class="fact-progress">Tag-along insight — learned ${learned}/${total}</div>
        <div class="fact-text">🔬 ${esc(info.fact)}</div>
      </div>
      <p class="dim">Following ${esc(displayName)} paid off. ${total - learned > 0
        ? `Follow ${esc(displayName)} again sometime to learn more.`
        : `That's everything this shark had to teach.`}</p>`;
  } else {
    bodyHtml = `
      <div class="tagalong-fact-card">
        <div class="fact-progress">Tag-along insight — ${learned}/${total} learned</div>
        <div class="fact-text"><em>I've learned all I can — the rest is in the specialists' hands now.</em></div>
      </div>
      <p class="dim">${esc(displayName)} still appreciates the company. 🧭</p>`;
  }
  $("tagAlongFactContent").innerHTML = `
    <h3 style="margin:4px 0 8px">🧭 Tagging along with ${esc(displayName)}</h3>
    ${bodyHtml}`;
  $("tagAlongOverlay").classList.remove("hidden");
}
$("tagAlongFactClose").addEventListener("click", () => {
  $("tagAlongOverlay").classList.add("hidden");
});

/* v0.17.1: Ask Sarah for advice. */
$("sarahAskBtn").addEventListener("click", () => {
  const sid = $("sarahAskSelect").value;
  if (sid) askSarahAdvice(sid);
});

/* ---------- Milestones & win state ----------
   v0.7.0: two stages.
   - Tagging the first six (the original roster) unlocks the Galápagos and
     South Africa as real, selectable waters.
   - Tagging the full roster wins the game: Master Shark Tagger.
     v0.11.0: the win moves up with the roster (SHARKS.length), always. */
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
  /* v0.21.0 sharknado: progressive region unlocks by tag count.
     v0.21.0 Mira review: independent of original-six unlock. */
  const n = taggedIds.length;
  if (n >= 15 && REGIONS["east-australia"].locked) {
    REGIONS["east-australia"].locked = false;
    fillRegions();
    pushThread(EAST_AUS_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlockSingle("east-australia", "Eastern Australia", "wobbegongs hide in the reef ledges here.");
  }
  if (n >= 25 && REGIONS["california"].locked) {
    REGIONS["california"].locked = false;
    fillRegions();
    pushThread(CALIFORNIA_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlockSingle("california", "California Coast", "leopard sharks cruise the bays and kelp.");
  }
  if (n >= 35 && REGIONS["arctic"].locked) {
    REGIONS["arctic"].locked = false;
    fillRegions();
    pushThread(ARCTIC_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlockSingle("arctic", "Arctic Waters", "the Greenland shark waits in the cold dark.");
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
      <p class="latin">The six original species. The institute trusts you with farther waters now — and Sarah texted you about it. 📱</p>
    </div>
    <button id="winNext" class="primary-button" type="button">Back to the water</button>
  </div>`;
  $("winNext").addEventListener("click", () => {
    ov.classList.add("hidden");
  });
}

/* v0.21.0 sharknado: single-region unlock overlay. */
function showRegionUnlockSingle(regionId, regionName, flavor) {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  ov.innerHTML = `<div class="phone">
    <div class="phone-head">🗺️ New waters surveyed</div>
    <div class="cert-body">
      <p><strong>${regionName}</strong> — ${flavor}</p>
      <p class="latin">The institute trusts you with farther waters now — and Sarah texted you about it. 📱</p>
    </div>
    <button id="winNext" class="primary-button" type="button">Back to the water</button>
  </div>`;
  $("winNext").addEventListener("click", () => {
    ov.classList.add("hidden");
  });
}

/* v0.13.0: built dynamically so the count can never go stale again. */
function winThread() {
  const n = SHARKS.length;
  return [
    { who: "them", text: "You did it. You tagged all of them." },
    { who: "me", text: `${n} for ${n}. Couldn't have done it without my research assistant.` },
    { who: "them", text: "I'm going to tell everyone I know that my cousin is a real shark scientist. This is the best day." },
    { who: "me", text: "Best day of mine too. 🦈" }
  ];
}

/* v0.16.0: Sarah's celebration — the emotional core of the ending. Calm adult
   voice (v0.12.0): proud and emotional, never a wall of caps. Uses the
   player's ACTUAL first-tagged shark so it lands personally. */
/* v0.16.0 review fix: genuine chronological order for tagged sharks.
   New records carry taggedAt (ms epoch). Old saves fall back to the
   insertion order of state.tagged — for non-integer string keys that IS
   the order each shark was first tagged. Both the Sarah thread and the
   map finale use this same source. */
function taggedChronological() {
  return Object.keys(state.tagged)
    .map((sid, idx) => ({ sid, t: state.tagged[sid], idx }))
    .sort((a, b) => {
      const ta = a.t.taggedAt, tb = b.t.taggedAt;
      if (ta != null && tb != null && ta !== tb) return ta - tb;
      return a.idx - b.idx;
    });
}
function sarahWinThread() {
  const byDate = taggedChronological();
  const ids = byDate.map(e => e.sid);
  const first = byDate[0] || { sid: "nurse", t: { researchId: "??" } };
  const s = sharkById(first.sid) || { name: "shark" };
  const firstName = first.t.name ? `“${first.t.name}”` : first.t.researchId;
  const n = ids.length;
  return [
    { who: "them", text: "Hey. Can we sit with this for a minute?" },
    { who: "me", text: "Of course." },
    { who: "them", text: "When you started, these were species on a list. Do you remember your first one?" },
    { who: "me", text: `${firstName} — the ${s.name.toLowerCase()}. I'll never forget.` },
    { who: "them", text: `And now you know ${n} individual sharks. Not species — individuals. With names, and tracks, and lives they're still living right now.` },
    { who: "me", text: "They're all still out there." },
    { who: "them", text: "They are. You found every one, and then you let every one go. That's the whole thing, isn't it? That's the job." },
    { who: "me", text: "Best job in the world." },
    { who: "them", text: "I'm so proud of you. Don't tell anyone I'm being sentimental — I have a reputation to maintain." },
    { who: "me", text: "Your secret's safe with me. 🦈" }
  ];
}

/* ---------- Win state: a ceremony in four beats (v0.16.0) ----------
   (a) institute recognition, (b) Sarah's celebration, (c) the map finale —
   "they're all still out there" — (d) the acknowledgement.
   Each lands separately — a moment, not a checklist. */
function doWin() {
  state.won = true;
  /* v0.16.0 review fix: the archive unlock is part of the win itself, not
     beat 4. A player who closes mid-ceremony keeps the unlock — beat 4 is
     where they're TOLD about it. */
  state.archiveUnlocked = true;
  try {
    localStorage.setItem("tyi-won", "1");
    localStorage.setItem("tyi-archive", "1");
  } catch {}
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
    /* Beat 1: institute recognition — the formal part. */
    box(`
      <div class="cert-trophy" style="font-size:52px; text-align:center">🏆</div>
      <h2 style="text-align:center; margin:8px 0 2px">Master Shark Tagger</h2>
      <p class="latin" style="text-align:center">Global survey complete — all ${SHARKS.length} species tagged.</p>
      <div class="cert-body">
        <p>This certifies our conservation scientist as a <strong>Master Shark Tagger</strong>, in recognition of ${SHARKS.length} successful tags and ${SHARKS.length} healthy releases.</p>
      </div>
      <button id="winNext" class="primary-button" type="button">Continue</button>`);
    $("winNext").addEventListener("click", () => winStep(2));

  } else if (n === 2) {
    /* Beat 2: the phone buzzes — Sarah has something to say. */
    pushThread(sarahWinThread().map(m => ({ ...m })));
    box(`
      <div class="phone-head buzz-phone">📱 Your phone buzzes…</div>
      <div class="phone-thread win-thread"></div>
      <p class="latin" style="text-align:center; margin:0">Saved in 📱 Phone.</p>
      <button id="winNext" class="primary-button" type="button">Continue</button>`);
    const th = ov.querySelector(".win-thread");
    sarahWinThread().forEach(m => {
      const b = document.createElement("div");
      b.className = "bubble " + m.who;
      b.textContent = m.text;
      th.appendChild(b);
    });
    $("winNext").addEventListener("click", () => winStep(3));

  } else if (n === 3) {
    /* Beat 3: the map finale — "they're all still out there." */
    winMapFinale();

  } else {
    /* Beat 4: the acknowledgement. v0.24.0: the Archive is no longer a
       win-gated reward — it's been growing all game. This beat celebrates
       the completed collection instead. */
    updateArchiveTab();
    renderArchive();
    box(`
      <div class="ack-card" style="margin-top:0">
        <p class="eyebrow">ACKNOWLEDGEMENTS</p>
        <p class="ack-name">For <span>Sarah</span></p>
        <p>who finished Rockhound at 1:26 AM and loves sharks. 🦈</p>
        <p style="margin-top:8px">🖼️ Your Wild Archive is complete — every species you tagged, face to face with the real animal.</p>
      </div>
      <button id="winNext" class="primary-button" type="button">Back to the collection book</button>`);
    $("winNext").addEventListener("click", () => {
      ov.classList.add("hidden");
      /* v1.4.0-beta Mira review (win-path edge case): if the winning tag was
         also a tag-along, go to the map with the fact overlay instead of the
         collection book — the win ceremony keeps its priority. */
      const deferred = state.deferredTagAlong;
      state.deferredTagAlong = null;
      if (deferred) {
        goTab("map");
        setTimeout(() => { try { ensureMapFocusedOn(deferred.speciesId); } catch {} }, 200);
        if (deferred.factInfo) {
          setTimeout(() => showTagAlongFact(deferred.factInfo), 600);
        }
      } else {
        goTab("collection");
      }
    });
  }
}

/* v0.16.0: the map finale. The world map, and one by one, every shark the
   player tagged — track, marker, name — until the ocean is full of them.
   The message isn't "you collected every shark." It's "they're all still
   out there." */
function winMapFinale() {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  const ordered = taggedChronological();
  const n = ordered.length;
  const bmUrl = (typeof BLUE_MARBLE_URL !== "undefined") ? BLUE_MARBLE_URL : "";

  ov.innerHTML = `
    <div class="finale">
      <h2 style="text-align:center; margin:6px 0 2px">They're all still out there.</h2>
      <p class="latin" style="text-align:center; margin:0 0 8px" id="finaleCaption"></p>
      <div class="finale-map" id="finaleMap"></div>
      <div style="display:flex; gap:8px; justify-content:center; margin-top:10px">
        <button id="finaleSkip" class="secondary-button" type="button">Skip</button>
        <button id="finaleNext" class="primary-button hidden" type="button">Continue</button>
      </div>
    </div>`;

  /* v0.16.0 review fix: count = sharks revealed so far. The caption names
     the shark that was JUST revealed (ordered[count - 1]); count 0 is the
     intro state with an empty map. Only the newest marker gets the pop
     animation — earlier ones stay settled instead of re-popping every step. */
  const renderRevealed = (count) => {
    const newIdx = count - 1; // index of the just-revealed shark (-1 when none)
    let svg = `<svg viewBox="0 0 ${MAP_W} ${MAP_H}" role="img" aria-label="World map of all tagged sharks">`
      + `<rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" fill="#0d2f4d"/>`
      + (bmUrl ? `<image href="${bmUrl}" x="0" y="0" width="${MAP_W}" height="${MAP_H}" preserveAspectRatio="none"/>` : ``);
    ordered.slice(0, count).forEach(({ sid, t }, idx) => {
      if (!t.track) t.track = genTrack(sharkById(sid) || { id: "nurse" }, t);
      const color = SPECIES_COLORS[sid] || "#ffffff";
      const pts = mapPoints(t);
      if (pts.length > 1) {
        const path = pts.slice(1);
        const d = path.map((p, i) => (i ? "L" : "M") + p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");
        const archival = t.track.kind === "archival";
        svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="2" opacity="0.85"`
          + (archival ? ` stroke-dasharray="5 4"` : "") + `/>`;
      }
      const last = pts[pts.length - 1];
      if (last) {
        const pop = idx === newIdx ? ` style="animation: finalePop 0.5s ease"` : ``;
        svg += `<g class="finale-marker"${pop}>`
          + `<circle cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="7" fill="${color}" stroke="#fff" stroke-width="2"/>`
          + `</g>`;
      }
    });
    svg += `</svg>`;
    $("finaleMap").innerHTML = svg;
    const cap = $("finaleCaption");
    if (count === 0) {
      cap.textContent = "";
    } else if (count < n) {
      const { sid, t } = ordered[count - 1];
      const s = sharkById(sid);
      const nm = t.name ? `\u201c${t.name}\u201d` : t.researchId;
      cap.textContent = `${nm} — ${s ? s.name : sid}  (${count} / ${n})`;
    } else {
      cap.textContent = `${n} sharks. ${n} releases. All still swimming.`;
    }
  };

  let revealed = 0, done = false;
  renderRevealed(0);
  const finish = () => {
    if (done) return;
    done = true;
    clearInterval(timer);
    revealed = n;
    renderRevealed(n);
    $("finaleSkip").classList.add("hidden");
    $("finaleNext").classList.remove("hidden");
  };
  const timer = setInterval(() => {
    revealed++;
    if (revealed >= n) { finish(); return; } // finish() renders the final state once
    renderRevealed(revealed);
  }, 650);
  $("finaleSkip").addEventListener("click", finish);
  $("finaleNext").addEventListener("click", () => winStep(4));
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

/* v0.23.0: real-shark easter eggs. Called on rename/tag.
   - Mary Lee / Nicole: great white + matching name → Sarah thread (immediate)
   - Bruce: any shark + "bruce" → starts SLOW chain (no immediate message!)
   - Deep Blue: RETIRED per Avery's decision 2026-10-08 (was on hold per Mira).
     Do not implement — the great-white naming easter eggs stay Mary Lee and Nicole only. */
function maybeNameEgg(speciesId, rec) {
  /* v1.5.2-beta: defensive guards — the Mary Lee/Nicole easter eggs must never
     crash the game, even if thread data or pushThread is unavailable. */
  try {
    if (!rec || !rec.name) return;
    if (typeof pushThread !== "function") return;
    const name = rec.name.trim().toLowerCase();
    const s = typeof sharkById === "function" ? sharkById(speciesId) : null;

    // Mary Lee: great white only
    if (speciesId === "greatwhite" && name === "mary lee" && !rec.maryLeeEgg) {
      if (typeof MARY_LEE_THREAD === "undefined" || !Array.isArray(MARY_LEE_THREAD)) return;
      rec.maryLeeEgg = true;
      store.save(state.tagged);
      pushThread(MARY_LEE_THREAD.map(m => ({ ...m })));
      return;
    }
    // Nicole: great white only
    if (speciesId === "greatwhite" && name === "nicole" && !rec.nicoleEgg) {
      if (typeof NICOLE_THREAD === "undefined" || !Array.isArray(NICOLE_THREAD)) return;
      rec.nicoleEgg = true;
      store.save(state.tagged);
      pushThread(NICOLE_THREAD.map(m => ({ ...m })));
      return;
    }
    // Bruce: ANY shark. No immediate message — the slow chain begins silently.
    if (name === "bruce" && !state.bruceEgg && !state.bruceChainComplete) {
      state.bruceEgg = { stage: 0, sharkId: speciesId, started: Date.now(), lastAdvance: 0, expeditionsAtStage: state.stats.expeditions || 0 };
      try { localStorage.setItem("tyi-bruce", JSON.stringify(state.bruceEgg)); } catch {}
      // Deliberately no pushThread here. Sarah will notice... eventually.
    }
  } catch (e) {
    /* v1.5.2-beta: never let an easter egg crash naming — log and continue. */
    if (typeof console !== "undefined" && console.warn) console.warn("maybeNameEgg:", e);
  }
}

/* v0.23.0: advance the Bruce chain. Called on expedition completion and game
   load. Stages are spaced: at least 2 expeditions OR 12 hours between stages,
   so it unfolds slowly over multiple sessions. */
function advanceBruceChain() {
  if (!state.bruceEgg || state.bruceChainComplete) return;
  if (typeof BRUCE_CHAIN === "undefined") return;
  const now = Date.now();
  const expeditionsSince = (state.stats.expeditions || 0) - (state.bruceEgg.expeditionsAtStage || 0);
  const hoursSince = (now - (state.bruceEgg.lastAdvance || state.bruceEgg.started)) / 3600000;
  // Need either 2+ expeditions or 12+ hours since last stage
  if (expeditionsSince < 2 && hoursSince < 12) return;

  const stage = state.bruceEgg.stage;
  if (stage >= BRUCE_CHAIN.length) {
    // Chain complete — unlock hidden achievement
    state.bruceChainComplete = true;
    try {
      localStorage.setItem("tyi-bruce-done", "1");
      localStorage.removeItem("tyi-bruce");
    } catch {}
    state.bruceEgg = null;
    checkAchievements(); // Bruce achievement check uses st.bruceChainComplete
    return;
  }

  // Push this stage's messages. v0.23.0: personalize {species} with the
  // player's Bruce, so the history attaches to THEIR shark, not a lecture.
  let bruceSpecies = "shark";
  try {
    const bs = sharkById(state.bruceEgg.sharkId);
    if (bs && bs.name) bruceSpecies = bs.name.toLowerCase();
  } catch {}
  pushThread(BRUCE_CHAIN[stage].map(m => ({
    who: m.who,
    text: String(m.text).split("{species}").join(bruceSpecies)
  })));
  state.bruceEgg.stage = stage + 1;
  state.bruceEgg.lastAdvance = now;
  state.bruceEgg.expeditionsAtStage = state.stats.expeditions || 0;
  // If that was the final stage, complete the chain NOW (not on a later call)
  if (state.bruceEgg.stage >= BRUCE_CHAIN.length) {
    state.bruceChainComplete = true;
    try {
      localStorage.setItem("tyi-bruce-done", "1");
      localStorage.removeItem("tyi-bruce");
    } catch {}
    state.bruceEgg = null;
    checkAchievements();
    return;
  }
  try { localStorage.setItem("tyi-bruce", JSON.stringify(state.bruceEgg)); } catch {}
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
  /* v1.4.2: count lives in the page header now, not the tab */
  const ccHead = $("collectionCountHead");
  if (ccHead) ccHead.innerHTML = `<strong>${ids.length}</strong> of <strong>${SHARKS.length}</strong> species tagged`;

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
      <div class="shark-art">${sharkArtImg(s.id, "illustration", s.name)}</div>
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
    <p class="latin">Tag Along — field program</p>
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
    <div class="shark-art">${sharkArtImg(s.id, "illustration", s.name)}</div>
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
    ${t.resightings && t.resightings.length ? `
    <div class="resight-block">
      <h4>🔁 Re-sightings (${t.resightings.length})</h4>
      <ul class="track-stops">
        ${t.resightings.map(r => `<li>📍 ${esc(r.date)} — ${esc(r.location)}<br><span class="dim">${esc(r.note)}</span></li>`).join("")}
      </ul>
    </div>` : ""}
    ${t.notes && t.notes.length ? `
    <div class="watch-notes-block">
      <h4>📓 Field notes from watching (${t.notes.length})</h4>
      <ul class="track-stops">
        ${t.notes.map(n => `<li>👁️ ${esc(n)}</li>`).join("")}
      </ul>
    </div>` : ""}
    ${(() => {
      /* v1.4.0-beta: show unlocked tag-along facts in the collection detail. */
      const unlocked = state.unlockedFacts[id] || [];
      const pool = (typeof SECRET_FACTS !== "undefined" && SECRET_FACTS[id]) || [];
      const shown = unlocked.map(i => pool[i]).filter(Boolean);
      if (!shown.length) return "";
      return `<div class="secret-facts-block">
        <h4>🔬 Tag-along insights (${shown.length}/${pool.length})</h4>
        <ul class="track-stops">
          ${shown.map(f => `<li>🔬 ${esc(f)}</li>`).join("")}
        </ul>
      </div>`;
    })()}
    <p class="hook">💡 ${s.hook}</p>
    <p class="bonus-fact">✨ ${s.bonus}</p>
    ${s.conservation ? `<p class="conservation-note">🌊 <strong>Conservation:</strong> ${s.conservation}</p>` : ""}
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
    maybeNameEgg(id, t); // v0.23.0: Mary Lee / Nicole / Bruce
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
    <span class="dim">${esc(tr.hypothetical ? "Hypothetical movement scenario — this route illustrates plausible long-range movement for a migratory species, not a reconstruction of this individual's tracked journey." : tr.kind === "archival" ? "Illustrative habitat-based movement scenario. These plotted positions are not actual detections of this individual." + (s.id === "sawshark" ? " (Pop-up satellite archival tags have been deployed on common sawsharks off Tasmania — Burke et al. 2020.)" : "") : (TRACK_KIND_NOTES[tr.kind] || TRACK_KIND_NOTES.satellite))}</span></p>
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
/* v0.20.0 Mira review fix: tyi-pinned and tyi-pace belong to full reset. */
const RESET_KEYS = ["tyi-collection", "tyi-messages", "tyi-won", "tyi-archive", "tyi-idseq", "tyi-sightings", "tyi-regions", "tyi-logbook", "tyi-stats", "tyi-achievements", "tyi-pinned", "tyi-pace", "tyi-last-seen-version", "tyi-bruce", "tyi-bruce-done", "tyi-facts", "tyi-pending-celebrations", "tyi-reunion-reacted"]; // v1.4.0-beta: +tyi-facts; v1.5.3-beta: +tyi-pending-celebrations, +tyi-reunion-reacted

/* v0.23.0: save export/import for the public beta. */
function exportSave() {
  const data = { version: VERSION, exportedAt: new Date().toISOString(), keys: {} };
  RESET_KEYS.forEach(k => {
    try {
      const v = localStorage.getItem(k);
      if (v !== null) data.keys[k] = v;
    } catch {}
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const aEl = document.createElement("a");
  aEl.href = url;
  aEl.download = "tag-along-save-" + VERSION + ".json";
  document.body.appendChild(aEl);
  aEl.click();
  setTimeout(() => { document.body.removeChild(aEl); URL.revokeObjectURL(url); }, 100);
}
/* v0.23.0 Mira review: safe import — validate everything BEFORE touching
   storage, replace the complete key set (clear missing keys), and back up
   the existing save first. */
/* v0.23.0 Mira review: strict validation. Reject anything questionable —
   this is player data going into a public beta. */
const SAVE_KEY_ALLOWLIST = [...RESET_KEYS, "tyi-bruce", "tyi-bruce-done"];
function validateSaveData(data) {
  if (!data || typeof data !== "object") return { ok: false, reason: "not an object" };
  if (!data.keys || typeof data.keys !== "object") return { ok: false, reason: "missing keys" };
  const keyNames = Object.keys(data.keys);
  // Must have at least one recognized key with actual content
  if (keyNames.length === 0) return { ok: false, reason: "empty save (no keys)" };
  // Reject ALL unknown keys
  const unknown = keyNames.filter(k => !SAVE_KEY_ALLOWLIST.includes(k));
  if (unknown.length > 0) return { ok: false, reason: "unrecognized keys: " + unknown.slice(0, 3).join(", ") };
  // Validate shapes, not just JSON parsing
  for (const [k, v] of Object.entries(data.keys)) {
    if (typeof v !== "string") return { ok: false, reason: "non-string value for " + k };
    if (k === "tyi-collection" && v) {
      let parsed;
      try { parsed = JSON.parse(v); } catch { return { ok: false, reason: "invalid JSON in tyi-collection" }; }
      if (typeof parsed !== "object" || Array.isArray(parsed) || parsed === null)
        return { ok: false, reason: "tyi-collection must be an object" };
      // Each record must be a proper shark entry (protects migrateIds())
      for (const [sid, rec] of Object.entries(parsed)) {
        if (rec === null || typeof rec !== "object" || Array.isArray(rec))
          return { ok: false, reason: "tyi-collection[" + sid + "] is not a shark record" };
        if (rec.tagged === true && (typeof rec.researchId !== "string" || !rec.researchId))
          return { ok: false, reason: "tyi-collection[" + sid + "] missing researchId" };
      }
    }
    if (k === "tyi-logbook" && v) {
      let parsed;
      try { parsed = JSON.parse(v); } catch { return { ok: false, reason: "invalid JSON in tyi-logbook" }; }
      if (!Array.isArray(parsed)) return { ok: false, reason: "tyi-logbook must be an array" };
      for (let i = 0; i < parsed.length; i++) {
        const t = parsed[i];
        if (t === null || typeof t !== "object")
          return { ok: false, reason: "tyi-logbook[" + i + "] is not a trip record" };
        // Essential fields the rendering path depends on
        if (!Array.isArray(t.encounters))
          return { ok: false, reason: "tyi-logbook[" + i + "] missing encounters" };
        for (let j = 0; j < t.encounters.length; j++) {
          const e = t.encounters[j];
          if (e === null || typeof e !== "object")
            return { ok: false, reason: "tyi-logbook[" + i + "].encounters[" + j + "] invalid" };
        }
      }
    }
    if (k === "tyi-messages" && v) {
      let parsed;
      try { parsed = JSON.parse(v); } catch { return { ok: false, reason: "invalid JSON in tyi-messages" }; }
      // saveMsgs() stores an object with a messages array inside
      if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed))
        return { ok: false, reason: "tyi-messages must be an object" };
      if (!Array.isArray(parsed.messages))
        return { ok: false, reason: "tyi-messages.messages must be an array" };
      // Each thread: modern { ts, msgs } object OR legacy bare-array (normThread handles both)
      for (let i = 0; i < parsed.messages.length; i++) {
        const t = parsed.messages[i];
        let msgs;
        if (Array.isArray(t)) msgs = t;  // legacy bare-array thread
        else if (t !== null && typeof t === "object" && Array.isArray(t.msgs)) msgs = t.msgs;
        else return { ok: false, reason: "tyi-messages.messages[" + i + "] invalid" };
        // Each message entry must be an object
        for (let j = 0; j < msgs.length; j++) {
          if (msgs[j] === null || typeof msgs[j] !== "object")
            return { ok: false, reason: "tyi-messages.messages[" + i + "][" + j + "] invalid" };
        }
      }
    }
    if (k === "tyi-stats" && v) {
      let parsed;
      try { parsed = JSON.parse(v); } catch { return { ok: false, reason: "invalid JSON in tyi-stats" }; }
      if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed))
        return { ok: false, reason: "tyi-stats must be an object" };
      // regionsVisited is used with .includes() — must be array or absent
      if ("regionsVisited" in parsed && !Array.isArray(parsed.regionsVisited))
        return { ok: false, reason: "tyi-stats.regionsVisited must be an array" };
    }
  }
  // Version: must be a recognized Tag Along version, else reject
  const fv = data.version || "unknown";
  /* v1.4.0-beta Mira review (blocker 3): accept the 1.x beta lineage so
     exported v1.3.x playtest saves import cleanly. */
  const supported = /^v0\.(1[0-9]|2[0-3])\./.test(fv) || /^v1\.\d+\.\d+-beta$/.test(fv) || fv === VERSION;
  if (!supported) return { ok: false, reason: "unsupported version: " + fv };
  // Progress-bearing payload: importing tyi-pace alone would wipe the collection
  const hasProgress = ["tyi-collection", "tyi-logbook", "tyi-won"].some(k => {
    const v = data.keys[k];
    return typeof v === "string" && v.length > 2 && v !== "{}" && v !== "[]" && v !== "null";
  });
  if (!hasProgress) return { ok: false, reason: "no actual progress in save" };
  return { ok: true, version: fv };
}
/* v0.23.0 Mira review: snapshot returns the data AND whether it worked.
   We verify the backup before claiming it exists. */
function snapshotCurrentSave() {
  const snap = {};
  try {
    SAVE_KEY_ALLOWLIST.forEach(k => {
      const v = localStorage.getItem(k);
      if (v !== null) snap[k] = v;
    });
    return { ok: true, snap };
  } catch (e) {
    return { ok: false };
  }
}
function restoreSnapshot(snap, storage) {
  const s = storage || (typeof localStorage !== "undefined" ? localStorage : null);
  if (!s) return false;
  try {
    SAVE_KEY_ALLOWLIST.forEach(k => {
      if (k in snap) s.setItem(k, snap[k]);
      else s.removeItem(k);
    });
    return true;
  } catch { return false; }
}
/* v0.23.0 Mira review: storage replacement as a testable unit.
   storage defaults to localStorage but tests can inject a failing stub. */
function replaceSaveKeys(keys, storage) {
  const s = storage || (typeof localStorage !== "undefined" ? localStorage : null);
  if (!s) throw new Error("no storage");
  SAVE_KEY_ALLOWLIST.forEach(k => {
    if (k in keys) s.setItem(k, keys[k]);
    else s.removeItem(k);
  });
}
function importSave(file) {
  const reader = new FileReader();
  reader.onload = () => {
    let data;
    try { data = JSON.parse(reader.result); }
    catch { alert("Couldn't read that file. Is it a valid Tag Along save?"); return; }
    // Validate BEFORE touching storage
    const check = validateSaveData(data);
    if (!check.ok) {
      alert("That save file looks incompatible (" + check.reason + "). Nothing was changed.");
      return;
    }
    let msg = "Import this save? Your current progress will be replaced.\n\n";
    msg += "File version: " + check.version + "\nCurrent version: " + VERSION;
    msg += "\n\nYou'll be offered a backup download first.";
    if (!confirm(msg)) return;
    // Snapshot current progress BEFORE touching anything
    const before = snapshotCurrentSave();
    if (!before.ok) {
      alert("Couldn't read your current save. Import cancelled — nothing was changed.");
      return;
    }
    // Offer backup download (accessible recovery, not just a hidden key)
    const backupBlob = new Blob([JSON.stringify({ version: VERSION, exportedAt: new Date().toISOString(), keys: before.snap }, null, 2)], { type: "application/json" });
    const backupUrl = URL.createObjectURL(backupBlob);
    const backupA = document.createElement("a");
    backupA.href = backupUrl;
    backupA.download = "tag-along-backup-" + VERSION + ".json";
    document.body.appendChild(backupA);
    backupA.click();
    setTimeout(() => { document.body.removeChild(backupA); URL.revokeObjectURL(backupUrl); }, 100);
    // Also keep a hidden copy
    try { localStorage.setItem("tyi-backup", JSON.stringify({ version: VERSION, keys: before.snap })); } catch {}
    // Replace complete key set with true rollback on failure
    try {
      replaceSaveKeys(data.keys);
    } catch (e) {
      // Roll back to the snapshot
      const restored = restoreSnapshot(before.snap);
      alert(restored
        ? "Import failed — your previous save has been restored."
        : "Import failed and rollback also failed. If the backup download completed, that file has your data — otherwise your previous progress may be lost.");
      return;
    }
    location.reload();
  };
  reader.readAsText(file);
}
// Wire up buttons (after DOM ready — these run at script load, elements exist)
(function initSaveButtons() {
  const ex = document.getElementById("exportBtn");
  if (ex) ex.addEventListener("click", exportSave);
  const im = document.getElementById("importBtn");
  const fi = document.getElementById("importFile");
  if (im && fi) {
    im.addEventListener("click", () => fi.click());
    fi.addEventListener("change", () => {
      if (fi.files && fi.files[0]) importSave(fi.files[0]);
      fi.value = ""; // reset so the same file can be picked again
    });
  }
})();
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
  renderLogbook();
  renderMessages();
  updateMsgBadge();
  updateArchiveTab();
  if (state.archiveUnlocked) renderArchive();
  renderSarahAsk();
  renderAchievements(); // v0.18.0
  renderExpeditionPin(); // v0.20.0
  renderPinHint(); // v0.22.0
  /* v0.20.0: restore quick-pace preference (the change listener is bound
     once at init — Mira review fix: binding it here accumulated listeners
     on every renderAll). */
  const qp = $("quickPace");
  if (qp) {
    let saved = false;
    try { saved = localStorage.getItem("tyi-pace") === "quick"; } catch {}
    qp.checked = saved;
    if (saved) setPace(true);
  }
}

/* v0.20.0: Wild Archive UI lives in archive-ui.js (module split). */
/* v0.16.0 review fix: pre-v0.16 winners never run doWin() again, so a
   completed v0.14 save boots with won=true, a full roster, and no archive
   unlock. Backfill the unlock they already earned.
   v0.24.0 Mira review: ANY returning player with ≥1 tag gets Archive access,
   not just winners. New players get the Sarah intro on their first tag;
   returning players get quiet access (no first-tag message). */
function migrateArchiveUnlock() {
  try {
    const taggedCount = Object.keys(state.tagged).length;
    if (taggedCount >= 1 && !state.archiveUnlocked) {
      state.archiveUnlocked = true;
      localStorage.setItem("tyi-archive", "1");
    }
  } catch {}
}
/* v0.22.0 Mira review: capture pre-migration storage state for What's New.
   Migrations write keys (e.g. tyi-collection) even for new players, so we
   snapshot before they run. */
const preMigrationHadSave = (() => {
  try {
    const log = localStorage.getItem("tyi-logbook");
    const col = localStorage.getItem("tyi-collection");
    // Meaningful data: non-empty logbook, or collection with actual sharks
    if (log && log !== "[]") return true;
    if (col && col !== "{}" && col !== "null") {
      try { return Object.keys(JSON.parse(col)).length > 0; } catch { return false; }
    }
    return !!localStorage.getItem("tyi-stats");
  } catch { return false; }
})();
migrateIds();
migrateTracks();
migrateWinV07();
migrateArchiveUnlock();
fillRegions();
fillSelect($("depthSelect"), DEPTHS);
fillSelect($("baitSelect"), BAITS);
function updateVisual(selectId) {
  const el = document.getElementById(selectId.replace(/Select$/, "Visual"));
  if (!el) return;
  const icon = (PICK_ICONS[selectId] || {})[$(selectId).value];
  el.innerHTML = icon === "dot:ray" ? '<span class="pick-dot"></span>' : (icon || "");
}
function updateAllVisuals() {
  ["regionSelect", "depthSelect", "baitSelect", "methodSelect", "methodOptSelect"].forEach(updateVisual);
}

/* v0.9.0: Method is two selects — the top-level approach, then its
   sub-menu of real field practices.
   v0.9.1: progressive disclosure — the sub-menu row stays hidden until a
   Method is actually picked. Launching with no method keeps the old
   graceful default (neutral, no boost); the sub-menu simply never shows. */
(function initMethodSelects() {
  const mSel = $("methodSelect"), oSel = $("methodOptSelect"), field = $("methodOptField");
  mSel.innerHTML = "";
  const ph = document.createElement("option");
  ph.value = ""; ph.textContent = "Choose a method…";
  mSel.appendChild(ph);
  Object.entries(METHODS).forEach(([id, m]) => {
    const o = document.createElement("option");
    o.value = id; o.textContent = m.name;
    mSel.appendChild(o);
  });
  const fillOpts = () => {
    const m = METHODS[mSel.value];
    if (!m) {
      field.classList.add("hidden");
      oSel.innerHTML = "";
      updateVisual("methodOptSelect");
      return;
    }
    field.classList.remove("hidden");
    $("methodOptLabel").textContent = m.subLabel;
    oSel.innerHTML = "";
    Object.entries(m.opts).forEach(([id, label]) => {
      const o = document.createElement("option");
      o.value = id; o.textContent = label;
      oSel.appendChild(o);
    });
    updateVisual("methodOptSelect");
  };
  mSel.addEventListener("change", () => { fillOpts(); updateVisual("methodSelect"); renderPinHint(); });
  oSel.addEventListener("change", () => updateVisual("methodOptSelect"));
  ["regionSelect", "depthSelect", "baitSelect"].forEach(id =>
    $(id).addEventListener("change", () => { updateVisual(id); renderPinHint(); }));
  fillOpts();
  updateAllVisuals();
})();
/* v0.22.0: re-render the pin hint when the Expedition tab opens (plan may
   have been restored via repeat-plan) and when pinning changes. */
(function initPinHint() {
  const tab = document.querySelector('[data-tab="expedition"]');
  if (tab) tab.addEventListener("click", () => setTimeout(renderPinHint, 50));
})();
/* v0.10.0: map toolbar — zoom controls + currents toggle (static HTML).
   Guarded lookups: if this script ever loads against older HTML, the game
   boots fine and the map simply renders without the toolbar. */
const onMapBtn = (id, fn) => { const b = $(id); if (b) b.addEventListener("click", fn); };
onMapBtn("mapZoomIn", () => { mapFocusClear(); mapZoom = Math.min(MAP_ZOOM_MAX, mapZoom * 1.5); renderMap(); });
onMapBtn("mapZoomOut", () => {
  mapFocusClear();
  mapZoom = Math.max(MAP_ZOOM_MIN, mapZoom / 1.5);
  if (mapZoom === MAP_ZOOM_MIN) { mapCX = MAP_W / 2; mapCY = MAP_H / 2; }
  renderMap();
});
onMapBtn("mapZoomReset", () => { mapFocusClear(); mapZoom = 1; mapCX = MAP_W / 2; mapCY = MAP_H / 2; renderMap(); });
onMapBtn("mapCurrentsToggle", () => { mapCurrentsOn = !mapCurrentsOn; renderMap(); });
/* v0.10.2: shared zoom helper — re-centers on the pointer's map position,
   then applies the new zoom (clamped). Used by wheel; buttons use the
   fixed-step zoom below. (v0.15.0: pinch removed.) */
let suppressMarkerClick = false;
let mapRenderQueued = false;
function requestMapRender() {
  /* rAF-throttle so pinch/pan stay smooth on phones; direct render where
     requestAnimationFrame doesn't exist (tests, old webviews). */
  if (typeof requestAnimationFrame === "function") {
    if (mapRenderQueued) return;
    mapRenderQueued = true;
    requestAnimationFrame(() => { mapRenderQueued = false; renderMap(); });
  } else {
    renderMap();
  }
}
function mapZoomAt(clientX, clientY, newZoom) {
  const svgEl = $("worldMapSvg");
  if (!svgEl) return;
  const r = svgEl.getBoundingClientRect(), vb = mapViewBox();
  /* Anchor-preserving zoom (v0.10.2 review fix): the map point under the
     pointer must stay under the same screen spot after zooming. Record the
     pointer's normalized position in the OLD viewBox, then re-anchor the
     new viewBox so that same map point sits at the same normalized spot.
     (The old code made the pointer's point the new CENTER, so the map
     jumped toward the pinch midpoint.) */
  const nx = (clientX - r.left) / r.width, ny = (clientY - r.top) / r.height;
  const px = vb.x + nx * vb.w, py = vb.y + ny * vb.h;
  mapZoom = Math.min(MAP_ZOOM_MAX, Math.max(MAP_ZOOM_MIN, newZoom));
  if (mapZoom === MAP_ZOOM_MIN) { mapCX = MAP_W / 2; mapCY = MAP_H / 2; }
  else {
    const w2 = MAP_W / mapZoom, h2 = MAP_H / mapZoom;
    mapCX = px - nx * w2 + w2 / 2;
    mapCY = py - ny * h2 + h2 / 2;
  }
  mapFocusClear(); // manual zoom breaks the tap-focus toggle contract
  requestMapRender();
}
/* v0.11.0: tap-a-marker focus. Tapping a shark marker (or its legend chip)
   glides the map to that shark's latest ping at ~3x and centers on it;
   tapping the same marker again glides back to the saved view. Hopping to
   a different marker glides straight there, keeping the original restore
   view. The zoom is programmatic, so it behaves identically in normal and
   explore mode — no gesture-ownership issues. Any manual map move cancels
   the glide and clears the focus: the toggle only promises "back to where
   you were" while the app still owns the view. */
const MAP_FOCUS_ZOOM = 3, MAP_FOCUS_MS = 500;
let mapGlide = null;  // in-flight animation token; replaced to cancel
let mapFocus = null;  // { sid, prevZoom, prevCX, prevCY } | null
function mapGlideCancel() { mapGlide = null; }
function mapFocusClear() { mapGlideCancel(); mapFocus = null; }
function mapGlideTo(x, y, z, ms) {
  mapGlideCancel();
  const dur = ms || MAP_FOCUS_MS;
  const now0 = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
  const anim = { fz: mapZoom, fcx: mapCX, fcy: mapCY, tz: z, tcx: x, tcy: y, t0: now0, dur };
  mapGlide = anim;
  const step = now => {
    if (mapGlide !== anim) return; // superseded or cancelled
    const t = Math.min(1, (now - anim.t0) / anim.dur);
    const e = 1 - Math.pow(1 - t, 3); // ease-out cubic: fast launch, soft landing
    mapZoom = anim.fz + (anim.tz - anim.fz) * e;
    mapCX = anim.fcx + (anim.tcx - anim.fcx) * e;
    mapCY = anim.fcy + (anim.tcy - anim.fcy) * e;
    renderMap(); // direct render: the glide IS the frame budget
    if (t < 1) requestAnimationFrame(step);
    else mapGlide = null;
  };
  if (typeof requestAnimationFrame === "function") requestAnimationFrame(step);
  else { mapZoom = z; mapCX = x; mapCY = y; mapGlide = null; renderMap(); }
}
function mapFocusOn(sid) {
  const t = state.tagged[sid];
  if (!t) return;
  const pts = mapPoints(t);
  if (!pts.length) return;
  if (mapFocus && mapFocus.sid === sid) {
    const f = mapFocus; mapFocus = null; // toggle: back to the saved view
    mapGlideTo(f.prevCX, f.prevCY, f.prevZoom);
    return;
  }
  if (!mapFocus) mapFocus = { sid, prevZoom: mapZoom, prevCX: mapCX, prevCY: mapCY };
  else mapFocus.sid = sid;
  const last = pts[pts.length - 1]; // latest ping: where the shark "is"
  mapGlideTo(last.x, last.y, MAP_FOCUS_ZOOM);
}
/* v1.4.0-beta Mira review: non-toggling focus for the follow/tag-along
   completion path. mapFocusOn() toggles (a second tap glides back out), but
   following the same shark twice must NOT zoom away from it. Manual map taps
   keep using mapFocusOn(). */
function ensureMapFocusedOn(sid) {
  const t = state.tagged[sid];
  if (!t) return;
  const pts = mapPoints(t);
  if (!pts.length) return;
  if (mapFocus && mapFocus.sid === sid) return; // already focused — don't toggle away
  if (!mapFocus) mapFocus = { sid, prevZoom: mapZoom, prevCX: mapCX, prevCY: mapCY };
  else mapFocus.sid = sid;
  const last = pts[pts.length - 1]; // latest ping: where the shark "is"
  mapGlideTo(last.x, last.y, MAP_FOCUS_ZOOM);
}
/* Mouse-wheel zoom, centered on the pointer. preventDefault stops the page
   scrolling while the pointer is over the map (standard map-widget behavior). */
const mapWrapEl = $("worldMapWrap");
if (mapWrapEl) mapWrapEl.addEventListener("wheel", e => {
  e.preventDefault();
  mapZoomAt(e.clientX, e.clientY, mapZoom * (e.deltaY > 0 ? 1 / 1.3 : 1.3));
}, { passive: false });
/* v0.15.0: touchscreen gestures — one-finger pan when zoomed, nothing else.
   Pointer Events give one code path for mouse and touch. Move/up/cancel
   listen on window so a finger sliding off the map can't strand a pointer.
   Pinch-to-zoom and explore mode are gone: zoom is +/- buttons (and wheel
   on desktop) only. At 1x the browser owns one-finger drags (touch-action:
   pan-y, so the page scrolls); zoomed in, the map takes them (touch-action:
   none, set by renderMap before any touch begins). */
(function initMapGestures() {
  const wrap = $("worldMapWrap");
  if (!wrap || typeof window === "undefined") return;
  const pts = new Map(); // pointerId -> {x, y}
  let panX = 0, panY = 0, downX = 0, downY = 0, movedMax = 0;
  wrap.addEventListener("pointerdown", e => {
    suppressMarkerClick = false; // a stale flag never eats a real tap
    mapGlideCancel(); // grabbing the map mid-glide hands control to the hand
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) {
      downX = panX = e.clientX; downY = panY = e.clientY;
      movedMax = 0;
    }
  });
  window.addEventListener("pointermove", e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (e.pointerType !== "mouse" && pts.size === 1) {
      movedMax = Math.max(movedMax, Math.hypot(e.clientX - downX, e.clientY - downY));
      if (mapZoom > 1 && movedMax > 10) {
        e.preventDefault();
        mapFocusClear(); // a real pan breaks the tap-focus toggle contract
        const svgEl = $("worldMapSvg");
        if (svgEl) {
          const r = svgEl.getBoundingClientRect(), vb = mapViewBox();
          mapCX -= (e.clientX - panX) / r.width * vb.w;
          mapCY -= (e.clientY - panY) / r.height * vb.h;
          requestMapRender();
        }
      }
      panX = e.clientX; panY = e.clientY;
    }
  }, { passive: false });
  const endPointer = e => {
    pts.delete(e.pointerId);
    if (pts.size === 0) {
      if (movedMax > 10) suppressMarkerClick = true;
    } else if (pts.size === 1) {
      // A lifted finger during an (unsupported) two-finger touch collapses
      // back into a normal one-finger pan: re-anchor the remaining finger
      // so the map doesn't jump from its older position.
      const p = [...pts.values()][0];
      downX = panX = p.x;
      downY = panY = p.y;
      movedMax = 0;
    }
  };
  window.addEventListener("pointerup", endPointer);
  window.addEventListener("pointercancel", endPointer);
})();
$("buildTag").textContent = VERSION;
/* v0.22.0: What's New — show once per version update for returning players. */
/* v0.23.0: Bruce chain can also advance on game load (time-based). */
setTimeout(() => { try { advanceBruceChain(); } catch {} }, 5000);
(function initWhatsNew() {
  const notes = WHATS_NEW[VERSION];
  if (!notes || !shouldShowWhatsNew(whatsNewSeen(), VERSION, preMigrationHadSave)) {
    markWhatsNewSeen();
    return;
  }
  const c = $("whatsNewContent");
  c.innerHTML = `
    <div class="cert-trophy" style="font-size:40px">🎉</div>
    <h3 style="margin:6px 0 0">What's new in ${esc(VERSION)}</h3>
    <p class="latin">Tag Along — field program updates</p>
    <ul class="whats-new-list">
      ${notes.map(n => `<li>${n}</li>`).join("")}
    </ul>`;
  $("whatsNewOverlay").classList.remove("hidden");
  $("whatsNewClose").addEventListener("click", () => {
    $("whatsNewOverlay").classList.add("hidden");
    markWhatsNewSeen();
  });
})();
const tickPhoneClock = () => {
  $("phoneTime").textContent =
    new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
};
tickPhoneClock();
/* v0.17.1: the phone clock ticks — refresh every 30s so it never goes stale
   next to message timestamps. */
setInterval(tickPhoneClock, 30000);
/* v1.4.0: living caustics — each ribbon reappears at a new horizontal
   position after its lifecycle completes. The reposition fires on
   animationiteration, while the ribbon is in its invisible tail, so the
   jump is never seen. Skipped under prefers-reduced-motion (CSS already
   freezes the ribbons there). */
/* v1.4.1: sun-ray caustics — each ray gets a fresh fan angle after its
   lifecycle completes, so rays keep fanning from the sun point at new
   angles. Fires on animationiteration, while the ray is in its invisible
   tail, so the jump is never seen. Each ray keeps its own lane (home angle
   from CSS) with a small jitter, so the fan stays spread across the screen.
   Skipped under prefers-reduced-motion (CSS freezes the rays there).
   v1.4.17: restored after the v1.4.16 conic fan broke iPad layout. */
(function initCaustics() {
  if (typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.caustics span').forEach(sp => {
    const home = parseFloat(getComputedStyle(sp).getPropertyValue('--ray-angle')) || 0;
    sp.dataset.homeAngle = home;
    sp.addEventListener('animationiteration', () => {
      const jitter = Math.random() * 16 - 8;
      sp.style.setProperty('--ray-angle',
        (parseFloat(sp.dataset.homeAngle) + jitter).toFixed(1) + 'deg');
    });
  });
})();
/* v0.19.0: field-guide database controls. */
(function initGuideTools() {
  const search = $("guideSearch");
  if (search) search.addEventListener("input", () => {
    guideFilters.q = search.value.trim();
    renderResearch();
  });
  const toggle = $("filterToggle");
  const panel = $("filterPanel");
  const closeSheet = () => {
    panel.classList.add("hidden");
    panel.classList.remove("open-sheet");
    toggle.setAttribute("aria-expanded", "false");
  };
  if (toggle && panel) toggle.addEventListener("click", () => {
    const open = panel.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", String(!open));
    /* Mobile bottom sheet. */
    panel.classList.toggle("open-sheet", !open && window.innerWidth <= 640);
  });
  const sheetClose = $("sheetClose");
  if (sheetClose) sheetClose.addEventListener("click", closeSheet);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel && !panel.classList.contains("hidden")) closeSheet();
  });
  const clr = $("guideClear");
  if (clr) clr.addEventListener("click", clearGuideFilters);
  /* v0.20.0: quick-pace listener bound once at init (never in renderAll). */
  const qp = $("quickPace");
  if (qp) qp.addEventListener("change", () => setPace(qp.checked));
})();
initCreatureArt(); // v0.26.0: fill CREATURE_ART with WebP shadow sprites
renderAll();
/* v1.5.0-beta Mira review (blocking): recover celebrations lost to a reload
   before trip end. Clear the persisted copy FIRST (idempotent — a crash
   mid-flush can't double-deliver), then flush once. */
function recoverPendingCelebrations() {
  const saved = celebrationStore.load();
  if (saved && saved.length > 0) {
    celebrationStore.clear();
    state.pendingCelebrations = saved;
    flushPendingCelebrations();
  }
}
recoverPendingCelebrations();
showPorthole(); // v1.4.2: observation window always present — porthole surface when idle
/* v0.18.0 review: one achievement check at boot so migrated saves backfill. */
checkAchievements();
