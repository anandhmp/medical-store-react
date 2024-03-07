import { configureStore } from "@reduxjs/toolkit";
import authReducer1 from "./authSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer1,
  },
});

export default store;
