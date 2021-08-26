import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

import { viewOrders } from '@shared/models/viewOrders.interface'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAllOrders(codCom: number,role: string): Observable<viewOrders[]>{
    return this.http.get<viewOrders[]>(`${environment.API_URL}/orders/${codCom}/${role}`).
    pipe(catchError(this.handlerError));
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
