import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CategoriasApi } from './categorias.api';
import { Categoria } from '../models/categoria.model';
import { APP_CONFIG } from '../config/app-config';
import { iconoCategoria } from '../icons/categoria-icons';

interface CategoriaCatalogoDto {
  id: number;
  nombre: string;
  descripcion: string | null;
  icono: string | null;
  servicios: number;
}

@Injectable({ providedIn: 'root' })
export class CategoriasApiReal implements CategoriasApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${inject(APP_CONFIG).apiBaseUrl}/api/v1/catalogo/categorias`;

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<CategoriaCatalogoDto[]>(this.base).pipe(map((lista) => lista.map(aCategoria)));
  }

  getCategoriaById(id: number): Observable<Categoria | undefined> {
    return this.http.get<CategoriaCatalogoDto>(`${this.base}/${id}`).pipe(map(aCategoria));
  }
}

function aCategoria(dto: CategoriaCatalogoDto): Categoria {
  return {
    id: dto.id,
    nombre: dto.nombre,
    descripcion: dto.descripcion ?? '',
    icono: iconoCategoria(dto.icono),
    servicios: dto.servicios ?? 0,
  };
}
