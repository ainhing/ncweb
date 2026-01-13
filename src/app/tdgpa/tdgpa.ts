import { Component } from '@angular/core';

@Component({
  selector: 'app-tdgpa',
  standalone: false,
  templateUrl: './tdgpa.html',
  styleUrl: './tdgpa.css',
})
export class Tdgpa {
  gpa(a: number, b: number, c: number): number {
    return a * 0.3 + b * 0.2 + c * 0.5;
  }

  get_xl(a: string, b: string, c: string, td_gpa: HTMLElement, xeploai: HTMLElement) {
    const a_number = parseFloat(a);
    const b_number = parseFloat(b);
    const c_number = parseFloat(c);

    const r = this.gpa(a_number, b_number, c_number);
    td_gpa.innerHTML = r.toFixed(2);   

    let xl = '';
    if (r >= 9) xl = 'Xuất sắc';
    else if (r >= 8) xl = 'Giỏi';
    else if (r >= 6.5) xl = 'Khá';
    else if (r >= 5) xl = 'Trung bình';
    else xl = 'Yếu';

    xeploai.innerHTML = xl;
  }


  clear_data(a: HTMLInputElement, b: HTMLInputElement, c: HTMLInputElement, td_gpa: HTMLElement, xeploai: HTMLElement) {
    a.value = '';
    b.value = '';
    c.value = '';
    td_gpa.innerHTML = '';
    xeploai.innerHTML = '';
    a.focus();
  }

}
