import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';
import { ApiRestService } from '../../services/api-rest.service';

@Component({
  selector: 'app-buscar-servicios',
  templateUrl: './buscar-servicios.page.html',
  styleUrls: ['./buscar-servicios.page.scss'],
})
export class BuscarServiciosPage implements OnInit {

  servicios: any[] = [];

  constructor(
    private router: Router,
    private auth: AuthenticationService, 
    private apiRestService: ApiRestService) {}

  ngOnInit() {
    this.cargarServicios();  
  }

  cargarServicios(){
    this.apiRestService.getServicios().subscribe((data) => {
        this.servicios = data;
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
      }
    );
  }

  logout(){
    console.log('Cerrando sesión... ');
    this.auth.logout();
    this.router.navigate(['/login']);

  }

}
