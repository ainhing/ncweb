import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb2',
  standalone: false,
  templateUrl: './ptb2.html',
  styleUrl: './ptb2.css',
})
export class Ptb2 {
  a_number:number=5
  b_number:number=7
  c_number:number=2
  result:string="..."
  get_solution()
  {
    if(this.a_number==0)
    {
      if(this.b_number==0 && this.c_number==0)
      {
        this.result="vô số nghiệm"
      }
      else if(this.b_number==0 && this.c_number!=0)
      {
        this.result="vô nghiệm"
      }
      else
      {
        let x= -this.c_number/this.b_number
        this.result="x="+x
      }
    }
    else
    {
      let delta=this.b_number*this.b_number-4*this.a_number*this.c_number
      this.result="Tự kết luận theo delta"
      
      
    }
  }
}
