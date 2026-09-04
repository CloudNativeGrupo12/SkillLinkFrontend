import { Observable } from 'rxjs';
import { SuscripcionPremiumDto } from '../models/suscripcion.model';

export abstract class SuscripcionesApi {
  abstract suscribir(dto: SuscripcionPremiumDto): Observable<void>;
}
