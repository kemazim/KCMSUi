import { HttpClient } from '@angular/common/http';
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

  constructor(private router: Router,
    private http: HttpClient,
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
    })
  }

  confirmDeleteUser(name: any, userId: any) {
    if (confirm("Are you sure to delete " + name)) {
      this.deleteUser(name, userId)
    }
  }

  deleteUser(name: any, userId: string) {
    console.log(userId)
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
}
