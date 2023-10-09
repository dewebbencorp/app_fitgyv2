import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../../interfaces";
import { setCartData } from "../../services/cart";

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
  },
});

export const { addProduct } = cart.actions;
export default cart.reducer;
