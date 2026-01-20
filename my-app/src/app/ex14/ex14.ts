import { Component } from '@angular/core';
import { Ex14Service } from '@app/ex14-service';

@Component({
  selector: 'app-ex14',
  standalone: false,
  templateUrl: './ex14.html',
  styleUrl: './ex14.css',
})
export class Ex14 {
  categories: any;

  constructor(private catalogService: Ex14Service) {}

  ngOnInit() {
    this.categories = this.catalogService.getCategories();
  }
}
