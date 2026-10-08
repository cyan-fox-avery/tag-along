/* Tag Along — v0.16.0
   Research -> plan (region/depth/bait/method) -> dive -> watch/tag/resight
   -> collection book + logbook. */

"use strict";

/* Build number — shown in the top corner of the page. Bump every release. */
const VERSION = "v0.23.0";

/* v0.22.0: "What's new?" — shown once per version update. */
const WHATS_NEW = {
  "v0.22.0": [
    "📓 <strong>Logbook filters.</strong> Filter your expedition log by outcome, region, or species — compare attempts and spot the pattern.",
    "📌 <strong>Pin-gated soft hints.</strong> Pin a shark you're researching, and your logbook notes will gently nudge you when an expedition plan is close — observational hints only, never answers.",
    "🎣 <strong>Failed trips feel like fieldwork.</strong> Richer expedition narratives: weather, sea state, wildlife sightings, and proper field notes in the logbook.",
    "🌊 <strong>Conservation notes.</strong> Every collection card now carries a conservation-science note — status context, threats, and the protection efforts making a difference."
  ],
  "v0.23.0": [
    "🦈 <strong>Real-shark stories.</strong> Name a great white Mary Lee or Nicole, and Sarah will tell you about the real sharks behind the names — their extraordinary journeys.",
    "🤫 <strong>A secret swims in these waters.</strong> There's a new hidden surprise for curious researchers. We won't spoil it here.",
    "💾 <strong>Save export/import.</strong> Back up your research as a JSON file, or bring a save to a new device. Find it in the footer."
  ]
};

function whatsNewSeen() {
  try { return localStorage.getItem("tyi-last-seen-version"); } catch { return null; }
}
function markWhatsNewSeen() {
  try { localStorage.setItem("tyi-last-seen-version", VERSION); } catch {}
}
/* Pure: should the What's New screen show?
   v0.22.0 Mira review: distinguish brand-new players from v0.21.0 upgraders.
   - No save data at all → first run, don't show.
   - Has save data but no version → v0.21.0 upgrader, show.
   - Version differs → show. Same version → don't. */
function shouldShowWhatsNew(lastSeen, current, hasSaveData) {
  if (!hasSaveData) return false; // brand new player
  if (!lastSeen) return true; // v0.21.0 upgrader (no version key yet)
  return lastSeen !== current;
}
function playerHasSaveData() {
  try {
    // Any of these indicates an existing player
    return !!(localStorage.getItem("tyi-logbook") ||
              localStorage.getItem("tyi-collection") ||
              localStorage.getItem("tyi-stats"));
  } catch { return false; }
}

/* ---------- SVG art: simplified, real proportions, few colours ---------- */


/* ---------- Ambient sea life: small silhouettes that drift through the dive ---------- */

const CREATURE_ART = {
  turtle: `
  <svg viewBox="0 0 90 50" role="img" aria-label="Sea turtle">
    <ellipse cx="45" cy="25" rx="24" ry="15" fill="#3d5a52"/>
    <ellipse cx="45" cy="22" rx="17" ry="10" fill="#4f7568"/>
    <polygon points="22,25 4,12 8,28" fill="#3d5a52"/>
    <polygon points="22,27 4,40 8,26" fill="#3d5a52"/>
    <polygon points="68,25 86,14 82,28" fill="#3d5a52"/>
    <polygon points="68,27 86,38 82,26" fill="#3d5a52"/>
    <circle cx="66" cy="22" r="2.4" fill="#22332e"/>
  </svg>`,
  fish: `
  <svg viewBox="0 0 110 50" role="img" aria-label="School of fish">
    <g fill="#41637a">
      <polygon points="18,25 34,17 34,33"/>
      <ellipse cx="26" cy="25" rx="12" ry="5"/>
      <polygon points="58,14 74,6 74,22"/>
      <ellipse cx="66" cy="14" rx="12" ry="5"/>
      <polygon points="84,32 100,24 100,40"/>
      <ellipse cx="92" cy="32" rx="12" ry="5"/>
      <polygon points="44,38 60,30 60,46"/>
      <ellipse cx="52" cy="38" rx="12" ry="5"/>
    </g>
  </svg>`,
  dolphin: `
  <svg viewBox="0 0 100 50" role="img" aria-label="Dolphin">
    <path d="M8,30 Q30,18 55,22 Q75,25 92,14 Q80,28 60,32 Q35,38 8,30 Z" fill="#4a6a84"/>
    <polygon points="48,22 56,6 62,22" fill="#4a6a84"/>
    <polygon points="30,32 22,44 38,34" fill="#4a6a84"/>
    <circle cx="72" cy="24" r="2.2" fill="#22333f"/>
  </svg>`
};

/* Flavour: the dive log describes the place, not just the mechanics.
   v0.6.0: depth sets the atmosphere — shallow flavour is bright and busy,
   deep flavour is dark and strange. */
const DEPTH_FLAVOUR = {
  surface: [
    "Sunlight shatters across the surface in moving panes. The water is warm and impossibly clear.",
    "The surface chop rocks the boat gently. Below, everything glows blue-green.",
    "You can see the boat's shadow drifting above you, a dark shape on the bright ceiling of the sea.",
    "A breeze ruffles the surface into glitter. Gulls cry somewhere far above."
  ],
  reef: [
    "Coral heads rise like a drowned city. Small bright fish dart between the branches.",
    "The reef hums — not with sound, but with movement. Everything here is busy.",
    "A cleaning station bustles below: tiny fish picking parasites off a patient grouper.",
    "An octopus oozes from one crevice to another, changing colour as it goes."
  ],
  twilight: [
    "The light thins to a deep indigo. Your eyes adjust slowly to the dim.",
    "Particles drift past like snow falling upward. It is very quiet down here.",
    "The slope falls away into darkness to one side. You feel the depth more than see it.",
    "Your depth gauge ticks past 200 metres. The last of the blue fades to black-blue."
  ],
  deep: [
    "There is no light left to speak of — only the glow of the submersible and the dark pressing in.",
    "The seafloor, when the lights catch it, is soft grey mud, undisturbed for longer than you've been alive.",
    "Every movement down here feels deliberate. Nothing wastes energy in the deep.",
    "The submersible's lights catch marine snow — a slow, endless snowfall of tiny white specks.",
    "Somewhere out in the black, something flashes blue-green, once. Bioluminescence — the deep's own language."
  ]
};

/* Sightings pair a log line with a creature drifting past. Vary by depth.
   v0.13.0: pools fattened (reef had only 2, twilight/deep only 1) and dealt
   like cards per trip — the old pure-random pick is what stacked three
   turtles in one dive. */
const SIGHTINGS = {
  surface: [
    { text: "A sea turtle glides past, unhurried, flippers moving like slow wings.", creature: "turtle" },
    { text: "A school of small silver fish wheels past in perfect unison.", creature: "fish" },
    { text: "A dolphin arcs through the blue in the distance, there and gone.", creature: "dolphin" },
    { text: "A pair of flying fish skitter across the surface, touching down and lifting off again.", creature: "fish" }
  ],
  reef: [
    { text: "A sea turtle paddles over the coral, unbothered by your presence.", creature: "turtle" },
    { text: "A shimmering school of fusiliers pours over the reef crest.", creature: "fish" },
    { text: "A hawksbill turtle works a sponge off the coral head, beak crunching steadily.", creature: "turtle" },
    { text: "A small reef shark patrols the drop-off — not your target, just a colleague passing through.", creature: "fish" }
  ],
  twilight: [
    { text: "A loose school of lanternfish flickers past, each one carrying its own small light.", creature: "fish" },
    { text: "A chain of salps drifts past, glassy barrels linked nose to tail.", creature: "fish" },
    { text: "A squid pulses through the edge of the lights, arms trailing, gone in a blink.", creature: "fish" }
  ],
  deep: [
    { text: "Something small and pale drifts through the edge of the lights — gone before you can focus.", creature: "fish" },
    { text: "A rattail fish noses through the mud at the edge of the lights, unhurried.", creature: "fish" },
    { text: "A dumbo octopus flaps past like a tiny ghost with ears.", creature: "fish" }
  ]
};

/* v0.13.0: the sighting deck is filtered against the region note so the
   trip doesn't echo it — the Caribbean note already mentions a green sea
   turtle, Japan's a lanternfish, the Maldives' dolphins. */
const SIGHTING_KEYWORDS = { turtle: "turtle", fish: "fish", dolphin: "dolphin" };
function buildSightingDeck(depth, region) {
  const pool = SIGHTINGS[depth] || [];
  const note = ((REGIONS[region] && REGIONS[region].note) || "").toLowerCase();
  const filtered = pool.filter(s => !note.includes(SIGHTING_KEYWORDS[s.creature]));
  const use = filtered.length ? filtered : pool;
  return { deck: shuffled(use), pool: use };
}

/* Rare, quiet easter eggs in the flavour. Real phenomena, mentioned in passing.
   v0.6.0: the secrets live in the deep — the shallows are too bright for secrets. */
const EASTER_EGGS = [
  { depths: ["twilight", "deep"],
    text: "For a moment the water sparkles — bioluminescent algae, disturbed by the current, flashing like wet stars." },
  { depths: ["twilight", "deep"],
    text: "A vast dark shape looms to one side — the silhouette of a scuttled ship, long since given back to the sea." },
  { depths: ["deep"],
    text: "Something below pulses once with cold blue light, then goes dark. You decide not to investigate." },
  { depths: ["surface"],
    text: "The water is so clear it looks color-corrected, like the establishing shot of a nature documentary." },
  { depths: ["twilight"],
    text: "This is the kind of dark water old monster movies warned you about. You check over your shoulder anyway." }
];

/* v0.22.0: failed trips feel like fieldwork — weather, sea state, and
   wildlife make every expedition a day on the water, not just a miss. */
const SEA_CONDITIONS = [
  "Flat calm this morning — the sea is glass, and the boat barely rocks.",
  "A light chop keeps things interesting; whitecaps glint in the sun.",
  "Overcast and moody — the water looks like hammered pewter.",
  "A fresh breeze out of the east; the swells roll in long and lazy.",
  "Morning fog burns off by nine, leaving the water silver-green.",
  "Choppy and bright — spray on the bow, gulls screaming overhead."
];
/* v0.22.0 Mira review: wildlife sightings are region-appropriate.
   No mantas in the Arctic! */
const FIELD_NOTES = {
  tropical: [
    "Field notes: no sharks, but a pod of dolphins rode the bow wave for twenty minutes. Worth the fuel.",
    "Field notes: a sea turtle surfaced beside the boat and regarded us with ancient indifference.",
    "Field notes: a manta ray passed underneath, huge and unhurried. Not a shark, but nobody's complaining.",
    "Field notes: logged three seabird species and one very confused flying fish. Science is science."
  ],
  temperate: [
    "Field notes: no sharks, but a pod of dolphins rode the bow wave for twenty minutes. Worth the fuel.",
    "Field notes: water temp steady, bait fresh, patience intact. The sharks have their own schedule.",
    "Field notes: logged three seabird species and one very confused flying fish. Science is science.",
    "Field notes: a seal watched us from a nearby rock, unimpressed by our sharklessness."
  ],
  polar: [
    "Field notes: water temp steady, bait fresh, patience intact. The sharks have their own schedule.",
    "Field notes: an iceberg drifted past, impossibly blue underneath. The sharks are down there somewhere.",
    "Field notes: logged three seabird species. The Arctic terns seemed to pity us.",
    "Field notes: the chum slick drifted true all day. Sometimes the ocean just says not today."
  ],
  generic: [
    "Field notes: water temp steady, bait fresh, patience intact. The sharks have their own schedule.",
    "Field notes: the chum slick drifted true all day. Sometimes the ocean just says not today.",
    "Field notes: logged three seabird species and one very confused flying fish. Science is science."
  ]
};
/* Map regions to climate zones for wildlife notes. */
function regionClimate(regionId) {
  const tropical = ["caribbean", "maldives", "philippines", "galapagos", "south-africa"];
  const polar = ["arctic"];
  if (tropical.includes(regionId)) return "tropical";
  if (polar.includes(regionId)) return "polar";
  return "temperate";
}
function pickFieldNote(regionId) {
  const zone = regionClimate(regionId);
  const notes = FIELD_NOTES[zone] || FIELD_NOTES.generic;
  return pick(notes);
}

/* v0.7.0: the day is the expedition. Quiet beats for when the water
   holds its sharks back a while — waiting is most of the job. */
const WAITING_LINES = [
  "You watch the blue, and wait. This is most of the job, honestly.",
  "Nothing but water and light. You settle in — patience is the whole technique.",
  "The bait drifts. Somewhere out there, something is deciding.",
  "You scan the distance until your eyes ache pleasantly."
];

/* v0.7.0: sightings log — what a watched shark was doing. Pure value,
   no progression attached. */
const SIGHTING_DOINES = [
  "cruising slow along the reef edge",
  "circling lazily in the blue",
  "gliding past without a hurry",
  "hunting, focused and silent",
  "drifting with the current",
  "patrolling, unhurried and thorough",
  "curious — circling back for a second look",
  "feeding, oblivious to the boat"
];

/* v0.7.0: tagging the first six earns new waters. */
const REGION_UNLOCK_THREAD = [
  { who: "them", text: "Six sharks. You're officially a real shark scientist now, you know." },
  { who: "me", text: "Six for six. The institute just cleared two new survey regions for us." },
  { who: "them", text: "The Galápagos and South Africa. I've read everything about those waters. Ask me anything — I mean it." },
  { who: "me", text: "I have a feeling I'm going to. 🦈" }
];

/* v0.21.0 sharknado: unlock threads for the three new regions. */
const EAST_AUS_UNLOCK_THREAD = [
  { who: "them", text: "Fifteen sharks! The institute just cleared Eastern Australia for us." },
  { who: "me", text: "Wobbegongs and Port Jackson sharks. Reef country." },
  { who: "them", text: "I've wanted to see a wobbegong my whole life. They look like someone dropped a shark on a carpet. 😂" }
];
const CALIFORNIA_UNLOCK_THREAD = [
  { who: "them", text: "Twenty-five! California Coast is open now." },
  { who: "me", text: "Leopard sharks in the bays, horn sharks on the reefs." },
  { who: "them", text: "Horn sharks have those little brow ridges. They look permanently unimpressed. I love them." }
];
const ARCTIC_UNLOCK_THREAD = [
  { who: "them", text: "Thirty-five sharks. The institute cleared... the Arctic?" },
  { who: "me", text: "Greenland sharks. The cold dark. The long-lived ones." },
  { who: "them", text: "Be careful out there. And bring back stories. 🩵" }
];

/* World-map + tracking data lives in map-data.js (loaded before this file). */

function mapProj(lat, lon) {
  return [(lon + 180) / 360 * MAP_W, (90 - lat) / 180 * MAP_H];
}

/* Track points -> plottable xy. The first point is the tag site (the
   player's fact); the rest is the illustrative envelope walk. They are
   drawn separately so a tag site far from the documented range doesn't
   imply a migration nobody recorded. */
function mapPoints(t) {
  const pts = (t.track && t.track.points || []).map(p => {
    const c = MAP_COORDS[p.label];
    if (!c) return null;
    const [x, y] = mapProj(c[0], c[1]);
    return { x, y, label: p.label, day: p.day };
  }).filter(Boolean);
  return pts;
}

/* ---------- Tracking map: satellite view (v0.10.0) ----------
   Blue Marble background, viewBox zoom, toggleable currents overlay.
   Track/tag geometry is unchanged — the equirectangular projection
   already matched, so every coordinate keeps working as before. */
let mapZoom = 1, mapCX = MAP_W / 2, mapCY = MAP_H / 2;
/* v0.15.0: no explore mode, no pinch — zoom is buttons/wheel only.
   touch-action follows the zoom level, decided before any touch begins:
   at 1x the page owns one-finger drags (the page scrolls); zoomed in,
   the map owns them (one finger pans). No mid-gesture races, no modes. */
let mapCurrentsOn = true;
const MAP_ZOOM_MIN = 1, MAP_ZOOM_MAX = 4;

function mapViewBox() {
  const w = MAP_W / mapZoom, h = MAP_H / mapZoom;
  const x = Math.min(Math.max(mapCX - w / 2, 0), MAP_W - w);
  const y = Math.min(Math.max(mapCY - h / 2, 0), MAP_H - h);
  return { x, y, w, h };
}

/* Split a waypoint list wherever it jumps the antimeridian, so a path
   never streaks across the whole map. */
function splitAntimeridian(pts) {
  const segs = [[pts[0]]];
  for (let i = 1; i < pts.length; i++) {
    if (Math.abs(pts[i][1] - pts[i - 1][1]) > 180) segs.push([]);
    segs[segs.length - 1].push(pts[i]);
  }
  return segs.filter(s => s.length > 1);
}

/* Catmull-Rom -> cubic Bezier smoothing, so currents curve instead of kinking. */
function smoothPath(p) {
  const f = q => q[0].toFixed(1) + "," + q[1].toFixed(1);
  if (p.length < 3) return "M" + p.map(f).join(" L");
  let d = "M" + f(p[0]);
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[Math.max(0, i - 1)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(p.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += " C" + c1x.toFixed(1) + "," + c1y.toFixed(1) + " " + c2x.toFixed(1) + "," + c2y.toFixed(1) + " " + f(p2);
  }
  return d;
}

/* Ocean currents overlay. Warm/cold hues are real oceanography, not decoration.
   Arrowheads only on the final subpath — a current running off the map edge
   gets no arrowhead mid-ocean. Famous-current labels fade in past 1.75x zoom. */
function renderCurrents(z) {
  const list = (typeof CURRENTS === "undefined") ? [] : CURRENTS;
  if (!mapCurrentsOn || !list.length) return "";
  const sw = (2.4 / z).toFixed(2);
  let s = '<defs>'
    + '<marker id="curWarm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#ff9e5e"/></marker>'
    + '<marker id="curCold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#6ecff5"/></marker></defs>';
  list.forEach(c => {
    const cls = c.warm ? "warm" : "cold", mid = c.warm ? "curWarm" : "curCold";
    const segs = splitAntimeridian(c.pts);
    segs.forEach((seg, i) => {
      const d = smoothPath(seg.map(pt => mapProj(pt[0], pt[1])));
      s += '<path d="' + d + '" class="current ' + cls + '" stroke-width="' + sw + '"'
        + (i === segs.length - 1 ? ' marker-end="url(#' + mid + ')"' : "") + "/>";
    });
    if (c.label && z >= 1.75) {
      const mid2 = c.pts[Math.floor(c.pts.length / 2)];
      const lp = mapProj(mid2[0], mid2[1]);
      s += '<text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] - 8).toFixed(1) + '" class="current-label" text-anchor="middle">' + esc(c.name) + "</text>";
    }
  });
  return s;
}

function renderMap() {
  const wrap = $("worldMapWrap");
  const pop = $("mapPopup");
  const legend = $("mapLegend");
  const ids = Object.keys(state.tagged);
  /* v0.11.0: a focus glide re-renders every frame — hiding the popup here
     would eat it on the first animation frame, right after the tap showed
     it. Skip the hide while a glide is in flight; the popup still hides on
     any later render, exactly as before. */
  if (!mapGlide) pop.classList.add("hidden");
  const z = mapZoom, vb = mapViewBox();
  /* v0.15.0: zoom-driven gesture ownership — 1x scrolls the page,
     zoomed pans the map. Set before any touch begins. */
  wrap.style.touchAction = mapZoom > 1 ? "none" : "pan-y";
  wrap.classList.toggle("exploring", mapZoom > 1);
  /* Blue Marble background (dark rect behind it in case the hotlink fails;
     the URL guard keeps the map working if map-data.js ever fails to load). */
  const bmUrl = (typeof BLUE_MARBLE_URL !== "undefined") ? BLUE_MARBLE_URL : "";
  let svg = `<svg id="worldMapSvg" viewBox="${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}" role="img" aria-label="World map of tagged sharks">`
    + `<rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" fill="#0d2f4d"/>`
    + `<image href="${bmUrl}" x="0" y="0" width="${MAP_W}" height="${MAP_H}" preserveAspectRatio="none"/>`;
  svg += renderCurrents(z);
  /* Track strokes and marker sizes are divided by zoom so they stay
     readable instead of going gigantic. */
  const tsw = (2 / z).toFixed(2);
  ids.forEach(sid => {
    const t = state.tagged[sid];
    if (!t.track) t.track = genTrack(sharkById(sid) || { id: "nurse" }, t);
    const color = SPECIES_COLORS[sid] || "#ffffff";
    const pts = mapPoints(t);
    if (pts.length < 2) return;
    /* Illustrative track: envelope walk only (points[1..]). The tag site
       gets its own pin below — no line implying a migration between them. */
    const path = pts.slice(1);
    if (path.length >= 2) {
      const d = path.map((p, i) => (i ? "L" : "M") + p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");
      const archival = t.track.kind === "archival";
      svg += `<path class="map-track" d="${d}" stroke="${color}" stroke-width="${tsw}"`
        + (archival ? ` stroke-dasharray="${(5 / z).toFixed(1)} ${(4 / z).toFixed(1)}"` : "") + "/>";
    }
  });
  /* Markers: hollow pin = tag site, filled dot = latest position.
     Sizes are divided by zoom so they stay readable, not gigantic. */
  ids.forEach(sid => {
    const t = state.tagged[sid];
    const s = sharkById(sid);
    const color = SPECIES_COLORS[sid] || "#ffffff";
    const pts = mapPoints(t);
    if (!pts.length) return;
    const label = esc(t.name ? `“${t.name}”` : t.researchId) + " — " + esc(s.name);
    const tag = pts[0];
    svg += `<g class="map-marker" data-sid="${sid}"><title>${label} (tag site)</title>`
      + `<circle cx="${tag.x.toFixed(1)}" cy="${tag.y.toFixed(1)}" r="${(6 / z).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${(2.5 / z).toFixed(2)}"/>`
      + `<circle cx="${tag.x.toFixed(1)}" cy="${tag.y.toFixed(1)}" r="${(1.8 / z).toFixed(1)}" fill="${color}"/></g>`;
    if (pts.length > 1) {
      const last = pts[pts.length - 1];
      svg += `<g class="map-marker latest" data-sid="${sid}"><title>${label} (latest)</title>`
        + `<circle cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="${(8 / z).toFixed(1)}" fill="${color}" stroke="#fff" stroke-width="${(2 / z).toFixed(2)}"/></g>`;
    }
  });
  svg += `</svg>`;
  if (!ids.length) {
    /* Warm empty state over the satellite map — the ocean is there waiting. */
    wrap.innerHTML = svg + `<div class="map-empty"><span class="big">🗺️</span>No tagged sharks yet — tag one and it will appear here, swimming its real waters.</div>`;
    legend.innerHTML = "";
  } else {
    wrap.innerHTML = svg;
    legend.innerHTML = ids.map(sid => {
      const s = sharkById(sid), t = state.tagged[sid];
      return `<span class="map-chip" data-sid="${sid}" role="button" tabindex="0"><span class="dot" style="background:${SPECIES_COLORS[sid] || "#fff"}"></span>${esc(s.name)} · ${esc(t.name || t.researchId)}</span>`;
    }).join("");
  }
  wrap.querySelectorAll(".map-marker").forEach(m => {
    m.addEventListener("click", () => {
      /* v0.10.2: a drag that ends on a marker must not open its popup —
         the gesture code sets this flag past ~10px of movement. */
      if (suppressMarkerClick) { suppressMarkerClick = false; return; }
      showMapPopup(m.dataset.sid);
      mapFocusOn(m.dataset.sid); // v0.11.0: glide the map to the shark
    });
  });
  /* v0.11.0: legend chips focus the map too — same tap, same glide. */
  legend.querySelectorAll(".map-chip").forEach(c => {
    const go = () => { showMapPopup(c.dataset.sid); mapFocusOn(c.dataset.sid); };
    c.addEventListener("click", go);
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
  const tg = $("mapCurrentsToggle");
  if (tg) tg.setAttribute("aria-pressed", mapCurrentsOn ? "true" : "false");
}

function showMapPopup(sid) {
  const s = sharkById(sid), t = state.tagged[sid];
  const pts = mapPoints(t);
  const last = pts.length > 1 ? pts[pts.length - 1] : pts[0];
  const kindNote = t.track.hypothetical
    ? "Hypothetical movement scenario — this route illustrates plausible long-range movement for a migratory species, not a reconstruction of this individual's tracked journey."
    : t.track.kind === "archival"
    ? "Illustrative habitat-based movement scenario. These plotted positions are not actual detections of this individual." + (s.id === "sawshark" ? " (Pop-up satellite archival tags have been deployed on common sawsharks off Tasmania — Burke et al. 2020.)" : "")
    : t.track.kind === "resightings"
      ? "Built from reef survey re-sightings, not a satellite tag — this shark barely leaves its reef flat. Every ping falls within about 2 km."
      : t.track.kind === "acoustic"
        ? "Illustrative track based on acoustic-tag detections from reef receiver arrays — a different way of following sharks than satellite tags."
      : null;
  const pop = $("mapPopup");
  pop.innerHTML = `
    <h4>${t.name ? `“${esc(t.name)}”` : esc(t.researchId)}</h4>
    <p class="latin">${esc(s.name)} · ${esc(t.researchId)}</p>
    <p class="map-meta">📍 Tagged at ${esc(t.location)} · ${esc(t.date)}<br>📡 Latest ping: ${last ? esc(last.label) : "—"}${t.resightings && t.resightings.length ? `<br>🔁 Re-sighted ${t.resightings.length}×` : ""}</p>
    ${kindNote ? `<p class="map-kind-note">${kindNote}</p>` : ""}
    <button class="secondary-button" type="button" id="mapCardBtn">🗂️ Open collection card</button>`;
  pop.classList.remove("hidden");
  $("mapCardBtn").addEventListener("click", () => openDetail(sid));
}

/* ---------- State ---------- */

const store = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-collection") || "{}"); }
    catch { return {}; }
  },
  save(data) { localStorage.setItem("tyi-collection", JSON.stringify(data)); }
};

const msgStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-messages") || '{"messages":[],"unread":0,"chatIdx":0}'); }
    catch { return { messages: [], unread: 0, chatIdx: 0 }; }
  },
  save(d) { localStorage.setItem("tyi-messages", JSON.stringify(d)); }
};
const _savedMsgs = msgStore.load();

/* v0.18.0: achievement + stats stores. Stats feed achievement checks
   (regions visited, baits used, re-sights, chum tags, expedition count). */
const statsStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-stats") || "{}"); }
    catch { return {}; }
  },
  save(d) { localStorage.setItem("tyi-stats", JSON.stringify(d)); }
};
const achieveStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-achievements") || "{}"); }
    catch { return {}; }
  },
  save(d) { localStorage.setItem("tyi-achievements", JSON.stringify(d)); }
};

/* v0.7.0: the sightings log — spotted but not tagged. Pure field notes. */
const sightStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-sightings") || "[]"); }
    catch { return []; }
  },
  save(d) { localStorage.setItem("tyi-sightings", JSON.stringify(d)); }
};

/* v0.8.0: the expedition logbook — a scientist's notebook. Every trip:
   date, the plan (region/depth/bait/method), encounters and outcome. */
const logStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-logbook") || "[]"); }
    catch { return []; }
  },
  save(d) { localStorage.setItem("tyi-logbook", JSON.stringify(d)); }
};

/* v0.7.0: the first six sharks (the original roster). Tagging all six
   unlocks the Galápagos and South Africa — new waters earned, not given. */
const ORIGINAL_SIX = ["nurse", "thresher", "whale", "goblin", "tiger", "sandtiger"];

/* v0.20.0: the pinned shark — "currently researching". One shark at a time,
   persisted across sessions. A focus, not a filter. */
const pinStore = {
  load() {
    try { return localStorage.getItem("tyi-pinned") || null; }
    catch { return null; }
  },
  save(id) {
    try {
      if (id) localStorage.setItem("tyi-pinned", id);
      else localStorage.removeItem("tyi-pinned");
    } catch {}
  }
};

/* v0.6.0: threads are {ts, msgs}. Migrate legacy bare-array threads. */
function normThread(t) {
  if (Array.isArray(t)) return { ts: 0, msgs: t };
  return t;
}

const state = {
  tagged: store.load(),   // id -> {name, researchId, length, sex, location, date, sarahEgg, track}
  failures: 0,
  chatIdx: _savedMsgs.chatIdx || 0,
  /* v0.12.0: contextual hints — the region of the player's most recent
     expedition, so Sarah's hints stay specific to what they're actually
     searching for instead of spamming the whole roster. */
  lastRegion: _savedMsgs.lastRegion || null,
  chatSeen: _savedMsgs.chatSeen || {},
  messages: (_savedMsgs.messages || []).map(normThread),
  unread: _savedMsgs.unread || 0,
  pendingTag: null,       // species object awaiting naming
  sightings: sightStore.load(), // v0.7.0: watched-but-not-tagged log
  logbook: logStore.load(),   // v0.8.0: expedition logbook
  regionsUnlocked: false, // v0.7.0: first six tagged -> Galápagos + South Africa
  pendingWin: false,      // v0.7.0: final shark tagged mid-trip; ceremony at day's end
  currentPlan: null,      // the trip's region/depth/bait/method (method added v0.8.0 as scent, reworked v0.9.0)
  taggedThisTrip: false,  // v0.7.0: skip the random post-trip chat after a tag
  resightedThisTrip: false, // v0.8.0: same skip after a re-sighting celebration
  encounterDone: null,    // v0.7.0: callback that resumes the trip after watch/tag
  /* v0.17.1: Ask Sarah offer persists in the message store — Sarah's saved
     thread promises "pick one below", so the panel must survive a reload. */
  sarahAdviceOffered: !!_savedMsgs.sarahAdviceOffered,
  /* v0.18.0: stats feed achievement checks; achievements persist unlocked IDs. */
  stats: Object.assign(
    { regionsVisited: [], baitsUsed: [], resights: 0, chumTags: 0, expeditions: 0,
      depthsTagged: [], methodsUsed: [] },
    statsStore.load()
  ),
  achievements: achieveStore.load(), // id -> timestamp
  bruceChainComplete: false, // v0.18.0: the Bruce chain isn't built yet
  won: (() => { try { return localStorage.getItem("tyi-won") === "1"; } catch { return false; } })(),
  archiveUnlocked: (() => { try { return localStorage.getItem("tyi-archive") === "1"; } catch { return false; } })(),
  pinned: pinStore.load(), // v0.20.0: "currently researching" shark id, or null
  /* v0.23.0: Bruce easter egg chain state: { stage, sharkId, lastAdvance } or null */
  bruceEgg: (() => { try { return JSON.parse(localStorage.getItem("tyi-bruce") || "null"); } catch { return null; } })(),
  bruceChainComplete: (() => { try { return localStorage.getItem("tyi-bruce-done") === "1"; } catch { return false; } })()
};
/* v0.18.0 review: migrate pre-achievement saves — seed stats from the logbook
   and existing tags so established players get credit for their history. */
(function migrateStats() {
  const s = state.stats;
  let changed = false;
  const log = state.logbook || [];
  if (!(s.expeditions > 0) && log.length > 0) {
    s.expeditions = log.length; changed = true;
  }
  log.forEach(t => {
    if (t.region && !s.regionsVisited.includes(t.region)) { s.regionsVisited.push(t.region); changed = true; }
    if (t.bait && !s.baitsUsed.includes(t.bait)) { s.baitsUsed.push(t.bait); changed = true; }
  });
  let resights = 0;
  Object.values(state.tagged || {}).forEach(t => { resights += (t.resightings || []).length; });
  if (!(s.resights > 0) && resights > 0) { s.resights = resights; changed = true; }
  /* v0.18.0 review 2nd pass: backfill "Something in the Water" — a log entry
     with attract+chum and a tagged encounter of a chum-valid species counts. */
  log.forEach(t => {
    if (t.methodOpt && t.methodOpt !== "none" && !(s.methodsUsed || []).includes(t.methodOpt)) {
      s.methodsUsed.push(t.methodOpt); changed = true;
    }
    const taggedHere = (t.encounters || []).some(e => e.result === "tagged");
    if (taggedHere && t.depth && !(s.depthsTagged || []).includes(t.depth)) {
      s.depthsTagged.push(t.depth); changed = true;
    }
  });
  if (!(s.chumTags > 0)) {
    const chumEarned = log.some(t =>
      t.method === "attract" && t.methodOpt === "chum" &&
      (t.encounters || []).some(e => {
        if (e.result !== "tagged") return false;
        const sp = SHARKS.find(x => x.id === e.speciesId);
        return sp && sp.methods && sp.methods.attract && sp.methods.attract.includes("chum");
      })
    );
    if (chumEarned) { s.chumTags = 1; changed = true; }
  }
  if (changed) saveStats();
})();
function saveMsgs() {
  msgStore.save({ messages: state.messages, unread: state.unread, chatIdx: state.chatIdx,
    lastRegion: state.lastRegion, chatSeen: state.chatSeen,
    sarahAdviceOffered: state.sarahAdviceOffered });
}
/* Every new thread gets a timestamp for the Phone tab. */
function pushThread(msgs) {
  state.messages.push({ ts: Date.now(), msgs });
  state.unread += 1;
  saveMsgs();
  updateMsgBadge();
  renderMessages();
}
function fmtTime(ts) {
  return new Date(ts).toLocaleString(undefined,
    { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

/* Research IDs: every tagged shark always gets one, like real field science.
   Format: SPECIESCODE-YEAR-SEQ, e.g. NS-2026-001. Nickname is a separate,
   optional layer on top — a shark can have both, never "Unnamed". */
const idSeqStore = {
  load() {
    try { return parseInt(localStorage.getItem("tyi-idseq") || "0", 10) || 0; }
    catch { return 0; }
  },
  save(n) { localStorage.setItem("tyi-idseq", String(n)); }
};
let idSeq = idSeqStore.load();
function mintResearchId(species) {
  idSeq += 1;
  idSeqStore.save(idSeq);
  const year = new Date().getFullYear();
  return `${species.code}-${year}-${String(idSeq).padStart(3, "0")}`;
}
/* Migrate older saves: any tagged shark without an ID gets one now.
   (Runs after helpers are defined — see below.) */
function migrateIds() {
  Object.entries(state.tagged).forEach(([sid, t]) => {
    if (!t.researchId) {
      t.researchId = mintResearchId(sharkById(sid) || { code: "XX" });
    }
  });
  store.save(state.tagged);
}
/* Older saves predate tracking: give every tagged shark a track. */
function migrateTracks() {
  let changed = false;
  Object.entries(state.tagged).forEach(([sid, t]) => {
    /* v0.21.0 Mira final: regenerate tracks that predate the tag-anchor fix.
       Old tracks start at generic regional centers and teleport to the envelope.
       v0.21.0 Mira re-review: preserve player re-sighting points. */
    if (!t.track || t.track.v !== 2) {
      /* v0.21.0 Mira: legacy tracks lack the resighting flag. Reconstruct
         from t.resightings records if no flagged points exist. */
      let resightPoints = (t.track && t.track.points || []).filter(p => p.resighting);
      const resightRecords = t.resightings || [];
      if (resightPoints.length === 0 && resightRecords.length > 0 && t.track && t.track.points) {
        // Legacy: reconstruct from resightings records. Old points lack the flag,
        // so we treat points beyond the typical generated count as re-sightings.
        // Each resighting record corresponds to a point appended after generation.
        const genCount = t.track.points.length - resightRecords.length;
        if (genCount >= 0 && resightRecords.length > 0) {
          resightPoints = t.track.points.slice(genCount).map((p) => ({
            label: p.label, day: p.day, km: p.km, resighting: true
          }));
        }
      }
      t.track = genTrack(sharkById(sid) || { id: "nurse" }, t);
      t.track.v = 2;
      const species = sharkById(sid);
      const env = (typeof TRACK_ENVELOPES !== "undefined" && TRACK_ENVELOPES[species.id]) || null;
      resightPoints.forEach((rp) => {
        const anchorLabel = (env && env.tagAnchor) || rp.label;
        const last = t.track.points[t.track.points.length - 1];
        const lastCoord = MAP_COORDS[last.label];
        const newCoord = MAP_COORDS[anchorLabel];
        let km = 0;
        if (lastCoord && newCoord && typeof haversineKm === "function") {
          km = Math.round(haversineKm(lastCoord, newCoord) * 10) / 10;
        }
        t.track.points.push({ label: anchorLabel, day: rp.day, km, resighting: true });
        t.track.totalKm = Math.round((t.track.totalKm + km) * 10) / 10;
        // Ensure day count agrees with final point (legacy points may be newer)
        if (rp.day > t.track.days) t.track.days = rp.day;
      });
      if (resightRecords.length) t.resightings = resightRecords;
      changed = true;
    }
  });
  if (changed) store.save(state.tagged);
}

const $ = (id) => document.getElementById(id);
const esc = (str) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sharkById = (id) => SHARKS.find(s => s.id === id);
const untagged = () => SHARKS.filter(s => !state.tagged[s.id]);
/* Migrations run once at boot — see the boot section below. */

/* ---------- Tabs (each tab remembers its scroll position) ---------- */

const tabScroll = {};
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    const current = document.querySelector(".tab.active");
    if (current) tabScroll[current.dataset.tab] = window.scrollY;
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    $("tab-" + btn.dataset.tab).classList.add("active");
    if (btn.dataset.tab === "map") renderMap(); // v0.9.0: tracking map renders on open
    if (btn.dataset.tab === "expedition") renderExpeditionPin(); // v0.20.0: pinned shark line
    if (btn.dataset.tab in tabScroll) window.scrollTo(0, tabScroll[btn.dataset.tab]);
    if (btn.dataset.tab === "phone") {
      /* v0.12.0: like a real phone — the conversation opens pinned to the
         newest message. renderMessages' own scroll can't do this: it runs
         while the tab is hidden (display:none), where scrollTop has no
         effect, so the pin has to happen after the panel is visible. */
      renderMessages();
      const list = $("messagesList");
      if (list) list.scrollTop = list.scrollHeight;
      if (state.unread > 0) {
        state.unread = 0;
        saveMsgs();
        updateMsgBadge();
      }
    }
  });
});
function goTab(name) {
  document.querySelector(`.tab[data-tab="${name}"]`).click();
}

/* ---------- Research: a field-guide database ----------
   v0.7.0: the guide is a compact roster list; each row expands into the
   full entry. Hard rule stands: NO pictures of the actual shark here —
   sketches only. The real face is earned at tagging. */
/* ---------- Field guide database (v0.19.0) ----------
   Search + stacked filters. Filters narrow the notebook; they never solve
   the expedition — matching is on the shark's own data, nothing is revealed.
   Filter state is session-only. */
const guideFilters = {
  q: "",
  region: new Set(),
  depth: new Set(),
  methodOpt: new Set(),
  bait: new Set(),
  tagged: "all" // "all" | "tagged" | "untagged"
};
function baitList(s) {
  return Array.isArray(s.combo.bait) ? s.combo.bait : [s.combo.bait];
}
function methodOpts(s) {
  const m = s.methods || {};
  return [...(m.attract || []), ...(m.aggregation || [])];
}
function guideMatches(s) {
  const f = guideFilters;
  if (f.q) {
    const q = f.q.toLowerCase();
    if (!s.name.toLowerCase().includes(q) && !s.latin.toLowerCase().includes(q)) return false;
  }
  if (f.region.size && !f.region.has(s.combo.region)) return false;
  if (f.depth.size && !(s.depths || []).some(d => f.depth.has(d))) return false;
  if (f.methodOpt.size && !methodOpts(s).some(m => f.methodOpt.has(m))) return false;
  if (f.bait.size && !baitList(s).some(b => f.bait.has(b))) return false;
  if (f.tagged === "tagged" && !state.tagged[s.id]) return false;
  if (f.tagged === "untagged" && state.tagged[s.id]) return false;
  return true;
}
function activeFilterCount() {
  const f = guideFilters;
  return f.region.size + f.depth.size + f.methodOpt.size + f.bait.size +
    (f.tagged !== "all" ? 1 : 0) + (f.q ? 1 : 0);
}
function buildFilterChips() {
  const mk = (elId, items, set) => {
    const row = $(elId);
    if (!row) return;
    row.innerHTML = "";
    items.forEach(([id, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = label;
      b.setAttribute("aria-pressed", String(set.has(id)));
      b.addEventListener("click", () => {
        if (set.has(id)) set.delete(id); else set.add(id);
        renderResearch();
      });
      row.appendChild(b);
    });
  };
  mk("filterRegion", Object.entries(REGIONS).map(([id, r]) =>
    [id, r.locked ? `🔒 ${r.name}` : r.name]), guideFilters.region);
  mk("filterDepth", Object.entries(DEPTHS).map(([id, d]) => [id, d.name]), guideFilters.depth);
  const mOpts = [];
  Object.values(METHODS).forEach(m => Object.entries(m.opts).forEach(([id, label]) => {
    if (id !== "none") mOpts.push([id, label]);
  }));
  mk("filterMethod", mOpts, guideFilters.methodOpt);
  mk("filterBait", Object.entries(BAITS).map(([id, label]) => [id, label]), guideFilters.bait);
  // tagged status: single-select chips
  const tRow = $("filterTagged");
  if (tRow) {
    tRow.innerHTML = "";
    [["all", "All"], ["tagged", "Tagged ✅"], ["untagged", "Untagged"]].forEach(([id, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = label;
      b.setAttribute("aria-pressed", String(guideFilters.tagged === id));
      b.addEventListener("click", () => { guideFilters.tagged = id; renderResearch(); });
      tRow.appendChild(b);
    });
  }
}
function renderActiveChips() {
  const wrap = $("activeChips");
  if (!wrap) return;
  wrap.innerHTML = "";
  const f = guideFilters;
  const addChip = (label, clear) => {
    const c = document.createElement("span");
    c.className = "chip-active";
    c.innerHTML = `<span>${esc(label)}</span>`;
    const x = document.createElement("button");
    x.type = "button";
    x.className = "chip-remove";
    x.setAttribute("aria-label", `Remove filter: ${label}`);
    x.textContent = "×";
    x.addEventListener("click", () => { clear(); renderResearch(); });
    c.appendChild(x);
    wrap.appendChild(c);
  };
  if (f.q) addChip(`“${f.q}”`, () => { f.q = ""; const s = $("guideSearch"); if (s) s.value = ""; });
  f.region.forEach(id => addChip(REGIONS[id] ? REGIONS[id].name : id, () => f.region.delete(id)));
  f.depth.forEach(id => addChip(DEPTHS[id] ? DEPTHS[id].name : id, () => f.depth.delete(id)));
  f.methodOpt.forEach(id => {
    let label = id;
    Object.values(METHODS).forEach(m => { if (m.opts[id]) label = m.opts[id]; });
    addChip(label, () => f.methodOpt.delete(id));
  });
  f.bait.forEach(id => addChip(BAITS[id] || id, () => f.bait.delete(id)));
  if (f.tagged !== "all") addChip(f.tagged === "tagged" ? "Tagged ✅" : "Untagged",
    () => { f.tagged = "all"; });
}
function clearGuideFilters() {
  guideFilters.q = "";
  guideFilters.region.clear();
  guideFilters.depth.clear();
  guideFilters.methodOpt.clear();
  guideFilters.bait.clear();
  guideFilters.tagged = "all";
  const s = $("guideSearch");
  if (s) s.value = "";
  renderResearch();
}
/* v0.20.0: pin one shark as "currently researching". Tapping the pin on a
   pinned shark unpins it. One pin at a time — a focus, not a collection. */
function togglePin(id) {
  state.pinned = (state.pinned === id) ? null : id;
  pinStore.save(state.pinned);
  renderResearch();
  renderExpeditionPin();
  renderPinHint(); // v0.22.0
}
/* v0.20.0: jump to the pinned shark's field-guide entry. Mira review fix -
   clears any filters hiding the shark first, so Jump never silently fails. */
function jumpToPinned(s, list) {
  if (!list.querySelector(`[data-entry="${s.id}"]`) && activeFilterCount() > 0) {
    clearGuideFilters();
  }
  const target = list.querySelector(`[data-entry="${s.id}"]`);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    const body = target.querySelector(".guide-row-body");
    const head = target.querySelector(".guide-row-head");
    if (body && body.classList.contains("hidden")) {
      body.classList.remove("hidden");
      head.setAttribute("aria-expanded", "true");
      target.classList.add("open");
    }
    target.classList.add("pin-flash");
    setTimeout(() => target.classList.remove("pin-flash"), 1200);
  }
}
function renderPinnedCard(list) {
  const s = SHARKS.find(x => x.id === state.pinned);
  const card = document.createElement("div");
  card.className = "pinned-card" + (s ? "" : " pinned-empty");
  if (!s) {
    card.innerHTML = `<p class="latin">📌 <em>No shark pinned — tap 📌 on any field-guide entry to keep it here while you research.</em><br><span class="dim">Tip: pinning a shark switches on soft logbook hints — when your expedition plan is close for the shark you're researching, your notes will nudge you.</span></p>`;
  } else {
    const done = !!state.tagged[s.id];
    card.innerHTML = `
      <div class="pinned-head"><span>📌 Currently researching</span>
        <button type="button" class="pin-btn unpin" data-unpin aria-label="Unpin ${s.name}">✕</button>
      </div>
      <div class="pinned-body">
        <div class="guide-sketch pinned-sketch">${SKETCH[s.id]}</div>
        <div>
          <strong>${s.name}</strong> ${done ? "✅" : ""}<br>
          <span class="latin">${s.latin}</span><br>
          <span class="latin">${REGIONS[s.combo.region] ? REGIONS[s.combo.region].name : s.combo.region} · ${s.depths.map(d => (DEPTHS[d] || {}).name || d).join(", ")}</span>
        </div>
      </div>
      <button type="button" class="pin-jump" data-jump="${s.id}">Jump to field-guide entry ↓</button>`;
    card.querySelector("[data-unpin]").addEventListener("click", () => togglePin(s.id));
    card.querySelector("[data-jump]").addEventListener("click", () => jumpToPinned(s, list));
  }
  list.appendChild(card);
}
/* v0.22.0: pin-gated soft hints. When a shark is pinned and the planned
   expedition matches 3 of its 4 needs (region, depth, bait, method), the
   logbook offers one soft observational nudge about the odd one out.
   Wording is observational only — never "correct"/"wrong". This evolves
   the old rule that failed trips give no signal: the logbook now means
   "you're warm". Sarah remains the stronger help after repeated failures. */
const PIN_HINTS = {
  region: "Maybe we'll find them elsewhere?",
  depth: "The water doesn't feel quite right for them at this depth…",
  bait: "They didn't seem to like the food we were offering.",
  method: "They didn't seem to notice us at all — maybe a different approach?"
};

/* Pure: given a plan and a pinned shark id, return {dimension, hint} when
   exactly 3 of 4 dimensions match, else null. Testable. */
/* v0.22.0 Mira review: hints are grounded in COMPLETED expeditions, not the
   live planner. The logbook helps interpret evidence; it doesn't reveal
   answers by trial-and-error clicking.
   Distinguishes: conditions that make encounter POSSIBLE (region/depth/bait)
   from methods that improve ODDS (method/methodOpt boost only). */
function pinHintForTrip(trip, pinnedId) {
  if (!pinnedId || !trip) return null;
  const s = SHARKS.find(x => x.id === pinnedId);
  if (!s || state.tagged[pinnedId]) return null;
  // Did this trip's conditions make the pinned shark's appearance possible?
  const baitOk = Array.isArray(s.combo.bait) ? s.combo.bait.includes(trip.bait) : s.combo.bait === trip.bait;
  const possible = s.combo.region === trip.region &&
    (s.depths || []).includes(trip.depth) && baitOk;
  // Did the player encounter (or tag) the pinned shark this trip?
  const encountered = (trip.encounters || []).some(e => e.speciesId === pinnedId);
  if (possible && !encountered) {
    // Conditions were right, shark just wasn't there — "you're warm"
    return { kind: "warm", hint: "The water felt right for " + s.name.toLowerCase() + " today. Sometimes they're just not there." };
  }
  if (!possible && !encountered) {
    // Which dimension was off? Observational only.
    const off = [];
    if (s.combo.region !== trip.region) off.push("region");
    if (!(s.depths || []).includes(trip.depth)) off.push("depth");
    if (!baitOk) off.push("bait");
    if (off.length === 1) {
      return { kind: "hint", dimension: off[0], hint: PIN_HINTS[off[0]] };
    }
  }
  return null;
}

/* v0.22.0 Mira review: live planner hints removed. Hints now appear in the
   logbook after completed expeditions (pinHintForTrip), preserving the
   research puzzle. This function is kept as a no-op for compatibility. */
function renderPinHint() {
  const el = $("pinHint");
  if (el) { el.classList.add("hidden"); el.innerHTML = ""; }
}

/* v0.20.0: show the pinned shark on the Expedition tab — a research focus
   to plan around. Never auto-fills the planner; the sea decides. */
function renderExpeditionPin() {
  const el = $("expeditionPin");
  if (!el) return;
  const s = SHARKS.find(x => x.id === state.pinned);
  if (!s) { el.classList.add("hidden"); el.innerHTML = ""; return; }
  el.classList.remove("hidden");
  const regionName = REGIONS[s.combo.region] ? REGIONS[s.combo.region].name : s.combo.region;
  /* v0.20.0: Mira review fix — filter feeders (whale, basking) store bait as a
     string, not an array. baitList() normalizes both. */
  const baits = baitList(s).map(b => BAITS[b] || b).join(", ");
  el.innerHTML = `📌 Currently researching: <strong>${s.name}</strong>
    <span class="latin">${regionName} · ${s.depths.map(d => (DEPTHS[d] || {}).name || d).join(", ")} · ${baits}</span>
    <br><span class="dim" style="font-size:12px">📓 Pin hints on — your logbook notes nudge you when the plan is close.</span>`;
}
function renderResearch() {
  const list = $("researchList");
  list.innerHTML = "";
  /* v0.20.0: the pinned shark — "currently researching". A focus card at the
     top of the field guide; pinning is a focus, never a filter. */
  renderPinnedCard(list);
  /* v0.13.0: untagged sharks first — the ones you're still hunting.
     Tagged ones settle to the bottom, out of the way. */
  const ordered = [...SHARKS]
    .filter(guideMatches)
    .sort((a, b) => ((state.tagged[a.id] ? 1 : 0) - (state.tagged[b.id] ? 1 : 0)));
  // v0.19.0: filter UI state
  buildFilterChips();
  renderActiveChips();
  const n = activeFilterCount();
  const fc = $("filterCount");
  if (fc) {
    fc.textContent = String(n);
    fc.classList.toggle("hidden", n === 0);
  }
  const gc = $("guideCount");
  if (gc) gc.textContent = `Showing ${ordered.length} of ${SHARKS.length} sharks`;
  const clr = $("guideClear");
  if (clr) clr.classList.toggle("hidden", n === 0);
  /* v0.20.0: Mira review fix — the pinned card survives empty-results states;
     it is a research focus, not a filter result. */
  if (!ordered.length) {
    const p = document.createElement("p");
    p.className = "latin";
    p.style.cssText = "text-align:center; padding: 24px 12px;";
    p.textContent = "No sharks match those filters. Try clearing something — the ocean is bigger than it looks.";
    list.appendChild(p);
    return;
  }
  ordered.forEach(s => {
    const done = !!state.tagged[s.id];
    const regionLocked = REGIONS[s.combo.region] && REGIONS[s.combo.region].locked;
    const isPinned = state.pinned === s.id;
    const row = document.createElement("div");
    row.className = "guide-row";
    row.setAttribute("data-entry", s.id);
    row.innerHTML = `
      <div class="guide-row-top">
        <button type="button" class="guide-row-head" aria-expanded="false">
          <span class="guide-row-name">${s.name} ${done ? "✅" : ""}</span>
          <span class="latin">${s.latin}</span>
          <span class="status-pill">IUCN: ${s.status}</span>
          <span class="guide-caret" aria-hidden="true">▾</span>
        </button>
        <button type="button" class="pin-btn${isPinned ? " pinned-on" : ""}" data-pin="${s.id}"
          aria-label="${isPinned ? "Unpin" : "Pin"} ${s.name} as currently researching"
          aria-pressed="${isPinned}">📌</button>
      </div>
      <div class="guide-row-body hidden">
        <div class="guide-sketch">${SKETCH[s.id]}<p class="sketch-cap">field sketch — ${s.sketchCap}</p></div>
        ${s.research.split("\n\n").map(p => `<p class="research-text">${p}</p>`).join("")}
        ${done
          ? `<p class="hook">Tagged ${idLine(state.tagged[s.id])}${state.tagged[s.id].name ? ` as <strong>${esc(state.tagged[s.id].name)}</strong>` : ""} 🎉</p>`
          : regionLocked
            ? `<p class="latin">🔒 Our vessel hasn't surveyed these waters yet — tag the six original species (nurse, thresher, whale, goblin, tiger, sandtiger) to unlock them.</p>`
            : ``}
      </div>
    `;
    const head = row.querySelector(".guide-row-head");
    const body = row.querySelector(".guide-row-body");
    head.addEventListener("click", () => {
      const isHidden = body.classList.toggle("hidden");
      head.setAttribute("aria-expanded", String(!isHidden));
      row.classList.toggle("open", !isHidden);
    });
    const pinBtn = row.querySelector("[data-pin]");
    if (pinBtn) pinBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePin(s.id);
    });
    list.appendChild(row);
  });
}

/* ---------- Planner ---------- */

function fillSelect(el, obj) {
  el.innerHTML = "";
  Object.entries(obj).forEach(([id, v]) => {
    const o = document.createElement("option");
    o.value = id;
    o.textContent = typeof v === "string" ? v : v.name;
    el.appendChild(o);
  });
}

function fillRegions() {
  const el = $("regionSelect");
  const current = el.value;
  el.innerHTML = "";
  Object.entries(REGIONS).forEach(([id, v]) => {
    const o = document.createElement("option");
    o.value = id;
    if (v.locked) {
      const unlockText = id === "galapagos" || id === "south-africa"
        ? `🔒 ${v.name} — tag the six original species to unlock`
        : id === "east-australia"
          ? `🔒 ${v.name} — unlocks at 15 tags`
          : id === "california"
            ? `🔒 ${v.name} — unlocks at 25 tags`
            : id === "arctic"
              ? `🔒 ${v.name} — unlocks at 35 tags`
              : `🔒 ${v.name} — locked`;
      o.textContent = unlockText;
      o.disabled = true;
    } else {
      o.textContent = v.name;
    }
    el.appendChild(o);
  });
  if (current && REGIONS[current] && !REGIONS[current].locked) el.value = current;
}

/* v0.7.0: regions unlock in two stages now.
   - Tagging the first six (the original roster) unlocks the Galápagos and
     South Africa as real, selectable waters.
   - Tagging the full roster wins the game (Master Shark Tagger).
     v0.11.0: the win keeps moving up with the roster — always SHARKS.length. */
function applyRegions() {
  /* v0.21.0 Mira review: 15/25/35 milestones are genuinely count-based,
     independent of the original-six unlock. */
  const n = Object.keys(state.tagged).length;
  if (state.regionsUnlocked) {
    for (const id of ["galapagos", "south-africa"]) REGIONS[id].locked = false;
  }
  if (n >= 15) REGIONS["east-australia"].locked = false;
  if (n >= 25) REGIONS["california"].locked = false;
  if (n >= 35) REGIONS["arctic"].locked = false;
}

/* v0.7.0 migration: v0.6.0 winners had tyi-won=1 at 6/6, but the win is
   now the full roster. They keep their tags and earn the regions; the win
   resets until every shark is tagged.
   v0.11.0: same rule keeps applying as the roster grows — a win at 12/12
   resets when new sharks arrive, until 15/15, 18/18, and so on. */
function migrateWinV07() {
  const taggedCount = Object.keys(state.tagged).length;
  if (state.won && taggedCount < SHARKS.length) {
    state.won = false;
    try { localStorage.removeItem("tyi-won"); } catch {}
  }
  if (ORIGINAL_SIX.every(id => state.tagged[id])) {
    state.regionsUnlocked = true;
    try { localStorage.setItem("tyi-regions", "1"); } catch {}
  } else {
    try { state.regionsUnlocked = localStorage.getItem("tyi-regions") === "1"; } catch {}
  }
  applyRegions();
}

/* ---------- Planner ----------
   v0.7.0: no target species. The planner is conditions only — region,
   depth, bait. v0.8.0 adds scent in the water as its own row.
   Your research is your targeting: the right combination
   brings the right sharks. The sea decides who shows up. */
function renderPlanner() {
  /* Selects are static; fillRegions() preserves the current region.
     Trips stay available after the win — there's always more to see. */
  fillRegions();
}

$("launchBtn").addEventListener("click", () => {
  const region = $("regionSelect").value;
  if (!region || !REGIONS[region] || REGIONS[region].locked) return;
  runExpedition({
    region,
    depth: $("depthSelect").value,
    bait: $("baitSelect").value,
    method: $("methodSelect").value,
    methodOpt: $("methodOptSelect").value
  });
});

/* ---------- Expedition ---------- */

function logLine(html, cls) {
  const p = document.createElement("p");
  if (cls) p.className = cls;
  p.innerHTML = html;
  const log = $("diveLog");
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}
/* v0.7.3: expedition pacing — a beat slower than reading speed, so the
   day breathes. Tune PACE to adjust globally.
   v0.20.0: quick-pace option — the player can shorten the beats. */
let PACE = 1.5;
const QUICK_PACE = 0.35;
function setPace(quick) {
  PACE = quick ? QUICK_PACE : 1.5;
  try { localStorage.setItem("tyi-pace", quick ? "quick" : "slow"); } catch {}
  const box = $("quickPace");
  if (box) box.checked = !!quick;
}
const wait = (ms) => new Promise(r => setTimeout(r, ms * PACE));

/* v0.13.0: persistent depth scenery — the scene was gradient + rays and
   felt empty between sightings. Simple SVG silhouettes, one per depth. */
const SCENERY = {
  surface: `<svg viewBox="0 0 400 60" preserveAspectRatio="xMidYMax slice">
    <g fill="#2f88b5" opacity="0.45">
      <path d="M40,30 q6,-5 12,0 q-6,5 -12,0 Z M46,30 l-8,-4 l-8,4 l8,4 Z"/>
      <path d="M330,20 q6,-5 12,0 q-6,5 -12,0 Z M336,20 l-8,-4 l-8,4 l8,4 Z"/>
      <path d="M200,40 q5,-4 10,0 q-5,4 -10,0 Z M205,40 l-7,-3 l-7,3 l7,3 Z"/>
    </g></svg>`,
  reef: `<svg viewBox="0 0 400 70" preserveAspectRatio="xMidYMax slice">
    <g fill="#175e75" opacity="0.55">
      <ellipse cx="60" cy="66" rx="46" ry="26"/>
      <ellipse cx="180" cy="68" rx="60" ry="30"/>
      <ellipse cx="330" cy="66" rx="52" ry="28"/>
    </g>
    <g stroke="#175e75" stroke-width="5" stroke-linecap="round" opacity="0.5" fill="none">
      <path d="M60,48 q-4,-18 -14,-26 M60,48 q2,-20 12,-30 M60,48 q10,-12 22,-16"/>
      <path d="M180,44 q-6,-22 -18,-32 M180,44 q0,-24 8,-36 M180,44 q12,-14 26,-18"/>
      <path d="M330,46 q-4,-16 -12,-24 M330,46 q6,-18 16,-26"/>
    </g>
    <g stroke="#0f4a5e" stroke-width="3" opacity="0.45" fill="none">
      <path d="M120,66 q4,-20 18,-28 q14,8 18,28"/>
      <path d="M260,66 q4,-18 16,-26 q12,8 16,26"/>
    </g></svg>`,
  twilight: `<svg viewBox="0 0 400 70" preserveAspectRatio="xMidYMax slice">
    <path d="M0,70 L0,30 L90,44 L200,58 L400,64 L400,70 Z" fill="#0d2c48" opacity="0.65"/>
    <path d="M0,70 L0,52 L140,60 L400,70 Z" fill="#081f36" opacity="0.7"/>
    <g fill="#0d2c48" opacity="0.5">
      <path d="M300,52 l10,-14 l10,14 Z"/>
      <path d="M340,56 l8,-11 l8,11 Z"/>
    </g></svg>`,
  deep: `<svg viewBox="0 0 400 70" preserveAspectRatio="xMidYMax slice">
    <path d="M0,70 L0,52 Q120,44 220,52 Q320,58 400,50 L400,70 Z" fill="#05090e" opacity="0.8"/>
    <ellipse cx="120" cy="56" rx="26" ry="8" fill="#0a1219" opacity="0.8"/>
    <ellipse cx="300" cy="58" rx="34" ry="9" fill="#0a1219" opacity="0.8"/>
  </svg>`
};
/* depth key used by the planner -> scenery key. */
const SCENERY_FOR = { surface: "surface", reef: "reef", twilight: "twilight", deep: "deep" };
function renderScenery(depth) {
  const el = $("diveScenery");
  if (!el) return;
  el.innerHTML = SCENERY[SCENERY_FOR[depth] || "surface"] || "";
  el.querySelectorAll(".snow").forEach(n => n.remove());
  /* Marine snow in the deep: slow-falling specks. */
  if (depth === "deep") {
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.className = "snow";
      s.style.left = (Math.random() * 100) + "%";
      s.style.animationDuration = (7 + Math.random() * 9).toFixed(1) + "s";
      s.style.animationDelay = (-Math.random() * 12).toFixed(1) + "s";
      s.style.width = s.style.height = (1 + Math.random() * 2.5).toFixed(1) + "px";
      el.appendChild(s);
    }
  }
}

/* v0.13.0: background fish drift through between sightings so the water
   never feels empty. Small, dim, clearly behind the action. */
let ambientTimer = null;
function startAmbientLife(depth) {
  stopAmbientLife();
  const creatures = depth === "deep" ? ["fish"] : ["fish", "fish", "turtle", "dolphin"];
  ambientTimer = setInterval(() => {
    if (document.hidden) return;
    if (Math.random() < 0.55) spawnCreature(pick(creatures), true);
  }, 6000);
}
function stopAmbientLife() {
  if (ambientTimer) { clearInterval(ambientTimer); ambientTimer = null; }
}

/* Ambient sea life + quiet easter-egg flavour during the dive. */
function spawnCreature(type, background) {
  const scene = $("diveScene");
  const art = CREATURE_ART[type];
  if (!art) return;
  const el = document.createElement("div");
  el.className = "ambient" + (background ? " bg-fish" : "");
  el.innerHTML = art;
  el.style.top = (8 + Math.random() * 55) + "%";
  el.style.animationDuration = (9 + Math.random() * 8).toFixed(1) + "s";
  el.style.height = background
    ? Math.round(10 + Math.random() * 8) + "px"
    : Math.round(24 + Math.random() * 26) + "px";
  if (Math.random() < 0.4) el.style.transform = "scaleX(-1)";
  el.addEventListener("animationend", () => el.remove());
  scene.appendChild(el);
  setTimeout(() => el.remove(), 25000); // safety net
}

/* Guaranteed ambient life before the shark reveal: the scene must feel
   alive first. At least one sighting always lands; a rare easter egg may
   join it. v0.6.0: eggs are likelier in the deep, where secrets live. */
async function showSighting(depth) {
  // Rare, quiet easter eggs: real phenomena, mentioned in passing.
  const eggChance = (depth === "twilight" || depth === "deep") ? 0.35 : 0.12;
  if (Math.random() < eggChance) {
    const eggs = EASTER_EGGS.filter(e => e.depths.includes(depth));
    if (eggs.length) {
      logLine(`✨ ${pick(eggs).text}`);
      await wait(1600);
    }
  }
  const options = SIGHTINGS[depth] || [];
  if (options.length) {
    /* v0.13.0: dealt from the trip deck — each sighting once per trip.
       v0.13.0 review fix: the deck does NOT refill. A long trip simply
       runs out of new sightings instead of repeating them. */
    if (tripDecks && !tripDecks.sightings.deck.length) return;
    const s = tripDecks ? deal(tripDecks.sightings.deck, tripDecks.sightings.pool) : pick(options);
    logLine(`👁️ ${s.text}`);
    spawnCreature(s.creature);
  }
}

/* ---------- Expedition: a full day out ----------
   v0.7.0: no target species. Each shark declares where it can appear
   (region + bait + depth range) — that declaration IS the encounter
   table. A combination resolves to every species whose declaration
   matches. New sharks slot in by adding their own declaration. */
function resolveEncounters(plan) {
  return SHARKS.filter(s => {
    const baitOk = Array.isArray(s.combo.bait)
      ? s.combo.bait.includes(plan.bait)
      : s.combo.bait === plan.bait;
    return s.combo.region === plan.region &&
      s.depths.includes(plan.depth) &&
      baitOk;
  });
}

/* Pick one species for an encounter slot: prefer untagged species the
   player hasn't already seen today, then familiar faces for watching.
   v0.8.0: the scent lure BOOSTS — a species the lure is right for gets
   triple weight. A wrong lure or no lure changes nothing (never a gate).
   v0.9.0: same boost-only semantics, now keyed on the Method dimension —
   a species boosts only on (method, sub-option) pairs that are real for
   that animal. */
function methodWeight(plan, species) {
  const m = (plan && plan.method) || "attract";
  const opt = (plan && plan.methodOpt) || "none";
  return ((species.methods || {})[m] || []).includes(opt) ? 3 : 1;
}
function pickEncounter(appeared, shown, plan) {
  const fresh = appeared.filter(s => !shown.has(s.id));
  if (!fresh.length) return null;
  const newToPlayer = fresh.filter(s => !state.tagged[s.id]);
  const pool = newToPlayer.length ? newToPlayer : fresh;
  let total = 0;
  const weights = pool.map(s => { const w = methodWeight(plan, s); total += w; return w; });
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

/* One encounter: the shark appears, and the player chooses to WATCH
   (a sighting, logged) or TAG (if untagged — opportunistic tagging is
   always allowed). Either way the day goes on. */
function doEncounter(species, plan) {
  return new Promise(resolve => {
    const rec = state.tagged[species.id];
    const sharkEl = $("diveShark");
    sharkEl.innerHTML = ART[species.id];
    sharkEl.classList.remove("hidden");
    /* v0.17.1: the moment a shark appears, say whether it's already in the
       book — no squinting at the small print under the buttons. */
    const already = rec
      ? ` — already in your book${rec.name ? ` as \u201c${esc(rec.name)}\u201d` : ""}!`
      : ` — new to your book!`;
    logLine(`🦈 <span class="found">Shark! A ${species.name}${already}</span>`, "found");
    const actions = $("diveActions");
    actions.classList.remove("hidden");
    actions.innerHTML = "";
    const finish = () => {
      /* The day doesn't end on its own — after each encounter the player
         chooses: keep diving, or head back to the ship. */
      actions.innerHTML = "";
      const stayBtn = document.createElement("button");
      stayBtn.className = "secondary-button";
      stayBtn.type = "button";
      stayBtn.textContent = "🌊 Keep diving";
      stayBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        resolve(false);
      });
      const backBtn = document.createElement("button");
      backBtn.className = "secondary-button";
      backBtn.type = "button";
      backBtn.textContent = "⛵ Head back to the ship";
      backBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        resolve(true);
      });
      actions.appendChild(stayBtn);
      actions.appendChild(backBtn);
      actions.classList.remove("hidden");
    };
    const watchBtn = document.createElement("button");
    watchBtn.className = "secondary-button";
    watchBtn.type = "button";
    watchBtn.textContent = "👁️ Just watch";
    watchBtn.addEventListener("click", () => {
      const entry = recordSighting(species, plan);
      logTripEncounter(species, "watched");
      logLine(`👁️ You watch the ${species.name} ${entry.doing}. A good sighting, logged.`);
      finish();
    });
    actions.appendChild(watchBtn);
    if (!rec) {
      const tagBtn = document.createElement("button");
      tagBtn.className = "primary-button";
      tagBtn.type = "button";
      tagBtn.textContent = `🏷️ Tag the ${species.name}`;
      tagBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        /* v0.17.1: the release buttons resolve the encounter directly —
           no second keep-diving/head-back prompt after the health check. */
        openTagging(species, (headBack) => {
          actions.classList.add("hidden");
          actions.innerHTML = "";
          resolve(headBack === true);
        });
      });
      actions.appendChild(tagBtn);
    } else {
      /* v0.8.0: it's one of yours — log the re-sighting. */
      const resightBtn = document.createElement("button");
      resightBtn.className = "secondary-button";
      resightBtn.type = "button";
      resightBtn.textContent = "📝 Log re-sighting";
      resightBtn.addEventListener("click", () => {
        const entry = recordResighting(species, plan);
        logTripEncounter(species, "resighted");
        logLine(`📝 Re-sighting logged — ${species.name} off ${esc(entry.location)}. ${esc(entry.note)}`);
        pushThread(resightThread(species, rec));
        state.resightedThisTrip = true;
        finish();
      });
      actions.appendChild(resightBtn);
    }
  });
}

/* v0.7.0: a trip is a full day out — descent, wildlife, then 2–4
   encounter slots paced through the day, then day's end. The shark is
   a moment in the day, never the end of it. */
async function runExpedition(plan) {
  state.currentPlan = plan;
  state.pendingWin = false;
  state.taggedThisTrip = false;
  state.resightedThisTrip = false;
  /* v0.18.0: feed achievement stats — regions visited, baits used. */
  if (plan.region && !state.stats.regionsVisited.includes(plan.region)) {
    state.stats.regionsVisited.push(plan.region);
  }
  if (plan.bait && !state.stats.baitsUsed.includes(plan.bait)) {
    state.stats.baitsUsed.push(plan.bait);
  }
  if (plan.methodOpt && plan.methodOpt !== "none" && !state.stats.methodsUsed.includes(plan.methodOpt)) {
    state.stats.methodsUsed.push(plan.methodOpt);
  }
  saveStats();
  tripDecks = { waiting: shuffled(WAITING_LINES), doing: shuffled(SIGHTING_DOINES), sightings: buildSightingDeck(plan.depth, plan.region) };
  /* v0.8.0: open a fresh logbook page for this trip. */
  tripLog = {
    ts: Date.now(),
    date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
    region: plan.region,
    depth: plan.depth,
    bait: plan.bait,
    /* v0.20.0 Mira review fix: record the actual method ("" when unpicked) —
       the logbook renders "No method chosen"; "attract" was a misrecord. */
    method: plan.method || "",
    methodOpt: plan.methodOpt || "none",
    /* v0.22.0: fieldwork conditions — weather/sea state for the logbook. */
    conditions: pick(SEA_CONDITIONS),
    encounters: []
  };
  $("launchBtn").disabled = true;
  $("diveView").classList.remove("hidden");
  $("diveActions").classList.add("hidden");
  $("diveActions").innerHTML = "";
  $("diveLog").innerHTML = "";
  $("diveShark").classList.add("hidden");

  const scene = $("diveScene");
  scene.className = "dive-scene " + DEPTHS[plan.depth].scene;
  renderScenery(plan.depth);
  startAmbientLife(plan.depth);
  const deep = plan.depth === "twilight" || plan.depth === "deep";

  const baitText = plan.bait === "plankton"
    ? "No bait — scanning the water for a plankton bloom…"
    : `Bait deployed: ${BAITS[plan.bait]}.`;

  logLine(`🛥️ <strong>Expedition begun</strong> — the research vessel leaves the harbor.`);
  await wait(1700);
  logLine(`🌤️ ${tripLog.conditions}`);
  await wait(1700);
  logLine(`🪝 ${baitText}`);
  await wait(1700);
  /* v0.9.0: the method in the water, if any. Neutral wording — no promises. */
  const methodText = (!plan.method || (plan.method === "attract" && (!plan.methodOpt || plan.methodOpt === "none")))
    ? "No attractant in the water — just the bait doing the talking."
    : plan.method === "aggregation"
      ? (plan.methodOpt === "network"
        ? "Tapping the local sightings network — fishermen, divers, and sailors phoning in every fin they see."
        : `Running a ${METHODS.aggregation.opts[plan.methodOpt].toLowerCase()} to find the feeding aggregation.`)
      : `${METHODS.attract.opts[plan.methodOpt]} in the water.`;
  logLine(`🌊 ${methodText}`);
  await wait(1700);
  if (deep) {
    logLine(`⬇️ The water darkens as you descend. The surface light thins, then lets go.`);
    await wait(2000);
  }
  logLine(`🌊 ${pick(DEPTH_FLAVOUR[plan.depth])}`);
  await wait(2000);
  // The scene must feel alive before anything else: sightings always land.
  await showSighting(plan.depth);
  await wait(2100);
  logLine(`👀 ${REGIONS[plan.region].note}`);
  await wait(2000);

  const appeared = resolveEncounters(plan);
  const shown = new Set();
  const slots = 2 + Math.floor(Math.random() * 3); // 2–4 encounters
  let sawShark = false;
  let endedEarly = false;
  for (let i = 0; i < slots; i++) {
    $("diveShark").classList.add("hidden");
    if (i > 0) {
      logLine(deep
        ? `⏳ The hours slip by. The deep does not hurry, so neither do you.`
        : `⏳ The morning wears on…`);
      await wait(2000);
    }
    await showSighting(plan.depth);
    await wait(1900);
    const s = pickEncounter(appeared, shown, plan);
    if (s) {
      shown.add(s.id);
      sawShark = true;
      const headBack = await doEncounter(s, plan);
      await wait(1200);
      if (headBack) { endedEarly = true; break; }
    } else {
      logLine(`👀 ${deal(tripDecks.waiting, WAITING_LINES)}`);
      await wait(1800);
    }
  }

  // Day's end — the trip closes naturally, or early if the player chose to head back.
  stopAmbientLife();
  $("diveShark").classList.add("hidden");
  if (endedEarly) {
    logLine(`⛵ You call it a day and turn for home — a good day on the water.`);
  } else {
    logLine(`🌅 The light changes. Time to head in — the day is done.`);
  }
  await wait(1800);
  if (!sawShark) {
    state.failures += 1;
    logLine(`<span class="miss">No sharks today. The sea keeps its counsel.</span>`, "miss");
    await wait(1200);
    /* v0.22.0: failed trips feel like fieldwork — warm, never punishing.
       v0.22.0 Mira review: persist the note so it survives in the logbook. */
    const fieldNote = pickFieldNote(plan.region);
    logLine(`📓 <em>${fieldNote}</em>`);
    if (tripLog) tripLog.fieldNote = fieldNote;
  } else {
    state.failures = 0;
  }
  /* v0.18.0: expedition count feeds the "Sea Legs" achievement. */
  state.stats.expeditions = (state.stats.expeditions || 0) + 1;
  saveStats();
  checkAchievements();
  advanceBruceChain(); // v0.23.0: slow-burn easter egg

  /* v0.8.0: close the logbook page for this trip.
     v0.22.0 Mira review: attach pin hint grounded in this completed expedition. */
  if (tripLog) {
    if (state.pinned) {
      const hint = pinHintForTrip(tripLog, state.pinned);
      if (hint) tripLog.pinHint = hint.hint;
    }
    state.logbook.unshift(tripLog);
    logStore.save(state.logbook);
    tripLog = null;
    renderLogbook();
  }

  const actions = $("diveActions");
  actions.classList.remove("hidden");
  actions.innerHTML = "";
  /* v0.13.0: the actual return-to-ship. One button, one job. */
  const closeDive = () => {
    actions.classList.add("hidden");
    actions.innerHTML = "";
    $("diveView").classList.add("hidden");
    $("launchBtn").disabled = false;
    renderAll();
    if (state.pendingWin) {
      state.pendingWin = false;
      doWin();
    } else {
      afterExpedition(plan);
    }
  };
  /* v0.13.0: the player already said "head back" once — don't ask again.
     Give the closing lines a beat to land, then close on their own. */
  if (endedEarly) {
    await wait(2200);
    closeDive();
    return;
  }
  const backBtn = document.createElement("button");
  backBtn.className = "secondary-button";
  backBtn.type = "button";
  backBtn.textContent = "⛵ Return to ship";
  backBtn.addEventListener("click", closeDive);
  actions.appendChild(backBtn);
}

/* ---------- Sightings log: watched, not tagged ----------
   v0.7.0: choosing "just watch" records a sighting — species, what it
   was doing, where and when. Spotted-but-not-tagged. Pure value, no
   progression mechanics attached. */
function recordSighting(species, plan) {
  const entry = {
    speciesId: species.id,
    name: species.name,
    doing: tripDecks ? deal(tripDecks.doing, SIGHTING_DOINES) : pick(SIGHTING_DOINES),
    location: REGIONS[plan.region].name,
    date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
    ts: Date.now()
  };
  state.sightings.unshift(entry);
  sightStore.save(state.sightings);
  renderSightings();
  return entry;
}

function renderSightings() {
  const list = $("sightingsList");
  if (!list) return;
  list.innerHTML = "";
  if (!state.sightings.length) {
    list.innerHTML = `<div class="empty-note">No sightings yet.<br>Watch a shark without tagging it and it'll be logged here. 👁️</div>`;
    return;
  }
  state.sightings.forEach(e => {
    const div = document.createElement("div");
    div.className = "sighting-entry";
    div.innerHTML = `
      <div class="sighting-name">👁️ ${esc(e.name)}</div>
      <div class="sighting-detail">${esc(e.doing)} — ${esc(e.location)}, ${esc(e.date)}</div>`;
    list.appendChild(div);
  });
}

/* ---------- Re-sightings: your tagged sharks, seen again ----------
   v0.8.0: a tagged shark can reappear on a later dive in the right
   waters. Logging the re-sighting adds a field entry to the shark's
   collection card and extends its tracking story — warm, not a
   progression track. */
const RESIGHT_NOTES = [
  "Looking healthy and unhurried.",
  "A fresh scar on the dorsal fin — a story there.",
  "A little bigger than at tagging, if the eye can be trusted.",
  "Cruising with a companion this time.",
  "Same calm circuit as ever — this one knows these waters.",
  "Bold as brass, came in close to look at the boat.",
  "Feeding well; good body condition.",
  "The tag is still seated perfectly. Good work, past us."
];

function recordResighting(species, plan) {
  const t = state.tagged[species.id];
  const entry = {
    date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
    location: REGIONS[plan.region].name,
    note: pick(RESIGHT_NOTES),
    ts: Date.now()
  };
  t.resightings = t.resightings || [];
  t.resightings.push(entry);
  /* The tracking story grows: a new ping on the map. v0.9.0: the hop
     distance and ping interval come from the species' real envelope,
     not generic ranges — a re-sighted epaulette moves metres, a mako
     moves hundreds of kilometres. */
  if (t.track && t.track.points.length) {
    const env = TRACK_ENVELOPES[species.id] || TRACK_ENVELOPES.nurse;
    const last = t.track.points[t.track.points.length - 1];
    const day = last.day + env.dayStep[0] + Math.floor(Math.random() * (env.dayStep[1] - env.dayStep[0] + 1));
    /* v0.21.0 Mira review: compute real distance from coordinates, not random hop. */
    const anchorLabel = (typeof TRACK_ENVELOPES !== "undefined" && TRACK_ENVELOPES[species.id] && TRACK_ENVELOPES[species.id].tagAnchor) || entry.location;
    const lastCoord = MAP_COORDS[last.label];
    const newCoord = MAP_COORDS[anchorLabel];
    let km;
    if (lastCoord && newCoord && typeof haversineKm === "function") {
      km = Math.round(haversineKm(lastCoord, newCoord) * 10) / 10;
    } else {
      km = Math.round((env.hop[0] + Math.random() * (env.hop[1] - env.hop[0])) * 10) / 10;
    }
    t.track.points.push({ label: anchorLabel, day, km, resighting: true });
    t.track.days = day;
    t.track.totalKm = Math.round((t.track.totalKm + km) * 10) / 10;
  }
  store.save(state.tagged);
  /* v0.18.0: re-sights feed the "Old Friend" achievement. */
  state.stats.resights = (state.stats.resights || 0) + 1;
  saveStats();
  checkAchievements();
  renderCollection();
  return entry;
}

/* A re-sighting gets its own little celebration — species-relevant,
   like every other Sarah moment after a tag. */
function resightThread(species, rec) {
  const label = rec.name ? `\u201c${rec.name}\u201d` : rec.researchId;
  const last = rec.resightings[rec.resightings.length - 1];
  return [
    { who: "them", text: `You saw ${label} again? The ${species.name.toLowerCase()}?` },
    { who: "me", text: `${species.name}, off ${last.location}. ${last.note}` },
    { who: "them", text: "That's the best part of tagging — you get to know it's them. Do you think it recognized you?" }
  ];
}

/* ---------- Sarah remembers sharks by name ----------
   v0.8.0: between expeditions she sometimes checks in about one of
   your NAMED sharks. Genuine family conversation — the fact stays
   with the species she asked about. */
const NAMED_CHECKINS = [
  /* v0.12.0 voice pass: the cousin who remembers, calmly. */
  { them: "Hey — how's {name} doing? I was just thinking about your {species}.",
    me: "Still out there pinging away. {hook}" },
  { them: "Do you think {name} remembers you?",
    me: "If sharks hold grudges about boats, I'm in trouble. {hook}" },
  { them: "Any news from {name}? I need a {species} update.",
    me: "No new pings since yesterday. Probably busy being a shark. {hook}" }
];

function maybeCheckinThread() {
  const named = SHARKS.filter(s => state.tagged[s.id] && state.tagged[s.id].name);
  if (!named.length || Math.random() > 0.4) return null;
  const s = pick(named);
  const rec = state.tagged[s.id];
  const t = pick(NAMED_CHECKINS);
  const fill = (str) => str
    .replaceAll("{name}", rec.name)
    .replaceAll("{species}", s.name.toLowerCase())
    .replaceAll("{hook}", s.hook);
  return [
    { who: "them", text: fill(t.them) },
    { who: "me", text: fill(t.me) }
  ];
}

/* ---------- Expedition logbook: the scientist's notebook ----------
   v0.9.0: every trip lands here — plan (region/depth/bait/method),
   encounters and outcome. Compare attempts; the pattern is the answer. */
/* v0.22.0: logbook filters — outcome, region, species. Filters narrow the
   notebook; they never solve the expedition. */
const logbookFilters = { outcome: "all", region: "all", species: "all" };

/* Pure: does a logbook trip entry match the given filters? Testable. */
/* v0.22.0 Mira review: filters represent EVENTS within the expedition.
   - "tagged": any tagged encounter (trip may also have others)
   - "resighted": any re-sighted encounter
   - "watched": any watched (just watch) encounter
   - "missed": no shark encounters at all
   A trip with multiple outcomes appears in each relevant filter. */
function logbookTripMatches(t, f) {
  if (f.outcome !== "all") {
    const enc = t.encounters || [];
    if (f.outcome === "tagged" && !enc.some(e => e.result === "tagged")) return false;
    if (f.outcome === "resighted" && !enc.some(e => e.result === "resighted")) return false;
    if (f.outcome === "watched" && !enc.some(e => e.result === "watched")) return false;
    if (f.outcome === "missed" && enc.length > 0) return false;
  }
  if (f.region !== "all" && t.region !== f.region) return false;
  if (f.species !== "all" && !(t.encounters || []).some(e => e.speciesId === f.species)) return false;
  return true;
}

function buildLogbookFilters() {
  const rs = $("logFilterRegion"), ss = $("logFilterSpecies");
  if (rs && rs.options && rs.options.length <= 1) {
    Object.entries(REGIONS).forEach(([id, r]) => {
      const o = document.createElement("option");
      o.value = id; o.textContent = r.name;
      rs.appendChild(o);
    });
  }
  if (ss && ss.options && ss.options.length <= 1) {
    SHARKS.forEach(s => {
      const o = document.createElement("option");
      o.value = s.id; o.textContent = s.name;
      ss.appendChild(o);
    });
  }
  ["logFilterOutcome", "logFilterRegion", "logFilterSpecies"].forEach(id => {
    const el = $(id);
    if (el && !el.dataset.bound) {
      el.dataset.bound = "1";
      el.addEventListener("change", () => {
        logbookFilters.outcome = $("logFilterOutcome").value;
        logbookFilters.region = $("logFilterRegion").value;
        logbookFilters.species = $("logFilterSpecies").value;
        renderLogbook();
      });
    }
  });
  const clr = $("logFilterClear");
  if (clr && !clr.dataset.bound) {
    clr.dataset.bound = "1";
    clr.addEventListener("click", () => {
      logbookFilters.outcome = "all"; logbookFilters.region = "all"; logbookFilters.species = "all";
      $("logFilterOutcome").value = "all"; $("logFilterRegion").value = "all"; $("logFilterSpecies").value = "all";
      renderLogbook();
    });
  }
}

function renderLogbook() {
  const list = $("logbookList");
  if (!list) return;
  buildLogbookFilters();
  list.innerHTML = "";
  const trips = state.logbook.filter(t => logbookTripMatches(t, logbookFilters));
  const anyFilter = logbookFilters.outcome !== "all" || logbookFilters.region !== "all" || logbookFilters.species !== "all";
  const clr = $("logFilterClear");
  if (clr) clr.classList.toggle("hidden", !anyFilter);
  if (!state.logbook.length) {
    list.innerHTML = `<div class="empty-note">No expeditions logged yet.<br>Every trip lands here — plan, encounters, outcome. 📓</div>`;
    return;
  }
  if (!trips.length) {
    list.innerHTML = `<div class="empty-note">No trips match those filters.<br>Try clearing something — the ocean is bigger than it looks.</div>`;
    return;
  }
  trips.forEach(t => {
    const div = document.createElement("div");
    div.className = "logbook-entry";
    const planBits = [
      REGIONS[t.region] ? REGIONS[t.region].name : t.region,
      DEPTHS[t.depth] ? DEPTHS[t.depth].name : t.depth,
      BAITS[t.bait] || t.bait,
      /* v0.9.0: method; pre-v0.9.0 entries stored `lure` — render those
         with the legacy labels so old trips still read sensibly.
         v0.9.1: the planner lets Method stay unpicked (sub-menu hidden) —
         those trips log method:"" and read as "No method chosen". */
      (t.method && METHODS[t.method])
        ? `${METHODS[t.method].name} — ${METHODS[t.method].opts[t.methodOpt] || t.methodOpt}`
        : ("method" in t ? "No method chosen"
          : (t.lure && t.lure !== "none" ? LEGACY_LURES[t.lure] || t.lure : "No lure"))
    ];
    const enc = t.encounters.length
      ? t.encounters.map(e => {
          const icon = e.result === "tagged" ? "🏷️" : e.result === "resighted" ? "🔁" : "👁️";
          return `${icon} ${esc(e.name)} <span class="dim">(${e.result})</span>`;
        }).join("<br>")
      : `<span class="dim">No sharks today.</span>`;
    div.innerHTML = `
      <div class="logbook-date">🛥️ ${esc(t.date)}</div>
      <div class="logbook-plan">${planBits.map(esc).join(" · ")}</div>
      ${t.conditions ? `<div class="logbook-conditions latin">🌤️ ${esc(t.conditions)}</div>` : ""}
      ${t.fieldNote ? `<div class="logbook-fieldnote latin">🔭 ${esc(t.fieldNote)}</div>` : ""}
      <div class="logbook-enc">${enc}</div>
      ${t.pinHint ? `<div class="logbook-pinhint"><span class="pin-hint-icon">📓</span> <em>${esc(t.pinHint)}</em></div>` : ""}
      <button type="button" class="repeat-btn" data-repeat>🔁 Repeat this plan</button>`;
    const rb = div.querySelector("[data-repeat]");
    if (rb) rb.addEventListener("click", () => repeatPlan(t));
    list.appendChild(div);
  });
}

/* v0.20.0: repeat a logged expedition's plan — restores region, depth, bait
   and method into the planner and jumps to the Expedition tab. Values that
   no longer exist (e.g. a re-locked region) are skipped, never forced. */
function repeatPlan(t) {
  if (!t) return;
  const set = (id, val) => {
    const el = $(id);
    if (!el || val == null || val === "") return false;
    if ([...el.options].some(o => o.value === val && !o.disabled)) {
      el.value = val;
      el.dispatchEvent(new Event("change"));
      return true;
    }
    return false;
  };
  set("regionSelect", t.region);
  set("depthSelect", t.depth);
  set("baitSelect", t.bait);
  /* Method select's change handler fills the sub-options synchronously,
     so the opt can be set right after. v0.20.0 Mira review fix: a saved
     expedition with no method restores NO method — it must not retain
     whatever was previously picked in the planner. */
  if (set("methodSelect", t.method || "")) {
    set("methodOptSelect", t.methodOpt || "none");
  } else {
    const ms = $("methodSelect");
    if (ms && !t.method) { ms.value = ""; ms.dispatchEvent(new Event("change")); }
  }
  goTab("expedition");
}

function updateMsgBadge() {
  const b = $("msgBadge");
  b.textContent = state.unread;
  b.classList.toggle("hidden", state.unread === 0);
}

function renderMessages() {
  const list = $("messagesList");
  list.innerHTML = "";
  if (!state.messages.length) {
    list.innerHTML = `<div class="empty-note">No messages yet.<br>Sarah will text you between expeditions. 💬</div>`;
    return;
  }
  state.messages.forEach(thread => {
    const wrap = document.createElement("div");
    wrap.className = "thread";
    const stamp = thread.ts
      ? `<div class="thread-stamp">${esc(fmtTime(thread.ts))}</div>`
      : "";
    wrap.innerHTML = `${stamp}<div class="phone-thread"></div>`;
    const th = wrap.querySelector(".phone-thread");
    thread.msgs.forEach(m => {
      const b = document.createElement("div");
      b.className = "bubble " + m.who;
      b.textContent = m.text;
      th.appendChild(b);
    });
    list.appendChild(wrap);
  });
  // Like a real chat: oldest at top, newest at the bottom, pinned to the latest.
  list.scrollTop = list.scrollHeight;
}

/* v0.7.0: no target species anymore, so the nudge picks an untagged
   shark to point at — a useful direction, not a correction. */
/* v0.12.0: contextual hints. Sarah pays attention to where you've been
   searching — hints and chats prefer species from the player's most recent
   expedition region, so she talks about the shark you're actually after
   instead of spamming the whole roster. Falls back to the full roster when
   there's no recent region (or nothing untagged there). */
function regionalSpecies(onlyUntagged) {
  const pool = onlyUntagged ? untagged() : SHARKS;
  if (state.lastRegion) {
    const local = pool.filter(s => s.combo.region === state.lastRegion);
    if (local.length) return local;
  }
  return pool.length ? pool : SHARKS;
}
function pickChat() {
  const pool = regionalSpecies(false).filter(s => COUSIN_CHATS[s.id]);
  const s = pick(pool.length ? pool : SHARKS.filter(x => COUSIN_CHATS[x.id]));
  const chats = COUSIN_CHATS[s.id];
  const seen = state.chatSeen[s.id] || 0;
  state.chatSeen[s.id] = seen + 1;
  return chats[seen % chats.length];
}
function afterExpedition(plan) {
  /* A trip with a successful tag already got its Sarah moment — the
     species-relevant celebration thread. Same for a re-sighting. Don't
     follow it minutes later with an unrelated random fact. */
  if (plan && plan.region) { state.lastRegion = plan.region; saveMsgs(); }
  if (state.taggedThisTrip || state.resightedThisTrip) return;
  let thread;
  if (state.failures >= 5) {
    // gentle nudge, genuine-conversation style — about YOUR waters.
    // v0.17.1: Sarah only butts in on her own after five; before that,
    // asking is the player's call (see the Ask Sarah panel).
    const s = pick(regionalSpecies(true));
    thread = [
      { who: "them", text: "How's the shark hunting going?" },
      { who: "me", text: "Honestly? Struck out a few times. The water's been empty." },
      { who: "them", text: COUSIN_NUDGES[s.id] || "You'll get the next one. I believe in you." },
      { who: "me", text: "Huh. Okay, that's actually really helpful. Thanks, kiddo." }
    ];
    state.failures = 0;
  } else if (state.failures === 1 && !state.sarahAdviceOffered) {
    /* v0.17.1: after the first failed trip, Sarah offers her notes — the
       player picks the species, since the game may not know what they're
       actually after. The Ask Sarah panel appears in the Phone tab. */
    thread = [
      { who: "them", text: "Rough day out there?" },
      { who: "me", text: "Yeah. Empty water." },
      { who: "them", text: "I've got notes on every shark we've studied. Pick one below and I'll tell you what I know — where to look, what they like." }
    ];
    state.sarahAdviceOffered = true;
    saveMsgs(); // v0.17.1 review fix: the offer must survive a reload
  } else {
    /* v0.8.0: sometimes she just checks in about one of your named
       sharks — the cousin who remembers. */
    const checkin = maybeCheckinThread();
    if (checkin) {
      thread = checkin;
    } else {
      const chat = pickChat();
      thread = [
        { who: "them", text: chat.them },
        { who: "me", text: chat.me }
      ];
    }
  }
  pushThread(thread);
  renderSarahAsk();
}

/* v0.17.1: Ask Sarah — player-initiated advice. The panel appears in the
   Phone tab after the first failed trip; the player picks the species. */
function renderSarahAsk() {
  const panel = $("sarahAsk");
  if (!panel) return;
  const show = !!state.sarahAdviceOffered && untagged().length > 0;
  panel.classList.toggle("hidden", !show);
  if (!show) return;
  const sel = $("sarahAskSelect");
  sel.innerHTML = "";
  untagged().forEach(s => {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = s.name;
    sel.appendChild(o);
  });
}
function askSarahAdvice(sid) {
  const s = sharkById(sid);
  if (!s) return;
  pushThread([
    { who: "me", text: `I'm striking out — any advice on the ${s.name.toLowerCase()}?` },
    { who: "them", text: COUSIN_NUDGES[sid] || "You'll get the next one. I believe in you." },
    { who: "me", text: "Thanks, kiddo. That's actually really helpful." }
  ]);
  state.sarahAdviceOffered = false;
  saveMsgs(); // v0.17.1 review fix: a used offer stays used across reloads
  renderSarahAsk();
  goTab("phone");
}

/* ---------- Achievements (v0.18.0) ----------
   Visible upfront with breadcrumb hints until unlocked. Checks run after
   the actions that can earn them; unlocks persist and celebrate. */
function saveStats() {
  statsStore.save(state.stats);
}
function checkAchievements() {
  if (typeof ACHIEVEMENTS === "undefined") return;
  ACHIEVEMENTS.forEach(a => {
    if (state.achievements[a.id]) return;
    let earned = false;
    try { earned = !!a.check(state); } catch { earned = false; }
    if (earned) unlockAchievement(a);
  });
}
function unlockAchievement(a) {
  state.achievements[a.id] = Date.now();
  achieveStore.save(state.achievements);
  renderAchievements();
  /* v0.18.0 review: queue celebrations so one action earning several
     achievements shows each card in turn instead of overwriting. */
  achieveQueue.push(a);
  showNextAchievement();
}
const achieveQueue = [];
let achieveShowing = false;
function showNextAchievement() {
  if (achieveShowing || !achieveQueue.length) return;
  const a = achieveQueue.shift();
  achieveShowing = true;
  const ov = $("achieveOverlay");
  if (!ov) { achieveShowing = false; return; }
  ov.classList.remove("hidden");
  ov.innerHTML = `<div class="phone">
    <div class="cert-trophy" style="font-size:52px; text-align:center">${a.icon}</div>
    <h2 style="text-align:center; margin:8px 0 2px">Achievement Unlocked!</h2>
    <p style="text-align:center; font-weight:800; margin:4px 0">${esc(a.name)}</p>
    <p class="latin" style="text-align:center">${esc(a.description)}</p>
    <button id="achieveClose" class="primary-button" type="button">Sweet!</button>
  </div>`;
  $("achieveClose").addEventListener("click", () => {
    ov.classList.add("hidden");
    achieveShowing = false;
    showNextAchievement();
  });
}
function renderAchievements() {
  const list = $("achieveList");
  if (!list || typeof ACHIEVEMENTS === "undefined") return;
  /* v0.23.0: hidden achievements (e.g. Bruce) don't appear until unlocked. */
  const visible = ACHIEVEMENTS.filter(a => !a.hidden || state.achievements[a.id]);
  const unlockedCount = visible.filter(a => state.achievements[a.id]).length;
  const head = $("achieveHead");
  if (head) head.innerHTML = `<h2>Achievements</h2><p>${unlockedCount} of ${visible.length} unlocked</p>`;
  list.innerHTML = "";
  visible.forEach(a => {
    const unlocked = !!state.achievements[a.id];
    const row = document.createElement("div");
    row.className = "guide-row" + (unlocked ? "" : " locked");
    row.innerHTML = `
      <div class="guide-row-head" style="cursor:default">
        <span style="font-size:22px">${unlocked ? a.icon : "🔒"}</span>
        <span class="guide-row-name">${unlocked ? esc(a.name) : "???"}</span>
        <span class="latin">${unlocked ? esc(a.description) : esc(a.breadcrumb)}</span>
      </div>`;
    list.appendChild(row);
  });
  const badge = $("achieveBadge");
  if (badge) {
    badge.textContent = `${unlockedCount}/${visible.length}`;
    badge.classList.toggle("hidden", unlockedCount === 0);
  }
}

/* ---------- Tagging ---------- */

const rand = (a, b) => Math.round((a + Math.random() * (b - a)) * 10) / 10;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* v0.7.3: flavour lines are dealt like cards — shuffled per trip, each
   line once, so phrases never repeat within a day. */
function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
let tripDecks = null;
function deal(deck, pool) {
  if (!deck.length) deck.push(...shuffled(pool));
  return deck.pop();
}

/* v0.8.0: the trip currently being logged for the logbook. */
let tripLog = null;
function logTripEncounter(species, result) {
  if (!tripLog) return;
  tripLog.encounters.push({ speciesId: species.id, name: species.name, result });
}

/* ---------- Tagging: tag -> health check -> release ----------
   v0.7.0: tagging happens mid-trip and the day goes on. After the tag is
   saved, a health-check beat runs (tag seated, vitals noted), then the
   shark is released and the expedition resumes — doneCb continues the trip. */
function openTagging(species, doneCb) {
  state.pendingTag = species;
  state.encounterDone = doneCb || null;
  const length = rand(species.sizeRange[0], species.sizeRange[1]);
  const sex = Math.random() < 0.5 ? "female" : "male";
  const researchId = mintResearchId(species);
  state.pendingTag._gen = { length, sex, researchId };
  $("tagForm").classList.remove("hidden");
  $("healthView").classList.add("hidden");
  $("tagSharkArt").innerHTML = ART[species.id];
  $("tagInfo").innerHTML = `
    <strong>${species.name}</strong> <em>(${species.latin})</em><br>
    🔬 Research ID: <strong>${researchId}</strong> (assigned automatically)<br>
    📏 ${length} m &nbsp;·&nbsp; ${sex === "female" ? "♀ female" : "♂ male"}<br>
    📍 Tagged at: ${REGIONS[state.currentPlan.region].name}<br>
    📅 ${new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
  `;
  $("sharkName").value = "";
  $("sharkName").placeholder = pick(species.nameIdeas) + "…";
  $("tagOverlay").classList.remove("hidden");
  setTimeout(() => $("sharkName").focus(), 100);
}

function confirmTag(name) {
  const s = state.pendingTag;
  if (!s) return;
  const regionName = REGIONS[state.currentPlan.region].name;
  const dateStr = new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const rec = {
    name: name || "",
    researchId: s._gen.researchId,
    length: s._gen.length,
    sex: s._gen.sex,
    location: regionName,
    date: dateStr,
    taggedAt: Date.now(), // v0.16.0: explicit chronology for the ending
    track: genTrack(s, { location: regionName, date: dateStr })
  };
  state.tagged[s.id] = rec;
  state.taggedThisTrip = true;
  logTripEncounter(s, "tagged");
  store.save(state.tagged);
  state.pendingTag = null;
  /* v0.18.0: chum tags feed the "Something in the Water" achievement —
     v0.18.0 review: only when chum is a real method for THIS species. */
  if (state.currentPlan && state.currentPlan.method === "attract" &&
      state.currentPlan.methodOpt === "chum" &&
      s.methods && s.methods.attract && s.methods.attract.includes("chum")) {
    state.stats.chumTags = (state.stats.chumTags || 0) + 1;
    saveStats();
  }
  /* v0.19.0: depths tagged feed the "Full Fathom" achievement. */
  if (state.currentPlan && state.currentPlan.depth &&
      !state.stats.depthsTagged.includes(state.currentPlan.depth)) {
    state.stats.depthsTagged.push(state.currentPlan.depth);
    saveStats();
  }
  // Sarah celebrates wins, not just failures: excitement + a bonus fact.
  // v0.6.0: the opener varies per species (draft openers — Avery to revise).
  pushThread([
    { who: "them", text: s.opener },
    { who: "me", text: `A ${s.name} — ${rec.length} metres, ${rec.sex}. Research ID ${rec.researchId}.` },
    { who: "them", text: s.cheer }
  ]);
  maybeSarahEgg(s.id, rec);
  maybeNameEgg(s.id, rec); // v0.23.0
  checkMilestones();
  checkAchievements(); // v0.18.0
  renderAll();
  showHealthCheck(s, rec);
}

function showHealthCheck(s, rec) {
  state.healthSpecies = s;
  $("tagForm").classList.add("hidden");
  $("healthView").classList.remove("hidden");
  $("healthArt").innerHTML = ART[s.id];
  $("healthInfo").innerHTML = `
    <strong>${s.name}</strong> — ${esc(rec.researchId)}<br>
    🩺 Health check: ${rec.sex === "female" ? "♀ female" : "♂ male"}, ${rec.length} m.<br>
    Tag seated well, swimming strongly, good body condition.<br>
    <em>Every shark released healthy. 🦈</em>
  `;
}

/* v0.17.1: the release IS the destination choice — keep diving or head back.
   The release buttons resolve the encounter directly instead of dropping the
   player into a second keep-diving/head-back prompt. */
function doRelease(headBack) {
  const done = state.encounterDone;
  const s = state.healthSpecies;
  state.encounterDone = null;
  state.healthSpecies = null;
  $("tagOverlay").classList.add("hidden");
  if (s) {
    logLine(`🌊 The ${s.name} kicks once and is gone — back to its life, carrying your tag.`);
  }
  renderAll();
  if (done) done(headBack);
}
$("releaseBtn").addEventListener("click", () => doRelease(false));
$("releaseShipBtn").addEventListener("click", () => doRelease(true));
/* v0.17.1: Ask Sarah for advice. */
$("sarahAskBtn").addEventListener("click", () => {
  const sid = $("sarahAskSelect").value;
  if (sid) askSarahAdvice(sid);
});

/* ---------- Milestones & win state ----------
   v0.7.0: two stages.
   - Tagging the first six (the original roster) unlocks the Galápagos and
     South Africa as real, selectable waters.
   - Tagging the full roster wins the game: Master Shark Tagger.
     v0.11.0: the win moves up with the roster (SHARKS.length), always. */
function checkMilestones() {
  const taggedIds = Object.keys(state.tagged);
  if (!state.regionsUnlocked && ORIGINAL_SIX.every(id => taggedIds.includes(id))) {
    state.regionsUnlocked = true;
    try { localStorage.setItem("tyi-regions", "1"); } catch {}
    for (const id of ["galapagos", "south-africa"]) REGIONS[id].locked = false;
    fillRegions();
    pushThread(REGION_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlock();
  }
  /* v0.21.0 sharknado: progressive region unlocks by tag count.
     v0.21.0 Mira review: independent of original-six unlock. */
  const n = taggedIds.length;
  if (n >= 15 && REGIONS["east-australia"].locked) {
    REGIONS["east-australia"].locked = false;
    fillRegions();
    pushThread(EAST_AUS_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlockSingle("east-australia", "Eastern Australia", "wobbegongs hide in the reef ledges here.");
  }
  if (n >= 25 && REGIONS["california"].locked) {
    REGIONS["california"].locked = false;
    fillRegions();
    pushThread(CALIFORNIA_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlockSingle("california", "California Coast", "leopard sharks cruise the bays and kelp.");
  }
  if (n >= 35 && REGIONS["arctic"].locked) {
    REGIONS["arctic"].locked = false;
    fillRegions();
    pushThread(ARCTIC_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlockSingle("arctic", "Arctic Waters", "the Greenland shark waits in the cold dark.");
  }
  if (taggedIds.length >= SHARKS.length && !state.won) {
    /* The ceremony waits for day's end — the trip always finishes first. */
    state.pendingWin = true;
  }
}

function showRegionUnlock() {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  ov.innerHTML = `<div class="phone">
    <div class="phone-head">🗺️ New waters surveyed</div>
    <div class="cert-body">
      <p><strong>Galápagos Islands</strong> — marine iguanas slip into the water nearby.</p>
      <p><strong>South Africa</strong> — cape fur seals bark on the rocks above.</p>
      <p class="latin">The six original species. The institute trusts you with farther waters now — and Sarah texted you about it. 📱</p>
    </div>
    <button id="winNext" class="primary-button" type="button">Back to the water</button>
  </div>`;
  $("winNext").addEventListener("click", () => {
    ov.classList.add("hidden");
  });
}

/* v0.21.0 sharknado: single-region unlock overlay. */
function showRegionUnlockSingle(regionId, regionName, flavor) {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  ov.innerHTML = `<div class="phone">
    <div class="phone-head">🗺️ New waters surveyed</div>
    <div class="cert-body">
      <p><strong>${regionName}</strong> — ${flavor}</p>
      <p class="latin">The institute trusts you with farther waters now — and Sarah texted you about it. 📱</p>
    </div>
    <button id="winNext" class="primary-button" type="button">Back to the water</button>
  </div>`;
  $("winNext").addEventListener("click", () => {
    ov.classList.add("hidden");
  });
}

/* v0.13.0: built dynamically so the count can never go stale again. */
function winThread() {
  const n = SHARKS.length;
  return [
    { who: "them", text: "You did it. You tagged all of them." },
    { who: "me", text: `${n} for ${n}. Couldn't have done it without my research assistant.` },
    { who: "them", text: "I'm going to tell everyone I know that my cousin is a real shark scientist. This is the best day." },
    { who: "me", text: "Best day of mine too. 🦈" }
  ];
}

/* v0.16.0: Sarah's celebration — the emotional core of the ending. Calm adult
   voice (v0.12.0): proud and emotional, never a wall of caps. Uses the
   player's ACTUAL first-tagged shark so it lands personally. */
/* v0.16.0 review fix: genuine chronological order for tagged sharks.
   New records carry taggedAt (ms epoch). Old saves fall back to the
   insertion order of state.tagged — for non-integer string keys that IS
   the order each shark was first tagged. Both the Sarah thread and the
   map finale use this same source. */
function taggedChronological() {
  return Object.keys(state.tagged)
    .map((sid, idx) => ({ sid, t: state.tagged[sid], idx }))
    .sort((a, b) => {
      const ta = a.t.taggedAt, tb = b.t.taggedAt;
      if (ta != null && tb != null && ta !== tb) return ta - tb;
      return a.idx - b.idx;
    });
}
function sarahWinThread() {
  const byDate = taggedChronological();
  const ids = byDate.map(e => e.sid);
  const first = byDate[0] || { sid: "nurse", t: { researchId: "??" } };
  const s = sharkById(first.sid) || { name: "shark" };
  const firstName = first.t.name ? `“${first.t.name}”` : first.t.researchId;
  const n = ids.length;
  return [
    { who: "them", text: "Hey. Can we sit with this for a minute?" },
    { who: "me", text: "Of course." },
    { who: "them", text: "When you started, these were species on a list. Do you remember your first one?" },
    { who: "me", text: `${firstName} — the ${s.name.toLowerCase()}. I'll never forget.` },
    { who: "them", text: `And now you know ${n} individual sharks. Not species — individuals. With names, and tracks, and lives they're still living right now.` },
    { who: "me", text: "They're all still out there." },
    { who: "them", text: "They are. You found every one, and then you let every one go. That's the whole thing, isn't it? That's the job." },
    { who: "me", text: "Best job in the world." },
    { who: "them", text: "I'm so proud of you. Don't tell anyone I'm being sentimental — I have a reputation to maintain." },
    { who: "me", text: "Your secret's safe with me. 🦈" }
  ];
}

/* ---------- Win state: a ceremony in four beats (v0.16.0) ----------
   (a) institute recognition, (b) Sarah's celebration, (c) the map finale —
   "they're all still out there" — (d) the acknowledgement.
   Each lands separately — a moment, not a checklist. */
function doWin() {
  state.won = true;
  /* v0.16.0 review fix: the archive unlock is part of the win itself, not
     beat 4. A player who closes mid-ceremony keeps the unlock — beat 4 is
     where they're TOLD about it. */
  state.archiveUnlocked = true;
  try {
    localStorage.setItem("tyi-won", "1");
    localStorage.setItem("tyi-archive", "1");
  } catch {}
  renderCollection();
  renderResearch();
  renderSightings();
  winStep(1);
}

function winStep(n) {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  const box = (inner) => { ov.innerHTML = `<div class="phone">${inner}</div>`; };

  if (n === 1) {
    /* Beat 1: institute recognition — the formal part. */
    box(`
      <div class="cert-trophy" style="font-size:52px; text-align:center">🏆</div>
      <h2 style="text-align:center; margin:8px 0 2px">Master Shark Tagger</h2>
      <p class="latin" style="text-align:center">Global survey complete — all ${SHARKS.length} species tagged.</p>
      <div class="cert-body">
        <p>This certifies our conservation scientist as a <strong>Master Shark Tagger</strong>, in recognition of ${SHARKS.length} successful tags and ${SHARKS.length} healthy releases.</p>
      </div>
      <button id="winNext" class="primary-button" type="button">Continue</button>`);
    $("winNext").addEventListener("click", () => winStep(2));

  } else if (n === 2) {
    /* Beat 2: the phone buzzes — Sarah has something to say. */
    pushThread(sarahWinThread().map(m => ({ ...m })));
    box(`
      <div class="phone-head buzz-phone">📱 Your phone buzzes…</div>
      <div class="phone-thread win-thread"></div>
      <p class="latin" style="text-align:center; margin:0">Saved in 📱 Phone.</p>
      <button id="winNext" class="primary-button" type="button">Continue</button>`);
    const th = ov.querySelector(".win-thread");
    sarahWinThread().forEach(m => {
      const b = document.createElement("div");
      b.className = "bubble " + m.who;
      b.textContent = m.text;
      th.appendChild(b);
    });
    $("winNext").addEventListener("click", () => winStep(3));

  } else if (n === 3) {
    /* Beat 3: the map finale — "they're all still out there." */
    winMapFinale();

  } else {
    /* Beat 4: the acknowledgement — it lives here now, not on the Research tab.
       The Wild Archive unlock was already persisted in doWin(); this beat is
       where the player is told about it. The set below is idempotent. */
    state.archiveUnlocked = true;
    try { localStorage.setItem("tyi-archive", "1"); } catch {}
    updateArchiveTab();
    renderArchive();
    box(`
      <div class="ack-card" style="margin-top:0">
        <p class="eyebrow">ACKNOWLEDGEMENTS</p>
        <p class="ack-name">For <span>Sarah</span></p>
        <p>who finished Rockhound at 1:26 AM and loves sharks. 🦈</p>
      </div>
      <button id="winNext" class="primary-button" type="button">Back to the collection book</button>`);
    $("winNext").addEventListener("click", () => {
      ov.classList.add("hidden");
      goTab("collection");
    });
  }
}

/* v0.16.0: the map finale. The world map, and one by one, every shark the
   player tagged — track, marker, name — until the ocean is full of them.
   The message isn't "you collected every shark." It's "they're all still
   out there." */
function winMapFinale() {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  const ordered = taggedChronological();
  const n = ordered.length;
  const bmUrl = (typeof BLUE_MARBLE_URL !== "undefined") ? BLUE_MARBLE_URL : "";

  ov.innerHTML = `
    <div class="finale">
      <h2 style="text-align:center; margin:6px 0 2px">They're all still out there.</h2>
      <p class="latin" style="text-align:center; margin:0 0 8px" id="finaleCaption"></p>
      <div class="finale-map" id="finaleMap"></div>
      <div style="display:flex; gap:8px; justify-content:center; margin-top:10px">
        <button id="finaleSkip" class="secondary-button" type="button">Skip</button>
        <button id="finaleNext" class="primary-button hidden" type="button">Continue</button>
      </div>
    </div>`;

  /* v0.16.0 review fix: count = sharks revealed so far. The caption names
     the shark that was JUST revealed (ordered[count - 1]); count 0 is the
     intro state with an empty map. Only the newest marker gets the pop
     animation — earlier ones stay settled instead of re-popping every step. */
  const renderRevealed = (count) => {
    const newIdx = count - 1; // index of the just-revealed shark (-1 when none)
    let svg = `<svg viewBox="0 0 ${MAP_W} ${MAP_H}" role="img" aria-label="World map of all tagged sharks">`
      + `<rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" fill="#0d2f4d"/>`
      + (bmUrl ? `<image href="${bmUrl}" x="0" y="0" width="${MAP_W}" height="${MAP_H}" preserveAspectRatio="none"/>` : ``);
    ordered.slice(0, count).forEach(({ sid, t }, idx) => {
      if (!t.track) t.track = genTrack(sharkById(sid) || { id: "nurse" }, t);
      const color = SPECIES_COLORS[sid] || "#ffffff";
      const pts = mapPoints(t);
      if (pts.length > 1) {
        const path = pts.slice(1);
        const d = path.map((p, i) => (i ? "L" : "M") + p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");
        const archival = t.track.kind === "archival";
        svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="2" opacity="0.85"`
          + (archival ? ` stroke-dasharray="5 4"` : "") + `/>`;
      }
      const last = pts[pts.length - 1];
      if (last) {
        const pop = idx === newIdx ? ` style="animation: finalePop 0.5s ease"` : ``;
        svg += `<g class="finale-marker"${pop}>`
          + `<circle cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="7" fill="${color}" stroke="#fff" stroke-width="2"/>`
          + `</g>`;
      }
    });
    svg += `</svg>`;
    $("finaleMap").innerHTML = svg;
    const cap = $("finaleCaption");
    if (count === 0) {
      cap.textContent = "";
    } else if (count < n) {
      const { sid, t } = ordered[count - 1];
      const s = sharkById(sid);
      const nm = t.name ? `\u201c${t.name}\u201d` : t.researchId;
      cap.textContent = `${nm} — ${s ? s.name : sid}  (${count} / ${n})`;
    } else {
      cap.textContent = `${n} sharks. ${n} releases. All still swimming.`;
    }
  };

  let revealed = 0, done = false;
  renderRevealed(0);
  const finish = () => {
    if (done) return;
    done = true;
    clearInterval(timer);
    revealed = n;
    renderRevealed(n);
    $("finaleSkip").classList.add("hidden");
    $("finaleNext").classList.remove("hidden");
  };
  const timer = setInterval(() => {
    revealed++;
    if (revealed >= n) { finish(); return; } // finish() renders the final state once
    renderRevealed(revealed);
  }, 650);
  $("finaleSkip").addEventListener("click", finish);
  $("finaleNext").addEventListener("click", () => winStep(4));
}

/* Easter egg: name a shark "Sarah" and the cousin finds out. */
function maybeSarahEgg(speciesId, rec) {
  if (!rec || rec.sarahEgg) return;
  if ((rec.name || "").trim().toLowerCase() === "sarah") {
    rec.sarahEgg = true;
    store.save(state.tagged);
    pushThread(SARAH_EGG_THREAD.map(m => ({ ...m })));
  }
}

/* v0.23.0: real-shark easter eggs. Called on rename/tag.
   - Mary Lee / Nicole: great white + matching name → Sarah thread (immediate)
   - Bruce: any shark + "bruce" → starts SLOW chain (no immediate message!) */
function maybeNameEgg(speciesId, rec) {
  if (!rec || !rec.name) return;
  const name = rec.name.trim().toLowerCase();
  const s = sharkById(speciesId);

  // Mary Lee: great white only
  if (speciesId === "greatwhite" && name === "mary lee" && !rec.maryLeeEgg) {
    rec.maryLeeEgg = true;
    store.save(state.tagged);
    pushThread(MARY_LEE_THREAD.map(m => ({ ...m })));
    return;
  }
  // Nicole: great white only
  if (speciesId === "greatwhite" && name === "nicole" && !rec.nicoleEgg) {
    rec.nicoleEgg = true;
    store.save(state.tagged);
    pushThread(NICOLE_THREAD.map(m => ({ ...m })));
    return;
  }
  // Bruce: ANY shark. No immediate message — the slow chain begins silently.
  if (name === "bruce" && !state.bruceEgg && !state.bruceChainComplete) {
    state.bruceEgg = { stage: 0, sharkId: speciesId, started: Date.now(), lastAdvance: 0, expeditionsAtStage: state.stats.expeditions || 0 };
    try { localStorage.setItem("tyi-bruce", JSON.stringify(state.bruceEgg)); } catch {}
    // Deliberately no pushThread here. Sarah will notice... eventually.
  }
}

/* v0.23.0: advance the Bruce chain. Called on expedition completion and game
   load. Stages are spaced: at least 2 expeditions OR 12 hours between stages,
   so it unfolds slowly over multiple sessions. */
function advanceBruceChain() {
  if (!state.bruceEgg || state.bruceChainComplete) return;
  if (typeof BRUCE_CHAIN === "undefined") return;
  const now = Date.now();
  const expeditionsSince = (state.stats.expeditions || 0) - (state.bruceEgg.expeditionsAtStage || 0);
  const hoursSince = (now - (state.bruceEgg.lastAdvance || state.bruceEgg.started)) / 3600000;
  // Need either 2+ expeditions or 12+ hours since last stage
  if (expeditionsSince < 2 && hoursSince < 12) return;

  const stage = state.bruceEgg.stage;
  if (stage >= BRUCE_CHAIN.length) {
    // Chain complete — unlock hidden achievement
    state.bruceChainComplete = true;
    try {
      localStorage.setItem("tyi-bruce-done", "1");
      localStorage.removeItem("tyi-bruce");
    } catch {}
    state.bruceEgg = null;
    checkAchievements(); // Bruce achievement check uses st.bruceChainComplete
    return;
  }

  // Push this stage's messages
  pushThread(BRUCE_CHAIN[stage].map(m => ({ ...m })));
  state.bruceEgg.stage = stage + 1;
  state.bruceEgg.lastAdvance = now;
  state.bruceEgg.expeditionsAtStage = state.stats.expeditions || 0;
  // If that was the final stage, complete the chain NOW (not on a later call)
  if (state.bruceEgg.stage >= BRUCE_CHAIN.length) {
    state.bruceChainComplete = true;
    try {
      localStorage.setItem("tyi-bruce-done", "1");
      localStorage.removeItem("tyi-bruce");
    } catch {}
    state.bruceEgg = null;
    checkAchievements();
    return;
  }
  try { localStorage.setItem("tyi-bruce", JSON.stringify(state.bruceEgg)); } catch {}
}

$("tagConfirm").addEventListener("click", () => confirmTag($("sharkName").value.trim()));

/* ---------- Collection book: compact grid, tap for detail ---------- */

function displayName(t) {
  return t.name ? `“${esc(t.name)}”` : "";
}
function idLine(t) {
  return `<span class="research-id">🔬 ${esc(t.researchId || "")}</span>`;
}

function renderCollection() {
  const list = $("collectionList");
  list.innerHTML = "";
  const shelf = $("trophyShelf");
  shelf.innerHTML = "";
  const ids = Object.keys(state.tagged);
  $("collectionCount").textContent = `${ids.length}/${SHARKS.length}`;

  /* v0.6.0: the trophy sits ABOVE the grid on its own distinguished shelf —
     never as a grid slot that reads like "one more shark to catch". */
  if (state.won) {
    const t = document.createElement("button");
    t.type = "button";
    t.className = "trophy-shelf";
    t.setAttribute("aria-label", "Open your Master Shark Tagger certificate");
    t.innerHTML = `
      <div class="cert-trophy">🏆</div>
      <h3>Master Shark Tagger</h3>
      <p class="latin">Official certificate — tap to view</p>`;
    t.addEventListener("click", openCertificate);
    shelf.appendChild(t);
  }

  if (!ids.length && !state.won) {
    list.innerHTML = `<div class="empty-note">No sharks tagged yet.<br>Do your research, then get out there. 🦈</div>`;
    return;
  }
  SHARKS.filter(s => state.tagged[s.id]).forEach(s => {
    const t = state.tagged[s.id];
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "grid-cell";
    cell.setAttribute("aria-label", `Open details for ${t.name ? esc(t.name) : esc(t.researchId)} ${s.name}`);
    cell.innerHTML = `
      <div class="shark-art">${ART[s.id]}</div>
      ${t.name ? `<div class="grid-name">“${esc(t.name)}”</div>` : ""}
      <div class="grid-id">${esc(t.researchId)}</div>
      <h3>${s.name}</h3>
      <p class="latin">${s.latin}</p>`;
    cell.addEventListener("click", () => openDetail(s.id));
    list.appendChild(cell);
  });
}

function openCertificate() {
  const c = $("detailContent");
  c.innerHTML = `
    <div class="cert-trophy" style="font-size:44px">🏆</div>
    <h3 style="margin:6px 0 0">Master Shark Tagger</h3>
    <p class="latin">Tag Along — field program</p>
    <div class="cert-body">
      <p>This certifies our conservation scientist as a <strong>Master Shark Tagger</strong>, in recognition of ${SHARKS.length} successful tags and ${SHARKS.length} healthy releases.</p>
      <p class="cert-sig">Awarded with salt on it. 🦈</p>
    </div>`;
  $("detailOverlay").classList.remove("hidden");
}

function openDetail(id) {
  const s = sharkById(id);
  const t = state.tagged[id];
  const c = $("detailContent");
  c.innerHTML = `
    <div class="shark-art">${ART[s.id]}</div>
    ${t.name ? `<div class="given-name">“${esc(t.name)}”</div>` : ""}
    <div class="detail-name-row">
      ${idLine(t)}
      <button id="renameBtn" class="mini-button" type="button">✏️ ${t.name ? "Rename" : "Add nickname"}</button>
    </div>
    <div id="renameForm" class="hidden">
      <input id="renameInput" type="text" maxlength="24" value="${esc(t.name)}" placeholder="Name your shark…" />
      <div class="rename-actions">
        <button id="renameSave" class="primary-button" type="button">Save</button>
        <button id="renameCancel" class="secondary-button" type="button">Cancel</button>
      </div>
    </div>
    <h3 style="margin:6px 0 0">${s.name}</h3>
    <p class="latin">${s.latin}</p>
    <span class="status-pill">IUCN: ${s.status}</span>
    <p class="book-stats">
      📏 ${t.length} m · ${t.sex === "female" ? "♀ female" : "♂ male"}<br>
      📍 Tagged at ${esc(t.location)}<br>
      📅 ${esc(t.date)}
    </p>
    <button id="trackBtn" class="secondary-button" type="button" style="margin:4px 0 8px">📍 Track this shark</button>
    ${t.resightings && t.resightings.length ? `
    <div class="resight-block">
      <h4>🔁 Re-sightings (${t.resightings.length})</h4>
      <ul class="track-stops">
        ${t.resightings.map(r => `<li>📍 ${esc(r.date)} — ${esc(r.location)}<br><span class="dim">${esc(r.note)}</span></li>`).join("")}
      </ul>
    </div>` : ""}
    <p class="hook">💡 ${s.hook}</p>
    <p class="bonus-fact">✨ ${s.bonus}</p>
    ${s.conservation ? `<p class="conservation-note">🌊 <strong>Conservation:</strong> ${s.conservation}</p>` : ""}
  `;
  $("detailOverlay").classList.remove("hidden");
  $("trackBtn").addEventListener("click", () => openTrack(id));
  $("renameBtn").addEventListener("click", () => {
    $("renameForm").classList.remove("hidden");
    $("renameBtn").classList.add("hidden");
    const inp = $("renameInput");
    inp.focus();
    inp.select();
  });
  $("renameCancel").addEventListener("click", () => {
    $("renameForm").classList.add("hidden");
    $("renameBtn").classList.remove("hidden");
  });
  $("renameSave").addEventListener("click", () => {
    t.name = $("renameInput").value.trim();
    store.save(state.tagged);
    maybeSarahEgg(id, t);
    maybeNameEgg(id, t); // v0.23.0: Mary Lee / Nicole / Bruce
    renderCollection();
    renderResearch();
    openDetail(id);
  });
}

/* ---------- Shark tracking: where are they now? ---------- */

function openTrack(id) {
  const s = sharkById(id);
  const t = state.tagged[id];
  if (!t.track) { t.track = genTrack(s, t); store.save(state.tagged); }
  const tr = t.track;
  const W = 320, H = 168, pad = 26;
  const n = tr.points.length;
  const pts = tr.points.map((p, i) => {
    const x = pad + (n === 1 ? 0.5 : i / (n - 1)) * (W - pad * 2);
    const jitter = ((hashStr(p.label) % 100) / 100 - 0.5) * (H - pad * 2 - 30);
    const y = Math.round(H / 2 + jitter);
    return { x: Math.round(x), y, p };
  });
  const pathD = pts.map((pt, i) => (i === 0 ? "M" : "L") + pt.x + " " + pt.y).join(" ");
  const dots = pts.map((pt, i) => {
    const first = i === 0, last = i === pts.length - 1;
    return `<circle cx="${pt.x}" cy="${pt.y}" r="${last ? 6 : 4}" fill="${last ? "#ffd166" : "#4fd1c5"}" stroke="#0b2237" stroke-width="2"/>
      ${first || last ? `<text x="${pt.x}" y="${pt.y - 10}" text-anchor="middle" fill="#a9c3d6" font-size="9">${esc(first ? "tagged here" : "last ping")}</text>` : ""}`;
  }).join("");
  const last = tr.points[tr.points.length - 1];
  const stops = tr.points.map((p, i) =>
    `<li>${i === 0 ? "📍" : "▫️"} Day ${p.day} — ${esc(p.label)}${p.km ? ` <span class="dim">(+${p.km.toLocaleString()} km)</span>` : ""}</li>`
  ).join("");
  const title = t.name ? `“${esc(t.name)}”` : esc(t.researchId);
  $("trackContent").innerHTML = `
    <div class="phone-head">📍 Tracking ${title} <span class="research-id">${esc(t.researchId)}</span></div>
    <svg viewBox="0 0 ${W} ${H}" class="track-map" role="img" aria-label="Migration track map">
      <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="#0a1c30"/>
      ${[0.25, 0.5, 0.75].map(f => `<line x1="0" y1="${H * f}" x2="${W}" y2="${H * f}" stroke="#16405f" stroke-width="1" stroke-dasharray="4 6"/>`).join("")}
      <path d="${pathD}" fill="none" stroke="#4fd1c5" stroke-width="2.5" stroke-dasharray="7 5" opacity="0.85"/>
      ${dots}
    </svg>
    <div class="track-stats">
      <div><strong>${tr.totalKm.toLocaleString()} km</strong><span>travelled</span></div>
      <div><strong>${tr.days} days</strong><span>at liberty</span></div>
      <div><strong>${tr.points.length}</strong><span>locations</span></div>
    </div>
    <ul class="track-stops">${stops}</ul>
    <p class="track-note">Last ping: <strong>${esc(last.label)}</strong> · day ${last.day}<br>
    <span class="dim">${esc(tr.hypothetical ? "Hypothetical movement scenario — this route illustrates plausible long-range movement for a migratory species, not a reconstruction of this individual's tracked journey." : tr.kind === "archival" ? "Illustrative habitat-based movement scenario. These plotted positions are not actual detections of this individual." + (s.id === "sawshark" ? " (Pop-up satellite archival tags have been deployed on common sawsharks off Tasmania — Burke et al. 2020.)" : "") : (TRACK_KIND_NOTES[tr.kind] || TRACK_KIND_NOTES.satellite))}</span></p>
  `;
  $("trackOverlay").classList.remove("hidden");
}

$("trackClose").addEventListener("click", () => {
  $("trackOverlay").classList.add("hidden");
});
$("trackOverlay").addEventListener("click", (e) => {
  if (e.target === $("trackOverlay")) $("trackOverlay").classList.add("hidden");
});

$("detailClose").addEventListener("click", () => {
  $("detailOverlay").classList.add("hidden");
});
$("detailOverlay").addEventListener("click", (e) => {
  if (e.target === $("detailOverlay")) $("detailOverlay").classList.add("hidden");
});

/* ---------- Hard progress reset ----------
   v0.7.0: a full wipe for replay and testing — not prestige, no bonuses,
   just a clean restart. Two explicit steps so it can't be hit by accident. */
/* v0.20.0 Mira review fix: tyi-pinned and tyi-pace belong to full reset. */
const RESET_KEYS = ["tyi-collection", "tyi-messages", "tyi-won", "tyi-archive", "tyi-idseq", "tyi-sightings", "tyi-regions", "tyi-logbook", "tyi-stats", "tyi-achievements", "tyi-pinned", "tyi-pace", "tyi-last-seen-version", "tyi-bruce", "tyi-bruce-done"];

/* v0.23.0: save export/import for the public beta. */
function exportSave() {
  const data = { version: VERSION, exportedAt: new Date().toISOString(), keys: {} };
  RESET_KEYS.forEach(k => {
    try {
      const v = localStorage.getItem(k);
      if (v !== null) data.keys[k] = v;
    } catch {}
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const aEl = document.createElement("a");
  aEl.href = url;
  aEl.download = "tag-along-save-" + VERSION + ".json";
  document.body.appendChild(aEl);
  aEl.click();
  setTimeout(() => { document.body.removeChild(aEl); URL.revokeObjectURL(url); }, 100);
}
/* v0.23.0 Mira review: safe import — validate everything BEFORE touching
   storage, replace the complete key set (clear missing keys), and back up
   the existing save first. */
function validateSaveData(data) {
  if (!data || typeof data !== "object") return { ok: false, reason: "not an object" };
  if (!data.keys || typeof data.keys !== "object") return { ok: false, reason: "missing keys" };
  // Only recognized keys
  const unknown = Object.keys(data.keys).filter(k => !RESET_KEYS.includes(k) && k !== "tyi-bruce" && k !== "tyi-bruce-done");
  if (unknown.length > 5) return { ok: false, reason: "too many unknown keys: " + unknown.slice(0, 3).join(", ") };
  // Validate JSON fields parse
  for (const [k, v] of Object.entries(data.keys)) {
    if (typeof v !== "string") return { ok: false, reason: "non-string value for " + k };
    if ((k === "tyi-collection" || k === "tyi-logbook") && v) {
      try { JSON.parse(v); } catch { return { ok: false, reason: "invalid JSON in " + k }; }
    }
  }
  // Version: supported if it's a known v0.x version, else warn
  const fv = data.version || "unknown";
  const supported = /^v0\.(1[0-9]|2[0-3])\./.test(fv) || fv === VERSION;
  return { ok: true, version: fv, supported };
}
function backupCurrentSave() {
  const backup = { version: VERSION, exportedAt: new Date().toISOString(), keys: {} };
  RESET_KEYS.forEach(k => {
    try { const v = localStorage.getItem(k); if (v !== null) backup.keys[k] = v; } catch {}
  });
  try { localStorage.setItem("tyi-backup", JSON.stringify(backup)); } catch {}
}
function importSave(file) {
  const reader = new FileReader();
  reader.onload = () => {
    let data;
    try { data = JSON.parse(reader.result); }
    catch { alert("Couldn't read that file. Is it a valid Tag Along save?"); return; }
    // Validate BEFORE touching storage
    const check = validateSaveData(data);
    if (!check.ok) {
      alert("That save file looks incompatible (" + check.reason + "). Nothing was changed.");
      return;
    }
    let msg = "Import this save? Your current progress will be replaced.\n\n";
    msg += "File version: " + check.version + "\nCurrent version: " + VERSION;
    if (!check.supported) {
      msg += "\n\n⚠️ This version isn't recognized — import may not work correctly.";
    }
    msg += "\n\nA backup of your current save will be kept.";
    if (!confirm(msg)) return;
    // Backup, then replace complete key set (clear keys missing from import)
    backupCurrentSave();
    try {
      RESET_KEYS.forEach(k => {
        if (k in data.keys) localStorage.setItem(k, data.keys[k]);
        else localStorage.removeItem(k);
      });
      // Also handle bruce keys if present
      ["tyi-bruce", "tyi-bruce-done"].forEach(k => {
        if (k in data.keys) localStorage.setItem(k, data.keys[k]);
        else localStorage.removeItem(k);
      });
    } catch (e) {
      alert("Import failed partway — your backup is safe. Nothing was half-applied.");
      return;
    }
    location.reload();
  };
  reader.readAsText(file);
}
// Wire up buttons (after DOM ready — these run at script load, elements exist)
(function initSaveButtons() {
  const ex = document.getElementById("exportBtn");
  if (ex) ex.addEventListener("click", exportSave);
  const im = document.getElementById("importBtn");
  const fi = document.getElementById("importFile");
  if (im && fi) {
    im.addEventListener("click", () => fi.click());
    fi.addEventListener("change", () => {
      if (fi.files && fi.files[0]) importSave(fi.files[0]);
      fi.value = ""; // reset so the same file can be picked again
    });
  }
})();
$("resetBtn").addEventListener("click", () => {
  $("resetOverlay").classList.remove("hidden");
});
$("resetCancel").addEventListener("click", () => {
  $("resetOverlay").classList.add("hidden");
});
$("resetOverlay").addEventListener("click", (e) => {
  if (e.target === $("resetOverlay")) $("resetOverlay").classList.add("hidden");
});
$("resetConfirm").addEventListener("click", () => {
  RESET_KEYS.forEach(k => { try { localStorage.removeItem(k); } catch {} });
  location.reload();
});

/* ---------- Boot ---------- */

function renderAll() {
  renderResearch();
  renderPlanner();
  renderCollection();
  renderSightings();
  renderLogbook();
  renderMessages();
  updateMsgBadge();
  updateArchiveTab();
  if (state.archiveUnlocked) renderArchive();
  renderSarahAsk();
  renderAchievements(); // v0.18.0
  renderExpeditionPin(); // v0.20.0
  renderPinHint(); // v0.22.0
  /* v0.20.0: restore quick-pace preference (the change listener is bound
     once at init — Mira review fix: binding it here accumulated listeners
     on every renderAll). */
  const qp = $("quickPace");
  if (qp) {
    let saved = false;
    try { saved = localStorage.getItem("tyi-pace") === "quick"; } catch {}
    qp.checked = saved;
    if (saved) setPace(true);
  }
}

/* v0.20.0: Wild Archive UI lives in archive-ui.js (module split). */
/* v0.16.0 review fix: pre-v0.16 winners never run doWin() again, so a
   completed v0.14 save boots with won=true, a full roster, and no archive
   unlock. Backfill the unlock they already earned. */
function migrateArchiveUnlock() {
  try {
    const taggedCount = Object.keys(state.tagged).length;
    if (state.won && taggedCount >= SHARKS.length && !state.archiveUnlocked) {
      state.archiveUnlocked = true;
      localStorage.setItem("tyi-archive", "1");
    }
  } catch {}
}
/* v0.22.0 Mira review: capture pre-migration storage state for What's New.
   Migrations write keys (e.g. tyi-collection) even for new players, so we
   snapshot before they run. */
const preMigrationHadSave = (() => {
  try {
    const log = localStorage.getItem("tyi-logbook");
    const col = localStorage.getItem("tyi-collection");
    // Meaningful data: non-empty logbook, or collection with actual sharks
    if (log && log !== "[]") return true;
    if (col && col !== "{}" && col !== "null") {
      try { return Object.keys(JSON.parse(col)).length > 0; } catch { return false; }
    }
    return !!localStorage.getItem("tyi-stats");
  } catch { return false; }
})();
migrateIds();
migrateTracks();
migrateWinV07();
migrateArchiveUnlock();
fillRegions();
fillSelect($("depthSelect"), DEPTHS);
fillSelect($("baitSelect"), BAITS);
function updateVisual(selectId) {
  const el = document.getElementById(selectId.replace(/Select$/, "Visual"));
  if (!el) return;
  const icon = (PICK_ICONS[selectId] || {})[$(selectId).value];
  el.innerHTML = icon === "dot:ray" ? '<span class="pick-dot"></span>' : (icon || "");
}
function updateAllVisuals() {
  ["regionSelect", "depthSelect", "baitSelect", "methodSelect", "methodOptSelect"].forEach(updateVisual);
}

/* v0.9.0: Method is two selects — the top-level approach, then its
   sub-menu of real field practices.
   v0.9.1: progressive disclosure — the sub-menu row stays hidden until a
   Method is actually picked. Launching with no method keeps the old
   graceful default (neutral, no boost); the sub-menu simply never shows. */
(function initMethodSelects() {
  const mSel = $("methodSelect"), oSel = $("methodOptSelect"), field = $("methodOptField");
  mSel.innerHTML = "";
  const ph = document.createElement("option");
  ph.value = ""; ph.textContent = "Choose a method…";
  mSel.appendChild(ph);
  Object.entries(METHODS).forEach(([id, m]) => {
    const o = document.createElement("option");
    o.value = id; o.textContent = m.name;
    mSel.appendChild(o);
  });
  const fillOpts = () => {
    const m = METHODS[mSel.value];
    if (!m) {
      field.classList.add("hidden");
      oSel.innerHTML = "";
      updateVisual("methodOptSelect");
      return;
    }
    field.classList.remove("hidden");
    $("methodOptLabel").textContent = m.subLabel;
    oSel.innerHTML = "";
    Object.entries(m.opts).forEach(([id, label]) => {
      const o = document.createElement("option");
      o.value = id; o.textContent = label;
      oSel.appendChild(o);
    });
    updateVisual("methodOptSelect");
  };
  mSel.addEventListener("change", () => { fillOpts(); updateVisual("methodSelect"); renderPinHint(); });
  oSel.addEventListener("change", () => updateVisual("methodOptSelect"));
  ["regionSelect", "depthSelect", "baitSelect"].forEach(id =>
    $(id).addEventListener("change", () => { updateVisual(id); renderPinHint(); }));
  fillOpts();
  updateAllVisuals();
})();
/* v0.22.0: re-render the pin hint when the Expedition tab opens (plan may
   have been restored via repeat-plan) and when pinning changes. */
(function initPinHint() {
  const tab = document.querySelector('[data-tab="expedition"]');
  if (tab) tab.addEventListener("click", () => setTimeout(renderPinHint, 50));
})();
/* v0.10.0: map toolbar — zoom controls + currents toggle (static HTML).
   Guarded lookups: if this script ever loads against older HTML, the game
   boots fine and the map simply renders without the toolbar. */
const onMapBtn = (id, fn) => { const b = $(id); if (b) b.addEventListener("click", fn); };
onMapBtn("mapZoomIn", () => { mapFocusClear(); mapZoom = Math.min(MAP_ZOOM_MAX, mapZoom * 1.5); renderMap(); });
onMapBtn("mapZoomOut", () => {
  mapFocusClear();
  mapZoom = Math.max(MAP_ZOOM_MIN, mapZoom / 1.5);
  if (mapZoom === MAP_ZOOM_MIN) { mapCX = MAP_W / 2; mapCY = MAP_H / 2; }
  renderMap();
});
onMapBtn("mapZoomReset", () => { mapFocusClear(); mapZoom = 1; mapCX = MAP_W / 2; mapCY = MAP_H / 2; renderMap(); });
onMapBtn("mapCurrentsToggle", () => { mapCurrentsOn = !mapCurrentsOn; renderMap(); });
/* v0.10.2: shared zoom helper — re-centers on the pointer's map position,
   then applies the new zoom (clamped). Used by wheel; buttons use the
   fixed-step zoom below. (v0.15.0: pinch removed.) */
let suppressMarkerClick = false;
let mapRenderQueued = false;
function requestMapRender() {
  /* rAF-throttle so pinch/pan stay smooth on phones; direct render where
     requestAnimationFrame doesn't exist (tests, old webviews). */
  if (typeof requestAnimationFrame === "function") {
    if (mapRenderQueued) return;
    mapRenderQueued = true;
    requestAnimationFrame(() => { mapRenderQueued = false; renderMap(); });
  } else {
    renderMap();
  }
}
function mapZoomAt(clientX, clientY, newZoom) {
  const svgEl = $("worldMapSvg");
  if (!svgEl) return;
  const r = svgEl.getBoundingClientRect(), vb = mapViewBox();
  /* Anchor-preserving zoom (v0.10.2 review fix): the map point under the
     pointer must stay under the same screen spot after zooming. Record the
     pointer's normalized position in the OLD viewBox, then re-anchor the
     new viewBox so that same map point sits at the same normalized spot.
     (The old code made the pointer's point the new CENTER, so the map
     jumped toward the pinch midpoint.) */
  const nx = (clientX - r.left) / r.width, ny = (clientY - r.top) / r.height;
  const px = vb.x + nx * vb.w, py = vb.y + ny * vb.h;
  mapZoom = Math.min(MAP_ZOOM_MAX, Math.max(MAP_ZOOM_MIN, newZoom));
  if (mapZoom === MAP_ZOOM_MIN) { mapCX = MAP_W / 2; mapCY = MAP_H / 2; }
  else {
    const w2 = MAP_W / mapZoom, h2 = MAP_H / mapZoom;
    mapCX = px - nx * w2 + w2 / 2;
    mapCY = py - ny * h2 + h2 / 2;
  }
  mapFocusClear(); // manual zoom breaks the tap-focus toggle contract
  requestMapRender();
}
/* v0.11.0: tap-a-marker focus. Tapping a shark marker (or its legend chip)
   glides the map to that shark's latest ping at ~3x and centers on it;
   tapping the same marker again glides back to the saved view. Hopping to
   a different marker glides straight there, keeping the original restore
   view. The zoom is programmatic, so it behaves identically in normal and
   explore mode — no gesture-ownership issues. Any manual map move cancels
   the glide and clears the focus: the toggle only promises "back to where
   you were" while the app still owns the view. */
const MAP_FOCUS_ZOOM = 3, MAP_FOCUS_MS = 500;
let mapGlide = null;  // in-flight animation token; replaced to cancel
let mapFocus = null;  // { sid, prevZoom, prevCX, prevCY } | null
function mapGlideCancel() { mapGlide = null; }
function mapFocusClear() { mapGlideCancel(); mapFocus = null; }
function mapGlideTo(x, y, z, ms) {
  mapGlideCancel();
  const dur = ms || MAP_FOCUS_MS;
  const now0 = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
  const anim = { fz: mapZoom, fcx: mapCX, fcy: mapCY, tz: z, tcx: x, tcy: y, t0: now0, dur };
  mapGlide = anim;
  const step = now => {
    if (mapGlide !== anim) return; // superseded or cancelled
    const t = Math.min(1, (now - anim.t0) / anim.dur);
    const e = 1 - Math.pow(1 - t, 3); // ease-out cubic: fast launch, soft landing
    mapZoom = anim.fz + (anim.tz - anim.fz) * e;
    mapCX = anim.fcx + (anim.tcx - anim.fcx) * e;
    mapCY = anim.fcy + (anim.tcy - anim.fcy) * e;
    renderMap(); // direct render: the glide IS the frame budget
    if (t < 1) requestAnimationFrame(step);
    else mapGlide = null;
  };
  if (typeof requestAnimationFrame === "function") requestAnimationFrame(step);
  else { mapZoom = z; mapCX = x; mapCY = y; mapGlide = null; renderMap(); }
}
function mapFocusOn(sid) {
  const t = state.tagged[sid];
  if (!t) return;
  const pts = mapPoints(t);
  if (!pts.length) return;
  if (mapFocus && mapFocus.sid === sid) {
    const f = mapFocus; mapFocus = null; // toggle: back to the saved view
    mapGlideTo(f.prevCX, f.prevCY, f.prevZoom);
    return;
  }
  if (!mapFocus) mapFocus = { sid, prevZoom: mapZoom, prevCX: mapCX, prevCY: mapCY };
  else mapFocus.sid = sid;
  const last = pts[pts.length - 1]; // latest ping: where the shark "is"
  mapGlideTo(last.x, last.y, MAP_FOCUS_ZOOM);
}
/* Mouse-wheel zoom, centered on the pointer. preventDefault stops the page
   scrolling while the pointer is over the map (standard map-widget behavior). */
const mapWrapEl = $("worldMapWrap");
if (mapWrapEl) mapWrapEl.addEventListener("wheel", e => {
  e.preventDefault();
  mapZoomAt(e.clientX, e.clientY, mapZoom * (e.deltaY > 0 ? 1 / 1.3 : 1.3));
}, { passive: false });
/* v0.15.0: touchscreen gestures — one-finger pan when zoomed, nothing else.
   Pointer Events give one code path for mouse and touch. Move/up/cancel
   listen on window so a finger sliding off the map can't strand a pointer.
   Pinch-to-zoom and explore mode are gone: zoom is +/- buttons (and wheel
   on desktop) only. At 1x the browser owns one-finger drags (touch-action:
   pan-y, so the page scrolls); zoomed in, the map takes them (touch-action:
   none, set by renderMap before any touch begins). */
(function initMapGestures() {
  const wrap = $("worldMapWrap");
  if (!wrap || typeof window === "undefined") return;
  const pts = new Map(); // pointerId -> {x, y}
  let panX = 0, panY = 0, downX = 0, downY = 0, movedMax = 0;
  wrap.addEventListener("pointerdown", e => {
    suppressMarkerClick = false; // a stale flag never eats a real tap
    mapGlideCancel(); // grabbing the map mid-glide hands control to the hand
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) {
      downX = panX = e.clientX; downY = panY = e.clientY;
      movedMax = 0;
    }
  });
  window.addEventListener("pointermove", e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (e.pointerType !== "mouse" && pts.size === 1) {
      movedMax = Math.max(movedMax, Math.hypot(e.clientX - downX, e.clientY - downY));
      if (mapZoom > 1 && movedMax > 10) {
        e.preventDefault();
        mapFocusClear(); // a real pan breaks the tap-focus toggle contract
        const svgEl = $("worldMapSvg");
        if (svgEl) {
          const r = svgEl.getBoundingClientRect(), vb = mapViewBox();
          mapCX -= (e.clientX - panX) / r.width * vb.w;
          mapCY -= (e.clientY - panY) / r.height * vb.h;
          requestMapRender();
        }
      }
      panX = e.clientX; panY = e.clientY;
    }
  }, { passive: false });
  const endPointer = e => {
    pts.delete(e.pointerId);
    if (pts.size === 0) {
      if (movedMax > 10) suppressMarkerClick = true;
    } else if (pts.size === 1) {
      // A lifted finger during an (unsupported) two-finger touch collapses
      // back into a normal one-finger pan: re-anchor the remaining finger
      // so the map doesn't jump from its older position.
      const p = [...pts.values()][0];
      downX = panX = p.x;
      downY = panY = p.y;
      movedMax = 0;
    }
  };
  window.addEventListener("pointerup", endPointer);
  window.addEventListener("pointercancel", endPointer);
})();
$("buildTag").textContent = VERSION;
/* v0.22.0: What's New — show once per version update for returning players. */
/* v0.23.0: Bruce chain can also advance on game load (time-based). */
setTimeout(() => { try { advanceBruceChain(); } catch {} }, 5000);
(function initWhatsNew() {
  const notes = WHATS_NEW[VERSION];
  if (!notes || !shouldShowWhatsNew(whatsNewSeen(), VERSION, preMigrationHadSave)) {
    markWhatsNewSeen();
    return;
  }
  const c = $("whatsNewContent");
  c.innerHTML = `
    <div class="cert-trophy" style="font-size:40px">🎉</div>
    <h3 style="margin:6px 0 0">What's new in ${esc(VERSION)}</h3>
    <p class="latin">Tag Along — field program updates</p>
    <ul class="whats-new-list">
      ${notes.map(n => `<li>${n}</li>`).join("")}
    </ul>`;
  $("whatsNewOverlay").classList.remove("hidden");
  $("whatsNewClose").addEventListener("click", () => {
    $("whatsNewOverlay").classList.add("hidden");
    markWhatsNewSeen();
  });
})();
const tickPhoneClock = () => {
  $("phoneTime").textContent =
    new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
};
tickPhoneClock();
/* v0.17.1: the phone clock ticks — refresh every 30s so it never goes stale
   next to message timestamps. */
setInterval(tickPhoneClock, 30000);
/* v0.19.0: field-guide database controls. */
(function initGuideTools() {
  const search = $("guideSearch");
  if (search) search.addEventListener("input", () => {
    guideFilters.q = search.value.trim();
    renderResearch();
  });
  const toggle = $("filterToggle");
  const panel = $("filterPanel");
  const closeSheet = () => {
    panel.classList.add("hidden");
    panel.classList.remove("open-sheet");
    toggle.setAttribute("aria-expanded", "false");
  };
  if (toggle && panel) toggle.addEventListener("click", () => {
    const open = panel.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", String(!open));
    /* Mobile bottom sheet. */
    panel.classList.toggle("open-sheet", !open && window.innerWidth <= 640);
  });
  const sheetClose = $("sheetClose");
  if (sheetClose) sheetClose.addEventListener("click", closeSheet);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel && !panel.classList.contains("hidden")) closeSheet();
  });
  const clr = $("guideClear");
  if (clr) clr.addEventListener("click", clearGuideFilters);
  /* v0.20.0: quick-pace listener bound once at init (never in renderAll). */
  const qp = $("quickPace");
  if (qp) qp.addEventListener("change", () => setPace(qp.checked));
})();
renderAll();
/* v0.18.0 review: one achievement check at boot so migrated saves backfill. */
checkAchievements();
