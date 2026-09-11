import { Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { ProfesionalesApi } from '../../core/api/profesionales.api';
import { PerfilesApi } from '../../core/api/perfiles.api';
import { ServiciosApi } from '../../core/api/servicios.api';
import { CategoriasApi } from '../../core/api/categorias.api';
import { Profesional } from '../../core/models/profesional.model';
import { Perfil, CurrentUser } from '../../core/models/perfil.model';
import { Certificacion } from '../../core/models/certificacion.model';
import { Servicio } from '../../core/models/servicio.model';
import { Categoria } from '../../core/models/categoria.model';
import { ServiceCardComponent } from '../../shared/components/service-card.component';
import { PricePipe } from '../../shared/pipes/price.pipe';
import { AuthService } from '../../core/auth/auth.service';
import { describirError, ErrorApi } from '../../core/http/api-error';

type VistaPerfil = 'trabajador' | 'cliente';

@Component({
  imports: [ServiceCardComponent, PricePipe],
  templateUrl: './mi-perfil-page.html',
  styleUrl: './mi-perfil-page.scss',
})
export class MiPerfilPageComponent {
  private readonly profesionalesApi = inject(ProfesionalesApi);
  private readonly perfilesApi = inject(PerfilesApi);
  private readonly serviciosApi = inject(ServiciosApi);
  private readonly categoriasApi = inject(CategoriasApi);
  protected readonly auth = inject(AuthService);

  protected readonly vista = signal<VistaPerfil>('trabajador');

  protected readonly id = input<number | null | undefined>(undefined, {
    alias: 'id',
    transform: (v: unknown) => (v ? Number(v) : undefined),
  });

  /** Solo se consulta la identidad cuando hay sesion (sin IDaaS configurado, se consulta igual para mostrar el 401). */
  private readonly currentUser = rxResource<CurrentUser, unknown>({
    stream: () => this.perfilesApi.getCurrentUser(),
  });

  private readonly visitadoTrabajadorId = computed<number>(() => {
    const propio = this.currentUser.value()?.trabajadorId;
    const visitado = this.id();
    return visitado ?? propio ?? 1;
  });

  private readonly profesional = rxResource<Profesional | undefined, number>({
    params: () => this.visitadoTrabajadorId(),
    stream: ({ params }) => this.profesionalesApi.getProfesionalById(params),
  });

  private readonly perfil = rxResource<Perfil | undefined, number>({
    params: () => this.visitadoTrabajadorId(),
    stream: ({ params }) => this.perfilesApi.getPerfilByTrabajadorId(params),
  });

  private readonly certificaciones = rxResource<Certificacion[], number>({
    params: () => this.visitadoTrabajadorId(),
    stream: ({ params }) => this.perfilesApi.getCertificacionesByTrabajadorId(params),
  });

  protected readonly userServicios = rxResource<Servicio[], number>({
    params: () => this.visitadoTrabajadorId(),
    stream: ({ params }) => this.serviciosApi.getServiciosByTrabajador(params),
  });

  private readonly categorias = rxResource<Categoria[], unknown>({
    stream: () => this.categoriasApi.getCategorias(),
  });

  protected readonly esPropio = computed(() => {
    const propio = this.currentUser.value()?.trabajadorId;
    return propio !== undefined && propio === this.visitadoTrabajadorId();
  });

  protected readonly isLoading = computed(
    () =>
      this.profesional.isLoading() ||
      this.perfil.isLoading() ||
      this.certificaciones.isLoading() ||
      this.userServicios.isLoading() ||
      this.categorias.isLoading() ||
      this.currentUser.isLoading(),
  );

  /** Primer error de API relevante, traducido a un estado comunicable (401/403/404/red). */
  protected readonly errorApi = computed<ErrorApi | null>(() => {
    const err =
      this.profesional.error() ??
      this.perfil.error() ??
      this.certificaciones.error() ??
      this.userServicios.error() ??
      this.categorias.error() ??
      this.currentUser.error();
    return err ? describirError(err) : null;
  });

  protected readonly hasError = computed(() => this.errorApi() !== null);

  protected readonly noEncontrado = computed(() => !this.profesional.value());
  protected readonly prof = computed(() => this.profesional.value());
  protected readonly perfilData = computed(() => this.perfil.value());
  protected readonly certs = computed(() => this.certificaciones.value() ?? []);
  protected readonly serviciosPublicados = computed(() => this.userServicios.value() ?? []);

  protected readonly serviciosGuardados = computed<Servicio[]>(() =>
    (this.serviciosPublicados().length >= 3
      ? this.serviciosPublicados().slice(0, 3)
      : this.serviciosPublicados()),
  );

  protected readonly categoriaNombre = computed(() => {
    const cats = this.categorias.value() ?? [];
    return (id: number): string =>
      cats.find((c) => c.id === id)?.nombre ?? 'General';
  });

  protected readonly trabajadorNombre = computed(() => {
    const p = this.prof;
    return p() ? `${p()!.nombre} ${p()!.apPaterno}` : '';
  });

  protected readonly currentUserNombre = computed(() => {
    const u = this.currentUser.value();
    return u ? `${u.nombre} ${u.apPaterno}` : '';
  });

  protected accionDemo(): void {
    console.log('Acción de demostración (pendiente de implementación).');
  }

  protected setVista(v: VistaPerfil): void {
    if (this.esPropio()) this.vista.set(v);
  }

  protected onContactar(servicio: Servicio): void {
    console.log('Contactando con el servicio:', servicio.nombre);
  }

  protected editarServicio(servicio: Servicio): void {
    console.log('Editando servicio:', servicio.nombre);
  }

  protected async eliminarServicio(servicio: Servicio): Promise<void> {
    if (confirm(`¿Eliminar el servicio "${servicio.nombre}"?`)) {
      await firstValueFrom(this.serviciosApi.deleteServicio(servicio.id));
      this.userServicios.reload();
    }
  }
}
