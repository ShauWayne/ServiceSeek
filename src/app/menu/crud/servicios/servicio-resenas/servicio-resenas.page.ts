import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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

  resenas: ClResena[] = []; //Array para Reseñas
  servicio: ClServicio = new ClServicio({}); //Instancia de Servicio Actual sin params
  favoritos: any[] = [];

  constructor(
    //public SqlLiteService: DatabaseService,
    private navCtrl: NavController,
    public apiRestService: ApiRestService, //Instancia la API JSON
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthenticationService) {}

  ngOnInit() {
    this.cargarServicio();  //Ejecuta función al iniciar
    this.cargarResenas();  //Ejecuta función al iniciar
    this.cargarUsuarioFavoritos();
  }

  async cargarUsuarioFavoritos() {
    const correoUsuario = await this.auth.getCorreo();
    this.apiRestService.getUsuario(correoUsuario).subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          this.favoritos = data[0].favoritos || [];
          console.log('Favoritos cargados:', this.favoritos);
        }
      },
      error: (error) => {
        console.error('Error al cargar los favoritos:', error);
      },
    });
  }


  esFavorito(): boolean {
    return this.favoritos.includes(this.servicio.id);
  }

  async toggleFavorito() {
    if (this.esFavorito()) {
      // Quitar de favoritos
      this.favoritos = this.favoritos.filter((id) => id !== this.servicio.id);
      console.log('Servicio eliminado de favoritos:', this.servicio.id);
    } else {
      // Añadir a favoritos
      this.favoritos.push(this.servicio.id);
      console.log('Servicio añadido a favoritos:', this.servicio.id);
    }

    // Actualizar en la API
    const correoUsuario = await this.auth.getCorreo();
    this.apiRestService.getUsuario(correoUsuario).subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          const usuario = data[0];
          usuario.favoritos = this.favoritos;
          this.apiRestService.updUsuario(usuario.id, usuario).subscribe({
            next: () => console.log('Favoritos actualizados en la API.'),
            error: (error) => console.error('Error al actualizar favoritos:', error),
          });
        }
      },
      error: (error) => {
        console.error('Error al obtener usuario para actualizar favoritos:', error);
      },
    });
  }

  async cargarServicio(){ //Función para traer Recurso Servicio Actual desde API
    console.log('Iniciando carga de Servicio id:'+this.route.snapshot.paramMap.get('id')+'...');
    const loading = await this.loadingController.create({ //Mensaje de carga en pantalla
      message: 'Cargando...',
    });
    await loading.present(); // Muestra el indicador de carga en la pantalla
    console.log('Ingresando a ApiRest');
    const servicioId = parseInt(this.route.snapshot.paramMap.get('id')!);//Pasamos el valor a number
    await this.apiRestService.getServicio(servicioId) //Obtiene el servicio por su ID desde el API
    .subscribe({ //Y lo suscribe
      next: (data) => {
        console.log('Data: ',data);
        this.servicio = data; //Ingresa el Data al objeto Servicio, antes instanciado en la Clase
        console.log('Servicio: ',this.servicio);
        loading.dismiss();//Cierra ventana de carga
      },
      complete: () => {},
      error: (error) => { //Si falla arroja error
        console.error('Error al obtener el servicio:', error);
        loading.dismiss();
      },
    })
  }

  async cargarResenas(){//Función para traer reseñas de un mismo servicio
    console.log('Iniciando carga de Reseñas...');
    const loading = await this.loadingController.create({ //Ventana de carga con mensaje
      message: 'Cargando...',
    });
    await loading.present(); //Muestra ventana de carga en pantalla
    console.log('Ingresando a ApiRest');
    const servicioId = parseInt(this.route.snapshot.paramMap.get('id')!);//Pasamos el valor a number
    await this.apiRestService.getResenasServicio(servicioId) //Obtiene todas las reseñas con el id del servicio desde api-rest.service.ts
    .subscribe({//Suscribe los datos
      next: (data) => {//Los inresa en data
        console.log('Data: ',data);
        this.resenas = data;//Los ingresa al Array Resenas de Clase Reseña
        console.log('Resenas: ',this.resenas);
        loading.dismiss();//Cierra ventana de carga
      },
      complete: () => {},
      error: (error) => { //Si falla arroja error
        console.error('Error al obtener las reseñas:', error);
        loading.dismiss();
      },
    })
  }

  async delResena(id:string){//Función para borrar reseña por Id
    console.log('Iniciando eliminación de Reseña...');
    const loading = await this.loadingController.create({//Crea ventana de carrga
      message: 'Cargando...',
    });
    await loading.present();//Muestra ventana de carga
    console.log('Ingresando a ApiRest');
    await this.apiRestService.delResena(id)//Borra la reseña usando su id desde api-rest.service.ts
    .subscribe({//Suscribe los datos
      next: (data) => { //ingresa el mensaje de retorno a data
        console.log('Data: ',data);
        loading.dismiss();
        if (data == null){ //si es null significa que no se borró
          console.log('No se eliminaron datos, data = null');
          return
        }
        console.log('Se eliminaron datos, router: ',this.router);
        this.router.navigate(['/servicio-resenas', this.servicio.id]);//Redirige al listado de reseñas usando el id de servicio
      },
      error: (error) => {// En caso de error arroja mensaje
        console.error('Error al eliminar la resena:', error);
        loading.dismiss();
      }
    });
  }


  logout(){
    console.log('Cerrando sesión... ');
    this.auth.logout();
    this.router.navigate(['/login']);

  }

  volver() {
    this.navCtrl.back(); // Navega a la página anterior en el historial
  }

  cargarPagina(){
    window.location.reload();
  }


}
