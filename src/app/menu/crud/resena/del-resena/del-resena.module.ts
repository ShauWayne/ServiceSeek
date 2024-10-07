import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DelResenaPageRoutingModule } from './del-resena-routing.module';

import { DelResenaPage } from './del-resena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DelResenaPageRoutingModule
  ],
  declarations: [DelResenaPage]
})
export class DelResenaPageModule {}
