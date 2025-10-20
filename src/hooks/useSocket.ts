// src/hooks/useSocket.ts
import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { useChatUI } from '@/features/chat/hooks/useChatUI';

const SOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

export function useSocket(token?: string) {
  const { appendMessage } = useChatUI();

  useEffect(() => {
    if (!token) return;

    const socket: Socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    (window as any).socket = socket; // lưu global cho middleware dùng

    socket.on('chat', (msg) => {
      appendMessage(msg);
    });

    return () => {
      socket.disconnect();
      delete (window as any).socket;
    };
  }, [token]);
}
