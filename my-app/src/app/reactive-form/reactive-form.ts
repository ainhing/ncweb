import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: false,
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  public regForm: FormGroup = new FormGroup ({
    name: new FormControl('Ái Nhi'),
    email: new FormControl('ainhi@gmail.com'),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
  })
  // public regForm1 = this._formBuilder.group({
  //   name: ['',Validators.required],
  //   email: ['banhbeovodung@gmail.com'],
  //   password: [''],
  //   confirmpassword: ['']
  // })
  get name(){
    return this.regForm.get('name');
  }
  setDefaultValues(){
    this.regForm.setValue({
      name:"banhbeovodung",
      email:"banhbeovodung@gmail.com",
      password:"",
      confirmpassword:""
    })
  }
}
