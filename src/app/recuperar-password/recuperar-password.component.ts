import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
})
export class RecuperarPasswordComponent {
  formRecuperar: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fbr: FormBuilder
  ) {
    // Inicializar el formulario con validaciones
    this.formRecuperar = this.fbr.group({
      correoRecup: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]]
    });
  }
  
  dismiss() {
    this.modalCtrl.dismiss(null, 'all');
  }

  recuperarPassword() {
    // Lógica para recuperar la contraseña
    this.dismiss();
  }
  aceptar(){
    window.location.reload();
  }
}
