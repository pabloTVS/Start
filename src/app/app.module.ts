import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { MaterialModule } from '@app/material.module';
import { SidebarModule } from '@shared/components/sidebar/sidebar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminInterceptor } from '@shared/interceptors/admin-interceptor';
import { ProductsInterceptor } from '@shared/interceptors/products.interceptor';
import { CustomersInterceptor } from '@shared/interceptors/customers.interceptor';
import { PaymentsInterceptor } from '@shared/interceptors/payments-interceptors';
import { CategoryInterceptor } from '@shared/interceptors/category-interceptor';
import { SubcategoryInterceptor } from '@shared/interceptors/subcategory-interceptor';
import { SupplierInterceptor } from '@shared/interceptors/supplier-interceptor';
import { OrdersInterceptor } from '@shared/interceptors/orders-interceptor';
import { LinesOrdersInterceptor } from '@shared/interceptors/lineOrders-interceptor';

import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SpinnerOverlayComponent } from './shared/components/spinner-overlay/spinner-overlay.component';
import { ConfiguracionModule } from './pages/admin/configuracion/configuracion.module'

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, SpinnerComponent, SpinnerOverlayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
    ConfiguracionModule
  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ProductsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: PaymentsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CategoryInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SubcategoryInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SupplierInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: OrdersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LinesOrdersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
