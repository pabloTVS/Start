import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Customer } from '@shared/models/customer.interface'
import { Payments } from '@shared/models/payments.interface'
import { CustomersService } from '@pages/admin/services/customers.service';
import { PaymentsService} from '@pages/admin/services/payments.service'


export interface statesCustomers {
  value: number;
  viewValue: string;
}
export interface recEqui {
  value: number;
  viewValue: string;
}
//temporal
export interface commercial {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  private isValidEmail = /\S+@\S+\.\S+/;

  custId :number;
  customer: Customer;
  payments: Payments []=[];
  selectedPayment: number;
  newCustomer: boolean = false;

  selectedState: number;
  selectedCommercial: number;
  selectedRec: number;
  

  stateCustomer: statesCustomers [] = [
    {value: 1, viewValue: 'Correcto'},
    {value: 2, viewValue: 'En riesgo'},
    {value: 3, viewValue: 'Moroso'}
  ]

  recargo: recEqui [] = [
    {value: 0, viewValue: 'No'},
    {value: 1, viewValue: 'Sí'}
  ]

  commercial: commercial [] = [
    {value: 0, viewValue: 'Administracion'},
    {value: 1, viewValue: 'José Luis Gras Soriano'},
    {value: 2, viewValue: 'Antonio Zamora Mateos'}
  ]

  constructor(private custSvc: CustomersService,
              private paymSvc: PaymentsService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }
  


              customersForm = this.fb.group({
                Nombre: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
                NombreComercial: ['',[Validators.minLength(3),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
                DNINIF: ['', [Validators.required,Validators.minLength(8),Validators.pattern('^[A-Z0-9]+$')]],
                CodPostal:['',[Validators.required,Validators.minLength(4),Validators.pattern('^[0-9]+$')]],
                Localidad:['',[Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
                Provincia:['',[Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
                Direccion:['',[Validators.required,Validators.minLength(3)]],
                Telefono1: ['',[Validators.minLength(9),Validators.pattern('^[0-9]+$')]],
                Movil1: ['',[Validators.minLength(9),Validators.pattern('^[0-9]+$')]],
                Fax1: ['',[Validators.minLength(9),Validators.pattern('^[0-9]+$')]],
                Email1: ['',[Validators.required,Validators.pattern(this.isValidEmail)]],
                Email2: ['',[Validators.pattern(this.isValidEmail)]],
                Email3: ['',[Validators.pattern(this.isValidEmail)]],
                CodFormaPago: [1,[Validators.required,Validators.pattern('^[0-9]+$')]],
                DtoPP: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
                DtoComercial: [0,[Validators.min(0),Validators.max(100),Validators.required,Validators.pattern('^[0-9.]+$')]],
                Entidad: ['',[Validators.maxLength(4),Validators.pattern('^[0-9]+$')]],
                Oficina: ['',[Validators.maxLength(4),Validators.pattern('^[0-9]+$')]],
                DC: ['',[Validators.maxLength(2),Validators.pattern('^[0-9]+$')]],
                Cuenta: ['',[Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
                Observaciones: [''],
                CodComercial: [0, [Validators.required,Validators.pattern('^[0-9]+$')]],
                EstadoCliente: [1, [Validators.required,Validators.pattern('^[0-9]+$')]],
                RE: [0,[Validators.required,Validators.pattern('^[0-9]+$')]]

               // IBAN: ['',[Validators.maxLength(23),Validators.pattern('^[A-Z0-9]+$')]]
              })

  onSubmit(): void {
    if (!this.newCustomer)
    {
      try {
        this.custSvc.update(this.custId,this.customersForm.value).subscribe();
        window.alert('Cambios guardados correctamente.')

      } catch (error) {
        console.log('Error guardandado cambios.')
      }
    }
    else {
      try {
        this.custSvc.new(this.customersForm.value).subscribe();
        window.alert('Cliente creado correctamente.')

      } catch (error) {
        console.log('Error creando cliente.')
      }

    }
  }

  isValidField(name: string): boolean {
    const fieldName = this.customersForm.get(name);
    this.customersForm.get(name).errors
    return fieldName.invalid && fieldName.touched;
  }

  ngOnInit(): void {
    try 
    {
      this.route.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.custId = +params['Id'] || 0;
      });
      if (this.custId !=0)
      {
         this.custSvc.getById(this.custId).subscribe(cust =>{
           //console.log(cust);
           this.customer = cust;
           this.customersForm.patchValue(this.customer);
           this.selectedPayment = cust.CodFormaPago;
           this.selectedCommercial = cust.CodComercial;
           this.selectedState = cust.EstadoCliente;
           this.selectedRec = cust.RE;
         })

         this.paymSvc.getAll().subscribe(paym =>{
           this.payments = paym;
         })
      }
      else {
            this.newCustomer = true;
            this.paymSvc.getAll().subscribe(paym =>{
            this.payments = paym;})
          }
    } catch (e) {
      console.log(e.message);
    }
  }

  onReset(): void {
    this.customersForm.reset();
  }
}

