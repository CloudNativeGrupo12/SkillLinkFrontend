import { Component, input } from '@angular/core';
import { Profesional } from '../../../core/models/profesional.model';
import { ProfessionalCardComponent } from '../../../shared/components/professional-card.component';

@Component({
  selector: 'sl-featured-professionals-section',
  imports: [ProfessionalCardComponent],
  templateUrl: './featured-professionals-section.html',
  styleUrl: './featured-professionals-section.scss',
})
export class FeaturedProfessionalsSectionComponent {
  readonly profesionales = input<Profesional[]>([]);
  readonly loading = input(false);

  private readonly idMembresiaPremium = 2;

  protected esPremium(profesional: Profesional): boolean {
    return profesional.membresiaId === this.idMembresiaPremium;
  }
}
