import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';


@NgModule({
  declarations: [UserComponent, SignupComponent, LoginComponent, PasswordresetComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
