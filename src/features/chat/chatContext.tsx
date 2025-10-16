import { createContext, useContext, useState, ReactNode } from 'react';

type ChatUIContextValue = {
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;
};

export const ChatUIContext = createContext<ChatUIContextValue | undefined>(undefined);

export const ChatUIProvider = ({ children }: { children: ReactNode }) => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  return (
    <ChatUIContext.Provider value={{ selectedConversationId, setSelectedConversationId }}>
      {children}
    </ChatUIContext.Provider>
  );
};
