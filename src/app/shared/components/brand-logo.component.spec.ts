import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BrandLogoComponent } from './brand-logo.component';

describe('BrandLogoComponent', () => {
  let fixture: ComponentFixture<BrandLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandLogoComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandLogoComponent);
    fixture.detectChanges();
  });

  it('muestra el nombre de marca "SkillLink"', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('SkillLink');
  });

  it('enlaza el logo a la ruta por defecto "/"', () => {
    const link: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a.logo');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('/');
  });
});
