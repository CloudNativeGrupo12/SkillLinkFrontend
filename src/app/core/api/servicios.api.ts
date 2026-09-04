import { Observable } from 'rxjs';
import {
  Servicio,
  CreateServicioDto,
} from '../models/servicio.model';

export abstract class ServiciosApi {
  abstract getServicios(categoriaId?: number): Observable<Servicio[]>;
  abstract getServiciosDestacados(categoriaId?: number): Observable<Servicio[]>;
  abstract getServiciosByTrabajador(
    trabajadorId: number,
  ): Observable<Servicio[]>;
  abstract createServicio(dto: CreateServicioDto): Observable<Servicio>;
  abstract deleteServicio(id: number): Observable<void>;
}
