import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Globals } from '../globals';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {

  private loading: any;  
  OrderAssignedlist: any;

  constructor(
    private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform,
    public globals: Globals,
    private myordersservice: RestApiService,
    private datePipe: DatePipe) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.presentLoading();
    this.myordersservice.getDeliveryOrdersData(this.globals.customerid).subscribe(
      (res) => {
        console.log(res);
        setTimeout(() => { this.loading.dismiss();}, 2000);
        if (res != '') {
         this.OrderAssignedlist = res;
        }
      },
      (err) => {
        console.log(err);
        setTimeout(() => {this.loading.dismiss(); }, 2000);
        this.presentAlert(err);
      }
    );
  }
  gotodetailpage(item)
  {
    this.globals.neworder=false;
    this.globals.Orderdetails = item;
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
