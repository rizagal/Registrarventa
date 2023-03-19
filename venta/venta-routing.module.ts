import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VentaPage } from './venta.page';

const routes: Routes = [
  {
    path: '',
    component: VentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaPageRoutingModule {}
