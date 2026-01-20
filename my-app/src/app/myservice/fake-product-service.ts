import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFakeProduct } from '@app/classes/fakeproduct';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FakeProductService {
  private _url:string="/products" 
  constructor(private _http: HttpClient) { }   
  getFakeProductData():Observable<any> { 
    return this._http.get<Array<IFakeProduct>>(this._url).pipe( 
        retry(3), 
        catchError((err) => this.handleError(err))) 
  } 
  handleError(error:HttpErrorResponse){ 
    console.error('API Error:', error)
    return throwError(()=>new Error(error.message))
  }
}
