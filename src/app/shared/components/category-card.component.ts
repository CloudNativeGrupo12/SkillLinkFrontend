import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../core/models/categoria.model';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';

@Component({
  selector: 'sl-category-card',
  imports: [RouterLink, SafeHtmlPipe],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCardComponent {
  readonly categoria = input.required<Categoria>();
  readonly full = input(false);
}
