import { ProductoCategorias } from "../../../interfaces";

export const saveTypesFood = (typeFoodData: ProductoCategorias) => {
  localStorage.removeItem("types_food");
  localStorage.setItem(
    "types_food",
    JSON.stringify({ ...{ id: 1 }, ...typeFoodData })
  );
};


