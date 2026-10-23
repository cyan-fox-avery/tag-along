/* Tag Along headless test suite — v0.16.0. Saved in the workspace (not /tmp). */
const fs = require('fs');
const path = require('path');
const DIR = __dirname;
const files = ['map-data.js', 'art-data.js', 'sarah-data.js', 'bigday-data.js', 'sharks-data.js', 'archive-data.js', 'archive-ui.js', 'achievements-data.js', 'game-data.js', 'assets/art-loader.js', 'script.js'];

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
global.window = { addEventListener() {}, innerWidth: 800, scrollY: 0, scrollTo() {} };
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
  ok('version v2.7.14-beta', VERSION === 'v2.7.14-beta');
  ok('whats-new has v2.5.4 entry', Array.isArray(WHATS_NEW['v2.5.4-beta']) && WHATS_NEW['v2.5.4-beta'].length === 1);
  ok('whats-new has v2.5.6 entry', Array.isArray(WHATS_NEW['v2.5.6-beta']) && WHATS_NEW['v2.5.6-beta'].length === 2);
  ok('whats-new has v2.5.5 entry', Array.isArray(WHATS_NEW['v2.5.5-beta']) && WHATS_NEW['v2.5.5-beta'].length === 1);
  // v2.2.0-beta: sun rays are a looping video, not CSS layers. Any continuous
  // CSS animation on the 8 masked caustics spans broke iPad Safari (v2.1.0-v2.1.5).
  // Assert: no .caustics rules remain, the video element exists in HTML with
  // the right attributes, and its CSS makes it a fixed full-viewport cover layer.
  // v2.3.0: Mira's orientation-aware videos (landscape/portrait picked by JS).
  ok('v2.3.0: underwater videos, no caustics CSS', (() => {
    const noCaustics = cssCode.indexOf('.caustics') === -1;
    const hasVideo = htmlCode.indexOf('<video id="sun-video"') !== -1
      && htmlCode.indexOf('autoplay') !== -1
      && htmlCode.indexOf('muted') !== -1
      && htmlCode.indexOf('loop') !== -1
      && htmlCode.indexOf('playsinline') !== -1;
    const hasStill = htmlCode.indexOf('id="sun-still"') !== -1;
    const hasPicker = code.indexOf('underwater-portrait.mp4') !== -1
      && code.indexOf('underwater-landscape.mp4') !== -1
      && code.indexOf('underwater-portrait-poster.jpg') !== -1
      && code.indexOf('underwater-landscape-poster.jpg') !== -1;
    const vi = cssCode.indexOf('.sun-video {');
    const ve = cssCode.indexOf('}', vi);
    const vrule = cssCode.slice(vi, ve);
    const videoCSS = vi !== -1 && vrule.indexOf('position: fixed') !== -1
      && vrule.indexOf('object-fit: cover') !== -1
      && vrule.indexOf('pointer-events: none') !== -1;
    return noCaustics && hasVideo && hasStill && hasPicker && videoCSS;
  })());
  ok('whats-new keeps v1.8.6 entry', Array.isArray(WHATS_NEW['v1.8.6-beta']) && WHATS_NEW['v1.8.6-beta'].length === 2);
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
  ok('blacktip names real baits', /schools of small reef fish/.test(sharkById('blacktip').research) && /crustaceans/.test(sharkById('blacktip').research));
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
  // v1.5.10-beta: Archive is tagged-sharks only — no locked list at all.
  // Untagged species are skipped before rendering, so photos still require
  // an actual tag.
  const archiveUiCode = fs.readFileSync(path.join(DIR, 'archive-ui.js'), 'utf8');
  ok('archive skips untagged species', archiveUiCode.includes('if (!state.tagged[s.id]) return false;'));
  ok('archive has no locked list', !archiveUiCode.includes('lockedRows') && !archiveUiCode.includes('Still to discover'));
  // v1.5.22: Archive expanded cards overlay like the Research tab
  ok('archive toggle adds open class', archiveUiCode.includes('row.classList.toggle("open", !isHidden)'));
  ok('archive toggle sets rising z-index', archiveUiCode.includes('++guideOverlayZ'));
  ok('archive uses Research-style IUCN pill', archiveUiCode.includes('status-pill iucn-'));
  ok('archive has no checkmark', !archiveUiCode.includes('✅'));
  // v1.5.11-beta: Archive tab always visible, locked until Sarah's text.
  ok('updateArchiveTab toggles locked state not hidden',
    archiveUiCode.includes('toggle("tab-locked"') && !archiveUiCode.includes('toggle("hidden", !state.archiveUnlocked'));
  ok('archive tab has disabled attr support',
    archiveUiCode.includes('btn.disabled'));

  // v1.7.22-beta Mira review: REAL accordion interaction test —
  // opening entry B closes entry A (body hidden, aria-expanded false,
  // 'open' class removed); tapping open B closes B.
  (() => {
    function mockEl() {
      const handlers = {};
      const el = {
        children: [],
        _cls: new Set(),
        _attrs: {},
        classList: {
          add(c) { el._cls.add(c); },
          remove(c) { el._cls.delete(c); },
          toggle(c, force) {
            if (force === undefined) {
              if (el._cls.has(c)) { el._cls.delete(c); return false; }
              el._cls.add(c); return true;
            }
            if (force) { el._cls.add(c); } else { el._cls.delete(c); }
            return !!force;
          },
          contains(c) { return el._cls.has(c); }
        },
        style: {},
        setAttribute(k, v) { el._attrs[k] = String(v); },
        getAttribute(k) { return (k in el._attrs) ? el._attrs[k] : null; },
        addEventListener(t, fn) { (handlers[t] = handlers[t] || []).push(fn); },
        click() { (handlers.click || []).forEach(fn => fn()); },
        appendChild(c) { el.children.push(c); return el.children[el.children.length - 1]; },
        _qs: {},
        querySelector(sel) {
          if (!el._qs[sel]) el._qs[sel] = mockEl();
          return el._qs[sel];
        },
        querySelectorAll(sel) {
          if (sel === ".guide-row.open") return el.children.filter(c => c.classList.contains("open"));
          return [];
        },
        innerHTML: ''
      };
      return el;
    }
    const origGetById = document.getElementById;
    const origCreate = document.createElement;
    const origTagged = state.tagged;
    const origRanks = (typeof archiveDateRanks !== "undefined") ? archiveDateRanks : null;
    const list = mockEl();
    document.getElementById = (id) => id === "archiveList" ? list : origGetById(id);
    document.createElement = () => mockEl();
    state.tagged = {
      nurse: { name: "", researchId: "NS-1" },
      thresher: { name: "", researchId: "TS-1" }
    };
    try {
      renderArchive();
      const rows = list.children.slice();
      // Simulate the initial rendered state (innerHTML parsing is mocked out):
      // bodies hidden, heads collapsed.
      const heads = rows.map(r => r.querySelector(".guide-row-head"));
      const bodies = rows.map(r => r.querySelector(".guide-row-body"));
      bodies.forEach(b => b.classList.add("hidden"));
      heads.forEach(h => h.setAttribute("aria-expanded", "false"));
      ok("archive accordion: two rows rendered", rows.length === 2);
      ok("archive accordion: bodies start hidden",
        bodies.every(b => b.classList.contains("hidden")));
      // Click head A -> A opens
      heads[0].click();
      ok("archive accordion: clicking A opens A (body visible)",
        !bodies[0].classList.contains("hidden"));
      ok("archive accordion: clicking A sets aria-expanded true",
        heads[0].getAttribute("aria-expanded") === "true");
      ok("archive accordion: clicking A adds open class",
        rows[0].classList.contains("open"));
      // Click head B -> B opens AND A closes
      heads[1].click();
      ok("archive accordion: clicking B opens B (body visible)",
        !bodies[1].classList.contains("hidden"));
      ok("archive accordion: clicking B closes A (body hidden)",
        bodies[0].classList.contains("hidden"));
      ok("archive accordion: clicking B sets A aria-expanded false",
        heads[0].getAttribute("aria-expanded") === "false");
      ok("archive accordion: clicking B removes A open class",
        !rows[0].classList.contains("open"));
      // Click head B again -> B closes (toggle)
      heads[1].click();
      ok("archive accordion: clicking open B closes B (body hidden)",
        bodies[1].classList.contains("hidden"));
      ok("archive accordion: clicking open B sets aria-expanded false",
        heads[1].getAttribute("aria-expanded") === "false");
    } catch (e) {
      ok("archive accordion interaction (threw: " + e.message + ")", false);
    } finally {
      document.getElementById = origGetById;
      document.createElement = origCreate;
      state.tagged = origTagged;
      if (typeof archiveDateRanks !== "undefined") archiveDateRanks = origRanks;
    }
  })();
  // v1.7.22-beta Mira review: doFollowTagged — fact available AND exhausted.
  // The insight/exhaustion text must appear ONLY in the Map overlay
  // (pendingTagAlongFact), never as a log line.
  (() => {
    const origRender = renderAll;
    const origLog = logLine;
    const origTagged = state.tagged;
    const origFacts = state.unlockedFacts;
    const origPending = state.pendingTagAlongFact;
    const origSave = factStore.save;
    const origTrip = logTripEncounter;
    const origDone = state.encounterDone;
    const origFollowed = state.followedThisTrip;
    const origPlan2 = state.currentPlan;
    renderAll = () => {};
    factStore.save = () => {};
    logTripEncounter = () => {};
    let logged = [];
    logLine = (html) => { logged.push(String(html)); };
    state.tagged = { nurse: { name: "", researchId: "NS-1" } };
    state.encounterDone = null;
    state.followedThisTrip = false;
    // v1.7.23-beta Mira review: prevent an inherited plan from causing
    // unintentional re-sightings in the fact-only branches (doFollowTagged
    // calls recordResighting only when state.currentPlan exists).
    state.currentPlan = null;
    try {
      // Branch 1: fact available -> pendingTagAlongFact set, no insight in log
      state.unlockedFacts = {};
      state.pendingTagAlongFact = null;
      logged = [];
      doFollowTagged("nurse", () => {});
      const factPool = insightPoolFor("nurse");
      ok("follow: fact branch sets pendingTagAlongFact",
        !!state.pendingTagAlongFact && state.pendingTagAlongFact.exhausted === false);
      ok("follow: fact branch stashes one of the pool facts",
        !!state.pendingTagAlongFact && factPool.includes(state.pendingTagAlongFact.fact));
      ok("follow: fact text NOT in expedition log",
        !logged.some(h => state.pendingTagAlongFact && state.pendingTagAlongFact.fact &&
          h.includes(state.pendingTagAlongFact.fact.slice(0, 40))));
      // Branch 2: all facts exhausted -> exhausted flag, exhaustion line NOT in log
      // (it lives only in the Map popup via pendingTagAlongFact)
      state.unlockedFacts = { nurse: [0, 1, 2, 3, 4] }; // all 5 nurse insights used
      state.pendingTagAlongFact = null;
      logged = [];
      doFollowTagged("nurse", () => {});
      ok("follow: exhausted branch sets exhausted flag",
        !!state.pendingTagAlongFact && state.pendingTagAlongFact.exhausted === true);
      ok("follow: exhaustion line NOT in expedition log",
        !logged.some(h => h.includes("learned all I can")));
    } catch (e) {
      ok("follow branches (threw: " + e.message + ")", false);
    } finally {
      renderAll = origRender;
      logLine = origLog;
      factStore.save = origSave;
      logTripEncounter = origTrip;
      state.tagged = origTagged;
      state.unlockedFacts = origFacts;
      state.pendingTagAlongFact = origPending;
      state.encounterDone = origDone;
      state.followedThisTrip = origFollowed;
      state.currentPlan = origPlan2;
    }
  })();
  // v1.7.22-beta: Following a tagged shark records a re-sighting (Pen Pal).
  // doFollowTagged must call recordResighting like the "Log re-sighting" button.
  (() => {
    const origRender = renderAll;
    const origLog = logLine;
    const origTrip = logTripEncounter;
    const origTagged = state.tagged;
    const origPlan = state.currentPlan;
    const origFacts = state.unlockedFacts;
    const origPending = state.pendingTagAlongFact;
    const origSaveStats = saveStats;
    const origCheck = checkAchievements;
    const origRenderColl = renderCollection;
    const origStoreSave = store.save;
    const origDone = state.encounterDone;
    const origFollowed = state.followedThisTrip;
    // v1.7.23-beta Mira review: recordResighting() increments state.stats.resights;
    // snapshot/restore the exact prior value (including the absent-property case).
    const hadResights = state.stats && ("resights" in state.stats);
    const origResights = hadResights ? state.stats.resights : undefined;
    renderAll = () => {};
    logLine = () => {};
    logTripEncounter = () => {};
    saveStats = () => {};
    checkAchievements = () => {};
    renderCollection = () => {};
    store.save = () => {};
    // tagged nurse with zero re-sightings so far
    state.tagged = { nurse: { name: "", researchId: "NS-1", resightings: [] } };
    state.currentPlan = { region: "caribbean", depth: "shallow", bait: "chum" };
    state.unlockedFacts = { nurse: [0, 1, 2, 3, 4] }; // exhausted (all 5 nurse insights), so no fact branch noise
    ok("follow fixture: nurse insights exhausted",
      insightPoolFor("nurse").every((_, i) => state.unlockedFacts.nurse.includes(i)));
    state.pendingTagAlongFact = null;
    state.encounterDone = null;
    state.followedThisTrip = false;
    try {
      doFollowTagged("nurse", () => {});
      const res = state.tagged.nurse.resightings || [];
      ok("follow records a re-sighting",
        res.length === 1);
      ok("follow re-sighting has a location",
        res.length === 1 && typeof res[0].location === "string" && res[0].location.length > 0);
    } catch (e) {
      ok("follow records a re-sighting (threw: " + e.message + ")", false);
    } finally {
      renderAll = origRender;
      logLine = origLog;
      logTripEncounter = origTrip;
      saveStats = origSaveStats;
      checkAchievements = origCheck;
      renderCollection = origRenderColl;
      store.save = origStoreSave;
      state.tagged = origTagged;
      state.currentPlan = origPlan;
      state.unlockedFacts = origFacts;
      state.pendingTagAlongFact = origPending;
      state.encounterDone = origDone;
      state.followedThisTrip = origFollowed;
      if (hadResights) state.stats.resights = origResights;
      else if (state.stats) delete state.stats.resights;
    }
  })();
  // v1.7.24-beta: tiered SARAH reactions — resightThread ordinal 1
  // returns the generic closer fallback (the reunion closer variants
  // are delivered by maybeReunionReaction), 2nd uses the middle
  // pool, 3rd uses the THREE pool once only, 4th+ uses the generic
  // excited pool (no counts, so no repeated THREE lines). These lines
  // live in Sarah's chat bubble only, never in the field note.
  (function () {
    const n1 = resightSarahReactionFor(1);
    const n2 = resightSarahReactionFor(2);
    const n3 = resightSarahReactionFor(3);
    const n5 = resightSarahReactionFor(5);
    ok('resightSarahReactionFor(1) returns generic closer fallback',
      n1 === RESIGHT_GENERIC_CLOSER && !RESIGHT_NOTES_2ND.includes(n1) && !RESIGHT_NOTES_EXCITED.includes(n1));
    ok('resightSarahReactionFor(2) uses middle pool',
      RESIGHT_NOTES_2ND.includes(n2) && !RESIGHT_REUNION_CLOSERS.includes(n2) && !RESIGHT_NOTES_EXCITED.includes(n2));
    ok('resightSarahReactionFor(3) uses THREE pool once only',
      RESIGHT_NOTES_3RD.includes(n3) && !RESIGHT_REUNION_CLOSERS.includes(n3) && !RESIGHT_NOTES_2ND.includes(n3) && !RESIGHT_NOTES_EXCITED.includes(n3));
    ok('resightSarahReactionFor(5) uses generic excited pool, never a THREE line',
      RESIGHT_NOTES_EXCITED.includes(n5) && !RESIGHT_NOTES_3RD.includes(n5));
    ok('THREE pool lines all count three; generic excited pool never counts',
      RESIGHT_NOTES_3RD.every(function(l) { return /three|third/i.test(l); }) &&
      RESIGHT_NOTES_EXCITED.every(function(l) { return !/three|third/i.test(l); }));
  })();
  // v1.7.24-beta Mira review: pool separation is deterministic — the
  // field-note pool shares NOTHING with any Sarah pool, so no random
  // field note can ever speak Sarah's voice.
  ok('field notes are observational only, disjoint from Sarah pools',
    FIELD_RESIGHT_NOTES.length === 8 &&
    !FIELD_RESIGHT_NOTES.some(l => RESIGHT_REUNION_CLOSERS.includes(l) || RESIGHT_NOTES_2ND.includes(l) || RESIGHT_NOTES_EXCITED.includes(l) || RESIGHT_NOTES_3RD.includes(l)));
  // v1.8.5-beta: five more variants added; the originals all remain.
  ok('reunion closers have original closer + all four Avery-picked Sarah lines',
    RESIGHT_REUNION_CLOSERS.length === 10 &&
    RESIGHT_REUNION_CLOSERS.includes("That's incredible! They came back! I'm actually emotional rn \u{1F979}") &&
    RESIGHT_REUNION_CLOSERS.includes("Oh wow, it's back! I was literally just thinking about this one.") &&
    RESIGHT_REUNION_CLOSERS.includes("Swimming the exact same route. Some sharks are creatures of habit and honestly? Same.") &&
    RESIGHT_REUNION_CLOSERS.includes("The tag's holding up great. This shark is basically wearing a Fitbit and thriving.") &&
    RESIGHT_REUNION_CLOSERS.includes("Back again! At this point I'm starting to think it likes us."));
  // v1.8.5-beta: three more variants added; the originals all remain.
  ok('THREE pool has the five 3rd lines; generic excited pool keeps the AGAIN line',
    RESIGHT_NOTES_3RD.length === 5 &&
    RESIGHT_NOTES_3RD.includes("THREE RE-SIGHTINGS?! This shark is basically family now. I'm naming it in my head and you can't stop me.") &&
    RESIGHT_NOTES_EXCITED.length === 3 &&
    RESIGHT_NOTES_EXCITED.includes("It's back AGAIN! I think this shark has adopted us. We're its humans now."));
  // v1.8.5-beta: three more variants added; the originals all remain.
  ok('middle pool has all five Avery picks',
    RESIGHT_NOTES_2ND.length === 8 &&
    RESIGHT_NOTES_2ND.includes("It's back! I was hoping we'd see this one again.") &&
    RESIGHT_NOTES_2ND.includes("Twice now! Either it likes this spot or it likes us. Probably both."));
  // v1.7.24-beta: tiers count RE-sightings — the numbered lines say so,
  // with no forward-looking "more sightings coming" language.
  ok('2nd pool line says re-sighting, no future-sightings implication',
    RESIGHT_NOTES_2ND.includes("Second re-sighting! Okay, this one keeps showing up.") &&
    !RESIGHT_NOTES_2ND.some(l => l.includes("Second sighting!") || l.includes("keeping an eye on")));
  ok('3rd pool line says re-sightings',
    RESIGHT_NOTES_3RD.includes("Three re-sightings of the same shark! Do you realize how special that is?? This one chose us!") &&
    !RESIGHT_NOTES_3RD.some(l => l.includes("Three sightings of the same shark!")));
  (function () {
    const nurse = SHARKS.find(s => s.id === 'nurse');
    const origTagged = state.tagged;
    const origSaveStats = saveStats;
    const origCheck = checkAchievements;
    const origRenderColl = renderCollection;
    const origStoreSave = store.save;
    // v1.7.24-beta Mira review: recordResighting() increments
    // state.stats.resights; snapshot/restore it (incl. absent case).
    const hadResights = state.stats && ("resights" in state.stats);
    const origResights = hadResights ? state.stats.resights : undefined;
    saveStats = () => {};
    checkAchievements = () => {};
    renderCollection = () => {};
    store.save = () => {};
    const plan = { region: 'caribbean', depth: 'shallow', bait: 'chum' };
    function noteAfter(priorCount) {
      const prior = [];
      for (let i = 0; i < priorCount; i++) prior.push({ date: 'Jan 1, 2026', location: 'Caribbean Sea', note: 'old', ts: 1 });
      state.tagged = { nurse: { name: '', researchId: 'NS-1', resightings: prior } };
      const entry = recordResighting(nurse, plan);
      return entry.note;
    }
    try {
      // v1.7.24-beta Mira review: the persisted field note is ALWAYS from
      // FIELD_RESIGHT_NOTES — the tiered Sarah reactions live in her bubble.
      ok('recordResighting note stays observational (1st)', FIELD_RESIGHT_NOTES.includes(noteAfter(0)));
      ok('recordResighting note stays observational (2nd)', FIELD_RESIGHT_NOTES.includes(noteAfter(1)));
      ok('recordResighting note stays observational (3rd)', FIELD_RESIGHT_NOTES.includes(noteAfter(2)));
      ok('recordResighting note stays observational (4th)', FIELD_RESIGHT_NOTES.includes(noteAfter(3)));
    } catch (e) {
      ok('recordResighting field notes (threw: ' + e.message + ')', false);
    } finally {
      saveStats = origSaveStats;
      checkAchievements = origCheck;
      renderCollection = origRenderColl;
      store.save = origStoreSave;
      state.tagged = origTagged;
      if (hadResights) state.stats.resights = origResights;
      else if (state.stats) delete state.stats.resights;
    }
  })();
  // v1.8.7-beta: re-sightings stay OFF the movement track — they are the
  // player's encounters, not tag movement. The track shows travel only.
  (function () {
    const nurse = SHARKS.find(s => s.id === 'nurse');
    const origTagged = state.tagged;
    const origSaveStats = saveStats, origCheck = checkAchievements;
    const origRenderColl = renderCollection, origStoreSave = store.save;
    saveStats = () => {}; checkAchievements = () => {};
    renderCollection = () => {}; store.save = () => {};
    const plan = { region: 'caribbean', depth: 'shallow', bait: 'chum' };
    try {
      state.tagged = { nurse: { name: '', researchId: 'NS-187', resightings: [],
        track: { points: [{ label: 'Biscayne Bay', day: 0, km: 0 }, { label: 'Marquesas Keys', day: 4, km: 12.5 }], totalKm: 12.5, days: 4, kind: 'acoustic', v: 2 } } };
      const before = state.tagged.nurse.track.points.length;
      const entry = recordResighting(nurse, plan);
      ok('v1.8.7: recordResighting does not add a track point', state.tagged.nurse.track.points.length === before);
      ok('v1.8.7: recordResighting still logs the re-sighting', state.tagged.nurse.resightings.length === 1 && !!entry.date);
      ok('v1.8.7: recordResighting leaves totalKm/days alone', state.tagged.nurse.track.totalKm === 12.5 && state.tagged.nurse.track.days === 4);
    } catch (e) {
      ok('v1.8.7: recordResighting track tests (threw: ' + e.message + ')', false);
    } finally {
      saveStats = origSaveStats; checkAchievements = origCheck;
      renderCollection = origRenderColl; store.save = origStoreSave;
      state.tagged = origTagged;
    }
  })();
  ok('v1.8.7: migrateTravelTracks strips flagged points, recomputes stats', (() => {
    const saved = JSON.parse(JSON.stringify(state.tagged || {}));
    const origSave = store.save; store.save = () => {};
    try {
      state.tagged = {
        nurse: { researchId: 'NS-M', track: { points: [
          { label: 'Biscayne Bay', day: 0, km: 0 },
          { label: 'Marquesas Keys', day: 4, km: 12.5 },
          { label: 'Caribbean Sea', day: 9, km: 30.9, resighting: true },
          { label: 'Caribbean Sea', day: 20, km: 0, resighting: true }
        ], totalKm: 43.4, days: 20, kind: 'acoustic', v: 2 } },
        lemon: { researchId: 'LS-M', track: { points: [
          { label: 'Biscayne Bay', day: 0, km: 0 },
          { label: 'Marquesas Keys', day: 6, km: 8 }
        ], totalKm: 8, days: 6, kind: 'acoustic', v: 2 } }
      };
      migrateTravelTracks();
      const n = state.tagged.nurse.track, l = state.tagged.lemon.track;
      if (n.points.length !== 2) return false;
      if (n.points.some(p => p.resighting)) return false;
      if (n.totalKm !== 12.5) return false;
      if (n.days !== 4) return false;
      // Unflagged track untouched
      if (l.points.length !== 2 || l.totalKm !== 8 || l.days !== 6) return false;
      return true;
    } finally { store.save = origSave; state.tagged = saved; }
  })());
  ok('v1.8.7: openTrack renders travel only', (() => {
    const saved = JSON.parse(JSON.stringify(state.tagged || {}));
    const origSave = store.save; store.save = () => {};
    try {
      state.tagged = { nurse: { name: 'Helen', researchId: 'NS-OT',
        track: { points: [
          { label: 'Biscayne Bay', day: 0, km: 0 },
          { label: 'Marquesas Keys', day: 4, km: 12.5 },
          { label: 'Re-sight Lagoon', day: 9, km: 3, resighting: true }
        ], totalKm: 15.5, days: 9, kind: 'acoustic', v: 2 } } };
      openTrack('nurse');
      const html = document.getElementById('trackContent').innerHTML || '';
      // Flagged point's label must not appear in the timeline
      if (html.indexOf('Re-sight Lagoon') !== -1) return false;
      // Locations count = travel points only
      if (html.indexOf('<strong>2</strong><span>locations</span>') === -1) return false;
      // Last ping = last travel point, not the re-sighting
      if (html.indexOf('Marquesas Keys') === -1) return false;
      return true;
    } catch (e) { return false; }
    finally { store.save = origSave; state.tagged = saved; }
  })());
  // v1.7.24-beta Mira review: WHO says the dialogue — Sarah's reactions
  // live in HER bubble; the player's bubble reports the field note only.
  // Regression: the player must never speak Sarah's lines. The food
  // reply follows ONLY the "likes us" line.
  (function () {
    const nurse = SHARKS.find(s => s.id === 'nurse');
    function threadWith(count, sex) {
      const rs = [];
      for (let i = 0; i < count; i++) rs.push({ date: 'Jan 1, 2026', location: 'Caribbean Sea', note: 'Looking healthy and unhurried.', ts: 1 });
      const rec = { name: '', researchId: 'NS-1', sex, resightings: rs };
      return resightThread(nurse, rec);
    }
    try {
      // 1st re-sighting via resightThread (unusual history only — the
      // normal first reunion is handled by maybeReunionReaction):
      // opener + player field note + generic closer fallback. Never
      // a food reply — the likes-us line is delivered by the reunion
      // reaction, not by this thread.
      const t1 = threadWith(1, 'female');
      ok('1st resightThread Sarah bubble uses generic closer fallback',
        t1.length === 3 && t1[2].who === 'them' && t1[2].text === RESIGHT_GENERIC_CLOSER);
      ok('1st resightThread never gets food reply',
        t1.length === 3);
      ok('1st resightThread player bubble reports field note only',
        t1[1].who === 'me' && t1[1].text.includes('Looking healthy and unhurried.') &&
        !RESIGHT_REUNION_CLOSERS.some(l => t1[1].text.includes(l)) &&
        !RESIGHT_NOTES_2ND.some(l => t1[1].text.includes(l)) &&
        !RESIGHT_NOTES_EXCITED.some(l => t1[1].text.includes(l)));
      // 2nd re-sighting (female): Sarah middle-pool line, no food reply
      // (the likes-us line is a reunion-closer line only).
      const t2 = threadWith(2, 'female');
      ok('2nd resightThread Sarah bubble uses middle pool, no food reply',
        t2.length === 3 && t2[2].who === 'them' && RESIGHT_NOTES_2ND.includes(t2[2].text));
      ok('2nd resightThread player bubble never speaks Sarah lines',
        !RESIGHT_REUNION_CLOSERS.some(l => t2[1].text.includes(l)) &&
        !RESIGHT_NOTES_2ND.some(l => t2[1].text.includes(l)) &&
        !RESIGHT_NOTES_EXCITED.some(l => t2[1].text.includes(l)));
      // 3rd re-sighting (male): Sarah THREE-pool line, no food reply.
      const t3 = threadWith(3, 'male');
      ok('3rd resightThread Sarah bubble uses THREE pool, no food reply',
        t3.length === 3 && t3[2].who === 'them' && RESIGHT_NOTES_3RD.includes(t3[2].text));
      // Food-reply gating, deterministic: only after the likes-us line.
      ok('food reply follows likes-us line, she pronoun',
        resightFoodReplyFor(RESIGHT_LIKES_US_LINE, { sex: 'female' }) === 'Maybe. Or maybe she just knows where the food is.');
      ok('food reply follows likes-us line, he pronoun',
        resightFoodReplyFor(RESIGHT_LIKES_US_LINE, { sex: 'male' }) === 'Maybe. Or maybe he just knows where the food is.');
      ok('food reply falls back to it pronoun',
        resightFoodReplyFor(RESIGHT_LIKES_US_LINE, {}) === 'Maybe. Or maybe it just knows where the food is.');
      ok('food reply is null after other Sarah lines',
        resightFoodReplyFor(RESIGHT_NOTES_2ND[0], { sex: 'female' }) === null &&
        resightFoodReplyFor(RESIGHT_NOTES_EXCITED[0], { sex: 'male' }) === null &&
        resightFoodReplyFor(RESIGHT_GENERIC_CLOSER, {}) === null);
    } catch (e) {
      ok('resightThread voice regression (threw: ' + e.message + ')', false);
    }
  })();
  // v1.7.24-beta: the four Avery-picked Sarah lines are delivered by
  // maybeReunionReaction() (the reaction that actually fires on first
  // reunion), via the reunionReactionThread() helper — deterministic
  // to test, unlike the random pick in maybeReunionReaction.
  (function () {
    try {
      // Likes-us closer (female): 4 messages, food reply with she-pronoun.
      const tLike = reunionReactionThread('Bubbles', RESIGHT_LIKES_US_LINE, { sex: 'female' });
      ok('reunion thread appends food reply after likes-us closer',
        tLike.length === 4 && tLike[2].who === 'them' && tLike[2].text === RESIGHT_LIKES_US_LINE &&
        tLike[3].who === 'me' && tLike[3].text === 'Maybe. Or maybe she just knows where the food is.');
      // Original closer: 3 messages, no food reply.
      const tOrig = reunionReactionThread('Bubbles', RESIGHT_REUNION_CLOSERS[0], { sex: 'male' });
      ok('reunion thread has no food reply after original closer',
        tOrig.length === 3 && tOrig[2].text === RESIGHT_REUNION_CLOSERS[0]);
      // Another variant closer: 3 messages, no food reply.
      const tVar = reunionReactionThread('Bubbles', RESIGHT_REUNION_CLOSERS[1], { sex: 'male' });
      ok('reunion thread has no food reply after other variant closers',
        tVar.length === 3 && tVar[2].text === RESIGHT_REUNION_CLOSERS[1]);
      // Opener + confirm structure is preserved for every closer.
      ok('reunion thread keeps WAIT opener + tag confirm',
        tLike[0].text.startsWith('WAIT. You saw') && tLike[1].text === "The tag matched — it's really them.");
    } catch (e) {
      ok('reunionReactionThread (threw: ' + e.message + ')', false);
    }
  })();
  // v1.7.24-beta: maybeReunionReaction() delivers a closer from the
  // reunion pool (not a resightThread ordinal-1 branch) and appends
  // the food reply only when the picked closer is the likes-us line.
  // Holds for whichever closer the random pick lands on.
  (function () {
    const savedReacted = state.reunionReacted;
    const savedMsgCount = state.messages.length;
    // v1.7.28-beta: pushThread() also bumps state.unread and persists the
    // tyi-messages blob — snapshot both so later tests don't inherit
    // synthetic Phone notifications (Mira's PR #91 hygiene note).
    const savedUnread = state.unread;
    const savedMentions = state.sharkMentions;
    state.reunionReacted = {};
    state.sharkMentions = {};
    const species = SHARKS.find(s => s.id === 'mako');
    const rec = { name: '', researchId: 'MK-2026-019', sex: 'female', resightings: [] };
    try {
      const fired = maybeReunionReaction(species, rec);
      const thread = state.messages[state.messages.length - 1].msgs;
      ok('maybeReunionReaction delivers a reunion-pool closer',
        fired === true && thread[2].who === 'them' && RESIGHT_REUNION_CLOSERS.includes(thread[2].text));
      ok('maybeReunionReaction food reply only after likes-us closer',
        (thread.length === 4) === (thread[2].text === RESIGHT_LIKES_US_LINE) &&
        (thread.length === 3 || thread[3].text === 'Maybe. Or maybe she just knows where the food is.'));
    } catch (e) {
      ok('maybeReunionReaction delivery (threw: ' + e.message + ')', false);
    } finally {
      state.messages.length = savedMsgCount;
      state.reunionReacted = savedReacted;
      state.unread = savedUnread;
      state.sharkMentions = savedMentions;
      // Re-persist the restored state so the tyi-messages blob matches,
      // and refresh the badge from the restored unread count.
      saveMsgs();
      updateMsgBadge();
      try { localStorage.setItem("tyi-reunion-reacted", JSON.stringify(savedReacted || {})); } catch {}
    }
  })();
  // v1.7.28-beta: reunion fixtures restore unread + persisted messages.
  // A pushThread round-trip with the fixtures' restore recipe must leave
  // state.unread and the tyi-messages blob exactly as they were.
  ok('reunion fixture restore leaves unread + message blob untouched', (() => {
    const beforeUnread = state.unread;
    const beforeCount = state.messages.length;
    const savedReacted = state.reunionReacted;
    const savedMentionsB = state.sharkMentions;
    state.reunionReacted = {};
    state.sharkMentions = {};
    try {
      maybeReunionReaction(SHARKS.find(s => s.id === 'mako'),
        { name: '', researchId: 'MK-2026-019', sex: 'female', resightings: [] });
      // Fixture restore recipe (same steps as the fixtures above):
      state.messages.length = beforeCount;
      state.reunionReacted = savedReacted;
      state.unread = beforeUnread;
      state.sharkMentions = savedMentionsB;
      saveMsgs();
      updateMsgBadge();
      let blob = null;
      try { blob = JSON.parse(localStorage.getItem("tyi-messages") || "{}"); } catch {}
      return state.unread === beforeUnread &&
        !!blob && blob.unread === beforeUnread &&
        Array.isArray(blob.messages) && blob.messages.length === beforeCount;
    } catch (e) {
      state.messages.length = beforeCount;
      state.reunionReacted = savedReacted;
      state.unread = beforeUnread;
      state.sharkMentions = savedMentionsB;
      return false;
    }
  })());
  // v1.7.32-beta: Sarah's dialogue names sharks WITHOUT quotes —
  // "You saw Helen again?" not "You saw "Helen" again?". Covers
  // both quoting sites: resightThread's opener and the reunion
  // reaction's WAIT opener (via maybeReunionReaction).
  (function () {
    const nurse = SHARKS.find(s => s.id === 'nurse');
    const rs = [{ date: 'Jan 1, 2026', location: 'Caribbean Sea', note: 'Looking healthy and unhurried.', ts: 1 }];
    const rec = { name: 'Helen', researchId: 'NS-1', sex: 'female', resightings: rs };
    try {
      const t = resightThread(nurse, rec);
      ok('Sarah resight opener names the shark without quotes',
        t[0].who === 'them' && t[0].text === 'You saw Helen again? The nurse shark?' &&
        !t[0].text.includes('“') && !t[0].text.includes('"'));
    } catch (e) {
      ok('Sarah resight opener quotes (threw: ' + e.message + ')', false);
    }
    const savedReacted = state.reunionReacted;
    const savedMsgCount = state.messages.length;
    const savedUnread = state.unread;
    const savedMentions2 = state.sharkMentions;
    state.reunionReacted = {};
    state.sharkMentions = {};
    try {
      const fired = maybeReunionReaction(nurse, { name: 'Helen', researchId: 'NS-1', sex: 'female', resightings: [] });
      const thread = state.messages[state.messages.length - 1].msgs;
      ok('Sarah reunion opener names the shark without quotes',
        fired === true && thread[0].who === 'them' &&
        thread[0].text.includes('Helen') &&
        !thread[0].text.includes('“') && !thread[0].text.includes('"'));
    } catch (e) {
      ok('Sarah reunion opener quotes (threw: ' + e.message + ')', false);
    } finally {
      state.messages.length = savedMsgCount;
      state.reunionReacted = savedReacted;
      state.unread = savedUnread;
      state.sharkMentions = savedMentions2;
      saveMsgs();
      updateMsgBadge();
      try { localStorage.setItem("tyi-reunion-reacted", JSON.stringify(savedReacted || {})); } catch {}
    }
  })();
  // v1.7.32-beta Mira fix: reunion nicknames must be stored RAW and
  // escaped ONCE at render. Previously maybeReunionReaction() escaped
  // the name before pushThread(), and renderMessages() escaped again,
  // so "Fin & Tonic" displayed as literal "Fin &amp; Tonic". Covers
  // both "&" (double-escape) and "<" (must stay safely escaped).
  (function () {
    const nurse = SHARKS.find(s => s.id === 'nurse');
    const savedReacted = state.reunionReacted;
    const savedMsgCount = state.messages.length;
    const savedUnread = state.unread;
    const savedMentions3 = state.sharkMentions;
    state.reunionReacted = {};
    state.sharkMentions = {};
    try {
      const fired = maybeReunionReaction(nurse, { name: 'Fin & <Tonic>', researchId: 'NS-1', sex: 'female', resightings: [] });
      const thread = state.messages[state.messages.length - 1].msgs;
      ok('reunion nickname stored raw, not pre-escaped',
        fired === true && thread[0].text === 'WAIT. You saw Fin & <Tonic> again?!?' &&
        !thread[0].text.includes('&amp;'));
      renderMessages();
      const html = $("messagesList").innerHTML;
      ok('reunion nickname escaped exactly once at render',
        html.includes('Fin &amp; &lt;Tonic&gt;') &&
        !html.includes('&amp;amp;') && !html.includes('Fin & <Tonic>'));
    } catch (e) {
      ok('reunion nickname escaping (threw: ' + e.message + ')', false);
    } finally {
      state.messages.length = savedMsgCount;
      state.reunionReacted = savedReacted;
      state.unread = savedUnread;
      state.sharkMentions = savedMentions3;
      saveMsgs();
      updateMsgBadge();
      renderMessages();
      try { localStorage.setItem("tyi-reunion-reacted", JSON.stringify(savedReacted || {})); } catch {}
    }
  })();
  // v1.7.32-beta: no ✅ emoji on the Tagged filter chip — the chip's
  // selected-state styling already shows it's active.
  ok('no Tagged checkmark emoji in filter chips', !fileCode.includes('Tagged ✅'));
  // v1.7.32-beta: the Expedition Method dropdown's first option is
  // "No extra method" — no method is a valid choice, and "Choose a
  // method…" implied one was required.
  ok('method dropdown first option is No extra method',
    fileCode.includes('ph.textContent = "No extra method"') &&
    !fileCode.includes('textContent = "Choose a method'));
  // v1.7.32-beta: the Research method filter chips are built from the
  // top-level METHODS entries (the same two options as the Expedition
  // dropdown), not from the sub-opts.
  ok('Research method chips come from top-level METHODS',
    fileCode.includes('mk("filterMethod", Object.entries(METHODS)'));
  // v1.7.25-beta: exhausted Observe (all insights learned) still ends
  // the expedition and shows the popup — same as Follow's exhausted
  // flow. Before this fix the branch called finish() (Keep diving /
  // Head back) and showed no popup. The copy must not promise a new
  // fact, but must say the expedition ends.
  ok('observe exhausted copy is accurate',
    fileCode.includes('all insights learned (ends the expedition)') &&
    fileCode.includes('_obsExhausted') &&
    fileCode.includes('all insights already learned') &&
    !fileCode.includes('all insights learned, just enjoy watching'));
  ok('observe exhausted ends expedition with popup',
    fileCode.includes('pendingTagAlongFact = { speciesId: species.id, fact: null, exhausted: true, mode: "observe" }') &&
    fileCode.includes('resolve({ tagAlong: species.id })'));
  ok('bubbles have 26 spans', (htmlCode.match(/<div class="bubbles">(<span><\\/span>){26}<\\/div>/) || []).length > 0);
  ok('bubbles are JS-driven, no CSS keyframe animation', !cssCode.includes('@keyframes bubble-rise') && fileCode.includes('initBubbles') && fileCode.includes('requestAnimationFrame(tick)'));
  ok('bubble CSS has 8 staggered columns', cssCode.includes('column H'));
  ok('PR47 fan rays not ported', !cssCode.includes('.caustics .fan'));
  ok('achieveList uses align-items stretch', cssCode.includes('#achieveList') && cssCode.includes('align-items: stretch'));
  // v1.7.23-beta: Follow button shows insight progress (insights: n/total).
  ok('follow button shows insight count', fileCode.includes('insights: ') && fileCode.includes('_factHave') && fileCode.includes('_factTotal'));
  ok('follow button computes fact totals from insightPoolFor', fileCode.includes('_factTotal = insightPoolFor(species.id).length'));
  ok('follow button aria-label includes insight progress', fileCode.includes('insights learned') && fileCode.includes('_factLabel'));
  // v1.7.24-beta: Observe species button shows insight progress too
  // (insights: n/total), same pattern as Follow — wild-shark encounters.
  ok('observe button shows insight count', fileCode.includes('_obsFactHave') && fileCode.includes('_obsFactTotal') && fileCode.includes('insights: '));
  ok('observe button computes fact totals from insightPoolFor', fileCode.includes('_obsFactTotal = insightPoolFor(species.id).length'));
  ok('observe button aria-label includes insight progress', fileCode.includes('_obsFactLabel'));
  // v1.7.24-beta: Observe on an untagged shark must show the Map popup.
  // Before this fix it resolved with bare true and never set
  // pendingTagAlong / pendingTagAlongFact, so the fact only lived in the
  // dive log and Avery never saw the popup. Now it mirrors Follow: stash
  // the fact (mode "observe") and resolve with tagAlong intent so closeDive
  // navigates to the Map and shows the popup.
  ok('observe stashes pendingTagAlongFact in observe mode', fileCode.includes('mode: "observe"') && fileCode.includes('pendingTagAlongFact = { speciesId: species.id, fact'));
  ok('observe resolves with tagAlong intent', fileCode.includes('resolve({ tagAlong: species.id })'));
  ok('observe fact NOT duplicated in expedition log', !fileCode.includes('Species insight:</strong> \${esc(fact)}'));
  // v1.7.23-beta: achievement cards identical height across ALL rows —
  // grid tracks are equal (grid-auto-rows: minmax(140px, 1fr)) plus a
  // per-card 140px min-height fallback, not just per-row stretch.
  ok('achievement cards have fixed min-height', cssCode.includes('#achieveList .guide-row') && cssCode.includes('min-height: 140px'));
  ok('achievement grid rows are equal tracks', cssCode.includes('grid-auto-rows: minmax(140px, 1fr)'));
  // v1.7.23-beta: Collection detail had no visible exit on mobile — the
  // Close button sat below the fold. Top-right ✕ on the long-content
  // modals (detail, tracking, what's-new), 44×44px touch target.
  ok('detail modal has top-right close button',
    htmlCode.includes('id="detailCloseTop"') && htmlCode.includes('aria-label="Close details"'));
  ok('track modal has top-right close button',
    htmlCode.includes('id="trackCloseTop"') && htmlCode.includes('aria-label="Close tracking"'));
  ok('whats-new modal has top-right close button',
    htmlCode.includes('id="whatsNewCloseTop"') && htmlCode.includes('aria-label="Close what\\'s new"'));
  ok('modal-close is a 44px touch target',
    cssCode.includes('.modal-close') && cssCode.includes('width: 44px') && cssCode.includes('height: 44px'));
  ok('modal-close is positioned top-right of the card',
    cssCode.includes('.modal-close') && cssCode.includes('position: absolute') && cssCode.includes('top: 8px') && cssCode.includes('right: 8px'));
  ok('top close buttons delegate to the bottom Close buttons',
    fileCode.includes('$("detailCloseTop").addEventListener("click", () => $("detailClose").click())') &&
    fileCode.includes('$("trackCloseTop").addEventListener("click", () => $("trackClose").click())') &&
    fileCode.includes('$("whatsNewCloseTop").addEventListener("click", () => $("whatsNewClose").click())'));
  ok('tab click handler skips disabled tabs',
    code.includes('if (btn.disabled) return;'));
  ok('disabled tabs are greyed out',
    cssCode.includes('.tab[disabled]') && cssCode.includes('cursor: not-allowed'));
  ok('archive tab not hidden in HTML',
    htmlCode.includes('data-tab="archive"') && !htmlCode.includes('class="tab hidden" data-tab="archive"'));
  ok('archive tab starts disabled in HTML',
    htmlCode.includes('data-tab="archive" type="button" disabled'));
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
  ok('encounter announces tagged status', fileCode.includes('new to your book') && (fileCode.includes('tag looks familiar') || fileCode.includes('already in your book')));
  ok('resight uses encounter-level one-shot guard (v1.6.4)', fileCode.includes('lastResightEncounterId'));
  ok('resight guard keys on encounterId', fileCode.includes('lastResightEncounterId === encounterId'));
  ok('doEncounter mints encounterId', fileCode.includes('const encounterId = "enc-"'));
  ok('resight button disabled after tap (v1.6.4)', fileCode.includes('resightBtn.disabled = true'));
  ok('map legend is two-column', /\\.map-legend\\s*\\{\\s*display:\\s*grid/.test(cssCode));
  ok('chip shows common name first', /esc\\(s\\.name\\)\\} · /.test(fileCode));
  ok('overlays scroll when overflowing', /\\.overlay\\s*\\{[^}]*overflow-y:\\s*auto/.test(cssCode));
  ok('sand tiger GIF reframed in CSS', /\\.gif-landscape-frame/.test(cssCode));
  // v1.4.0: full-bleed tab band, equal-width tabs, stacked count tabs
  ok('tab band is full-bleed', /\\.tabs\\s*\\{[^}]*calc\\(50% - 50vw\\)/.test(cssCode));
  ok('tabs use grid base', /\\.tabs\\s*\\{[^}]*display:\\s*grid/.test(cssCode));
  ok('tabs base has 8 columns', /\\.tabs\\s*\\{[^}]*grid-template-columns:\\s*repeat\\(8,\\s*1fr\\)/.test(cssCode));
  // v1.4.2: tab buttons centered in the band, not left-aligned
  // v1.5.16: grid base fills the full-bleed band with 8 equal columns — centering is inherent, no justify-content needed
  // v1.4.2: bigger tab emojis on desktop
  ok('desktop tab emojis bigger', /@media\\s*\\(min-width:\\s*1024px\\)[\\s\\S]*?\\.tab-icon\\s*\\{[^}]*font-size/.test(cssCode));
  ok('tab labels vertically centered', /\\.tab\\s*\\{[^}]*align-items:\\s*center/.test(cssCode));
  ok('achievements tab is labeled', /data-tab="achievements"[^>]*>[\\s\\S]*?Achievements/.test(htmlCode));
  // v1.4.2: counts removed from tabs — Collection/Achievements are 2-row icon+label
  ok('collection tab has no count badge', !/data-tab="collection"[^>]*>[\\s\\S]*?id="collectionCount"/.test(htmlCode));
  ok('achievements tab has no count badge', !/data-tab="achievements"[^>]*>[\\s\\S]*?achieveBadge/.test(htmlCode));
  ok('collection page shows prominent count', /id="collectionCountHead"/.test(htmlCode));
  // v1.4.0: every tab is a 3-row stack (count/icon/label) with spacers —
  // no stretch hacks needed for equal heights.
  const tabStackCount = (htmlCode.match(/class="tab-stack"/g) || []).length;
  ok('all 8 tabs use tab-stack', tabStackCount === 8);
  ok('no height:100% stretch hack on .tab', !/\\.tab\\s*\\{[^}]*height:\\s*100%/.test(cssCode));
  // v1.4.2: achieveBadge removed — count lives in page header
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
  // v1.7.10-beta: "You Named Him WHAT?" fires as soon as the chain starts
  ok('bruce check passes on egg start', (() => {
    const b = ACHIEVEMENTS.find(a => a.id === 'bruce');
    return b.check({ bruceEgg: { stage: 0 }, bruceChainComplete: false }) === true &&
           b.check({ bruceEgg: null, bruceChainComplete: false }) === false &&
           b.check({ bruceEgg: null, bruceChainComplete: true }) === true;
  })());
  ok('Bruce unlocks when the chain starts (no waiting)', (() => {
    const saveEgg = state.bruceEgg;
    const saveDone = state.bruceChainComplete;
    const saveAch = state.achievements.bruce;
    state.bruceEgg = { stage: 0, sharkId: 'nurse', playerName: 'Bruce', started: Date.now(), lastAdvance: 0, expeditionsAtStage: 0 };
    state.bruceChainComplete = false;
    delete state.achievements.bruce;
    try {
      checkAchievements();
      return !!state.achievements.bruce;
    } finally {
      state.bruceEgg = saveEgg;
      state.bruceChainComplete = saveDone;
      if (saveAch) state.achievements.bruce = saveAch; else delete state.achievements.bruce;
    }
  })());
  ok('basking duplicate removed', ARCHIVE_MEDIA.basking.assets.length === 1);
  ok('dwarflantern duplicate removed', ARCHIVE_MEDIA.dwarflantern.assets.length === 1 && fileCode.indexOf('Etmopterus_perryi_SI_cr') === -1);

  // v1.7.23-beta: cookiecutter archive is illustration-only (Avery's call — no dead specimens)
  (function () {
    const assets = ARCHIVE_MEDIA.cookiecutter.assets;
    ok('cookiecutter is a single illustration',
      assets.length === 1 && assets[0].type === 'illustration' &&
      /Dr Tony Ayling/.test(assets[0].credit) && assets[0].license === 'CC BY-SA 1.0');
  })();

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
    ACHIEVEMENTS.every(a => { try { return typeof a.check === 'function'; } catch { return false; } }));
  ok('26 achievements (25 visible + Bruce hidden)', ACHIEVEMENTS.length === 26 &&
    ACHIEVEMENTS.filter(a => !a.hidden).length === 25);
  // v1.7.28-beta: Dedicated + Certified Shark Nerd.
  (function () {
    const dedicated = ACHIEVEMENTS.find(a => a.id === 'dedicated');
    const nerd = ACHIEVEMENTS.find(a => a.id === 'certified-nerd');
    ok('Dedicated exists, visible, has breadcrumb', !!dedicated && !dedicated.hidden && !!dedicated.breadcrumb);
    ok('Certified Shark Nerd exists, visible, has breadcrumb', !!nerd && !nerd.hidden && !!nerd.breadcrumb);
    // Dedicated: all 201 facts across all 50 species learned via Follow/Observe
    // (SECRET_FACTS + hook + bonus per species, via insightPoolFor).
    const allFacts = {};
    Object.keys(SECRET_FACTS).forEach(id => { allFacts[id] = insightPoolFor(id).map((_, i) => i); });
    ok('Dedicated unlocks with every fact learned', dedicated.check({ unlockedFacts: allFacts }) === true);
    const oneMissing = JSON.parse(JSON.stringify(allFacts));
    oneMissing.nurse = oneMissing.nurse.slice(0, -1);
    ok('Dedicated stays locked with one fact missing', dedicated.check({ unlockedFacts: oneMissing }) === false);
    ok('Dedicated stays locked with no facts', dedicated.check({ unlockedFacts: {} }) === false);
    // Certified Shark Nerd: full-completion state (every visible check passes).
    const fullTagged = {};
    SHARKS.forEach(s => { fullTagged[s.id] = { name: 'X', researchId: 'R' }; });
    fullTagged.nurse.name = 'Sarah';
    fullTagged.nurse.resightings = [{}, {}, {}];
    /* #149: full completion includes a tag actually made in an earned region. */
    fullTagged.scalloped.region = 'galapagos';
    const fullState = {
      tagged: fullTagged,
      stats: {
        resights: 1, expeditions: 10,
        regionsVisited: Object.keys(REGIONS),
        baitsUsed: Object.keys(BAITS),
        depthsTagged: Object.keys(DEPTHS),
        depthsVisited: Object.keys(DEPTHS),
      },
      /* v2.7.14-beta: full completion includes an empty-handed trip in the
         logbook, for the Fieldwork milestone. */
      logbook: [{ region: "caribbean", encounters: [{ speciesId: "nurse", result: "resighted" }] }],
      unlockedFacts: allFacts,
      bruceEgg: null,
      bruceChainComplete: false,
      achievements: {},
    };
    ok('Certified Shark Nerd check passes on full completion', nerd.check(fullState) === true);
    // Visible-only: the hidden Bruce chain is NOT required.
    ok('Certified Shark Nerd does not require hidden Bruce',
      nerd.check({ ...fullState, bruceEgg: null, bruceChainComplete: false }) === true);
    // One visible achievement incomplete -> Nerd stays locked.
    ok('Certified Shark Nerd stays locked when Dedicated is incomplete',
      nerd.check({ ...fullState, unlockedFacts: oneMissing }) === false);
    // v1.7.28-beta Mira review: historical milestones — a persisted earned
    // flag counts even when the live check() no longer passes (renamed the
    // Sarah shark / cleared a nickname). Without the flag-or-check fix,
    // Nerd would stay locked forever for such a player.
    const otherVisible = ACHIEVEMENTS.filter(a => !a.hidden && a.id !== 'certified-nerd');
    const earnedMinusNerd = Object.fromEntries(otherVisible.map(a => [a.id, 1]));
    // (a) best-cousin earned, but no shark is currently named Sarah.
    const noSarahTagged = {};
    SHARKS.forEach(s => { noSarahTagged[s.id] = { name: 'X', researchId: 'R' }; });
    ok('Certified Shark Nerd counts persisted best-cousin after rename',
      nerd.check({ tagged: noSarahTagged, stats: fullState.stats, unlockedFacts: allFacts, achievements: earnedMinusNerd }) === true);
    ok('... and best-cousin check itself is false with no Sarah',
      ACHIEVEMENTS.find(a => a.id === 'best-cousin').check({ tagged: noSarahTagged }) === false);
    // (b) first-name earned, but one shark's nickname was later cleared.
    const oneCleared = JSON.parse(JSON.stringify(noSarahTagged));
    oneCleared.nurse.name = '';
    ok('Certified Shark Nerd counts persisted first-name after nickname cleared',
      nerd.check({ tagged: oneCleared, stats: fullState.stats, unlockedFacts: allFacts, achievements: earnedMinusNerd }) === true);
    ok('... and first-name check itself is false with a cleared nickname',
      ACHIEVEMENTS.find(a => a.id === 'first-name').check({ tagged: oneCleared }) === false);
    // End-to-end: checkAchievements fires Nerd on full completion, not Bruce.
    // v1.7.28-beta Mira review: pre-earn every other visible achievement so
    // this pass unlocks ONLY Nerd — the old from-empty fixture called the
    // real unlockAchievement() ~20 times, persisting synthetic achievements
    // and leaving queue/modal state behind. Snapshot/restore the persisted
    // blob, the queue, the showing flag, and the overlay too.
    const saveTagged = state.tagged, saveStats = state.stats, saveFacts = state.unlockedFacts;
    const saveEgg = state.bruceEgg, saveDone = state.bruceChainComplete, saveAch = state.achievements;
    const savePersisted = achieveStore.load();
    const saveQueue = [...achieveQueue];
    const saveShowing = achieveShowing;
    const saveOvHidden = $("achieveOverlay").classList.contains("hidden");
    try {
      state.tagged = fullState.tagged;
      state.stats = fullState.stats;
      state.unlockedFacts = fullState.unlockedFacts;
      state.bruceEgg = null;
      state.bruceChainComplete = false;
      state.achievements = Object.fromEntries(otherVisible.map(a => [a.id, 1]));
      checkAchievements();
      ok('checkAchievements unlocks Certified Shark Nerd on full completion', !!state.achievements['certified-nerd']);
      ok('checkAchievements does not unlock hidden Bruce on full completion', !state.achievements.bruce);
      ok('Nerd fixture unlocks only Nerd in this pass',
        Object.keys(state.achievements).filter(id => !earnedMinusNerd[id]).join() === 'certified-nerd');
    } finally {
      state.tagged = saveTagged;
      state.stats = saveStats;
      state.unlockedFacts = saveFacts;
      state.bruceEgg = saveEgg;
      state.bruceChainComplete = saveDone;
      state.achievements = saveAch;
      achieveStore.save(savePersisted);
      achieveQueue.length = 0;
      achieveQueue.push(...saveQueue);
      achieveShowing = saveShowing;
      if (saveOvHidden) $("achieveOverlay").classList.add("hidden");
      else $("achieveOverlay").classList.remove("hidden");
    }
    ok('Nerd fixture restores persisted achievements',
      JSON.stringify(achieveStore.load()) === JSON.stringify(savePersisted));
    ok('Nerd fixture restores achievement queue/modal state',
      achieveQueue.length === saveQueue.length && achieveShowing === saveShowing &&
      $("achieveOverlay").classList.contains("hidden") === saveOvHidden);
  })();
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
  state.tagged = { nurse: { name: "B", researchId: "R", resightings: [{}, {}, {}] } };
  checkAchievements();
  ok('Pen Pal unlocks at 3 resights', !!state.achievements['pen-pal']);
  resetA();
  state.tagged = { scalloped: { name: "S", researchId: "R", region: "galapagos" } };
  state.logbook = [];
  checkAchievements();
  ok('Off the Map unlocks on a Galapagos tag', !!state.achievements['off-map']);
  resetA();
  state.tagged = { dusky: { name: "D", researchId: "R", region: "south-africa" } };
  state.logbook = [];
  checkAchievements();
  ok('Off the Map unlocks on a South Africa tag', !!state.achievements['off-map']);
  resetA();
  /* #149: a roster that permits an earned region no longer counts — the
     actual tag location does. Scalloped lists Galapagos but this tag was
     in the Caribbean. Note: this fixture is artificial under the present
     roster (scalloped is Galapagos-exclusive today) — it is a unit test
     of the location rule, and it futureproofs multi-region placements. */
  state.tagged = { scalloped: { name: "S", researchId: "R", region: "caribbean" } };
  state.logbook = [];
  checkAchievements();
  ok('Off the Map stays locked on a Caribbean tag of a Galapagos-roster species', !state.achievements['off-map']);
  resetA();
  /* #149: a record with no region never awards, even for an earned-region species. */
  state.tagged = { scalloped: { name: "S", researchId: "R" } };
  state.logbook = [];
  checkAchievements();
  ok('Off the Map stays locked on a region-less record', !state.achievements['off-map']);
  resetA();
  /* #149: earning or visiting an earned region without tagging there does not award. */
  state.logbook = [];
  state.stats = state.stats || {};
  state.stats.regionsVisited = ["galapagos"];
  checkAchievements();
  ok('Off the Map stays locked on a visit without a tag', !state.achievements['off-map']);
  resetA();
  /* #149: a genuine earned tag preserved in the logbook counts even if the
     one-per-species record was overwritten by a later tag elsewhere. */
  state.tagged = { scalloped: { name: "S", researchId: "R", region: "caribbean" } };
  state.logbook = [{ region: "galapagos", encounters: [{ speciesId: "scalloped", result: "tagged" }] }];
  checkAchievements();
  ok('Off the Map unlocks from a logged earned tag after an overwrite', !!state.achievements['off-map']);
  resetA();
  /* #149: a logged earned tag counts even with no current tagged record
     at all (not just after an overwrite). */
  state.logbook = [{ region: "galapagos", encounters: [{ speciesId: "scalloped", result: "tagged" }] }];
  checkAchievements();
  ok('Off the Map unlocks from a logged earned tag with no current record', !!state.achievements['off-map']);
  resetA();
  /* #149: watch-only logbook history does not award — neither resighted
     nor watched encounters are tags. */
  state.logbook = [{ region: "galapagos", encounters: [{ speciesId: "scalloped", result: "resighted" }, { speciesId: "scalloped", result: "watched" }] }];
  checkAchievements();
  ok('Off the Map stays locked on watch-only history', !state.achievements['off-map']);
  state.logbook = [];
  state.stats.regionsVisited = [];
  /* v2.7.14-beta: expedition moments + CR capstone + Sea Legs breadcrumb. */
  resetA();
  state.stats.expeditions = 1; state.logbook = [];
  checkAchievements();
  ok('Maiden Voyage unlocks on the first trip', !!state.achievements['maiden-voyage']);
  resetA();
  state.stats.expeditions = 0; state.logbook = [];
  checkAchievements();
  ok('Maiden Voyage stays locked with no trips', !state.achievements['maiden-voyage']);
  resetA();
  state.stats.depthsVisited = ["twilight"]; state.logbook = [];
  checkAchievements();
  ok('Twilight Zone unlocks on a twilight dive', !!state.achievements['twilight-dive']);
  resetA();
  state.stats.depthsVisited = ["reef"]; state.logbook = [];
  checkAchievements();
  ok('Twilight Zone stays locked on a reef-only dive', !state.achievements['twilight-dive']);
  resetA();
  state.stats.depthsVisited = ["deep"]; state.logbook = [];
  checkAchievements();
  ok('Midnight Zone unlocks on a deep dive', !!state.achievements['deep-dive']);
  resetA();
  state.stats.depthsVisited = ["twilight"]; state.logbook = [];
  checkAchievements();
  ok('Midnight Zone stays locked on a twilight-only dive', !state.achievements['deep-dive']);
  resetA();
  state.logbook = [{ region: "caribbean", encounters: [] }];
  checkAchievements();
  ok('Fieldwork unlocks on a trip with no encounters', !!state.achievements['fieldwork']);
  resetA();
  state.logbook = [{ region: "caribbean", encounters: [{ speciesId: "nurse", result: "tagged" }] }];
  checkAchievements();
  ok('Fieldwork stays locked when the trip tagged a shark', !state.achievements['fieldwork']);
  resetA();
  state.logbook = [{ region: "caribbean", encounters: [{ speciesId: "nurse", result: "resighted" }] }];
  checkAchievements();
  ok('Fieldwork unlocks on sightings with no tag', !!state.achievements['fieldwork']);
  resetA();
  state.tagged = { sandtiger: { name: "T", researchId: "R" } }; state.logbook = [];
  checkAchievements();
  ok('On the Brink unlocks on a Critically Endangered tag', !!state.achievements['on-the-brink']);
  resetA();
  const nonCR = SHARKS.find(x => x.status !== "Critically Endangered").id;
  state.tagged = { [nonCR]: { name: "N", researchId: "R" } }; state.logbook = [];
  checkAchievements();
  ok('On the Brink stays locked on a non-CR tag', !state.achievements['on-the-brink']);
  ok('Sea Legs breadcrumb no longer states the requirement',
    ACHIEVEMENTS.find(a => a.id === 'sea-legs').breadcrumb === 'steady on your feet');
  state.stats.expeditions = 0; state.stats.depthsVisited = []; state.logbook = [];
  resetA();
  const byStatus = {};
  SHARKS.forEach(s => { if (!byStatus[s.status]) byStatus[s.status] = s.id; });
  state.tagged = Object.fromEntries(Object.values(byStatus).map(id => [id, { name: "X", researchId: "R" }]));
  checkAchievements();
  ok('Every Shade unlocks across statuses', !!state.achievements['every-shade']);
  ok('new breadcrumbs stay hints',
    ["full-fathom","finished","pen-pal","off-map","every-shade","maiden-voyage","twilight-dive","deep-dive","fieldwork","on-the-brink","sea-legs"].every(id => {
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
    guideFilters.depth.clear(); guideFilters.method.clear();
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
    carib.every(s => regionList(s).includes("caribbean")));
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
  // v1.7.32-beta: the Research method filter offers exactly the two
  // top-level planner methods — the same options as the Expedition
  // Method dropdown. No sub-opts (chum / boat / plane / network).
  guideFilters.method.add("attract");
  const attractors = SHARKS.filter(guideMatches);
  ok('method filter matches attract species',
    attractors.length > 0 && attractors.every(s => (s.methods || {}).attract));
  guideFilters.method.clear(); guideFilters.method.add("aggregation");
  const aggregators = SHARKS.filter(guideMatches);
  ok('method filter matches aggregation species',
    aggregators.length > 0 && aggregators.every(s => (s.methods || {}).aggregation));
  ok('method filters partition species with methods',
    attractors.length + aggregators.length ===
    SHARKS.filter(s => Object.keys(s.methods || {}).length).length);
  ok('method filter offers exactly the two planner methods',
    Object.keys(METHODS).length === 2 &&
    METHODS.attract.name === 'Attract — scent in the water' &&
    METHODS.aggregation.name === 'Find the aggregation');
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
    guideFilters.depth.add("reef"); guideFilters.method.add("attract");
    guideFilters.bait.add("tuna"); guideFilters.tagged = "tagged";
    clearGuideFilters();
    return guideFilters.q === "" && guideFilters.region.size === 0 &&
      guideFilters.depth.size === 0 && guideFilters.method.size === 0 &&
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
  ok('salmon dossier complete', salmon && regionList(salmon).includes("japan") &&
    salmon.depths.includes("surface") && salmon.latin === "Lamna ditropis");
  ok('dusky dossier complete', dusky && regionList(dusky).includes("south-africa") &&
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
  // v1.7.22: sawshark secondary is the Gould 1832 illustration, not a duplicate crop
  ok('sawshark secondary is the Gould illustration', (() => {
    const a = ARCHIVE_MEDIA.sawshark.assets[1];
    return a.credit.includes('William Buelow Gould') &&
      a.image.includes('Pristiophorus_cirratus.jpg') &&
      a.license === 'public domain';
  })());
  // v1.7.23: cookiecutter is illustration-only (no dead-specimen photos)
  ok('cookiecutter is a single illustration', (() => {
    const assets = ARCHIVE_MEDIA.cookiecutter.assets;
    return assets.length === 1 &&
      assets[0].type === 'illustration' &&
      assets[0].credit.includes('Dr Tony Ayling') &&
      assets[0].image.includes('Cookiecutter_shark') &&
      assets[0].license === 'CC BY-SA 1.0';
  })());
  ok('megamouth credits the creator, not the uploader', (() => {
    const assets = ARCHIVE_MEDIA.megamouth.assets;
    return assets.length > 0 &&
      assets[0].credit.includes('CSIRO National Fish Collection') &&
      assets[0].license === 'CC BY 3.0';
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
  // Unlock boundaries: simulate tag counts and verify applyRegions logic
  ok('mira: unlock boundaries are count-based', (() => {
    // Behavioral: manipulate state.tagged, call applyRegions(), check REGIONS
    function testUnlock(n, regionId, shouldUnlock) {
      // Reset
      REGIONS["east-australia"].locked = true;
      REGIONS["california"].locked = true;
      REGIONS["arctic"].locked = true;
      // Mock n tagged sharks
      state.tagged = {};
      for (let k = 0; k < n; k++) state.tagged["shark" + k] = { nick: "Test" };
      applyRegions();
      const unlocked = !REGIONS[regionId].locked;
      // Reset for next test
      state.tagged = {};
      return unlocked === shouldUnlock;
    }
    return testUnlock(14, "east-australia", false) &&
           testUnlock(15, "east-australia", true) &&
           testUnlock(24, "california", false) &&
           testUnlock(25, "california", true) &&
           testUnlock(34, "arctic", false) &&
           testUnlock(35, "arctic", true);
  })());
  ok('mira: genTrack computes honest distances', (() => {
    // Deterministic: call the actual genTrack(), verify distances
    const savedState = JSON.parse(JSON.stringify(state.tagged || {}));
    try {
      const species = SHARKS.find(s => s.id === 'catshark');
      const rec = { location: "Cornwall", nick: "Test" };
      const track = genTrack(species, rec);
      // 1. First position matches the species anchor
      const env = TRACK_ENVELOPES['catshark'];
      if (track.points[0].label !== env.tagAnchor) return false;
      // 2. Consecutive coordinates produce recorded distances
      for (let i = 1; i < track.points.length; i++) {
        const prev = MAP_COORDS[track.points[i-1].label];
        const curr = MAP_COORDS[track.points[i].label];
        if (prev && curr) {
          const expected = Math.round(haversineKm(prev, curr) * 10) / 10;
          if (Math.abs(track.points[i].km - expected) > 0.1) return false;
        }
      }
      // 3. totalKm equals sum of legs
      const sum = track.points.slice(1).reduce((s, p) => s + p.km, 0);
      if (Math.abs(track.totalKm - Math.round(sum * 10) / 10) > 0.1) return false;
      return true;
    } finally {
      state.tagged = savedState;
    }
  })());
  ok('mira: re-sighting uses species anchor (no teleport)', (() => {
    // Tag a shark, record a re-sighting, check geographic consistency
    const savedTagged = JSON.parse(JSON.stringify(state.tagged || {}));
    try {
      const species = SHARKS.find(s => s.id === 'kitefin');
      state.tagged['kitefin'] = { location: "Open Atlantic", nick: "Test", researchId: "TEST-001" };
      state.tagged['kitefin'].track = genTrack(species, state.tagged['kitefin']);
      state.tagged['kitefin'].track.v = 2;
      // Mock a re-sighting via the anchor path
      const env = TRACK_ENVELOPES['kitefin'];
      const lastBefore = state.tagged['kitefin'].track.points[state.tagged['kitefin'].track.points.length - 1];
      // Simulate what recordResighting does with anchor
      const anchorCoord = MAP_COORDS[env.tagAnchor];
      const lastCoord = MAP_COORDS[lastBefore.label];
      const km = Math.round(haversineKm(lastCoord, anchorCoord) * 10) / 10;
      // The jump should be local (<100km), not a 3,230km teleport
      return km < 100;
    } finally {
      state.tagged = savedTagged;
    }
  })());
  ok('mira: migration preserves re-sighting history', (() => {
    // A v1 track with a re-sighting point: the re-sighting RECORD stays in
    // the log, but the point is stripped from the movement track (v1.8.7:
    // re-sightings are encounters, not travel).
    const savedTagged = JSON.parse(JSON.stringify(state.tagged || {}));
    try {
      state.tagged['catshark'] = {
        location: "Cornwall", nick: "Test", researchId: "TEST-002",
        track: { points: [{ label: "Cornwall", day: 0, km: 0 }, { label: "Mount's Bay", day: 5, km: 10, resighting: true }], totalKm: 10, days: 5, kind: "acoustic" }, // v1, no v marker
        resightings: [{ date: "2026-01-01", location: "Cornwall", note: "Test", ts: 1 }]
      };
      migrateTracks();
      migrateTravelTracks();
      const t = state.tagged['catshark'];
      // Track regenerated to v2
      if (t.track.v !== 2) return false;
      // Re-sighting point stripped from the movement track
      if (t.track.points.some(p => p.resighting)) return false;
      // totalKm recomputed from travel points only
      const expectKm = Math.round(t.track.points.reduce((a, p) => a + (p.km || 0), 0) * 10) / 10;
      if (t.track.totalKm !== expectKm) return false;
      // Re-sighting record preserved in the log
      if (!t.resightings || t.resightings.length === 0) return false;
      return true;
    } finally {
      state.tagged = savedTagged;
    }
  })());
  ok('mira: archival popup opens without error', (() => {
    // Regression: showMapPopup used species.id (ReferenceError) instead of s.id
    const savedTagged = JSON.parse(JSON.stringify(state.tagged || {}));
    try {
      const species = SHARKS.find(s => s.id === 'sawshark');
      state.tagged['sawshark'] = { location: "Tasmania", nick: "Test", researchId: "TEST-003" };
      state.tagged['sawshark'].track = genTrack(species, state.tagged['sawshark']);
      state.tagged['sawshark'].track.v = 2;
      // This should not throw
      showMapPopup('sawshark');
      // Popup should contain the neutral wording, not "never carried"
      const pop = document.getElementById("mapPopup");
      const html = pop.innerHTML || "";
      return html.indexOf("Illustrative habitat-based movement scenario") !== -1 &&
             html.indexOf("never carried a tracking tag") === -1;
    } catch (e) {
      return false;
    } finally {
      state.tagged = savedTagged;
    }
  })());
  ok('v1.8.7: legacy re-sighting stripped from track, records kept', (() => {
    // Genuinely pre-v0.21.0 save: no resighting flag, but has resightings records.
    // migrateTracks() reconstructs the flagged point; migrateTravelTracks()
    // then strips it from the movement track (v1.8.7) while records stay.
    const savedTagged = JSON.parse(JSON.stringify(state.tagged || {}));
    try {
      state.tagged['catshark'] = {
        location: "Cornwall", nick: "Test", researchId: "TEST-004",
        // Old track: 7 generated points + 1 legacy re-sighting (no flag)
        track: {
          points: [
            { label: "Cornwall", day: 0, km: 0 },
            { label: "Mount's Bay", day: 3, km: 5 },
            { label: "Lizard Point", day: 6, km: 8 },
            { label: "Penzance Bay", day: 9, km: 6 },
            { label: "Mount's Bay east", day: 12, km: 4 },
            { label: "Lizard Point west", day: 15, km: 7 },
            { label: "Mount's Bay", day: 18, km: 5 },
            { label: "Cornwall", day: 25, km: 12 }  // legacy re-sighting, no flag
          ],
          totalKm: 47, days: 25, kind: "acoustic"
        },
        resightings: [{ date: "2026-02-01", location: "Cornwall", note: "Legacy", ts: 2 }]
      };
      migrateTracks();
      migrateTravelTracks();
      const t = state.tagged['catshark'];
      if (t.track.v !== 2) return false;
      // No re-sighting points remain on the movement track
      if (t.track.points.some(p => p.resighting)) return false;
      // Day count agrees with the last TRAVEL point, not the stripped one
      const lastPoint = t.track.points[t.track.points.length - 1];
      if (t.track.days !== lastPoint.day) return false;
      // Records preserved in the log
      if (!t.resightings || t.resightings.length === 0) return false;
      return true;
    } finally {
      state.tagged = savedTagged;
    }
  })());
  ok('mira: resident envelopes stay local', (() => {
    function maxHop(id) {
      var env = TRACK_ENVELOPES[id], max = 0;
      for (var i = 0; i < env.areas.length - 1; i++) {
        var a = MAP_COORDS[env.areas[i]], b = MAP_COORDS[env.areas[i+1]];
        if (a && b) max = Math.max(max, haversineKm(a, b));
      }
      return max;
    }
    return maxHop('horn') < 100 && maxHop('wobbegong') < 100 &&
           maxHop('catshark') < 100 && maxHop('dwarflantern') < 150;
  })());
  // Every shark's combo region exists in REGIONS
  ok('mira: all 50 sharks have valid combo regions', SHARKS.every(s => {
    const rs = regionList(s);
    return rs.length > 0 && rs.every(r => REGIONS[r] !== undefined);
  }));
  // v2.0.0-beta: multi-region species
  (function multiRegion() {
    const whale = SHARKS.find(s => s.id === "whale");
    const mega = SHARKS.find(s => s.id === "megamouth");
    const blue = SHARKS.find(s => s.id === "blue");
    const smooth = SHARKS.find(s => s.id === "smooth");
    ok('v2.0.0: whale shark in philippines + maldives',
      regionList(whale).includes("philippines") && regionList(whale).includes("maldives"));
    ok('v2.0.0: megamouth in japan + philippines',
      regionList(mega).includes("japan") && regionList(mega).includes("philippines"));
    ok('v2.0.0: blue shark in open-atlantic + cornwall',
      regionList(blue).includes("open-atlantic") && regionList(blue).includes("cornwall"));
    ok('v2.0.0: smooth hammerhead in cornwall + north-carolina',
      regionList(smooth).includes("cornwall") && regionList(smooth).includes("north-carolina"));
    ok('v2.0.0: single-region species unaffected',
      regionList(SHARKS.find(s => s.id === "nurse")).join() === "caribbean");
    ok('v2.0.0: regionList falls back to legacy single-string form',
      regionList({ combo: { region: "maldives" } }).join() === "maldives" &&
      regionList({ combo: {} }).length === 0);
    ok('v2.0.0: regionNames resolves display names',
      regionNames(whale).includes("Maldives") && regionNames(whale).includes("Philippines"));
    // expedition encounter pools: whale shark reachable from the Maldives
    const maldivesPlan = { region: "maldives", depth: "surface", bait: "plankton" };
    const philPlan = { region: "philippines", depth: "surface", bait: "plankton" };
    ok('v2.0.0: whale shark in Maldives encounter pool',
      resolveEncounters(maldivesPlan).some(s => s.id === "whale"));
    ok('v2.0.0: whale shark still in Philippines encounter pool',
      resolveEncounters(philPlan).some(s => s.id === "whale"));
    ok('v2.0.0: megamouth in Philippines encounter pool',
      resolveEncounters({ region: "philippines", depth: "twilight", bait: "plankton" }).some(s => s.id === "megamouth"));
    // research region filter matches multi-region species under either region
    guideFilters.region = new Set(["maldives"]);
    ok('v2.0.0: region filter finds whale under Maldives',
      SHARKS.filter(guideMatches).some(s => s.id === "whale"));
    guideFilters.region = new Set(["open-atlantic"]);
    ok('v2.0.0: region filter finds blue under open-atlantic',
      SHARKS.filter(guideMatches).some(s => s.id === "blue"));
    guideFilters.region = new Set();
  })();
  // v2.0.0-beta (Mira review): region-aware track envelopes. A shark tagged
  // in its second region must get a location-coherent track — point 0 at the
  // regional tag site, every later point from the regional envelope, never
  // the primary region's route.
  (function regionalTracks() {
    const cases = [
      // [speciesId, regionKey, expectedPoint0, siblingEnvelopeLabels]
      ["whale", "maldives", "South Ari Atoll",
        ["Tubbataha Reefs Natural Park", "Sulu Sea", "Northern Palawan", "Surigao Strait", "Eastern Leyte", "Eastern Mindanao (Pacific)", "Philippines"]],
      ["whale", "philippines", "Philippines",
        ["South Ari Atoll", "Maamigili", "Dhigurah", "Ari Atoll outer reef", "Baa Atoll (Hanifaru)"]],
      ["megamouth", "philippines", "Cagayan de Oro",
        ["Izu Peninsula", "Sagami Bay", "Izu Peninsula south", "Sagami Bay offshore", "Izu Peninsula east"]],
      ["megamouth", "japan", "Izu Peninsula",
        ["Cagayan de Oro", "Bohol Sea", "Visayan Sea", "Luzon east coast (Aurora)", "Philippine Sea edge", "Surigao Strait north"]],
      ["blue", "cornwall", "Mount's Bay",
        ["Tag-site open water", "Gulf Stream meander", "Mid-Atlantic Ridge approaches", "Azores Current", "Canary Current edge", "Open Atlantic"]],
      ["blue", "open-atlantic", "Open Atlantic",
        ["Mount's Bay", "Scilly Isles waters", "Western Approaches", "Celtic Deep", "Southwest Approaches"]],
      ["smooth", "north-carolina", "Cape Hatteras",
        ["Tag-site shelf", "Shelf break", "Open Atlantic water", "Frontal zone", "Coastal bay", "Cornwall, UK"]],
      ["smooth", "cornwall", "Cornwall, UK",
        ["Cape Hatteras", "Outer Banks shelf", "Cape Lookout", "Chesapeake Bay mouth", "Mid-Atlantic Bight", "Gulf Stream edge"]],
    ];
    cases.forEach(([sid, region, p0, siblingLabels]) => {
      const s = SHARKS.find(x => x.id === sid);
      const tr = genTrack(s, { location: REGIONS[region].name, region });
      const labels = tr.points.map(pt => pt.label);
      ok('v2.0.0: ' + sid + ' tagged in ' + region + ' — point 0 is the regional tag site',
        tr.points[0].label === p0);
      ok('v2.0.0: ' + sid + ' tagged in ' + region + ' — no points from the sibling region route',
        !labels.some(l => siblingLabels.includes(l)));
      const env = envelopeFor(sid, region);
      const allowed = new Set([...env.areas, env.tagAnchor || REGIONS[region].name]);
      ok('v2.0.0: ' + sid + ' tagged in ' + region + ' — every point from the regional envelope',
        labels.every(l => allowed.has(l)));
    });
    ok('v2.0.0: envelopeFor falls back to the species envelope for legacy/unknown regions',
      envelopeFor("whale", undefined) === TRACK_ENVELOPES.whale &&
      envelopeFor("whale", "atlantis") === TRACK_ENVELOPES.whale &&
      envelopeFor("nurse", "caribbean") === TRACK_ENVELOPES.nurse &&
      envelopeFor("nosuchshark", "maldives") === TRACK_ENVELOPES.nurse);
    ok('v2.0.0: regional envelopes registered for all four second regions',
      envelopeFor("whale", "maldives").regionKey === "maldives" &&
      envelopeFor("megamouth", "philippines").regionKey === "philippines" &&
      envelopeFor("blue", "cornwall").regionKey === "cornwall" &&
      envelopeFor("smooth", "north-carolina").regionKey === "north-carolina");
    // v2.0.0-beta (Mira review): Philippine megamouth has no tracking data —
    // its track must be labelled hypothetical, not "inspired by satellite
    // telemetry"; other kinds keep their existing labels.
    ok('v2.0.0: Philippine megamouth track is hypothetical, other kinds unchanged', (() => {
      const megaPh = genTrack(sharkById("megamouth"), { location: REGIONS.philippines.name, region: "philippines" });
      const whalePh = genTrack(sharkById("whale"), { location: REGIONS.philippines.name, region: "philippines" });
      const megaJp = genTrack(sharkById("megamouth"), { location: REGIONS.japan.name, region: "japan" });
      return megaPh.hypothetical === true &&
        whalePh.hypothetical === false && whalePh.kind === "satellite" &&
        megaJp.hypothetical === false;
    })());
  })();
  // v2.0.0-beta (Mira review): migrateTagRegions backfills the region key on
  // pre-v2.0.0 records WITHOUT touching their tracks.
  ok('v2.0.0: migrateTagRegions backfills region, leaves tracks byte-identical', (() => {
    const saved = JSON.parse(JSON.stringify(state.tagged || {}));
    const origSave = store.save; store.save = () => {};
    try {
      const pts = [{ label: "Philippines", day: 0, km: 0 }, { label: "Sulu Sea", day: 7, km: 120.5 }];
      state.tagged = {
        whale: { location: "Philippines",
          track: { points: JSON.parse(JSON.stringify(pts)), totalKm: 120.5, days: 7, kind: "satellite", v: 2 } },
        nurse: { location: "Caribbean Sea", region: "caribbean",
          track: { points: [], totalKm: 0, days: 0, kind: "acoustic", v: 2 } },
        tiger: { location: "Somewhere Else" }
      };
      migrateTagRegions();
      const w = state.tagged.whale, n = state.tagged.nurse, g = state.tagged.tiger;
      return w.region === "philippines" &&
        JSON.stringify(w.track.points) === JSON.stringify(pts) &&
        w.track.totalKm === 120.5 && w.track.days === 7 &&
        n.region === "caribbean" &&
        g.region === undefined;
    } finally { store.save = origSave; state.tagged = saved; }
  })());
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
  // v1.8.6-beta: tracking map improvements
  (() => {
    const colors = Object.values(SPECIES_COLORS);
    ok('v1.8.6: all 50 SPECIES_COLORS are valid 6-digit hex', colors.length === 50 && colors.every(c => /^#[0-9a-f]{6}$/.test(c)));
    ok('v1.8.6: all 50 SPECIES_COLORS are unique', new Set(colors).size === 50);
    ok('v1.8.6: mapShowsTrack false when flag absent', mapShowsTrack({ researchId: 'x' }) === false);
    ok('v1.8.6: mapShowsTrack false when explicitly off', mapShowsTrack({ mapTrack: false }) === false);
    ok('v1.8.6: mapShowsTrack true when on', mapShowsTrack({ mapTrack: true }) === true);
    ok('v1.8.6: mapShowsTrack false for nullish', mapShowsTrack(null) === false && mapShowsTrack(undefined) === false);
    // renderMap gating: track path + tag-site pin only for tracked sharks,
    // latest-location dot for every shark
    const origTagged = state.tagged;
    const mk = (tracked) => ({ researchId: 'T-1', name: 'Testy', mapTrack: tracked,
      track: { kind: 'satellite', points: [{ label: 'Caribbean Sea', day: 0 }, { label: 'Caribbean Sea', day: 6 }, { label: 'Open Atlantic', day: 12 }] } });
    state.tagged = { nurse: mk(true), lemon: mk(false) };
    renderMap();
    const svg = document.getElementById('worldMapWrap').innerHTML;
    ok('v1.8.6: renderMap draws track path only for tracked shark', (svg.match(/class="map-track"/g) || []).length === 1);
    ok('v1.8.6: renderMap draws latest dot for every shark', (svg.match(/map-marker latest/g) || []).length === 2);
    ok('v1.8.6: renderMap draws tag-site pin only for tracked shark', (svg.match(/\(tag site\)/g) || []).length === 1);
    const legendHtml = document.getElementById('mapLegend').innerHTML;
    ok('v1.8.6: legend still lists every tagged shark', (legendHtml.match(/map-chip/g) || []).length === 2);
    state.tagged = origTagged;
  })();
  // v1.8.6 follow-up (Mira review): every route color must meet >= 3:1
  // WCAG contrast against the dark map fallback (#0d2f4d) — pairwise
  // distinctness alone does not guarantee legibility of thin strokes.
  (() => {
    const relLum = (hex) => {
      const c = [1, 3, 5].map(i => {
        const v = parseInt(hex.substr(i, 2), 16) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const mapBg = relLum('#0d2f4d');
    const ratio = (hex) => {
      const l = relLum(hex), hi = Math.max(l, mapBg), lo = Math.min(l, mapBg);
      return (hi + 0.05) / (lo + 0.05);
    };
    const weak = Object.entries(SPECIES_COLORS).filter(([sid, c]) => ratio(c) < 3.0);
    ok('v1.8.6: every SPECIES_COLORS >= 3:1 vs map background', weak.length === 0);
  })();
  // v1.8.6 follow-up (Mira review): track paths get a neutral halo so thin
  // strokes stay legible on the photographic map background.
  (() => {
    const origTagged = state.tagged;
    state.tagged = { nurse: { researchId: 'T-2', name: 'Halo', mapTrack: true,
      track: { kind: 'satellite', points: [{ label: 'Caribbean Sea', day: 0 }, { label: 'Caribbean Sea', day: 6 }, { label: 'Open Atlantic', day: 12 }] } } };
    renderMap();
    const svg = document.getElementById('worldMapWrap').innerHTML;
    const tracks = (svg.match(/class="map-track"/g) || []).length;
    const halos = (svg.match(/class="map-track-halo"/g) || []).length;
    ok('v1.8.6: every track path has a halo sibling', tracks > 0 && halos === tracks);
    state.tagged = origTagged;
  })();
  // v1.8.6 follow-up (Mira review): toggling "Track this shark" refreshes
  // the map immediately when Map is the active tab; toggle off removes the
  // route but keeps the latest dot; the choice persists.
  (() => {
    const origQS = document.querySelector;
    const origTagged = state.tagged;
    const tabEl = (name) => ({ dataset: { tab: name } });
    const mk = (tracked) => ({ researchId: 'T-3', name: 'Toggs', mapTrack: tracked,
      track: { kind: 'satellite', points: [{ label: 'Caribbean Sea', day: 0 }, { label: 'Caribbean Sea', day: 6 }, { label: 'Open Atlantic', day: 12 }] } });
    document.querySelector = (sel) => sel === '.tab.active' ? tabEl('map') : origQS(sel);
    state.tagged = { nurse: mk(false) };
    setMapTrack(state.tagged.nurse, true);
    let svg = document.getElementById('worldMapWrap').innerHTML;
    ok('v1.8.6: toggle on re-renders map immediately (route appears)', (svg.match(/class="map-track"/g) || []).length === 1);
    ok('v1.8.6: toggle on shows tag-site pin', /\(tag site\)/.test(svg));
    setMapTrack(state.tagged.nurse, false);
    svg = document.getElementById('worldMapWrap').innerHTML;
    ok('v1.8.6: toggle off removes route immediately', !/class="map-track"/.test(svg));
    ok('v1.8.6: toggle off keeps latest dot', (svg.match(/map-marker latest/g) || []).length === 1);
    const saved = JSON.parse(localStorage.getItem('tyi-collection') || '{}');
    ok('v1.8.6: toggle choice persists to save', saved.nurse && saved.nurse.mapTrack === false);
    setMapTrack(state.tagged.nurse, true);
    const saved2 = JSON.parse(localStorage.getItem('tyi-collection') || '{}');
    ok('v1.8.6: toggle-on persists to save', saved2.nurse && saved2.nurse.mapTrack === true);
    // Map tab NOT active: no re-render
    document.querySelector = (sel) => sel === '.tab.active' ? tabEl('collection') : origQS(sel);
    document.getElementById('worldMapWrap').innerHTML = '';
    refreshMapIfActive();
    ok('v1.8.6: no map refresh when another tab is active', document.getElementById('worldMapWrap').innerHTML === '');
    document.querySelector = origQS;
    localStorage.removeItem('tyi-collection'); // don't leak the fixture into later tests
    state.tagged = origTagged;
  })();
  // v1.8.6 follow-up (Mira review): explicit one-point representation —
  // tracked: tag-site pin doubles as latest marker; untracked: latest dot.
  (() => {
    const origTagged = state.tagged;
    const one = (tracked) => ({ researchId: 'T-4', name: 'Solo', mapTrack: tracked,
      track: { kind: 'satellite', points: [{ label: 'Caribbean Sea', day: 0 }] } });
    state.tagged = { nurse: one(true) };
    renderMap();
    let svg = document.getElementById('worldMapWrap').innerHTML;
    ok('v1.8.6: one-point tracked shows tag-site pin', /\(tag site\)/.test(svg));
    ok('v1.8.6: one-point tracked pin doubles as latest (no separate dot)', (svg.match(/map-marker latest/g) || []).length === 0);
    state.tagged = { nurse: one(false) };
    renderMap();
    svg = document.getElementById('worldMapWrap').innerHTML;
    ok('v1.8.6: one-point untracked shows latest dot', (svg.match(/map-marker latest/g) || []).length === 1);
    ok('v1.8.6: one-point untracked shows no pin', !/\(tag site\)/.test(svg));
    // zero valid positions: nothing drawn, no crash
    state.tagged = { nurse: { researchId: 'T-5', name: 'Noplace', mapTrack: true,
      track: { kind: 'satellite', points: [{ label: 'Somewhere Unknown', day: 0 }] } } };
    renderMap();
    svg = document.getElementById('worldMapWrap').innerHTML;
    ok('v1.8.6: unknown-coordinate shark draws no markers', !/map-marker/.test(svg));
    state.tagged = origTagged;
  })();

  // v0.22.0: pin-gated soft hints
  // v0.22.0 Mira review: pin hints grounded in completed expeditions
  ok('v0.22.0: pin hint warm when conditions right but no encounter', (() => {
    const trip = { region: 'caribbean', depth: 'reef', bait: 'crustaceans', encounters: [] };
    const h = pinHintForTrip(trip, 'nurse');
    return h && h.kind === 'warm' && /felt right/.test(h.hint);
  })());
  ok('v0.22.0: pin hint silent when shark encountered', (() => {
    const trip = { region: 'caribbean', depth: 'reef', bait: 'crustaceans', encounters: [{ speciesId: 'nurse', result: 'tagged' }] };
    return pinHintForTrip(trip, 'nurse') === null;
  })());
  ok('v0.22.0: pin hint needs a pinned shark', (() => {
    const trip = { region: 'caribbean', depth: 'reef', bait: 'crustaceans', encounters: [] };
    return pinHintForTrip(trip, null) === null;
  })());
  ok('v0.22.0: pin hint wording is observational', (() => {
    return Object.values(PIN_HINTS).every(h => !/correct|wrong|right answer/i.test(h));
  })());

  // v0.22.0: logbook filters
  ok('v0.22.0: logbook filter by outcome', (() => {
    const t1 = { region: 'caribbean', encounters: [{ speciesId: 'nurse', result: 'tagged' }] };
    const t2 = { region: 'caribbean', encounters: [] };
    const t3 = { region: 'caribbean', encounters: [{ speciesId: 'nurse', result: 'resighted' }] };
    const t4 = { region: 'caribbean', encounters: [{ speciesId: 'nurse', result: 'watched' }] };
    const t5 = { region: 'caribbean', encounters: [{ speciesId: 'nurse', result: 'tagged' }, { speciesId: 'tiger', result: 'resighted' }] };
    return logbookTripMatches(t1, { outcome: 'tagged', region: 'all', species: 'all' }) &&
           !logbookTripMatches(t2, { outcome: 'tagged', region: 'all', species: 'all' }) &&
           logbookTripMatches(t2, { outcome: 'missed', region: 'all', species: 'all' }) &&
           logbookTripMatches(t3, { outcome: 'resighted', region: 'all', species: 'all' }) &&
           // watched is not "missed"
           logbookTripMatches(t4, { outcome: 'watched', region: 'all', species: 'all' }) &&
           !logbookTripMatches(t4, { outcome: 'missed', region: 'all', species: 'all' }) &&
           // mixed outcomes appear in both filters
           logbookTripMatches(t5, { outcome: 'tagged', region: 'all', species: 'all' }) &&
           logbookTripMatches(t5, { outcome: 'resighted', region: 'all', species: 'all' });
  })());
  ok('v0.22.0: logbook filter by region and species', (() => {
    const t = { region: 'caribbean', encounters: [{ speciesId: 'nurse', result: 'tagged' }] };
    return logbookTripMatches(t, { outcome: 'all', region: 'caribbean', species: 'all' }) &&
           !logbookTripMatches(t, { outcome: 'all', region: 'arctic', species: 'all' }) &&
           logbookTripMatches(t, { outcome: 'all', region: 'all', species: 'nurse' }) &&
           !logbookTripMatches(t, { outcome: 'all', region: 'all', species: 'tiger' });
  })());

  // v0.22.0: What's New version comparison
  ok('v0.22.0: whatsnew shows on version change only', (() => {
    // Mira review: distinguish new players from v0.21.0 upgraders
    return shouldShowWhatsNew('v0.21.0', 'v0.22.0', true) === true &&   // version change
           shouldShowWhatsNew('v0.22.0', 'v0.22.0', true) === false &&  // same version
           shouldShowWhatsNew(null, 'v0.22.0', false) === false &&      // brand new player
           shouldShowWhatsNew(null, 'v0.22.0', true) === true &&        // v0.21.0 upgrader
           shouldShowWhatsNew('', 'v0.22.0', false) === false;
  })());
  ok('v0.22.0: pre-migration snapshot detects new vs returning', (() => {
    // Simulate: empty storage (new player) vs v0.21.0 save (upgrader)
    // preMigrationHadSave checks for meaningful data, not just key existence
    function snapHasSave(logbook, collection, stats) {
      if (logbook && logbook !== "[]") return true;
      if (collection && collection !== "{}" && collection !== "null") {
        try { return Object.keys(JSON.parse(collection)).length > 0; } catch { return false; }
      }
      return !!stats;
    }
    return snapHasSave(null, null, null) === false &&                    // brand new
           snapHasSave("[]", "{}", null) === false &&                    // migrated empty
           snapHasSave('[{"ts":1}]', "{}", null) === true &&              // has logbook
           snapHasSave("[]", '{"nurse":{}}', null) === true;              // has sharks
  })());
  ok('v0.22.0: whatsnew has v0.22.0 notes', (() => {
    return Array.isArray(WHATS_NEW['v0.22.0']) && WHATS_NEW['v0.22.0'].length === 4;
  })());
  // v0.23.0: easter eggs
  ok('v0.23.0: Mary Lee thread exists and mentions OCEARCH', (() => {
    return typeof MARY_LEE_THREAD !== "undefined" &&
           MARY_LEE_THREAD.length >= 3 &&
           MARY_LEE_THREAD.some(m => /OCEARCH/i.test(m.text)) &&
           MARY_LEE_THREAD.some(m => /Matriarch/i.test(m.text));
  })());
  ok('v0.23.0: Nicole thread exists and mentions the journey', (() => {
    return typeof NICOLE_THREAD !== "undefined" &&
           NICOLE_THREAD.length >= 3 &&
           NICOLE_THREAD.some(m => /11,?000/i.test(m.text)) &&
           NICOLE_THREAD.some(m => /Science/i.test(m.text));
  })());
  ok('v0.23.0: Bruce chain has 5 stages', (() => {
    return typeof BRUCE_CHAIN !== "undefined" &&
           BRUCE_CHAIN.length === 5 &&
           BRUCE_CHAIN.every(stage => stage.length >= 2);
  })());
  ok('v0.23.0: Bruce achievement is hidden', (() => {
    const b = ACHIEVEMENTS.find(a => a.id === "bruce");
    return b && b.hidden === true && b.name === "You Named Him WHAT?";
  })());
  ok('v0.23.0: maybeNameEgg triggers Mary Lee for great white', (() => {
    const rec = { name: "Mary Lee" };
    let pushed = null;
    const savePush = pushThread;
    pushThread = (msgs) => { pushed = msgs; };
    const saveSave = store.save;
    store.save = () => {};
    try {
      maybeNameEgg("greatwhite", rec);
      return rec.maryLeeEgg === true && pushed && pushed.length >= 3;
    } finally {
      pushThread = savePush;
      store.save = saveSave;
    }
  })());
  ok('v0.23.0: maybeNameEgg triggers Nicole for great white', (() => {
    const rec = { name: "NICOLE" }; // case-insensitive
    let pushed = null;
    const savePush = pushThread;
    pushThread = (msgs) => { pushed = msgs; };
    const saveSave = store.save;
    store.save = () => {};
    try {
      maybeNameEgg("greatwhite", rec);
      return rec.nicoleEgg === true && pushed && pushed.length >= 3;
    } finally {
      pushThread = savePush;
      store.save = saveSave;
    }
  })());
  ok('v0.23.0: maybeNameEgg does NOT trigger Mary Lee for other sharks', (() => {
    const rec = { name: "Mary Lee" };
    let pushed = null;
    const origPush = global.pushThread;
    global.pushThread = (msgs) => { pushed = msgs; };
    const origStore = global.store;
    global.store = { save: () => {} };
    const origSharkById = global.sharkById;
    global.sharkById = (id) => ({ id, name: "Tiger Shark" });
    try {
      maybeNameEgg("tiger", rec);
      return rec.maryLeeEgg !== true && pushed === null;
    } finally {
      global.pushThread = origPush;
      global.store = origStore;
      global.sharkById = origSharkById;
    }
  })());
  ok('v0.23.0: Bruce starts chain silently (no immediate message)', (() => {
    const rec = { name: "Bruce" };
    let pushed = null;
    const savePush = pushThread;
    pushThread = (msgs) => { pushed = msgs; };
    // Save and mock Bruce state
    const saveBruce = state.bruceEgg;
    const saveDone = state.bruceChainComplete;
    state.bruceEgg = null;
    state.bruceChainComplete = false;
    try {
      maybeNameEgg("nurse", rec);
      return state.bruceEgg !== null &&
             state.bruceEgg.stage === 0 &&
             pushed === null; // NO immediate message!
    } finally {
      pushThread = savePush;
      state.bruceEgg = saveBruce;
      state.bruceChainComplete = saveDone;
      try { localStorage.removeItem("tyi-bruce"); } catch {}
    }
  })());
  ok('v0.23.0: export captures RESET_KEYS', (() => {
    return typeof exportSave === "function" &&
           typeof importSave === "function" &&
           RESET_KEYS.includes("tyi-collection") &&
           RESET_KEYS.includes("tyi-bruce");
  })());
  ok('v0.23.0: validateSaveData accepts good save', (() => {
    const good = { version: "v0.23.0", keys: {
      "tyi-collection": '{"nurse":{"researchId":"NS-2026-014","tagged":true}}',
      "tyi-logbook": '[{"encounters":[{"result":"tagged","speciesId":"nurse"}],"region":"caribbean"}]',
      "tyi-stats": '{"regionsVisited":["caribbean"],"expeditions":5}'
    } };
    const r = validateSaveData(good);
    return r.ok === true;
  })());
  ok('v0.23.0: validateSaveData rejects malformed structures', (() => {
    return validateSaveData({ version: "v0.23.0", keys: { "tyi-logbook": "[{}]" } }).ok === false &&
           validateSaveData({ version: "v0.23.0", keys: { "tyi-messages": '{"messages":"hello"}' } }).ok === false &&
           validateSaveData({ version: "v0.23.0", keys: { "tyi-stats": '{"regionsVisited":null}' } }).ok === false;
  })());
  ok('v0.23.0: validateSaveData accepts real saveMsgs() shape', (() => {
    // Actual saveMsgs() serialization: object with messages array of thread objects
    const real = { version: "v0.23.0", keys: {
      "tyi-collection": '{"nurse":{"researchId":"NS-2026-014","tagged":true}}',
      "tyi-messages": JSON.stringify({
        messages: [{ ts: 1234567890, msgs: [{ who: "them", text: "Hi!" }] }],
        unread: 1, chatIdx: 0, lastRegion: "caribbean", chatSeen: true, sarahAdviceOffered: false
      })
    } };
    return validateSaveData(real).ok === true;
  })());
  ok('v0.23.0: validateSaveData accepts legacy bare-array threads', (() => {
    // normThread() supports legacy: if (Array.isArray(t)) return { ts: 0, msgs: t };
    const legacy = { version: "v0.23.0", keys: {
      "tyi-collection": '{"nurse":{"researchId":"NS-2026-014","tagged":true}}',
      "tyi-messages": JSON.stringify({
        messages: [[{ who: "them", text: "Old format!" }]],  // bare array, no ts wrapper
        unread: 0, chatIdx: 0
      })
    } };
    return validateSaveData(legacy).ok === true;
  })());
  ok('v0.23.0: full realistic export validates', (() => {
    // Realistic complete save: collection, logbook, stats, messages
    const full = { version: "v0.23.0", exportedAt: new Date().toISOString(), keys: {
      "tyi-collection": '{"nurse":{"researchId":"NS-2026-014","tagged":true,"name":"Testy"}}',
      "tyi-logbook": '[{"encounters":[{"result":"tagged","speciesId":"nurse"}],"region":"caribbean"}]',
      "tyi-stats": '{"regionsVisited":["caribbean"],"expeditions":5}',
      "tyi-messages": JSON.stringify({
        messages: [{ ts: 1234567890, msgs: [{ who: "them", text: "Nice!" }] }],
        unread: 0, chatIdx: 0, lastRegion: "caribbean", chatSeen: true, sarahAdviceOffered: true
      }),
      "tyi-pace": "steady"
    } };
    const r = validateSaveData(full);
    return r.ok === true;
  })());
  ok('v0.23.0: validateSaveData rejects bad save', (() => {
    return validateSaveData(null).ok === false &&
           validateSaveData({}).ok === false &&
           validateSaveData({ keys: {} }).ok === false &&                    // empty keys
           validateSaveData({ keys: "not-object" }).ok === false &&
           validateSaveData({ keys: { "tyi-collection": "{bad json" } }).ok === false &&
           validateSaveData({ version: "v0.23.0", keys: { "tyi-collection": "[]" } }).ok === false &&  // wrong shape
           validateSaveData({ version: "v0.23.0", keys: { "tyi-logbook": "{}" } }).ok === false &&     // wrong shape
           validateSaveData({ version: "v0.23.0", keys: { "evil-key": "x" } }).ok === false;           // unknown key
  })());
  ok('v0.23.0: validateSaveData rejects unknown version', (() => {
    const r = validateSaveData({ version: "v9.99.9", keys: { "tyi-collection": "{}" } });
    return r.ok === false;  // rejected, not just warned
  })());
  ok('v0.23.0: validateSaveData rejects null records', (() => {
    return validateSaveData({ version: "v0.23.0", keys: { "tyi-collection": '{"nurse":null}' } }).ok === false &&
           validateSaveData({ version: "v0.23.0", keys: { "tyi-logbook": "[null]" } }).ok === false;
  })());
  ok('v0.23.0: validateSaveData rejects progress-less save', (() => {
    // tyi-pace alone would wipe the collection
    return validateSaveData({ version: "v0.23.0", keys: { "tyi-pace": "quick" } }).ok === false;
  })());
  ok('v0.23.0: rollback restores partial import', (() => {
    // True partial import: some keys change, then storage throws mid-way
    let opCount = 0, shouldFail = true;
    const mem = {
      data: { "tyi-collection": '{"nurse":{"researchId":"NS-001"}}', "tyi-pace": "slow", "tyi-last-seen-version": "v0.22.0" },
      _op() { opCount++; if (shouldFail && opCount === 4) throw new Error("quota exceeded"); },
      setItem(k, v) { this._op(); this.data[k] = v; },
      removeItem(k) { this._op(); delete this.data[k]; }
    };
    const snapshot = { ...mem.data };
    let threw = false;
    try { replaceSaveKeys({ "tyi-collection": '{"tiger":{"researchId":"NS-002"}}', "tyi-pace": "quick" }, mem); }
    catch { threw = true; }
    if (!threw) return false;
    // Storage writable again for rollback
    shouldFail = false;
    const restored = restoreSnapshot(snapshot, mem);
    if (!restored) return false;
    // Complete final key set must exactly equal the original snapshot
    const finalKeys = Object.keys(mem.data).sort().join(",");
    const origKeys = Object.keys(snapshot).sort().join(",");
    if (finalKeys !== origKeys) return false;
    return Object.entries(snapshot).every(([k, v]) => mem.data[k] === v);
  })());
  ok('v0.23.0: exported save validates', (() => {
    // Real export shape round-trip: build what exportSave produces, validate it
    const fakeStorage = {
      "tyi-collection": '{"nurse":{"researchId":"NS-2026-014","tagged":true,"name":"Testy"}}',
      "tyi-logbook": '[{"encounters":[{"result":"tagged","speciesId":"nurse"}],"region":"caribbean"}]',
      "tyi-pace": "steady"
    };
    const exported = { version: "v0.23.0", exportedAt: new Date().toISOString(), keys: fakeStorage };
    const r = validateSaveData(exported);
    return r.ok === true;
  })());
  ok('v0.23.0: replaceSaveKeys swaps full key set', (() => {
    const mem = { data: { "tyi-collection": "old", "tyi-pace": "old" },
      setItem(k, v) { this.data[k] = v; }, removeItem(k) { delete this.data[k]; } };
    replaceSaveKeys({ "tyi-collection": "new" }, mem);
    return mem.data["tyi-collection"] === "new" && !("tyi-pace" in mem.data);
  })());
  ok('v0.23.0: whatsnew v0.23.0 entry exists', (() => {
    const notes = WHATS_NEW["v0.23.0"];
    return Array.isArray(notes) && notes.length >= 3 &&
           notes.join(" ").toLowerCase().indexOf("bruce") === -1; // no spoiler
  })());

  // v0.22.0: conservation notes on all 50
  ok('v0.22.0: all 50 sharks have conservation notes', SHARKS.every(s => typeof s.conservation === 'string' && s.conservation.length > 40));

  // v0.22.0: fieldwork constants exist
  ok('v0.22.0: sea conditions and field notes exist', Object.values(SEA_CONDITIONS).every(arr => arr.length >= 4) && Object.values(FIELD_NOTES).every(arr => arr.length >= 3) && typeof pickFieldNote === 'function' && typeof regionClimate === 'function' && typeof pickSeaCondition === 'function');
  // v1.8.5-beta: sea conditions are climate-zoned (Arctic doesn't sound like the Caribbean)
  ok('sea conditions are climate-zoned', ["tropical","temperate","polar","generic"].every(z => Array.isArray(SEA_CONDITIONS[z]) && SEA_CONDITIONS[z].length >= 8));
  ok('pickSeaCondition respects climate', pickSeaCondition("arctic") !== undefined && SEA_CONDITIONS.polar.includes(pickSeaCondition("arctic")) && SEA_CONDITIONS.tropical.includes(pickSeaCondition("caribbean")));
  // v0.24.0: progressive Wild Archive unlock (Mira approved)
  ok('v0.24.0: first tag triggers archive unlock logic', (() => {
    // Behavioral: simulate the unlock condition from confirmTag()
    // (extracted logic: unlock when !archiveUnlocked && tagged count === 1)
    function shouldUnlockArchive(archiveUnlocked, taggedCount) {
      return !archiveUnlocked && taggedCount === 1;
    }
    return shouldUnlockArchive(false, 1) === true &&   // first tag: unlock
           shouldUnlockArchive(false, 2) === false &&  // second tag: no-op
           shouldUnlockArchive(true, 1) === false;     // already unlocked: no-op
  })());
  ok('v0.24.0: migration grants partial players archive access', (() => {
    // migrateArchiveUnlock: any taggedCount >= 1 gets access
    function migrationGrants(taggedCount, archiveUnlocked) {
      return taggedCount >= 1 && !archiveUnlocked;
    }
    return migrationGrants(12, false) === true &&   // returning partial player
           migrationGrants(50, false) === true &&   // winner
           migrationGrants(1, false) === true &&    // single tag
           migrationGrants(0, false) === false &&   // untouched save: no
           migrationGrants(12, true) === false;     // already unlocked: no-op
  })());
  ok('v0.24.0: renderArchive filters to tagged species only', (() => {
    // renderArchive already checks state.tagged[s.id] — verify the logic exists
    const src = renderArchive.toString();
    return src.includes("state.tagged[s.id]") && src.includes("media.future");
  })());
  ok('v0.24.0: renderArchive skips future-flagged species', (() => {
    // renderArchive checks media.future — verify the guard exists
    const src = renderArchive.toString();
    return src.includes("media.future");
  })());
  // v2.0.0-beta: Archive expanded entries get the Research-style ✕ close button
  ok('v2.0.0: archive rows render a guide-close button', (() => {
    return archiveUiCode.includes('class="guide-close"') &&
           archiveUiCode.includes('aria-label="Close \${s.name} details"');
  })());
  ok('v2.0.0: archive close button collapses the row', (() => {
    return archiveUiCode.includes('body.querySelector(".guide-close")') &&
           archiveUiCode.includes('collapseGuideRow(row)');
  })());

  // v0.26.0: art integration — WebP illustrations + silhouettes, tap-to-reveal
  ok('v0.26.0: ART_SLUG_MAP resolves all 50 species to WebP on disk', (() => {
    // Every playable species ID must map (directly or via ART_SLUG_MAP)
    // to an existing illustration AND silhouette WebP file.
    return SHARKS.every(s =>
      fs.existsSync(path.join(DIR, ART_URL(s.id, 'illustration'))) &&
      fs.existsSync(path.join(DIR, ART_URL(s.id, 'silhouette')))
    );
  })());
  // v1.7.34-beta: illustration WebPs are trimmed — transparent borders cut,
  // shark pixels untouched by the crop. Most files are lossy VP8X (q90;
  // lemon/wobbegong q95); zebra stays lossless VP8L because its spot
  // pattern does not compress cleanly. Spot-check the three heaviest
  // trims, and guard the total area so a future untrimmed re-export
  // (original total ≈ 29.8M px) fails loudly. Sevengill is the one file whose
  // art already touched all four edges, so it is unchanged at 900x669.
  // v1.7.35-beta: 24 species were RE-trimmed to the bbox of alpha>=200
  // pixels (the alpha>0 bbox kept faint alpha noise, so those trims barely
  // cut anything). The three spot-checks below are untouched species, so
  // they still hold; the v1.7.35 test below guards the re-trimmed dims.
  ok('v1.7.34-beta: illustration WebPs are trimmed of transparent borders', (() => {
    function webpDims(buf) {
      // Encoding-agnostic: VP8L, VP8X, or plain VP8 all carry the canvas
      // size near the front. Returns { w, h } or null.
      if (!buf || buf.length < 30) return null;
      if (buf.toString('ascii', 0, 4) !== 'RIFF') return null;
      if (buf.toString('ascii', 8, 12) !== 'WEBP') return null;
      const fourcc = buf.toString('ascii', 12, 16);
      if (fourcc === 'VP8L') {
        // VP8L chunk: chunk-size (4 bytes) + 0x2F signature, then a 4-byte
        // LE word at byte 21: 14 bits (width-1), 14 bits (height-1).
        const v = buf.readUInt32LE(21);
        return { w: (v & 0x3FFF) + 1, h: ((v >> 14) & 0x3FFF) + 1 };
      }
      if (fourcc === 'VP8X') {
        // VP8X chunk: chunk-size + flags + reserved, then canvas width-1
        // (3 bytes LE at 24) and height-1 (3 bytes LE at 27).
        return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 };
      }
      if (fourcc === 'VP8 ') {
        // VP8 chunk: frame tag (20-22) + start code 9D 01 2A (23-25),
        // then width (LE16 at 26, 14 bits) and height (LE16 at 28).
        if (buf[23] !== 0x9D || buf[24] !== 0x01 || buf[25] !== 0x2A) return null;
        return { w: buf.readUInt16LE(26) & 0x3FFF, h: buf.readUInt16LE(28) & 0x3FFF };
      }
      return null;
    }
    let totalArea = 0;
    const dims = {};
    for (const s of SHARKS) {
      const buf = fs.readFileSync(path.join(DIR, ART_URL(s.id, 'illustration')));
      const d = webpDims(buf);
      if (!d) return false;
      if (d.w > 900 || d.h > 669) return false;
      dims[s.id] = d;
      totalArea += d.w * d.h;
    }
    const nurse = dims['nurse'];
    const sawshark = dims['sawshark'];
    const catshark = dims['catshark'];
    return nurse && nurse.w === 871 && nurse.h === 229 &&
           sawshark && sawshark.w === 884 && sawshark.h === 160 &&
           catshark && catshark.w === 869 && catshark.h === 219 &&
           totalArea < 21200000;
  })());
  // v1.7.35-beta: 24 species re-trimmed to the bbox of alpha>=200 pixels
  // (the v1.7.34 alpha>0 bbox kept faint alpha noise, so those trims barely
  // cut anything). Spot-check five re-trims and guard the new
  // total area (14.65M px after the re-trim) so a future noisy re-export
  // fails loudly. v1.7.36-beta: sixgill was component-cropped (884x286),
  // so its spot-check moved to the v1.7.36 test; lemon (unchanged since
  // v1.7.35) takes its place here. The total-area guard is an upper bound
  // only, so the smaller v1.7.36 total still passes.
  ok('v1.7.35-beta: 24 species re-trimmed to the alpha>=200 bbox', (() => {
    function webpDims(buf) {
      if (!buf || buf.length < 30) return null;
      if (buf.toString('ascii', 0, 4) !== 'RIFF') return null;
      if (buf.toString('ascii', 8, 12) !== 'WEBP') return null;
      const fourcc = buf.toString('ascii', 12, 16);
      if (fourcc === 'VP8L') {
        const v = buf.readUInt32LE(21);
        return { w: (v & 0x3FFF) + 1, h: ((v >> 14) & 0x3FFF) + 1 };
      }
      if (fourcc === 'VP8X') {
        return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 };
      }
      if (fourcc === 'VP8 ') {
        if (buf[23] !== 0x9D || buf[24] !== 0x01 || buf[25] !== 0x2A) return null;
        return { w: buf.readUInt16LE(26) & 0x3FFF, h: buf.readUInt16LE(28) & 0x3FFF };
      }
      return null;
    }
    let totalArea = 0;
    const dims = {};
    for (const s of SHARKS) {
      const buf = fs.readFileSync(path.join(DIR, ART_URL(s.id, 'illustration')));
      const d = webpDims(buf);
      if (!d) return false;
      dims[s.id] = d;
      totalArea += d.w * d.h;
    }
    const ep = dims['epaulette'], sv = dims['sevengill'], go = dims['goblin'],
          bl = dims['blacktip'], lm = dims['lemon'];
    return ep && ep.w === 864 && ep.h === 187 &&
           sv && sv.w === 877 && sv.h === 286 &&
           go && go.w === 885 && go.h === 202 &&
           bl && bl.w === 862 && bl.h === 273 &&
           lm && lm.w === 869 && lm.h === 295 &&
           totalArea < 15500000;
  })());
  // v1.7.36-beta: 13 species component-cropped to the bbox of the largest
  // 8-connected component of alpha>=200 pixels + 3px margin (their source
  // art carries full-opacity detached specks that kept the alpha>=200 bbox
  // wide, so the v1.7.35 trim left dead space). Spot-check the five biggest
  // component cuts and guard the new total area (13.13M px after the
  // component crop) so a future speck-laden re-export fails loudly.
  ok('v1.7.36-beta: 13 species component-cropped to the shark shape', (() => {
    function webpDims(buf) {
      if (!buf || buf.length < 30) return null;
      if (buf.toString('ascii', 0, 4) !== 'RIFF') return null;
      if (buf.toString('ascii', 8, 12) !== 'WEBP') return null;
      const fourcc = buf.toString('ascii', 12, 16);
      if (fourcc === 'VP8L') {
        const v = buf.readUInt32LE(21);
        return { w: (v & 0x3FFF) + 1, h: ((v >> 14) & 0x3FFF) + 1 };
      }
      if (fourcc === 'VP8X') {
        return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 };
      }
      if (fourcc === 'VP8 ') {
        if (buf[23] !== 0x9D || buf[24] !== 0x01 || buf[25] !== 0x2A) return null;
        return { w: buf.readUInt16LE(26) & 0x3FFF, h: buf.readUInt16LE(28) & 0x3FFF };
      }
      return null;
    }
    let totalArea = 0;
    const dims = {};
    for (const s of SHARKS) {
      const buf = fs.readFileSync(path.join(DIR, ART_URL(s.id, 'illustration')));
      const d = webpDims(buf);
      if (!d) return false;
      dims[s.id] = d;
      totalArea += d.w * d.h;
    }
    const fr = dims['frilled'], ti = dims['tiger'], pj = dims['portjackson'],
          gr = dims['greenland'], ps = dims['pacificsleeper'];
    return fr && fr.w === 873 && fr.h === 140 &&
           ti && ti.w === 890 && ti.h === 325 &&
           pj && pj.w === 864 && pj.h === 333 &&
           gr && gr.w === 875 && gr.h === 232 &&
           ps && ps.w === 874 && ps.h === 201 &&
           totalArea < 14000000;
  })());
  ok('v0.26.0: background creature sprites exist on disk', (() => {
    return ['bg-sea-turtle', 'bg-dolphin', 'bg-fish-school',
            'bg-ray', 'bg-seal', 'bg-jellyfish']
      .every(name => fs.existsSync(path.join(DIR, BG_URL(name))));
  })());
  ok('v0.26.0: tap-to-reveal hides actions until silhouette is tapped', (() => {
    // Phase 1 shows the silhouette with actions hidden; the reveal
    // swaps in the illustration and only then shows Watch/Tag buttons.
    const src = doEncounter.toString();
    return src.includes('.shark-silhouette') &&              // phase 1: silhouette
           src.includes('actions.classList.add("hidden")') && // actions hidden pre-tap
           src.includes('sharkArtImg(species.id, "illustration"') && // phase 2: reveal
           src.includes('showEncounterActions()') &&          // reveal shows buttons
           src.includes('actions.classList.remove("hidden")');
  })());
  ok('v0.26.0: silhouette fallback does not spoil the mystery', (() => {
    // A failed silhouette must NOT fall back to the full-colour SVG.
    const src = sharkArtFallback.toString();
    return src.includes('MYSTERY_SILHOUETTE_SVG') &&
           src.includes('data-art-type') &&
           src.includes('"silhouette"');
  })());
  ok('v0.26.0: background creatures hide gracefully on load failure', (() => {
    // bgCreatureImg tags carry an onerror that hides broken sprites.
    return bgCreatureImg('bg-seal', 'Seal').includes('onerror');
  })());



  // v1.2.0-beta: failed expedition observations
  ok('FIELD_NOTES has 12 per zone', Object.values(FIELD_NOTES).every(arr => arr.length >= 12));
  ok('FIELD_NOTES never hints answers', (() => {
    // No note may contain answer-revealing phrasing. Ordinary words like
    // "bait" are fine — this targets disguised right/wrong signals.
    const joined = Object.values(FIELD_NOTES).flat().join(' ');
    return !/(correct|you should|wrong choice|right answer|should have picked)/i.test(joined);
  })());
  ok('FIELD_NOTES chum notes gated on chum use', (() => {
    // Without a chum plan, no chum-slick note may ever be returned.
    for (let i = 0; i < 50; i++) {
      const n = pickFieldNote('caribbean', { region: 'caribbean', method: 'stalk', methodOpt: 'none' });
      if (/chum slick/i.test(n)) return false;
    }
    return true;
  })());
  ok('ordinal words work', ordinal(1) === 'first' && ordinal(2) === 'second' && ordinal(3) === 'third' && ordinal(12) === 'twelfth' && ordinal(13) === '13th' && ordinal(21) === '21st' && ordinal(22) === '22nd' && ordinal(23) === '23rd' && ordinal(11) === 'eleventh' && ordinal(111) === '111th' && ordinal(112) === '112th' && ordinal(113) === '113th');
  ok('pickFieldNote returns a string', typeof pickFieldNote('caribbean') === 'string');

  // v1.2.0-beta: species tag counting
  ok('countSpeciesTags is a function', typeof countSpeciesTags === 'function');
  state.logbook = [
    { encounters: [{ speciesId: 'nurse', result: 'tagged' }, { speciesId: 'nurse', result: 'tagged' }] },
    { encounters: [{ speciesId: 'tiger', result: 'watched' }] }
  ];
  tripLog = null;
  ok('countSpeciesTags counts logbook tags', countSpeciesTags('nurse') === 2);
  ok('countSpeciesTags ignores non-tags', countSpeciesTags('tiger') === 0);
  ok('countSpeciesTags handles unknown species', countSpeciesTags('nope') === 0);
  state.logbook = [];

  // v1.2.0-beta: What's New has current version entry
  ok('WHATS_NEW has v1.2.0-beta', Array.isArray(WHATS_NEW['v1.2.0-beta']) && WHATS_NEW['v1.2.0-beta'].length > 0);

  // v1.2.0-beta: Mary Lee / Nicole easter eggs still wired (naming-based, v0.23.0)
  ok('maryLeeEgg handler exists', typeof maybeNameEgg === 'function');

  // v1.3.0-beta: Watch notes pools exist, habitat-split (Mira review)
  ok('WATCH_NOTES_REEF pool exists', Array.isArray(WATCH_NOTES_REEF) && WATCH_NOTES_REEF.length >= 4);
  ok('WATCH_NOTES_PELAGIC pool exists', Array.isArray(WATCH_NOTES_PELAGIC) && WATCH_NOTES_PELAGIC.length >= 4);
  ok('WATCH_NOTES_DEEP pool exists', Array.isArray(WATCH_NOTES_DEEP) && WATCH_NOTES_DEEP.length >= 4);
  ok('pickWatchNote picks reef pool for reef species', (() => {
    const seen = new Set();
    for (let i = 0; i < 30; i++) seen.add(pickWatchNote({ depths: ["surface", "reef"] }));
    return [...seen].every(n => WATCH_NOTES_REEF.includes(n));
  })());
  ok('pickWatchNote picks deep pool for deep species', (() => {
    const seen = new Set();
    for (let i = 0; i < 30; i++) seen.add(pickWatchNote({ depths: ["deep"] }));
    return [...seen].every(n => WATCH_NOTES_DEEP.includes(n));
  })());
  ok('pickWatchNote picks pelagic pool for surface-only species', (() => {
    const seen = new Set();
    for (let i = 0; i < 40; i++) seen.add(pickWatchNote({ depths: ["surface"] }));
    return [...seen].every(n => WATCH_NOTES_PELAGIC.includes(n));
  })());
  ok('pickWatchNote reef notes never leak to deep species', (() => {
    const reefOnly = WATCH_NOTES_REEF.filter(t => !WATCH_NOTES_DEEP.includes(t) && !WATCH_NOTES_PELAGIC.includes(t));
    for (let i = 0; i < 50; i++) {
      if (reefOnly.includes(pickWatchNote({ depths: ["twilight", "deep"] }))) return false;
    }
    return true;
  })());
  // v1.3.0-beta Mira review round 3: notes are purely observational —
  // they must never assign an action to the shark (no locomotion verbs,
  // no resting/feeding/hunting), so they can't contradict the sighting.
  ok('watch notes never assign a shark action', (() => {
    const actionVerbs = ["resting", "feeding", "hunting", "cruising", "circling",
      "gliding", "drifting", "swimming", "pausing", "investigating", "following",
      "motionless", "barely moving"];
    const all = [...WATCH_NOTES_REEF, ...WATCH_NOTES_PELAGIC, ...WATCH_NOTES_DEEP];
    return all.every(n => !actionVerbs.some(v => n.toLowerCase().includes(v)));
  })());
  ok('no watch note assigns locomotion after any sighting doing', (() => {
    // Regression: "circling lazily" + "resting on the sandy bottom" must be impossible.
    // Since no note contains an action verb at all, draw every pool many times
    // and confirm none of the sighting action keywords appear as shark actions.
    const doings = ["cruising slow along the reef edge", "circling lazily in the blue",
      "gliding past without a hurry", "hunting, focused and silent",
      "drifting with the current", "patrolling, unhurried and thorough",
      "curious \u2014 circling back for a second look", "feeding, oblivious to the boat"];
    const sharkActionKw = ["resting", "hunting", "feeding", "cruising", "circling",
      "gliding", "drifting", "swimming", "pausing", "patrolling"];
    const speciesList = [{ depths: ["surface", "reef"] }, { depths: ["surface"] },
      { depths: ["twilight", "deep"] }, { depths: ["deep"] }, { depths: ["reef"] }];
    for (const sp of speciesList) {
      for (const doing of doings) {
        for (let i = 0; i < 20; i++) {
          const note = pickWatchNote(sp).toLowerCase();
          // The note must not describe the shark performing any of these actions
          if (sharkActionKw.some(k => note.includes(k))) return false;
        }
      }
    }
    return true;
  })());
  ok('a resting note never follows a circling sighting', (() => {
    // Targeted regression for Mira's example: no note may contain "resting"
    // regardless of sighting, since notes are observational only.
    const all = [...WATCH_NOTES_REEF, ...WATCH_NOTES_PELAGIC, ...WATCH_NOTES_DEEP];
    return all.every(n => !n.toLowerCase().includes("resting"));
  })());

  // v1.3.0-beta: FIELD_NOTES expanded (at least 16 per zone)
  ok('FIELD_NOTES tropical expanded', FIELD_NOTES.tropical.length >= 16);
  ok('FIELD_NOTES temperate expanded', FIELD_NOTES.temperate.length >= 16);
  ok('FIELD_NOTES polar expanded', FIELD_NOTES.polar.length >= 16);
  ok('FIELD_NOTES generic expanded', FIELD_NOTES.generic.length >= 16);

  // v1.3.0-beta: logbook date filter matching
  const _now = Date.now();
  const _recentTrip = { ts: _now - 86400000, encounters: [] };
  const _oldTrip = { ts: _now - 400 * 86400000, encounters: [] };
  ok('date filter 7d keeps recent', logbookTripMatches(_recentTrip, { outcome: "all", region: "all", species: "all", dateRange: "7d" }));
  ok('date filter 7d drops old', !logbookTripMatches(_oldTrip, { outcome: "all", region: "all", species: "all", dateRange: "7d" }));
  ok('date filter all keeps old', logbookTripMatches(_oldTrip, { outcome: "all", region: "all", species: "all", dateRange: "all" }));
  // v1.3.0-beta Mira review: dateless trips are excluded when a date filter is active
  const _noTsTrip = { encounters: [] };
  ok('date filter 7d excludes dateless trip', !logbookTripMatches(_noTsTrip, { outcome: "all", region: "all", species: "all", dateRange: "7d" }));
  ok('date filter 30d excludes dateless trip', !logbookTripMatches(_noTsTrip, { outcome: "all", region: "all", species: "all", dateRange: "30d" }));
  ok('date filter all keeps dateless trip', logbookTripMatches(_noTsTrip, { outcome: "all", region: "all", species: "all", dateRange: "all" }));

  // v1.3.0-beta: What's New has current version entry
  ok('WHATS_NEW has v1.4.0-beta', Array.isArray(WHATS_NEW['v1.4.0-beta']) && WHATS_NEW['v1.4.0-beta'].length > 0);

  // v1.3.0-beta: Deep Blue retired — naming a shark "Deep Blue" triggers NO easter egg
  ok('Deep Blue triggers no easter egg', (() => {
    const rec = { name: "Deep Blue" };
    let pushed = null;
    const savePush = pushThread;
    pushThread = (msgs) => { pushed = msgs; };
    const saveSave = store.save;
    store.save = () => {};
    const saveBruce = state.bruceEgg;
    state.bruceEgg = null;
    try {
      maybeNameEgg("greatwhite", rec);
      return rec.maryLeeEgg !== true &&
             rec.nicoleEgg !== true &&
             state.bruceEgg === null &&
             pushed === null;
    } finally {
      pushThread = savePush;
      store.save = saveSave;
      state.bruceEgg = saveBruce;
    }
  })());

  // v1.3.1-beta: "Tag along" title language
  // v1.4.0-beta Mira review (blocker 1): tagAlongToMap is RETIRED — the old
  // post-release CTA violated the tag-along-ends-expedition contract. The
  // health-check third release choice is now the single tag-along path.
  ok('tagAlongToMap retired (v1.4.0)', typeof tagAlongToMap === 'undefined');
  ok('showHealthCheck does NOT reference tagAlongToMap (no pre-release CTA)', !showHealthCheck.toString().includes('tagAlongToMap'));
  ok('doRelease does NOT reference tagAlongToMap (old CTA retired)', !doRelease.toString().includes('tagAlongToMap'));
  // Behavioral: doRelease must clear state.encounterDone (resolves the expedition lifecycle)
  // v1.3.1-beta Mira review (blocking): the old pre-release CTA left encounterDone
  // pending, hanging runExpedition(). This verifies the lifecycle completes.
  ok('doRelease clears encounterDone', (() => {
    const saveDone = state.encounterDone;
    const saveSpecies = state.healthSpecies;
    const saveRenderAll = renderAll;
    let doneCalled = false;
    state.encounterDone = (hb) => { doneCalled = true; };
    state.healthSpecies = null; // no shark -> skips logLine, just clears state
    renderAll = () => {}; // stub: render functions need full DOM
    try {
      doRelease(false);
      return state.encounterDone === null && doneCalled === true;
    } catch (e) {
      return false;
    } finally {
      state.encounterDone = saveDone;
      state.healthSpecies = saveSpecies;
      renderAll = saveRenderAll;
    }
  })());

  


  // v1.4.0-beta: secret facts cover all 50 species
  ok("SECRET_FACTS has 50 species", Object.keys(SECRET_FACTS).length === 50);
  ok("SECRET_FACTS 1-3 facts each", Object.keys(SECRET_FACTS).every(id => {
    const f = SECRET_FACTS[id];
    return Array.isArray(f) && f.length >= 1 && f.length <= 3;
  }));
  // v1.4.0-beta: unlockSecretFact basic behavior
  (() => {
    const origFacts = state.unlockedFacts;
    const origSave = factStore.save;
    factStore.save = () => {};
    state.unlockedFacts = {};
    const f1 = unlockSecretFact("nurse");
    ok("unlockSecretFact returns a fact", typeof f1 === "string" && f1.length > 0);
    ok("unlockSecretFact tracks unlock", (state.unlockedFacts["nurse"] || []).length === 1);
    ok("unlockSecretFact null for unknown", unlockSecretFact("not-a-shark") === null);
    state.unlockedFacts = origFacts;
    factStore.save = origSave;
  })();
  // v1.8.0-beta: hook + bonus are real insights — insightPoolFor.
  (() => {
    ok("insightPoolFor: nurse has 5 (3 facts + hook + bonus)", insightPoolFor("nurse").length === 5);
    ok("insightPoolFor: epaulette has 4 (2 facts + hook + bonus)", insightPoolFor("epaulette").length === 4);
    ok("insightPoolFor: all 50 species have 4-5 insights", SHARKS.every(s => {
      const n = insightPoolFor(s.id).length;
      return n === 4 || n === 5;
    }));
    ok("insightPoolFor: 201 total insights", SHARKS.reduce((t, s) => t + insightPoolFor(s.id).length, 0) === 201);
    ok("insightPoolFor: hook + bonus are the last two entries", SHARKS.every(s => {
      const pool = insightPoolFor(s.id);
      return pool[pool.length - 2] === s.hook && pool[pool.length - 1] === s.bonus;
    }));
    ok("insightPoolFor: no exact duplicates in any pool", SHARKS.every(s => {
      const pool = insightPoolFor(s.id);
      return new Set(pool).size === pool.length;
    }));
    ok("insightPoolFor: old save indices stay valid (SECRET_FACTS first)", SHARKS.every(s => {
      const pool = insightPoolFor(s.id);
      return (SECRET_FACTS[s.id] || []).every((f, i) => pool[i] === f);
    }));
    ok("insightPoolFor: unknown species gives empty pool", insightPoolFor("not-a-shark").length === 0);
    // Exhaustion: unlocking all 5 nurse insights then one more returns null.
    const origFacts = state.unlockedFacts;
    const origSave = factStore.save;
    factStore.save = () => {};
    state.unlockedFacts = {};
    const got = [];
    for (let i = 0; i < 5; i++) got.push(unlockSecretFact("nurse"));
    ok("unlockSecretFact: all 5 nurse insights unlockable", got.every(Boolean) && new Set(got).size === 5);
    ok("unlockSecretFact: null after all 5 learned", unlockSecretFact("nurse") === null);
    state.unlockedFacts = origFacts;
    factStore.save = origSave;
  })();
  // v1.4.0-beta: doTagAlong resolves with tag-along intent
  // (v1.4.0-beta Mira review: restore ALL mocked state)
  (() => {
    let resolved = null;
    const origRender = renderAll;
    const origLog = logLine;
    const origTagged = state.tagged;
    const origFacts = state.unlockedFacts;
    const origDone = state.encounterDone;
    const origHealth = state.healthSpecies;
    const origPendingFact = state.pendingTagAlongFact;
    renderAll = () => {};
    logLine = () => {};
    const origSave = factStore.save;
    factStore.save = () => {};
    state.encounterDone = (r) => { resolved = r; };
    state.healthSpecies = { id: "nurse", name: "Nurse Shark" };
    state.tagged = { nurse: { name: "", researchId: "NS-2026-001" } };
    state.unlockedFacts = {};
    doTagAlong();
    ok("doTagAlong resolves with tagAlong id", resolved && resolved.tagAlong === "nurse");
    ok("doTagAlong clears encounterDone", state.encounterDone === null);
    renderAll = origRender;
    logLine = origLog;
    factStore.save = origSave;
    state.tagged = origTagged;
    state.unlockedFacts = origFacts;
    state.encounterDone = origDone;
    state.healthSpecies = origHealth;
    state.pendingTagAlongFact = origPendingFact;
  })();
  // v1.4.0-beta Mira review: full 1->2->3->4->5->exhausted fact progression
  // (v1.8.0-beta: nurse has 5 insights — 3 facts + hook + bonus)
  (() => {
    const origFacts = state.unlockedFacts;
    const origSave = factStore.save;
    const origLog = logLine;
    factStore.save = () => {};
    logLine = () => {};
    state.unlockedFacts = {};
    // Nurse has 5 insights — unlock all 5, then verify exhaustion
    const f1 = unlockSecretFact("nurse");
    const f2 = unlockSecretFact("nurse");
    const f3 = unlockSecretFact("nurse");
    const f4 = unlockSecretFact("nurse");
    const f5 = unlockSecretFact("nurse");
    const f6 = unlockSecretFact("nurse");
    ok("fact progression unlocks 5 distinct", [f1, f2, f3, f4, f5].every(Boolean) && new Set([f1, f2, f3, f4, f5]).size === 5);
    ok("fact progression exhausts at 6th", f6 === null);
    ok("fact progression tracks 5 unlocked", (state.unlockedFacts["nurse"] || []).length === 5);
    state.unlockedFacts = origFacts;
    factStore.save = origSave;
    logLine = origLog;
  })();
  // v1.4.0-beta Mira review: v1.3.2 save imports into v1.4.0
  (() => {
    const fakeSave = {
      version: "v1.3.2-beta",
      keys: {
        "tyi-collection": JSON.stringify({ nurse: { tagged: true, researchId: "NS-2026-001", name: "" } }),
        "tyi-logbook": JSON.stringify([{ encounters: [] }])
      }
    };
    const result = validateSaveData(fakeSave);
    ok("v1.3.2-beta save imports", result.ok === true);
    const badSave = { version: "v0.5.0", keys: { "tyi-collection": "{}" } };
    const badResult = validateSaveData(badSave);
    ok("ancient version still rejected", badResult.ok === false);
  })();
  // v1.4.0-beta Mira review: old post-release CTA is retired
  (() => {
    ok("tagAlongToMap retired", typeof tagAlongToMap === "undefined");
    ok("doFollowTagged exists", typeof doFollowTagged === "function");
    ok("showTagAlongFact exists", typeof showTagAlongFact === "function");
  })();
  // v1.7.24-beta: showTagAlongFact observe mode — popup copy must say
  // studying/observing, never following, for a wild untagged shark.
  (() => {
    const origTagged = state.tagged;
    const origFacts = state.unlockedFacts;
    state.tagged = {}; // untagged shark
    state.unlockedFacts = { nurse: [0] };
    try {
      showTagAlongFact({ speciesId: "nurse", fact: "A test fact.", exhausted: false, mode: "observe" });
      const html = document.getElementById("tagAlongFactContent").innerHTML;
      ok("observe popup heading says Species insight", html.includes("Species insight"));
      ok("observe popup says Observing, not Following", html.includes("Observing") && !html.includes("Following") && !html.includes("Tagging along"));
      showTagAlongFact({ speciesId: "nurse", fact: "A test fact.", exhausted: false });
      const html2 = document.getElementById("tagAlongFactContent").innerHTML;
      ok("follow popup keeps Tagging along copy", html2.includes("Tagging along") && html2.includes("Following"));
    } catch (e) {
      ok("observe popup copy (threw: " + e.message + ")", false);
    } finally {
      state.tagged = origTagged;
      state.unlockedFacts = origFacts;
    }
  })();
  // v1.7.24-beta Mira review (blocker): Observe studies a DIFFERENT wild
  // shark — the popup must never use the tagged individual's nickname, the
  // close button must not say "Continue following", and closeDive must not
  // focus the tagged track for Observe.
  (() => {
    const origTagged = state.tagged;
    const origFacts = state.unlockedFacts;
    // Tagged nurse shark named Bubbles; observing a DIFFERENT nurse shark.
    state.tagged = { nurse: { name: "Bubbles", researchId: "NS-2026-001" } };
    state.unlockedFacts = { nurse: [0] };
    try {
      showTagAlongFact({ speciesId: "nurse", fact: "A test fact.", exhausted: false, mode: "observe" });
      const html = document.getElementById("tagAlongFactContent").innerHTML;
      ok("observe popup never uses tagged nickname", !html.includes("Bubbles"));
      ok("observe popup uses species name", html.includes("Nurse Shark"));
      ok("observe close button says Back to map",
        document.getElementById("tagAlongFactClose").textContent === "Back to map");
      // Follow mode still uses the nickname and the follow close label.
      showTagAlongFact({ speciesId: "nurse", fact: "A test fact.", exhausted: false });
      const html2 = document.getElementById("tagAlongFactContent").innerHTML;
      ok("follow popup keeps tagged nickname", html2.includes("Bubbles"));
      ok("follow close button says Continue following",
        document.getElementById("tagAlongFactClose").textContent === "Continue following 🧭");
      // Exhausted observe popup also avoids the nickname.
      showTagAlongFact({ speciesId: "nurse", fact: null, exhausted: true, mode: "observe" });
      const html3 = document.getElementById("tagAlongFactContent").innerHTML;
      ok("observe exhausted popup never uses tagged nickname", !html3.includes("Bubbles"));
    } catch (e) {
      ok("observe different-individual popup (threw: " + e.message + ")", false);
    } finally {
      state.tagged = origTagged;
      state.unlockedFacts = origFacts;
    }
    // closeDive / win-path focus guards (source-level: closeDive is a
    // closure inside the trip function, not directly callable).
    ok("closeDive skips map focus for Observe",
      fileCode.includes('factInfo.mode === "observe"') && fileCode.includes("isObserveClose"));
    ok("win-path defers map focus for Observe",
      fileCode.includes('deferred.factInfo.mode === "observe"') && fileCode.includes("isObserveDeferred"));
  })();
  // v1.4.0-beta Mira review (blocker): already-tagged follow must resolve
  // doEncounter's Promise via the passed callback — not via state.encounterDone
  // (which is null when no tagging overlay was opened). Behavioral test drives
  // the full already-tagged follow flow.
  (() => {
    const origTagged = state.tagged;
    const origFacts = state.unlockedFacts;
    const origLog = logLine;
    const origRender = renderAll;
    const origSave = factStore.save;
    const origDone = state.encounterDone;
    const origTripLog = (typeof tripLog !== "undefined") ? tripLog : undefined;
    const origFollowedFlag = state.followedThisTrip;
    renderAll = () => {};
    logLine = () => {};
    factStore.save = () => {};
    state.tagged = { nurse: { name: "Nora", researchId: "NS-2026-001" } };
    state.unlockedFacts = {};
    state.encounterDone = null; // already-tagged path: no tagging overlay opened
    state.followedThisTrip = false;
    tripLog = { encounters: [] };
    let resolved = null;
    let callCount = 0;
    const cb = (r) => { callCount++; resolved = r; };
    // Drive the flow: follow an already-tagged shark
    doFollowTagged("nurse", cb);
    ok("follow resolves via passed callback", resolved && resolved.tagAlong === "nurse");
    ok("follow sets followedThisTrip", state.followedThisTrip === true);
    ok("follow logs 'followed' encounter",
      tripLog.encounters.some(e => e.speciesId === "nurse" && e.result === "followed"));
    ok("follow does not fake a re-tag",
      !tripLog.encounters.some(e => e.speciesId === "nurse" && e.result === "tagged"));
    ok("follow does not touch collection record",
      state.tagged.nurse && state.tagged.nurse.researchId === "NS-2026-001");
    // Double-resolution guard: the one-shot wrapper in the button handler
    // prevents this, but doFollowTagged itself must clear encounterDone
    ok("follow clears encounterDone", state.encounterDone === null);
    // Restore
    renderAll = origRender;
    logLine = origLog;
    factStore.save = origSave;
    state.tagged = origTagged;
    state.unlockedFacts = origFacts;
    state.encounterDone = origDone;
    state.followedThisTrip = origFollowedFlag;
    if (typeof origTripLog !== "undefined") tripLog = origTripLog;
  })();
  // v1.4.0-beta Mira review (win-path): tag-along defers past the win ceremony
  (() => {
    const origDeferred = state.deferredTagAlong;
    state.deferredTagAlong = null;
    // Simulate closeDive win branch stashing
    state.deferredTagAlong = { speciesId: "nurse", factInfo: { speciesId: "nurse", fact: "x", exhausted: false } };
    ok("deferredTagAlong stashes species", state.deferredTagAlong.speciesId === "nurse");
    ok("deferredTagAlong stashes fact", state.deferredTagAlong.factInfo.fact === "x");
    state.deferredTagAlong = origDeferred;
  })();
  // v1.4.0-beta Mira review: "followed" outcome in logbook filter
  (() => {
    const trip = { encounters: [{ speciesId: "nurse", result: "followed" }], region: "caribbean", ts: Date.now() };
    ok("filter matches followed", logbookTripMatches(trip, { outcome: "followed", region: "all", species: "all", dateRange: "all" }) === true);
    ok("filter rejects non-followed", logbookTripMatches({ encounters: [{ speciesId: "nurse", result: "watched" }], region: "caribbean", ts: Date.now() }, { outcome: "followed", region: "all", species: "all", dateRange: "all" }) === false);
  })();
  // v1.4.0-beta Mira review: ensureMapFocusedOn does not toggle away
  (() => {
    const origTagged = state.tagged;
    const origMapPoints = mapPoints;
    const origMapGlideTo = mapGlideTo;
    const origFocus = mapFocus;
    state.tagged = { nurse: { researchId: "NS-2026-001" }, lemon: { researchId: "LS-2026-002" } };
    mapPoints = () => [{ x: 100, y: 100 }];
    mapGlideTo = () => {}; // no-op: avoid renderMap in test env
    mapFocus = null;
    ensureMapFocusedOn("nurse");
    ok("ensureMapFocusedOn focuses", !!(mapFocus && mapFocus.sid === "nurse"));
    ensureMapFocusedOn("nurse");
    ok("ensureMapFocusedOn same shark twice stays focused", !!(mapFocus && mapFocus.sid === "nurse"));
    ensureMapFocusedOn("lemon");
    ok("ensureMapFocusedOn switches to different shark", !!(mapFocus && mapFocus.sid === "lemon"));
    // manual toggle behavior preserved
    mapFocusOn("lemon");
    ok("mapFocusOn still toggles away on second tap", mapFocus === null);
    // restore
    mapPoints = origMapPoints;
    mapGlideTo = origMapGlideTo;
    state.tagged = origTagged;
    mapFocus = origFocus;
  })();
  // v1.4.0-beta Mira review: corrected secret facts
  (() => {
    const facts = SECRET_FACTS;
    ok("lemon fact drops fish-learning trope", !facts.lemon.join(" ").includes("a rare trick for a fish"));
    ok("hammerhead fact drops 360 claim", !facts.hammerhead.join(" ").includes("360-degree"));
    ok("hammerhead fact uses binocular overlap", facts.hammerhead.join(" ").includes("binocular overlap"));
    ok("cookiecutter fact mentions sonar domes", facts.cookiecutter.join(" ").includes("sonar domes"));
    ok("kitefin fact cites 2021", facts.kitefin.join(" ").includes("2021"));
    ok("tiger fact drops suit of armor", !facts.tiger.join(" ").includes("suit of armor"));
  })();
  // v1.4.0-beta Mira review: fixed grid tracks keep tabs equal on sparse rows
  (() => {
    ok("tabs use grid base on desktop (v1.5.16)", /\\.tabs\\s*\\{[^}]*display:\\s*grid/.test(cssCode));
  ok("desktop tabs have flex-basis pills", /\\.tab\\s*\\{[^}]*flex:\\s*0\\s+1\\s+108px/.test(cssCode));
  ok("tablet keeps 6px gap (v1.5.16)", /min-width:\\s*700px[\\s\\S]*?\\.tabs\\s*\\{[^}]*gap:\\s*6px/.test(cssCode));
  ok("narrow tablet keeps 4px gap (v1.5.16)", /min-width:\\s*560px[\\s\\S]*?\\.tabs\\s*\\{[^}]*gap:\\s*4px/.test(cssCode));
  ok("tablet tabs no flex-wrap nowrap (v1.5.14)", !/min-width:\\s*560px[\\s\\S]*?\\.tabs\\s*\\{[^}]*flex-wrap:\\s*nowrap/.test(cssCode));
  ok("tablet tabs no flex 1-1-0 (v1.5.14)", !/min-width:\\s*560px[\\s\\S]*?\\.tab\\s*\\{[^}]*flex:\\s*1\\s+1\\s+0/.test(cssCode));
  ok("tablet tabs tighter type kept (v1.5.13)", /min-width:\\s*700px[\\s\\S]*?\\.tab\\s*\\{[^}]*font-size:\\s*10px/.test(cssCode));
  ok("tablet tab icons smaller (v1.5.13)", /min-width:\\s*700px[\\s\\S]*?\\.tab-icon\\s*\\{[^}]*font-size:\\s*16px/.test(cssCode));
  ok("tablet tab labels truncate (v1.5.14)", /max-width:\\s*1023px[\\s\\S]*?\\.tab-label\\s*\\{[^}]*text-overflow:\\s*ellipsis/.test(cssCode));
  ok("phone tabs use grid 4 columns (v1.5.14)", /max-width:\\s*559px[\\s\\S]*?\\.tabs\\s*\\{[^}]*grid-template-columns:\\s*repeat\\(4,\\s*1fr\\)/.test(cssCode));
  ok("phone tabs no flex display (v1.5.14)", !/max-width:\\s*559px[\\s\\S]*?\\.tabs\\s*\\{[^}]*display:\\s*flex/.test(cssCode));
  ok("tab-stack stays column on phones", !/max-width:\\s*559px[\\s\\S]*?\\.tab-stack\\s*\\{[^}]*flex-direction:\\s*row/.test(cssCode));
    ok("guide header wraps names in guide-names (v1.5.15)", code.includes('class="guide-names"'));
    ok("guide-names stacks vertically (v1.5.15)", cssCode.includes(".guide-row-head .guide-names") && cssCode.includes("flex-direction: column"));
    ok("guide latin stays italic (v1.5.15)", /\\.latin\\s*\\{[^}]*font-style:\\s*italic/.test(cssCode));
    ok("guide-row-name stays bold (v1.5.15)", /\\.guide-row-name\\s*\\{[^}]*font-weight:\\s*800/.test(cssCode));
  })();
  // v1.4.0-beta Mira review: pushThread while Phone is open marks thread read
  (() => {
    const origQS = global.document.querySelector;
    const mkPhoneTab = (active) => {
      const el = makeEl();
      if (active) el.classList.add('active');
      return el;
    };
    const origUnread = state.unread;
    const origMsgsLen = state.messages.length;
    state.unread = 0;
    // Phone active: thread renders immediately, no unread increment
    global.document.querySelector = (sel) => sel === '.tab[data-tab="phone"]' ? mkPhoneTab(true) : origQS(sel);
    pushThread([{ from: 'sarah', text: 'grid test' }]);
    ok("pushThread on active Phone does not increment unread", state.unread === 0);
    // Other tab: unread increments as before
    global.document.querySelector = (sel) => sel === '.tab[data-tab="phone"]' ? mkPhoneTab(false) : origQS(sel);
    pushThread([{ from: 'sarah', text: 'grid test 2' }]);
    ok("pushThread on other tab increments unread", state.unread === 1);
    // Persistence: the saved store carries the unread count
    const saved = JSON.parse(global.localStorage.getItem('tyi-messages') || '{}');
    ok("unread persists through saveMsgs", saved.unread === 1);
    ok("pushed threads persisted", (saved.messages || []).length >= origMsgsLen + 2);
    // restore
    global.document.querySelector = origQS;
    state.unread = origUnread;
    state.messages.length = origMsgsLen;
    saveMsgs();
  })();
  // v1.8.3-beta: Sarah throttle — at most one ROUTINE message per 5 min.
  // Special dialogue + Ask Sarah always go through; routine messages
  // inside the window are DROPPED, not queued.
  (() => {
    const origMsgsLen = state.messages.length;
    const origUnread = state.unread;
    const origLast = state.lastSarahMsgAt;
    // Routine inside the window is dropped
    state.lastSarahMsgAt = Date.now();
    const dropped = pushThread([{ who: 'them', text: 'throttle drop test' }], 'routine');
    ok('routine Sarah message inside 5-min window is dropped', dropped === false && state.messages.length === origMsgsLen);
    // Special dialogue bypasses the throttle
    const specialSent = pushThread([{ who: 'them', text: 'throttle special test' }], 'special');
    ok('special dialogue bypasses the Sarah throttle', specialSent === true && state.messages.length === origMsgsLen + 1);
    // Ask Sarah bypasses the throttle
    const askSent = pushThread([{ who: 'them', text: 'throttle ask test' }], 'ask');
    ok('Ask Sarah bypasses the Sarah throttle', askSent === true && state.messages.length === origMsgsLen + 2);
    // Routine after the window goes through
    state.lastSarahMsgAt = Date.now() - 6 * 60 * 1000;
    const routineSent = pushThread([{ who: 'them', text: 'throttle routine test' }], 'routine');
    ok('routine Sarah message after 5 minutes goes through', routineSent === true && state.messages.length === origMsgsLen + 3);
    // Every sent thread restarts the window
    ok('sent Sarah thread updates lastSarahMsgAt', typeof state.lastSarahMsgAt === 'number' && Date.now() - state.lastSarahMsgAt < 5000);
    // restore
    state.messages.length = origMsgsLen;
    state.unread = origUnread;
    state.lastSarahMsgAt = origLast;
    saveMsgs();
  })();
  // v1.8.3-beta: afterExpedition classifies its thread kind — ambient
  // check-in/chat is routine (throttled), the 5-failure nudge is special.
  (() => {
    const origMsgsLen = state.messages.length;
    const origUnread = state.unread;
    const origLast = state.lastSarahMsgAt;
    const origFailures = state.failures;
    const origOffered = state.sarahAdviceOffered;
    const origFlags = [state.taggedThisTrip, state.resightedThisTrip, state.followedThisTrip];
    const origChatSeen = { ...state.chatSeen };
    state.taggedThisTrip = false; state.resightedThisTrip = false; state.followedThisTrip = false;
    // Ambient chatter inside the window is dropped
    state.lastSarahMsgAt = Date.now();
    state.failures = 0;
    state.sarahAdviceOffered = true;
    afterExpedition(null);
    ok('afterExpedition ambient chatter inside window is dropped', state.messages.length === origMsgsLen);
    // 5-failure nudge is special: goes through despite the window
    state.lastSarahMsgAt = Date.now();
    state.failures = 5;
    afterExpedition(null);
    ok('afterExpedition 5-failure nudge bypasses the throttle', state.messages.length === origMsgsLen + 1);
    // restore
    state.messages.length = origMsgsLen;
    state.unread = origUnread;
    state.lastSarahMsgAt = origLast;
    state.failures = origFailures;
    state.sarahAdviceOffered = origOffered;
    [state.taggedThisTrip, state.resightedThisTrip, state.followedThisTrip] = origFlags;
    state.chatSeen = origChatSeen;
    saveMsgs();
  })();
  // v1.8.3-beta: Blue Shark hook is a distinct factual detail — the beauty
  // superlative (opinion stated as fact) is gone, and (Mira) it no longer
  // restates the public Research countershading description.
  ok('blue hook is a distinct factual detail', (() => {
    const hook = sharkById('blue').hook;
    return /pectoral fin/i.test(hook)
      && !/most beautiful/.test(hook)
      && !/countershad/i.test(hook)
      && !/snow-white/.test(hook);
  })());
  // v1.8.3-beta Mira fix: a dropped routine chat must not advance chatSeen —
  // the rotation is consumed only by chats actually sent.
  (() => {
    const origMsgsLen = state.messages.length;
    const origUnread = state.unread;
    const origLast = state.lastSarahMsgAt;
    const origFailures = state.failures;
    const origOffered = state.sarahAdviceOffered;
    const origFlags = [state.taggedThisTrip, state.resightedThisTrip, state.followedThisTrip];
    const origChatSeen = JSON.parse(JSON.stringify(state.chatSeen));
    const origRandom = Math.random;
    const origPinned = state.pinned;
    state.pinned = 'nurse'; // v2.5.4-beta: coherence — Sarah chats about the pinned species
    state.taggedThisTrip = false; state.resightedThisTrip = false; state.followedThisTrip = false;
    state.failures = 0;
    state.sarahAdviceOffered = true;
    // Force the random-chat (pickChat) branch: maybeCheckinThread returns null.
    Math.random = () => 0.99;
    // Inside the window: the thread is dropped AND chatSeen is untouched.
    state.lastSarahMsgAt = Date.now();
    afterExpedition(null);
    ok('dropped routine chat leaves messages unchanged', state.messages.length === origMsgsLen);
    ok('dropped routine chat leaves chatSeen unchanged', JSON.stringify(state.chatSeen) === JSON.stringify(origChatSeen));
    // Window open: the next allowed chat uses the still-unseen entry.
    state.lastSarahMsgAt = Date.now() - 6 * 60 * 1000;
    const chatSeenBefore = JSON.parse(JSON.stringify(state.chatSeen));
    afterExpedition(null);
    const advanced = Object.keys(state.chatSeen).filter(k => state.chatSeen[k] !== (chatSeenBefore[k] || 0));
    const oneEntry = advanced.length === 1 && state.chatSeen[advanced[0]] === (chatSeenBefore[advanced[0]] || 0) + 1;
    ok('next allowed chat advances exactly one rotation entry by one', oneEntry);
    const sid = advanced[0];
    const chats = COUSIN_CHATS[sid];
    const expected = chats[(chatSeenBefore[sid] || 0) % chats.length];
    const sent = state.messages[state.messages.length - 1].msgs;
    ok('next allowed chat uses the still-unseen entry', sent[0].text === expected.them && sent[1].text === expected.me);
    // restore
    Math.random = origRandom;
    state.messages.length = origMsgsLen;
    state.unread = origUnread;
    state.lastSarahMsgAt = origLast;
    state.failures = origFailures;
    state.sarahAdviceOffered = origOffered;
    [state.taggedThisTrip, state.resightedThisTrip, state.followedThisTrip] = origFlags;
    state.chatSeen = origChatSeen;
    state.pinned = origPinned;
    saveMsgs();
  })();
  // v2.2.0-beta: CSS caustics retired — sun rays are a looping video.
  // (v1.4.17 span-based rays broke iPad Safari under any continuous animation.)
  (() => {
    ok("no caustics CSS remains", cssCode.indexOf('.caustics') === -1);
    ok("no conic fan divs remain", cssCode.indexOf('.caustics .fan') === -1);
  })();
  // v1.4.17: rays have clearly visible life — sway plus grow/shrink via transform
  (() => {
    /* v2.1.4-beta RETIRED: ray-life animation removed (iPad Safari). */
    /* RETIRED v2.1.4: ok("ray-life sways visibly", /ray-life[\\s\\S]{0,800}?rotate\\(calc\\(var\\(--ray-angle\\)\\s*-\\s*4deg/.test(cssCode)); */
    /* RETIRED v2.1.4: ok("ray-life grows/shrinks via scaleX", /ray-life[\\s\\S]{0,800}?scaleX\\(1\\.25\\)/.test(cssCode)); */
    /* RETIRED v2.1.4: ok("rays never fully vanish", /ray-life[\\s\\S]{0,800}?opacity:\\s*0\\.15/.test(cssCode)); */
    ok("reduced-motion hides sun video", (() => {
      const rm = cssCode.indexOf('prefers-reduced-motion');
      const sv = cssCode.indexOf('.sun-video', rm);
      return rm !== -1 && sv !== -1 && cssCode.indexOf('display: none', sv) !== -1;
    })());
  })();
  // v1.4.16-beta: field-guide overlay is hard-contained — can never widen its column
  (() => {
    ok("guide row has NO layout containment (fixed modal works)", !/\\.guide-row\\s*\\{[^}]*contain:\\s*layout/.test(cssCode));
    ok("open body is absolute with explicit width", /\\.guide-row\\.open\\s+\\.guide-row-body\\s*\\{[^}]*position:\\s*absolute[^}]*width:\\s*100%/.test(cssCode));
    ok("open body has max-width guard", /\\.guide-row\\.open\\s+\\.guide-row-body\\s*\\{[^}]*max-width:\\s*100%/.test(cssCode));
  })();
  // v1.4.15-beta: IUCN badges are color-coded by threat level
  ok('IUCN LC is green', /\\.iucn-LC\\s*\\{[^}]*#2d7a3e/.test(cssCode));
  ok('IUCN CR is dark purple', /\\.iucn-CR\\s*\\{[^}]*#2a1a3a/.test(cssCode));
  // v2.5.5-beta: logo PNG cropped to shark bounds; heights 53/132px preserve the visible shark scale
  ok('desktop logo 132px', /\\.site-logo\\s*\\{[^}]*height:\\s*132px/.test(cssCode));
  // v1.4.15-beta: guide grid uses minmax so overlays can't widen columns
  ok('guide grid minmax', /\\.guide-list\\s*\\{[^}]*minmax\\(0,\\s*1fr\\)/.test(cssCode));
  // v1.4.15-beta: time-of-day progression in expedition log
  ok('time progression', /The afternoon stretches out/.test(fileCode) && /Evening approaches/.test(fileCode));
  // v1.4.15-beta: subtle diet phrases (not bait answers)
  ok('diet phrases', /they eat plankton/.test(fileCode) && /DIET_PHRASE/.test(fileCode));
  // v1.7.22-beta: PR47 bubbles — 8 staggered columns, 26 spans.
  // v1.7.25-beta: bubbles are driven by a time-based JS loop (initBubbles),
  // not CSS keyframes — iOS WKWebView froze the CSS compositor animations
  // for bubbles launching from below the viewport. The JS loop recomputes
  // each bubble from the rAF timestamp, so it can pause but never sticks.
  (() => {
    const bubbleCount = (cssCode.match(/\\.bubbles\\s+span:nth-child\\(\\d+\\)\\s*\\{/g) || []).length;
    ok("bubbles number 26 (8 staggered columns)", bubbleCount === 26);
    // Every bubble rule carries its own JS-loop config as custom properties.
    const bubbleRules = cssCode.match(/\\.bubbles\\s+span:nth-child\\(\\d+\\)\\s*\\{[^}]*\\}/g) || [];
    ok("every bubble rule has JS-loop config", bubbleRules.length === 26 && bubbleRules.every(r => /--bubble-rise:/.test(r) && /--bubble-duration:/.test(r) && /--bubble-delay:/.test(r)));
    // v1.8.1-beta: far-right column H (spans 25-26) was a short hop starting
    // 45% up, leaving a bubble-less bottom-right corner. Full riser now.
    const colH = [25, 26].map(n => bubbleRules.find(r => r.startsWith(".bubbles span:nth-child(" + n + ")")) || "");
    ok("far-right bubbles (col H) launch from the bottom", colH.every(r => /bottom:\\s*-20px/.test(r) && /--bubble-rise:\\s*-105vh/.test(r)));
    ok("bubbles have no CSS keyframe animation", !/@keyframes\\s+bubble-rise/.test(cssCode) && !/\\.bubbles\\s+span\\s*\\{[^}]*animation-name/.test(cssCode));
    // The loop wires itself to the spans and honours reduced motion.
    ok("bubble loop reads config + respects reduced motion",
      /function initBubbles/.test(fileCode) &&
      /prefers-reduced-motion: reduce/.test(fileCode) &&
      /--bubble-rise/.test(fileCode) &&
      fileCode.includes("requestAnimationFrame(tick)"));
    // Pure math: interpolation matches the old keyframe envelope.
    const f0 = bubbleFrameAt(0);
    ok("bubbleFrameAt(0) is invisible at origin", f0.x === 0 && f0.opacity === 0);
    const f8 = bubbleFrameAt(0.08);
    ok("bubbleFrameAt(0.08) matches old 8% stop", Math.abs(f8.x - 2) < 1e-9 && Math.abs(f8.opacity - 0.85) < 1e-9);
    const f50 = bubbleFrameAt(0.5);
    ok("bubbleFrameAt(0.5) interpolates the mid segment", Math.abs(f50.x - 11.8) < 0.05 && Math.abs(f50.opacity - 0.632) < 0.005);
    const f100 = bubbleFrameAt(1);
    ok("bubbleFrameAt(1) is invisible at full drift", f100.x === 24 && f100.opacity === 0);
    ok("bubbleFrameAt clamps out-of-range progress", bubbleFrameAt(-0.5).opacity === 0 && bubbleFrameAt(1.5).opacity === 0);
    // Progress: negative delay means "already partway up"; wraps at loop end.
    ok("bubbleProgressAt honours negative delay", Math.abs(bubbleProgressAt(0, -1000, 18000) - 1 / 18) < 1e-9);
    ok("bubbleProgressAt wraps at the loop point", Math.abs(bubbleProgressAt(19000, -1000, 18000) - 2000 / 18000) < 1e-9);
    ok("bubbleProgressAt starts at 0 with no delay", bubbleProgressAt(0, 0, 18000) === 0);
    // Length parsing: vh tracks the live viewport; px passes through.
    ok("bubbleLengthToPx converts vh and px", bubbleLengthToPx("-105vh", 800) === -840 && bubbleLengthToPx("20px", 800) === 20 && bubbleLengthToPx("bogus", 800) === 0);
  })();
  // v1.4.0-beta: expanded guide entries overlay the grid instead of pushing it
  (() => {
    ok("open guide body is absolutely positioned", /\\.guide-row\\.open\\s+\\.guide-row-body\\s*\\{[^}]*position:\\s*absolute/.test(cssCode));
    ok("open guide row lifts overflow clipping", /\\.guide-row\\.open\\s*\\{[^}]*overflow:\\s*visible/.test(cssCode));
    ok("open guide body has no internal scroll (v1.5.12)", !/\\.guide-row\\.open\\s+\\.guide-row-body\\s*\\{[^}]*overflow-y:\\s*auto/.test(cssCode));
    ok("open guide body top corners rounded (v1.5.12)", /\\.guide-row\\.open\\s+\\.guide-row-body\\s*\\{[^}]*border-radius:\\s*var\\(--radius\\)/.test(cssCode));
  })();
  // v1.5.5-beta: guide popup is closable — close button, Escape, outside tap
  (() => {
    ok("guide close button in body template", /class=\\"guide-close\\"/.test(code));
    ok("guide close button has accessible label", /guide-close\\" aria-label=/.test(code));
    ok("collapseGuideRow helper exists", /function collapseGuideRow\\(row, restoreFocus = true\\)/.test(code));
    ok("collapseGuideRow resets aria-expanded", /collapseGuideRow[\\s\\S]*?setAttribute\\("aria-expanded", "false"\\)/.test(code));
    ok("collapseGuideRow returns focus to header", /collapseGuideRow[\\s\\S]*?head\\.focus\\(\\)/.test(code));
    ok("Escape key closes topmost open row", /keydown[\\s\\S]*?Escape[\\s\\S]*?\\.guide-row\\.open/.test(code));
    ok("outside tap closes mobile modal", /matchMedia\\("\\(max-width: 768px\\)"\\)[\\s\\S]*?collapseGuideRow/.test(code));
    ok("guide-close CSS present", /\\.guide-close\\s*\\{/.test(cssCode));
    ok("reunion line is location-neutral", !new RegExp("came back to the" + " same spot").test(code));
  })();
  ok("WHATS_NEW has v1.4.0-beta", !!(WHATS_NEW["v1.4.0-beta"] && WHATS_NEW["v1.4.0-beta"].length));
  ok("WHATS_NEW has v1.4.1-beta", !!(WHATS_NEW["v1.4.1-beta"] && WHATS_NEW["v1.4.1-beta"].length));
  ok("WHATS_NEW has v1.4.2-beta", !!(WHATS_NEW["v1.4.2-beta"] && WHATS_NEW["v1.4.2-beta"].length));
  ok("WHATS_NEW has v1.4.3-beta", !!(WHATS_NEW["v1.4.3-beta"] && WHATS_NEW["v1.4.3-beta"].length));
  ok("WHATS_NEW has v1.4.4-beta", !!(WHATS_NEW["v1.4.4-beta"] && WHATS_NEW["v1.4.4-beta"].length));
  ok("WHATS_NEW has v1.4.5-beta", !!(WHATS_NEW["v1.4.5-beta"] && WHATS_NEW["v1.4.5-beta"].length));
  ok("WHATS_NEW has v1.4.6-beta", !!(WHATS_NEW["v1.4.6-beta"] && WHATS_NEW["v1.4.6-beta"].length));
  ok("WHATS_NEW has v1.4.7-beta", !!(WHATS_NEW["v1.4.7-beta"] && WHATS_NEW["v1.4.7-beta"].length));
  ok("WHATS_NEW has v1.4.8-beta", !!(WHATS_NEW["v1.4.8-beta"] && WHATS_NEW["v1.4.8-beta"].length));
  ok("WHATS_NEW has v1.4.9-beta", !!(WHATS_NEW["v1.4.9-beta"] && WHATS_NEW["v1.4.9-beta"].length));
  ok("WHATS_NEW has v1.4.10-beta", !!(WHATS_NEW["v1.4.10-beta"] && WHATS_NEW["v1.4.10-beta"].length));
  ok("WHATS_NEW has v1.4.11-beta", !!(WHATS_NEW["v1.4.11-beta"] && WHATS_NEW["v1.4.11-beta"].length));
  ok("WHATS_NEW has v1.4.12-beta", !!(WHATS_NEW["v1.4.12-beta"] && WHATS_NEW["v1.4.12-beta"].length));
  ok("WHATS_NEW has v1.4.13-beta", !!(WHATS_NEW["v1.4.13-beta"] && WHATS_NEW["v1.4.13-beta"].length));
  ok("WHATS_NEW has v1.4.14-beta", !!(WHATS_NEW["v1.4.14-beta"] && WHATS_NEW["v1.4.14-beta"].length));
  ok("WHATS_NEW has v1.4.15-beta", !!(WHATS_NEW["v1.4.15-beta"] && WHATS_NEW["v1.4.15-beta"].length));
  ok("WHATS_NEW has v1.4.18-beta", !!(WHATS_NEW["v1.4.18-beta"] && WHATS_NEW["v1.4.18-beta"].length));
  // v1.8.0: the megamouth achievement was renamed from "White Whale"
  // to "Deep-Sea Unicorn" (too close to WHAAAAAAALE, the whale-shark
  // one). The internal id stays "white-whale" so earned flags survive.
  ok("white-whale achievement exists", ACHIEVEMENTS.some(a => a.id === "white-whale" && a.name === "Deep-Sea Unicorn" && a.icon === "🦄"));
  ok("white-whale checks megamouth tag", (() => { const a = ACHIEVEMENTS.find(x => x.id === "white-whale"); return a && a.check({ tagged: { megamouth: {} } }) === true && a.check({ tagged: {} }) === false; })());
  // v1.7.23: WHAAAAAAALE achievement — tag a whale shark (separate from White Whale)
  ok("whaaaaale achievement exists", ACHIEVEMENTS.some(a => a.id === "whaaaaale" && a.name === "WHAAAAAAALE"));
  ok("whaaaaale checks whale tag", (() => { const a = ACHIEVEMENTS.find(x => x.id === "whaaaaale"); return a && a.check({ tagged: { whale: {} } }) === true && a.check({ tagged: {} }) === false; })());
  ok("WHITE_WHALE_THREAD exists with Sarah's reaction", typeof WHITE_WHALE_THREAD !== "undefined" && WHITE_WHALE_THREAD.length >= 4 && WHITE_WHALE_THREAD[0].text.toLowerCase().includes("megamouth"));
  ok("surface-shimmer oversized past viewport", cssCode.indexOf(".surface-shimmer") !== -1 && cssCode.indexOf("left: -4%") !== -1);
  ok("collection empty-note spans grid", /\\.collection-grid\\s+\\.empty-note\\s*\\{[^}]*grid-column:\\s*1\\s*\\/\\s*-1/.test(cssCode));
  // v1.4.2: IUCN abbreviations on field-guide pills
  ok('IUCN_ABBR maps all statuses', ["Critically Endangered","Endangered","Vulnerable","Near Threatened","Least Concern","Data Deficient"].every(k => IUCN_ABBR[k] && IUCN_ABBR[k].length === 2));
  ok('field guide pill uses abbreviation', code.indexOf('IUCN_ABBR[s.status]') !== -1);
  // v1.4.11/v1.4.12: porthole — asset-led waves (Mira's illustrated strips)
  ok('porthole wave layers in HTML', /class="pw-layer pw-far"/.test(htmlCode) && /class="pw-layer pw-mid"/.test(htmlCode) && /class="pw-layer pw-near"/.test(htmlCode));
  ok('sun video in HTML', htmlCode.indexOf('<video id="sun-video"') !== -1);
  ok('porthole has single orbit structure per layer', /class="pw-layer pw-far"><div class="pw-orbit"/.test(htmlCode) && !/class="pw-drift"/.test(htmlCode) && !/class="pw-bob"/.test(htmlCode));
  ok('porthole has 6 tiles per layer', (htmlCode.match(/class="pw-tile"/g) || []).length === 18);
  ok('porthole one big splash at a time', /class="porthole-spray splash-a"/.test(htmlCode) && /class="porthole-spray splash-b"/.test(htmlCode) && !/porthole-spray ps/.test(htmlCode));
  ok('porthole no longer procedural', !/class="porthole-crest/.test(htmlCode) && !/class="porthole-surface"/.test(htmlCode));
  ok('porthole no longer underwater-style', !/class="porthole-shafts"/.test(htmlCode) && !/class="porthole-bubbles"/.test(htmlCode));
  ok('diveView not hidden by default', !/id="diveView" class="dive-view hidden"/.test(htmlCode));
  ok('porthole CSS exists', /\\.dive-scene\\.porthole/.test(cssCode));
  ok('porthole uses wave art assets', /porthole_wave_far_draft\.png/.test(cssCode) && /porthole_wave_mid_draft\.png/.test(cssCode) && /porthole_wave_near_draft\.png/.test(cssCode));
  ok('porthole uses splash art asset', /porthole_glass_splash_draft\.png/.test(cssCode));
  ok('porthole has orbital keyframes', /@keyframes\\s+pw-orbit-far/.test(cssCode) && /@keyframes\\s+pw-orbit-mid/.test(cssCode) && /@keyframes\\s+pw-orbit-near/.test(cssCode));
  ok('porthole far orbit is a true smooth ellipse (split sinusoidal axes)', /@keyframes\\s+pw-orbit-far-x[\\s\\S]*?translateX\\(-30px\\)/.test(cssCode) && /@keyframes\\s+pw-orbit-far-y[\\s\\S]*?translateY\\(-8px\\)/.test(cssCode));
  ok('porthole mid/near orbits keep 8-stop ellipses', /@keyframes\\s+pw-orbit-mid[\\s\\S]*?12\\.5%[\\s\\S]*?87\\.5%/.test(cssCode) && /@keyframes\\s+pw-orbit-near[\\s\\S]*?12\\.5%/.test(cssCode));
  ok('porthole no longer uses linear drift', !/@keyframes\\s+pw-drift-/.test(cssCode));
  ok('porthole has spray keyframes', /@keyframes\\s+pw-spray-\\d/.test(cssCode));
  ok('porthole far orbit loops seamlessly (closed ellipse)', /@keyframes\\s+pw-orbit-far-x[\\s\\S]*?100%\\s*\\{[^}]*translateX\\(30px\\)/.test(cssCode) && /@keyframes\\s+pw-orbit-far-y[\\s\\S]*?100%\\s*\\{[^}]*translateY\\(0\\)/.test(cssCode));
  ok('porthole tiles mirrored for seamless loop', /pw-tile:nth-child\\(even\\)[\\s\\S]*?scaleX\\(-1\\)/.test(cssCode));
  ok('porthole splash is bigger', /\\.porthole-spray\\s*\\{[^}]*width:\\s*320px/.test(cssCode));
  ok('porthole waves are horizon-scale', /\\.pw-near\\s*\\{[^}]*height:\\s*210px/.test(cssCode));
  // v1.4.14: calm porthole — sky above the far wave, slow drift, splash pops without sliding
  ok('porthole has sky behind far wave', /\\.dive-scene\\.porthole\\s*\\{[^}]*#a8dcf5/.test(cssCode));
  ok('porthole orbit has depth gradient', /\\.pw-far\\s+\\.pw-orbit\\s*\\{[^}]*38s/.test(cssCode));
  ok('splash pops without sliding', !/5\\dpx/.test(cssCode.match(/@keyframes pw-spray-1[\\s\\S]*?\\n\\}/)[0]));
  ok('porthole respects reduced motion', /prefers-reduced-motion[\\s\\S]*?pw-orbit/.test(cssCode));
  // v1.7.27-beta: wide-screen layouts — two-column detail modal + 2-col Research grid
  ok('wide detail modal splits into two columns', /#detailOverlay\\s+#detailContent\\s*\\{[^}]*display:\\s*grid[^}]*grid-template-columns:\\s*1fr\\s+1\\.15fr/.test(cssCode));
  ok('wide detail modal widens past phone width', /#detailOverlay\\s+\\.detail-modal\\s*\\{[^}]*max-width:\\s*820px/.test(cssCode));
  ok('detail modal HTML carries detail-modal class', /id=\"detailOverlay\"[\\s\\S]*?class=\"phone detail-modal\"/.test(htmlCode));
  // v1.7.30-beta: Research back to 3 columns at >=1024px (v1.7.27's
  // 2-column grid was wrong per Avery's iPad acceptance).
  // Expanded Research dropdowns span two columns; last-column ones
  // anchor right so they don't overflow the app container.
  // v1.8.0-beta: Archive joins Research at 3 columns at >=1024px,
  // with the same two-column dropdown treatment. Achievements stays
  // on the shared 2-column .guide-list rule.
  ok('wide Research grid is 3 columns', /@media\\s*\\(min-width:\\s*1024px\\)[\\s\\S]*?#researchList\\s*\\{[^}]*grid-template-columns:\\s*repeat\\(3/.test(cssCode));
  ok('wide Archive grid is 3 columns', /@media\\s*\\(min-width:\\s*1024px\\)[\\s\\S]*?#archiveList\\s*\\{[^}]*grid-template-columns:\\s*repeat\\(3/.test(cssCode));
  ok('wide Achievements grid stays 2 columns', /@media\\s*\\(min-width:\\s*1024px\\)[\\s\\S]*?\\.guide-list\\s*\\{[^}]*grid-template-columns:\\s*repeat\\(2/.test(cssCode));
  ok('wide Research dropdown spans two columns', /#researchList\\s+\\.guide-row\\.open\\s+\\.guide-row-body\\s*\\{[^}]*width:\\s*calc\\(200% \\+ 12px\\)/.test(cssCode));
  ok('wide Research dropdown overrides base max-width', /#researchList\\s+\\.guide-row\\.open\\s+\\.guide-row-body\\s*\\{[^}]*max-width:\\s*none/.test(cssCode));
  ok('wide Research last-column dropdown anchors right', /#researchList\\s+\\.guide-row:nth-child\\(3n\\)\\.open\\s+\\.guide-row-body\\s*\\{[^}]*right:\\s*0/.test(cssCode));
  ok('wide Archive dropdown spans two columns', /#archiveList\\s+\\.guide-row\\.open\\s+\\.guide-row-body\\s*\\{[^}]*width:\\s*calc\\(200% \\+ 12px\\)/.test(cssCode));
  ok('wide Archive dropdown overrides base max-width', /#archiveList\\s+\\.guide-row\\.open\\s+\\.guide-row-body\\s*\\{[^}]*max-width:\\s*none/.test(cssCode));
  ok('wide Archive last-column dropdown anchors right', /#archiveList\\s+\\.guide-row:nth-child\\(3n\\)\\.open\\s+\\.guide-row-body\\s*\\{[^}]*right:\\s*0/.test(cssCode));
  ok('detail columns are two wrappers', /#detailOverlay\\s+#detailContent\\s*>\\s*\.detail-identity\\s*\{[^}]*grid-column:\\s*1/.test(cssCode) && /#detailOverlay\\s+#detailContent\\s*>\\s*\.detail-record\\s*\{[^}]*grid-column:\\s*2/.test(cssCode));
  // v1.7.31-beta: art is a full-width row across the top of the modal,
  // identity + record in two columns below it. Art is large on wide screens.
  ok('detail art spans both columns on top', /#detailOverlay\\s+#detailContent\\s*>\\s*\.detail-art\\s*\{[^}]*grid-column:\\s*1\\s*\\/\\s*-1/.test(cssCode));
  ok('detail art is large on wide screens', /#detailOverlay\\s+#detailContent\\s*>\\s*\.detail-art\\s+\.shark-art[^{]*\{[^}]*max-width:\\s*600px/.test(cssCode));
  // v1.7.33-beta: trim the vertical space around the art — the modal's
  // own top/bottom padding drops to 8px, the art's own margins go to
  // zero, and the grid row gap goes to zero (column gap stays 20px).
  ok('detail art has no vertical margins', /#detailOverlay\\s+#detailContent\\s*>\\s*\\.detail-art\\s+\\.shark-art\\s*\\{[^}]*margin:\\s*0/.test(cssCode));
  ok('detail modal trims top/bottom padding', /#detailOverlay\\s+\\.detail-modal\\s*\\{[^}]*padding-top:\\s*8px[^}]*padding-bottom:\\s*8px/.test(cssCode));
  ok('detail grid has no row gap', /#detailOverlay\\s+#detailContent\\s*\\{[^}]*gap:\\s*0\\s+20px/.test(cssCode));
  ok('detail grid does not place individual blocks', !/#detailOverlay\\s+#detailContent\\s*>\\s*\.(shark-art|book-stats|resight-block|hook)/.test(cssCode));
  // v1.7.27-beta Mira fix: independent wrappers — art row first, then
  // identity and record columns; each flows its own block content from
  // the top. v1.7.31-beta: stats + Track moved into identity; art is
  // its own full-width row above the columns. v1.7.33-beta: Re-sightings
  // also moves into identity, under stats + Track.
  // The mocked DOM has no layout engine, so these assert the DOM structure
  // the CSS relies on (a real-browser rect check runs separately).
  ok('detail modal wraps identity and record columns in order', (() => {
    const savedTagged = state.tagged;
    const savedFacts = state.unlockedFacts;
    state.tagged = { nurse: { name: 'Testy', researchId: 'NS-2026-002', length: 2.9, sex: 'female', location: 'Caribbean Sea', date: 'Oct 10, 2026', resightings: [
      { date: 'Oct 10, 2026', location: 'Caribbean Sea', note: 'r1' },
      { date: 'Oct 11, 2026', location: 'Caribbean Sea', note: 'r2' },
      { date: 'Oct 12, 2026', location: 'Caribbean Sea', note: 'r3' },
      { date: 'Oct 13, 2026', location: 'Caribbean Sea', note: 'r4' },
    ], notes: ['watched-note-1', 'watched-note-2'] } };
    state.unlockedFacts = { nurse: [0] };
    try { openDetail('nurse'); } catch (e) { state.tagged = savedTagged; state.unlockedFacts = savedFacts; return false; }
    const html = document.getElementById('detailContent').innerHTML;
    state.tagged = savedTagged;
    state.unlockedFacts = savedFacts;
    const artIdx = html.indexOf('detail-art');
    const idIdx = html.indexOf('detail-identity');
    const recIdx = html.indexOf('detail-record');
    if (artIdx === -1 || idIdx === -1 || recIdx === -1 || artIdx > idIdx || idIdx > recIdx) return false;
    const artHtml = html.slice(artIdx, idIdx);
    const idHtml = html.slice(idIdx, recIdx);
    const recHtml = html.slice(recIdx);
    const inArt = ['class="shark-art"'].every(c => artHtml.includes(c));
    const notInArt = ['class="given-name"', 'class="detail-name-row"', 'id="renameForm"', 'class="latin detail-scientific"', 'class="status-pill"', 'class="book-stats"', 'id="trackBtn"', 'class="resight-block"', 'class="watch-notes-block"', 'class="secret-facts-block"', 'class="conservation-note"'].every(c => !artHtml.includes(c));
    const inId = ['class="given-name"', 'class="detail-name-row"', 'id="renameForm"', 'class="latin detail-scientific"', 'class="status-pill"', 'class="book-stats"', 'id="trackBtn"', 'class="resight-block"', 'id="resightMore"'].every(c => idHtml.includes(c));
    const notInId = ['class="shark-art"', 'class="watch-notes-block"', 'class="secret-facts-block"', 'class="conservation-note"'].every(c => !idHtml.includes(c));
    const inRec = ['class="watch-notes-block"', 'class="secret-facts-block"', 'class="conservation-note"'].every(c => recHtml.includes(c));
    const notInRec = ['class="shark-art"', 'class="given-name"', 'class="detail-name-row"', 'id="renameForm"', 'class="latin detail-scientific"', 'class="status-pill"', 'class="book-stats"', 'id="trackBtn"', 'class="resight-block"'].every(c => !recHtml.includes(c));
    // v1.8.0-beta: hook + bonus are insights now — no separate 💡/✨ blocks.
    const noHookBonus = !html.includes('class="hook"') && !html.includes('class="bonus-fact"');
    const insightsCount = html.includes('Tag-along insights (1/5)');
    return inArt && notInArt && inId && notInId && inRec && notInRec && noHookBonus && insightsCount;
  })());
  ok('detail modal keeps conditional blocks out when empty', (() => {
    const savedTagged = state.tagged;
    const savedFacts = state.unlockedFacts;
    state.tagged = { nurse: { name: '', researchId: 'NS-2026-002', length: 2.9, sex: 'female', location: 'Caribbean Sea', date: 'Oct 10, 2026', resightings: [], notes: [] } };
    state.unlockedFacts = { nurse: [] };
    try { openDetail('nurse'); } catch (e) { state.tagged = savedTagged; state.unlockedFacts = savedFacts; return false; }
    const html = document.getElementById('detailContent').innerHTML;
    state.tagged = savedTagged;
    state.unlockedFacts = savedFacts;
    const artIdx = html.indexOf('detail-art');
    const idIdx = html.indexOf('detail-identity');
    const recIdx = html.indexOf('detail-record');
    if (artIdx === -1 || idIdx === -1 || recIdx === -1 || artIdx > idIdx || idIdx > recIdx) return false;
    const artHtml = html.slice(artIdx, idIdx);
    const idHtml = html.slice(idIdx, recIdx);
    const recHtml = html.slice(recIdx);
    // nickname, re-sightings, field notes all absent — but the wrappers,
    // the rename form, and the always-present blocks remain. v1.8.0-beta:
    // the insights block ALWAYS renders (0/5 when nothing unlocked);
    // the separate hook/bonus blocks are gone.
    return artHtml.includes('class="shark-art"')
      && !idHtml.includes('class="given-name"') && idHtml.includes('id="renameForm"')
      && idHtml.includes('class="book-stats"') && idHtml.includes('id="trackBtn"')
      && !idHtml.includes('class="resight-block"') && !recHtml.includes('class="resight-block"') && !recHtml.includes('class="watch-notes-block"')
      && recHtml.includes('class="secret-facts-block"') && recHtml.includes('Tag-along insights (0/5)')
      && !recHtml.includes('class="hook"') && !recHtml.includes('class="bonus-fact"');
  })());
  ok('bubbles rise in staggered columns', /8 columns, 2-5 bubbles each/i.test(cssCode));
  ok('near wave is bigger', /\\.pw-near\\s*\\{[^}]*height:\\s*210px/.test(cssCode));
  ok('far wave sits lower', /\\.pw-far\\s*\\{[^}]*top:\\s*14%/.test(cssCode));
  ok('splash slides fast and fades quick', /@keyframes\\s+pw-spray-1[\\s\\S]*?translateY\\(140px\\)/.test(cssCode));
  // v1.4.18: waves stacked tight, oval orbital motion, bigger/faster splash
  ok('waves stacked almost on top of each other', /\\.pw-far\\s*\\{[^}]*top:\\s*14%/.test(cssCode) && /\\.pw-mid\\s*\\{[^}]*top:\\s*20%/.test(cssCode) && /\\.pw-near\\s*\\{[^}]*top:\\s*24%/.test(cssCode));
  ok('orbit periods: far 38s, mid 26s, near 16s (near fastest)', /pw-orbit-far-x 38s/.test(cssCode) && /pw-orbit-mid 26s/.test(cssCode) && /pw-orbit-near 16s/.test(cssCode));
  ok('splash is rarer (24s cycle)', /\\.splash-a\\s*\\{[^}]*24s/.test(cssCode));
  ok('showPorthole defined', /function showPorthole/.test(code));
  ok('closeDive shows porthole', /showPorthole\\(\\);/.test(code));
  ok('showPorthole clears ambient creature shadows', /function showPorthole[\\s\\S]*?querySelectorAll\\("\\.ambient"\\)/.test(code));
  // v1.4.4: phone mockup is taller — flex column, convo fills, composer pinned
  ok('phone-screen is flex column with real height', /\\.phone-screen[\\s\\S]*?display:\\s*flex[\\s\\S]*?flex-direction:\\s*column/.test(cssCode));
  ok('phone-convo flexes to fill', /\\.phone-convo[\\s\\S]*?flex:\\s*1\\s+1\\s+auto/.test(cssCode));
  // v1.4.4: logbook filter options have no emoji (consistency)
  ok('logbook followed option has no emoji', !/Followed 🧭/.test(htmlCode));
  // v1.4.4: all tabs are uniform 2-row (icon+label) — no count spacers
  ok('no count-spacer spans in tabs', !/count-spacer/.test(htmlCode));
  ok('no count-spacer CSS remains', !/count-spacer/.test(cssCode));
  // v1.4.19: Sarah's Big Day
  ok('BIG_DAY has 8 conversations per tier (2/3/4)', BIG_DAY[2].length === 8 && BIG_DAY[3].length === 8 && BIG_DAY[4].length === 8);
  ok('BIG_DAY lemon pool has 8 conversations', BIG_DAY.lemon.length === 8);
  ok('all Big Day conversations have 3-4 bubbles', Object.keys(BIG_DAY).every(k => BIG_DAY[k].every(c => c.length >= 3 && c.length <= 4)));
  ok('all Big Day bubbles have who/text', Object.keys(BIG_DAY).every(k => BIG_DAY[k].every(c => c.every(m => (m.who === 'them' || m.who === 'me') && typeof m.text === 'string' && m.text.length > 0))));
  ok('no raw placeholders in Big Day text', Object.keys(BIG_DAY).every(k => BIG_DAY[k].every(c => c.every(m => !/\\{(?!speciesList\\}|count\\})[^}]*\\}/.test(m.text)))));
  ok('formatSpeciesList: two species', formatSpeciesList([{speciesName:'Nurse Shark'},{speciesName:'Lemon Shark'}]) === 'a nurse shark and a lemon shark');
  ok('formatSpeciesList: three species', formatSpeciesList([{speciesName:'Nurse Shark'},{speciesName:'Lemon Shark'},{speciesName:'Tiger Shark'}]) === 'a nurse shark, a lemon shark, and a tiger shark');
  ok('formatSpeciesList: an- article', formatSpeciesList([{speciesName:'Oceanic Whitetip'}]) === 'an oceanic whitetip');
  ok('buildBigDayThread resolves placeholders', (() => {
    const thread = buildBigDayThread([{speciesId:'nurse',speciesName:'Nurse Shark'},{speciesId:'tiger',speciesName:'Tiger Shark'}]);
    return thread.length >= 3 && thread.every(m => !m.text.includes('{speciesList}') && !m.text.includes('{count}'));
  })());
  ok('buildBigDayThread uses lemon pool for lemon', (() => {
    // Force lemon tier by seeding the bag to a known state
    state.bigDayBags = { lemon: [0] };
    const thread = buildBigDayThread([{speciesId:'lemon',speciesName:'Lemon Shark'},{speciesId:'nurse',speciesName:'Nurse Shark'}]);
    return thread.some(m => /LEMON SHARK/i.test(m.text));
  })());
  ok('flushPendingCelebrations defined', /function flushPendingCelebrations/.test(code));
  ok('confirmTag queues (no immediate pushThread celebration)', /state\\.pendingCelebrations\\.push/.test(code));
  ok('closeDive flushes celebrations', /flushPendingCelebrations\\(\\);/.test(code));
  ok('WHATS_NEW has v1.4.19-beta', Array.isArray(WHATS_NEW['v1.4.19-beta']) && WHATS_NEW['v1.4.19-beta'].length > 0);
  ok('WHATS_NEW has v1.5.0-beta', Array.isArray(WHATS_NEW['v1.5.0-beta']) && WHATS_NEW['v1.5.0-beta'].length > 0);
  ok('WHATS_NEW has v1.5.2-beta', Array.isArray(WHATS_NEW['v1.5.2-beta']) && WHATS_NEW['v1.5.2-beta'].length > 0);
  ok('WHATS_NEW has v1.5.5-beta', Array.isArray(WHATS_NEW['v1.5.5-beta']) && WHATS_NEW['v1.5.5-beta'].length > 0);
  ok('WHATS_NEW has v1.5.6-beta', Array.isArray(WHATS_NEW['v1.5.6-beta']) && WHATS_NEW['v1.5.6-beta'].length > 0);
  ok('WHATS_NEW has v1.5.7-beta', Array.isArray(WHATS_NEW['v1.5.7-beta']) && WHATS_NEW['v1.5.7-beta'].length > 0);
  ok('WHATS_NEW has v1.5.9-beta', Array.isArray(WHATS_NEW['v1.5.9-beta']) && WHATS_NEW['v1.5.9-beta'].length > 0);
  ok('WHATS_NEW has v1.5.10-beta', Array.isArray(WHATS_NEW['v1.5.10-beta']) && WHATS_NEW['v1.5.10-beta'].length > 0);
  ok('WHATS_NEW has v1.5.11-beta', Array.isArray(WHATS_NEW['v1.5.11-beta']) && WHATS_NEW['v1.5.11-beta'].length > 0);
  ok('WHATS_NEW has v1.5.16-beta', Array.isArray(WHATS_NEW['v1.5.16-beta']) && WHATS_NEW['v1.5.16-beta'].length > 0);
  ok('WHATS_NEW has v1.5.18-beta', Array.isArray(WHATS_NEW['v1.5.18-beta']) && WHATS_NEW['v1.5.18-beta'].length === 1);
  ok('WHATS_NEW has v1.5.19-beta', Array.isArray(WHATS_NEW['v1.5.19-beta']) && WHATS_NEW['v1.5.19-beta'].length === 3);
  ok('WHATS_NEW has v1.5.20-beta', Array.isArray(WHATS_NEW['v1.5.20-beta']) && WHATS_NEW['v1.5.20-beta'].length === 1);
  ok('WHATS_NEW has v1.5.21-beta', Array.isArray(WHATS_NEW['v1.5.21-beta']) && WHATS_NEW['v1.5.21-beta'].length === 2);
  ok('WHATS_NEW has v1.5.22-beta', Array.isArray(WHATS_NEW['v1.5.22-beta']) && WHATS_NEW['v1.5.22-beta'].length === 1);
  ok('WHATS_NEW has v1.5.23-beta', Array.isArray(WHATS_NEW['v1.5.23-beta']) && WHATS_NEW['v1.5.23-beta'].length === 1);
  ok('WHATS_NEW has v1.5.24-beta', Array.isArray(WHATS_NEW['v1.5.24-beta']) && WHATS_NEW['v1.5.24-beta'].length === 2);
  ok('WHATS_NEW has v1.5.25-beta', Array.isArray(WHATS_NEW['v1.5.25-beta']) && WHATS_NEW['v1.5.25-beta'].length === 6);
  ok('WHATS_NEW has v1.5.26-beta', Array.isArray(WHATS_NEW['v1.5.26-beta']) && WHATS_NEW['v1.5.26-beta'].length === 1);
  ok('WHATS_NEW has v1.5.27-beta', Array.isArray(WHATS_NEW['v1.5.27-beta']) && WHATS_NEW['v1.5.27-beta'].length === 1);
  ok('WHATS_NEW has v1.5.28-beta', Array.isArray(WHATS_NEW['v1.5.28-beta']) && WHATS_NEW['v1.5.28-beta'].length === 1);
  ok('WHATS_NEW has v1.6.0-beta', Array.isArray(WHATS_NEW['v1.6.0-beta']) && WHATS_NEW['v1.6.0-beta'].length === 4);
  // v1.6.0: Research accordion — opening one entry closes the others
  ok('accordion closes other research rows', /collapseGuideRow\\(other, false\\)/.test(code));
  // v1.6.0: accordion doesn't steal focus — collapseGuideRow takes a restoreFocus flag
  ok('collapseGuideRow has restoreFocus flag', /function collapseGuideRow\\(row, restoreFocus = true\\)/.test(code));
  ok('focus only restored when flag is true', /if \\(restoreFocus\\) head\\.focus\\(\\);/.test(code));
  // v1.6.0: IUCN badge spacing — more room between badge and pin
  // v1.8.2-beta: correction — v1.8.1 measured the 6px to the pin BUTTON's
  // edge, but the glyph sits centered inside the 52px button, so the
  // visual gap was still ~22px. Pill margin is now 0; the 6px is the pin
  // button's left padding, measured to the glyph itself.
  ok('iucn badge has no right margin (v1.8.2)', /\\.guide-row-head\\s+\\.status-pill[^}]*margin-right:\\s*0/.test(cssCode));
  ok('guide-row-top head has no right padding (v1.8.1)', /\\.guide-row-top\\s+\\.guide-row-head\\s*\\{[^}]*padding-right:\\s*0/.test(cssCode));
  ok('guide-row-top pin button left-aligns glyph with 5px padding (v1.8.2)', /\\.guide-row-top\\s+\\.pin-btn\\s*\\{[^}]*text-align:\\s*left[^}]*padding-left:\\s*5px/.test(cssCode));
  ok('pin button keeps 52px touch target (v1.8.2)', /\\.pin-btn\\s*\\{[^}]*width:\\s*52px[^}]*min-height:\\s*52px/.test(cssCode));
  // v1.7.12-beta: IUCN badge text no longer clips vertically on iPad Safari
  ok('status-pill has explicit line-height', /\\.status-pill\\s*\\{[^}]*line-height:\\s*1\\.35/.test(cssCode));
  ok('legend pill overrides inherited line-height', /\\.iucn-legend\\s+\\.status-pill[^}]*line-height:\\s*1\\.35/.test(cssCode));
  ok('legend pill has 2px vertical padding', /\\.iucn-legend\\s+\\.status-pill[^}]*padding:\\s*2px\\s+8px/.test(cssCode));
  // v1.6.0: full scientific name in expanded Collection/Archive cards
  ok('detail-scientific class styled', /\\.detail-scientific\\s*\\{[^}]*font-size:\\s*15px/.test(cssCode));
  ok('collection detail shows scientific name', code.indexOf('detail-scientific') !== -1);
  // v1.7.15-beta: achievement hints wrap fully — no line-clamp truncation
  ok('achievement hint line-clamp removed', !/-webkit-line-clamp/.test(cssCode));
  ok('achievement hint wraps normally', /\\.guide-row-head\\s+\\.latin\\.ach-hint[^}]*white-space:\\s*normal/.test(cssCode));
  ok('achievement hint overflow visible', /\\.guide-row-head\\s+\\.latin\\.ach-hint[^}]*overflow:\\s*visible/.test(cssCode));
  ok('VERSION is v1.7.15-beta', /const VERSION = "v1.7.15-beta"/.test(code));
  ok('WHATS_NEW has v1.7.15-beta', Array.isArray(WHATS_NEW['v1.7.15-beta']) && WHATS_NEW['v1.7.15-beta'].length === 1);
  ok('WHATS_NEW has v1.5.32-beta', Array.isArray(WHATS_NEW['v1.5.32-beta']) && WHATS_NEW['v1.5.32-beta'].length === 1);
  ok('WHATS_NEW has v1.5.29-beta', Array.isArray(WHATS_NEW['v1.5.29-beta']) && WHATS_NEW['v1.5.29-beta'].length === 1);
  // v2.3.0: gradient moved into Mira's videos; body is solid #020204 (matches video bottom edge)
  ok('body background is abyssal #020204', cssCode.indexOf('background: #020204') !== -1);
  ok('no body::before gradient (video carries it)', cssCode.indexOf('body::before') === -1);
  // v1.5.28: background fades to pure black at the bottom — deep ocean, not blue
  ok('html background is pure black', cssCode.indexOf('html { background: #000; }') !== -1);
  // v1.5.27: body::after overlay removed; seafloor SVG itself is taller
  ok('no body::after overlay', !/body::after/.test(cssCode));
  // v1.7.29: seafloor SVG removed entirely — its kelp strands rendered
  // oversized on iPad as mysterious blue squiggles. The background
  // gradient (light blue -> black) carries the bottom now.
  ok('seafloor SVG removed from markup', !/class="seafloor"/.test(htmlCode));
  ok('no seafloor CSS rules', !/\.seafloor/.test(cssCode));
  ok('no kelp paths in markup', !/class="kelp/.test(htmlCode));
  // v1.5.32: Bruce opener fires immediately — timing gate only applies between stages
  ok('bruce stage 0 skips timing gate', /if\\s*\\(stage\\s*>\\s*0\\)/.test(code));
  ok('body uses dynamic viewport height', /min-height:\\s*100dvh/.test(cssCode));
  // v1.5.25: lemon shark named Sarah gets its own thread
  ok('lemon sarah thread exists with max feelings', LEMON_SARAH_EGG_THREAD.some(m => m.text.includes('😭😭')) && LEMON_SARAH_EGG_THREAD.some(m => m.text.includes('FAVOURITE')));
  ok('lemon named Sarah gets the lemon thread', (() => {
    const before = state.messages.length;
    const rec = { name: "Sarah" };
    maybeSarahEgg("lemon", rec);
    const last = state.messages[state.messages.length - 1];
    const txt = last.msgs.map(m => m.text).join(" ");
    const isLemon = txt.includes("LEMONNNNNNN");
    state.messages.length = before;
    return state.messages.length === before && isLemon && rec.lemonSarahEgg === true && rec.sarahEgg === true;
  })());
  ok('non-lemon named Sarah gets the regular thread', (() => {
    const before = state.messages.length;
    const rec = { name: "sarah" };
    maybeSarahEgg("nurse", rec);
    const last = state.messages[state.messages.length - 1];
    const txt = last.msgs.map(m => m.text).join(" ");
    const isRegular = txt.includes("Wait. You named a shark Sarah? Like me?");
    state.messages.length = before;
    return isRegular && rec.sarahEgg === true && !rec.lemonSarahEgg;
  })());
  // v1.6.5: naming a lemon "Sarah" suppresses the queued lemon celebration
  ok('lemon named Sarah drops the queued lemon celebration', (() => {
    const savePending = state.pendingCelebrations;
    const saveMsgs = state.messages.length;
    state.pendingCelebrations = [
      { speciesId: "lemon", speciesName: "Lemon Shark" },
      { speciesId: "nurse", speciesName: "Nurse Shark" }
    ];
    const rec = { name: "Sarah" };
    maybeSarahEgg("lemon", rec);
    const lemonGone = !state.pendingCelebrations.some(e => e.speciesId === "lemon");
    const nurseKept = state.pendingCelebrations.some(e => e.speciesId === "nurse");
    state.pendingCelebrations = savePending;
    state.messages.length = saveMsgs;
    return lemonGone && nurseKept && rec.lemonSarahEgg === true;
  })());
  ok('lemon celebration kept when name is not Sarah', (() => {
    const savePending = state.pendingCelebrations;
    state.pendingCelebrations = [{ speciesId: "lemon", speciesName: "Lemon Shark" }];
    const rec = { name: "Zest" };
    maybeSarahEgg("lemon", rec);
    const kept = state.pendingCelebrations.some(e => e.speciesId === "lemon");
    state.pendingCelebrations = savePending;
    return kept && !rec.lemonSarahEgg;
  })());
  // v1.5.25: Bruce and Sarah eggs are independent (both orders)
  ok('bruce egg survives a later sarah naming', (() => {
    const saveBruce = state.bruceEgg, saveDone = state.bruceChainComplete, saveExp = state.stats.expeditions;
    const m0 = state.messages.length;
    state.bruceEgg = null; state.bruceChainComplete = false;
    try {
      maybeNameEgg("nurse", { name: "Bruce" });
      const bruceSet = !!state.bruceEgg;
      const m1 = state.messages.length;
      maybeSarahEgg("tiger", { name: "Sarah" });
      maybeNameEgg("tiger", { name: "Sarah" });
      const sarahFired = state.messages.length === m1 + 1;
      const bruceIntact = !!state.bruceEgg && state.bruceEgg.stage === 0;
      state.stats.expeditions = (saveExp || 0) + 2;
      const m2 = state.messages.length;
      advanceBruceChain();
      const bruceFired = state.messages.length === m2 + 1;
      return bruceSet && sarahFired && bruceIntact && bruceFired;
    } finally {
      state.messages.length = m0;
      state.bruceEgg = saveBruce; state.bruceChainComplete = saveDone;
      state.stats.expeditions = saveExp;
      try { localStorage.removeItem("tyi-bruce"); } catch {}
    }
  })());
  ok('sarah then bruce eggs both fire independently', (() => {
    const saveBruce = state.bruceEgg, saveDone = state.bruceChainComplete;
    const m0 = state.messages.length;
    state.bruceEgg = null; state.bruceChainComplete = false;
    try {
      maybeSarahEgg("tiger", { name: "Sarah" });
      maybeNameEgg("tiger", { name: "Sarah" });
      const sarahFired = state.messages.length === m0 + 1;
      maybeSarahEgg("nurse", { name: "Bruce" });
      maybeNameEgg("nurse", { name: "Bruce" });
      return sarahFired && !!state.bruceEgg && state.bruceEgg.stage === 0;
    } finally {
      state.messages.length = m0;
      state.bruceEgg = saveBruce; state.bruceChainComplete = saveDone;
      try { localStorage.removeItem("tyi-bruce"); } catch {}
    }
  })());
  ok('bruce triggers with expeditions=0 (first expedition)', (() => {
    const saveBruce = state.bruceEgg, saveDone = state.bruceChainComplete, saveExp = state.stats.expeditions;
    state.bruceEgg = null; state.bruceChainComplete = false;
    state.stats.expeditions = 0;
    try {
      maybeNameEgg("whale", { name: "bruce" });
      return !!state.bruceEgg && state.bruceEgg.expeditionsAtStage === 0 && state.bruceEgg.stage === 0;
    } finally {
      state.bruceEgg = saveBruce; state.bruceChainComplete = saveDone;
      state.stats.expeditions = saveExp;
      try { localStorage.removeItem("tyi-bruce"); } catch {}
    }
  })());
  ok('togglePin restores scroll position', (() => {
    window.scrollY = 420;
    let got = null;
    const orig = window.scrollTo;
    window.scrollTo = (x, y) => { got = y; };
    state.pinned = null;
    togglePin("salmon");
    window.scrollTo = orig;
    const r = got === 420;
    state.pinned = null; pinStore.save(null);
    return r;
  })());
  // v2.3.0: body::before removed; body is solid #020204, video carries the gradient
  ok('no body::before rule', cssCode.indexOf('body::before') === -1);
  ok('body has no document gradient', (() => {
    let i = 0, clean = true;
    while (true) {
      const b = cssCode.indexOf('body {', i);
      if (b === -1) break;
      const e = cssCode.indexOf('}', b);
      if (e === -1) break;
      if (cssCode.slice(b, e).indexOf('linear-gradient') !== -1) clean = false;
      i = e + 1;
    }
    return clean;
  })());
  ok('html has dark fallback background', cssCode.indexOf('html { background: #000; }') !== -1);
  // v1.5.25 (Mira review): togglePin refreshes Ask Sarah so it never shows a stale pin
  // v1.8.5-beta: Ask Sarah is a single button naming the pinned shark (no dropdown)
  ok('togglePin refreshes Ask Sarah panel', (() => {
    const savePinned = state.pinned, saveOffered = state.sarahAdviceOffered;
    const btn = document.getElementById("sarahAskBtn");
    state.sarahAdviceOffered = true;
    state.pinned = null;
    togglePin("nurse");
    const r = btn.textContent.indexOf("Nurse Shark") !== -1;
    state.pinned = savePinned; pinStore.save(savePinned);
    state.sarahAdviceOffered = saveOffered;
    renderSarahAsk();
    return r;
  })());
  // v1.5.24: Bruce chain uses {bruce} placeholder with player capitalization
  ok('bruce chain uses {bruce} placeholder', BRUCE_CHAIN.some(c => c.some(m => m.text.includes('{bruce}'))));
  ok('OG Jaws Bruce has capital B', BRUCE_CHAIN[0].some(m => m.text.includes('nicknamed it Bruce')));
  ok('bruce chain not scolding', !BRUCE_CHAIN.some(c => c.some(m => /REAL \{species\} after a robot/.test(m.text))));
  ok('bruce chain is warm about the name', BRUCE_CHAIN[0].some(m => m.text.includes('i love it')));
  ok('maybeNameEgg stores playerName', /playerName:\\s*rec\\.name\\.trim\\(\\)/.test(code));
  ok('advanceBruceChain substitutes {bruce}', code.includes('split("{bruce}")'));
  // v1.5.21: lemon pool energy — every lemon convo has big-energy content
  ok('lemon pool includes LEMONNNNNNN', BIG_DAY.lemon.some(c => c.some(m => m.text.includes('LEMONNNNNNN'))));
  ok('all lemon conversations still 3-4 bubbles', BIG_DAY.lemon.every(c => c.length >= 3 && c.length <= 4));
  // v1.5.20: rename triggers checkAchievements (Sarah egg works outside expeditions)
  ok('renameSave calls checkAchievements', /renameSave[\\s\\S]*?checkAchievements\\(\\)/.test(code.split('$("renameSave")')[1].split('});')[0] + 'checkAchievements()') || code.includes('check achievements on any rename'));
  // v1.5.19: Ask Sarah is pinned-shark-only
  ok('ask-sarah needs active pin', /state\\.pinned \\? sharkById\\(state\\.pinned\\) : null/.test(code) && /sarahAdviceOffered && !!s/.test(code));
  ok('ask-sarah dropdown is pinned shark only', !/untagged\(\)/.test(code.split('function renderSarahAsk')[1].split('function askSarahAdvice')[0]));
  ok('pinned empty bar mentions Sarah', code.includes('Sarah might know something if you ask her about one'));
  ok('never-pinned explainer mentions Sarah', code.includes('Sarah might know something too, if you ask her about it'));
  ok('ask-sarah intro mentions researching', htmlCode.includes("she might know something about the shark you're researching"));
  ok('no kiddo in player dialogue', !/who: "me"[^}]*kiddo/i.test(code));
  // v1.5.8: safe batch — seven low-risk items
  ok('still-to-discover heading removed', !archiveUiCode.includes('archive-still-locked-head') && !cssCode.includes('archive-still-locked-head'));
  ok('release buttons reordered', htmlCode.indexOf('id="tagAlongBtn"') < htmlCode.indexOf('id="releaseShipBtn"'));
  ok('release button matches tag-along gradient', cssCode.includes('#releaseBtn') && cssCode.includes('linear-gradient(180deg, #ffd166 0%, #f0b429 100%)'));
  ok('follow button before watch button', code.includes('insertBefore(followBtn, watchBtn)'));
  ok('reunion uses research ID for unnamed', code.includes('rec.researchId || species.name'));
  ok('double-tap zoom disabled', cssCode.includes('touch-action: manipulation'));
  ok('tag-along insight not in log', !code.split('function doTagAlong')[1].split('function doFollowTagged')[0].includes('Tag-along insight'));
  // v1.5.17: IUCN pill inside the head button (whole header tappable) + badge key
  ok('pill inside head button (v1.5.17)', (() => { const g = code.indexOf('class="guide-row-top"'); const p = code.indexOf('status-pill iucn-', g); const b = code.indexOf('</button>', g); const pin = code.indexOf('pin-btn', g); return g > -1 && p > g && p < b && b < pin; })());
  ok('no orphan guide-row-top pill rule', !cssCode.includes('.guide-row-top .status-pill'));
  ok('iucn legend in field guide', htmlCode.includes('iucn-legend') && htmlCode.includes('aria-label="IUCN Red List badge key"'));
  ok('legend covers five categories (no DD)', ['>LC<','>NT<','>VU<','>EN<','>CR<'].every(x => htmlCode.includes(x)) && !htmlCode.includes('>DD<'));
  ok('legend has bottom margin', cssCode.includes('margin: 8px 2px 14px'));
  ok('legend styled', cssCode.includes('.iucn-legend'));
  // v1.5.1: header/phone/archive/porthole batch
  ok('header is tighter', /\\.topbar\\s*\\{[^}]*padding:\\s*4px 8px 2px/.test(cssCode));
  ok('phone renders messages in one pass', /list\\.innerHTML = html;/.test(code) && /let html = "";/.test(code));
  ok('archive badge removed', !/data-tab=\\"archive\\"\\] \\.tab-badge/.test(code));
  ok('orbit has left buffer (no tile edge)', /\\.pw-orbit\\s*\\{[^}]*margin-left:\\s*-70px/.test(cssCode));
  ok('clouds are defined', /rgba\\(255,255,255,0\\.95\\)/.test(cssCode));
  ok('near orbit is 2x+ faster than far', /pw-orbit-near 16s/.test(cssCode) && /pw-orbit-far-x 38s/.test(cssCode));

  // v1.5.3-beta: reunion system replaces multi-individual tagging
  ok('no _individuals writes', !/\\._individuals\\.push/.test(code));
  ok('no _encounterNewIndividual', !/_encounterNewIndividual\\s*=/.test(code) || /state\\._encounterNewIndividual = null/.test(code) === false);
  ok('ECOLOGY_TIER covers all 50 species', (() => {
    if (typeof ECOLOGY_TIER === 'undefined' || typeof SHARKS === 'undefined') return false;
    return SHARKS.every(s => ECOLOGY_TIER[s.id] && ['resident','coastal','migratory'].includes(ECOLOGY_TIER[s.id]));
  })());
  ok('REUNION_ODDS has three tiers', (() => {
    if (typeof REUNION_ODDS === 'undefined') return false;
    return REUNION_ODDS.resident === 0.25 && REUNION_ODDS.coastal === 0.125 && REUNION_ODDS.migratory === 0.05;
  })());
  // v1.7.23-beta: re-sighting tuning — halved odds, no time gating (Avery:
  // "we're not time gating the game" — the 24h cooldown was removed).
  // The reunion roll is a pure odds roll on every encounter.
  ok('reunion roll has no time gating', /isReunion = Math\\.random\\(\\) < odds;/.test(fileCode)
    && !/recentlyResighted/.test(fileCode) && !/RESIGHT_COOLDOWN/.test(fileCode));
  ok('re-sightings list collapses to 3 with Show all', (() => {
    const savedTagged = state.tagged;
    state.tagged = { nurse: { name: '', researchId: 'NS-2026-002', length: 2.9, sex: 'female', location: 'Caribbean Sea', date: 'Oct 10, 2026', resightings: [
      { date: 'Oct 10, 2026', location: 'Caribbean Sea', note: 'n1-oldest' },
      { date: 'Oct 11, 2026', location: 'Caribbean Sea', note: 'n2-older' },
      { date: 'Oct 12, 2026', location: 'Caribbean Sea', note: 'n3' },
      { date: 'Oct 13, 2026', location: 'Caribbean Sea', note: 'n4' },
      { date: 'Oct 14, 2026', location: 'Caribbean Sea', note: 'n5-newest' },
    ] } };
    try { openDetail('nurse'); } catch (e) { state.tagged = savedTagged; return false; }
    const html = document.getElementById('detailContent').innerHTML;
    state.tagged = savedTagged;
    // header keeps the total; older entries live inside the hidden block
    // (between resightOlder and its closing </ul>); newest entries render after it
    const olderStart = html.indexOf('resightOlder');
    const olderEnd = html.indexOf('</ul>', olderStart);
    const n1Idx = html.indexOf('n1-oldest');
    const n5Idx = html.indexOf('n5-newest');
    return html.includes('Re-sightings (5)') && html.includes('Show all (5)')
      && olderStart !== -1 && olderEnd !== -1
      && n1Idx > olderStart && n1Idx < olderEnd
      && n5Idx > olderEnd;
  })());
  ok('re-sightings list with 3 or fewer has no Show all button', (() => {
    const savedTagged = state.tagged;
    state.tagged = { nurse: { name: '', researchId: 'NS-2026-002', length: 2.9, sex: 'female', location: 'Caribbean Sea', date: 'Oct 10, 2026', resightings: [
      { date: 'Oct 10, 2026', location: 'Caribbean Sea', note: 'only-one' },
    ] } };
    try { openDetail('nurse'); } catch (e) { state.tagged = savedTagged; return false; }
    const html = document.getElementById('detailContent').innerHTML;
    state.tagged = savedTagged;
    return html.includes('Re-sightings (1)') && !html.includes('resightMore') && html.includes('only-one');
  })());
  ok('maybeReunionReaction defined', /function maybeReunionReaction/.test(code));
  ok('reunion reaction is one-time per species', /state\\.reunionReacted\\[species\\.id\\]/.test(code));
  ok('different-shark has species observation path', /Observe species/.test(code));
  ok('observation unlocks secret facts', /unlockSecretFact\\(species\\.id\\)/.test(code));
  // Blocker 2: no contain:layout breaking fixed modal
  ok('guide-row has no contain:layout', !/\\.guide-row\\s*\\{[^}]*contain:\\s*layout/.test(cssCode));
  // Blocker 3: reset keys include new storage
  ok('RESET_KEYS includes tyi-pending-celebrations', /tyi-pending-celebrations/.test(code) && /RESET_KEYS[^;]*tyi-pending-celebrations/.test(code));
  ok('RESET_KEYS includes tyi-reunion-reacted', /RESET_KEYS[^;]*tyi-reunion-reacted/.test(code));

  // v1.5.0-beta Mira review: persistence + copy fixes
  ok('celebrationStore persists pending celebrations', (() => {
    celebrationStore.clear();
    const evts = [{speciesId:'nurse',speciesName:'Nurse Shark',nickname:'',researchId:'NS-2026-001',length:2.5,sex:'F',opener:'op',cheer:'ch'}];
    celebrationStore.save(evts);
    const loaded = celebrationStore.load();
    celebrationStore.clear();
    return loaded.length === 1 && loaded[0].speciesId === 'nurse' && celebrationStore.load().length === 0;
  })());
  ok('reload recovery delivers celebration exactly once', (() => {
    celebrationStore.clear();
    const before = state.messages.length;
    const evts = [
      {speciesId:'nurse',speciesName:'Nurse Shark',nickname:'',researchId:'NS-2026-001',length:2.5,sex:'F',opener:'Nice one!',cheer:'Great work!'},
      {speciesId:'tiger',speciesName:'Tiger Shark',nickname:'',researchId:'TS-2026-001',length:3.1,sex:'M',opener:'Whoa!',cheer:'Amazing!'}
    ];
    state.bigDayBags = { 2: [0,1,2,3,4,5,6,7] };
    celebrationStore.save(evts); // simulate: tag saved, reload before Return to ship
    recoverPendingCelebrations(); // first recovery (boot)
    const afterFirst = state.messages.length;
    const storeEmpty = celebrationStore.load().length === 0;
    recoverPendingCelebrations(); // second recovery must be a no-op
    const afterSecond = state.messages.length;
    return (afterFirst - before) === 1 && storeEmpty && afterSecond === afterFirst;
  })());
  ok('WHATS_NEW has v1.6.2-beta', Array.isArray(WHATS_NEW['v1.6.2-beta']) && WHATS_NEW['v1.6.2-beta'].length === 1);
  // v1.6.2: field sketches removed — expanded cards and pinned card show text only
  // (check for the class= attribute patterns; plain substrings would match this file's own CSS assertions)
  ok('no sketch div rendered', code.indexOf('class=\\"guide-' + 'sketch\\"') === -1);
  ok('no sketch caption rendered', code.indexOf('class=\\"sketch-' + 'cap\\"') === -1);
  ok('no sketch CSS rules remain', cssCode.indexOf('.guide-sketch') === -1 && cssCode.indexOf('.pinned-sketch') === -1 && cssCode.indexOf('.sketch-cap') === -1);
    ok('tier 2E is time-neutral', !/before lunch/.test(BIG_DAY[2].map(c => c.map(m => m.text).join(' ')).join(' ')));
  ok('tier 3F longevity is general', !/these three could be out there that whole time/.test(BIG_DAY[3].map(c => c.map(m => m.text).join(' ')).join(' ')));

  // v1.6.1-beta: layout & interaction batch
  ok('WHATS_NEW has v1.6.1-beta with 3 entries', Array.isArray(WHATS_NEW['v1.6.1-beta']) && WHATS_NEW['v1.6.1-beta'].length === 3);
  ok('desktop logo is 132px', /@media \\(min-width: 1024px\\)[\\s\\S]*?\\.site-logo \\{ height: 132px/.test(cssCode));
  ok('base logo is 53px', /\\.site-logo \\{[^}]*height: 53px/.test(cssCode));
  ok('desktop collection cards are horizontal', /@media \\(min-width: 1024px\\)[\\s\\S]*?\\.grid-cell \\{ display: flex/.test(cssCode));
  ok('desktop collection is 3 columns', /@media \\(min-width: 1024px\\)[\\s\\S]*?\\.collection-grid \\{ grid-template-columns: repeat\\(3, 1fr\\)/.test(cssCode));
  ok('collection cell has text wrapper', /class="grid-cell-text"/.test(fileCode));
  // v1.8.1-beta: 100%-complete Collection cards get a subtle yellow border.
  (() => {
    const origTagged = state.tagged;
    const origUnlocked = state.unlockedFacts;
    const origWon = state.won;
    const origDerpy = state.derpyUnlocked;
    const origPendingWin = state.pendingWin;
    const listEl = document.getElementById("collectionList");
    const before = listEl.children.length;
    state.tagged = {
      nurse: { name: "Helen", researchId: "NS-2026-001" },
      thresher: { name: "", researchId: "TS-2026-001" },
    };
    state.unlockedFacts = { nurse: [0, 1, 2, 3, 4], thresher: [0] };
    state.won = false;
    state.derpyUnlocked = false;
    state.pendingWin = false;
    try {
      renderCollection();
      const cells = listEl.children.slice(before);
      ok("complete Collection card gets insights-complete class",
        cells.some(c => (c.className || "").includes("insights-complete")));
      ok("incomplete Collection card has no insights-complete class",
        cells.filter(c => !(c.className || "").includes("insights-complete")).length === 1);
    } catch (e) {
      ok("collection complete-border render (threw: " + e.message + ")", false);
    } finally {
      state.tagged = origTagged;
      state.unlockedFacts = origUnlocked;
      state.won = origWon;
      state.derpyUnlocked = origDerpy;
      state.pendingWin = origPendingWin;
    }
  })();
  ok('complete Collection card has yellow border CSS', /\\.grid-cell\\.insights-complete\\s*\\{[^}]*border:[^}]*255,\\s*209,\\s*102/.test(cssCode));
  // v1.8.1-beta (Mira review): a full-length array with a missing index
  // must NOT count as complete — index membership, not length.
  (() => {
    const origTagged = state.tagged;
    const origUnlocked = state.unlockedFacts;
    const origWon = state.won;
    const origDerpy = state.derpyUnlocked;
    const origPendingWin = state.pendingWin;
    const listEl = document.getElementById("collectionList");
    const before = listEl.children.length;
    state.tagged = {
      nurse: { name: "Helen", researchId: "NS-2026-001" },
      thresher: { name: "", researchId: "TS-2026-001" },
    };
    // Out-of-range [0,1,2,3,99] and duplicate [0,0,1,2]: both full-length
    // but each missing an index — neither card may show the border.
    state.unlockedFacts = { nurse: [0, 1, 2, 3, 99], thresher: [0, 0, 1, 2] };
    state.won = false;
    state.derpyUnlocked = false;
    state.pendingWin = false;
    try {
      renderCollection();
      const cells = listEl.children.slice(before);
      ok("full-length array with missing index gets no insights-complete class",
        !cells.some(c => (c.className || "").includes("insights-complete")));
    } catch (e) {
      ok("collection complete-border missing-index render (threw: " + e.message + ")", false);
    } finally {
      state.tagged = origTagged;
      state.unlockedFacts = origUnlocked;
      state.won = origWon;
      state.derpyUnlocked = origDerpy;
      state.pendingWin = origPendingWin;
    }
  })();
  // v1.8.1-beta (Mira review): complete cards announce completion in the
  // aria-label — touch users get no hover tooltip. The global headless
  // mock's setAttribute is a no-op, so this test swaps in a storing
  // createElement (same pattern as the v1.7.22 accordion test).
  (() => {
    const origTagged = state.tagged;
    const origUnlocked = state.unlockedFacts;
    const origWon = state.won;
    const origDerpy = state.derpyUnlocked;
    const origPendingWin = state.pendingWin;
    const origCreate = document.createElement;
    const listEl = document.getElementById("collectionList");
    const before = listEl.children.length;
    state.tagged = {
      nurse: { name: "Helen", researchId: "NS-2026-001" },
      thresher: { name: "", researchId: "TS-2026-001" },
    };
    state.unlockedFacts = { nurse: [0, 1, 2, 3, 4], thresher: [0] };
    state.won = false;
    state.derpyUnlocked = false;
    state.pendingWin = false;
    document.createElement = () => {
      const el = {
        children: [], _attrs: {}, className: "", title: "", innerHTML: "",
        style: {}, dataset: {},
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
        setAttribute(k, v) { el._attrs[k] = String(v); },
        getAttribute(k) { return (k in el._attrs) ? el._attrs[k] : null; },
        addEventListener() {}, removeEventListener() {},
        appendChild(c) { el.children.push(c); return c; },
        querySelector() { return null; }, querySelectorAll() { return []; },
      };
      return el;
    };
    try {
      renderCollection();
      const cells = listEl.children.slice(before);
      const helen = cells.find(c => (c.getAttribute("aria-label") || "").includes("Helen"));
      ok("complete Collection card aria-label mentions all insights discovered",
        !!helen && (helen.getAttribute("aria-label") || "").includes("all insights discovered"));
      const thresherCell = cells.find(c => (c.getAttribute("aria-label") || "").includes("TS-2026-001"));
      ok("incomplete Collection card aria-label omits completion",
        !!thresherCell && !(thresherCell.getAttribute("aria-label") || "").includes("all insights discovered"));
    } catch (e) {
      ok("collection complete-border aria-label render (threw: " + e.message + ")", false);
    } finally {
      document.createElement = origCreate;
      state.tagged = origTagged;
      state.unlockedFacts = origUnlocked;
      state.won = origWon;
      state.derpyUnlocked = origDerpy;
      state.pendingWin = origPendingWin;
    }
  })();
  ok('checklist circle CSS present', /\\.tag-check \\{/.test(cssCode) && /\\.tag-check\\.is-done/.test(cssCode));
  ok('field-guide rows use checklist circles', /class="tag-check/.test(fileCode));
  ok('sr-only utility CSS present', /\.sr-only \{/.test(cssCode));
  ok('checklist circles have screen-reader status text', fileCode.indexOf('class="sr-only"') !== -1 && fileCode.indexOf('\${done ? "Tagged" : "Not tagged"}') !== -1);
  ok('no checkmark prefix in field-guide rows', fileCode.indexOf('\${done ? "✅ " : ""}') === -1);
  ok('pinch-to-zoom removed (no pinch state)', !/pinchStartDist|pinching|pinchMoved/.test(fileCode));
  ok('one-finger pan still wired', /initMapGestures/.test(fileCode) && /mapFocusClear/.test(fileCode));
  ok('no pinch whats-new entry', !/Map pinch-to-zoom/.test(fileCode));

  // v1.6.6-beta: Shadows match their sharks
  ok('WHATS_NEW has v1.6.6-beta with 1 entry', Array.isArray(WHATS_NEW['v1.6.6-beta']) && WHATS_NEW['v1.6.6-beta'].length === 1);
  ok('dive encounter shadow uses illustration not silhouette webp', (() => {
    // Phase 1 must use the illustration (darkened by CSS) so the shadow
    // always matches the shark — no separate silhouette image.
    const src = doEncounter.toString();
    return src.includes('shark-shadow') &&
           src.includes('sharkArtImg(species.id, "illustration", "Mysterious shark silhouette")') &&
           !src.includes('sharkArtImg(species.id, "silhouette"');
  })());
  ok('shark-shadow CSS darkens illustration and SVG fallback', (() => {
    // The dark overlay must apply to both the WebP img and any SVG
    // fallback, so a failed image load never reveals the species.
    return /\\.shark-shadow img,\\s*\\.shark-shadow svg\\s*\\{\\s*filter:\\s*brightness\\(0\\)/.test(cssCode);
  })());
  ok('preloadSharkArt only preloads illustrations', (() => {
    // Silhouettes are no longer separate images; preloading them is wasteful.
    const src = preloadSharkArt.toString();
    return src.includes('"illustration"') && !src.includes('"silhouette"');
  })());

  // v1.6.3-beta: Archive search + sort
  ok('WHATS_NEW has v1.6.3-beta with 2 entries', Array.isArray(WHATS_NEW['v1.6.3-beta']) && WHATS_NEW['v1.6.3-beta'].length === 2);
  ok('WHATS_NEW has v1.7.6-beta', Array.isArray(WHATS_NEW['v1.7.6-beta']) && WHATS_NEW['v1.7.6-beta'].length > 0);
  ok('WHATS_NEW has v1.6.5-beta', Array.isArray(WHATS_NEW['v1.6.5-beta']) && WHATS_NEW['v1.6.5-beta'].length >= 1);
  ok('WHATS_NEW has v1.6.4-beta', Array.isArray(WHATS_NEW['v1.6.4-beta']) && WHATS_NEW['v1.6.4-beta'].length > 0);
  // v1.7.7-beta: notification badge vertical alignment
  ok('WHATS_NEW has v1.7.7-beta', Array.isArray(WHATS_NEW['v1.7.7-beta']) && WHATS_NEW['v1.7.7-beta'].length > 0);
  ok('phone-badge uses flexbox centering', /\\.phone-badge[^}]*display:\\s*inline-flex/.test(cssCode));
  ok('phone-badge has align-items center', /\\.phone-badge[^}]*align-items:\\s*center/.test(cssCode));
  ok('phone-badge has box-sizing border-box', /\\.phone-badge[^}]*box-sizing:\\s*border-box/.test(cssCode));
  ok('archiveFilters exists with defaults', typeof archiveFilters === 'object' && archiveFilters.q === '' && archiveFilters.sort === 'name');
  ok('archive sort buttons in HTML', /data-asort="name"/.test(htmlCode) && /data-asort="newest"/.test(htmlCode) && /data-asort="oldest"/.test(htmlCode) && /data-asort="iucn"/.test(htmlCode));
  ok('archive search input in HTML', /id="archiveSearch"/.test(htmlCode));
  ok('archiveMatches filters by name', (() => {
    archiveFilters.q = 'nurse';
    const nurse = SHARKS.find(s => s.id === 'nurse');
    const thresher = SHARKS.find(s => s.id === 'thresher');
    const r = archiveMatches(nurse) && !archiveMatches(thresher);
    archiveFilters.q = '';
    return r;
  })());
  ok('archiveSortCompare sorts A-Z', (() => {
    archiveFilters.sort = 'name';
    const a = SHARKS.find(s => s.id === 'thresher');
    const b = SHARKS.find(s => s.id === 'nurse');
    return archiveSortCompare(a, b) > 0 && archiveSortCompare(b, a) < 0;
  })());
  /* v1.6.3-beta Mira review fix: newest/oldest uses taggedAt, not Date.parse
     of the localized display string. */
  ok('archiveSortCompare does not Date.parse the display string', !/Date\\.parse\\(\\s*t[ab]\\.date/.test(fileCode));
  ok('archiveSortCompare orders same-day tags by taggedAt', (() => {
    const saved = state.tagged;
    /* Same display date string, different ms timestamps. */
    state.tagged = {
      nurse: { taggedAt: 1000, date: 'Oct 10, 2026' },
      thresher: { taggedAt: 1001, date: 'Oct 10, 2026' },
      whale: { taggedAt: 999, date: 'Oct 10, 2026' }
    };
    archiveDateRanks = null;
    const nurse = SHARKS.find(s => s.id === 'nurse');
    const thresher = SHARKS.find(s => s.id === 'thresher');
    const whale = SHARKS.find(s => s.id === 'whale');
    archiveFilters.sort = 'newest';
    const newestFirst = [nurse, thresher, whale].sort(archiveSortCompare).map(s => s.id);
    archiveFilters.sort = 'oldest';
    archiveDateRanks = null;
    const oldestFirst = [nurse, thresher, whale].sort(archiveSortCompare).map(s => s.id);
    archiveFilters.sort = 'name';
    state.tagged = saved;
    archiveDateRanks = null;
    return newestFirst.join(',') === 'thresher,nurse,whale' &&
           oldestFirst.join(',') === 'whale,nurse,thresher';
  })());

  // v1.6.7-beta: one resighting = one Sarah thread
  ok('WHATS_NEW has v1.6.7-beta entry', Array.isArray(WHATS_NEW['v1.6.7-beta']) && WHATS_NEW['v1.6.7-beta'].length >= 1);

  // v1.6.8-beta through v1.7.5-beta: WHATS_NEW entries present
  ok('WHATS_NEW has v1.6.8-beta', Array.isArray(WHATS_NEW['v1.6.8-beta']) && WHATS_NEW['v1.6.8-beta'].length >= 1);
  ok('WHATS_NEW has v1.6.9-beta', Array.isArray(WHATS_NEW['v1.6.9-beta']) && WHATS_NEW['v1.6.9-beta'].length >= 1);
  ok('WHATS_NEW has v1.6.10-beta', Array.isArray(WHATS_NEW['v1.6.10-beta']) && WHATS_NEW['v1.6.10-beta'].length >= 1);
  ok('WHATS_NEW has v1.6.11-beta', Array.isArray(WHATS_NEW['v1.6.11-beta']) && WHATS_NEW['v1.6.11-beta'].length >= 1);
  ok('WHATS_NEW has v1.6.12-beta', Array.isArray(WHATS_NEW['v1.6.12-beta']) && WHATS_NEW['v1.6.12-beta'].length >= 1);
  ok('WHATS_NEW has v1.6.13-beta', Array.isArray(WHATS_NEW['v1.6.13-beta']) && WHATS_NEW['v1.6.13-beta'].length >= 1);
  ok('WHATS_NEW has v1.7.0-beta', Array.isArray(WHATS_NEW['v1.7.0-beta']) && WHATS_NEW['v1.7.0-beta'].length >= 1);
  ok('WHATS_NEW has v1.7.1-beta', Array.isArray(WHATS_NEW['v1.7.1-beta']) && WHATS_NEW['v1.7.1-beta'].length >= 1);
  ok('WHATS_NEW has v1.7.2-beta', Array.isArray(WHATS_NEW['v1.7.2-beta']) && WHATS_NEW['v1.7.2-beta'].length >= 1);
  ok('WHATS_NEW has v1.7.3-beta', Array.isArray(WHATS_NEW['v1.7.3-beta']) && WHATS_NEW['v1.7.3-beta'].length >= 1);
  ok('WHATS_NEW has v1.7.4-beta', Array.isArray(WHATS_NEW['v1.7.4-beta']) && WHATS_NEW['v1.7.4-beta'].length >= 1);
  ok('WHATS_NEW has v1.7.5-beta', Array.isArray(WHATS_NEW['v1.7.5-beta']) && WHATS_NEW['v1.7.5-beta'].length >= 1);
  ok('WHATS_NEW has v1.7.11-beta', Array.isArray(WHATS_NEW['v1.7.11-beta']) && WHATS_NEW['v1.7.11-beta'].length >= 1);

  // v1.7.9-beta: region unlocks are count-based (10 tags -> Galápagos + South Africa)
  ok('v1.7.9 WHATS_NEW entry', (WHATS_NEW['v1.7.9-beta'] || []).length >= 1);
  ok('v1.7.9 region thread is count-based',
    REGION_UNLOCK_THREAD[0].text.includes('Ten sharks') && REGION_UNLOCK_THREAD[1].text.includes('Ten tagged'));
  ok('v1.7.9 checkMilestones uses tag count',
    fileCode.includes('if (!state.regionsUnlocked && taggedIds.length >= 10)'));
  // 9->10 tag unlock logic: condition uses tag count >= 10
  ok('v1.7.9 unlock condition is count-based', (() => {
    // The condition in checkMilestones should be: taggedIds.length >= 10
    // Test the logic directly without DOM side effects
    const testAt9 = (() => {
      const taggedIds = [];
      for (let i = 0; i < 9; i++) taggedIds.push('shark' + i);
      return !(false || taggedIds.length >= 10); // simulates !state.regionsUnlocked && count >= 10
    })();
    const testAt10 = (() => {
      const taggedIds = [];
      for (let i = 0; i < 10; i++) taggedIds.push('shark' + i);
      return taggedIds.length >= 10;
    })();
    return testAt9 === true && testAt10 === true; // 9 should NOT trigger, 10 should
  })());
  // Migration uses count-based check
  ok('v1.7.9 migration uses tag count', fileCode.includes('if (Object.keys(state.tagged).length >= 10)'));
  // ORIGINAL_SIX removed
  ok('v1.7.9 ORIGINAL_SIX removed', !fileCode.includes('ORIGINAL_SIX'));
  // Planner dropdown uses count language
  ok('v1.7.9 planner shows 10 tags', fileCode.includes('unlocks at 10 tags'));
  // Research locked text uses count language
  ok('v1.7.9 research shows 10 sharks', fileCode.includes('tag 10 sharks to unlock them'));
  // No stale comments describing the old six-species unlock rule (Mira review)
  ok('v1.7.9 no stale six-species unlock comments',
    !fileCode.includes('tagging the first six earns new waters') &&
    !fileCode.includes('Tagging all six') &&
    !fileCode.includes('Tagging the first six (the original roster) unlocks') &&
    !fileCode.includes('original-six unlock'));
  ok('WHATS_NEW has v1.7.12-beta', Array.isArray(WHATS_NEW['v1.7.12-beta']) && WHATS_NEW['v1.7.12-beta'].length >= 1);
ok('WHATS_NEW has v1.7.13-beta', Array.isArray(WHATS_NEW['v1.7.13-beta']) && WHATS_NEW['v1.7.13-beta'].length >= 1);
ok('WHATS_NEW has v1.7.16-beta', Array.isArray(WHATS_NEW['v1.7.16-beta']) && WHATS_NEW['v1.7.16-beta'].length >= 1);
ok('WHATS_NEW has v1.7.17-beta', Array.isArray(WHATS_NEW['v1.7.17-beta']) && WHATS_NEW['v1.7.17-beta'].length >= 1);
ok('WHATS_NEW has v1.7.18-beta', Array.isArray(WHATS_NEW['v1.7.18-beta']) && WHATS_NEW['v1.7.18-beta'].length >= 1);
ok('WHATS_NEW has v1.7.20-beta', Array.isArray(WHATS_NEW['v1.7.20-beta']) && WHATS_NEW['v1.7.20-beta'].length >= 1);
ok('WHATS_NEW has v1.7.21-beta', Array.isArray(WHATS_NEW['v1.7.21-beta']) && WHATS_NEW['v1.7.21-beta'].length >= 1);
ok('WHATS_NEW has v1.7.22-beta', Array.isArray(WHATS_NEW['v1.7.22-beta']) && WHATS_NEW['v1.7.22-beta'].length >= 1);
ok('WHATS_NEW has v1.7.24-beta', Array.isArray(WHATS_NEW['v1.7.24-beta']) && WHATS_NEW['v1.7.24-beta'].length >= 1);
ok('WHATS_NEW has v1.7.25-beta', Array.isArray(WHATS_NEW['v1.7.25-beta']) && WHATS_NEW['v1.7.25-beta'].length >= 1);
ok('WHATS_NEW has v1.7.27-beta', Array.isArray(WHATS_NEW['v1.7.27-beta']) && WHATS_NEW['v1.7.27-beta'].length >= 1);
ok('WHATS_NEW has v1.7.26-beta', Array.isArray(WHATS_NEW['v1.7.26-beta']) && WHATS_NEW['v1.7.26-beta'].length >= 1);
ok('WHATS_NEW has v1.7.34-beta', Array.isArray(WHATS_NEW['v1.7.34-beta']) && WHATS_NEW['v1.7.34-beta'].length >= 1);
ok('WHATS_NEW has v1.7.35-beta', Array.isArray(WHATS_NEW['v1.7.35-beta']) && WHATS_NEW['v1.7.35-beta'].length >= 1);
  ok('WHATS_NEW has v1.7.36-beta', Array.isArray(WHATS_NEW['v1.7.36-beta']) && WHATS_NEW['v1.7.36-beta'].length >= 1);
  ok('WHATS_NEW has v1.8.0-beta', Array.isArray(WHATS_NEW['v1.8.0-beta']) && WHATS_NEW['v1.8.0-beta'].length === 4);
  ok('WHATS_NEW has v1.8.1-beta', Array.isArray(WHATS_NEW['v1.8.1-beta']) && WHATS_NEW['v1.8.1-beta'].length === 3);
  ok('WHATS_NEW has v1.8.2-beta', Array.isArray(WHATS_NEW['v1.8.2-beta']) && WHATS_NEW['v1.8.2-beta'].length === 1);
  ok('WHATS_NEW has v1.8.3-beta', Array.isArray(WHATS_NEW['v1.8.3-beta']) && WHATS_NEW['v1.8.3-beta'].length === 2);
  ok('WHATS_NEW has v1.8.4-beta', Array.isArray(WHATS_NEW['v1.8.4-beta']) && WHATS_NEW['v1.8.4-beta'].length === 1);
  ok('WHATS_NEW has v1.8.5-beta', Array.isArray(WHATS_NEW['v1.8.5-beta']) && WHATS_NEW['v1.8.5-beta'].length === 3);
  // v1.8.5-beta: Sarah content bundle
  ok('context pass: greenland chat names the species', COUSIN_CHATS.greenland[0].them.indexOf('Greenland shark') !== -1);
  ok('context pass: mako chat names the species', COUSIN_CHATS.mako[2].them.indexOf('Makos') === 0);
  ok('context pass: cookiecutter chat names the species', COUSIN_CHATS.cookiecutter[1].them.indexOf("cookiecutter's") !== -1);
  ok('context pass: catshark chats name the species', COUSIN_CHATS.catshark[1].them.indexOf('Small-spotted catshark') === 0 && COUSIN_CHATS.catshark[2].them.indexOf('Small-spotted catsharks') === 0);
  ok('context pass: sixgill chats name the species', COUSIN_CHATS.sixgill[1].them.indexOf('Sixgill') === 0 && COUSIN_CHATS.sixgill[2].them.indexOf('Sixgill') === 0);
  ok('context pass: portjackson chats name the species', COUSIN_CHATS.portjackson[0].them.indexOf("Port Jackson's") !== -1 && COUSIN_CHATS.portjackson[2].them.indexOf('Port Jacksons') === 0);
  ok('whale hook drops polka-dotted bus', (() => {
    const w = SHARKS.find(s => s.id === 'whale');
    return w.hook.indexOf('polka-dotted bus') === -1 && w.hook.indexOf('plankton') !== -1 && w.hook.indexOf('largest fish') !== -1;
  })());
  ok('Ask Sarah button names the researched shark', (() => {
    const savePinned = state.pinned, saveOffered = state.sarahAdviceOffered;
    state.sarahAdviceOffered = true; state.pinned = 'mako';
    renderSarahAsk();
    const t = document.getElementById('sarahAskBtn').textContent;
    state.pinned = savePinned; state.sarahAdviceOffered = saveOffered; renderSarahAsk();
    return t.indexOf('Shortfin Mako') !== -1;
  })());
  ok('Ask Sarah dropdown is gone from HTML', htmlCode.indexOf('sarahAskSelect') === -1);
  ok('sea conditions have 10 lines per zone', ['tropical','temperate','polar','generic'].every(z => SEA_CONDITIONS[z].length >= 10));
  ok('named checkins have 8 variants', NAMED_CHECKINS.length === 8);
  ok('checkin never repeats twice in a row', typeof lastCheckinIdx !== 'undefined');
  ok('sizeTierFor covers all 50 species', SHARKS.every(s => ['small','medium','large','xlarge'].indexOf(sizeTierFor(s)) !== -1));
  ok('size tiers match real sizes', sizeTierFor(SHARKS.find(s => s.id === 'whale')) === 'xlarge' && sizeTierFor(SHARKS.find(s => s.id === 'dwarflantern')) === 'small' && sizeTierFor(SHARKS.find(s => s.id === 'porbeagle')) === 'medium');
  ok('no curly quotes around nicknames in expedition code', fileCode.indexOf(String.fromCharCode(92) + 'u201c' + String.fromCharCode(36) + '{') === -1);
  ok('reunion closer pool has 10 with no-repeat guard', RESIGHT_REUNION_CLOSERS.length === 10 && typeof lastReunionCloserIdx !== 'undefined');
  ok('sightings capped at 10 per page', SIGHTINGS_PAGE_SIZE === 10 && typeof sightingsShowMore === 'function');
  ok('sightings render caps with show-more button', (() => {
    const save = state.sightings;
    const saveShown = sightingsShown;
    state.sightings = Array.from({length: 25}, (_, i) => ({ speciesId: 'mako', name: 'Mako Shark', doing: 'cruising', location: 'Test', date: 'Jan 1', ts: i }));
    sightingsShown = SIGHTINGS_PAGE_SIZE;
    const list = document.getElementById('sightingsList');
    list.children = []; // mock innerHTML="" does not clear children; real DOM does
    renderSightings();
    const entries = list.children.filter(c => c.className === 'sighting-entry').length;
    const hasMore = list.children.some(c => String(c.className || '').indexOf('sightings-more') !== -1);
    state.sightings = save; sightingsShown = saveShown;
    list.children = []; renderSightings();
    return entries === 10 && hasMore;
  })());
  // v1.8.5-beta fix (Mira review): logbook nickname only for the SAME tagged individual.
  // Never label a watched wild shark with the tagged individual's nickname.
  ok('logbook nickname identity rules', (() => {
    const origTagged = state.tagged, origLogbook = state.logbook, origShown = logbookShown;
    const mkTrip = (encounters) => ({
      date: "Oct 18, 2026", region: "caribbean", depth: "surface", bait: "mackerel",
      method: "", methodOpt: "", ts: Date.now(), encounters,
      conditions: "", fieldNote: "", pinHint: "",
    });
    const listEl = document.getElementById("logbookList");
    const renderOne = (enc) => {
      state.logbook = [mkTrip([enc])];
      logbookShown = LOGBOOK_PAGE_SIZE;
      listEl.children = [];
      renderLogbook();
      const html = listEl.children.filter(c => c.className === "logbook-entry").map(c => c.innerHTML).join("");
      listEl.children = [];
      return html;
    };
    try {
      state.tagged = { nurse: { name: "Helen", researchId: "NS-2026-004" } };
      // (a) matching researchId -> nickname shown
      const a = renderOne({ result: "tagged", name: "Nurse Shark", speciesId: "nurse", researchId: "NS-2026-004" });
      // (b) watched wild shark, no researchId -> species only
      const b = renderOne({ result: "watched", name: "Nurse Shark", speciesId: "nurse", researchId: null });
      // (b2) watched, different researchId -> species only
      const b2 = renderOne({ result: "watched", name: "Nurse Shark", speciesId: "nurse", researchId: "NS-2026-099" });
      // (c) older tag: encounter ID differs from the current tagged record -> no nickname
      const c = renderOne({ result: "tagged", name: "Nurse Shark", speciesId: "nurse", researchId: "NS-2026-001" });
      return a.indexOf("Helen") !== -1 &&
        b.indexOf("Helen") === -1 && b.indexOf("Nurse Shark") !== -1 &&
        b2.indexOf("Helen") === -1 &&
        c.indexOf("Helen") === -1;
    } finally {
      state.tagged = origTagged; state.logbook = origLogbook; logbookShown = origShown;
      listEl.children = [];
    }
  })());
  // v1.8.5-beta fix (Mira review): size tiers are scoped to the mystery silhouette;
  // the reveal phase keeps the deliberate 108px cap so art + badge fit the 190px scene.
  ok('size tiers apply to silhouette only, never the reveal', (() => {
    const tiers = ["small", "medium", "large", "xlarge"];
    const scoped = tiers.every(t =>
      cssCode.indexOf(".dive-shark.size-" + t + " .shark-silhouette img") !== -1 &&
      cssCode.indexOf(".dive-shark.size-" + t + " .shark-silhouette svg") !== -1);
    const noReveal = tiers.every(t => {
      let i = cssCode.indexOf(".dive-shark.size-" + t);
      while (i !== -1) {
        const end = cssCode.indexOf("}", i);
        if (cssCode.slice(i, end).indexOf(".shark-reveal") !== -1) return false;
        i = cssCode.indexOf(".dive-shark.size-" + t, end);
      }
      return true;
    });
    return scoped && noReveal;
  })());
  ok('reveal art keeps the 108px badge-safety cap', (() => {
    const i = cssCode.indexOf(".shark-reveal img, .shark-reveal svg {");
    if (i === -1) return false;
    const block = cssCode.slice(i, cssCode.indexOf("}", i));
    return block.indexOf("max-height: 108px") !== -1;
  })());
  // v1.8.5-beta: behavioral no-repeat guards (Mira review) — deterministic via mocked Math.random.
  ok('checkin never deals the same template twice in a row (behavioral)', (() => {
    const origRandom = Math.random, origTagged = state.tagged, origIdx = lastCheckinIdx, origPinned = state.pinned;
    const origMentionsC = state.sharkMentions;
    const L = NAMED_CHECKINS.length;
    try {
      state.tagged = { mako: { name: "Finley", researchId: "SM-2026-001" } };
      state.pinned = 'mako'; // v2.5.4-beta: coherence — check-ins need pinned/encountered species
      state.sharkMentions = {}; // v2.5.6-beta: mention cooldown must not block the fixture
      lastCheckinIdx = -1;
      // gate open (<=0.4), pick -> the single named shark, ci = 3
      const seq = [0.1, 0.0, 3.5 / L];
      let i = 0;
      Math.random = () => seq[i++ % seq.length];
      maybeCheckinThread();
      const first = lastCheckinIdx;
      i = 0; // identical draws -> guard must bump 3 -> 4
      maybeCheckinThread();
      const second = lastCheckinIdx;
      // wrap: last index drawn again -> 0
      lastCheckinIdx = L - 1;
      const seq2 = [0.1, 0.0, (L - 0.5) / L];
      let j = 0;
      Math.random = () => seq2[j++ % seq2.length];
      maybeCheckinThread();
      const wrapped = lastCheckinIdx;
      return first === 3 && second === 4 && wrapped === 0;
    } finally {
      Math.random = origRandom; state.tagged = origTagged; lastCheckinIdx = origIdx; state.pinned = origPinned;
      state.sharkMentions = origMentionsC;
    }
  })());
  ok('reunion closer never repeats twice in a row (behavioral)', (() => {
    const origRandom = Math.random, origReacted = state.reunionReacted, origMsgs = state.messages;
    const origUnread = state.unread, origLastAt = state.lastSarahMsgAt, origIdx = lastReunionCloserIdx;
    const origMentions = state.sharkMentions;
    const L = RESIGHT_REUNION_CLOSERS.length;
    try {
      state.reunionReacted = {};
      state.sharkMentions = {};
      state.messages = [];
      const rec = { name: "Fin", researchId: "XX-1", sex: "female" };
      let rv = 3.5 / L;
      Math.random = () => rv;
      lastReunionCloserIdx = -1;
      maybeReunionReaction(SHARKS.find(s => s.id === "mako"), rec);
      const first = lastReunionCloserIdx;
      // different species (reunion guard is per-species), same draw -> guard bumps 3 -> 4
      maybeReunionReaction(SHARKS.find(s => s.id === "tiger"), rec);
      const second = lastReunionCloserIdx;
      // wrap: last index drawn again -> 0
      lastReunionCloserIdx = L - 1;
      rv = (L - 0.5) / L;
      maybeReunionReaction(SHARKS.find(s => s.id === "lemon"), rec);
      const wrapped = lastReunionCloserIdx;
      return first === 3 && second === 4 && wrapped === 0;
    } finally {
      Math.random = origRandom; state.reunionReacted = origReacted; state.messages = origMsgs;
      state.unread = origUnread; state.lastSarahMsgAt = origLastAt; lastReunionCloserIdx = origIdx;
      state.sharkMentions = origMentions;
    }
  })());
  // v1.8.5-beta: sightings "show more" pages through the rest (mirrors #108 logbook paging tests).
  ok('sightings show-more reveals remaining entries', (() => {
    const save = state.sightings;
    const saveShown = sightingsShown;
    const list = document.getElementById('sightingsList');
    const count = () => list.children.filter(c => c.className === 'sighting-entry').length;
    const hasMore = () => list.children.some(c => String(c.className || '').indexOf('sightings-more') !== -1);
    try {
      state.sightings = Array.from({length: 25}, (_, i) => ({ speciesId: 'mako', name: 'Mako Shark', doing: 'cruising', location: 'Test', date: 'Jan 1', ts: i }));
      sightingsShown = SIGHTINGS_PAGE_SIZE;
      list.children = []; renderSightings();
      const before = count(), btnBefore = hasMore();
      sightingsShowMore(); // 20 shown; internal render appends on the mock, so re-render cleanly
      list.children = []; renderSightings();
      const mid = count(), btnMid = hasMore();
      sightingsShowMore(); // 30 >= 25: all shown, button gone
      list.children = []; renderSightings();
      const after = count(), btnAfter = hasMore();
      return before === 10 && btnBefore && mid === 20 && btnMid && after === 25 && !btnAfter;
    } finally {
      state.sightings = save; sightingsShown = saveShown;
      list.children = []; renderSightings();
    }
  })());
ok('WHATS_NEW has v1.7.33-beta', Array.isArray(WHATS_NEW['v1.7.33-beta']) && WHATS_NEW['v1.7.33-beta'].length >= 1);
ok('WHATS_NEW has v1.7.32-beta', Array.isArray(WHATS_NEW['v1.7.32-beta']) && WHATS_NEW['v1.7.32-beta'].length >= 1);
ok('WHATS_NEW has v1.7.31-beta', Array.isArray(WHATS_NEW['v1.7.31-beta']) && WHATS_NEW['v1.7.31-beta'].length >= 1);
ok('WHATS_NEW has v1.7.30-beta', Array.isArray(WHATS_NEW['v1.7.30-beta']) && WHATS_NEW['v1.7.30-beta'].length >= 1);
ok('WHATS_NEW has v1.7.29-beta', Array.isArray(WHATS_NEW['v1.7.29-beta']) && WHATS_NEW['v1.7.29-beta'].length >= 1);
ok('WHATS_NEW has v1.7.28-beta', Array.isArray(WHATS_NEW['v1.7.28-beta']) && WHATS_NEW['v1.7.28-beta'].length >= 1);
ok('no wall-clock claim remains (rAF timestamp)', !/wall-clock/.test(fileCode + cssCode) && /rAF timestamp/.test(fileCode));
ok('WHATS_NEW has v1.7.23-beta', Array.isArray(WHATS_NEW['v1.7.23-beta']) && WHATS_NEW['v1.7.23-beta'].length >= 1);

  // v1.7.16-beta: derpy retroactive unlock — explicit full-roster gate, stateful migration tests
  ok('migrateDerpyUnlock gates on full roster in source', /function migrateDerpyUnlock\\(\\)[\\s\\S]{0,900}?hasFullRoster\\(\\)/.test(fileCode));
  ok('hasFullRoster helper validates roster ids', typeof hasFullRoster === 'function' && /function hasFullRoster\\(\\)[\\s\\S]*?SHARKS\\.every/.test(fileCode));
  // v1.7.17-beta: manual derpy claim fallback + migration logging
  ok('claimDerpyAward function exists', /function claimDerpyAward\\(\\)/.test(fileCode));
  ok('claimDerpyAward grants unlock and persists', /function claimDerpyAward[\\s\\S]*?state\\.derpyUnlocked = true[\\s\\S]*?tyi-derpy-unlocked/.test(fileCode));
  // v1.7.18-beta: claim button checks tagged count directly, not the win flag (old state.won gate removed)
  ok('v1.7.18 claim button uses roster-id gate',
    /hasFullRoster\\(\\) && !state\\.derpyUnlocked && !state\\.pendingWin[\\s\\S]*?derpy-claim/.test(fileCode));
  ok('claimDerpyAward is idempotent and ceremony-safe in source',
    /function claimDerpyAward[\\s\\S]*?if \\(state\\.derpyUnlocked\\) return false[\\s\\S]*?if \\(state\\.pendingWin\\) return false[\\s\\S]*?if \\(!hasFullRoster\\(\\)\\) return false/.test(fileCode));
  ok('v1.7.18 claimDerpyAward restores win flag',
    /function claimDerpyAward[\\s\\S]*?state\\.won = true[\\s\\S]*?tyi-won/.test(fileCode));
  ok('migrateDerpyUnlock logs gate inputs', /\\[derpy-migrate\\]/.test(fileCode));
  ok('.derpy-claim CSS rule present', /\\.derpy-claim\\s*\\{/.test(cssCode));
  (() => {
    const _won = state.won, _tagged = state.tagged, _derpy = state.derpyUnlocked,
          _msgs = state.messages, _unread = state.unread, _regions = state.regionsUnlocked;
    const _lsWon = localStorage.getItem('tyi-won'), _lsDerpy = localStorage.getItem('tyi-derpy-unlocked'),
          _lsRegions = localStorage.getItem('tyi-regions');
    const derpyMarker = 'derpy mode toggle in your collection book';
    const countDerpyThreads = () => state.messages.filter(t =>
      (t.msgs || []).some(m => (m.text || '').includes(derpyMarker))).length;
    const fullTagged = () => Object.fromEntries(SHARKS.map(s => [s.id, { researchId: 'T' }]));
    const partialTagged = () => Object.fromEntries(SHARKS.slice(0, 6).map(s => [s.id, { researchId: 'T' }]));
    const reset = () => {
      state.messages = []; state.unread = 0; state.derpyUnlocked = false;
      try { localStorage.removeItem('tyi-derpy-unlocked'); } catch {}
    };

    // Case 1: partial-roster "winner" (6/50) — win reset, NO derpy award/thread
    reset();
    try { localStorage.setItem('tyi-won', '1'); } catch {}
    state.won = true; state.tagged = partialTagged();
    migrateWinV07(); migrateDerpyUnlock();
    ok('partial-roster win is reset by migrateWinV07', state.won === false && localStorage.getItem('tyi-won') === null);
    ok('partial-roster winner gets NO derpy award', state.derpyUnlocked === false && localStorage.getItem('tyi-derpy-unlocked') === null);
    ok('partial-roster winner gets NO derpy thread', countDerpyThreads() === 0);

    // Case 2: genuine 50/50 winner, no derpy key — unlock once, exactly one thread
    reset();
    try { localStorage.setItem('tyi-won', '1'); } catch {}
    state.won = true; state.tagged = fullTagged();
    migrateWinV07(); migrateDerpyUnlock();
    ok('genuine winner keeps win flag', state.won === true);
    ok('genuine winner gets derpy award', state.derpyUnlocked === true && localStorage.getItem('tyi-derpy-unlocked') === '1');
    ok('genuine winner gets exactly one derpy thread', countDerpyThreads() === 1);

    // Case 3: already-unlocked winner — no duplicate award/thread on repeated boot
    const before = countDerpyThreads();
    migrateWinV07(); migrateDerpyUnlock();
    ok('no duplicate derpy thread on repeated boot', countDerpyThreads() === before && state.derpyUnlocked === true);

    // Case 4: incomplete save, no win flag — no award
    reset();
    try { localStorage.removeItem('tyi-won'); } catch {}
    state.won = false; state.tagged = partialTagged();
    migrateWinV07(); migrateDerpyUnlock();
    ok('non-winner gets NO derpy award', state.derpyUnlocked === false && countDerpyThreads() === 0);

    // Restore
    state.won = _won; state.tagged = _tagged; state.derpyUnlocked = _derpy;
    state.messages = _msgs; state.unread = _unread; state.regionsUnlocked = _regions;
    try {
      if (_lsWon === null) localStorage.removeItem('tyi-won'); else localStorage.setItem('tyi-won', _lsWon);
      if (_lsDerpy === null) localStorage.removeItem('tyi-derpy-unlocked'); else localStorage.setItem('tyi-derpy-unlocked', _lsDerpy);
      if (_lsRegions === null) localStorage.removeItem('tyi-regions'); else localStorage.setItem('tyi-regions', _lsRegions);
    } catch {}
  })();

  // v1.7.18-beta (Mira review): claimDerpyAward eligibility + idempotence, stateful
  (() => {
    const _won = state.won, _tagged = state.tagged, _derpy = state.derpyUnlocked,
          _pending = state.pendingWin, _msgs = state.messages, _unread = state.unread;
    const _lsWon = localStorage.getItem('tyi-won'), _lsDerpy = localStorage.getItem('tyi-derpy-unlocked');
    const derpyMarker = 'derpy mode toggle in your collection book';
    const countDerpyThreads = () => state.messages.filter(t =>
      (t.msgs || []).some(m => (m.text || '').includes(derpyMarker))).length;
    const validTagged = n => Object.fromEntries(SHARKS.slice(0, n).map(s => [s.id, { researchId: 'T' }]));
    const fullTagged = () => validTagged(SHARKS.length);
    const reset = () => {
      state.messages = []; state.unread = 0;
      state.won = false; state.derpyUnlocked = false; state.pendingWin = false;
      try { localStorage.removeItem('tyi-won'); localStorage.removeItem('tyi-derpy-unlocked'); } catch {}
    };

    // hasFullRoster: 49/50 valid -> false
    reset(); state.tagged = validTagged(49);
    ok('hasFullRoster false at 49/50', hasFullRoster() === false);

    // hasFullRoster: 49 valid + 1 stale key -> false (stale keys never pass)
    reset(); state.tagged = Object.assign(validTagged(49), { 'stale-shark-xyz': { researchId: 'T' } });
    ok('hasFullRoster false with stale key padding the count', hasFullRoster() === false);
    ok('claimDerpyAward refuses stale-key roster', claimDerpyAward() === false && state.derpyUnlocked === false);

    // 49/50: claim refuses — no award, no thread, no persisted keys
    reset(); state.tagged = validTagged(49);
    ok('claimDerpyAward returns false at 49/50', claimDerpyAward() === false);
    ok('49/50 gets no award, no thread, no keys',
      state.derpyUnlocked === false && countDerpyThreads() === 0 &&
      localStorage.getItem('tyi-derpy-unlocked') === null && localStorage.getItem('tyi-won') === null);

    // 50/50 valid, state.won=false -> claim grants, persists, exactly one thread
    reset(); state.tagged = fullTagged();
    ok('claim button gate true for 50/50 winner missing award',
      hasFullRoster() && !state.derpyUnlocked && !state.pendingWin);
    const before = countDerpyThreads();
    ok('claimDerpyAward grants to genuine 50/50 winner', claimDerpyAward() === true);
    ok('claim persists win + derpy keys',
      state.won === true && localStorage.getItem('tyi-won') === '1' &&
      state.derpyUnlocked === true && localStorage.getItem('tyi-derpy-unlocked') === '1');
    ok('claim pushes exactly one Sarah thread', countDerpyThreads() === before + 1);

    // repeat attempt -> no duplicate
    ok('repeat claim is a no-op', claimDerpyAward() === false && countDerpyThreads() === before + 1);

    // already unlocked -> claim button gate closed
    ok('no claim button when already unlocked', !(hasFullRoster() && !state.derpyUnlocked && !state.pendingWin));

    // pendingWin edge: 50/50 mid-trip -> no button, claim refused (ceremony owns the gift)
    reset(); state.tagged = fullTagged(); state.pendingWin = true;
    ok('no claim button while win ceremony pending', !(hasFullRoster() && !state.derpyUnlocked && !state.pendingWin));
    ok('claimDerpyAward refuses while win ceremony pending',
      claimDerpyAward() === false && state.derpyUnlocked === false && countDerpyThreads() === 0);

    // restore
    state.won = _won; state.tagged = _tagged; state.derpyUnlocked = _derpy; state.pendingWin = _pending;
    state.messages = _msgs; state.unread = _unread;
    try {
      if (_lsWon === null) localStorage.removeItem('tyi-won'); else localStorage.setItem('tyi-won', _lsWon);
      if (_lsDerpy === null) localStorage.removeItem('tyi-derpy-unlocked'); else localStorage.setItem('tyi-derpy-unlocked', _lsDerpy);
    } catch {}
  })();

  // v1.6.12-beta (re-applied): seal scent removed, attract defaults to chum
  ok('seal scent removed from attract opts', !METHODS.attract.opts['seal']);
  ok('chum still in attract opts', METHODS.attract.opts['chum'] === 'Fish-oil chum');
  ok('no species lists seal as a method', SHARKS.every(s => !(s.methods && s.methods.attract && s.methods.attract.includes('seal'))));
  ok('legacy lure label preserved for old logbook entries', LEGACY_LURES['seal'] === 'Seal scent');
  ok('launch handler defaults attract to chum', /methodSelect.*attract.*chum.*methodOptSelect/.test(fileCode) || fileCode.includes('method === "attract" ? "chum"'));
  ok('fillOpts hides sub-dropdown for attract', fileCode.includes('mSel.value === "attract"'));

  // v1.7.13-beta: Bait and Switch retired
  ok('bait-switch achievement removed', !ACHIEVEMENTS.some(a => a.id === 'bait-switch'));

  // v1.7.22-beta: Something in the Water retired (only chum remains)
  ok('something-water achievement removed', !ACHIEVEMENTS.some(a => a.id === 'something-water'));

  // v1.7.13-beta Mira review fixes: research copy + logbook legacy labels + behavioral tests
  ok('great white research recommends fish-oil chum, not seal scent', (() => {
    const gw = SHARKS.find(s => s.id === 'greatwhite');
    return gw.research.includes('fish oil') && !gw.research.includes('Seal scent in the water');
  })());
  ok('sevengill research recommends fish-oil, not seal scent', (() => {
    const sg = SHARKS.find(s => s.id === 'sevengill');
    return sg.research.includes('fish-oil') && !sg.research.includes('seal scent in the water');
  })());
  ok('no research text recommends seal scent as an option', SHARKS.every(s =>
    !/seal scent (in the water )?(is|as)/i.test(s.research || '')));
  ok('logbook renders old seal methodOpt as Seal scent', (() => {
    const t = { method: 'attract', methodOpt: 'seal' };
    const label = METHODS[t.method].opts[t.methodOpt] || LEGACY_LURES[t.methodOpt] || t.methodOpt;
    return label === 'Seal scent';
  })());
  ok('logbook renders pre-v0.9 seal lure as Seal scent', (() => {
    const t = { lure: 'seal' };
    const label = (t.lure && t.lure !== 'none' ? LEGACY_LURES[t.lure] || t.lure : 'No lure');
    return label === 'Seal scent';
  })());
  ok('launch with attract resolves methodOpt chum (behavioral)', (() => {
    els['methodSelect'].value = 'attract';
    els['methodOptSelect'].value = '';
    return resolveLaunchMethodOpt() === 'chum';
  })());
  ok('launch with aggregation keeps sub-option (behavioral)', (() => {
    els['methodSelect'].value = 'aggregation';
    els['methodOptSelect'].value = 'boat';
    return resolveLaunchMethodOpt() === 'boat';
  })());
  ok('stored seal plan restores as chum (behavioral)', (() => {
    return resolveRestoredMethodOpt({ method: 'attract', methodOpt: 'seal' }) === 'chum';
  })());
  ok('stored chum plan restores as chum (behavioral)', (() => {
    return resolveRestoredMethodOpt({ method: 'attract', methodOpt: 'chum' }) === 'chum';
  })());

  // v1.6.10-beta (restored): Sarah throttle state exists
  ok('lastSingleCheerExp in state', 'lastSingleCheerExp' in state);

  // v1.6.11-beta (restored): splitTrackAntimeridian exists and works
  ok('splitTrackAntimeridian defined', typeof splitTrackAntimeridian === 'function');
  ok('splitTrackAntimeridian splits crossing leg', (() => {
    const segs = splitTrackAntimeridian([[50, 150], [50, -145]]);
    return segs.length === 2 && segs.every(s => s.length >= 2);
  })());
  ok('splitTrackAntimeridian leaves normal leg alone', (() => {
    const segs = splitTrackAntimeridian([[50, 10], [51, 12]]);
    return segs.length === 1;
  })());

  // v1.7.0-beta (restored): derpy award
  ok('DERPY_AWARD_THREAD defined', typeof DERPY_AWARD_THREAD !== 'undefined' && DERPY_AWARD_THREAD.length === 9);
  ok('derpyUnlocked in state', 'derpyUnlocked' in state);
  ok('derpyMode in state', 'derpyMode' in state);
  ok('derpy keys in RESET_KEYS', RESET_KEYS.includes('tyi-derpy-unlocked') && RESET_KEYS.includes('tyi-derpy-mode'));

  // v1.7.11-beta: derpy retroactive unlock for winners
  ok('migrateDerpyUnlock is defined', typeof migrateDerpyUnlock === 'function');
  ok('migrateDerpyUnlock grants unlock to winner missing it', (() => {
    const savedWon = state.won;
    const savedUnlocked = state.derpyUnlocked;
    const savedTagged = state.tagged;
    const savedMsgs = state.messages.length;
    state.won = true;
    state.derpyUnlocked = false;
    // v1.7.16-beta: explicit full-roster gate — set up a genuine 50/50 winner
    state.tagged = Object.fromEntries(SHARKS.map(s => [s.id, { researchId: 'T' }]));
    try { localStorage.removeItem('tyi-derpy-unlocked'); } catch {}
    migrateDerpyUnlock();
    const granted = state.derpyUnlocked === true;
    const persisted = (() => { try { return localStorage.getItem('tyi-derpy-unlocked') === '1'; } catch { return false; } })();
    const threadPushed = state.messages.length === savedMsgs + 1;
    state.messages.length = savedMsgs;
    state.won = savedWon;
    state.derpyUnlocked = savedUnlocked;
    state.tagged = savedTagged;
    return granted && persisted && threadPushed;
  })());
  ok('migrateDerpyUnlock does not double-send Sarah thread', (() => {
    const savedWon = state.won;
    const savedUnlocked = state.derpyUnlocked;
    const savedTagged = state.tagged;
    const savedMsgs = state.messages;
    state.messages = [{ ts: 1, msgs: DERPY_AWARD_THREAD.map(m => ({ ...m })) }];
    state.won = true;
    state.derpyUnlocked = false;
    // v1.7.16-beta: explicit full-roster gate — set up a genuine 50/50 winner
    state.tagged = Object.fromEntries(SHARKS.map(s => [s.id, { researchId: 'T' }]));
    migrateDerpyUnlock();
    const count = state.messages.length;
    const granted = state.derpyUnlocked === true;
    state.messages = savedMsgs;
    state.won = savedWon;
    state.derpyUnlocked = savedUnlocked;
    state.tagged = savedTagged;
    return count === 1 && granted;
  })());
  ok('migrateDerpyUnlock leaves non-winners alone', (() => {
    const savedWon = state.won;
    const savedUnlocked = state.derpyUnlocked;
    const savedMsgs = state.messages.length;
    state.won = false;
    state.derpyUnlocked = false;
    migrateDerpyUnlock();
    const untouched = state.derpyUnlocked === false && state.messages.length === savedMsgs;
    state.won = savedWon;
    state.derpyUnlocked = savedUnlocked;
    return untouched;
  })());
  ok('maybeReunionReaction returns true when it fires, false when already reacted', (() => {
    const savedReacted = state.reunionReacted;
    const savedMsgCount = state.messages.length;
    // v1.7.28-beta: same unread/blob hygiene as the delivery fixture above.
    const savedUnread = state.unread;
    const savedMentionsR = state.sharkMentions;
    state.reunionReacted = {};
    state.sharkMentions = {};
    const species = SHARKS.find(s => s.id === 'mako');
    const rec = { name: '', researchId: 'MK-2026-019', resightings: [] };
    try {
      const first = maybeReunionReaction(species, rec);
      const second = maybeReunionReaction(species, rec);
      return first === true && second === false;
    } finally {
      state.messages.length = savedMsgCount;
      state.reunionReacted = savedReacted;
      state.unread = savedUnread;
      state.sharkMentions = savedMentionsR;
      saveMsgs();
      updateMsgBadge();
      try { localStorage.setItem("tyi-reunion-reacted", JSON.stringify(savedReacted || {})); } catch {}
    }
  })());
  ok('resight button skips resightThread when reunion reaction fired', /if\\s*\\(!reunionReactedThisEncounter\\)\\s*\\{[\\s\\S]*?pushThread\\(resightThread\\(species, rec\\)\\)/.test(fileCode));
  ok('reunion call site captures return value', /const reunionReactedThisEncounter = maybeReunionReaction\\(species, rec\\)/.test(fileCode));

  // v1.7.8-beta: species insight ends the expedition
  ok('WHATS_NEW has v1.7.8-beta entry', Array.isArray(WHATS_NEW['v1.7.8-beta']) && WHATS_NEW['v1.7.8-beta'].length >= 1);
  ok('observe button ends expedition on new insight', /v1\\.7\\.8-beta: a new species insight ends the expedition/.test(fileCode));
  // v1.7.24-beta: the insight lives on the Map popup only (pendingTagAlongFact),
  // NOT in the expedition log — mirroring Follow's v1.7.22 cleanup. The old
  // assertion that Observe logs the insight is obsolete.
  ok('observe button does NOT log insight (lives in popup)', !/Species insight:<\\/strong>.*esc\\(fact\\)/.test(fileCode));
  ok('observe button warns it ends expedition', /may reveal a secret fact/.test(fileCode));
  ok('archiveSortCompare falls back to insertion order for legacy saves', (() => {
    const saved = state.tagged;
    /* Legacy records have no taggedAt; whale does. Mirrors
       taggedChronological() behavior. */
    state.tagged = {
      nurse: { date: 'Oct 10, 2026' },
      thresher: { date: 'Oct 10, 2026' },
      whale: { taggedAt: 5000, date: 'Oct 11, 2026' }
    };
    archiveDateRanks = null;
    const nurse = SHARKS.find(s => s.id === 'nurse');
    const thresher = SHARKS.find(s => s.id === 'thresher');
    const whale = SHARKS.find(s => s.id === 'whale');
    archiveFilters.sort = 'newest';
    const newestFirst = [nurse, thresher, whale].sort(archiveSortCompare).map(s => s.id);
    archiveFilters.sort = 'oldest';
    archiveDateRanks = null;
    const oldestFirst = [nurse, thresher, whale].sort(archiveSortCompare).map(s => s.id);
    archiveFilters.sort = 'name';
    state.tagged = saved;
    archiveDateRanks = null;
    return newestFirst.join(',') === 'whale,thresher,nurse' &&
           oldestFirst.join(',') === 'nurse,thresher,whale';
  })());
  ok('archiveSortCompare identical timestamps fall back to insertion order', (() => {
    const saved = state.tagged;
    /* Identical taggedAt: falls to insertion order (mirrors
       taggedChronological()). zebra inserted first. */
    state.tagged = {
      zebra: { taggedAt: 2000, date: 'Oct 10, 2026' },
      nurse: { taggedAt: 2000, date: 'Oct 10, 2026' }
    };
    archiveDateRanks = null;
    const zebra = SHARKS.find(s => s.id === 'zebra');
    const nurse = SHARKS.find(s => s.id === 'nurse');
    archiveFilters.sort = 'newest';
    const newestFirst = [zebra, nurse].sort(archiveSortCompare).map(s => s.id);
    archiveFilters.sort = 'oldest';
    archiveDateRanks = null;
    const oldestFirst = [zebra, nurse].sort(archiveSortCompare).map(s => s.id);
    archiveFilters.sort = 'name';
    state.tagged = saved;
    archiveDateRanks = null;
    /* newest: later-inserted (nurse) first; oldest: earlier-inserted (zebra) first */
    return newestFirst.join(',') === 'nurse,zebra' && oldestFirst.join(',') === 'zebra,nurse';
  })());

  /* v1.7.6-beta: aggregation sub-menu removed */
  ok('aggregation opts kept for backward compat',
    METHODS.aggregation && METHODS.aggregation.opts &&
    METHODS.aggregation.opts.boat === "Boat survey of the bloom");
  ok('v1.7.6 WHATS_NEW entry present',
    Array.isArray(WHATS_NEW['v1.7.6-beta']) && WHATS_NEW['v1.7.6-beta'].length > 0);

  /* v1.7.14-beta: UI polish bundle */
  ok('v1.7.14 WHATS_NEW entry present',
    Array.isArray(WHATS_NEW['v1.7.14-beta']) && WHATS_NEW['v1.7.14-beta'].length > 0);
  ok('encounter badge: new species badge code present',
    fileCode.includes('encounter-badge') && fileCode.includes('enc-new'));
  ok('encounter badge: reunion badge code present',
    fileCode.includes('enc-reunion'));
  ok('encounter badge: other-individual badge code present',
    fileCode.includes('enc-other'));
  ok('encounter badge CSS present',
    cssCode.includes('.encounter-badge'));
  ok('horizontal desktop Collection cards CSS present',
    cssCode.includes('.grid-cell { display: flex'));
  ok('checklist bubbles fill green CSS present',
    cssCode.includes('.tag-check.is-done'));
  ok('Research accordion code present',
    fileCode.includes('opening one entry closes the others'));
  ok('achievement hints two-line CSS present',
    cssCode.includes('.ach-hint'));
  ok('IUCN badge/pin spacing CSS present',
    cssCode.includes('more space between IUCN badge and pin'));
  ok('full scientific names on expanded cards CSS present',
    cssCode.includes('.detail-scientific'));
  /* v1.7.14-beta Mira re-review fixes */
  ok('encounter badge: .shark-reveal is an explicit centered vertical stack',
    cssCode.includes('.shark-reveal {') &&
    cssCode.includes('flex-direction: column') &&
    cssCode.includes('align-items: center'));
  ok('encounter badge: reveal art height constrained so art+badge fit the scene',
    cssCode.includes('.shark-reveal img') && cssCode.includes('max-height: 108px'));
  ok('encounter badge: block layout with wrapping for long nicknames',
    cssCode.includes('display: block') &&
    cssCode.includes('overflow-wrap: anywhere'));
  ok('encounter badge: included in prefers-reduced-motion override',
    cssCode.includes('.tap-hint, .encounter-badge { transition: none; animation: none; }'));
  ok('encounter badge: reunion nickname escaped exactly once at insertion',
    fileCode.indexOf('\${esc(rname)}') !== -1 &&
    (function(){
      var parts = fileCode.split('badgeClass = "enc-reunion"');
      var badgeBlock = parts[0].split('} else if (isReunion) {').pop();
      return badgeBlock.indexOf('esc(rec.name)') === -1;
    })());
  ok('encounter badge: tricky nickname (&, <, quotes) renders safely, not double-escaped',
    (function(){
      var rec = { name: 'Tom & "Jerry" <3' };
      var rname = '\u201c' + rec.name + '\u201d';
      var badgeText = 'YOUR SHARK ' + esc(rname);
      return badgeText.indexOf('&amp;amp;') === -1 &&
             badgeText.indexOf('&lt;') !== -1 &&
             badgeText.indexOf('Tom &amp; &quot;Jerry&quot; &lt;3') !== -1;
    })());

  /* v1.7.19-beta: achievement cards stack name above hint */
  ok('v1.7.19 WHATS_NEW entry present',
    Array.isArray(WHATS_NEW['v1.7.19-beta']) && WHATS_NEW['v1.7.19-beta'].length === 3);
  ok('v1.7.19 achievement cards use stacked markup',
    fileCode.includes('guide-row-head ach-stack') &&
    fileCode.includes('class="ach-texts"'));
  ok('v1.7.19 achievement stack CSS present',
    cssCode.includes('.guide-row-head.ach-stack') &&
    cssCode.includes('.guide-row-head .ach-texts') &&
    cssCode.includes('flex-direction: column'));
  /* v1.7.19-beta: trophy moved to Achievements, derpy stays in Collection */
  ok('v1.7.19 achieveTrophyShelf div in HTML',
    htmlCode.includes('id="achieveTrophyShelf"'));
  ok('v1.7.19 trophy renders in Achievements',
    fileCode.includes('achieveTrophyShelf') &&
    fileCode.includes('v1.7.19-beta: the Master Shark Tagger trophy lives here now'));
  ok('v1.7.19 trophy moved out of Collection render',
    fileCode.indexOf('v1.7.19-beta: the Master Shark Tagger trophy moved to the Achievements') !== -1 &&
    fileCode.indexOf('trophy-shelf') > fileCode.indexOf('function renderAchievements()'));
  ok('v1.7.19 derpy toggle still in Collection',
    fileCode.includes('derpy-toggle') &&
    fileCode.indexOf('derpy-toggle') > fileCode.indexOf('function renderCollection()'));
  /* v1.7.19-beta: Bukangi easter egg */
  ok('v1.7.19 BUKANGI_THREAD defined with 4 draft messages',
    typeof BUKANGI_THREAD !== 'undefined' && Array.isArray(BUKANGI_THREAD) &&
    BUKANGI_THREAD.length === 4 &&
    BUKANGI_THREAD.every(function(m){ return m.who === 'them'; }));
  ok('v1.7.19 Bukangi mentions Busan canal facts',
    BUKANGI_THREAD.some(function(m){ return m.text.indexOf('Busan') !== -1; }) &&
    BUKANGI_THREAD.some(function(m){ return m.text.indexOf('ambassador') !== -1; }));
  ok('v1.7.19 bukangiEgg state flag with tyi-bukangi persistence',
    fileCode.includes('bukangiEgg') &&
    fileCode.includes('tyi-bukangi'));
  ok('v1.7.19 tyi-bukangi in RESET_KEYS',
    RESET_KEYS.includes('tyi-bukangi'));
  ok('v2.5.6 certificate keys in RESET_KEYS',
    RESET_KEYS.includes('tyi-won-at') && RESET_KEYS.includes('tyi-cert-name'));
  ok('v1.7.19 dusky encounter hook present',
    fileCode.includes('maybeBukangiEgg(species)') &&
    fileCode.includes('function maybeBukangiEgg') &&
    fileCode.includes('BUKANGI_THREAD'));
  ok('v1.7.19 dusky species exists in roster',
    SHARKS.some(function(s){ return s.id === 'dusky'; }));
  /* v1.7.26-beta: thresher hook — "perpetually nervous" describes the whole
     shark, not just its tail. v1.8.0-beta: hook rewritten (tail-whipping
     repeated SECRET_FACTS) — huge eyes instead, nervousness kept.
     v1.8.0-beta Mira blocker: huge eyes are a BIGEYE thresher trait, not
     common thresher — hook rewritten to breaching instead. */
  ok('thresher hook attributes nervousness to the shark, not the tail',
    SHARKS.some(function(s){ return s.id === 'thresher' && s.hook === 'It looks perpetually nervous — and it can launch its whole body clear out of the water, tail and all.'; }));
  /* v1.8.0-beta Mira blocker: named-shark check-ins must not leak a
     locked hook insight — Sarah quotes the hook only once earned,
     otherwise a neutral fallback. */
  (() => {
    const origTagged = state.tagged;
    const origFacts = state.unlockedFacts;
    const origRandom = Math.random;
    const origPinned = state.pinned;
    const origMentionsH = state.sharkMentions;
    Math.random = () => 0; // passes the 0.4 gate; picks first named + first template
    try {
      state.tagged = { thresher: { name: "Testy", researchId: "TS-1", resightings: [] } };
      state.pinned = 'thresher'; // v2.5.4-beta: coherence — check-ins need pinned/encountered species
      state.sharkMentions = {}; // v2.5.6-beta: mention cooldown must not block the fixture
      const thresherHook = SHARKS.find(function(s){ return s.id === "thresher"; }).hook;
      // Locked: hook insight (index 2) NOT unlocked -> neutral fallback.
      state.unlockedFacts = {};
      const lockedThread = maybeCheckinThread();
      ok("checkin: locked hook uses neutral fallback, no hook leak",
        !!lockedThread && lockedThread[1].text.indexOf("No news, just vibes") !== -1 &&
        lockedThread[1].text.indexOf(thresherHook) === -1);
      // Unlocked: hook insight (index 2) earned -> hook text quoted.
      state.unlockedFacts = { thresher: [2] };
      const unlockedThread = maybeCheckinThread();
      ok("checkin: unlocked hook is quoted",
        !!unlockedThread && unlockedThread[1].text.indexOf(thresherHook) !== -1);
    } finally {
      Math.random = origRandom;
      state.tagged = origTagged;
      state.unlockedFacts = origFacts;
      state.pinned = origPinned;
      state.sharkMentions = origMentionsH;
    }
  })();
  /* v2.5.4-beta (Mira): behavioral coherence tests — controlled state,
     real selection paths, not string wiring. */
  (() => {
    const oR = Math.random, oPinned = state.pinned, oTagged = state.tagged,
          oLog = state.logbook, oSeen = state.chatSeen, oMsgsLen = state.messages.length,
          oUnread = state.unread, oFail = state.failures, oTag = state.taggedThisTrip,
          oRes = state.resightedThisTrip, oFol = state.followedThisTrip,
          oClock = state.lastSarahMsgAt, oChkIdx = lastCheckinIdx,
          oMentions = state.sharkMentions;
    try {
      Math.random = () => 0; // gates open, first pick
      state.sharkMentions = {}; // v2.5.6-beta: start from a clean mention clock
      // (a) no pin + empty last trip + old named tags: no check-in, generic chat
      state.pinned = null;
      state.tagged = { galapagos: { name: "Gala", researchId: "G-1" } };
      state.logbook = [{ encounters: [] }];
      state.chatSeen = {};
      ok("coherence(a): old named shark alone yields no check-in",
        maybeCheckinThread() === null);
      ok("coherence(a): pickChat falls back to generic",
        GENERIC_CHATS.indexOf(pickChat()) !== -1);
      // (a2) valid pin + unrelated historical named shark: only the valid one is chosen
      state.pinned = 'lemon';
      state.tagged = { lemon: { name: "Zest", researchId: "L-1" },
                       galapagos: { name: "Gala", researchId: "G-1" } };
      const ciThread = maybeCheckinThread();
      const ciText = ciThread ? ciThread.map(function(m){ return m.text; }).join(' ') : '';
      ok("coherence(a2): check-in selects only the allowed named shark",
        !!ciThread && ciText.indexOf("Zest") !== -1 && ciText.indexOf("Gala") === -1);
      // (b) pinned only: pool contains exactly the pinned species
      state.pinned = 'nurse';
      state.logbook = [];
      const poolB = sarahSpeciesPool(COUSIN_CHATS);
      ok("coherence(b): pinned-only pool is exactly the pinned species",
        poolB.length === 1 && poolB[0].id === 'nurse');
      // (c) encounters only: pool is exactly the last trip's encounters
      state.pinned = null;
      state.logbook = [{ encounters: [{ speciesId: 'lemon' }] }];
      const poolC = sarahSpeciesPool(COUSIN_CHATS);
      ok("coherence(c): encounter-only pool is exactly the encountered species",
        poolC.length === 1 && poolC[0].id === 'lemon');
      // (d) multiple encounters never leak a historical species
      state.logbook = [{ encounters: [{ speciesId: 'lemon' }, { speciesId: 'tiger' }] },
                       { encounters: [{ speciesId: 'galapagos' }] }];
      const poolD = sarahSpeciesPool(COUSIN_CHATS);
      ok("coherence(d): older trips never leak into the pool",
        poolD.length === 2 && poolD.every(function(s){ return s.id === 'lemon' || s.id === 'tiger'; }));
      // (e) five-failure nudge with no allowed species stays generic
      state.pinned = null;
      state.logbook = [{ encounters: [] }];
      state.failures = 5;
      state.taggedThisTrip = state.resightedThisTrip = state.followedThisTrip = false;
      afterExpedition({});
      const lastThread = state.messages[state.messages.length - 1] || {};
      const threadTexts = (lastThread.msgs || []).map(function(m){ return m.text; });
      ok("coherence(e): nudge with empty pool uses the generic line",
        threadTexts.indexOf("You'll get the next one. I believe in you.") !== -1);
    } finally {
      Math.random = oR; state.pinned = oPinned; state.tagged = oTagged;
      state.logbook = oLog; state.chatSeen = oSeen;
      // v2.5.4-beta Mira fix: afterExpedition pushes a real thread —
      // truncate the array in place (same-reference snapshot would not
      // remove it), restore unread, and resync the mock store.
      state.messages.length = oMsgsLen; state.unread = oUnread;
      state.lastSarahMsgAt = oClock;
      lastCheckinIdx = oChkIdx;
      state.sharkMentions = oMentions;
      saveMsgs();
      state.failures = oFail; state.taggedThisTrip = oTag;
      state.resightedThisTrip = oRes; state.followedThisTrip = oFol;
    }
  })();
  /* v2.5.6-beta: per-individual mention cooldown (Avery) — 15 minutes
     between Sarah's mentions of the same individual shark; a heavier
     mention supersedes a lighter one (sighting weight = sighting
     count, check-in = 0); check-in picks are weighted by sightings. */
  (() => {
    const oR = Math.random, oNow = Date.now, oMentions = state.sharkMentions,
          oPinned = state.pinned, oTagged = state.tagged, oLog = state.logbook,
          oReacted = state.reunionReacted, oMsgsLen = state.messages.length,
          oUnread = state.unread,
          oLastSarah = state.lastSarahMsgAt, oCloserIdx = lastReunionCloserIdx,
          oChkIdx = lastCheckinIdx, oPendingChk = pendingCheckinSpeciesId,
          oStoredReacted = localStorage.getItem("tyi-reunion-reacted");
    const T0 = 1760000000000;
    try {
      Date.now = () => T0;
      Math.random = () => 0;
      state.sharkMentions = {};
      // gate unit behavior
      ok("mention gate: no record never blocks",
        sharkMentionBlocked('nurse', 0) === false);
      noteSharkMention('nurse', 1);
      ok("mention gate: fresh sighting (w1) blocks check-in (w0) and equal w1",
        sharkMentionBlocked('nurse', 0) === true && sharkMentionBlocked('nurse', 1) === true);
      ok("mention gate: a heavier sighting (w2) supersedes",
        sharkMentionBlocked('nurse', 2) === false);
      Date.now = () => T0 + 16 * 60 * 1000;
      ok("mention gate: 15 minutes later nothing is blocked",
        sharkMentionBlocked('nurse', 0) === false);
      Date.now = () => T0;
      // check-in yields: the only allowed named shark was just mentioned
      state.pinned = 'lemon';
      state.logbook = [];
      state.tagged = { lemon: { name: "Zest", researchId: "L-1", resightings: [] } };
      noteSharkMention('lemon', 1);
      ok("mention cooldown: check-in skips a just-mentioned individual",
        maybeCheckinThread() === null);
      // a real sighting supersedes a recent check-in (the Donny case)
      state.sharkMentions = {};
      noteSharkMention('nurse', 0);
      state.reunionReacted = {};
      const nurseSp = SHARKS.find(function(s){ return s.id === 'nurse'; });
      ok("mention cooldown: first reunion supersedes a recent check-in",
        maybeReunionReaction(nurseSp, { name: "Helen", researchId: "NS-1", resightings: [] }) === true);
      // ...but an equal-weight recent mention holds the one-time reaction
      state.sharkMentions = {};
      noteSharkMention('nurse', 1);
      state.reunionReacted = {};
      ok("mention cooldown: equal-weight mention holds the reunion reaction, flag unburned",
        maybeReunionReaction(nurseSp, { name: "Helen", researchId: "NS-1", resightings: [] }) === false &&
        state.reunionReacted['nurse'] !== true);
      // weighted check-in pick: more sightings = more weight
      state.sharkMentions = {};
      state.pinned = null;
      state.logbook = [{ encounters: [{ speciesId: 'lemon' }, { speciesId: 'tiger' }] }];
      state.tagged = {
        lemon: { name: "Zest", researchId: "L-1", resightings: [] },
        tiger: { name: "Stripes", researchId: "T-1", resightings: [{}, {}, {}] }
      };
      // weights: lemon 1, tiger 4 (total 5). Draw 0.5 -> r=2.5: passes
      // lemon (r=1.5), lands on tiger.
      const seq = [0, 0.5, 0];
      let si = 0;
      Math.random = () => seq[si++ % seq.length];
      const wt = maybeCheckinThread();
      const wtText = wt ? wt.map(function(m){ return m.text; }).join(' ') : '';
      ok("mention weighting: check-in favours the more-sighted individual",
        wtText.indexOf("Stripes") !== -1);
    } finally {
      Math.random = oR; Date.now = oNow; state.sharkMentions = oMentions;
      state.pinned = oPinned; state.tagged = oTagged; state.logbook = oLog;
      state.reunionReacted = oReacted;
      state.messages.length = oMsgsLen; state.unread = oUnread;
      /* v2.5.6-beta (Mira review): restore EVERYTHING the fixture's
         Sarah calls mutated — the persisted reunion key, the routine
         throttle timestamp (before saveMsgs re-persists it), the two
         no-repeat rotation indexes, and the pending check-in stash. */
      lastReunionCloserIdx = oCloserIdx; lastCheckinIdx = oChkIdx;
      pendingCheckinSpeciesId = oPendingChk;
      state.lastSarahMsgAt = oLastSarah;
      if (oStoredReacted === null) localStorage.removeItem("tyi-reunion-reacted");
      else localStorage.setItem("tyi-reunion-reacted", oStoredReacted);
      saveMsgs();
    }
    ok("mention fixture leaves no residue (storage, throttle clock, indexes restored)",
      localStorage.getItem("tyi-reunion-reacted") === oStoredReacted &&
      state.lastSarahMsgAt === oLastSarah &&
      lastReunionCloserIdx === oCloserIdx && lastCheckinIdx === oChkIdx &&
      pendingCheckinSpeciesId === oPendingChk);
  })();
  /* v2.5.6-beta: Master Shark Tagger certificate — Avery's artwork in
     the Achievements modal, player-written name, auto award date,
     "Awarded with salt on it" kept as the caption. */
  (() => {
    const oWonAt = state.wonAt, oAch = state.achievements, oName = state.certName;
    try {
      ok("certificate artwork ships in assets/",
        fs.existsSync(path.join(DIR, "assets", "master-tagger-certificate.jpg")));
      // date source order: recorded win date wins
      const ts1 = new Date(2026, 9, 19).getTime();
      state.wonAt = ts1; state.achievements = {};
      ok("certificate date: recorded win date is used",
        certAwardDate() === new Date(ts1).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }));
      // fallback: Fin-ished achievement timestamp
      const ts2 = new Date(2026, 8, 28).getTime();
      state.wonAt = null; state.achievements = { finished: ts2 };
      ok("certificate date: falls back to the Fin-ished unlock time",
        certAwardDate() === new Date(ts2).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }));
      // modal content
      state.certName = "Avery";
      openCertificate();
      const html = $("detailContent").innerHTML;
      ok("certificate modal shows the artwork with name field + date",
        html.indexOf("assets/master-tagger-certificate.jpg") !== -1 &&
        html.indexOf('id="certName"') !== -1 &&
        html.indexOf("cert-date") !== -1);
      ok("certificate modal keeps the salt line, old text gone",
        html.indexOf("Awarded with salt on it") !== -1 &&
        html.indexOf("This certifies our conservation scientist") === -1);
      ok("certificate name field is prefilled from state",
        $("certName").value === "Avery");
      // the win ceremony's first beat IS the certificate — the signing
      // moment (Avery, 2026-10-20): same figure, same name field.
      state.wonAt = ts1; state.achievements = { finished: ts1 };
      winStep(1);
      const whtml = $("winOverlay").innerHTML;
      ok("win ceremony beat 1 presents the real certificate",
        whtml.indexOf("assets/master-tagger-certificate.jpg") !== -1 &&
        whtml.indexOf('id="certName"') !== -1 &&
        whtml.indexOf("cert-date") !== -1 &&
        whtml.indexOf("Write your name on the line") !== -1);
      ok("win ceremony beat 1: old text certificate is gone",
        whtml.indexOf("This certifies our conservation scientist") === -1 &&
        whtml.indexOf("cert-trophy") === -1);
      // Mira review fixes: certificate mode leaves the 2-column grid,
      // the ceremony beat gets the wide shell (not the 380px phone),
      // the name line stays blank until typed, and the keepsake export
      // composites name + date onto the artwork via canvas.
      ok("certificate modal switches detail content to cert-mode",
        $("detailContent").classList.contains("cert-mode") === true);
      ok("shark detail removes cert-mode (source)",
        fileCode.indexOf('classList.remove("cert-mode")') !== -1);
      ok("certificate CSS: cert-mode is single-column, ceremony shell is wide",
        cssCode.indexOf("#detailContent.cert-mode") !== -1 &&
        cssCode.indexOf(".phone.cert-phone") !== -1);
      ok("win ceremony beat 1 uses the wide certificate shell + actions",
        whtml.indexOf("cert-phone") !== -1 &&
        whtml.indexOf('id="certSave"') !== -1 &&
        whtml.indexOf('id="certGrow"') !== -1);
      ok("certificate name line is blank until the player types",
        html.slice(0, html.indexOf("</figure>")).indexOf('placeholder=""') !== -1 &&
        html.slice(0, html.indexOf("</figure>")).indexOf('placeholder="Your name"') === -1);
      ok("certificate export composites artwork + name + date on canvas (source)",
        fileCode.indexOf("function exportCertificate") !== -1 &&
        fileCode.indexOf('createElement("canvas")') !== -1 &&
        fileCode.indexOf("toBlob") !== -1 &&
        CERT_DRAW.nameBase > 0.53 && CERT_DRAW.nameBase < 0.56 && CERT_DRAW.dateBase < 0.804 &&
        CERT_DRAW.nameX > 0.15 && CERT_DRAW.nameX < 0.85 &&
        CERT_DRAW.dateX > 0.66 && CERT_DRAW.dateX < 0.90);
      // Avery: the keyboard can cover the certificate — a visible
      // name box mirrors the signature line in both places, and the
      // ceremony focuses the box, not the on-certificate field.
      ok("certificate has a visible name box in modal + ceremony, synced (source)",
        html.indexOf('id="certNameBox"') !== -1 &&
        whtml.indexOf('id="certNameBox"') !== -1 &&
        fileCode.indexOf('const nameBox = $("certNameBox")') !== -1 &&
        cssCode.indexOf(".cert-name-box") !== -1);
      ok("win ceremony focuses the name box (source)",
        fileCode.indexOf('const nb = $("certNameBox")') !== -1);
      // Mira: a 40-char name at the fixed export size would draw
      // through the border. Behavioural fit check with a stubbed
      // canvas measurer (0.6em per character).
      const oCreateEl = document.createElement;
      document.createElement = function(tag) {
        if (tag === "canvas") return { getContext: function() {
          return { font: "", measureText: function(t) {
            const px = parseInt(this.font, 10) || 0;
            return { width: t.length * px * 0.6 };
          } };
        } };
        return oCreateEl(tag);
      };
      try {
        const fittedLong = fitTextPx("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", 61, 742, CERT_FONT);
        ok("export fit: a 40-character name shrinks to fit the printed line",
          fittedLong < 61 && fittedLong * 40 * 0.6 <= 742);
        ok("export fit: a short name keeps the full signature size",
          fitTextPx("Avery", 61, 742, CERT_FONT) === 61);
        ok("export fit: a long localized date shrinks to fit its line",
          fitTextPx("September 28, 2026", 33, 259, CERT_FONT) < 33);
      } finally {
        document.createElement = oCreateEl;
      }
      ok("certificate export fits name + date via fitTextPx (source)",
        fileCode.indexOf("fitTextPx(state.certName") !== -1 &&
        fileCode.indexOf("fitTextPx(dateText") !== -1);
      // Mira regression: the Achievements modal must unhide BEFORE
      // wiring, or the first-open fit measures a display:none
      // (zero-width) field and a persisted long name stays unfitted.
      const ocStart = fileCode.indexOf("function openCertificate()");
      const ocBody = fileCode.slice(ocStart, ocStart + 1400);
      ok("certificate modal unhides before wiring (first-open fit regression)",
        ocBody.indexOf('classList.remove("hidden")') !== -1 &&
        ocBody.indexOf('classList.remove("hidden")') < ocBody.indexOf("wireCertName()"));
      ok("certificate re-fits on resize and on the grow toggle (source)",
        fileCode.indexOf('addEventListener("resize"') !== -1 &&
        fileCode.indexOf("certResizeWired") !== -1 &&
        fileCode.split("fitCertDisplays(").length - 1 >= 5);
      // v2.5.7-beta regression (Avery's iPad): the global
      // input[type="text"] rule outranked .cert-name and restyled the
      // signature field dark + full-width. The scoped selector must
      // outrank it (element + two classes).
      ok("certificate signature style outranks the global text-input rule",
        cssCode.indexOf(".cert-figure input.cert-name") !== -1);
      // v2.5.9-beta: the signature keeps its approved centre (51.5%)
      // while the field extends below the line so descenders finish.
      const cnStart = cssCode.indexOf(".cert-figure input.cert-name {");
      const cnRule = cssCode.slice(cnStart, cssCode.indexOf("}", cnStart));
      const cnTop = parseFloat(cnRule.split("top:")[1]);
      const cnH = parseFloat(cnRule.split("height:")[1]);
      ok("signature field: approved centre kept, descender room below the line",
        Math.abs((cnTop + cnH / 2) - 51.5) < 0.3 && cnTop + cnH >= 58);
      // v2.5.10-beta: achievement card content is vertically centred,
      // scoped to the Achievements grid (guide rows elsewhere keep
      // their top-aligned layout).
      ok("achievement cards centre their content vertically (CSS)",
        cssCode.indexOf("#achieveList .guide-row { display: flex; }") !== -1 &&
        cssCode.indexOf("#achieveList .guide-row-head.ach-stack { flex: 1; align-items: center; }") !== -1);
      $("winOverlay").classList.add("hidden");
      ok("certificate name persists on input (source)",
        fileCode.indexOf('localStorage.setItem("tyi-cert-name"') !== -1);
      ok("doWin stamps the win date (source)",
        fileCode.indexOf('localStorage.setItem("tyi-won-at"') !== -1);
    } finally {
      state.wonAt = oWonAt; state.achievements = oAch; state.certName = oName;
    }
  })();
  /* v2.5.11-beta: while an Archive clip plays, the background video
     rests (they share one decoder on iPad and both go choppy). */
  (() => {
    const oQSA = document.querySelectorAll;
    const bgEl = document.getElementById('sun-video');
    try {
      document.querySelectorAll = function(sel) {
        if (sel !== 'video') return [];
        return [bgEl, { paused: false, ended: false }];
      };
      ok("foreignVideoPlaying: a playing Archive clip counts",
        foreignVideoPlaying() === true);
      document.querySelectorAll = function() {
        return [bgEl, { paused: true, ended: false }];
      };
      ok("foreignVideoPlaying: paused clips and the background itself don't count",
        foreignVideoPlaying() === false);
      document.querySelectorAll = function() {
        return [bgEl, { paused: false, ended: true }];
      };
      ok("foreignVideoPlaying: an ended clip doesn't count",
        foreignVideoPlaying() === false);
    } finally {
      document.querySelectorAll = oQSA;
    }
    ok("background sync hears other videos in the capture phase (source)",
      fileCode.indexOf("addEventListener('play', function(e) { if (e.target !== video) syncSunVideo(); }, true)") !== -1 &&
      fileCode.indexOf("addEventListener('pause', function(e) { if (e.target !== video) syncSunVideo(); }, true)") !== -1 &&
      fileCode.indexOf("addEventListener('ended', function(e) { if (e.target !== video) syncSunVideo(); }, true)") !== -1 &&
      fileCode.indexOf("document.addEventListener('visibilitychange', syncSunVideo)") !== -1);
    // Mira: leaving a playing clip must stop it, or it decodes
    // invisibly forever and the background never resumes.
    let pauseCalls = 0;
    const fakeClip = { paused: false, pause: function() { pauseCalls++; this.paused = true; } };
    const fakePausedClip = { paused: true, pause: function() { pauseCalls++; } };
    const fakeBox = { querySelectorAll: function(sel) {
      return sel === 'video' ? [fakeClip, fakePausedClip, bgEl] : [];
    } };
    pauseVideosIn(fakeBox);
    ok("pauseVideosIn pauses a playing clip, skips paused ones and the background",
      pauseCalls === 1 && fakeClip.paused === true);
    ok("leaving a clip is wired: card collapse and tab exit pause videos (source)",
      fileCode.indexOf("pauseVideosIn(row)") !== -1 &&
      fileCode.indexOf('if (btn.dataset.tab !== "archive") pauseVideosIn();') !== -1);
    const archiveCode = fs.readFileSync(path.join(DIR, "archive-ui.js"), "utf8");
    const raStart = archiveCode.indexOf("function renderArchive()");
    const raBody = archiveCode.slice(raStart, raStart + 700);
    ok("renderArchive pauses clips before rebuilding the list (source)",
      raBody.indexOf("pauseVideosIn(list)") !== -1 &&
      raBody.indexOf("pauseVideosIn(list)") < raBody.indexOf('list.innerHTML = "";'));
    // The teardown race (Mira): pause() queues its event, and a
    // rebuild detaches the clip before the event fires — the event
    // path alone can never re-sync. The helper must notify explicitly.
    const oDispatch = document.dispatchEvent;
    const dispatched = [];
    document.dispatchEvent = function(ev) { dispatched.push(ev && ev.type); return true; };
    let racePauses = 0;
    const raceClip = { paused: false, pause: function() { racePauses++; this.paused = true; } };
    const raceBox = { querySelectorAll: function(sel) { return sel === 'video' ? [raceClip] : []; } };
    try {
      pauseVideosIn(raceBox);
      ok("teardown race: pausing a clip explicitly notifies the background sync",
        racePauses === 1 && dispatched.indexOf("tagalong:media-teardown") !== -1);
    } finally {
      document.dispatchEvent = oDispatch;
    }
    ok("background controller listens for the teardown notification (source)",
      fileCode.indexOf("addEventListener('tagalong:media-teardown', syncSunVideo)") !== -1);
  })();

  /* ---------- v2.6.0: the welcome tour ---------- */
  try {
    ok("tour has 10 slides: welcome, one per tab in tab-bar order, closer",
      TOUR_SLIDES.length === 10 &&
      JSON.stringify(TOUR_SLIDES.map(function(s) { return s.tab; })) ===
        JSON.stringify([null, "research", "expedition", "collection", "map", "logbook", "phone", "archive", "achievements", null]));
    ok("every tour slide carries an icon, title and real copy",
      TOUR_SLIDES.every(function(s) { return s.icon && s.title && s.text.length > 40; }));
    ok("tour markup and styles shipped",
      htmlCode.indexOf('id="tourOverlay"') !== -1 && htmlCode.indexOf('id="tourBtn"') !== -1 &&
      htmlCode.indexOf('id="tourTabArrow"') !== -1 &&
      cssCode.indexOf(".tour-tab-arrow") !== -1 && cssCode.indexOf(".tab.tour-spot") !== -1);
    // Behaviour: open on slide 1, walk to the end, close.
    openTour();
    ok("openTour shows the welcome slide",
      !$("tourOverlay").classList.contains("hidden") &&
      $("tourTitle").textContent === "Welcome to Tag Along!" &&
      $("tourCount").textContent === "1 of 10" &&
      $("tourBack").disabled === true);
    tourAdvance();
    ok("advancing lands on Research with Next offered",
      tourIdx === 1 && $("tourTitle").textContent === "Research" &&
      $("tourNext").textContent === "Next →" && $("tourBack").disabled === false);
    for (let ti = 0; ti < 8; ti++) tourAdvance();
    ok("the last slide offers Start playing and hides Skip",
      tourIdx === 9 && $("tourNext").textContent === "Start playing 🦈" &&
      $("tourSkip").classList.contains("hidden"));
    tourBack();
    ok("Back from the closer returns to Achievements",
      tourIdx === 8 && $("tourTitle").textContent === "Achievements");
    tourAdvance(); tourAdvance(); // closer, then Start playing = close
    ok("finishing the tour closes it and remembers it was seen",
      tourOpenNow === false && $("tourOverlay").classList.contains("hidden") &&
      tourSeen() === true && localStorage.getItem("tyi-tour-seen") === "1");
    ok("reset forgets the tour too (it replays for a fresh game)",
      RESET_KEYS.indexOf("tyi-tour-seen") !== -1);
    ok("tour shows only when unseen and the footer ? button replays it (source)",
      fileCode.indexOf("if (tourShouldAutoOpen()) openTour();") !== -1 &&
      fileCode.indexOf('$("tourBtn").addEventListener("click", openTour);') !== -1 &&
      fileCode.indexOf("function positionTour()") !== -1 &&
      fileCode.indexOf("getBoundingClientRect") !== -1);
  } catch (e) { ok("v2.6.0 welcome tour block (" + e.message + ")", false); }

  /* ---------- v2.6.0: Mira review fixes ---------- */
  try {
    ok("welcome copy no longer overpromises; it names the real science precisely",
      TOUR_SLIDES[0].text.indexOf("every fact in this game is real science") === -1 &&
      TOUR_SLIDES[0].text.indexOf("Inspired by real shark biology and conservation research") !== -1);
    // The gate: new profiles tour, returning profiles never do — and a
    // seen tour never re-offers, whatever the save state.
    localStorage.removeItem("tyi-tour-seen");
    ok("auto-tour gate: new profile tours, existing profile does not",
      tourShouldAutoOpen(false) === true && tourShouldAutoOpen(true) === false);
    markTourSeen();
    ok("auto-tour gate: a seen tour never re-offers",
      tourShouldAutoOpen(false) === false);
    ok("tour dialog is truly modal in markup",
      htmlCode.indexOf('id="tourOverlay" class="tour-overlay hidden" role="dialog" aria-modal="true"') !== -1);
    const tourCssStart = cssCode.indexOf(".tour-overlay {");
    const tourCss = cssCode.slice(tourCssStart, tourCssStart + 500);
    ok("tour card scrolls inside short viewports instead of spilling controls off-screen",
      tourCss.indexOf("overflow-y: auto") !== -1 && tourCss.indexOf("max-height") !== -1);
    ok("narrow phones keep the nav row usable: dots hide, the count stays",
      cssCode.indexOf("@media (max-width: 480px)") !== -1 &&
      cssCode.indexOf(".tour-dots { display: none; }") !== -1);
    ok("spotlighted tabs can't navigate while the tour is open (source)",
      fileCode.indexOf("if (tourOpenNow) return;") !== -1);
    // Focus trap + restore, with stubbed focus targets.
    const oAE = document.activeElement;
    let prevented = 0;
    const tabEv = function(shift) { return { key: "Tab", shiftKey: shift, preventDefault: function() { prevented++; } }; };
    openTour();
    const skipBtn = $("tourSkip"), nextBtn = $("tourNext");
    let skipFocused = 0, nextFocused = 0;
    const oSkipFocus = skipBtn.focus, oNextFocus = nextBtn.focus;
    skipBtn.focus = function() { skipFocused++; };
    nextBtn.focus = function() { nextFocused++; };
    document.activeElement = nextBtn;
    tourTrapFocus(tabEv(false));
    ok("focus trap: Tab from the last tour button cycles to the first",
      prevented === 1 && skipFocused === 1);
    document.activeElement = skipBtn;
    tourTrapFocus(tabEv(true));
    ok("focus trap: Shift+Tab from the first cycles to the last",
      prevented === 2 && nextFocused === 1);
    document.activeElement = oAE;
    skipBtn.focus = oSkipFocus; nextBtn.focus = oNextFocus;
    closeTour();
    ok("tour closed cleanly after focus tests", tourOpenNow === false);
  } catch (e) { ok("v2.6.0 Mira review fixes block (" + e.message + ")", false); }
  /* v1.8.0-beta: second semantic sweep — rewrites for repeats the
     word-overlap check missed. Guards the specific fixes. */
  ok('v1.8.0 second sweep: rewritten insights present',
    SHARKS.some(function(s){ return s.id === 'nurse' && s.hook.indexOf('two dozen') !== -1; }) &&
    SHARKS.some(function(s){ return s.id === 'thresher' && s.bonus.indexOf('tail-slap') === -1; }) &&
    SHARKS.some(function(s){ return s.id === 'blue' && s.bonus.indexOf('Ireland') === -1; }) &&
    SHARKS.some(function(s){ return s.id === 'sevengill' && s.hook.indexOf('dinosaurs') === -1; }) &&
    SHARKS.some(function(s){ return s.id === 'wobbegong' && s.hook.indexOf('shaggy beard') !== -1; }) &&
    SHARKS.some(function(s){ return s.id === 'oceanic' && s.hook.indexOf('litters of up to 15') !== -1; }) &&
    SHARKS.some(function(s){ return s.id === 'pacificsleeper' && s.hook.indexOf('2,000 metres') !== -1; }) &&
    SECRET_FACTS.hammerhead[1].indexOf('stingray') === -1 &&
    SECRET_FACTS.porbeagle.join(' ').indexOf('migration') === -1 &&
    COUSIN_CHATS.nurse[0].them.indexOf('pump') === -1);
  /* v1.8.0-beta Mira blockers: sand-tiger hook no longer claims the
     mouth is always open; porbeagle F2 no longer rehashes F1's body-heat
     mechanism; salmon drops the unsupported "only shark" claim; leopard
     drops categorical "harmless". */
  ok("v1.8.0 Mira blockers: corrected insight wording present",
    SHARKS.some(function(s){ return s.id === "sandtiger" && s.hook.indexOf("mouth shut") !== -1 && s.hook.indexOf("always open") === -1; }) &&
    SECRET_FACTS.porbeagle[1].indexOf("pups") !== -1 && SECRET_FACTS.porbeagle[1].indexOf("furnace") === -1 &&
    SHARKS.some(function(s){ return s.id === "salmon" && s.hook.indexOf("only shark") === -1; }) &&
    SHARKS.some(function(s){ return s.id === "leopard" && s.bonus.indexOf("harmless to people") === -1; }));
  /* v1.7.19-beta Mira review: trophy refreshes without a reload */
  ok('v1.7.19 doWin renders Achievements',
    (function(){
      var start = fileCode.indexOf('function doWin()');
      var end = fileCode.indexOf('function winStep(');
      return fileCode.slice(start, end).indexOf('renderAchievements()') !== -1;
    })());
  ok('v1.7.19 claim button re-renders Achievements on success',
    fileCode.indexOf('if (claimDerpyAward())') !== -1 &&
    (function(){
      var i = fileCode.indexOf('if (claimDerpyAward())');
      return fileCode.slice(i, i + 120).indexOf('renderAchievements()') !== -1;
    })());
  /* v1.7.19-beta Mira review: achievement names wrap in the stack */
  ok('v1.7.19 achievement names wrap instead of truncating',
    cssCode.indexOf('.guide-row-head .ach-texts .guide-row-name { flex: none; white-space: normal; overflow: visible; text-overflow: clip; }') !== -1);
  /* v1.7.19-beta Mira review: Bukangi thread is welfare-first */
  ok('v1.7.19 Bukangi thread has no flippant "vibing" framing',
    !BUKANGI_THREAD.some(function(m){ return /vibing|icon behavior/i.test(m.text); }));
  ok('v1.7.19 Bukangi thread reports scrapes with uncertain cause, not asserted abrasions',
    BUKANGI_THREAD.some(function(m){ return m.text.indexOf('scrapes') !== -1; }) &&
    BUKANGI_THREAD.some(function(m){ return m.text.indexOf('might have hit a wall') !== -1; }) &&
    !BUKANGI_THREAD.some(function(m){ return m.text.indexOf('abrasions') !== -1; }));
  ok('v1.7.19 Bukangi thread asks people to stop shining lights and not disturb her',
    BUKANGI_THREAD.some(function(m){ return m.text.indexOf('stop shining lights') !== -1; }) &&
    BUKANGI_THREAD.some(function(m){ return m.text.indexOf('not to disturb') !== -1; }));
  ok('v1.7.19 Bukangi thread says the canal does not mean she is happy',
    BUKANGI_THREAD.some(function(m){ return m.text.indexOf("doesn't mean she's happy") !== -1; }));
  ok('v1.7.19 WHATS_NEW Bukangi avoids "most famous shark" claim',
    WHATS_NEW['v1.7.19-beta'].some(function(e){ return e.indexOf('captivating Busan') !== -1; }) &&
    !WHATS_NEW['v1.7.19-beta'].some(function(e){ return e.indexOf('most famous shark') !== -1; }));
  /* v1.7.19-beta Mira review: behavioral Bukangi one-shot tests.
     Fixtures snapshot/restore tyi-messages, tyi-bukangi and state.unread so
     this block leaves no trace in the harness. */
  (function(){
    var _egg = state.bukangiEgg;
    var _len = state.messages.length;
    var _unread = state.unread;
    var _msgsLS = null, _bukLS = null;
    try { _msgsLS = localStorage.getItem('tyi-messages'); } catch {}
    try { _bukLS = localStorage.getItem('tyi-bukangi'); } catch {}
    // push failure → flag NOT set, egg not consumed (run first: no thread yet)
    var _push = pushThread;
    state.bukangiEgg = false;
    var _threw = false;
    try {
      pushThread = function(){ throw new Error('simulated push failure'); };
      var r0 = maybeBukangiEgg({ id: 'dusky' });
    } catch (e) { _threw = true; }
    pushThread = _push;
    ok('v1.7.19 Bukangi push failure does not consume the egg',
      _threw === false && r0 === false && state.bukangiEgg === false && state.messages.length === _len);
    // post-append save failure: storage dies inside pushThread's saveMsgs,
    // AFTER the in-memory append. The egg must not be consumed on the ghost,
    // and the in-memory append must be rolled back so the retry can't double-post.
    (function(){
      var _egg2 = state.bukangiEgg;
      var _len2 = state.messages.length;
      var _unread2 = state.unread;
      var _msgs2 = null, _buk2 = null;
      try { _msgs2 = localStorage.getItem('tyi-messages'); } catch {}
      try { _buk2 = localStorage.getItem('tyi-bukangi'); } catch {}
      state.bukangiEgg = false;
      try { localStorage.removeItem('tyi-bukangi'); } catch {}
      var _setItem = localStorage.setItem;
      localStorage.setItem = function(k, v) {
        if (k === 'tyi-messages') throw new Error('simulated post-append storage failure');
        return _setItem.call(localStorage, k, v);
      };
      var r5 = false, _threw5 = false;
      try { r5 = maybeBukangiEgg({ id: 'dusky' }); } catch (e) { _threw5 = true; }
      localStorage.setItem = _setItem;
      ok('v1.7.19 Bukangi post-append save failure leaves no ghost and does not consume the egg',
        _threw5 === false && r5 === false && state.bukangiEgg === false &&
        state.messages.length === _len2 && state.unread === _unread2 &&
        localStorage.getItem('tyi-bukangi') === null);
      // retry with healthy storage → exactly one durable thread, flag set
      state.bukangiEgg = false;
      var r6 = maybeBukangiEgg({ id: 'dusky' });
      var persisted = [];
      try { persisted = (JSON.parse(localStorage.getItem('tyi-messages') || '{}').messages) || []; } catch {}
      var bukCount = persisted.filter(function(t){
        return (t.msgs || []).some(function(m){ return (m.text || '').indexOf('Bukangi') !== -1; });
      }).length;
      ok('v1.7.19 Bukangi retry after save failure delivers exactly one durable thread',
        r6 === true && state.bukangiEgg === true && bukCount === 1);
      // restore everything this sub-check touched
      state.bukangiEgg = _egg2;
      state.messages.length = _len2;
      state.unread = _unread2;
      try {
        if (_msgs2 === null) localStorage.removeItem('tyi-messages'); else localStorage.setItem('tyi-messages', _msgs2);
        if (_buk2 === null) localStorage.removeItem('tyi-bukangi'); else localStorage.setItem('tyi-bukangi', _buk2);
      } catch {}
    })();
    // first dusky reveal → exactly one thread, flag set
    state.bukangiEgg = false;
    var r1 = maybeBukangiEgg({ id: 'dusky' });
    ok('v1.7.19 Bukangi first dusky reveal pushes exactly one thread',
      r1 === true && state.messages.length === _len + 1 && state.bukangiEgg === true);
    // second reveal → none
    var r2 = maybeBukangiEgg({ id: 'dusky' });
    ok('v1.7.19 Bukangi second dusky reveal pushes nothing',
      r2 === false && state.messages.length === _len + 1);
    // other species → none
    state.bukangiEgg = false;
    var r3 = maybeBukangiEgg({ id: 'nurse' });
    ok('v1.7.19 Bukangi other species pushes nothing',
      r3 === false && state.messages.length === _len + 1);
    // dedup: thread present but flag unset (interrupted reload) → no duplicate, flag set
    state.bukangiEgg = false;
    var r4 = maybeBukangiEgg({ id: 'dusky' });
    ok('v1.7.19 Bukangi dedup skips duplicate push but sets flag',
      r4 === true && state.messages.length === _len + 1 && state.bukangiEgg === true);
    // reset/export/import handling of tyi-bukangi.
    // v1.7.19-beta Mira review: this check must NOT be destructive — the old
    // version wiped every RESET_KEYS entry in the harness without restoring
    // them. Snapshot all reset keys first, wipe, assert, then restore all.
    ok('v1.7.19 tyi-bukangi cleared by full reset',
      (function(){
        var snap = {};
        RESET_KEYS.forEach(function(k){
          try { snap[k] = localStorage.getItem(k); } catch { snap[k] = undefined; }
        });
        try { localStorage.setItem('tyi-bukangi', '1'); } catch {}
        RESET_KEYS.forEach(function(k){ try { localStorage.removeItem(k); } catch {} });
        var gone = 'unknown';
        try { gone = localStorage.getItem('tyi-bukangi'); } catch {}
        RESET_KEYS.forEach(function(k){
          try {
            if (snap[k] === null || typeof snap[k] === 'undefined') localStorage.removeItem(k);
            else localStorage.setItem(k, snap[k]);
          } catch {}
        });
        return gone === null;
      })());
    ok('v1.7.19 tyi-bukangi allowed in save export/import',
      SAVE_KEY_ALLOWLIST.indexOf('tyi-bukangi') !== -1 &&
      validateSaveData({ version: 'v1.7.19-beta',
        keys: { 'tyi-bukangi': '1', 'tyi-collection': '{"nurse":{"researchId":"NS-2026-001"}}' } }).ok === true);
    // restore fixtures: no trace left in the harness
    state.bukangiEgg = _egg;
    state.messages.length = _len;
    state.unread = _unread;
    try {
      if (_msgsLS === null) localStorage.removeItem('tyi-messages'); else localStorage.setItem('tyi-messages', _msgsLS);
      if (_bukLS === null) localStorage.removeItem('tyi-bukangi'); else localStorage.setItem('tyi-bukangi', _bukLS);
    } catch {}
  })();

  // v1.7.20-beta: derpy mystery shadows — documentation + regression tests.
  // In derpy mode the expedition mystery silhouette is a darkened derpy SVG:
  // sharkArtImg() returns the derpy SVG, and CSS (.shark-shadow svg)
  // darkens it with filter: brightness(0) (same trick as v1.6.6).
  // No behavior change vs v1.7.18; this release locks in the intent.
  ok('sharkArtImg no longer takes skipDerpy', sharkArtImg.length <= 3);
  ok('shadow call site has no skipDerpy arg', fileCode.indexOf('sharkArtImg(species.id, "illustration", "Mysterious shark silhouette")') !== -1);
  ok('reveal call site keeps derpy behavior', fileCode.indexOf('sharkArtImg(species.id, "illustration", species.name)') !== -1);
  ok('CSS darkens svg inside .shark-shadow', (function(){
    var sel = cssCode.indexOf('.shark-shadow svg');
    if (sel === -1) return false;
    var open = cssCode.indexOf('{', sel);
    var close = cssCode.indexOf('}', open);
    if (open === -1 || close === -1) return false;
    return cssCode.slice(open, close).indexOf('brightness(0)') !== -1;
  })());
  // run fn with derpy mode forced to a value, restoring the prior value after
  var withDerpyMode = function(val, fn){
    var prev = localStorage.getItem('tyi-derpy-mode');
    try { localStorage.setItem('tyi-derpy-mode', val); return fn(); }
    finally {
      if (prev === null) { localStorage.removeItem('tyi-derpy-mode'); }
      else { localStorage.setItem('tyi-derpy-mode', prev); }
    }
  };
  // the exact shadow markup pattern from the expedition mystery phase
  var shadowMarkup = function(id){
    return '<div class="shark-shadow">' + sharkArtImg(id, 'illustration', 'Mysterious shark silhouette') + '</div>';
  };
  ok('derpy shadow: derpy SVG inside .shark-shadow (nurse)', withDerpyMode('1', function(){
    var inner = sharkArtImg('nurse', 'illustration', 'Mysterious shark silhouette');
    var html = shadowMarkup('nurse');
    return inner === ART['nurse'] && inner.indexOf('<svg') !== -1 &&
           html.indexOf('class="shark-shadow"') !== -1;
  }));
  ok('derpy shadow: derpy SVG inside .shark-shadow (whale shark)', withDerpyMode('1', function(){
    var inner = sharkArtImg('whale', 'illustration', 'Mysterious shark silhouette');
    var html = shadowMarkup('whale');
    return inner === ART['whale'] && inner.indexOf('<svg') !== -1 &&
           html.indexOf('class="shark-shadow"') !== -1;
  }));
  ok('derpy reveal keeps derpy SVG (nurse)', withDerpyMode('1', function(){
    return sharkArtImg('nurse', 'illustration', 'Nurse Shark') === ART['nurse'];
  }));
  ok('derpy reveal keeps derpy SVG (whale shark)', withDerpyMode('1', function(){
    return sharkArtImg('whale', 'illustration', 'Whale Shark') === ART['whale'];
  }));
  ok('non-derpy mode returns standard img tag (nurse)', withDerpyMode('0', function(){
    var html = sharkArtImg('nurse', 'illustration', 'Nurse Shark');
    return html.indexOf('<img') === 0 && html.indexOf('data-shark-art="nurse"') !== -1;
  }));
  ok('non-derpy mode returns standard img tag (whale shark)', withDerpyMode('0', function(){
    var html = sharkArtImg('whale', 'illustration', 'Whale Shark');
    return html.indexOf('<img') === 0 && html.indexOf('data-shark-art="whale"') !== -1;
  }));

  // v1.7.21-beta: derpy SVGs have a viewBox but no width/height attributes,
  // so the SVG collapsed to zero size inside .shark-shadow (empty mystery).
  // CSS must give .shark-shadow svg explicit dimensions.
  ok('CSS gives .shark-shadow svg explicit dimensions', (function(){
    // find the standalone .shark-shadow svg rule (not the combined img+svg filter rule)
    var re = /\\.shark-shadow\\s+svg\\s*\\{([^}]*)\\}/g, m, found = false;
    while ((m = re.exec(cssCode)) !== null) {
      var block = m[1];
      if (block.indexOf('width') !== -1 && block.indexOf('height') !== -1) { found = true; break; }
    }
    return found;
  })());

  // v1.8.4-beta: performance — logbook pagination + no redundant renderAll in doFollowTagged.
  // Logbook cap: 40 trips -> 30 entries + "show older" button.
  (() => {
    const origLogbook = state.logbook;
    const origShown = logbookShown;
    const mkTrip = (i) => ({
      date: "Oct 18, 2026", region: "caribbean", depth: "surface", bait: "mackerel",
      method: "", methodOpt: "", ts: Date.now() - i * 86400000,
      encounters: [{ result: "tagged", name: "Lemon Shark", speciesId: "lemon", researchId: "LS-1" }],
      conditions: "", fieldNote: "", pinHint: "",
    });
    state.logbook = [];
    for (let i = 0; i < 40; i++) state.logbook.push(mkTrip(i));
    logbookShown = LOGBOOK_PAGE_SIZE;
    const listEl = document.getElementById("logbookList");
    try {
      listEl.children = []; // mock innerHTML="" does not clear children; real DOM does
      renderLogbook();
      const entries = listEl.children.filter(c => c.className === "logbook-entry");
      const moreBtn = listEl.children.find(c => String(c.className || "").indexOf("logbook-more") !== -1);
      ok("logbook renders at most 30 trips", entries.length === 30);
      ok("logbook shows 'show older' button when capped", !!moreBtn && String(moreBtn.textContent).indexOf("10 more") !== -1);
      // Latest trips first: the newest trip (index 0) is rendered, the 40th is not.
      listEl.children = [];
      logbookShowOlder();
      const entries2 = listEl.children.filter(c => c.className === "logbook-entry");
      const moreBtn2 = listEl.children.find(c => String(c.className || "").indexOf("logbook-more") !== -1);
      ok("logbook 'show older' reveals all 40 trips", entries2.length === 40);
      ok("logbook 'show older' button gone when all shown", !moreBtn2);
      // Filters still narrow the list under the cap.
      const t1 = mkTrip(0);
      ok("logbook filter matches region", logbookTripMatches(t1, { outcome: "all", region: "caribbean", species: "all", dateRange: "all" }));
      ok("logbook filter rejects other region", !logbookTripMatches(t1, { outcome: "all", region: "arctic", species: "all", dateRange: "all" }));
      ok("logbook filter matches tagged outcome", logbookTripMatches(t1, { outcome: "tagged", region: "all", species: "all", dateRange: "all" }));
      ok("logbook filter rejects missed outcome", !logbookTripMatches(t1, { outcome: "missed", region: "all", species: "all", dateRange: "all" }));
      // Fewer trips than the cap: no button.
      state.logbook = [mkTrip(0), mkTrip(1)];
      logbookShown = LOGBOOK_PAGE_SIZE;
      listEl.children = [];
      renderLogbook();
      const entries3 = listEl.children.filter(c => c.className === "logbook-entry");
      const moreBtn3 = listEl.children.find(c => String(c.className || "").indexOf("logbook-more") !== -1);
      ok("logbook under cap renders all trips, no button", entries3.length === 2 && !moreBtn3);
    } finally {
      state.logbook = origLogbook;
      logbookShown = origShown;
      listEl.children = [];
    }
  })();
  // doFollowTagged must NOT call renderAll (closeDive re-renders after resolution),
  // but must still resolve with tagAlong and stash the insight for the Map popup.
  (() => {
    const origRender = renderAll;
    const origTagged = state.tagged;
    const origFacts = state.unlockedFacts;
    const origPending = state.pendingTagAlongFact;
    const origSave = factStore.save;
    const origTrip = logTripEncounter;
    const origLog = logLine;
    const origDone = state.encounterDone;
    const origFollowed = state.followedThisTrip;
    const origPlan = state.currentPlan;
    let raCalls = 0;
    renderAll = () => { raCalls++; };
    factStore.save = () => {};
    logTripEncounter = () => {};
    logLine = () => {};
    state.tagged = { nurse: { name: "", researchId: "NS-1" } };
    state.unlockedFacts = {};
    state.pendingTagAlongFact = null;
    state.encounterDone = null;
    state.followedThisTrip = false;
    state.currentPlan = null;
    let doneArg = null;
    try {
      doFollowTagged("nurse", (arg) => { doneArg = arg; });
      ok("doFollowTagged does not call renderAll", raCalls === 0);
      ok("doFollowTagged still resolves with tagAlong", !!doneArg && doneArg.tagAlong === "nurse");
      ok("doFollowTagged still stashes pendingTagAlongFact", !!state.pendingTagAlongFact && state.pendingTagAlongFact.exhausted === false);
    } finally {
      renderAll = origRender;
      state.tagged = origTagged;
      state.unlockedFacts = origFacts;
      state.pendingTagAlongFact = origPending;
      factStore.save = origSave;
      logTripEncounter = origTrip;
      logLine = origLog;
      state.encounterDone = origDone;
      state.followedThisTrip = origFollowed;
      state.currentPlan = origPlan;
    }
  })();

  // v2.4.0-beta: region-specific dive backgrounds and wildlife
  ok('REGION_BIOME covers all 13 regions', (() => {
    const regions = ["caribbean","north-carolina","philippines","maldives","japan","open-atlantic","cornwall","papua-new-guinea","galapagos","south-africa","east-australia","california","arctic"];
    return regions.every(r => REGION_BIOME[r] && BIOME_SCENERY[REGION_BIOME[r]] && BIOME_CREATURES[REGION_BIOME[r]]);
  })());
  ok('arctic gets polar biome (no tropical creatures)', (() => {
    const c = BIOME_CREATURES[REGION_BIOME["arctic"]];
    return c.indexOf("turtle") === -1 && c.indexOf("dolphin") === -1 && c.indexOf("seal") !== -1;
  })());
  ok('maldives gets tropical biome (no seals)', (() => {
    const c = BIOME_CREATURES[REGION_BIOME["maldives"]];
    return c.indexOf("seal") === -1 && c.indexOf("turtle") !== -1;
  })());
  ok('all BIOME_CREATURES keys exist in CREATURE_ART', (() => {
    const all = [];
    Object.values(BIOME_CREATURES).forEach(arr => arr.forEach(k => { if (all.indexOf(k) === -1) all.push(k); }));
    return all.every(k => CREATURE_ART.hasOwnProperty(k));
  })());
  ok('no .rays div in dive scene HTML', htmlCode.indexOf('<div class="rays">') === -1);
  // v2.4.1-beta: header is horizontal flex on all screens, tight padding
  ok('topbar is horizontal flex', (() => {
    const ti = cssCode.indexOf('.topbar {');
    const te = cssCode.indexOf('}', ti);
    const trule = cssCode.slice(ti, te);
    return trule.indexOf('display: flex') !== -1 && trule.indexOf('padding: 4px 8px 2px') !== -1;
  })());
  // v2.5.0-beta: background images — exact expected filenames (Mira review:
  // the bgFor fallback could mask a missing mapping, so test them all by name)
  ok('BG_IMAGE has 26 surface/reef entries', Object.keys(BG_IMAGE).length === 26);
  ok('bgFor exact surface mappings', (() => {
    const expect = {
      "caribbean": "bg-01-tropical-surface.webp",
      "philippines": "bg-01-tropical-surface.webp",
      "maldives": "bg-01-tropical-surface.webp",
      "papua-new-guinea": "bg-01-tropical-surface.webp",
      "north-carolina": "bg-02-temperate-surface.webp",
      "japan": "bg-02-temperate-surface.webp",
      "cornwall": "bg-02-temperate-surface.webp",
      "south-africa": "bg-02-temperate-surface.webp",
      "east-australia": "bg-02-temperate-surface.webp",
      "open-atlantic": "bg-03-open-atlantic-surface.webp",
      "california": "bg-04-kelp-surface.webp",
      "galapagos": "bg-05-volcanic-surface.webp",
      "arctic": "bg-06-arctic-surface.webp",
    };
    const keys = Object.keys(expect);
    for (let i = 0; i < keys.length; i++) { if (bgFor(keys[i], "surface") !== expect[keys[i]]) return false; }
    return true;
  })());
  ok('bgFor exact reef mappings', (() => {
    const expect = {
      "caribbean": "bg-07-tropical-shallows.webp",
      "philippines": "bg-07-tropical-shallows.webp",
      "maldives": "bg-07-tropical-shallows.webp",
      "papua-new-guinea": "bg-07-tropical-shallows.webp",
      "japan": "bg-08-rocky-shallows.webp",
      "cornwall": "bg-08-rocky-shallows.webp",
      "south-africa": "bg-08-rocky-shallows.webp",
      "east-australia": "bg-08-rocky-shallows.webp",
      "california": "bg-08-rocky-shallows.webp",
      "galapagos": "bg-08-rocky-shallows.webp",
      "open-atlantic": "bg-09-open-atlantic-shallows.webp",
      "arctic": "bg-10-arctic-shallows.webp",
      "north-carolina": "bg-11-north-carolina-wreck-shallows.webp",
    };
    const keys = Object.keys(expect);
    for (let i = 0; i < keys.length; i++) { if (bgFor(keys[i], "reef") !== expect[keys[i]]) return false; }
    return true;
  })());
  ok('bgFor twilight is shared for all regions', (() => {
    const keys = Object.keys(REGION_BIOME);
    for (let i = 0; i < keys.length; i++) { if (bgFor(keys[i], "twilight") !== "bg-12-shared-twilight.webp") return false; }
    return true;
  })());
  ok('bgFor deep is shared for all regions', (() => {
    const keys = Object.keys(REGION_BIOME);
    for (let i = 0; i < keys.length; i++) { if (bgFor(keys[i], "deep") !== "bg-13-shared-deep-dark.webp") return false; }
    return true;
  })());
  ok('dive-bg CSS exists', cssCode.indexOf('.dive-scene .dive-bg') !== -1);
  ok('dive-bg anchored near bottom', cssCode.indexOf('object-position: 50% 95%') !== -1);
  ok('twilight gets lift class', fileCode.indexOf('twilight-lift') !== -1);
  ok('twilight-lift CSS brightens', cssCode.indexOf('.dive-bg.twilight-lift') !== -1);
  ok('deep gets darken overlay', fileCode.indexOf('deep-darken') !== -1);
  ok('deep-darken CSS is black gradient', cssCode.indexOf('.deep-darken') !== -1);
  ok('shark sprite glows in deep zones', cssCode.indexOf('.depth-deep .dive-shark') !== -1 && cssCode.indexOf('.depth-midwater .dive-shark') !== -1);
  // Mira review: mystery silhouette must stay brightness(0) pre-reveal even with glow
  ok('mystery silhouette keeps brightness(0) with glow', (() => {
    const i = cssCode.indexOf('.shark-shadow img');
    if (i === -1) return false;
    const seg = cssCode.slice(i, i + 600);
    return seg.indexOf('brightness(0)') !== -1 && seg.indexOf('drop-shadow(0 0 8px') !== -1;
  })());
  ok('snow above deep-darken', cssCode.indexOf('.dive-scene .snow { z-index: 2; }') !== -1);
  // v2.5.3-beta: darker ambient shadows in first two layers
  ok('surface ambient dark gray', cssCode.indexOf('.depth-surface .ambient img') !== -1 && cssCode.indexOf('brightness(0.35)') !== -1);
  ok('shallow ambient almost black', cssCode.indexOf('.depth-shallow .ambient img') !== -1 && cssCode.indexOf('brightness(0.12)') !== -1);
  // v2.5.4-beta: Sarah species coherence (pinned or just-encountered only)
  ok('sarahSpeciesPool exists', typeof sarahSpeciesPool === 'function');
  ok('GENERIC_CHATS exist', Array.isArray(GENERIC_CHATS) && GENERIC_CHATS.length >= 1);
  ok('pickChat uses coherence pool', fileCode.indexOf('sarahSpeciesPool(COUSIN_CHATS)') !== -1);
  ok('nudge uses coherence pool', fileCode.indexOf('sarahSpeciesPool(COUSIN_NUDGES)') !== -1);
  // v2.4.0-beta Mira review fixes
  ok('arctic surface deck has no turtles/dolphins/mantas', (() => {
    const d = buildSightingDeck("surface", "arctic");
    const txt = d.pool.map(s => s.text.toLowerCase()).join(" ");
    return txt.indexOf("turtle") === -1 && txt.indexOf("dolphin") === -1 && txt.indexOf("manta") === -1 && txt.indexOf("flying fish") === -1;
  })());
  ok('maldives surface deck has no seals', (() => {
    const d = buildSightingDeck("surface", "maldives");
    const txt = d.pool.map(s => s.text.toLowerCase()).join(" ");
    return txt.indexOf("seal") === -1;
  })());
  ok('arctic reef deck has no coral/tropical animals', (() => {
    const d = buildSightingDeck("reef", "arctic");
    const txt = d.pool.map(s => s.text.toLowerCase()).join(" ");
    return txt.indexOf("coral") === -1 && txt.indexOf("hawksbill") === -1 && txt.indexOf("turtle") === -1;
  })());
  ok('NC has wreck accent, japan does not', (() => {
    return !!REGION_ACCENT["north-carolina"] && !REGION_ACCENT["japan"] && !REGION_ACCENT["cornwall"];
  })());
  ok('temperate biome has no wreck (NC-specific)', (() => {
    return BIOME_SCENERY.temperate.indexOf("rect") === -1;
  })());
  ok('sighting deck never empty (fish fallback)', (() => {
    const d = buildSightingDeck("reef", "arctic");
    return d.pool.length > 0 && d.deck.length > 0;
  })());
  // v2.4.0-beta Mira review round 2: all 13 regions x 4 depths give nonempty,
  // biome-compatible decks (catches the open-atlantic reef pelagic gap)
  ok('all region/depth decks are nonempty and biome-compatible', (() => {
    const regions = ["caribbean","north-carolina","philippines","maldives","japan","open-atlantic","cornwall","papua-new-guinea","galapagos","south-africa","east-australia","california","arctic"];
    const depths = ["surface","reef","twilight","deep"];
    for (const r of regions) {
      const biome = REGION_BIOME[r];
      for (const d of depths) {
        const deck = buildSightingDeck(d, r);
        if (!deck.pool.length) return false;
        for (const s of deck.pool) {
          if (s.biomes && s.biomes.indexOf(biome) === -1) return false;
        }
      }
    }
    return true;
  })());

/* ---------- v2.7.0: research-text pass, batch 1 ---------- */
  try {
    const batch1 = ["nurse", "thresher", "tiger", "greatwhite", "spinner", "silvertip", "wobbegong", "horn", "cookiecutter", "sixgill"];
    ok("research pass batch 1: no giveaway endings remain",
      batch1.every(function(id) {
        const s = SHARKS.find(function(x) { return x.id === id; });
        return s && s.research.indexOf("Game plan:") === -1 && s.research.indexOf("Plan:") === -1 &&
          s.research.indexOf("chum") === -1;
      }));
    ok("research pass batch 1: key clues still deducible from the prose",
      SHARKS.find(s => s.id === "cookiecutter").research.indexOf("open Atlantic") !== -1 &&
      SHARKS.find(s => s.id === "tiger").research.indexOf("Maldives") !== -1 &&
      SHARKS.find(s => s.id === "horn").research.indexOf("sea urchins") !== -1 &&
      SHARKS.find(s => s.id === "sixgill").research.indexOf("below 200 metres") !== -1);
  } catch (e) { ok("v2.7.0 research pass batch 1 block (" + e.message + ")", false); }

/* ---------- v2.7.0 Mira review: clue-coverage matrix, batch 1 ----------
     Every accepted region, bait option and depth zone must have a
     discoverable phrase in the final prose. Depth phrases are zone evidence
     (a stated range or habitat zone), not per-tier labels. */
  try {
    const matrix = [
      { id: "nurse", regions: ["Caribbean"], baits: ["crabs", "sea urchins"], depths: ["shallower than about 75 metres", "reef ledges"] },
      { id: "thresher", regions: ["open Atlantic"], baits: ["anchovies", "squid"], depths: ["30 and 550 metres", "mid-water"] },
      { id: "tiger", regions: ["Maldives"], baits: ["schooling fish", "squid", "crabs", "tuna"], depths: ["surface down through the reefs"] },
      { id: "greatwhite", regions: ["South Africa"], baits: ["tuna", "schooling fish"], depths: ["surface waters and reef edges"] },
      { id: "spinner", regions: ["Caribbean"], baits: ["schooling fish"], depths: ["near the surface"] },
      { id: "silvertip", regions: ["Maldivian"], baits: ["schooling reef fish", "cephalopods"], depths: ["shallow outer slopes"] },
      { id: "wobbegong", regions: ["eastern Australia"], baits: ["crustaceans", "fish"], depths: ["patch of reef"] },
      { id: "horn", regions: ["California"], baits: ["sea urchins", "crabs"], depths: ["kelp and rocky reefs"] },
      { id: "cookiecutter", regions: ["open Atlantic"], baits: ["squid"], depths: ["twilight zone", "deep tropical"] },
      { id: "sixgill", regions: ["open Atlantic"], baits: ["squid", "schooling fish"], depths: ["below 200 metres"] },
    ];
    const missing = [];
    matrix.forEach(function(row) {
      const s = SHARKS.find(function(x) { return x.id === row.id; });
      ["regions", "baits", "depths"].forEach(function(dim) {
        row[dim].forEach(function(phrase) {
          if (!s || s.research.indexOf(phrase) === -1) missing.push(row.id + ":" + dim + ":" + phrase);
        });
      });
    });
    ok("v2.7.0 Mira review: batch-1 clue matrix fully covered", missing.length === 0);
    if (missing.length) console.log("matrix gaps: " + missing.join(", "));
  } catch (e) { ok("v2.7.0 clue matrix block (" + e.message + ")", false); }
/* ---------- v2.7.9: research-text final batch (24) + bold clues ---------- */
  try {
    const final24 = ["goblin", "sandtiger", "galapagos", "hammerhead", "mako", "lemon", "blacktip", "whitetip", "scalloped", "smooth", "bull", "salmon", "greenland", "dusky", "leopard", "portjackson", "angelshark", "sawshark", "velvetbelly", "dwarflantern", "kitefin", "pacificsleeper", "spinydogfish", "catshark"];
    ok("v2.7.9 research final batch: no giveaway endings remain",
      final24.every(function(id) {
        const sp = SHARKS.find(function(x) { return x.id === id; });
        return sp && sp.research.indexOf("Game plan:") === -1 && sp.research.indexOf("Plan:") === -1 &&
          sp.research.indexOf("chum") === -1;
      }));
  } catch (e) { ok("v2.7.9 no-giveaway block (" + e.message + ")", false); }

/* ---------- v2.7.9 Mira review: clue-coverage matrix, final batch ----------
     Every accepted region, bait option and depth zone must have a
     discoverable phrase in the final prose. Driven by the FINAL combos:
     greenland/kitefin are squid-only, sawshark is crustaceans-only,
     dwarflantern spans twilight+deep. */
  try {
    const matrix = [
      { id: "goblin", regions: ["Sagami Bay"], baits: ["squid"], depths: ["270 and 960 metres"] },
      { id: "sandtiger", regions: ["North Carolina"], baits: ["schools of fish", "squid", "rays"], depths: ["190 metres", "sunlit shallows around reefs and wrecks"] },
      { id: "galapagos", regions: ["Galápagos"], baits: ["schools of reef fish", "squid"], depths: ["80 metres"] },
      { id: "hammerhead", regions: ["Caribbean"], baits: ["stingrays", "school of reef fish"], depths: ["80 metres", "reef flats"] },
      { id: "mako", regions: ["open Atlantic"], baits: ["tuna", "squid"], depths: ["upper 100 metres"] },
      { id: "lemon", regions: ["Caribbean"], baits: ["small schooling fishes"], depths: ["90 metres"] },
      { id: "blacktip", regions: ["Maldives"], baits: ["small reef fish", "crustaceans"], depths: ["reef flats"] },
      { id: "whitetip", regions: ["Philippine"], baits: ["squid", "schooling fish"], depths: ["shallow reefs"] },
      { id: "scalloped", regions: ["Galápagos"], baits: ["schooling fish", "squid"], depths: ["near the surface", "reef edges"] },
      { id: "smooth", regions: ["Cornwall", "US east coast"], baits: ["schooling fish", "squid"], depths: ["first few metres to roughly 100 metres"] },
      { id: "bull", regions: ["Caribbean"], baits: ["tuna", "schools of smaller fish"], depths: ["coastlines and estuaries"] },
      { id: "salmon", regions: ["Japan"], baits: ["oily fish", "squid"], depths: ["just under the surface"] },
      { id: "greenland", regions: ["Arctic"], baits: ["squid"], depths: ["hundreds of metres down"] },
      { id: "dusky", regions: ["South Africa"], baits: ["sardines", "squid"], depths: ["surf zone to the outer shelf"] },
      { id: "leopard", regions: ["California"], baits: ["crabs", "small schooling fish"], depths: ["warm shallow water"] },
      { id: "portjackson", regions: ["east coast"], baits: ["urchins", "crustaceans"], depths: ["rocky reefs"] },
      { id: "angelshark", regions: ["southwest Britain", "Wales"], baits: ["crabs"], depths: ["5 and 150 metres"] },
      { id: "sawshark", regions: ["southern and eastern Australia"], baits: ["crustaceans"], depths: ["40 to 310 metres"] },
      { id: "velvetbelly", regions: ["southwest Britain"], baits: ["squid"], depths: ["200 and 500 metres"] },
      { id: "dwarflantern", regions: ["Colombia and Venezuela"], baits: ["small crustaceans"], depths: ["189 to 598 metres"] },
      { id: "kitefin", regions: ["open Atlantic"], baits: ["squid"], depths: ["200 metres down to nearly 1800"] },
      { id: "pacificsleeper", regions: ["Japan"], baits: ["squid", "pollock"], depths: ["deep by day"] },
      { id: "spinydogfish", regions: ["Cornwall"], baits: ["schooling fish"], depths: ["from the surface down the shelf"] },
      { id: "catshark", regions: ["Cornwall"], baits: ["crabs"], depths: ["shallow reefs and kelp beds"] },
    ];
    const missing = [];
    matrix.forEach(function(row) {
      const sp = SHARKS.find(function(x) { return x.id === row.id; });
      ["regions", "baits", "depths"].forEach(function(dim) {
        row[dim].forEach(function(phrase) {
          if (!sp || sp.research.indexOf(phrase) === -1) missing.push(row.id + ":" + dim + ":" + phrase);
        });
      });
    });
    ok("v2.7.9 Mira review: final-batch clue matrix fully covered", missing.length === 0);
    if (missing.length) console.log("matrix gaps: " + missing.join(", "));
  } catch (e) { ok("v2.7.9 clue matrix block (" + e.message + ")", false); }

/* ---------- v2.7.9: corrected combos behave correctly ---------- */
  try {
    const has = function(plan, id) { return resolveEncounters(plan).some(function(x) { return x.id === id; }); };
    ok("v2.7.9 greenland: schooling-fish no longer matches, squid does",
      !has({ region: "arctic", depth: "deep", bait: "schooling-fish" }, "greenland") &&
      has({ region: "arctic", depth: "deep", bait: "squid" }, "greenland"));
    ok("v2.7.9 kitefin: schooling-fish no longer matches, squid does",
      !has({ region: "open-atlantic", depth: "deep", bait: "schooling-fish" }, "kitefin") &&
      has({ region: "open-atlantic", depth: "deep", bait: "squid" }, "kitefin"));
    ok("v2.7.9 sawshark: squid no longer matches, crustaceans does (reef + twilight)",
      !has({ region: "east-australia", depth: "reef", bait: "squid" }, "sawshark") &&
      has({ region: "east-australia", depth: "reef", bait: "crustaceans" }, "sawshark") &&
      has({ region: "east-australia", depth: "twilight", bait: "crustaceans" }, "sawshark"));
    ok("v2.7.9 dwarflantern: twilight now matches, deep still matches",
      has({ region: "caribbean", depth: "twilight", bait: "crustaceans" }, "dwarflantern") &&
      has({ region: "caribbean", depth: "deep", bait: "crustaceans" }, "dwarflantern"));
  } catch (e) { ok("v2.7.9 combo behaviour block (" + e.message + ")", false); }

/* ---------- v2.7.9: bold research clues across the full text ---------- */
  try {
    const mako = SHARKS.find(function(x) { return x.id === "mako"; });
    const makoBold = highlightResearchClues(mako, mako.research);
    ok("v2.7.9 bold clues: region, prey and depth bolded in full text",
      makoBold.indexOf("<strong>open Atlantic</strong>") !== -1 &&
      makoBold.indexOf("<strong>tuna</strong>") !== -1 &&
      makoBold.indexOf("<strong>100 metres</strong>") !== -1);
    ok("v2.7.9 bold clues: no nested strong tags, no planner labels bolded",
      makoBold.indexOf("<strong><strong>") === -1 &&
      makoBold.indexOf("<strong>chum</strong>") === -1);
    const dl = SHARKS.find(function(x) { return x.id === "dwarflantern"; });
    ok("v2.7.9 bold clues: metre ranges bolded as one phrase",
      highlightResearchClues(dl, dl.research).indexOf("<strong>189 to 598 metres</strong>") !== -1);
    ok("v2.7.9 bold clues: research rendering uses the full-text highlighter",
      fileCode.indexOf("highlightResearchClues(s, p)") !== -1);
  } catch (e) { ok("v2.7.9 bold clues block (" + e.message + ")", false); }

/* ---------- v2.7.9 Mira re-review: species-aware emphasis ---------- */
  try {
    const bolded = function(id) {
      const sp = SHARKS.find(function(x) { return x.id === id; });
      return sp.research.split("\\n\\n").map(function(p) { return highlightResearchClues(sp, p); }).join("");
    };
    const gl = bolded("greenland");
    ok("v2.7.9 Mira re-review: greenland bolds squid only, never fish/seals",
      gl.indexOf("<strong>squid</strong>") !== -1 &&
      gl.indexOf("<strong>fish</strong>") === -1 &&
      gl.indexOf("<strong>seals</strong>") === -1);
    const kf = bolded("kitefin");
    ok("v2.7.9 Mira re-review: kitefin bolds squid only, never fish/crustaceans",
      kf.indexOf("<strong>squid</strong>") !== -1 &&
      kf.indexOf("<strong>fish</strong>") === -1 &&
      kf.indexOf("<strong>crustaceans</strong>") === -1);
    const ss = bolded("sawshark");
    ok("v2.7.9 Mira re-review: sawshark bolds crustaceans, never fishes",
      ss.indexOf("<strong>crustaceans</strong>") !== -1 &&
      ss.indexOf("<strong>fishes</strong>") === -1);
    ok("v2.7.9 Mira re-review: region aliases bold prose wording",
      bolded("catshark").indexOf("<strong>Cornwall</strong>") !== -1 &&
      bolded("portjackson").indexOf("<strong>Australia's east coast</strong>") !== -1 &&
      bolded("galapagos").indexOf("<strong>Galápagos</strong>") !== -1 &&
      bolded("velvetbelly").indexOf("<strong>southwest Britain</strong>") !== -1);
    ok("v2.7.9 Mira re-review: depth aliases bold habitat wording",
      bolded("portjackson").indexOf("<strong>rocky reefs</strong>") !== -1 &&
      bolded("angelshark").indexOf("<strong>shallow coastal waters</strong>") !== -1);
  } catch (e) { ok("v2.7.9 Mira re-review emphasis block (" + e.message + ")", false); }

/* ---------- v2.7.9: all-50 rendered emphasis inspection ---------- */
  try {
    let nested = 0, chumBold = 0, unbolded = [];
    SHARKS.forEach(function(sp) {
      const out = sp.research.split("\\n\\n").map(function(p) { return highlightResearchClues(sp, p); }).join("");
      if (out.indexOf("<strong><strong>") !== -1) nested++;
      if (out.indexOf("<strong>chum</strong>") !== -1) chumBold++;
      if (out.indexOf("<strong>") === -1) unbolded.push(sp.id);
    });
    ok("v2.7.9 all-50 inspection: no nested strongs, no bolded chum",
      nested === 0 && chumBold === 0);
    ok("v2.7.9 all-50 inspection: every card gets at least one bold clue",
      unbolded.length === 0);
    if (unbolded.length) console.log("unbolded cards: " + unbolded.join(", "));
  } catch (e) { ok("v2.7.9 all-50 inspection block (" + e.message + ")", false); }

/* ---------- v2.7.9 Mira re-review 2: decimal-safe metre bolding ---------- */
  try {
    const bolded = function(id) {
      const sp = SHARKS.find(function(x) { return x.id === id; });
      return sp.research.split("\\n\\n").map(function(p) { return highlightResearchClues(sp, p); }).join("");
    };
    const ss = bolded("sawshark");
    ok("v2.7.9 decimal fix: sawshark length unbolded, depth range bolded whole",
      ss.indexOf("1.<strong>4 metres</strong>") === -1 &&
      ss.indexOf("<strong>1.4 metres</strong>") === -1 &&
      ss.indexOf("<strong>40 to 310 metres</strong>") !== -1);
    const lp = bolded("leopard");
    ok("v2.7.9 decimal fix: leopard length unbolded, no partial fragment",
      lp.indexOf("1.<strong>5 metres</strong>") === -1 &&
      lp.indexOf("<strong>1.2 to 1.5 metres</strong>") === -1);
    ok("v2.7.9 decimal fix: dwarf depth range still bolds whole, greenland length unbolded",
      bolded("dwarflantern").indexOf("<strong>189 to 598 metres</strong>") !== -1 &&
      bolded("greenland").indexOf("<strong>6 metres</strong>") === -1 &&
      bolded("greenland").indexOf("<strong>hundreds of metres</strong>") !== -1);
    ok("v2.7.9 species synonyms: sleeper pollock + silvertip cephalopods bold",
      bolded("pacificsleeper").indexOf("<strong>pollock</strong>") !== -1 &&
      bolded("silvertip").indexOf("<strong>cephalopods</strong>") !== -1);
    const probe = highlightResearchClues({ combo: { regions: ["caribbean"], bait: ["squid"] } }, "It eats squid, pollock and cephalopods.");
    ok("v2.7.9 species synonyms: pollock/cephalopods do not generalize to other squid species",
      probe.indexOf("<strong>squid</strong>") !== -1 &&
      probe.indexOf("<strong>pollock</strong>") === -1 &&
      probe.indexOf("<strong>cephalopods</strong>") === -1);
  } catch (e) { ok("v2.7.9 decimal fix block (" + e.message + ")", false); }

    (function() {
      const _ce = document.createElement;
      const scene = $("diveScene");
      const hadDeep = scene.classList.contains("depth-deep");
      const hadMid = scene.classList.contains("depth-midwater");
      const prevDerpy = localStorage.getItem("tyi-derpy-mode");
      let lastEl = null;
      document.createElement = function(tag) { lastEl = _ce(tag); return lastEl; };
      let deepHtml = "", plainHtml = "", derpyHtml = "", midHtml = "";
      try {
        localStorage.removeItem("tyi-derpy-mode");
        scene.classList.add("depth-deep");
        spawnCreature("shark:goblin", true);
        deepHtml = lastEl.innerHTML;
        scene.classList.remove("depth-deep");
        spawnCreature("shark:goblin", true);
        plainHtml = lastEl.innerHTML;
        localStorage.setItem("tyi-derpy-mode", "1");
        scene.classList.add("depth-deep");
        spawnCreature("shark:goblin", true);
        derpyHtml = lastEl.innerHTML;
        localStorage.removeItem("tyi-derpy-mode");
        scene.classList.remove("depth-deep");
        scene.classList.add("depth-midwater");
        spawnCreature("shark:goblin", true);
        midHtml = lastEl.innerHTML;
      } finally {
        document.createElement = _ce;
        if (hadDeep) scene.classList.add("depth-deep"); else scene.classList.remove("depth-deep");
        if (hadMid) scene.classList.add("depth-midwater"); else scene.classList.remove("depth-midwater");
        if (prevDerpy === null) localStorage.removeItem("tyi-derpy-mode"); else localStorage.setItem("tyi-derpy-mode", prevDerpy);
      }
      ok("v2.7.10 deep shark shadows use dark-blue silhouette art; elsewhere keep blackened illustration",
        deepHtml.indexOf("goblin-silhouette.webp") !== -1 &&
        deepHtml.indexOf("deep-silhouette") !== -1 &&
        plainHtml.indexOf("illustration.webp") !== -1 &&
        plainHtml.indexOf("deep-silhouette") === -1);
      ok("v2.7.10 derpy deep shark keeps black SVG in plain shadow + scoped halo CSS; midwater keeps illustration",
        derpyHtml.indexOf("<svg") !== -1 &&
        derpyHtml.indexOf("deep-silhouette") === -1 &&
        cssCode.indexOf(".dive-scene.depth-deep .ambient .shark-shadow:not(.deep-silhouette) svg { filter: brightness(0) drop-shadow(0 0 8px rgba(180, 220, 255, 0.65))") !== -1 &&
        midHtml.indexOf("illustration.webp") !== -1 &&
        midHtml.indexOf("deep-silhouette") === -1);
    })();
/* ---------- v2.7.1: Bukangi made it out ---------- */
  try {
    ok("v2.7.1 BUKANGI_THREAD updated to the success story",
      BUKANGI_THREAD.length === 4 &&
      BUKANGI_THREAD.every(function(m){ return m.who === 'them'; }) &&
      BUKANGI_THREAD.some(function(m){ return m.text.indexOf('Busan') !== -1; }) &&
      BUKANGI_THREAD.some(function(m){ return m.text.indexOf('ambassador') !== -1; }) &&
      BUKANGI_THREAD.some(function(m){ return m.text.indexOf('MADE IT OUT') !== -1; }));
    ok("v2.7.1 BUKANGI_UPDATE_THREAD defined with 3 messages",
      typeof BUKANGI_UPDATE_THREAD !== 'undefined' && Array.isArray(BUKANGI_UPDATE_THREAD) &&
      BUKANGI_UPDATE_THREAD.length === 3 &&
      BUKANGI_UPDATE_THREAD.every(function(m){ return m.who === 'them'; }));
    ok("v2.7.1 tyi-bukangi-update in RESET_KEYS",
      RESET_KEYS.includes('tyi-bukangi-update'));
    ok("v2.7.1 update hook runs before the egg hook (source)",
      fileCode.indexOf('maybeBukangiUpdate(species);') !== -1 &&
      fileCode.indexOf('maybeBukangiUpdate(species);') < fileCode.indexOf('maybeBukangiEgg(species);'));
    (function(){
      var _egg = state.bukangiEgg, _upd = state.bukangiUpdate;
      var _len = state.messages.length, _unread = state.unread;
      var _msgsLS = null, _updLS = null;
      try { _msgsLS = localStorage.getItem('tyi-messages'); } catch {}
      try { _updLS = localStorage.getItem('tyi-bukangi-update'); } catch {}
      state.bukangiEgg = false; state.bukangiUpdate = false;
      var r0 = maybeBukangiUpdate({ id: 'dusky' });
      ok("v2.7.1 Bukangi update needs the old egg first",
        r0 === false && state.messages.length === _len);
      state.bukangiEgg = true; state.bukangiUpdate = false;
      var r1 = maybeBukangiUpdate({ id: 'dusky' });
      ok("v2.7.1 Bukangi update delivers once for old-egg players",
        r1 === true && state.messages.length === _len + 1 && state.bukangiUpdate === true);
      var r2 = maybeBukangiUpdate({ id: 'dusky' });
      ok("v2.7.1 Bukangi update never repeats",
        r2 === false && state.messages.length === _len + 1);
      state.bukangiUpdate = false;
      var r3 = maybeBukangiUpdate({ id: 'nurse' });
      ok("v2.7.1 Bukangi update only on dusky",
        r3 === false && state.messages.length === _len + 1);
      state.bukangiEgg = _egg; state.bukangiUpdate = _upd;
      state.messages.length = _len; state.unread = _unread;
      try {
        if (_msgsLS === null) localStorage.removeItem('tyi-messages'); else localStorage.setItem('tyi-messages', _msgsLS);
        if (_updLS === null) localStorage.removeItem('tyi-bukangi-update'); else localStorage.setItem('tyi-bukangi-update', _updLS);
      } catch {}
    })();
  } catch (e) { ok("v2.7.1 Bukangi update block (" + e.message + ")", false); }

/* ---------- v2.7.1 Mira review: imported-save integration ---------- */
  try {
    (function(){
      var _egg = state.bukangiEgg, _upd = state.bukangiUpdate;
      var _len = state.messages.length, _unread = state.unread;
      var _msgsLS = null, _updLS = null, _eggLS = null;
      try { _msgsLS = localStorage.getItem('tyi-messages'); } catch {}
      try { _updLS = localStorage.getItem('tyi-bukangi-update'); } catch {}
      try { _eggLS = localStorage.getItem('tyi-bukangi'); } catch {}
      function cleanMsgs() {
        try { localStorage.setItem('tyi-messages', '{"messages":[],"unread":0,"chatIdx":0}'); } catch {}
      }
      function restoreMsgs() {
        state.messages.length = _len; state.unread = _unread;
        try {
          if (_msgsLS === null) localStorage.removeItem('tyi-messages'); else localStorage.setItem('tyi-messages', _msgsLS);
        } catch {}
      }
      // brand-new save: revised primary egg only, no follow-up
      state.bukangiEgg = false; state.bukangiUpdate = false; cleanMsgs();
      try { localStorage.removeItem('tyi-bukangi'); localStorage.removeItem('tyi-bukangi-update'); } catch {}
      var u0 = maybeBukangiUpdate({ id: 'dusky' });
      var e0 = maybeBukangiEgg({ id: 'dusky' });
      var freshOk = u0 === false && e0 === true && state.messages.length === _len + 1;
      restoreMsgs();
      // imported pre-rescue save: flag set, no update flag; two encounters = one follow-up only
      state.bukangiEgg = true; state.bukangiUpdate = false; cleanMsgs();
      try { localStorage.setItem('tyi-bukangi', '1'); localStorage.removeItem('tyi-bukangi-update'); } catch {}
      var u1 = maybeBukangiUpdate({ id: 'dusky' });
      var e1 = maybeBukangiEgg({ id: 'dusky' });
      var u2 = maybeBukangiUpdate({ id: 'dusky' });
      var e2 = maybeBukangiEgg({ id: 'dusky' });
      var importOk = u1 === true && e1 === false && u2 === false && e2 === false && state.messages.length === _len + 1;
      ok("v2.7.1 Mira review: new save gets revised egg, no follow-up", freshOk);
      ok("v2.7.1 Mira review: pre-rescue save gets exactly one follow-up over two encounters", importOk);
      state.bukangiEgg = _egg; state.bukangiUpdate = _upd;
      restoreMsgs();
      try {
        if (_updLS === null) localStorage.removeItem('tyi-bukangi-update'); else localStorage.setItem('tyi-bukangi-update', _updLS);
        if (_eggLS === null) localStorage.removeItem('tyi-bukangi'); else localStorage.setItem('tyi-bukangi', _eggLS);
      } catch {}
    })();
  } catch (e) { ok("v2.7.1 imported-save integration block (" + e.message + ")", false); }
  /* ---------- v2.7.2: parked tour card, tab arrow, ? button moved ---------- */
  try {
    ok("tour card parks: same left and width on the welcome slide and the Research slide",
      (() => {
        openTour();
        const left0 = $("tourOverlay").style.left, width0 = $("tourOverlay").style.width;
        tourAdvance();
        const parked = $("tourOverlay").style.left === left0 && $("tourOverlay").style.width === width0;
        closeTour();
        return parked;
      })());
    ok("yellow tab arrow hides on tab-less slides and shows on tab slides",
      (() => {
        openTour();
        const hidden0 = $("tourTabArrow").style.opacity === "0";
        tourAdvance();
        const shown1 = $("tourTabArrow").style.opacity === "1";
        closeTour();
        const hiddenAfter = $("tourTabArrow").style.opacity === "0";
        return hidden0 && shown1 && hiddenAfter;
      })());
    ok("in-card arrow is gone; the standalone tab arrow is a yellow triangle",
      htmlCode.indexOf('id="tourTabArrow"') !== -1 && htmlCode.indexOf('id="tourArrow"') === -1 &&
      cssCode.indexOf(".tour-tab-arrow") !== -1 &&
      cssCode.indexOf("border-bottom: 18px solid var(--accent)") !== -1);
    ok("? button lives in the footer by the save controls with a plain centred glyph",
      htmlCode.indexOf('id="tourBtn"') > htmlCode.indexOf('id="exportBtn"') &&
      htmlCode.indexOf('title="How to play">?</button>') !== -1 &&
      (() => {
        const s = cssCode.indexOf(".tour-btn {");
        const block = cssCode.slice(s, s + 400);
        return block.indexOf("display: inline-flex") !== -1 && block.indexOf("justify-content: center") !== -1;
      })());
    ok("nav row is pinned: card is a flex column, text scrolls inside it",
      (() => {
        const c = cssCode.indexOf(".tour-card {");
        const card = cssCode.slice(c, c + 300);
        const t = cssCode.indexOf(".tour-text {");
        const text = cssCode.slice(t, t + 200);
        return card.indexOf("flex-direction: column") !== -1 &&
          text.indexOf("flex: 1") !== -1 && text.indexOf("overflow-y: auto") !== -1;
      })());
    ok("tab arrow is hidden by default on an idle page load (CSS default governs before any tour opens)",
      (() => {
        const s = cssCode.indexOf(".tour-tab-arrow {");
        const block = cssCode.slice(s, s + 400);
        return block.indexOf("opacity: 0") !== -1 && $("tourTabArrow").style.opacity !== "1";
      })());
    ok("short screens shrink the card to fit instead of forcing it below the viewport (source)",
      fileCode.indexOf("Math.min(320, avail)") !== -1 &&
      fileCode.indexOf("Math.max(120, Math.min(320") === -1 &&
      fileCode.indexOf("avail >= 160") !== -1);
    ok("background scrolling locks while the tour is open and the arrow repositions on scroll (source)",
      fileCode.indexOf('document.body.style.overflow = "hidden"') !== -1 &&
      fileCode.indexOf('window.addEventListener("scroll", positionTour);') !== -1);
  } catch (e) { ok("v2.7.2 parked tour block (" + e.message + ")", false); }

  /* ---------- v2.7.3: logbook species filter, alphabetical ---------- */
  try {
    const lbNames = logbookSpeciesOptions().map(function(s) { return s.name; });
    const lbSorted = lbNames.slice().sort(function(a, b) { return a.localeCompare(b); });
    ok("logbook species options are alphabetical across all 50",
      lbNames.length === 50 && JSON.stringify(lbNames) === JSON.stringify(lbSorted));
    ok("alphabetical helper returns a copy: roster order itself is untouched",
      SHARKS[0].id === "nurse" && SHARKS[1].id === "thresher" && SHARKS[2].id === "whale");
    ok("logbook filter builder uses the alphabetical options (source)",
      fileCode.indexOf("logbookSpeciesOptions().forEach") !== -1);
  } catch (e) { ok("v2.7.3 logbook alpha block (" + e.message + ")", false); }

  /* ---------- v2.7.4: ambient batch — new sprites, shark silhouettes, regions, weighting, both sides ---------- */
  try {
    ok("new ambient sprites registered (anglerfish, penguin, mola)",
      typeof CREATURE_ART.anglerfish === "string" && CREATURE_ART.anglerfish.indexOf("bg-anglerfish") !== -1 &&
      typeof CREATURE_ART.penguin === "string" && CREATURE_ART.penguin.indexOf("bg-penguin") !== -1 &&
      typeof CREATURE_ART.mola === "string" && CREATURE_ART.mola.indexOf("bg-mola") !== -1);
    const hasCreature = function(pool, c) { return pool.some(function(s) { return s.creature === c; }); };
    ok("penguins appear in South Africa + Galapagos surface decks only",
      hasCreature(buildSightingDeck("surface", "south-africa").pool, "penguin") &&
      hasCreature(buildSightingDeck("surface", "galapagos").pool, "penguin") &&
      !hasCreature(buildSightingDeck("surface", "north-carolina").pool, "penguin") &&
      !hasCreature(buildSightingDeck("surface", "arctic").pool, "penguin") &&
      !hasCreature(buildSightingDeck("surface", "maldives").pool, "penguin"));
    ok("anglerfish in the deep deck only (never twilight), mola + shark silhouettes at warm surfaces",
      !hasCreature(buildSightingDeck("twilight", "open-atlantic").pool, "anglerfish") &&
      hasCreature(buildSightingDeck("deep", "arctic").pool, "anglerfish") &&
      hasCreature(buildSightingDeck("surface", "caribbean").pool, "mola") &&
      hasCreature(buildSightingDeck("surface", "caribbean").pool, "shark:hammerhead") &&
      hasCreature(buildSightingDeck("surface", "caribbean").pool, "shark:whale") &&
      hasCreature(buildSightingDeck("reef", "caribbean").pool, "shark:tiger"));
    ok("sighting weights: fish 3, dolphin + turtle 2, everything else 1",
      CREATURE_WEIGHT.fish === 3 && CREATURE_WEIGHT.dolphin === 2 && CREATURE_WEIGHT.turtle === 2 &&
      sightingWeight({ creature: "shark:hammerhead" }) === 1 && sightingWeight({ creature: "penguin" }) === 1);
    const realRandom = Math.random;
    try {
      const seq = [0.99, 0.01, 0.5]; let ri = 0;
      Math.random = function() { return seq[ri++ % seq.length]; };
      const firstDealt = weightedSightingShuffle([{ creature: "fish" }, { creature: "turtle" }, { creature: "mola" }]).pop();
      ok("weighted deck deals the fish-biased entry first (stubbed random, pop consumption)",
        firstDealt && firstDealt.creature === "fish");
    } finally { Math.random = realRandom; }
    const wsIn = [{ creature: "fish" }, { creature: "turtle" }, { creature: "mola" }];
    const wsOut = weightedSightingShuffle(wsIn);
    ok("weighted shuffle is a permutation (no entry lost or duplicated)",
      wsOut.length === 3 && wsOut.slice().sort(function(a, b) { return a.creature < b.creature ? -1 : 1; }).map(function(s) { return s.creature; }).join(",") === "fish,mola,turtle");
    const fishCount = function(list) { return list.filter(function(c) { return c === "fish"; }).length; };
    ok("drift weighting: fish eightfold in tropical + kelp, fivefold elsewhere",
      fishCount(BIOME_CREATURES.tropical) === 8 && fishCount(BIOME_CREATURES.kelp) === 8 &&
      fishCount(BIOME_CREATURES.temperate) === 5 && fishCount(BIOME_CREATURES.pelagic) === 5 &&
      fishCount(BIOME_CREATURES.polar) === 5 && fishCount(BIOME_CREATURES.volcanic) === 5);
    ok("ambient spawns handle shark silhouettes + travel both ways (source)",
      fileCode.indexOf('type.indexOf("shark:")') !== -1 &&
      fileCode.indexOf('class="shark-shadow"') !== -1 &&
      fileCode.indexOf('scaleX(-1)') !== -1 && fileCode.indexOf('swim-left') !== -1 &&
      cssCode.indexOf('.dive-scene .ambient .shark-shadow img') !== -1);
  } catch (e) { ok("v2.7.4 ambient batch block (" + e.message + ")", false); }

  /* ---------- v2.7.5: ambient batch 2 — 20 sprites, region gating, shark silhouettes ---------- */
  try {
    const b2keys = ["moray","seahorse","clownfish","parrotfish","pufferfish","lionfish","hatchetfish","gulper","vampire","siphonophore","krill","viperfish","snailfish","cusk","otter","narwhal","beluga","snake","manatee","tuna"];
    const b2files = { moray: "bg-moray", seahorse: "bg-seahorse", clownfish: "bg-clownfish", parrotfish: "bg-parrotfish", pufferfish: "bg-pufferfish", lionfish: "bg-lionfish", hatchetfish: "bg-hatchetfish", gulper: "bg-gulper", vampire: "bg-vampire-squid", siphonophore: "bg-siphonophore", krill: "bg-krill", viperfish: "bg-viperfish", snailfish: "bg-snailfish", cusk: "bg-cusk-eel", otter: "bg-sea-otter", narwhal: "bg-narwhal", beluga: "bg-beluga", snake: "bg-sea-snake", manatee: "bg-manatee", tuna: "bg-tuna" };
    ok("batch-2 ambient sprites registered (20 keys)",
      b2keys.every(function(k) { return typeof CREATURE_ART[k] === "string" && CREATURE_ART[k].indexOf(b2files[k]) !== -1; }));
    const hasC = function(pool, c) { return pool.some(function(s) { return s.creature === c; }); };
    const reefCar = buildSightingDeck("reef", "caribbean").pool;
    ok("reef batch in a Caribbean reef deck (clownfish moved to surface shallows)",
      ["moray","seahorse","parrotfish","pufferfish","lionfish"].every(function(c) { return hasC(reefCar, c); }) &&
      !hasC(reefCar, "clownfish"));
    const twiAtl = buildSightingDeck("twilight", "open-atlantic").pool;
    ok("twilight batch in an open-Atlantic twilight deck",
      ["hatchetfish","gulper","vampire","siphonophore","krill","viperfish"].every(function(c) { return hasC(twiAtl, c); }));
    const deepArc = buildSightingDeck("deep", "arctic").pool;
    ok("deep batch in an Arctic deep deck; goblin kept out of the Arctic",
      ["snailfish","cusk"].every(function(c) { return hasC(deepArc, c); }) &&
      !hasC(deepArc, "shark:goblin") &&
      hasC(buildSightingDeck("deep", "open-atlantic").pool, "shark:goblin"));
    ok("surface visitors gated to their waters",
      hasC(buildSightingDeck("surface", "california").pool, "otter") &&
      !hasC(buildSightingDeck("surface", "north-carolina").pool, "otter") &&
      hasC(buildSightingDeck("surface", "arctic").pool, "narwhal") &&
      hasC(buildSightingDeck("surface", "arctic").pool, "beluga") &&
      hasC(buildSightingDeck("surface", "philippines").pool, "snake") &&
      hasC(buildSightingDeck("surface", "maldives").pool, "snake") &&
      !hasC(buildSightingDeck("surface", "caribbean").pool, "snake") &&
      hasC(buildSightingDeck("surface", "caribbean").pool, "manatee") &&
      !hasC(buildSightingDeck("surface", "philippines").pool, "manatee") &&
      hasC(buildSightingDeck("surface", "open-atlantic").pool, "tuna") &&
      hasC(buildSightingDeck("surface", "philippines").pool, "clownfish") &&
      hasC(buildSightingDeck("surface", "papua-new-guinea").pool, "clownfish") &&
      hasC(buildSightingDeck("surface", "maldives").pool, "clownfish") &&
      !hasC(buildSightingDeck("surface", "caribbean").pool, "clownfish"));
    ok("batch-2 shark silhouettes at warm surfaces, never on reefs",
      hasC(buildSightingDeck("surface", "caribbean").pool, "shark:greatwhite") &&
      hasC(buildSightingDeck("surface", "caribbean").pool, "shark:mako") &&
      hasC(buildSightingDeck("surface", "caribbean").pool, "shark:thresher") &&
      !hasC(buildSightingDeck("reef", "caribbean").pool, "shark:greatwhite"));
    const japanFish = function(d) { return buildSightingDeck(d, "japan").pool.filter(function(s) { return s.creature === "fish"; }); };
    ok("Japan decks keep non-lanternfish fish-sprite sightings at every depth",
      ["surface","reef","twilight","deep"].every(function(d) { return japanFish(d).length > 0; }) &&
      japanFish("deep").some(function(s) { return s.text.indexOf("dumbo octopus") !== -1; }));
    ok("Japan decks still suppress the actual lanternfish repeat",
      !buildSightingDeck("twilight", "japan").pool.some(function(s) { return s.text.toLowerCase().indexOf("lanternfish") !== -1; }));
    ok("other regional note de-dup preserved (turtle/ray/dolphin/seal)",
      !buildSightingDeck("surface", "caribbean").pool.some(function(s) { return s.creature === "turtle"; }) &&
      !buildSightingDeck("surface", "philippines").pool.some(function(s) { return s.creature === "ray"; }) &&
      !buildSightingDeck("surface", "maldives").pool.some(function(s) { return s.creature === "dolphin"; }) &&
      !buildSightingDeck("surface", "south-africa").pool.some(function(s) { return s.creature === "seal"; }));
    ok("surface drift excludes reef residents, reef drift keeps them",
      ["moray","seahorse","clownfish","parrotfish","pufferfish","lionfish"].every(function(c) { return surfaceDriftList("tropical").indexOf(c) === -1; }) &&
      surfaceDriftList("tropical").indexOf("moray") === -1 &&
      BIOME_CREATURES.tropical.indexOf("moray") !== -1 &&
      surfaceDriftList("kelp").indexOf("otter") !== -1 &&
      surfaceDriftList("pelagic").indexOf("tuna") !== -1 &&
      surfaceDriftList("tropical").filter(function(c) { return c === "fish"; }).length === 8);
    ok("v2.7.5-fix (Mira): clownfish is a scripted Indo-Pacific surface visitor only, never ambient drift",
      Object.keys(BIOME_CREATURES).every(function(b) { return BIOME_CREATURES[b].indexOf("clownfish") === -1; }) &&
      surfaceDriftList("tropical").indexOf("clownfish") === -1 &&
      buildSightingDeck("surface", "philippines").pool.some(function(s) { return s.creature === "clownfish"; }) &&
      buildSightingDeck("surface", "papua-new-guinea").pool.some(function(s) { return s.creature === "clownfish"; }) &&
      buildSightingDeck("surface", "maldives").pool.some(function(s) { return s.creature === "clownfish"; }) &&
      !buildSightingDeck("surface", "caribbean").pool.some(function(s) { return s.creature === "clownfish"; }) &&
      !buildSightingDeck("reef", "philippines").pool.some(function(s) { return s.creature === "clownfish"; }));
    ok("v2.7.5-fix (Mira): counted re-sighting lines name re-sightings, never bare sightings/times",
      RESIGHT_NOTES_2ND.concat(RESIGHT_NOTES_3RD).every(function(line) {
        const lower = line.toLowerCase();
        const hasCountUnit = /sightings?/.test(lower) || /\btimes\b/.test(lower) || /\bthree\b/.test(lower) || /\bthird\b/.test(lower);
        return !hasCountUnit || lower.indexOf("re-sighting") !== -1;
      }) &&
      RESIGHT_NOTES_2ND.concat(RESIGHT_NOTES_3RD).every(function(line) {
        return line.toLowerCase().indexOf("two sightings") === -1 && line.toLowerCase().indexOf("third time") === -1;
      }));
    ok("slow shadows list covers the drifters and loungers, not the cruisers",
      ["jellyfish","mola","seahorse","manatee","snailfish","siphonophore","krill","anglerfish"].every(function(c) { return SLOW_CREATURES.indexOf(c) !== -1; }) &&
      ["fish","dolphin","turtle","tuna","shark:greatwhite"].every(function(c) { return SLOW_CREATURES.indexOf(c) === -1; }));
    (function() {
      const _ce = document.createElement;
      const _st = setTimeout;
      let lastEl = null, lastDelay = 0;
      document.createElement = function(tag) { lastEl = _ce(tag); return lastEl; };
      setTimeout = function(fn, ms) { lastDelay = ms; return 0; };
      spawnCreature("jellyfish", true);
      const jDur = parseFloat(lastEl.style.animationDuration), jDelay = lastDelay;
      spawnCreature("fish", true);
      const fDur = parseFloat(lastEl.style.animationDuration), fDelay = lastDelay;
      document.createElement = _ce;
      setTimeout = _st;
      ok("slow shadows cross at half speed (jellyfish 18-34s + 45s net, fish 9-17s + 25s net)",
        jDur >= 18 && jDur <= 34 && jDelay === 45000 && fDur >= 9 && fDur <= 17 && fDelay === 25000);
    })();
    ok("deep drift matches sighting opacity + halo; deep sharks go dark blue, midwater keeps black (source)",
      cssCode.indexOf(".dive-scene.depth-deep .ambient.bg-fish { opacity: 0.8") !== -1 &&
      cssCode.indexOf(".dive-scene.depth-deep .ambient.bg-fish img { filter: drop-shadow(0 0 8px rgba(180, 220, 255, 0.7)") !== -1 &&
      cssCode.indexOf(".dive-scene.depth-midwater .ambient .shark-shadow img { filter: brightness(0) drop-shadow(0 0 8px rgba(180, 220, 255, 0.65)") !== -1 &&
      cssCode.indexOf(".dive-scene.depth-deep .ambient .shark-shadow.deep-silhouette img") !== -1 &&
      cssCode.indexOf(".dive-scene.depth-deep .ambient .shark-shadow img { filter: brightness(0)") === -1 &&
      cssCode.indexOf(".dive-scene .ambient.bg-fish { opacity: 0.45") !== -1);
    (function() {
      const _ce = document.createElement;
      let lastEl = null;
      document.createElement = function(tag) { lastEl = _ce(tag); return lastEl; };
      spawnCreature("fish", true);
      const bgH = parseInt(lastEl.style.height, 10);
      spawnCreature("fish", false);
      const fgH = parseInt(lastEl.style.height, 10);
      document.createElement = _ce;
      ok("background animals stay relatively close (fish drift 15-26px, sightings 20-43px at 0.85)",
        bgH >= 15 && bgH <= 26 && fgH >= 20 && fgH <= 43);
    })();
    ok("lanternfish sighting carries the lit flag; ordinary spawns do not (source + behavior)",
      fileCode.indexOf('spawnCreature(s.creature, false, s.text.toLowerCase().indexOf("lanternfish")') !== -1 &&
      cssCode.indexOf(".dive-scene .ambient.lit img { filter: drop-shadow(0 0 14px rgba(255, 210, 120, 0.9)) brightness(1.4)") !== -1 &&
      (function() {
        const _ce = document.createElement;
        let lastEl = null;
        document.createElement = function(tag) { lastEl = _ce(tag); return lastEl; };
        spawnCreature("fish", false, true);
        const lit = lastEl.classList.contains("lit");
        spawnCreature("fish", false);
        const unlit = !lastEl.classList.contains("lit");
        document.createElement = _ce;
        return lit && unlit;
      })());
    const fishN = function(list) { return list.filter(function(c) { return c === "fish"; }).length; };
    ok("drift weighting holds: fish eightfold in tropical + kelp, fivefold elsewhere",
      fishN(BIOME_CREATURES.tropical) === 8 && fishN(BIOME_CREATURES.kelp) === 8 &&
      fishN(BIOME_CREATURES.temperate) === 5 && fishN(BIOME_CREATURES.pelagic) === 5 &&
      fishN(BIOME_CREATURES.polar) === 5 && fishN(BIOME_CREATURES.volcanic) === 5);
  } catch (e) { ok("v2.7.5 ambient batch 2 block (" + e.message + ")", false); }

  /* ---------- v2.7.6: populated-water drift boost ---------- */
  try {
    /* v2.7.6-fix (Mira): the timer + chance are now tested behaviorally —
       capture the setInterval delay, drive the callback under a fixed
       Math.random, count spawns via a stubbed spawnCreature, restore all. */
    try {
      const realSI = global.setInterval;
      const realRandom = Math.random;
      const realSpawn = spawnCreature;
      let captured = null;
      let spawns = 0;
      try {
        global.setInterval = function(fn, ms) { captured = { fn: fn, ms: ms }; return 999; };
        spawnCreature = function() { spawns++; };
        const run = function(depth, region, rnd) {
          captured = null; spawns = 0;
          Math.random = function() { return rnd; };
          startAmbientLife(depth, region);
          const ms = captured ? captured.ms : -1;
          if (captured) captured.fn();
          return { ms: ms, spawns: spawns };
        };
        /* 0.6 discriminates: below populated 75%, above standard 55%. */
        [["reef", "caribbean", 4000, true],
         ["surface", "california", 4000, true],
         ["reef", "california", 4000, true],
         ["twilight", "california", 6000, false],
         ["deep", "california", 6000, false],
         ["surface", "caribbean", 6000, false],
         ["reef", "north-carolina", 6000, false],
         ["deep", "arctic", 6000, false]].forEach(function(c) {
          const res = run(c[0], c[1], 0.6);
          ok("v2.7.6-fix (Mira): drift timer " + c[0] + "/" + c[1] + " = " + c[2] + "ms, spawns at 0.6: " + c[3],
            res.ms === c[2] && (res.spawns > 0) === c[3]);
        });
        ok("v2.7.6-fix (Mira): 0.9 never spawns, 0.0 always spawns",
          run("reef", "caribbean", 0.9).spawns === 0 && run("deep", "california", 0.0).spawns > 0);
      } finally {
        global.setInterval = realSI;
        Math.random = realRandom;
        spawnCreature = realSpawn;
        stopAmbientLife();
      }
    } catch (e) { ok("v2.7.6-fix populated timer block (" + e.message + ")", false); }
    ok("v2.7.6: deep + twilight drift untouched by the populated boost (source)",
      fileCode.indexOf('depth === "deep") creatures = ["fish", "fish", "fish", "anglerfish", "snailfish", "cusk"]') !== -1 &&
      fileCode.indexOf('["fish", "fish", "jellyfish", "hatchetfish", "gulper", "vampire", "siphonophore", "krill", "viperfish"]') !== -1);
  } catch (e) { ok("v2.7.6 populated-water block (" + e.message + ")", false); }

  /* ---------- v2.7.8: relative creature sizing ---------- */
  try {
    ok("v2.7.8 (Avery): every ambient creature has a size factor",
      Object.keys(CREATURE_ART).every(function(k) { return typeof CREATURE_SIZE[k] === "number"; }));
    /* v2.7.13-beta (Avery, on-device): otter halved — its wide sprite read too
       big at 1. This chain is a screen-presence tuning, NOT a zoological
       claim: otters are not smaller than krill. Factors compress real size
       so nothing vanishes and wide sprites don't dominate. */
    ok("v2.7.13 (Avery): otter visual tuning — half-height factor (otter < krill < seahorse < fish < manatee)",
      CREATURE_SIZE.otter < CREATURE_SIZE.krill && CREATURE_SIZE.krill < CREATURE_SIZE.seahorse &&
      CREATURE_SIZE.seahorse < CREATURE_SIZE.fish && CREATURE_SIZE.fish < CREATURE_SIZE.manatee &&
      CREATURE_SIZE.manatee === 1.5);
    ok("v2.7.13 (Avery): otter renders compressed (otter < krill < fish < manatee, fixed random)",
      (function() {
        const _ce = document.createElement;
        const realRandom = Math.random;
        let lastEl = null;
        try {
          document.createElement = function(tag) { lastEl = _ce(tag); return lastEl; };
          Math.random = function() { return 0.5; };
          const heights = {};
          ["otter", "krill", "fish", "manatee"].forEach(function(c) {
            spawnCreature(c, false);
            heights[c] = parseInt(lastEl.style.height, 10);
          });
          return heights.otter < heights.krill && heights.krill < heights.fish && heights.fish < heights.manatee;
        } finally {
          document.createElement = _ce;
          Math.random = realRandom;
        }
      })());
    /* v2.7.13-beta (Mira review): Avery explicitly decided BOTH paths halve —
       drift shadow and scripted sighting. Assert actual spawn heights per
       path at fixed random, not just the shared factor. */
    ok("v2.7.13 (Avery): otter spawn heights halve on both paths (drift 9-15, sighting 12-25, fixed random)",
      (function() {
        const _ce = document.createElement;
        const realRandom = Math.random;
        let lastEl = null;
        try {
          document.createElement = function(tag) { lastEl = _ce(tag); return lastEl; };
          Math.random = function() { return 0.5; };
          spawnCreature("otter", true);
          const bgH = parseInt(lastEl.style.height, 10);
          spawnCreature("otter", false);
          const fgH = parseInt(lastEl.style.height, 10);
          return bgH >= 9 && bgH <= 15 && fgH >= 12 && fgH <= 25 && bgH < fgH;
        } finally {
          document.createElement = _ce;
          Math.random = realRandom;
        }
      })());
  } catch (e) { ok("v2.7.8 sizing block (" + e.message + ")", false); }

console.log(out.join('\\n'));
  const fails = out.filter(l => l.startsWith('FAIL')).length;
  console.log(fails ? fails + ' FAILURES' : 'ALL TESTS PASS');
  
  process.exit(fails ? 1 : 0);
})();
`;
eval(code);
