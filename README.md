# Tag, You're It

**v0.8.0** (working title — final title to be decided later, as Rockhound was "Rock Go Crunch" until beta)

A pro-shark conservation collection game.

You are a conservation scientist. Research each shark's habits, plan an
expedition (region, depth, bait, scent), head out to sea, and tag one of every
species for your official collection book. Less *Jaws*, more careful field
science.

Built for sarah, who loves sharks. 🦈

## v0.9.1 changes — expedition planner polish

- The Method row now opens progressively: the sub-menu (Attractant /
  survey approach) stays hidden until you actually pick a method, instead
  of sitting there pre-filled. Pick a method, the right sub-menu appears.
- Every planner row grew a small live icon strip under it — region,
  depth, bait, method, and the sub-menu each show a little visual echo
  of your current pick (⚓ for the Outer Banks wrecks, 🪣 for chum, ✈️
  for the spotter plane…). Pure decoration; the sea still decides.
- Under the hood: the world-map/tracking data moved into its own file
  (`map-data.js`), so the main script stays shippable. Nothing plays
  differently.

## v0.9.0 changes — the science package

- The planner's scent row is gone, replaced by **Method**: one row where
  the top-level approach opens its own sub-menu. Hunters get *Attract*
  (fish-oil chum, seal scent, or nothing — same boost-only rules as
  before), while whale and basking sharks get *Find the aggregation*
  (boat survey of the bloom, spotter-plane survey, local sightings
  network). A whale shark never sees chum. The asymmetry is on purpose:
  the method teaches the animal.
- The sand tiger moves out of Baja California — the eastern Pacific
  isn't really its ocean — to the Outer Banks, North Carolina, whose
  wrecks host its most famous aggregation. Every other region×species
  pairing got audited against real range references too.
- Satellite tracks are rebuilt on real geography: verified tagging
  sites, plausible corridors, honest distances and timescales. The
  envelope is real; the randomness stays inside it.
- Science reasoning now lives in the code comments, so every range,
  method, and migration choice shows its work.
- New 🗺️ Map tab: every tagged shark on one stylized globe — its
  illustrative track as a line, its latest ping as a marker. Tap a
  marker for the shark's name and a jump to its collection card. The
  honesty framing holds here too: goblin tracks are marked archival,
  and the epaulette's whole life fits inside one reef-flat dot.
- Track/tag consistency pass: an individual's displayed track must be
  geographically compatible with where it was tagged. The thresher's
  track moved from Southern California research to western North
  Atlantic telemetry, the whale shark's from Ningaloo to the
  Philippines, the hammerhead's from Florida-heavy waypoints to the
  Bahamas, the nurse's to Caribbean-reef-local, and the epaulette's
  Heron Island waypoints became PNG reef-flat labels (the Australian
  research now informs scale only, not place).

## v0.8.0 changes

- The bait box gets bigger: three new hook baits join the four originals —
  tuna / large oily fish, ray, and urchins & shellfish — seven in all.
  Every shark's diet is updated to match (the hammerhead finally gets its
  stingrays), and every old combination still works.
- Scent in the water is now its own planner row, on trial: no lure,
  fish-oil chum, seal scent, or krill scent. Lures are species-specific
  boosts, never gates — the right scent raises a shark's encounter odds,
  a wrong one changes nothing. (The epaulette, a tiny reef worm-hunter,
  honestly ignores all of them.)
- Tagged sharks can resurface on later dives. Log the re-sighting and it
  lands on the shark's collection card — date, location, a field note —
  and extends its tracking story on the map.
- New 📓 Logbook tab: a scientist's notebook recording every trip — the
  plan, the encounters, the outcome. Compare your attempts; the pattern
  is the answer.
- Sarah remembers your sharks by name now. Between trips she sometimes
  checks in ("how's Bruce doing??"), and she celebrates re-sightings.

## v0.7.3 changes

- Expedition pacing slowed across the board — the day now breathes at reading speed, not faster than it.
- Flavour lines are dealt like cards now: shuffled per trip, each line once. No more repeated phrases within a day.
- Fixed: Sarah no longer follows a successful tag with an unrelated random fact. The tag celebration is the moment; the trip's end stays quiet unless you came home empty.

## v0.7.2 changes

- Expeditions no longer lock you into the full day: after each encounter you can keep diving or head back to the ship. Found what you came for? Your call.
- The Phone tab now reads like a real chat — oldest at top, newest at the bottom, pinned to the latest message.
- The expedition viewing window stays put: it sticks to the top of the screen while the dive log scrolls inside its own box on long days.

## v0.7.1 changes

- Removed the "Suggest waters for this shark" button from the field guide. Reading the field notes *is* the targeting — a button that fills in the answer defeats the purpose.

## v0.7.0 changes

- Six new sharks join the roster — Galápagos shark, great white shark,
  great hammerhead, shortfin mako, basking shark, and epaulette shark —
  twelve total. The Galápagos Islands and South Africa are real, selectable
  waters now: tagging your first six earns the institute's trust and opens
  them up. (Sarah's success-text openers for the new six are drafts in her
  voice for Avery — the game's writer — to revise.)
- The expedition is redesigned around a full day out. No more target
  species picker: you choose the water — region, depth, bait — and your
  research is your targeting. Each trip brings 2–4 encounters; when a shark
  appears you choose to watch it (logged in a new field sightings list —
  spotted, not tagged) or tag it. Tagging is now tag → health check →
  release, and the day plays on afterward. Nothing ends the trip early.
- Trips stay available after the win — there's always more to see out there.
- The field guide is now a proper database: a compact roster list, each
  row expanding into the full entry (sketch, notes, research text).
- New hard progress reset in the footer — a full wipe for replay and
  testing, with confirmation. Not prestige, just a clean restart.
- Win state is now twelve for twelve, in two stages: six tags opens new
  waters, twelve earns the Master Shark Tagger ceremony.
- Removed the Mediterranean as a region — no shark lived there, so every
  trip was empty water. (Also fixed: tiger and sand tiger sharks were
  missing Sarah's nudge texts.)

## v0.6.0 changes

- Research is now a true field guide, not a scrolling tab of cards. Each
  entry pairs the (unchanged) field notes with a rough pencil-style field
  sketch of one distinctive feature — barbels, the tail, the spot pattern.
  There are deliberately no pictures of the actual shark here: the real
  face is revealed only when you tag one.
- The "For Sarah" acknowledgement no longer sits at the bottom of the
  Research tab. Like Rockhound, it now appears as part of the
  game-completion moment instead.
- The win is now a ceremony in four beats, not a single dump: the Master
  Shark Tagger certificate first, then your phone buzzes with Sarah's
  heartfelt text, then the acknowledgement, then the two new regions on
  the horizon.
- Messages is now just "Phone": no explanatory header, no tutorial copy.
  It's a genuine texting UI — contact header, timestamps, bubbles — that
  feels like opening your real phone.
- Sarah's success texts vary per species now. (The opener was hard-coded
  identical on every tag; the cheer already varied.) The six new openers
  are drafts in her voice for Avery — the game's writer — to revise or
  rewrite freely.
- The trophy sits on its own shelf above the collection grid now, never
  as a grid slot that reads like "one more shark to catch".
- Expeditions are richer and depth now sets the dive: shallow water is
  bright, lively, and shorter; deep water is dark, strange, and longer,
  staged as descent, settling in, wildlife, anticipation, reveal. The
  location secrets (bioluminescent algae, scuttled ships) live in the
  deep, where they belong.
- Fixed the invisible-fish bug: ambient silhouettes were dark fills at
  low opacity on near-black deep water, so they never showed. Silhouettes
  are now pale and reflective at depth, dark in the bright shallows.
- The dive log speaks in one voice now — the separate italic "flavour"
  styling is gone.
- Galápagos and South Africa are honest "surveys coming soon" teasers
  after the win: visible on the horizon, never selectable. No shark lives
  there yet, so no more guaranteed-failure expeditions into empty water.
  New species for those waters will headline a future version.

## v0.5.0 changes

- No more "unlocked" labels: facts earned by tagging are just part of the
  card now. You tagged the shark — you know.
- Research rewritten as true field notes at a grade-6 reading level. Every
  region, depth range, and bait you need is in the text, but nothing is
  handed to you — read like a scientist, infer like one too.
- Expeditions breathe slower: longer beats between dive-log lines, and
  ambient sea life always appears before the shark does. Scene first,
  shark last.
- Sarah celebrates your wins now, not just your failures: successful tags
  earn an excited text plus a bonus shark fact.
- Win state: tagging all six unlocks a proper reward moment —
  ceremonial (a Master Shark Tagger certificate in your collection book,
  plus a heartfelt text from Sarah) and usable (two new expedition
  regions: Galápagos Islands and South Africa — new waters for future
  species).
- Two new sharks join the roster: tiger shark and sand tiger shark, with
  full research notes, planner options, art, cards, and tracking. The tiger
  shark isn't picky — several baits will tempt it, so the real puzzle is
  where to look.
- Shark tracking: every tagged shark gets a satellite-tag style track view —
  migration path, total distance travelled, locations visited, last known
  location. Nurse sharks stay local; whale sharks cross ocean basins.
- The build number now lives in the top corner of the page (new standing
  rule), so it's always obvious which version is live.

## v0.4.0 changes

- Expeditions are richer now: the dive log describes the area, the
  surrounding wildlife, and the whole scene — not just mechanical updates.
  Keep an eye out for quiet details: bioluminescent algae, the silhouette
  of a scuttled ship, and the occasional familiar reference, mentioned in
  passing.
- Every tagged shark is now always assigned a scientific research ID
  (e.g. NS-2026-014) on tagging, like real field science. Nicknames are a
  separate, optional layer — a shark can have both, and there is never an
  "Unnamed" state. Rename any shark later from its collection card.
- Tone pass: the site itself stays neutral and scientific. The affectionate
  "sea puppy" voice now lives only in Sarah's texts, where it belongs.
- The dive window has ambient sea life: sea turtles, schools of fish, and
  dolphins drift past as small silhouettes, sometimes paired with what the
  dive log describes. Varies by depth.
- Easter egg: name a shark "Sarah" (any capitalization) and see what happens.
  (Hint: the cousin finds out.)

## v0.3.0 changes

- Tab switching no longer yanks the page to the top — each tab remembers
  its own scroll position.
- Research and collection no longer repeat each other. Field notes stay as
  the pre-expedition knowledge; tagging a shark now UNLOCKS new facts on its
  collection card: the fun fact plus a bonus detail you couldn't read before.
- Research notes were fleshed out so every planner choice is derivable from
  the text — region, depth range, and bait are all stated clearly. No guessing.
- Naming is optional: skip it during tagging (the shark shows as Unnamed)
  and rename any tagged shark later from its collection card.
- Collection is now a compact two-across grid on mobile (picture + common and
  scientific names per cell); tapping a cell opens the full detail card.

## v0.2.0 changes

- "For Sarah" is no longer all over the page. There's now a prominent
  Acknowledgements section at the bottom of the Research tab instead.
- Depth is no longer a single right answer: each shark has a depth range and
  can appear across multiple depth options. Depth options were redesigned to
  non-overlapping ranges. Region and bait still narrow it down.
- Cousin messages are now optional — you get a notification badge on the new
  Messages tab instead of forced popups. Messages are more hint-weighted,
  with real shark knowledge in every exchange.
- The little cousin is now named Sarah.
- Shark art is still placeholder (to be revisited in a later version).

## v0.1.0 changes

- First playable prototype.
- 4 sharks to tag: thresher shark, whale shark, nurse shark, goblin shark.
- Expedition planner with region, depth, and bait. Bait is realistic per
  species — you don't chum a whale shark, you find the plankton bloom.
- Dive-log suspense: a static underwater view of the chosen location with
  a timed text log — expedition begun, bait deployed, first fish appear,
  related species, the day goes on through text, then... sharks!
- Tagging: if your target species (or another species you haven't tagged
  yet) appears, you can tag one. You get info on the actual individual
  (size, sex, tag location) and give it a name.
- Collection book with Pokemon-like card entries: simplified-but-recognizable
  shark art, species facts, IUCN status, individual stats, and your chosen name.
- Cousin text exchanges between expeditions — genuine conversations with
  someone interested in your work, never presented as a 'hints' UI. A gentle
  nudge only after several failed attempts.

## Play it

Open `index.html` in a browser, or visit the GitHub Pages site (see below).

No build step — just vanilla HTML, CSS, and JavaScript, like nature intended.

## The loop

1. **Research** — read short, dense, real field notes on each shark.
2. **Plan** — pick a target species, then choose region, depth, and bait.
3. **Dive** — watch the expedition play out through the dive log with a little suspense.
4. **Tag** — if your target (or another untagged species!) shows up, tag one.
   Every shark is assigned a scientific research ID automatically; you can
   optionally give it a nickname too, and change nicknames later from the
   collection card.
5. **Collect** — every tagged shark gets a card in your collection book, with
   facts that go beyond the field notes. Tap any card to track your shark's
   satellite-tag migration.

Between expeditions your little cousin Sarah may text you — her special
interest is sharks and she thinks you're the coolest. She celebrates your
tags and gently nudges you if you keep striking out. Messages are optional:
you'll get a notification badge on the Messages tab, and you can read them
whenever you like. She's not a hint system — she's family.

## Prototype roster

- Thresher shark *(Alopias vulpinus)*
- Whale shark *(Rhincodon typus)*
- Nurse shark *(Ginglymostoma cirratum)*
- Goblin shark *(Mitsukurina owstoni)*
- Tiger shark *(Galeocerdo cuvier)*
- Sand tiger shark *(Carcharias taurus)*

Locations, depths, and diets are based on real species data. Ranges are
approximate — verify against a field guide before finalizing.
