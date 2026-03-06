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

  constructor(private http: HttpClient) {}

  // Gọi POST /login, server sẽ tự set cookie nếu thành công
  login(user: string, password: string): Observable<any> {
    const body = { user, password };
    return this.http
      .post<any>(`${this.apiUrl}/login`, body, {
        withCredentials: true, // Bắt buộc để browser nhận & gửi cookie từ server
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Đọc cookie đã lưu (user + password) để tự điền vào form
  getSavedCredentials(): { user: string; password: string } {
    const user = this.getCookie('user');
    const password = this.getCookie('password');
    return { user, password };
  }

  // Xóa cookie khi logout (gọi API clear-cookie phía server)
  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clear-cookie`, {
      withCredentials: true,
      responseType: 'text',
    });
  }

  // Đọc cookie theo tên (browser-side)
  private getCookie(name: string): string {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : '';
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
}

