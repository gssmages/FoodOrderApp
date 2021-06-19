import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const ProductlistURL="http://192.168.225.179:3001/getProductlist";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  today= new Date();
  errormsg ='';

  constructor(private http: HttpClient) { }

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
}
