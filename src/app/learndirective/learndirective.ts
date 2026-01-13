import { Component } from '@angular/core';

@Component({
  selector: 'app-learndirective',
  standalone: false,
  templateUrl: './learndirective.html',
  styleUrl: './learndirective.css',
})
export class Learndirective {
  show_view:number=1
  changeView()
  {
    if (this.show_view==1)
      this.show_view=2
    else
      this.show_view=1
  }
  provinces=["Hà Nội","Hồ Chí Minh","Đà Nẵng","Hải Phòng","Cần Thơ"]
  products=[{"id":"p1","name":"cocacola","price":"1200","images":'coca.jpg'},
            {"id":"p2","name":"pepsi","price":"1100","images":'pepsi.jpg'},
            {"id":"p3","name":"sting","price":"1300","images":'sting.jpg'}
  ]
  
}
