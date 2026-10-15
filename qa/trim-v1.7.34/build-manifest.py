#!/usr/bin/env python3
"""QA manifest for Tag Along v1.7.34-beta illustration trim.

Compares ORIGINAL illustrations (main @ d1df7b6) against TRIMMED
lossy illustrations (branch v1.7.34-trim-art) for all 50 game species.

Per species records:
  - original dims, trimmed dims, crop offset (bbox of alpha>0 in original)
  - geometry check: trimmed dims == bbox dims
  - alpha check: trimmed pasted back at offset vs original alpha
    (max abs diff, % pixels differing) — alpha must be exact
  - RGB check on visible pixels: mean abs diff, % pixels differing by >10
    (documents the deliberate lossy re-encode tradeoff)
  - encoding (VP8L lossless / VP8X lossy) and file sizes

Writes qa/trim-v1.7.34/manifest.json in the repo working tree.
"""
import json
import os
import re
import subprocess
import sys

from PIL import Image

REPO = "/tmp/ta101fix/repo"
ORIG_DIR = "/tmp/ta101fix/orig/assets/sharks-webp"
NEW_DIR = os.path.join(REPO, "assets/sharks-webp")
OUT_DIR = os.path.join(REPO, "qa/trim-v1.7.34")

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
    src = open(os.path.join(REPO, "sharks-data.js")).read()
    pairs = re.findall(r'id:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)"', src)
    return pairs


def webp_fourcc(path):
    with open(path, "rb") as f:
        head = f.read(16)
    return head[12:16].decode("ascii")


def analyze(sid, name):
    slug = SLUG_MAP.get(sid, sid)
    fname = f"{slug}-illustration.webp"
    orig_path = os.path.join(ORIG_DIR, fname)
    new_path = os.path.join(NEW_DIR, fname)

    orig = Image.open(orig_path).convert("RGBA")
    new = Image.open(new_path).convert("RGBA")
    ow, oh = orig.size
    nw, nh = new.size

    # Crop offset = bbox of alpha>0 pixels in the original.
    alpha = orig.split()[3]
    bbox = alpha.getbbox()  # (left, upper, right, lower), None if fully transparent
    assert bbox is not None, f"{sid}: original fully transparent?!"
    left, top, right, bottom = bbox
    crop_w, crop_h = right - left, bottom - top
    geometry_ok = (nw, nh) == (crop_w, crop_h)

    # Paste trimmed back at its offset onto an original-size canvas,
    # compare alpha channel against the original.
    canvas = Image.new("RGBA", (ow, oh), (0, 0, 0, 0))
    # Straight pixel copy, NO mask: paste() with a mask would blend
    # semi-transparent pixels toward transparent-black and corrupt the diff.
    canvas.paste(new, (left, top))
    orig_alpha = list(orig.split()[3].getdata())
    new_alpha = list(canvas.split()[3].getdata())
    alpha_diffs = [abs(a - b) for a, b in zip(orig_alpha, new_alpha)]
    alpha_max = max(alpha_diffs)
    alpha_pct_diff = 100.0 * sum(1 for d in alpha_diffs if d != 0) / len(alpha_diffs)

    # RGB comparison on pixels visible in the ORIGINAL (alpha > 0).
    orig_px = list(orig.getdata())
    new_px = list(canvas.getdata())
    diffs = []
    for (r1, g1, b1, a1), (r2, g2, b2, a2) in zip(orig_px, new_px):
        if a1 > 0:
            diffs.append((abs(r1 - r2) + abs(g1 - g2) + abs(b1 - b2)) / 3.0)
    mean_rgb_diff = sum(diffs) / len(diffs) if diffs else 0.0
    pct_gt10 = 100.0 * sum(1 for d in diffs if d > 10) / len(diffs) if diffs else 0.0

    return {
        "id": sid,
        "name": name,
        "file": fname,
        "encoding": webp_fourcc(new_path),
        "original": {
            "width": ow, "height": oh,
            "bytes": os.path.getsize(orig_path),
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
            "rgb_mean_abs_diff_visible_px": round(mean_rgb_diff, 3),
            "rgb_pct_visible_px_diff_gt10": round(pct_gt10, 3),
        },
    }


def main():
    species = species_list()
    print(f"{len(species)} species in sharks-data.js")
    assert len(species) == 50, f"expected 50 species, got {len(species)}"

    entries = []
    for sid, name in species:
        e = analyze(sid, name)
        entries.append(e)
        c = e["checks"]
        print(
            f"{e['name']:22s} {e['original']['width']}x{e['original']['height']} -> "
            f"{e['trimmed']['width']}x{e['trimmed']['height']} "
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
        "version": "v1.7.34-beta",
        "generated_by": "qa/trim-v1.7.34/build-manifest.py (run during Mira revision fix)",
        "method": (
            "Trim cut only fully-transparent border rows/columns: crop box = "
            "bbox of alpha>0 pixels in the original. Trimmed files re-encoded "
            "lossy WebP (q90; lemon/wobbegong q95; zebra stays lossless VP8L). "
            "Alpha verified by pasting each trimmed file back at its crop offset "
            "onto an original-size transparent canvas and diffing the alpha channel."
        ),
        "commits": {
            "before_originals": "d1df7b687ee9f2aa0b8657ce7c1b19ab3f25c2d2 (main, PR #99 merge)",
            "after_trimmed": "c5fdb9a7ea18b7b55e9c3c60e6d85a86ecac3e60 (v1.7.34-trim-art, lossy re-encode)",
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
