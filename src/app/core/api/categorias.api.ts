import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

export abstract class CategoriasApi {
  abstract getCategorias(): Observable<Categoria[]>;
  abstract getCategoriaById(id: number): Observable<Categoria | undefined>;
}
