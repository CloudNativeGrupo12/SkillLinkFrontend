/**
 * Iconos SVG por clave de categoria. El backend entrega la clave (`icono`);
 * el frontend la traduce a SVG para no transportar markup por la API.
 */
const STROKE = 'width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

export const CATEGORIA_ICONOS: Record<string, string> = {
  fitness: `<svg ${STROKE}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  programacion: `<svg ${STROKE}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  gasfiteria: `<svg ${STROKE}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  electricidad: `<svg ${STROKE}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  fotografia: `<svg ${STROKE}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/></svg>`,
  carpinteria: `<svg ${STROKE}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  marketing: `<svg ${STROKE}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  diseno: `<svg ${STROKE}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>`,
  clases: `<svg ${STROKE}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  belleza: `<svg ${STROKE}><path d="m6 9 6 6 6-6"/><path d="M12 3v12"/><path d="M5 21h14"/></svg>`,
  limpieza: `<svg ${STROKE}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  gaming: `<svg ${STROKE}><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="17" cy="10" r="1"/><circle cx="15" cy="14" r="1"/></svg>`,
};

export const ICONO_GENERICO = `<svg ${STROKE}><circle cx="12" cy="12" r="10"/></svg>`;

export function iconoCategoria(clave: string | null | undefined): string {
  return (clave && CATEGORIA_ICONOS[clave]) || ICONO_GENERICO;
}
