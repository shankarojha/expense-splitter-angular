import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userEmail = 'shankarojha34@gmail.com'
  public email
  public password

  constructor(
    public router: Router,  
    public toastr: ToastrService,
    private Cookie:CookieService,
    private appService:AppService
  ) { }

  ngOnInit(): void {
  }

  public loginFunction = (): any => {
    let data = {
      email: this.email,
      password: this.password,
    };
    
    if (!this.email) {
      let element = document.getElementById("InputEmail1");
      element.classList.add("is-invalid");
      this.toastr.warning('please enter your Email');
      
    } else if (!this.password) {
      let element = document.getElementById("InputPassword1");
      element.classList.add("is-invalid");
      this.toastr.warning('please enter your password');
      
    } else {
      this.appService.loginFunction(data).subscribe(
        (apiResponse) => {
          if (apiResponse.status === 200) {
            this.Cookie.set('authToken', apiResponse.data.authToken.authToken);
            this.Cookie.set('userId', apiResponse.data.userDetails.userId);
            this.Cookie.set('email', apiResponse.data.userDetails.email);
            this.Cookie.set('mobile',apiResponse.data.userDetails.mobile);
            this.Cookie.set('firstName',apiResponse.data.userDetails.firstName);
            this.Cookie.set('lastName',apiResponse.data.userDetails.lastName);



            this.appService.setUserInfoToLocalStorage(
              apiResponse.data.userDetails
            );
            console.log(apiResponse);
            let routerNavigate = () =>{
              this.router.navigate(['/dashboard'])
            }
            setTimeout(routerNavigate,2000)
            this.toastr.success(apiResponse.message);
          } else {
            this.toastr.error(apiResponse.message);
          }
        },
        (err) => {
          this.toastr.error('some error occured');
        }
      );
    }
  }; // end login function

  forgotPassword = () =>{
    if(this.email){
      console.log(this.email)
      this.appService.forgotPassword(this.email).subscribe((apiResponse)=>{
        if(apiResponse.error==false){
          this.toastr.success('password rest link has been sent to your email')
        }else{
          this.toastr.error('some error occured');
        }
      })
    
    }else{
      this.toastr.error('please enter email');
    }
    
  }

  

}
