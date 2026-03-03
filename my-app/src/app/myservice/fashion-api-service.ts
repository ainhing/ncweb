import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fashion } from '@app/classes/Fashion';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';

@Injectable({
  providedIn: 'root',
})
export class FashionApiService {
   constructor(private _http: HttpClient) { }   
  getFashions():Observable<any> 
  { 
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8") 
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
    } 
    return this._http.get<any>("http://localhost:3002/fashions",requestOptions).pipe( 
        map(res=>JSON.parse(res) as Array<Fashion>), 
        retry(3), 
        catchError(this.handleError)) 
  } 
  handleError(error:HttpErrorResponse){ 
    return throwError(()=>new Error(error.message)) 
  }
  searchFashion(_id:string):Observable<any> 
    { 
      const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8") 
      const requestOptions:Object={ 
        headers:headers, 
        responseType:"text" 
      } 
      return this._http.get<any>(`http://localhost:3002/fashions/${_id}`,requestOptions).pipe( 
          map(res=>JSON.parse(res) as Fashion), 
          retry(3), 
          catchError(this.handleError)) 
    }
  }
