import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { TranslateConfigService } from '../translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { RestApiService } from '../rest-api.service';
import { Globals } from '../globals';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
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
  selectedLanguage:string;
  languageselect:any;
  logindetails:any;
  deliveryman:boolean = false;
  public appPages : Array<any> = [];
  /*******For Lang support********* */
  
  logintitle:any;
  new_user:any;
  register:any;
  language:any;

  constructor( private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform,
    private translateconfigService: TranslateConfigService,
    private _translate: TranslateService,    
    private loginservice: RestApiService,
    public globals: Globals,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,    
    private androidPermissions: AndroidPermissions
    ) {

      this.selectedLanguage = this.translateconfigService.getDefaultLanguage();
      this.languageselect = this.selectedLanguage;
      this._initialiseTranslation()
     }

  ngOnInit() {
  }
 ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  ionViewWillEnter() { 
    this.menu.enable(false);
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999,async () => {
      //this.router.navigate(['/login']);
      // Catches the active view
      const activeView = this.router.url;  
      const urlParts = activeView.split('/');              
      // Checks if can go back before show up the alert
      if(urlParts.includes('login')) {        
              const alert = await  this.alertController.create({
                  header: 'Logout Alert',
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
    this.translateconfigService.getDefaultLanguage();
    this.checkPermission();
   }
  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
  _initialiseTranslation(): void {
    this._translate.get('LOGIN.head').subscribe((res: string) => {
      this.logintitle = res;
    });
     this._translate.get('LOGIN.newuser').subscribe((res: string) => {
      this.new_user = res;
    });
    this._translate.get('LOGIN.register').subscribe((res: string) => {
      this.register = res;
    });
    this._translate.get('LOGIN.language').subscribe((res: string) => {
      this.language = res;
    });
   /* this._translate.get('TITLE_2', { value: 'John' }).subscribe((res: string) => {
      this.title_2 = res;
    });
    this._translate.get('data.name', { name_value: 'Marissa Mayer' }).subscribe((res: string) => {
      this.name = res;
    });
 */
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
            //this.presentAlert("Please enter valid Email")
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
      //console.log(newpass + confirmpass)
      if (newpass !== confirmpass) {
       // this.presentAlert("Please check new password and confirm password match")
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
  gotologin(){
    this.showregisterblock = false;
    this.showloginblock= true;
  }
  newregister(){
    let validemail = this.validateemail();
    let validpassword = this.matchpassword(this.newpassword,this.confirmpassword);
    if(this.newmobilenumber) 
    {      
      if(this.newmobilenumber.toString().length == 10)
      { 
        if(validemail)
        {
           if(validpassword)
           {
            this.presentLoading();
            this.loginservice.CheckMobileExistsData(this.newmobilenumber).subscribe(
              (res) => {
                //console.log(res); 
                
                if (res.length != 0) {
                  setTimeout(() => {this.loading.dismiss(); }, 2000);
                  //console.log("Mobile No. Already Exist");
                  this.presentAlert("Mobile No. Already Exist");
                }
                else
                {
                  this.loginservice.setNewCustomerData(this.newmobilenumber,this.newpassword,this.email).subscribe(
                    (res) => {
                      //console.log(res);
                      setTimeout(() => {this.loading.dismiss(); }, 2000);
                      if (res != "") {
                        this.logindetails = res;
                        console.log(this.logindetails)
                        this.router.navigate(['/home']);
                      }
                    },
                    (err) => {
                      console.log(err);
                      setTimeout(() => {this.loading.dismiss();}, 2000);
                      this.presentAlert(err);
                    }
                  );
                }
              },
              (err) => {
                console.log(err);
                setTimeout(() => {this.loading.dismiss();}, 2000);
                this.presentAlert(err);
              }
            );
            //this.showregisterblock = false;
            //this.showloginblock= true;
            //this.presentAlert("Please enter mobile no and password to login...")
           }
           else
           this.presentAlert("Please check new password and confirm password match")
        }
        else
        this.presentAlert("Please enter valid Email")
      }
      else{
        this.presentAlert("Please Enter Valid 10 digit Mobile Number")
      }
      
    }
    else{
      this.presentAlert("Please enter all the fields...")
    }
  }
  login() {
    if(this.mobilenumber && this.password)
    {
      if(this.mobilenumber.toString().length == 10)
      {
        console.log(this.deliveryman)
        if(this.deliveryman == true)
        {
          console.log("delivery man service" )
          this.presentLoading();
          this.loginservice.getDeliveryManLoginData(this.mobilenumber,this.password).subscribe(
            (res) => {
             // console.log(res);
              setTimeout(() => {
                this.loading.dismiss();
              }, 1000);
              if (res.length != 0) {
                this.logindetails = res[0];                
                this.globals.logininfo=res[0];                
                this.globals.loginname = this.logindetails.name;
                this.globals.loginmobile = this.logindetails.mobile;
                this.globals.loginemail = this.logindetails.email;
                this.globals.customerid= this.logindetails._id;
                this.router.navigate(['/deliverymanpage']);
                this.appPages = [                 
                  { title: 'Delivery Man', url: '/deliverymanpage', icon: 'home' },   
                  { title: 'Logout', url: '/login', icon: 'log-out' }
                ];
                this.globals.publishAppPages(this.appPages);
              }
              else
              this.presentAlert("Invalid Delivery Man Login.");
            },
            (err) => {
              console.log(err);
              setTimeout(() => {
                this.loading.dismiss();
              }, 2000);
              this.presentAlert(err);
            }
          ); 
        }
       else{

        this.presentLoading();
          this.loginservice.getCustomerLoginData(this.mobilenumber,this.password).subscribe(
            (res) => {
             // console.log(res);
              setTimeout(() => {
                this.loading.dismiss();
              }, 1000);
              if (res.length != 0) {
                this.logindetails = res[0];                
                this.globals.logininfo=res[0];                
                this.globals.loginname = this.logindetails.name;
                this.globals.loginmobile = this.logindetails.mobile;
                this.globals.loginemail = this.logindetails.email;
                this.globals.customerid= this.logindetails._id;
                this.router.navigate(['/home']);
                this.appPages = [
                  { title: 'Home', url: '/home', icon: 'home' },    
                  { title: 'My Profile', url: '/myprofile', icon: 'person' },
                  { title: 'My Addresses', url: '/addresspage', icon: 'mail' },
                  { title: 'My Orders', url: '/myorders', icon: 'basket' },
                  { title: 'Logout', url: '/login', icon: 'log-out' }
                ];
                this.globals.publishAppPages(this.appPages);
              }
              else
              this.presentAlert("Invalid User.");
            },
            (err) => {
              console.log(err);
              setTimeout(() => {
                this.loading.dismiss();
              }, 2000);
              this.presentAlert(err);
            }
          ); 
        }
        
      }
      else{
        this.presentAlert("Please Enter Valid 10 digit Mobile Number")
      }
    }
    else{
      this.presentAlert("Please Enter Valid 10 digit Mobile Number and Password")
    }
    
  }
  languageChange(){
    this.translateconfigService.setLanguage(this.languageselect);
    this._initialiseTranslation();
  }
  checkPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.enableGPS();
        } else {
          this.locationAccPermission();
        }
      },
      error => {
        alert(error);
      }
    );
  }

  locationAccPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              this.enableGPS();
            },
            error => {
              alert(error)
            }
          );
      }
    });
  }

  enableGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        this.currentLocPosition()
      },
      error => alert(JSON.stringify(error))
    );
  }

  currentLocPosition() {
    this.geolocation.getCurrentPosition().then((response) => {
     
    }).catch((error) => {
      alert('Error: ' + error);
    });
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
