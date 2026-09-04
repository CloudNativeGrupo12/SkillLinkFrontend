import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CategoriasApi } from '../api/categorias.api';
import { Categoria } from '../models/categoria.model';

const ICONO_FITNESS = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
const ICONO_PROGRAMACION = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>';
const ICONO_GASFITERIA = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>';
const ICONO_ELECTRICIDAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
const ICONO_FOTOGRAFIA = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/></svg>';
const ICONO_CARPINTERIA = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
const ICONO_MARKETING = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>';
const ICONO_DISENO = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>';
const ICONO_CLASES = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';
const ICONO_BELLEZA = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/><path d="M12 3v12"/><path d="M5 21h14"/></svg>';
const ICONO_LIMPIEZA = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
const ICONO_GAMING = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="17" cy="10" r="1"/><circle cx="15" cy="14" r="1"/></svg>';

const CATEGORIAS_MOCK: Categoria[] = [
  { id: 1, nombre: 'Fitness', descripcion: 'Entrenadores personales, nutricionistas y coaches deportivos', icono: ICONO_FITNESS, servicios: 45 },
  { id: 2, nombre: 'Programación', descripcion: 'Desarrolladores web, móvil y software', icono: ICONO_PROGRAMACION, servicios: 89 },
  { id: 3, nombre: 'Gasfitería', descripcion: 'Instalación y reparación de sistemas de agua', icono: ICONO_GASFITERIA, servicios: 34 },
  { id: 4, nombre: 'Electricidad', descripcion: 'Instalaciones eléctricas y mantenimiento', icono: ICONO_ELECTRICIDAD, servicios: 52 },
  { id: 5, nombre: 'Fotografía', descripcion: 'Fotógrafos profesionales para eventos y productos', icono: ICONO_FOTOGRAFIA, servicios: 67 },
  { id: 6, nombre: 'Carpintería', descripcion: 'Muebles a medida y reparaciones', icono: ICONO_CARPINTERIA, servicios: 41 },
  { id: 7, nombre: 'Marketing Digital', descripcion: 'Especialistas en redes sociales y publicidad online', icono: ICONO_MARKETING, servicios: 73 },
  { id: 8, nombre: 'Diseño Gráfico', descripcion: 'Diseñadores de logos, branding y contenido visual', icono: ICONO_DISENO, servicios: 58 },
  { id: 9, nombre: 'Clases Particulares', descripcion: 'Profesores de matemáticas, idiomas y más', icono: ICONO_CLASES, servicios: 62 },
  { id: 10, nombre: 'Belleza', descripcion: 'Peluqueros, maquilladores y estilistas', icono: ICONO_BELLEZA, servicios: 48 },
  { id: 11, nombre: 'Limpieza', descripcion: 'Servicios de limpieza para hogar y oficina', icono: ICONO_LIMPIEZA, servicios: 39 },
  { id: 12, nombre: 'Gaming', descripcion: 'Coaches de videojuegos y streamers', icono: ICONO_GAMING, servicios: 28 },
];

@Injectable({ providedIn: 'root' })
export class CategoriasApiMock implements CategoriasApi {
  getCategorias(): Observable<Categoria[]> {
    return of(CATEGORIAS_MOCK).pipe(delay(300));
  }

  getCategoriaById(id: number): Observable<Categoria | undefined> {
    const categoria = CATEGORIAS_MOCK.find((c) => c.id === id);
    return of(categoria).pipe(delay(200));
  }
}
