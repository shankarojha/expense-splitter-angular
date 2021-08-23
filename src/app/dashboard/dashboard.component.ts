import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userExpenses = []
  public userName = this.Cookie.get('firstName')+' '+this.Cookie.get('lastName')
  public userEmail = 'esx@gmail.com5'//this.Cookie.get('email')
  public userNotifications = []

  constructor(private appService:AppService, private router:Router, private toastr:ToastrService, private Cookie:CookieService, public SocketService: SocketService) { }

  ngOnInit(): void {
    /** Notification */

    this.SocketService.sendNotification(this.userEmail)
    this.getNotification()

    /** Notification ends */
    this.getUserexpenses()
  }

  getUserexpenses = () : any =>{
    this.appService.getUserExpenses().subscribe((apiResponse)=>{
      if (apiResponse.status==200){
        for(let x of apiResponse.data){
          let temp = {
            expenseName:x.ExpenseName,
            amount:x.amount,
            expenseId:x.ExpenseId,
            createdOn:x.createdOn,
            createdBy:x.createdBy
          }
          this.userExpenses.push(temp)
        }
      }else{
        this.toastr.warning(apiResponse.message);
      }
    })
  }

  getNotification=():any => {
    this.SocketService.getNotification().subscribe((apiResponse)=>{
      console.log(apiResponse)
      for(let x of apiResponse.message){
        this.userNotifications.push(x)
      }
      this.userNotifications = this.userNotifications.reverse()
    })
  }

  selectedExpense = (expenseId):any => {
    this.userExpenses.map((expense)=>{
      if(expense.expenseId===expenseId){
        this.Cookie.set('selectedExpense',expenseId)
      }
    })
  }

  public logout: any = () => {
    this.appService.logout().subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        console.log("logout function called")
        this.Cookie.deleteAll('http://localhost:4200', 'http://localhost:4200');

        this.router.navigate(['/']);
      } else {
        this.toastr.error(apiResponse.message);
      }
    }, (err) => {
      this.toastr.error("some error occured");
    })
  }

}
