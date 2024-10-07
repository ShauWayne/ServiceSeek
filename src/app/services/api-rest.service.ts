import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private apiUrl = 'http://localhost:3000'; // Asegúrate de que este es el URL correcto

  constructor(private http: HttpClient) {}

  // Obtener todos los servicios
  getServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios`);
  }

  // Obtener un servicio por ID
  getServicio(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicios/${id}`);
  }

  // Crear un nuevo servicio
  createServicio(servicio: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/servicios`, servicio);
  }

  // Actualizar un servicio
  updateServicio(servicio: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/servicios/${servicio.id}`, servicio);
  }

  // Borrar un servicio
  deleteServicio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/servicios/${id}`);
  }
}