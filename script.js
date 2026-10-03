/* Tag, You're It — prototype v0.3.0
   Research -> plan (region/depth/bait) -> dive -> tag -> collection book.
   Cute sea puppies with lots of teeth. */

"use strict";

/* ---------- SVG art: simplified, real proportions, few colours ---------- */

const ART = {
  thresher: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Thresher shark">
    <polygon points="150,50 210,6 172,56" fill="#5d7f9e"/>
    <polygon points="152,62 176,92 160,62" fill="#5d7f9e"/>
    <ellipse cx="96" cy="56" rx="60" ry="17" fill="#6f93b8"/>
    <ellipse cx="96" cy="63" rx="52" ry="10" fill="#dfe9f2" opacity="0.85"/>
    <polygon points="38,56 56,47 56,65" fill="#6f93b8"/>
    <polygon points="96,40 108,20 118,40" fill="#5d7f9e"/>
    <polygon points="82,70 70,90 94,71" fill="#5d7f9e"/>
    <circle cx="54" cy="52" r="3.6" fill="#1c2733"/>
    <circle cx="55.2" cy="50.8" r="1.1" fill="#ffffff"/>
    <g stroke="#4a6a86" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="48" x2="70" y2="62"/>
      <line x1="78" y1="47" x2="76" y2="63"/>
      <line x1="84" y1="47" x2="82" y2="63"/>
    </g>
  </svg>`,
  whale: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Whale shark">
    <polygon points="168,48 208,22 206,88" fill="#54687a"/>
    <ellipse cx="100" cy="55" rx="72" ry="25" fill="#5f7484"/>
    <ellipse cx="100" cy="66" rx="62" ry="14" fill="#cfd9e2" opacity="0.7"/>
    <polygon points="104,31 118,12 128,31" fill="#54687a"/>
    <polygon points="84,76 70,100 102,78" fill="#54687a"/>
    <circle cx="44" cy="50" r="3.2" fill="#1c2733"/>
    <path d="M28,62 Q40,70 54,68" stroke="#3c4c5c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <g fill="#ffffff" opacity="0.9">
      <circle cx="80" cy="44" r="2.6"/><circle cx="98" cy="40" r="2.6"/><circle cx="116" cy="43" r="2.6"/>
      <circle cx="134" cy="47" r="2.6"/><circle cx="70" cy="54" r="2.4"/><circle cx="90" cy="54" r="2.4"/>
      <circle cx="110" cy="56" r="2.4"/><circle cx="130" cy="58" r="2.4"/><circle cx="148" cy="56" r="2.2"/>
      <circle cx="82" cy="64" r="2.2"/><circle cx="104" cy="66" r="2.2"/><circle cx="126" cy="66" r="2.2"/>
    </g>
  </svg>`,
  nurse: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Nurse shark">
    <polygon points="160,54 200,36 198,84" fill="#7a6242"/>
    <ellipse cx="100" cy="60" rx="64" ry="19" fill="#8a6f4d"/>
    <ellipse cx="100" cy="68" rx="56" ry="11" fill="#d8c6a6" opacity="0.8"/>
    <polygon points="112,42 122,26 130,42" fill="#7a6242"/>
    <polygon points="142,43 150,30 156,43" fill="#7a6242"/>
    <polygon points="88,76 78,96 100,77" fill="#7a6242"/>
    <circle cx="52" cy="55" r="3.2" fill="#1c2733"/>
    <g stroke="#5e4a30" stroke-width="2" stroke-linecap="round">
      <line x1="40" y1="64" x2="33" y2="71"/>
      <line x1="40" y1="67" x2="33" y2="74"/>
    </g>
    <g stroke="#6e5739" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
    </g>
  </svg>`,
  goblin: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Goblin shark">
    <polygon points="158,50 198,28 196,82" fill="#c08484"/>
    <ellipse cx="106" cy="55" rx="56" ry="15" fill="#d99a9a"/>
    <ellipse cx="106" cy="61" rx="48" ry="9" fill="#f2d9d9" opacity="0.8"/>
    <polygon points="52,55 10,46 10,62" fill="#d99a9a"/>
    <polygon points="106,41 116,28 122,41" fill="#c08484"/>
    <polygon points="92,68 82,86 102,69" fill="#c08484"/>
    <circle cx="48" cy="50" r="3.2" fill="#1c2733"/>
    <path d="M30,60 Q44,66 56,64" stroke="#a86a6a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <g stroke="#a86a6a" stroke-width="1.4" stroke-linecap="round">
      <line x1="76" y1="48" x2="74" y2="60"/>
      <line x1="82" y1="47" x2="80" y2="61"/>
    </g>
  </svg>`
};

/* ---------- Data ---------- */

const REGIONS = {
  "caribbean":    { name: "Caribbean Sea",        note: "A green sea turtle glides past the reef." },
  "baja":         { name: "Baja California",      note: "A school of sardines shimmers below." },
  "philippines":  { name: "Philippines",          note: "A manta ray loops lazily overhead." },
  "maldives":     { name: "Maldives",             note: "Dolphins click and whistle in the distance." },
  "japan":        { name: "Sagami Bay, Japan",    note: "A lanternfish flickers in the dark." },
  "mediterranean":{ name: "Mediterranean Sea",    note: "A pod of dolphins crosses the bow." },
  "open-atlantic":{ name: "Open Atlantic",        note: "Shearwaters wheel above the swells." }
};

const DEPTHS = {
  "surface":  { name: "Surface waters (0–30 m)",     scene: "depth-surface" },
  "reef":     { name: "Reef & shallows (30–100 m)", scene: "depth-shallow" },
  "twilight": { name: "Twilight depths (100–400 m)", scene: "depth-midwater" },
  "deep":     { name: "Deep dark (400–1000 m)",     scene: "depth-deep" }
};

const BAITS = {
  "crustaceans":   "Crabs & lobster",
  "squid":         "Squid",
  "schooling-fish":"Schooling fish (mackerel)",
  "plankton":      "Plankton bloom — no bait, follow the bloom"
};

const SHARKS = [
  {
    id: "nurse",
    name: "Nurse Shark", latin: "Ginglymostoma cirratum", status: "Vulnerable",
    code: "NS",
    combo: { region: "caribbean", bait: "crustaceans" },
    depths: ["surface", "reef"],
    sizeRange: [2.0, 3.0],
    research: "A bottom-dweller of the warm, shallow tropical Atlantic — the Caribbean Sea. By day it piles up with others under reef ledges; by night it hunts alone, vacuuming crabs and lobster off the sand with the little barbels on its snout — so bring crabs & lobster, not fish bait. It lives anywhere from the surface down to about 75 metres: try the surface waters or the reefs.",
    hook: "By day they nap in cuddly heaps of up to 40 on the seafloor.",
    bonus: "Nurse sharks can pump water over their gills while sitting perfectly still — most sharks have to keep swimming to breathe. That's the secret behind the cuddle heaps.",
    nameIdeas: ["Puddles", "Biscuit", "Sandy", "Nugget"]
  },
  {
    id: "thresher",
    name: "Thresher Shark", latin: "Alopias vulpinus", status: "Vulnerable",
    code: "TS",
    combo: { region: "open-atlantic", bait: "schooling-fish" },
    depths: ["reef", "twilight"],
    sizeRange: [3.0, 4.6],
    research: "Follows warm water through tropical and temperate oceans worldwide, but your best bet is the open Atlantic. Spends the day deep below the sunlit layer and rises toward the surface at night. Hunts schooling fish — anchovies, herring, mackerel — stunning them with a whip of its enormous tail, half its body length, so bring schooling fish. It roams anywhere from about 30 to 550 metres: try the reefs or the twilight depths.",
    hook: "That tail looks perpetually nervous, but it's actually a sword. Threshers hunt by tail-whipping.",
    bonus: "Threshers have been seen hunting in pairs, herding schools of fish into a tight ball before taking turns striking with their tails.",
    nameIdeas: ["Whip", "Nervous Nigel", "Swoosh", "Comet"]
  },
  {
    id: "whale",
    name: "Whale Shark", latin: "Rhincodon typus", status: "Endangered",
    code: "WS",
    combo: { region: "philippines", bait: "plankton" },
    depths: ["surface", "reef"],
    sizeRange: [5.5, 12.0],
    research: "Roams all tropical and warm-temperate seas, but this season the confirmed aggregation is off the Philippines. A filter feeder: it doesn't chase prey, it finds seasonal plankton blooms and swims through them with its enormous mouth open — so don't bring bait, follow the bloom. Each shark's spot pattern is unique, like a fingerprint. It usually cruises right at the surface, sometimes dipping a little deeper over reefs: check the surface waters or the shallow reefs.",
    hook: "The biggest fish in the ocean, and it eats some of the smallest food. Gentle polka-dotted bus.",
    bonus: "Whale sharks can dive deeper than 1,900 metres — among the deepest dives ever recorded for any fish — then cruise back up to the surface to feed.",
    nameIdeas: ["Dot", "Bus", "Domino", "Galaxy"]
  },
  {
    id: "goblin",
    name: "Goblin Shark", latin: "Mitsukurina owstoni", status: "Least Concern",
    code: "GS",
    combo: { region: "japan", bait: "squid" },
    depths: ["twilight", "deep"],
    sizeRange: [2.5, 4.0],
    research: "A living fossil from deep continental slopes — most records come from Japan's Sagami Bay. Lives in darkness between 270 and 960 metres, ambushing deep-sea squid and fish — squid on the line is your best bet. Its jaws shoot forward like a slingshot, and it finds prey by sensing electricity. Check the twilight depths or the deep dark.",
    hook: "The only living member of a 125-million-year-old lineage. Pink, pointy-nosed, and deeply weird.",
    bonus: "A goblin shark's pink colour comes from blood vessels showing through its thin, almost translucent skin.",
    nameIdeas: ["Nosey", "Fossil", "Blush", "Slingshot"]
  }
];

/* Sarah's texts: genuine conversation, never a "hint" UI.
   Weighted toward real shark knowledge — she can't help sharing it. */
const COUSIN_CHATS = [
  { them: "did you know nurse sharks can BREATHE without swimming?? most sharks have to keep moving but nurse sharks can pump water over their gills just sitting there. that's why they can nap in piles!! total sea puppies", me: "That explains the cuddle heaps. Incredible." },
  { them: "thresher shark fact!!! their tail is HALF their whole body. they whip it so fast it stuns the fish. like a whip made of shark", me: "A sword tail. Nature is ridiculous." },
  { them: "whale sharks are the BIGGEST fish ever but they only eat tiny stuff. they just swim around with their mouth open like a big slow vacuum. i would also do that", me: "Honestly same. Big slow vacuum is a lifestyle." },
  { them: "goblin sharks are PINK. and their jaw shoots out like in the movies. they live deeper than any diver can go. scientists mostly find them near japan", me: "Deep, pink, and weird. The best combo." },
  { them: "if you want a nurse shark try the caribbean!! they sleep under reef ledges during the day in the SHALLOW parts. at night they go hunting on the sand", me: "Shallow reefs by day, sandy bottoms by night. Noted." },
  { them: "threshers go deep during the day where it's dark and come up at night to hunt. so like... twilight zone deep. or the reefs if you're lucky", me: "So mid-water by day, up higher at night. Got it." }
];

const COUSIN_NUDGES = {
  nurse:   "nurse sharks are SHALLOW!! like surface-to-reef shallow, 0 to 75 metres. they nap under reef ledges during the day and vacuum crabs off the sand at night. caribbean + shallow + crabs!!",
  thresher:"threshers roam!! they go from the reefs down into the twilight zone, like 30 to 550 metres. they hunt SCHOOLS of little fish. reefs or twilight + fish bait??",
  whale:   "whale sharks don't eat bait!! they eat PLANKTON!! find the bloom at the surface. they're usually right at the top where the water looks green, sometimes a bit deeper over reefs",
  goblin:  "goblin sharks live SO deep. twilight zone to the real deep dark, like 270 to 960 metres!! there's a deep bay in japan where scientists find them. squid bait!!"
};

/* If you name a shark "Sarah", she finds out. Sweet, not progression. */
const SARAH_EGG_THREAD = [
  { who: "them", text: "WAIT. you named a shark SARAH?!?! like ME?!?!" },
  { who: "me",   text: "Well... yeah. You're the reason I know half of this stuff." },
  { who: "them", text: "i'm telling EVERYONE at school. sarah the shark!!! do you think she knows?? can sharks know things" },
  { who: "me",   text: "She's got your name now. I think she knows." }
];

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

/* Flavour: the dive log describes the place, not just the mechanics. */
const DEPTH_FLAVOUR = {
  surface: [
    "Sunlight shatters across the surface in moving panes. The water is warm and impossibly clear.",
    "The surface chop rocks the boat gently. Below, everything glows blue-green.",
    "You can see the boat's shadow drifting above you, a dark shape on the bright ceiling of the sea."
  ],
  reef: [
    "Coral heads rise like a drowned city. Small bright fish dart between the branches.",
    "The reef hums — not with sound, but with movement. Everything here is busy.",
    "A cleaning station bustles below: tiny fish picking parasites off a patient grouper."
  ],
  twilight: [
    "The light thins to a deep indigo. Your eyes adjust slowly to the dim.",
    "Particles drift past like snow falling upward. It is very quiet down here.",
    "The slope falls away into darkness to one side. You feel the depth more than see it."
  ],
  deep: [
    "There is no light left to speak of — only the glow of the submersible and the dark pressing in.",
    "The seafloor, when the lights catch it, is soft grey mud, undisturbed for longer than you've been alive.",
    "Every movement down here feels deliberate. Nothing wastes energy in the deep."
  ]
};

/* Sightings pair a log line with a creature drifting past. Vary by depth. */
const SIGHTINGS = {
  surface: [
    { text: "A sea turtle glides past, unhurried, flippers moving like slow wings.", creature: "turtle" },
    { text: "A school of small silver fish wheels past in perfect unison.", creature: "fish" },
    { text: "A dolphin arcs through the blue in the distance, there and gone.", creature: "dolphin" }
  ],
  reef: [
    { text: "A sea turtle paddles over the coral, unbothered by your presence.", creature: "turtle" },
    { text: "A shimmering school of fusiliers pours over the reef crest.", creature: "fish" }
  ],
  twilight: [
    { text: "A loose school of lanternfish flickers past, each one carrying its own small light.", creature: "fish" }
  ],
  deep: [
    { text: "Something small and pale drifts through the edge of the lights — gone before you can focus.", creature: "fish" }
  ]
};

/* Rare, quiet easter eggs in the flavour. Real phenomena, mentioned in passing. */
const EASTER_EGGS = [
  { depths: ["surface", "twilight"],
    text: "For a moment the water sparkles — bioluminescent algae, disturbed by the current, flashing like wet stars." },
  { depths: ["twilight", "deep"],
    text: "A vast dark shape looms to one side — the silhouette of a scuttled ship, long since given back to the sea." },
  { depths: ["surface"],
    text: "The water is so clear it looks color-corrected, like the establishing shot of a nature documentary." },
  { depths: ["twilight"],
    text: "This is the kind of dark water old monster movies warned you about. You check over your shoulder anyway." }
];

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

const state = {
  tagged: store.load(),   // id -> {name, researchId, length, sex, location, date, sarahEgg}
  failures: 0,
  chatIdx: _savedMsgs.chatIdx || 0,
  messages: _savedMsgs.messages || [],
  unread: _savedMsgs.unread || 0,
  pendingTag: null        // species object awaiting naming
};
function saveMsgs() {
  msgStore.save({ messages: state.messages, unread: state.unread, chatIdx: state.chatIdx });
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

const $ = (id) => document.getElementById(id);
const esc = (str) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sharkById = (id) => SHARKS.find(s => s.id === id);
const untagged = () => SHARKS.filter(s => !state.tagged[s.id]);
migrateIds();

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
    if (btn.dataset.tab in tabScroll) window.scrollTo(0, tabScroll[btn.dataset.tab]);
    if (btn.dataset.tab === "messages" && state.unread > 0) {
      state.unread = 0;
      saveMsgs();
      updateMsgBadge();
    }
  });
});
function goTab(name) {
  document.querySelector(`.tab[data-tab="${name}"]`).click();
}

/* ---------- Research ---------- */

function renderResearch() {
  const list = $("researchList");
  list.innerHTML = "";
  SHARKS.forEach(s => {
    const done = !!state.tagged[s.id];
    const card = document.createElement("div");
    card.className = "species-card";
    card.innerHTML = `
      <div class="shark-art">${ART[s.id]}</div>
      <h3>${s.name} ${done ? "✅" : ""}</h3>
      <p class="latin">${s.latin}</p>
      <span class="status-pill">IUCN: ${s.status}</span>
      <p class="research-text">${s.research}</p>
      ${done
        ? `<p class="hook">Tagged ${idLine(state.tagged[s.id])}${state.tagged[s.id].name ? ` as <strong>${esc(state.tagged[s.id].name)}</strong>` : ""} 🎉</p>`
        : `<button class="secondary-button" data-plan="${s.id}" type="button">Plan an expedition for this shark</button>`}
    `;
    list.appendChild(card);
  });
  list.querySelectorAll("[data-plan]").forEach(b =>
    b.addEventListener("click", () => {
      $("targetSelect").value = b.dataset.plan;
      goTab("expedition");
    })
  );
}

/* ---------- Planner ---------- */

function fillSelect(el, obj, key) {
  el.innerHTML = "";
  Object.entries(obj).forEach(([id, v]) => {
    const o = document.createElement("option");
    o.value = id;
    o.textContent = typeof v === "string" ? v : v.name;
    el.appendChild(o);
  });
}

function renderPlanner() {
  const t = $("targetSelect");
  const current = t.value;
  t.innerHTML = "";
  untagged().forEach(s => {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = s.name;
    t.appendChild(o);
  });
  if (untagged().some(s => s.id === current)) t.value = current;
  if (!untagged().length) {
    $("planner").innerHTML = `<p class="research-text" style="text-align:center">All four sharks tagged! Check your collection book. 🎉</p>`;
  }
}

$("launchBtn").addEventListener("click", () => {
  if (!untagged().length) return;
  runExpedition({
    target: $("targetSelect").value,
    region: $("regionSelect").value,
    depth: $("depthSelect").value,
    bait: $("baitSelect").value
  });
});

/* ---------- Expedition ---------- */

function logLine(html, cls) {
  const p = document.createElement("p");
  if (cls) p.className = cls;
  p.innerHTML = html;
  $("diveLog").appendChild(p);
  p.scrollIntoView({ block: "nearest", behavior: "smooth" });
}
const wait = (ms) => new Promise(r => setTimeout(r, ms));

/* Ambient sea life + quiet easter-egg flavour during the dive. */
function spawnCreature(type) {
  const scene = $("diveScene");
  const art = CREATURE_ART[type];
  if (!art) return;
  const el = document.createElement("div");
  el.className = "ambient";
  el.innerHTML = art;
  el.style.top = (8 + Math.random() * 55) + "%";
  el.style.animationDuration = (9 + Math.random() * 8).toFixed(1) + "s";
  el.style.height = Math.round(24 + Math.random() * 26) + "px";
  if (Math.random() < 0.4) el.style.transform = "scaleX(-1)";
  el.addEventListener("animationend", () => el.remove());
  scene.appendChild(el);
  setTimeout(() => el.remove(), 25000); // safety net
}

function maybeSighting(depth) {
  // Rare, quiet easter eggs: real phenomena, mentioned in passing.
  if (Math.random() < 0.22) {
    const eggs = EASTER_EGGS.filter(e => e.depths.includes(depth));
    if (eggs.length) {
      logLine(`✨ ${pick(eggs).text}`, "flavour");
      return;
    }
  }
  if (Math.random() < 0.7) {
    const options = SIGHTINGS[depth] || [];
    if (options.length) {
      const s = pick(options);
      logLine(`👁️ ${s.text}`, "flavour");
      spawnCreature(s.creature);
    }
  }
}

async function runExpedition(plan) {
  const target = sharkById(plan.target);
  $("launchBtn").disabled = true;
  $("diveView").classList.remove("hidden");
  $("diveActions").classList.add("hidden");
  $("diveActions").innerHTML = "";
  $("diveLog").innerHTML = "";
  $("diveShark").classList.add("hidden");

  const scene = $("diveScene");
  scene.className = "dive-scene " + DEPTHS[plan.depth].scene;

  const baitText = plan.bait === "plankton"
    ? "No bait — scanning the water for a plankton bloom…"
    : `Bait deployed: ${BAITS[plan.bait]}.`;

  logLine(`🛥️ <strong>Expedition begun</strong> — the research vessel leaves the harbor.`);
  await wait(1100);
  logLine(`🪝 ${baitText}`);
  await wait(1100);
  logLine(`🐟 First fish appear in the blue…`);
  await wait(1100);
  logLine(`👀 ${REGIONS[plan.region].note}`);
  await wait(1200);
  logLine(`🌊 ${pick(DEPTH_FLAVOUR[plan.depth])}`, "flavour");
  await wait(1200);
  maybeSighting(plan.depth);
  await wait(1300);
  logLine(`⏳ The hours slip by…`);
  await wait(1200);
  logLine(`🌊 The light changes. Something moves below…`);
  await wait(1400);

  // Who shows up? Any species whose region + bait match and whose depth
  // range includes the chosen depth. There's no single "right" depth.
  const appeared = SHARKS.filter(s =>
    s.combo.region === plan.region &&
    s.depths.includes(plan.depth) &&
    s.combo.bait === plan.bait
  );
  const taggable = appeared.filter(s => !state.tagged[s.id]);
  const alreadyTagged = appeared.filter(s => state.tagged[s.id]);

  const actions = $("diveActions");
  actions.classList.remove("hidden");

  if (taggable.length) {
    const s = taggable[0];
    $("diveShark").innerHTML = ART[s.id];
    $("diveShark").classList.remove("hidden");
    logLine(`🦈 <span class="found">SHARKS! A ${s.name}!</span>`, "found");
    state.failures = 0;
    const tagBtn = document.createElement("button");
    tagBtn.className = "primary-button";
    tagBtn.type = "button";
    tagBtn.textContent = `🏷️ Tag the ${s.name}`;
    tagBtn.addEventListener("click", () => openTagging(s));
    actions.appendChild(tagBtn);
  } else if (alreadyTagged.length) {
    const s = alreadyTagged[0];
    const rec = state.tagged[s.id];
    $("diveShark").innerHTML = ART[s.id];
    $("diveShark").classList.remove("hidden");
    logLine(`🦈 <span class="found">Look who it is — ${rec.name ? `“${esc(rec.name)}”` : esc(rec.researchId)}, already in your book!</span>`, "found");
    state.failures = 0;
  } else {
    logLine(`<span class="miss">The water stays empty. Time to head back.</span>`, "miss");
    state.failures += 1;
  }

  const backBtn = document.createElement("button");
  backBtn.className = "secondary-button";
  backBtn.type = "button";
  backBtn.textContent = "Return to ship";
  backBtn.addEventListener("click", () => {
    $("diveView").classList.add("hidden");
    $("launchBtn").disabled = false;
    renderPlanner();
    renderCollection();
    renderResearch();
    afterExpedition(plan.target);
  });
  actions.appendChild(backBtn);
}

/* ---------- Sarah's texts (optional — badge notifies, you open when you want) ---------- */

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
  [...state.messages].reverse().forEach(thread => {
    const card = document.createElement("div");
    card.className = "species-card";
    card.innerHTML = `<div class="phone-head">📱 Texts with Sarah</div><div class="phone-thread"></div>`;
    const th = card.querySelector(".phone-thread");
    thread.forEach(m => {
      const b = document.createElement("div");
      b.className = "bubble " + m.who;
      b.textContent = m.text;
      th.appendChild(b);
    });
    list.appendChild(card);
  });
}

function afterExpedition(targetId) {
  let thread;
  if (state.failures >= 3) {
    // gentle nudge, genuine-conversation style
    thread = [
      { who: "them", text: "how's the shark hunting going??" },
      { who: "me", text: "Honestly? Struck out a few times. This one's tricky." },
      { who: "them", text: COUSIN_NUDGES[targetId] || "you'll get the next one!! i believe in you" },
      { who: "me", text: "Huh. Okay, that's actually really helpful. Thanks, kiddo." }
    ];
    state.failures = 0;
  } else {
    const chat = COUSIN_CHATS[state.chatIdx % COUSIN_CHATS.length];
    state.chatIdx += 1;
    thread = [
      { who: "them", text: chat.them },
      { who: "me", text: chat.me }
    ];
  }
  state.messages.push(thread);
  state.unread += 1;
  saveMsgs();
  updateMsgBadge();
  renderMessages();
}

/* ---------- Tagging ---------- */

const rand = (a, b) => Math.round((a + Math.random() * (b - a)) * 10) / 10;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function openTagging(species) {
  state.pendingTag = species;
  const length = rand(species.sizeRange[0], species.sizeRange[1]);
  const sex = Math.random() < 0.5 ? "female" : "male";
  const researchId = mintResearchId(species);
  state.pendingTag._gen = { length, sex, researchId };
  $("tagSharkArt").innerHTML = ART[species.id];
  $("tagInfo").innerHTML = `
    <strong>${species.name}</strong> <em>(${species.latin})</em><br>
    🔬 Research ID: <strong>${researchId}</strong> (assigned automatically)<br>
    📏 ${length} m &nbsp;·&nbsp; ${sex === "female" ? "♀ female" : "♂ male"}<br>
    📍 Tagged at: ${REGIONS[$("regionSelect").value].name}<br>
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
  const rec = {
    name: name || "",
    researchId: s._gen.researchId,
    length: s._gen.length,
    sex: s._gen.sex,
    location: REGIONS[$("regionSelect").value].name,
    date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
  };
  state.tagged[s.id] = rec;
  store.save(state.tagged);
  $("tagOverlay").classList.add("hidden");
  $("diveView").classList.add("hidden");
  const lb = $("launchBtn");
  if (lb) lb.disabled = false;
  state.pendingTag = null;
  maybeSarahEgg(s.id, rec);
  renderAll();
  goTab("collection");
}

/* Easter egg: name a shark "Sarah" and the cousin finds out. */
function maybeSarahEgg(speciesId, rec) {
  if (!rec || rec.sarahEgg) return;
  if ((rec.name || "").trim().toLowerCase() === "sarah") {
    rec.sarahEgg = true;
    store.save(state.tagged);
    state.messages.push(SARAH_EGG_THREAD);
    state.unread += 1;
    saveMsgs();
    updateMsgBadge();
    renderMessages();
  }
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
  const ids = Object.keys(state.tagged);
  $("collectionCount").textContent = `${ids.length}/4`;
  $("completeBanner").classList.toggle("hidden", ids.length < 4);

  if (!ids.length) {
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
    <p class="hook">💡 ${s.hook}</p>
    <p class="unlock">🔓 <strong>Unlocked by tagging:</strong> ${s.bonus}</p>
  `;
  $("detailOverlay").classList.remove("hidden");
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
    renderCollection();
    renderResearch();
    openDetail(id);
  });
}

$("detailClose").addEventListener("click", () => {
  $("detailOverlay").classList.add("hidden");
});
$("detailOverlay").addEventListener("click", (e) => {
  if (e.target === $("detailOverlay")) $("detailOverlay").classList.add("hidden");
});

/* ---------- Boot ---------- */

function renderAll() {
  renderResearch();
  renderPlanner();
  renderCollection();
  renderMessages();
  updateMsgBadge();
}

fillSelect($("regionSelect"), REGIONS);
fillSelect($("depthSelect"), DEPTHS);
fillSelect($("baitSelect"), BAITS);
renderAll();
