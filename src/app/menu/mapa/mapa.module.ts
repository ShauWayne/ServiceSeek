import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router'; // Importar RouterModule y Routes
import { MapaPage } from './mapa.page';

const routes: Routes = [
  {
    path: '',
    component: MapaPage
  }
];

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    RouterModule.forChild(routes) // Mueve esto aquí, ya no necesitas crear otro módulo de routing
  ],
  declarations: [MapaPage]
})
export class MapaPageModule {}
