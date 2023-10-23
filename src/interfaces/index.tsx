export interface ProductoCategorias {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  media_url: string;
  types_food: any;
}

export interface ProductoPorCategoria {
  id_producto: number;
  id_categoria: number;
  nombreProducto: string;
  categoria: string;
  media_url: string;
  costo: number;
  food_by_tye: any;
}
export interface ProductoDetalle {
  id_producto: number;
  nombre: string;
  categoria: string;
  Descripcion: string;
  img_url: string;
  costo: number;
  detail_food: any;
}

export interface ProductosPorPuntos {
  clave: number;
  detalle: string;
  costo: number;
}

export interface ComprasHistorial {
  monto: number;
  saldo: number;
  tipo: string;
  ticket: number;
  total: number;
  detalle: string;
  cantidad: number;
  fecha: string;
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
  fecha_vencimiento: string;
  status: number;
  puntos: number;
  permisos: number;
  terminos: number;
}

export interface UpdateProfile {
  claveSocio: number;
  correo: string;
  telefono: string;
}

export interface RequesChangePassword {
  claveSocio: number;
  newPassword: string;
}

export interface ResponseUpdate {
  response: string;
  status: any;
}

export interface LoginError {
  response: string;
  status: any;
}

export interface NewsData {
  Img: string;
  Texto: string;
  news_dta: any;
}
export interface VideoLogin {
  media_url: string;
}
export interface Cards {
  numTarjeta: string;
  Activo: number;
  card_list: any;
}

export interface validCard {
  claveSocio: number;
  numTarjeta: number;
  vencimiento: string;
}

export interface Preguntas {
  id_pregunta: number;
  detalle_pregunta: string;
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

export interface Cart {
  id_producto: number;
  product: string;
  price: number;
  total: number;
  img_url: string;
}

export interface CuponList {
  clave_asociado: number;
  asociado: string;
  beneficiario: string;
  utilizado: boolean;
  vigente: boolean;
  vencimiento: string;
}
