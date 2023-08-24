import axios from "axios";
import { Dispatch } from "redux";
import { BASE_URL } from "../Utils";
import {
  RequesChangePassword,
  ResponseUpdate,
  UpdateProfile,
} from "../../interfaces";

export const uploadPhono =
  (img: string, cveSocio: number) =>
  (dispatch: Dispatch<any>): Promise<any> => {
    const postData = {
      imagen: img,
      claveSocio: `${cveSocio}`,
    };

    return new Promise<any>((resolve, reject) => {
      axios
        .post(`${BASE_URL}/actualizarFoto.php`, postData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
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

export const changePassword =
  (data: RequesChangePassword) =>
  (dispatch: Dispatch<any>): Promise<ResponseUpdate> => {
    const postData = {
      claveSocio: data.claveSocio,
      nuevaContrasena: data.newPassword,
    };

    return new Promise<ResponseUpdate>((resolve, reject) => {
      axios
        .post(`${BASE_URL}/actualizarContrasena.php`, postData)
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


  export const forgotMyPassword =
  (co:string ) =>
  (dispatch: Dispatch<any>): Promise<ResponseUpdate> => {
    const postData = {
      correo : co,
    };

    return new Promise<ResponseUpdate>((resolve, reject) => {
      axios
        .post(`${BASE_URL}/recuperarContraseña.php`, postData)
        .then((response) => {
          const responseData: ResponseUpdate = {
            response: response.data.response,
            status: true,
          };
          resolve(responseData);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };