import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  formLogin: FormGroup;
  isModalOpen = false;

  constructor(
    private modalCtrl: ModalController,
    private router:Router,
    private fbl: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.formLogin = this.fbl.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=(?:[^\\d]*\\d){4})(?=(?:[^a-zA-Z]*[a-zA-Z]){3})(?=(?:[^A-Z]*[A-Z]){1})(?=(?:[^\\W]*[\\W]){3})[\\dA-Za-z\\W]*$')]]
    });
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
      console.log('Formulario válido, guardando...', this.formLogin.value);
      this.authService.login(this.formLogin.value.username);
      console.log('Usuario Autenticado: ',this.authService.isLoggedIn());
      this.router.navigate(['/home']);
    } else {
      console.log('Formulario no válido, revisa los campos.');
      this.formLogin.markAllAsTouched();
    }
    
  }

  // Función para abrir el modal de redes sociales
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  googleLogin() {
    console.log("Iniciar sesión con Google");
  }

  facebookLogin() {
    console.log("Iniciar sesión con Facebook");
  }
}
