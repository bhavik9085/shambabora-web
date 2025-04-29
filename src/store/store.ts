import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import  AlertStateSlice  from "./slices/elert-slice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
  };

  const rootReducer = combineReducers({
    user: authSlice,
    alert: AlertStateSlice
});
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    devTools:true,
  });

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatcher = typeof store.dispatch;
  export const persistor = persistStore(store);
