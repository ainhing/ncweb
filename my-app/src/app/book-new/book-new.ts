import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '@app/classes/ibook';
import { BookAPIService } from '@app/myservice/book-apiservice';

@Component({
  selector: 'app-book-new',
  standalone: false,
  templateUrl: './book-new.html',
  styleUrl: './book-new.css',
})
export class BookNew {
   book = new Book();
  errMessage: string = '';

  constructor(private _service: BookAPIService, private router: Router) {}

  back() {
  this.router.navigate(['ex39']);
}

postBook() {
  this._service.postBook(this.book).subscribe({
    next: () => {
      alert("Create success");
      this.router.navigate(['ex39']);
    },
    error: (err) => this.errMessage = err
  });
}
}

