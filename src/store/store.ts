import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./slices/user.slice";
import formReducer from "./slices/form.slice";
import contentReducer from "./slices/content.slice";

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  content: contentReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
