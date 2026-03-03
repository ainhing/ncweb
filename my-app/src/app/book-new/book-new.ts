import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@app/classes/ibook';
import { BookAPIService } from '@app/myservice/book-apiservice';

@Component({
  selector: 'app-book-new',
  standalone: false,
  templateUrl: './book-new.html',
  styleUrl: './book-new.css',
})
export class BookNew {
  book = new Book()
  errMessage: string = ''
  selectedFile: File | null = null

  constructor(private _service: BookAPIService, private _router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  postBook() {
    if (this.selectedFile) {
      // Upload ảnh trước, sau đó mới POST book
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
    this._service.postBook(this.book).subscribe({
      next: () => { this._router.navigate(['/book-list']) },
      error: (err) => { this.errMessage = err }
    })
  }

  goBack() {
    this._router.navigate(['/book-list'])
  }
}