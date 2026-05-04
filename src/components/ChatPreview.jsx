export default function ChatPreview({ convo }) {
  if (!convo) return null;
  const initials = convo.initials || 'U';
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#dbeafe', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{initials}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{convo.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{convo.phone}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 500, color: 'var(--accent-dim)', background: 'rgba(37,211,102,0.08)', padding: '3px 8px', borderRadius: 20 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
          Active
        </div>
      </div>

      <div style={{ padding: 14, height: 200, overflowY: 'auto', background: '#fafaf9', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <div style={{ maxWidth: '82%', padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '2px 12px 12px 12px', fontSize: 12, lineHeight: 1.55 }}>{convo.msg}</div>
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2, paddingLeft: 2 }}>{convo.name.split(' ')[0]}</div>
        </div>
        {convo.reply !== '—' && (
          <div style={{ alignSelf: 'flex-end' }}>
            <div style={{ maxWidth: '82%', padding: '8px 12px', background: '#e9fce6', border: '1px solid rgba(37,211,102,0.2)', borderRadius: '12px 2px 12px 12px', fontSize: 12, lineHeight: 1.55, color: '#0a3d1c' }}>{convo.reply}</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2, textAlign: 'right', paddingRight: 2 }}><span style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--accent-dim)', textTransform: 'uppercase', marginRight: 4 }}>AI</span>{convo.time}</div>
          </div>
        )}
      </div>
    </div>
  );
}