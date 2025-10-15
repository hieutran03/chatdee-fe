import { storage } from '@/libs/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from './types';

type AuthState = {
  accessToken: string | null;
  me: UserData | null;
};
const initialState: AuthState = {
  accessToken: storage.get('accessToken') || null,
  me: storage.get('me') || null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(s, a: PayloadAction<string | null>) {
      s.accessToken = a.payload;
    },
    setMe(s, a: PayloadAction<AuthState['me']>) {
      s.me = a.payload;
    },
    logout(s) {
      s.accessToken = null;
      s.me = null;
    },
  },
});
export const { setToken, setMe, logout } = slice.actions;
export default slice.reducer;
