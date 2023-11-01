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
  signupUsers: any[] = [];
  signupDetails: any = {
    userName: '',
    email: '',
    password: ''
  }

  loginUsers: any[] = [];
  loginDetails: any = {
    userName: '',
    password: ''
  }


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userAuth: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    const localData = localStorage.getItem('signupUsers')
    if (localData != null) {
      this.signupUsers = JSON.parse(localData)
    }
  }

  signUp() {
    this.signupUsers.push(this.signupDetails)
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers))
    this.signupDetails = {
      userName: '',
      email: '',
      password: ''
    }
  }

  login() {
    console.log(this.loginForm.status)
    console.log(this.loginForm.value)
    if (this.loginForm.status == 'INVALID') {
      alert("isi btul2 lah")
    } else {
      this.userAuth.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('userName', res.name)
          localStorage.setItem('userId', res.userId)
          console.log(res)
          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          alert(err?.error.message)
        }
      });
    }
  }
}
