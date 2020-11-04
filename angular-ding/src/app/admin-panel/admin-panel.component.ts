import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private _router:Router) { }
  private _hubConnection: HubConnection;
  messages: any = [];
  CountOnlineUsers = 0;

  ngOnInit(): void {
    this.StartSocket();
  }
  StartSocket() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://siteinjast.ir/chathub')
      .build();

      this._hubConnection.on('ReceiveMessageToAdmin', (data: any) => {
        console.log(data)
      if (data.status === 1) {
        const received = `Received: ${data}`;
        this.messages.push({ message: data.msg, time:data.persianDate });
      } else if (data.status === 7) {
        this.CountOnlineUsers = data.msg
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
  Back(){
    this._router.navigate(["/"])
  } 
}
