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

  servicios: ClServicio[] = [];//Array de Clase servicio

  constructor(
    //public SqlLiteService: DatabaseService,
    public apiRestService: ApiRestService,
    public loadingController: LoadingController,
    public router: Router,
    public auth: AuthenticationService) {}

  ngOnInit() {
    this.cargarServicios();  //Ejecuta función al iniciar
  }

  async cargarServicios(){//Función para obtener todos los servicios
    console.log('Iniciando carga de Servicios...');
    const loading = await this.loadingController.create({//Ventana de carga
      message: 'Cargando...',
    });
    await loading.present();//Muestra carga en pantalla
    console.log('Ingresando a ApiRest');
    await this.apiRestService.getServicios()//Obtiene todos los servicios desde api-rest.services.ts
    .subscribe({//Los suscribe
      next: (data) => {//Ingresa la respuesta en data
        console.log('Data: ',data);
        this.servicios = data;//Ingresa valor de data en Array servicios de Clase Servicio
        console.log('Servicios: ',this.servicios);
        loading.dismiss();//Cierra ventana de carga
      },
      complete: () => {},
      error: (error) => {//Arroja error en caso de Falla
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
