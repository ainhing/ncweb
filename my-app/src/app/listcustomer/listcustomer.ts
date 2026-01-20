import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listcustomer',
  standalone: false,
  templateUrl: './listcustomer.html',
  styleUrl: './listcustomer.css',
})
export class Listcustomer {
  customers=[{"id":"c1","name":"Customer 1","gender":'male','image':'c1.png'},
             {"id":"c2","name":"Customer 2","gender":'female','image':'c2.png'},
             {"id":"c3","name":"Customer 3","gender":'male','image':'c3.png'},
             {"id":"c4","name":"Customer 4","gender":'female','image':'c4.png'},
             {"id":"c5","name":"Customer 5","gender":'male','image':'c5.png'},
  ]
  constructor(private router:Router,private activeRouter:ActivatedRoute)
  {

  }
  view_detail(id:any)
  {
    this.router.navigate(["list-customer",id])
  }
}
