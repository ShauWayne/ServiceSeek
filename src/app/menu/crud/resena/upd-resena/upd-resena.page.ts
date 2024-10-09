import { ApiRestService } from './../../../../services/api-rest.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClServicio } from '../../servicios/model/ClServicio';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ClResena } from '../../resena/model/ClResena';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-upd-resena',
  templateUrl: './upd-resena.page.html',
  styleUrls: ['./upd-resena.page.scss'],
})
export class UpdResenaPage implements OnInit {
  public resenaId = parseInt(this.route.snapshot.paramMap.get('id')!);
  formResena!: FormGroup;
  servicio: ClServicio = new ClServicio({});
  resena: ClResena = new ClResena({});
  


  constructor(
    //public SqlLiteService: DatabaseService,
    private formBuilder: FormBuilder,
    public apiRestService: ApiRestService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthenticationService) {}

  ngOnInit() {
    this.cargarResena();  //Ejecuta función al iniciar
    this.formResena = this.formBuilder.group({
      "fCalificacion": [this.resena.calificacion ?? null, Validators.required],
      "fComentario": [this.resena.comentario ?? null, Validators.required],
    });
  }

  async onFormSubmit(form: NgForm){
    console.log("Enviando formulario...");
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    await this.apiRestService.getResenas().subscribe({
      next: (resenas) => { },
      complete: async () => {
      const nuevaResena: ClResena = {
        id: this.resena.id,
        id_servicio: this.resena.id_servicio,
        usuario: this.resena.usuario,
        calificacion: this.formResena.value.fCalificacion,
        comentario: this.formResena.value.fComentario,
        fecha: new Date().toLocaleDateString('es-CL'),
      };
    await this.apiRestService.updResena(this.resenaId,nuevaResena)
    .subscribe({
      next: (data) => {
        console.log('Data: ',data);
        loading.dismiss();
        if (data == null){
          console.log('No se añadieron datos, data = null');
          return
        }
        console.log('Se añaden datos, router: ',this.router);
        this.router.navigate(['/servicio-resenas', this.resena.id_servicio]);
      },
      error: (error) => {
        console.error('Error al agregar la resena:', error);
        loading.dismiss();
      }
    });
  },
  error: (error) => {
    console.error('Error al obtener reseñas para el cálculo de ID:', error);
    loading.dismiss();
  }
});
  }
    

  async cargarServicio(){
    console.log('Iniciando carga de Servicio id:'+this.resena.id_servicio+'...');
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    console.log('Ingresando a ApiRest');
    await this.apiRestService.getServicio(this.resena.id_servicio)
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

  async cargarResena(){
    console.log('Iniciando carga de Reseña id:'+this.route.snapshot.paramMap.get('id')+'...');
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    console.log('Ingresando a ApiRest');
    const resenaId = parseInt(this.route.snapshot.paramMap.get('id')!);//Pasamos el valor a number
    await this.apiRestService.getResena(resenaId)
    .subscribe({
      next: (data) => {
        console.log('Data: ',data);
        this.resena = data;
        console.log('Reseña: ',this.resena);
        loading.dismiss();
        this.cargarServicio();
      },
      complete: () => {},
      error: (error) => {
        console.error('Error al obtener la reseña:', error);
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

