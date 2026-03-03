import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@app/classes/ibook';
import { BookAPIService } from '@app/myservice/book-apiservice';

@Component({
  selector: 'app-book-edit',
  standalone: false,
  templateUrl: './book-edit.html',
  styleUrl: './book-edit.css',
})
export class BookEdit {
  book = new Book()
  errMessage: string = ''
  selectedFile: File | null = null

  constructor(
    private _service: BookAPIService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // Load sẵn thông tin book hiện tại vào form
    const bookId = this._route.snapshot.params['id']
    this._service.getBook(bookId).subscribe({
      next: (data) => {
        this.book.BookId   = data.BookId
        this.book.BookName = data.BookName
        this.book.Author   = data.Author
        this.book.Category = data.Category
        this.book.Price    = data.Price
        this.book.Image    = data.Image
      },
      error: (err) => { this.errMessage = err }
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  putBook() {
    if (this.selectedFile) {
      // Upload ảnh mới trước, rồi mới PUT book
      this._service.uploadImage(this.selectedFile).subscribe({
        next: (data) => {
          this.book.Image = data.filename
          this.saveBook()
        },
        error: (err) => { this.errMessage = err }
      })
    } else {
      this.saveBook()
    }
  }

  saveBook() {
    this._service.putBook(this.book).subscribe({
      next: () => { this._router.navigate(['/book-list']) },
      error: (err) => { this.errMessage = err }
    })
  }

  goBack() {
    this._router.navigate(['/book-list'])
  }
}
