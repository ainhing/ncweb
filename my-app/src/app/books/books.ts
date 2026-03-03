import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookAPIService } from '@app/myservice/book-apiservice';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books: any;
  errMessage: string = '';

  constructor(private _service: BookAPIService, private router: Router) {
    this.loadBooks();
  }

  loadBooks() {
    this._service.getBooks().subscribe({
      next: (data) => { this.books = data; },
      error: (err) => { this.errMessage = err; }
    });
  }

  show_detail(id: any) {
    this.router.navigate(['ex41', id]);
  }

  go_create() {
    this.router.navigate(['ex43']);
  }

  show_update(id: any) {
    this.router.navigate(['ex45', id]);
  }

  delete_book(id: any) {
    const ok = confirm('Bạn có chắc muốn xóa BookId = ' + id + ' không?');
    if (!ok) return;

    this._service.deleteBook(id).subscribe({
      next: (data) => { this.books = data; },
      error: (err) => { this.errMessage = err; }
    });
  }
  request_deleted(id:any)
  {
    if(confirm("are you sure wanna delete ["+id+"]"))
    {}
  }
}
