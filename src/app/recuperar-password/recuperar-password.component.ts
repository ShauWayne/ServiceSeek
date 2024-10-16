import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { ApiRestService } from '../services/api-rest.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
})
export class RecuperarPasswordComponent {
  formRecuperar: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fbr: FormBuilder,
    private apiRestService: ApiRestService,
    private alertController: AlertController
  ) {
    // Inicializar el formulario con validaciones
    this.formRecuperar = this.fbr.group({
      correoRecup: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]]
    });
  }

  async recuperarPassword(){
    if (this.formRecuperar.valid) {
      try{
        const user = await lastValueFrom(this.apiRestService.getUsuario(this.formRecuperar.value.correoRecup));
        if (user.length > 0) {
          console.log('Usuario encontrado:', user);
          const alert = await this.alertController.create({
            header: 'Recuperar contraseña',
            message: 'Se ha enviado un correo electrónico con la nueva contraseña',
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  window.location.reload();
                }
              }
            ]
          });
          await alert.present();
        } else {
          console.log('Usuario no encontrado');
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Correo electrónico no encontrado',
            buttons: ['Aceptar']
          });
          await alert.present();
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    } else {
      console.log('Formulario no válido, revisa los campos.');
      this.formRecuperar.markAllAsTouched(); //Borra los datos del Form
    }
  }
  
  dismiss() {
    this.modalCtrl.dismiss(null, 'all');
  }

  aceptar(){
    window.location.reload();
  }
}
