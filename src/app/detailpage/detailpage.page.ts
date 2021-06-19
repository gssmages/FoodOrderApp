import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Globals } from '../globals';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.page.html',
  styleUrls: ['./detailpage.page.scss'],
})
export class DetailpagePage implements OnInit {
  
  private loading: any;  
  orderdetails:any;
  constructor(
    private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform,
    public globals: Globals,
    private geolocation: Geolocation) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.platform.backButton.subscribe(async () => {
       // Catches the active view
       this.router.navigate(['/home']);
     });
     
     if(this.globals.Orderdetails.id==0)
     {
        console.log("from Homepage");
        this.geolocation.getCurrentPosition().then((resp) => {
          console.log(resp.coords.latitude,resp.coords.longitude)
         }).catch((error) => {
           console.log('Error getting location', error);
         });
     }
     else
     {
      console.log("Order id come from other page");
     }
  }
 
  placeorder()
  {
    this.router.navigate(['/detailpage']);
  }

  confirmorder()
  {
    this.presentAlert("Your Order Placed Succesfully");
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
