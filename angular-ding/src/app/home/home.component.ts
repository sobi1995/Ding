import { Component, HostListener, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import * as Settings from '../Services/SettingService/ISiteSettings';
import * as Settingmodel from '../Services/SettingService/SiteSettings';

import swal from 'sweetalert2';
import { LocationStrategy } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private location: LocationStrategy,) {
    setInterval(() => {
      if (this.timerEnable) {

        this.slideIndex += this.ind;
        var x = document.getElementsByClassName("mySlides");
        if (this.slideIndex > x.length) { this.slideIndex = 1 }
        if (this.slideIndex < 1) { this.slideIndex = x.length }
      }
    }, 3000);
    this.Setting = new Settingmodel.item()

    this.disableBack();

  }
  public Setting: Settings.ISettings;

  ngOnInit(): void {
  }
  slideIndex = 1;
  ind = 1
  timerEnable = true
  slider(n) {
    this.timerEnable = false
    this.ind = n;
    this.slideIndex += n;
    var x = document.getElementsByClassName("mySlides");
    if (this.slideIndex > x.length) { this.slideIndex = 1 }
    if (this.slideIndex < 1) { this.slideIndex = x.length }
    setTimeout(() => {
      this.timerEnable = true;
    }, 3000);
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {

    // swal.fire({
    //   title: 'بازگشت  ',
    //   text: "آیا مایل به بازگشت هستید",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   cancelButtonText: 'خیر',
    //   confirmButtonText: 'بله'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     history.go(-(history.length - 1));
    //   }
    // })
    swal.fire({
      title: 'خروج!',
      text: 'برای خرج کافیست از دکمه home  گوشی را بزنید',
      imageUrl: 'https://siteinjast.ir/files/Home-Help.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "باشه",
    }).then((result) => {
      if (result.isConfirmed) {
        window.close();
      }
    })

  }
  disableBack() {
    // preventing back button in browser implemented by "Samba Siva"  
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }
}
