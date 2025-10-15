import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import ProtectedRoute from '@/components/router/ProtectedRoute';
import LoginPage from '@/features/auth/LoginPage';
import ChatPage from '@/features/chat/ChatPage';
import LoadingScreen from '@/components/LoadingScreen';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <ProtectedRoute />,
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
