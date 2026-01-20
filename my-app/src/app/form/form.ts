import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Student } from '@app/classes/student';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  studentModel = new Student('Ái Nhi', "ainhi@example.com", '0987654321', 'Web Development', 'Morning');

  errFlag: boolean = false;
  courses: string[] = ['Web Development', 'Data Science', 'UI/UX'];

  validateCourse(value:any):void{
    if (value ==="None")
      this.errFlag = true;
    else
      this.errFlag = false;
  }
}
