import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCardComponent } from './service-card.component';
import { Servicio } from '../../core/models/servicio.model';

const servicio: Servicio = {
  id: 1,
  nombre: 'Entrenamiento Personalizado',
  descripcion: 'Sesiones adaptadas a tus objetivos.',
  categoriaId: 1,
  trabajadorId: 1,
  precioMin: 20000,
  precioMax: 35000,
  tipoPrecio: 'por sesión',
  moneda: 'CLP',
  estado: 'activo',
  rating: 4.9,
  reviews: 45,
};

describe('ServiceCardComponent', () => {
  let fixture: ComponentFixture<ServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCardComponent);
    fixture.componentRef.setInput('servicio', servicio);
    fixture.detectChanges();
  });

  it('muestra el nombre del servicio y el precio formateado', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Entrenamiento Personalizado');
    expect(el.textContent).toContain('$20.000');
  });

  it('muestra la insignia Destacado solo cuando `destacado` es true', () => {
    fixture.componentRef.setInput('destacado', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.badge-destacado')).not.toBeNull();
  });

  it('no muestra la insignia Destacado por defecto', () => {
    expect(fixture.nativeElement.querySelector('.badge-destacado')).toBeNull();
  });

  it('emite el evento contactar al pulsar el botón', () => {
    let emitido: Servicio | undefined;
    fixture.componentRef.setInput('servicio', servicio);
    fixture.componentInstance.contactar.subscribe((s) => (emitido = s));
    const btn: HTMLElement | null = fixture.nativeElement.querySelector('button.btn');
    btn?.dispatchEvent(new Event('click'));
    expect(emitido).toEqual(servicio);
  });
});
