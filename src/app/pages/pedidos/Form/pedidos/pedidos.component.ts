import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { OrdersService } from '@pages/pedidos/services/orders.service'
import { CustomersService } from '@pages/admin/services/customers.service';
import { PaymentsService} from '@pages/admin/services/payments.service';
import { AuthService } from '@app/pages/auth/auth.service';

import { Orders } from '@shared/models/orders.interface'
import { LinesOrders } from '@shared/models/linesOrders.interface';
import { Customer } from '@app/shared/models/customer.interface';
import { Payments } from '@shared/models/payments.interface';

export interface orderStatus {
  value: string;
  viewValue: string;
}

export interface orderSerie {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  status: orderStatus[] =
  [
    {value: '1', viewValue: 'Pendiente'},
    {value: '2', viewValue: 'Servido'}
  ];

  serie: orderSerie[] =
  [
    {value: 'A', viewValue: 'Serie A'},
    {value: 'M', viewValue: 'Serie M'}
  ];

  order :Orders;
  linOrder : LinesOrders [] = [];
  customer : Customer [] = [];
  payments: Payments []=[];
  
  orderId: number;
  createHead: boolean;
  
  selectedState: number;
  selectedCommercial: number;
  selectedPayment: number;
  selectedCodCli: number;
  selectedDtoPP: number;
  selectedSerie: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private svcOrders: OrdersService,
    private svcCustomer: CustomersService,
    private svcPay: PaymentsService,
    private authSvc: AuthService) { }

  //traígo los valores del Observable user.
  userValue = this.authSvc.userValue;
  codCom = this.userValue.commercial;
  role = this.userValue.role;    
  codCli = this.userValue.customer;

  orderForm = this.fb.group({
      Serie: ['A',[Validators.required]],
      Fecha: [Date(),[Validators.required]],
      FechaEntrega: [Date()+5,[Validators.required]],
      CodCli: ['',[Validators.required]],
      DtoPP: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
      CodFormaPago: [1,[Validators.required,Validators.pattern('^[0-9]+$')]],
      CodComercial: [0, [Validators.required,Validators.pattern('^[0-9]+$')]],
      CodOrdStatus: [1,[Validators.required,Validators.pattern('^[0-1]+$')]],
      CodDestino: [0, [Validators.required,Validators.pattern('^[0-9]+$')]],
      Observaciones: ['']
  });
  

  ngOnInit(): void {
    if (!this.codCli)
      this.svcCustomer.getAll(this.codCom,this.role).subscribe(cust => {this.customer = cust;});
    else
      this.selectedCodCli = this.codCli;

    this.svcPay.getAll().subscribe(paym =>{this.payments = paym;});      
  }
  
  isValidField(name: string): boolean {
    const fieldName = this.orderForm.get(name);
    this.orderForm.get(name).errors
    return fieldName.invalid && fieldName.touched;
  }

  onSubmitHead():void {
    console.log('se ha grabado la cabecera');
    
  }
}
