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

export const cartTotal = () => {
  const current = JSON.parse(localStorage.getItem("cart") || "[]");
  var totalPrice = 0;
  for (var i = 0; i < current.length; i++) {
    var product = current[i];
    var price = parseFloat(product.price);
    var total = product.total;
    var subtotal = price * total;
    totalPrice += subtotal;
  }

  return totalPrice;
};

export const dropData = (id: number) => {
  const current = JSON.parse(localStorage.getItem("cart") || "[]");

  const updatedCart = current.filter(
    (cartItem: Cart) => cartItem.id_producto !== id
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  return updatedCart;
};

export const dropAllData = () => {
  localStorage.removeItem("cart");
  return [];
};

//TODO
export const updateCartState = (userData: Partial<Cart>) => {
  const currentState = JSON.parse(localStorage.getItem("cart") as string);
  const updatedState = { ...currentState, ...userData };
  localStorage.setItem("cart", JSON.stringify(updatedState));
};