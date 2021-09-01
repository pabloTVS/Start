import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { OrdersService } from '@pages/pedidos/services/orders.service';
import { LineOrdersService } from '@pages/pedidos/services/line-orders.service';
import { CustomersService } from '@pages/admin/services/customers.service';
import { PaymentsService} from '@pages/admin/services/payments.service';
import { AuthService } from '@app/pages/auth/auth.service';
import { productsService } from '@app/pages/products/services/products.service'
import { SpinnerOverlayService } from '@shared/services/spinner-overlay.service'

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
  displayedColumns: string[] = ['Articulo', 'Sku', 'RefProveedor','Precio','PrecioRebajado','actions'];
  dataSource = new MatTableDataSource();

  displayedColumnsOrder: string[] = ['NumPed', 'CodArticulo', 'Descripcion','Cantidad','Precio','IVA','DtoC','DtoPP'];
  dataSourceOrder = new MatTableDataSource();
  

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  lineOrder: LinesOrders [] = [];

  selectedProduct: viewProducts;

  orderId: number;
  lineOrd: number;
  createHead: boolean = false;

  selectedCodArt: number;
  selectedState: number;
  selectedCommercial: number;
  selectedPayment: number;
  selectedCodCli: number;
  selectedDtoPP: number;
  selectedDtoComercial: number;
  selectedSerie: string;

  constructor(
    private fb: FormBuilder,
    private svcOrders: OrdersService,
    private svdLinOrd: LineOrdersService,
    private svcCustomer: CustomersService,
    private svcPay: PaymentsService,
    private svcProd: productsService,
    private authSvc: AuthService,
    private spinnerSvc: SpinnerOverlayService) { }

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
    NumPed: [],
    CodArticulo:[],
    PCosto:[],
    Descripcion: ['',[Validators.required]],
    Cantidad: [1,[Validators.required,Validators.min(0),Validators.pattern('^[0-9.]+$')]],
    Precio: [0,[Validators.required,Validators.pattern('^[A-Z0-9.]+$')]],
    DtoC: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
    DtoPP: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
    IVA:[],
    RE: [0]
  });

  ngOnInit(): void {
    this.spinner();
    if (!this.codCli)
      this.svcCustomer.getAll(this.codCom,this.role).subscribe(cust => {this.customer = cust;});
    else
      this.selectedCodCli = this.codCli;

    this.payments$ = this.svcPay.getAll();
    this.svcProd.getAllProducts().subscribe( prod => {
      this.product=prod;
      this.dataSource.data=prod;
      this.spinner();
      
    });

  }

  spinner()
  {
      this.dataSource.data.length >0 ? this.spinnerSvc.hide() : this.spinnerSvc.show();
  }
  ngAfterViewInit() {
    //this.spinnerSvc.hide();
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
    if (!this.createHead && 
      (window.confirm('¿Estás seguro de crear el pedido?.\nYa no podrá modificar los datos posteriormente.')) )
    {
      try {
        this.svcOrders.new(this.headForm.value).subscribe(
          ord => {
            //console.log('pedido creado: ',ord);
            
            this.orderId = ord.NumPed;
            //console.log(this.orderId,ord.NumPed);
            
          }
        );
        window.alert('Cabecera de pedido creada correctamente.')
        this.createHead = true;
        this.headForm.disable(); //desactivo el form.
      } catch (error) {
        console.log('Error creando pedido.')
      }
    }
    //console.log('se ha grabado la cabecera',this.headForm.value);
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
          DtoC: this.customer[i].DtoComercial,
          DtoPP: this.customer[i].DtoPP
        })
      }
    }
  }

  onSelectArt (item:any) {
    //console.log(item);
    this.artForm.patchValue({
      NumPed: this.orderId,
      CodArticulo: item.ID,
      PCosto: item.PCoste,
      Descripcion : item.Articulo,
      IVA: item.IVA,
      Precio : item.PrecioRebajado || 0
    })


  }

  onAddArt():void
  {
    //console.log('añade un articulo',this.artForm.value);
    try {
      this.svdLinOrd.new(this.artForm.value).subscribe( line => {
        this.lineOrder.push(line);
        this.dataSourceOrder.data = this.lineOrder;
      //  console.log(this.lineOrder);
        
      });

      window.alert('Línea creada correctamente.');
    } catch (error) {
      console.log('Error creando pedido.')
    }

  }
}
