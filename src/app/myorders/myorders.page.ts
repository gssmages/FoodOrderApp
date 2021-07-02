import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Globals } from '../globals';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {

  private loading: any;  

  constructor(private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform,public globals: Globals,) { }

  ngOnInit() {
  }
  gotodetailpage()
  {
    this.globals.neworder=false;
     
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
