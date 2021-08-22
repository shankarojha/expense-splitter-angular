import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {

  public userId
  public authToken
  public password

  constructor(public router: Router,
    public appService: AppService,
    public toastr: ToastrService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')
    console.log(this.userId)
    
    this.route.queryParams.subscribe(params =>{
      this.authToken = params.authToken
      console.log(this.authToken)
    })
  }

  resetPassword = ():any => {
    let data = {
      userId:this.userId,
      authToken:this.authToken,
      password:this.password
    }

    if(this.password){
      this.appService.resetPassword(data).subscribe((apiResponse)=>{
        if(apiResponse.error==false){
          this.toastr.success('Password has been reset. Please login to continue')
          let routerNavigate = () =>{
            this.router.navigate(['/login'])
          }
          setTimeout(routerNavigate,2000)
        }else{
          this.toastr.error('some error occured');
        }
      })
    }else{
      this.toastr.error('please enter your new password');
    }
  }

}
