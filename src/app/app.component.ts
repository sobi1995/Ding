import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
}
