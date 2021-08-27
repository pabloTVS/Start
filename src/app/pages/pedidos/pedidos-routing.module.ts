import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosListComponent } from './pedidos-list.component';
import { PedidosComponent} from './Form/pedidos/pedidos.component'

const routes: Routes = [{ path: '', component: PedidosListComponent },
  {path: 'Form',component: PedidosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
