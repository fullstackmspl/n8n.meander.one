import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate   = useNavigate();
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      navigate(result.role === 'admin' ? '/dashboard' : '/denied');
    } else {
      setError('Invalid email or password.');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 44, height: 44, background: '#25D366', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 22 }}>💬</div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 26, color: '#0c0c0b', letterSpacing: '-0.02em' }}>N8N.Meander.One</div>
          <div style={{ fontSize: 13.5, color: '#8a8a82', marginTop: 4 }}>Sign in to your account</div>
        </div>

        {/* Card */}
        <div style={{ background: 'white', border: '1px solid #e8e8e4', borderRadius: 16, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a18', display: 'block', marginBottom: 6 }}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="admin@ai"
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #e8e8e4', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#f4f4f2', color: '#1a1a18', transition: 'all 0.2s' }}
              onFocus={e => { e.target.style.borderColor = '#25D366'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(37,211,102,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = '#e8e8e4'; e.target.style.background = '#f4f4f2'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a18', display: 'block', marginBottom: 6 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #e8e8e4', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#f4f4f2', color: '#1a1a18', transition: 'all 0.2s' }}
              onFocus={e => { e.target.style.borderColor = '#25D366'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(37,211,102,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = '#e8e8e4'; e.target.style.background = '#f4f4f2'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626', marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: loading ? '#c8c8c2' : '#0c0c0b', color: 'white', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12.5, color: '#8a8a82' }}>
          <a href="/" style={{ color: '#8a8a82', textDecoration: 'none' }}>← Back to home</a>
        </div>
      </div>
    </div>
  );
}