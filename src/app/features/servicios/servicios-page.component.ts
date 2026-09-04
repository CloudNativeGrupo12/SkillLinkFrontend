import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ServiciosApi } from '../../core/api/servicios.api';
import { CategoriasApi } from '../../core/api/categorias.api';
import { ProfesionalesApi } from '../../core/api/profesionales.api';
import { Categoria } from '../../core/models/categoria.model';
import { Profesional } from '../../core/models/profesional.model';
import { Servicio } from '../../core/models/servicio.model';
import { ServiceCardComponent } from '../../shared/components/service-card.component';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

interface ServicioConDetalle {
  servicio: Servicio;
  categoriaNombre: string;
  trabajadorNombre: string;
  ubicacion: string;
}

@Component({
  imports: [RouterLink, ServiceCardComponent, SafeHtmlPipe],
  templateUrl: './servicios-page.html',
  styleUrl: './servicios-page.scss',
})
export class ServiciosPageComponent {
  private readonly serviciosApi = inject(ServiciosApi);
  private readonly categoriasApi = inject(CategoriasApi);
  private readonly profesionalesApi = inject(ProfesionalesApi);

  protected readonly categoriaId = input<number | null>(undefined, {
    alias: 'categoria',
    transform: (v: unknown) => (v ? Number(v) : null),
  });

  private readonly servicios = rxResource<Servicio[], { categoriaId: number | null | undefined }>({
    params: () => ({ categoriaId: this.categoriaId() }),
    stream: ({ params }) =>
      this.serviciosApi.getServicios(params.categoriaId ?? undefined),
  });

  private readonly categorias = rxResource<Categoria[], unknown>({
    stream: () => this.categoriasApi.getCategorias(),
  });

  private readonly profesionales = rxResource<Profesional[], unknown>({
    stream: () => this.profesionalesApi.getProfesionales(),
  });

  protected readonly selectedCategoria = computed<Categoria | undefined>(() => {
    const id = this.categoriaId();
    if (id == null) return undefined;
    return (this.categorias.value() ?? []).find((c) => c.id === id);
  });

  protected readonly enriquecidos = computed<ServicioConDetalle[]>(() => {
    const cats = this.categorias.value() ?? [];
    const profs = this.profesionales.value() ?? [];
    return (this.servicios.value() ?? []).map((s) => {
      const cat = cats.find((c) => c.id === s.categoriaId);
      const prof = profs.find((p) => p.id === s.trabajadorId);
      return {
        servicio: s,
        categoriaNombre: cat?.nombre ?? 'General',
        trabajadorNombre: prof ? `${prof.nombre} ${prof.apPaterno}` : 'Profesional',
        ubicacion: prof ? `${prof.ciudad}, ${prof.comuna}` : 'Chile',
      };
    });
  });

  protected readonly destacados = computed<ServicioConDetalle[]>(() =>
    [...this.enriquecidos()]
      .sort((a, b) => b.servicio.rating - a.servicio.rating)
      .slice(0, 3),
  );

  protected readonly total = computed(() => this.servicios.value()?.length ?? 0);

  protected readonly tituloPagina = computed(() =>
    this.selectedCategoria()
      ? `Servicios de ${this.selectedCategoria()!.nombre}`
      : 'Servicios Disponibles',
  );

  protected readonly subtituloPagina = computed(() =>
    this.selectedCategoria()
      ? this.selectedCategoria()!.descripcion
      : 'Explora todos los servicios disponibles en nuestra plataforma',
  );

  protected readonly iconoSeleccionado = computed(() =>
    this.selectedCategoria()
      ? this.selectedCategoria()!.icono
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
  );

  protected readonly isLoading = computed(
    () =>
      this.servicios.isLoading() ||
      this.categorias.isLoading() ||
      this.profesionales.isLoading(),
  );

  protected readonly hasError = computed(
    () => this.servicios.error() || this.categorias.error() || this.profesionales.error(),
  );

  protected onContactar(servicio: Servicio): void {
    console.log('Contactando con el servicio:', servicio.nombre);
  }
}
