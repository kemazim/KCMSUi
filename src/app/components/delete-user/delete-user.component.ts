import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  userName: string = '';
  users: Users[] = [];
  isLoading!: boolean;

  totalPages!: number;
  currentPage: number = 1;
  itemsPerPage: number = 15;

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    let userName = localStorage.getItem('userName');
    this.userName = userName !== null ? userName : '';
    this.isLoading = true;
    this.loadUser();
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

  confirmDeleteUser(name: any, userId: any) {
    if (confirm("Are you sure to delete " + name)) {
      this.deleteUser(name, userId)
    }
  }

  deleteUser(name: any, userId: string) {
    this.userService.deleteUser(userId).subscribe(result => {
      alert("Username " + name + " successfully deleted");
      this.loadUser();
    },
      error => {
        alert(error)
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
