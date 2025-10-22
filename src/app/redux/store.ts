import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { baseApi } from '@/app/services/baseApi';
import rtkErrorLogger from '@/app/middlewares/rtkErrorLogger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault().concat(baseApi.middleware, sagaMiddleware, rtkErrorLogger),
  devTools: import.meta.env.DEV,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
