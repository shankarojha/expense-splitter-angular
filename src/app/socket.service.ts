import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Observer } from 'rxjs';
import 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://api.firstpro.online'
  public socket;

  constructor(public http: HttpClient) {
    this.socket = io(this.url);
   }

   public sendNotification = (userEmail) =>{

    console.log("send-notification-called", userEmail);
    this.socket.emit('sendNotification',userEmail);
  }

  public getNotification = () =>{ 

    return new Observable((observer: Observer<any>) => {
      this.socket.on('YourNotifications',notificationData=>{
        observer.next(notificationData);

      });
    });

  }

  public sendHistory = (userEmail) =>{

    console.log("send-notification-called", userEmail);
    this.socket.emit('sendHistory',userEmail);
  }

  public getHistory = () =>{ 

    console.log("get-notification-called")
    return new Observable((observer: Observer<any>) => {
      this.socket.on('yourHistory',notificationData=>{
        observer.next(notificationData);
        console.log("notifiation recieved from the server is:",notificationData);

      });
    });

  }

  

  public exitSocket = () => {    

    console.log("exit socket called")

    this.socket.disconnect();

  } 
}
