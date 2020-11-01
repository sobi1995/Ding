import { Component, OnInit } from '@angular/core';
import * as Settings  from '../Services/SettingService/ISiteSettings';
import * as model  from '../Services/SettingService/SiteSettings';
import { Router } from '@angular/router';
import { settings } from 'cluster';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private _router: Router) { 
    this.Setting=new model.item()
  }
  public Setting:Settings.ISettings;

  ngOnInit(): void {
  }
  Back() {
    this._router.navigate(["/"])
  }
  SaveSettings(){
    this.Setting.SaveChange()
    this.Back()
  }
}
