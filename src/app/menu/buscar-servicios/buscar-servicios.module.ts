import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarServiciosPageRoutingModule } from './buscar-servicios-routing.module';

import { BuscarServiciosPage } from './buscar-servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarServiciosPageRoutingModule
  ],
  declarations: [BuscarServiciosPage]
})
export class BuscarServiciosPageModule {}
