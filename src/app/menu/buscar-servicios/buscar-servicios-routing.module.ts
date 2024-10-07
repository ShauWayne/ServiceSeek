import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarServiciosPage } from './buscar-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarServiciosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscarServiciosPageRoutingModule {}
