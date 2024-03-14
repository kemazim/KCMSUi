import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Records } from 'src/app/models/records';
import { RecordService } from 'src/app/services/recordService/record.service';
import { TransactionService } from 'src/app/services/transactionService/transaction.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit{

  isLoading!: boolean;
  userName: string = '';
  trans: any[] = [];
  filterList: any[] = [];

  totalPages!: number;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  srchBoxTransNo: string = '';
  srchBoxUnitNo: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private recordService: RecordService,
    private transService: TransactionService
    ) {
  }

  ngOnInit(): void {
    let name = localStorage.getItem('username');
    this.userName = name !== null ? name : '';
    this.isLoading = true;
    this.loadRecord();
  }

  loadRecord() {
    this.transService.getTransactions().subscribe(result => {
      console.log(result)
      this.trans = result;
      this.filterList = this.trans;
      this.isLoading = false;
      this.calculateTotalPages();
    })
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.trans.length / this.itemsPerPage);
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
    return this.trans.slice(startIndex, endIndex);
  }

  searchRecord() {
    const transNoFilter = this.srchBoxTransNo;
    const unitNoFilter = this.srchBoxUnitNo;
    if (transNoFilter && unitNoFilter) {
      this.filterList = this.trans.filter(record =>
        record.unitNo?.toLowerCase() === unitNoFilter.toLowerCase() && record.transNo.toLowerCase() === transNoFilter
      );
    }
    else if (unitNoFilter) {
      this.filterList = this.trans.filter(record =>
        record.unitNo?.toLowerCase() === unitNoFilter.toLowerCase());
    }
    else if (transNoFilter) {
      this.filterList = this.trans.filter(record =>
        record.transNo.toLowerCase() === transNoFilter)
    }
    else {
      this.filterList = this.trans.slice();
    }
  }

  clear() {
    this.loadRecord();
    this.srchBoxTransNo = '';
    this.srchBoxUnitNo = '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['mainPage'])
  }

  addRecordPage() {
    this.router.navigate(['addRecord'])
  }

  deleteRecordPage() {
    this.router.navigate(['deleteRecord'])
  }

  searchRecordPage() {
    this.router.navigate(['searchRecord'])
  }

  reportingPage() {
    this.router.navigate(['dashboard'])
  }
}