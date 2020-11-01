import * as  interfaces  from './INotificationServices';
import * as Settings  from '../SettingService/ISiteSettings';
import * as model  from '../SettingService/SiteSettings';
import { PushNotificationsService } from 'ng-push-ivy';

export class item implements interfaces.INotificationServices{
    public constructor(private _pushNotifications: PushNotificationsService){
        this.Setting=new model.item()
        this._pushNotifications.requestPermission();
    }


    

    public Setting:Settings.ISettings;
    Notification(Message) { //our function to be called on click
        let options = { //set options
          body: Message,
          icon: "./assets/favicon.png" //adding an icon
        }
        this._pushNotifications.create('Iron Man', options).subscribe( //creates a notification
          res => console.log(res),
          err => console.log(err)
        );
      }
    
}

  