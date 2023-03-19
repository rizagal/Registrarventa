import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallearticuloPageRoutingModule } from './detallearticulo-routing.module';

import { DetallearticuloPage } from './detallearticulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallearticuloPageRoutingModule
  ],
  declarations: [DetallearticuloPage]
})
export class DetallearticuloPageModule {}
