import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponseWP} from '@shared/models/userWP.interface';
import { Observable, throwError } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class WpAuthService {
  //@Input() token;
  //@Output() tokenChange = new EventEmitter<string>();
  
  constructor(private http: HttpClient) { }

  loginJWTwp(): Observable<UserResponseWP> {
    return this.http.post<UserResponseWP>(`${environment.API_URL_JWT_WP}`,{username: environment.username,password: environment.password}).
    pipe(
      map((user: UserResponseWP) => {
         this.saveLocalStorage(user);
         return user;
       }),

      catchError(this.handlerError)
      );
  }
 /* loginJWTwp() {
    return this.http.post(`${environment.API_URL_JWT_WP}`,{username: environment.username,password: environment.password}).pipe(catchError(this.handlerError));
  }*/
  private saveLocalStorage(user: UserResponseWP): void {
    const { success,message, ...rest } = user;
    //localStorage.setItem('userWP', JSON.stringify(rest));
    localStorage.setItem('token', user.data.token);
  }

  private handlerError(err:any): Observable<never> {
    let errorMessage = '¡Se ha producido un error al recuperar los datos!';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
