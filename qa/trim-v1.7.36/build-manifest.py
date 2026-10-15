#!/usr/bin/env python3
"""QA manifest for Tag Along v1.7.36-beta illustration component crop.

Compares ORIGINAL illustrations (main @ d1df7b6) against the CURRENT
illustrations in this working tree for all 50 game species.

History: v1.7.34 trimmed all 50 files to the bbox of alpha>0 pixels, but
faint alpha noise kept 24 species near-full-canvas. v1.7.35 re-trimmed
those 24 to the bbox of alpha>=200 pixels. That still left dead space
in 13 species: their source art carries full-opacity (alpha 200-255)
single-pixel specks, detached from the shark, with hundreds of empty
rows between specks and shark. No alpha threshold can remove them (one
speck is alpha 255); only connectivity distinguishes them. v1.7.36 crops
those 13 species to the bbox of the largest 8-connected component of
alpha>=200 pixels, plus a 3px safety margin on all sides (preserving
the soft anti-aliased halo adjacent to the shark; the nearest speck is
7 rows away, so the margin cannot re-include one).

Per species records:
  - original dims, current dims, crop offset (method depends on group:
    COMPONENT = largest-8-connected-component bbox of alpha>=200 + 3px
    margin; ALPHA200 = bbox of alpha>=200; ALPHA1 = bbox of alpha>0)
  - component analysis (8-connectivity, alpha>=200): largest component
    size/share/bbox, second-largest component size, largest removed
    connected component (max size of any alpha>=200 component lying
    entirely outside the crop — the field Mira asked to record in the
    PR #102 review), detached opaque px inside the crop (specks within
    the 3px margin band that survive by design, each <=2px)
  - geometry check: current dims == expected crop dims
  - alpha check: current pasted back at its offset vs original alpha
    (max abs diff, % pixels differing) — alpha must be exact in-crop
  - RGB check on visible pixels (alpha >= 200 in the original, in-crop):
    mean abs diff, % pixels differing by >10 (documents the deliberate
    lossy re-encode tradeoff)
  - encoding (VP8L lossless / VP8X lossy) and file sizes

Writes qa/trim-v1.7.36/manifest.json in the repo working tree.

Portable: the repo root is derived from this file's own location, and the
ORIGINAL illustrations are read from pinned baseline commit d1df7b6 via
`git show <sha>:assets/sharks-webp/<file>` inside the repo — no
machine-local scratch directories are needed.

Usage (from anywhere):
  python3 qa/trim-v1.7.36/build-manifest.py
  python3 qa/trim-v1.7.36/build-manifest.py --original-dir <dir>

With --original-dir, originals are read from <dir> instead of the pinned
baseline commit. Populate it reproducibly with:
  git archive d1df7b687ee9f2aa0b8657ce7c1b19ab3f25c2d2 assets/sharks-webp \\
    | tar -x -C <dir>
  python3 qa/trim-v1.7.36/build-manifest.py --original-dir <dir>/assets/sharks-webp
"""
import argparse
import io
import json
import os
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

REPO = Path(__file__).resolve().parents[2]
NEW_DIR = REPO / "assets/sharks-webp"
OUT_DIR = REPO / "qa/trim-v1.7.36"

# Baseline commit whose illustrations are the "before" side of the
# comparison (main at the PR #99 merge). Pinned so a re-run in any clone
# compares against the same originals.
BASELINE_SHA = "d1df7b687ee9f2aa0b8657ce7c1b19ab3f25c2d2"
# Branch head at push time (filled in after the first push; the numeric
# record is identical regardless — only this provenance string changes).
AFTER_SHA = "TBD (filled after push)"

MARGIN = 3
STRUCT = np.ones((3, 3), dtype=int)  # 8-connectivity

# Species component-cropped in v1.7.36 (largest-8-connected-component
# bbox of alpha>=200 + 3px margin). The other species are untouched
# since v1.7.35 (ALPHA200 group) or v1.7.34 (ALPHA1 group).
COMPONENT = {
    "tiger", "greatwhite", "frilled", "sandbar", "portjackson",
    "greenland", "pacificsleeper", "spinydogfish",
    "silvertip", "sixgill", "bonnethead", "dusky", "galapagos",
}

# Species re-trimmed in v1.7.35 to the alpha>=200 bbox, NOT re-cropped
# in v1.7.36 (the v1.7.35 set minus the 12 that are in COMPONENT).
ALPHA200 = {
    "goblin", "mako", "epaulette", "lemon", "blacktip", "porbeagle",
    "sevengill", "scalloped", "bull", "spinner", "angelshark", "velvetbelly",
}

SLUG_MAP = {
    "blacktip": "blacktip-reef",
    "greatwhite": "great-white",
    "oceanic": "oceanic-whitetip",
    "whitetip": "whitetip-reef",
    "scalloped": "scalloped-hammerhead",
    "smooth": "smooth-hammerhead",
    "greyreef": "grey-reef",
    "caribbean": "caribbean-reef",
    "portjackson": "port-jackson",
    "velvetbelly": "velvet-belly",
    "pacificsleeper": "pacific-sleeper",
    "spinydogfish": "spiny-dogfish",
}


def species_list():
    """Parse id/name pairs from sharks-data.js SHARKS array."""
    src = (REPO / "sharks-data.js").read_text()
    pairs = re.findall(r'id:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)"', src)
    return pairs


def load_original_bytes(fname, original_dir):
    """Return the bytes of an ORIGINAL illustration file.

    Default: `git show <BASELINE_SHA>:assets/sharks-webp/<file>` in REPO,
    so a fresh clone needs no pre-staged originals. With --original-dir,
    read from that directory instead.
    """
    if original_dir is not None:
        path = Path(original_dir) / fname
        if not path.is_file():
            raise SystemExit(f"original not found: {path}")
        return path.read_bytes()
    try:
        proc = subprocess.run(
            ["git", "show", f"{BASELINE_SHA}:assets/sharks-webp/{fname}"],
            cwd=REPO, capture_output=True, check=True,
        )
    except subprocess.CalledProcessError:
        raise SystemExit(
            f"could not read {fname} from baseline commit {BASELINE_SHA} "
            f"(is it present in this clone? try a full clone, or pass "
            f"--original-dir with the originals extracted)"
        )
    return proc.stdout


def webp_fourcc(path):
    with open(path, "rb") as f:
        head = f.read(16)
    return head[12:16].decode("ascii")


def label_components(mask):
    lab, n = ndimage.label(mask, structure=STRUCT)
    sizes = ndimage.sum(np.ones_like(lab), lab, index=np.arange(1, n + 1))
    return lab, sizes


def analyze(sid, name, original_dir):
    slug = SLUG_MAP.get(sid, sid)
    fname = f"{slug}-illustration.webp"
    orig_bytes = load_original_bytes(fname, original_dir)
    new_path = NEW_DIR / fname

    orig = Image.open(io.BytesIO(orig_bytes)).convert("RGBA")
    new = Image.open(new_path).convert("RGBA")
    ow, oh = orig.size
    nw, nh = new.size

    alpha = np.array(orig.split()[3]).astype(np.int32)
    opaque = alpha >= 200

    # --- Component analysis (8-connectivity, alpha>=200) ---
    lab, sizes = label_components(opaque)
    order = np.argsort(-sizes)
    largest_id = int(order[0]) + 1
    largest_px = int(sizes[order[0]])
    second_px = int(sizes[order[1]]) if len(sizes) > 1 else 0
    total_opaque = int(opaque.sum())
    ys, xs = np.where(lab == largest_id)
    comp_bbox = [int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1]
    ys2, xs2 = np.where(opaque)
    alpha200_bbox = [int(xs2.min()), int(ys2.min()), int(xs2.max()) + 1, int(ys2.max()) + 1]
    ys1, xs1 = np.where(alpha > 0)
    alpha1_bbox = [int(xs1.min()), int(ys1.min()), int(xs1.max()) + 1, int(ys1.max()) + 1]

    # --- Expected crop, by group ---
    if sid in COMPONENT:
        method = "largest-8-connected-component bbox of alpha>=200 + 3px margin"
        left = max(0, comp_bbox[0] - MARGIN)
        top = max(0, comp_bbox[1] - MARGIN)
        right = min(ow, comp_bbox[2] + MARGIN)
        bottom = min(oh, comp_bbox[3] + MARGIN)
        threshold = 200
    elif sid in ALPHA200:
        method = "bbox of alpha>=200 pixels"
        left, top, right, bottom = alpha200_bbox
        threshold = 200
    else:
        method = "bbox of alpha>0 pixels"
        left, top, right, bottom = alpha1_bbox
        threshold = 1
    crop_w, crop_h = right - left, bottom - top
    geometry_ok = (nw, nh) == (crop_w, crop_h)

    # Removed region: everything outside the crop. Opaque pixels removed
    # must belong only to detached components <= 2px (recorded).
    removed_mask = opaque.copy()
    removed_mask[top:bottom, left:right] = False
    _, rsizes = label_components(removed_mask)
    largest_removed = int(rsizes.max()) if len(rsizes) else 0
    removed_opaque = int(removed_mask.sum())
    # Detached opaque px surviving INSIDE the crop (specks within the
    # 3px margin band — kept by design, each <= 2px, invisible).
    inside = np.zeros_like(opaque)
    inside[top:bottom, left:right] = True
    detached_inside = int(((lab != largest_id) & opaque & inside).sum())

    # Paste current back at its offset onto an original-size canvas,
    # compare alpha channel against the original — but ONLY inside the
    # crop rectangle. Outside the crop the original legitimately holds
    # removed noise/specks, so the canvas there is 0 by design.
    canvas = Image.new("RGBA", (ow, oh), (0, 0, 0, 0))
    # Straight pixel copy, NO mask: paste() with a mask would blend
    # semi-transparent pixels toward transparent-black and corrupt the diff.
    canvas.paste(new, (left, top))
    crop_alpha_orig = alpha[top:bottom, left:right]
    crop_alpha_new = np.array(canvas.split()[3])[top:bottom, left:right].astype(np.int32)
    alpha_diffs = np.abs(crop_alpha_orig - crop_alpha_new)
    alpha_max = int(alpha_diffs.max())
    alpha_pct_diff = 100.0 * float((alpha_diffs != 0).mean())

    # RGB comparison on pixels visible in the ORIGINAL (alpha >= 200),
    # inside the crop only.
    orig_px = np.array(orig)
    new_px = np.array(canvas)
    vis = (crop_alpha_orig >= 200)
    if vis.any():
        d = np.abs(orig_px[top:bottom, left:right][vis].astype(np.int32)[:, :3]
                   - new_px[top:bottom, left:right][vis].astype(np.int32)[:, :3]).mean(axis=1)
        mean_rgb_diff = float(d.mean())
        pct_gt10 = 100.0 * float((d > 10).mean())
    else:
        mean_rgb_diff, pct_gt10 = 0.0, 0.0

    return {
        "id": sid,
        "name": name,
        "file": fname,
        "encoding": webp_fourcc(new_path),
        "crop_method": method,
        "component_cropped_in_v1_7_36": sid in COMPONENT,
        "retrimmed_in_v1_7_35": sid in ALPHA200 or sid in COMPONENT,
        "original": {
            "width": ow, "height": oh,
            "bytes": len(orig_bytes),
        },
        "trimmed": {
            "width": nw, "height": nh,
            "bytes": os.path.getsize(new_path),
        },
        "crop": {
            "left": left, "top": top,
            "cut_top": top, "cut_bottom": oh - bottom,
            "cut_left": left, "cut_right": ow - right,
        },
        "component_analysis": {
            "connectivity": "8-connected (3x3 structuring element)",
            "alpha_threshold": 200,
            "total_opaque_px": total_opaque,
            "largest_component_px": largest_px,
            "largest_component_share_of_opaque": round(largest_px / total_opaque, 6),
            "second_largest_component_px": second_px,
            "largest_component_bbox": comp_bbox,
            "alpha200_bbox": alpha200_bbox,
            "largest_removed_connected_component_px": largest_removed,
            "removed_opaque_px": removed_opaque,
            "detached_opaque_px_inside_crop": detached_inside,
        },
        "checks": {
            "geometry_trimmed_dims_equal_expected_crop": geometry_ok,
            "alpha_max_abs_diff": alpha_max,
            "alpha_pct_pixels_differing": round(alpha_pct_diff, 4),
            "alpha_exact": alpha_max == 0,
            "largest_removed_connected_component_px": largest_removed,
            "removed_only_detached_specks_le_2px": largest_removed <= 2,
            "rgb_mean_abs_diff_visible_px": round(mean_rgb_diff, 3),
            "rgb_pct_visible_px_diff_gt10": round(pct_gt10, 3),
        },
    }


def main():
    parser = argparse.ArgumentParser(
        description="Build qa/trim-v1.7.36/manifest.json by comparing the "
        "pinned-baseline original illustrations against the current files "
        "in this working tree."
    )
    parser.add_argument(
        "--original-dir",
        default=None,
        help="Read ORIGINAL illustrations from this directory instead of "
        "the pinned baseline commit (see module docstring for the "
        "reproducible command to populate it).",
    )
    args = parser.parse_args()

    species = species_list()
    print(f"{len(species)} species in sharks-data.js")
    assert len(species) == 50, f"expected 50 species, got {len(species)}"
    assert len(COMPONENT) == 13, f"expected 13 component-cropped, got {len(COMPONENT)}"
    assert len(ALPHA200) == 12, f"expected 12 alpha200, got {len(ALPHA200)}"
    assert not (COMPONENT & ALPHA200), "COMPONENT and ALPHA200 overlap!"

    entries = []
    for sid, name in species:
        e = analyze(sid, name, args.original_dir)
        entries.append(e)
        c = e["checks"]
        ca = e["component_analysis"]
        print(
            f"{e['name']:22s} {e['original']['width']}x{e['original']['height']} -> "
            f"{e['trimmed']['width']}x{e['trimmed']['height']} "
            f"{'COMP' if e['component_cropped_in_v1_7_36'] else ('A200' if sid in ALPHA200 else 'A1  ')} "
            f"geom_ok={c['geometry_trimmed_dims_equal_expected_crop']} "
            f"alpha_exact={c['alpha_exact']} "
            f"removed_max={ca['largest_removed_connected_component_px']} "
            f"rgb_mean={c['rgb_mean_abs_diff_visible_px']} "
            f"rgb_>10={c['rgb_pct_visible_px_diff_gt10']}%"
        )

    total_orig = sum(e["original"]["bytes"] for e in entries)
    total_new = sum(e["trimmed"]["bytes"] for e in entries)
    area_orig = sum(e["original"]["width"] * e["original"]["height"] for e in entries)
    area_new = sum(e["trimmed"]["width"] * e["trimmed"]["height"] for e in entries)
    bad_geom = [e["id"] for e in entries if not e["checks"]["geometry_trimmed_dims_equal_expected_crop"]]
    bad_alpha = [e["id"] for e in entries if not e["checks"]["alpha_exact"]]
    bad_removed = [e["id"] for e in entries if not e["checks"]["removed_only_detached_specks_le_2px"]]

    manifest = {
        "version": "v1.7.36-beta",
        "generated_by": "qa/trim-v1.7.36/build-manifest.py",
        "method": (
            "v1.7.36 component-crops 13 species to the bbox of the largest "
            "8-connected component of alpha>=200 pixels in the original, "
            "plus a 3px safety margin on all sides. Those 13 still had dead "
            "space after the v1.7.35 alpha>=200 trim because their source "
            "art carries full-opacity (alpha 200-255) single-pixel specks, "
            "detached from the shark, with hundreds of empty rows between "
            "specks and shark — no alpha threshold can remove them. The "
            "other 37 species are untouched since v1.7.35 (12 at the "
            "alpha>=200 bbox) or v1.7.34 (25 at the alpha>0 bbox). "
            "Component-cropped files re-encoded lossy WebP (q90). "
            "Alpha verified by pasting each current file back at its crop "
            "offset onto an original-size transparent canvas and diffing "
            "the alpha channel inside the crop."
        ),
        "commits": {
            "before_originals": "d1df7b687ee9f2aa0b8657ce7c1b19ab3f25c2d2 (main, PR #99 merge)",
            "before_v1_7_35_files": "34b5556c13496cc75778fa8c2c6a73a6bc3502a4 (main, PR #102 merge)",
            "after_component_cropped": AFTER_SHA,
        },
        "totals": {
            "species": len(entries),
            "original_bytes": total_orig,
            "trimmed_bytes": total_new,
            "original_area_px": area_orig,
            "trimmed_area_px": area_new,
        },
        "global_checks": {
            "all_geometry_ok": not bad_geom,
            "geometry_failures": bad_geom,
            "all_alpha_exact": not bad_alpha,
            "alpha_failures": bad_alpha,
            "all_removed_only_specks": not bad_removed,
            "removed_failures": bad_removed,
        },
        "species": entries,
    }

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, "manifest.json")
    with open(out_path, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"\nWrote {out_path}")
    print(f"Totals: {total_orig} -> {total_new} bytes; area {area_orig} -> {area_new} px")
    print(f"Geometry failures: {bad_geom}; alpha failures: {bad_alpha}; removed failures: {bad_removed}")
    if bad_geom or bad_alpha or bad_removed:
        sys.exit(1)


if __name__ == "__main__":
    main()
