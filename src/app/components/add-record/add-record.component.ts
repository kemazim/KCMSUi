import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Records } from 'src/app/models/records';
import { RecordService } from 'src/app/services/recordService/record.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit{

  addRecordForm!: FormGroup;
  addRecordRequest = {};
  isLoading!: boolean;
  userName: string = '';
  lastLogin: string = '';
  records: Records[] = [];

  totalPages!: number;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private router: Router,     
    private fb: FormBuilder,
    private recordService: RecordService) {
  }

  ngOnInit(): void {
    let name = localStorage.getItem('username');
    let dateLogin = localStorage.getItem('lastLogin');
    this.userName = name !== null ? name : '';
    this.lastLogin = dateLogin !== null ? dateLogin : '';

    this.isLoading = true;
    this.loadRecord();

    this.addRecordForm = this.fb.group({
      unitNo: ['', [Validators.required]],
      mailingAddress: ['', [Validators.required]],
      rentalRate: ['', [Validators.required]],
      email: ['', [Validators.required]],
      icNo: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      tenantName: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
    })
  }

  loadRecord() {
    this.recordService.getRecords().subscribe(result => {
      console.log(result)
      this.records = result;
      this.isLoading = false;
      this.calculateTotalPages();
    })
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.records.length / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    const pages: number[] = [];
    for(let i =1; i <= this.totalPages; i++){
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

  addRecord() {
    console.log("tst")
    if (this.addRecordForm.status == "INVALID") {
      alert("Please insert all details");
      console.log("tstdwdwd")
    } else {
      console.log("tst2")
      this.addRecordRequest = {
        unitNo: this.addRecordForm.value.unitNo,
        rentalRate: this.addRecordForm.value.rentalRate,
        icNo: this.addRecordForm.value.icNo,
        tenantName: this.addRecordForm.value.tenantName,
        email: this.addRecordForm.value.email,
        mailingAddress: this.addRecordForm.value.mailingAddress,
        companyName: this.addRecordForm.value.companyName,
        contactNo: this.addRecordForm.value.contactNo,
      } 
      this.recordService.createRecord(this.addRecordRequest).subscribe({
        next: (res) => {
          alert("User successfully added");
          this.loadRecord();
          this.addRecordForm.reset();
        },
        error: (err) => {
          alert(err?.error.message);
          this.addRecordForm.reset();
        }
      });
    }
  }

  clear() {
    this.addRecordForm.reset();
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['mainPage'])
  }

  // addRecord(){
  //   this.router.navigate(['addRecord'])
  // }

  deleteRecord() {
    this.router.navigate(['dashboard'])
  }

  searchRecord() {
    this.router.navigate(['dashboard'])
  }

  reporting() {
    this.router.navigate(['dashboard'])
  }
}
