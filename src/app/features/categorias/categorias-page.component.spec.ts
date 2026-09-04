import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CategoriasPageComponent } from './categorias-page.component';
import { CategoriasApi } from '../../core/api/categorias.api';
import { Categoria } from '../../core/models/categoria.model';

const categorias: Categoria[] = [
  { id: 1, nombre: 'Fitness', descripcion: 'd', icono: '<svg></svg>', servicios: 45 },
  { id: 2, nombre: 'Programación', descripcion: 'd', icono: '<svg></svg>', servicios: 89 },
];

class CategoriasApiStub implements CategoriasApi {
  getCategorias() {
    return of(categorias);
  }
  getCategoriaById(id: number) {
    return of(categorias.find((c) => c.id === id));
  }
}

describe('CategoriasPageComponent', () => {
  let fixture: ComponentFixture<CategoriasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasPageComponent],
      providers: [
        provideRouter([]),
        { provide: CategoriasApi, useClass: CategoriasApiStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriasPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('muestra el título de la página', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Explora Servicios por');
  });

  it('renderiza una tarjeta por cada categoría cargada', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('sl-category-card').length).toBe(categorias.length);
  });

  it('aplica la variante full a las tarjetas', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('sl-category-card').length).toBeGreaterThan(0);
    expect(el.querySelector('.category-card-full')).not.toBeNull();
  });
});
