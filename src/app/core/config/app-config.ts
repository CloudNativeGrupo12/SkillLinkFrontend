import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

/** Configuracion del IDaaS (Microsoft Entra ID). Una SPA es un cliente publico: nunca incluye client_secret. */
export interface AuthConfig {
  clientId: string;
  tenantId: string;
  /** Scope delegado de la API, ej: api://<API_CLIENT_ID>/skilllink.write */
  apiScope: string;
}

export interface AppConfig {
  /** URL base de la API (backend directo o API Gateway). */
  apiBaseUrl: string;
  auth: AuthConfig;
  useMocks?: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export const DEFAULT_APP_CONFIG: AppConfig = {
  apiBaseUrl: environment.apiBaseUrl,
  auth: { clientId: '', tenantId: '', apiScope: '' },
  useMocks: environment.useMocks,
};

/** El IDaaS esta configurado cuando existen clientId y tenantId. */
export function authEnabled(config: AppConfig): boolean {
  return !!config.auth?.clientId && !!config.auth?.tenantId;
}

/** Carga config.json antes de arrancar Angular; si falla, usa los valores por defecto. */
export async function loadAppConfig(): Promise<AppConfig> {
  try {
    const response = await fetch(environment.configUrl, { cache: 'no-store' });
    if (!response.ok) {
      return DEFAULT_APP_CONFIG;
    }
    const remote = (await response.json()) as Partial<AppConfig>;
    return {
      apiBaseUrl: (remote.apiBaseUrl || DEFAULT_APP_CONFIG.apiBaseUrl).replace(/\/+$/, ''),
      auth: { ...DEFAULT_APP_CONFIG.auth, ...(remote.auth ?? {}) },
      useMocks: remote.useMocks ?? DEFAULT_APP_CONFIG.useMocks,
    };
  } catch {
    return DEFAULT_APP_CONFIG;
  }
}
