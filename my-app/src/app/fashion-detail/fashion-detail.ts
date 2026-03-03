import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionApiService } from '@app/myservice/fashion-api-service';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetail {
  fashion:any;
  errMessage:string=''
  constructor(private _service: FashionApiService,private router:Router,private activeRouter:ActivatedRoute)
  {
    activeRouter.paramMap.subscribe((params)=>{
      let fashionId=params.get("id")
      if (fashionId!=null)
        this.searchFashion(fashionId)
    })
  }
  searchFashion(_id:string)
  {
    this._service.searchFashion(_id).subscribe({
    next:(data)=>{this.fashion=data},
    error:(err)=>{this.errMessage=err}
    })
  }
  get_image(base64: string)
  {if(base64==null) return ''
    let prefix = 'data:image/jpeg;base64,';
    if (base64.startsWith(prefix))
      return base64;
    return prefix+base64;
  }
}
