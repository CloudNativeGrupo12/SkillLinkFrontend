import { Observable } from 'rxjs';
import { Profesional } from '../models/profesional.model';

export abstract class ProfesionalesApi {
  abstract getProfesionales(): Observable<Profesional[]>;
  abstract getProfesionalesDestacados(): Observable<Profesional[]>;
  abstract getProfesionalById(id: number): Observable<Profesional | undefined>;
}
