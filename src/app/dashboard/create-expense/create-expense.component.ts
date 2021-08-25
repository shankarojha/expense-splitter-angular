import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

  public userName = this.Cookie.get('firstName') + ' ' + this.Cookie.get('lastName')
  public userEmail = this.Cookie.get('email')
  public expenseId = this.Cookie.get('selectedExpense')
  public debtorsToAdd = []
  public addEmail: string
  public addPaid: string
  public createdBy: string = this.userEmail
  public paidBy: string
  public amount: number
  public ExpenseName: string


  constructor(private route: ActivatedRoute, private appService: AppService, private router: Router, private toastr: ToastrService, private Cookie: CookieService) { }

  ngOnInit(): void {
  }

  addDebtors = () => {
    let found = this.debtorsToAdd.some(el => el.email === this.addEmail);
    if (!found) {
      this.debtorsToAdd.push({ email: this.addEmail, paid: this.addPaid })
      this.addEmail = null;
      this.addPaid = null;
    } else {
      this.toastr.error('member already added to list. Please save to continue')
    }
    console.log(this.debtorsToAdd)
  };

  createExpense = ():any => {

    if(!this.ExpenseName){
      this.toastr.warning('Enter expense name');
    } else if(!this.amount){
      this.toastr.warning('Enter amount');
    }else if(!this.paidBy){
      this.toastr.warning('Enter payer\'s email');
    }else if(this.debtorsToAdd.length<=0){
      this.toastr.warning('Enter members and amount they have paid');
    }else{
      let data = {
        ExpenseName:this.ExpenseName,
        createdBy: this.userEmail,
        paidBy: this.paidBy,
        amount: this.amount,
        debtors: null,
      };
      if (this.debtorsToAdd) {
        data.debtors = JSON.stringify(this.debtorsToAdd);
      }
  
      if (data) {
        this.appService.createExpense(data).subscribe(
          (apiResponse) => {
            if (apiResponse.status === 200) {
              this.toastr.success('New expense added');
              let routerNavigate = () =>{
                this.router.navigate(['/dashboard'])
               }
               setTimeout(routerNavigate,2000)
               this.toastr.success(apiResponse.message);
               this.debtorsToAdd=null
            } else {
              this.toastr.error(apiResponse.message);
            }
          },
          (err) => {
            this.toastr.error(err);
          }
        );
      }
    }
    
  }

  public logout: any = () => {
    this.appService.logout().subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        console.log("logout function called")
        this.Cookie.deleteAll();

        this.router.navigate(['/']);
      } else {
        this.toastr.error(apiResponse.message);
      }
    }, (err) => {
      this.toastr.error("some error occured");
    })
  }

}
