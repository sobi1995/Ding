
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
 
constructor( 
  public swUpdate: SwUpdate,
  private deviceService: DeviceDetectorService,
  private router:Router){

  if(this.swUpdate.isEnabled)
  {
    this.swUpdate.available.subscribe(()=> {
        alert("برنامه با قابلیت های جدید ابدیت شد :  )")
        window.location.reload();
    })
  }

}
  ngOnInit(): void {
  if(!this.deviceService.isMobile() ){
this.router.navigate(["/WebPlatform"])
  }
  else{
    this.router.navigate(["/chat-room"])
  }
  }

}
