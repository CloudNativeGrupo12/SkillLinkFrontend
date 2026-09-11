import { Injectable, computed, inject, signal } from '@angular/core';
import {
  AccountInfo,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from '@azure/msal-browser';
import { APP_CONFIG, authEnabled } from '../config/app-config';

/**
 * Contrato comun EV1: login, logout, usuario autenticado, cuenta actual,
 * adquisicion de Access Token y llamada autenticada a la API.
 *
 * MSAL gestiona Authorization Code + PKCE contra Microsoft Entra ID.
 * La SPA nunca crea ni firma tokens; solo los solicita y los envia como Bearer.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly config = inject(APP_CONFIG);
  private msal: PublicClientApplication | null = null;

  /** false cuando config.json no trae clientId/tenantId (modo sin IDaaS). */
  readonly enabled = authEnabled(this.config);
  readonly ready = signal(false);
  readonly account = signal<AccountInfo | null>(null);
  readonly lastError = signal<string | null>(null);

  readonly isAuthenticated = computed(() => this.account() !== null);
  readonly displayName = computed(() => this.account()?.name ?? this.account()?.username ?? '');
  readonly username = computed(() => this.account()?.username ?? '');

  /** Se ejecuta al arrancar (provideAppInitializer): procesa el retorno del redirect y fija la cuenta activa. */
  async init(): Promise<void> {
    if (!this.enabled) {
      this.ready.set(true);
      return;
    }
    this.msal = new PublicClientApplication({
      auth: {
        clientId: this.config.auth.clientId,
        authority: `https://login.microsoftonline.com/${this.config.auth.tenantId}`,
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
      },
      cache: { cacheLocation: 'sessionStorage' },
    });
    try {
      await this.msal.initialize();
      const result = await this.msal.handleRedirectPromise();
      if (result?.account) {
        this.msal.setActiveAccount(result.account);
      }
    } catch (error) {
      this.lastError.set(String(error));
      console.error('MSAL redirect error', error);
    }
    const active = this.msal.getActiveAccount() ?? this.msal.getAllAccounts()[0] ?? null;
    if (active) {
      this.msal.setActiveAccount(active);
    }
    this.account.set(active);
    this.ready.set(true);
  }

  login(): void {
    if (!this.msal) {
      return;
    }
    void this.msal.loginRedirect({ scopes: this.loginScopes() });
  }

  logout(): void {
    if (!this.msal) {
      return;
    }
    void this.msal.logoutRedirect({ account: this.account() ?? undefined });
  }

  /** Access Token para la API (no el ID Token). Silencioso; si Entra exige interaccion, redirige. */
  async getAccessToken(): Promise<string | null> {
    const account = this.account();
    if (!this.msal || !account) {
      return null;
    }
    try {
      const result = await this.msal.acquireTokenSilent({ account, scopes: this.apiScopes() });
      return result.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        await this.msal.acquireTokenRedirect({ account, scopes: this.apiScopes() });
      }
      throw error;
    }
  }

  /** Claims del payload (solo lectura para evidencia; decodificar no es validar). */
  async getAccessTokenClaims(): Promise<Record<string, unknown> | null> {
    const token = await this.getAccessToken();
    return token ? decodeJwtPayload(token) : null;
  }

  private apiScopes(): string[] {
    return this.config.auth.apiScope ? [this.config.auth.apiScope] : [];
  }

  private loginScopes(): string[] {
    return ['openid', 'profile', 'email', ...this.apiScopes()];
  }
}

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}
