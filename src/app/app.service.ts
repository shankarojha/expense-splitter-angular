import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'http://localhost:3000'

  constructor(private http:HttpClient, public router: Router) { }

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
}
