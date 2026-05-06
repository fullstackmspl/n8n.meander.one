import ConversationTable from '../components/ConversationTable';
import ChatPreview from '../components/ChatPreview';
import { useState } from 'react';

export default function ConversationsPage({ data, search }) {
  const [selected, setSelected] = useState(data[0]);
  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>Conversations</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>All Telegram conversations in one place</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 14, alignItems: 'start' }}>
        <ConversationTable data={data} onRowClick={setSelected} search={search} />
        <ChatPreview convo={selected || data[0]} />
      </div>
    </div>
  );
}