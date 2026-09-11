import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppHeaderComponent } from './app-header.component';
import { APP_CONFIG, DEFAULT_APP_CONFIG } from '../../core/config/app-config';

describe('AppHeaderComponent', () => {
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeaderComponent],
      providers: [provideRouter([]), { provide: APP_CONFIG, useValue: DEFAULT_APP_CONFIG }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeaderComponent);
    fixture.detectChanges();
  });

  it('renderiza la navegación con los cinco enlaces principales', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('nav a').length).toBe(5);
  });

  it('incluye el enlace "Publicar Servicio"', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Publicar Servicio');
  });

  it('indica que el IDaaS no está configurado cuando config.json no trae clientId', () => {
    expect(fixture.nativeElement.textContent).toContain('IDaaS no configurado');
  });

  it('alterna la clase "open" del menú móvil al pulsar el toggle', () => {
    const toggle: HTMLElement | null =
      fixture.nativeElement.querySelector('.menu-toggle');
    const nav: HTMLElement | null =
      fixture.nativeElement.querySelector('.nav-links');

    expect(nav?.classList.contains('open')).toBe(false);
    toggle?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(nav?.classList.contains('open')).toBe(true);
  });
});
