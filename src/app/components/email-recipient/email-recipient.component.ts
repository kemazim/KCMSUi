import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-recipient',
  templateUrl: './email-recipient.component.html',
  styleUrls: ['./email-recipient.component.css']
})
export class EmailRecipientComponent implements OnInit {
  
  userName: string = '';

  constructor(private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';
  }

  backPage() {
    this.router.navigate(['settings'])
  }
}
