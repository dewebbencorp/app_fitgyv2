import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductoDetalle } from "../../../interfaces";
import { saveDetail } from "../../services/fitbar";

const EmptyDetail: ProductoDetalle = {
  id_producto: 0,
  nombre: "",
  categoria: "",
  Descripcion: "",
  img_url: "",
  costo: 0,
  detail_food: undefined
};

export const detailFood = createSlice({
  name: "foodDetail",
  initialState: localStorage.getItem("detail_food")
  ? JSON.parse(localStorage.getItem("detail_food") as string)
  : EmptyDetail,
  reducers: {
    addDetailFood: (
      state: ProductoDetalle,
      action: PayloadAction<ProductoDetalle>
    ) => {
      saveDetail(action.payload);
      return action.payload;
    },
  },
});

export const { addDetailFood } = detailFood.actions;
export default detailFood.reducer;
