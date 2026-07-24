// Top-level app — overlay window + mode switching + tweaks wiring
const APP_I = window.Icons;
const { LearningPanel, ClueFinderPanel, AssistivePanel, GuideLibraryPanel, PracticePanel } = window.Panels;
const SocialPanel = window.SocialPanel;
const GuideRail = window.GuideRail;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dock": "right",
  "showRail": true,
  "mode": "learning"
}/*EDITMODE-END*/;

const MODES = [
  { id: 'learning',  label: 'Learning',   Icon: APP_I.Brain,     Panel: LearningPanel },
  { id: 'cluefinder',label: 'Clue Finder',Icon: APP_I.Sparkle,   Panel: ClueFinderPanel },
  { id: 'live',      label: 'Live',       Icon: APP_I.Crosshair, Panel: AssistivePanel },
  { id: 'guides',    label: 'Guides',     Icon: APP_I.Book,      Panel: GuideLibraryPanel },
  { id: 'practice',  label: 'Practice',   Icon: APP_I.Wand,      Panel: PracticePanel },
  { id: 'social',    label: 'Social',     Icon: APP_I.Mic,       Panel: SocialPanel },
];

function BrowserChrome({ closed, onReopen }) {
  return (
    <div className="browser-chrome">
      <div className="browser-dots"><span /><span /><span /></div>
      <div className="browser-tabs">
        <div className="browser-tab active">
          <span className="tab-favicon">G</span>
          <span>GeoGuessr — World map</span>
        </div>
      </div>
      <div className="browser-url">
        <APP_I.Lock className="ic-sm" /> www.geoguessr.com/game/abXyZ8
      </div>
      <div style={{flex:1}} />
      <div className="ext-icons">
        <div className="ext-icon"><APP_I.Camera className="ic-sm" /></div>
        <div className="ext-icon"><APP_I.Settings className="ic-sm" /></div>
        <div className="ext-icon GeoVision" title={closed ? 'Reopen GeoVision' : 'GeoVision active'} onClick={onReopen}>
          <span style={{fontFamily:'var(--font-mono)', fontSize:10, fontWeight:700}}>GS</span>
        </div>
      </div>
    </div>
  );
}

function Pano({ mode, coach }) {
  // Pin positions vary by mode for visual variety
  const pins = mode === 'cluefinder' ? [
    { x: 22, y: 78, n: 1, tip: 'Double yellow lines — UK parking restriction' },
    { x: 80, y: 55, n: 2, tip: 'Red brick detached housing, tile-hung gables' },
    { x: 92, y: 78, n: 3, tip: 'UK number plate · yellow rear' },
  ] : mode === 'live' ? [
    { x: 22, y: 78, n: 1, tip: 'Double yellow lines (UK)' },
    { x: 78, y: 60, n: 2, tip: 'Red brick semi-detached housing' },
  ] : [];

  // Coach eye-trail — what a Master player would scan first
  const coachDots = [
    { x: 22, y: 78, n: 1, tip: 'Scan road markings first — fastest country signal' },
    { x: 92, y: 80, n: 2, tip: 'Check nearest license plate format & color' },
    { x: 78, y: 58, n: 3, tip: 'Read architectural vernacular — brick? render? wood?' },
    { x: 50, y: 50, n: 4, tip: 'Sky / vegetation for hemisphere & climate' },
    { x: 12, y: 60, n: 5, tip: 'Sweep periphery for street furniture & poles' },
  ];

  // Region narrowing — only in live mode
  const showRings = mode === 'live';

  return (
    <div className="pano">
      <div className="host-hud-top">
        <div className="host-hud-pill"><span className="label">Round</span><span className="value">3 / 5</span></div>
        <div className="host-hud-pill"><span className="label">Time</span><span className="value">02:14</span></div>
        <div className="host-hud-pill"><span className="label">Score</span><span className="value">11,420</span></div>
      </div>

      {coach && (
        <div className="coach-trail">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 1 L8 5 L0 9" fill="oklch(0.82 0.15 85)" />
              </marker>
            </defs>
            {coachDots.slice(0, -1).map((d, i) => {
              const next = coachDots[i+1];
              return (
                <line key={i} x1={d.x} y1={d.y} x2={next.x} y2={next.y}
                      stroke="oklch(0.82 0.15 85)" strokeWidth="0.4"
                      strokeDasharray="1.5 1.5" opacity="0.7" />
              );
            })}
          </svg>
          {coachDots.map(d => (
            <div key={d.n} className="coach-dot" style={{left:`${d.x}%`, top:`${d.y}%`}}>
              {d.n}
              <span className="coach-tip">{d.tip}</span>
            </div>
          ))}
        </div>
      )}
      {coach && (
        <div className="coach-legend">
          <span className="eyebrow">Coach</span>
          <span>Optimal scan path · 5 fixations · hover any dot</span>
        </div>
      )}

      {pins.map(p => (
        <div key={p.n} className="pano-pin" style={{left: `${p.x}%`, top: `${p.y}%`}}>
          <span className="pin-num">{p.n}</span>
          <span className="pin-tooltip">{p.tip}</span>
        </div>
      ))}
      <div className="pano-label">DEMO · suburban cul-de-sac · 1 image</div>
      <div className="pano-compass"><APP_I.Compass className="ic-lg" /></div>
      <div className="host-minimap">
        <span className="host-minimap-label">Guess map</span>
        {showRings && (
          <>
            {/* Europe ring — centered roughly on Central Europe */}
            <span className="region-ring r1" style={{top:'14%', left:'38%', width:'24%', height:'30%'}} />
            <span className="region-step" style={{top:'8%', left:'40%'}}>Europe · 89%</span>
            {/* UK ring — tighter, around British Isles */}
            <span className="region-ring r2" style={{top:'24%', left:'42%', width:'10%', height:'14%'}} />
            <span className="region-step" style={{top:'40%', left:'34%'}}>UK · 86%</span>
            {/* NW England — small ring at pin */}
            <span className="region-ring r3" style={{top:'30%', left:'44%', width:'4%', height:'6%'}} />
            <span className="region-step" style={{top:'62%', left:'40%'}}>NW England</span>
          </>
        )}
        <span className="host-minimap-pin" />
      </div>
    </div>
  );
}

function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [minimized, setMinimized] = React.useState(false);
  const [closed, setClosed] = React.useState(false);
  const [coach, setCoach] = React.useState(false);
  const reopen = () => { setClosed(false); setMinimized(false); };
  const mode = MODES.find(m => m.id === tweaks.mode) || MODES[0];
  const ActivePanel = mode.Panel;

  // The Guide Library mode replaces the rail with a full-bleed view
  const showRail = tweaks.showRail && tweaks.mode !== 'guides';

  return (
    <>
      <div className="stage">
        <BrowserChrome closed={closed} onReopen={reopen} />
        <Pano mode={tweaks.mode} coach={coach} />

        <button className={`coach-toggle ${coach?'active':''}`} onClick={() => setCoach(c=>!c)} title="Toggle Master scan path">
          <APP_I.Eye className="ic-sm" /> Coach {coach ? 'on' : 'off'}
        </button>

        <div className={`overlay dock-${tweaks.dock} ${showRail ? 'with-rail' : ''} ${minimized ? 'is-minimized' : ''}`} style={closed ? {display:'none'} : null} data-screen-label="Overlay">
          <div className="titlebar">
            <div className="brand">
              <span className="brand-mark">GS</span>
              <span>GeoVision</span>
              <span className="brand-version">v0.4 · beta</span>
            </div>
            <div className="titlebar-spacer" />
            <button className={`titlebar-btn ${showRail?'active':''}`} title="Toggle field guide" onClick={() => setTweak('showRail', !tweaks.showRail)}>
              <APP_I.Book className="ic-sm" />
            </button>
            <button className="titlebar-btn" title="Dock"
                    onClick={() => setTweak('dock', tweaks.dock==='right'?'left':tweaks.dock==='left'?'float':'right')}>
              {tweaks.dock==='float' ? <APP_I.Float className="ic-sm" /> : <APP_I.Dock className="ic-sm" style={{transform: tweaks.dock==='left'?'scaleX(-1)':'none'}} />}
            </button>
            <button className="titlebar-btn" title="Minimize" onClick={() => setMinimized(m => !m)}><APP_I.Minus className="ic-sm" /></button>
            <button className="titlebar-btn" title="Close" onClick={() => setClosed(true)}><APP_I.X className="ic-sm" /></button>
          </div>

          <div className="mode-tabs">
            {MODES.map(m => (
              <div key={m.id}
                   className={`mode-tab ${m.id===tweaks.mode?'active':''}`}
                   onClick={() => setTweak('mode', m.id)}>
                <m.Icon className="ic-sm" /> {m.label}
              </div>
            ))}
          </div>

          <div className="overlay-body">
            <div className="main-col">
              <ActivePanel />
            </div>
            {showRail && <GuideRail />}
          </div>

          <div className="statusbar">
            {tweaks.mode==='live'
              ? <><span className="live"><span className="status-dot" />LIVE STREAM</span><span className="sep">·</span><span>2.1 fps</span></>
              : <><span className="status-dot" /><span>READY</span><span className="sep">·</span><span>haiku-4-5</span></>}
            <span className="statusbar-spacer" />
            <span>⌥G to toggle</span>
            <span className="sep">·</span>
            <span>{tweaks.dock.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Tweaks panel */}
      <window.TweaksPanel title="GeoVision Tweaks">
        <window.TweakSection label="Position">
          <window.TweakRadio label="Dock"
            options={[
              { value:'left', label:'Left' },
              { value:'right', label:'Right' },
              { value:'float', label:'Float' },
            ]}
            value={tweaks.dock}
            onChange={(v)=>setTweak('dock', v)} />
        </window.TweakSection>

        <window.TweakSection label="Layout">
          <window.TweakToggle label="Show field guide rail"
            value={tweaks.showRail}
            onChange={(v)=>setTweak('showRail', v)} />
        </window.TweakSection>

        <window.TweakSection label="Mode">
          <window.TweakSelect label="Active mode"
            value={tweaks.mode}
            options={MODES.map(m=>({value:m.id, label:m.label}))}
            onChange={(v)=>setTweak('mode', v)} />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
