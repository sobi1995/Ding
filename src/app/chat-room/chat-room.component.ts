import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { timer } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  private _hubConnection: HubConnection;
  message = '';
  messages: string[] = [];

  title = ' SignarlR';

  ngOnInit() {
    this._hubConnection = new HubConnectionBuilder().withUrl('https://localhost:44300/chathub')
                            .build();

    this._hubConnection.on('ReceiveMessage', (data: any) => {
        const received = `Received: ${data}`;
        this.messages.push(received);
    });

    this._hubConnection.start()
        .then(() => {
            console.log('Hub connection started');
        })
        .catch(err => {
            console.log('Error while establishing connection');
        });
  }

  public sendMessage(): void {
    const data = `SendMessage: ${this.message}`;

    this._hubConnection.invoke('SendMessage', data);
    this.messages.push(data);
  }
  scroll(){
    let myDiv = document.querySelector("#scroll")
    myDiv.scrollIntoView()
  }

  UserName='';
  Conected=false;
  ShowLoader=false
  Login():void{
    const data = this.UserName
      this.Conected=true
      this.ShowLoader=true
  }
}
