import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mails } from 'src/app/models/mailRecipient';
import { MailService } from 'src/app/services/mailService/mail.service';

@Component({
  selector: 'app-email-service',
  templateUrl: './email-service.component.html',
  styleUrls: ['./email-service.component.css']
})
export class EmailServiceComponent implements OnInit{
  userName: string = '';
  kioskEmail: Mails[] = [];

  constructor(private router:Router,
    private mailService: MailService) {}

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';

    this.loadKioskEmail();
  }

  loadKioskEmail() {
    this.mailService.getKioskEmails().subscribe(result => {
      this.kioskEmail = result;
    })
  }
  backPage() {
    this.router.navigate(['settings'])
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['mainPage'])
  }
}
