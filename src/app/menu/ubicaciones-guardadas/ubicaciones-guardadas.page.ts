import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { ClUsuario } from '../crud/usuarios/model/ClUsuario';
import { ClServicio } from '../crud/servicios/model/ClServicio';

@Component({
  selector: 'app-ubicaciones-guardadas',
  templateUrl: './ubicaciones-guardadas.page.html',
  styleUrls: ['./ubicaciones-guardadas.page.scss'],
})
export class UbicacionesGuardadasPage implements OnInit {
  favoritos: any[] = [];
  usuario: ClUsuario = new ClUsuario({});
  serviciosFavoritos: ClServicio[] = [];//Array de Clase servicio

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    public apiRestService: ApiRestService,
    public loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  async cargarFavoritos() {
    console.log('Iniciando carga de favoritos...');
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
  
    await loading.present();
  
    const correoUsuario = await this.auth.getCorreo();
  
    // Obtener datos del usuario
    this.apiRestService.getUsuario(correoUsuario).subscribe({
      next: (dataUser: ClUsuario[]) => {
        if (dataUser.length > 0) {
          this.usuario = dataUser[0]; // Asignamos el primer usuario obtenido
          this.favoritos = this.usuario.favoritos || [];
          console.log('Favoritos del usuario:', this.favoritos);
  
          // Obtener servicios y filtrar solo los favoritos
          this.apiRestService.getServicios().subscribe({
            next: (servicios: ClServicio[]) => {
              this.serviciosFavoritos = servicios.filter(servicio =>
                this.favoritos.includes(servicio.id)
              );
              console.log('Servicios favoritos:', this.serviciosFavoritos);
            },
            error: (error) => {
              console.error('Error al obtener los servicios:', error);
            },
            complete: () => {
              console.log('Carga de servicios completada.');
              loading.dismiss();
            }
          });
        } else {
          console.warn('Usuario no encontrado.');
          loading.dismiss();
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos del usuario:', error);
        loading.dismiss();
      }
    });
  }

  logout() {
    console.log('Cerrando sesión... ');
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  
  cargarPagina(){
    window.location.reload();
  }

  irAMapa() {
    console.log('Cargando mapa... ');
    this.router.navigate(['/mapa']);
  }
  profile() {
    console.log('Cargando perfil... ');
    this.router.navigate(['/profile']);
  }
  savedLocations() {
    console.log('Cargando ubicaciones guardadas... ');
    this.router.navigate(['/favorites']);
  }
  settings() {
    console.log('Cargando configuración... ');
    this.router.navigate(['/settings']);
  }
  terminos() {
    console.log('Cargando términos y condiciones... ');
    this.router.navigate(['/terminos-y-condiciones']);
  }
}