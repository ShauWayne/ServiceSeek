import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ApiRestService } from 'src/app/services/api-rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {}; // Usuario cargado desde la API

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private apiRestService: ApiRestService // Servicio para llamar al API REST
  ) {}

  async ngOnInit() {
    await this.loadUserData();
  }

  async loadUserData() {
    try {
      const correo = await this.auth.getCorreo(); // Obtener correo del usuario actual
      this.apiRestService.getUsuario(correo).subscribe({
        next: (data: any) => {
          if (data.length > 0) {
            this.user = data[0]; // Cargar datos del usuario
            console.log('Usuario cargado:', this.user);
          } else {
            console.warn('No se encontró el usuario.');
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        },
      });
    } catch (error) {
      console.error('Error al obtener el correo del usuario:', error);
    }
  }

  modifyUserData() {
    console.log('Modificar datos de usuario');
    // Aquí puedes abrir un modal o redirigir a otra página para editar los datos
  }

  logout() {
    console.log('Cerrando sesión... ');
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  cargarPagina() {
    window.location.reload();
  }

  irAMapa() {
    console.log('Cargando mapa... ');
    this.router.navigate(['/mapa']);
  }

  profile() {
    console.log('Cargando perfil...');
    this.router.navigate(['/profile']);
  }

  savedLocations() {
    console.log('Cargando ubicaciones guardadas...');
    this.router.navigate(['/favorites']);
  }

  settings() {
    console.log('Cargando configuraciones...');
    this.router.navigate(['/settings']);
  }

  terminos() {
    console.log('Cargando términos y condiciones...');
    this.router.navigate(['/terminos-y-condiciones']);
  }
}
