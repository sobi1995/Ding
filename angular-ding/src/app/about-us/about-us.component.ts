import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  Back(){
    console.log('aaaa')
    this._router.navigate(["/"])
  }
}
