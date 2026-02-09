import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@app/classes/ibook';
import { BookAPIService } from '@app/myservice/book-apiservice';

@Component({
  selector: 'app-book-update',
  standalone: false,
  templateUrl: './book-update.html',
  styleUrl: './book-update.css',
})
export class BookUpdate {
 book = new Book();
  errMessage: string = '';
  id: string = '';

  constructor(
    private _service: BookAPIService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.paramMap.subscribe((params) => {
      const bookId = params.get('id');
      if (bookId) {
        this.id = bookId;
        this._service.getBook(bookId).subscribe({
          next: (data) => { this.book = data; },
          error: (err) => { this.errMessage = err; }
        });
      }
    });
  }

  putBook() {
  this._service.putBook(this.book.BookId, this.book).subscribe({
    next: () => {
      alert("Update success");
      this.router.navigate(['ex39']);
    },
    error: (err) => this.errMessage = err
  });
}

back() {
  this.router.navigate(['ex39']);
}

}
