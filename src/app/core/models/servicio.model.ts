export type TipoPrecio =
  | 'por sesión'
  | 'por sesion'
  | 'por proyecto'
  | 'por visita'
  | 'por evento'
  | 'mensual'
  | 'por servicio'
  | string;

export type EstadoServicio = 'activo' | 'inactivo' | string;

/** Oferta de servicio publicada por un trabajador (backend: publicacion del catalogo). */
export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  categoriaId: number;
  categoriaNombre?: string;
  trabajadorId: number;
  trabajadorNombre?: string;
  perfilId?: number;
  ubicacion?: string;
  precioMin: number;
  precioMax: number;
  tipoPrecio: TipoPrecio;
  moneda: string;
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
