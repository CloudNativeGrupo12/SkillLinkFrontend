import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ServiciosApi } from './servicios.api';
import { Servicio, CreateServicioDto } from '../models/servicio.model';
import { APP_CONFIG } from '../config/app-config';

/** Forma que entrega GET /api/v1/catalogo/publicaciones. */
interface PublicacionCatalogoDto {
  id: number;
  nombre: string;
  descripcion: string | null;
  categoriaId: number | null;
  categoriaNombre: string;
  trabajadorId: number | null;
  perfilId: number | null;
  trabajadorNombre: string;
  ubicacion: string;
  precioMin: number;
  precioMax: number;
  tipoPrecio: string;
  moneda: string;
  estado: string;
  rating: number;
  reviews: number;
}

@Injectable({ providedIn: 'root' })
export class ServiciosApiReal implements ServiciosApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${inject(APP_CONFIG).apiBaseUrl}/api/v1/catalogo/publicaciones`;

  /** Lectura publica: no requiere token. */
  getServicios(categoriaId?: number): Observable<Servicio[]> {
    let params = new HttpParams();
    if (categoriaId) params = params.set('categoriaId', categoriaId);
    return this.http.get<PublicacionCatalogoDto[]>(this.base, { params }).pipe(map((l) => l.map(aServicio)));
  }

  getServiciosDestacados(categoriaId?: number): Observable<Servicio[]> {
    let params = new HttpParams().set('destacadas', true).set('limite', 3);
    if (categoriaId) params = params.set('categoriaId', categoriaId);
    return this.http.get<PublicacionCatalogoDto[]>(this.base, { params }).pipe(map((l) => l.map(aServicio)));
  }

  getServiciosByTrabajador(trabajadorId: number): Observable<Servicio[]> {
    const params = new HttpParams().set('trabajadorId', trabajadorId);
    return this.http.get<PublicacionCatalogoDto[]>(this.base, { params }).pipe(map((l) => l.map(aServicio)));
  }

  /** Escritura protegida: requiere Access Token con scope de escritura (403 si falta). */
  createServicio(dto: CreateServicioDto): Observable<Servicio> {
    return this.http.post<PublicacionCatalogoDto>(this.base, dto).pipe(map(aServicio));
  }

  /** Escritura protegida: dueno de la publicacion o rol ADMIN. */
  deleteServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

function aServicio(dto: PublicacionCatalogoDto): Servicio {
  return {
    id: dto.id,
    nombre: dto.nombre,
    descripcion: dto.descripcion ?? '',
    categoriaId: dto.categoriaId ?? 0,
    categoriaNombre: dto.categoriaNombre,
    trabajadorId: dto.trabajadorId ?? 0,
    trabajadorNombre: dto.trabajadorNombre,
    perfilId: dto.perfilId ?? undefined,
    ubicacion: dto.ubicacion,
    precioMin: Number(dto.precioMin),
    precioMax: Number(dto.precioMax),
    tipoPrecio: dto.tipoPrecio,
    moneda: dto.moneda,
    estado: dto.estado,
    rating: Number(dto.rating ?? 0),
    reviews: dto.reviews ?? 0,
  };
}
