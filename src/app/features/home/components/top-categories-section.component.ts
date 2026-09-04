import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../../core/models/categoria.model';
import { CategoryCardComponent } from '../../../shared/components/category-card.component';

@Component({
  selector: 'sl-top-categories-section',
  imports: [RouterLink, CategoryCardComponent],
  templateUrl: './top-categories-section.html',
  styleUrl: './top-categories-section.scss',
})
export class TopCategoriesSectionComponent {
  readonly categorias = input<Categoria[]>([]);
  readonly loading = input(false);
}
