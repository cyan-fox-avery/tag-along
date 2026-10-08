# Stage 1 — Reproduction Test: Revised Review Package

**Species:** Great hammerhead (*Sphyrna mokarran*), Common sawshark (*Pristiophorus cirratus*)
**Date:** 2026-10-08 (revised per Mira's reviews, rounds 1 + 2)

## Final files (transparent backgrounds confirmed)

| File (on PR #24, `art-pass/stage1/`) | Species | Type | Status |
|------|---------|------|--------|
| `hammerhead-illustration.png` | Great hammerhead | Full-colour | ✅ Approved for prototype |
| `hammerhead-silhouette.png` | Great hammerhead | Silhouette | ✅ Approved for in-game test |
| `sawshark-illustration.png` | Common sawshark | Full-colour | Revised: barbels at rostrum midpoint |
| `sawshark-silhouette.png` | Common sawshark | Silhouette | Revised: barbels at rostrum midpoint |

All four have genuine transparent backgrounds (flood-fill background removal, corner alpha=0).

## Species correction (Mira, round 2)

Our game's Common Sawshark is *Pristiophorus cirratus*, not *P. japonicus*
(Japanese sawshark). All references corrected. Fin arrangement verified against
*P. cirratus*: two dorsal fins, no anal fin, pectoral fins, upper-lobed caudal.

## What changed per Mira's corrections

**Hammerhead illustration:** Eye moved from inboard to the extreme outer tip of the
cephalofoil via targeted edit (resumed from v1 snapshot, changed only the eye).
Wide hammer, tall curved dorsal, colouration all preserved. ✅ Approved.

**Hammerhead silhouette:** v1 side profile accepted for first in-game test.
Mira: "The silhouette needs to create mystery, not necessarily permit perfect
identification before the reveal. Let's judge it in motion." ✅ Approved.

**Sawshark illustration (round 2):** Barbels moved to rostrum midpoint (~50%,
slightly tip-ward). The image generator resisted this placement across 5 attempts
(strong prior for mouth-adjacent barbels), so the final asset was produced by
generating a clean barbel-free illustration and drawing two slender, unbranched
barbels at the measured midpoint in post. Documented honestly here.

**Sawshark silhouette (round 2):** Same approach — clean barbel-free silhouette,
two barbels drawn at rostrum midpoint in post. Serrated saw edge, upper-lobed
tail retained.

## Transparency workflow (confirmed)

Generator outputs RGB/white. Post-process: PIL flood-fill from image corners,
threshold >240 on all channels, only background pixels → alpha 0. White/light
areas *within* the shark (belly, highlights) are preserved because flood-fill
only traverses connected background regions. Verified: corner alpha=0 on all four.

Still to do per Mira: visually test processed PNGs against the actual dark
underwater background to catch pale halos or accidentally removed details.
(This happens at the in-game prototype stage.)

## Batch priority (per Mira)

1. Original six: nurse, common thresher, whale shark, goblin shark, tiger shark,
   sand tiger shark (3 already prototyped — need 3 new + confirm prototypes)
2. Unusual body types: angelsharks, wobbegongs, sawsharks, hammerheads,
   lanternsharks, others
3. Remaining roster in regional batches

## Next step

In-game expedition encounter prototype using these four assets, before scaling
production. Tests: silhouettes in motion, illustrations on mobile, transition feel.
