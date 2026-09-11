import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { APP_CONFIG, AppConfig } from './core/config/app-config';
import { AuthService } from './core/auth/auth.service';
import { authInterceptor } from './core/auth/auth.interceptor';

import {
  CategoriasApi,
  ServiciosApi,
  ProfesionalesApi,
  PerfilesApi,
  SuscripcionesApi,
} from './core/api';
import { CategoriasApiMock } from './core/mocks/categorias-api.mock';
import { ServiciosApiMock } from './core/mocks/servicios-api.mock';
import { ProfesionalesApiMock } from './core/mocks/profesionales-api.mock';
import { PerfilesApiMock } from './core/mocks/perfiles-api.mock';
import { SuscripcionesApiMock } from './core/mocks/suscripciones-api.mock';
import { CategoriasApiReal } from './core/api/categorias-api.real';
import { ServiciosApiReal } from './core/api/servicios-api.real';
import { ProfesionalesApiReal } from './core/api/profesionales-api.real';
import { PerfilesApiReal } from './core/api/perfiles-api.real';
import { SuscripcionesApiReal } from './core/api/suscripciones-api.real';

/** Los mocks solo se usan en desarrollo cuando config.json/environment lo indican. */
export function buildAppConfig(config: AppConfig): ApplicationConfig {
  const useMocks = !!config.useMocks;
  return {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideRouter(routes, withComponentInputBinding()),
      provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
      { provide: APP_CONFIG, useValue: config },
      provideAppInitializer(() => inject(AuthService).init()),
      { provide: CategoriasApi, useClass: useMocks ? CategoriasApiMock : CategoriasApiReal },
      { provide: ServiciosApi, useClass: useMocks ? ServiciosApiMock : ServiciosApiReal },
      { provide: ProfesionalesApi, useClass: useMocks ? ProfesionalesApiMock : ProfesionalesApiReal },
      { provide: PerfilesApi, useClass: useMocks ? PerfilesApiMock : PerfilesApiReal },
      { provide: SuscripcionesApi, useClass: useMocks ? SuscripcionesApiMock : SuscripcionesApiReal },
    ],
  };
}
