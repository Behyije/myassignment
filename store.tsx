import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './slice/emailSlice';
import passwordReducer from './slice/passwordSlice';
import userReducer from './slice/homeSlice';
const store = configureStore({
  reducer: {
    email: emailReducer,
    password:passwordReducer,
    user:userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;