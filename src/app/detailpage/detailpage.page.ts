import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Globals } from '../globals';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { formatDate } from '@angular/common';
import { RestApiService } from '../rest-api.service';
@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.page.html',
  styleUrls: ['./detailpage.page.scss'],
})
export class DetailpagePage implements OnInit {
  
  private loading: any;  
  orderdetails:any={};  
  selectedproduct:any[]=[];
  selectedaddress:any[]=[];

  loginname:any;
  loginmobile:any;
  doorno:any;
  address1:any;
  address2:any;
  area:any;
  location:any;
  geolatlang:any;
  totalamt:any=0.0;
  totalqty:any=0;
  constructor(
    private router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private platform: Platform,
    public globals: Globals,
    private geolocation: Geolocation,    
    private detailpageservice: RestApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
   /*  this.platform.backButton.subscribe(async () => {
       // Catches the active view
       this.router.navigate(['/home']);
     }); */
     
     if(this.globals.neworder==true)
     {
      console.log("from Homepage");
     this.selectedproduct = this.globals.selectedproduct;
     this.selectedaddress = this.globals.selectedaddress;
     this.loginname= this.globals.loginname;
     this.loginmobile=this.globals.loginmobile;
     this.doorno=this.selectedaddress[0].doorno;
      this.address1=this.selectedaddress[0].address1;
      this.address2=this.selectedaddress[0].address2;
      this.area=this.selectedaddress[0].area;
      this.location=this.selectedaddress[0].location;
      this.geolatlang=this.selectedaddress[0].geolatlang;
      
     //console.log( this.selectedproduct)

     for(let i=0; i<this.selectedproduct.length; i++){
     var total = parseFloat(this.selectedproduct[i].Qty) * parseFloat(this.selectedproduct[i].Price)
     this.selectedproduct[i].total = total ;
     this.totalamt += total; 
     this.totalqty += this.selectedproduct[i].Qty;
      }
     // console.log( this.selectedproduct)
      //console.log( this.totalamt)
       
//console.log(this.orderdetails)
        
        this.orderdetails.orderid = formatDate(Date.now(),'yyyyMMdd_hhmmss','en-US');
        this.orderdetails.custid= this.globals.customerid;
        this.orderdetails.deliverymanid="";
        this.orderdetails.status="InProgress";
        this.orderdetails.Products=this.selectedproduct;
        this.orderdetails.address=this.selectedaddress;
        this.orderdetails.totalqty = this.totalqty;
        this.orderdetails.customername = this.globals.loginname;
        this.globals.Orderdetails = this.orderdetails;
       // console.log(this.orderdetails) 
     }
     else
     {
      console.log("Order id come from other page");
      console.log(this.globals.Orderdetails)
      this.orderdetails = this.globals.Orderdetails;

      this.selectedproduct = this.orderdetails.Products;
      this.selectedaddress = this.orderdetails.address;
      this.loginname= this.globals.loginname;
      this.loginmobile=this.globals.loginmobile;
      this.doorno=this.selectedaddress[0].doorno;
       this.address1=this.selectedaddress[0].address1;
       this.address2=this.selectedaddress[0].address2;
       this.area=this.selectedaddress[0].area;
       this.location=this.selectedaddress[0].location;
       this.geolatlang=this.selectedaddress[0].geolatlang;

       for(let i=0; i<this.selectedproduct.length; i++){
        var total = parseFloat(this.selectedproduct[i].Qty) * parseFloat(this.selectedproduct[i].Price)
        this.selectedproduct[i].total = total ;
        this.totalamt += total; 
        this.totalqty += this.selectedproduct[i].Qty;
         }

      
     }
  }
 
  placeorder()
  {
    this.router.navigate(['/detailpage']);
  }

  confirmorder()
  {    
    this.presentLoading();
    this.detailpageservice.SaveOrdersData().subscribe(
      (res) => {
        //console.log(res);
        setTimeout(() => { this.loading.dismiss();}, 2000);
        if (res != '') {
          this.presentAlert("Your Order Placed Succesfully"); 
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        console.log(err);
        setTimeout(() => {this.loading.dismiss(); }, 2000);
        this.presentAlert(err);
      }
    );
  }
  viewmap()
  {
    this.router.navigate(['/viewmap']);
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
