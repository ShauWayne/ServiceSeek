import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbicacionesGuardadasPage } from './ubicaciones-guardadas.page';

const routes: Routes = [
  {
    path: '',
    component: UbicacionesGuardadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicacionesGuardadasPageRoutingModule {}
