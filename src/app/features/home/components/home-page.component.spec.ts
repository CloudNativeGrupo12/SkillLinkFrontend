import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { CategoriasApi } from '../../../core/api/categorias.api';
import { ProfesionalesApi } from '../../../core/api/profesionales.api';
import { Categoria } from '../../../core/models/categoria.model';
import { Profesional } from '../../../core/models/profesional.model';

const categorias: Categoria[] = [
  {
    id: 1,
    nombre: 'Plomería',
    descripcion: '',
    icono: '<svg></svg>',
    servicios: 10,
  },
  { id: 2, nombre: 'Electricidad', descripcion: '', icono: '<svg></svg>', servicios: 8 },
  { id: 3, nombre: 'Carpintería', descripcion: '', icono: '<svg></svg>', servicios: 6 },
  { id: 4, nombre: 'Pintura', descripcion: '', icono: '<svg></svg>', servicios: 5 },
  { id: 5, nombre: 'Jardinería', descripcion: '', icono: '<svg></svg>', servicios: 4 },
  { id: 6, nombre: 'Limpieza', descripcion: '', icono: '<svg></svg>', servicios: 3 },
  { id: 7, nombre: 'Mudanza', descripcion: '', icono: '<svg></svg>', servicios: 2 },
];

const profesionales: Profesional[] = [
  {
    id: 1,
    nombre: 'Ana',
    apPaterno: 'López',
    rol: 'Diseñadora',
    ciudad: 'Santiago',
    comuna: 'Ñuñoa',
    rating: 4.9,
    reviews: 12,
    precio: 10000,
    membresiaId: 1,
    verificado: true,
    categoriaId: 2,
  },
];

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

describe('HomePageComponent', () => {
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        provideRouter([]),
        { provide: CategoriasApi, useClass: CategoriasApiStub },
        { provide: ProfesionalesApi, useClass: ProfesionalesApiStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('componen las seis secciones de la home', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('sl-hero-section')).not.toBeNull();
    expect(el.querySelector('sl-problem-section')).not.toBeNull();
    expect(el.querySelector('sl-solution-section')).not.toBeNull();
    expect(el.querySelector('sl-featured-professionals-section')).not.toBeNull();
    expect(el.querySelector('sl-top-categories-section')).not.toBeNull();
    expect(el.querySelector('sl-cta-section')).not.toBeNull();
  });

  it('muestra la lista completa de profesionales destacados una vez cargada', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(
      el.querySelectorAll('sl-featured-professionals-section sl-professional-card')
        .length,
    ).toBe(profesionales.length);
  });

  it('muestra solo las primeras seis categorías en la home', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll(
      'sl-top-categories-section sl-category-card',
    );
    expect(cards.length).toBe(6);
  });
});
