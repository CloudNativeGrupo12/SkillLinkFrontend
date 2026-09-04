import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ProfesionalesApi } from '../api/profesionales.api';
import { Profesional } from '../models/profesional.model';

const PROFESIONALES_MOCK: Profesional[] = [
  { id: 1, nombre: 'Carlos', apPaterno: 'Mendoza', rol: 'Entrenador Personal', ciudad: 'Santiago', comuna: 'Las Condes', rating: 4.9, reviews: 127, precio: 25000, membresiaId: 1, verificado: true, categoriaId: 1 },
  { id: 2, nombre: 'María', apPaterno: 'González', rol: 'Desarrolladora Full Stack', ciudad: 'Valparaíso', comuna: 'Viña del Mar', rating: 5, reviews: 89, precio: 45000, membresiaId: 1, verificado: true, categoriaId: 2 },
  { id: 3, nombre: 'Roberto', apPaterno: 'Silva', rol: 'Fotógrafo de Eventos', ciudad: 'Santiago', comuna: 'Providencia', rating: 4.8, reviews: 156, precio: 80000, membresiaId: 1, verificado: true, categoriaId: 5 },
  { id: 4, nombre: 'Andrea', apPaterno: 'Torres', rol: 'Diseñadora Gráfica', ciudad: 'Concepción', comuna: 'Concepción', rating: 4.9, reviews: 94, precio: 35000, membresiaId: 2, verificado: true, categoriaId: 8 },
  { id: 5, nombre: 'Luis', apPaterno: 'Ramírez', rol: 'Electricista Certificado', ciudad: 'Santiago', comuna: 'Maipú', rating: 4.7, reviews: 203, precio: 30000, membresiaId: 2, verificado: true, categoriaId: 4 },
  { id: 6, nombre: 'Daniela', apPaterno: 'Morales', rol: 'Coach de Marketing Digital', ciudad: 'Santiago', comuna: 'Las Condes', rating: 5, reviews: 78, precio: 40000, membresiaId: 2, verificado: true, categoriaId: 7 },
];

@Injectable({ providedIn: 'root' })
export class ProfesionalesApiMock implements ProfesionalesApi {
  getProfesionales(): Observable<Profesional[]> {
    return of([...PROFESIONALES_MOCK]).pipe(delay(300));
  }

  getProfesionalesDestacados(): Observable<Profesional[]> {
    return of(PROFESIONALES_MOCK).pipe(delay(350));
  }

  getProfesionalById(id: number): Observable<Profesional | undefined> {
    const profesional = PROFESIONALES_MOCK.find((p) => p.id === id);
    return of(profesional).pipe(delay(250));
  }
}
