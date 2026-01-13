import { Component } from '@angular/core';
import { CustomerServices } from '../customer-services';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
  Customer:any
      constructor(ps:CustomerServices)
      {
        this.Customer=ps.getAllCustomer();
      }

}
