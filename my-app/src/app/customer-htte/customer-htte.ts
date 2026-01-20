import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerHttpService } from '@app/myservice/customer-http-service';

@Component({
  selector: 'app-customer-htte',
  standalone: false,
  templateUrl: './customer-htte.html',
  styleUrl: './customer-htte.css',
})
export class CustomerHtte {
  customers:any
  constructor(private csh:CustomerHttpService, private router:Router,private activeRouter:ActivatedRoute)
  {
    this.csh.get_all_customers().subscribe(
      {
        next: (data) => {
        console.log('DATA:', data);
        this.customers = data;}
      }
    )
  }
  view_detail(id:any)
  {
    this.router.navigate(["list-customer-http",id])
  }
}
