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
   book=new Book(); 
  books:any 
  errMessage:string='' 
  constructor(private _service: BookAPIService,private router:Router,private activeRouter:ActivatedRoute){ 
    this._service.getBooks().subscribe({ 
      next:(data)=>{this.books=data}, 
      error:(err)=>{this.errMessage=err} 
    }) 
  } 
  postBook() 
  { 
    this._service.postBook(this.book).subscribe({
      next:(data)=>{this.books=data}, 
error:(err)=>{this.errMessage=err} 
}) 
} 
}