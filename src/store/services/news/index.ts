
import { NewsData, VideoLogin } from "../../../interfaces";

export const setNewsData = (newsData: NewsData) => {
  localStorage.removeItem("news_data");
  localStorage.setItem("news_data", JSON.stringify(newsData));
};

