import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import typeFoodReducer from "./slices/typeFoodSlice";
import foodByTyoeReducer from "./slices/foodByTypeSlice";
import detailFoodReducer from "./slices/detailFood";

export const store = configureStore({
  reducer: {
    user: userReducer,
    types_food: typeFoodReducer,
    food_by_tye: foodByTyoeReducer,
    detail_food: detailFoodReducer,
  },
});
