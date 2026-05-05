import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { AdminRoute } from './auth/ProtectedRoute';
import { useConversations } from './hooks/useConversations';

import Sidebar           from './components/Sidebar';
import StatsRow          from './components/StatsRow';
import ConversationTable from './components/ConversationTable';
import ChatPreview       from './components/ChatPreview';
import ModelStatus       from './components/ModelStatus';
import SheetsLog         from './components/SheetsLog';

import LoginPage         from './pages/LoginPage';
import AccessDenied      from './pages/AccessDenied';
import ConversationsPage from './pages/ConversationsPage';
import AnalyticsPage     from './pages/AnalyticsPage';
import UsersPage         from './pages/UsersPage';
import AIConfigPage      from './pages/AIConfigPage';
import FailedPage        from './pages/FailedPage';
import SheetsLogsPage    from './pages/SheetsLogsPage';
import N8nPage           from './pages/N8nPage';

// ── User portal — sirf users ke liye ──────────────────
function UserPortal() {
  const { user, logout } = useAuth();
  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e8e8e4', padding: '0 32px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, background: '#25D366', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💬</div>
          <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: 18, color: '#0c0c0b' }}>N8N.Meander.One</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#8a8a82' }}>Hi, {user?.name}</span>
          <button onClick={logout} style={{ fontSize: 12.5, padding: '6px 16px', borderRadius: 8, border: '1px solid #e8e8e4', background: 'white', cursor: 'pointer', fontFamily: 'inherit', color: '#6b6b65' }}>
            Sign out
          </button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>👋</div>
        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 32, color: '#0c0c0b', marginBottom: 12, letterSpacing: '-0.02em' }}>
          Welcome, {user?.name}
        </div>
        <div style={{ fontSize: 15, color: '#8a8a82', lineHeight: 1.7, marginBottom: 40 }}>
          You are logged in as a <strong>User</strong>. Dashboard access is restricted to admins only. Contact your admin to request elevated access.
        </div>

        {/* Info cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32, textAlign: 'left' }}>
          <div style={{ background: 'white', border: '1px solid #e8e8e4', borderRadius: 12, padding: '20px' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>📊</div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: '#0c0c0b', marginBottom: 4 }}>Dashboard</div>
            <div style={{ fontSize: 12.5, color: '#8a8a82', lineHeight: 1.6 }}>Admin access required to view analytics and conversations.</div>
          </div>
          <div style={{ background: 'white', border: '1px solid #e8e8e4', borderRadius: 12, padding: '20px' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>💬</div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: '#0c0c0b', marginBottom: 4 }}>WhatsApp Bot</div>
            <div style={{ fontSize: 12.5, color: '#8a8a82', lineHeight: 1.6 }}>The AI agent is active and responding to customers.</div>
          </div>
        </div>

        {/* Status */}
        <div style={{ background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#25D366', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 13.5, fontWeight: 500, color: '#1aad52' }}>AI Agent is live and active</span>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

// ── Admin dashboard ────────────────────────────────────
function Dashboard() {
  const { logout } = useAuth();
  const { data: conversations, loading, error } = useConversations();
  const [activeNav, setActiveNav]         = useState('Dashboard');
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [search, setSearch]               = useState('');

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
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: error ? 'rgba(239,68,68,0.08)' : 'rgba(37,211,102,0.08)', border: `1px solid ${error ? 'rgba(239,68,68,0.2)' : 'rgba(37,211,102,0.2)'}`, borderRadius: 20, fontSize: 11.5, fontWeight: 500, color: error ? '#dc2626' : '#1aad52' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: error ? '#ef4444' : 'var(--accent)', animation: error ? 'none' : 'pulse 2s infinite' }} />
              {loading ? 'Fetching...' : error ? 'n8n offline' : 'Live data'}
            </div>
            <button onClick={logout} style={{ fontSize: 12, padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-2)' }}>
              Sign out
            </button>
          </div>
        </header>
        {renderPage()}
      </main>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

// ── Smart redirect — role ke hisaab se ────────────────
function RoleRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/dashboard" replace />;
  return <Navigate to="/portal" replace />;
}

// ── Main App ───────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Navigate to="/landing" replace />} />
      <Route path="/landing"   element={<Landing />} />
      <Route path="/login"     element={<LoginPage />} />
      <Route path="/portal"    element={<UserPortal />} />
      <Route path="/denied"    element={<AccessDenied />} />
      <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="*"          element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}

// ── Inline landing redirect ────────────────────────────
function Landing() {
  window.location.href = '/landing.html';
  return null;
}