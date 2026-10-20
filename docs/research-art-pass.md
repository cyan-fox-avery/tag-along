# Research Tab Art Pass

Avery + Mira — art direction and species-specific anatomy-study checklist.

> **Status: planning / prototype.** Draft PR #125; not for merging until art assets, biological accuracy and UI integration receive Avery's approval.

## Core design principle

**Research teaches clues; tagging earns the full shark reveal.**

- Each species gets its own **isolated, partial anatomical feature study**. No entire shark, full silhouette, head-to-tail profile, or almost-complete crop.
- The artwork must **not** reveal the whole shark through connected or multiple adjacent fragments.
- Encounter and Collection retain the complete illustrated animal; Wild Archive retains real wildlife imagery.
- Species-specific identifying features are educational clues, **not always uniquely diagnostic**.

## Visual art contract — approved

- **Field-notebook look**, like a marine naturalist's quick yet accurate drawing: loose/confident graphite or ink strokes, **minimal shading or hatching**, no polished engravings or photographic texture.
- **No text inside images**: no labels, scientific names, captions, headings, or leader lines. EN/FR captions and scientific explanations live in the app, not the art.
- **Landscape aspect ratio at least 2:1** (width ≥ twice height); prefer 2.5:1–3:1, or wider if anatomy suits. A common ~1600×640 working export is fine, not mandatory.
- Bright plain background, clear figure, breathing room, legible on iPhone/iPad. Preserve realistic morphology and feature counts even when rendering simply.
- Consistency of **style**, not identical detail; each of the 50 studies must be distinct and scientifically reviewed.

## First style prototype: common thresher — VISUALLY APPROVED

- **Subject:** partial caudal peduncle and caudal fin only, with dramatically elongated upper lobe and shorter lower lobe.
- **Approved sketch:** second generated iteration, **1983×793 (~2.5:1)**, text-free, white background and restrained sketch lines. Avery's verdict: **"I think this is the one."**
- **Status:** **approved visual style reference**. The source image was generated in the ChatGPT conversation as `a_wide_minimalist_high_resolution_pencil_graphit.png`. **Binary artwork is not yet committed in this PR; its asset path remains pending.** Do not substitute or regenerate it without Avery's request.
- **Scientific verification still needed:** compare caudal-lobe shape and small fin-like protrusions near the tail base against real common-thresher specimens. A long upper tail is shared by all thresher species, not uniquely definitive for `Alopias vulpinus`.
- No further image generation until Avery explicitly resumes it.

## Research study checklist — canonical 50-shark roster

These are initial proposed **features**, not final verified anatomy. **[x] means Avery has approved the illustration visually**; biological verification, file commit, and game integration are tracked separately. Unchecked entries have not yet received individual visual approval.

- [ ] **01. Nurse Shark** (`nurse`) — Close-up of paired sensory barbels beneath the snout
- [x] ✅ **02. Thresher Shark** (`thresher`) — Isolated elongated upper tail lobe, showing the caudal-fin base and tip. **Visual approved**; anatomy verification and PNG asset commit pending.
- [ ] **03. Whale Shark** (`whale`) — Close crop of flank spots and pale stripes; no body outline
- [ ] **04. Goblin Shark** (`goblin`) — Cropped rostrum and protrusible jaws in a two-state detail
- [ ] **05. Tiger Shark** (`tiger`) — Flank stripe-pattern crop; optional juvenile/adult skin swatches
- [ ] **06. Sand Tiger Shark** (`sandtiger`) — Partially open mouth showing protruding narrow teeth
- [ ] **07. Galápagos Shark** (`galapagos`) — First-dorsal-fin profile and rear edge crop **[confirm distinguishing value against dusky]**
- [ ] **08. Great White Shark** (`greatwhite`) — Close-up of broad, triangular serrated teeth
- [ ] **09. Great Hammerhead** (`hammerhead`) — Overhead crop of the near-straight cephalofoil leading edge
- [ ] **10. Shortfin Mako** (`mako`) — Narrow, smooth-edged teeth and a small jaw segment
- [ ] **11. Basking Shark** (`basking`) — Huge filtering mouth plus adjacent gill-opening detail; **not** the full plate from PR #90
- [ ] **12. Epaulette Shark** (`epaulette`) — Shoulder eyespot and nearby fin-base detail
- [ ] **13. Lemon Shark** (`lemon`) — First and second dorsal fins as matching isolated close-ups, to compare relative size
- [ ] **14. Blacktip Reef Shark** (`blacktip`) — First-dorsal-fin black tip with its pale edging
- [ ] **15. Whitetip Reef Shark** (`whitetip`) — White dorsal-fin tip and an isolated caudal-tip detail
- [ ] **16. Blue Shark** (`blue`) — Exceptionally long, narrow pectoral-fin study; exclude trunk and full outline
- [ ] **17. Porbeagle** (`porbeagle`) — White trailing patch at the rear of the first dorsal fin
- [ ] **18. Silky Shark** (`silky`) — Low swept first dorsal: fin shape and insertion detail **[verify reference]**
- [ ] **19. Oceanic Whitetip** (`oceanic`) — Broad, rounded pectoral-fin tip with mottled white margin
- [ ] **20. Broadnose Sevengill** (`sevengill`) — Seven gill slits counted on a close-cropped side section
- [ ] **21. Bronze Whaler** (`bronze`) — Bronze-coloured flank patch with adjacent fin-edge context **[not a standalone diagnosis]**
- [ ] **22. Frilled Shark** (`frilled`) — Ruffled gill membranes of the head/neck, close-cropped
- [ ] **23. Zebra Shark** (`zebra`) — Paired skin-pattern details: juvenile stripes versus adult spots
- [ ] **24. Scalloped Hammerhead** (`scalloped`) — Overhead cephalofoil edge showing the central notch and scallops
- [ ] **25. Smooth Hammerhead** (`smooth`) — Overhead cephalofoil edge showing the smooth unnotched curve
- [ ] **26. Bonnethead** (`bonnethead`) — Overhead close-up of the rounded shovel-shaped head
- [ ] **27. Bull Shark** (`bull`) — Heavy, blunt snout in partial head profile; no full body
- [ ] **28. Grey Reef Shark** (`greyreef`) — Dark trailing margin on the caudal fin, cropped
- [ ] **29. Caribbean Reef Shark** (`caribbean`) — Small second-dorsal / interdorsal-area study **[research reliability before locking]**
- [ ] **30. Sandbar Shark** (`sandbar`) — Exceptionally tall first dorsal fin with a small base segment
- [ ] **31. Salmon Shark** (`salmon`) — Pale underside with characteristic dark mottling, close crop
- [ ] **32. Dusky Shark** (`dusky`) — First-dorsal-fin shape and insertion crop **[compare directly with Galápagos]**
- [ ] **33. Silvertip Shark** (`silvertip`) — Silver-white margins on two isolated fin-tip close-ups
- [ ] **34. Spinner Shark** (`spinner`) — Dark-tipped anal fin of an adult, with only minimal adjoining tissue
- [ ] **35. Spotted Wobbegong** (`wobbegong`) — Fringed oral dermal lobes/barbels and neighbouring skin markings
- [ ] **36. Leopard Shark** (`leopard`) — Bold dark saddles and spots in a dorsal skin-pattern crop
- [ ] **37. Horn Shark** (`horn`) — Dorsal-fin spine close-up; optional matching second-spine inset
- [ ] **38. Port Jackson Shark** (`portjackson`) — Harness-shaped dark bands across a small upper-back crop
- [ ] **39. Common Angelshark** (`angelshark`) — Partial overhead head and pectoral-fin-origin study showing flattening, not full disc/body
- [ ] **40. Megamouth Shark** (`megamouth`) — Broad cavernous mouth and fleshy snout in tight crop
- [ ] **41. Common Sawshark** (`sawshark`) — Toothed rostrum with the characteristic paired barbels
- [ ] **42. Greenland Shark** (`greenland`) — Tiny spineless dorsal-fin detail with a short strip of back **[avoid claiming uniquely diagnostic]**
- [ ] **43. Cookiecutter Shark** (`cookiecutter`) — Suction lips and broad lower cutting teeth in two close-up insets
- [ ] **44. Bluntnose Sixgill Shark** (`sixgill`) — Six gill slits counted on a matched crop to the sevengill study
- [ ] **45. Velvet-Belly Lanternshark** (`velvetbelly`) — Ventral light-producing photophore patch
- [ ] **46. Dwarf Lanternshark** (`dwarflantern`) — Minute photophore/skin detail with a properly calibrated scale bar; no adult full-body size reveal
- [ ] **47. Kitefin Shark** (`kitefin`) — Contrasting slim upper teeth and broad lower cutting teeth
- [ ] **48. Pacific Sleeper Shark** (`pacificsleeper`) — Small-eye/blunt-snout close-up or denticle study **[research best-supported feature]**
- [ ] **49. Spiny Dogfish** (`spinydogfish`) — Dorsal spine directly preceding a dorsal fin, close crop
- [ ] **50. Small-Spotted Catshark** (`catshark`) — Dense small dark spotting on a sandy-coloured flank crop

## Production workflow

1. Review a small batch of **4–6** cropped studies at the **actual Research tab display size**, with real-specimen references.
2. Track `id | feature | crop/view | scientific references | file path | visual approval | anatomy verification | EN/FR UI notes`.
3. Check especially close lookalikes: hammerhead head shapes, sixgill/sevengill gill sections, shark fin-tip variants, and white-shark/mako tooth differences. Galápagos, Caribbean reef and Pacific sleeper features remain tentative.
4. A separate basking-shark full plate remains in PR #90 as an *older linework reference only*; it violates the no-full-shark rule for direct Research use.
5. Six old minimalist SVGs in repo-relative `sketches/` are incomplete placeholder starts, not approved finished anatomy studies.
6. Only integrate once anatomy and visuals are approved; require all 50 IDs to resolve to unique real assets with accessible localized UI descriptions. Do not merge automatically.

— Mira 🩵🦈
