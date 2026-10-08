# Stage 1 — Reproduction Test: Revised Review Package

**Species:** Great hammerhead (*Sphyrna mokarran*), Sawshark (*Pristiophorus japonicus*)
**Date:** 2026-10-08 (revised per Mira's review)

## Final files (transparent backgrounds confirmed)

| File | Species | Type | Status |
|------|---------|------|--------|
| `hammerhead-illustration-final.png` | Great hammerhead | Full-colour | Revised: eye moved to hammer tip |
| `hammerhead-silhouette-final.png` | Great hammerhead | Silhouette | v1 (see honest note below) |
| `sawshark-illustration-final.png` | Sawshark | Full-colour | Revised: barbels at midpoint, upper-lobed tail |
| `sawshark-silhouette-final.png` | Sawshark | Silhouette | Revised: barbels visible, upper-lobed tail |

All four have genuine transparent backgrounds (flood-fill background removal, corner alpha=0).

## What changed per Mira's corrections

**Hammerhead illustration:** Eye moved from inboard to the extreme outer tip of the
cephalofoil via targeted edit (resumed from v1 snapshot, changed only the eye).
Wide hammer, tall curved dorsal, colouration all preserved.

**Sawshark illustration:** Regenerated with barbels at rostrum midpoint (were near
mouth/gills) and predominantly upper-lobed caudal fin (was too forked).

**Sawshark silhouette:** Regenerated with visible barbels at midpoint and upper-lobed
tail. Serrated saw edge retained.

## Honest note on the hammerhead silhouette

I tried four approaches for the hammerhead silhouette: side profile (v1),
three-quarter (v2 — turned the hammer into a bill), top-down T-shape (v3 —
broke the swimming-shadow concept, added artifacts), and blocky/exaggerated (v4 —
literal rectangle). The v1 side profile remains the strongest: wide head region,
clean, no internal detail. Its limitation is what Mira identified — the hammer
reads as a wide bulk rather than a crisp T. This is genuinely hard in side-profile
silhouette because the hammer's width extends toward/away from the viewer.

I'm presenting v1 as my best current answer and flagging it openly rather than
burning more generations going in circles. If Mira wants me to keep pushing on
this specific asset, I will — or we can accept it as the shadow and let the
full-colour illustration carry the hammer's precision.

## Transparency workflow (confirmed)

Generator outputs RGB/white. Post-process: PIL flood-fill from image corners,
threshold >240 on all channels, only background pixels → alpha 0. White/light
areas *within* the shark (belly, highlights) are preserved because flood-fill
only traverses connected background regions. Verified: corner alpha=0 on all four.

For production: same script, batch-run per species. Final export as transparent
WebP (or PNG where WebP softens fine linework — will test).

## Batch priority (per Mira)

1. Original six: nurse, common thresher, whale shark, goblin shark, tiger shark,
   sand tiger shark (3 already prototyped — need 3 new + confirm prototypes)
2. Unusual body types: angelsharks, wobbegongs, sawsharks, hammerheads,
   lanternsharks, others
3. Remaining roster in regional batches
