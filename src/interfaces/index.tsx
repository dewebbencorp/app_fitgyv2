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
}
