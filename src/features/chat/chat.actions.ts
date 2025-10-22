import { createAction } from '@reduxjs/toolkit';

export const joinConversation = createAction<string>('chat/joinConversation');

export type SendMessagePayload = {
  conversationId: string;
  content: string;
  type: 'text';
};
export const sendMessage = createAction<SendMessagePayload>('chat/sendMessage');
