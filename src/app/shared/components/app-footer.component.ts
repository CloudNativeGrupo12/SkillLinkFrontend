import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuscripcionesApi } from '../../core/api/suscripciones.api';
import { SuscripcionPremiumDto } from '../../core/models/suscripcion.model';
import { BrandLogoComponent } from './brand-logo.component';

@Component({
  selector: 'sl-app-footer',
  imports: [FormsModule, BrandLogoComponent],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.scss',
})
export class AppFooterComponent {
  private readonly suscripcionesApi = inject(SuscripcionesApi);

  protected readonly email = signal('');
  protected readonly mensaje = signal('');
  protected readonly suscribiendo = signal(false);

  protected readonly socialLinks = [
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Twitter', icon: 'twitter' },
    { name: 'Instagram', icon: 'instagram' },
    { name: 'LinkedIn', icon: 'linkedin' },
  ];

  protected onSubscribe(): void {
    if (!this.email()) {
      return;
    }

    this.suscribiendo.set(true);
    const dto: SuscripcionPremiumDto = { email: this.email() };

    this.suscripcionesApi.suscribir(dto).subscribe({
      next: () => {
        this.mensaje.set('¡Te has suscrito exitosamente!');
        this.suscribiendo.set(false);
        this.email.set('');
      },
      error: () => {
        this.mensaje.set('Ocurrió un error al suscribirte.');
        this.suscribiendo.set(false);
      },
    });
  }
}
