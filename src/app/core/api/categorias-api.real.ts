import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CategoriasApi } from './categorias.api';
import { Categoria } from '../models/categoria.model';

@Injectable({ providedIn: 'root' })
export class CategoriasApiReal implements CategoriasApi {
  getCategorias(): Observable<Categoria[]> {
    return throwError(() => new Error('No implementado: CategoriasApiReal.getCategorias'));
  }

  getCategoriaById(_id: number): Observable<Categoria | undefined> {
    return throwError(() => new Error('No implementado: CategoriasApiReal.getCategoriaById'));
  }
}
