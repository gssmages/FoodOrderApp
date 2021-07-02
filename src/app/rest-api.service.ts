import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Globals } from './globals';

const ProductlistURL="http://localhost:3001/Products";
const CustomerAddressURL="http://localhost:3001/customeraddress/custid/";
const SaveCustomerAddressURL="http://localhost:3001/customeraddress/";
const CustomerLoginURL="http://localhost:3001/customers/login";
const CheckMobileURL="http://localhost:3001/customers/checkmobile";
const RegisterCustomerURL="http://localhost:3001/customers";
const AdminURL="http://localhost:3001/admin";
const OrdersURL="http://localhost:3001/orders";
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  today= new Date();
  errormsg ='';

  constructor(private http: HttpClient,
    public globals: Globals,) { }

  private handleError(error: HttpErrorResponse) {
  
    if (!navigator.onLine) {
      console.error('No Internet Connection')
      this.errormsg = 'No Internet Connection';
  }
    else if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code. 'Network failed. Please try again.'
      // The response body may contain clues as to what went wrong,
      this.errormsg = `Server Error Status: ${error.status} Text: ${error.statusText}`
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(this.errormsg);
  }
  getProductlistData(): Observable<any>{
    let params = new HttpParams()
    // .set('MobileNumber', mobilenumber)
     //.set('Resend', resend);
  return this.http.get(ProductlistURL,{params}).pipe(catchError(this.handleError));
  }
  getCustomerAddressData(custid:string): Observable<any>{
    let params = new HttpParams()
  return this.http.get(CustomerAddressURL+custid,{params}).pipe(catchError(this.handleError));
  }
  getCustomerLoginData(mobile:string,password:string): Observable<any>{
    //let params = new HttpParams()
    const body = {
      "mobile":mobile,
      "password": password
  };
  return this.http.post(CustomerLoginURL,body).pipe(catchError(this.handleError));
  }
  CheckMobileExistsData(mobile:string,): Observable<any>{
    //let params = new HttpParams()
    const body = {
      "mobile":mobile
  };
  return this.http.post(CheckMobileURL,body).pipe(catchError(this.handleError));
  }
  setNewCustomerData(mobile:string,password:string,email:string): Observable<any>{
   // let params = new HttpParams()
    const body = {
      "mobile":mobile,
      "password": password,
      "name": mobile,      
      "email": email
  };
  return this.http.post(RegisterCustomerURL,body).pipe(catchError(this.handleError));
  }
  getAdminData(): Observable<any>{
    let params = new HttpParams()
   // const body = { title: 'Angular POST Request Example' };
  return this.http.get(AdminURL,{params}).pipe(catchError(this.handleError));
  }
  setCustomerAddressData(custid:string,doorno:string,address1:string,address2:string,area:string,location:string,geolatlang:string): Observable<any>{
    // let params = new HttpParams()
     const body = {
       "custid":custid,
       "location": location,
       "doorno": doorno,      
       "address1": address1,
       "address2": address2,
       "area": area,      
       "geolatlang": geolatlang
   };
   return this.http.post(SaveCustomerAddressURL,body).pipe(catchError(this.handleError));
   }
   SaveOrdersData(): Observable<any>{
    // let params = new HttpParams()
     const body = this.globals.Orderdetails;
   return this.http.post(OrdersURL,body).pipe(catchError(this.handleError));
   }
}
