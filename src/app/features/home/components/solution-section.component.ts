import { Component } from '@angular/core';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

interface SolutionItem {
  titulo: string;
  descripcion: string;
  icono: string;
}

@Component({
  selector: 'sl-solution-section',
  imports: [SafeHtmlPipe],
  templateUrl: './solution-section.html',
  styleUrl: './solution-section.scss',
})
export class SolutionSectionComponent {
  protected readonly soluciones: SolutionItem[] = [
    {
      titulo: 'Publica Servicios',
      descripcion:
        'Crea tu perfil profesional y publica los servicios que ofreces. Llega a miles de potenciales clientes que buscan exactamente lo que tú haces.',
      icono:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 8V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3"/><path d="M13 15l-3 3 3 3"/><path d="M10 18h9a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5"/></svg>',
    },
    {
      titulo: 'Busca por Categoría',
      descripcion:
        'Encuentra fácilmente el servicio que necesitas navegando por categorías organizadas. Desde fitness hasta programación, todo en un solo lugar.',
      icono:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    },
    {
      titulo: 'Perfil Profesional',
      descripcion:
        'Construye tu reputación con reseñas verificadas. Muestra tu experiencia, certificaciones y portafolio para destacar entre la competencia.',
      icono:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    },
  ];
}
