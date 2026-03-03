import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from '@app/classes/ibook';
import { BookAPIService } from '@app/myservice/book-apiservice';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail {
  book: IBook | any = {}
  errMessage: string = ''

  constructor(
    private _service: BookAPIService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    const bookId = this._route.snapshot.params['id']
    this._service.getBook(bookId).subscribe({
      next: (data) => { this.book = data },
      error: (err)  => { this.errMessage = err }
    })
  }

  goBack() {
    this._router.navigate(['/book-list'])
  }
}
