import { Conversation } from '@/features/chat/types';
import { ApiResponse } from '../types/api-response.type';
import { CursorBasedPagination } from '../types/cursor-based-pagination.type';
import { baseApi } from './baseApi';

export const conversationService = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // allow passing limit, cursor and include params
    getConversations: b.query<
      ApiResponse<CursorBasedPagination<Conversation>>,
      { limit?: number; cursor?: string; include?: string } | void
    >({
      query: (arg) => ({
        url: '/conversations',
        params: arg ? { limit: arg.limit, cursor: arg.cursor, include: arg.include } : undefined,
      }),
      providesTags: ['Conversations'],
    }),
  }),
});

export const { useGetConversationsQuery } = conversationService;
