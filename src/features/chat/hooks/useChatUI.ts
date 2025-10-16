import { useContext } from 'react';
import { ChatUIContext } from '../chatContext';

export const useChatUI = () => {
  const ctx = useContext(ChatUIContext);
  if (!ctx) throw new Error('useChatUI must be used within <ChatUIProvider>');
  return ctx;
};
