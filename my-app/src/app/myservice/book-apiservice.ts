import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';
import { throwError } from 'rxjs/internal/observable/throwError';
import { IBook } from '@app/classes/ibook';



@Injectable({
  providedIn: 'root',
})
export class BookAPIService {
  constructor(private _http: HttpClient) { }
  getBooks():Observable<any> {
     const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8") 
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
  }
   return this._http.get<any>("http://localhost:3000/books",requestOptions).pipe( 
        map(res=>JSON.parse(res) as Array<IBook>), 
        retry(3), 
        catchError(this.handleError)) 
  }
  handleError(error:HttpErrorResponse){ 
    return throwError(()=>new Error(error.message)) 
  } 
  getBook(bookId:string):Observable<any> 
  { 
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8") 
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
    } 
    return this._http.get<any>("http://localhost:3000/books/"+bookId,requestOptions).pipe( 
        map(res=>JSON.parse(res) as IBook), 
        retry(3), 
        catchError(this.handleError)) 
  }
  postBook(aBook:any):Observable<any> 
  { 
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
    } 
    return this._http.post<any>("http://localhost:3000/books",JSON.stringify(aBook),requestOptions).pipe( 
      map(res=>JSON.parse(res) as Array<IBook>), 
      retry(3), 
      catchError(this.handleError)) 
    }
    deleteBook(bookId: string) {
            const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
            const requestOptions:Object={ 
              headers:headers, 
              responseType:"text" 
            } 
            return this._http.delete<any>("http://localhost:3000/books/" + bookId,requestOptions);
          }
    putBook(bookId: string, aBook: any) {
      const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
      const requestOptions:Object={ 
        headers:headers, 
        responseType:"text" 
      } 
      return this._http.put<any>("http://localhost:3000/books/" + bookId, JSON.stringify(aBook),requestOptions).pipe( 
        map(res=>JSON.parse(res) as IBook), 
        retry(3), 
        catchError(this.handleError)) 
}
 
}
