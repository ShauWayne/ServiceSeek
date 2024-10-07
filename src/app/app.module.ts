import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { InputModule } from "./components/input/input.module"; // Ajusta la ruta si es necesario
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { DatePickerModalComponent } from './date-picker-modal/date-picker-modal.component'; 
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { provideHttpClient } from '@angular/common/http'; // Importa esto

@NgModule({
  declarations: [
    AppComponent,
    RegisterModalComponent, // Declara el componente del modal
    DatePickerModalComponent,
    RecuperarPasswordComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule, // Agrega ReactiveFormsModule aquí
  ],
  providers: [
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
  // No es necesario entryComponents en Angular 9+
})
export class AppModule {}
