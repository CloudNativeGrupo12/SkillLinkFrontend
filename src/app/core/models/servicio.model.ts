export type TipoPrecio =
  | 'por sesión'
  | 'por proyecto'
  | 'por visita'
  | 'por evento'
  | 'mensual'
  | 'por servicio';

export type EstadoServicio = 'activo' | 'inactivo';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  categoriaId: number;
  trabajadorId: number;
  precioMin: number;
  precioMax: number;
  tipoPrecio: TipoPrecio;
  moneda: 'CLP';
  estado: EstadoServicio;
  rating: number;
  reviews: number;
}

export interface CreateServicioDto {
  titulo: string;
  descripcion: string;
  categoriaId: number;
  precio: number;
  nombreAutor: string;
}
