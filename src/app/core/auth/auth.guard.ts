import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Protege la navegacion del frontend. No sustituye la autorizacion del backend:
 * el Resource Server sigue respondiendo 401/403 aunque se salte este guard.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (!auth.enabled) {
    // Sin IDaaS configurado (desarrollo con mocks) se permite navegar; la API igual exigira token.
    return true;
  }
  if (auth.isAuthenticated()) {
    return true;
  }
  auth.login();
  return false;
};
