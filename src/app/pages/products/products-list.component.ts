import { productsService } from './services/products.service';
import { SpinnerOverlayService } from '@shared/services/spinner-overlay.service'
import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements AfterViewInit {
  displayedColumns: string[] = ['Imagen', 'Articulo', 'Sku', 'refproveedor' , 'Proveedor', 'Categoria', 'Subcategoria','actions'];
  dataSource = new MatTableDataSource();
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  //@Input() imgPath:string = "https://startdental.es/wp-content/uploads/";
  
  constructor(private viewProd: productsService,
     private spinnerSvc: SpinnerOverlayService) {}

  ngOnInit(): void {
    this.spinner();
    this.viewProd.getAllProducts().subscribe((products) => {
      
      this.dataSource.data = products;
      this.spinner();
    });
    
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

  spinner()
  {
      this.dataSource.data.length >0 ? this.spinnerSvc.hide() : this.spinnerSvc.show();
  }


 /* onOpenModal(prod = {}): void {
   // console.log('prod->', prod);
    let dialogRef = this.dialog.open(ProductModalComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Productos', prod },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`, typeof result);
      // Update result after adding new user.
      this.viewProd.getAllProducts().subscribe((prods) => {this.dataSource.data = prods;});
    });
  }*/
}