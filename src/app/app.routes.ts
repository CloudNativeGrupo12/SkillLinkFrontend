import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./features/categorias/categorias.routes').then(
        (m) => m.categoriasRoutes,
      ),
  },
  {
    path: 'servicios',
    loadChildren: () =>
      import('./features/servicios/servicios.routes').then(
        (m) => m.serviciosRoutes,
      ),
  },
  {
    path: 'publicar-servicio',
    loadChildren: () =>
      import('./features/publicar-servicio/publicar-servicio.routes').then(
        (m) => m.publicarServicioRoutes,
      ),
  },
  {
    path: 'mi-perfil',
    loadChildren: () =>
      import('./features/mi-perfil/mi-perfil.routes').then(
        (m) => m.miPerfilRoutes,
      ),
  },
];
