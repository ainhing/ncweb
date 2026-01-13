import { Component, OnInit } from '@angular/core';
import { Ex18Service } from '../ex18-service';


@Component({
  selector: 'app-ex18',
  standalone: false,
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class Ex18 implements OnInit {
  customers: any;
  errMessage: string = '';

  constructor(private customerService: Ex18Service) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        console.log('DATA:', data);
        this.customers = data;
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
}
