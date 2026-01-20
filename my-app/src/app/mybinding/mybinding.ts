import { Component } from '@angular/core';

@Component({
  selector: 'app-mybinding',
  standalone: false,
  templateUrl: './mybinding.html',
  styleUrl: './mybinding.css',
})
export class Mybinding {
  public full_name: string = 'Tèo'
  public email: string='teo@gmail.com'
  public is_readonly: boolean = true 
  public personal_style={
    color:'red',fontsize:'20px',fontStyle: 'italic'
  }
  get_full_name(fname:string,mname:string,lname:string,tdfn:HTMLElement)
  {
    tdfn.innerHTML=fname+" "+mname+" "+lname;
  }
}
