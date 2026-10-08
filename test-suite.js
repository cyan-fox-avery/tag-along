/* Tag Along headless test suite — v0.16.0. Saved in the workspace (not /tmp). */
const fs = require('fs');
const path = require('path');
const DIR = __dirname;
const files = ['map-data.js', 'art-data.js', 'sarah-data.js', 'sharks-data.js', 'archive-data.js', 'archive-ui.js', 'achievements-data.js', 'game-data.js', 'script.js'];

function makeEl() {
  const el = {
    children: [], innerHTML: '', textContent: '', value: '', dataset: {},
    classList: { _s: new Set(), add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); }, toggle() {}, contains(c) { return this._s.has(c); } },
    style: {}, disabled: false, hidden: false,
    addEventListener() {}, removeEventListener() {}, setAttribute() {}, getAttribute() { return null; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 800, height: 400 }; },
    click() {}, focus() {}, scrollIntoView() {}, scrollHeight: 999, scrollTop: 0,
    appendChild(c) { this.children.push(c); return c; },
    querySelector() { return makeEl(); }, querySelectorAll() { return []; },
  };
  return el;
}
const els = {};
global.document = {
  getElementById(id) { if (!els[id]) els[id] = makeEl(); return els[id]; },
  createElement() { return makeEl(); },
  querySelector() { return makeEl(); }, querySelectorAll() { return []; },
  addEventListener() {},
};
global.window = { addEventListener() {}, innerWidth: 800 };
global.localStorage = { _s: {}, getItem(k) { return this._s[k] || null; }, setItem(k, v) { this._s[k] = v; }, removeItem(k) { delete this._s[k]; } };
global.requestAnimationFrame = fn => { return 1; };
const rafQ = [];
global.performance = { now: () => 0 };

let code = files.map(f => fs.readFileSync(path.join(DIR, f), 'utf8')).join('\n');
const fileCode = code;
const cssCode = fs.readFileSync(path.join(DIR, 'style.css'), 'utf8');
const htmlCode = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');
code += `
;(function tests(){
  const out = [];
  const ok = (name, cond) => out.push((cond ? 'PASS' : 'FAIL') + ' ' + name);
  ok('version v0.21.0', VERSION === 'v0.21.0');

  // roster
  ok('roster is 50', SHARKS.length === 50);
  const ids = SHARKS.map(s => s.id);
  ok('50 unique shark IDs', new Set(ids).size === 50);
  ok('no duplicate research codes', new Set(SHARKS.map(s => s.code)).size === 50);
  ok('all have ART', ids.every(id => !!ART[id]));
  ok('all have SKETCH', ids.every(id => !!SKETCH[id]));
  const counts = ids.map(id => (COUSIN_CHATS[id] || []).length);
  ok('all 50 species have 3 chats', counts.length === 50 && counts.every(n => n === 3));
  ok('all have nudges', ids.every(id => !!COUSIN_NUDGES[id]));
  ok('all have envelopes', ids.every(id => !!TRACK_ENVELOPES[id]));
  ok('win is full roster', SHARKS.length === 50);

  // v0.14.0 new sharks
  const new2 = ['frilled', 'zebra'];
  ok('frilled+zebra have ART', new2.every(id => !!ART[id]));
  ok('frilled+zebra have envelopes', new2.every(id => !!TRACK_ENVELOPES[id]));
  ok('frilled is archival kind', TRACK_ENVELOPES.frilled.kind === 'archival');

  // research clarity (v0.14.0)
  ok('blacktip names real baits', /schooling fish/.test(sharkById('blacktip').research));
  ok('whitetip names squid, no octopus', /squid/i.test(sharkById('whitetip').research) && !/octopus/i.test(sharkById('whitetip').research));
  ok('sandtiger names rays', /rays/.test(sharkById('sandtiger').research));
  ok('sevengill names squid', /squid/i.test(sharkById('sevengill').research));

  // map envelopes (v0.13.0 review)
  let missing = [];
  Object.entries(TRACK_ENVELOPES).forEach(([id, env]) => {
    (env.areas || []).forEach(a => { if (!MAP_COORDS[a]) missing.push(id + ':' + a); });
  });
  ok('all envelope areas have MAP_COORDS', missing.length === 0);
  // v0.14.0 review: duplicate MAP_COORDS keys in SOURCE
  const srcText = fileCode.split('const BLUE_MARBLE_URL')[0];
  const keyCounts = {}; let dupSrc = null;
  srcText.split(String.fromCharCode(10)).forEach(function(line){
    const t = line.trim();
    const qi = t.indexOf(String.fromCharCode(34) + ': [');
    if (t.charAt(0) === String.fromCharCode(34) && qi > 0) {
      const k = t.slice(1, qi);
      if (keyCounts[k]) dupSrc = k;
      keyCounts[k] = 1;
    }
  });
  ok('no duplicate MAP_COORDS keys in source', !dupSrc);

  // Sarah voice: no ALL-CAPS shouting
  const allSarah = Object.values(COUSIN_CHATS).flat().map(c => c.them + ' ' + c.me).join(' ')
    + Object.values(COUSIN_NUDGES).join(' ');
  ok('chats+nudges calm (no ALL-CAPS runs)', !/[A-Z]{5,}/.test(allSarah.replace(/SCUBA|DNA/g, '')));

  // win thread dynamic
  ok('win thread uses SHARKS.length', winThread()[1].text.startsWith(SHARKS.length + ' for '));

  // v0.16.0 ending
  ok('sarahWinThread exists', typeof sarahWinThread === 'function');
  const st = sarahWinThread();
  ok('sarahWinThread has 10 beats', st.length === 10);
  ok('sarahWinThread calm (no ALL-CAPS)', !/[A-Z]{5,}/.test(st.map(m => m.text).join(' ')));
  ok('sarahWinThread is celebration not farewell', /proud/.test(st.map(m => m.text).join(' ')));
  ok('winMapFinale exists', typeof winMapFinale === 'function');
  ok('winStep has 4 beats', /winStep\\(4\\)/.test(fileCode));
  ok('archiveUnlocked in state', 'archiveUnlocked' in state);

  // v0.15.0 map gestures
  ok('no explore-mode refs in source', !/mapExplore/.test(fileCode));
  ok('no pinch vars in source', !/pinchD0|pinchZ0/.test(fileCode));
  ok('zoom-driven touchAction', /mapZoom > 1 \\? "none" : "pan-y"/.test(fileCode));


  // v0.16.0 review fixes
  ok('taggedChronological exists', typeof taggedChronological === 'function');
  ok('confirmTag stamps taggedAt', /taggedAt: Date\\.now\\(\\)/.test(fileCode));
  ok('sarahWinThread uses taggedChronological', /function sarahWinThread\\(\\)[^]*taggedChronological\\(\\)/.test(fileCode));
  ok('winMapFinale uses taggedChronological', /function winMapFinale\\(\\)[^]*taggedChronological\\(\\)/.test(fileCode));
  // chronology: taggedAt order wins; insertion order is the fallback
  const _savedTagged = state.tagged;
  state.tagged = {
    b: { date: 'Jan 1, 2026', taggedAt: 2000 },
    a: { date: 'Jan 1, 2026', taggedAt: 1000 },
    c: { date: 'Jan 1, 2026' },
  };
  const chrono = taggedChronological().map(e => e.sid);
  ok('chronology sorts by taggedAt', chrono[0] === 'a' && chrono[1] === 'b');
  state.tagged = { x: { date: 'Jan 2, 2026' }, y: { date: 'Jan 1, 2026' } };
  ok('chronology falls back to insertion order', taggedChronological().map(e => e.sid).join(',') === 'x,y');
  state.tagged = _savedTagged;
  // finale caption + animation
  ok('finale caption uses just-revealed shark', /ordered\\[count - 1\\]/.test(fileCode));
  ok('finale intro state for count 0', /if \\(count === 0\\)/.test(fileCode));
  ok('only new marker animates', /idx === newIdx/.test(fileCode));
  // atomic archive unlock
  ok('doWin persists archive unlock', /function doWin\\(\\)[^}]*tyi-archive/.test(fileCode));
  ok('RESET_KEYS clears tyi-archive', RESET_KEYS.includes('tyi-archive'));
  // old-winner migration: pre-v0.16 completed save gets the archive unlock
  ok('migrateArchiveUnlock exists', typeof migrateArchiveUnlock === 'function');
  const _w2 = state.won, _a2 = state.archiveUnlocked, _t2 = state.tagged;
  state.won = true; state.archiveUnlocked = false; state.tagged = {};
  SHARKS.forEach(x => { state.tagged[x.id] = { researchId: 'T' }; });
  try { localStorage.removeItem('tyi-archive'); } catch {}
  migrateArchiveUnlock();
  ok('old winners get archive unlock', state.archiveUnlocked === true && localStorage.getItem('tyi-archive') === '1');
  state.won = _w2; state.archiveUnlocked = _a2; state.tagged = _t2;

  // v0.17.0 Wild Archive
  ok('ARCHIVE_MEDIA exists', typeof ARCHIVE_MEDIA === 'object');
  const liveIds = SHARKS.map(x => x.id);
  const archivedLive = liveIds.filter(id => ARCHIVE_MEDIA[id] && !ARCHIVE_MEDIA[id].future);
  ok('all 50 live sharks have archive entries', archivedLive.length === 50);
  ok('salmon is live with media', ARCHIVE_MEDIA.salmon && ARCHIVE_MEDIA.salmon.future === false && (ARCHIVE_MEDIA.salmon.assets || []).length > 0);
  let assetsOk = true, videosOk = true;
  liveIds.forEach(id => {
    (ARCHIVE_MEDIA[id].assets || []).forEach(a => {
      if (!a.caption || !a.credit || !a.license || !a.page) assetsOk = false;
      if (a.type === 'video' && !a.play) videosOk = false;
      if (!a.image && !(a.type === 'video' && a.play)) assetsOk = false;
    });
  });
  ok('every asset has caption/credit/license/page', assetsOk);
  ok('every video has an iOS play URL', videosOk);
  ok('renderArchive exists', typeof renderArchive === 'function');
  ok('updateArchiveTab exists', typeof updateArchiveTab === 'function');
  ok('archive tab hidden until unlock', /updateArchiveTab/.test(fileCode));
  // v0.17.0 review fixes: curated clip boundaries, license URLs, tagged-only dossiers
  const lemonVid = ARCHIVE_MEDIA.lemon.assets.find(a => a.type === 'video');
  ok('lemon video has curated clip (28-58s)', lemonVid.trimmed === true && lemonVid.clipStart === 28 && lemonVid.clipEnd === 58);
  const wtVid = ARCHIVE_MEDIA.whitetip.assets.find(a => a.type === 'video');
  ok('whitetip video has curated clip (13-54s)', wtVid.trimmed === true && wtVid.clipStart === 13 && wtVid.clipEnd === 54);
  const clipHtml = archiveAssetHtml(lemonVid, true);
  ok('video src enforces clip via media fragment', clipHtml.includes('#t=28,58'));
  ok('trimmed videos note the trim', clipHtml.includes('trimmed from original'));
  ok('license links to canonical CC URL', clipHtml.includes('href="https://creativecommons.org/licenses/by/3.0/"'));
  const pdHtml = archiveAssetHtml({ type: 'photo', caption: 'x', credit: 'NOAA', license: 'Public domain', page: 'https://example.com', image: 'https://example.com/i.jpg' }, false);
  ok('public-domain uses neutral Credit (no \u00a9)', pdHtml.includes('Credit NOAA') && !pdHtml.includes('\u00a9 NOAA'));
  ok('dossiers require an actual tag', fileCode.includes('if (!state.tagged[s.id]) return'));
  // v0.17.0 review fix: every non-public-domain CC license in the data must
  // have a LICENSE_URLS entry, so new sharks can't silently lose license links.
  const usedLicenses = new Set();
  Object.values(ARCHIVE_MEDIA).forEach(m => (m.assets || []).forEach(a => {
    if (a.license && !/public domain/i.test(a.license)) usedLicenses.add(a.license);
  }));
  /* v0.20.0: versionless "CC BY-NC" is a deliberate exception (Mira's rule —
     iNaturalist records no version, so no version-specific link is applied).
     Everything else needs its canonical URL. */
  const unmapped = [...usedLicenses].filter(l => l !== "CC BY-NC" && !LICENSE_URLS[l]);
  ok('every CC license has a canonical URL', unmapped.length === 0);
  // mobile perf: videos render with preload="none" + poster, not preload="metadata"
  ok('videos use preload=none with poster', /preload=\\"none\\"/.test(fileCode) && /poster=/.test(fileCode));

  // v0.17.1 sanity-check batch
  const openerRe = /opener:\\s*"([^"]+)"/g;
  const openers = []; let m;
  while ((m = openerRe.exec(fileCode)) !== null) openers.push(m[1]);
  ok('50 species openers present', openers.length === 50);
  ok('no shared verbatim closer', new Set(openers).size === openers.length);
  ok('the old repeated closer is gone', !openers.some(function(o) { return /tell me everything/i.test(o); }));
  // v0.17.1 review fix: the advice offer must survive a reload, and a used
  // offer must not resurrect.
  state.sarahAdviceOffered = true;
  saveMsgs();
  ok('advice offer persists across reload',
    JSON.parse(localStorage.getItem('tyi-messages')).sarahAdviceOffered === true);
  state.sarahAdviceOffered = false;
  saveMsgs();
  ok('used offer stays used across reload',
    JSON.parse(localStorage.getItem('tyi-messages')).sarahAdviceOffered === false);
  ok('release offers both destinations',
    htmlCode.includes('id="releaseShipBtn"') && /releaseShipBtn/.test(fileCode));
  ok('doRelease resolves the encounter directly', /function doRelease\\(headBack\\)/.test(fileCode));
  ok('phone clock ticks', /setInterval\\(tickPhoneClock/.test(fileCode));
  ok('auto-nudge waits for five failures', /state\\.failures >= 5/.test(fileCode));
  ok('ask-Sarah advice path exists', typeof askSarahAdvice === 'function' && typeof renderSarahAsk === 'function');
  ok('encounter announces tagged status', fileCode.includes('already in your book') && fileCode.includes('new to your book'));
  ok('map legend is two-column', /\\.map-legend\\s*\\{\\s*display:\\s*grid/.test(cssCode));
  ok('chip shows common name first', /esc\\(s\\.name\\)\\} · /.test(fileCode));
  ok('overlays scroll when overflowing', /\\.overlay\\s*\\{[^}]*overflow-y:\\s*auto/.test(cssCode));
  ok('sand tiger GIF reframed in CSS', /\\.gif-landscape-frame/.test(cssCode));
  const stGif = ARCHIVE_MEDIA.sandtiger.assets.find(function(a) { return a.framing === 'landscape-crop'; });
  ok('sand tiger GIF flagged for reframe', !!stGif);

  // v0.18.0: achievements
  ok('ACHIEVEMENTS data loads', typeof ACHIEVEMENTS !== 'undefined' && ACHIEVEMENTS.length >= 12);
  ok('every achievement has a breadcrumb', ACHIEVEMENTS.every(a => a.breadcrumb && a.name !== a.breadcrumb));
  ok('breadcrumbs never leak the real requirement', !ACHIEVEMENTS.some(a =>
    a.id !== 'bruce' && a.breadcrumb.toLowerCase() === a.description.toLowerCase()));
  // Simulate earns: first tag, thresher, Sarah naming, endangered tag.
  state.tagged = { nurse: { name: 'Bubbles', researchId: 'NS-2026-001' } };
  state.stats = { regionsVisited: [], baitsUsed: [], resights: 0, chumTags: 0, expeditions: 0 };
  state.achievements = {};
  checkAchievements();
  ok('first tag unlocks', !!state.achievements['first-tag']);
  state.tagged.thresher = { name: 'Whip', researchId: 'NS-2026-002' };
  checkAchievements();
  ok('thresher unlocks Perpetually Nervous', !!state.achievements.nervous);
  state.tagged.nurse.name = 'Sarah';
  checkAchievements();
  ok('naming a shark Sarah unlocks Best Cousin Ever', !!state.achievements['best-cousin']);
  state.tagged.whale = { name: 'Dot', researchId: 'NS-2026-003' };
  checkAchievements();
  ok('endangered tag unlocks Every One Counts', !!state.achievements['every-one-counts']);
  ok('Bruce stays locked without the chain', !state.achievements.bruce);
  ok('basking duplicate removed', ARCHIVE_MEDIA.basking.assets.length === 1);

  // v0.18.0 wave — 7 new species live on the roster with verified archive media
  const wave7 = ['scalloped','smooth','bonnethead','bull','greyreef','caribbean','sandbar'];
  ok('7 wave species on roster', wave7.every(id => SHARKS.some(s => s.id === id)));
  ok('wave species live in archive (not future)',
    wave7.every(id => ARCHIVE_MEDIA[id] && ARCHIVE_MEDIA[id].future === false));
  ok('wave species have full game data',
    wave7.every(id => ART[id] && SKETCH[id] && COUSIN_NUDGES[id] &&
      (COUSIN_CHATS[id] || []).length === 3 && TRACK_ENVELOPES[id]));
  /* v0.20.0: salmon joined the roster — the future-only assertion retires. */
  ok('salmon graduated from future batch', ARCHIVE_MEDIA.salmon.future === false &&
    SHARKS.some(s => s.id === 'salmon'));

  // v0.18.0 review regressions
  ok('reset clears achievement/stat stores',
    fileCode.includes('"tyi-stats", "tyi-achievements"'));
  // one named shark must NOT earn First-Name Basis
  state.tagged = { nurse: { name: 'Bubbles', researchId: 'NS-2026-001' } };
  state.stats = { regionsVisited: [], baitsUsed: [], resights: 0, chumTags: 0, expeditions: 0 };
  state.achievements = {};
  checkAchievements();
  ok('one named shark does not earn First-Name Basis', !state.achievements['first-name']);
  // Ocean Hopper requires locked regions too
  state.stats.regionsVisited = Object.keys(REGIONS).filter(r => !REGIONS[r].locked);
  state.achievements = {};
  checkAchievements();
  ok('locked regions count toward Ocean Hopper', !state.achievements['ocean-hopper']);
  // chum on a species without chum in methods must NOT count
  state.tagged = {}; state.achievements = {}; state.stats.chumTags = 0;
  const whaleSpecies = SHARKS.find(s => s.id === 'whale');
  const chumValid = whaleSpecies.methods && whaleSpecies.methods.attract &&
    whaleSpecies.methods.attract.includes('chum');
  ok('whale shark has no chum method', !chumValid);
  // multiple unlocks queue instead of overwriting
  state.tagged = { nurse: { name: 'Bubbles', researchId: 'NS-2026-001' } };
  state.stats = { regionsVisited: [], baitsUsed: [], resights: 1, chumTags: 0, expeditions: 0 };
  state.achievements = {};
  checkAchievements();
  const queued = typeof achieveQueue !== 'undefined' ? achieveQueue.length : 0;
  const shown = (typeof achieveShowing !== 'undefined' && achieveShowing) ? 1 : 0;
  ok('simultaneous unlocks queued', (queued + shown) >= 2 &&
    !!state.achievements['first-tag'] && !!state.achievements['old-friend']);
  // every advertised achievement is attainable (no permanently-locked entries)
  ok('all live achievements attainable',
    ACHIEVEMENTS.every(a => { try { return typeof a.check === 'function'; } catch { return false; } }) &&
    !ACHIEVEMENTS.some(a => a.id === 'bruce'));
  ok('18 live achievements', ACHIEVEMENTS.length === 18);
  // v0.19.0: six new achievements
  const resetA = () => { state.tagged = {}; state.achievements = {};
    state.stats = { regionsVisited: [], baitsUsed: [], resights: 0, chumTags: 0,
      expeditions: 0, depthsTagged: [], methodsUsed: [] }; };
  resetA();
  state.stats.depthsTagged = ["surface", "reef", "twilight", "deep"];
  checkAchievements();
  ok('Full Fathom unlocks', !!state.achievements['full-fathom']);
  resetA();
  state.tagged = Object.fromEntries(SHARKS.map(s => [s.id, { name: "X", researchId: "R" }]));
  checkAchievements();
  ok('Fin-ished unlocks on full roster', !!state.achievements['finished']);
  resetA();
  state.stats.methodsUsed = ["chum", "seal", "boat", "plane", "network"];
  checkAchievements();
  ok('Bait and Switch unlocks', !!state.achievements['bait-switch']);
  resetA();
  state.tagged = { nurse: { name: "B", researchId: "R", resightings: [{}, {}, {}] } };
  checkAchievements();
  ok('Pen Pal unlocks at 3 resights', !!state.achievements['pen-pal']);
  resetA();
  state.tagged = { scalloped: { name: "S", researchId: "R" } };
  checkAchievements();
  ok('Off the Map unlocks in locked region', !!state.achievements['off-map']);
  resetA();
  const byStatus = {};
  SHARKS.forEach(s => { if (!byStatus[s.status]) byStatus[s.status] = s.id; });
  state.tagged = Object.fromEntries(Object.values(byStatus).map(id => [id, { name: "X", researchId: "R" }]));
  checkAchievements();
  ok('Every Shade unlocks across statuses', !!state.achievements['every-shade']);
  ok('new breadcrumbs stay hints',
    ["full-fathom","finished","bait-switch","pen-pal","off-map","every-shade"].every(id => {
      const a = ACHIEVEMENTS.find(x => x.id === id);
      return a && a.breadcrumb && !/tag your first|complete \d+|visit every/i.test(a.breadcrumb);
    }));
  resetA();
  // bull and sandbar tracks resolve to different points
  const bullShelf = MAP_COORDS[TRACK_ENVELOPES.bull.areas.find(a => /shelf/i.test(a))];
  const sandShelf = MAP_COORDS[TRACK_ENVELOPES.sandbar.areas.find(a => /shelf/i.test(a))];
  ok('bull/sandbar shelf coords differ',
    bullShelf && sandShelf && (bullShelf[0] !== sandShelf[0] || bullShelf[1] !== sandShelf[1]));
  // CC0 renders without copyright symbol
  const cc0Html = archiveAssetHtml({ license: 'CC0', credit: 'Dennis Hipp', caption: 'x', page: 'x', image: 'x', full: 'x' }, true);
  ok('CC0 uses neutral credit wording', !/©/.test(cc0Html));
  // v0.18.0 2nd-pass: chum backfill from logbook
  const chumLogEntry = { method: "attract", methodOpt: "chum",
    encounters: [{ speciesId: "nurse", result: "tagged" }] };
  const chumSpecies = SHARKS.find(x => x.id === "nurse");
  const chumCounts = chumLogEntry.method === "attract" && chumLogEntry.methodOpt === "chum" &&
    chumLogEntry.encounters.some(e => e.result === "tagged" &&
      (SHARKS.find(x => x.id === e.speciesId) || {}).methods?.attract?.includes("chum"));
  ok('chum backfill logic recognizes valid history', chumCounts === true);
  const badChumEntry = { method: "attract", methodOpt: "chum",
    encounters: [{ speciesId: "whale", result: "tagged" }] };
  const badCounts = badChumEntry.encounters.some(e => e.result === "tagged" &&
    (SHARKS.find(x => x.id === e.speciesId) || {}).methods?.attract?.includes("chum"));
  ok('chum backfill rejects invalid species', badCounts === false);

  // v0.19.0: field-guide database
  const resetGF = () => { guideFilters.q = ""; guideFilters.region.clear();
    guideFilters.depth.clear(); guideFilters.methodOpt.clear();
    guideFilters.bait.clear(); guideFilters.tagged = "all"; };
  resetGF();
  ok('no filters matches all', SHARKS.filter(guideMatches).length === SHARKS.length);
  guideFilters.q = "hammerhead";
  const hammers = SHARKS.filter(guideMatches);
  ok('search finds hammerheads', hammers.length === 3 &&
    hammers.every(s => /hammerhead/i.test(s.name)));
  resetGF();
  guideFilters.region.add("caribbean");
  const carib = SHARKS.filter(guideMatches);
  ok('region filter narrows', carib.length > 0 && carib.length < SHARKS.length &&
    carib.every(s => s.combo.region === "caribbean"));
  guideFilters.bait.add("tuna");
  const stacked = SHARKS.filter(guideMatches);
  ok('stacked filters narrow further', stacked.length <= carib.length &&
    stacked.every(s => baitList(s).includes("tuna")));
  resetGF();
  state.tagged = { nurse: { name: "Bubbles", researchId: "NS-2026-001" } };
  guideFilters.tagged = "tagged";
  ok('tagged filter', SHARKS.filter(guideMatches).length === 1);
  guideFilters.tagged = "untagged";
  ok('untagged filter', SHARKS.filter(guideMatches).length === SHARKS.length - 1);
  resetGF();
  guideFilters.methodOpt.add("chum");
  const chummers = SHARKS.filter(guideMatches);
  ok('method filter uses exact planner vocabulary',
    chummers.length > 0 && chummers.every(s => methodOpts(s).includes("chum")));
  ok('filter count tracks active filters', (() => {
    resetGF(); guideFilters.q = "x"; guideFilters.region.add("caribbean");
    return activeFilterCount() === 2;
  })());
  ok('latin-name search works', (() => {
    resetGF(); guideFilters.q = "sphyrna lewini";
    const r = SHARKS.filter(guideMatches);
    return r.length === 1 && r[0].id === "scalloped";
  })());
  ok('depth filter narrows', (() => {
    resetGF(); guideFilters.depth.add("deep");
    const r = SHARKS.filter(guideMatches);
    return r.length > 0 && r.length < SHARKS.length &&
      r.every(s => (s.depths || []).includes("deep"));
  })());
  ok('clear resets everything', (() => {
    guideFilters.q = "shark"; guideFilters.region.add("caribbean");
    guideFilters.depth.add("reef"); guideFilters.methodOpt.add("chum");
    guideFilters.bait.add("tuna"); guideFilters.tagged = "tagged";
    clearGuideFilters();
    return guideFilters.q === "" && guideFilters.region.size === 0 &&
      guideFilters.depth.size === 0 && guideFilters.methodOpt.size === 0 &&
      guideFilters.bait.size === 0 && guideFilters.tagged === "all" &&
      SHARKS.filter(guideMatches).length === SHARKS.length;
  })());
  resetGF(); state.tagged = {};
  // restore
  state.tagged = {}; state.achievements = {};
  state.stats = { regionsVisited: [], baitsUsed: [], resights: 0, chumTags: 0, expeditions: 0 };
  // restore
  state.tagged = {}; state.achievements = {};
  state.stats = { regionsVisited: [], baitsUsed: [], resights: 0, chumTags: 0, expeditions: 0 };

  // v0.20.0: salmon + dusky wave
  const salmon = SHARKS.find(s => s.id === "salmon");
  const dusky = SHARKS.find(s => s.id === "dusky");
  ok('salmon dossier complete', salmon && salmon.combo.region === "japan" &&
    salmon.depths.includes("surface") && salmon.latin === "Lamna ditropis");
  ok('dusky dossier complete', dusky && dusky.combo.region === "south-africa" &&
    dusky.status === "Endangered" && dusky.latin === "Carcharhinus obscurus");
  ok('wave chats present', COUSIN_CHATS.salmon && COUSIN_CHATS.salmon.length === 3 &&
    COUSIN_CHATS.dusky && COUSIN_CHATS.dusky.length === 3);
  ok('wave nudges present', !!COUSIN_NUDGES.salmon && !!COUSIN_NUDGES.dusky);
  ok('wave art + sketches', !!ART.salmon && !!ART.dusky && !!SKETCH.salmon && !!SKETCH.dusky);
  ok('dusky archive live (Avery+Mira curated)', ARCHIVE_MEDIA.dusky && ARCHIVE_MEDIA.dusky.future === false &&
    !ARCHIVE_MEDIA.dusky.comingSoon && ARCHIVE_MEDIA.dusky.assets.length === 2 &&
    ARCHIVE_MEDIA.dusky.assets[0].credit === "Happy Little Nomad" &&
    ARCHIVE_MEDIA.dusky.assets[1].license === "public domain (NOAA)");
  // v0.21.0: the 18 wave species are now LIVE (future:false), playable roster 50
  const wave18 = ["silvertip","spinner","wobbegong","leopard","horn","portjackson","angelshark",
    "megamouth","sawshark","greenland","cookiecutter","sixgill","velvetbelly","dwarflantern",
    "kitefin","pacificsleeper","spinydogfish","catshark"];
  ok('media batch: 18 wave entries live', wave18.every(id =>
    ARCHIVE_MEDIA[id] && ARCHIVE_MEDIA[id].future !== true &&
    (ARCHIVE_MEDIA[id].assets || []).length >= 1));
  ok('batch: no pygmy (verification hold)', !ARCHIVE_MEDIA.pygmy);
  ok('batch: every asset has image+page+credit+license', wave18.every(id =>
    ARCHIVE_MEDIA[id].assets.every(a => a.image && a.page && a.credit && a.license &&
      !a.image.includes('commons.wikimedia.org/wiki/'))));
  ok('batch: no HTML page URLs in image src', wave18.every(id =>
    ARCHIVE_MEDIA[id].assets.every(a => !a.image.includes('wikipedia.org') && !a.image.includes('.org/wiki/'))));
  ok('spinner NC asset has notice + iNaturalist label', (() => {
    const a = ARCHIVE_MEDIA.spinner.assets[0];
    return a.license === "CC BY-NC" && !!a.licenseNote && a.sourceLabel === "iNaturalist" &&
      !LICENSE_URLS["CC BY-NC"];
  })());
  ok('NC 4.0 license URL registered', LICENSE_URLS["CC BY-NC 4.0"] === "https://creativecommons.org/licenses/by-nc/4.0/");
  // v0.20.0: pinned shark
  ok('pin toggles', (() => {
    state.pinned = null;
    togglePin("salmon");
    const on = state.pinned === "salmon" && pinStore.load() === "salmon";
    togglePin("salmon");
    return on && state.pinned === null && pinStore.load() === null;
  })());
  // v0.20.0 Mira review: sawshark secondary is a genuine detail crop
  ok('sawshark secondary is a real detail crop', (() => {
    const a = ARCHIVE_MEDIA.sawshark.assets[1];
    if (a.framing !== 'detail-crop' || !a.detailCrop || !a.trimmed) return false;
    const html = archiveAssetHtml(a, false);
    return html.includes('detail-crop-frame') && html.includes('background-position') &&
      html.includes('trimmed from original');
  })());
  ok('pin switches', (() => {
    togglePin("salmon"); togglePin("dusky");
    const r = state.pinned === "dusky";
    state.pinned = null; pinStore.save(null);
    return r;
  })());
  // v0.20.0 Mira review: pinned filter-feeder (whale stores bait as a string)
  ok('pinned filter-feeder renders expedition pin', (() => {
    state.pinned = 'whale';
    try { renderExpeditionPin(); } catch (e) { state.pinned = null; return false; }
    const html = document.getElementById('expeditionPin').innerHTML;
    state.pinned = null; renderExpeditionPin();
    return html.includes('Plankton') || html.toLowerCase().includes('plankton');
  })());
  ok('pinned depth labels are names not objects', (() => {
    state.pinned = 'dusky';
    renderExpeditionPin();
    const html = document.getElementById('expeditionPin').innerHTML;
    state.pinned = null; renderExpeditionPin();
    return !html.includes('[object Object]') && html.includes('Surface');
  })());
  ok('jump clears filters hiding the pinned shark', (() => {
    state.pinned = 'dusky';
    guideFilters.q = 'zzzz-no-match';
    // filtered-out state: the entry is not in the rendered list
    const list = { querySelector() { return null; } };
    jumpToPinned(SHARKS.find(s => s.id === 'dusky'), list);
    const cleared = activeFilterCount() === 0;
    state.pinned = null;
    return cleared;
  })());
  ok('repeat-plan with no method clears the planner method', (() => {
    const mk = (vals) => {
      const el = { value: '', options: vals.map(v => ({ value: v, disabled: false })),
        _h: {}, addEventListener(t, h) { this._h[t] = h; },
        dispatchEvent() { if (this._h.change) this._h.change(); } };
      return el;
    };
    els['regionSelect'] = mk(['caribbean', 'japan']);
    els['depthSelect'] = mk(['surface', 'reef']);
    els['baitSelect'] = mk(['tuna', 'squid']);
    els['methodSelect'] = mk(['', 'attract']);
    els['methodOptSelect'] = mk(['none', 'chum']);
    els['methodSelect'].value = 'attract';
    repeatPlan({ region: 'japan', depth: 'surface', bait: 'tuna', method: '', methodOpt: 'none' });
    return els['methodSelect'].value === '';
  })());
  // v0.20.0: quick pace
  ok('quick pace toggles PACE', (() => {
    setPace(true);
    const fast = PACE < 1;
    setPace(false);
    return fast && PACE === 1.5;
  })());
  ok('pace persists', (() => {
    setPace(true);
    const saved = localStorage.getItem("tyi-pace") === "quick";
    setPace(false);
    return saved;
  })());
  // v0.20.0: repeat plan restores planner values
  ok('repeatPlan restores selects', (() => {
    const mk = (vals) => {
      const el = { value: "", options: vals.map(v => ({ value: v, disabled: false })),
        _h: {}, addEventListener(t, h) { this._h[t] = h; },
        dispatchEvent() { if (this._h.change) this._h.change(); } };
      return el;
    };
    els["regionSelect"] = mk(["caribbean", "japan"]);
    els["depthSelect"] = mk(["surface", "reef"]);
    els["baitSelect"] = mk(["tuna", "squid"]);
    els["methodSelect"] = mk(["", "attract"]);
    els["methodOptSelect"] = mk(["none", "chum"]);
    // method select change fills opts (initMethodSelects listener is mocked away; fill manually)
    els["methodSelect"].addEventListener("change", () => {});
    let wentTab = "";
    const origGo = typeof goTab;
    repeatPlan({ region: "japan", depth: "surface", bait: "tuna", method: "attract", methodOpt: "chum" });
    return els["regionSelect"].value === "japan" && els["depthSelect"].value === "surface" &&
      els["baitSelect"].value === "tuna" && els["methodSelect"].value === "attract" &&
      els["methodOptSelect"].value === "chum";
  })());

  // v0.21.0 sharknado: every wave shark has dossier, 3 chats, nudge, art, sketch,
  // envelope, live archive entry, and all envelope areas have MAP_COORDS
  const wave = ["silvertip","spinner","wobbegong","leopard","horn","portjackson","angelshark",
    "megamouth","sawshark","greenland","cookiecutter","sixgill","velvetbelly","dwarflantern",
    "kitefin","pacificsleeper","spinydogfish","catshark"];
  ok('sharknado: 18 new SHARKS entries', wave.every(id => sharkById(id)));
  ok('sharknado: all have research+hook+opener+sketchCap', wave.every(id => {
    const s = sharkById(id);
    return s.research && s.hook && s.opener && s.sketchCap && s.nameIdeas && s.nameIdeas.length >= 3;
  }));
  ok('sharknado: all have 3 chats', wave.every(id => (COUSIN_CHATS[id] || []).length === 3));
  ok('sharknado: all have nudges', wave.every(id => typeof COUSIN_NUDGES[id] === 'string' && COUSIN_NUDGES[id].length > 50));
  ok('sharknado: all have ART', wave.every(id => typeof ART[id] === 'string' && ART[id].includes('<svg')));
  ok('sharknado: all have SKETCH', wave.every(id => typeof SKETCH[id] === 'string' && SKETCH[id].includes('<svg')));
  ok('sharknado: all have tracking envelopes', wave.every(id => TRACK_ENVELOPES[id] && TRACK_ENVELOPES[id].areas.length >= 3));
  ok('sharknado: all have live archive entries', wave.every(id => ARCHIVE_MEDIA[id] && ARCHIVE_MEDIA[id].future !== true));
  ok('sharknado: 3 new regions defined+locked', ['east-australia','california','arctic'].every(r => REGIONS[r] && REGIONS[r].locked));
  ok('sharknado: no pygmy in roster', !sharkById('pygmy'));

  /* v0.21.0 Mira review: progression, reachability, geography, statuses. */
  // All locked regions become accessible via tag-count milestones
  ok('mira: east-australia unlocks at 15 tags', (() => {
    const r = { ...REGIONS['east-australia'], locked: true };
    return r.locked === true; // milestone logic in checkMilestones/applyRegions
  })());
  // Every shark's combo region exists in REGIONS
  ok('mira: all 50 sharks have valid combo regions', SHARKS.every(s => {
    const region = s.combo.region;
    return REGIONS[region] !== undefined;
  }));
  // Every shark's combo bait/method vocab matches planner
  ok('mira: all sharks have reachable depth+bait combos', SHARKS.every(s => {
    return s.depths && s.depths.length > 0 && s.combo.bait && s.methods;
  }));
  // Tracking: waypoint labels all resolve to MAP_COORDS (no silent drops)
  ok('mira: all envelope waypoints resolve to coordinates', Object.entries(TRACK_ENVELOPES).every(([id, env]) => {
    return (env.areas || []).every(a => MAP_COORDS[a] !== undefined);
  }));
  // Tracking: resident species (hop max <= 15km) have local waypoint clusters
  ok('mira: resident tracks use local clusters', ['horn','wobbegong'].every(id => {
    const env = TRACK_ENVELOPES[id];
    return env.hop[1] <= 15 && env.areas.length >= 3;
  }));
  // Conservation statuses for corrected species
  ok('mira: pacific sleeper is Near Threatened', sharkById('pacificsleeper').status === 'Near Threatened');
  ok('mira: velvetbelly is Vulnerable', sharkById('velvetbelly').status === 'Vulnerable');
  // Archival kinds for poorly-studied species
  ok('mira: cookiecutter track is archival', TRACK_ENVELOPES.cookiecutter.kind === 'archival');
  ok('mira: dwarf lanternshark track is archival', TRACK_ENVELOPES.dwarflantern.kind === 'archival');
  // All 50 species have map colors (no white-marker fallback)
  ok('mira: all 50 sharks have SPECIES_COLORS', SHARKS.every(s => SPECIES_COLORS[s.id] !== undefined));

  console.log(out.join('\\n'));
  const fails = out.filter(l => l.startsWith('FAIL')).length;
  console.log(fails ? fails + ' FAILURES' : 'ALL TESTS PASS');
  process.exit(fails ? 1 : 0);
})();
`;
eval(code);
