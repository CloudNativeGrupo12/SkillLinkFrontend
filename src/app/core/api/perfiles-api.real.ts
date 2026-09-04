import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { PerfilesApi } from './perfiles.api';
import { Perfil, CurrentUser } from '../models/perfil.model';
import { Certificacion } from '../models/certificacion.model';

@Injectable({ providedIn: 'root' })
export class PerfilesApiReal implements PerfilesApi {
  getPerfilByTrabajadorId(_trabajadorId: number): Observable<Perfil | undefined> {
    return throwError(() => new Error('No implementado: PerfilesApiReal.getPerfilByTrabajadorId'));
  }

  getCertificacionesByTrabajadorId(_trabajadorId: number): Observable<Certificacion[]> {
    return throwError(() => new Error('No implementado: PerfilesApiReal.getCertificacionesByTrabajadorId'));
  }

  getCurrentUser(): Observable<CurrentUser> {
    return throwError(() => new Error('No implementado: PerfilesApiReal.getCurrentUser'));
  }
}
