import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion } from '@app/fashion/fashion';
import { Ex58 } from '@app/myservice/ex58';
import { FashionApiService } from '@app/myservice/fashion-api-service';

@Component({
  selector: 'app-fashion-edit',
  standalone: false,
  templateUrl: './fashion-edit.html',
  styleUrl: './fashion-edit.css',
})
export class FashionEdit {
  fashion:any;
  errMessage:string=''
  constructor(
    private _service: Ex58,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    activeRouter.paramMap.subscribe((params) => {
      let fashionId = params.get('id');
      if (fashionId != null) this.searchFashion(fashionId);
    });
  }
  searchFashion(_id: string) {
    this._service.searchFashion(_id).subscribe({
      next: (data) => { this.fashion = data; },
      error: (err) => { this.errMessage = err.message || err; }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fashion.fashion_image = reader.result!.toString();
    };
  }

  get_image(base64: string) {
    if (base64 == null) return '';
    const prefix = 'data:image/jpeg;base64,';
    if (base64.startsWith(prefix)) return base64;
    return prefix + base64;
  }

  update() {
    this._service.putFashion(this.fashion).subscribe({
      next: () => { this.router.navigate(['/ex53']); },
      error: (err) => { this.errMessage = err.message || err; }
    });
  }

  cancel() {
    this.router.navigate(['/fashion-list']);
  }
}
