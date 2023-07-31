import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import typeFoodReducer from "./slices/typeFoodSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    types_food : typeFoodReducer
  },
});