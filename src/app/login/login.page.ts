import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mobilenumber: any;
  newmobilenumber :any;
  password: any;
  newpassword : any;
  confirmpassword:any;
  email:any;
  showloginblock: boolean = true;
  showregisterblock: boolean = false;
  private loading: any;  
  backButtonSubscription:any;

  constructor( private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform) { }

  ngOnInit() {
  }
 ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  ionViewWillEnter() { this.menu.enable(false);
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999,async () => {
      this.router.navigate(['/login']);
      // Catches the active view
      const activeView = this.router.url;  
      const urlParts = activeView.split('/');              
      // Checks if can go back before show up the alert
      if(urlParts.includes('login')) {        
              const alert = await  this.alertController.create({
                  header: 'Goeasy Alert',
                  message: 'Are you sure want to close this app?',
                  buttons: [{
                      text: 'No',
                      role: 'cancel',
                      handler: () => {                       
                      }
                  },{
                      text: 'Yes',
                      handler: () => {                        
                        navigator['app'].exitApp();
                      }
                  }]
              });
              return await alert.present();
          }
    });
   }
  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
  getvalidmobileno($event) {
    //console.log(this.mobilenumber)
    if (this.mobilenumber) {
      let value = this.mobilenumber;
      value = value.toString();
      if (value.length > 10) {
        $event.preventDefault()
        this.mobilenumber = parseInt(value.substring(0, 10));
      }
    }else  if (this.newmobilenumber) {
      let value = this.newmobilenumber;
      value = value.toString();
      if (value.length > 10) {
        $event.preventDefault()
        this.newmobilenumber = parseInt(value.substring(0, 10));
      }
    }
  }
 
  getvalidpassword($event) {
    // console.log(this.optnumber)
    if (this.password.toString()) {
      let value = this.password.toString();
      if (value.length > 20) {
        $event.preventDefault()
        this.password = value.substring(0, 20);
      }
    }

  }
  validateemail()
  {
    if(this.email)
    {
          let valid:boolean; let regexp:any;
          let value = this.email;
          value = value.toString();
          regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
          valid = regexp.test(value);
          if(!valid)
          {
            this.email="";
            this.presentAlert("Please enter valid Email")
          }
          else
          return true;
    }
    
  }
  matchpassword(newpass:any,confirmpass:any)
  {
    if(this.newpassword && this.confirmpassword)
    {
      newpass = newpass.toString();
      confirmpass = confirmpass.toString();
      console.log(newpass + confirmpass)
      if (newpass !== confirmpass) {
        this.presentAlert("Please check new password and confirm password match")
        return false;
        }
        else{
         return true
        }
    }
  }
  newuser(){
    this.showregisterblock = true;
    this.showloginblock= false;
  }
  newregister(){
    let validemail = this.validateemail();
    let validpassword = this.matchpassword(this.newpassword,this.confirmpassword);
    if(this.newmobilenumber && validemail && validpassword) 
    {      
      this.showregisterblock = false;
      this.showloginblock= true;
      this.presentAlert("Please enter mobile no and password to login...")
    }
    else{
      this.presentAlert("Please enter all the fields...")
    }
  }
  login() {

    this.router.navigate(['/home']);
  }
  async presentAlert(alertmessage: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: alertmessage,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading....',
    });
    return await this.loading.present();
  }
}
