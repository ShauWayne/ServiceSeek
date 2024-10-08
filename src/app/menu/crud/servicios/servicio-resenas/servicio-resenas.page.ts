import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClServicio } from '../model/ClServicio';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ApiRestService } from '../../../../services/api-rest.service';
import { ClResena } from '../../resena/model/ClResena';
//import { DatabaseService } from '../../../../services/database.service';

@Component({
  selector: 'app-servicio-resenas',
  templateUrl: './servicio-resenas.page.html',
  styleUrls: ['./servicio-resenas.page.scss'],
})
export class ServicioResenasPage implements OnInit {

  resenas: ClResena[] = [];
  servicio: ClServicio = new ClServicio({});

  constructor(
    //public SqlLiteService: DatabaseService,
    public apiRestService: ApiRestService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthenticationService) {}

  ngOnInit() {
    this.cargarServicio();  //Ejecuta función al iniciar
    this.cargarResenas();  //Ejecuta función al iniciar
  }

  async cargarServicio(){
    console.log('Iniciando carga de Servicio id:'+this.route.snapshot.paramMap.get('id')+'...');
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    console.log('Ingresando a ApiRest');
    const servicioId = parseInt(this.route.snapshot.paramMap.get('id')!);//Pasamos el valor a number
    await this.apiRestService.getServicio(servicioId)
    .subscribe({
      next: (data) => {
        console.log('Data: ',data);
        this.servicio = data;
        console.log('Servicio: ',this.servicio);
        loading.dismiss();
      },
      complete: () => {},
      error: (error) => {
        console.error('Error al obtener el servicio:', error);
        loading.dismiss();
      },
    })
  }

  async cargarResenas(){
    console.log('Iniciando carga de Reseñas...');
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    console.log('Ingresando a ApiRest');
    const servicioId = parseInt(this.route.snapshot.paramMap.get('id')!);//Pasamos el valor a number
    await this.apiRestService.getResenasServicio(servicioId)
    .subscribe({
      next: (data) => {
        console.log('Data: ',data);
        this.resenas = data;
        console.log('Resenas: ',this.resenas);
        loading.dismiss();
      },
      complete: () => {},
      error: (error) => {
        console.error('Error al obtener las reseñas:', error);
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
