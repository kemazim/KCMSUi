import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm!: FormGroup;
  addUserRequest = {};
  isLoading!: boolean;
  userName: string = '';
  users: Users[] = [];

  totalPages!: number;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';

    this.isLoading = true;
    this.loadUser();

    this.addUserForm = this.fb.group({
      userId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPwd: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  loadUser() {
    this.userService.getUsers().subscribe(result => {
      this.users = result;
      this.isLoading = false;
      this.calculateTotalPages();
    })
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
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
    return this.users.slice(startIndex, endIndex);
  }

  addUser() {
    if (this.addUserForm.status == 'INVALID') {
      alert("Please make sure password more than 5 char and fill all the details")
    } else {
      if (this.addUserForm.value.password != this.addUserForm.value.confirmPwd) {
        alert("Password and confirm password not match");
      } else {
        this.addUserRequest = {
          userId: this.addUserForm.value.userId,
          name: this.addUserForm.value.name,
          password: this.addUserForm.value.password,
          role: this.addUserForm.value.role,
          branch: this.addUserForm.value.branch,
          contactNo: "",
          email: "",
          designation: ""
        }
        this.userService.addUser(this.addUserRequest).subscribe({
          next: (res) => {
            alert("User succesfully added");
            this.loadUser();
            this.addUserForm.reset();
          },
          error: (err) => {
            alert(err?.error.message);
            this.addUserForm.reset();
          }
        });
      }
    }
  }

  clear() {
    this.addUserForm.reset();
  }

  backPage() {
    this.router.navigate(['settings'])
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['mainPage'])
  }
}
