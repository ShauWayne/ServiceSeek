import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClServicio } from '../crud/servicios/model/ClServicio';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ApiRestService } from '../../services/api-rest.service';
//import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-buscar-servicios',
  templateUrl: './buscar-servicios.page.html',
  styleUrls: ['./buscar-servicios.page.scss'],
})
export class BuscarServiciosPage implements OnInit {

  servicios: ClServicio[] = [];

  constructor(
    //public SqlLiteService: DatabaseService,
    public apiRestService: ApiRestService,
    public loadingController: LoadingController,
    public router: Router,
    public auth: AuthenticationService) {}

  ngOnInit() {
    this.cargarServicios();  //Ejecuta función al iniciar
  }

  async cargarServicios(){
    console.log('Iniciando carga de Servicios...');
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    console.log('Ingresando a ApiRest');
    await this.apiRestService.getServicios()
    .subscribe({
      next: (data) => {
        console.log('Data: ',data);
        this.servicios = data;
        console.log('Servicios: ',this.servicios);
        loading.dismiss();
      },
      complete: () => {},
      error: (error) => {
        console.error('Error al obtener los servicios:', error);
        loading.dismiss();
      },
    })
  }


  logout(){
    console.log('Cerrando sesión... ');
    this.auth.logout();
    this.router.navigate(['/login']);

  }
}
