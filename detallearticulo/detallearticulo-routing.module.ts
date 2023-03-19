import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallearticuloPage } from './detallearticulo.page';

const routes: Routes = [
  {
    path: '',
    component: DetallearticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallearticuloPageRoutingModule {}
