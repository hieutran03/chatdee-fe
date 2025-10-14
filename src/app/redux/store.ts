import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { baseApi } from '@/app/services/baseApi'
import rtkErrorLogger from '@/app/middlewares/rtkErrorLogger'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault().concat(baseApi.middleware, rtkErrorLogger),
  devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
