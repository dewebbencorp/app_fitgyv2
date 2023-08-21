import { Dispatch } from "react";
import { addDetailFood } from "../../store/slices/detailFood";
import axios from "axios";
import { setNewsData } from "../../store/services/news";
import { BASE_URL } from "../Utils";

export const fetchNewsData =
  () =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const newsData = localStorage.getItem("news_data");

    if (newsData) {
      return Promise.resolve();
    }

    return axios
      .get(`${BASE_URL}/getNoticias.php`)
      .then((response) => {
        console.log("NEWSDATA");

        console.log(response.data);

        dispatch(setNewsData(response.data));
      })
      .catch((error) => console.log(error));
  };
