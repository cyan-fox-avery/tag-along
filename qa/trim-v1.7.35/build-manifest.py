#!/usr/bin/env python3
"""QA manifest for Tag Along v1.7.35-beta illustration re-trim.

Compares ORIGINAL illustrations (main @ d1df7b6) against the CURRENT
illustrations in this working tree for all 50 game species.

v1.7.34 trimmed all 50 files to the bbox of alpha>0 pixels, but the
source illustrations carry faint alpha noise (1-6 px/row, alpha ~1-130)
scattered across the canvas, so for 24 species the bbox stayed
near-full-canvas and the trim barely cut anything. v1.7.35 re-trims
those 24 species to the bbox of alpha>=200 pixels, so the noise no
longer counts as content. The other 26 species are untouched since
v1.7.34 (their files still match the alpha>0 bbox).

Per species records:
  - original dims, current dims, crop offset (bbox of alpha>=threshold
    in original, threshold 200 for the 24 re-trimmed species, 1 for
    the other 26)
  - geometry check: current dims == bbox dims
  - alpha check: current pasted back at its offset vs original alpha
    (max abs diff, % pixels differing) — alpha must be exact
  - RGB check on visible pixels (alpha >= threshold in the original):
    mean abs diff, % pixels differing by >10 (documents the deliberate
    lossy re-encode tradeoff)
  - encoding (VP8L lossless / VP8X lossy) and file sizes

Writes qa/trim-v1.7.35/manifest.json in the repo working tree.

Portable: the repo root is derived from this file's own location, and the
ORIGINAL illustrations are read from pinned baseline commit d1df7b6 via
`git show <sha>:assets/sharks-webp/<file>` inside the repo — no
machine-local scratch directories are needed.

Usage (from anywhere):
  python3 qa/trim-v1.7.35/build-manifest.py
  python3 qa/trim-v1.7.35/build-manifest.py --original-dir <dir>

With --original-dir, originals are read from <dir> instead of the pinned
baseline commit. Populate it reproducibly with:
  git archive d1df7b687ee9f2aa0b8657ce7c1b19ab3f25c2d2 assets/sharks-webp \\
    | tar -x -C <dir>
  python3 qa/trim-v1.7.35/build-manifest.py --original-dir <dir>/assets/sharks-webp
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

REPO = Path(__file__).resolve().parents[2]
NEW_DIR = REPO / "assets/sharks-webp"
OUT_DIR = REPO / "qa/trim-v1.7.35"

# Baseline commit whose illustrations are the "before" side of the
# comparison (main at the PR #99 merge). Pinned so a re-run in any clone
# compares against the same originals.
BASELINE_SHA = "d1df7b687ee9f2aa0b8657ce7c1b19ab3f25c2d2"
# Branch head at push time (filled in after the first push; the numeric
# record is identical regardless — only this provenance string changes).
AFTER_SHA = "PENDING"

# Species re-trimmed in v1.7.35 to the alpha>=200 bbox (the other 26 keep
# the v1.7.34 alpha>0 bbox). Scope rule: the >=200 crop removes >=15% of
# the old crop's height or width.
RETRIMMED = {
    "goblin", "galapagos", "greatwhite", "mako", "epaulette", "lemon",
    "blacktip", "porbeagle", "sevengill", "frilled", "scalloped",
    "bonnethead", "bull", "sandbar", "dusky", "silvertip", "spinner",
    "portjackson", "angelshark", "greenland", "sixgill", "velvetbelly",
    "pacificsleeper", "spinydogfish",
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


def analyze(sid, name, original_dir):
    slug = SLUG_MAP.get(sid, sid)
    fname = f"{slug}-illustration.webp"
    orig_bytes = load_original_bytes(fname, original_dir)
    new_path = NEW_DIR / fname

    orig = Image.open(io.BytesIO(orig_bytes)).convert("RGBA")
    new = Image.open(new_path).convert("RGBA")
    ow, oh = orig.size
    nw, nh = new.size

    # Crop offset = bbox of alpha>=threshold pixels in the original.
    # Threshold 200 for the 24 re-trimmed species (noise no longer counts
    # as content), 1 for the 26 untouched since v1.7.34 (alpha>0 bbox).
    threshold = 200 if sid in RETRIMMED else 1
    alpha = np.array(orig.split()[3]).astype(np.int32)
    ys, xs = np.where(alpha >= threshold)
    assert len(xs) > 0, f"{sid}: original fully transparent?!"
    left, top, right, bottom = int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1
    crop_w, crop_h = right - left, bottom - top
    geometry_ok = (nw, nh) == (crop_w, crop_h)

    # Paste current back at its offset onto an original-size canvas,
    # compare alpha channel against the original — but ONLY inside the
    # crop rectangle. Outside the crop the original legitimately holds
    # the faint noise (alpha < 200) that the re-trim removed, so the
    # canvas there is 0 by design; assert that instead.
    canvas = Image.new("RGBA", (ow, oh), (0, 0, 0, 0))
    # Straight pixel copy, NO mask: paste() with a mask would blend
    # semi-transparent pixels toward transparent-black and corrupt the diff.
    canvas.paste(new, (left, top))
    crop_alpha_orig = alpha[top:bottom, left:right]
    crop_alpha_new = np.array(canvas.split()[3])[top:bottom, left:right].astype(np.int32)
    alpha_diffs = np.abs(crop_alpha_orig - crop_alpha_new)
    alpha_max = int(alpha_diffs.max())
    alpha_pct_diff = 100.0 * float((alpha_diffs != 0).mean())
    outside = alpha.copy()
    outside[top:bottom, left:right] = 0
    outside_max = int(outside.max())
    assert outside_max < threshold, (
        f"{sid}: original alpha {outside_max} outside the crop >= threshold {threshold}")

    # RGB comparison on pixels visible in the ORIGINAL (alpha >= threshold).
    orig_px = list(orig.getdata())
    new_px = list(canvas.getdata())
    diffs = []
    for (r1, g1, b1, a1), (r2, g2, b2, a2) in zip(orig_px, new_px):
        if a1 >= threshold:
            diffs.append((abs(r1 - r2) + abs(g1 - g2) + abs(b1 - b2)) / 3.0)
    mean_rgb_diff = sum(diffs) / len(diffs) if diffs else 0.0
    pct_gt10 = 100.0 * sum(1 for d in diffs if d > 10) / len(diffs) if diffs else 0.0

    return {
        "id": sid,
        "name": name,
        "file": fname,
        "encoding": webp_fourcc(new_path),
        "alpha_threshold": threshold,
        "retrimmed_in_v1_7_35": sid in RETRIMMED,
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
        "checks": {
            "geometry_trimmed_dims_equal_alpha_bbox": geometry_ok,
            "alpha_max_abs_diff": alpha_max,
            "alpha_pct_pixels_differing": round(alpha_pct_diff, 4),
            "alpha_exact": alpha_max == 0,
            "alpha_max_outside_crop": outside_max,
            "rgb_mean_abs_diff_visible_px": round(mean_rgb_diff, 3),
            "rgb_pct_visible_px_diff_gt10": round(pct_gt10, 3),
        },
    }


def main():
    parser = argparse.ArgumentParser(
        description="Build qa/trim-v1.7.35/manifest.json by comparing the "
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

    entries = []
    for sid, name in species:
        e = analyze(sid, name, args.original_dir)
        entries.append(e)
        c = e["checks"]
        print(
            f"{e['name']:22s} {e['original']['width']}x{e['original']['height']} -> "
            f"{e['trimmed']['width']}x{e['trimmed']['height']} "
            f"thr={e['alpha_threshold']} "
            f"geom_ok={c['geometry_trimmed_dims_equal_alpha_bbox']} "
            f"alpha_exact={c['alpha_exact']} "
            f"rgb_mean={c['rgb_mean_abs_diff_visible_px']} "
            f"rgb_>10={c['rgb_pct_visible_px_diff_gt10']}%"
        )

    total_orig = sum(e["original"]["bytes"] for e in entries)
    total_new = sum(e["trimmed"]["bytes"] for e in entries)
    area_orig = sum(e["original"]["width"] * e["original"]["height"] for e in entries)
    area_new = sum(e["trimmed"]["width"] * e["trimmed"]["height"] for e in entries)
    bad_geom = [e["id"] for e in entries if not e["checks"]["geometry_trimmed_dims_equal_alpha_bbox"]]
    bad_alpha = [e["id"] for e in entries if not e["checks"]["alpha_exact"]]

    manifest = {
        "version": "v1.7.35-beta",
        "generated_by": "qa/trim-v1.7.35/build-manifest.py",
        "method": (
            "v1.7.35 re-trims 24 species to the bbox of alpha>=200 pixels "
            "in the original (the v1.7.34 alpha>0 bbox kept faint alpha "
            "noise, so those trims barely cut anything). The other 26 "
            "species are untouched since v1.7.34 (alpha>0 bbox). "
            "Re-trimmed files re-encoded lossy WebP (q90; lemon q95). "
            "Alpha verified by pasting each current file back at its crop "
            "offset onto an original-size transparent canvas and diffing "
            "the alpha channel."
        ),
        "commits": {
            "before_originals": "d1df7b687ee9f2aa0b8657ce7c1b19ab3f25c2d2 (main, PR #99 merge)",
            "before_v1_7_34_files": "2f19cb5590d26d2355761f9582e1eb024cd3476f (main, PR #101 merge)",
            "after_retrimmed": AFTER_SHA,
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
        },
        "species": entries,
    }

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, "manifest.json")
    with open(out_path, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"\nWrote {out_path}")
    print(f"Totals: {total_orig} -> {total_new} bytes; area {area_orig} -> {area_new} px")
    print(f"Geometry failures: {bad_geom}; alpha failures: {bad_alpha}")
    if bad_geom or bad_alpha:
        sys.exit(1)


if __name__ == "__main__":
    main()
