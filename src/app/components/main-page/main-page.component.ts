import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  loginForm!: FormGroup;
  loginUsers: any[] = [];
  loginDetails: any = {
    username: '',
    password: ''
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userAuth: UserService
  ) { }

  ngOnInit(): void {
    localStorage.setItem('username', '')
    localStorage.setItem('name', '')
    localStorage.setItem('lastLogin', '')
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    console.log(this.loginForm.value)
    if (this.loginForm.status == 'INVALID') {
      alert("Please check your username or password")
    } else {
      this.userAuth.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('username', res.username)
          localStorage.setItem('name', res.name)
          localStorage.setItem('lastLogin', res.lastLogin)
          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          alert(err?.error.message)
        }
      });
    }
  }
}
