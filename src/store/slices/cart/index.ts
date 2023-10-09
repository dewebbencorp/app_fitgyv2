import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../../interfaces";
import { dropAllData, dropData, setCartData } from "../../services/cart";

const EmptyCart: Cart = {
  id_producto: 0,
  product: "",
  price: 0,
  total: 0,
  img_url: "",
};

export const cart = createSlice({
  name: "foodDetail",
  initialState: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string)
    : EmptyCart,
  reducers: {
    addProduct: (state: Cart, action: PayloadAction<Cart>) => {
      return setCartData(action.payload);
    },
    dropOrder: (state, action) => {
      return dropData(action.payload);
    },
    dropAllCart: (state, action) => {
      return dropAllData();
    },
  },
});

export const { addProduct, dropOrder, dropAllCart } = cart.actions;
export default cart.reducer;
