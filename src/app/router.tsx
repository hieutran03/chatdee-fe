import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import LoginPage from '@/features/auth/LoginPage';
import ChatPage from '@/features/chat/ChatPage';
import LoadingScreen from '@/components/LoadingScreen';
import AuthGuard from '@/guards/AuthGuard';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <AuthGuard />,
    children: [{ index: true, element: <ChatPage /> }],
  },
  { path: '*', element: <div>Not found</div> },
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
