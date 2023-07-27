export interface ProductoCategorias {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  media_url: string;
}

export interface PoroductoPorCategoria {
  id_producto: number;
  id_categoria: number;
  nombreProducto: string;
  categoria: string;
  media_url: string;
  costo: number;
}
export interface ProductoDetalle {
  nombreProducto: string;
  categoria: string;
  descripcion: string;
  media_url: string;
  costo: number;
}

/* SQLite  */

export interface order {
  id_order: number;
  name_client: string;
  name_product: string;
  image_url: string;
  complements: string;
  price: number;
}

export interface CartI {
  id_order: number;
  total_product: number;
  total_price: number;
  name_product: string;
  image_url: string;
  complements: string;
  price: number;
}

export interface CartTotal {
  total_price: number;
}
