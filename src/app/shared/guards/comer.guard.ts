import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { UserResponse } from './../models/user.interface';
import { CanActivate, Router} from '@angular/router';
import { Subject  } from 'rxjs';

import { AuthService } from './../../pages/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ComercialGuard implements CanActivate {
  private destroy$ = new Subject<any>();  
  constructor(private authSvc: AuthService,private router: Router) {}
  role: string;
  canActivate() {
    this.authSvc.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: UserResponse) => {
        this.role = user?.role;
    })

    if (this.role === 'Comercial' || this.role === 'Admin')
    {
        return true;
    }
    else{
        window.alert('No tienes acceso');
        this.router.navigate(['/']);
        return false;
    }
 
  }
  
}