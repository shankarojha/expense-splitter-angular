import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userEmail = 'shankarojha34@gmail.com'

  constructor() { }

  ngOnInit(): void {
  }

}
