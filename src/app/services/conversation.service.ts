import { Conversation } from '@/features/chat/types';
import { ApiResponse } from '../types/api-response.type';
import { CursorBasedPagination } from '../types/cursor-based-pagination.type';
import { baseApi } from './baseApi';

export const conversationService = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getConversations: b.query<ApiResponse<CursorBasedPagination<Conversation>>, void>({
      query: () => ({ url: '/conversations' }),
      providesTags: ['Conversations'],
    }),
  }),
});

export const { useGetConversationsQuery } = conversationService;
