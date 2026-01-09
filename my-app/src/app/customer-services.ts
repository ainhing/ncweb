import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerServices {
  Customer = [
    {
      id: 'c1',
      name: 'teo',
      products: [
        { id: 'p1', name: 'cocacola', price: 100 },
        { id: 'p2', name: 'pepsi', price: 120 },
        { id: 'p3', name: 'sting', price: 150 },
      ],
    },
  ];

  getAllCustomer() {
    return this.Customer;
  }
}



