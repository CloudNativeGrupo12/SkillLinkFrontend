import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { SuscripcionesApi } from '../api/suscripciones.api';
import { SuscripcionPremiumDto } from '../models/suscripcion.model';

@Injectable({ providedIn: 'root' })
export class SuscripcionesApiMock implements SuscripcionesApi {
  suscribir(_dto: SuscripcionPremiumDto): Observable<void> {
    return of(undefined).pipe(delay(400));
  }
}
