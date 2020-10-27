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
import { PushNotificationsModule } from 'ng-push-ivy';
import { HomeComponent } from './Home/Home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpComponent } from './help/help.component';
// import { HomeComponent } from './home/home.component';
 
 
@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    WebPlatformComponent,
    HomeComponent,
    AboutUsComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularResizedEventModule,
    FormsModule,
    PushNotificationsModule ,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
