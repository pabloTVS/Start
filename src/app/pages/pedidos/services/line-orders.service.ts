import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

import { LinesOrders } from '@shared/models/linesOrders.interface';
import { ViewLinesOrders } from '@shared/models/viewlinesorders.interface';

@Injectable({
  providedIn: 'root'
})
export class LineOrdersService {

  constructor(private http: HttpClient) { }

  getLinOrder(NumPed: number): Observable<ViewLinesOrders[]>{
    return this.http.get<ViewLinesOrders[]>(`${environment.API_URL}/ordlines/${NumPed}`).
    pipe(catchError(this.handlerError));
  }

  new(Lines: LinesOrders): Observable<LinesOrders> {
    return this.http
      .post<LinesOrders>(`${environment.API_URL}/ordlines`, Lines)
      .pipe(catchError(this.handlerError));
  }

  delete(IdLinPed:number,NumPedido: number): Observable<{}> {
    return this.http
      .delete<LinesOrders>(`${environment.API_URL}/ordlines/${IdLinPed}/${NumPedido}`)
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
