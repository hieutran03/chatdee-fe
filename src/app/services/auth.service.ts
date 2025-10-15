import { ApiResponse } from '../types/api-response.type';
import { baseApi } from './baseApi';
import type { LoginReq, LoginRes, UserData } from '@/features/auth/types';

export const authService = baseApi.injectEndpoints({
  endpoints: (b) => ({
    login: b.mutation<LoginRes, LoginReq>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    me: b.query<ApiResponse<UserData>, void>({
      query: () => ({ url: '/auth/profile' }),
      providesTags: ['Me'],
    }),
    logout: b.mutation<{ ok: boolean }, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      invalidatesTags: ['Me'],
    }),
  }),
});

export const { useLoginMutation, useLazyMeQuery, useMeQuery, useLogoutMutation } = authService;
