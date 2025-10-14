import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  accessToken: string | null;
  me: import("./types").User | null;
};
const initialState: AuthState = { accessToken: null, me: null };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(s, a: PayloadAction<string | null>) {
      s.accessToken = a.payload;
    },
    setMe(s, a: PayloadAction<AuthState["me"]>) {
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
