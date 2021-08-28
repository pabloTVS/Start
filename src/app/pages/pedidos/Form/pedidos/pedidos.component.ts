import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { OrdersService } from '@pages/pedidos/services/orders.service';
import { CustomersService } from '@pages/admin/services/customers.service';
import { PaymentsService} from '@pages/admin/services/payments.service';
import { AuthService } from '@app/pages/auth/auth.service';
import { productsService } from '@app/pages/products/services/products.service'

import { Orders } from '@shared/models/orders.interface'
import { LinesOrders } from '@shared/models/linesOrders.interface';
import { Customer } from '@app/shared/models/customer.interface';
import { Payments } from '@shared/models/payments.interface';
import { viewProducts } from '@app/shared/models/viewproducts.interface'

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
  linOrder$ : Observable<LinesOrders []>;
  customer : Customer [] = [];
  payments$: Observable<Payments[]>;
  product: viewProducts[]=[];
  selectedProduct: viewProducts;

  orderId: number;
  createHead: boolean;

  selectedCodArt: number;
  selectedState: number;
  selectedCommercial: number;
  selectedPayment: number;
  selectedCodCli: number;
  selectedDtoPP: number;
  selectedDtoComercial: number;
  selectedSerie: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private svcOrders: OrdersService,
    private svcCustomer: CustomersService,
    private svcPay: PaymentsService,
    private svcProd: productsService,
    private authSvc: AuthService) { }

  //traígo los valores del Observable user.
  userValue = this.authSvc.userValue;
  codCom = this.userValue.commercial;
  role = this.userValue.role;
  codCli = this.userValue.customer;

  headForm = this.fb.group({
    Serie: ['A',[Validators.required]],
    CodCli: ['',[Validators.required]],
    DtoPP: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
    DtoComercial: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
    CodFormaPago: [,[Validators.required,Validators.pattern('^[0-9]+$')]],
    CodComercial: [0, [Validators.required,Validators.pattern('^[0-9]+$')]],
    CodOrdStatus: [1,[Validators.required,Validators.pattern('^[0-1]+$')]],
    CodDestino: [0, [Validators.required,Validators.pattern('^[0-9]+$')]],
    Observaciones: ['']
  });

  artForm = this.fb.group({
    CodArt: [''],
    Descripcion: [' ',[Validators.required]],
    Cantidad: [1,[Validators.required,Validators.pattern('^[0-9.]+$')]],
    Precio: [0,[Validators.required,Validators.pattern('^[A-Z0-9.]+$')]],
    DtoComercial: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
    DtoPP: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]]
  });

  ngOnInit(): void {

    if (!this.codCli)
      this.svcCustomer.getAll(this.codCom,this.role).subscribe(cust => {this.customer = cust;});
    else
      this.selectedCodCli = this.codCli;

    this.payments$ = this.svcPay.getAll();
    this.svcProd.getAllProducts().subscribe( prod => { this.product=prod;console.log(this.product);
    });

    //this.svcPay.getAll().subscribe(paym =>{this.payments = paym;});
  }

  isValidField(name: string): boolean {
    const fieldName = this.headForm.get(name);
    this.headForm.get(name).errors
    return fieldName.invalid && fieldName.touched;
  }
  isValidFieldArt(name: string): boolean {
    const fieldName = this.artForm.get(name);
    this.artForm.get(name).errors
    return fieldName.invalid && fieldName.touched;
  }
  onSubmitHead():void {
    console.log('se ha grabado la cabecera');

  }
  onChangeCustomer(event:any){

    for(let i=0; i < this.customer.length;i++)
    {
      if (this.customer[i].IdCliente === event.value)
      {
        this.headForm.patchValue({
          DtoPP: this.customer[i].DtoPP,
          CodFormaPago: this.customer[i].CodFormaPago,
          CodComercial: this.customer[i].CodComercial,
          DtoComercial: this.customer[i].DtoComercial
        });
        this.artForm.patchValue({
          DtoComercial: this.customer[i].DtoComercial,
          DtoPP: this.customer[i].DtoPP
        })
      }
    }
  }
  onChangeArt(event:any){

    for(let i=0; i < this.product.length;i++)
    {
      if (this.product[i].ID === event.value)
      {
       // console.log(event.value,this.product[i]);
        this.svcProd.getById(event.value).subscribe(prod => {

          this.selectedProduct = prod;
          console.log(this.selectedProduct,'precio rebajado: ',this.selectedProduct.precioRebajado);

          this.artForm.patchValue({
            Descripcion : this.selectedProduct.Articulo,
            Precio : this.selectedProduct.precioRebajado || 0
          })

        });

      }
    }
  }
  onAddArt():void
  {
    console.log('añade un articulo');

  }
}
