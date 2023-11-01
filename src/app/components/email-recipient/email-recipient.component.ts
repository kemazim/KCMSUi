import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MailRecipient } from 'src/app/models/mailRecipient';
import { MailService } from 'src/app/services/mailService/mail.service';

@Component({
  selector: 'app-email-recipient',
  templateUrl: './email-recipient.component.html',
  styleUrls: ['./email-recipient.component.css']
})
export class EmailRecipientComponent implements OnInit {

  userName: string = '';
  emailForm!: FormGroup;
  emails: MailRecipient[] = [];
  isLoading!: boolean;

  totalPages!: number;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private router: Router,
    private mailService: MailService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';
    this.isLoading = true;
    this.loadEmails();
    this.emailValidator();
  }

  loadEmails() {
    this.mailService.getEmail().subscribe(result => {
      this.emails = result;
      this.isLoading = false;
      this.calculateTotalPages();
    })
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.emails.length / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.emails.slice(startIndex, endIndex);
  }

  emailValidator() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]]
    })
  }

  addEmail() {
    if (this.emailForm.status == 'INVALID') {
      alert("Please enter current, new and re-enter password and make sure it is a valid Email address")
    } else {
      const emailRequest = {
        name: this.emailForm.value.email
      }
      this.mailService.addEmail(emailRequest).subscribe({
        next: (res) => {
          alert("Email successfully added");
          window.location.reload();
        },
        error: (err) => {
          alert(err?.error.message);
          window.location.reload();
        }
      })
    }
  }

  clear() {
    this.emailForm.reset();
  }

  backPage() {
    this.router.navigate(['settings'])
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['mainPage'])
  }
}
