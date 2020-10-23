import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { WebPlatformComponent } from './web-platform/web-platform.component';
import { AngularResizedEventModule } from 'angular-resize-event';
 
@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    WebPlatformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularResizedEventModule,
    FormsModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
