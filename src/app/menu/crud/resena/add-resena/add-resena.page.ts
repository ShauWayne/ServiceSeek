import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClServicio } from '../../servicios/model/ClServicio';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { ApiRestService } from '../../../../services/api-rest.service';
import { ClResena } from '../../resena/model/ClResena';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-resena',
  templateUrl: './add-resena.page.html',
  styleUrls: ['./add-resena.page.scss'],
})
export class AddResenaPage implements OnInit {
  formResena!: FormGroup;
  servicio: ClServicio = new ClServicio({});
  resena: ClResena = new ClResena({});
  public servicioId = parseInt(this.route.snapshot.paramMap.get('id')!);
  maxId = 0;

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
    this.cargarServicio();  //Ejecuta función al iniciar
    this.formResena = this.formBuilder.group({
      "fCalificacion": [null, Validators.required],
      "fComentario": [null, Validators.required],
    });
  }

  async onFormSubmit(form: NgForm){
    console.log("Enviando formulario...");
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    await this.apiRestService.getResenas().subscribe({
      next: (resenas) => {
        if (resenas && resenas.length > 0) {
          this.maxId = Math.max(...resenas.map(r => Number(r.id))); // Obtener el ID máximo actual
          console.log("AQUI ESTA R!!!!",this.maxId)
        }
      },
      complete: async () => {
      const nuevaResena: ClResena = {
        id: String(this.maxId + 1),
        id_servicio: this.servicioId,
        usuario: this.auth.getUsuario(),
        calificacion: this.formResena.value.fCalificacion,
        comentario: this.formResena.value.fComentario,
        fecha: new Date().toLocaleDateString('es-CL'),
      };
    await this.apiRestService.addResena(nuevaResena)
    .subscribe({
      next: (data) => {
        console.log('Data: ',data);
        loading.dismiss();
        if (data == null){
          console.log('No se añadieron datos, data = null');
          return
        }
        console.log('Se añaden datos, router: ',this.router);
        this.router.navigate(['/servicio-resenas', this.servicioId]);
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

  logout(){
    console.log('Cerrando sesión... ');
    this.auth.logout();
    this.router.navigate(['/login']);

  }



}

