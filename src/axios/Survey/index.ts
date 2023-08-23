import axios from "axios";
import { BASE_URL } from "../Utils";
import { Preguntas, ResponseUpdate } from "../../interfaces";
import { Dispatch } from "@reduxjs/toolkit";
import { setQuestion } from "../../store/slices/questions";

export const getQuestion =
  (cveSocio: number) =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const postData = {
      clave_asociado: `${cveSocio}`,
    };
    return axios
      .post(`${BASE_URL}/getPreguntaAleatoria.php`, postData)
      .then((response) => {
        const data: Preguntas = {
          id_pregunta: response.data[0].id_pregunta,
          detalle_pregunta: response.data[0].detalle_pregunta,
        };
        dispatch(setQuestion(data));
      })
      .catch((error) => console.log(error));
  };

export const sendSurvey =
  (claveSocio: number, pts: number, idPregunta: number) =>
  (dispatch: Dispatch<any>): Promise<ResponseUpdate> => {
    const postData = {
      id_pregunta: idPregunta,
      puntaje: pts,
      clave_asociado: claveSocio,
    };

    return new Promise<ResponseUpdate>((resolve, reject) => {
      axios
        .post(`${BASE_URL}/guardarRespuestaPregunta.php`, postData)
        .then((response) => {
          const responseData: ResponseUpdate = {
            response: response.data.message,
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
