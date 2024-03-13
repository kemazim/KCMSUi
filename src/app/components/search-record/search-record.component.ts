import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Records } from 'src/app/models/records';
import { RecordService } from 'src/app/services/recordService/record.service';

@Component({
  selector: 'app-search-record',
  templateUrl: './search-record.component.html',
  styleUrls: ['./search-record.component.css']
})
export class SearchRecordComponent implements OnInit {

  isLoading!: boolean;
  userName: string = '';
  records: Records[] = [];
  filterList: Records[] = [];

  totalPages!: number;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  srchBoxUnitNo: string = '';
  srchBoxIC: string = '';

  constructor(private router: Router,
    private fb: FormBuilder,
    private recordService: RecordService) {
  }

  ngOnInit(): void {
    let name = localStorage.getItem('username');
    this.userName = name !== null ? name : '';

    this.isLoading = true;
    this.loadRecord();
  }

  loadRecord() {
    this.recordService.getRecords().subscribe(result => {
      console.log(result)
      this.records = result;
      this.filterList = this.records;
      this.isLoading = false;
      this.calculateTotalPages();
    })
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.records.length / this.itemsPerPage);
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
    return this.records.slice(startIndex, endIndex);
  }

  searchRecord() {
    const icNoFilter = this.srchBoxIC;
    const unitNoFilter = this.srchBoxUnitNo;
    if (icNoFilter && unitNoFilter) {
      this.filterList = this.records.filter(record =>
        record.unitNo?.toLowerCase() === unitNoFilter.toLowerCase() && record.icNo === icNoFilter
      );
    }
    else if (unitNoFilter) {
      this.filterList = this.records.filter(record =>
        record.unitNo?.toLowerCase() === unitNoFilter.toLowerCase());
    }
    else if (icNoFilter) {
      this.filterList = this.records.filter(record =>
        record.icNo === icNoFilter)
      console.log(this.filterList)
    }
    else {
      this.filterList = this.records.slice();
    }
  }

  clear() {
    this.loadRecord();
    this.srchBoxIC = '';
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