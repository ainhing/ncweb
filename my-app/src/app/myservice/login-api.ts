import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/classes/user';

import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/internal/operators/map';


import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class LoginApi {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) { }

  login(user: string, password: string): Observable<any> {   // đổi username → user
    const body = { user, password };                         // gửi đúng key "user"

    return this.http.post<any>(`${this.apiUrl}/auth`, body).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Đăng nhập thất bại';

    if (error.status === 0) {
      errorMessage = 'Không kết nối được server. Backend có chạy không?';
    } else if (error.status === 401) {
      errorMessage = 'Sai tên đăng nhập hoặc mật khẩu';
    } else if (error.status === 404) {
      errorMessage = 'Sai endpoint hoặc phương thức';
    } else {
      errorMessage = error.error?.message || `Lỗi server: ${error.status}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}
