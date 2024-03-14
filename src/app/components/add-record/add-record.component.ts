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
export class AddRecordComponent implements OnInit {

  addRecordForm!: FormGroup;
  addRecordRequest = {};
  isLoading!: boolean;
  userName: string = '';
  lastLogin: string = '';
  records: Records[] = [];
  modalString: string = '';
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

  confirmModal() {
    if (this.addRecordForm.status == "INVALID") {
      this.modalString = 'Please insert all details';
      const modelDiv = document.getElementById('errorModal');
      if (modelDiv != null) {
        modelDiv.style.display = 'block';
      }
    } else {
      const modelDiv = document.getElementById('confirmModal');
      if (modelDiv != null) {
        modelDiv.style.display = 'block';
      }
    }

  }

  addRecord() {
    if (this.addRecordForm.status == "INVALID") {
      alert("Please insert all details");
    } else {
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
          this.loadRecord();
          this.addRecordForm.reset();
          this.closeModalConfirm();
          const modelDiv = document.getElementById('myModal');
          if (modelDiv != null) {
            modelDiv.style.display = 'block';
          }
        },
        error: (err) => {
          if (err.statusText == "Bad Request") {
            this.modalString = "Please make sure your input correct";
          }
          else {
            this.modalString = err?.error.message;
          }
            this.closeModalConfirm();
            const modelDiv = document.getElementById('errorModal');
            if (modelDiv != null) {
              modelDiv.style.display = 'block';
            }
            this.addRecordForm.reset();
          }
        
      });
    }
  }

  closeModalError() {
    this.modalString = '';
    const modelDiv = document.getElementById('errorModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  closeModalConfirm() {
    const modelDiv = document.getElementById('confirmModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  closeModal() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  clear() {
    this.addRecordForm.reset();
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
