import { Dispatch } from "react";
import { addDetailFood } from "../../store/slices/detailFood";
import axios from "axios";
import { setNewsData } from "../../store/services/news";

export const fetchNewsData =
  () =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const newsData = localStorage.getItem("news_data");

    if (newsData) {
      return Promise.resolve();
    }

    return axios
      .get(
        "https://187.188.16.29:4431/webservice-app2/controllers/getNoticias.php"
      )
      .then((response) => {
        console.log("NEWSDATA");

        console.log(response.data);

        dispatch(setNewsData(response.data));
      })
      .catch((error) => console.log(error));
  };
