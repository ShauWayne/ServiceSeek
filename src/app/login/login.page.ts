import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth/authentication.service';
import { Storage } from '@ionic/storage-angular';

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
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.formLogin = this.fbl.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=(?:[^\\d]*\\d){4})(?=(?:[^a-zA-Z]*[a-zA-Z]){3})(?=(?:[^A-Z]*[A-Z]){1})(?=(?:[^\\W]*[\\W]){3})[\\dA-Za-z\\W]*$')]]
    });
  }

  ngOnInit(): void {}

  async onLogin(){ // Inicio de  sesión
    const userForm:string = this.formLogin.value.username;
    const passForm:string = this.formLogin.value.password;
    if (this.formLogin.valid) { //Fomulario válido
      console.log('Formulario válido, guardando...', this.formLogin.value);
      const loggedIn = await this.authService.login(userForm, passForm);
      if (loggedIn){
        console.log('Usuario Autenticado: ',this.authService.isLoggedIn());
        let navExtra: NavigationExtras = { state: {user: this.formLogin.value.username}}; //Enviamos nombre de usuario por Interpolación
        this.router.navigate(['/home'], navExtra); //Navega enviando Dato a home.page.ts
      }
    }else {
      console.log('Formulario no válido, revisa los campos.');
      this.formLogin.markAllAsTouched(); //Borra los datos del Form
    }
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
