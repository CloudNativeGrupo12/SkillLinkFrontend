import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './shared/components/app-header.component';
import { AppFooterComponent } from './shared/components/app-footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
