import axios from "axios";
import { Dispatch } from "redux";
import { BASE_URL } from "../Utils";
import { setCards } from "../../store/slices/cardSlice";

export const postCardsList =
  (cveSocio: number) =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const postData = {
      claveSocio: `${cveSocio}`,
    };

    return axios
      .post(`${BASE_URL}/getTarjetasBancarias.php`, postData)
      .then((response) => {
        dispatch(setCards(response.data));
      })
      .catch((error) => console.log(error));
  };
