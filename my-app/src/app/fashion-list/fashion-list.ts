import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fashion } from '@app/fashion/fashion';
import { Ex58 } from '@app/myservice/ex58';
import { FashionApiService } from '@app/myservice/fashion-api-service';

@Component({
  selector: 'app-fashion-list',
  standalone: false,
  templateUrl: './fashion-list.html',
  styleUrl: './fashion-list.css',
})
export class FashionList {
  fashions: any[] = [];   // ← any[] thay vì Fashion[] để tránh strict check
  errMessage = '';

  constructor(private _service: FashionApiService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this._service.getFashions().subscribe({
      next: (data) => { this.fashions = data; },
      error: (err) => { this.errMessage = err.message || err; }
    });
  }

  get_image(base64: string) {
    if (!base64) return '';
    const prefix = 'data:image/jpeg;base64,';
    return base64.startsWith(prefix) ? base64 : prefix + base64;
  }

  viewDetail(id: string) { this.router.navigate(['/ex54', id]); }
  edit(id: string)       { this.router.navigate(['/ex56', id]); }
  addNew()               { this.router.navigate(['/ex55']); }

  delete(fashion: any) {
    if (!confirm(`Bạn có chắc muốn xóa "${fashion.fashion_subject}" không?`)) return;
    this._service.deleteFashion(fashion._id).subscribe({
      next: () => { this.load(); },
      error: (err) => { this.errMessage = err.message || err; }
    });
  }
}
