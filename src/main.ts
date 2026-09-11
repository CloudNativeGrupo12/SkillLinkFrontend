import { bootstrapApplication } from '@angular/platform-browser';
import { buildAppConfig } from './app/app.config';
import { App } from './app/app';
import { loadAppConfig } from './app/core/config/app-config';

/**
 * La configuracion de ambiente (API_BASE_URL, clientId, tenantId, scopes) se carga
 * en runtime desde config.json: el mismo build sirve para local, API Gateway o cloud.
 */
loadAppConfig()
  .then((config) => bootstrapApplication(App, buildAppConfig(config)))
  .catch((err) => console.error(err));
