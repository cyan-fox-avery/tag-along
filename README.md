# Tag Along

**v2.7.5-beta** — *a shark research game*

A pro-shark conservation collection game.

You are a conservation scientist. Research each shark's habits, plan an
expedition (region, depth, bait, method), head out to sea, and tag one of every
species for your official collection book. Less *Jaws*, more careful field
science.

Built for sarah, who loves sharks. 🦈

## v2.7.x changes
- **v2.7.5** — ambient life batch 2: reef creatures (moray, seahorse, parrotfish, pufferfish, lionfish), twilight drifters (hatchetfish, gulper eel, vampire squid, siphonophore, krill, viperfish), deep dwellers (snailfish, cusk eel), full-body surface visitors (otters in California, narwhal/beluga in the Arctic, sea snakes in the Indo-Pacific, manatees in the Caribbean, tuna offshore, clownfish in Indo-Pacific shallows, and four more distant shark silhouettes (great white, mako, thresher, goblin). Fish still the most common drifting silhouette everywhere, and more frequent in surface and reef drift. Slow shadows (jellyfish, sunfish, seahorses, manatees, snailfish, siphonophores, krill, anglerfish) cross at half speed. Background drift creatures swim closer (larger), and deep drift matches sighting opacity with a stronger halo. Sarah's THREE-times lines now fire only on the actual third re-sighting. The lanternfish school glows warm and bright on its sighting.
- **v2.7.4** — ambient life batch: anglerfish (deep only), sunfish (warm + open-water surface), penguins (South Africa + Galápagos only), and distant uncatchable shark silhouettes (hammerhead, whale shark, tiger). Fish most common everywhere, dolphins and turtles a bit less so; everything drifts in from both sides.
- **v2.7.2** — tour layout fixes from iPad QA: the tour card now parks in one fixed spot for all ten slides (bigger window, nav row pinned so Back/Skip/Next never move), a yellow arrow below the tab bar points at the tab each slide explains, and the replay ? button moved from the header to the footer beside Export/Import save, with its glyph properly centred.
- **v2.7.1** — the Bukangi easter egg updated: she made it out of the canal (Oct 21 2026 — the third guide-back worked, 1+ km past the waterway; officials watching for her to reach open water). First-time dusky encounters now get the success story; players who already saw the old version get Sarah's good-news follow-up on their next dusky encounter.
- **v2.7.0** — research text, batch 1 of the giveaway pass: 10 entries (nurse, thresher, tiger, greatwhite, spinner, silvertip, wobbegong, horn, cookiecutter, sixgill) no longer end by stating the expedition answer. Clues now live inside the natural history — habitat, diet, depth, senses — so the combination stays deducible without ever being prescribed. Full audit in docs/research-text-pass-audit.md; 24 entries remain for later batches.

## v2.6.x changes — the welcome tour ❓
- **v2.6.0** — a quick guided tour for new players: one slide per tab, the card docked under the tab bar with its arrow pointing at the tab being explained (and that tab spotlit). Shows once on first visit; the ❓ button in the header replays it anytime.

## v2.5.x changes — the certificate era 🏆

- **v2.5.0 — Hand-painted expedition backgrounds.** 13 custom underwater scenes by Avery & Mira covering every region × depth — tropical coral, arctic ice, the North Carolina wreck, and everything between.
- **v2.5.1** — Deep zones refined: twilight brightened slightly, deep water goes midnight-black on top, and sharks get a subtle glow in the two deepest zones so they stay visible.
- **v2.5.2** — Header logo restored to full size; the tightness comes from placement, not shrinking.
- **v2.5.3** — Ambient background creatures darkened: gray silhouettes at the surface, near-black in the shallows.
- **v2.5.4** — Sarah stays on topic: she only brings up a species that's pinned in Research or was just encountered (achievements exempt).
- **v2.5.5** — The logo is cropped to the shark itself — the transparent padding above and below is gone, at the same on-screen size.
- **v2.5.6 — The real Master Shark Tagger certificate.** Avery's certificate artwork replaces the old text version: sign it with your own name during the win ceremony, find it again in Achievements, and save/share it as a finished keepsake with your name and finish date in the picture. Plus: Sarah spaces out her mentions of the same shark (15 minutes, sightings outrank check-ins), and the signature field gets a visible name box for typing on touch devices.
- **v2.5.7** — Certificate fix: a general form style was overriding the signature field (dark bar, giant white text) — scoped out, with a regression test.
- **v2.5.8** — Signature placement: the name sits a touch lower, resting on its line like real handwriting.
- **v2.5.9** — Signature descenders (J, y) have room to finish beneath the line instead of clipping.
- **v2.5.10** — Achievement card content is vertically centred in each box — icon at the far left, in the middle vertically.
- **v2.5.11** — Archive videos pause the background video while they play (both went choppy competing for the iPad's decoder); the background resumes on its own when the clip pauses or ends.

## v2.4.x changes — places that look like places 🌍

- **v2.4.0 — Expeditions look like where you are.** Dive scenery and ambient wildlife are biome-based: coral in the tropics, kelp off California, icebergs in the Arctic, a wreck off North Carolina, volcanic rock in Galápagos. The old diagonal light stripes are gone.
- **v2.4.1** — Header: the shark logo sits left of the title on all screens, with a few pixels of breathing room.

## v2.3.0 changes — Mira's living water 🌊

- **v2.3.0** — The home background is now a pair of hand-crafted looping underwater videos by Mira — one composed for landscape, one for portrait — ending the sun-ray saga (below) with hardware-decoded video the iPad handles easily.

## v2.2.x changes — sunlight on video 🎬

- **v2.2.0** — First video background: looping sun rays with sway and breathing, trying video where CSS animation couldn't keep up on iPad.
- **v2.2.1** — The video recreates the original ray design properly — asymmetric fan from the top-left, 12-second seamless loop.

## v2.1.x changes — the sun-ray saga ☀️

- **v2.1.0** — Sun rays re-fanned to radiate across the whole viewport from the top-left sun (they were pivoting the wrong way).
- **v2.1.1** — Emergency iPad fix: the oversized ray layers killed all touch input; rays sized to the viewport.
- **v2.1.2** — Experiment: rays switched to cheaper compositing to test whether their blending was the iPad slowdown.
- **v2.1.3** — Diagnostic release: rays fully off to isolate the culprit (it was the rays).
- **v2.1.4** — Rays return as still beams.
- **v2.1.5** — Rays breathe again, opacity only.
- **v2.1.6** — Still beams again — the breathing also broke the iPad. A working game comes first; the saga concludes with video in v2.3.0.

## v2.0.0 changes — four sharks redrawn 🎨

- **v2.0.0 — The art pass.** The basking shark is redrawn from a real photo (blunt rounded snout, huge open mouth, long gill slits), the great hammerhead has its right eye back, the common angelshark faces left in side profile like the rest, and the megamouth's head is properly proportioned. Sharks now appear in every region their real range reaches (whale shark in the Maldives too, megamouth in the Philippines, blue sharks past Cornwall, smooth hammerheads off North Carolina), and a shark's track starts from where you actually tagged it. Expanded cards stay below the tab bar, and Archive cards get a ✕ close button.

## v1.8.x changes — insights everywhere 📖

- **v1.8.0 — Hooks and bonuses are real insights now.** Every species' hook (💡) and bonus (✨) became unlockable tag-along insights — 201 in total (4 per species, 5 for the nurse shark) — rewritten across all 50 species to remove overlaps with the existing facts. Your existing unlocks carry over. The megamouth's White Whale achievement is renamed **Deep-Sea Unicorn** (WHAAAAAAALE keeps the whale shark). Archive is back to 3 columns with expansions spanning two, and Sarah's check-ins no longer leak a locked hook.
- **v1.8.1** — Collection cards for 100%-complete species get a yellow border; the IUCN badge hugs the pin; the far-right bubble column rises the full height.
- **v1.8.2** — The IUCN badge gap is now measured to the pin glyph itself — 6px visual, touch target unchanged.
- **v1.8.3 — Sarah at a human pace.** At most one routine message per 5 minutes (a routine message inside the window is dropped, never queued; special threads and Ask Sarah always go through) — and a dropped chat no longer silently advances her rotation. Blue shark insight reworded: fact, not opinion.
- **v1.8.4** — Faster after expeditions (one render instead of two); the logbook shows your latest 30 trips with a "Show older trips" button.
- **v1.8.5** — Sarah names the shark in every ambient chat; five new check-in variants and eleven new reunion lines, never twice in a row. 40 weather lines keyed by climate zone, nicknames in the logbook, Field Sightings shows your latest 10, and sharks appear on expeditions in four real size tiers.
- **v1.8.6** — Tracking map decluttered: every shark's current location, with full routes only for sharks you've toggled "Track this shark" on (a real toggle on the card now). All 50 marker colours verified legible against the dark ocean.
- **v1.8.7** — The tracking graph shows travel only: re-sightings no longer add points to a shark's track. Existing tracks are cleaned up automatically.

## v1.7.x changes — derpy sharks 🦈

- **v1.7.0 — Derpy sharks unlocked!** Finish the full roster and Sarah gives you the original derpy art as a completion award — toggle derpy mode in your collection book anytime.
- **v1.7.1** — Naming a shark Bruce now triggers Sarah's Jaws reaction immediately, even after you've finished the game.
- **v1.7.3** — The lemon-shark Sarah easter egg spells her name right.
- **v1.7.4** — Tag-along insights live on the shark's Collection card, not in the expedition log.
- **v1.7.6** — "Find the aggregation" just works — no more boat/plane/network picker.
- **v1.7.7** — The Phone tab's notification badge centers its number properly.
- **v1.7.8** — Learning a new species insight from a wild shark now ends the expedition.
- **v1.7.9** — Galápagos and South Africa unlock after tagging any 10 sharks.
- **v1.7.10** — "You Named Him WHAT?" unlocks the moment you name a shark Bruce.
- **v1.7.11–v1.7.18 — the derpy award, hardened.** Retroactive award for past full-roster winners (v1.7.11), a manual claim button in the Collection (v1.7.17), and a hardened claim that validates the full 50-shark roster and hides during the win ceremony (v1.7.18).
- **v1.7.12** — IUCN badges no longer clip on iPad.
- **v1.7.13** — "Bait and Switch" retired; seal scent properly retired (fish-oil chum directly).
- **v1.7.14** — Encounter badges: NEW SPECIES / YOUR SHARK / ANOTHER, right under the illustration. Plus a UI polish bundle (horizontal desktop cards, green checklist bubbles, one-at-a-time Research accordion, full scientific names).
- **v1.7.15** — Achievement hints wrap fully — no more "…" cutoffs.
- **v1.7.19** — Achievement cards tidied (name above description), the Master Shark Tagger trophy moved to the Achievements tab, and the **Bukangi easter egg**: encounter a dusky shark and Sarah tells you about the real dusky captivating Busan.
- **v1.7.20** — Derpy mystery shadows documented and regression-tested: in derpy mode the mystery silhouette is a darkened derpy shape, revealed on tap.
- **v1.7.21** — The darkened derpy silhouette gets explicit dimensions so it actually renders (it was collapsing to zero size).
- **v1.7.22** — Archive accordion (one entry open at a time); Follow insights live on the Map popup only; denser, more organic bubbles; the "Something in the Water" achievement retired.
- **v1.7.23** — **WHAAAAAAALE**: new achievement for tagging a whale shark. Uniform achievement card sizes, Follow shows insight progress, the cookiecutter's Archive entry goes illustration-only, ✕ close buttons on modals, and re-sightings get less spammy (odds halved — same chance every encounter, no time gating; the card shows the latest 3 with a Show all button).
- **v1.7.24** — Observe shows insight progress and its popup is fixed; tiered re-sighting reactions — Sarah warms up with each reunion, in her own chat bubble.
- **v1.7.25** — Observing a species with no insights left ends the expedition properly; bubbles move to a JS loop so they can't freeze at the bottom on iOS.
- **v1.7.26** — Thresher hook reworded: "perpetually nervous" describes the whole shark, not just its tail.
- **v1.7.27** — Wider layouts on big screens: two-column Collection detail, Research at 2 wider columns.
- **v1.7.28** — Two new achievements: **Dedicated** (every extra fact from following sharks) and **Certified Shark Nerd** (every other visible achievement).
- **v1.7.29** — Seafloor removed — its kelp strands were rendering as giant blue squiggles on iPad.
- **v1.7.30** — Research back to 3 columns; an expanded entry's info box spans two.
- **v1.7.31** — Collection detail: big art across the top, info in two columns below.
- **v1.7.32** — The Research Method filter matches the Expedition planner exactly; "No extra method" wording; the Tagged chip loses its ✅; Sarah uses nicknames without quotes.
- **v1.7.33** — Collection detail art sits tighter; Re-sightings move to the left column so long entries balance.
- **v1.7.34** — All 50 species illustrations trimmed of their transparent padding — sharks fill their image boxes.
- **v1.7.35** — The re-trim done properly (alpha≥200 bounds) for 24 species the first pass barely touched — faint alpha noise no longer counts as shark.
- **v1.7.36** — The last 13 species component-cropped to the shark's own connected shape (stray single-pixel specks defeated every threshold trim).

## v1.6.x changes — research and shadows 🔍

- **v1.6.0** — Research accordion (one open at a time), full scientific names on cards, achievement hints get two lines.
- **v1.6.1** — Bigger logo and tighter header, horizontal collection cards on desktop, checklist-style tag status (a circle that fills green).
- **v1.6.2** — Generic field sketches removed from cards.
- **v1.6.3** — Archive search and sort (name, date tagged, IUCN status).
- **v1.6.4–v1.6.5** — Re-sighting and lemon-naming double-fire fixes.
- **v1.6.6** — Mystery silhouettes now use each shark's actual illustration with a dark overlay — no more mismatched shapes.
- **v1.6.7–v1.6.9** — One re-sighting, one Sarah thread; more re-sighting notes; the megamouth's White Whale thread is the celebration.
- **v1.6.10** — Sarah paces herself: single-shark cheers at most once every 3 expeditions.
- **v1.6.11** — Trans-Pacific tracks cross the antimeridian properly — no more lines streaking across continents.
- **v1.6.12** — Simpler attractants: fish-oil chum directly, no dropdown (seal scent retired).
- **v1.6.13** — A bigger "they're all still out there" follow map.

## v1.5.x changes — the polish wave 📑

A long UI/UX polish train:
- **Tabs saga (v1.5.6–v1.5.18):** centered tabs, all eight on one iPad row (CSS grid — iPad Safari couldn't be trusted with flex-wrap), tab counts moved to page tops, the Archive tab always visible (greyed until unlocked).
- **Field guide polish:** the whole header is tappable, an IUCN badge key, color-coded IUCN badges, restacked name headers, overlays instead of pushing content, closable mobile popups.
- **v1.5.2–v1.5.3:** individual sharks (a 25% chance it's your tagged individual), shark reunions (resident 50% / coastal 25% / migratory 10%), a quieter map, a cleaner logbook, hardened easter eggs.
- **Bruce & lemon (v1.5.20–v1.5.24, v1.5.32):** Bruce-chain polish — your capitalization, a warmer reaction, the opener on the first catch; naming the lemon shark "Sarah" gets its own reaction thread; six lemon Big Day conversations.
- **Background (v1.5.25–v1.5.31):** a one-screen ocean gradient, a solid seafloor on true black depths, a thinner seafloor strip, pinning that preserves your scroll.
- **v1.5.8 safe batch:** "Still to discover" as plain text, reordered matching-yellow release buttons, "Follow" first in encounters, tag IDs for unnamed sharks, no double-tap zoom.

## v1.4.x changes — tag along 🧭

- **v1.4.0** — A third release choice: **tag along** with your shark and end the expedition. Each follow unlocks a secret species fact (1–3 per species) on the Collection card. The pinned shark slot moves above the grid; iPad polish.
- **v1.4.1–v1.4.8** — The porthole: the idle view becomes an ocean-surface boat window with layered waves, parallax, and spray on the glass. Sun-ray caustics iterate toward a top-left sun fan.
- **v1.4.9** — New achievement: **White Whale.** Tag the megamouth (~300 ever documented) and Sarah loses her mind.
- **v1.4.10–v1.4.14** — Porthole cleanup, bubble columns in burst trails, softer diffused sun rays spanning the screen, a calmer porthole with a CSS sky.
- **v1.4.15** — Underwater vista background, bigger logo, IUCN color coding, smarter pinned hints, time passing across the dive log.
- **v1.4.16–v1.4.17** — The sun-ray experiment: a true conic-gradient fan (beautiful, but it broke the iPad layout) → emergency rollback to the span-based system.
- **v1.4.18–v1.4.19** — Tighter wave layers, and **Sarah's Big Day**: tag multiple new species in one trip and get one authored celebration instead of three near-identical texts.

## v1.3.x changes — follow your shark 🦈

- **v1.3.0** — "Just watch" sometimes adds a natural-history observation to a shark's record; logbook date filter; 20 new field observations and 6 new wildlife sightings; save export/import in the footer.
- **v1.3.1** — **"Tag along."** After tagging, tap 'Tag along with [name] →' to follow your shark on the map.
- **v1.3.2** — Conservation-note background fixed for readability.

## v1.2.0 changes — failed trips teach 📓

- Unsuccessful expeditions now surface 1–2 field observations — water temp, currents, wildlife.
- Tag celebrations clearly announce first-of-species vs Nth.
- The Archive shows locked silhouettes for species you haven't tagged yet.
- Wider-screen layout refinements.

## v1.1.0-beta changes — tablet and desktop layouts 📱

The game now uses wider screens properly — multi-column research, side-by-side dive views, a proper collection wall.

## v1.0.0-beta — Beta 1.0 🎉

The header eyebrow changes from PROTOTYPE to BETA. The game is officially in beta.

## v0.27.x changes — the reskin that wasn't 🔄

- **v0.27.0** — A marine-terminal UI reskin.
- **v0.27.1** — Reverted at Avery's request: the classic button-grid UI is restored, with all v0.26.x art integration intact.

## v0.26.x changes — the sharks are here! 🎨

- **v0.26.0** — Every species gets its own illustration (Mira's anatomical audit approved the full set). Encounters open on a mysterious silhouette — tap to reveal. Sea turtles, dolphins, rays, seals, jellyfish, and fish schools drift through your dives. The collection book glows up with full-colour portraits.
- **v0.26.1** — The dive-scene shark is re-centered ("shark too low"), and background creatures now swim both directions, facing their direction of travel.

## v0.25.0 — the art-pass review thread 🎨

PR #24 served as the art review thread: Mira's anatomical audit of every species illustration, plus the six ambient background-creature shadows. A review thread, not a player release.

## v0.24.0 changes — progressive Wild Archive 🖼️

Your Archive now grows with every tag — Sarah introduces it after your first shark, and each new species adds its real photo quietly.

## v0.23.0 changes — easter eggs 🥚🦈

- **🦈 Mary Lee.** Name a great white "Mary Lee" and Sarah will tell you about the real one — OCEARCH's 16-foot Matriarch of the Sea with 130k Twitter followers.
- **🗺️ Nicole.** Name a great white "Nicole" and hear about the 20,000 km round trip that proved white sharks cross ocean basins (Bonfil et al. 2005, *Science*).
- **🎬 Bruce.** Name ANY shark "Bruce"... and say nothing. Sarah will piece it together slowly, over multiple sessions. A hidden achievement awaits at the end of the rabbit hole.
- **💾 Save export/import.** Export your save as JSON from the footer; import it back on any device. Version mismatches warn but don't block.
- 187 tests passing.

## v0.22.0 changes — field notes 📓

- **📓 Logbook filters.** Filter your expedition log by outcome (successful tag / re-sighting / no sharks), region, or species — with a clear button. Filters narrow the notebook; they never solve the expedition.
- **📌 Pin-gated soft hints.** Pin a shark you're researching, and your logbook will gently note after expeditions when the conditions were right for it (region, depth, bait all matching) but it didn't appear — "you're warm." If one dimension was off, you'll get an observational nudge — "Maybe we'll find them elsewhere?", "They didn't seem to like the food we were offering." — never "correct"/"wrong". Method affects encounter odds, not possibility, and hints respect that. This intentionally evolves the old rule that failed trips give no signal, while Sarah remains the stronger help after repeated failures.
- **🎉 "What's new?" screen.** Returning players see a one-time summary of each version's changes on first load after an update.
- **🎣 Failed trips feel like fieldwork.** Expeditions now open with sea conditions (weather, chop, fog), close misses get a warm field-notes line (dolphins on the bow wave, a manta passing underneath), and the logbook records conditions for every trip.
- **🌊 Conservation-science notes.** Every collection card now carries a 1–2 sentence conservation note — IUCN context, specific threats, and the protection efforts making a difference.
- 177 tests passing, including new regression coverage for pin-hint logic, logbook filters, and version comparison.

## v0.21.0 changes — the sharknado 🦈🌪️

- **18 new sharks join the roster (32 → 50).** The entire staged Wild Archive batch graduates to playable: silvertip, spinner, spotted wobbegong, leopard, horn, Port Jackson, common angelshark, megamouth, common sawshark, Greenland, cookiecutter, bluntnose sixgill, velvet-belly lanternshark, dwarf lanternshark, kitefin, Pacific sleeper, spiny dogfish, and small-spotted catshark — each with full research dossier, 3 Sarah chats, contextual nudge, derpy art, field-guide sketch, tracking envelope, and live Wild Archive entry.
- **Three new locked regions.** Eastern Australia, California Coast, and Arctic Waters join the expedition map, each with its own unlock breadcrumb. Placements are draft pending Mira's science review.
- The pygmy shark stays on its verification hold (image rights unconfirmed).
- Win threshold moves with the roster, as always: tag all 50.

## v0.20.0 changes — expedition flow + two-shark wave

- **📌 Pinned shark ("currently researching").** Pin any field-guide entry to keep it in a focus card at the top of the Research tab — with a jump-to-entry button. The Expedition tab also shows your pinned shark's region/depth/bait as a planning reference. One pin at a time, persisted across sessions. A focus, never a filter.
- **🔁 Repeat-plan.** Every logbook entry now has a "Repeat this plan" button that restores its region, depth, bait, and method into the planner and jumps you to the Expedition tab.
- **⚡ Quick pace.** A new planner toggle shortens the beats between dive-log lines for faster expeditions. Preference persists.
- **Two new sharks (30 → 32).** The salmon shark graduates from the future batch with its curated archive media; the dusky shark joins with its two curated archive photos (Happy Little Nomad's aquarium portrait, NOAA research shot).
- **Wild Archive media batch (Avery + Mira).** 18 more species staged as `future: true` — hidden until they join the playable roster: silvertip, spinner, spotted wobbegong, leopard, horn, Port Jackson, common angelshark, megamouth, common sawshark, Greenland, cookiecutter, bluntnose sixgill, velvet-belly lanternshark, dwarf lanternshark, kitefin, Pacific sleeper, spiny dogfish, small-spotted catshark. The pygmy shark is on a verification hold (image rights unconfirmed) and was deliberately left out. Captive/research/preserved-specimen context preserved in captions; the spinner's iNaturalist photo is CC BY-NC (version unconfirmed) with the project non-commercial notice.
- 141 tests passing, including regression coverage for Mira's v0.20.0 review (pinned filter-feeders, depth labels, filtered jump, repeat-plan with no method).

## v0.19.1 changes — underwater ambience

- **The site has water in it now.** The background is a descent: bright surface water behind the title card, darkening through the depths as you scroll. A shimmering surface band sits just below the title card, god rays slant down from it, slow bubbles rise, and a dark seafloor silhouette (with kelp) rests along the bottom. All decorative layers sit behind the app, ignore taps, and respect `prefers-reduced-motion`.

## v0.19.0 changes — the field-guide database

- **Research is now a real field guide.** Text search by name, plus stacked filters for location, depth, method, bait/diet (exact planner vocabulary), and tagged/untagged status. Applied filters show as removable chips, with a visible result count and an obvious Clear.
- **Dyspraxia-friendly filter UI.** Large tappable chips throughout; on mobile the Filters button opens a compact bottom sheet.
- **Design rule:** filters narrow the notebook, never solve the expedition.
- **Six more achievements (12 → 18).** Full Fathom (all four depth zones), Fin-ished! (complete the collection), Bait and Switch (every method), Pen Pal (re-sight the same shark three times), Off the Map (first tag in a locked region), and Every Shade (every IUCN status). All breadcrumbs stay hints.
- **Breadcrumb polish.** Nine existing breadcrumbs rewritten to hint rather than give away ("the book has to start somewhere", "a rare encounter"), per playtester feedback.
- **Archive videos muted by default.** No surprise audio.

## v0.18.0 changes — achievements + the seven-shark wave

- **Achievements are here.** A new 🏆 tab lists 12 achievements, visible upfront — but each shows a breadcrumb hint instead of the real requirement until you earn it. ("Tag the most anxious-looking shark"... you'll figure it out.)
- **Seven new sharks join the roster (23 → 30).** Scalloped hammerhead, smooth hammerhead, bonnethead, bull shark, grey reef shark, Caribbean reef shark, and sandbar shark — each with full research dossiers, Sarah's chats and nudges, derpy art, field-guide sketches, tracking envelopes, and verified Wild Archive media.
- **Basking shark archive cleanup.** The dossier had two near-identical filter-feeding photos; the duplicate is gone.
- **Future Archive batch staged.** The salmon shark's media remains pre-curated and hidden as `future: true` until it joins the playable roster.

## v0.17.1 changes — the sanity-check batch

Small fixes and polish from Avery's post-release playthrough:
- **Sarah's openers have variety.** All 23 species openers now end differently — no more "Tell me everything" on every shark.
- **Release is the destination choice.** After the health check, pick "🌊 Release & keep diving" or "⛵ Release & return to ship" directly — no second prompt.
- **The phone clock ticks.** The status bar clock refreshes every 30 seconds.
- **Ask Sarah for advice.** After your first failed trip, Sarah offers her notes — you pick the species. She only nudges on her own after five failures (was three).
- **Encounters announce tagged status.** "🦈 Shark! A nurse shark — already in your book as "Bubbles"!" vs "— new to your book!"
- **Map legend polish.** Two-column chip layout, taller touch targets, common name before the ID.
- **Bug fix: win overlay trap.** On short screens, the ending's text thread could push the Continue button below the fold with no scroll. Overlays now scroll.
- **Sand tiger GIF reframed.** The giant portrait GIF is cropped and rotated into a landscape frame.

## v0.17.0 changes — the Wild Archive

- **The Wild Archive is open.** Completing the roster now unlocks a new Archive tab with real-world photography and footage of every species you tagged — 44 hand-curated assets across the 23-shark roster (46 in the archive data, with the next species already pre-curated), each with a caption and full creator/license attribution. "You know these sharks now. Here they really are."
- Video uses iOS-compatible streams; research/handling photos are labeled "Research in Action."

## v0.16.0 changes — the ending

- **The win is now a proper ending in four beats.** The expedition ritual
  always finishes first (health check, release, return to ship) — then:
  institute recognition (Master Shark Tagger), **Sarah's celebration**
  (written in her calm adult voice, using your actual
  first-tagged shark — and she's still here for the postgame), the **map finale** (every tagged shark's track and
  marker fades in one by one — "They're all still out there."), and the
  acknowledgements. Skippable, never rushed.
- **Wild Archive unlock.** Completing the roster sets the archive flag that
  the postgame Full Field Guide will build on. (The archive UI and the
  real-media curation are coming next — Avery is hand-picking the photos.)

## v0.15.0 changes — simpler map, new name

- **The game is now TAG ALONG** — *a shark research game*. "Tag, You're It"
  retires as the prototype title. The page title, header, and README carry
  the new name; the in-game title flourishes ("Tag along with Biscuit →")
  from the beta roadmap are still queued, not built.
- **Map gestures simplified.** Pinch-to-zoom and the Explore-map mode are
  gone — they were fighting the page for one-finger drags. Zoom is now
  + / − buttons (and mouse wheel) only. One-finger drags scroll the page at
  1x and pan the map when zoomed in, with a subtle outline showing which
  mode the map is in. No modes, no mid-gesture races.

## v0.14.0 changes — two more sharks + clearer research

- **Two new sharks (roster 21 → 23).** The **frilled shark** — an eel-like
  living fossil from Sagami Bay's deep slope, six frilly gill slits and 300
  trident teeth — and the **zebra shark**, the gentle reef cruiser whose
  pups wear zebra stripes and whose adults wear leopard spots. Each with
  derpy art, field-guide sketch, two-paragraph research, Sarah's full text
  set, and a track envelope (archival for the frilled, acoustic for the
  zebra). The win moves to 23/23, as always.
- **Research says what the planner says.** Four entries named baits that
  don't exist on the bait buttons — blacktip ("shrimp"), whitetip
  ("octopus"), sandtiger ("skates" for the Ray bait), sevengill (squid
  never named). All 21 existing entries audited; prose now matches the
  planner's labels so nobody gets stuck the way Avery did on the blacktip.

- **Six new sharks (roster 15 → 21).** The open-ocean trio — **blue shark**
  (indigo countershading, 6,840 km Ireland-to-West-Africa migration),
  **porbeagle** (cold-water lamnid, white dorsal badge, Cornwall),
  **silky shark** (silk-smooth skin, tuna's shadow) — plus the **oceanic
  whitetip** (paddle fins, Critically Endangered sentinel), and two for
  South Africa's locked waters: the **broadnose sevengill** (seven gills,
  Jurassic lineage, kelp forests) and the **bronze whaler** (Sardine Run
  star, copper shark by its other name). Each with derpy art, field-guide
  sketch, two-paragraph research, Sarah's full text set, and an acoustic
  or satellite track envelope. The win moves to 21/21, as always.
- **No more flavour repeats.** Sighting lines are now dealt like cards per
  trip (the old pure-random pick stacked three turtles in one dive), the
  thin sighting pools got fatter, and the deck skips whatever creature the
  region note already mentioned.
- **A dive scene with scenery.** Each depth now has its own persistent
  backdrop — coral heads on the reef, a rock slope in the twilight zone,
  marine snow falling in the deep — plus small background fish drifting
  through between sightings so the water never feels empty.
- **One goodbye, not two.** Tapping "Head back to the ship" after an
  encounter now closes the dive on its own after the closing lines — the
  second "Return to ship" button is gone. (Natural day-ends still get the
  single dismiss button.)
- **Research tab sorts itself.** Untagged sharks stay up top where you're
  hunting; tagged ones settle to the bottom.
- **Locked regions look locked.** They were already in the region dropdown
  as disabled options, but nothing made them *look* unavailable — now
  they're greyed out, so the 🔒 reads at a glance.
- **Housekeeping.** SHARKS moved to its own `sharks-data.js` module
  (script.js was about to blow the push size limit again).

- **Sarah voice pass.** The in-game Sarah now sounds like the real one: an
  enthusiastic but calm adult, not a hype machine. Caps-lock and
  exclamation marks are earned now — they live where excitement is real
  (a tag, a genuinely thrilling fact). All chats, nudges, check-ins, and
  all fifteen sharks' cheer/opener texts rewritten in the new register.
- **Contextual hints.** Sarah pays attention to where you've been
  searching: hints and casual texts now prefer species from your most
  recent expedition region instead of drawing from the whole roster, so
  she talks about the shark you're actually after. (Falls back gracefully
  when there's no recent region.)
- **Phone auto-scroll.** The conversation now opens pinned to the newest
  message, like a real phone — previously the scroll ran while the tab was
  hidden, so it never took. Threads also lost their nested mini-scrollbars:
  one conversation, one scroll.
- **Explicit research entries.** Six field-guide entries that left the plan
  unclear got a second paragraph: tiger and great white now state their
  method, epaulette explains *how* to encounter a walker, and the reef trio
  (lemon, blacktip, whitetip) name their game region outright. Two
  paragraphs max — still field notes, not essays.

## v0.11.0 changes — the reef trio + tap-to-focus map

- Three new sharks join the roster (12 → 15): the **lemon shark** (sarah's
  favourite — twin equal dorsal fins, Bimini's faithful mothers), the
  **blacktip reef shark** (black-dipped fins, knee-deep Maldivian reef flats),
  and the **whitetip reef shark** (the cave-napper, Philippine reefs by night).
  Each comes with full derpy art, a field-guide sketch, research notes,
  sarah's texts, and an honest acoustic-telemetry track envelope.
- Tapping a shark marker — or its legend chip — now glides the map to that
  shark's latest ping at 3× and centers on it (smooth half-second ease-out,
  so you keep your bearings on the globe). Tapping the same marker again
  glides back to where you were; tapping a different marker flies straight
  there. The popup still appears as before, and it works in both normal and
  explore mode. Grabbing or pinching the map yourself cancels the glide.
- The win keeps moving up with the roster: Master Shark Tagger now needs
  15/15, and will keep pace with every future wave (standing rule).

## v0.10.4 changes — phone layout fix

- The page no longer leaves a dead strip on the right on phones: the six
  navigation pills now wrap into two rows of three on narrow screens
  instead of overflowing the page, and the map toolbar wraps too so the
  Explore/Done buttons can't push anything off-screen either.

## v0.10.3 changes — explore-map mode

- The map gets an explicit **Explore map** mode for touchscreens (thanks ChatGPT for the design steer). Tap it and the map takes full ownership of your gestures — pinch to zoom, drag to pan — with the rules set before your fingers land, so the browser can never steal a pinch for page scrolling. Tap **Done** to hand scrolling back. The mid-gesture fix from the first pass was racy by design, so it was replaced outright.

## v0.10.2 changes — touchscreen map support

- The world map finally works on phones: pinch to zoom (1×–4×, centered
  between your fingers), drag to pan when zoomed in, and taps still open
  the shark popups — a drag won't trigger one by accident. At normal zoom
  a vertical swipe scrolls the page like always; the map only takes over
  your finger once you're zoomed in. The zoom and currents buttons are
  proper finger-sized targets now too.
- Review fix (thanks ChatGPT): zooming now keeps the map point under your
  fingers exactly where it was, instead of jumping it to the center.

## v0.10.1 changes — tracking-note consistency

- The nurse shark's collection-card track view now correctly describes
  acoustic-tag detections from reef receiver arrays, instead of falling
  back to the satellite wording. (Thanks to ChatGPT's review for
  catching the leftover path.)

## v0.10.0 changes — satellite tracking map

- The tracking map now sits on NASA's Blue Marble Next Generation —
  real satellite imagery instead of the stylized continents. (The old
  LAND_PATHS shapes are retired.) Map imagery: NASA Blue Marble Next
  Generation ([CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)).
- Zoom: +/− buttons, mouse-wheel zoom centered on the pointer, and a
  reset-view button. Tracks, pins, and popups all keep working zoomed in;
  markers stay readable at any level.
- Major ocean currents are drawn as a toggleable overlay — 14 named
  currents with approximately real paths, warm ones in soft orange and
  cold ones in soft cyan (that's real oceanography, and it drives where
  sharks go). The 🌊 Currents toggle starts ON; famous-current labels
  fade in as you zoom past ~1.75x.
- Under the hood the map data already lived in `map-data.js` (split out
  in v0.9.1); the current paths join it there, keeping the main script
  lean.

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

Play it live at https://cyan-fox-avery.github.io/tag-along/ — or open
`index.html` in a browser.

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

## Roster

50 species — the original 6 plus staged waves through v0.21.0, each with a
research dossier, Sarah chats, tracking envelope, and Wild Archive entry. See
the in-game field guide for the full list.

Locations, depths, and diets are based on real species data. Ranges are
approximate — verify against a field guide before finalizing.
