export default function N8nPage() {
  const workflows = [
    { name: 'WhatsApp AI Agent', status: 'active', nodes: 6, trigger: 'Twilio Webhook', desc: 'Receives WhatsApp messages, generates AI reply via Groq, saves to Sheets' },
    { name: 'Dashboard Read API', status: 'active', nodes: 3, trigger: 'GET Webhook', desc: 'Reads Google Sheets data and returns JSON to the dashboard' },
  ];

  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>n8n Workflow</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Status of all active automation workflows</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
        {workflows.map((w, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 20 }}>⚡</div>
                <div style={{ fontFamily: 'Syne', fontSize: 14, fontWeight: 600 }}>{w.name}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 500, color: '#15803d', background: 'rgba(37,211,102,0.1)', padding: '4px 10px', borderRadius: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#25D366', animation: 'pulse 2s infinite' }} />
                Active
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-2)', marginBottom: 14, lineHeight: 1.6 }}>{w.desc}</div>
            <div style={{ display: 'flex', gap: 20 }}>
              {[['Nodes', w.nodes], ['Trigger', w.trigger]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px' }}>
        <div style={{ fontFamily: 'Syne', fontSize: 13.5, fontWeight: 600, marginBottom: 16 }}>Architecture</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', gap: 8 }}>
          {['WhatsApp', '→', 'Twilio', '→', 'n8n Agent', '→', 'Groq AI', '→', 'Send Reply', '→', 'Google Sheets', '→', 'Dashboard'].map((item, i) => (
            item === '→'
              ? <span key={i} style={{ color: 'var(--text-3)', fontSize: 16 }}>→</span>
              : <span key={i} style={{ fontSize: 12, fontWeight: 500, padding: '5px 12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8 }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}