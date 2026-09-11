import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PerfilesApi } from './perfiles.api';
import { Perfil, CurrentUser } from '../models/perfil.model';
import { Certificacion } from '../models/certificacion.model';
import { APP_CONFIG } from '../config/app-config';

interface PerfilPublicoDto {
  id: number;
  trabajadorId: number | null;
  username: string;
  descripcion: string | null;
  tituloProfesional: string | null;
  categoriaId: number | null;
  contacto: string | null;
  telefono: string | null;
  experiencia: string | null;
  resumenCV: string | null;
}

interface CertificacionPublicaDto {
  id: number;
  nombre: string;
  entidad: string;
  fecha: string;
  urlVerificacion: string;
  trabajadorId: number;
}

@Injectable({ providedIn: 'root' })
export class PerfilesApiReal implements PerfilesApi {
  private readonly http = inject(HttpClient);
  private readonly api = inject(APP_CONFIG).apiBaseUrl;

  /** Lectura protegida: los datos de contacto requieren usuario autenticado (401 sin token). */
  getPerfilByTrabajadorId(trabajadorId: number): Observable<Perfil | undefined> {
    return this.http
      .get<PerfilPublicoDto>(`${this.api}/api/v1/catalogo/perfiles/por-trabajador/${trabajadorId}`)
      .pipe(
        map((dto) => ({
          id: dto.id,
          trabajadorId: dto.trabajadorId ?? undefined,
          username: dto.username,
          descripcion: dto.descripcion ?? '',
          tituloProfesional: dto.tituloProfesional ?? undefined,
          categoriaId: dto.categoriaId ?? undefined,
          contacto: dto.contacto ?? '',
          telefono: dto.telefono ?? '',
          experiencia: dto.experiencia ?? '',
          resumenCV: dto.resumenCV ?? '',
        })),
      );
  }

  getCertificacionesByTrabajadorId(trabajadorId: number): Observable<Certificacion[]> {
    return this.http
      .get<CertificacionPublicaDto[]>(`${this.api}/api/v1/catalogo/certificaciones/por-trabajador/${trabajadorId}`)
      .pipe(map((l) => l.map((c) => ({ id: c.id, nombre: c.nombre, entidad: c.entidad, fecha: c.fecha, trabajadorId: c.trabajadorId }))));
  }

  /** Requiere token: la API resuelve (o crea) la persona/perfil del usuario autenticado. */
  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this.api}/api/v1/usuarios/me`);
  }
}
