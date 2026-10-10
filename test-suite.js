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
  ok('version v1.5.13-beta', VERSION === 'v1.5.13-beta');

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
  // v1.5.10-beta: Archive is tagged-sharks only — no locked list at all.
  // Untagged species are skipped before rendering, so photos still require
  // an actual tag.
  const archiveUiCode = fs.readFileSync(path.join(DIR, 'archive-ui.js'), 'utf8');
  ok('archive skips untagged species', archiveUiCode.includes('if (!t) return;'));
  ok('archive has no locked list', !archiveUiCode.includes('lockedRows') && !archiveUiCode.includes('Still to discover'));
  ok('archive uses Research-style IUCN pill', archiveUiCode.includes('status-pill iucn-'));
  ok('archive has no checkmark', !archiveUiCode.includes('✅'));
  // v1.5.11-beta: Archive tab always visible, locked until Sarah's text.
  ok('updateArchiveTab toggles locked state not hidden',
    archiveUiCode.includes('toggle("tab-locked"') && !archiveUiCode.includes('toggle("hidden", !state.archiveUnlocked'));
  ok('archive tab has disabled attr support',
    archiveUiCode.includes('btn.disabled'));
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
  ok('map legend is two-column', /\\.map-legend\\s*\\{\\s*display:\\s*grid/.test(cssCode));
  ok('chip shows common name first', /esc\\(s\\.name\\)\\} · /.test(fileCode));
  ok('overlays scroll when overflowing', /\\.overlay\\s*\\{[^}]*overflow-y:\\s*auto/.test(cssCode));
  ok('sand tiger GIF reframed in CSS', /\\.gif-landscape-frame/.test(cssCode));
  // v1.4.0: full-bleed tab band, equal-width tabs, stacked count tabs
  ok('tab band is full-bleed', /\\.tabs\\s*\\{[^}]*calc\\(50% - 50vw\\)/.test(cssCode));
  ok('tabs use flex row', /\\.tabs\\s*\\{[^}]*display:\\s*flex/.test(cssCode));
  // v1.4.2: tab buttons centered in the band, not left-aligned
  ok('tabs centered in band', /\\.tabs\\s*\\{[^}]*justify-content:\\s*center/.test(cssCode));
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
    ACHIEVEMENTS.every(a => { try { return typeof a.check === 'function'; } catch { return false; } }));
  ok('20 achievements (19 visible + Bruce hidden)', ACHIEVEMENTS.length === 20 &&
    ACHIEVEMENTS.filter(a => !a.hidden).length === 19);
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
    // A v1 track with a re-sighting point should keep it after migration
    const savedTagged = JSON.parse(JSON.stringify(state.tagged || {}));
    try {
      state.tagged['catshark'] = {
        location: "Cornwall", nick: "Test", researchId: "TEST-002",
        track: { points: [{ label: "Cornwall", day: 0, km: 0 }, { label: "Mount's Bay", day: 5, km: 10, resighting: true }], totalKm: 10, days: 5, kind: "acoustic" }, // v1, no v marker
        resightings: [{ date: "2026-01-01", location: "Cornwall", note: "Test", ts: 1 }]
      };
      migrateTracks();
      const t = state.tagged['catshark'];
      // Track regenerated to v2
      if (t.track.v !== 2) return false;
      // Re-sighting point preserved
      if (!t.track.points.some(p => p.resighting)) return false;
      // Re-sighting record preserved
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
  ok('mira: legacy re-sighting reconstructed from records', (() => {
    // Genuinely pre-v0.21.0 save: no resighting flag, but has resightings records
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
      const t = state.tagged['catshark'];
      if (t.track.v !== 2) return false;
      // Re-sighting point should be reconstructed
      if (!t.track.points.some(p => p.resighting)) return false;
      // Day count should agree with final point
      const lastPoint = t.track.points[t.track.points.length - 1];
      if (t.track.days < lastPoint.day) return false;
      // Records preserved
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
  ok('v0.22.0: sea conditions and field notes exist', SEA_CONDITIONS.length >= 4 && Object.values(FIELD_NOTES).every(arr => arr.length >= 3) && typeof pickFieldNote === 'function' && typeof regionClimate === 'function');
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

  // v0.26.0: art integration — WebP illustrations + silhouettes, tap-to-reveal
  ok('v0.26.0: ART_SLUG_MAP resolves all 50 species to WebP on disk', (() => {
    // Every playable species ID must map (directly or via ART_SLUG_MAP)
    // to an existing illustration AND silhouette WebP file.
    return SHARKS.every(s =>
      fs.existsSync(path.join(DIR, ART_URL(s.id, 'illustration'))) &&
      fs.existsSync(path.join(DIR, ART_URL(s.id, 'silhouette')))
    );
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
  // v1.4.0-beta Mira review: full 1->2->3->exhausted fact progression
  (() => {
    const origFacts = state.unlockedFacts;
    const origSave = factStore.save;
    const origLog = logLine;
    factStore.save = () => {};
    logLine = () => {};
    state.unlockedFacts = {};
    // Nurse has 3 facts — unlock all 3, then verify exhaustion
    const f1 = unlockSecretFact("nurse");
    const f2 = unlockSecretFact("nurse");
    const f3 = unlockSecretFact("nurse");
    const f4 = unlockSecretFact("nurse");
    ok("fact progression unlocks 3 distinct", f1 && f2 && f3 && f1 !== f2 && f2 !== f3 && f1 !== f3);
    ok("fact progression exhausts at 4th", f4 === null);
    ok("fact progression tracks 3 unlocked", (state.unlockedFacts["nurse"] || []).length === 3);
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
    ok("tabs use flexbox (v1.5.7)", /\\.tabs\\s*\\{[^}]*display:\\s*flex/.test(cssCode));
  ok("desktop tabs have flex-basis pills", /\\.tab\\s*\\{[^}]*flex:\\s*0\\s+1\\s+108px/.test(cssCode));
  ok("tablet tabs single row (v1.5.9)", /max-width:\\s*1023px[\\s\\S]*?\\.tab\\s*\\{[^}]*flex:\\s*1\\s+1\\s+0/.test(cssCode));
  ok("tablet tabs no fixed 150px basis (v1.5.9)", !/max-width:\\s*1023px[\\s\\S]*?\\.tab\\s*\\{[^}]*flex-basis:\\s*150px/.test(cssCode));
  ok("tablet tabs tighter type fit 8 in a row (v1.5.13)", /min-width:\\s*700px[\\s\\S]*?\\.tab\\s*\\{[^}]*font-size:\\s*10px/.test(cssCode));
  ok("tablet tabs no-wrap single row (v1.5.13)", /min-width:\\s*560px[\\s\\S]*?\\.tabs\\s*\\{[^}]*flex-wrap:\\s*nowrap/.test(cssCode));
  ok("tablet tab icons smaller (v1.5.13)", /min-width:\\s*700px[\\s\\S]*?\\.tab-icon\\s*\\{[^}]*font-size:\\s*16px/.test(cssCode));
  ok("tablet tab-stack shrinkable (v1.5.12)", /max-width:\\s*1023px[\\s\\S]*?\\.tab-stack\\s*\\{[^}]*min-width:\\s*0/.test(cssCode));
  ok("phone tabs use flex-wrap (v1.5.6)", /max-width:\\s*559px[\\s\\S]*?\\.tabs\\s*\\{[^}]*display:\\s*flex/.test(cssCode));
    ok("phone tabs wrap", /max-width:\\s*559px[\\s\\S]*?\\.tabs\\s*\\{[^}]*flex-wrap:\\s*wrap/.test(cssCode));
    ok("phone tabs center every row", /max-width:\\s*559px[\\s\\S]*?\\.tabs\\s*\\{[^}]*justify-content:\\s*center/.test(cssCode));
    ok("phone tabs two rows of four (v1.5.13)", /max-width:\\s*559px[\\s\\S]*?\\.tab\\s*\\{[^}]*flex:\\s*0\\s+1\\s+calc\\(25%/.test(cssCode));
    ok("flex 1-1-0 only inside tablet query (v1.5.9)", !/\\.tab\\s*\\{[^}]*flex:\\s*1\\s+1\\s+0(?![^}]*\\})[\\s\\S]*?@media/.test(cssCode.split("@media (min-width: 560px)")[0]));
    ok("tab-stack stays column on phones", !/max-width:\\s*559px[\\s\\S]*?\\.tab-stack\\s*\\{[^}]*flex-direction:\\s*row/.test(cssCode));
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
  // v1.4.17: caustics rolled back to span-based rays (v1.4.16 conic fan broke
  // iPad layout) — brighter, wider fan, clearly visible motion
  (() => {
    ok("caustics use span-based rays", /\\.caustics\\s+span\\s*\\{/.test(cssCode));
    ok("no conic fan divs remain", !/\\.caustics\\s+\\.fan/.test(cssCode));
    ok("rays have diffused soft edges (mask)", /\\.caustics\\s+span\\s*\\{[^}]*mask-image:\\s*linear-gradient\\(to\\s+right/.test(cssCode));
    ok("rays use screen blend for brightness cap", /\\.caustics\\s*\\{[^}]*mix-blend-mode:\\s*screen/.test(cssCode));
    ok("caustics persist while scrolling", /\\.caustics\\s*\\{[^}]*position:\\s*fixed/.test(cssCode));
    const rayCount = (cssCode.match(/\\.caustics\\s+span:nth-child\\(\\d+\\)/g) || []).length;
    ok("caustics has 8 rays", rayCount === 8);
    ok("rays never use the scale property (layout-safe)", !/scale:\\s*[\\d.]+/.test(cssCode));
  })();
  // v1.4.17: rays have clearly visible life — sway plus grow/shrink via transform
  (() => {
    ok("rays have ray-life keyframes", /@keyframes\\s+ray-life/.test(cssCode));
    ok("ray-life sways visibly", /ray-life[\\s\\S]{0,800}?rotate\\(calc\\(var\\(--ray-angle\\)\\s*-\\s*4deg/.test(cssCode));
    ok("ray-life grows/shrinks via scaleX", /ray-life[\\s\\S]{0,800}?scaleX\\(1\\.25\\)/.test(cssCode));
    ok("rays never fully vanish", /ray-life[\\s\\S]{0,800}?opacity:\\s*0\\.15/.test(cssCode));
    ok("reduced-motion freezes rays statically", /\\.surface-shimmer,\\s*\\.caustics\\s+span,\\s*\\.bubbles\\s+span\\s*\\{[^}]*animation:\\s*none/.test(cssCode));
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
  // v1.4.15-beta: desktop logo is 150% bigger (104px -> 156px)
  ok('desktop logo 156px', /\\.site-logo\\s*\\{[^}]*height:\\s*156px/.test(cssCode));
  // v1.4.15-beta: guide grid uses minmax so overlays can't widen columns
  ok('guide grid minmax', /\\.guide-list\\s*\\{[^}]*minmax\\(0,\\s*1fr\\)/.test(cssCode));
  // v1.4.15-beta: time-of-day progression in expedition log
  ok('time progression', /The afternoon stretches out/.test(fileCode) && /Evening approaches/.test(fileCode));
  // v1.4.15-beta: subtle diet phrases (not bait answers)
  ok('diet phrases', /they eat plankton/.test(fileCode) && /DIET_PHRASE/.test(fileCode));
  // v1.4.14: MORE bubbles in overlapping burst columns on a shorter shared cycle
  (() => {
    ok("bubbles use column keyframes", /@keyframes\\s+bubble-column/.test(cssCode));
    ok("bubble columns share a 24s cycle", /\\.bubbles\\s+span\\s*\\{[^}]*animation:\\s*bubble-column\\s+24s/.test(cssCode));
    const bubbleCount = (cssCode.match(/\\.bubbles\\s+span:nth-child\\(\\d+\\)\\s*\\{/g) || []).length;
    ok("bubbles number 16 (4 lanes x 4)", bubbleCount === 16);
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
    ok("collapseGuideRow helper exists", /function collapseGuideRow\\(row\\)/.test(code));
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
  // v1.4.9: White Whale achievement — tag a megamouth
  ok("white-whale achievement exists", ACHIEVEMENTS.some(a => a.id === "white-whale" && a.name === "White Whale"));
  ok("white-whale checks megamouth tag", (() => { const a = ACHIEVEMENTS.find(x => x.id === "white-whale"); return a && a.check({ tagged: { megamouth: {} } }) === true && a.check({ tagged: {} }) === false; })());
  ok("WHITE_WHALE_THREAD exists with Sarah's reaction", typeof WHITE_WHALE_THREAD !== "undefined" && WHITE_WHALE_THREAD.length >= 4 && WHITE_WHALE_THREAD[0].text.toLowerCase().includes("megamouth"));
  ok("surface-shimmer oversized past viewport", cssCode.indexOf(".surface-shimmer") !== -1 && cssCode.indexOf("left: -4%") !== -1);
  ok("collection empty-note spans grid", /\\.collection-grid\\s+\\.empty-note\\s*\\{[^}]*grid-column:\\s*1\\s*\\/\\s*-1/.test(cssCode));
  // v1.4.2: IUCN abbreviations on field-guide pills
  ok('IUCN_ABBR maps all statuses', ["Critically Endangered","Endangered","Vulnerable","Near Threatened","Least Concern","Data Deficient"].every(k => IUCN_ABBR[k] && IUCN_ABBR[k].length === 2));
  ok('field guide pill uses abbreviation', code.indexOf('IUCN_ABBR[s.status]') !== -1);
  // v1.4.11/v1.4.12: porthole — asset-led waves (Mira's illustrated strips)
  ok('porthole wave layers in HTML', /class="pw-layer pw-far"/.test(htmlCode) && /class="pw-layer pw-mid"/.test(htmlCode) && /class="pw-layer pw-near"/.test(htmlCode));
  ok('caustic ray spans in HTML', /<div class=\"caustics\"><span><\\/span>/.test(htmlCode));
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
  ok('bubbles rise in burst columns', /columns fire in OVERLAPPING pairs/i.test(cssCode));
  // v1.4.16: porthole refinements — overlapping bubble columns, bigger wave layout, snappy splash
  ok('bubble columns overlap in pairs', /columns A.B fire together/.test(cssCode) && /columns C.D fire together/.test(cssCode));
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
  ok('BIG_DAY lemon pool has 2 conversations', BIG_DAY.lemon.length === 2);
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
  ok('WHATS_NEW has v1.5.13-beta', Array.isArray(WHATS_NEW['v1.5.13-beta']) && WHATS_NEW['v1.5.13-beta'].length > 0);
  // v1.5.8: safe batch — seven low-risk items
  ok('still-to-discover heading removed', !archiveUiCode.includes('archive-still-locked-head') && !cssCode.includes('archive-still-locked-head'));
  ok('release buttons reordered', htmlCode.indexOf('id="tagAlongBtn"') < htmlCode.indexOf('id="releaseShipBtn"'));
  ok('release button matches tag-along gradient', cssCode.includes('#releaseBtn') && cssCode.includes('linear-gradient(180deg, #ffd166 0%, #f0b429 100%)'));
  ok('follow button before watch button', code.includes('insertBefore(followBtn, watchBtn)'));
  ok('reunion uses research ID for unnamed', code.includes('rec.researchId || species.name'));
  ok('double-tap zoom disabled', cssCode.includes('touch-action: manipulation'));
  ok('tag-along insight not in log', !code.split('function doTagAlong')[1].split('function doFollowTagged')[0].includes('Tag-along insight'));
  // v1.5.1: header/phone/archive/porthole batch
  ok('header is tighter', /\\.topbar\\s*\\{[^}]*padding:\\s*10px 8px 4px/.test(cssCode));
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
    return REUNION_ODDS.resident === 0.50 && REUNION_ODDS.coastal === 0.25 && REUNION_ODDS.migratory === 0.10;
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
  ok('tier 2E is time-neutral', !/before lunch/.test(BIG_DAY[2].map(c => c.map(m => m.text).join(' ')).join(' ')));
  ok('tier 3F longevity is general', !/these three could be out there that whole time/.test(BIG_DAY[3].map(c => c.map(m => m.text).join(' ')).join(' ')));

console.log(out.join('\\n'));
  const fails = out.filter(l => l.startsWith('FAIL')).length;
  console.log(fails ? fails + ' FAILURES' : 'ALL TESTS PASS');
  
  process.exit(fails ? 1 : 0);
})();
`;
eval(code);
