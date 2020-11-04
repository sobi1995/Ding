import * as  interfaces  from './ISiteSettings';
import swal from 'sweetalert2';

export class item implements interfaces.ISettings{
    public constructor(){

        this.UsabilityNotification= localStorage.getItem("UsabilityNotification")!= "false"
        this.UsabilitySounds= localStorage.getItem("UsabilitySounds")!= "false"
        this.PublicUsername= String(localStorage.getItem("PublicUsername"))
    }
    PublicUsername: string;
    UsabilityNotification: boolean;
    UsabilitySounds: boolean;
    
    SaveChange() {
        localStorage.setItem("UsabilityNotification",String(this.UsabilityNotification));
        localStorage.setItem("UsabilitySounds",String(this.UsabilitySounds));
        localStorage.setItem("PublicUsername",String(this.PublicUsername));
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'تنظیمات ذخیره شد :)',
            showConfirmButton: true,
            confirmButtonText: "باشه",
        })
    }
}

  