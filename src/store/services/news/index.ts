import { VIDEO_URL } from "../../../axios/Utils";
import { NewsData, VideoLogin } from "../../../interfaces";

export const setNewsData = (newsData: NewsData) => {
  localStorage.removeItem("news_data");
  localStorage.setItem("news_data", JSON.stringify(newsData));
};

export const setNewVideo = (data: string) => {

  
  
  if (localStorage.getItem("video") && data === VIDEO_URL) {
    //console.log("ES IGUAL");
  } else {
    localStorage.removeItem("video");
    localStorage.setItem("video", data);
  }
};
