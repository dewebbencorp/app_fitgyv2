import axios from "axios";
import { Dispatch } from "redux";
import { addFoodTypes } from "../../store/slices/typeFoodSlice";
import { addFoodByType } from "../../store/slices/foodByTypeSlice";
import { addDetailFood } from "../../store/slices/detailFood";
import { Repo } from "../test";

export const fetchTypesFood =
  () =>
  (dispatch: Dispatch<any>): Promise<void> => {
    
    return (axios
      .get(
        "https://187.188.16.29:4431/webservice-app2/controllers/getCategorias.php"
      )
      .then((response) => {
        dispatch(addFoodTypes(response.data));
      })
      .catch((error) => console.log(error)))
  };

export const postFoodByType =
  (id: number) =>
  (dispatch: Dispatch<any>): Promise<void> => {
    const postData = {
      id_Categoria: id,
    };

    return axios
      .post(
        "https://187.188.16.29:4431/webservice-app2/Controllers/getCategoria_producto.php",
        postData
      )
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
      .post(
        "https://187.188.16.29:4431/webservice-app2/Controllers/getProducto.php",
        postData
      )
      .then((response) => {
        console.log(response.data);

        dispatch(addDetailFood(response.data));
      })
      .catch((error) => console.log(error));
  };
