import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TopCategoriesSectionComponent } from './top-categories-section.component';
import { Categoria } from '../../../core/models/categoria.model';

const categoria: Categoria = {
  id: 1,
  nombre: 'Plomería',
  descripcion: 'Servicios de plomería',
  icono: '<svg></svg>',
  servicios: 10,
};

describe('TopCategoriesSectionComponent', () => {
  let fixture: ComponentFixture<TopCategoriesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCategoriesSectionComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TopCategoriesSectionComponent);
  });

  it('renderiza una tarjeta por categoría recibida', () => {
    fixture.componentRef.setInput('categorias', [
      categoria,
      { ...categoria, id: 2 },
    ]);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('sl-category-card').length).toBe(2);
  });

  it('muestra el botón "Ver Todas las Categorías" enlazando a /categorias', () => {
    fixture.detectChanges();
    const link: HTMLElement | null = fixture.nativeElement.querySelector(
      'a[href="/categorias"]',
    );
    expect(link?.textContent).toContain('Ver Todas las Categorías');
  });

  it('muestra un mensaje de carga mientras `loading` es true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Cargando');
  });
});
