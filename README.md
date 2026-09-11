# SkillLink — Frontend (Angular 22 + MSAL)

SPA del marketplace **SkillLink** (DSY1107 · EV1). Consume la API Spring Boot por HTTP/REST y se autentica contra
**Microsoft Entra ID** con Authorization Code + PKCE (`@azure/msal-browser`). La SPA es un cliente público:
no contiene `client_secret`.

## Requisitos

- Node.js **24 LTS** (Angular 22 exige ≥ 22.22) y npm.
- Backend SkillLink corriendo (local en `http://localhost:8080` o el API Gateway de AWS).

## Ejecutar en local

```bash
npm ci
npm start          # http://localhost:4200
```

La configuración de ambiente se carga en **runtime** desde [`public/config.json`](public/config.json)
(no hace falta recompilar para cambiar de API o de tenant):

```json
{
  "apiBaseUrl": "http://localhost:8080",
  "auth": {
    "clientId": "f459e214-84c8-4ada-bfa0-3855d6ddda74",
    "tenantId": "72fd0b5a-8a6a-4cff-89f6-bde961f7e250",
    "apiScope": "api://393a4087-9e4d-41c4-a0ce-1755b1ba0d2f/skilllink.write"
  }
}
```

- `apiBaseUrl`: backend directo o URL del API Gateway (`API_BASE_URL`).
- `auth.clientId` / `auth.tenantId`: App Registration `SkillLink-SPA` en el tenant DuocUC (`http://localhost:4200`
  está registrado como redirect URI). Son identificadores públicos, no secretos.
- `auth.apiScope`: scope delegado solicitado. Con `.../skilllink.read` se puede provocar el **403** por scope.
- `useMocks: true` (opcional) usa datos en memoria sin backend.

## Rutas

| Ruta | Acceso | Qué demuestra |
|---|---|---|
| `/`, `/categorias`, `/servicios` | público | consulta de recursos persistidos (2xx) |
| `/publicar-servicio` | guard + scope `skilllink.write` | modificación protegida (201 / 401 / 403) |
| `/mi-perfil` | guard + autenticado | lectura protegida con datos de contacto |
| `/seguridad` | público | matriz 200 / 401 / 403 contra la API real y claims del Access Token |

## Estructura relevante

```text
src/app/core/config/app-config.ts      carga de config.json (APP_CONFIG)
src/app/core/auth/auth.service.ts      login, logout, cuenta, acquireTokenSilent (MSAL)
src/app/core/auth/auth.interceptor.ts  Authorization: Bearer <access_token> solo hacia la API
src/app/core/auth/auth.guard.ts        protege navegación (no sustituye al backend)
src/app/core/http/api-error.ts         traduce 401/403/404/400 (RFC 7807) a estados de UI
src/app/core/api/*-api.real.ts         clientes HTTP reales (/api/v1/catalogo/**)
src/app/features/seguridad/            evidencia 200/401/403
```

## Pruebas y build

```bash
npm test                               # vitest (61 pruebas)
npx ng build --configuration production
```

Publicación en AWS: `deploy/aws/deploy-frontend.sh` del repo backend (S3 + API Gateway HTTPS).
Documentación completa de la evaluación: repo `ProyectoSkillLinkBackend/docs/`.
