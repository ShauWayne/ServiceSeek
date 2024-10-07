import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddResenaPage } from './add-resena.page';

const routes: Routes = [
  {
    path: '',
    component: AddResenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddResenaPageRoutingModule {}
