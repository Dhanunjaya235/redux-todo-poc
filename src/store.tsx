import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import todosReducer from "./slices/todosSlice";
import popupReducer from "./slices/popupSlice";
import userReducer from "./slices/userSlice";
const persistConfig = {
    key: 'user',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, userReducer)
const store=configureStore({
    reducer:{
        todos:todosReducer,
        popup:popupReducer,
        user:persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    }),
})

export type AppDispatch = typeof store.dispatch;
export default store;
export const persistor = persistStore(store);