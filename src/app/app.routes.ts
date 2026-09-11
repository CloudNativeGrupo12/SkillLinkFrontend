import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'categorias',
    loadChildren: () => import('./features/categorias/categorias.routes').then((m) => m.categoriasRoutes),
  },
  {
    path: 'servicios',
    loadChildren: () => import('./features/servicios/servicios.routes').then((m) => m.serviciosRoutes),
  },
  {
    // Zona protegida: publicar requiere sesion (y la API exige el scope de escritura)
    path: 'publicar-servicio',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/publicar-servicio/publicar-servicio.routes').then((m) => m.publicarServicioRoutes),
  },
  {
    // Zona protegida: perfil con datos de contacto
    path: 'mi-perfil',
    canActivate: [authGuard],
    loadChildren: () => import('./features/mi-perfil/mi-perfil.routes').then((m) => m.miPerfilRoutes),
  },
  {
    // Evidencia de seguridad 200 / 401 / 403 (accesible sin sesion para provocar el 401)
    path: 'seguridad',
    loadChildren: () => import('./features/seguridad/seguridad.routes').then((m) => m.seguridadRoutes),
  },
  { path: '**', redirectTo: '' },
];
