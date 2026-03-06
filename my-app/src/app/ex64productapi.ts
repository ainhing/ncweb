import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class Ex64productapi {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  // Lấy danh sách sản phẩm
  getProducts(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/products`)
      .pipe(catchError(this.handleError));
  }

  // Lấy giỏ hàng từ Session trên server
  getCart(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/cart`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/cart/add`, product, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // Cập nhật số lượng sản phẩm trong giỏ
  updateCart(id: string, quantity: number): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/cart/update`, { _id: id, quantity }, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // Xóa một sản phẩm khỏi giỏ
  removeFromCart(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/cart/remove/${id}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // Xóa toàn bộ giỏ hàng
  clearCart(): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/cart/clear`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    const errorMessage = error.error?.message || `Lỗi server: ${error.status}`;
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
