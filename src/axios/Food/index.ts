import axios from "axios";
import { Dispatch } from "redux";
import { addFoodTypes } from "../../store/slices/typeFoodSlice";
import { addFoodByType } from "../../store/slices/foodByTypeSlice";
import { addDetailFood } from "../../store/slices/detailFood";
import { BASE_URL } from "../Utils";
import { ComprasHistorial, ProductosPorPuntos } from "../../interfaces";

export const fetchTypesFood =
  () =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const typesFoodData = localStorage.getItem("types_food");

    if (typesFoodData) {
      return Promise.resolve();
    }

    return axios
      .get(`${BASE_URL}/getCategorias.php`)
      .then((response) => {
        dispatch(addFoodTypes(response.data));
        localStorage.setItem("types_food", JSON.stringify(response.data));
      })
      .catch((error) => console.log(error));
  };

export const postFoodByType =
  (id: string) =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const postData = {
      id_Categoria: `${id}`,
    };

    return axios
      .post(`${BASE_URL}/getCategoria_producto.php`, postData)
      .then((response) => {
        dispatch(addFoodByType(response.data));
      })
      .catch((error) => console.log(error));
  };

export const postFoodDetail =
  (id: string) =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const postData = {
      id_Producto: id,
    };

    return axios
      .post(`${BASE_URL}/getProducto.php`, postData)
      .then((response) => {
        dispatch(addDetailFood(response.data));
      })
      .catch((error) => console.log(error));
  };

export const producsPerPoints =
  (points: number) =>
  async (dispatch: Dispatch<any>): Promise<ProductosPorPuntos[]> => {
    const postData = {
      puntos: points,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/productosPorPuntos.php`,
        postData
      );

      const responseData = response.data;

      return responseData.map((product: any) => ({
        clave: product.Clav_Art,
        costo: parseFloat(product.Precio1),
        detalle: product.Desc_Art,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const purchaseHistory =
  (clave: number) =>
  async (dispatch: Dispatch<any>): Promise<ComprasHistorial[]> => {
    const postData = {
      clave_asociado: clave,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/getHistorialCompras.php`,
        postData
      );

      const responseData = response.data;

      return responseData.map((product: any) => ({
        monto: product.Monto,
        saldo: product.Saldo,
        tipo: product.Tipo,
        ticket: product.No_tick,
        total: product.Total_P,
        detalle: product.Desc_Art,
        cantidad: product.Cant,
        fecha: product.fechaO,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
