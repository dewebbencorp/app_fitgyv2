import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setNewsData } from "../../services/news";
import { NewsData } from "../../../interfaces";

const EmptyNews: any = {
  Img: "",
  Texto: "",
};

export const newsDataSlice = createSlice({
  name: "news",
  initialState: localStorage.getItem("news_data")
    ? JSON.parse(localStorage.getItem("news_data") as string)
    : EmptyNews,
  reducers: {
    addNewsData: (state, action: PayloadAction<NewsData>) => {
      setNewsData(action.payload);
      return action.payload;
    },
  },
});

export const { addNewsData } = newsDataSlice.actions;
export default newsDataSlice.reducer;
