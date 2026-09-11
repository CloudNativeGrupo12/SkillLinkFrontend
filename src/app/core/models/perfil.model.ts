export type TipoUsuario = 'trabajador' | 'cliente';

export interface Perfil {
  id: number;
  trabajadorId?: number;
  username: string;
  descripcion: string;
  tituloProfesional?: string;
  categoriaId?: number;
  contacto: string;
  telefono: string;
  experiencia: string;
  resumenCV: string;
}

/** Usuario autenticado resuelto por la API contra el dominio (onboarding automatico). */
export interface CurrentUser {
  tipo: TipoUsuario;
  personaId?: number;
  clienteId?: number;
  perfilId: number;
  trabajadorId?: number;
  nombre: string;
  apPaterno: string;
  email?: string;
  username?: string;
  roles?: string[];
  authorities?: string[];
  creadoEnEstaSesion?: boolean;
}
