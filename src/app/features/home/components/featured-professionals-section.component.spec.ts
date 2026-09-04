import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FeaturedProfessionalsSectionComponent } from './featured-professionals-section.component';
import { Profesional } from '../../../core/models/profesional.model';

const base: Profesional = {
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
};

describe('FeaturedProfessionalsSectionComponent', () => {
  let fixture: ComponentFixture<FeaturedProfessionalsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedProfessionalsSectionComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProfessionalsSectionComponent);
  });

  it('muestra una tarjeta por cada profesional recibido', () => {
    fixture.componentRef.setInput('profesionales', [base, { ...base, id: 2 }]);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('sl-professional-card').length).toBe(2);
  });

  it('marca como premium a quien tiene membresiaId 2', () => {
    fixture.componentRef.setInput('profesionales', [
      { ...base, id: 1, membresiaId: 2 },
    ]);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Premium');
  });

  it('muestra un mensaje de carga mientras `loading` es true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Cargando');
  });

  it('muestra un aviso cuando no hay profesionales', () => {
    fixture.componentRef.setInput('profesionales', []);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('No hay profesionales destacados');
  });
});
