import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sl-brand-logo',
  imports: [RouterLink],
  templateUrl: './brand-logo.html',
  styleUrl: './brand-logo.scss',
})
export class BrandLogoComponent {
  readonly routerLink = input<string>('/');
}
