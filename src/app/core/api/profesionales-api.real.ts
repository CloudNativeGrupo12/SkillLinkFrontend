import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProfesionalesApi } from './profesionales.api';
import { Profesional } from '../models/profesional.model';
import { APP_CONFIG } from '../config/app-config';

interface ProfesionalCatalogoDto {
  id: number;
  perfilId: number | null;
  username: string | null;
  nombre: string;
  apPaterno: string;
  rol: string;
  ciudad: string;
  comuna: string;
  rating: number;
  reviews: number;
  precio: number;
  membresiaId: number | null;
  verificado: boolean;
  categoriaId: number | null;
}

@Injectable({ providedIn: 'root' })
export class ProfesionalesApiReal implements ProfesionalesApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${inject(APP_CONFIG).apiBaseUrl}/api/v1/catalogo/profesionales`;

  getProfesionales(): Observable<Profesional[]> {
    return this.http.get<ProfesionalCatalogoDto[]>(this.base).pipe(map((l) => l.map(aProfesional)));
  }

  getProfesionalesDestacados(): Observable<Profesional[]> {
    const params = new HttpParams().set('destacados', true);
    return this.http.get<ProfesionalCatalogoDto[]>(this.base, { params }).pipe(map((l) => l.map(aProfesional)));
  }

  getProfesionalById(id: number): Observable<Profesional | undefined> {
    return this.http.get<ProfesionalCatalogoDto>(`${this.base}/${id}`).pipe(map(aProfesional));
  }
}

function aProfesional(dto: ProfesionalCatalogoDto): Profesional {
  return {
    id: dto.id,
    nombre: dto.nombre,
    apPaterno: dto.apPaterno,
    rol: dto.rol,
    ciudad: dto.ciudad,
    comuna: dto.comuna,
    rating: Number(dto.rating ?? 0),
    reviews: dto.reviews ?? 0,
    precio: Number(dto.precio ?? 0),
    membresiaId: dto.membresiaId ?? 1,
    verificado: dto.verificado,
    categoriaId: dto.categoriaId ?? 0,
  };
}
