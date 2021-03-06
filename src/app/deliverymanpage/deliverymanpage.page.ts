import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Globals } from '../globals';
@Component({
  selector: 'app-deliverymanpage',
  templateUrl: './deliverymanpage.page.html',
  styleUrls: ['./deliverymanpage.page.scss'],
})
export class DeliverymanpagePage implements OnInit {
  private loading: any;  
  OrderAssignedlist: any;
  shownorecord:boolean = false;
  deliverymanid:any;//="60ce02ed49af6759f0bb6996";  
  backButtonSubscription:any;
  constructor(private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform,
    public globals: Globals,
    private deliverymanservice: RestApiService) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999,async () => {
      // Catches the active view
      const activeView = this.router.url;  
      const urlParts = activeView.split('/');              
      // Checks if can go back before show up the alert
      if(urlParts.includes('home')) {        
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
    this.deliverymanid = this.globals.customerid;
    this.presentLoading();
    this.deliverymanservice.getOrderByDeliveryManData(this.deliverymanid).subscribe(
      (res) => {
        console.log(res);
        setTimeout(() => { this.loading.dismiss();}, 2000);
        this.OrderAssignedlist = res;
        if(this.OrderAssignedlist.length > 0)
        {
          this.shownorecord = true;
        } 
        else{
          this.shownorecord = false;
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
