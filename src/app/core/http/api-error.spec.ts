import { describe, it, expect } from 'vitest';
import { HttpErrorResponse } from '@angular/common/http';
import { describirError } from './api-error';

function respuesta(status: number, body: unknown = {}): HttpErrorResponse {
  return new HttpErrorResponse({ status, error: body, url: 'http://api/test' });
}

describe('describirError', () => {
  it('traduce 401 a "no autenticado"', () => {
    const e = describirError(respuesta(401, { detail: 'Falta token' }));
    expect(e.tipo).toBe('no-autenticado');
    expect(e.detalle).toBe('Falta token');
  });

  it('traduce 403 a "sin permiso"', () => {
    expect(describirError(respuesta(403)).tipo).toBe('sin-permiso');
  });

  it('traduce 404 a "no encontrado"', () => {
    expect(describirError(respuesta(404)).tipo).toBe('no-encontrado');
  });

  it('conserva los errores de validación de un ProblemDetail 400', () => {
    const e = describirError(respuesta(400, { title: 'Error de validacion', errores: { titulo: 'must not be blank' } }));
    expect(e.tipo).toBe('validacion');
    expect(e.errores?.['titulo']).toBe('must not be blank');
  });

  it('detecta problemas de red o CORS (status 0)', () => {
    expect(describirError(respuesta(0)).tipo).toBe('red');
  });
});
