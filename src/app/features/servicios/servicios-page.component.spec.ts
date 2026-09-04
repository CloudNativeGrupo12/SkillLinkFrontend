import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ServiciosPageComponent } from './servicios-page.component';
import { ServiciosApi } from '../../core/api/servicios.api';
import { CategoriasApi } from '../../core/api/categorias.api';
import { ProfesionalesApi } from '../../core/api/profesionales.api';
import { Servicio, CreateServicioDto } from '../../core/models/servicio.model';
import { Categoria } from '../../core/models/categoria.model';
import { Profesional } from '../../core/models/profesional.model';

const categorias: Categoria[] = [
  { id: 1, nombre: 'Fitness', descripcion: 'Entrenadores y nutricionistas', icono: '<svg></svg>', servicios: 45 },
  { id: 2, nombre: 'Programación', descripcion: 'Desarrolladores', icono: '<svg></svg>', servicios: 89 },
];

const profesionales: Profesional[] = [
  { id: 1, nombre: 'Carlos', apPaterno: 'Mendoza', rol: 'Entrenador', ciudad: 'Santiago', comuna: 'Las Condes', rating: 4.9, reviews: 127, precio: 25000, membresiaId: 1, verificado: true, categoriaId: 1 },
];

const servicios: Servicio[] = [
  { id: 1, nombre: 'Entrenamiento', descripcion: 'Sesiones', categoriaId: 1, trabajadorId: 1, precioMin: 20000, precioMax: 35000, tipoPrecio: 'por sesión', moneda: 'CLP', estado: 'activo', rating: 4.9, reviews: 45 },
  { id: 2, nombre: 'App Móvil', descripcion: 'Apps', categoriaId: 2, trabajadorId: 1, precioMin: 100000, precioMax: 500000, tipoPrecio: 'por proyecto', moneda: 'CLP', estado: 'activo', rating: 4.9, reviews: 18 },
  { id: 3, nombre: 'Plan Nutricional', descripcion: 'Planes', categoriaId: 1, trabajadorId: 1, precioMin: 15000, precioMax: 25000, tipoPrecio: 'mensual', moneda: 'CLP', estado: 'activo', rating: 4.8, reviews: 33 },
];

class ServiciosApiStub implements ServiciosApi {
  getServicios(categoriaId?: number) {
    const list = categoriaId ? servicios.filter((s) => s.categoriaId === categoriaId) : servicios;
    return of(list);
  }
  getServiciosDestacados(categoriaId?: number) {
    return of(categoriaId ? servicios.filter((s) => s.categoriaId === categoriaId) : servicios);
  }
  getServiciosByTrabajador(trabajadorId: number) {
    return of(servicios.filter((s) => s.trabajadorId === trabajadorId));
  }
  createServicio(dto: CreateServicioDto) {
    return of({} as Servicio);
  }
  deleteServicio(id: number) {
    return of(undefined);
  }
}

class CategoriasApiStub implements CategoriasApi {
  getCategorias() {
    return of(categorias);
  }
  getCategoriaById(id: number) {
    return of(categorias.find((c) => c.id === id));
  }
}

class ProfesionalesApiStub implements ProfesionalesApi {
  getProfesionales() {
    return of(profesionales);
  }
  getProfesionalesDestacados() {
    return of(profesionales);
  }
  getProfesionalById(id: number) {
    return of(profesionales.find((p) => p.id === id));
  }
}

describe('ServiciosPageComponent', () => {
  let fixture: ComponentFixture<ServiciosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosPageComponent],
      providers: [
        provideRouter([]),
        { provide: ServiciosApi, useClass: ServiciosApiStub },
        { provide: CategoriasApi, useClass: CategoriasApiStub },
        { provide: ProfesionalesApi, useClass: ProfesionalesApiStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiciosPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('muestra el título por defecto cuando no hay categoría', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Servicios Disponibles');
  });

  it('lista los servicios mostrando nombre, trabajador y precio', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('sl-service-card').length).toBeGreaterThanOrEqual(3);
    expect(el.textContent).toContain('Carlos Mendoza');
    expect(el.textContent).toContain('$20.000');
  });

  it('muestra destacados y todos los servicios', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('.section-title-left').length).toBe(2);
    const cards = el.querySelectorAll('sl-service-card');
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it('filtra por categoría cuando se pasa el input categoria', async () => {
    fixture.componentRef.setInput('categoria', 2);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Servicios de Programación');
    expect(el.querySelectorAll('sl-service-card').length).toBe(2);
  });
});
