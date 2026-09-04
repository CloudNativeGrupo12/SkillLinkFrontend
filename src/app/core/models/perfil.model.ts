export type TipoUsuario = 'trabajador' | 'cliente';

export interface Perfil {
  id: number;
  trabajadorId?: number;
  username: string;
  descripcion: string;
  contacto: string;
  telefono: string;
  experiencia: string;
  resumenCV: string;
}

export interface CurrentUser {
  tipo: TipoUsuario;
  perfilId: number;
  trabajadorId?: number;
  nombre: string;
  apPaterno: string;
}
