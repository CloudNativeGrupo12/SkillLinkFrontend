import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    {
      provide: CategoriasApi,
      useClass: environment.useMocks ? CategoriasApiMock : CategoriasApiReal,
    },
    {
      provide: ServiciosApi,
      useClass: environment.useMocks ? ServiciosApiMock : ServiciosApiReal,
    },
    {
      provide: ProfesionalesApi,
      useClass: environment.useMocks ? ProfesionalesApiMock : ProfesionalesApiReal,
    },
    {
      provide: PerfilesApi,
      useClass: environment.useMocks ? PerfilesApiMock : PerfilesApiReal,
    },
    {
      provide: SuscripcionesApi,
      useClass: environment.useMocks ? SuscripcionesApiMock : SuscripcionesApiReal,
    },
  ],
};
