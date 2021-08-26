import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosListComponent } from './pedidos-list.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [PedidosListComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MaterialModule
  ]
})
export class PedidosModule { }
