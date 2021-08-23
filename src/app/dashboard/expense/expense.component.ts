import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { SocketService } from 'src/app/socket.service';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  @ViewChild('removeMemberToggler') removeMemberEl: ElementRef;

  public userName = this.Cookie.get('firstName')+' '+this.Cookie.get('lastName')
  public expenseName:string
  public expenseId= this.Cookie.get('selectedExpense')
  public amount:number
  public members = []
  public paidBy:string
  public createdOn:Date
  public modifiedOn:Date
  public history=[]
  public createdBy:string
  public changePayment = []
  public membersToremove = []
  public removeMemberToggle:Boolean = false
  toggleClass: boolean = false;


  constructor(private route:ActivatedRoute, private appService:AppService, private router:Router, private toastr:ToastrService, private Cookie:CookieService, public SocketService: SocketService) { }

  ngOnInit(): void {
    this.getHistory()
    this.getExpenseDetails()
    console.log(this.expenseId)
    this.SocketService.sendHistory(this.expenseId)
  }

  removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  getExpenseDetails= ():any => {
    this.appService.getExpenseDetails(this.Cookie.get('selectedExpense')).subscribe((apiResponse)=>{
      console.log(apiResponse)

      this.expenseName = apiResponse.data.ExpenseName
      this.createdOn = apiResponse.data.createdOn
      this.createdBy = apiResponse.data.createdBy
      this.amount = apiResponse.data.amount
      this.paidBy = apiResponse.data.paidBy
      this.modifiedOn = apiResponse.data.modifiedOn
      for(let x of apiResponse.data.debtors){
        this.members.push(x)
      }
    })
  }

  getHistory=():any => {
    this.SocketService.getHistory().subscribe((apiResponse)=>{
      for(let x of apiResponse.message){
        this.history.push(x)
      }
      this.history = this.history.reverse()
    })
  }

  savePaymentInfo=():any =>  {
    for(let x of this.changePayment){
      let data = {
        email:x.paidChangeEmail,
        paid:x.paidChange,
        ExpenseId:this.expenseId,
        userEmail:this.Cookie.get('email')
      }
      console.log(data)
      this.appService.updatePayment(data).subscribe((apiResponse)=>{
        if(apiResponse.status==200){
          this.toastr.success(apiResponse.message);
        }else{
          this.toastr.error(apiResponse.message);
        }
      })
    }
  }

  paidClickedEvent=(email, paid) => {
    let changeObj = {
      paidChange:paid,
      paidChangeEmail:email
    }

    this.changePayment.push(changeObj)
    console.log(this.changePayment)
  }

  removeMember = (email) =>{
    if(!this.membersToremove.includes(email)){
      this.membersToremove.push(email)
      this.removeMemberEl.nativeElement.innerHTML = '';
    console.log(this.membersToremove)
    }else{
      this.toastr.error('member already added to removal list')
    }
  }

}
