import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '@/app/services/baseApi';
import authReducer from '@/features/auth/auth.slice';
import chatReducer from '@/features/chat/chat.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
