import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserComponent, SignupComponent, LoginComponent, PasswordresetComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class UserModule { }
