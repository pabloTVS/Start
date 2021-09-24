import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BaseFormUser } from '@shared/utils/base-form-user';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';

import { WpAuthService } from '@shared/services/wp-auth.service';
import { UserResponseWP} from '@shared/models/userWP.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscription: Subscription = new Subscription();
  token = null;

  constructor(
    private authSvc: AuthService,
    private wp: WpAuthService,
    private router: Router,
    public loginForm: BaseFormUser
  ) {}

  ngOnInit(): void {
    this.loginForm.baseForm.get('role').setValidators(null);
    this.loginForm.baseForm.get('role').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.loginForm.baseForm.get('username').reset(null);
    this.loginForm.baseForm.get('password').reset(null);
  }

  onLogin(): void {
    if (this.loginForm.baseForm.invalid) {
      return;
    }

    const formValue = this.loginForm.baseForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
          //me conecto a la api de wp y almaceno el token.          
          this.wp.loginJWTwp().subscribe();
  
        }

      })
    );
  }

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }
}
