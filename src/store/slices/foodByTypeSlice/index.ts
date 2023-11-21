import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  ProductoPorCategoria } from "../../../interfaces";
import { savefoodByType } from "../../services/fitbar";

const EmptyFoodByType:  ProductoPorCategoria = {
    id_producto: 0,
    id_categoria: 0,
    nombreProducto: "",
    categoria: "",
    media_url: "",
    costo: 0,
    food_by_tye: undefined
};

export const foodByTypeSlice = createSlice({
  name: "food",
  initialState:localStorage.getItem("food_by_type")
  ? JSON.parse(localStorage.getItem("food_by_type") as string)
  : EmptyFoodByType ,
  reducers: {
    addFoodByType: (state: ProductoPorCategoria , action: PayloadAction<ProductoPorCategoria>) => {
      savefoodByType(action.payload)
      return action.payload
    },
  },
});

export const { addFoodByType } = foodByTypeSlice.actions;
export default foodByTypeSlice.reducer;
