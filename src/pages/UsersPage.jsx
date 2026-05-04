const avatarColors = [
  { bg: '#dbeafe', color: '#1e40af' }, { bg: '#fce7f3', color: '#9d174d' },
  { bg: '#d1fae5', color: '#065f46' }, { bg: '#fef3c7', color: '#92400e' },
  { bg: '#ede9fe', color: '#5b21b6' }, { bg: '#fee2e2', color: '#991b1b' },
];

export default function UsersPage({ data }) {
  const users = Object.values(
    data.reduce((acc, c) => {
      if (!acc[c.phone]) {
        acc[c.phone] = { name: c.name, initials: c.initials, phone: c.phone, count: 0, lastMsg: c.msg, lastTime: c.time };
      }
      acc[c.phone].count++;
      return acc;
    }, {})
  );

  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>Users</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>{users.length} unique users contacted via WhatsApp</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {users.map((u, i) => {
          const av = avatarColors[i % avatarColors.length];
          return (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '18px 20px',
              transition: 'all 0.18s ease', cursor: 'default'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: av.bg, color: av.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>{u.initials}</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{u.phone}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: 'rgba(37,211,102,0.1)', color: '#15803d' }}>
                  {u.count} msg{u.count !== 1 ? 's' : ''}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', background: 'var(--surface-2)', padding: '8px 12px', borderRadius: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                "{u.lastMsg}"
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>Last active: {u.lastTime}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}   