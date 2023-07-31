import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductoCategorias } from "../../../interfaces";

const initialState: ProductoCategorias = {
  id_categoria: 0,
  nombre: "",
  descripcion: "",
  media_url: ""
};

export const typeFoodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addFoodTypes: (state: ProductoCategorias, action: PayloadAction<ProductoCategorias>) => {
      const food: ProductoCategorias = action.payload;
      return { ...state, ...food };
    },
  },
});

export const { addFoodTypes } = typeFoodSlice.actions;
export default typeFoodSlice.reducer;
