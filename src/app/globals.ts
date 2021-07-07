import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
@Injectable()
export class Globals {
  Orderdetails: any;
  displayname: string;
  logininfo:any;
  selectedproduct:any;
  selectedaddress:any;

  loginname:string;
  loginmobile:string;
  loginemail:string;
  customerid:string;

  neworder:any;
  appversion: string;

  private appPages = new Subject<any>();

  publishAppPages(data: any) {
      this.appPages.next(data);
  }

  getObservable(): Subject<any> {
    return this.appPages;
}
  /* mobilenumber: string;  geowatcher:any; */
}