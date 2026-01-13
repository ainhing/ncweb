import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customerdetail',
  standalone: false,
  templateUrl: './customerdetail.html',
  styleUrl: './customerdetail.css',
})
export class Customerdetail {
   customers=[{"id":"c1","name":"Customer 1","gender":'male','image':'c1.png'},
             {"id":"c2","name":"Customer 2","gender":'female','image':'c2.png'},
             {"id":"c3","name":"Customer 3","gender":'male','image':'c3.png'},
             {"id":"c4","name":"Customer 4","gender":'female','image':'c4.png'},
             {"id":"c5","name":"Customer 5","gender":'male','image':'c5.png'},
  ]
  selected_customer: any
    constructor(private router:Router,private activeRouter:ActivatedRoute)
  {
    this.activeRouter.paramMap.subscribe(
      (param) => {
        let id = param.get("id")
        if(id!=null)//id không tồn tại/từ routing lạ
        {
          // sau đó truy vấn id này tring dataset
          this.selected_customer=this.customers.find(c=>c,id==id)
        }
      }
    )
  }
  go_back()
    {
      this.router.navigate(["list-customer"])
    }

}
