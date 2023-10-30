import { HttpClient } from '@angular/common/http';
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
  addUserDetails: any = {
    userId: '',
    name: '',
    password: '',
    confirmPwd: '',
    role: '',
    branch: ''
  }

  addUserRequest = {}
  isLoading!: boolean;
  userName: string = '';
  users: Users[] = [];

  constructor(private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';

    this.isLoading =true;
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
      this.isLoading=true
    })
  }

  addUser() {
    if (this.addUserForm.status == 'INVALID') {
      alert("Please make sure password more than 5 char and fill all the details")
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
          alert(res);
          this.loadUser();
        },
        error: (err) => {
          alert(err?.error.message);
        }
      });
    }
  }

  backPage() {
    this.router.navigate(['settings'])
  }
}
