import { inject } from '@angular/core';
import type { HttpInterceptorFn } from '@angular/common/http';
import { from, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { APP_CONFIG } from '../config/app-config';

/** Cabecera interna para forzar una llamada sin token (evidencia 401). Nunca llega al backend. */
export const SKIP_AUTH_HEADER = 'X-Skip-Auth';

/**
 * Agrega Authorization: Bearer <access_token> solo a las llamadas a la API
 * y solo cuando existe una cuenta autenticada. Los componentes no manipulan tokens.
 */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const config = inject(APP_CONFIG);

  if (request.headers.has(SKIP_AUTH_HEADER)) {
    return next(request.clone({ headers: request.headers.delete(SKIP_AUTH_HEADER) }));
  }

  const esApi = request.url.startsWith(`${config.apiBaseUrl}/api/`);
  if (!esApi || !auth.isAuthenticated() || request.headers.has('Authorization')) {
    return next(request);
  }

  return from(auth.getAccessToken()).pipe(
    switchMap((token) =>
      next(token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request),
    ),
  );
};
