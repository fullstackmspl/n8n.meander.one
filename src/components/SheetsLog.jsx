export default function SheetsLog({ data }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Syne', fontSize: 13.5, fontWeight: 600 }}>Google Sheets log</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Auto-updating</span>
      </div>
      {data.slice(0, 5).map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', gap: 10, borderBottom: i < 4 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontSize: 11, color: 'var(--text-3)', width: 28, fontFamily: 'Syne', fontWeight: 600 }}>#{c.id}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>{c.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.topic}</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: 'rgba(37,211,102,0.1)', color: '#15803d', flexShrink: 0 }}>Saved</span>
        </div>
      ))}
    </div>
  );
}