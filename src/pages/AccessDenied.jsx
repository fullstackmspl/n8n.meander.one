import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AccessDenied() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", textAlign: 'center', padding: 24 }}>
      <div>
        <div style={{ fontSize: 56, marginBottom: 20 }}>🔒</div>
        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 32, color: '#0c0c0b', marginBottom: 12, letterSpacing: '-0.02em' }}>Access Restricted</div>
        <div style={{ fontSize: 15, color: '#8a8a82', maxWidth: 380, margin: '0 auto 32px', lineHeight: 1.7 }}>
          You are logged in as a <strong>User</strong>. The dashboard is only accessible to admins. Contact your admin to get access.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={handleLogout} style={{ padding: '10px 24px', background: '#0c0c0b', color: 'white', border: 'none', borderRadius: 10, fontSize: 13.5, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>
            Sign out
          </button>
          <a href="/" style={{ padding: '10px 24px', background: 'white', color: '#8a8a82', border: '1px solid #e8e8e4', borderRadius: 10, fontSize: 13.5, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}