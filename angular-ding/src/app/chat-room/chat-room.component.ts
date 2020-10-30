import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ResizedEvent } from 'angular-resize-event';
import { PushNotificationsService } from 'ng-push-ivy';
import swal from 'sweetalert2';
import { timer } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  // tslint:disable-next-line:variable-name


  private _hubConnection: HubConnection;
  message = '';
  messages: any = [];
  IsPushNotifications = false;
  GroupName: '';
  UserName = '';
  Conected = true;
  ShowLoader = true;
  isTypeing = false;
  CountOnlineUsers = 0;
  constructor(
    private _pushNotifications: PushNotificationsService,
    private _router: Router) {
    var _self = this;
    this._pushNotifications.requestPermission();
    document.addEventListener('visibilitychange', function () {
      if (document.hidden)
        _self.IsPushNotifications = true;
      else
        _self.IsPushNotifications = false;
    });

    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };

  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.StartSocket();
  }

  public sendMessage(statusCode: number): void {
    if (this.message.length > 0) {
      const data = `Me : ${this.message}`;
      const message = {
        GroupName: this.GroupName,
        Status: statusCode,
        Message: this.message,
      }

      this._hubConnection.invoke('SedndMessageGroupExceptCurentUser', message);
      if (statusCode != 5 && statusCode != 8) {
        this.AddMessageToList(this.message, true);
        this.message = '';
      }
    }
  }
  // tslint:disable-next-line:typedef

  public disconect() {
    swal.fire({
      title: 'قطع مکالمه',
      text: "آیا مایل به قطع مکالمه و پیدا کردن نفر جدید هستید؟",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله'
    }).then((result) => {
      if (result.isConfirmed) {
        this.message = 'goodbye';
        this.sendMessage(6);
        this.reloadpage();
        setTimeout(() => {
          this.StartSocket();
        }, 5000);
      }
    })


  }

  public reloadpage() {
    this._hubConnection.stop();
    this.message = '';
    this.messages = [];
    this.GroupName = '';
    this.UserName = '';
    this.Conected = true;
    this.ShowLoader = true;
    this.isTypeing = false;
  }

  Login(): void {
    const data = this.UserName;
    this.Conected = true;
    this.ShowLoader = true;
    this.StartSocket();
  }
  public AddMessageToList(msg, type) {
  var now = new Date();
  this.messages.push({ message: msg, type: type,time:this.getTime(now) });
  }

  // tslint:disable-next-line:typedef
  StartSocket() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://siteinjast.ir/chathub')
      .build();

    this._hubConnection.on('ReceiveMessage', (data: any) => {
      if (data.status === 4) {
        this.ShowLoader = false;
        this.GroupName = data.groupName;
        var audio = new Audio('../assets/Song/Ding1.mp3');
        audio.play();
      }
      else if (data.status === 1) {
        const received = `Received: ${data}`;
        this.messages.push({ message: data.message, type: false, time:data.persianDate });
        if (this.IsPushNotifications == true)
          this.notify(data.message)
      }
      else if (data.status === 5) {
        this.isTypeing = true
        setTimeout(() => { this.isTypeing = false }, 3000);
      }
      else if (data.status === 6) {
        this.reloadpage()
        setTimeout(() => { this.StartSocket() }, 3000);
      } else if (data.status === 7) {
        this.CountOnlineUsers = data.msg
      } else if (data.status === 8) {
        var audio = new Audio('../assets/Song/Ding1.mp3');
        audio.play();
      }
    });

    this._hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
      })
      .catch((err) => {
        console.log('Error while establishing connection');
      });
  }
  public scrollToBottom() {
    const myDiv = document.querySelector('#scroll');
    myDiv.scrollIntoView();
  }

  onResized(event: ResizedEvent) {
    this.scrollToBottom();
  }

  notify(body) { //our function to be called on click
    let options = { //set options
      body: body,
      icon: "./assets/favicon.png" //adding an icon
    }
    this._pushNotifications.create('Iron Man', options).subscribe( //creates a notification
      res => console.log(res),
      err => console.log(err)
    );
  }
  Back() {
    swal.fire({
      title: 'بازگشت  ',
      text: "آیا مایل به بازگشت هستید",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله'
    }).then((result) => {
      if (result.isConfirmed) {
        this._hubConnection.stop();
        this._router.navigate(["/"])
      }
    })


  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.Back();
   
  }


getTime(datetime){
    var strDateTime = [
        [[this.AddZero(datetime.getHours()), 
          this.AddZero(datetime.getMinutes())].join(":"),
          this.AddZero(datetime.getSeconds())] .join(":"),
          datetime.getHours() >= 12 ? "PM" : "AM"].join(" ");
        return strDateTime;
}
AddZero(num) {
  return (num >= 0 && num < 10) ? "0" + num : num + "";
}


}
