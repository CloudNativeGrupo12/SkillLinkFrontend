import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeaderComponent);
    fixture.detectChanges();
  });

  it('renderiza la navegación con los cuatro enlaces principales', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('nav a').length).toBe(4);
  });

  it('incluye el enlace "Publicar Servicio"', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Publicar Servicio');
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
