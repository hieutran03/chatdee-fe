import { Middleware } from '@reduxjs/toolkit';
import { addMessage } from '@/features/chat/chat.slice';

export const socketMiddleware: Middleware = (store) => (next) => (action) => {
  const socket = (window as any).socket; // socket global do useSocket tạo

  if (addMessage.match(action)) {
    socket?.emit('chat', action.payload);
  }

  return next(action);
};
