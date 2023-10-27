import { JsonPipe } from '@angular/common';
import { Component, Injectable, Injector, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit{

  loginForm!: FormGroup;
  signupUsers: any[] = [];
  signupDetails: any = {
    userName: '',
    email: '',
    password: ''
  }

  loginUsers:any[]= [];
  loginDetails: any = {
    userName: '',
    password: ''
  }


  constructor(
    private router: Router,
    private fb: FormBuilder
    ) {}

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
    const userExist = this.signupUsers.find(x => x.userName == this.loginDetails.email && x.password == this.loginDetails.password)
    console.log(this.loginDetails)
    if(userExist != undefined) {
      this.router.navigate(['dashboard'])
    } else {
      alert("Try again maa")
    }
  }


}
