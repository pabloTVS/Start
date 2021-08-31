import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

import { LinesOrders } from '@shared/models/linesOrders.interface';

@Injectable({
  providedIn: 'root'
})
export class LineOrdersService {

  constructor(private http: HttpClient) { }

  getAllOrders(NumPed: number): Observable<LinesOrders[]>{
    return this.http.get<LinesOrders[]>(`${environment.API_URL}/ordlines/${NumPed}`).
    pipe(catchError(this.handlerError));
  }

  new(Lines: LinesOrders): Observable<LinesOrders> {
    return this.http
      .post<LinesOrders>(`${environment.API_URL}/ordlines`, Lines)
      .pipe(catchError(this.handlerError));
  }  

  delete(orderId: number): Observable<{}> {
    return this.http
      .delete<LinesOrders>(`${environment.API_URL}/ordlines/${orderId}`)
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
