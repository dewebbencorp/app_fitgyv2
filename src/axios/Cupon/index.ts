import axios from "axios";
import { BASE_URL_API } from "../Utils";
import { ResponseUpdate } from "../../interfaces";

export const generateCupon = async (
  id: number,
  name: string,
  price: number
) => {
  try {
    const postData = {
      clave_asociado: id,
      nombre_beneficiario: name,
      monto: 1,
    };

    const res = await axios.post(`${BASE_URL_API}/cupon`, postData);

    if (res.data.status) {
      return {
        response: res.data.message,
        status: false,
      };
    }

    const data: ResponseUpdate = {
      response: res.data.info[0].codigo_cupon,
      status: true,
    };

    return data;
  } catch (error: any) {
    return {
      response: error.response?.data?.message
        ? error.response.data.message
        : error.message,
      status: false,
    };
  }
};
