import { MdDashboard, MdChat, MdBarChart, MdPeople,
         MdSettings, MdTableChart, MdWarning, MdFlashOn } from 'react-icons/md';

const navItems = [
  { icon: MdDashboard,  label: "Dashboard",    badge: null,  section: "Overview" },
  { icon: MdChat,       label: "Conversations",badge: "34",  section: null },
  { icon: MdBarChart,   label: "Analytics",    badge: null,  section: null },
  { icon: MdPeople,     label: "Users",        badge: "87",  section: "Workflow" },
  { icon: MdSettings,   label: "AI Config",    badge: null,  section: null },
  { icon: MdTableChart, label: "Sheets Logs",  badge: null,  section: null },
  { icon: MdWarning,    label: "Failed Msgs",  badge: "3",   badgeRed: true, section: null },
  { icon: MdFlashOn,    label: "n8n Workflow", badge: null,  section: null },
];

export default function Sidebar({ active, setActive }) {
  return (
    <aside style={{
      width: 240, background: 'var(--sidebar)', minHeight: '100vh',
      position: 'fixed', left: 0, top: 0, bottom: 0,
      display: 'flex', flexDirection: 'column', zIndex: 100
    }}>
      {/* Brand */}
      <div style={{ padding: '24px 22px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, background: 'var(--accent)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 18 }}>💬</span>
        </div>
        <div>
          <div style={{ fontFamily: 'Syne', fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>PulseChat</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>AI Agent Platform</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.label;
          return (
            <div key={i}>
              {item.section && (
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '14px 10px 6px' }}>
                  {item.section}
                </div>
              )}
              <div
                onClick={() => setActive(item.label)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 6, cursor: 'pointer',
                  color: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.55)',
                  background: isActive ? 'rgba(37,211,102,0.12)' : 'transparent',
                  fontSize: 13, fontWeight: isActive ? 500 : 400,
                  transition: 'all 0.18s ease',
                  position: 'relative',
                }}
              >
                {isActive && <div style={{ position: 'absolute', left: 0, top: 6, bottom: 6, width: 2.5, background: 'var(--accent)', borderRadius: '0 2px 2px 0' }} />}
                <Icon size={16} style={{ opacity: isActive ? 1 : 0.7 }} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 20,
                    background: item.badgeRed ? 'rgba(239,68,68,0.15)' : 'rgba(37,211,102,0.18)',
                    color: item.badgeRed ? '#ef4444' : 'var(--accent)'
                  }}>{item.badge}</span>
                )}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6, cursor: 'pointer' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'white' }}>PA</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>Pratham A.</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Admin · Meander</div>
          </div>
        </div>
      </div>
    </aside>
  );
}