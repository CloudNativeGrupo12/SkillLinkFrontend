import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { PerfilesApi } from '../api/perfiles.api';
import { Perfil, CurrentUser } from '../models/perfil.model';
import { Certificacion } from '../models/certificacion.model';

const PERFILES_MOCK: Perfil[] = [
  {
    id: 1,
    trabajadorId: 1,
    username: 'carlos.mendoza',
    descripcion:
      'Entrenador personal certificado con más de 8 años de experiencia ayudando a personas a alcanzar sus metas fitness. Especializado en entrenamiento funcional y preparación deportiva.',
    contacto: 'carlos.mendoza@email.com',
    telefono: '+56 9 1234 5678',
    experiencia: '8 años',
    resumenCV:
      'Profesional del fitness con certificaciones internacionales. Experiencia en gimnasios de alto rendimiento y entrenamiento personalizado a domicilio.',
  },
  {
    id: 2,
    trabajadorId: 2,
    username: 'maria.gonzalez',
    descripcion:
      'Desarrolladora Full Stack con pasión por crear soluciones tecnológicas innovadoras. Dominio de React, Node.js, Python y arquitectura cloud.',
    contacto: 'maria.gonzalez@email.com',
    telefono: '+56 9 2345 6789',
    experiencia: '6 años',
    resumenCV:
      'Ingeniera informática con experiencia en startups y empresas tech. Especialista en desarrollo web moderno y metodologías ágiles.',
  },
];

const CERTIFICACIONES_MOCK: Certificacion[] = [
  { id: 1, nombre: 'Certificación Personal Trainer NSCA', entidad: 'NSCA International', fecha: '2023-03-15', trabajadorId: 1 },
  { id: 2, nombre: 'AWS Certified Developer', entidad: 'Amazon Web Services', fecha: '2024-01-20', trabajadorId: 2 },
  { id: 3, nombre: 'Certificación SEC Clase D', entidad: 'SEC Chile', fecha: '2022-11-10', trabajadorId: 5 },
  { id: 4, nombre: 'Google Ads Certification', entidad: 'Google', fecha: '2024-06-05', trabajadorId: 6 },
  { id: 5, nombre: 'Adobe Certified Expert', entidad: 'Adobe', fecha: '2023-08-22', trabajadorId: 4 },
];

const CURRENT_USER_MOCK: CurrentUser = {
  tipo: 'trabajador',
  perfilId: 1,
  trabajadorId: 1,
  nombre: 'Carlos',
  apPaterno: 'Mendoza',
};

@Injectable({ providedIn: 'root' })
export class PerfilesApiMock implements PerfilesApi {
  getPerfilByTrabajadorId(trabajadorId: number): Observable<Perfil | undefined> {
    const perfil = PERFILES_MOCK.find((p) => p.trabajadorId === trabajadorId);
    return of(perfil).pipe(delay(300));
  }

  getCertificacionesByTrabajadorId(
    trabajadorId: number,
  ): Observable<Certificacion[]> {
    const certificaciones = CERTIFICACIONES_MOCK.filter(
      (c) => c.trabajadorId === trabajadorId,
    );
    return of(certificaciones).pipe(delay(250));
  }

  getCurrentUser(): Observable<CurrentUser> {
    return of(CURRENT_USER_MOCK).pipe(delay(200));
  }
}
