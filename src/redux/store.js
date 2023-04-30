import rootReducer from "./reducer/index";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer
});

export const dispatch = store.dispatch;
