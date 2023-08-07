import { ProductoCategorias, ProductoPorCategoria } from "../../../interfaces";

export const saveTypesFood = (typeFoodData: ProductoCategorias) => {
  localStorage.removeItem("types_food");
  localStorage.setItem(
    "types_food",
    JSON.stringify({ ...{ id: 1 }, ...typeFoodData })
  );
};

export const savefoodByType = (foodByData: ProductoPorCategoria ) => {
  localStorage.removeItem("food_by_type");
  localStorage.setItem("food_by_type", JSON.stringify(foodByData));
};
