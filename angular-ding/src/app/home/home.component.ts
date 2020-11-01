import { Component, HostListener, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import swal from 'sweetalert2';
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
    // history.pushState(null, null, document.title);
    // window.addEventListener('popstate', function () {
    //     history.pushState(null, null, document.title);
    // });
    
  }
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
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
 
    swal.fire({
      title: 'بازگشت  ',
      text: "آیا مایل به بازگشت هستید",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله'
    }).then((result) => {
      if (result.isConfirmed) {
        history.go(-(history.length - 1));
      }
    })


  }

}
