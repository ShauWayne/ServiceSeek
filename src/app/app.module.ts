// Importaciones necesarias para el módulo principal de la aplicación
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { InputModule } from "./components/input/input.module"; // Importa un módulo de entrada personalizado
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa formularios reactivos
import { DatePickerModalComponent } from './date-picker-modal/date-picker-modal.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { provideHttpClient } from '@angular/common/http'; // Importa la función para proporcionar clientes HTTP
import { SQLite } from '@ionic-native/sqlite/ngx'; // Importa la librería SQLite para manejar bases de datos nativas
import { IonicStorageModule } from '@ionic/storage-angular'; // Importa el módulo de almacenamiento de Ionic
import { Drivers } from '@ionic/storage'; // Importa los drivers para Ionic Storage

// Decorador NgModule que define el módulo principal de la aplicación
@NgModule({
  declarations: [
    // Componentes declarados en este módulo
    AppComponent,
    RegisterModalComponent,
    DatePickerModalComponent,
    RecuperarPasswordComponent,
  ],
  imports: [
    // Módulos que se importan para ser utilizados en la aplicación
    BrowserModule, // Necesario para aplicaciones web
    IonicModule.forRoot(), // Configuración principal del módulo de Ionic
    AppRoutingModule, // Configuración del enrutamiento de la aplicación
    InputModule, // Módulo de entrada personalizado (ajusta la ruta si es necesario)
    FormsModule, // Módulo para formularios básicos
    ReactiveFormsModule, // Módulo para formularios reactivos
    IonicStorageModule.forRoot({
      // Configuración del almacenamiento local de la aplicación
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage], // Prioriza el uso de IndexedDB y luego LocalStorage
    }),
  ],
  providers: [
    // Servicios que se proporcionan en toda la aplicación
    provideHttpClient(), // Proporciona un cliente HTTP para realizar solicitudes a servidores
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Estrategia para reutilizar rutas en Ionic
    SQLite, // Servicio para manejar SQLite para almacenamiento en dispositivos nativos
  ],
  bootstrap: [AppComponent] // Componente raíz que se carga al iniciar la aplicación
})
export class AppModule {}
