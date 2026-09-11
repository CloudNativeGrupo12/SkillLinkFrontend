import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { PublicarServicioPageComponent } from './publicar-servicio-page.component';
import { CategoriasApi } from '../../core/api/categorias.api';
import { ServiciosApi } from '../../core/api/servicios.api';
import { Categoria } from '../../core/models/categoria.model';
import { Servicio, CreateServicioDto } from '../../core/models/servicio.model';
import { APP_CONFIG, DEFAULT_APP_CONFIG } from '../../core/config/app-config';

const categorias: Categoria[] = [
  { id: 1, nombre: 'Fitness', descripcion: 'Entrenadores', icono: '<svg></svg>', servicios: 45 },
];

class CategoriasApiStub implements CategoriasApi {
  getCategorias() {
    return of(categorias);
  }
  getCategoriaById(id: number) {
    return of(categorias.find((c) => c.id === id));
  }
}

let creado: CreateServicioDto | undefined;

class ServiciosApiStub implements ServiciosApi {
  getServicios() {
    return of([] as Servicio[]);
  }
  getServiciosDestacados() {
    return of([] as Servicio[]);
  }
  getServiciosByTrabajador() {
    return of([] as Servicio[]);
  }
  createServicio(dto: CreateServicioDto) {
    creado = dto;
    return of({} as Servicio);
  }
  deleteServicio() {
    return of(undefined);
  }
}

function escribir(el: HTMLInputElement | HTMLTextAreaElement, valor: string): void {
  el.value = valor;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

describe('PublicarServicioPageComponent', () => {
  let fixture: ComponentFixture<PublicarServicioPageComponent>;

  beforeEach(async () => {
    creado = undefined;
    await TestBed.configureTestingModule({
      imports: [PublicarServicioPageComponent],
      providers: [
        provideRouter([]),
        { provide: APP_CONFIG, useValue: DEFAULT_APP_CONFIG },
        { provide: CategoriasApi, useClass: CategoriasApiStub },
        { provide: ServiciosApi, useClass: ServiciosApiStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicarServicioPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('muestra el título del formulario', () => {
    expect(fixture.nativeElement.textContent).toContain('Publicar un Servicio');
  });

  it('carga las categorías en el select', () => {
    const select: HTMLSelectElement | null = fixture.nativeElement.querySelector('select');
    expect(select).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('option').length).toBe(2);
  });

  it('no publica si el formulario es inválido y muestra el aviso de errores', async () => {
    const form: HTMLFormElement | null = fixture.nativeElement.querySelector('form');
    form?.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(creado).toBeUndefined();
    expect(fixture.nativeElement.textContent).toContain('Revisa los campos marcados');
  });

  it('llama a createServicio al enviar un formulario válido', async () => {
    const el: HTMLElement = fixture.nativeElement;
    escribir(el.querySelector('#titulo') as HTMLInputElement, 'Entrenamiento Personalizado');
    escribir(el.querySelector('#descripcion') as HTMLTextAreaElement, 'Sesiones de 1 hora adaptadas a tu objetivo.');
    escribir(el.querySelector('#precio') as HTMLInputElement, '25000');
    escribir(el.querySelector('#nombre') as HTMLInputElement, 'Carlos Mendoza');

    const select: HTMLSelectElement | null = el.querySelector('#categoria');
    if (select) {
      select.value = '1';
      select.dispatchEvent(new Event('input', { bubbles: true }));
    }

    (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(creado).toEqual({
      titulo: 'Entrenamiento Personalizado',
      descripcion: 'Sesiones de 1 hora adaptadas a tu objetivo.',
      categoriaId: 1,
      precio: 25000,
      nombreAutor: 'Carlos Mendoza',
    });
    expect(fixture.nativeElement.textContent).toContain('¡Servicio publicado con éxito!');
  });
});
