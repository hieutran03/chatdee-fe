import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '@/app/services/baseApi';
import authReducer from '@/features/auth/auth.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
