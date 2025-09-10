import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./slices/user.slice";
import formReducer from "./slices/form.slice";
import contentReducer from "./slices/content.slice";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  content: contentReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'form', 'content'], // only persist this slice (optional)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
