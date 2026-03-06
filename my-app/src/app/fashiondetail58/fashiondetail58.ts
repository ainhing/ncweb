import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ex58 } from '@app/myservice/ex58';


@Component({
  selector: 'app-fashiondetail58',
  standalone: false,
  templateUrl: './fashiondetail58.html',
  styleUrl: './fashiondetail58.css',
})
export class Fashiondetail58 {
  fashion: any;
  errMessage = '';

  constructor(
    private _service: Ex58,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    activeRouter.paramMap.subscribe((params) => {
      let fashionId = params.get('id');
      if (fashionId != null) {
        this._service.searchFashion(fashionId).subscribe({
          next: (data) => {
            this.fashion = data;
          },
          error: (err) => {
            this.errMessage = err;
          },
        });
      }
    });
  }

  get_image(base64: string) {
    if (!base64) return '';
    const prefix = 'data:image/jpeg;base64,';
    return base64.startsWith(prefix) ? base64 : prefix + base64;
  }

  back() {
    this.router.navigate(['/']);
  }

}
