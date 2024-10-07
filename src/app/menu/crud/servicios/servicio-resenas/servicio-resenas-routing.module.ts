import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicioResenasPage } from './servicio-resenas.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioResenasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioResenasPageRoutingModule {}
