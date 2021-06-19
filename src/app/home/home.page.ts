import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Globals } from '../globals';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  private loading: any;  
  private currentNumber = 0;
  Productlist: any;

  constructor(private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform,    
    private homeservice: RestApiService,public globals: Globals) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.platform.backButton.subscribe(async () => {
       // Catches the active view
       this.router.navigate(['/home']);
     });

/*      this.presentLoading();
    this.homeservice.getProductlistData().subscribe(res => {     
      console.log(res)
      setTimeout(() => {
        this.loading.dismiss();
    }, 2000);    
      if (res[0].Productlist != "") {
        this.Productlist = res[0].Productlist;
        console.log(this.Productlist)
      }         
    }, err => {
      console.log(err);
      setTimeout(() => {
        this.loading.dismiss();
    }, 2000);
      this.presentAlert(err);
    }); */
  }
  increment () {
    this.currentNumber++;
  }
  
  decrement () {
    if(this.currentNumber ==0)
    this.currentNumber=0;
    else
    this.currentNumber--;
  }
  
  placeorder()
  {    
    this.globals.Orderdetails={id:0};
    this.router.navigate(['/detailpage']);
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
