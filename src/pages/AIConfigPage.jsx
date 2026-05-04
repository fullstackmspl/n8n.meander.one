import { useState } from 'react';

export default function AIConfigPage() {
  const [prompt, setPrompt]   = useState("You are a helpful customer support agent. Answer clearly and concisely.");
  const [model, setModel]     = useState("llama3-8b-8192");
  const [memory, setMemory]   = useState("5");
  const [saved, setSaved]     = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const Row = ({ label, sub, children }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 3 }}>{sub}</div>}
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>{children}</div>
    </div>
  );

  const inputStyle = { border: '1px solid var(--border)', borderRadius: 8, padding: '7px 12px', fontSize: 12.5, fontFamily: 'inherit', color: 'var(--text)', background: 'var(--surface-2)', outline: 'none', width: '100%' };

  return (
    <div style={{ padding: '24px 28px', maxWidth: 720 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>AI Config</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Configure Groq model and AI agent behaviour</div>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Syne', fontSize: 13.5, fontWeight: 600 }}>Model Settings</span>
          <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: 'rgba(139,92,246,0.1)', color: '#5b21b6' }}>Groq</span>
        </div>

        <div style={{ padding: '0 24px' }}>
          <Row label="Model" sub="Groq pe available models">
            <select value={model} onChange={e => setModel(e.target.value)} style={{ ...inputStyle, width: 200, cursor: 'pointer' }}>
              <option value="llama3-8b-8192">llama3-8b-8192</option>
              <option value="llama3-70b-8192">llama3-70b-8192</option>
              <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
              <option value="gemma-7b-it">gemma-7b-it</option>
            </select>
          </Row>

          <Row label="Memory turns" sub="How many previous turns the AI should remember">
            <select value={memory} onChange={e => setMemory(e.target.value)} style={{ ...inputStyle, width: 200, cursor: 'pointer' }}>
              {['3', '5', '10', '20'].map(v => <option key={v} value={v}>Last {v} turns</option>)}
            </select>
          </Row>

          <Row label="System Prompt" sub="Define the default behaviour of the AI agent">
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </Row>

          <Row label="Trigger" sub="Webhook source">
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)' }}>Twilio WhatsApp</div>
          </Row>

          <Row label="Sheets sync" sub="Conversation log destination">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#15803d' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#25D366' }} />
              Active
            </div>
          </Row>
        </div>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          {saved && <span style={{ fontSize: 12, color: '#15803d', alignSelf: 'center' }}>✓ Saved successfully</span>}
          <button onClick={handleSave} style={{ fontSize: 12.5, fontWeight: 500, fontFamily: 'inherit', padding: '8px 20px', borderRadius: 8, border: 'none', background: 'var(--text)', color: 'white', cursor: 'pointer', transition: 'background 0.18s' }}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}