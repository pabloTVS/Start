import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { productsService} from '@pages/products/services/products.service'
import { CategoryService} from '@pages/categorias/services/category.service'
import { SubcategoryService } from '@pages/categorias/services/subcategory.service';
import { SupplierService } from '@shared/services/supplier.service';

import { viewProducts } from '@shared/models/viewProducts.interface'
import { wp_terms } from '@shared/models/wp_terms.interface'
import { wp_term_taxonomy } from '@shared/models/wp_terms_taxonomy.interface'

export interface typesOfVat {
    value: string;
    viewValue: string;
}
export interface productStatus {
  value: string;
  viewValue: string;
}

export interface categories {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  custProduct: number;

  product: viewProducts;
  category: wp_terms []=[];
  subcategory: wp_term_taxonomy []=[];
  supplier: wp_terms []=[];

  selectedState: string; //valor del estado
  selectedVat: string; //valor del IVA.
  selectedCat: string;
  selectedSubcat: string;
  selectedProve: string;
  imagen: string;
  i: number = 0;
  //newProduct: boolean=false;

  productStatus: productStatus[] =
  [
    {value: 'publish', viewValue: 'Publicado'},
    {value: 'pending', viewValue: 'Pendiente'}
  ];

  typeVat: typesOfVat[] = 
  [
    {value: '', viewValue: '21%'},
    {value: 'tasa-reducida', viewValue: '10%'},
    {value: 'tasa-superreducida', viewValue: '4%'},
    {value: 'tasa-cero', viewValue: '0%'}
  ];

  catElement: categories [] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private prodSvc: productsService,
    private catSvc: CategoryService,
    private subcatSvc: SubcategoryService,
    private suppSvc: SupplierService
  ) { }

  productForm = this.fb.group({
    Articulo: ['',[Validators.required,Validators.minLength(3)]],
    Url: ['',[Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z0-9-_ñÑáéíóúÁÉÍÓÚ]+$')]],
    DescCorta: [''],
    Estado: [''],
    Sku: ['',[Validators.required]],
    refproveedor: [''], 
    IVA: [''],
    Precio: [0,[Validators.min(0),Validators.required,Validators.pattern('^[A-Z0-9.]+$')]],
    PrecioRebajado: [0,[Validators.min(0),Validators.required,Validators.pattern('^[A-Z0-9.]+$')]],
    PCoste: [0,[Validators.min(0),Validators.required,Validators.pattern('^[A-Z0-9.]+$')]],
    Stock: [0,[Validators.min(0),Validators.pattern('^[0-9]+$')]],
    Imagen: [''],
    IdProveedor: ['',[Validators.required]],
    IdCategoria: ['',[Validators.required]],
    IdSubCategoria: ['',[Validators.required]]
  })

  ngOnInit(): void {
    try {
      this.route.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.custProduct = +params['Id'] || 0;
      });
      if (this.custProduct !=0)
      {
         this.prodSvc.getById(this.custProduct).subscribe(prod =>{
           console.log(prod);
           this.product = prod;
           this.productForm.patchValue(this.product);
           this.selectedState = prod.Estado;
           this.selectedVat = prod.IVA;
           this.selectedCat = prod.IdCategoria;
           this.selectedSubcat = prod.IdSubCategoria;
           this.selectedProve = prod.IdProveedor;
           this.imagen = prod.Imagen;
         })

         this.catSvc.getAllCategory().subscribe(cat =>{
            this.category = cat;
            //console.log(this.category);
           })
           
         this.subcatSvc.getAllSubcategory().subscribe(subcat =>{
             //console.log(subcat);
             this.subcategory = subcat;
             //this.catElement = [{value:subcat.term_id,viewValue:subcat.description}];
             //console.log(this.catElement);
             
           })

         this.suppSvc.getAllSupplier().subscribe(sup =>{
          // console.log(sup);
           this.supplier = sup;
         })  
      }
      //else this.newProduct = true;
    } catch (e) {
      console.log(e.message);
    }
  }

  onSubmit(): void {
    try {
      console.log('valor form: ',this.productForm.value);
      
      this.prodSvc.updateProducts(this.custProduct,this.productForm.value).subscribe();
      window.alert('Cambios guardados correctamente.')

    } catch (error) {
      console.log('Error guardandado cambios.')
    }
  }

  isValidField(name: string): boolean {
    const fieldName = this.productForm.get(name);
    this.productForm.get(name).errors
    return fieldName.invalid && fieldName.touched;
  }

  onChangeSubcategory(event:any){
    for(let i=0; i < this.subcategory.length;i++)
    {
      if (this.subcategory[i].ter_term_id === event.value)
      {
        this.productForm.patchValue({
          IdCategoria: this.subcategory[i].det_parent
        })
      }  
    }
  }
}
