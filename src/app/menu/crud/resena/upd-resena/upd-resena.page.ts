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
  public resenaId = parseInt(this.route.snapshot.paramMap.get('id')!);//Transforma valor a int
  formResena!: FormGroup;
  servicio: ClServicio = new ClServicio({});//Variable servicio de tipo ClServicio
  resena: ClResena = new ClResena({});//Variable de reseña de tipo ClResena
  


  constructor(
    //public SqlLiteService: DatabaseService,
    private formBuilder: FormBuilder,
    public apiRestService: ApiRestService,//Instancia el ApiRest de JSON
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthenticationService) {}

  ngOnInit() {
    this.cargarResena();  //Ejecuta función al iniciar
    this.formResena = this.formBuilder.group({//Genera formulario
      "fCalificacion": [this.resena.calificacion ?? null, Validators.required],
      "fComentario": [this.resena.comentario ?? null, Validators.required],
    });
  }

  async onFormSubmit(form: NgForm){//Carga formulario al iniciar page
    console.log("Enviando formulario...");
    const loading = await this.loadingController.create({//Crea mensaje de carga
      message: 'Cargando...',
    });
    await loading.present();//Muestra mensaje en pantalla
    await this.apiRestService.getResenas().subscribe({//Obtiene los valores de reseñas
      next: (resenas) => { },
      complete: async () => {//Si se obtuvieron valores..
      const nuevaResena: ClResena = {//Se ingresan al objeto nueva reseña
        id: this.resena.id,
        id_servicio: this.resena.id_servicio,
        usuario: this.resena.usuario,
        calificacion: this.formResena.value.fCalificacion,
        comentario: this.formResena.value.fComentario,
        fecha: new Date().toLocaleDateString('es-CL'),//Obtiene fecha desde sistema
      };
    await this.apiRestService.updResena(this.resenaId,nuevaResena)//Actualiza reseña desde el objeto antes creado
    .subscribe({//suscribe los datos de la consulta
      next: (data) => {//los guarda en data
        console.log('Data: ',data);
        loading.dismiss();//Cierra ventana de carga
        if (data == null){//Si la respuesta es null el actualizar objeto falló
          console.log('No se añadieron datos, data = null');
          return
        }
        console.log('Se añaden datos, router: ',this.router);
        this.router.navigate(['/servicio-resenas', this.resena.id_servicio]);//Redirige al listado de reseñas del servicio
      },
      error: (error) => {//En caso de error muestra en pantalla
        console.error('Error al agregar la resena:', error);
        loading.dismiss();
      }
    });
  },
  error: (error) => {//En caso de no poder obtener los valores de reseña indica error 
    console.error('Error al obtener reseñas para el cálculo de ID:', error);
    loading.dismiss();
  }
});
  }
    

  async cargarServicio(){//Carga los valores del servicio al que se va a reseñar
    console.log('Iniciando carga de Servicio id:'+this.resena.id_servicio+'...');//Obtiene id desde la reseña
    const loading = await this.loadingController.create({//Mensaje de carga en pantalla...
      message: 'Cargando...',
    });
    await loading.present();//Muestra ventana de carga
    console.log('Ingresando a ApiRest');
    await this.apiRestService.getServicio(this.resena.id_servicio)//Obtiene los valores del servicio por id desde api-rest.service.ts
    .subscribe({
      next: (data) => {//Agrega la respuesta a data
        console.log('Data: ',data);
        this.servicio = data;//La ingresa a la instancia de servicio
        console.log('Servicio: ',this.servicio);
        loading.dismiss();//Cierra ventana de carga
      },
      complete: () => {},
      error: (error) => {//En caso de error lo indica en la consola
        console.error('Error al obtener el servicio:', error);
        loading.dismiss();//Cierra ventana de carga
      },
    })
  }

  async cargarResena(){//Carga los valores de la reseña a actualizar
    console.log('Iniciando carga de Reseña id:'+this.route.snapshot.paramMap.get('id')+'...');//Obtiene id desde barra de navegación
    const loading = await this.loadingController.create({//Mensaje de carga en pantalla...
      message: 'Cargando...',
    });
    await loading.present();//Muestra ventana de carga
    console.log('Ingresando a ApiRest');
    const resenaId = parseInt(this.route.snapshot.paramMap.get('id')!);//Pasamos el valor a number
    await this.apiRestService.getResena(resenaId)//Obtiene los valores de la reseña por id desde api-rest.service.ts
    .subscribe({
      next: (data) => {//Agrega la respuesta a data
        console.log('Data: ',data);
        this.resena = data;//La ingresa a la instancia de reseña
        console.log('Reseña: ',this.resena);
        loading.dismiss();//Cierra ventana de carga
        this.cargarServicio();//Carga el servicio asociado a la reseña
      },
      complete: () => {},
      error: (error) => {//En caso de error lo indica en la consola
        console.error('Error al obtener la reseña:', error);
        loading.dismiss();//Cierra ventana de carga
      },
    })
  }


  logout(){
    console.log('Cerrando sesión... ');
    this.auth.logout();//Cierra sesión desde el guard
    this.router.navigate(['/login']);//Redirige al login

  }



}
