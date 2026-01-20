import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contact_name: string = "Long Lang";
  contact_email: string = "longlanh@gmail.com";
  contact_phone: string = "09876123332";
  sendContact(your_name:string):void
  {
    alert("Bạn ["+your_name+"] muốn gửi contact")
  }

}
