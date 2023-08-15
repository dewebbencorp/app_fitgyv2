import axios from "axios";
import { Dispatch } from "redux";
import { BASE_URL } from "../Utils";

export const postFoodByType =
  (cveSocio: number) =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const postData = {
      claveSocio: `${cveSocio}`,
    };

    return axios
      .post(
        `${BASE_URL}/getTarjetasBancarias.php`,
        postData
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
