import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {
    email: 'usuario@ejemplo.com',
    phone: '+56 912345678',
    address: 'Avenida Siempre Viva 123',
    registrationDate: '2023-01-01',
  };

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
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
  
  cargarPagina(){
    window.location.reload();
  }

  irAMapa() {
    console.log('Cargando mapa... ');
    this.router.navigate(['/mapa']);
  }
  profile() {
    console.log('Cargando mapa... ');
    this.router.navigate(['/profile']);
  }
  savedLocations() {
    console.log('Cargando mapa... ');
    this.router.navigate(['/favorites']);
  }
  settings() {
    console.log('Cargando mapa... ');
    this.router.navigate(['/settings']);
  }
  terminos() {
    console.log('Cargando mapa... ');
    this.router.navigate(['/terminos-y-condiciones']);
  }

}
