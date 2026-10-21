# Research-text pass — audit (Tag Along)

**Principle (Avery, 2026-10-21): evidence, not instructions.** Research text
must let the player *deduce* the expedition combination — habitat implies
region, depth range implies depth, diet implies bait, sensory biology implies
the attractant — but never *state* the combination. The one constraint: every
element the player needs must still be deducible, or the game quietly becomes
unsolvable.

**Scale (scan of all 50 entries, 2026-10-21): 34 end on a giveaway**, in two
tiers:

- **Tier 1 (17):** a final prose sentence hands over the attractant/bait in
  prose dress ("a slick of fish-oil chum drifting on the current can pull
  them in"). The clue is usually already in the body; the ending just says
  the quiet part out loud.
- **Tier 2 (17):** a literal answer line — "Game plan: …", "Plan: …", or a
  bare combo line ("Squid on chum, twilight depths of the open Atlantic") —
  stating region, depth, bait and attractant as instructions.

**Attractant note:** 46/50 species use chum (3 use aggregation methods, 1
uses none), so chum is nearly a game-wide constant the player learns fast.
The real per-species puzzle is region + depth + bait; scent clues are
supporting, not load-bearing. Rewrites keep a scent hint where it fits
naturally and never force one in.

## Batch 1 — done (v2.7.0)

nurse, thresher, tiger, greatwhite (tier 1) + spinner, silvertip, wobbegong,
horn, cookiecutter, sixgill (tier 2).

Rewrite notes (Mira review fixes applied 2026-10-21, same PR):
- nurse: kept "They hunt as much by smell as by sight." (biology), dropped
  the chum clause; diet sentence now names sea urchins outright ("crabs,
  lobster, shellfish and sea urchins") so both accepted baits stay visible.
- thresher: scent-comparison line dropped entirely on Mira's review (never
  invent biology to rescue a clue); the entry stands on its existing
  natural-history clues.
- tiger: the whole instruction paragraph deleted; the diet list already
  says it, and the license-plates line ends the entry.
- greatwhite: "Those oily meals leave a fish oil scent trail behind them."
  (keeps the v1.7.13 guardrail test's "fish oil" phrase in baked form —
  the research must point at fish-oil scent, never the retired seal scent);
  diet sentence now names schooling fish alongside tuna.
- spinner, silvertip, wobbegong, horn: answer lines deleted. Silvertip's
  "outer slopes" firmed to "shallow outer slopes" (surface+reef).
- cookiecutter: answer line deleted; "open Atlantic" baked into the body
  (it only lived in the answer line).
- sixgill: answer line deleted; "In the dark deep, they find those meals
  largely by scent." added to the scavenger sentence; diet now names
  schooling fish alongside squid.
- Coverage: a clue-matrix test pins every accepted region, bait option and
  depth zone to a discoverable phrase in the final prose for all 10.

## Remaining — 24 entries

Tier 1 (13): goblin, sandtiger, galapagos, hammerhead, mako, lemon,
blacktip, whitetip, scalloped, smooth, bull, salmon, greenland.
Tier 2 (11): dusky, leopard, portjackson, angelshark, sawshark, velvetbelly,
dwarflantern, kitefin, pacificsleeper, spinydogfish, catshark.

## Sequencing with the bold-clues extension

Avery, 2026-10-21: for all 50 entries, put the clues in bold (subtle, draws
the eye), extending the existing `highlightClues()` (v1.4.15, pinned-card
preview only: region names + diet words, rule "never the actual answers")
to the full text plus depth cues. **Do it with the final batch, not
before** — bolding now would highlight the remaining "Game plan" answer
lines like a highlighter on the answer key.
