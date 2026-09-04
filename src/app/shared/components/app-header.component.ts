import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandLogoComponent } from './brand-logo.component';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'sl-app-header',
  imports: [RouterLink, RouterLinkActive, BrandLogoComponent],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeaderComponent {
  protected readonly navItems: NavItem[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Categorías', path: '/categorias' },
    { label: 'Publicar Servicio', path: '/publicar-servicio' },
    { label: 'Mi Perfil', path: '/mi-perfil' },
  ];

  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
