import axios from "axios";
import { Dispatch } from "redux";
import { BASE_URL } from "../Utils";
import { setCards } from "../../store/slices/cardSlice";
import { validCard } from "../../interfaces";

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

export const validateCard =
  (data: validCard) =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const postData = {
      claveSocio: data.claveSocio,
      numTarjeta: data.numTarjeta,
      vencimiento: data.vencimiento,
      cvv: data.cvv,
    };

    const postData2 = {
      claveSocio: data.claveSocio,
      numTarjeta: data.numTarjeta,
    };

    return axios
      .post(`${BASE_URL}/addTarjeta.php`, postData)
      .then((response) => {
        console.log("PRIMER PETICION");
        const isInserted = response.data.insertado;

        if (isInserted === 1) {
          setTimeout(() => {
            axios
              .post(`${BASE_URL}/confirmarToken.php`, postData2)
              .then((response) => {
                console.log("SEGUNDA PETICION");
                console.log(response.data);
              })
              .catch((error) => console.log(error));
          }, 5000);
        }
      })
      .catch((error) => console.log(error));
  };
