import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mails } from 'src/app/models/mailRecipient';
import { MailService } from 'src/app/services/mailService/mail.service';

@Component({
  selector: 'app-email-service',
  templateUrl: './email-service.component.html',
  styleUrls: ['./email-service.component.css']
})
export class EmailServiceComponent implements OnInit {
  userName: string = '';
  kioskEmail: Mails[] = [];
  addKioskEmailForm!: FormGroup;
  addKioskEmailReq = {};
  isLoading!: boolean;

  totalPages!: number;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private router: Router,
    private mailService: MailService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    let name = localStorage.getItem('username');
    this.userName = name !== null ? name : '';
    this.isLoading = true;
    this.loadKioskEmail();

    this.addKioskEmailForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      port: ['', [Validators.required]],
      host: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  loadKioskEmail() {
    this.mailService.getKioskEmails().subscribe(result => {
      this.kioskEmail = result;
      this.isLoading = false;
      this.calculateTotalPages();
    })
  }

  addKioskEmail() {
    console.log(this.addKioskEmailForm.status)
    console.log(this.addKioskEmailForm.value)
    if (this.addKioskEmailForm.status == "INVALID") {
      alert("Please enter a valid email address and fill all the details")
    } else {
      this.addKioskEmailReq = {
        email: this.addKioskEmailForm.value.email,
        password: this.addKioskEmailForm.value.password,
        port: this.addKioskEmailForm.value.port,
        host: this.addKioskEmailForm.value.host,
        status: this.addKioskEmailForm.value.status
      }
    }
    this.mailService.addKioskEmail(this.addKioskEmailReq).subscribe({
      next: (result) => {
        console.log(result)
      alert(result.message);
      this.addKioskEmailForm.reset();
    },
      error: (err) => {
        alert(err?.error.message);
      }
      })
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.kioskEmail.length / this.itemsPerPage);
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
    return this.kioskEmail.slice(startIndex, endIndex);
  }

  backPage() {
    this.router.navigate(['settings'])
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['mainPage'])
  }
}
