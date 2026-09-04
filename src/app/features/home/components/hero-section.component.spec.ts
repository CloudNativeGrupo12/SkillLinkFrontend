import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();
  });

  it('muestra el titular principal con la marca SkillLink', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('SkillLink');
  });

  it('incluye el botón "Ver Servicios" enlazando a /servicios', () => {
    const link: HTMLElement | null = fixture.nativeElement.querySelector(
      'a[href="/servicios"]',
    );
    expect(link?.textContent).toContain('Ver Servicios');
  });

  it('incluye el botón "Publicar Servicio" enlazando a /publicar-servicio', () => {
    const link: HTMLElement | null = fixture.nativeElement.querySelector(
      'a[href="/publicar-servicio"]',
    );
    expect(link?.textContent).toContain('Publicar Servicio');
  });
});
