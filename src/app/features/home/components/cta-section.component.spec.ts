import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CtaSectionComponent } from './cta-section.component';

describe('CtaSectionComponent', () => {
  let fixture: ComponentFixture<CtaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaSectionComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaSectionComponent);
    fixture.detectChanges();
  });

  it('incluye el llamado a la acción "Ir a Mi Perfil" enlazando a /mi-perfil', () => {
    const link: HTMLElement | null = fixture.nativeElement.querySelector(
      'a[href="/mi-perfil"]',
    );
    expect(link?.textContent).toContain('Ir a Mi Perfil');
  });
});
