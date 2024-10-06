import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private isAuthenticated: boolean = false; // Aquí podrías inicializar según alguna lógica real (por ejemplo, token almacenado)

  constructor() { }

  // Método para saber si el usuario está autenticado
  public isLoggedIn(): boolean {
    return this.isAuthenticated; // Retorna el estado de autenticación
  }

  // Método para iniciar sesión
  public login(): void {
    // Aquí podrías hacer una llamada HTTP para verificar credenciales
    this.isAuthenticated = true; // Simula autenticación exitosa
  }

  // Método para cerrar sesión
  public logout(): void {
    this.isAuthenticated = false; // Simula cierre de sesión
    // Aquí podrías borrar token o datos de sesión
  }
}
