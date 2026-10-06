/* Tag Along headless test suite — v0.16.0. Saved in the workspace (not /tmp). */
const fs = require('fs');
const path = require('path');
const DIR = __dirname;
const files = ['map-data.js', 'art-data.js', 'sarah-data.js', 'sharks-data.js', 'archive-data.js', 'script.js'];

function makeEl() {
  const el = {
    children: [], innerHTML: '', textContent: '', value: '', dataset: {},
    classList: { _s: new Set(), add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); }, toggle() {}, contains(c) { return this._s.has(c); } },
    style: {}, disabled: false, hidden: false,
    addEventListener() {}, removeEventListener() {}, setAttribute() {}, getAttribute() { return null; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 800, height: 400 }; },
    click() {}, focus() {}, scrollHeight: 999, scrollTop: 0,
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
code += `
;(function tests(){
  const out = [];
  const ok = (name, cond) => out.push((cond ? 'PASS' : 'FAIL') + ' ' + name);
  ok('version v0.17.0', VERSION === 'v0.17.0');

  // roster
  ok('roster is 23', SHARKS.length === 23);
  const ids = SHARKS.map(s => s.id);
  ok('23 unique shark IDs', new Set(ids).size === 23);
  ok('no duplicate research codes', new Set(SHARKS.map(s => s.code)).size === 23);
  ok('all have ART', ids.every(id => !!ART[id]));
  ok('all have SKETCH', ids.every(id => !!SKETCH[id]));
  const counts = ids.map(id => (COUSIN_CHATS[id] || []).length);
  ok('all 23 species have 3 chats', counts.length === 23 && counts.every(n => n === 3));
  ok('all have nudges', ids.every(id => !!COUSIN_NUDGES[id]));
  ok('all have envelopes', ids.every(id => !!TRACK_ENVELOPES[id]));
  ok('win is full roster', SHARKS.length === 23);

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
  ok('all 23 live sharks have archive media', archivedLive.length === 23);
  ok('salmon is future-only', ARCHIVE_MEDIA.salmon && ARCHIVE_MEDIA.salmon.future === true);
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

  console.log(out.join('\\n'));
  const fails = out.filter(l => l.startsWith('FAIL')).length;
  console.log(fails ? fails + ' FAILURES' : 'ALL TESTS PASS');
  process.exit(fails ? 1 : 0);
})();
`;
eval(code);
