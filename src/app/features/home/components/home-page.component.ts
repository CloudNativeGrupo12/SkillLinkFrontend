import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoriasApi } from '../../../core/api/categorias.api';
import { ProfesionalesApi } from '../../../core/api/profesionales.api';
import { Categoria } from '../../../core/models/categoria.model';
import { Profesional } from '../../../core/models/profesional.model';
import { HeroSectionComponent } from './hero-section.component';
import { ProblemSectionComponent } from './problem-section.component';
import { SolutionSectionComponent } from './solution-section.component';
import { FeaturedProfessionalsSectionComponent } from './featured-professionals-section.component';
import { TopCategoriesSectionComponent } from './top-categories-section.component';
import { CtaSectionComponent } from './cta-section.component';

@Component({
  imports: [
    HeroSectionComponent,
    ProblemSectionComponent,
    SolutionSectionComponent,
    FeaturedProfessionalsSectionComponent,
    TopCategoriesSectionComponent,
    CtaSectionComponent,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePageComponent {
  private readonly categoriasApi = inject(CategoriasApi);
  private readonly profesionalesApi = inject(ProfesionalesApi);

  protected readonly profesionales = rxResource<Profesional[], unknown>({
    stream: () => this.profesionalesApi.getProfesionalesDestacados(),
  });

  protected readonly categorias = rxResource<Categoria[], unknown>({
    stream: () => this.categoriasApi.getCategorias(),
  });

  protected readonly topCategorias = computed(() =>
    (this.categorias.value() ?? []).slice(0, 6),
  );
}
