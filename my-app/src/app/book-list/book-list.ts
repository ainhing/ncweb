import { Component } from '@angular/core';
import { Book } from '@app/classes/ibook';
import { BookAPIService } from '@app/myservice/book-apiservice';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  books: Book[] = []
  errMessage: string = ''

  constructor(private _service: BookAPIService) {
    this.loadBooks()
  }

  loadBooks() {
    this._service.getBooks().subscribe({
      next: (data) => { this.books = data },
      error: (err)  => { this.errMessage = err }
    })
  }

  deleteBook(bookId: string) {
    if (!confirm("Bạn có chắc muốn xóa sách này không?")) return
    this._service.deleteBook(bookId).subscribe({
      next: (data) => { this.books = data },
      error: (err)  => { this.errMessage = err }
    })
  }
}
