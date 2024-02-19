import axios from "axios";
import { Dispatch } from "redux";
import { addFoodTypes } from "../../store/slices/typeFoodSlice";
import { addFoodByType } from "../../store/slices/foodByTypeSlice";
import { addDetailFood } from "../../store/slices/detailFood";
import { BASE_URL } from "../Utils";
import {
  ComprasHistorial,
  ProductoCategorias,
  ProductoDetalle,
  ProductoPorCategoria,
  ProductosPorPuntos,
} from "../../interfaces";

export const fetchTypesFood =
  () =>
  async (dispatch: Dispatch<any>): Promise<ProductoCategorias[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/getCategorias.php`);

      const responseData = response.data;

      const map = responseData.map((product: any) => ({
        id_categoria: product.id_categoria,
        nombre: product.nombre,
        descripcion: product.descripcion,
        media_url: product.media_url,
      }));
   
      dispatch(addFoodTypes(map));
      
      

      return map;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const postFoodByType =
  (id: string) =>
  async (dispatch: Dispatch<any>): Promise<ProductoPorCategoria[]> => {
    const postData = {
      id_Categoria: `${id}`,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/getCategoria_producto.php`,
        postData
      );

      const responseData = response.data;

      const map = responseData.map((product: any) => ({
        id_producto: product.id_producto,
        id_categoria: product.id_categoria,
        nombreProducto: product.nombreProducto,
        categoria: product.categoria,
        media_url: product.media_url,
        costo: product.costo,
        food_by_tye: undefined,
      }));

      dispatch(addFoodByType(map));

      return map;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const postFoodDetail =
  (id: string) =>
  async (dispatch: Dispatch<any>): Promise<ProductoDetalle> => {
    const postData = {
      id_Producto: id,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/getProducto.php`,
        postData
      );

      const responseData: ProductoDetalle = {
        id_producto: response.data.id_producto,
        nombre: response.data.nombre,
        categoria: response.data.categoria,
        Descripcion: response.data.Descripcion,
        img_url: response.data.image_url,
        costo: response.data.costo,
        detail_food: undefined,
      };

      return responseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const producsPerPoints =
  (points: number) =>
  async (dispatch: Dispatch<any>): Promise<ProductosPorPuntos[]> => {
    const postData = {
      puntos: points,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/productosPorPuntos.php`,
        postData
      );

      const responseData = response.data;

      return responseData.map((product: any) => ({
        clave: product.Clav_Art,
        costo: parseFloat(product.Precio1),
        detalle: product.Desc_Art,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const purchaseHistory =
  (clave: number) =>
  async (dispatch: Dispatch<any>): Promise<ComprasHistorial[]> => {
    const postData = {
      clave_asociado: clave,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/getHistorialCompras.php`,
        postData
      );

      const responseData = response.data;

      return responseData.map((product: any) => ({
        monto: product.Monto,
        saldo: product.Saldo,
        tipo: product.Tipo,
        ticket: product.No_tick,
        total: product.Total_P,
        detalle: product.Desc_Art,
        cantidad: product.Cant,
        fecha: product.fechaO,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
