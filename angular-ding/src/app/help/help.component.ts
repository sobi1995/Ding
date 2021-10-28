import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  api : any =environment.api;
  constructor(private _router:Router) { 
    // history.pushState(null, null, location.href);
    // window.onpopstate = function () {
    //     history.go(1);
    // };
  }
  helpchecked=false
  ngOnInit(): void {
    var helpRread=localStorage.getItem("Help-Version-1")
    if (helpRread) {
      this.helpchecked=true
    }
  }
  Back(){
    this._router.navigate(["/"])
  } 
  readHelpPage(){
    localStorage.setItem("Help-Version-1",'0');
    this.Back()
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if(this.helpchecked){
      this.Back();
    }
  }
}
