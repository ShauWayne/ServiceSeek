import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { DatePickerModalComponent } from '../date-picker-modal/date-picker-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiRestService } from '../services/api-rest.service';
import { ClUsuario } from '../menu/crud/usuarios/model/ClUsuario';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  formularioRegistro: FormGroup;
  maxId = 0;//Variable para obtener ID de reseña más alto


  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private apiRestService: ApiRestService,
    private router: Router,
    private alertController: AlertController,
    private SqlLiteService: DatabaseService,
  ) {
    // Inicializar el formulario con validaciones
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      contrasena: ['', [Validators.required, Validators.pattern('^(?=(?:[^\\d]*\\d){4})(?=(?:[^a-zA-Z]*[a-zA-Z]){3})(?=(?:[^A-Z]*[A-Z]){1})(?=(?:[^\\W]*[\\W]){3})[\\dA-Za-z\\W]*$')]]

    });
  }
  ngOnInit(){
  }

  async register(){//Carga formulario al iniciar page
    if (this.formularioRegistro.valid) {
      console.log('Formulario válido, guardando...', this.formularioRegistro.value);
      const loading = await this.loadingController.create({//Crea mensaje de carga
        message: 'Cargando...',
      });
      await loading.present();//Muestra mensaje en pantalla

      await this.apiRestService.getUsuarios().subscribe({//Obtiene los valores de id para saber el valor que tendrá la id de la nueva reseña
        next: (usuarios) => {//Las ingresa en variable usuarios
          if (usuarios && usuarios.length > 0) {//Busca que al menos haya 1 usuario
          }
        },
        complete: async () => {//Si se obtuvieron valores..
          const nuevoUsuario: ClUsuario = {//Se ingresan al objeto nuevo usuario
            id: String(this.maxId + 1),//Crea el id sumando 1 a la id más alta
            nombre: this.formularioRegistro.value.nombre + ' ' + this.formularioRegistro.value.apellidos ,
            correo: this.formularioRegistro.value.correo,//Obtiene el nombre del usuario desde el auth
            contrasena: this.formularioRegistro.value.contrasena,
            foto_perfil: "url_to_profile_photo_"+ String(this.maxId + 1),
            fecha_registro: new Date().toLocaleDateString('es-CL'),
          };
          await this.apiRestService.addUsuario(nuevoUsuario)//Agrega reseña desde el objeto antes creado
          .subscribe({//suscribe los datos de la consulta
            next: async (data) => {//los guarda en data
              console.log('Data: ',data);
              loading.dismiss();//Cierra ventana de carga
              if (data == null){//Si la respuesta es null el agregar objeto falló
                console.log('No se añadieron datos, data = null');
                return
              }else{
                const alerta  = await this.alertController.create({ //Ventanita de confirmación
                  header: 'Información',
                  message: 'Usuario creado con éxito',
                  buttons: ['OK'],
                });
                this.SqlLiteService.addUsuario(nuevoUsuario); // Se envían datos a SQL
                this.SqlLiteService.sincronizarUsuarios(); // Se aplica persistencia para confirmar subida de datos.
                await alerta.present();//Se muestra la ventana
                console.log('Se añaden datos, router: ',this.router);
                await alerta.onDidDismiss();//La página se recarga cuando el usuario cierra la ventanita
                window.location.reload(); //Se actualiza la page

              }
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
    }else {
      // Mostrar un mensaje de error si el formulario es inválido
      console.log('Formulario no válido, revisa los campos.');
      this.formularioRegistro.markAllAsTouched();  // Para que todos los campos sean validados visualmente
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async openDatePicker() {
    const modal = await this.modalCtrl.create({
      component: DatePickerModalComponent
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        // Establecer la fecha de nacimiento seleccionada en el formulario
        this.formularioRegistro?.get('fechaNacimiento')?.setValue(data.data);
      }
    });

    return await modal.present();
  }

  
}
