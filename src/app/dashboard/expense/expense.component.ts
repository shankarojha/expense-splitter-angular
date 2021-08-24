import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  public userName = this.Cookie.get('firstName') + ' ' + this.Cookie.get('lastName')
  public userEmail = this.Cookie.get('email')
  public expenseName: string
  public expenseId = this.Cookie.get('selectedExpense')
  public amount: number
  public members = []
  public paidBy: string
  public createdOn: Date
  public modifiedOn: Date
  public history = []
  public createdBy: string
  public changePayment = []
  public membersToremove = []
  public debtorsToAdd = []
  public addEmail: string
  public addPaid: number
  public totalDebters: number
  public removeMemberToggle: Boolean = false
  toggleClass: boolean = false;


  constructor(private route: ActivatedRoute, private appService: AppService, private router: Router, private toastr: ToastrService, private Cookie: CookieService, public SocketService: SocketService) { }

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

  getExpenseDetails = (): any => {
    this.appService.getExpenseDetails(this.Cookie.get('selectedExpense')).subscribe((apiResponse) => {
      console.log(apiResponse)

      this.expenseName = apiResponse.data.ExpenseName
      this.createdOn = apiResponse.data.createdOn
      this.createdBy = apiResponse.data.createdBy
      this.amount = apiResponse.data.amount
      this.paidBy = apiResponse.data.paidBy
      this.modifiedOn = apiResponse.data.modifiedOn
      this.totalDebters = apiResponse.data.debtors.length + 1
      for (let x of apiResponse.data.debtors) {
        let membersObj = {
          email: x.email,
          paid: x.paid,
          debt: Math.round(this.amount / this.totalDebters),
          remaining: Math.round((this.amount / this.totalDebters) - x.paid)
        }
        this.members.push(membersObj)
      }
    })
  }

  getHistory = (): any => {
    this.SocketService.getHistory().subscribe((apiResponse) => {
      for (let x of apiResponse.message) {
        this.history.push(x)
      }
      this.history = this.history.reverse()
    })
  }

  savePaymentInfo = (): any => {
    for (let x of this.changePayment) {
      let data = {
        email: x.paidChangeEmail,
        paid: x.paidChange,
        ExpenseId: this.expenseId,
        userEmail: this.Cookie.get('email')
      }
      console.log(data)
      this.appService.updatePayment(data).subscribe((apiResponse) => {
        if (apiResponse.status == 200) {
          this.toastr.success(apiResponse.message);
        } else {
          this.toastr.error(apiResponse.message);
        }
      })
    }
  }

  paidClickedEvent = (email, paid) => {
    let changeObj = {
      paidChange: paid,
      paidChangeEmail: email
    }

    this.changePayment.push(changeObj)
    console.log(this.changePayment)
  }

  removeMember = (email) => {
    if (!this.membersToremove.includes(email)) {
      this.membersToremove.push(email)
      console.log(this.membersToremove)
    } else {
      this.toastr.error('member already added to removal list')
    }
  }

  addDebtors = () => {
    const { length } = this.debtorsToAdd;
    const id = length + 1;
    let found = this.debtorsToAdd.some(el => el.email === this.addEmail);
    if (!found) {
      let findAgain = this.members.some(el => el.email === this.addEmail);
      if (!findAgain) {
        this.debtorsToAdd.push({ email: this.addEmail, paid: this.addPaid })
        this.addEmail = null;
        this.addPaid = null;
      } else {
        this.toastr.error('member already added to list. Please save to continue')
      }
    } else {
      this.toastr.error('member already added to list. Please save to continue')
    }
    console.log(this.debtorsToAdd)
  };

  editExpense = () => {

    let data = {
      userEmail: this.userName,
      ExpenseId: this.expenseId,
      amount: this.amount,
      debtors: null,
      removeMembers: null,
    }
    if (this.debtorsToAdd) {
      data.debtors = JSON.stringify(this.debtorsToAdd);
    }
    if (this.membersToremove) {
      data.removeMembers = JSON.stringify(this.membersToremove);
    }

    if (data) {
      this.appService.editExpense(data).subscribe(
        (apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success('successfully edited');
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
