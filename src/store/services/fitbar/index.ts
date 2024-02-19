import { ProductoCategorias, ProductoDetalle, ProductoPorCategoria } from "../../../interfaces";

export const saveTypesFood = (typeFoodData: ProductoCategorias) => {
  localStorage.removeItem("types_food");
  localStorage.setItem(
    "types_food",
    JSON.stringify({ typeFoodData })
  );
};

export const savefoodByType = (foodByData: ProductoPorCategoria ) => {
  localStorage.removeItem("food_by_type");
  localStorage.setItem("food_by_type", JSON.stringify(foodByData));
};

export const saveDetail = (saveDetail: ProductoDetalle ) => {
  localStorage.removeItem("detail_food");
  localStorage.setItem("detail_food", JSON.stringify(saveDetail));
};
