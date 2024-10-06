// src/app/services/database.service.ts

import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.crearDB();
  }
  async crearDB() {
    await this.platform.ready();
    this.dbInstance = await this.sqlite.create({
      name: 'serviceseekpersistencia.db',
      location: 'default',
    });
    await this.createTables();
  }
  private async createTables() {
    const sql = `
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL
      )
    `;
    await this.dbInstance.executeSql(sql, []);
  }

  async addProduct(name: string, price: number) {
    const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
    return this.dbInstance.executeSql(sql, [name, price]);
  }

  async getProducts() {
    const sql = 'SELECT * FROM products';
    const result = await this.dbInstance.executeSql(sql, []);
    const products = [];
    for (let i = 0; i < result.rows.length; i++) {
      products.push(result.rows.item(i));
    }
    return products;
  }

  async updateProduct(id: number, name: string, price: number) {
    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    return this.dbInstance.executeSql(sql, [name, price, id]);
  }

  async deleteProduct(id: number) {
    const sql = 'DELETE FROM products WHERE id = ?';
    return this.dbInstance.executeSql(sql, [id]);
  }
}
