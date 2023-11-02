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
  isLoading!: boolean;

  totalPages!: number;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private router:Router,
    private mailService: MailService) {}

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';
    this.isLoading = true;
    this.loadKioskEmail();
  }

  loadKioskEmail() {
    this.mailService.getKioskEmails().subscribe(result => {
      this.kioskEmail = result;
      this.isLoading = false;
      this.calculateTotalPages();
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
