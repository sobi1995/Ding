import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  Back(){
    this._router.navigate(["/"])
  }
}
