import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ex58 } from '@app/myservice/ex58';
import { FashionApiService } from '@app/myservice/fashion-api-service';

@Component({
  selector: 'app-fashionadmin',
  standalone: false,
  templateUrl: './fashionadmin.html',
  styleUrl: './fashionadmin.css',
})
export class Fashionadmin {
  allFashions: any[] = [];
  fashions: any[] = [];
  styles: string[] = [];
  selectedStyle = '';
  searchStyle = '';
  errMessage = '';

  constructor(private _service: Ex58, private router: Router) {}

  ngOnInit(): void {
    this._service.getFashions().subscribe({
      next: (data) => {
        this.allFashions = data;
        this.fashions = data;
        // Lấy danh sách Style không trùng
        this.styles = [...new Set(data.map((f: any) => f.style))] as string[];
      },
      error: (err) => { this.errMessage = err.message; }
    });
  }

  // Nhóm fashion theo style
  getStyles(): string[] {
    return [...new Set(this.fashions.map((f: any) => f.style))] as string[];
  }

  getFashionsByStyle(style: string): any[] {
    return this.fashions.filter((f: any) => f.style === style);
  }

  // Tìm kiếm theo style
  search() {
    const keyword = this.searchStyle.trim();
    if (!keyword) {
      this.fashions = this.allFashions;
      return;
    }
    this._service.getFashionsByStyle(keyword).subscribe({
      next: (data) => { this.fashions = data; },
      error: (err) => { this.errMessage = err.message; }
    });
  }

  onStyleSelect() {
    this.searchStyle = this.selectedStyle;
    this.search();
  }

  resetSearch() {
    this.searchStyle = '';
    this.selectedStyle = '';
    this.fashions = this.allFashions;
  }

  get_image(base64: string) {
    if (!base64) return '';
    const prefix = 'data:image/jpeg;base64,';
    return base64.startsWith(prefix) ? base64 : prefix + base64;
  }

  viewDetail(id: string) {
    this.router.navigate(['/fashion-detail', id]);
  }
}
