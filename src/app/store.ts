import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "../features/auth/authSlice";
import { userApi } from '../features/api/userApi';
import { HotelApi } from '../features/api/HotelApi'; 
import { RoomApi } from '../features/api/RoomApi';
import { bookingApi } from '../features/api/BookingApi'; 
// Persist config
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated', 'role'], 
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [HotelApi.reducerPath]: HotelApi.reducer, 
    [RoomApi.reducerPath]: RoomApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer, 
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userApi.middleware,
      HotelApi.middleware,
      RoomApi.middleware,
      bookingApi.middleware // ✅ Add middleware
    ),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
