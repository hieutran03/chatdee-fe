import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '@/components/router/ProtectedRoute'

const LoginPage = lazy(()=>import('@/features/auth/LoginPage'))
const ChatPage = lazy(()=>import('@/features/chat/ChatPage'))
const NotFound = lazy(()=>import('@/pages/errors/NotFound'))

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage/> },
  { path: '/', element: <ProtectedRoute/>, children: [{ index: true, element: <ChatPage/> }] },
  { path: '*', element: <NotFound/> }
])
