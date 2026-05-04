export default function SheetsLogsPage({ data }) {
  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>Sheets Logs</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>All records saved to Google Sheets</div>
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Syne', fontSize: 13.5, fontWeight: 600 }}>All saved rows</span>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{data.length} total records</span>
        </div>
        {data.map((c, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '40px 1fr 1fr 100px 80px',
            alignItems: 'center', padding: '12px 20px', gap: 16,
            borderBottom: i < data.length - 1 ? '1px solid var(--border)' : 'none',
            transition: 'background 0.15s', cursor: 'default'
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Syne', fontWeight: 600 }}>#{c.id}</span>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{c.phone}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.msg}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'capitalize' }}>{c.topic}</div>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: 'rgba(37,211,102,0.1)', color: '#15803d', textAlign: 'center' }}>Saved</span>
          </div>
        ))}
      </div>
    </div>
  );
}