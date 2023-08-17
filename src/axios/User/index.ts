import axios from "axios";
import { Dispatch } from "redux";
import { BASE_URL } from "../Utils";
import { setCards } from "../../store/slices/cardSlice";
import { ResponseUpdate, UpdateProfile } from "../../interfaces";

export const uploadPhono =
  (img: string, cveSocio: number) =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const postData = {
      imagen: img,
      claveSocio: `${cveSocio}`,
    };

    return axios
      .post(`${BASE_URL}/actualizarFoto.php`, postData)
      .then((response) => {
        dispatch(setCards(response.data));
      })
      .catch((error) => console.log(error));
  };

export const updateProfile =
  (data: UpdateProfile) =>
  (dispatch: Dispatch<any>): Promise<ResponseUpdate> => {
    const postData = {
      claveSocio: data.claveSocio,
      correo: data.correo,
      telefono: data.telefono,
    };

    return new Promise<ResponseUpdate>((resolve, reject) => {
      axios
        .post(`${BASE_URL}/actualizarDatosApp.php`, postData)
        .then((response) => {
          const responseData: ResponseUpdate = {
            response: response.data.response,
            status: response.data.status,
          };
          resolve(responseData);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
