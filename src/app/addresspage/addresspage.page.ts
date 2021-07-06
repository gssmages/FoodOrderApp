import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Globals } from '../globals';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-addresspage',
  templateUrl: './addresspage.page.html',
  styleUrls: ['./addresspage.page.scss'],
})
export class AddresspagePage implements OnInit {

  private loading: any;
  doorno:any;
  address1:any;
  address2:any;
  area:any;
  location:any;
  geolatlang:any;
  isEdit:boolean = false;
  CustomerAddressList:any;
  custid="60dc70bb15541034d46902f9";
  selectedaddressid:any;
  selectedaddresscustid:any;
  constructor(private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform, 
    private addressservice: RestApiService,
    public globals: Globals,
    private geolocation: Geolocation) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
        this.geolocation.getCurrentPosition().then((resp) => {
          console.log(resp.coords.latitude,resp.coords.longitude)
        this.geolatlang= (resp.coords.latitude.toString()) + ","+ (resp.coords.longitude.toString());
         }).catch((error) => {
           console.log('Error getting location', error);
         });
         this.presentLoading();
         this.addressservice.getCustomerAddressData(this.globals.customerid).subscribe(
           (res) => {
             console.log(res);
             setTimeout(() => { this.loading.dismiss();}, 2000);
             if (res.length != 0) {
              this.isEdit = false;
              this.CustomerAddressList = res;
             }
             else
             this.isEdit = true;
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
    this.isEdit = true;
  }
  showAllAddress()
  {
    this.isEdit = false;
  }
  SaveCustomerAddress()
  {
    console.log(this.globals.customerid,this.doorno , this.address1 , this.address2 , this.area , this.location, this.geolatlang)
    if(this.doorno && this.address1 && this.address2 && this.area && this.location  && this.geolatlang)
    {
   
    this.presentLoading();
    this.addressservice.setCustomerAddressData(this.globals.customerid,this.doorno,this.address1,
      this.address2,this.area,this.location,this.geolatlang).subscribe(
      (res) => {
        console.log(res);
        setTimeout(() => { this.loading.dismiss();}, 2000);
        if (res != '') {
         // this.Productlist = res;
         // console.log(this.Productlist);
        }
      },
      (err) => {
        console.log(err);
        setTimeout(() => {this.loading.dismiss(); }, 2000);
        this.presentAlert(err);
      }
    );
  }
  else
  this.presentAlert("Enter All Fields")
  }
  setdefault(index)
  {
    for(let k=0;k<this.CustomerAddressList.length;k++)
    {
      this.CustomerAddressList[k].default= false;
      if(k==index)
      {
        this.CustomerAddressList[k].default= true;
        this.selectedaddressid= this.CustomerAddressList[k]._id;
        this.selectedaddresscustid = this.CustomerAddressList[k].custid;
      }      
    }
    
  }
  setdefaultaddress()
  {
    console.log( this.CustomerAddressList)
    if(this.CustomerAddressList != undefined )
    {   
      this.presentLoading();
      this.addressservice.SetDefaultCustomerAddressData(this.selectedaddressid,this.selectedaddresscustid).subscribe(
        (res) => {
          console.log(res);
          setTimeout(() => { this.loading.dismiss();}, 2000);
          if (res != '') {
          }
        },
        (err) => {
          console.log(err);
          setTimeout(() => {this.loading.dismiss(); }, 2000);
          this.presentAlert(err);
        }
      );
   }
   else
   this.presentAlert("Address List Empty !!")
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
