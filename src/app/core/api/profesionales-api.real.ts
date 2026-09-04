import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ProfesionalesApi } from './profesionales.api';
import { Profesional } from '../models/profesional.model';

@Injectable({ providedIn: 'root' })
export class ProfesionalesApiReal implements ProfesionalesApi {
  getProfesionales(): Observable<Profesional[]> {
    return throwError(() => new Error('No implementado: ProfesionalesApiReal.getProfesionales'));
  }

  getProfesionalesDestacados(): Observable<Profesional[]> {
    return throwError(() => new Error('No implementado: ProfesionalesApiReal.getProfesionalesDestacados'));
  }

  getProfesionalById(_id: number): Observable<Profesional | undefined> {
    return throwError(() => new Error('No implementado: ProfesionalesApiReal.getProfesionalById'));
  }
}
