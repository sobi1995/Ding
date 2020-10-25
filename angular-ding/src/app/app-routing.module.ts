import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { WebPlatformComponent } from './web-platform/web-platform.component';
import { HomeComponent } from './Home/Home.component';

const routes: Routes = [
  {path:'WebPlatform',component:WebPlatformComponent},
  {path:'chat-room',component:ChatRoomComponent},
  {path:'',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
