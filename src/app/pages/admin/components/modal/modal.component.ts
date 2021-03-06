import { UsersService } from './../../services/users.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BaseFormUser } from '@shared/utils/base-form-user';

enum Action {
  EDIT = 'editar',
  NEW = 'nuevo',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  actionTODO = Action.NEW;
  showPasswordField = true;
  nuevoUsuario = false;
  oldPassword:string;
  hide = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormUser,
    private userSvc: UsersService
  ) {}
  ngOnDestroy(): void {
    this.userForm.baseForm.reset(); //reseteo el formulario.
  }

  ngOnInit(): void {
    if (this.data?.user.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.pathFormData();
      // controla si se ha activado el cambio de password
      if (this.data?.changePassword)
      {
        this.oldPassword = this.data?.user.password;
        this.showPasswordField = true;
        this.nuevoUsuario = false;
        this.userForm.baseForm.get('password').reset(null);
        this.data.title = 'Cambio de password';
      }  
      else
      { 
        this.showPasswordField = false;
        this.nuevoUsuario = false;
        this.data.title = 'Editar usuario';
      }   
    }
    else {
      //nuevo usuario
      this.data.title = 'Alta de usuario';
      this.nuevoUsuario = true;
      this.userForm.baseForm.reset();
    }
  }

  onSave(): void {
    const formValue = this.userForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.userSvc.new(formValue).subscribe((res) => {
        console.log('New user', res);
      });
    } else {
      const userId = this.data?.user?.id;
      if (this.showPasswordField){
        //cambio de password.
        this.userSvc.changePassword(userId, formValue).subscribe((res) => {
          console.log('Update password', res);
        });
      }
      else {
      this.userSvc.update(userId, formValue).subscribe((res) => {
        console.log('Update user', res);
      });
    }

    }
  }

  checkField(field: string): boolean {
    return this.userForm.isValidField(field);
  }

  private pathFormData(): void {
    this.userForm.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role,
      password: this.data?.user?.password
      });
  }
}
