import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelResenaPage } from './del-resena.page';

const routes: Routes = [
  {
    path: '',
    component: DelResenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DelResenaPageRoutingModule {}
