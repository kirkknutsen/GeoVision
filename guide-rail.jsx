// Guide rail — collapsible category disclosure list
const GR_I = window.Icons;
const { GUIDE_CATEGORIES: GR_CATS } = window.GS_DATA;

function GuideRail() {
  const [open, setOpen] = React.useState({ plates: true, poles: true });
  const toggle = (id) => setOpen(o => ({...o, [id]: !o[id]}));

  return (
    <div className="guide-rail">
      <div className="guide-rail-head">
        <span className="title">Field guide</span>
        <span className="muted tiny mono">158</span>
      </div>
      <div className="guide-rail-search">
        <div className="guide-rail-search-wrap">
          <GR_I.Search className="ic-sm" />
          <input type="text" placeholder="Search 158 guides…" />
        </div>
      </div>
      <div className="guide-rail-body">
        {GR_CATS.map(cat => (
          <div key={cat.id} className={`disclosure ${open[cat.id] ? 'open' : ''}`}>
            <button className="disclosure-head" onClick={() => toggle(cat.id)}>
              <GR_I.ChevronRight className="ic-sm chev" />
              <span className="cat-icon">
                {cat.id==='plates' && <GR_I.Layers className="ic-sm" />}
                {cat.id==='poles' && <GR_I.Pin className="ic-sm" />}
                {cat.id==='bollards' && <GR_I.Crosshair className="ic-sm" />}
                {cat.id==='lines' && <GR_I.Move className="ic-sm" />}
                {cat.id==='signs' && <GR_I.Wand className="ic-sm" />}
                {cat.id==='script' && <GR_I.Book className="ic-sm" />}
                {cat.id==='driving' && <GR_I.Compass className="ic-sm" />}
              </span>
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.entries.length}</span>
            </button>
            <div className="disclosure-body">
              {cat.entries.map((e, i) => (
                <div key={i} className={`guide-entry ${cat.id==='poles' && i===0 ? 'active' : ''}`}>
                  <div className="guide-thumb" style={{background: e.tone}} />
                  <div className="guide-meta">
                    <div className="guide-name">{e.name}</div>
                    <div className="guide-sub">{e.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.GuideRail = GuideRail;
