import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; // Importa ModalController
import { Router } from '@angular/router';
import { RegisterModalComponent } from '../register-modal/register-modal.component'; // Ajusta la ruta si es necesario
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = ''; // Inicializar como cadena vacía
  password: string = ''; // Inicializar como cadena vacía
  errorMessage: string = ''; // Inicializar como cadena vacía

  constructor(private modalCtrl: ModalController, private router:Router, private alertController: AlertController) { }


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

  onLogin(){
    this.errorMessage = '';

    if (!this.isPasswordValid(this.password)) {
      this.errorMessage = 'La contraseña debe tener al menos 4 números, 3 caracteres especiales, y 1 letra mayúscula.';
      return;
    }

    this.showSuccessAlert();
    
  }

  isPasswordValid(password: string): boolean {
    // Al menos 4 números
    const hasNumber = (password.match(/[0-9]/g) || []).length >= 4;
    // Al menos 1 letra mayúscula
    const hasUpperCase = /[A-Z]/.test(password);
    // Al menos 3 caracteres especiales
    const hasCharacter = (password.match(/[!@#$%^&*(),.?":{}|<>_-]/g) || []).length >= 3;

    return hasNumber && hasUpperCase && hasCharacter && password.length >= 8;
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: '¡Bienvenido a AhorraSmart!',
      message: ' Toma las riendas de tus finanzas.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/home']);
        }
      }]
    });

    await alert.present();
  }
  
  
}
