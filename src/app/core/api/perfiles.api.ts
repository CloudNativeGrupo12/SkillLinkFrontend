import { Observable } from 'rxjs';
import { Perfil, CurrentUser } from '../models/perfil.model';
import { Certificacion } from '../models/certificacion.model';

export abstract class PerfilesApi {
  abstract getPerfilByTrabajadorId(
    trabajadorId: number,
  ): Observable<Perfil | undefined>;
  abstract getCertificacionesByTrabajadorId(
    trabajadorId: number,
  ): Observable<Certificacion[]>;
  abstract getCurrentUser(): Observable<CurrentUser>;
}
