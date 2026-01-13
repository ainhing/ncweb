import { Component } from '@angular/core';

@Component({
  selector: 'app-ex10',
  standalone: false,
  templateUrl: './ex10.html',
  styleUrl: './ex10.css',
})
export class Ex10 {
  days: number[]=[];
  months: number[]=[];
  years: number[]=[];
  day: number =1;
  month: number =1;
  year: number = 2300;
  result: string='';
  constructor() {
    this.days = Array.from({length:31},(_,i)=>i+1);
    this.months = Array.from({length:12},(_,i)=>i+1);
    this.years = Array.from({length:100},(_,i)=>1925+i);
  }
  convert(){
    let lunar = new LunarYear(this.day,this.month,this.year);
    this.result = lunar.findLunarYearDetail();
  }
}
export class LunarYear{
  constructor(
    public day:number,
    public month:number,
    public year:number
  ){}

  findLunarYearDetail():string{
    const can = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
    const chi = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

    let canIndex = (this.year + 6) % 10;
    let chiIndex = (this.year + 8) % 12;

    return `Ngày ${this.day}/${this.month}/${this.year} âm lịch là năm ${can[canIndex]} ${chi[chiIndex]}`;
  }
}
