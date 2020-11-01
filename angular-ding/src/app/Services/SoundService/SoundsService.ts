import * as  interfaces  from './ISoundsService';
import * as Settings  from '../SettingService/ISiteSettings';
import * as model  from '../SettingService/SiteSettings';

export class item implements interfaces.ISoundService{
    public constructor(){
        this.Setting=new model.item()
    }
    public Setting:Settings.ISettings;
  
    PlayDing1() {
        if(this.Setting.UsabilitySounds){
            var audio = new Audio('../assets/Song/Ding1.mp3');
            audio.play();
        }
    }

    PlayDing2() {
        if(this.Setting.UsabilitySounds){
            var audio = new Audio('../assets/Song/Ding2.mp3');
            audio.play();    
        }
    }
}

  