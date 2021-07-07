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
  name:any=this.globals.loginname;
  email:any=this.globals.loginemail;
  mobile:any=this.globals.loginmobile;
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
          }
          else
          return true;
    }   
  }
  getvalidmobileno($event) {
    //console.log(this.mobilenumber)
    if (this.mobile) {
      let value = this.mobile;
      value = value.toString();
      if (value.length > 10) {
        $event.preventDefault()
        this.mobile = parseInt(value.substring(0, 10));
      }
    }
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
    let validemail = this.validateemail();
    if(this.mobile)
    {
      if(this.mobile.toString().length == 10)
      { 
        if(validemail)
        {
          if(this.name && this.doorno && this.address1 && this.address2 && this.area && this.location  && this.geolatlang)
          {   
          this.presentLoading();
          this.addressservice.setCustomerAddressData(this.name,this.email, this.mobile,this.globals.customerid,this.doorno,
            this.address1,this.address2,this.area,this.location,this.geolatlang).subscribe(
            (res) => {
              console.log(res);
              setTimeout(() => { this.loading.dismiss();}, 2000);
              if (res != '') {
                this.presentAlert("Address Saved Succesfully !!!")
                this.clearAllFields();
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
        else
        this.presentAlert("Please enter valid Email");        
      }
      else{
        this.presentAlert("Please Enter Valid 10 digit Mobile Number")
      }
    }
    
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
  clearAllFields()
  {
    this.doorno=""
    this.address1="";
    this.address2="";
    this.area="";
    this.location="";
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
