import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SuscripcionesApi } from './suscripciones.api';
import { SuscripcionPremiumDto } from '../models/suscripcion.model';
import { APP_CONFIG } from '../config/app-config';

@Injectable({ providedIn: 'root' })
export class SuscripcionesApiReal implements SuscripcionesApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${inject(APP_CONFIG).apiBaseUrl}/api/v1/public/suscripciones`;

  /** Operacion publica de escritura (201). */
  suscribir(dto: SuscripcionPremiumDto): Observable<void> {
    return this.http.post(this.url, dto).pipe(map(() => undefined));
  }
}
