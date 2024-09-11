import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePickerModalComponent } from '../date-picker-modal/date-picker-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario con validaciones
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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

  async register() {
    if (this.formularioRegistro.valid) {
      // Aquí puedes manejar el registro, los datos son válidos
      console.log('Formulario válido, guardando...', this.formularioRegistro.value);
      this.dismiss();
    } else {
      // Mostrar un mensaje de error si el formulario es inválido
      console.log('Formulario no válido, revisa los campos.');
      this.formularioRegistro.markAllAsTouched();  // Para que todos los campos sean validados visualmente
    }
  }
}
