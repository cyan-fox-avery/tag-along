/* art-data.js — derpy shark art module (split from script.js in v0.11.0).
   Loaded BEFORE script.js; ART is global and read at render time. */

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
  </svg>`,
  tiger: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Tiger shark">
    <polygon points="160,54 200,32 198,86" fill="#5a6a72"/>
    <ellipse cx="100" cy="58" rx="64" ry="20" fill="#6b7d85"/>
    <ellipse cx="100" cy="66" rx="56" ry="11" fill="#d3dce0" opacity="0.8"/>
    <polygon points="108,39 120,22 128,39" fill="#5a6a72"/>
    <polygon points="86,74 76,94 98,75" fill="#5a6a72"/>
    <circle cx="50" cy="53" r="3.2" fill="#1c2733"/>
    <circle cx="51.2" cy="51.8" r="1.1" fill="#ffffff"/>
    <g stroke="#4c5b63" stroke-width="3.4" opacity="0.5" stroke-linecap="round">
      <line x1="92" y1="42" x2="90" y2="72"/>
      <line x1="106" y1="40" x2="104" y2="74"/>
      <line x1="120" y1="42" x2="118" y2="72"/>
      <line x1="134" y1="46" x2="132" y2="68"/>
    </g>
  </svg>`,
  sandtiger: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Sand tiger shark">
    <polygon points="162,52 202,30 200,84" fill="#6e6250"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#7d6f5b"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#ddd2bd" opacity="0.8"/>
    <polygon points="110,41 120,24 128,41" fill="#6e6250"/>
    <polygon points="138,42 146,28 152,42" fill="#6e6250"/>
    <polygon points="88,72 78,92 100,73" fill="#6e6250"/>
    <polygon points="42,58 22,52 22,64" fill="#7d6f5b"/>
    <g stroke="#ece5d3" stroke-width="1.6" stroke-linecap="round">
      <line x1="29" y1="55" x2="25" y2="60"/>
      <line x1="33" y1="57" x2="29" y2="62"/>
    </g>
    <circle cx="52" cy="52" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="50.8" r="1.1" fill="#ffffff"/>
  </svg>`,
  galapagos: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Galapagos shark">
    <polygon points="158,54 200,34 198,84" fill="#5f6b66"/>
    <ellipse cx="100" cy="58" rx="64" ry="19" fill="#6e7b75"/>
    <ellipse cx="100" cy="66" rx="56" ry="11" fill="#d5dcd6" opacity="0.8"/>
    <polygon points="106,40 118,22 128,40" fill="#5f6b66"/>
    <polygon points="86,74 76,94 98,75" fill="#5f6b66"/>
    <polygon points="40,58 22,52 22,64" fill="#6e7b75"/>
    <circle cx="48" cy="53" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="51.8" r="1.1" fill="#ffffff"/>
  </svg>`,
  greatwhite: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Great white shark">
    <polygon points="160,54 204,30 200,88" fill="#5a6470"/>
    <ellipse cx="102" cy="56" rx="66" ry="20" fill="#6b7683"/>
    <ellipse cx="102" cy="65" rx="58" ry="12" fill="#eef1f3" opacity="0.9"/>
    <polygon points="110,37 124,16 132,37" fill="#5a6470"/>
    <polygon points="88,72 76,94 100,73" fill="#5a6470"/>
    <polygon points="40,56 22,50 22,62" fill="#6b7683"/>
    <circle cx="52" cy="51" r="3.4" fill="#14181d"/>
  </svg>`,
  hammerhead: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Great hammerhead shark">
    <polygon points="160,54 200,32 198,86" fill="#5e6a70"/>
    <ellipse cx="112" cy="58" rx="58" ry="18" fill="#6d7a81"/>
    <ellipse cx="112" cy="66" rx="50" ry="10" fill="#d8dee1" opacity="0.8"/>
    <rect x="18" y="48" width="56" height="16" rx="8" fill="#6d7a81"/>
    <circle cx="27" cy="56" r="2.6" fill="#1c2733"/>
    <circle cx="65" cy="56" r="2.6" fill="#1c2733"/>
    <polygon points="118,41 130,24 138,41" fill="#5e6a70"/>
    <polygon points="96,72 86,92 108,73" fill="#5e6a70"/>
  </svg>`,
  mako: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Shortfin mako shark">
    <polygon points="162,54 206,34 202,84" fill="#3f5a7a"/>
    <ellipse cx="104" cy="56" rx="64" ry="16" fill="#4a6a8c"/>
    <ellipse cx="104" cy="63" rx="56" ry="9" fill="#dbe4ee" opacity="0.85"/>
    <polygon points="110,41 122,24 130,41" fill="#3f5a7a"/>
    <polygon points="90,70 80,90 102,71" fill="#3f5a7a"/>
    <polygon points="42,56 24,50 24,62" fill="#4a6a8c"/>
    <circle cx="54" cy="51" r="3.2" fill="#14181d"/>
    <circle cx="55.2" cy="49.8" r="1.1" fill="#ffffff"/>
  </svg>`,
  basking: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Basking shark">
    <polygon points="170,54 206,36 204,84" fill="#5c5a52"/>
    <ellipse cx="104" cy="57" rx="70" ry="22" fill="#6b695f"/>
    <ellipse cx="104" cy="66" rx="60" ry="12" fill="#d9d5c8" opacity="0.7"/>
    <polygon points="112,36 124,18 132,36" fill="#5c5a52"/>
    <circle cx="56" cy="52" r="2.6" fill="#1c2733"/>
    <g stroke="#4a4840" stroke-width="2" stroke-linecap="round">
      <line x1="76" y1="44" x2="74" y2="68"/>
      <line x1="86" y1="43" x2="84" y2="69"/>
      <line x1="96" y1="43" x2="94" y2="69"/>
    </g>
  </svg>`,
  epaulette: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Epaulette shark">
    <polygon points="168,56 200,42 198,76" fill="#7a6a4e"/>
    <ellipse cx="108" cy="60" rx="58" ry="13" fill="#8a795c"/>
    <ellipse cx="108" cy="65" rx="50" ry="8" fill="#ded3b8" opacity="0.8"/>
    <polygon points="118,48 126,36 132,48" fill="#7a6a4e"/>
    <circle cx="62" cy="56" r="2.8" fill="#1c2733"/>
    <g fill="#4e4130" opacity="0.8">
      <circle cx="90" cy="56" r="3"/><circle cx="110" cy="58" r="3"/><circle cx="130" cy="57" r="3"/>
      <circle cx="150" cy="58" r="2.5"/>
    </g>
    <circle cx="140" cy="52" r="4" fill="none" stroke="#4e4130" stroke-width="2"/>
  </svg>`,
  lemon: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Lemon shark">
    <polygon points="160,54 200,36 198,84" fill="#a08c3c"/>
    <ellipse cx="100" cy="60" rx="64" ry="19" fill="#c9b458"/>
    <ellipse cx="100" cy="68" rx="56" ry="11" fill="#e8d998" opacity="0.8"/>
    <polygon points="102,42 112,24 122,42" fill="#a08c3c"/>
    <polygon points="136,43 144,28 150,43" fill="#a08c3c"/>
    <polygon points="88,76 78,96 100,77" fill="#a08c3c"/>
    <circle cx="52" cy="55" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="53.8" r="1.1" fill="#ffffff"/>
    <g stroke="#8a7434" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
      <line x1="84" y1="51" x2="82" y2="67"/>
    </g>
  </svg>`,
  blacktip: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Blacktip reef shark">
    <polygon points="160,54 200,36 198,84" fill="#6e757e"/>
    <polygon points="190,41 200,36 199,54" fill="#1c2733"/>
    <ellipse cx="100" cy="60" rx="64" ry="19" fill="#8a9199"/>
    <ellipse cx="100" cy="68" rx="56" ry="11" fill="#dfe3e6" opacity="0.8"/>
    <polygon points="104,42 114,24 124,42" fill="#6e757e"/>
    <polygon points="107,31 114,24 120,31" fill="#1c2733"/>
    <polygon points="88,76 78,96 100,77" fill="#6e757e"/>
    <polygon points="79,90 78,96 89,90" fill="#1c2733"/>
    <circle cx="52" cy="55" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="53.8" r="1.1" fill="#ffffff"/>
    <g stroke="#5a6167" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
      <line x1="84" y1="51" x2="82" y2="67"/>
    </g>
  </svg>`,
  whitetip: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Whitetip reef shark">
    <polygon points="160,54 200,36 198,84" fill="#9aa0a3"/>
    <polygon points="190,41 200,36 199,54" fill="#f4f6f7"/>
    <ellipse cx="100" cy="60" rx="64" ry="19" fill="#b4b9bc"/>
    <ellipse cx="100" cy="68" rx="56" ry="11" fill="#eef0f1" opacity="0.8"/>
    <polygon points="104,42 114,24 124,42" fill="#9aa0a3"/>
    <polygon points="107,31 114,24 120,31" fill="#f4f6f7"/>
    <polygon points="88,76 78,96 100,77" fill="#9aa0a3"/>
    <polygon points="79,90 78,96 89,90" fill="#f4f6f7"/>
    <circle cx="52" cy="55" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="53.8" r="1.1" fill="#ffffff"/>
    <g stroke="#7d8387" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
      <line x1="84" y1="51" x2="82" y2="67"/>
    </g>
  </svg>`
};
