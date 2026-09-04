export type TipoMembresia = 'Gratis' | 'Premium';

export interface Membresia {
  id: number;
  nombre: TipoMembresia;
}
