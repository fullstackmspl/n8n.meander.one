import { useState } from 'react';
import Sidebar from './components/Sidebar';
import StatsRow from './components/StatsRow';
import ConversationTable from './components/ConversationTable';
import ChatPreview from './components/ChatPreview';
import ModelStatus from './components/ModelStatus';
import SheetsLog from './components/SheetsLog';
import { useConversations } from './hooks/useConversations';

import ConversationsPage from './pages/ConversationsPage';
import AnalyticsPage    from './pages/AnalyticsPage';
import UsersPage        from './pages/UsersPage';
import AIConfigPage     from './pages/AIConfigPage';
import FailedPage       from './pages/FailedPage';
import SheetsLogsPage   from './pages/SheetsLogsPage';
import N8nPage          from './pages/N8nPage';

export default function App() {
  const { data: conversations, loading, error } = useConversations();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [search, setSearch] = useState('');

  function renderPage() {
    switch (activeNav) {
      case 'Conversations': return <ConversationsPage data={conversations} search={search} />;
      case 'Analytics':     return <AnalyticsPage data={conversations} />;
      case 'Users':         return <UsersPage data={conversations} />;
      case 'AI Config':     return <AIConfigPage />;
      case 'Sheets Logs':   return <SheetsLogsPage data={conversations} />;
      case 'Failed Msgs':   return <FailedPage data={conversations} />;
      case 'n8n Workflow':  return <N8nPage />;
      default: return (
        <div style={{ padding: '24px 28px', flex: 1 }}>
          <StatsRow />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 14, alignItems: 'start' }}>
            <ConversationTable data={conversations} onRowClick={setSelectedConvo} search={search} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ChatPreview convo={selectedConvo || conversations[0]} />
              <ModelStatus />
              <SheetsLog data={conversations} />
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar active={activeNav} setActive={setActiveNav} />

      <main style={{ marginLeft: 240, flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 28px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
          <div>
            <div style={{ fontFamily: 'Syne', fontSize: 15, fontWeight: 600, letterSpacing: '-0.02em' }}>{activeNav}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>May 2026 · All agents</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: '0 12px', height: 34, width: 220 }}>
              <span style={{ fontSize: 13, color: 'var(--text-3)' }}>🔍</span>
              <input
                placeholder="Search conversations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ border: 'none', background: 'none', outline: 'none', fontSize: 12.5, fontFamily: 'inherit', color: 'var(--text)', width: '100%' }}
              />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px',
              background: error ? 'rgba(239,68,68,0.08)' : 'rgba(37,211,102,0.08)',
              border: `1px solid ${error ? 'rgba(239,68,68,0.2)' : 'rgba(37,211,102,0.2)'}`,
              borderRadius: 20, fontSize: 11.5, fontWeight: 500,
              color: error ? '#dc2626' : '#1aad52'
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: error ? '#ef4444' : 'var(--accent)', animation: error ? 'none' : 'pulse 2s infinite' }} />
              {loading ? 'Fetching...' : error ? 'n8n offline' : 'Live data'}
            </div>
          </div>
        </header>

        {renderPage()}
      </main>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}