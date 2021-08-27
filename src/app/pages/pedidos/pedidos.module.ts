import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosListComponent } from './pedidos-list.component';
import { MaterialModule } from '@app/material.module';
import { PedidosComponent } from './Form/pedidos/pedidos.component';


@NgModule({
  declarations: [PedidosListComponent, PedidosComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MaterialModule
  ]
})
export class PedidosModule { }
