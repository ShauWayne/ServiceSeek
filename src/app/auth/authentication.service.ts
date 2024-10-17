// Importaciones necesarias de Angular, Ionic y otros servicios utilizados
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiRestService } from '../services/api-rest.service';
import { ClUsuario } from '../menu/crud/usuarios/model/ClUsuario';
import { lastValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

// Decorador Injectable para permitir que el servicio sea inyectado en otros componentes o servicios
@Injectable({
  providedIn: 'root' // Define el ámbito del servicio como 'root', lo que hace que esté disponible en toda la aplicación
})
export class AuthenticationService {

  constructor( private storage: Storage, private apiRestService: ApiRestService, private alertController : AlertController, private sqlService: DatabaseService, private router: Router) {
    this.ngOnInit();
  }

  // Método de inicialización para crear el almacenamiento
  async ngOnInit() {
    await this.storage.create(); // Inicializa la base de datos de almacenamiento local
  }

  // Método para iniciar sesión
  async login(correoUser: string, password: string): Promise<boolean> {
    try {
      // Obtiene el usuario correspondiente al correo proporcionado mediante una llamada a la API
      const users: ClUsuario[] = await lastValueFrom(this.apiRestService.getUsuario(correoUser));

      // Verifica si se encontraron usuarios con el correo proporcionado
      if (users.length > 0) {
        const userClass = users[0]; // Se asume que solo hay un usuario con ese correo
        console.log(userClass);
        console.log('Auth Usuario:', userClass.nombre, '-', userClass.contrasena);
        
        // Verifica si el correo y la contraseña proporcionados son correctos
        if (correoUser === userClass.correo && password === userClass.contrasena) {
          // Guarda en el almacenamiento local que el usuario está autenticado y su nombre
          await this.storage.set('isLoggedIn', true);
          await this.storage.set('user', userClass.nombre);
          return true; // Retorna 'true' indicando que el inicio de sesión fue exitoso
        } else {
          // Muestra una alerta indicando que la contraseña es incorrecta
          const alerta = await this.alertController.create({
            header: 'Error',
            message: 'Contraseña incorrecta',
            buttons: ['OK']
          });
          await alerta.present();
          console.log('Contraseña incorrecta');
          return false; // Retorna 'false' indicando que el inicio de sesión falló
        }
      } else {
        // Muestra una alerta indicando que no se encontró al usuario
        const alerta = await this.alertController.create({
          header: 'Error',
          message: 'Usuario no encontrado',
          buttons: ['OK']
        });
        await alerta.present();
      }
      return false; // Retorna 'false' si no se encontró ningún usuario con el correo proporcionado
    } catch (error) {
      // Manejo de errores durante el proceso de autenticación
      console.error('Error en autenticación: ', error);
      return false; // Retorna 'false' en caso de error
    }
  }

  // Método para verificar si el usuario está autenticado
  async isLoggedIn(): Promise<boolean> {
    // Devuelve el valor almacenado bajo 'isLoggedIn' que indica si el usuario está autenticado (true/false)
    return !!(await this.storage.get('isLoggedIn'));
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    await this.sqlService.sincronizarResenas();//Sincroniza datos desde el SQL a JSON
    await this.sqlService.sincronizarUsuarios();//Lo Mismo, pero con los usuarios añadidos
    await this.storage.remove('isLoggedIn');
    this.router.navigate(['/login']);
  }

  // Método para obtener el nombre del usuario autenticado
  async getUsuario(): Promise<string> {
    const user = await this.storage.get('user');
    // Si el usuario está definido, lo devuelve; de lo contrario, devuelve 'Invitado'
    return user ? String(user) : 'Invitado';
  }
}
