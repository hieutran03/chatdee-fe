import { baseApi } from './baseApi';
import type { Message } from '@/features/chat/chat.slice';

export const chatService = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listMessages: b.query<Message[], void>({
      query: () => ({ url: '/chat/messages' }),
      providesTags: ['Messages'],
    }),
    sendMessage: b.mutation<Message, { text: string }>({
      query: (body) => ({ url: '/chat/send', method: 'POST', body }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const { useListMessagesQuery, useSendMessageMutation } = chatService;
