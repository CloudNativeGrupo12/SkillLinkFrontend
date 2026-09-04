import { describe, it, expect } from 'vitest';
import { PricePipe } from './price.pipe';

describe('PricePipe', () => {
  const pipe = new PricePipe();

  it('formatea un número como CLP con separador de miles', () => {
    expect(pipe.transform(15000)).toBe('$15.000');
  });

  it('maneja el valor cero', () => {
    expect(pipe.transform(0)).toBe('$0');
  });

  it('devuelve cadena vacía para null, undefined o NaN', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform(NaN)).toBe('');
  });
});
