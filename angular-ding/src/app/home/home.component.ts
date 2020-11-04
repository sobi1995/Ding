import { Component, HostListener, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import * as Settings  from '../Services/SettingService/ISiteSettings';
import * as Settingmodel  from '../Services/SettingService/SiteSettings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {
    setInterval(() => {
      if (this.timerEnable) {
        
      this.slideIndex+=this.ind;
      var x = document.getElementsByClassName("mySlides");
      if (this.slideIndex > x.length) {this.slideIndex = 1}
      if (this.slideIndex < 1) {this.slideIndex = x.length}
    }}, 3000);   
    this.Setting=new Settingmodel.item()
  }
  public Setting:Settings.ISettings;

  ngOnInit(): void {
  }
  slideIndex=1;
  ind=1
timerEnable=true
  slider(n) {
    this.timerEnable=false
 this.ind=n;
    this.slideIndex+=n;
    var x = document.getElementsByClassName("mySlides");
    if (this.slideIndex > x.length) {this.slideIndex = 1}
    if (this.slideIndex < 1) {this.slideIndex = x.length}
    setTimeout(() => {
      this.timerEnable=true;
    }, 3000);    
  }
 
}
