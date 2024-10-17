import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiRestService } from '../services/api-rest.service';
import { ClUsuario } from '../menu/crud/usuarios/model/ClUsuario';
import { lastValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private storage: Storage, private apiRestService: ApiRestService, private alertController : AlertController, private sqlService: DatabaseService, private router: Router) {
    this.ngOnInit();
  }

  async ngOnInit(){
      await this.storage.create();
  }

  // Método para iniciar sesión
  async login(correoUser: string, password: string): Promise<boolean> {
    try {
      const users: ClUsuario[] = await lastValueFrom(this.apiRestService.getUsuario(correoUser));
      
      if(users.length > 0){
        const userClass = users[0];
        console.log(userClass);
        console.log('Auth Usuario:',userClass.nombre,'-',userClass.contrasena);
        if (correoUser === userClass.correo && password === userClass.contrasena){
          await this.storage.set('isLoggedIn', true);
          await this.storage.set('user', userClass.nombre);
          return true;
        } else {
          const alerta  = await this.alertController.create({
            header: 'Error',
            message: 'Contraseña incorrecta',
            buttons: ['OK']
          });
          await alerta.present();
          console.log('Contraseña incorrecta');
          return false;
        }
      }else{
        const alerta  = await this.alertController.create({
          header: 'Error',
          message: 'Usuario no encontrado',
          buttons: ['OK']
        });
        await alerta.present();
      }
      return false; // Add this line to handle the case when userData is falsy
    } catch (error){
      console.error('Error en autenticación: ', error);
      return false;
    }
  }  // Método para saber si el usuario está autenticado
  async isLoggedIn(): Promise<boolean> {
    return !!(await this.storage.get('isLoggedIn')) // Retorna el estado de autenticación (true-false)
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    await this.sqlService.sincronizarResenas();//Sincroniza datos desde el SQL a JSON
    await this.sqlService.sincronizarUsuarios();//Lo Mismo, pero con los usuarios añadidos
    await this.storage.remove('isLoggedIn');
    this.router.navigate(['/login']);
  }

  async getUsuario(): Promise<string> {
    const user = await this.storage.get('user');
    return user ? String(user): 'Invitado';
  }
}
