import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import typeFoodReducer from "./slices/typeFoodSlice";
import foodByTyoeReducer from "./slices/foodByTypeSlice";
import detailFoodReducer from "./slices/detailFood";
import newsReducer from "./slices/newsData";
import cardReducer from "./slices/cardSlice";
import setVCardReducer from "./slices/params";
import setSurveyReducer from "./slices/questions";
import videoReducer from "./slices/videoLogin"
export const store = configureStore({
  reducer: {
    user: userReducer,
    types_food: typeFoodReducer,
    food_by_tye: foodByTyoeReducer,
    detail_food: detailFoodReducer,
    vcard: setVCardReducer,
    news_dta: newsReducer,
    card_list: cardReducer,
    survey: setSurveyReducer,
    video: videoReducer
  },
});
