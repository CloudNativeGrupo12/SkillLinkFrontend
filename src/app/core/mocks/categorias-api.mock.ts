import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CategoriasApi } from '../api/categorias.api';
import { Categoria } from '../models/categoria.model';

import { CATEGORIA_ICONOS } from '../icons/categoria-icons';

const CATEGORIAS_MOCK: Categoria[] = [
  { id: 1, nombre: 'Fitness', descripcion: 'Entrenadores personales, nutricionistas y coaches deportivos', icono: CATEGORIA_ICONOS['fitness'], servicios: 45 },
  { id: 2, nombre: 'Programación', descripcion: 'Desarrolladores web, móvil y software', icono: CATEGORIA_ICONOS['programacion'], servicios: 89 },
  { id: 3, nombre: 'Gasfitería', descripcion: 'Instalación y reparación de sistemas de agua', icono: CATEGORIA_ICONOS['gasfiteria'], servicios: 34 },
  { id: 4, nombre: 'Electricidad', descripcion: 'Instalaciones eléctricas y mantenimiento', icono: CATEGORIA_ICONOS['electricidad'], servicios: 52 },
  { id: 5, nombre: 'Fotografía', descripcion: 'Fotógrafos profesionales para eventos y productos', icono: CATEGORIA_ICONOS['fotografia'], servicios: 67 },
  { id: 6, nombre: 'Carpintería', descripcion: 'Muebles a medida y reparaciones', icono: CATEGORIA_ICONOS['carpinteria'], servicios: 41 },
  { id: 7, nombre: 'Marketing Digital', descripcion: 'Especialistas en redes sociales y publicidad online', icono: CATEGORIA_ICONOS['marketing'], servicios: 73 },
  { id: 8, nombre: 'Diseño Gráfico', descripcion: 'Diseñadores de logos, branding y contenido visual', icono: CATEGORIA_ICONOS['diseno'], servicios: 58 },
  { id: 9, nombre: 'Clases Particulares', descripcion: 'Profesores de matemáticas, idiomas y más', icono: CATEGORIA_ICONOS['clases'], servicios: 62 },
  { id: 10, nombre: 'Belleza', descripcion: 'Peluqueros, maquilladores y estilistas', icono: CATEGORIA_ICONOS['belleza'], servicios: 48 },
  { id: 11, nombre: 'Limpieza', descripcion: 'Servicios de limpieza para hogar y oficina', icono: CATEGORIA_ICONOS['limpieza'], servicios: 39 },
  { id: 12, nombre: 'Gaming', descripcion: 'Coaches de videojuegos y streamers', icono: CATEGORIA_ICONOS['gaming'], servicios: 28 },
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
