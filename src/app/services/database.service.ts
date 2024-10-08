// src/app/services/database.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Platform } from '@ionic/angular';
import { ApiRestService } from './api-rest.service'; // Importar ApiRestService
import { firstValueFrom } from 'rxjs'; // Para manejar Observables como Promesas
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLite, SQLiteDatabaseConfig } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db!: SQLiteObject;

  private dbInstance!: SQLiteObject;

  constructor(
    private sqlite: SQLite, 
    private platform: Platform, 
    private apiRestService: ApiRestService // Inyectar ApiRestService
  ) {
    this.crearDB();
  }

  async getServicios(): Promise<any[]> {
    try {
      const query = 'SELECT * FROM servicios';
      const result = await this.db.executeSql(query, []);
      const servicios = [];
      for (let i = 0; i < result.rows.length; i++) {
        servicios.push(result.rows.item(i));
      }
      return servicios;
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
      throw error; // Lanza el error para manejarlo en otro lugar
    }
  }

  // Crear la base de datos y cargar los datos del API REST
  
  async crearDB() {
    await this.platform.ready();
    this.dbInstance = await this.sqlite.create({
      name: 'serviceseekpersistencia.db',
      location: 'default',
    });
    await this.createTables(); // Crear las tablas si no existen
    await this.insertDataFromAPI(); // Insertar los datos obtenidos desde el API REST a SQLite
  }

  // Crear las tablas en SQLite si no existen
  private async createTables() {
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
    await this.dbInstance.executeSql(sql, []);
  }

  // Obtener los datos del API REST e insertarlos en SQLite
  private async insertDataFromAPI() {
    try {
      // Obtener los datos de la API REST usando el ApiRestService
      const servicios = await firstValueFrom(this.apiRestService.getServicios());

      // Insertar los servicios en SQLite
      await this.insertServicios(servicios);

      console.log('Datos insertados correctamente en la base de datos SQLite.');
    } catch (error) {
      console.error('Error al cargar datos desde la API REST:', error);
    }
  }

  // Insertar servicios en la tabla `servicios`
  private async insertServicios(servicios: any[]) {
    const sql = `
      INSERT OR IGNORE INTO servicios 
      (id, nombre, tipo, lat, lng, direccion, descripcion, telefono, horario, calificacion, num_resenas) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    for (const servicio of servicios) {
      await this.dbInstance.executeSql(sql, [
        servicio.id,
        servicio.nombre,
        servicio.tipo,
        servicio.ubicacion.lat,
        servicio.ubicacion.lng,
        servicio.direccion,
        servicio.descripcion,
        servicio.telefono,
        servicio.horario,
        servicio.calificacion,
        servicio.num_resenas,
      ]);
    }
  }

  // Agregar métodos adicionales para manejar otras tablas como `resenas`, `usuarios` y `categorias`
  // según se vayan requiriendo en el proyecto.

  // Ejemplo de agregar un nuevo producto (similar a los servicios)
  async addProduct(name: string, price: number) {
    const sql = 'INSERT INTO productos (name, price) VALUES (?, ?)';
    return this.dbInstance.executeSql(sql, [name, price]);
  }

  // Consultar todos los productos de la tabla `productos`
  async getProducts() {
    const sql = 'SELECT * FROM productos';
    const result = await this.dbInstance.executeSql(sql, []);
    const products = [];
    for (let i = 0; i < result.rows.length; i++) {
      products.push(result.rows.item(i));
    }
    return products;
  }
  
}
