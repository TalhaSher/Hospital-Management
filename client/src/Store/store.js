// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // adjust the import path if needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
