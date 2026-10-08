/* assets/art-loader.js — v0.26.0: raster art loading for the approved illustration set.
   The game was SVG-only until v0.26.0; this module introduces the first
   external image assets (WebP illustrations + silhouettes from the Mira-approved
   art pass). All functions degrade gracefully: if an image fails to load,
   the caller falls back to the inline SVG in ART[species.id]. */

"use strict";

/* v0.26.0: art slug mapping. Most species IDs map directly to their art
   filename slug, but four use more specific common names in the art set:
   - blacktip (Blacktip Reef Shark) -> blacktip-reef
   - greatwhite (Great White Shark) -> great-white
   - oceanic (Oceanic Whitetip) -> oceanic-whitetip
   - whitetip (Whitetip Reef Shark) -> whitetip-reef
   The pygmy art exists but has no game ID (bonus species) — it is skipped. */
const ART_SLUG_MAP = {
  "blacktip": "blacktip-reef",
  "greatwhite": "great-white",
  "oceanic": "oceanic-whitetip",
  "whitetip": "whitetip-reef"
};

function artSlug(id) {
  return ART_SLUG_MAP[id] || id;
}

/* Returns the URL for a shark's illustration or silhouette WebP. */
function ART_URL(id, type) {
  return `assets/sharks-webp/${artSlug(id)}-${type}.webp`;
}

/* Returns the URL for a background creature shadow WebP. */
function BG_URL(name) {
  return `assets/backgrounds-webp/${name}.webp`;
}

/* Preloads both the illustration and silhouette for a species so the
   tap-to-reveal encounter is instant. Safe to call repeatedly. */
const _preloaded = new Set();
function preloadSharkArt(id) {
  if (_preloaded.has(id)) return;
  _preloaded.add(id);
  for (const type of ["illustration", "silhouette"]) {
    const img = new Image();
    img.src = ART_URL(id, type);
  }
}

/* Returns an <img> HTML string for a shark's art, with onerror fallback
   to the inline SVG. The fallback keeps the game playable if an asset
   is missing or fails to load (offline, CDN hiccup, etc.). */
function sharkArtImg(id, type, alt) {
  const url = ART_URL(id, type);
  const safeAlt = (alt || id).replace(/"/g, "&quot;");
  /* The onerror swaps in the SVG from ART[id] if it exists; otherwise
     hides the broken image. The data attribute lets us find the element. */
  return `<img src="${url}" alt="${safeAlt}" loading="lazy" ` +
    `data-shark-art="${id}" data-art-type="${type}" ` +
    `onerror="sharkArtFallback(this)" />`;
}

/* Global fallback handler (called from the inline onerror above). */
function sharkArtFallback(img) {
  const id = img.getAttribute("data-shark-art");
  /* ART is defined in art-data.js, loaded before this module's callers. */
  if (typeof ART !== "undefined" && ART[id]) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = ART[id];
    img.replaceWith(wrapper.firstChild);
  } else {
    img.style.display = "none";
  }
}

/* Returns an <img> HTML string for a background creature shadow. */
function bgCreatureImg(name, alt) {
  const url = BG_URL(name);
  const safeAlt = (alt || name).replace(/"/g, "&quot;");
  return `<img src="${url}" alt="${safeAlt}" loading="lazy" class="bg-creature-img" />`;
}
