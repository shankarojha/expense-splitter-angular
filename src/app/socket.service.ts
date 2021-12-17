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

    this.socket.emit('sendHistory',userEmail);
  }

  public getHistory = () =>{ 

    return new Observable((observer: Observer<any>) => {
      this.socket.on('yourHistory',notificationData=>{
        observer.next(notificationData);

      });
    });

  }

  

  public exitSocket = () => {    


    this.socket.disconnect();

  } 
}
