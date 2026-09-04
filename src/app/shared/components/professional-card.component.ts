import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profesional } from '../../core/models/profesional.model';
import { PricePipe } from '../pipes/price.pipe';

@Component({
  selector: 'sl-professional-card',
  imports: [RouterLink, PricePipe],
  templateUrl: './professional-card.html',
  styleUrl: './professional-card.scss',
})
export class ProfessionalCardComponent {
  readonly profesional = input.required<Profesional>();
  readonly premium = input(false);
}
