import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  toggleDarkMode(event: any) {
    if (event.detail.checked) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

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
