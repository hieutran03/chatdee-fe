import { baseApi } from './baseApi'
import type { LoginReq, LoginRes, User } from '@/features/auth/types'

export const authService = baseApi.injectEndpoints({
  endpoints: (b) => ({
    login: b.mutation<LoginRes, LoginReq>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    me: b.query<User, void>({
      query: () => ({ url: '/auth/me' }),
      providesTags: ['Me'],
    }),
    logout: b.mutation<{ ok: boolean }, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      invalidatesTags: ['Me'],
    }),
  }),
})

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authService
