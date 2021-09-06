import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { SpinnerOverlayService } from '@shared/services/spinner-overlay.service'
import { OrdersService } from './services/orders.service'
import { AuthService } from '@app/pages/auth/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {

  constructor(private svcOrder: OrdersService,
    private spinnerSvc: SpinnerOverlayService,
    private authSvc: AuthService) { }

//traígo los valores del Observable user.
  userValue = this.authSvc.userValue;
  codCom = this.userValue.commercial;
  codCli = this.userValue.customer;
  role = this.userValue.role;    

  displayedColumns: string[] = ['Estado','NumPed', 'Serie' , 'Fecha', 'FechaEntrega', 'Comercial', 'NombreCliente',
  'DenominacionComercial','Destino','Direccion','Localidad','CodPostal','Provincia','DescripcionFormaPago',  
  'DtoPP','Total','Observaciones','actions'];
  dataSource = new MatTableDataSource();
   
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
      


  ngOnInit(): void {
    this.spinnerSvc.show();
    this.svcOrder.getAllOrders(this.codCom,this.codCli,this.role)
    .subscribe((orders) => {this.dataSource.data = orders;});
    this.spinnerSvc.hide();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  spinner()
  {
      this.dataSource.data.length >0 ? this.spinnerSvc.hide() : this.spinnerSvc.show();
  }

  onDelete(item:any) :void 
  {
   // console.log(item);
    
    if (item.CodigoEstado === 1 
      && window.confirm('¿Estás seguro de borrar este pedido?.')) 
    {
      this.svcOrder.delete(item.NumPed).subscribe( res => {
        this.svcOrder.getAllOrders(this.codCom,this.codCli,this.role).subscribe((orders) => {this.dataSource.data = orders;});
      });
      
    } else if (item.CodigoEstado > 1) window.alert('Sólo se pueden borrar pedidos pendientes.');
   
  }
}
