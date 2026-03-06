import { FashionApiService } from '@app/myservice/fashion-api-service';
import { Fashion } from './../classes/Fashion';
import { Component } from '@angular/core';



@Component({
  selector: 'app-fashion-new',
  standalone: false,
  templateUrl: './fashion-new.html',
  styleUrl: './fashion-new.css',
})
export class FashionNew {
   fashion=new Fashion(); 
  errMessage:string='' 
    constructor(private _service: FashionApiService){ 
     
  } 
  public setFashion(f:Fashion) 
  { 
    this.fashion=f 
  } 
  onFileSelected(event:any,fashion:Fashion) { 
    let me = this; 
    let file = event.target.files[0]; 
     
    let reader = new FileReader(); 
    reader.readAsDataURL(file); 
    reader.onload = function () { 
      fashion.fashion_image=reader.result!.toString()                     
    }; 
    reader.onerror = function (error) { 
      console.log('Error: ', error); 
    };         
 } 
 
  postFashion() 
  { 
    this._service.postFashion(this.fashion).subscribe({ 
      next:(data)=>{this.fashion=data}, 
      error:(err)=>{this.errMessage=err} 
    }) 
  }   
}
