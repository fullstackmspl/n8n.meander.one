import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/denied" replace />;
  return children;
}

export function UserRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}