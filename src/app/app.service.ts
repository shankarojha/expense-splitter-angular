import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'http://localhost:3000'

  constructor(private http:HttpClient, public router: Router, private Cookie:CookieService) { }

  public getUserInfoFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('userInfo'))
  }

  public setUserInfoToLocalStorage = (data) => {
    localStorage.setItem('userInfo',JSON.stringify(data))
  }

  public signupFunction(data):Observable<any>{
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password)
    return this.http.post(`${this.url}/signup`,params);
  }

  public loginFunction(data):Observable<any>{
    const params= new HttpParams()
    .set('email',data.email)
    .set('password',data.password)
    return this.http.post(`${this.url}/login`,params) 
  }

  public forgotPassword(email):Observable<any>{
    const params = new HttpParams()
    .set('email',email)
    return this.http.post(`${this.url}/forgotpassword`,params)
  }

  public resetPassword(data):Observable<any>{
    const params = new HttpParams()
    .set('userId',data.userId)
    .set('authToken',data.authToken)
    .set('password', data.password)
    return this.http.post(`${this.url}/resetpassword?authToken=${data.authToken}`,params)
  }

  public createExpense(data):Observable<any>{
    const params = new HttpParams()
    .set('ExpenseName',data.ExpenseName)
    .set('createdBy',data.createdBy)
    .set('paidBy',data.paidBy)
    .set('debtors',data.debtors)
    .set('amount', data.amount)
    return this.http.post(`${this.url}/createexpense?authToken=${this.Cookie.get('authToken')}`,params)
  }

  public getUserExpenses():Observable<any>{
    let authToken = this.Cookie.get('authToken')
    return this.http.get(`${this.url}/getexpenseofuser/${this.Cookie.get('email')}?authToken=${authToken}`)
  }

  public getExpenseDetails(expenseId):Observable<any>{
    return this.http.get(`${this.url}/getexpense/${expenseId}?authToken=${this.Cookie.get('authToken')}`)

  }

  public logout(): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.Cookie.get('authToken'))
      .set('userId', this.Cookie.get('userId'))
    return this.http.post(`${this.url}/logout`, params);
  }

  public updatePayment(data): Observable<any> {
    const params = new HttpParams()
    .set('email',data.email)
    .set('paid',data.paid)
    .set('ExpenseId',data.ExpenseId)
    .set('userEmail',data.userEmail)
    return this.http.post(`${this.url}/updatepaymentInfo?authToken=${this.Cookie.get('authToken')}`, params)
  }

  public editExpense(data):Observable<any>{
    const params = new HttpParams()
    .set('userEmail', data.userEmail)
    .set('ExpenseId',data.ExpenseId)
    .set('debtors',data.debtors)
    .set('amount', data.amount)
    .set('removeMembers',data.removeMembers)
    return this.http.post(`${this.url}/editexpense?authToken=${this.Cookie.get('authToken')}`,params)
  }

  public deleteExpense(expenseId):Observable<any>{
    const params = new HttpParams()
    .set('ExpenseId',expenseId)
    return this.http.post(`${this.url}/deleteexpense?authToken=${this.Cookie.get('authToken')}`,params)
  }

}
