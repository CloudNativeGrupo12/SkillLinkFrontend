import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = new SafeHtmlPipe(TestBed.inject(DomSanitizer));
  });

  it('convierte una cadena HTML en un valor SafeHtml', () => {
    const html = '<svg><circle r="10"></circle></svg>';
    const result = pipe.transform(html);
    expect(result).toBeDefined();
    const internal = (result as unknown as {
      changingThisBreaksApplicationSecurity: string;
    }).changingThisBreaksApplicationSecurity;
    expect(internal).toContain('circle');
  });
});
