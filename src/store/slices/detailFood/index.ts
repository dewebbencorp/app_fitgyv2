import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  ProductoDetalle } from "../../../interfaces";

const initialState:  ProductoDetalle = {
    nombreProducto: "",
    categoria: "",
    descripcion: "",
    media_url: "",
    costo: 0,
    detail_food: undefined
};

export const detailFood = createSlice({
  name: "foodDetail",
  initialState,
  reducers: {
    addDetailFood: (state: ProductoDetalle , action: PayloadAction<ProductoDetalle>) => {
      const food: ProductoDetalle = action.payload;
      return { ...state, ...food };
    },
  },
});

export const { addDetailFood } = detailFood.actions;
export default detailFood.reducer;
