import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { InputModule } from "./components/input/input.module"; // Ajusta la ruta si es necesario
import { FormsModule } from '@angular/forms';
import { DatePickerModalComponent } from './date-picker-modal/date-picker-modal.component'; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterModalComponent, // Declara el componente del modal
    DatePickerModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    InputModule,
    FormsModule,
    
],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
  // No es necesario entryComponents en Angular 9+
})
export class AppModule {}
