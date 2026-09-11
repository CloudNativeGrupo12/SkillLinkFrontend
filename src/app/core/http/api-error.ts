import { HttpErrorResponse } from '@angular/common/http';

export type TipoErrorApi =
  | 'red'
  | 'no-autenticado'
  | 'sin-permiso'
  | 'no-encontrado'
  | 'validacion'
  | 'conflicto'
  | 'servidor'
  | 'desconocido';

export interface ErrorApi {
  status: number;
  tipo: TipoErrorApi;
  titulo: string;
  detalle: string;
  errores?: Record<string, string>;
}

/** Traduce una respuesta HTTP de error (RFC 7807) a un estado que la UI puede comunicar. */
export function describirError(error: unknown): ErrorApi {
  if (error instanceof HttpErrorResponse) {
    const body = (error.error ?? {}) as { title?: string; detail?: string; errores?: Record<string, string> };
    switch (error.status) {
      case 0:
        return {
          status: 0,
          tipo: 'red',
          titulo: 'Sin conexion con la API',
          detalle: 'No se pudo contactar al backend (red, CORS o servicio caido).',
        };
      case 401:
        return {
          status: 401,
          tipo: 'no-autenticado',
          titulo: 'Debes iniciar sesion',
          detalle: body.detail ?? 'La API exige un Access Token valido.',
        };
      case 403:
        return {
          status: 403,
          tipo: 'sin-permiso',
          titulo: 'Sin permisos suficientes',
          detalle: body.detail ?? 'Tu token es valido pero no tiene el scope o rol requerido.',
        };
      case 404:
        return {
          status: 404,
          tipo: 'no-encontrado',
          titulo: 'Recurso no encontrado',
          detalle: body.detail ?? 'El recurso solicitado no existe.',
        };
      case 400:
        return {
          status: 400,
          tipo: 'validacion',
          titulo: body.title ?? 'Solicitud invalida',
          detalle: body.detail ?? 'Revisa los datos enviados.',
          errores: body.errores,
        };
      case 409:
        return {
          status: 409,
          tipo: 'conflicto',
          titulo: body.title ?? 'Conflicto',
          detalle: body.detail ?? 'La operacion entra en conflicto con datos existentes.',
        };
      default:
        return {
          status: error.status,
          tipo: error.status >= 500 ? 'servidor' : 'desconocido',
          titulo: body.title ?? `Error ${error.status}`,
          detalle: body.detail ?? error.message,
        };
    }
  }
  return {
    status: -1,
    tipo: 'desconocido',
    titulo: 'Error inesperado',
    detalle: error instanceof Error ? error.message : String(error),
  };
}
