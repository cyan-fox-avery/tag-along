# Tag, You're It

**v0.3.0** (working title — final title to be decided later, as Rockhound was "Rock Go Crunch" until beta)

> cute sea puppy with lots of teeth.

A pro-shark conservation collection game.

You are a conservation scientist. Research each shark's habits, plan an
expedition (region, depth, bait), head out to sea, and tag one of every
species for your official collection book. Less *Jaws*, more *cute sea
puppy with lots of teeth*.

Built for sarah, who loves sharks. 🦈

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
4. **Tag** — if your target (or another untagged species!) shows up, tag one,
   learn about that individual, and optionally give it a name (you can skip
   it and rename the shark later from its collection card).
5. **Collect** — every tagged shark gets a card in your collection book, with
   unlocked facts you couldn't read in the field notes.

Between expeditions your little cousin Sarah may text you — her special
interest is sharks and she thinks you're the coolest. Messages are optional:
you'll get a notification badge on the Messages tab, and you can read them
whenever you like. She's not a hint system — she's family. (Okay, she might
gently nudge you if you keep striking out.)

## Prototype roster

- Thresher shark *(Alopias vulpinus)*
- Whale shark *(Rhincodon typus)*
- Nurse shark *(Ginglymostoma cirratum)*
- Goblin shark *(Mitsukurina owstoni)*

Locations, depths, and diets are based on real species data. Ranges are
approximate — verify against a field guide before finalizing.
