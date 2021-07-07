import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
}  from '@ionic-native/google-maps/ngx';
import { Globals } from '../globals';

declare var google:any;
@Component({
  selector: 'app-viewmap',
  templateUrl: './viewmap.page.html',
  styleUrls: ['./viewmap.page.scss'],
})
export class ViewmapPage implements OnInit {
  map: GoogleMap;
  selectedaddress:any[]=[];
  orderdetails:any={};
  loginname:any;
  loginmobile:any;
  doorno:any;
  address1:any;
  address2:any;
  area:any;
  location:any;
  geolatlang:any;
  latitude:any;
  longitude:any;
  constructor(public globals: Globals) { }

  ngOnInit() {
    console.log(this.globals.Orderdetails)
    this.orderdetails = this.globals.Orderdetails
    this.selectedaddress = this.orderdetails.address;
     this.loginname= this.globals.loginname;
     this.loginmobile=this.globals.loginmobile;
     this.doorno=this.selectedaddress[0].doorno;
      this.address1=this.selectedaddress[0].address1;
      this.address2=this.selectedaddress[0].address2;
      this.area=this.selectedaddress[0].area;
      this.location=this.selectedaddress[0].location;
      this.geolatlang=this.selectedaddress[0].geolatlang;
      var geo = this.geolatlang.split(',');
      this.latitude = geo[0]
      this.longitude = geo[1]
      console.log(this.latitude, this.longitude)
    this.loadMap();
  }
  ionViewWillEnter() {
   
  }
  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAEp4aSq9MKWM4YZVGkKiYf1fB__oVCRlk',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAEp4aSq9MKWM4YZVGkKiYf1fB__oVCRlk'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
          lat: this.latitude,
          lng: this.longitude
         },
         zoom: 18,
         //tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

     let marker: Marker = this.map.addMarkerSync({
      title:  this.loginname +'\n' + this.loginmobile +'\n' + this.doorno+', '
       + this.address1+ ', ' +this.address2 + ', '+ this.area +'\n' + this.location ,
      icon: 'green',
      animation: 'DROP',
      position: {
        lat:  this.latitude,
        lng: this.longitude
      }
    });
    marker.showInfoWindow()
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //infowindow.open(marker)
      //alert('clicked');
    }); 
  }
}
