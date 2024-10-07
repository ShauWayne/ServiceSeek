import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioResenasPageRoutingModule } from './servicio-resenas-routing.module';

import { ServicioResenasPage } from './servicio-resenas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioResenasPageRoutingModule
  ],
  declarations: [ServicioResenasPage]
})
export class ServicioResenasPageModule {}
