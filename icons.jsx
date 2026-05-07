// Inline SVG icon set — feather-style strokes, 1.5px, 16px viewBox.
const Icon = ({ d, size = 14, fill = 'none', stroke = 'currentColor', strokeWidth = 1.5, viewBox = '0 0 16 16', children, className = 'ic' }) => (
  <svg className={className} width={size} height={size} viewBox={viewBox} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d ? <path d={d} /> : children}
  </svg>
);

const Icons = {
  Globe: (p) => <Icon {...p}><circle cx="8" cy="8" r="6.25" /><path d="M1.75 8h12.5M8 1.75c2 2.2 2 10.3 0 12.5M8 1.75c-2 2.2-2 10.3 0 12.5" /></Icon>,
  Crosshair: (p) => <Icon {...p}><circle cx="8" cy="8" r="5.5" /><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2" /></Icon>,
  Eye: (p) => <Icon {...p}><path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z" /><circle cx="8" cy="8" r="1.75" /></Icon>,
  Sparkle: (p) => <Icon {...p}><path d="M8 1.5l1.4 4.1L13.5 7l-4.1 1.4L8 12.5 6.6 8.4 2.5 7l4.1-1.4z" /></Icon>,
  Book: (p) => <Icon {...p}><path d="M2.5 2.5h6a2 2 0 012 2v9h-6a2 2 0 00-2 2v-13zM13.5 2.5v11M8.5 13.5h5" /></Icon>,
  Brain: (p) => <Icon {...p}><path d="M5 3.5a2 2 0 013 0 2 2 0 013 0v6a2 2 0 01-3 0 2 2 0 01-3 0zM5 5.5h-1a2 2 0 000 4M11 5.5h1a2 2 0 010 4M5 9.5v1a2 2 0 002 2M11 9.5v1a2 2 0 01-2 2" /></Icon>,
  ChevronRight: (p) => <Icon {...p}><path d="M6 3l4 5-4 5" /></Icon>,
  ChevronDown: (p) => <Icon {...p}><path d="M3 6l5 4 5-4" /></Icon>,
  Search: (p) => <Icon {...p}><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5l3 3" /></Icon>,
  Camera: (p) => <Icon {...p}><path d="M2 5h2.5l1-1.5h5l1 1.5H14v8H2z" /><circle cx="8" cy="9" r="2.5" /></Icon>,
  Crop: (p) => <Icon {...p}><path d="M4 1.5v10h10M1.5 4h10v10" /></Icon>,
  Refresh: (p) => <Icon {...p}><path d="M14 8a6 6 0 11-2-4.5L14 6M14 2v4h-4" /></Icon>,
  X: (p) => <Icon {...p}><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /></Icon>,
  Minus: (p) => <Icon {...p}><path d="M3 8h10" /></Icon>,
  Settings: (p) => <Icon {...p}><circle cx="8" cy="8" r="2" /><path d="M8 1.5v2M8 12.5v2M2.7 2.7l1.4 1.4M11.9 11.9l1.4 1.4M1.5 8h2M12.5 8h2M2.7 13.3l1.4-1.4M11.9 4.1l1.4-1.4" /></Icon>,
  Lock: (p) => <Icon {...p}><rect x="3" y="7" width="10" height="6.5" rx="1.5" /><path d="M5 7V5a3 3 0 016 0v2" /></Icon>,
  Pin: (p) => <Icon {...p}><path d="M8 14.5v-4M8 10.5a3 3 0 100-6 3 3 0 000 6z" /></Icon>,
  Layers: (p) => <Icon {...p}><path d="M8 1.5L1.5 5 8 8.5 14.5 5zM1.5 8.5L8 12l6.5-3.5M1.5 11.5L8 15l6.5-3.5" /></Icon>,
  Wand: (p) => <Icon {...p}><path d="M3 13l8-8M11 5l1.5-1.5M11 5l-1.5-1.5M13.5 7l-1.5 1.5" /></Icon>,
  Move: (p) => <Icon {...p}><path d="M8 1.5v13M1.5 8h13M5 5l-3 3 3 3M11 5l3 3-3 3M5 11l3 3 3-3M5 5l3-3 3 3" /></Icon>,
  Pause: (p) => <Icon {...p}><rect x="4" y="3" width="2.5" height="10" /><rect x="9.5" y="3" width="2.5" height="10" /></Icon>,
  Play: (p) => <Icon {...p} fill="currentColor"><path d="M4 3v10l9-5z" /></Icon>,
  Mic: (p) => <Icon {...p}><rect x="6" y="2" width="4" height="8" rx="2" /><path d="M3.5 8a4.5 4.5 0 009 0M8 12.5v2" /></Icon>,
  Check: (p) => <Icon {...p}><path d="M3 8.5l3 3 7-7" /></Icon>,
  Plus: (p) => <Icon {...p}><path d="M8 3v10M3 8h10" /></Icon>,
  Compass: (p) => <Icon {...p}><circle cx="8" cy="8" r="6.25" /><path d="M10 6L7 7l-1 3 3-1z" fill="currentColor" stroke="none" /></Icon>,
  Dock: (p) => <Icon {...p}><rect x="1.5" y="2" width="13" height="12" rx="1.5" /><path d="M10.5 2v12" /></Icon>,
  Float: (p) => <Icon {...p}><rect x="2" y="3.5" width="9" height="9" rx="1.5" /><rect x="5.5" y="6.5" width="8.5" height="6" rx="1.5" fill="var(--surface-1)" /></Icon>,
  Filter: (p) => <Icon {...p}><path d="M2 3h12l-4.5 6v4l-3 1.5V9z" /></Icon>,
};

window.Icons = Icons;
