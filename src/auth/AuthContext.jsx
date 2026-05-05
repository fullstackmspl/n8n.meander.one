import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const USERS = [
  { email: import.meta.env.VITE_ADMIN_EMAIL, password: import.meta.env.VITE_ADMIN_PASS, role: 'admin', name: 'Admin' },
  { email: import.meta.env.VITE_USER_EMAIL,  password: import.meta.env.VITE_USER_PASS,  role: 'user',  name: 'User'  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pc_user');
    return saved ? JSON.parse(saved) : null;
  });

  function login(email, password) {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safe } = found;
      setUser(safe);
      localStorage.setItem('pc_user', JSON.stringify(safe));
      return { success: true, role: safe.role };
    }
    return { success: false };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('pc_user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);