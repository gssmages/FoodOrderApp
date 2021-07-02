import { Component } from '@angular/core';
import { Globals } from './globals';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loginname:any;
  loginmobile:any;
  loginemail:any;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },    
    { title: 'Delivery Man', url: '/deliverymanpage', icon: 'home' },    
    { title: 'My Profile', url: '/myprofile', icon: 'person' },
    { title: 'My Addresses', url: '/addresspage', icon: 'mail' },
    { title: 'My Orders', url: '/myorders', icon: 'basket' },
    { title: 'Logout', url: '/login', icon: 'log-out' }
  ];
 /*  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders']; */
  constructor(public globals: Globals) {


  }
}
