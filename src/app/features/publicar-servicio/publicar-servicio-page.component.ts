import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { form, FormField, FormRoot, required, maxLength, min } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { CategoriasApi } from '../../core/api/categorias.api';
import { ServiciosApi } from '../../core/api/servicios.api';
import { Categoria } from '../../core/models/categoria.model';
import { CreateServicioDto } from '../../core/models/servicio.model';
import { AuthService } from '../../core/auth/auth.service';
import { describirError, ErrorApi } from '../../core/http/api-error';

interface PublicarServicioModel {
  titulo: string;
  descripcion: string;
  categoriaId: string;
  precio: number;
  nombre: string;
}

@Component({
  imports: [FormField, FormRoot, RouterLink],
  templateUrl: './publicar-servicio-page.html',
  styleUrl: './publicar-servicio-page.scss',
})
export class PublicarServicioPageComponent {
  private readonly categoriasApi = inject(CategoriasApi);
  private readonly serviciosApi = inject(ServiciosApi);
  protected readonly auth = inject(AuthService);

  protected readonly categorias = rxResource<Categoria[], unknown>({
    stream: () => this.categoriasApi.getCategorias(),
  });

  private readonly modelo = signal<PublicarServicioModel>({
    titulo: '',
    descripcion: '',
    categoriaId: '',
    precio: 0,
    nombre: '',
  });

  protected readonly servicioForm = form(this.modelo, (schemaPath) => {
    required(schemaPath.titulo, { message: 'El título del servicio es obligatorio.' });
    required(schemaPath.descripcion, { message: 'La descripción es obligatoria.' });
    maxLength(schemaPath.descripcion, 500, { message: 'La descripción no puede superar los 500 caracteres.' });
    required(schemaPath.categoriaId, { message: 'Selecciona una categoría.' });
    required(schemaPath.precio, { message: 'Indica un precio.' });
    min(schemaPath.precio, 1, { message: 'El precio debe ser mayor a 0.' });
    required(schemaPath.nombre, { message: 'Tu nombre es obligatorio.' });
  });

  protected readonly descripcionLargo = computed(
    () => (this.servicioForm.descripcion().value() ?? '').toString().length,
  );

  protected readonly enviando = signal(false);
  protected readonly publicado = signal(false);
  protected readonly submitIntentado = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly errorApi = signal<ErrorApi | null>(null);

  protected readonly mostrarErrores = computed(
    () => this.submitIntentado() && this.servicioForm().invalid(),
  );

  protected async publicar(): Promise<void> {
    this.publicado.set(false);
    this.error.set(null);
    this.errorApi.set(null);
    this.submitIntentado.set(true);

    if (this.servicioForm().invalid()) {
      return;
    }

    const m = this.modelo();
    const dto: CreateServicioDto = {
      titulo: m.titulo,
      descripcion: m.descripcion,
      categoriaId: Number(m.categoriaId),
      precio: Number(m.precio),
      nombreAutor: m.nombre,
    };

    this.enviando.set(true);
    try {
      await firstValueFrom(this.serviciosApi.createServicio(dto));
      this.publicado.set(true);
      this.modelo.set({
        titulo: '',
        descripcion: '',
        categoriaId: '',
        precio: 0,
        nombre: '',
      });
    } catch (e) {
      const info = describirError(e);
      this.errorApi.set(info);
      this.error.set(`${info.titulo} (HTTP ${info.status}). ${info.detalle}`);
    } finally {
      this.enviando.set(false);
    }
  }
}
