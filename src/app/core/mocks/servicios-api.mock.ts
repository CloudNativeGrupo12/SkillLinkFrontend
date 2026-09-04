import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ServiciosApi } from '../api/servicios.api';
import { Servicio, CreateServicioDto } from '../models/servicio.model';

const SERVICIOS_MOCK: Servicio[] = [
  { id: 1, nombre: 'Entrenamiento Personalizado', descripcion: 'Sesiones de entrenamiento adaptadas a tus objetivos, ya sea pérdida de peso, ganancia muscular o preparación deportiva.', categoriaId: 1, trabajadorId: 1, precioMin: 20000, precioMax: 35000, tipoPrecio: 'por sesión', moneda: 'CLP', estado: 'activo', rating: 4.9, reviews: 45 },
  { id: 2, nombre: 'Desarrollo Web Full Stack', descripcion: 'Desarrollo de aplicaciones web completas con React, Node.js y bases de datos SQL/NoSQL.', categoriaId: 2, trabajadorId: 2, precioMin: 40000, precioMax: 80000, tipoPrecio: 'por proyecto', moneda: 'CLP', estado: 'activo', rating: 5, reviews: 32 },
  { id: 3, nombre: 'Fotografía de Eventos Sociales', descripcion: 'Cobertura fotográfica profesional para matrimonios, cumpleaños y eventos corporativos.', categoriaId: 5, trabajadorId: 3, precioMin: 60000, precioMax: 150000, tipoPrecio: 'por evento', moneda: 'CLP', estado: 'activo', rating: 4.8, reviews: 67 },
  { id: 4, nombre: 'Diseño de Marca e Identidad Visual', descripcion: 'Creación completa de identidad de marca: logo, paleta de colores, tipografía y manual de marca.', categoriaId: 8, trabajadorId: 4, precioMin: 80000, precioMax: 200000, tipoPrecio: 'por proyecto', moneda: 'CLP', estado: 'activo', rating: 4.9, reviews: 28 },
  { id: 5, nombre: 'Instalación Eléctrica Residencial', descripcion: 'Instalación, reparación y mantención de sistemas eléctricos para hogares y departamentos.', categoriaId: 4, trabajadorId: 5, precioMin: 25000, precioMax: 60000, tipoPrecio: 'por visita', moneda: 'CLP', estado: 'activo', rating: 4.7, reviews: 89 },
  { id: 6, nombre: 'Estrategia de Marketing Digital', descripcion: 'Planificación y ejecución de campañas en redes sociales, SEO y publicidad pagada.', categoriaId: 7, trabajadorId: 6, precioMin: 35000, precioMax: 90000, tipoPrecio: 'mensual', moneda: 'CLP', estado: 'activo', rating: 5, reviews: 41 },
  { id: 7, nombre: 'Plan Nutricional Deportivo', descripcion: 'Planes de alimentación personalizados para atletas y personas activas.', categoriaId: 1, trabajadorId: 1, precioMin: 15000, precioMax: 25000, tipoPrecio: 'mensual', moneda: 'CLP', estado: 'activo', rating: 4.8, reviews: 33 },
  { id: 8, nombre: 'Desarrollo de Apps Móviles', descripcion: 'Aplicaciones nativas e híbridas para iOS y Android con diseño UX/UI incluido.', categoriaId: 2, trabajadorId: 2, precioMin: 100000, precioMax: 500000, tipoPrecio: 'por proyecto', moneda: 'CLP', estado: 'activo', rating: 5, reviews: 18 },
  { id: 9, nombre: 'Reparación de Cañerías', descripcion: 'Servicio de gasfitería integral: reparación de filtraciones, cambio de llaves y destapar cañerías.', categoriaId: 3, trabajadorId: 5, precioMin: 20000, precioMax: 45000, tipoPrecio: 'por visita', moneda: 'CLP', estado: 'activo', rating: 4.6, reviews: 55 },
  { id: 10, nombre: 'Sesión Fotográfica Profesional', descripcion: 'Sesiones de retrato, book profesional y fotografía de producto para emprendedores.', categoriaId: 5, trabajadorId: 3, precioMin: 40000, precioMax: 80000, tipoPrecio: 'por sesión', moneda: 'CLP', estado: 'activo', rating: 4.9, reviews: 52 },
  { id: 11, nombre: 'Muebles a Medida', descripcion: 'Diseño y fabricación de muebles personalizados en madera: repisas, escritorios, closets.', categoriaId: 6, trabajadorId: 1, precioMin: 80000, precioMax: 300000, tipoPrecio: 'por proyecto', moneda: 'CLP', estado: 'activo', rating: 4.7, reviews: 19 },
  { id: 12, nombre: 'Community Manager', descripcion: 'Gestión completa de redes sociales: creación de contenido, programación y análisis de métricas.', categoriaId: 7, trabajadorId: 6, precioMin: 30000, precioMax: 60000, tipoPrecio: 'mensual', moneda: 'CLP', estado: 'activo', rating: 4.8, reviews: 36 },
];

@Injectable({ providedIn: 'root' })
export class ServiciosApiMock implements ServiciosApi {
  private servicios: Servicio[] = [...SERVICIOS_MOCK];

  getServicios(categoriaId?: number): Observable<Servicio[]> {
    const filtered = categoriaId
      ? this.servicios.filter((s) => s.categoriaId === categoriaId)
      : this.servicios;
    return of([...filtered]).pipe(delay(350));
  }

  getServiciosDestacados(categoriaId?: number): Observable<Servicio[]> {
    const filtered = categoriaId
      ? this.servicios.filter((s) => s.categoriaId === categoriaId)
      : this.servicios;
    const destacados = [...filtered]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    return of(destacados).pipe(delay(400));
  }

  getServiciosByTrabajador(trabajadorId: number): Observable<Servicio[]> {
    const filtered = this.servicios.filter(
      (s) => s.trabajadorId === trabajadorId,
    );
    return of([...filtered]).pipe(delay(300));
  }

  createServicio(dto: CreateServicioDto): Observable<Servicio> {
    const nextId = Math.max(...this.servicios.map((s) => s.id)) + 1;
    const nuevo: Servicio = {
      id: nextId,
      nombre: dto.titulo,
      descripcion: dto.descripcion,
      categoriaId: dto.categoriaId,
      trabajadorId: 1,
      precioMin: dto.precio,
      precioMax: dto.precio,
      tipoPrecio: 'por servicio',
      moneda: 'CLP',
      estado: 'activo',
      rating: 0,
      reviews: 0,
    };
    this.servicios.push(nuevo);
    return of(nuevo).pipe(delay(400));
  }

  deleteServicio(id: number): Observable<void> {
    this.servicios = this.servicios.filter((s) => s.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
