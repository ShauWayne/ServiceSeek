import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddResenaPageRoutingModule } from './add-resena-routing.module';

import { AddResenaPage } from './add-resena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddResenaPageRoutingModule
  ],
  declarations: [AddResenaPage]
})
export class AddResenaPageModule {}
