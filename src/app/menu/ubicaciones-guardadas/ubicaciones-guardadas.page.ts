import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-ubicaciones-guardadas',
  templateUrl: './ubicaciones-guardadas.page.html',
  styleUrls: ['./ubicaciones-guardadas.page.scss'],
})
export class UbicacionesGuardadasPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
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
