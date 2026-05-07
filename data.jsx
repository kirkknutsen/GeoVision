// Reference data — guides, countries, clues
const COUNTRIES = {
  SE: { name: 'Sweden',         flag: 'linear-gradient(180deg,#006aa7 50%,#fecc00 50%)' },
  FR: { name: 'France',          flag: 'linear-gradient(90deg,#0055a4 33%,#fff 33%,#fff 66%,#ef4135 66%)' },
  KR: { name: 'South Korea',    flag: 'radial-gradient(circle at 50% 50%,#cd2e3a 0 8%,#fff 8% 50%, transparent 50%), linear-gradient(180deg,#fff,#fff)' },
  JP: { name: 'Japan',           flag: 'radial-gradient(circle at 50% 50%,#bc002d 0 30%,#fff 30%)' },
  IE: { name: 'Ireland',         flag: 'linear-gradient(90deg,#169b62 33%,#fff 33%,#fff 66%,#ff883e 66%)' },
  DE: { name: 'Germany',         flag: 'linear-gradient(180deg,#000 33%,#dd0000 33% 66%,#ffce00 66%)' },
  NO: { name: 'Norway',          flag: 'linear-gradient(180deg,#ef2b2d 0 35%,#fff 35% 40%,#002868 40% 60%,#fff 60% 65%,#ef2b2d 65%)' },
  DK: { name: 'Denmark',         flag: '#c8102e' },
  GB: { name: 'United Kingdom',  flag: 'linear-gradient(180deg,#012169,#012169)' },
  ES: { name: 'Spain',           flag: 'linear-gradient(180deg,#aa151b 25%,#f1bf00 25% 75%,#aa151b 75%)' },
  TW: { name: 'Taiwan',          flag: '#fe0000' },
  CN: { name: 'China',           flag: '#de2910' },
};

const GUIDE_CATEGORIES = [
  {
    id: 'plates',
    name: 'License plates',
    sub: '34 entries · 18 countries',
    entries: [
      { name: 'EU yellow rear', sub: 'EU · post-1998', tone: 'linear-gradient(90deg,#003399 14%,#ffd700 14%)' },
      { name: 'EU white square', sub: 'DE / NL / PL', tone: 'linear-gradient(90deg,#003399 12%,#fff 12%)' },
      { name: 'JP green-on-white', sub: 'Japan · kei',  tone: 'linear-gradient(180deg,#fff,#e8e8e8)' },
      { name: 'US state plate',   sub: 'USA · varies',   tone: 'linear-gradient(180deg,#cfd9e4,#94a4b8)' },
      { name: 'KR white-and-green', sub: 'South Korea',  tone: 'linear-gradient(180deg,#fff 60%,#1d8b4b 60%)' },
      { name: 'AU yellow / black', sub: 'Australia',     tone: 'linear-gradient(180deg,#f7c81b,#dfa600)' },
    ],
  },
  {
    id: 'poles',
    name: 'Telephone & utility poles',
    sub: '22 entries · 14 countries',
    entries: [
      { name: 'KR concrete + yellow stripe', sub: 'S. Korea · rural', tone: 'linear-gradient(180deg,#bdb6a8,#8a8470)' },
      { name: 'JP twin-arm wood',           sub: 'Japan',             tone: 'linear-gradient(180deg,#7e6a4e,#5a4a32)' },
      { name: 'SE T-shaped wood',           sub: 'Nordics',           tone: 'linear-gradient(180deg,#6f5a3c,#3e3220)' },
      { name: 'NA cross-arm wood',          sub: 'US / Canada',       tone: 'linear-gradient(180deg,#5d4a32,#3a2e1c)' },
      { name: 'BR concrete H-frame',        sub: 'S. America',         tone: 'linear-gradient(180deg,#a39c8e,#6a6258)' },
    ],
  },
  {
    id: 'bollards',
    name: 'Bollards',
    sub: '28 entries · 19 countries',
    entries: [
      { name: 'FR red strip',              sub: 'France',         tone: 'linear-gradient(180deg,#fff 70%,#e30000 70%)' },
      { name: 'IT white + red',            sub: 'Italy',          tone: 'linear-gradient(180deg,#fff 50%,#e30000 50%)' },
      { name: 'NL yellow / black',         sub: 'Netherlands',    tone: 'linear-gradient(180deg,#fcd116 50%,#222 50%)' },
      { name: 'DE black + white stripes',  sub: 'Germany',        tone: 'linear-gradient(180deg,#fff 40%,#222 40% 70%,#fff 70%)' },
      { name: 'CH white tipped',           sub: 'Switzerland',    tone: 'linear-gradient(180deg,#fff 70%,#000 70%)' },
    ],
  },
  {
    id: 'lines',
    name: 'Road lines & markings',
    sub: '19 entries · 26 countries',
    entries: [
      { name: 'EU white edge / yellow center', sub: 'Norway · Iceland', tone: 'linear-gradient(180deg,#3a3a3a 30%,#ffd700 33% 36%,#3a3a3a 36%)' },
      { name: 'White centerline only',         sub: 'UK / IE / EU',     tone: 'linear-gradient(180deg,#3a3a3a 45%,#fff 48% 52%,#3a3a3a 52%)' },
      { name: 'Yellow + white US',            sub: 'USA · Canada',     tone: 'linear-gradient(180deg,#3a3a3a 30%,#ffd700 33% 36%,#3a3a3a 36% 64%,#fff 64% 67%,#3a3a3a 67%)' },
    ],
  },
  {
    id: 'signs',
    name: 'Signage',
    sub: '41 entries · all regions',
    entries: [
      { name: 'Octagon STOP red',     sub: 'global',          tone: '#cc1f1f' },
      { name: 'Yield triangle EU',    sub: 'Europe',          tone: 'linear-gradient(180deg,#fff,#e0e0e0)' },
      { name: 'Chevron yellow',       sub: 'KR · TW · JP',    tone: '#fcd116' },
    ],
  },
  {
    id: 'script',
    name: 'Language & script',
    sub: '12 entries · scripts',
    entries: [
      { name: 'Hangul ㄱㄴㄷ',         sub: 'Korea',           tone: 'linear-gradient(135deg,#1d1d1d,#3a3a3a)' },
      { name: 'Hiragana / Kanji',     sub: 'Japan',           tone: 'linear-gradient(135deg,#2a2222,#3a2a2a)' },
      { name: 'Cyrillic',             sub: 'RU · BG · UA',    tone: 'linear-gradient(135deg,#222a3a,#2a3445)' },
      { name: 'Arabic',               sub: 'MENA',            tone: 'linear-gradient(135deg,#2a2418,#3a3020)' },
      { name: 'Thai',                 sub: 'Thailand',        tone: 'linear-gradient(135deg,#2a2030,#3a2a40)' },
    ],
  },
  {
    id: 'driving',
    name: 'Driving side',
    sub: '2 entries',
    entries: [
      { name: 'LHT (left-hand traffic)', sub: 'UK · JP · AU · IN', tone: 'linear-gradient(90deg,#3a3a3a 50%,#222 50%)' },
      { name: 'RHT (right-hand traffic)', sub: 'most of world',    tone: 'linear-gradient(90deg,#222 50%,#3a3a3a 50%)' },
    ],
  },
];

const LEARNING_CLUES = [
  { num: 1, cat: 'Sky & vegetation', body: 'Bright clear blue sky with high cirrus, mature deciduous trees in spring leaf — temperate maritime climate.', foot: 'Northwest / Atlantic Europe likely.', state: 'revealed' },
  { num: 2, cat: 'Road markings', body: 'Double yellow lines along both kerbs — a UK-specific "no waiting at any time" parking restriction.', foot: 'Restricts to UK · Ireland uses single/double yellow but with different conventions.', state: 'live' },
  { num: 3, cat: 'Architecture', state: 'locked' },
  { num: 4, cat: 'Driving side', state: 'locked' },
  { num: 5, cat: 'Vehicles & plates', state: 'locked' },
  { num: 6, cat: 'Street furniture', state: 'locked' },
  { num: 7, cat: 'Final tell', state: 'locked' },
];

const CONFIDENCE = [
  { code: 'GB', pct: 86, note: 'double yellows + red brick semi-detached' },
  { code: 'IE', pct: 8,  note: 'similar housing, different road markings' },
  { code: 'NO', pct: 3,  note: 'climate match only' },
  { code: 'DK', pct: 2,  note: 'climate match only' },
];

window.GS_DATA = { COUNTRIES, GUIDE_CATEGORIES, LEARNING_CLUES, CONFIDENCE };
