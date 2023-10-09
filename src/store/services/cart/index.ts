import { Cart } from "../../../interfaces";
export const setCartData = (item: Cart) => {
  const current = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingItemIndex = current.findIndex(
    (cartItem: Cart) => cartItem.id_producto === item.id_producto
  );

  if (existingItemIndex !== -1) {
    // Si el producto ya existe en el carrito, actualiza solo el campo "total"
    current[existingItemIndex].total += item.total;
  } else {
    // Si el producto no existe en el carrito, agrégalo
    current.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(current));

  return current;
};

//TODO
export const updateCartState = (userData: Partial<Cart>) => {
  const currentState = JSON.parse(localStorage.getItem("cart") as string);
  const updatedState = { ...currentState, ...userData };
  localStorage.setItem("cart", JSON.stringify(updatedState));
};
