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
  servicio: ClServicio = new ClServicio({});//Variable servicio de tipo ClServicio
  resena: ClResena = new ClResena({});//Variable de reseña de tipo CsResena
  public servicioId = parseInt(this.route.snapshot.paramMap.get('id')!);//Transforma valor a int
  maxId = 0;//Variable para obtener ID de reseña más alto

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
    this.cargarServicio();  //Ejecuta función al iniciar
    this.formResena = this.formBuilder.group({//Genera formulario
      "fCalificacion": [null, Validators.required],
      "fComentario": [null, Validators.required],
    });
  }

  async onFormSubmit(form: NgForm){//Carga formulario al iniciar page
    console.log("Enviando formulario...");
    const loading = await this.loadingController.create({//Crea mensaje de carga
      message: 'Cargando...',
    });
    await loading.present();//Muestra mensaje en pantalla

    await this.apiRestService.getResenas().subscribe({//Obtiene los valores de id para saber el valor que tendrá la id de la nueva reseña
      next: (resenas) => {//Las ingresa en variable resenas
        if (resenas && resenas.length > 0) {//Busca que al menos haya 1 reseña
          this.maxId = Math.max(...resenas.map(r => Number(r.id))); // Obtener el ID máximo actual
          console.log("AQUI ESTA R!!!!",this.maxId)
        }
      },
      complete: async () => {//Si se obtuvieron valores..
      const nombreUsuario = await this.auth.getUsuario();
      const nuevaResena: ClResena = {//Se ingresan al objeto nueva reseña
        id: String(this.maxId + 1),//Crea el id sumando 1 a la id más alta
        id_servicio: this.servicioId,//Obtiene el valor desde el servicio actual
        usuario: nombreUsuario,//Obtiene el nombre del usuario desde el auth
        calificacion: this.formResena.value.fCalificacion,
        comentario: this.formResena.value.fComentario,
        fecha: new Date().toLocaleDateString('es-CL'),//Obtiene fecha desde sistema
      };
    await this.apiRestService.addResena(nuevaResena)//Agrega reseña desde el objeto antes creado
    .subscribe({//suscribe los datos de la consulta
      next: (data) => {//los guarda en data
        console.log('Data: ',data);
        loading.dismiss();//Cierra ventana de carga
        if (data == null){//Si la respuesta es null el agregar objeto falló
          console.log('No se añadieron datos, data = null');
          return
        }
        console.log('Se añaden datos, router: ',this.router);
        this.router.navigate(['/servicio-resenas', this.servicioId]);//Redirige al listado de servicios
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
    console.log('Iniciando carga de Servicio id:'+this.route.snapshot.paramMap.get('id')+'...');//Obtiene id desde barra de navegación
    const loading = await this.loadingController.create({//Mensaje de carga en pantalla...
      message: 'Cargando...',
    });
    await loading.present();//Muestra ventana de carga
    console.log('Ingresando a ApiRest');
    const servicioId = parseInt(this.route.snapshot.paramMap.get('id')!);//Pasamos el valor a number
    await this.apiRestService.getServicio(servicioId)//Obtiene los valores del servicio por id desde api-rest.service.ts
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

  logout(){
    console.log('Cerrando sesión... ');
    this.auth.logout();//Cierra sesión desde el guard
    this.router.navigate(['/login']);//Redirige al login

  }



}

