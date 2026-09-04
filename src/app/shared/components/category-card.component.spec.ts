import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CategoryCardComponent } from './category-card.component';
import { Categoria } from '../../core/models/categoria.model';

const categoria: Categoria = {
  id: 3,
  nombre: 'Electricidad',
  descripcion: 'Servicios eléctricos',
  icono: '<svg><path d="M0 0"></path></svg>',
  servicios: 42,
};

describe('CategoryCardComponent', () => {
  let fixture: ComponentFixture<CategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCardComponent);
    fixture.componentRef.setInput('categoria', categoria);
    fixture.detectChanges();
  });

  it('muestra el nombre de la categoría', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Electricidad');
  });

  it('muestra el contador de servicios', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('42 servicios');
  });

  it('enlaza al listado de servicios con la categoría como query param', () => {
    const link: HTMLElement | null = fixture.nativeElement.querySelector(
      'a[href="/servicios?categoria=3"]',
    );
    expect(link).not.toBeNull();
  });
});
