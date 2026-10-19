# Expedition Background Art — Avery + Mira

**Status:** Working production checklist. Assets are only added after Avery explicitly approves the finished image. **Do not integrate assets into gameplay or merge this PR without Avery's approval.**

## Shared art direction

- **13 landscape compositions total**, not 26: the same dive/porthole window uses the same background on mobile and desktop.
- The **52 region × depth combinations** reuse these backgrounds with region-specific details where appropriate.
- Static artwork is the **scenery layer**, not the whole scene. Leave most of the frame open for moving animal silhouettes.
- **No visible water surface and no baked-in light rays.** The existing animated sunlight/background effects are separate; avoid making them look frozen by duplicating them in the still.
- Keep prominent scenery near the **bottom ~10%** where practical. Especially for tropical surface, preserve broad unobstructed blue open water.
- At depth, backgrounds converge: reuse one twilight scene and one deep-dark scene across all regions. No mandatory visible seafloor in pelagic/deep water.
- **North Carolina shipwreck belongs in 30–100 m shallows, not the surface.**
- A checked item below means **visual art approved**, **not** integrated, scientifically audited, or tested in iPad Safari.

## 13-image production checklist

| ID | Environment | Coverage | Status |
| --- | --- | --- | --- |
| **BG-01-L** | Tropical surface | Caribbean, Philippines, Maldives, Papua New Guinea | **✅ Approved / locked** |
| **BG-02-L** | Temperate surface | NC, Japan, Cornwall, South Africa, eastern Australia | **✅ Approved / locked** |
| BG-03-L | Open Atlantic surface | Open Atlantic | ⬜ Not started |
| BG-04-L | Kelp surface | California | ⬜ Not started |
| BG-05-L | Volcanic surface | Galápagos | ⬜ Not started |
| BG-06-L | Polar surface | Arctic | ⬜ Not started |
| BG-07-L | Tropical shallows | Four tropical regions | ⬜ Not started |
| BG-08-L | Rocky shallows | Japan, Cornwall, South Africa, eastern Australia; California/Galápagos with appropriately chosen accents | ⬜ Not started |
| BG-09-L | Open Atlantic shallows | Open Atlantic | ⬜ Not started |
| BG-10-L | Arctic shallows | Arctic | ⬜ Not started |
| BG-11-L | North Carolina wreck shallows | NC only, 30–100 m | ⬜ Not started |
| BG-12-L | Shared twilight | All 13 regions, 100–400 m | ⬜ Not started |
| BG-13-L | Shared deep dark | All 13 regions, 400–1000 m | ⬜ Not started |

## BG-01-L: Tropical Surface — APPROVED ✅

**Approved by Avery:** 2026-10-19, after multiple visual revisions.

- **Browser asset:** [bg-01-tropical-surface.webp](../assets/expedition-backgrounds/bg-01-tropical-surface.webp), full size 1672 × 941, high-quality WebP.
- **Original approved image:** [bg-01-tropical-surface-original.png](../assets/expedition-backgrounds/source/bg-01-tropical-surface-original.png), original 1672 × 941 PNG. Keep this master source unchanged.
- **Art requirements confirmed:** Mostly uninterrupted ocean blue (~90%); coral and rocky reef remain along the very bottom (~10%). Enough clear central space for moving animal shadows. **No visible surface and no static sunbeams.**
- **Reuse:** Caribbean / Philippines / Maldives / Papua New Guinea at surface depth. Region-specific animal pools continue to be determined by game logic, not by baking animals into this image.
- **Integration:** Art is approved; gameplay wiring, blend/layer stacking, fallback, and in-device tests are **not** approved by this asset-only step.

![Approved BG-01-L tropical surface scenery](../assets/expedition-backgrounds/bg-01-tropical-surface.webp)

## BG-02-L: Temperate Surface — APPROVED ✅

**Approved by Avery:** 2026-10-19, on first visual candidate.

- **Browser asset:** [bg-02-temperate-surface.webp](../assets/expedition-backgrounds/bg-02-temperate-surface.webp), full size 1672 × 941, high-quality WebP.
- **Original approved image:** [bg-02-temperate-surface-original.png](../assets/expedition-backgrounds/source/bg-02-temperate-surface-original.png), original 1672 × 941 PNG. Preserve this source master.
- **Art requirements confirmed:** Cool, subdued temperate blue water with open space for independently animated animal silhouettes. Rocky seabed and sparse short seaweed occupy the lower edge; no visible water surface, no baked-in sun rays, no animals, and no wreck.
- **Reuse:** North Carolina, Sagami Bay/Japan, Cornwall, South Africa, and eastern Australia at surface depth. North Carolina's shipwreck will appear only in the separately approved **BG-11-L** shallow-depth (30–100 m) asset.
- **Integration:** Visual approval only. This asset is not wired into gameplay and has not been verified for layering, colour treatment, performance, or iPad Safari rendering yet.

![Approved BG-02-L temperate surface scenery](../assets/expedition-backgrounds/bg-02-temperate-surface.webp)
