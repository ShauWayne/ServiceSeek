import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdResenaPageRoutingModule } from './upd-resena-routing.module';

import { UpdResenaPage } from './upd-resena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdResenaPageRoutingModule
  ],
  declarations: [UpdResenaPage]
})
export class UpdResenaPageModule {}
