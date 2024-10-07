import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';
import { ApiRestService } from '../../services/api-rest.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-buscar-servicios',
  templateUrl: './buscar-servicios.page.html',
  styleUrls: ['./buscar-servicios.page.scss'],
})
export class BuscarServiciosPage implements OnInit {

  servicios: any[] = [];
  serviciosDB: any[] = []; // Variable para almacenar los servicios cargados desde SQLite

  constructor(
    private router: Router,
    private auth: AuthenticationService, 
    private apiRestService: ApiRestService,
    private dbService: DatabaseService) {}

  ngOnInit() {
    this.cargarServicios();  
    this.cargarServiciosDesdeDB();
  }

  cargarServicios(){
    this.apiRestService.getServicios().subscribe((data) => {
        this.servicios = data;
        console.log(this.servicios);
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
        
      }
    );
  }

  async cargarServiciosDesdeDB() {
    try {
      this.serviciosDB = await this.dbService.getServicios(); // Llamamos al método `getServicios` desde DatabaseService
      console.log('Servicios cargados desde SQLite:', this.serviciosDB); // Mostramos en consola los servicios obtenidos
    } catch (error) {
      console.error('Error al cargar los servicios desde SQLite:', error);
    }
  }

  logout(){
    console.log('Cerrando sesión... ');
    this.auth.logout();
    this.router.navigate(['/login']);

  }

}
