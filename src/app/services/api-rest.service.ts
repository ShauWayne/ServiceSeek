import { Injectable } from '@angular/core';
import { ClServicio } from '../menu/crud/servicios/model/ClServicio';
import { ClResena } from '../menu/crud/resena/model/ClResena';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = 'http://localhost:3000'; // URL jason-server
const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; // Cabecera que especifica el tipo de contenido, en este caso Json

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error("Error ", error);
      return of(result as T);
    }  
  }

  /////////////////////////////////////////////////////////
  ////////////////CRUD SERVICIOS///////////////////////////
  /////////////////////////////////////////////////////////

  // Obtener todos los servicios
  getServicios(): Observable<ClServicio[]> {
    console.log("Obteniendo servicios...");
    return this.http.get<ClServicio[]>(apiUrl + "/servicios")
    .pipe(
        tap(servicios => console.log('Servicios obtenidos')),
        catchError(this.handleError('getServicios', []))
      );
  }

  // Obtener un servicio por ID
  getServicio(id: number): Observable<ClServicio> {
    console.log('Obteniendo servicio Id: ', id);
    return this.http.get<ClServicio>(apiUrl + "/servicios" + "/" + id)
    .pipe(
      tap(_ => console.log(`Servicio obtenido id=${id}`)),
      catchError(this.handleError<ClServicio>('getServicio'))
    );
  }

  // Agregar Servicio
  addServicio(servicio: ClServicio): Observable<ClServicio> {
    console.log('Agregando servicio', servicio, '...'); //Da detalles en consola
    return this.http.post<ClServicio>(apiUrl + "/servicios", servicio, httpOptions)
    .pipe(
      tap((servicio: ClServicio) => console.log('Servicio agregado', servicio)), //Confirma en consola
      catchError(this.handleError<ClServicio>('addServicio', servicio))
    );
  }

  // Actualizar un servicio
  updServicio(id: number, servicio: ClServicio): Observable<ClServicio> {
    console.log('Actualizando servicio Id: ', id, '...');
    return this.http.put<ClServicio>(apiUrl + "/servicios" + "/" + id, servicio, httpOptions)
    .pipe(
      tap(_ => console.log(`Servicio actualizado id=${id}`)),
      catchError(this.handleError<any>('updateServicio'))
    );
  }

  // Borrar un servicio
  delServicio(id: number): Observable<ClServicio> {
    console.log('Eliminando servicio Id: ', id, '...');
    return this.http.delete<ClServicio>(apiUrl + "/servicios" + "/" + id, httpOptions)
    .pipe(
      tap(_ => console.log(`Servicio eliminado id=${id}`)),
      catchError(this.handleError<ClServicio>('getServicio'))
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
        tap(resenas => console.log('Reseñas obtenidas')),
        catchError(this.handleError('getResenas', []))
      );
  }
  // Obtener todas las reseñas de un servicio
  getResenasServicio(idServicio: number): Observable<ClResena[]> {
    console.log("Obteniendo reseñas para el servicio ID:", idServicio);
    return this.http.get<ClResena[]>(`${apiUrl}/resenas?id_servicio=${idServicio}`)
    .pipe(
        tap(resenas => console.log('Reseñas obtenidas:', resenas)),
        catchError(this.handleError('getResenasServicio', []))
    );
}


  // Obtener una reseña por ID
  getResena(id: number): Observable<ClResena> {
    console.log('Obteniendo reseña Id: ', id);
    return this.http.get<ClResena>(apiUrl + "/resenas" + "/" + id)
    .pipe(
      tap(_ => console.log(`Reseña obtenida id=${id}`)),
      catchError(this.handleError<ClResena>('getResena'))
    );
  }

  // Agregar Reseña
  addResena(resena: ClResena): Observable<ClResena> {
    console.log('Agregando reseña', resena, '...'); //Da detalles en consola
    return this.http.post<ClResena>(apiUrl + "/resenas", resena, httpOptions)
    .pipe(
      tap((resena: ClResena) => console.log('Reseña agregada', resena)), //Confirma en consola
      catchError(this.handleError<ClResena>('addResena', resena))
    );
  }

  // Actualizar una reseña
  updResena(id: number, resena: ClResena): Observable<ClResena> {
    console.log('Actualizando reseña Id: ', id, '...');
    return this.http.put<ClResena>(apiUrl + "/resenas" + "/" + id, resena, httpOptions)
    .pipe(
      tap(_ => console.log(`Reseña actualizada id=${id}`)),
      catchError(this.handleError<any>('updateResena'))
    );
  }

  // Borrar una reseña
  delResena(id: number): Observable<ClResena> {
    console.log('Eliminando reseña Id: ', id, '...');
    return this.http.delete<ClResena>(apiUrl + "/resenas" + "/" + id, httpOptions)
    .pipe(
      tap(_ => console.log(`Reseña eliminada id=${id}`)),
      catchError(this.handleError<ClResena>('getResena'))
    );
  }
}