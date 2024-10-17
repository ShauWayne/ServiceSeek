import { Component, OnInit } from '@angular/core'; // Importar Component y OnInit de Angular
import { ModalController, NavController } from '@ionic/angular'; // Importar ModalController y NavController de Ionic
import { NavigationExtras, Router } from '@angular/router'; // Importar NavigationExtras y Router de Angular Router
import { RegisterModalComponent } from '../register-modal/register-modal.component'; // Importar el componente del modal de registro
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component'; // Importar el componente del modal de recuperar contraseña
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importar FormGroup, FormBuilder y Validators de Angular Forms
import { AuthenticationService } from '../auth/authentication.service'; // Importar el servicio de autenticación
import { AuthService } from '../services/auth.service'; // Importar el servicio de AuthService para manejar la sesión del usuario

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup; // Formulario para el inicio de sesión
  isModalOpen = false; // Variable para controlar la apertura del modal

  constructor(
    private modalCtrl: ModalController, // Controlador para manejar modales
    private router: Router, // Router para la navegación entre páginas
    private fbl: FormBuilder, // FormBuilder para crear formularios
    private authService: AuthenticationService, // Servicio de autenticación para manejar el inicio de sesión
    private navCtrl: NavController, // Controlador de navegación de Ionic
    private storage: AuthService // Usar AuthService en lugar de Storage directamente para manejar la sesión
  ) {
    // Inicializar el formulario de inicio de sesión con validaciones
    this.formLogin = this.fbl.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$')]]
    });
  }    

  ngOnInit(): void {
    this.checkLoginStatus(); // Verificar si el usuario ya está autenticado al inicializar el componente
  }

  // Verificar si el usuario ya está autenticado
  async checkLoginStatus() {
    const isLoggedIn = await this.storage.isLoggedIn(); // Verificar si hay una sesión activa
    if (isLoggedIn) {
      this.router.navigate(['/home']); // Redirigir al usuario a la página de inicio si ya está autenticado
    }
  }

  // Función para manejar el inicio de sesión
  async onLogin() {
    const userForm: string = this.formLogin.value.username; // Obtener el nombre de usuario del formulario
    const passForm: string = this.formLogin.value.password; // Obtener la contraseña del formulario
    if (this.formLogin.valid) { // Verificar si el formulario es válido
      console.log('Formulario válido, guardando...', this.formLogin.value); // Log de formulario válido
      const loggedIn = await this.authService.login(userForm, passForm); // Intentar iniciar sesión con los datos ingresados
      if (loggedIn) {
        // Guardar la sesión del usuario usando AuthService
        await this.storage.saveSession({ username: userForm });
        console.log('Usuario Autenticado: ', this.authService.isLoggedIn()); // Log de usuario autenticado
        let navExtra: NavigationExtras = { state: { user: this.formLogin.value.username } }; // Enviar nombre de usuario a la página de inicio
        this.router.navigate(['/home'], navExtra); // Navegar a la página de inicio
      }
    } else {
      console.log('Formulario no válido, revisa los campos.'); // Log de formulario no válido
      this.formLogin.markAllAsTouched(); // Marcar todos los campos del formulario como tocados para mostrar errores
    }
  }

  // Abrir el modal de registro
  async openRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent, // Componente del modal de registro
    });
    return await modal.present(); // Mostrar el modal
  }

  // Abrir el modal de recuperar contraseña
  async openRecuperarPass() {
    const modal = await this.modalCtrl.create({
      component: RecuperarPasswordComponent, // Componente del modal de recuperar contraseña
    });
    return await modal.present(); // Mostrar el modal
  }

  // Función para abrir el modal de redes sociales
  openModal() {
    this.isModalOpen = true; // Abrir el modal
  }

  // Función para cerrar el modal de redes sociales
  closeModal() {
    this.isModalOpen = false; // Cerrar el modal
  }

  // Iniciar sesión con Google
  googleLogin() {
    console.log("Iniciar sesión con Google"); // Log de inicio de sesión con Google
  }

  // Iniciar sesión con Facebook
  facebookLogin() {
    console.log("Iniciar sesión con Facebook"); // Log de inicio de sesión con Facebook
  }
}
