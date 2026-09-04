import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolutionSectionComponent } from './solution-section.component';

describe('SolutionSectionComponent', () => {
  let fixture: ComponentFixture<SolutionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolutionSectionComponent);
    fixture.detectChanges();
  });

  it('renderiza las tres soluciones de valor', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('.solution-card').length).toBe(3);
  });

  it('incluye el titular "Publica Servicios"', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Publica Servicios');
  });
});
