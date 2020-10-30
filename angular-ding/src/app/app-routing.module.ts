import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { WebPlatformComponent } from './web-platform/web-platform.component';
import { HomeComponent } from './Home/Home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpComponent } from './help/help.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path:'WebPlatform',component:WebPlatformComponent},
  {path:'chat-room',component:ChatRoomComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'',component:HomeComponent},
  {path:'help',component:HelpComponent},
  {path:'settings',component:SettingsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
