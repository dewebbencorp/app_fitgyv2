import axios from "axios";
import { Dispatch } from "redux";
import { addFoodTypes } from "../../store/slices/typeFoodSlice";
import { addFoodByType } from "../../store/slices/foodByTypeSlice";
import { addDetailFood } from "../../store/slices/detailFood";
import { BASE_URL } from "../Utils";

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
  (id: number) =>
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
  (id: number) =>
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
