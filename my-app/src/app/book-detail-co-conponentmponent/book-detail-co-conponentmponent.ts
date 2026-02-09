import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAPIService } from '@app/myservice/book-apiservice';

@Component({
  selector: 'app-book-detail-co-conponentmponent',
  standalone: false,
  templateUrl: './book-detail-co-conponentmponent.html',
  styleUrl: './book-detail-co-conponentmponent.css',
})
export class BookDetailCoConponentmponent {
  book:any;
  errMessage:string=''
  constructor(private _service: BookAPIService,private router:Router,private activeRouter:ActivatedRoute)
  {
    activeRouter.paramMap.subscribe((params)=>{
      let bookId=params.get("id")
      if (bookId!=null)
        this.searchBook(bookId)
    })
  }
  searchBook(bookId:string)
  {
    this._service.getBook(bookId).subscribe({
    next:(data)=>{this.book=data},
    error:(err)=>{this.errMessage=err}
    })
  }
}
  
