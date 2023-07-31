import axios from "axios";
import { Dispatch } from "redux";
import { addFoodTypes } from "../../store/slices/typeFoodSlice";

export const fetchTypesFood =
  () =>
  (dispatch: Dispatch<any>): Promise<void> => {
    return axios
      .get(
        "https://187.188.16.29:4431/webservice-app2/controllers/getCategorias.php"
      )
      .then((response) => {        
        dispatch(addFoodTypes(response.data));
      })
      .catch((error) => console.log(error));
  };


  