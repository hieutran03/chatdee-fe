import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type Message = { id: string; from: 'me' | 'bot' | 'user'; text: string; createdAt: string };
type ChatState = { items: Message[] };
const initial: ChatState = { items: [] };

const slice = createSlice({
  name: 'chat',
  initialState: initial,
  reducers: {
    addMessage(s, a: PayloadAction<Message>) {
      s.items.push(a.payload);
    },
    resetChat(s) {
      s.items = [];
    },
  },
});
export const { addMessage, resetChat } = slice.actions;
export default slice.reducer;
