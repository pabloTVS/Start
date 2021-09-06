import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter,take ,map} from 'rxjs/operators'
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
export interface typesOfVat {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private svcOrders: OrdersService,
    private svcLinOrd: LineOrdersService,
    private svcCustomer: CustomersService,
    private svcPay: PaymentsService,
    private svcProd: productsService,
    private authSvc: AuthService,
    private spinnerSvc: SpinnerOverlayService) { }

  displayedColumns: string[] = ['Imagen','Articulo', 'Sku', 'refproveedor','Precio','PrecioRebajado','actions'];
  dataSource = new MatTableDataSource();

  displayedColumnsOrder: string[] = ['CodArticulo', 'Descripcion','Cantidad','Precio','IVA','DtoC','DtoPP'];
  dataSourceOrder = new MatTableDataSource();

//  displayedColumnViewlines: string[] =['CodArticulo', 'Descripcion','Cantidad','Precio','DtoC','SubTotal','DtoPP','BaseImponible','IVA','ImporteIVA','RE','ImporteRE','Total']
  displayedColumnViewlines: string[] =['Imagen','CodArticulo', 'Descripcion','Cantidad','Precio','DtoC','SubTotal','DtoPP','BaseImponible','IVA','RE','Total']
  dataSourceViewlines = new MatTableDataSource();

  headForm = this.fb.group({
    Serie: ['A',[Validators.required]],
    CodCli: ['',[Validators.required]],
    DtoPP: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
    DtoComercial: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
    CodFormaPago: [,[Validators.required,Validators.pattern('^[0-9]+$')]],
    CodComercial: [0, [Validators.required,Validators.pattern('^[0-9]+$')]],
    CodOrdStatus: [1,[Validators.required,Validators.pattern('^[0-1]+$')]],
    CodDestino: [0, [Validators.required,Validators.pattern('^[0-9]+$')]],
    Observaciones: [''],
    TotalPedido: [0]
  });

  artForm = this.fb.group({
    NumPed: [],
    CodArticulo:[],
    PCosto:[0],
    Descripcion: ['',[Validators.required]],
    Cantidad: [1,[Validators.required,Validators.min(0),Validators.pattern('^[0-9.]+$')]],
    Precio: [0,[Validators.required,Validators.pattern('^[A-Z0-9.]+$')]],
    DtoC: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
    DtoPP: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
    //PorcIVA: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
    PorcIVA: [0],
    RE: [0]
  });

  headviewForm = this.fb.group({
    NumPed: [],
    Serie: [],
    DtoPP: [],
    Fecha: [],
    FechaEntrega: [],
    Comercial: [],
    CodCli: [],
    NombreCliente: [],
    DenominacionComercial: [],
    Destino: [],
    Direccion: [],
    Localidad: [],
    CodPostal: [],
    Provincia: [],
    Total: [],
    DescripcionFormaPago: [],
    Estado: [],
    Observaciones: []
  });


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  typeVat: typesOfVat[] = 
  [
    {value: 21, viewValue: '21%'},
    {value: 10, viewValue: '10%'},
    {value: 4, viewValue: '4%'},
    {value: 0, viewValue: '0%'}
  ];

  status: orderStatus[] =
  [
    {value: '1', viewValue: 'Pendiente'},
    {value: '2', viewValue: 'Servido'}
  ];

  serie: orderSerie[] =
  [
    {value: 'A', viewValue: 'Serie A'}
  ];

 // order :Orders;
  linOrder$ : Observable<LinesOrders []>;
  customer : Customer [] = [];
  payments$: Observable<Payments[]>;
  product: viewProducts[]=[];
  lineOrder: LinesOrders [] = [];

  viewmode: boolean = false; //contrala la vista del formulario.
  orderId: number;
  lineOrd: number;
  createHead: boolean = false;

  selectedPayment: number;
  selectedCodCli: number;
  selectedDtoPP: number;
  selectedDtoComercial: number;
  selectedIVA: number;
  selectedSerie: string;

  //traígo los valores del Observable user.
  userValue = this.authSvc.userValue;
  codCom = this.userValue.commercial;
  role = this.userValue.role;
  codCli = this.userValue.customer;

  ngOnInit(): void {
    try
    {
      this.route.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.orderId = +params['Id'] || 0;
      });

      if (this.orderId !=0)
      {
         this.viewmode = true;
         this.svcOrders.getAllOrders(this.codCom,this.codCli,this.role).pipe(
          map(ord => ord.filter(ord => ord.NumPed === this.orderId)[0])
         ).subscribe(
           head => {
            this.headviewForm.patchValue({
            NumPed: head.NumPed,
            Serie: head.Serie,
            DtoPP: head.DtoPP,
            Fecha: head.Fecha,
            FechaEntrega: head.FechaEntrega,
            Comercial: head.Comercial,
            CodCli: head.CodCli,
            NombreCliente: head.NombreCliente,
            DenominacionComercial: head.DenominacionComercial,
            Destino: head.Destino,
            Direccion: head.Direccion,
            Localidad: head.Localidad,
            CodPostal: head.CodPostal,
            Provincia: head.Provincia,
            Total: head.Total,
            DescripcionFormaPago: head.DescripcionFormaPago,
            Estado: head.Estado,
            Observaciones: head.Observaciones
            });
           // console.log('viewhead',this.headviewForm.value);

            }
          )



         /*this.svcOrders.getById(this.orderId).subscribe(ord =>{
           console.log('cabecera->',ord);
           this.selectedCodCli = ord.CodCli

           //this.headForm.patchValue(order);
         });
         console.log('cliene ',this.selectedCodCli);

         this.svcCustomer.getById(this.selectedCodCli).subscribe(cust=>{console.log('datos cliente',cust);});*/

         this.svcLinOrd.getLinOrder(this.orderId).subscribe(lines =>{
           //console.log('lineas->',lines);
           this.dataSourceViewlines.data = lines;
           //this.artForm.patchValue(line);
         })
      }
      else {
        this.viewmode = false;
        this.spinner();
        if (!this.codCli)
          this.svcCustomer.getAll(this.codCom,this.role).subscribe(cust => 
            {this.customer = cust;});
        else
          this.selectedCodCli = this.codCli;

        this.payments$ = this.svcPay.getAll();
        this.svcProd.getAllProducts().subscribe( prod => {
          this.product=prod;
          this.dataSource.data=prod;
          this.spinner();

        });
      }
    } catch (e) {
    console.log(e.message);
    }
  }

  spinner()
  {
      this.dataSource.data.length >0 ? this.spinnerSvc.hide() : this.spinnerSvc.show();
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
            this.orderId = ord.NumPed;
            this.createHead = true;
          }
        );
        this.headForm.disable(); //desactivo el form.
      } catch (error) {
        console.log('Error creando pedido.')
      }
    }
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
        });
        this.selectedDtoComercial = this.customer[i].DtoComercial;
        this.selectedDtoPP = this.customer[i].DtoPP;
      }
    }
  }

  onSelectArt (item:any) {
    this.artForm.patchValue({
      NumPed: this.orderId,
      CodArticulo: item.ID,
      PCosto: item.PCoste || 0,
      Descripcion : item.Articulo,
      PorcIVA: item.PorcIVA || 0,
      Precio : item.PrecioRebajado || item.Precio,
      DtoC: this.selectedDtoComercial || 0,
      DtoPP: this.selectedDtoPP || 0,
      RE: 0
    })
    this.selectedIVA= item.PorcIVA || 0;
  }

  onAddArt():void
  {
 //   console.log('añade un articulo',this.artForm.value);
    try {
      this.svcLinOrd.new(this.artForm.value).subscribe( line => {
        this.lineOrder.push(line);
        this.dataSourceOrder.data = this.lineOrder;
      });
      this.artForm.reset({
        NumPed: this.orderId,
        Cantidad: 1,
        PCosto: 0,
        PorcIVA: 0,
        Precio: 0,
        DtoC: this.selectedDtoComercial || 0,
        DtoPP: this.selectedDtoPP || 0
      });
    } catch (error) {
      console.log('Error creando pedido.')
    }

  }
}
