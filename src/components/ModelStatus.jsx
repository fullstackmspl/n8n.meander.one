export default function ModelStatus() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Syne', fontSize: 13.5, fontWeight: 600 }}>AI Model Status</span>
        <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: 'rgba(139,92,246,0.1)', color: '#5b21b6' }}>Groq</span>
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          ['Model', 'llama3-8b-8192'],
          ['Memory', 'Last 5 turns'],
          ['Trigger', 'Twilio webhook'],
          ['Sheets sync', '✓ Appending'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11.5, color: 'var(--text-2)' }}>{k}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: k === 'Sheets sync' ? '#15803d' : 'var(--text)' }}>{v}</span>
          </div>
        ))}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 11.5, color: 'var(--text-2)' }}>Avg latency</span>
            <span style={{ fontSize: 12, fontWeight: 500 }}>1.4s</span>
          </div>
          <div style={{ height: 4, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '30%', background: 'var(--accent)', borderRadius: 4 }} />
          </div>
        </div>
      </div>
    </div>
  );
}