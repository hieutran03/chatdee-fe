import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Message } from './types';
import { useAppSelector } from '@/hooks/useAppSelector';
import { io, Socket } from 'socket.io-client';

type ConversationBucket = {
  items: Message[];
  prevCursor?: string;
};

type ChatUIContextValue = {
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;

  // Messages state/selectors
  getMessages: (conversationId: string) => Message[];
  getPrevCursor: (conversationId: string) => string | undefined;

  // Mutators
  setPage: (
    conversationId: string,
    items: Message[],
    prevCursor?: string,
    options?: { replace?: boolean }
  ) => void;
  appendMessage: (message: Message) => void;
  clear: () => void;
};

export const ChatUIContext = createContext<ChatUIContextValue | undefined>(undefined);

export const ChatUIProvider = ({ children }: { children: ReactNode }) => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [byConversation, setByConversation] = useState<Record<string, ConversationBucket>>({});

  const token = useAppSelector((s) => s.auth.accessToken);

  // Socket connection: append incoming messages to the right conversation
  useEffect(() => {
    if (!token) return;

    const SOCKET_URL = (import.meta as any).env.VITE_WEBSOCKET_URL as string;
    const socket: Socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    (window as any).socket = socket;
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      console.log(socket)
    });

    socket.on('exception', (err: any) => {
      console.error('Socket exception:', err);
    });

    socket.on("connect_error", (err) => {
      console.error('Socket connection error:', err);
    });

    socket.on('chat', (msg: Message) => {
      setByConversation((prev) => {
        const convId = msg.conversationId;
        const bucket = prev[convId] || { items: [] };
        return {
          ...prev,
          [convId]: { ...bucket, items: [...bucket.items, msg] },
        };
      });
    });

    return () => {
      console.log('Disconnecting socket:', socket.id);
      socket.disconnect();
      delete (window as any).socket;
    };
  }, [token]);

  const getMessages = (conversationId: string) => byConversation[conversationId]?.items || [];
  const getPrevCursor = (conversationId: string) => byConversation[conversationId]?.prevCursor;

  const setPage: ChatUIContextValue['setPage'] = (
    conversationId,
    items,
    prevCursor,
    options,
  ) => {
    const replace = options?.replace ?? false;
    setByConversation((prev) => {
      const bucket = prev[conversationId] || { items: [] };
      const newItems = replace ? items : [...items, ...bucket.items]; // prepend older
      return {
        ...prev,
        [conversationId]: { items: newItems, prevCursor },
      };
    });
  };

  const appendMessage: ChatUIContextValue['appendMessage'] = (message) => {
    setByConversation((prev) => {
      const convId = message.conversationId;
      const bucket = prev[convId] || { items: [] };
      return {
        ...prev,
        [convId]: { ...bucket, items: [...bucket.items, message] },
      };
    });
  };

  const clear = () => setByConversation({});

  return (
    <ChatUIContext.Provider
      value={{
        selectedConversationId,
        setSelectedConversationId,
        getMessages,
        getPrevCursor,
        setPage,
        appendMessage,
        clear,
      }}
    >
      {children}
    </ChatUIContext.Provider>
  );
};
