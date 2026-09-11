import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { SKIP_AUTH_HEADER } from '../../core/auth/auth.interceptor';
import { APP_CONFIG } from '../../core/config/app-config';
import { describirError } from '../../core/http/api-error';

type Metodo = 'GET' | 'POST' | 'DELETE';
type Credencial = 'sin-token' | 'token-invalido' | 'token';

interface Escenario {
  id: string;
  titulo: string;
  metodo: Metodo;
  ruta: string;
  credencial: Credencial;
  esperado: string;
  demuestra: string;
  body?: unknown;
}

interface Resultado {
  status: number;
  ok: boolean;
  cuerpo: string;
  ms: number;
  coincide: boolean;
}

/**
 * Kit de evidencia EV1: provoca y observa la matriz 200 / 401 / 403 contra la API real.
 * Nunca muestra el Access Token completo; solo claims relevantes (iss, aud, scp, roles, exp).
 */
@Component({
  templateUrl: './seguridad-page.html',
  styleUrl: './seguridad-page.scss',
})
export class SeguridadPageComponent {
  protected readonly auth = inject(AuthService);
  protected readonly config = inject(APP_CONFIG);
  private readonly http = inject(HttpClient);

  protected readonly escenarios: Escenario[] = [
    {
      id: 'publico',
      titulo: 'Recurso público',
      metodo: 'GET',
      ruta: '/api/v1/public/health',
      credencial: 'sin-token',
      esperado: '200',
      demuestra: 'El recurso es accesible sin autenticación.',
    },
    {
      id: 'catalogo',
      titulo: 'Catálogo público (dominio)',
      metodo: 'GET',
      ruta: '/api/v1/catalogo/publicaciones?limite=1',
      credencial: 'sin-token',
      esperado: '200',
      demuestra: 'Lectura pública de publicaciones persistidas.',
    },
    {
      id: 'sin-token',
      titulo: 'Protegido sin token',
      metodo: 'GET',
      ruta: '/api/v1/auth/me',
      credencial: 'sin-token',
      esperado: '401',
      demuestra: 'La API exige autenticación (Bearer ausente).',
    },
    {
      id: 'token-invalido',
      titulo: 'Protegido con token inválido',
      metodo: 'GET',
      ruta: '/api/v1/auth/me',
      credencial: 'token-invalido',
      esperado: '401',
      demuestra: 'El Resource Server rechaza un JWT que no puede validar.',
    },
    {
      id: 'token-valido',
      titulo: 'Protegido con token válido',
      metodo: 'GET',
      ruta: '/api/v1/auth/me',
      credencial: 'token',
      esperado: '200',
      demuestra: 'Firma, issuer, audience y vigencia aceptados.',
    },
    {
      id: 'perfil-protegido',
      titulo: 'Lectura protegida de dominio',
      metodo: 'GET',
      ruta: '/api/v1/catalogo/perfiles/por-trabajador/1',
      credencial: 'token',
      esperado: '200',
      demuestra: 'Datos de contacto solo para usuarios autenticados.',
    },
    {
      id: 'scope-write',
      titulo: 'Escritura por scope',
      metodo: 'POST',
      ruta: '/api/v1/auth/write-check',
      credencial: 'token',
      esperado: '403 sin scope · 200 con scope',
      demuestra: 'Autorización por scope delegado (SCOPE_skilllink.write).',
    },
    {
      id: 'rol-admin',
      titulo: 'Operación administrativa por rol',
      metodo: 'GET',
      ruta: '/api/v1/admin/ping',
      credencial: 'token',
      esperado: '403 sin rol · 200 con rol ADMIN',
      demuestra: 'Autorización por App Role (ROLE_ADMIN).',
    },
    {
      id: 'admin-dominio',
      titulo: 'Recurso admin de dominio',
      metodo: 'GET',
      ruta: '/api/v1/admin/suscripciones',
      credencial: 'token',
      esperado: '403 sin rol · 200 con rol ADMIN',
      demuestra: 'Solo ADMIN lista los interesados en Premium.',
    },
  ];

  protected readonly resultados = signal<Record<string, Resultado>>({});
  protected readonly ejecutando = signal<string | null>(null);
  protected readonly claims = signal<Record<string, unknown> | null>(null);
  protected readonly claimsError = signal<string | null>(null);

  protected readonly claimsRelevantes = computed(() => {
    const c = this.claims();
    if (!c) return [];
    const fecha = (v: unknown) => (typeof v === 'number' ? new Date(v * 1000).toLocaleString() : String(v ?? '-'));
    return [
      { claim: 'iss', valor: String(c['iss'] ?? '-') },
      { claim: 'aud', valor: String(c['aud'] ?? '-') },
      { claim: 'sub', valor: String(c['sub'] ?? '-') },
      { claim: 'preferred_username / email', valor: String(c['preferred_username'] ?? c['email'] ?? '-') },
      { claim: 'scp', valor: String(c['scp'] ?? '-') },
      { claim: 'roles', valor: Array.isArray(c['roles']) ? (c['roles'] as string[]).join(', ') : '-' },
      { claim: 'iat', valor: fecha(c['iat']) },
      { claim: 'exp', valor: fecha(c['exp']) },
    ];
  });

  protected async ejecutar(escenario: Escenario): Promise<void> {
    this.ejecutando.set(escenario.id);
    const inicio = performance.now();
    let headers = new HttpHeaders();
    if (escenario.credencial === 'sin-token') {
      headers = headers.set(SKIP_AUTH_HEADER, '1');
    } else if (escenario.credencial === 'token-invalido') {
      headers = headers.set(SKIP_AUTH_HEADER, '1').set('Authorization', 'Bearer token-invalido.no.firmado');
    }
    const url = `${this.config.apiBaseUrl}${escenario.ruta}`;
    const opciones = { headers, observe: 'response' as const, responseType: 'text' as const };
    try {
      const respuesta: HttpResponse<string> =
        escenario.metodo === 'POST'
          ? await firstValueFrom(this.http.post(url, escenario.body ?? {}, opciones))
          : escenario.metodo === 'DELETE'
            ? await firstValueFrom(this.http.delete(url, opciones))
            : await firstValueFrom(this.http.get(url, opciones));
      this.registrar(escenario, respuesta.status, respuesta.body ?? '', inicio);
    } catch (error) {
      const info = describirError(error);
      const cuerpo = info.status === 0 ? info.detalle : `${info.titulo}: ${info.detalle}`;
      this.registrar(escenario, info.status, cuerpo, inicio);
    } finally {
      this.ejecutando.set(null);
    }
  }

  protected async ejecutarTodos(): Promise<void> {
    for (const escenario of this.escenarios) {
      if (escenario.credencial === 'token' && !this.auth.isAuthenticated()) continue;
      await this.ejecutar(escenario);
    }
  }

  protected async inspeccionarToken(): Promise<void> {
    this.claimsError.set(null);
    try {
      this.claims.set(await this.auth.getAccessTokenClaims());
    } catch (error) {
      this.claimsError.set(String(error));
    }
  }

  protected resultado(id: string): Resultado | undefined {
    return this.resultados()[id];
  }

  protected claseStatus(status: number): string {
    if (status >= 200 && status < 300) return 'status-ok';
    if (status === 401) return 'status-401';
    if (status === 403) return 'status-403';
    return 'status-otro';
  }

  private registrar(escenario: Escenario, status: number, cuerpo: string, inicio: number): void {
    const esperados: string[] = escenario.esperado.match(/\d{3}/g) ?? [];
    const recorte = cuerpo.length > 600 ? cuerpo.slice(0, 600) + '…' : cuerpo;
    this.resultados.update((r) => ({
      ...r,
      [escenario.id]: {
        status,
        ok: status >= 200 && status < 300,
        cuerpo: recorte,
        ms: Math.round(performance.now() - inicio),
        coincide: esperados.includes(String(status)),
      },
    }));
  }
}
