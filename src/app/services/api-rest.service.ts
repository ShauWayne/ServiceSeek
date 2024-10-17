// Importaciones necesarias
import { Injectable } from '@angular/core';
import { ClServicio } from '../menu/crud/servicios/model/ClServicio'; // Modelo para los servicios
import { ClResena } from '../menu/crud/resena/model/ClResena'; // Modelo para las reseñas
import { Observable, of, throwError } from 'rxjs'; // Observables para manejar datos asincrónicos
import { catchError, tap, map } from 'rxjs/operators'; // Operadores para manipular observables
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; // Cliente HTTP y cabeceras
import { ClUsuario } from '../menu/crud/usuarios/model/ClUsuario'; // Modelo para los usuarios

// URL base para las llamadas a la API del json-server
const apiUrl = 'http://localhost:3000'; 
// Opciones para la cabecera HTTP (tipo de contenido JSON)
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root' // Define que el servicio está disponible en toda la aplicación
})
export class ApiRestService {

  // Constructor del servicio con inyección de dependencias
  constructor(private http: HttpClient) {}

  // Método privado para manejar errores genéricos en las operaciones HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("Error ", error); // Loguea el error en la consola
      return of(result as T); // Retorna un resultado por defecto
    };
  }

  /////////////////////////////////////////////////////////
  ////////////////CRUD SERVICIOS///////////////////////////
  /////////////////////////////////////////////////////////

  // Obtener todos los servicios
  getServicios(): Observable<ClServicio[]> {
    console.log("Obteniendo servicios...");
    return this.http.get<ClServicio[]>(apiUrl + "/servicios")
      .pipe(
        tap(servicios => console.log('Servicios obtenidos')), // Loguea que se han obtenido los servicios
        catchError(this.handleError('getServicios', [])) // Maneja errores, devuelve un array vacío si falla
      );
  }

  // Obtener un servicio por ID
  getServicio(id: number): Observable<ClServicio> {
    console.log('Obteniendo servicio Id: ', id);
    return this.http.get<ClServicio>(apiUrl + "/servicios" + "/" + id)
      .pipe(
        tap(_ => console.log(`Servicio obtenido id=${id}`)), // Loguea que se ha obtenido un servicio específico
        catchError(this.handleError<ClServicio>('getServicio')) // Maneja errores
      );
  }

  // Agregar Servicio
  addServicio(servicio: ClServicio): Observable<ClServicio> {
    console.log('Agregando servicio', servicio, '...');
    return this.http.post<ClServicio>(apiUrl + "/servicios", servicio, httpOptions)
      .pipe(
        tap((servicio: ClServicio) => console.log('Servicio agregado', servicio)), // Loguea el servicio agregado
        catchError(this.handleError<ClServicio>('addServicio', servicio)) // Maneja errores
      );
  }

  // Actualizar un servicio
  updServicio(id: number, servicio: ClServicio): Observable<ClServicio> {
    console.log('Actualizando servicio Id: ', id, '...');
    return this.http.put<ClServicio>(apiUrl + "/servicios" + "/" + id, servicio, httpOptions)
      .pipe(
        tap(_ => console.log(`Servicio actualizado id=${id}`)), // Loguea que el servicio se actualizó
        catchError(this.handleError<any>('updateServicio')) // Maneja errores
      );
  }

  // Borrar un servicio
  delServicio(id: number): Observable<ClServicio> {
    console.log('Eliminando servicio Id: ', id, '...');
    return this.http.delete<ClServicio>(apiUrl + "/servicios" + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log(`Servicio eliminado id=${id}`)), // Loguea que se eliminó el servicio
        catchError(this.handleError<ClServicio>('delServicio')) // Maneja errores
      );
  }

  ///////////////////////////////////////////////////////
  ////////////////CRUD RESEÑAS///////////////////////////
  ///////////////////////////////////////////////////////

  // Obtener todas las reseñas
  getResenas(): Observable<ClResena[]> {
    console.log("Obteniendo reseñas...");
    return this.http.get<ClResena[]>(apiUrl + "/resenas")
      .pipe(
        tap(resenas => console.log('Reseñas obtenidas')), // Loguea que se obtuvieron reseñas
        catchError(this.handleError('getResenas', [])) // Maneja errores
      );
  }

  // Obtener todas las reseñas de un servicio
  getResenasServicio(idServicio: number): Observable<ClResena[]> {
    console.log("Obteniendo reseñas para el servicio ID:", idServicio);
    return this.http.get<ClResena[]>(`${apiUrl}/resenas?id_servicio=${idServicio}`)
      .pipe(
        tap(resenas => console.log('Reseñas obtenidas:', resenas)), // Loguea que se obtuvieron reseñas para un servicio específico
        catchError(this.handleError('getResenasServicio', [])) // Maneja errores
      );
  }

  // Obtener una reseña por ID
  getResena(id: number): Observable<ClResena> {
    console.log('Obteniendo reseña Id: ', id);
    return this.http.get<ClResena>(apiUrl + "/resenas" + "/" + id)
      .pipe(
        tap(_ => console.log(`Reseña obtenida id=${id}`)), // Loguea que se obtuvo la reseña
        catchError(this.handleError<ClResena>('getResena')) // Maneja errores
      );
  }

  // Agregar Reseña
  addResena(resena: ClResena): Observable<ClResena> {
    console.log('Agregando reseña', resena, '...');
    return this.http.post<ClResena>(apiUrl + "/resenas", resena, httpOptions)
      .pipe(
        tap((resena: ClResena) => console.log('Reseña agregada', resena)), // Loguea la reseña agregada
        catchError(this.handleError<ClResena>('addResena', resena)) // Maneja errores
      );
  }

  // Actualizar una reseña
  updResena(id: number, resena: ClResena): Observable<ClResena> {
    console.log('Actualizando reseña Id: ', id, '...');
    return this.http.put<ClResena>(apiUrl + "/resenas" + "/" + id, resena, httpOptions)
      .pipe(
        tap(_ => console.log(`Reseña actualizada id=${id}`)), // Loguea que se actualizó la reseña
        catchError(this.handleError<any>('updateResena')) // Maneja errores
      );
  }

  // Borrar una reseña
  delResena(id: string): Observable<ClResena> {
    console.log('Eliminando reseña Id: ', id, '...');
    return this.http.delete<ClResena>(apiUrl + "/resenas" + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log(`Reseña eliminada id=${id}`)), // Loguea que se eliminó la reseña
        catchError(this.handleError<ClResena>('delResena')) // Maneja errores
      );
  }

  /////////////////////////////////////////////////////////
  ////////////////CRUD USUARIOS///////////////////////////
  /////////////////////////////////////////////////////////

  // Obtener todos los usuarios
  getUsuarios(): Observable<ClUsuario[]> {
    console.log("Obteniendo usuarios...");
    return this.http.get<ClUsuario[]>(apiUrl + "/usuarios")
      .pipe(
        tap(usuarios => console.log('Usuarios obtenidos')), // Loguea que se obtuvieron los usuarios
        catchError(this.handleError('getUsuarios', [])) // Maneja errores
      );
  }

  // Obtener un usuario por correo
  getUsuario(correo: string): Observable<ClUsuario[]> {
    console.log('Obteniendo usuario: ', correo);
    return this.http.get<ClUsuario[]>(apiUrl + "/usuarios?correo=" + correo)
      .pipe(
        tap(_ => console.log(`Usuario obtenido correo=${correo}`)), // Loguea que se obtuvo el usuario
        catchError(this.handleError<ClUsuario[]>('getUsuario')) // Maneja errores
      );
  }

  // Agregar Usuario
  addUsuario(usuario: ClUsuario): Observable<ClUsuario> {
    console.log('Agregando usuario', usuario, '...');
    return this.http.post<ClUsuario>(apiUrl + "/usuarios", usuario, httpOptions)
      .pipe(
        tap((usuario: ClUsuario) => console.log('Usuario agregado', usuario)), // Loguea que se agregó el usuario
        catchError(this.handleError<ClUsuario>('addUsuario', usuario)) // Maneja errores
      );
  }

  // Actualizar un usuario
  updUsuario(id: number, usuario: ClUsuario): Observable<ClUsuario> {
    console.log('Actualizando usuario Id: ', id, '...');
    return this.http.put<ClUsuario>(apiUrl + "/usuarios" + "/" + id, usuario, httpOptions)
      .pipe(
        tap(_ => console.log(`Usuario actualizado id=${id}`)), // Loguea que se actualizó el usuario
        catchError(this.handleError<any>('updateUsuario')) // Maneja errores
      );
  }

  // Borrar un usuario
  delUsuario(id: string): Observable<ClUsuario> {
    console.log('Eliminando usuario Id: ', id, '...');
    return this.http.delete<ClUsuario>(apiUrl + "/usuarios" + "/" + id, httpOptions)
      .pipe(
        tap(_ => console.log(`Usuario eliminado id=${id}`)), // Loguea que se eliminó el usuario
        catchError(this.handleError<ClUsuario>('delUsuario')) // Maneja errores
      );
  }
}
