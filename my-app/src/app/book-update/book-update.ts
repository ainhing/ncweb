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
 book: Book = new Book();
  books: Book[] = [];
  errMessage: string = '';

  constructor(
    private _service: BookAPIService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this._service.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => (this.errMessage = err),
    });

    this.activeRouter.paramMap.subscribe((params) => {
      const bookId = params.get('id');
      if (bookId) {
        this.searchBook(bookId);
      }
    });
  }

  searchBook(bookId: string) {
    this._service.getBook(bookId).subscribe({
      next: (data) => (this.book = data),
      error: (err) => (this.errMessage = err),
    });
  }

  putBook() {
    this._service.putBook(this.book).subscribe({
      next: (data) => {
        this.books = data;
        this.router.navigate(['/books']); // optional redirect after update
      },
      error: (err) => (this.errMessage = err),
    });
  }
}
