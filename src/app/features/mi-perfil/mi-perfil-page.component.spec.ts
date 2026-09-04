import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MiPerfilPageComponent } from './mi-perfil-page.component';
import { ProfesionalesApi } from '../../core/api/profesionales.api';
import { PerfilesApi } from '../../core/api/perfiles.api';
import { ServiciosApi } from '../../core/api/servicios.api';
import { CategoriasApi } from '../../core/api/categorias.api';
import { Profesional } from '../../core/models/profesional.model';
import { Perfil, CurrentUser } from '../../core/models/perfil.model';
import { Certificacion } from '../../core/models/certificacion.model';
import { Servicio, CreateServicioDto } from '../../core/models/servicio.model';
import { Categoria } from '../../core/models/categoria.model';

const categorias: Categoria[] = [
  { id: 1, nombre: 'Fitness', descripcion: 'Entrenadores', icono: '<svg></svg>', servicios: 45 },
];

const profesional: Profesional = {
  id: 1,
  nombre: 'Carlos',
  apPaterno: 'Mendoza',
  rol: 'Entrenador',
  ciudad: 'Santiago',
  comuna: 'Las Condes',
  rating: 4.9,
  reviews: 127,
  precio: 25000,
  membresiaId: 1,
  verificado: true,
  categoriaId: 1,
};

const perfil: Perfil = {
  id: 1,
  trabajadorId: 1,
  username: 'carlos',
  descripcion: 'Entrenador profesional.',
  contacto: 'carlos@email.com',
  telefono: '+56 9 1234 5678',
  experiencia: '8 años',
  resumenCV: 'CV resumido',
};

const currentUser: CurrentUser = {
  tipo: 'trabajador',
  perfilId: 1,
  trabajadorId: 1,
  nombre: 'Carlos',
  apPaterno: 'Mendoza',
};

const certificaciones: Certificacion[] = [
  { id: 1, nombre: 'Certificación en Nutrición', entidad: 'U. de Chile', fecha: '2023-01-01', trabajadorId: 1 },
];

const servicios: Servicio[] = [
  { id: 1, nombre: 'Entrenamiento', descripcion: 'Sesiones', categoriaId: 1, trabajadorId: 1, precioMin: 20000, precioMax: 35000, tipoPrecio: 'por sesión', moneda: 'CLP', estado: 'activo', rating: 4.9, reviews: 45 },
];

class ProfesionalesApiStub implements ProfesionalesApi {
  getProfesionales() {
    return of([profesional]);
  }
  getProfesionalesDestacados() {
    return of([profesional]);
  }
  getProfesionalById(id: number) {
    return of(profesional.id === id ? profesional : undefined);
  }
}

class PerfilesApiStub implements PerfilesApi {
  getPerfilByTrabajadorId(id: number) {
    return of(perfil);
  }
  getCertificacionesByTrabajadorId(id: number) {
    return of(certificaciones);
  }
  getCurrentUser() {
    return of(currentUser);
  }
}

class ServiciosApiStub implements ServiciosApi {
  getServicios() {
    return of(servicios);
  }
  getServiciosDestacados() {
    return of(servicios);
  }
  getServiciosByTrabajador(id: number) {
    return of(id === 1 ? servicios : []);
  }
  createServicio(dto: CreateServicioDto) {
    return of({} as Servicio);
  }
  deleteServicio(id: number) {
    return of(undefined);
  }
}

class CategoriasApiStub implements CategoriasApi {
  getCategorias() {
    return of(categorias);
  }
  getCategoriaById(id: number) {
    return of(categorias.find((c) => c.id === id));
  }
}

describe('MiPerfilPageComponent', () => {
  let fixture: ComponentFixture<MiPerfilPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiPerfilPageComponent],
      providers: [
        provideRouter([]),
        { provide: ProfesionalesApi, useClass: ProfesionalesApiStub },
        { provide: PerfilesApi, useClass: PerfilesApiStub },
        { provide: ServiciosApi, useClass: ServiciosApiStub },
        { provide: CategoriasApi, useClass: CategoriasApiStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MiPerfilPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('muestra el nombre y ubicación del trabajador', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Carlos Mendoza');
    expect(el.textContent).toContain('Santiago, Las Condes');
  });

  it('muestra el toggle de trabajador/cliente solo en el perfil propio', () => {
    expect(fixture.nativeElement.querySelector('.profile-toggle')).not.toBeNull();
  });

  it('muestra los servicios publicados con el botón Eliminar', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Entrenamiento');
    expect(el.textContent).toContain('$20.000');
    expect(el.textContent).toContain('Eliminar');
  });

  it('cambia a la vista cliente al pulsar el toggle', async () => {
    const botones = fixture.nativeElement.querySelectorAll('.profile-toggle-btn');
    (botones[1] as HTMLElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Servicios Guardados');
  });
});
