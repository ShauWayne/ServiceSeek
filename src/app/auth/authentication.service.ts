import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private isAuthenticated: boolean = false; // Aquí podrías inicializar según alguna lógica real (por ejemplo, token almacenado)
  private usuarioActual: string = "Invitado";

  constructor() { }

  // Método para saber si el usuario está autenticado
  public isLoggedIn(): boolean {
    return this.isAuthenticated; // Retorna el estado de autenticación
  }

  // Método para iniciar sesión
  public login(usuario: string): void {
    // Aquí podrías hacer una llamada HTTP para verificar credenciales
    this.isAuthenticated = true; // Simula autenticación exitosa
    this.usuarioActual = usuario;
  }

  // Método para cerrar sesión
  public logout(): void {
    this.isAuthenticated = false; // Simula cierre de sesión
    // Aquí podrías borrar token o datos de sesión
    this.usuarioActual="Invitado";
  }

  public getUsuario(): string {
    return this.isAuthenticated ? this.usuarioActual : "Invitado";
  }
}
