// Social panel — Friends / Chat / Leaderboard
const SOC_I = window.Icons;
const { COUNTRIES: SOC_COUNTRIES } = window.GS_DATA;

const FRIENDS = [
  { name: 'maya.k',          status: 'In a duel · Norway',  online: true,  rank: 'Master I',   color: '#d97757' },
  { name: 'leo_routes',      status: 'Streaming · Country', online: true,  rank: 'Diamond III', color: '#5a7ed1' },
  { name: 'tessellate',      status: 'Online',              online: true,  rank: 'Champion',   color: '#7a5ae0' },
  { name: 'pixel_pilgrim',   status: 'Last seen 2h ago',    online: false, rank: 'Master III',  color: '#3a8a5a' },
  { name: 'sven.compass',    status: 'Last seen 1d ago',    online: false, rank: 'Diamond I',   color: '#c8975a' },
  { name: 'route66.kim',     status: 'Last seen 3d ago',    online: false, rank: 'Platinum II', color: '#5a8aa8' },
];

const CHAT_THREADS = [
  { id: 'maya',     name: 'maya.k',       last: 'one more round?',  unread: 2,  color: '#d97757', online: true },
  { id: 'crew',     name: 'NCM crew',     last: 'leo: that was Korea I swear', unread: 7, group: true, color: '#7a5ae0', online: true },
  { id: 'leo',      name: 'leo_routes',   last: 'check the meta on bollards',  unread: 0, color: '#5a7ed1', online: true },
  { id: 'tess',     name: 'tessellate',   last: 'gg!',                          unread: 0, color: '#7a5ae0', online: true },
];

const CHAT_HISTORY = {
  maya: [
    { from: 'them', name: 'maya.k', body: 'how did you get that one so fast', time: '2:14p' },
    { from: 'me',   body: 'GeoSight pinned the double yellows + brick semis', time: '2:14p' },
    { from: 'me',   body: 'gave me UK in like 3 seconds', time: '2:14p' },
    { from: 'them', name: 'maya.k', body: "ok i'm switching extensions", time: '2:15p' },
    { from: 'them', name: 'maya.k', body: 'one more round?', time: '2:18p' },
  ],
  crew: [
    { from: 'them', name: 'tessellate', body: 'who saw that Mongolia round', time: '1:42p' },
    { from: 'them', name: 'leo_routes', body: 'that was Korea I swear', time: '1:43p' },
    { from: 'them', name: 'maya.k',     body: 'leo no it had cyrillic on the sign 😂', time: '1:43p' },
    { from: 'me',   body: 'pole spacing was Mongolian for sure', time: '1:44p' },
    { from: 'them', name: 'leo_routes', body: 'fine fine, take the L', time: '1:45p' },
    { from: 'them', name: 'tessellate', body: 'duel @ 3p?', time: '1:50p' },
    { from: 'them', name: 'maya.k',     body: 'in', time: '1:50p' },
  ],
  leo: [
    { from: 'them', name: 'leo_routes', body: 'check the meta on bollards', time: '12:08p' },
    { from: 'them', name: 'leo_routes', body: 'Italian ones got an update', time: '12:08p' },
    { from: 'me',   body: 'oh nice, link?', time: '12:11p' },
    { from: 'them', name: 'leo_routes', body: 'in the guides tab — bollards > IT', time: '12:12p' },
  ],
  tess: [
    { from: 'me',   body: 'gg that last duel', time: '11:30a' },
    { from: 'them', name: 'tessellate', body: 'gg!', time: '11:31a' },
  ],
};

const LEADERBOARD = [
  { rank: 1, name: 'tessellate',     score: 24890, change: '+120', flag: 'NO' },
  { rank: 2, name: 'leo_routes',     score: 23104, change: '+88',  flag: 'IE' },
  { rank: 3, name: 'maya.k',         score: 22765, change: '+200', flag: 'GB' },
  { rank: 4, name: 'you',            score: 21982, change: '+430', flag: 'GB', self: true },
  { rank: 5, name: 'pixel_pilgrim',  score: 21540, change: '0',    flag: 'JP' },
  { rank: 6, name: 'sven.compass',   score: 20871, change: '-40',  flag: 'SE' },
  { rank: 7, name: 'route66.kim',    score: 20210, change: '+12',  flag: 'KR' },
];

function Avatar({ color, name, online, size = 26 }) {
  return (
    <div style={{position:'relative', flexShrink:0}}>
      <div style={{
        width:size, height:size, borderRadius:'50%',
        background:`linear-gradient(135deg, ${color}, ${color}aa)`,
        display:'grid', placeItems:'center',
        fontFamily:'var(--font-mono)', fontSize: size*0.42, fontWeight:600,
        color:'#fff', textTransform:'uppercase',
      }}>{name[0]}</div>
      {online !== undefined && (
        <span style={{
          position:'absolute', right:-1, bottom:-1,
          width:8, height:8, borderRadius:'50%',
          background: online ? 'var(--moss)' : 'var(--ink-500)',
          boxShadow:'0 0 0 2px var(--surface-1)',
        }} />
      )}
    </div>
  );
}

function SocialPanel() {
  const [tab, setTab] = React.useState('friends');
  const [threads, setThreads] = React.useState(CHAT_THREADS);
  const [activeThread, setActiveThreadRaw] = React.useState('maya');

  // Clear unread when opening a thread
  const setActiveThread = (id) => {
    setActiveThreadRaw(id);
    setThreads(ts => ts.map(t => t.id === id ? { ...t, unread: 0 } : t));
  };
  // Also clear maya's unread on first paint since it's the default open thread
  React.useEffect(() => {
    setThreads(ts => ts.map(t => t.id === activeThread ? { ...t, unread: 0 } : t));
  }, []);

  const totalUnread = threads.reduce((s, t) => s + t.unread, 0);
  const onlineCount = FRIENDS.filter(f => f.online).length;
  const active = threads.find(t => t.id === activeThread) || threads[0];
  const messages = CHAT_HISTORY[activeThread] || [];

  const SubTab = ({ id, label, count }) => (
    <div className={`sub-tab ${tab===id?'active':''}`} onClick={()=>setTab(id)}>
      {label}{count !== undefined && count > 0 && <span className="sub-tab-count">{count}</span>}
    </div>
  );

  return (
    <>
      <div className="sub-tabs">
        <SubTab id="friends" label="Friends" count={onlineCount} />
        <SubTab id="chat" label="Chat" count={totalUnread} />
        <SubTab id="leaderboard" label="Leaderboard" />
      </div>

      {tab === 'friends' && (
        <>
          <div className="section">
            <div className="section-head">
              <span className="section-title">Online · {FRIENDS.filter(f=>f.online).length}</span>
              <span className="section-action"><SOC_I.Plus className="ic-sm" /> add friend</span>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:2}}>
              {FRIENDS.filter(f=>f.online).map(f => (
                <div key={f.name} className="friend-row">
                  <Avatar color={f.color} name={f.name} online={f.online} />
                  <div className="friend-meta">
                    <div className="friend-name">{f.name}</div>
                    <div className="friend-status">{f.status}</div>
                  </div>
                  <span className="friend-rank">{f.rank}</span>
                  <button className="btn-icon-sm" title="Invite to duel"><SOC_I.Crosshair className="ic-sm" /></button>
                  <button className="btn-icon-sm" title="Message"><SOC_I.Mic className="ic-sm" /></button>
                </div>
              ))}
            </div>
          </div>
          <div className="section">
            <div className="section-head"><span className="section-title">Offline · {FRIENDS.filter(f=>!f.online).length}</span></div>
            <div style={{display:'flex', flexDirection:'column', gap:2}}>
              {FRIENDS.filter(f=>!f.online).map(f => (
                <div key={f.name} className="friend-row dim">
                  <Avatar color={f.color} name={f.name} online={f.online} />
                  <div className="friend-meta">
                    <div className="friend-name">{f.name}</div>
                    <div className="friend-status">{f.status}</div>
                  </div>
                  <span className="friend-rank">{f.rank}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'chat' && (
        <div className="chat-split">
          <div className="chat-list">
            {threads.map(t => (
              <div key={t.id} className={`chat-thread ${activeThread===t.id?'active':''}`} onClick={()=>setActiveThread(t.id)}>
                <Avatar color={t.color} name={t.name} online={t.online} size={28} />
                <div className="chat-thread-meta">
                  <div className="chat-thread-name">{t.name}{t.group && <span className="chat-thread-group"> · group</span>}</div>
                  <div className="chat-thread-last">{t.last}</div>
                </div>
                {t.unread > 0 && <span className="chat-unread">{t.unread}</span>}
              </div>
            ))}
          </div>
          <div className="chat-pane">
            <div className="chat-pane-head">
              <Avatar color={active.color} name={active.name} online={active.online} size={24} />
              <div>
                <div style={{fontSize:12, fontWeight:600, color:'var(--ink-100)'}}>{active.name}{active.group && <span style={{color:'var(--ink-400)', fontWeight:400}}> · group</span>}</div>
                <div style={{fontSize:10, fontFamily:'var(--font-mono)', color: active.online ? 'var(--moss)' : 'var(--ink-500)'}}>{active.online ? 'online' : 'offline'}</div>
              </div>
              <div style={{flex:1}} />
              <button className="btn-icon-sm" title="Invite to duel"><SOC_I.Crosshair className="ic-sm" /></button>
            </div>
            <div className="chat-messages">
              {messages.map((m,i) => (
                <div key={i} className={`chat-msg ${m.from}`}>
                  {m.from === 'them' && active.group && <div style={{fontSize:10, color:'var(--ink-400)', marginBottom:2, fontFamily:'var(--font-mono)'}}>{m.name}</div>}
                  <div className="chat-msg-bubble">{m.body}</div>
                  <div className="chat-msg-time">{m.time}</div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input type="text" placeholder={`Message ${active.name}…`} />
              <button className="btn btn-primary" style={{padding:'5px 10px'}}><SOC_I.ChevronRight className="ic-sm" /></button>
            </div>
          </div>
        </div>
      )}

      {tab === 'leaderboard' && (
        <>
          <div className="section">
            <div className="section-head">
              <span className="section-title">Friends · weekly</span>
              <span className="muted tiny mono">resets in 2d 14h</span>
            </div>
            <div className="leaderboard">
              {LEADERBOARD.map(row => (
                <div key={row.rank} className={`lb-row ${row.self?'self':''}`}>
                  <span className="lb-rank">#{row.rank}</span>
                  <Avatar color={row.self?'#d97757':'#5a7ed1'} name={row.name} size={24} />
                  <span className="lb-name">{row.name}</span>
                  <span className="flag-square" style={{width:16, height:11, background: SOC_COUNTRIES[row.flag]?.flag || '#444'}} />
                  <span className="lb-score">{row.score.toLocaleString()}</span>
                  <span className={`lb-change ${row.change.startsWith('+')?'up':row.change.startsWith('-')?'down':'flat'}`}>{row.change}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="section">
            <div className="section-head">
              <span className="section-title">Global</span>
              <span className="section-action">view all →</span>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8}}>
              <div className="stat-card"><div className="stat-label">Your rank</div><div className="stat-value">#4,218</div></div>
              <div className="stat-card"><div className="stat-label">Top 1%</div><div className="stat-value">26,400+</div></div>
              <div className="stat-card"><div className="stat-label">Streak</div><div className="stat-value">12d</div></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

window.SocialPanel = SocialPanel;
