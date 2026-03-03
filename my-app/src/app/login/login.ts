import { Component } from '@angular/core';
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
    errMessage: string = '';

  constructor(
    private loginService: LoginApi, 
    private router: Router
  ) {}

  onSubmit(user: string, password: string) {  
    this.errMessage = '';

    this.loginService.login(user, password).subscribe({
      next: (res: any) => {
        if (res && res.success) {
          this.router.navigate(['/ex53']);
        } else {
          this.errMessage = res.message || 'Đăng nhập thất bại';
        }
      },
      error: (err) => {
        this.errMessage = err.message || 'Đăng nhập thất bại';
      }
    });
  }
}
