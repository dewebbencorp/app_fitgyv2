import axios from "axios";
import { Dispatch } from "redux";
import { BASE_URL } from "../Utils";
import { setCards } from "../../store/slices/cardSlice";
import { Cards, ResponseUpdate, validCard } from "../../interfaces";

export const postCardsList =
  (cveSocio: number) =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const postData = {
      claveSocio: `${cveSocio}`,
    };

    return axios
      .post(`${BASE_URL}/getTarjetasBancarias.php`, postData)
      .then((response) => {
        const res = response.data.map((item: any) => ({
          id_tarjeta: item.Count,
          numTarjeta: item.NumTarjeta,
          Activo: item.Estatus,
        }));

        dispatch(setCards(res));
      })
      .catch((error) => console.log(error));
  };

export const setNewCard = (data: validCard) => {
  return async (): Promise<any> => {
    const postData = {
      claveSocio: data.claveSocio,
      numTarjeta: data.numTarjeta,
      vencimiento: data.vencimiento,
    };

    return new Promise<ResponseUpdate>((resolve) => {
      axios
        .post(`${BASE_URL}/addTarjeta.php`, postData)
        .then((response) => {
          const responseData: ResponseUpdate = {
            response: response.data.mensaje,
            status: response.data.insertado,
          };
          resolve(responseData);
        })
        .catch((error) => {
          console.log(error);
          resolve(error);
        });
    });
  };
};

export const invalidateCard = (id: number) => {
  return async (): Promise<any> => {
    const postData = {
      idTarjeta: id,
    };

    return new Promise<ResponseUpdate>((resolve) => {
      axios
        .post(`${BASE_URL}/desactivarTarjeta.php`, postData)
        .then((response) => {
          const responseData: ResponseUpdate = {
            response: response.data.mensaje,
            status: response.data.estado,
          };
          resolve(responseData);
        })
        .catch((error) => {
          console.log(error);
          resolve(error);
        });
    });
  };
};

export const activateCard = (id: number, clave: number) => {
  return async (): Promise<any> => {
    const postData = {
      claveSocio: clave,
      idTarjeta: id,
    };

    return new Promise<ResponseUpdate>((resolve) => {
      axios
        .post(`${BASE_URL}/activarTarjeta.php`, postData)
        .then((response) => {
          const responseData: ResponseUpdate = {
            response: response.data.mensaje,
            status: response.data.estado,
          };
          resolve(responseData);
        })
        .catch((error) => {
          console.log(error);
          resolve(error);
        });
    });
  };
};

export const updateContract =
  (claveSocio: number, correo: string) =>
  (dispatch: Dispatch<any>): Promise<ResponseUpdate> => {
    const postData = {
      clave_socio: claveSocio,
      correo: correo,
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
