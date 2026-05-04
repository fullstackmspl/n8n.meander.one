import { stats } from '../data/dummy';

export default function StatsRow() {
  const icons = ['💬', '✅', '👥', '⚡'];
  const iconBg = ['rgba(37,211,102,0.1)', 'rgba(59,130,246,0.1)', 'rgba(245,158,11,0.1)', 'rgba(139,92,246,0.1)'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '18px 20px',
          cursor: 'default', transition: 'all 0.18s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
            <div style={{ width: 30, height: 30, borderRadius: 6, background: iconBg[i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{icons[i]}</div>
          </div>
          <div style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 700, letterSpacing: '-0.04em', marginBottom: 6 }}>{s.value}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--text-3)' }}>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '1px 5px', borderRadius: 4, background: 'rgba(37,211,102,0.1)', color: '#15803d' }}>{s.delta}</span>
            {s.sub}
          </div>
        </div>
      ))}
    </div>
  );
}