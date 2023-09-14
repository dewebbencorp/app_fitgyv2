import { Dispatch } from "react";
import { addDetailFood } from "../../store/slices/detailFood";
import axios from "axios";
import { BASE_URL } from "../Utils";
import { addNewsData } from "../../store/slices/newsData";

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
        const responseData = response.data;
        localStorage.setItem("news_data", JSON.stringify(responseData));
        dispatch(addNewsData(responseData));
      })
      .catch((error) => {
        console.error(error);
      });
  };
