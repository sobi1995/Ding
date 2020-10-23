import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ResizedEvent } from 'angular-resize-event';
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

  GroupName: '';
  UserName = '';
  Conected = true;
  ShowLoader = true;
  isTypeing = false;
  CountOnlineUsers = 0;

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.StartSocket();
  }

  public sendMessage(statusCode : number): void {
   if (this.message.length >0) {
    const data = `Me : ${this.message}`;
   const message={
    GroupName : this.GroupName,
    Status:statusCode,
    Message :this.message
   }

      this._hubConnection.invoke('SedndMessageGroupExceptCurentUser', message);
      if (statusCode != 5) {
        this.AddMessageToList(this.message, true);
        this.message = '';
      }
    }
  }
  // tslint:disable-next-line:typedef

  public disconect() {
    this.message = 'goodbye';
    this.sendMessage(6);
    this.reloadpage();
    setTimeout(() => {
      this.StartSocket();
    }, 5000);
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
    this.messages.push({ message: msg, type: type });
  }

  // tslint:disable-next-line:typedef
  StartSocket() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('http://siteinjast.ir/chathub')
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
            this.messages.push({message : data.message, type : false});
          }
          else if (data.status === 5) {
            this.isTypeing=true
            setTimeout(() => { this.isTypeing=false }, 3000);
          }
          else if (data.status === 6) {
            this.reloadpage()
            setTimeout(() => { this.StartSocket()}, 3000);
          }else if (data.status === 7) {
            this.CountOnlineUsers=data.msg 
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
    console.log(document.querySelector('#content').clientHeight)
    const myDiv = document.querySelector('#scroll');
    myDiv.scrollIntoView();
  }

  onResized(event: ResizedEvent) {
this.scrollToBottom();
  }

}
