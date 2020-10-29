import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private _router:Router) { }
  helpchecked=false
  ngOnInit(): void {
    var helpRread=localStorage.getItem("Help-Version-1")
    if (helpRread=="0" ) {
      this.helpchecked=true
    }
  }
  Back(){
    this._router.navigate(["/"])
  } 
  readHelpPage(){
    localStorage.setItem("Help-Version-1",'0');
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
    this.Back()
  }
}
