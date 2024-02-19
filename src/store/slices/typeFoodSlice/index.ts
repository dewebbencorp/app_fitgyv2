import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductoCategorias } from "../../../interfaces";
import { saveTypesFood } from "../../services/fitbar";

const EmptyTypeFood: ProductoCategorias = {
  id_categoria: 0,
  nombre: "",
  descripcion: "",
  media_url: "",
  types_food: undefined,
};

export const typeFoodSlice = createSlice({
  name: "food",
  initialState: localStorage.getItem("types_food")
    ? JSON.parse(localStorage.getItem("types_food") as string)
    : EmptyTypeFood,
  reducers: {
    addFoodTypes: (
      state,
      action: PayloadAction<any>
    ) => {
      saveTypesFood(action.payload)
      return action.payload
    },
  },
});

export const { addFoodTypes } = typeFoodSlice.actions;
export default typeFoodSlice.reducer;
