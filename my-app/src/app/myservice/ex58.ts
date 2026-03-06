import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fashion } from '@app/fashion/fashion';
import { catchError, map, retry, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Ex58 {
   constructor(private _http: HttpClient) { }   
  getFashions():Observable<any> 
  { 
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8") 
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
    } 
    return this._http.get<any>("http://localhost:4000/fashions",requestOptions).pipe( 
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
      return this._http.get<any>(`http://localhost:4000/fashions/${_id}`,requestOptions).pipe( 
          map(res=>JSON.parse(res) as Fashion), 
          retry(3), 
          catchError(this.handleError)) 
    }
  postFashion(aFashion:any):Observable<any> 
  { 
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8") 
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
    } 
    return this._http.post<any>("http://localhost:4000/fashions",JSON.stringify(aFashion),requestOptions).pipe( 
        map(res=>JSON.parse(res) as Fashion), 
        retry(3), 
        catchError(this.handleError)) 
  }
  putFashion(aFashion: any): Observable<any> 
  { 
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8") 
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
    } 
    return this._http.put<any>("http://localhost:4000/fashions",JSON.stringify(aFashion),requestOptions).pipe( 
        map(res=>JSON.parse(res) as Fashion), 
        retry(3), 
        catchError(this.handleError)) 
  }
  deleteFashion(_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.delete<any>(`http://localhost:4000/fashions/${_id}`,requestOptions).pipe(
        map(res=>JSON.parse(res) as Fashion),
        retry(3),
        catchError(this.handleError))
  }
  getFashionsByStyle(_style:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>(`http://localhost:4000/fashions/style/${_style}`,requestOptions).pipe(
        map(res=>JSON.parse(res) as Fashion),
        retry(3),
        catchError(this.handleError))
  }
}
