import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

import { ViewOrders } from '@shared/models/viewOrders.interface'
import { Orders } from '@shared/models/orders.interface'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAllOrders(codCom: number,role: string): Observable<ViewOrders[]>{
    return this.http.get<ViewOrders[]>(`${environment.API_URL}/orders/${codCom}/${role}`).
    pipe(catchError(this.handlerError));
  }

  getById(orderId: number): Observable<Orders>{
    return this.http.get<Orders>(`${environment.API_URL}/orders/${orderId}`)
    .pipe(catchError(this.handlerError))
  }

  new(order: Orders): Observable<Orders> {
    return this.http
      .post<Orders>(`${environment.API_URL}/orders`, order)
      .pipe(catchError(this.handlerError));
  }  

  delete(orderId: number): Observable<{}> {
    return this.http
      .delete<Orders>(`${environment.API_URL}/orders/${orderId}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
