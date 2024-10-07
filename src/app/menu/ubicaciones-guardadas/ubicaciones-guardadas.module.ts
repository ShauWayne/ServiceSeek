import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionesGuardadasPageRoutingModule } from './ubicaciones-guardadas-routing.module';

import { UbicacionesGuardadasPage } from './ubicaciones-guardadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionesGuardadasPageRoutingModule
  ],
  declarations: [UbicacionesGuardadasPage]
})
export class UbicacionesGuardadasPageModule {}
