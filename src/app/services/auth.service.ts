import { Injectable } from '@angular/core'; // Importar el decorador Injectable para que este servicio pueda ser inyectado en otros componentes o servicios
import { Storage } from '@ionic/storage-angular'; // Importar Storage de Ionic para manejar el almacenamiento persistente

@Injectable({
  providedIn: 'root' // Proveer el servicio en la raíz para que esté disponible en toda la aplicación
})
export class AuthService {
  private _storage: Storage | null = null; // Variable privada para almacenar la instancia de Storage

  constructor(private storage: Storage) {
    this.init(); // Llamar a la función init para inicializar el almacenamiento
  }

  // Inicializar el almacenamiento
  async init() {
    const storage = await this.storage.create(); // Crear la instancia del almacenamiento
    this._storage = storage; // Asignar la instancia creada a la variable privada _storage
  }

  // Guardar los datos del usuario
async saveSession(username: any) {
  await this._storage?.set('username', username); // Guardar los datos del usuario bajo la clave 'username' en el almacenamiento
}

// Obtener los datos del usuario
async getSession() {
  return await this._storage?.get('username'); // Obtener los datos del usuario almacenados bajo la clave 'username'
}

// Eliminar los datos del usuario para cerrar sesión
async clearSession() {
  await this._storage?.remove('username'); // Eliminar los datos del usuario almacenados bajo la clave 'username'
}


  // Verificar si hay un usuario registrado (inicio automático de sesión)
  async isLoggedIn(): Promise<boolean> {
    const user = await this.getSession(); // Obtener los datos del usuario
    return user !== null; // Devolver true si hay datos de usuario, false en caso contrario
  }
}
