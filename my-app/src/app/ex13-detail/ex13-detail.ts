import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ex13Service } from '@app/ex13-service';


@Component({
  selector: 'app-ex13-detail',
  standalone: false,
  templateUrl: './ex13-detail.html',
  styleUrl: './ex13-detail.css',
})
export class Ex13Detail {
   selectedProduct:any 
  constructor(private activateRoute:ActivatedRoute,private _fs:Ex13Service, private router:Router) 
  { 
    activateRoute.paramMap.subscribe( 
      (param)=>{ 
        let id=param.get('id') 
         
        if(id!=null) 
        { 
          this.selectedProduct=_fs.getProductDetail(id)           
        } 
      } 
    ) 
  } 
  goBack(){ 
    this.router.navigate(['ex13-service-detail']) 
  }
}
