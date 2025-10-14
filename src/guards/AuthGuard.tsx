import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppSelector'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const token = useAppSelector((s) => s.auth.accessToken)
  return token ? <>{children}</> : <Navigate to="/login" replace />
}
