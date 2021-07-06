import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
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
  CustomerAddressList:any;
  custid="60dc70bb15541034d46902f9";
  deliveryto:any;
  selectedproduct:any[]=[];
  selectedaddress:any[]=[];
  constructor(
    private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform,
    private homeservice: RestApiService,
    public globals: Globals
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.platform.backButton.subscribe(async () => {
      // Catches the active view
      this.router.navigate(['/home']);
    });
    //this.globals.customerid
    this.selectedproduct=[];
    this.selectedaddress=[];
   
     if(this.globals.selectedaddress != null || this.globals.selectedaddress != undefined)
    {
      //console.log(this.globals.selectedaddress,this.globals.selectedproduct)
      for(let i = 0; i < this.CustomerAddressList.length; i++) {        
        if (this.CustomerAddressList[i]._id == this.globals.selectedaddress[0]._id) {
         // console.log(this.CustomerAddressList[i]._id,this.globals.selectedaddress[0]._id)
            this.deliveryto = this.CustomerAddressList[i]._id;
        }
      }
      for (let j= 0; j < this.Productlist.length; j++) {  
        for(let k=0;k<this.globals.selectedproduct.length;k++)      
        if (this.Productlist[j]._id == this.globals.selectedproduct[k]._id) {
          //console.log(this.CustomerAddressList[i]._id,this.globals.selectedaddress[0]._id)
            this.Productlist[j].Qty = this.globals.selectedproduct[k].Qty;
        }
      }
    }
    else
    {
      this.homeservice.getCustomerAddressData(this.globals.customerid).subscribe(
        (res) => {
         // console.log(res);       
          if (res != '') {
            this.CustomerAddressList = res; 
            for (let i = 0; i < this.CustomerAddressList.length; i++) {
              if (this.CustomerAddressList[i].default == true) {
                this.deliveryto = this.CustomerAddressList[i]._id;
              }
            }         
          }
        },
        (err) => {
          console.log(err);       
          this.presentAlert(err);
        }
      );
      this.presentLoading();
      this.homeservice.getProductlistData().subscribe(
        (res) => {
          //console.log(res);
          setTimeout(() => { this.loading.dismiss();}, 2000);
          if (res != '') {
            this.Productlist = res;
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
  }
  increment(item) {
    //console.log(item);
    //this.currentNumber++;
    for (let i = 0; i < this.Productlist.length; i++) {
      if (this.Productlist[i]._id == item._id) {
        //console.log(this.Productlist[i]._id);
        this.Productlist[i].Qty += 1;
        break;
      }
    }

    // this.Qty=this.Qty+1;
  }

  decrement(item) {
    /*  if(this.currentNumber ==0)
    this.currentNumber=0;
    else
    this.currentNumber--; */
    for (let j = 0; j < this.Productlist.length; j++) {
      if (this.Productlist[j]._id == item._id) {
        if (this.Productlist[j].Qty == 0) this.Productlist[j].Qty = 0;
        else this.Productlist[j].Qty = this.Productlist[j].Qty - 1;
      }
    }
  }

  placeorder() {
    var prodselected = false;
    if(this.deliveryto)
    {

      for (let j = 0; j < this.Productlist.length; j++) {
        if (this.Productlist[j].Qty > 0) {
          this.selectedproduct.push(this.Productlist[j])
          prodselected = true;
        }
      }
      for (let k = 0; k < this.CustomerAddressList.length; k++) {
        if (this.CustomerAddressList[k]._id == this.deliveryto) {
          this.selectedaddress.push(this.CustomerAddressList[k])
        }
      }
     // console.log(this.selectedproduct)
      //console.log(this.selectedaddress)
      if(prodselected)
      {
       // console.log(this.deliveryto)
        this.globals.selectedproduct = this.selectedproduct;
        this.globals.selectedaddress = this.selectedaddress;
        this.globals.neworder = true;
        this.router.navigate(['/detailpage']);
      }
      else
      this.presentAlert("Please Order Atleast One Product")
      
    }
    else
    this.presentAlert("Please Select Delivery Address")
    
  }
  async presentAlert(alertmessage: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: alertmessage,
      buttons: ['OK'],
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
