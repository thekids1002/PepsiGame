import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import UserSlice from '../features/user/userSlice';

const middleware = [
  ...getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
  thunk,
];

const store = configureStore({
  reducer: {
    user: UserSlice,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
