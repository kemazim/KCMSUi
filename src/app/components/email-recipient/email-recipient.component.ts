import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-recipient',
  templateUrl: './email-recipient.component.html',
  styleUrls: ['./email-recipient.component.css']
})
export class EmailRecipientComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
      
  }

  backPage() {
    this.router.navigate(['settings'])
  }
}
