import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; // Importa ModalController
import { Router } from '@angular/router';
import { RegisterModalComponent } from '../register-modal/register-modal.component'; // Ajusta la ruta si es necesario
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  formLogin: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private router:Router,
    private alertController: AlertController,
    private fbl: FormBuilder) {
      this.formLogin = this.fbl.group({
        username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
        password:  ['', [Validators.required, Validators.pattern('^(?=.*\d{4})(?=.*[a-zA-Z0-9]{3})(?=.*[A-Z]).{7,}$')]]
      })
     }


  ngOnInit() {
  }

  async openRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent,
    });
    return await modal.present();
  }

  async openRecuperarPass() {
    const modal = await this.modalCtrl.create({
      component: RecuperarPasswordComponent,
    });
    return await modal.present();
  }

  async onLogin(){
    if (this.formLogin.valid) {
      // Aquí puedes manejar el registro, los datos son válidos
      console.log('Formulario válido, guardando...', this.formLogin.value);
      this.router.navigate(['/home']);
    } else {
      // Mostrar un mensaje de error si el formulario es inválido
      console.log('Formulario no válido, revisa los campos.');
      this.formLogin.markAllAsTouched();  // Para que todos los campos sean validados visualmente
    }

  }
  
  
}
