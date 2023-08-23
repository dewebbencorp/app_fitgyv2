import axios from "axios";
import { BASE_URL } from "../Utils";
import { Preguntas } from "../../interfaces";
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
        console.log(response.data);
        const data: Preguntas = {
          id_pregunta: response.data[0].id_pregunta,
          detalle_pregunta: response.data[0].detalle_pregunta,
        };

        dispatch(setQuestion(data));
      })
      .catch((error) => console.log(error));
  };

export const getQuestion2 =
  (cveSocio: number) =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const postData = {
      clave_asociado: `${cveSocio}`,
    };

    return axios
      .post(`${BASE_URL}/getPreguntaAleatoria.php`, postData)
      .then((response) => {
        console.log(response.data);
        const data: Preguntas = {
          id_pregunta: response.data.id_pregunta,
          detalle_pregunta: response.data.detalle_pregunta,
        };
        dispatch(setQuestion(data));
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
