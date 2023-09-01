import axios from "axios";
import { Dispatch } from "redux";
import { BASE_URL } from "../Utils";
import { setCards } from "../../store/slices/cardSlice";
import { ResponseUpdate, validCard } from "../../interfaces";

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

export const validateCard = (data: validCard) => {
  return async (): Promise<any> => {
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

    try {
      const response1 = await axios.post(
        `${BASE_URL}/addTarjeta.php`,
        postData
      );

      const isInserted = response1.data.insertado;
      if (isInserted === 1) {
        return new Promise(async (resolve, reject) => {
          // Return a new Promise
          try {
            const response2 = await axios.post(
              `${BASE_URL}/confirmarToken.php`,
              postData2
            );
            resolve(response2.data); // Resolve with the response data
          } catch (error) {
            console.log(error);
            reject(error); // Reject with the error
          }
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateContract =
  (claveSocio: number, correo: string) =>
  (dispatch: Dispatch<any>): Promise<ResponseUpdate> => {
    const postData = {
      clave_socio: claveSocio,
      correo: correo
    };

    return new Promise<ResponseUpdate>((resolve, reject) => {
      axios
        .post(`${BASE_URL}/g_contrato/actualizarContrato.php`, postData)
        .then((response) => {
          const responseData: ResponseUpdate = {
            response: response.data.message,
            status: response.data.success,
          };
          resolve(responseData);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };


