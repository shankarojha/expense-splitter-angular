import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public email: string;
  public password: string;
  public mobile
  public firstName: string;
  public lastName: string;

  constructor(
    public appService: AppService,
    public router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public signupFunction(): any {
    if (!this.firstName) {
      let element = document.getElementById('contactName1');
      element.classList.add('is-invalid');
      this.toastr.warning('please enter your First Name');

    } else if (!this.lastName) {
      let element = document.getElementById('dobirth');
      element.classList.add('is-invalid');
      this.toastr.warning('please enter your Last Name');

    } else if (!this.email) {
      let element = document.getElementById('InputEmail1');
      element.classList.add('is-invalid');
      this.toastr.warning('please enter your email');

    } else if (!this.password) {
      let element = document.getElementById('InputPassword1');
      element.classList.add('is-invalid');
      this.toastr.warning('please enter your password');

    } else if (!this.mobile) {
      let element = document.getElementById('mobile1');
      element.classList.add('is-invalid');
      this.toastr.warning('please enter your Mobile Number');

    } else {
      let formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      mobile: this.mobile
      }

      if (formData) {
        this.appService.signupFunction(formData).subscribe(
          (apiResponse) => {
            if (apiResponse.status === 200) {
              this.toastr.success('successfully signedup');
              setTimeout(() => {
                this.router.navigate(['']);
              }, 5000);
            } else {
              this.toastr.error(apiResponse.message);
            }
          },
          (err) => {
            this.toastr.error('error occured');
          }
        );
      }
    }
  }
}

