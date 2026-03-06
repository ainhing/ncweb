import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FashionApiService } from '@app/myservice/fashion-api-service';
import { LoginApi } from '@app/myservice/login-api';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   message = '';

  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private loginApi: LoginApi) {}

  ngOnInit(): void {
    // Đọc cookie đã lưu → tự điền vào form
    const saved = this.loginApi.getSavedCredentials();
    if (saved.user || saved.password) {
      this.loginForm.setValue({
        user: saved.user,
        password: saved.password,
      });
      this.message = 'Đã tự điền từ cookie đã lưu!';
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.message = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }

    const { user, password } = this.loginForm.value;

    this.loginApi.login(user!, password!).subscribe({
      next: (res: any) => {
        this.message = res.success
          ? 'Đăng nhập thành công! Cookie đã được lưu.'
          : 'Sai tên đăng nhập hoặc mật khẩu!';
      },
      error: (err: Error) => {
        this.message = err.message;
      },
    });
  }

  logout() {
    this.loginApi.logout().subscribe({
      next: () => {
        this.message = 'Đăng xuất thành công! Cookie đã bị xóa.';
        this.loginForm.reset();
      },
      error: (err: Error) => {
        this.message = err.message;
      },
    });
  }
}
