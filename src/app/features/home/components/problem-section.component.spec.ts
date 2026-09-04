import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProblemSectionComponent } from './problem-section.component';

describe('ProblemSectionComponent', () => {
  let fixture: ComponentFixture<ProblemSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemSectionComponent);
    fixture.detectChanges();
  });

  it('muestra el título de la problemática', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('La Problemática del Desempleo en Chile');
  });
});
