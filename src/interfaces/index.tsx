export interface ProductoCategorias {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  media_url: string;
  types_food: any
}

export interface ProductoPorCategoria {
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
export interface Asociado {
  user: any;
  Clav_Asociado: number;
  passedit: number;
  Nombre_Asociado: string;
  Telefono: string;
  TipoMembresia: string;
  Apellidos: string;
  CorreoE: string;
  NombreMem: string;
  imgAvatar: string;
  fechaO: string;
  titular: number;
  esSocio: number;
  puntos: number;
  vencio: number;
  diasRestantes: number;
}

export interface LoginError{
  mensaje: string
  esSocio: 0
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
