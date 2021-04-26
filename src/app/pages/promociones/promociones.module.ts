import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromocionesRoutingModule } from './promociones-routing.module';
import { PromocionesComponent } from './promociones.component';


@NgModule({
  declarations: [PromocionesComponent],
  imports: [
    CommonModule,
    PromocionesRoutingModule
  ]
})
export class PromocionesModule { }
