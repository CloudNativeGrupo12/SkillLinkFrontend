import { describe, it, expect, beforeEach } from 'vitest';
import { Observable, of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppFooterComponent } from './app-footer.component';
import { SuscripcionesApi } from '../../core/api/suscripciones.api';
import { SuscripcionPremiumDto } from '../../core/models/suscripcion.model';

class SuscripcionesApiStub implements SuscripcionesApi {
  suscribir(_dto: SuscripcionPremiumDto): Observable<void> {
    return of(undefined);
  }
}

describe('AppFooterComponent', () => {
  let fixture: ComponentFixture<AppFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFooterComponent],
      providers: [
        provideRouter([]),
        { provide: SuscripcionesApi, useClass: SuscripcionesApiStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFooterComponent);
    fixture.detectChanges();
  });

  it('muestra el bloque de suscripción a Membresía Premium', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Suscríbete a Membresía Premium');
  });

  it('muestra la marca "SkillLink"', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('SkillLink');
  });

  it('muestra el texto de derechos reservados', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Todos los derechos reservados');
  });
});
