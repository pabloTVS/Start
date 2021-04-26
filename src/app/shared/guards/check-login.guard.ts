import { UserResponse } from './../models/user.interface';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { take, map } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService,private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authSvc.user$.pipe(
      take(1),
      map((user: UserResponse) => (!user ? true : false))
    );
  }
}
