import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { SuscripcionesApi } from './suscripciones.api';
import { SuscripcionPremiumDto } from '../models/suscripcion.model';

@Injectable({ providedIn: 'root' })
export class SuscripcionesApiReal implements SuscripcionesApi {
  suscribir(_dto: SuscripcionPremiumDto): Observable<void> {
    return throwError(() => new Error('No implementado: SuscripcionesApiReal.suscribir'));
  }
}
