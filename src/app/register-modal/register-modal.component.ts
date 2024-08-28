import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { DatePickerModalComponent } from '../date-picker-modal/date-picker-modal.component';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent {
  nombre: string = '';
  apellidos: string = '';
  fechaNacimiento: string ='';
  correo: string = '';

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async openDatePicker() {
    const modal = await this.modalCtrl.create({
      component: DatePickerModalComponent
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.fechaNacimiento = data.data;
      }
    });
    return await modal.present();
  }

  register() {
    // Lógica para registrar al usuario
    this.dismiss();
  }
}
