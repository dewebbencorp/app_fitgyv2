import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  ProductoPorCategoria } from "../../../interfaces";

const initialState:  ProductoPorCategoria = {
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
  initialState,
  reducers: {
    addFoodByType: (state: ProductoPorCategoria , action: PayloadAction<ProductoPorCategoria>) => {
      const food: ProductoPorCategoria = action.payload;
      return { ...state, ...food };
    },
  },
});

export const { addFoodByType } = foodByTypeSlice.actions;
export default foodByTypeSlice.reducer;
