import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdResenaPage } from './upd-resena.page';

const routes: Routes = [
  {
    path: '',
    component: UpdResenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdResenaPageRoutingModule {}
