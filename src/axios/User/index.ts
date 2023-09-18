import axios from "axios";
import { Dispatch } from "redux";
import { BASE_URL } from "../Utils";
import {
  Asociado,
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
  (co: string) =>
  (dispatch: Dispatch<any>): Promise<ResponseUpdate> => {
    const postData = {
      correo: co,
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

export const login =
  (email: string, password: string) =>
  (dispatch: Dispatch<any>): Promise<Asociado | ResponseUpdate> => {
    const postData = {
      email: email,
      password: password,
    };

    return new Promise<Asociado | ResponseUpdate>((resolve, reject) => {
      axios
        .post(`${BASE_URL}/login.php`, postData)
        .then((response) => {
          if (response.data[0] && response.data[0].status === 1) {
            const responseData: Asociado = {
              user: undefined,
              Clav_Asociado: response.data[0].Clav_Asociado,
              passedit: response.data[0].passedit,
              Nombre_Asociado: response.data[0].Nombre_Asociado,
              Telefono: response.data[0].Telefono,
              TipoMembresia: response.data[0].TipoMembresia,
              Apellidos: response.data[0].Apellidos,
              CorreoE: response.data[0].CorreoE,
              NombreMem: response.data[0].NombreMembresia,
              imgAvatar: response.data[0].imgAvatar,
              status: response.data[0].status,
              puntos: response.data[0].Saldo,
              fecha_vencimiento: response.data[0].FVencimientos.date,
              permisos: response.data[0].permisos,
              terminos: response.data[0].aceptoTerminos,
            };

            resolve(responseData);
          } else if (response.data) {
            const responseData2: ResponseUpdate = {
              response: response.data.message,
              status: response.data.status,
            };

            resolve(responseData2);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

export const generateCupon =
  (claveSocio: number, beneficiario: string) =>
  (dispatch: Dispatch<any>): Promise<ResponseUpdate> => {
    const postData = {
      clave_asociado: claveSocio,
      beneficiario: beneficiario,
    };

    return new Promise<ResponseUpdate>((resolve, reject) => {
      axios
        .post(`${BASE_URL}/generarCupon.php`, postData)
        .then((response) => {
          const responseData: ResponseUpdate = {
            response: response.data.message,
            status: response.data.generado,
          };
          resolve(responseData);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
