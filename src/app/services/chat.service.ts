import { Message } from '@/features/chat/types';
import { ApiResponse } from '../types/api-response.type';
import { CursorBasedPagination } from '../types/cursor-based-pagination.type';
import { CursorBasedQuery } from '../types/cursor-based-query.type';
import { baseApi } from './baseApi';

export const chatService = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getMessages: b.query<
      ApiResponse<CursorBasedPagination<Message>>,
      { conversationId: string; query: CursorBasedQuery }
    >({
      query: ({ conversationId, query }) => ({
        url: `/conversations/${conversationId}/messages`,
        params: { ...query },
      }),
      providesTags: ['Messages'],
    }),
    sendMessage: b.mutation<Message, { text: string }>({
      query: (body) => ({ url: '/chat/send', method: 'POST', body }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatService;
