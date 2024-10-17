// src/app/services/database.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, throwError, interval, lastValueFrom } from 'rxjs';
import { ApiRestService } from './api-rest.service'; // Importar ApiRestService
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { switchMap } from 'rxjs/operators';
import { ClServicio } from '../menu/crud/servicios/model/ClServicio';
import { ClResena } from '../menu/crud/resena/model/ClResena';
import { HttpErrorResponse } from '@angular/common/http';
import { ClUsuario } from '../menu/crud/usuarios/model/ClUsuario';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private dbInstance!: SQLiteObject // Inyectar SQLiteObject
  
  constructor(
    private apiRestService: ApiRestService // Inyectar ApiRestService
  ) {
    this.startBackgroundSync(); // Iniciar la sincronización en segundo plano
  }

  setDb(db: SQLiteObject) {
    if (this.dbInstance === null) {
      this.dbInstance = db;
    }
  }

  createTables(): Promise<any> {

    const sql = `
      CREATE TABLE IF NOT EXISTS servicios (
        id INTEGER PRIMARY KEY,
        nombre TEXT,
        tipo TEXT,
        lat REAL,
        lng REAL,
        direccion TEXT,
        descripcion TEXT,
        telefono TEXT,
        horario TEXT,
        calificacion REAL,
        num_resenas INTEGER
      );
      CREATE TABLE IF NOT EXISTS resenas (
        id INTEGER PRIMARY KEY,
        id_servicio INTEGER,
        usuario TEXT,
        calificacion REAL,
        comentario TEXT,
        fecha TEXT
      );
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY,
        nombre TEXT,
        correo TEXT,
        contrasena TEXT,
        foto_perfil TEXT,
        fecha_registro TEXT
      );
      CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY,
        nombre TEXT,
        descripcion TEXT
      );
    `;
    return this.dbInstance.executeSql(sql); // Ejecutar la consulta SQL para crear las tablas
  }


  // Insertar servicios en la tabla `servicios`
  private async insertServicios(servicios: ClServicio[]) {
    const sql = `
      INSERT OR IGNORE INTO servicios 
      (id, nombre, tipo, lat, lng, direccion, descripcion, telefono, horario, calificacion, num_resenas) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    for (const servicio of servicios) {
      // Insertar cada servicio en la base de datos
      await this.dbInstance.executeSql(sql, [
        servicio.id,
        servicio.nombre,
        servicio.tipo,
        servicio.ubicacion,
        servicio.direccion,
        servicio.descripcion,
        servicio.telefono,
        servicio.horario,
        servicio.calificacion,
        servicio.num_resenas,
      ]);
    }
  }

  // Iniciar la sincronización de datos en segundo plano
  private startBackgroundSync() {
    // Sincronizar cada 10 minutos (600000 ms)
    interval(600000)
      .pipe(
        switchMap(() => {
          console.log('Iniciando sincronización de datos en segundo plano...');
          return this.apiRestService.getServicios(); // Llamar al API REST para obtener los datos
        })
      )
      .subscribe({
        next: async (servicios) => {
          // Insertar los servicios obtenidos en la base de datos
          await this.insertServicios(servicios);
          console.log('Sincronización de datos completada.');
        },
        error: (error) => {
          console.error('Error durante la sincronización de datos:', error);
        },
      });
  }

  // Agregar métodos adicionales para manejar otras tablas como `resenas`, `usuarios` y `categorias`
  // según se vayan requiriendo en el proyecto.

  // Ejemplo de agregar una nueva reseña (similar a los servicios)
  async addResena(resena: ClResena) {
    const sql = 'INSERT INTO resenas (id, id_servicio, usuario, calificacion, comentario, fecha) VALUES (?, ?, ?, ?, ?)';
    return this.dbInstance.executeSql(sql, [resena.id,resena.id_servicio, resena.usuario, resena. calificacion, resena.comentario, resena.fecha]);
  }

  async getResenas() {
    const sql = 'SELECT * FROM resenas';
    const result = await this.dbInstance.executeSql(sql, []);
    const resenas = [];
    for (let i = 0; i < result.rows.length; i++) {
      resenas.push(result.rows.item(i));
    }
    return resenas;
  }
  
  async sincronizarResenas(): Promise<void> {
    const sql = 'SELECT * FROM resenas';
    const result = await this.dbInstance.executeSql(sql, []);
    
    for (let i = 0; i < result.rows.length; i++) {
      const resena = result.rows.item(i);
  
      try {
        // Verificar si la reseña existe en el API REST
        const apiResena = await lastValueFrom(this.apiRestService.getResena(resena.id));
  
        if (apiResena) {
          // Si existe en el API REST, eliminarla de la base de datos local
          await this.dbInstance.executeSql('DELETE FROM resenas WHERE id = ?', [resena.id]);
          console.log(`Reseña con id ${resena.id} eliminada del almacenamiento local`);
        }
      } catch (error: unknown) {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          await lastValueFrom(this.apiRestService.addResena(resena));
          console.log(`Reseña con id ${resena.id} añadida al servidor`);
          // Eliminarla de la base de datos local después de insertarla en el servidor
          await this.dbInstance.executeSql('DELETE FROM resenas WHERE id = ?', [resena.id]);
        } else {
          console.error(`Error al sincronizar la reseña con id ${resena.id}:`, error);
        }
      }
    }
  }

  async addUsuario(usuario: ClUsuario) {
    const sql = 'INSERT INTO usuarios (id, nombre, correo, contrasena, foto_perfil, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)';
    return this.dbInstance.executeSql(sql, [usuario.id, usuario.nombre, usuario.correo, usuario.contrasena, usuario.foto_perfil, usuario.fecha_registro]);
  }

  async getUsuarios() {
    const sql = 'SELECT * FROM usuarios';
    const result = await this.dbInstance.executeSql(sql, []);
    const usuarios = [];
    for (let i = 0; i < result.rows.length; i++) {
      usuarios.push(result.rows.item(i));
    }
    return usuarios;
  }
  
  async sincronizarUsuarios(): Promise<void> {
    const sql = 'SELECT * FROM usuarios';
    const result = await this.dbInstance.executeSql(sql, []);
    
    for (let i = 0; i < result.rows.length; i++) {
      const usuario = result.rows.item(i);
  
      try {
        // Verificar si el usuario existe en el API REST
        const apiUsuario = await lastValueFrom(this.apiRestService.getUsuario(usuario.id));
  
        if (apiUsuario) {
          // Si existe en el API REST, eliminarla de la base de datos local
          await this.dbInstance.executeSql('DELETE FROM usuarios WHERE id = ?', [usuario.id]);
          console.log(`Usuario con id ${usuario.id} eliminado del almacenamiento local`);
        }
      } catch (error: unknown) {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          await lastValueFrom(this.apiRestService.addUsuario(usuario));
          console.log(`Usuario con id ${usuario.id} añadido al servidor`);
          // Eliminarla de la base de datos local después de insertarla en el servidor
          await this.dbInstance.executeSql('DELETE FROM usuarios WHERE id = ?', [usuario.id]);
        } else {
          console.error(`Error al sincronizar el usuario con id ${usuario.id}:`, error);
        }
      }
    }
  }
}