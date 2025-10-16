import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function AuthGuard() {
  const token = useAppSelector((s) => s.auth.accessToken);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
