import * as  interfaces  from './ISiteSettings';
import swal from 'sweetalert2';

export class item implements interfaces.ISettings{
    public constructor(){


        var UsabilityNotification=localStorage.getItem("UsabilityNotification")
        if (UsabilityNotification == null) {
            this.UsabilityNotification=true;
        }else {
            this.UsabilityNotification = UsabilityNotification=="true";
        }

        var UsabilitySounds=localStorage.getItem("UsabilitySounds")
        if (UsabilitySounds == null) {
            this.UsabilitySounds=true;
        }else {
            this.UsabilitySounds = UsabilitySounds=="true";
        }
    }
    UsabilityNotification: boolean;
    UsabilitySounds: boolean;
    
    SaveChange() {
        localStorage.setItem("UsabilityNotification",String(this.UsabilityNotification));
        localStorage.setItem("UsabilitySounds",String(this.UsabilitySounds));
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'تنظیمات ذخیره شد :)',
            showConfirmButton: true,
            confirmButtonText: "باشه",
        })
    }
}

  