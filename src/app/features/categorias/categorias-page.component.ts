import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoriasApi } from '../../core/api/categorias.api';
import { Categoria } from '../../core/models/categoria.model';
import { CategoryCardComponent } from '../../shared/components/category-card.component';

@Component({
  imports: [CategoryCardComponent],
  templateUrl: './categorias-page.html',
  styleUrl: './categorias-page.scss',
})
export class CategoriasPageComponent {
  private readonly categoriasApi = inject(CategoriasApi);

  protected readonly categorias = rxResource<Categoria[], unknown>({
    stream: () => this.categoriasApi.getCategorias(),
  });
}
