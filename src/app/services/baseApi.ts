import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/redux/store';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
    // credentials: 'include',
  }),
  tagTypes: ['Me', 'Messages'],
  endpoints: () => ({}),
});
