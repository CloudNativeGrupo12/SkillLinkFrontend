import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProfessionalCardComponent } from './professional-card.component';
import { Profesional } from '../../core/models/profesional.model';

const profesional: Profesional = {
  id: 1,
  nombre: 'Juan',
  apPaterno: 'Pérez',
  rol: 'Carpintero',
  ciudad: 'Santiago',
  comuna: 'Providencia',
  rating: 4.8,
  reviews: 25,
  precio: 15000,
  membresiaId: 2,
  verificado: true,
  categoriaId: 1,
};

describe('ProfessionalCardComponent', () => {
  let fixture: ComponentFixture<ProfessionalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalCardComponent);
    fixture.componentRef.setInput('profesional', profesional);
    fixture.detectChanges();
  });

  it('renderiza el nombre y apellido del profesional', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Juan');
    expect(el.textContent).toContain('Pérez');
  });

  it('muestra la insignia Premium cuando premium es true', () => {
    fixture.componentRef.setInput('premium', true);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.badge-premium')).not.toBeNull();
  });

  it('formatea el precio en CLP', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.card-price')?.textContent).toContain('$15.000');
  });

  it('enlaza al perfil con el id como query param', () => {
    const link: HTMLElement | null = fixture.nativeElement.querySelector(
      'a[href="/mi-perfil?id=1"]',
    );
    expect(link).not.toBeNull();
  });
});
