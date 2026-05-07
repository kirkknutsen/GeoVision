// Mode panels — Learning, Clue Finder, Assistive Live, Guide Library, Practice
const I = window.Icons;
const { COUNTRIES, GUIDE_CATEGORIES, LEARNING_CLUES, CONFIDENCE } = window.GS_DATA;

// Tiny flag swatch
const Flag = ({ code, w = 14, h = 10 }) => (
  <span className="flag-square" style={{ width: w, height: h, background: COUNTRIES[code]?.flag || '#444' }} />
);

/* ---------- Learning Mode ---------- */
function LearningPanel() {
  const [revealed, setRevealed] = React.useState(2);
  return (
    <>
      <div className="section">
        <div className="section-head">
          <span className="section-title">Current round</span>
          <span className="muted tiny mono">auto-captured · 0:42 ago</span>
        </div>
        <div className="capture-card">
          <div className="capture-thumb">
            <span className="capture-thumb-tag">PANO · 360°</span>
          </div>
          <div className="score-row">
            <span>Clues revealed <span className="num">{revealed}/7</span></span>
            <span>Score <span className="num">1/1</span></span>
          </div>
          <div className="progress"><div className="progress-fill" style={{width: `${(revealed/7)*100}%`}} /></div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <span className="section-title">Possible countries</span>
          <span className="section-action"><I.Filter className="ic-sm" /> filter</span>
        </div>
        <div className="country-chips">
          <span className="country-chip revealed correct"><Flag code="GB" /> United Kingdom</span>
          <span className="country-chip hidden-clue">??? · 2nd</span>
          <span className="country-chip hidden-clue">??? · 3rd</span>
          <span className="country-chip hidden-clue">??? · 4th</span>
          <span className="country-chip hidden-clue">??? · 5th</span>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <span className="section-title">Clue thread</span>
          <span className="section-action" onClick={() => setRevealed(Math.min(7, revealed+1))}><I.Plus className="ic-sm" /> reveal next</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap: 8}}>
          {LEARNING_CLUES.map((c, i) => {
            const state = i < revealed-1 ? 'revealed' : i === revealed-1 ? 'live' : 'locked';
            return (
              <div key={c.num} className={`clue-card ${state}`}>
                {state === 'locked' && <I.Lock className="ic-sm lock-icon" />}
                <div className="clue-card-head">
                  <span className="clue-card-num">#{c.num}</span>
                  <span className={`clue-card-cat ${state==='locked'?'locked':''}`}>· {state==='locked' ? '████ ███████' : c.cat}</span>
                </div>
                <div className="clue-card-body">
                  {state==='locked' ? <span className="muted">Locked — guess to unlock the next clue.</span> : c.body}
                </div>
                {c.foot && state!=='locked' && <div className="clue-card-foot">{c.foot}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="section">
        <div style={{display:'flex', gap: 6}}>
          <button className="btn btn-primary btn-block"><I.Eye className="ic-sm" /> Reveal next clue</button>
          <button className="btn"><I.Refresh className="ic-sm" /></button>
        </div>
      </div>
    </>
  );
}

/* ---------- Clue Finder ---------- */
function ClueFinderPanel() {
  return (
    <>
      <div className="section">
        <div className="section-head">
          <span className="section-title">Source image</span>
          <span className="section-action"><I.Crop className="ic-sm" /> crop</span>
        </div>
        <div className="capture-card">
          <div className="capture-thumb" style={{background:'linear-gradient(135deg,#3d4837,#2a3024)'}}>
            <span className="capture-thumb-tag">UPLOAD · 1.4 MB</span>
          </div>
          <div className="capture-actions">
            <button className="btn btn-block"><I.Camera className="ic-sm" /> Auto-capture</button>
            <button className="btn"><I.Plus className="ic-sm" /></button>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <span className="section-title">Confidence</span>
          <span className="muted tiny mono">streamed · 0.8s</span>
        </div>
        <div className="confidence-list">
          {CONFIDENCE.map((c, i) => (
            <div key={c.code} className={`conf-row ${i>0?'dim':''}`}>
              <Flag code={c.code} w={20} h={14} />
              <div className="conf-stack">
                <div className="conf-stack-top">
                  <span className="country-name">{COUNTRIES[c.code].name}<span className="meta">· {c.note}</span></span>
                  <span className="pct">{c.pct}%</span>
                </div>
                <div className="conf-bar"><div className="conf-bar-fill" style={{width:`${c.pct}%`}} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <span className="section-title">Reasoning</span>
          <span className="section-action mono tiny">3 pins on pano →</span>
        </div>
        <div className="stream-block">
          <p style={{margin:'0 0 8px'}}>The clearest tell is the <mark>double yellow lines</mark> hugging both kerbs — a near-exclusive <strong>United Kingdom</strong> parking convention <span className="clue-tag"><I.Pin className="ic-sm" /> pin 1</span>.</p>
          <p style={{margin:'0 0 8px'}}>The <mark>red brick semi-detached and detached houses</mark> with mock-Tudor accents, tile-hung gables, and integrated garages match late-20th-century English suburban estate development <span className="clue-tag"><I.Pin className="ic-sm" /> pin 2</span>.</p>
          <p style={{margin:0}}>A glimpse of a <mark>yellow rear number plate</mark> on the right-most car confirms a UK-registered vehicle <span className="clue-tag"><I.Pin className="ic-sm" /> pin 3</span>. Most likely a Cheshire / Greater Manchester / West Midlands estate.<span className="cursor" /></p>
        </div>
      </div>
    </>
  );
}

/* ---------- Assistive Live ---------- */
function AssistivePanel() {
  return (
    <>
      <div className="section">
        <div className="section-head">
          <span className="section-title">Live capture</span>
          <span className="section-action mono tiny" style={{color:'var(--coral)'}}><span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:'var(--coral)',marginRight:4,verticalAlign:1}} /> recording</span>
        </div>
        <div className="capture-card" style={{borderStyle:'solid', borderColor:'color-mix(in oklch, var(--coral) 25%, var(--hairline))'}}>
          <div className="capture-thumb">
            <span className="capture-thumb-tag" style={{background:'color-mix(in oklch, var(--coral) 60%, #000)'}}>● LIVE · 12s</span>
          </div>
          <div className="capture-actions">
            <button className="btn btn-block"><I.Pause className="ic-sm" /> Pause stream</button>
            <button className="btn"><I.Mic className="ic-sm" /></button>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <span className="section-title">Top guess</span>
          <span className="muted tiny mono">updates every 2s</span>
        </div>
        <div className="conf-row">
          <Flag code="GB" w={26} h={18} />
          <div className="conf-stack">
            <div className="conf-stack-top">
              <span className="country-name" style={{fontSize:14}}>United Kingdom <span className="meta">· suburban estate</span></span>
              <span className="pct" style={{fontSize:13, color:'var(--amber)'}}>89%</span>
            </div>
            <div className="conf-bar" style={{height:6}}><div className="conf-bar-fill" style={{width:'89%'}} /></div>
          </div>
        </div>
        <div style={{display:'flex', gap: 6, marginTop: 10}}>
          <span className="country-chip"><Flag code="IE" /> Ireland 6%</span>
          <span className="country-chip"><Flag code="DE" /> Germany 3%</span>
          <span className="country-chip"><Flag code="NO" /> Norway 2%</span>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <span className="section-title">Live reasoning</span>
        </div>
        <div className="stream-block">
          <p style={{margin:'0 0 8px'}}>Picking up <mark>double yellow lines</mark> along both kerbs — that's a <strong>UK</strong>-specific parking restriction <span className="clue-tag"><I.Pin className="ic-sm" /> pin 1</span>.</p>
          <p style={{margin:'0 0 8px'}}>Red brick semi-detached + detached homes with mock-Tudor and tile-hung gables <span className="clue-tag"><I.Pin className="ic-sm" /> pin 2</span> — late-20th-century English estate vernacular.</p>
          <p style={{margin:0}}>Sun angle and clear blue sky suggest mid-day, late spring. Most likely <mark>NW England</mark> — Cheshire or south Manchester suburb.<span className="cursor" /></p>
        </div>
      </div>

      <div className="section">
        <div className="section-head"><span className="section-title">Suggested action</span></div>
        <button className="btn btn-primary btn-block"><I.Crosshair className="ic-sm" /> Place pin near Warrington, UK</button>
      </div>
    </>
  );
}

/* ---------- Guide Library (full-bleed) ---------- */
function GuideLibraryPanel() {
  const [activeCat, setActiveCat] = React.useState('plates');
  const cat = GUIDE_CATEGORIES.find(c => c.id === activeCat);
  return (
    <>
      <div className="section" style={{paddingBottom:8}}>
        <div className="section-head">
          <span className="section-title">Browse meta</span>
          <span className="muted tiny mono">158 entries</span>
        </div>
        <div className="guide-rail-search-wrap">
          <I.Search className="ic-sm" />
          <input type="text" placeholder="Search guides… (try 'kilometer post')" />
        </div>
      </div>
      <div style={{display:'flex', flexWrap:'wrap', gap:6, padding:'0 16px 14px'}}>
        {GUIDE_CATEGORIES.map(c => (
          <button key={c.id} className={`btn ${c.id===activeCat?'btn-primary':''}`} style={{padding:'5px 9px', fontSize:11}} onClick={()=>setActiveCat(c.id)}>
            {c.name}
          </button>
        ))}
      </div>
      <div className="section">
        <div className="section-head">
          <span className="section-title">{cat.name}</span>
          <span className="muted tiny mono">{cat.entries.length} variants</span>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
          {cat.entries.map((e, i) => (
            <div key={i} className="guide-entry" style={{padding:10, background:'var(--surface-0)', border:'1px solid var(--hairline)', borderRadius:'var(--r-md)'}}>
              <div className="guide-thumb" style={{width:48, height:38, background:e.tone}} />
              <div className="guide-meta">
                <div className="guide-name">{e.name}</div>
                <div className="guide-sub">{e.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <div className="section-head"><span className="section-title">Quick reference card</span></div>
        <div className="stream-block">
          <p style={{margin:'0 0 6px'}}><strong>{cat.entries[0].name}</strong></p>
          <p style={{margin:'0 0 6px', color:'var(--ink-300)', fontSize:12}}>Look for: rectangular plate, blue strip with country code on the left, yellow/white field, black sans-serif characters.</p>
          <p style={{margin:0, color:'var(--ink-400)', fontSize:11}} className="mono">SEEN IN: 27 EU countries · UK uses similar w/o EU strip post-2021</p>
        </div>
      </div>
    </>
  );
}

/* ---------- Practice / Quiz ---------- */
function PracticePanel() {
  return (
    <>
      <div className="section">
        <div className="section-head">
          <span className="section-title">Practice deck · poles</span>
          <span className="muted tiny mono">3/12 · streak 4</span>
        </div>
        <div className="quiz-progress-row">
          {Array.from({length:12}).map((_,i) => (
            <span key={i} className={`quiz-step ${i<3?'done':i===3?'current':''}`} />
          ))}
        </div>
        <div className="quiz-prompt">
          <div className="quiz-prompt-img">
            <span className="quiz-prompt-tag">QUESTION 04</span>
          </div>
          <div className="quiz-question">Which country uses concrete utility poles with yellow/black diagonal hazard stripes near the base?</div>
        </div>
        <div className="quiz-options">
          {[
            { k:'A', country:'KR', label:'South Korea', state:'correct' },
            { k:'B', country:'JP', label:'Japan' },
            { k:'C', country:'TW', label:'Taiwan' },
            { k:'D', country:'CN', label:'China' },
          ].map(o => (
            <div key={o.k} className={`quiz-option ${o.state||''}`}>
              <span className="key">{o.k}</span>
              <Flag code={o.country} />
              <span style={{flex:1}}>{o.label}</span>
              {o.state==='correct' && <I.Check className="ic-sm" style={{color:'var(--moss)'}} />}
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <div className="section-head"><span className="section-title">Why</span></div>
        <div className="stream-block" style={{fontSize:12}}>
          <strong>South Korea</strong> uses these poles broadly across rural roads. Japan favors wood twin-arm poles, Taiwan typically uses bare concrete without the hazard banding.
        </div>
        <button className="btn btn-primary btn-block" style={{marginTop:10}}><I.ChevronRight className="ic-sm" /> Next question</button>
      </div>
    </>
  );
}

window.Panels = { LearningPanel, ClueFinderPanel, AssistivePanel, GuideLibraryPanel, PracticePanel, Flag };
