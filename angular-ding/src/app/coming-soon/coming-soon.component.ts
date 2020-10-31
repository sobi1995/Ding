import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  Back() {
    this._router.navigate(["/"])
  }

}
