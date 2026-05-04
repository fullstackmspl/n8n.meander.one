import { useState } from 'react';

const statusStyle = {
  sent:      { bg: 'rgba(37,211,102,0.1)',  color: '#15803d',  label: 'Replied' },
  pending:   { bg: 'rgba(245,158,11,0.1)',  color: '#b45309',  label: 'Pending' },
  failed:    { bg: 'rgba(239,68,68,0.1)',   color: '#dc2626',  label: 'Failed' },
  escalated: { bg: 'rgba(99,102,241,0.1)',  color: '#4338ca',  label: 'Escalated' },
};

const avatarColors = [
  { bg: '#dbeafe', color: '#1e40af' }, { bg: '#fce7f3', color: '#9d174d' },
  { bg: '#d1fae5', color: '#065f46' }, { bg: '#fef3c7', color: '#92400e' },
  { bg: '#ede9fe', color: '#5b21b6' }, { bg: '#fee2e2', color: '#991b1b' },
];

const tabs = ['All', 'Replied', 'Pending', 'Failed'];

export default function ConversationTable({ data, onRowClick, search = '' }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selected, setSelected] = useState(0);

  // Step 1 — search filter
  const searched = data.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.msg.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.topic.toLowerCase().includes(search.toLowerCase())
  );

  // Step 2 — tab filter upar se
  const filtered = activeTab === 'All' ? searched
    : searched.filter(c => {
        if (activeTab === 'Replied') return c.status === 'sent';
        if (activeTab === 'Pending') return c.status === 'pending';
        if (activeTab === 'Failed')  return c.status === 'failed';
        return true;
      });

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Syne', fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.01em' }}>Conversations</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {tabs.map(t => (
            <span key={t} onClick={() => setActiveTab(t)} style={{
              fontSize: 11.5, fontWeight: 500, padding: '4px 12px', borderRadius: 20,
              cursor: 'pointer', border: '1px solid',
              background: activeTab === t ? 'var(--text)' : 'transparent',
              color: activeTab === t ? 'white' : 'var(--text-2)',
              borderColor: activeTab === t ? 'var(--text)' : 'var(--border)',
              transition: 'all 0.18s ease',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr>
              {['User', 'Message received', 'AI reply', 'Status', 'Time'].map(h => (
                <th key={h} style={{
                  textAlign: 'left', padding: '9px 16px', fontSize: 11,
                  fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase',
                  letterSpacing: '0.06em', background: 'var(--surface-2)',
                  borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>
                  {search ? `"${search}" No results found for` : 'No conversations found'}
                </td>
              </tr>
            ) : (
              filtered.map((c, i) => {
                const s = statusStyle[c.status] || statusStyle.sent;
                const av = avatarColors[i % avatarColors.length];
                return (
                  <tr key={c.id}
                    onClick={() => { setSelected(i); onRowClick(c); }}
                    style={{
                      borderBottom: '1px solid var(--border)', cursor: 'pointer',
                      background: selected === i ? 'rgba(37,211,102,0.03)' : 'transparent',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={e => { if (selected !== i) e.currentTarget.style.background = 'rgba(37,211,102,0.02)'; }}
                    onMouseLeave={e => { if (selected !== i) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '11px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%',
                          background: av.bg, color: av.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 600, flexShrink: 0
                        }}>{c.initials}</div>
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 500 }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{c.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '11px 16px', maxWidth: 170, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-2)', fontSize: 12 }}>{c.msg}</td>
                    <td style={{ padding: '11px 16px', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-2)', fontSize: 12 }}>{c.reply}</td>
                    <td style={{ padding: '11px 16px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: 11, fontWeight: 500, padding: '3px 9px',
                        borderRadius: 20, background: s.bg, color: s.color
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color }} />
                        {s.label}
                      </span>
                    </td>
                    <td style={{ padding: '11px 16px', fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{c.time}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-2)' }}>
        <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>
          {search
            ? `"${search}" — ${filtered.length} result${filtered.length !== 1 ? 's' : ''} found`
            : `Showing ${filtered.length} of ${data.length} conversations`
          }
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {['←', '1', '2', '3', '→'].map((p, i) => (
            <button key={i} style={{
              width: 28, height: 28, borderRadius: 6,
              border: '1px solid var(--border)',
              background: p === '1' ? 'var(--text)' : 'var(--surface)',
              color: p === '1' ? 'white' : 'var(--text-2)',
              fontSize: 12, cursor: 'pointer', fontFamily: 'inherit'
            }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  );
}