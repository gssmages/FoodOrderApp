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
declare var google:any;
@Component({
  selector: 'app-viewmap',
  templateUrl: './viewmap.page.html',
  styleUrls: ['./viewmap.page.scss'],
})
export class ViewmapPage implements OnInit {
  map: GoogleMap;
  constructor() { }

  ngOnInit() {
    this.loadMap();
  }
  ionViewDidLoad() {
    
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
          lat: 13.084619,
          lng: 80.217144
         },
         zoom: 18,
         //tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Magesh Babu S, 23, Thiruvannamalai Road 2nd Cross, Chennai.',
      icon: 'green',
      animation: 'DROP',
      position: {
        lat: 13.084619,
        lng: 80.217144
      }
    });
    marker.showInfoWindow();
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //alert('clicked');
    });
  }
}
