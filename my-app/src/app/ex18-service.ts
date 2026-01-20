import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ICustomer, ICustomerType} from './classes/icustomer';
@Injectable({
  providedIn: 'root',
})
export class Ex18Service {
  private _url: string = "assets/dataset/customers.json";

  constructor(private _http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]> {
    return this._http.get<ICustomer[]>(this._url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError(() => new Error('Error fetching customer data'));
  }
}