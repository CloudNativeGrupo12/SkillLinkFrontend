import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ServiciosApi } from './servicios.api';
import { Servicio, CreateServicioDto } from '../models/servicio.model';

@Injectable({ providedIn: 'root' })
export class ServiciosApiReal implements ServiciosApi {
  getServicios(_categoriaId?: number): Observable<Servicio[]> {
    return throwError(() => new Error('No implementado: ServiciosApiReal.getServicios'));
  }

  getServiciosDestacados(_categoriaId?: number): Observable<Servicio[]> {
    return throwError(() => new Error('No implementado: ServiciosApiReal.getServiciosDestacados'));
  }

  getServiciosByTrabajador(_trabajadorId: number): Observable<Servicio[]> {
    return throwError(() => new Error('No implementado: ServiciosApiReal.getServiciosByTrabajador'));
  }

  createServicio(_dto: CreateServicioDto): Observable<Servicio> {
    return throwError(() => new Error('No implementado: ServiciosApiReal.createServicio'));
  }

  deleteServicio(_id: number): Observable<void> {
    return throwError(() => new Error('No implementado: ServiciosApiReal.deleteServicio'));
  }
}
