import { Component, input, output } from '@angular/core';
import { Servicio } from '../../core/models/servicio.model';
import { PricePipe } from '../pipes/price.pipe';

@Component({
  selector: 'sl-service-card',
  imports: [PricePipe],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCardComponent {
  readonly servicio = input.required<Servicio>();
  readonly trabajadorNombre = input('Profesional');
  readonly ubicacion = input('Chile');
  readonly categoriaNombre = input('General');
  readonly destacado = input(false);

  readonly contactar = output<Servicio>();
}
