import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
      
  }

  emailTo() {
    let recipient = "akmalhaziem1@gmail.com";
    let subject = "Support Inquiry";
    let body = "Hello, I need assistance with ...";
    let mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink);
}
}
