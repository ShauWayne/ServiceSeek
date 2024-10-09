import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private isAuthenticated: boolean = false; // Inicializa flag
  private usuarioActual: string = "Invitado";//Por defecto es invitado

  constructor() { }

  // Método para saber si el usuario está autenticado
  public isLoggedIn(): boolean {
    return this.isAuthenticated; // Retorna el estado de autenticación (true-false)
  }

  // Método para iniciar sesión
  public login(usuario: string): void {
    this.isAuthenticated = true; // True porque se autenticó
    this.usuarioActual = usuario;//Trae nombre de usuario desde variable
  }

  // Método para cerrar sesión
  public logout(): void {
    this.isAuthenticated = false; // Simula cierre de sesión
    // Aquí podrías borrar token o datos de sesión
    this.usuarioActual="Invitado";//Nombre de usuario por defecto
  }

  public getUsuario(): string {
    return this.isAuthenticated ? this.usuarioActual : "Invitado"; //Si no está auth entonces es invitado
  }
}
