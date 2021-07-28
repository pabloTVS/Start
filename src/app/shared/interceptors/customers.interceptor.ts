import { AuthService } from './../../pages/auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class CustomersInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) {}
  

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
   
    if (req.url.includes('cust')) {
      const userValue = this.authSvc.userValue;
      console.log(userValue);

      const authReq = req.clone({
        setHeaders: {auth: userValue.token},        
      });
      return next.handle(authReq);
    }    
    return next.handle(req);
  }
}
