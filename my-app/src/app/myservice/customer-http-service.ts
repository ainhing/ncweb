import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from '../classes/icustomer';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerHttpService {
  private _url: string = "assets/dataset/customer.json";

  constructor(private _http: HttpClient) { }

  get_all_customers(): Observable<ICustomer[]> {
    return this._http.get<ICustomer[]>(this._url).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('CustomerHttpService error', error);
    return throwError(() => new Error('Error fetching customer data'));
  }
  
}