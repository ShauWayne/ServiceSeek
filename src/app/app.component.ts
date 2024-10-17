import { Component } from '@angular/core'; // Importar Component de Angular
import { Platform } from '@ionic/angular'; // Importar Platform de Ionic para detectar si la plataforma está lista
import { AuthService } from './services/auth.service'; // Importar AuthService para manejar la sesión del usuario
import { Router } from '@angular/router'; // Importar Router para la navegación entre páginas

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform, // Inyección de dependencia de Platform para manejar eventos de la plataforma
    private authService: AuthService, // Inyección de dependencia de AuthService para manejar la sesión del usuario
    private router: Router // Inyección de dependencia de Router para redirigir a diferentes páginas
  ) {
    this.initializeApp(); // Llamar al método initializeApp al inicializar el componente
  }

  // Método para inicializar la aplicación
  async initializeApp() {
    await this.platform.ready(); // Esperar a que la plataforma esté lista (esto asegura que todo esté inicializado correctamente)
    const isLoggedIn = await this.authService.isLoggedIn(); // Verificar si el usuario ya ha iniciado sesión

    // Solo redirigir si el usuario está en la página de inicio de sesión
    if (isLoggedIn && this.router.url === '/login') {
      this.router.navigateByUrl('/home'); // Si el usuario está autenticado y está en la página de login, redirigir a la página principal
    }
  }

  // Método para cerrar sesión
  async logout() {
    await this.authService.clearSession(); // Limpiar la sesión del usuario usando AuthService
    this.router.navigateByUrl('/login'); // Redirigir al usuario a la página de login después de cerrar sesión
  }
}
