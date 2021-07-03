import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Globals } from '../globals';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  private loading: any;  
  myprofile:any;
  name:any;
  mobile:any;
  email:any;
  password:any;
  isReadonly:any= true;
  constructor(private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform,
    public globals: Globals,
    private myprofileservice: RestApiService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.presentLoading();
    this.myprofileservice.getCustomerData(this.globals.customerid).subscribe(
      (res) => {
        console.log(res);
        setTimeout(() => { this.loading.dismiss();}, 2000);
        if (res != '') {
         this.myprofile = res;
         this.name= this.myprofile.name;         
         this.email= this.myprofile.email;         
         this.mobile= this.myprofile.mobile;
         this.password= this.myprofile.password;
        }
      },
      (err) => {
        console.log(err);
        setTimeout(() => {this.loading.dismiss(); }, 2000);
        this.presentAlert(err);
      }
    );
  }
  allowEdit()
  {
    this.isReadonly = false;
  }
  editCustomer()
  {
    if(this.name && this.email && this.mobile && this.password)
    {
      this.presentLoading();
      this.myprofileservice.EditCustomerData(this.mobile,this.password,this.email,this.name,this.globals.customerid).subscribe(
        (res) => {
          console.log(res);
          setTimeout(() => {this.loading.dismiss(); }, 2000);
          if (res != "") {
           
          }
        },
        (err) => {
          console.log(err);
          setTimeout(() => {this.loading.dismiss();}, 2000);
          this.presentAlert(err);
        }
      );
    }
    else{
      this.presentAlert("Please enter all the fields...")
    }
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
